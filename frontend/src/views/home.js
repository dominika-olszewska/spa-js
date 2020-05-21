import $ from 'jquery';
import '../styles/home.scss';
import slide01 from '../assets/slide01.jpg';

const createLayout = () => {
    const html = `
<div class="slideshow-container">

    <div class="mySlides ">
        <div class="img-slide slide01"></div>  
    </div>

    <div class="mySlides ">
        <div class="img-slide slide02"></div>  
    </div>

    <div class="mySlides ">
        <div class="img-slide slide03"></div>
    </div>
</div>
<div class="dots">
    <span class="dot"></span>
    <span class="dot"></span>
    <span class="dot"></span>
</div>
    `;
    return html;
};
let slideIndex = 0;

const showSlides = () => {
    const slides = document.getElementsByClassName("mySlides");
    const dots = document.getElementsByClassName("dot");
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slideIndex++;
    if (slideIndex > slides.length) {slideIndex = 1}
    for (let i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex-1].style.display = "block";
    dots[slideIndex-1].className += " active";
    setTimeout(showSlides, 5000);
};

export const home = () => {
    const fragment = $(new DocumentFragment());

    fragment
        .append(createLayout());

    fragment.ready(() => {
        showSlides();
    });
    return Promise.resolve(fragment);
};
