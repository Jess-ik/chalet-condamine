"use client";
import { Content } from "@prismicio/client";
import { JSXMapSerializer, PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

// Rich text styling
const components: JSXMapSerializer = {
	heading2: ({ text }: { text?: string }) => {
		return (
			<motion.h2 className="max-w-3xl lg:max-w-4xl mx-auto font-heading text-6xl lg:text-8xl leading-[5rem] lg:leading-[7rem] font-light">
				{text?.split(" ").map((word: string, index: number) => (
					<motion.span key={index} variants={animTitle} initial="initial" whileInView="animate" custom={index} viewport={{ once: true }} className="inline-block">
						{word}
						{"\u00A0"}
					</motion.span>
				))}
			</motion.h2>
		);
	},
};

const animTitle = {
	initial: {
		opacity: 0,
		y: 30,
	},
	animate: (index: number) => ({
		opacity: 1,
		y: 0,
		transition: {
			duration: 0.3,
			ease: "easeInOut",
			delay: 0.08 * (index + 1),
		},
	}),
};

/**
 * Props for `SectionHead`.
 */
export type SectionHeadProps = SliceComponentProps<Content.SectionHeadSlice>;

/**
 * Component for "SectionHead" Slices.
 */
const SectionHead = ({ slice }: SectionHeadProps): JSX.Element => {
	return (
		<section id={slice.primary.anchor_id || undefined} data-slice-type={slice.slice_type} data-slice-variation={slice.variation} className="scroll-section pt-32 md:pt-44 lg:pt-52 pb-24 text-center rounded-t-[50px]">
			<PrismicRichText field={slice.primary.heading} components={components} />
		</section>
	);
};

export default SectionHead;
