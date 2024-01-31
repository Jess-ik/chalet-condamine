"use client";
import { Content, isFilled } from "@prismicio/client";
import { JSXMapSerializer, PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { createClient } from "@/prismicio";
import { getIconComponent } from "@/components/Icons";
import { Accordion, AccordionItem } from "@nextui-org/react";

// Rich text styling
const components: JSXMapSerializer = {
	heading3: ({ children }) => <h3 className="pb-6 font-heading text-[4rem] leading-[6rem] font-extralight">{children}</h3>,
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
		indicator: "relative bottom-1 left-6 text-2xl",
	};
	
	return (
		<section data-slice-type={slice.slice_type} data-slice-variation={slice.variation} className="px-60 py-12">
			<Accordion showDivider={true} defaultExpandedKeys={["appartement"]} itemClasses={itemClasses}>
				<AccordionItem
					key={slice.variation}
					aria-label={`Accordion ${slice.variation}`}
					
					title={<PrismicRichText field={slice.primary.heading} components={components} />}>
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
