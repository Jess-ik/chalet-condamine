"use client";
import Button from "@/components/Button";
import { Content } from "@prismicio/client";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import { JSXMapSerializer, PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { easeOut, motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

// Rich text styling
const components: JSXMapSerializer = {
	heading2: ({ children }) => <h2 className="max-w-2xl uppercase text-base tracking-widest font-light">{children}</h2>,
	heading3: ({ children }) => <h3 className="lg:max-w-2xl font-heading text-6xl md:text-8xl md:leading-[6rem] font-light">{children}</h3>,
	paragraph: ({ text }: { text?: string }) => <p className="text-xl md:text-2xl font-thin md:font-extralight leading-[2rem]">{text?.split(" ").map((word: string, index: number) => <motion.span key={index}>{word} </motion.span>)}</p>,
};

// Props for `CtA`.
export type CtAProps = SliceComponentProps<Content.CtASlice>;

//Component for "CtA" Slices.
const CtA = ({ slice }: CtAProps): JSX.Element => {
	const heading2 = useRef(null);
	const heading3 = useRef(null);
	const body = useRef(null);
	const button = useRef(null);

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
		offset: ["start 0.8", "start 0.4"],
	});

	const { scrollYProgress: scrollForButton } = useScroll({
		target: button,
		offset: ["start end", "start 0.8"],
	});
	const scaleButtonProgress = useTransform(scrollForButton, [0, 1], [0.7, 1], { ease: easeOut });
	const scaleH3Progress = useTransform(scrollForH3, [0, 1], [0.7, 1], { ease: easeOut });
	return (
		<section data-slice-type={slice.slice_type} data-slice-variation={slice.variation} className="lg:h-screen">
			<div className="bg-mainBlue md:h-screen flex flex-col md:grid md:grid-rows-3 lg:grid-cols-3 justify-between text-white ">
				<motion.div
					className="aspect-video md:aspect-auto md:row-span-1 lg:h-screen w-screen lg:w-full"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{
						duration: 0.5,
						delay: 0.2,
						ease: "easeInOut",
					}}>
					<PrismicNextImage field={slice.primary.image} sizes="33vw" className="aspect-video md:aspect-auto md:h-full lg:h-screen object-cover" imgixParams={{ fit: "crop", auto: "format" }} />
				</motion.div>
				<div className="lg:pt-[96px] md:row-span-2 lg:col-span-2 flex flex-col justify-center gap-8 px-6 md:px-12 py-32 md:py-0  max-w-4xl mx-auto">
					<motion.div ref={heading2} style={{ opacity: scrollForH2 }}>
						<PrismicRichText field={slice.primary.subhead} components={components} />
					</motion.div>
					<motion.div ref={heading3} style={{ opacity: scrollForH3 }}>
						<PrismicRichText field={slice.primary.heading} components={components} />
					</motion.div>
					<motion.div ref={body} style={{ opacity: scrollForBody }}>
						<PrismicRichText field={slice.primary.body} components={components} />
					</motion.div>

					<div className="flex gap-8 flex-col items-center md:flex-row">
						{/*  CTA buttons */}
						{slice.items.map(({ button_link, button_text }) => (
							<motion.div key={button_text} ref={button} style={{ opacity: scrollForButton, scale: scaleButtonProgress }}>
								<Button field={button_link} key={button_text} className="bg-white mt-6">
									{button_text}
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
