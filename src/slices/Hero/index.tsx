import Button from "@/components/Button";
import { Content } from "@prismicio/client";
import { JSXMapSerializer, PrismicRichText, SliceComponentProps } from "@prismicio/react";

// Rich text styling
const components: JSXMapSerializer = {
	heading2: ({ children }) => <h2 className="text-2xl uppercase tracking-wider">{children}</h2>,
	heading3: ({ children }) => <h3 className="font-heading text-8xl leading-[6rem] font-light">{children}</h3>,
	paragraph: ({ children }) => <p className="py-8 text-3xl font-extralight  ">{children}</p>,
};

/**
 * Props for `Hero`.
 */
export type HeroProps = SliceComponentProps<Content.HeroSlice>;

/**
 * Component for "Hero" Slices.
 */
const Hero = ({ slice }: HeroProps): JSX.Element => {
	const backgroundImg = slice.primary.background.url;
	return (
		<section
			data-slice-type={slice.slice_type}
			data-slice-variation={slice.variation}
			style={{
				backgroundImage: `url(${backgroundImg})`,
			}}
			className="h-screen bg-cover flex justify-center items-center">
			<div className="mx-auto w-full max-w-4xl text-center flex flex-col gap-8 ">
				<PrismicRichText field={slice.primary.heading2} components={components} />
				<PrismicRichText field={slice.primary.heading3} components={components} />
				<PrismicRichText field={slice.primary.body} components={components} />

				<div className="flex justify-center gap-8">
					{/*  CTA buttons */}
					{slice.items.map(({ button_link, button_text }) => (
						<Button field={button_link} key={button_text} className="border-2 border-black">
							{button_text}
						</Button>
					))}
				</div>
			</div>
		</section>
	);
};

export default Hero;
