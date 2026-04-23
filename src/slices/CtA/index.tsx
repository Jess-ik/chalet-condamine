"use client";

import Button from "@/components/Button";
import { Content } from "@prismicio/client";
import {
	JSXMapSerializer,
	PrismicRichText,
	SliceComponentProps,
} from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";
import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";

// Rich text styling
const components: JSXMapSerializer = {
	heading2: ({ children }) => (
		<h2 className="max-w-2xl uppercase text-base jost tracking-widest font-[400]">
			{children}
		</h2>
	),
	heading3: ({ children }) => (
		<h3 className="lg:max-w-2xl text-6xl md:text-8xl md:leading-[6rem] font-light">
			{children}
		</h3>
	),
	paragraph: ({ text }: { text?: string }) => (
		<p>
			{text?.split(" ").map((word: string, index: number) => (
				<motion.span key={index}>{word} </motion.span>
			))}
		</p>
	),
};

export type CtAProps = SliceComponentProps<Content.CtASlice>;

const CtA = ({ slice }: CtAProps): JSX.Element => {
	const heading2 = useRef(null);
	const heading3 = useRef(null);
	const body = useRef(null);
	const button = useRef(null);

	const { resolvedTheme } = useTheme();
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	// ✅ évite mismatch SSR/hydration
	const isDark = mounted && resolvedTheme === "dark";

	// ✅ image safe (évite flash été)
	const image = isDark
		? slice.primary.image_winter
		: slice.primary.image_summer;

	// scroll animations
	const { scrollYProgress: scrollForH3 } = useScroll({
		target: heading3,
		offset: ["start 0.8", "start 0.4"],
	});

	const { scrollYProgress: scrollForButton } = useScroll({
		target: button,
		offset: ["start end", "start 0.8"],
	});

	const scaleButton = useTransform(scrollForButton, [0, 1], [0.7, 1]);
	const scaleH3 = useTransform(scrollForH3, [0, 1], [0.7, 1]);

	return (
		<section
			data-slice-type={slice.slice_type}
			data-slice-variation={slice.variation}
			className="lg:h-screen"
		>
			<div className="bg-mainGreen dark:bg-mainBlue md:h-screen flex flex-col md:grid md:grid-rows-3 lg:grid-cols-3 justify-between text-white">

				{/* IMAGE */}
				<motion.div
					className="aspect-video md:aspect-auto md:row-span-1 lg:h-screen w-screen lg:w-full"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
				>
					{mounted && image?.url && (
						<PrismicNextImage
							field={image}
							className="aspect-video md:aspect-auto md:h-full lg:h-screen object-cover w-full"
						/>
					)}
				</motion.div>

				{/* CONTENT */}
				<div className="lg:pt-[96px] md:row-span-2 lg:col-span-2 flex flex-col justify-center gap-8 px-6 md:px-12 py-32 md:py-0 max-w-4xl mx-auto">

					<motion.div ref={heading2}>
						<PrismicRichText
							field={slice.primary.subhead}
							components={components}
						/>
					</motion.div>

					<motion.div ref={heading3} style={{ scale: scaleH3 }}>
						<PrismicRichText
							field={slice.primary.heading}
							components={components}
						/>
					</motion.div>

					<motion.div ref={body}>
						<PrismicRichText
							field={slice.primary.body}
							components={components}
						/>
					</motion.div>

					{/* CTA */}
					<div className="flex gap-8 flex-col items-center md:flex-row">
						{slice.items.map((item, index) => (
							<motion.div
								key={index}
								ref={button}
								style={{ scale: scaleButton }}
							>
								<Button
									field={item.button_link}
									className="bg-white mt-6"
								>
									{item.button_text}
								</Button>
							</motion.div>
						))}
					</div>

				</div>
			</div>
		</section>
	);
};

export default CtA;