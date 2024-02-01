import Button from "@/components/Button";
import { Content } from "@prismicio/client";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import { JSXMapSerializer, PrismicRichText, SliceComponentProps } from "@prismicio/react";

// Rich text styling
const components: JSXMapSerializer = {
	heading1: ({ children }) => <h1 className="max-w-xl lg:max-w-2xl font-heading text-7xl md:text-8xl md:leading-[6rem] font-light">{children}</h1>,
	paragraph: ({ children }) => <p className="text-2xl md:text-3xl font-extralight ">{children}</p>,
};

// Props for `Landing`.
export type LandingProps = SliceComponentProps<Content.LandingSlice>;

//Component for "Landing" Slices.
const Landing = ({ slice }: LandingProps): JSX.Element => {
	return (
		<section data-slice-type={slice.slice_type} data-slice-variation={slice.variation} className="lg:h-screen">
			<div className="bg-[#1F222E] h-screen grid grid-rows-3 lg:grid-cols-3 justify-between text-white">
				<div className="row-span-2 lg:col-span-2 flex flex-col justify-center gap-8 px-12   max-w-4xl mx-auto">
					<PrismicRichText field={slice.primary.heading} components={components} />
					<PrismicRichText field={slice.primary.intro} components={components} />
					<Button field={slice.primary.button_link} className="mt-6 bg-white">
						{slice.primary.button_text}
					</Button>
				</div>
				<div className="bg-white row-span-1 lg:h-screen">
					<PrismicNextImage field={slice.primary.image} className="h-full object-cover" />
				</div>
			</div>
		</section>
	);
};

export default Landing;
