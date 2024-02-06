"use client";
import { createClient } from "@/prismicio";
import { PrismicNextLink } from "@prismicio/next";
import Button from "./Button";
import Link from "next/link";
import Logo from "./Logo";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenuToggle, NavbarMenu, NavbarMenuItem } from "@nextui-org/react";
import React, { useEffect, useId, useState } from "react";
import { SettingsDocument } from "../../prismicio-types";
import { motion } from "framer-motion";

const logo = {
	initial: {
		opacity: 0,
		y: -30,
		filter: "blur(5px)",
	},
	animate: {
		opacity: 1,
		y: 0,
		filter: "blur(0px)",
		transition: {
			duration: 0.3,
			ease: "easeOut",
			delay: 0.08,
		},
	},
};

const item = {
	initial: {
		opacity: 0,
		y: -30,
		filter: "blur(5px)",
	},
	animate: (index: number) => ({
		opacity: 1,
		y: 0,
		filter: "blur(0px)",
		transition: {
			duration: 0.3,
			ease: "easeOut",
			delay: 0.08 * (index + 1),
		},
	}),
};

const menuItem = {
	initial: {
		opacity: 0,
		y: -80,
		filter: "blur(5px)",
	},
	animate: (index: number) => ({
		opacity: 1,
		y: 0,
		filter: "blur(0px)",
		transition: {
			duration: 0.3,
			ease: "easeOut",
			delay: 0.08 * index,
		},
	}),
};

export default function Header() {
	// State pour stocker les données
	const [settings, setSettings] = useState<SettingsDocument<string> | null>(null);

	// State pour gérer l'état du menu
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	// Charger les données au montage du composant
	useEffect(() => {
		const fetchData = async () => {
			const client = createClient();
			const settingsData = await client.getSingle("settings");
			setSettings(settingsData);
		};

		fetchData();
	}, []);

	const navbarStyle = {
		background: "rgba(31, 34, 46)",
	};

	return (
		<Navbar isMenuOpen={isMenuOpen} onMenuOpenChange={setIsMenuOpen} shouldHideOnScroll isBlurred={false} style={navbarStyle} className="py-4 px-4 lg:px-20" maxWidth={"full"}>
			<NavbarBrand>
				<motion.div variants={logo} initial="initial" whileInView="animate" viewport={{ once: true }}>
					<Link href="/">
						<Logo fillColor="#ffffff" />
					</Link>
				</motion.div>
			</NavbarBrand>

			{/* Desktop menu */}
			<div className="text px-3">
				<NavbarContent className="hidden lg:flex gap-4" justify="end">
					<NavbarMenuToggle aria-label={isMenuOpen ? "Close menu" : "Open menu"} className="sm:hidden text-white" />

					{/* Afficher les éléments de navigation uniquement si les données ont été chargées */}
					{settings && (
						<>
							{/* Navigation items */}
							{settings.data.navigation.map(({ link, link_label }, index) => (
								<motion.div key={index} variants={item} initial="initial" whileInView="animate" custom={index} viewport={{ once: true }}>
									<NavbarItem>
										<PrismicNextLink key={link_label} field={link} className="px-3 text-white">
											{link_label}
										</PrismicNextLink>
									</NavbarItem>
								</motion.div>
							))}
							{/* CTA items */}
							{settings.data.cta.map(({ button_link, button_text }, index) => (
								<motion.div key={index} variants={item} initial="initial" whileInView="animate" custom={index} viewport={{ once: true }}>
									<NavbarItem key={button_text}>
										<Button field={button_link} key={button_text} className="bg-white text-sm py-2 px-6 text-center">
											{button_text}
										</Button>
									</NavbarItem>
								</motion.div>
							))}
						</>
					)}
				</NavbarContent>
			</div>

			{/* Mobile menu */}
			<NavbarMenu className="bg-[#1F222E] items-center pl-8 pt-24 gap-16">
				{/* Afficher les éléments de navigation uniquement si les données ont été chargées */}
				{settings && (
					<>
						{/* Navigation items */}
						{settings.data.navigation.map(({ link, link_label }, index) => (
							<motion.div key={index} variants={menuItem} initial="initial" whileInView="animate" custom={index} viewport={{ once: true }}>
								<NavbarMenuItem key={link_label} onClick={() => setIsMenuOpen(false)}>
									<PrismicNextLink field={link} className="px-3 text-white">
										{link_label}
									</PrismicNextLink>
								</NavbarMenuItem>
							</motion.div>
						))}
						{/* CTA items */}
						{settings.data.cta.map(({ button_link, button_text }, index) => (
							<motion.div key={index} variants={menuItem} initial="initial" whileInView="animate" custom={index} viewport={{ once: true }}>
								<NavbarMenuItem key={button_text} onClick={() => setIsMenuOpen(false)}>
									<Button field={button_link} key={button_text} className="bg-white text-sm py-2 px-6 text-center">
										{button_text}
									</Button>
								</NavbarMenuItem>
							</motion.div>
						))}
					</>
				)}
			</NavbarMenu>

			<NavbarMenuToggle aria-label={isMenuOpen ? "Close menu" : "Open menu"} className="lg:hidden text-white" />
		</Navbar>
	);
}
