import $ from 'jquery';
import '../styles/home.scss';

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
<div class="text-container">
<span>Welcome to the IT-SPA,</span>
<div class="links">
<span><a href="treatments">see our offer  &</a></span>
<span><a href="rooms">  plan your stay</a></span>
</div>


</div>
<div class="white-container"></div>
    `;
    return html;
};

let slideIndex = 0;

const showSlides = () => {
    const slides = document.getElementsByClassName("mySlides");
    const dots = document.getElementsByClassName("dot");
    for (let i = 0; i < slides.length; i++) {
        slides[i] ? slides[i].style.display = "none" : null;
    }
    slideIndex++;
    if (slideIndex > slides.length) {slideIndex = 1}
    for (let i = 0; i < dots.length; i++) {
        dots[i] ? dots[i].className = dots[i].className.replace(" active", ""): null;
    }
    slides[slideIndex-1] ? slides[slideIndex-1].style.display = "block" : null;
    dots[slideIndex-1] ? dots[slideIndex-1].className += " active" : null;
    setTimeout(showSlides, 8000);
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


