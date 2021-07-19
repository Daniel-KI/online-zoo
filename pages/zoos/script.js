const body = document.querySelector('body');
const hamburger = document.querySelector('.header__hamburger-btn');
const topMenu = document.querySelector('.header__list');
const themeSwitcher = document.querySelector('.switcher__checkbox');

const videoSliderItems = document.querySelectorAll('.zoo__slider-item');

const sliderArrows = document.querySelectorAll('.slider__arrow');
let currentSlide = document.querySelector('.menu__slider-item_selected');

themeSwitcher.addEventListener('click', () => {
    body.classList.toggle('theme_dark');
    body.classList.toggle('theme_light');
});

hamburger.addEventListener('click', () => {
    topMenu.classList.toggle('header__list_display');
});

videoSliderItems.forEach(videoSliderItem => {
    videoSliderItem.addEventListener('click', () => {
        const sliderVideo = videoSliderItem.firstElementChild.firstElementChild;
        const mainVideo = document.querySelector('.zoo__iframe');
        const newLink = sliderVideo.src;

        sliderVideo.src = mainVideo.src;
        mainVideo.src = newLink;
    });
});



function changeSlide(newSlide) {
    currentSlide.classList.toggle('menu__slider-item_selected');
    currentSlide = newSlide;
    currentSlide.classList.toggle('menu__slider-item_selected');
    currentSlide.scrollIntoView({block: "nearest", behavior: "smooth", inline: "end"});
}

sliderArrows.forEach(arrow => {
    arrow.addEventListener('click', ()=> {
        let newSlide;
        if(arrow.classList.contains('slider__left-arrow')){
            if(currentSlide.previousElementSibling) {
                newSlide = currentSlide.previousElementSibling ;
            } else {
                newSlide = currentSlide.parentElement.lastElementChild;
            }
        } else if(arrow.classList.contains('slider__right-arrow')) {
            if(currentSlide.nextElementSibling) {
                newSlide = currentSlide.nextElementSibling ;
            } else {
                newSlide = currentSlide.parentElement.firstElementChild;
            }
        }

        changeSlide(newSlide);
    });
})