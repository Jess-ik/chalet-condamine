import { Content, isFilled } from "@prismicio/client";
import { JSXMapSerializer, PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { createClient } from "@/prismicio";
import { getIconComponent } from "@/components/Icons";

// Rich text styling
const components: JSXMapSerializer = {
	heading3: ({ children }) => <h3 className="font-heading text-[4rem] leading-[6rem] font-extralight">{children}</h3>,
};

/**
 * Props for `Equipements`.
 */
export type EquipementsProps = SliceComponentProps<Content.EquipementsSlice>;

/**
 * Component for "Equipements" Slices.
 */
const Equipements = async ({ slice }: EquipementsProps): Promise<JSX.Element> => {
	return (
		<section data-slice-type={slice.slice_type} data-slice-variation={slice.variation} className="px-60">
			<PrismicRichText field={slice.primary.heading} components={components} />
			<ul className="grid grid-cols-3 justify-between border">
				{slice.items.map(
					(item, index) =>
						item && (
							<li key={index} className="flex items-center gap-4 py-4">
								{item.feature && <i>{getIconComponent(item.feature)}</i>}
								<p className="py-8 text-2xl font-light  ">{item.feature}</p>
							</li>
						)
				)}
			</ul>
		</section>
	);
};

export default Equipements;
