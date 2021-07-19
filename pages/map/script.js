const body = document.querySelector('body');
const hamburger = document.querySelector('.header__hamburger-btn');
const topMenu = document.querySelector('.header__list');
const themeSwitcher = document.querySelector('.switcher__checkbox');
const mapImg = document.querySelector('.map__img');

const sliderController = document.querySelector('.slider__controller');
const sliderArrows = document.querySelectorAll('.slider__arrow');
const slides = document.querySelectorAll('.map__slider-item');
let currentSlide = document.querySelector('.map__slider-item_selected');

const markers = document.querySelectorAll('.map__marker');

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



function changeSlide(newSlide) {
    currentSlide.classList.toggle('map__slider-item_selected');
    currentSlide = newSlide;
    currentSlide.classList.toggle('map__slider-item_selected');
    currentSlide.scrollIntoView({block: "nearest", behavior: "smooth", inline: "end"});
}

function updateWatchLink(name) {
    document.querySelector('#btn_watch').href = `../zoos/${name}`;
}

function selectMarkerBySlide(slide) {
    const selectedMarker = document.querySelector('.map__marker_selected');
    markers.forEach(marker => {
        if(marker.getAttribute('title') === slide.getAttribute('title')){
            marker.classList.toggle('map__marker_selected');
            selectedMarker.classList.toggle('map__marker_selected');
            updateWatchLink(slide.getAttribute('title'));
        }
    });
}

function updateSliderValue(value) {
    const slideInput = sliderController.lastElementChild;
    const slideValueField = sliderController.firstElementChild.firstElementChild;
    slideInput.value = value;
    slideValueField.innerText = `0${value}/`;
}

function updateSlide(slide, index) {
    changeSlide(slide);
    selectMarkerBySlide(slide);
    updateSliderValue(index + 1);
}


sliderController.addEventListener('input', () => {
    const slideInput = sliderController.lastElementChild;
    let newSlide = currentSlide.parentElement.children[slideInput.value - 1];
    updateSlide(newSlide, slideInput.value -1);
});


sliderArrows.forEach(arrow => {
    arrow.addEventListener('click', ()=> {
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
    
        updateSlide(newSlide, sliderValue - 1);
    });
})



function selectSlideByMarker(marker) {
    slides.forEach((slide,index) => {
        if(marker.getAttribute('title') === slide.getAttribute('title')){
            updateSlide(slide, index);
        }
    });
}

markers.forEach(marker => {
    marker.addEventListener('click', () => {
        selectSlideByMarker(marker);
    });
});

slides.forEach((slide,index) => {
    slide.addEventListener('click', () => {
        updateSlide(slide, index);
    });
});
