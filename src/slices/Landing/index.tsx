"use client";

import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import Button from "@/components/Button";
import { Content } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import { JSXMapSerializer, PrismicRichText, SliceComponentProps } from "@prismicio/react";

// Rich text styling
const components: JSXMapSerializer = {
	heading1: ({ text }: { text?: string }) => (
		<h1 className="lg:max-w-2xl text-5xl md:text-8xl md:leading-[6rem] font-light">
			{text?.split(" ").map((word: string, index: number) => (
				<motion.span
					key={index}
					className="inline-block"
				>
					{word}{" "}
				</motion.span>
			))}
		</h1>
	),
	paragraph: ({ children }) => (
		<p className="text-2xl md:text-3xl">{children}</p>
	),
};

/**
 * Props
 */
export type LandingProps = SliceComponentProps<Content.LandingSlice>;

/**
 * Component
 */
const Landing = ({ slice }: LandingProps): JSX.Element => {
	const { resolvedTheme } = useTheme();
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	// 🎯 SAFE image selection (SSR + client stable)
	const imageField =
		mounted
			? resolvedTheme === "dark"
				? slice.primary.image_winter
				: slice.primary.image_summer
			: slice.primary.image_summer;

	return (
		<section
			data-slice-type={slice.slice_type}
			data-slice-variation={slice.variation}
			className="lg:h-screen"
		>
			<div className="bg-mainGreen dark:bg-mainBlue w-full h-screen grid grid-rows-3 lg:grid-cols-3 justify-between text-white">

				{/* CONTENT */}
				<div className="lg:pt-[96px] row-span-2 lg:col-span-2 flex flex-col justify-center gap-8 px-12 max-w-4xl mx-auto">

					<PrismicRichText
						field={slice.primary.heading}
						components={components}
					/>

					<motion.div
						initial={{ opacity: 0, y: 50 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{
							duration: 0.5,
							delay: 0.2,
							ease: "easeInOut",
						}}
					>
						<PrismicRichText
							field={slice.primary.intro}
							components={components}
						/>
					</motion.div>

					<motion.div
						initial={{ opacity: 0, y: 50 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{
							duration: 0.5,
							delay: 0.3,
							ease: "easeInOut",
						}}
					>
						<Button
							field={slice.primary.button_link}
							className="mt-6 bg-white"
						>
							{slice.primary.button_text}
						</Button>
					</motion.div>

				</div>

				{/* IMAGE SAFE */}
				<motion.div
					className="bg-white row-span-1 lg:h-screen"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{
						duration: 0.5,
						delay: 0.2,
						ease: "easeInOut",
					}}
				>
					{imageField && (
						<PrismicNextImage
							priority
							field={imageField}
							className="w-screen lg:w-full h-full object-cover"
							sizes="33vw"
							imgixParams={{ fit: "crop", auto: "format" }}
						/>
					)}
				</motion.div>

			</div>
		</section>
	);
};

export default Landing;