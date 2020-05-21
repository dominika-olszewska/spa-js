import $ from 'jquery';
import '../styles/home.scss';
import slide01 from '../assets/slide01.jpg';

const createLayout = () => {
    const html = `<h2>Home</h2>
<p>Lorem lorem loffe </p>
<div class="slideshow-container">

    <div class="mySlides fade">
        <div class="numbertext">1 / 3</div>
        <img src="./../slide01.jpg" style="width:100%">
        <div class="text">Caption Text</div>
    </div>

    <div class="mySlides fade">
        <div class="numbertext">2 / 3</div>
        <img src="../assets/slide02.jpg" style="width:100%">
        <div class="text">Caption Two</div>
    </div>

    <div class="mySlides fade">
        <div class="numbertext">3 / 3</div>
<!--        <img src="../assets/slide03.jpg" style="width:100%">-->
        <div class="img-slide"></div>
        <div class="text">Caption Three</div>
    </div>

</div>
<br>

<div style="text-align:center">
    <span class="dot"></span>
    <span class="dot"></span>
    <span class="dot"></span>
</div>
<div class="img-slide"></div>
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
