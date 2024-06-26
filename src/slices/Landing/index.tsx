"use client";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { useState } from "react";
import Button from "@/components/Button";
import { Content } from "@prismicio/client";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import { JSXMapSerializer, PrismicRichText, SliceComponentProps } from "@prismicio/react";

// Rich text styling
const components: JSXMapSerializer = {
    heading1: ({ text }: { text?: string }) => (
        <h1 className="lg:max-w-2xl font-heading text-5xl md:text-8xl md:leading-[6rem] font-light">
            {text?.split(" ").map((word: string, index: number) => (
                <motion.div key={index} variants={animTitle} initial="initial" whileInView="animate" custom={index} viewport={{ once: true }}>
                    <motion.span key={index}>{word} </motion.span>
                </motion.div>
            ))}
        </h1>
    ),
    paragraph: ({ children }) => <p className="text-2xl md:text-3xl font-extralight">{children}</p>,
};

const animTitle = {
    initial: {
        opacity: 0,
        y: 30,
    },
    animate: (index: number) => ({
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.3,
            ease: "easeOut",
            delay: 0.08 * (index + 1),
        },
    }),
};

// Props for `Landing`.
export type LandingProps = SliceComponentProps<Content.LandingSlice>;

// Component for "Landing" Slices.
const Landing = ({ slice }: LandingProps): JSX.Element => {
    const { resolvedTheme } = useTheme(); // Récupère le thème actuellement sélectionné
    const [imageLoaded, setImageLoaded] = useState(false); // État pour gérer le chargement de l'image

    return (
        <section data-slice-type={slice.slice_type} data-slice-variation={slice.variation} className="lg:h-screen">
            <div className="bg-mainGreen dark:bg-mainBlue w-full h-screen grid grid-rows-3 lg:grid-cols-3 justify-between text-white">
                <div className="lg:pt-[96px] row-span-2 lg:col-span-2 flex flex-col justify-center gap-8 px-12 max-w-4xl mx-auto">
                    <PrismicRichText field={slice.primary.heading} components={components} />

                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                            duration: 0.5,
                            delay: 0.2,
                            ease: "easeInOut",
                        }}
                    >
                        <PrismicRichText field={slice.primary.intro} components={components} />
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                            duration: 0.5,
                            delay: 0.3,
                            ease: "easeInOut",
                        }}
                    >
                        <Button field={slice.primary.button_link} className="mt-6 bg-white">
                            {slice.primary.button_text}
                        </Button>
                    </motion.div>
                </div>
                {/* Image Hiver */}
                {resolvedTheme === "dark" && (
                    <motion.div
                        className="bg-white row-span-1 lg:h-screen"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{
                            duration: 0.5,
                            delay: 0.2,
                            ease: "easeInOut",
                        }}
                    >
                        <PrismicNextImage
                            priority
                            field={slice.primary.image_winter}
                            className="w-screen lg:w-full h-full object-cover"
                            sizes="33vw"
                            imgixParams={{ fit: "crop", auto: "format" }}
                        />
                    </motion.div>
                )}
                {/* Image Eté */}
                {resolvedTheme === "light" && (
                    <motion.div
                        className="bg-white row-span-1 lg:h-screen"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{
                            duration: 0.5,
                            delay: 0.2,
                            ease: "easeInOut",
                        }}
                    >
                        <PrismicNextImage
                            priority
                            field={slice.primary.image_summer}
                            className="w-screen lg:w-full h-full object-cover"
                            sizes="33vw"
                            imgixParams={{ fit: "crop", auto: "format" }}
                            onLoad={() => setImageLoaded(true)} // Gérer le chargement de l'image
                        />
                    </motion.div>
                )}
            </div>
        </section>
    );
};

export default Landing;
