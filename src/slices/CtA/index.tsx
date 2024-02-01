import Button from "@/components/Button";
import { Content } from "@prismicio/client";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import { JSXMapSerializer, PrismicRichText, SliceComponentProps } from "@prismicio/react";

// Rich text styling
const components: JSXMapSerializer = {
	heading2: ({ children }) => <h2 className="max-w-2xl uppercase text-base tracking-widest  font-light">{children}</h2>,
	heading3: ({ children }) => <h3 className="max-w-xl lg:max-w-2xl font-heading text-7xl md:text-8xl md:leading-[6rem] font-light">{children}</h3>,
	paragraph: ({ children }) => <p className="text-xl md:text-2xl font-thin md:font-extralight leading-[2rem]">{children}</p>,
};

// Props for `CtA`.
export type CtAProps = SliceComponentProps<Content.CtASlice>;

//Component for "CtA" Slices.
const CtA = ({ slice }: CtAProps): JSX.Element => {
	return (
		<section data-slice-type={slice.slice_type} data-slice-variation={slice.variation} className="h-screen">
			<div className="bg-[#1F222E] h-screen grid grid-rows-3 lg:grid-cols-3 justify-between text-white ">
				<div className="row-span-1">
					<PrismicNextImage field={slice.primary.image} className="h-full lg:h-screen object-cover" />
				</div>
				<div className="row-span-2 lg:row-span-3 lg:col-span-2 flex flex-col justify-center px-24 gap-8 max-w-4xl mx-auto">
					<PrismicRichText field={slice.primary.subhead} components={components} />
					<PrismicRichText field={slice.primary.heading} components={components} />
					<PrismicRichText field={slice.primary.body} components={components} />

					<div className="flex gap-8 flex-col md:flex-row">
						{/*  CTA buttons */}
						{slice.items.map(({ button_link, button_text }) => (
							<Button field={button_link} key={button_text} className="bg-white mt-6">
								{button_text}
							</Button>
						))}
					</div>
				</div>
			</div>
		</section>
	);
};

export default CtA;
