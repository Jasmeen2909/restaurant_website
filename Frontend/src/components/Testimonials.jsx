import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './Testimonials.css';

const Testimonial = () => {
    // Slider settings
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 2,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        centerMode: true,
        centerPadding: "40px", // Adjust padding for centering
    };

    // Testimonials data
    const testimonials = [
        {
            name: "Jasmeen Kaur",
            review: "Recently dined at Bella Vista Bistro, and I must say, it was an unforgettable experience! From the moment we walked in, the ambiance was warm and inviting, with soft lighting and tasteful decor that set the perfect mood for the evening.",
        },
        {
            name: "Poojan Prajapati",
            review: "Our dining experience started with a complimentary basket of freshly baked bread and a selection of gourmet olive oils for dipping. For starters, we chose the roasted red pepper hummus, which was creamy and bursting with flavor.",
        },
        {
            name: "Michael Lee",
            review: "Delicious meals with a cozy ambiance. A must-visit restaurant.",
        },
    ];

    return (
        <div className="testimonial_section">
            <h2>What Our Customers Say</h2>
            <Slider {...settings}>
                {testimonials.map((testimonial, index) => (
                    <div key={index} className="testimonial_item">
                        <p>"{testimonial.review}"</p>
                        <h4>- {testimonial.name}</h4>
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default Testimonial;
