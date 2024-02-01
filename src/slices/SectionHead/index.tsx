import { Content } from "@prismicio/client";
import { JSXMapSerializer, PrismicRichText, SliceComponentProps } from "@prismicio/react";

// Rich text styling
const components: JSXMapSerializer = {
	heading2: ({ children }) => <h2 className="max-w-3xl lg:max-w-4xl mx-auto font-heading text-7xl lg:text-8xl leading-[6rem] lg:leading-[7rem] font-light">{children}</h2>,
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
		<section id={slice.primary.anchor_id || undefined} data-slice-type={slice.slice_type} data-slice-variation={slice.variation}
			className="scroll-section pt-44 lg:pt-52 pb-24 text-center rounded-t-[50px]">
			<PrismicRichText field={slice.primary.heading} components={components}/>
		</section>
	);
};

export default SectionHead;
