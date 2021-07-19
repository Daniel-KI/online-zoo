const body = document.querySelector('body');
const hamburger = document.querySelector('.header__hamburger-btn');
const topMenu = document.querySelector('.header__list');
const themeSwitcher = document.querySelector('.switcher__checkbox');
const mapImg = document.querySelector('.map__img');

const sliderControllers = document.querySelectorAll('.slider__controller');

const sliderArrows = document.querySelectorAll('.slider__arrow');

let currentPetSlide = document.querySelector('.pets__slider-item_selected');

hamburger.addEventListener('click', () => {
    topMenu.classList.toggle('header__list_display');
});

themeSwitcher.addEventListener('click', () => {
    body.classList.toggle('theme_dark');
    body.classList.toggle('theme_light');
    if(body.classList.contains('theme_light')) {
        mapImg.src = "../../assets/images/map.svg";
    } else {
        mapImg.src = "../../assets/images/map-dark.svg"
    }
});

const mapMarkers = document.querySelectorAll('.map__marker');
mapMarkers.forEach(marker => {
    const mapTooltip = document.querySelector('.map__tooltip');
    marker.addEventListener('mouseenter', () => {
        mapTooltip.classList.toggle('tooltip_hidden');
    });
    marker.addEventListener('mouseleave', () => {
        mapTooltip.classList.toggle('tooltip_hidden');
    });
});


sliderControllers.forEach(controller => {
    controller.addEventListener('input', () => {
        const currentSlide = controller.parentElement.querySelector('.slider__item_selected');
        const slideInput = controller.lastElementChild;
        const newSlideValue = slideInput.value;
        const newSlide = currentSlide.parentElement.children[newSlideValue - 1];

        changeSlide(currentSlide, newSlide);
        updateSliderValue(controller, newSlideValue);
    });
});


function changeSlide(oldSlide, newSlide) {
    oldSlide.classList.toggle('slider__item_selected');
    newSlide.classList.toggle('slider__item_selected');
    newSlide.scrollIntoView({block: "nearest", behavior: "smooth", inline: "end"});
};

function updateSliderValue(sliderController, value) {
    const slideInput = sliderController.lastElementChild;
    const slideValueField = sliderController.firstElementChild.firstElementChild;
    slideInput.value = value;
    slideValueField.innerText = `0${value}/`;
};

sliderArrows.forEach(arrow => {
    arrow.addEventListener('click', ()=> {
        const currentSlide = arrow.parentElement.parentElement.querySelector('.slider__item_selected');
        const sliderController = arrow.parentElement.parentElement.querySelector('.slider__controller');
        const sliderInput = sliderController.lastElementChild;

        let newSlide;
        let sliderValue;
        
        if(arrow.classList.contains('slider__left-arrow')){
            if(currentSlide.previousElementSibling) {
                newSlide = currentSlide.previousElementSibling ;
                sliderValue = Number(sliderInput.value) - 1;
            } else {
                newSlide = currentSlide.parentElement.lastElementChild;
                sliderValue =  sliderInput.getAttribute('max');
            }
        } else if(arrow.classList.contains('slider__right-arrow')) {
            if(currentSlide.nextElementSibling) {
                newSlide = currentSlide.nextElementSibling ;
                sliderValue =  Number(sliderInput.value) + 1;
            } else {
                newSlide = currentSlide.parentElement.firstElementChild;
                sliderValue =  1;
            }
        }
    
        changeSlide(currentSlide, newSlide);
        updateSliderValue(sliderController, sliderValue);
    });
});
