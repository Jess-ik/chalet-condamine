"use client";
import Button from "@/components/Button";
import { Content } from "@prismicio/client";
import { JSXMapSerializer, PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { easeOut, motion, useAnimation, useInView, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";

// Rich text styling
const components: JSXMapSerializer = {
	heading2: ({ children }) => <h2 className="text-xl lg:text-2xl uppercase tracking-wider">{children}</h2>,
	heading3: ({ children }) => <h3 className=" lg:max-w-2xl mx-auto font-heading text-6xl lg:text-8xl lg:leading-[6rem] font-light">{children}</h3>,
	paragraph: ({ text }: { text?: string }) => {
		return <p className="py-8 text-xl lg:text-2xl font-extralight  ">{text?.split(" ").map((word: string, index: number) => <motion.span key={index}>{word} </motion.span>)}</p>;
	},
};

/**
 * Props for `Hero`.
 */
export type HeroProps = SliceComponentProps<Content.HeroSlice>;

/**
 * Component for "Hero" Slices.
 */
const Hero = ({ slice }: HeroProps): JSX.Element => {
	const backgroundImg = slice.primary.background.url;
	const container = useRef(null);
	const heading2 = useRef(null);
	const heading3 = useRef(null);
	const body = useRef(null);
	const button = useRef(null);
	const { scrollYProgress } = useScroll({
		target: container,
		offset: ["start end", "end end"],
	});
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
	const scaleH2Progress = useTransform(scrollForH2, [0, 1], [0.9, 1], { ease: easeOut });
	const scaleButtonProgress = useTransform(scrollForButton, [0, 1], [0.9, 1], { ease: easeOut });
	const scaleBodyProgress = useTransform(scrollForBody, [0, 1], [0.9, 1], { ease: easeOut });
	const scaleH3Progress = useTransform(scrollForH3, [0, 1], [0.9, 1], { ease: easeOut });
	return (
		<motion.section
			ref={container}
			id={slice.primary.anchor_id || undefined}
			data-slice-type={slice.slice_type}
			data-slice-variation={slice.variation}
			style={{
				backgroundImage: `url(${backgroundImg})`,
				backgroundPosition: 'center',
			}}
			className="relative py-32 md:py-0 md:h-screen bg-cover flex justify-center items-center">
			<div className="mx-auto w-full px-10 lg:max-w-4xl text-center flex flex-col gap-8 ">
				<motion.div ref={heading2} style={{ opacity: scrollForH2, scale: scaleH2Progress }}>
					<PrismicRichText field={slice.primary.heading2} components={components} />
				</motion.div>
				<motion.div ref={heading3} style={{ opacity: scrollForH3, scale: scaleH3Progress }}>
					<PrismicRichText field={slice.primary.heading3} components={components} />
				</motion.div>
				<motion.div ref={body} style={{ opacity: scrollForBody, scale: scaleBodyProgress }}>
					<PrismicRichText field={slice.primary.body} components={components} />
				</motion.div>

				<div className="flex justify-center gap-8">
					{/*  CTA buttons */}
					{slice.items.map(({ button_link, button_text }) => (
						<motion.div ref={button} key={button_text} style={{ opacity: scrollForButton, scale: scaleButtonProgress }}>
							<Button field={button_link} key={button_text} className="border-2 border-black hover:bg-black hover:text-white ">
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
