"use client";

import { Content } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import { SliceComponentProps } from "@prismicio/react";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { useState } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";

/**
 * Props for `Gallery`.
 */
export type GalleryProps = SliceComponentProps<Content.GallerySlice>;

/**
 * Component for "Gallery" Slices.
 */
const Gallery = ({ slice }: GalleryProps): JSX.Element => {
	//Modal setup
	const { isOpen, onOpen, onOpenChange } = useDisclosure();
	const [selectedImageIndex, setSelectedImageIndex] = useState(0);

	const nextImage = () => {
		setSelectedImageIndex((prevIndex) => (prevIndex + 1) % slice.items.length);
	};

	const prevImage = () => {
		setSelectedImageIndex((prevIndex) => (prevIndex - 1 + slice.items.length) % slice.items.length);
	};

	//Slider settings
	const settings = {
		className: "center",
		centerMode: true,
		infinite: true,
		slidesToShow: 1,
		slidesToScroll: 1,
		autoplay: true,
		speed: 4000,
		autoplaySpeed: 4000,
		cssEase: "linear",
		row: 1,
		variableWidth: true,
		responsive: [
			{
			  breakpoint: 768, // Adjust this breakpoint based on your design
			  settings: {
				slidesToShow: 1,
				slidesToScroll: 1,
				  variableWidth: false,
				  centerPadding: '50px',
			  },
			},
		  ],
	};

	return (
		<>
			<section data-slice-type={slice.slice_type} data-slice-variation={slice.variation} className="h-unit-8xl md:h-auto ">
				<Slider {...settings}>
					{/* Images for the gallery */}
					{slice.items.map((item, index) => (
						<div key={index} className="px-4 cursor-pointer">
							<Button
								onPress={() => {
									setSelectedImageIndex(index);
									onOpen();
								}}
								key={index}
								className="w-full h-full md:h-[450px] md:w-[600px] rounded-none px-0">
								<PrismicNextImage field={item.image} className="h-[450px] w-[600px] object-cover" />
							</Button>
						</div>
					))}
				</Slider>
			</section>

			{/* Modal */}
			<Modal isOpen={isOpen} onOpenChange={onOpenChange} backdrop="blur" size="5xl">
				<ModalContent>
					{(onClose) => (
						<>
							<ModalHeader className="flex flex-col gap-1">Galerie du Chalet Condamin</ModalHeader>
							<ModalBody>
								<PrismicNextImage field={slice.items[selectedImageIndex].image} className="h-[50vh] object-contain" />
							</ModalBody>
							<ModalFooter className="justify-center gap-8">
								
								<Button className="text-slate-500 border rounded-full bg-transparent" onPress={prevImage}>
									Prev
								</Button>
								<Button className="text-slate-500 border rounded-full bg-transparent" onPress={nextImage}>
									Next
									</Button>
									
							</ModalFooter>
						</>
					)}
				</ModalContent>
			</Modal>
		</>
	);
};

export default Gallery;
