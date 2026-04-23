"use client";

import { useScroll, motion, useTransform, easeOut } from "framer-motion";
import React, { useRef, useState, useEffect } from "react";
import { Content } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import { JSXMapSerializer, PrismicRichText, SliceComponentProps } from "@prismicio/react";
import clsx from "clsx";
import { useTheme } from "next-themes";

// Rich text styling
const components: JSXMapSerializer = {
	paragraph: ({ children }) => (
		<motion.p className="md:max-w-2xl mx-auto px-6 md:px-0 py-20 md:py-8 text-center">
			{children}
		</motion.p>
	),
};

/**
 * Props
 */
export type TextImageProps = SliceComponentProps<Content.TextImageSlice>;

/**
 * Component
 */
const TextImage = ({ slice }: TextImageProps): JSX.Element => {
	const paragraph = useRef(null);
	const image = useRef(null);

	const { resolvedTheme } = useTheme();
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	// 🎯 SAFE image selection (SSR stable + no hydration error)
	const imageField =
		mounted
			? resolvedTheme === "dark"
				? slice.primary.image_winter
				: slice.primary.image_summer
			: slice.primary.image_summer;

	// Scroll animations
	const { scrollYProgress: scrollForP } = useScroll({
		target: paragraph,
		offset: ["start 0.9", "start 0.25"],
	});

	const { scrollYProgress: scrollForImage } = useScroll({
		target: image,
		offset: ["0 1", "1.33 1"],
	});

	const smoothProgress = useTransform(scrollForImage, [0, 1], [0.7, 1], {
		ease: easeOut,
	});

	return (
		<section
			data-slice-type={slice.slice_type}
			data-slice-variation={slice.variation}
			className="md:px-20 md:py-16 lg:py-24"
		>
			<div className="relative grid lg:grid-cols-2 md:gap-12 items-center">

				{/* IMAGE */}
				<motion.div
					ref={image}
					style={{
						scale: smoothProgress,
						opacity: smoothProgress,
					}}
					className={clsx(
						slice.variation === "imageRight" && "lg:order-2"
					)}
				>
					{imageField && (
						<PrismicNextImage
							field={imageField}
							sizes="33vw"
							className="aspect-video md:aspect-auto md:h-full lg:h-screen object-cover w-full"
							imgixParams={{ fit: "crop", auto: "format" }}
						/>
					)}
				</motion.div>

				{/* TEXT */}
				<motion.div ref={paragraph} style={{ opacity: scrollForP }}>
					<PrismicRichText
						field={slice.primary.body}
						components={components}
					/>
				</motion.div>

			</div>
		</section>
	);
};

export default TextImage;