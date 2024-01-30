import Button from "@/components/Button";
import { Content } from "@prismicio/client";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import { JSXMapSerializer, PrismicRichText, SliceComponentProps } from "@prismicio/react";

// Rich text styling
const components: JSXMapSerializer = {
	heading1: ({ children }) => <h1 className="font-heading text-8xl leading-[6rem] font-light">{children}</h1>,
	paragraph: ({ children }) => <p className="text-3xl font-extralight  ">{children}</p>,
};

// Props for `Landing`.
export type LandingProps = SliceComponentProps<Content.LandingSlice>;

//Component for "Landing" Slices.
const Landing = ({ slice }: LandingProps): JSX.Element => {
	return (
		<section data-slice-type={slice.slice_type} data-slice-variation={slice.variation} className="h-screen">
			<div className="bg-[#1F222E] grid grid-cols-3 justify-between text-white">
				<div className="col-span-2 flex flex-col justify-center px-24 gap-8">
					
						<PrismicRichText field={slice.primary.heading} components={components} />
						<PrismicRichText field={slice.primary.intro} components={components} />
						<Button field={slice.primary.button_link} className="mt-6 bg-white">{slice.primary.button_text}</Button>
					
				</div>
				<div className="h-sreen">
					<PrismicNextImage field={slice.primary.image} className="h-screen object-cover" />
				</div>
			</div>
		</section>
	);
};

export default Landing;
