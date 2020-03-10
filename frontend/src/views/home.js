import $ from 'jquery';
import '../styles/home.scss';

const createLayout = () => {
    const html = `
        <h2>Home</h2>
        <p>Lorem lorem loffe </p>
        <div class="slideshow-container">
            <div class="slide img01 fade">
              <div class="numbertext">1 / 3</div>
<!--                <img src="../assets/slide01.jpg" style="width:100%">-->
            </div>
            <div class="slide img02 fade">
              <div class="numbertext">2 / 3</div>
            </div>
            <div class="slide img03 fade">
              <div class="numbertext">3 / 3</div>
            </div>
        </div>
    `;
    return html;
};

const showSlides = () => {
    let slideIndex = 0;
    const slides = $('.slide');
    console.log('slides:', slides);
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = 'block';
    }
    slideIndex++;
    if (slideIndex > slides.length) {
        slideIndex = 1
    }
    slides[slideIndex - 1].style.display = "block";
    setTimeout(showSlides, 2000);
}

export const home = () => {
    const fragment = $(new DocumentFragment());

    fragment
        .append(createLayout());

    fragment.ready(() => {
        showSlides();
    });
    return Promise.resolve(fragment);
};
