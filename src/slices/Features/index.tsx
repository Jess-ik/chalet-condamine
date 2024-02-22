"use client";
import { Content, isFilled } from "@prismicio/client";
import { JSXMapSerializer, PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { createClient } from "@/prismicio";
import { getIconComponent } from "@/components/Icons";
import { Accordion, AccordionItem } from "@nextui-org/react";
import { motion } from "framer-motion";

const title = {
	initial: {
		opacity: 0,
		scale: 0.8,
	},
	animate: {
		opacity: 1,
		scale: 1,
		transition: {
			duration: 0.3,
			ease: "easeInOut",
			delay: 0.1,
		},
	},
};

const animItem = {
	initial: {
		opacity: 0,
		scale: 0.8,
	},
	animate: (index: number) => ({
		opacity: 1,
		scale: 1,
		transition: {
			duration: 0.3,
			ease: "easeInOut",
			delay: 0.08 * (index + 1),
		},
	}),
};

// Rich text styling
const components: JSXMapSerializer = {
	heading3: ({ children }) => (
		<motion.h3 variants={title} initial="initial" whileInView="animate" className="pb-6 text-4xl font-heading md:text-[4rem] leading-[6rem] font-extralight">
			{children}
		</motion.h3>
	),
	paragraph: ({ children }) => <p className="py-8 pr-[50px] text-xl font-light text-slate-700">{children}</p>,
};

/**
 * Props for `Equipements`.
 */
export type EquipementsProps = SliceComponentProps<Content.EquipementsSlice>;

/**
 * Component for "Equipements" Slices.
 */
const Equipements = ({ slice }: EquipementsProps): JSX.Element => {
	const itemClasses = {
		titleWrapper: "!flex-none",
		indicator: "relative bottom-2 md:bottom-1 left-6 text-2xl",
	};

	return (
		<section data-slice-type={slice.slice_type} data-slice-variation={slice.variation} className="px-10 md:px-40 xl:px-56 2xl:px-60 md:py-12">
			<Accordion showDivider={true} defaultExpandedKeys={["appartement"]} itemClasses={itemClasses}>
				<AccordionItem key={slice.variation} aria-label={`Accordion ${slice.variation}`} title={<PrismicRichText field={slice.primary.heading} components={components} />}>
					<ul className="grid md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 justify-between px-6">
						{slice.items.map(
							(item, index) =>
								item && (
									<motion.li variants={animItem} custom={index} initial="initial" whileInView="animate" key={index} viewport={{ once: true }} className="flex items-center gap-4 md:py-4 ">
										{item.feature && <i>{getIconComponent(item.feature)}</i>}
										<PrismicRichText field={item.label} components={components} />
									</motion.li>
								)
						)}
					</ul>
				</AccordionItem>
			</Accordion>

			{/* <PrismicRichText field={slice.primary.heading} components={components} />
			<ul className="grid grid-cols-4 justify-between px-6">
				{slice.items.map(
					(item, index) =>
						item && (
							<li key={index} className="flex items-center gap-4 py-4 ">
								{item.feature && <i>{getIconComponent(item.feature)}</i>}
								<PrismicRichText field={item.label} components={components} />
							</li>
						)
				)}
			</ul> */}
		</section>
	);
};

export default Equipements;
