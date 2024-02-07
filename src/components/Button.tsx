import { PrismicNextLink, PrismicNextLinkProps } from "@prismicio/next";
import clsx from "clsx";

export default function Button({ className, ...restProps }: PrismicNextLinkProps) {
	return <PrismicNextLink className={clsx("block w-fit  hover:opacity-85 py-4 px-12 rounded-full text-mainBlue uppercase tracking-[0.2rem] font-medium transition ease-in-out !duration-700", className)} {...restProps} />;
}
