import { createClient } from "@/prismicio";
import { PrismicNextLink } from "@prismicio/next";

export default async function Header() {
	// fetch data
	const client = createClient();
	const settings = await client.getSingle("settings");

	return (
		<header>
			{settings.data.site_title}

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
		</header>
	);
}
