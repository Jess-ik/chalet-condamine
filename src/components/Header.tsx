"use client";

import React, { useEffect, useState } from "react";
import { createClient } from "@/prismicio";
import { PrismicNextLink } from "@prismicio/next";
import Button from "./Button";
import Link from "next/link";
import Logo from "./Logo";
import {
	Navbar,
	NavbarBrand,
	NavbarContent,
	NavbarItem,
	NavbarMenuToggle,
	NavbarMenu,
	NavbarMenuItem,
} from "@nextui-org/react";
import { motion } from "framer-motion";
import { SettingsDocument } from "../../prismicio-types";
import ThemeButton from "./ThemeButton";
import { useTheme } from "next-themes";

// animations
const logo = {
	initial: { opacity: 0, y: -30, filter: "blur(5px)" },
	animate: {
		opacity: 1,
		y: 0,
		filter: "blur(0px)",
		transition: { duration: 0.3, ease: "easeOut", delay: 0.08 },
	},
};

const item = {
	initial: { opacity: 0, y: -30, filter: "blur(5px)" },
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
	initial: { opacity: 0, y: -80, filter: "blur(5px)" },
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
	const [settings, setSettings] =
		useState<SettingsDocument<string> | null>(null);

	const [isMenuOpen, setIsMenuOpen] = useState(false);

	const { resolvedTheme } = useTheme();

	// ✅ IMPORTANT : évite mismatch SSR
	const [mounted, setMounted] = useState(false);
	useEffect(() => setMounted(true), []);

	useEffect(() => {
		const fetchData = async () => {
			const client = createClient();
			const settingsData = await client.getSingle("settings");
			setSettings(settingsData);
		};

		fetchData();
	}, []);

	// tant que pas mounted → on force dark (ou null-safe)
	const isDark = mounted ? resolvedTheme === "dark" : true;

	return (
		<Navbar
			isMenuOpen={isMenuOpen}
			onMenuOpenChange={setIsMenuOpen}
			shouldHideOnScroll
			isBlurred={false}
			maxWidth="full"
			classNames={{
				base: isDark ? "bg-mainBlue text-white" : "bg-mainGreen text-white",
			}}
			className="py-4 px-4 lg:px-20"
		>
			{/* LOGO */}
			<NavbarBrand>
				<motion.div
					variants={logo}
					initial="initial"
					animate="animate"
				>
					<Link href="/" aria-label="Chalet Condamin">
						<Logo fillColor="#ffffff" />
					</Link>
				</motion.div>
			</NavbarBrand>

			{/* DESKTOP */}
			<NavbarContent className="hidden lg:flex gap-4" justify="end">
				<NavbarMenuToggle
					aria-label={isMenuOpen ? "Close menu" : "Open menu"}
					className="sm:hidden text-white"
				/>

				{settings &&
					settings.data.navigation.map(
						({ link, link_label }, index) => (
							<motion.div
								key={index}
								variants={item}
								initial="initial"
								animate="animate"
								custom={index}
							>
								<NavbarItem>
									<PrismicNextLink
										field={link}
										className="px-3 text-white"
									>
										{link_label}
									</PrismicNextLink>
								</NavbarItem>
							</motion.div>
						)
					)}

				{settings &&
					settings.data.cta.map(
						({ button_link, button_text }, index) => (
							<motion.div
								key={index}
								variants={item}
								initial="initial"
								animate="animate"
								custom={index}
							>
								<NavbarItem>
									<Button
										field={button_link}
										className="bg-white text-sm py-2 px-6 text-center"
									>
										{button_text}
									</Button>
								</NavbarItem>
							</motion.div>
						)
					)}

				<motion.div variants={logo} initial="initial" animate="animate">
					<ThemeButton />
				</motion.div>
			</NavbarContent>

			{/* MOBILE MENU */}
			<NavbarMenu className="items-center pl-8 pt-24 gap-16">
				{settings &&
					settings.data.navigation.map(
						({ link, link_label }, index) => (
							<motion.div
								key={index}
								variants={menuItem}
								initial="initial"
								animate="animate"
								custom={index}
							>
								<NavbarMenuItem
									onClick={() => setIsMenuOpen(false)}
								>
									<PrismicNextLink
										field={link}
										className="px-3 text-white"
									>
										{link_label}
									</PrismicNextLink>
								</NavbarMenuItem>
							</motion.div>
						)
					)}

				{settings &&
					settings.data.cta.map(
						({ button_link, button_text }, index) => (
							<motion.div
								key={index}
								variants={menuItem}
								initial="initial"
								animate="animate"
								custom={index}
							>
								<NavbarMenuItem
									onClick={() => setIsMenuOpen(false)}
								>
									<Button
										field={button_link}
										className="bg-white text-sm py-2 px-6 text-center"
									>
										{button_text}
									</Button>
								</NavbarMenuItem>
							</motion.div>
						)
					)}

				<motion.div variants={logo} initial="initial" animate="animate">
					<ThemeButton />
				</motion.div>
			</NavbarMenu>

			{/* MOBILE TOGGLE */}
			<NavbarMenuToggle
				aria-label={isMenuOpen ? "Close menu" : "Open menu"}
				className="lg:hidden text-white"
			/>
		</Navbar>
	);
}