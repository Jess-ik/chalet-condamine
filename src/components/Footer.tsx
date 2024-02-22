"use client";
import { createClient } from "@/prismicio";
import { PrismicNextLink } from "@prismicio/next";
import Link from "next/link";
import Logo from "./Logo";
import Button from "./Button";
import { JSXMapSerializer, PrismicRichText } from "@prismicio/react";
import { SettingsDocument } from "../../prismicio-types";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

// Animations
const title = {
	initial: {
		opacity: 0,
		scale: 0.8,
	},
	animate: {
		opacity: 1,
		scale: 1,
		transition: {
			duration: 0.3,
			ease: "easeOut",
			delay: 0.1,
		},
	},
};
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
// Rich text styling
const components: JSXMapSerializer = {
	heading4: ({ children }) => (
		<motion.h4 variants={title} initial="initial" whileInView="animate" className="max-w-2xl  font-heading text-3xl leading-[6rem] font-light">
			{children}
		</motion.h4>
	),
};

export default function Footer() {
	// State pour stocker les données
	const [settings, setSettings] = useState<SettingsDocument<string> | null>(null);
	// Charger les données au montage du composant
	useEffect(() => {
		const fetchData = async () => {
			const client = createClient();
			const settingsData = await client.getSingle("settings");
			setSettings(settingsData);
		};

		fetchData();
	}, []);

	return (
		<footer className="w-full pb-7  text-mainBlue">
			{/* First Section */}
			<div className=" grid grid-rows-2 lg:grid-rows-1 grid-cols-1 lg:grid-cols-3 justify-between  ">
				<div className="flex justify-center">
					{settings && (
						<>
							{/*  Contact info */}
							{settings.data.contact.map(({ heading, name, adress, mail, tel }) => (
								<div key={name} className="col-span-1 flex flex-col justify-center lg:max-w-4xl mx-auto py-6">
									<PrismicRichText field={heading} components={components} />

									<motion.p variants={title} initial="initial" whileInView="animate" className="text-l tracking-wide leading-7 font-extralight pb-6 ">
										{name}
										<br />
										{adress} <br />
										{mail} <br />
										{tel}
									</motion.p>
								</div>
							))}
						</>
					)}
				</div>

				<div className="col-span-2 bg-slate-300">
					<iframe title="Google maps" src="https://www.google.com/maps/embed?pb=!1m13!1m8!1m3!1d11316.143687065312!2d6.4589136!3d44.8412018!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zNDTCsDUwJzI5LjAiTiA2wrAyNyc1NS45IkU!5e0!3m2!1sen!2sfr!4v1706698081040!5m2!1sen!2sfr" width="100%" height="100%" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
				</div>
			</div>
			{/* Second Section */}
			<div className="px-20 pt-7 flex gap-4 items-center justify-between flex-col sm:flex-row">
				<motion.div variants={logo} initial="initial" whileInView="animate">
					<Link href="/">
						<Logo fillColor="#1F222E" />
					</Link>
				</motion.div>
				<motion.div variants={item} initial="initial" whileInView="animate">
					<Link href="https://jess-louvel.com" className="text-sm font-light tracking-wide">
						Developed with ♥️ by <strong>Jessica Louvel</strong>
					</Link>
				</motion.div>
				<nav className="hidden lg:block">
					<ul className="flex gap-6 items-center">
						{settings && (
							<>
								{/* Navigation items */}
								{settings.data.navigation.map(({ link, link_label }, index) => (
									<motion.div key={index} variants={item} initial="initial" whileInView="animate" custom={index}>
										<PrismicNextLink field={link} key={link_label} className="px-3 text-sm">
											{link_label}
										</PrismicNextLink>
									</motion.div>
								))}
								{/*  CTA buttons */}
								{settings.data.cta.map(({ button_link, button_text }, index) => (
									<motion.div key={index} variants={item} initial="initial" whileInView="animate" custom={index}>
										<Button field={button_link} key={button_text} className="bg-mainBlue text-sm py-2 px-6 text-center !text-white">
											{button_text}
										</Button>
									</motion.div>
								))}
							</>
						)}
					</ul>
				</nav>
			</div>
		</footer>
	);
}
