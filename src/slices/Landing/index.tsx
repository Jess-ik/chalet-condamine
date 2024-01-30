import Bounded from "@/components/Bounded";
import Button from "@/components/Button";
import { Content } from "@prismicio/client";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import { JSXMapSerializer, PrismicRichText, SliceComponentProps } from "@prismicio/react";

// Rich text styling
const components: JSXMapSerializer = {
	heading1: ({ children }) => <h1 className="font-heading text-8xl leading-[5rem]">{children}</h1>,
	paragraph: ({ children }) => <p className="text-3xl font-light">{children}</p>,
};

// Props for `Landing`.
export type LandingProps = SliceComponentProps<Content.LandingSlice>;

//Component for "Landing" Slices.
const Landing = ({ slice }: LandingProps): JSX.Element => {
	return (
		<Bounded data-slice-type={slice.slice_type} data-slice-variation={slice.variation}>
			<PrismicRichText field={slice.primary.heading} components={components} />
			<PrismicRichText field={slice.primary.intro} components={components} />
			<Button field={slice.primary.button_link}>{slice.primary.button_text}</Button>
			<PrismicNextImage field={slice.primary.image} />
		</Bounded>
	);
};

export default Landing;
