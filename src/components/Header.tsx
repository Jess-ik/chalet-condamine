import { createClient } from "@/prismicio";
import { PrismicNextLink } from "@prismicio/next";
import Button from "./Button";
import Link from "next/link";
import Logo from "./Logo";

export default async function Header() {
	// fetch data
	const client = createClient();
	const settings = await client.getSingle("settings");

	return (
		<header className="w-full py-7 px-20  bg-[#1F222E] text-white">
            <div className="flex gap-4 items-center justify-between flex-col sm:flex-row">
                <Link href="/">
                    <Logo />
                </Link>
				

				<nav>
					<ul className="flex gap-6 items-center">
						{/* Navigation items */}
						{settings.data.navigation.map(({ link, link_label }) => (
							<PrismicNextLink field={link} key={link_label} className="px-3">
								{link_label}
							</PrismicNextLink>
						))}
						{/*  CTA buttons */}
						{settings.data.cta.map(({ button_link, button_text }) => (
							<Button field={button_link} key={button_text}>
								{button_text}
							</Button>
						))}
					</ul>
				</nav>
			</div>
		</header>
	);
}
