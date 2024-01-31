import Button from "@/components/Button";
import { Content } from "@prismicio/client";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import { JSXMapSerializer, PrismicRichText, SliceComponentProps } from "@prismicio/react";

// Rich text styling
const components: JSXMapSerializer = {
	heading2: ({ children }) => <h2 className="max-w-2xl uppercase text-base tracking-widest  font-light">{children}</h2>,
	heading3: ({ children }) => <h3 className="max-w-2xl  font-heading text-8xl leading-[6rem] font-light">{children}</h3>,
	paragraph: ({ children }) => <p className="text-2xl font-extralight  ">{children}</p>,
};

// Props for `CtA`.
export type CtAProps = SliceComponentProps<Content.CtASlice>;

//Component for "CtA" Slices.
const CtA = ({ slice }: CtAProps): JSX.Element => {
	return (
		<section data-slice-type={slice.slice_type} data-slice-variation={slice.variation} className="h-screen">
			<div className="bg-[#1F222E] grid grid-cols-3 justify-between text-white ">
				<PrismicNextImage field={slice.primary.image} className="h-screen object-cover" />
				<div className="col-span-2 flex flex-col justify-center px-24 gap-8 max-w-4xl mx-auto">
					<PrismicRichText field={slice.primary.subhead} components={components} />
					<PrismicRichText field={slice.primary.heading} components={components} />
					<PrismicRichText field={slice.primary.body} components={components} />

					<div className="flex gap-8">
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
