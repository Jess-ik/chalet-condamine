"use client";
import { createClient } from "@/prismicio";
import { PrismicNextLink } from "@prismicio/next";
import Button from "./Button";
import Link from "next/link";
import Logo from "./Logo";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenuToggle, NavbarMenu, NavbarMenuItem } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { SettingsDocument } from "../../prismicio-types";

export default function Header() {
	// State pour stocker les données
	const [settings, setSettings] = useState<SettingsDocument<string> | null>(null);

	// State pour gérer l'état du menu
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	// Effet pour charger les données au montage du composant
	useEffect(() => {
		const fetchData = async () => {
			const client = createClient();
			const settingsData = await client.getSingle("settings");
			setSettings(settingsData);
		};

		fetchData();
	}, []); // L'utilisation de la dépendance vide [] assure que cet effet ne s'exécute qu'une fois au montage.

	const navbarStyle = {
		background: "rgba(31, 34, 46)",
	};

	const togleMenu = () => {
		setIsMenuOpen(!isMenuOpen);
		console.log(isMenuOpen);
	};

	return (
		<Navbar isMenuOpen={isMenuOpen} onMenuOpenChange={setIsMenuOpen} shouldHideOnScroll isBlurred={false} style={navbarStyle} className="py-4 px-4 lg:px-20" maxWidth={"full"}>
			<NavbarBrand>
				<Link href="/">
					<Logo fillColor="#ffffff" />
				</Link>
			</NavbarBrand>

			{/* Desktop menu */}
			<NavbarContent className="hidden lg:flex gap-4" justify="end">
				<NavbarMenuToggle aria-label={isMenuOpen ? "Close menu" : "Open menu"} className="sm:hidden text-white" />
				{/* Afficher les éléments de navigation uniquement si les données ont été chargées */}
				{settings && (
					<>
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
					</>
				)}
			</NavbarContent>

			{/* Mobile menu */}
			<NavbarMenu className="bg-[#1F222E] items-center pl-8 pt-24 gap-16">
				{/* Afficher les éléments de navigation uniquement si les données ont été chargées */}
				{settings && (
					<>
						{/* Navigation items */}
						{settings.data.navigation.map(({ link, link_label }) => (
							<NavbarMenuItem key={link_label} onClick={() => setIsMenuOpen(false)}>
								<PrismicNextLink field={link} className="px-3 text-white">
									{link_label}
								</PrismicNextLink>
							</NavbarMenuItem>
						))}
						{/* CTA items */}
						{settings.data.cta.map(({ button_link, button_text }) => (
							<NavbarMenuItem key={button_text} onClick={() => setIsMenuOpen(false)}>
								<Button field={button_link} key={button_text} className="bg-white text-sm py-2 px-6 text-center">
									{button_text}
								</Button>
							</NavbarMenuItem>
						))}
					</>
				)}
			</NavbarMenu>
			
			<NavbarMenuToggle aria-label={isMenuOpen ? "Close menu" : "Open menu"} className="lg:hidden text-white" />
		</Navbar>
	);
}
