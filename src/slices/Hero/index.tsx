"use client";

import Button from "@/components/Button";
import { Content } from "@prismicio/client";
import { JSXMapSerializer, PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";


// Rich text styling
const components: JSXMapSerializer = {
	heading2: ({ children }) => (
		<h2 className="text-xl lg:text-2xl jost uppercase tracking-wider">
			{children}
		</h2>
	),
	heading3: ({ children }) => (
		<h3 className="lg:max-w-2xl mx-auto text-6xl lg:text-8xl lg:leading-[6rem] font-light">
			{children}
		</h3>
	),
	paragraph: ({ text }: { text?: string }) => (
		<p className="py-8">
			{text?.split(" ").map((word: string, index: number) => (
				<motion.span key={index}>{word} </motion.span>
			))}
		</p>
	),
};

/**
 * Props
 */
export type HeroProps = SliceComponentProps<Content.HeroSlice>;

/**
 * Component
 */
const Hero = ({ slice }: HeroProps): JSX.Element => {
	const { resolvedTheme } = useTheme();
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	// 🎯 Safe background (évite hydration mismatch)
	const backgroundImg =
		mounted
			? resolvedTheme === "dark"
				? slice.primary.background_winter?.url
				: slice.primary.background_summer?.url
			: slice.primary.background_summer?.url;

	const container = useRef(null);
	const heading2 = useRef(null);
	const heading3 = useRef(null);
	const body = useRef(null);
	const button = useRef(null);

	// Scroll animations
	const { scrollYProgress: scrollForH2 } = useScroll({
		target: heading2,
		offset: ["start 0.8", "start 0.3"],
	});

	const { scrollYProgress: scrollForH3 } = useScroll({
		target: heading3,
		offset: ["start 0.8", "start 0.4"],
	});

	const { scrollYProgress: scrollForBody } = useScroll({
		target: body,
		offset: ["start 0.9", "start 0.4"],
	});

	const { scrollYProgress: scrollForButton } = useScroll({
		target: button,
		offset: ["start 1", "start 0.7"],
	});

	const scaleH2Progress = useTransform(scrollForH2, [0, 1], [0.9, 1]);
	const scaleH3Progress = useTransform(scrollForH3, [0, 1], [0.9, 1]);
	const scaleBodyProgress = useTransform(scrollForBody, [0, 1], [0.9, 1]);
	const scaleButtonProgress = useTransform(scrollForButton, [0, 1], [0.9, 1]);

	return (
		<motion.section
			ref={container}
			id={slice.primary.anchor_id || undefined}
			data-slice-type={slice.slice_type}
			data-slice-variation={slice.variation}
			style={{
				backgroundImage: backgroundImg ? `url(${backgroundImg})` : undefined,
				backgroundPosition: "center",
			}}
			className="relative py-32 md:py-0 md:h-screen bg-cover flex justify-center items-center"
		>
			<div className="mx-auto w-full px-10 lg:max-w-4xl text-center flex flex-col gap-8">

				<motion.div ref={heading2} style={{ scale: scaleH2Progress }}>
					<PrismicRichText field={slice.primary.heading2} components={components} />
				</motion.div>

				<motion.div ref={heading3} style={{ scale: scaleH3Progress }}>
					<PrismicRichText field={slice.primary.heading3} components={components} />
				</motion.div>

				<motion.div ref={body} style={{ scale: scaleBodyProgress }}>
					<PrismicRichText field={slice.primary.body} components={components} />
				</motion.div>

				<div className="flex justify-center gap-8">
					{slice.items.map(({ button_link, button_text }) => (
						<motion.div
							key={button_text}
							ref={button}
							style={{ scale: scaleButtonProgress }}
						>
							<Button
								field={button_link}
								className="border border-black hover:bg-black hover:text-white"
							>
								{button_text}
							</Button>
						</motion.div>
					))}
				</div>

			</div>
		</motion.section>
	);
};

export default Hero;