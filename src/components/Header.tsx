import { createClient } from "@/prismicio";
import { PrismicNextLink } from "@prismicio/next";
import Button from "./Button";
import Link from "next/link";
import Logo from "./Logo";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from "@nextui-org/react";

export default async function Header() {
	// fetch data
	const client = createClient();
	const settings = await client.getSingle("settings");

	const navbarStyle = {
		background: "rgba(31, 34, 46)", // Remplacez "your_color_here" par la couleur de fond souhaitée


	  };

	return (
		<Navbar shouldHideOnScroll isBlurred={false}  style={navbarStyle} className="py-4 px-20" maxWidth={'full'} >
			<NavbarBrand>
				<Link href="/">
					<Logo fillColor="#ffffff" />
				</Link>
			</NavbarBrand>

			<NavbarContent className="hidden sm:flex gap-4" justify="end">
				{/* Navigation items */}
				{settings.data.navigation.map(({ link, link_label }) => (
					<NavbarItem key={link_label}>
						<PrismicNextLink field={link} className="px-3 text-white">
							{link_label}
						</PrismicNextLink>
					</NavbarItem>
				))}
				{/* CTA items */}
				{settings.data.cta.map(({ button_link, button_text }) => (
					<NavbarItem key={button_text}>
						<Button field={button_link} key={button_text} className="bg-white text-sm py-2 px-6 text-center">
		 						{button_text}
							</Button>
					</NavbarItem>
				))}
			</NavbarContent>
		</Navbar>
		// <header className="w-full py-7 px-20 !mix-blend-difference absolute z-10  text-white">
		// 	<div className="flex gap-4 items-center justify-between flex-col sm:flex-row">
		// 		<Link href="/">
		// 			<Logo fillColor="#ffffff" />
		// 		</Link>

		// 		<nav>
		// 			<ul className="flex gap-6 items-center">
		// 				{/* Navigation items */}
		// 				{settings.data.navigation.map(({ link, link_label }) => (
		// 					<li key={link_label} className="">
		// 						<PrismicNextLink field={link} className="px-3">
		// 							{link_label}
		// 						</PrismicNextLink>
		// 					</li>
		// 				))}
		// 				{/*  CTA buttons */}
		// 				{settings.data.cta.map(({ button_link, button_text }) => (
		// 					<Button field={button_link} key={button_text} className="!bg-white !bg-blend-normal">
		// 						{button_text}
		// 					</Button>
		// 				))}
		// 			</ul>
		// 		</nav>
		// 	</div>
		// </header>
	);
}
