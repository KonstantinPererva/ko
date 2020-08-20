function SliderSection(node) {
    var self = this;
    self.node = node || null;

    if (!self.node) {return}

    self.container = self.node.querySelector('.section-slider-container') || null;
    self.btnPrev = self.node.querySelector('.section-slider-button-prev') || null;
    self.btnNext = self.node.querySelector('.section-slider-button-next') || null;

    if (!self.container) {return}

    self.slider = new Swiper(self.container, {
        slidesPerView: 5,
        // spaceBetween: 10,
        navigation: {
            nextEl: self.btnNext,
            prevEl: self.btnPrev,
        },
        breakpoints: {
            // when window width is >= 320px
            320: {
                slidesPerView: 1,
            },
            // when window width is >= 768
            640: {
                slidesPerView: 2,
            },
            // when window width is >= 992
            992: {
                slidesPerView: 3,
            },
            // when window width is >= 1280
            1280: {
                slidesPerView: 4,
            },
            // when window width is >= 1600
            1600: {
                slidesPerView: 5,
            }
        }
    });
}

if (document.querySelectorAll('.section-slider').length) {
    var sliderSections = [].slice.call(document.querySelectorAll('.section-slider'), 0);

    sliderSections.forEach(function (el) {
        el.slider = new SliderSection(el);
    })
}
