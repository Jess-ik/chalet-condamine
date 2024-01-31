"use client";

import { Content } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import { SliceComponentProps } from "@prismicio/react";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { useState } from "react";
import Modal from "react-modal";



/**
 * Props for `Gallery`.
 */
export type GalleryProps = SliceComponentProps<Content.GallerySlice>;

/**
 * Component for "Gallery" Slices.
 */
const Gallery = ({ slice }: GalleryProps): JSX.Element => {
	//Modal setup
	const [modalIsOpen, setModalIsOpen] = useState(false);
	const [selectedImageIndex, setSelectedImageIndex] = useState(0);

	const openModal = (index: number) => {
		setSelectedImageIndex(index);
		setModalIsOpen(true);
	};

	const closeModal = () => {
		setModalIsOpen(false);
	};

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
	};

	//Modal settings
	const customStyles = {
		content: {
		  top: '50%',
		  left: '50%',
		  right: 'auto',
		  bottom: 'auto',
		  marginRight: '-50%',
			transform: 'translate(-50%, -50%)',
	
		},
	  };
	return (
		<>
			<section data-slice-type={slice.slice_type} data-slice-variation={slice.variation} className="py-10">
				<Slider {...settings}>
					{/*  Images for the gallery */}
					{slice.items.map((item, index) => (
						<div key={index} className="px-4 cursor-pointer" onClick={() => openModal(index)}>
							<PrismicNextImage field={item.image} className="h-[450px] w-[600px] object-cover" />
						</div>
					))}
				</Slider>
			</section>

			{/* Modal */}
			<Modal isOpen={modalIsOpen} onRequestClose={closeModal} contentLabel="Image Modal" style={customStyles} className="">
				
				
				<button onClick={closeModal}>Close</button>
				<div className="flex flex-row gap-4">
				<button onClick={prevImage}>Previous</button>
					<PrismicNextImage field={slice.items[selectedImageIndex].image} className="h-[80vh] object-contain" />
					<button onClick={nextImage}>Next</button>
				</div>
			</Modal>
		</>
	);
};

export default Gallery;
