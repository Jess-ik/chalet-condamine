import { PrismicNextLink, PrismicNextLinkProps } from "@prismicio/next";
import clsx from "clsx";

export default function Button({ className, ...restProps }: PrismicNextLinkProps) {
	return <PrismicNextLink className={clsx("block w-fit bg-white hover:bg-slate-100 transition-color duration-200 ease-in-out py-4 px-12 rounded-full text-[#1F222E] uppercase tracking-[0.2rem] font-medium ", className)} {...restProps} />;
}
