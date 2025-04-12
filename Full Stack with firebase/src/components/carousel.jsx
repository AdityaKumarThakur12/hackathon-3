import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import '../styles/carousel.css'

const Carousel = ({ images, onSlideChange }) => {
    const bgColors = [
        'bg-gradient-to-br from-[#2b2d42] to-black',       // Twilight steel
        'bg-gradient-to-br from-[#4b3f72] to-black',       // Dusty violet
        'bg-gradient-to-br from-[#5e503f] to-black',       // Earthy dusk
        'bg-gradient-to-br from-[#4a5759] to-black',       // Stormy fog
        'bg-gradient-to-br from-[#1a1a2e] to-black',       // Midnight indigo + black
        'bg-gradient-to-br from-[#1e3d59] to-black',       // Deep ocean shadows
        'bg-gradient-to-br from-black via-[#1a1a2e] to-black', // Full blackened indigo core
      ];

    return (
        <>
            <div className="relative w-full pt-2 overflow-x-visible">

                {/* Carousel container */}
                <div className="relative w-full h-96 flex justify-center overflow-x-visible z-0">
                    <div className="w-full max-w-[1400px] px-4 overflow-hidden sm:overflow-visible">
                        <Swiper
                            modules={[Autoplay]}
                            loop={true}
                            centeredSlides={true}
                            autoplay={{
                                delay: 2000,
                                disableOnInteraction: false,
                            }}
                            breakpoints={{
                                320: {
                                    slidesPerView: 1.2,
                                    spaceBetween: 16,
                                },
                                640: {
                                    slidesPerView: 2,
                                    spaceBetween: 20,
                                },
                                768: {
                                    slidesPerView: 3,
                                    spaceBetween: 20,
                                },
                                1024: {
                                    slidesPerView: 4,
                                    spaceBetween: 24,
                                },
                                1280: {
                                    slidesPerView: 5,
                                    spaceBetween: 24,
                                },
                            }}
                            onSlideChange={(swiper) => {
                                onSlideChange(bgColors[swiper.realIndex % bgColors.length]);
                            }}
                            className="h-full"
                        >
                            {images.map((image, index) => (
                                <SwiperSlide key={index}>
                                    <div className="w-full h-full flex justify-center items-end">
                                        <div
                                            className={`slide-item border border-white transition-all duration-500 w-full max-w-[200px] overflow-hidden rounded-t-[100px] shadow-xl flex items-center justify-center px-2 ${bgColors[index % bgColors.length]}`}
                                        >
                                            <img
                                                src={image.url}
                                                alt={`Fashion ${index + 1}`}
                                                className="max-w-full h-[300px] object-cover"
                                            />
                                        </div>
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                </div>

                {/* ⬇️ Gradient overlay (at bottom) */}
                <div className="pointer-events-none absolute bottom-0 left-0 w-full h-[160px] z-10 overflow-hidden">
                    <svg
                        viewBox="0 0 1440 320"
                        xmlns="http://www.w3.org/2000/svg"
                        preserveAspectRatio="none"
                        className="w-full h-full"
                    >
                        <path
                            fill="#000"
                            d="M0,224 C360,320 1080,160 1440,256 L1440,320 L0,320 Z"
                        />
                        <path
                            fill="#000"
                            d="M0,256 C400,352 1040,192 1440,288 L1440,320 L0,320 Z"
                        />
                        <path
                            fill="#000"
                            d="M0,288 C480,384 960,224 1440,320 L1440,320 L0,320 Z"
                        />
                    </svg>
                </div>

            </div>
        </>
    );
};

export default Carousel;
