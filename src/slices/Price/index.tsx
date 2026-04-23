import Button from "@/components/Button";
import { Content } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import { SliceComponentProps } from "@prismicio/react";

/**
 * Props for `Price`.
 */
export type PriceProps = SliceComponentProps<Content.PriceSlice>;

/**
 * Component for "Price" Slices.
 */
const Price = ({ slice }: PriceProps): JSX.Element => {
	return (
		<section data-slice-type={slice.slice_type} data-slice-variation={slice.variation} className=" scroll-section  pb-24 text-center rounded-t-[50px] flex flex-col justify-center items-center">
			<p className="lg:max-w-4xl ">{slice.primary.description}</p>
			<Button field={slice.primary.button_link} key={slice.primary.button_name} className="border border-mainBlue text-xs text-mainBlue px-6 my-12 hover:bg-mainBlue hover:text-white">
				Demander un devis
			</Button>
			<div className="flex flex-col lg:flex-row justify-center gap-6 px-32 pt-16">
				{slice.items.map(
					(item, index) =>
						item && (
							<div key={index} className={`grid grid-cols-1 md:grid-cols-3 gap-6 w-full p-6 md:p-8 rounded-[12px]   ${index === 0 ? "bg-[#4A6B5230]" : "bg-[#d5daeb90]"}`}>
								<PrismicNextImage
    className="rounded-[10px] object-cover w-full h-full"
    field={item.image}
    sizes="(max-width: 1024px) 100vw, 33vw"
    imgixParams={{ fit: "crop", auto: "format" }}
  />
								<div className="py-2 md:col-span-2 flex flex-col justify-between items-start text-left">
									<div>
										<h3>{item.product_name}</h3>
										<p>{item.product_description}</p>
									</div>

									<div>
										<p className="font-medium text-[1rem]">A PARTIR DE:</p>
										<p>{item.price}</p>
									</div>
							
									<Button field={item.button_link} key={item.button_name} className={`text-xs text-white mt-6 p-6 ${index === 0 ? "bg-mainGreen" : "bg-mainBlue"}`} >
										DEVIS
									</Button>
								</div>
							</div>
						)
				)}
			</div>
		</section>
	);
};

export default Price;
