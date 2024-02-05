import type { Metadata, ResolvingMetadata } from "next";
import { Jost, Cormorant } from "next/font/google";
import "./globals.css";
import clsx from "clsx";
import { createClient } from "@/prismicio";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Providers } from "./providers";

const cormorant = Cormorant({
	subsets: ["latin"],
	variable: "--font-cormorant",
	display: "swap",
});

const jost = Jost({
	subsets: ["latin"],
	variable: "--font-jost",
	display: "swap",
});

// Dynamic metadata from settings custom type
export async function generateMetadata(): Promise<Metadata> {
	const client = createClient();

	//fetch settings custom type data
	const settings = await client.getSingle("settings");

	return {
		title: settings.data.site_title || "Chalet Condamin",
		description: settings.data.meta_description || "Découvrez l'authenticité de Vallouise et reservez votre séjour dans notre appartement de 50m2 avec jardin et voûtes d'origine.",
		openGraph: {
			images: [settings.data.og_image.url || ""],
		},
	};
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" className={clsx(jost.variable, cormorant.variable, "scroll-smooth")}>
			<body className="font-body">
				<Providers>
				<Header />
				{children}
					<Footer />
					</Providers>
			</body>
		</html>
	);
}
