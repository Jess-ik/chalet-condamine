"use client";
import Button from "@/components/Button";
import { Content } from "@prismicio/client";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import { JSXMapSerializer, PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { motion } from "framer-motion";

// Rich text styling
const components: JSXMapSerializer = {
	heading1: ({ text }: { text?: string }) => (
		<h1 className="max-w-xl lg:max-w-2xl font-heading text-6xl md:text-8xl md:leading-[6rem] font-light">
			{text?.split(" ").map((word: string, index: number) => (
				<motion.div key={index} variants={animTitle} initial="initial" whileInView="animate" custom={index} viewport={{ once: true }}>
					<motion.span key={index}>{word} </motion.span>
				</motion.div>
			))}
		</h1>
	),
	paragraph: ({ children }) => <p className="text-2xl md:text-3xl font-extralight ">{children}</p>,
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
			ease: "easeOut",
			delay: 0.08 * (index + 1),
		},
	}),
};

// Props for `Landing`.
export type LandingProps = SliceComponentProps<Content.LandingSlice>;

//Component for "Landing" Slices.
const Landing = ({ slice }: LandingProps): JSX.Element => {
	return (
		<section data-slice-type={slice.slice_type} data-slice-variation={slice.variation} className="lg:h-screen">
			<div className="bg-mainBlue h-screen grid grid-rows-3 lg:grid-cols-3 justify-between text-white">
				<div className="lg:pt-[96px] row-span-2 lg:col-span-2 flex flex-col justify-center gap-8 px-12   max-w-4xl mx-auto">
					<PrismicRichText field={slice.primary.heading} components={components} />

					<motion.div
						initial={{ opacity: 0, y: 50 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{
							duration: 0.5,
							delay: 0.2,
							ease: "easeInOut",
						}}>
						<PrismicRichText field={slice.primary.intro} components={components} />
					</motion.div>
					<motion.div
						initial={{ opacity: 0, y: 50 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{
							duration: 0.5,
							delay: 0.3,
							ease: "easeInOut",
						}}>
						<Button field={slice.primary.button_link} className="mt-6 bg-white">
							{slice.primary.button_text}
						</Button>
					</motion.div>
				</div>

				<motion.div
					className="bg-white row-span-1 lg:h-screen"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{
						duration: 0.5,
						delay: 0.2,
						ease: "easeInOut",
					}}>
					<PrismicNextImage  priority field={slice.primary.image} className="h-full object-cover" width={900} imgixParams={{ fit: "crop" }}/>
				</motion.div>
			</div>
		</section>
	);
};

export default Landing;
