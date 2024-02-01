import { Content } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import { JSXMapSerializer, PrismicRichText, SliceComponentProps } from "@prismicio/react";
import clsx from "clsx";

// Rich text styling
const components: JSXMapSerializer = {
	paragraph: ({ children }) => <p className="max-w-2xl mx-auto py-8 text-xl md:text-2xl lg:text-3xl font-extralight text-center ">{children}</p>,
};

/**
 * Props for `TextImage`.
 */
export type TextImageProps = SliceComponentProps<Content.TextImageSlice>;

/**
 * Component for "TextImage" Slices.
 */
const TextImage = ({ slice }: TextImageProps): JSX.Element => {
	return (
		<section data-slice-type={slice.slice_type} data-slice-variation={slice.variation} className="px-20 py-16 lg:py-24">
			<div className="grid lg:grid-cols-2 gap-20 items-center">
      <PrismicNextImage field={slice.primary.image} className={clsx(slice.variation === "imageRight" && "lg:order-2")}/>
				<PrismicRichText field={slice.primary.body} components={components} />
      </div>     
		</section>
	);
};

export default TextImage;
