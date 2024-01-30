import { createClient } from "@/prismicio";
import { PrismicNextLink } from "@prismicio/next";
import Link from "next/link";

export default async function Footer() {
	// fetch data
	const client = createClient();
	const settings = await client.getSingle("settings");

	return (
		<footer>
			{settings.data.site_title}
            <p>Développement : <Link href="https://jess-louvel.com" target="_blank">Jessica Louvel</Link> - {new Date().getFullYear()}</p>
			<nav>
				<ul>
					{/* Navigation items */}
					{settings.data.navigation.map(({ link, link_label }) => (
						<PrismicNextLink field={link} key={link_label}>
							{link_label}
						</PrismicNextLink>
					))}
					{/*  CTA buttons */}
					{settings.data.cta.map(({ button_link, button_text }) => (
						<PrismicNextLink field={button_link} key={button_text}>
							{button_text}
						</PrismicNextLink>
					))}
				</ul>
			</nav>
		</footer>
	);
}
