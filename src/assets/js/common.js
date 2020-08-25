// open dropdown block

function _instanceof(left, right) { if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) { return !!right[Symbol.hasInstance](left); } else { return left instanceof right; } }

function _classCallCheck(instance, Constructor) { if (!_instanceof(instance, Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Slide = function () {
    function Slide(node, opt) {
        _classCallCheck(this, Slide);

        this.opt = opt || {};
        this.option = Object.assign({
            btn: '[data-button]',
            box: '[data-box-dropdown]',
            boxInner: '[data-box-inner]',
            indicator: '[data-indicator]',
            transition: 600,
            onOpen: null
        }, this.opt);
        this.node = node;
        this.btn = this.node.querySelector(this.option.btn);
        this.box = this.node.querySelector(this.option.box);
        this.boxInner = this.node.querySelector(this.option.boxInner);
        this.indicator = this.node.querySelector(this.option.indicator);
        this.indicator.style.transition = this.option.transition + 'ms';
        this.node.style.transition = this.option.transition + 'ms';
        this.box.style.transition = this.option.transition + 'ms';
        this.heightBox = null;
        this.open = false;
    }

    _createClass(Slide, [{
        key: "down",
        value: function down() {
            var _this = this;

            function getSizeBoxes(elem) {
                var elemWidth = elem.getBoundingClientRect().right - elem.getBoundingClientRect().left;
                var elemHeight = elem.getBoundingClientRect().bottom - elem.getBoundingClientRect().top;
                return {
                    width: elemWidth,
                    height: elemHeight
                };
            }

            var downBlock = new Promise(function (resolve, reject) {
                _this.box.style.opacity = '0';
                _this.heightBox = getSizeBoxes(_this.boxInner).height;
                _this.box.style.height = '0';
                resolve();
            }).then(function () {
                setTimeout(function () {
                    _this.box.style.opacity = '1';
                    _this.box.style.height = _this.heightBox + 'px';
                    _this.indicator.style.transition = _this.option.transition + 'ms';

                    _this.indicator.classList.add('open');
                    _this.node.classList.add('open');

                    _this.open = true;
                }, 0);
            });
        }
    }, {
        key: "up",
        value: function up() {
            var _this2 = this;

            var upBlock = new Promise(function (resolve, reject) {
                _this2.box.style.height = '0';
                _this2.box.style.opacity = '0';

                _this2.indicator.classList.remove('open');
                _this2.node.classList.remove('open');

                resolve();
            }).then(function () {
                setTimeout(function () {
                    _this2.open = false;
                }, _this2.option.transition);
            });
        }
    }]);

    return Slide;
}();

if(document.querySelectorAll('.accordion-list-item').length) {
    var slides = document.querySelectorAll('.accordion-list-item');

    [].forEach.call(slides, function (el) {
        var slide = new Slide(el, {
            transition: 300
        });

        slide.toggle = function () {
            return slide.open ? slide.up() : slide.down();
        };

        slide.btn.addEventListener('click', slide.toggle);
    });
}

/////////////////
////////////////
////////////////
////////////////
///////////////////
// Parallax

if(document.querySelectorAll('.banner-section-bg img').length) {
    var image = document.querySelectorAll('.banner-section-bg img');
    new simpleParallax(image, {
        // delay: .4,
        // transition: 'cubic-bezier(0,0,0,1)',
        orientation: 'down',
        scale: 1.5
    });
}

/////////////////
////////////////
////////////////
////////////////
///////////////////
// slider init

document.addEventListener('DOMContentLoaded', function () {
    if (document.querySelector('.slider-specialist')) {
        var bannerSlider = new Swiper('.slider-specialist', {
            slidesPerView: 1,
            spaceBetween: 10,
            speed: 600,
            loop: true,
            navigation: {
                prevEl: '.slider-main-prev',
                nextEl: '.slider-main-next',
            }
        });
    }

    if (document.querySelector('.slider-video')) {
        var videoSlider = new Swiper('.slider-video', {
            slidesPerView: 1,
            spaceBetween: 10,
            speed: 600,
            loop: false,
            navigation: {
                prevEl: '#slider-video-button-prev',
                nextEl: '#slider-video-button-next',
            }
        });
    }
});

/////////////////
////////////////
////////////////
////////////////
///////////////////
// play video

var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";

var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

function PlayVideo(node) {
    var self = this;

    self.node = node;
    self.btn = self.node.querySelector('.video-card-button');
    self.prevideo = self.node.querySelector('.video-card-img');
    self.videoBox = self.node.querySelector('.video-card-iframe');
    self.player = null;

    self.createIframe = function() {
        new Promise(function (resolve, reject) {
            self.videoBox.style.display = 'block';
            self.iframe = document.createElement('div');
            self.iframe.setAttribute('id', 'player-' + self.videoBox.dataset.id);
            self.videoBox.append(self.iframe);

            resolve();
        }).then(function () {
            self.player  = new YT.Player('player-' + self.videoBox.dataset.id, {
                videoId: self.videoBox.dataset.src,
                events: {
                    'onReady': onPlayerReady,
                    'onStateChange': onPlayerStateChange
                }
            });
        });
    }

    function onPlayerStateChange(event) {
        document.getElementById('slider-video-button-prev').addEventListener('click', function () {
            if (event.data == 1 ) {
                setTimeout(function () {
                    event.target.pauseVideo();
                },10)
            }
        })
        document.getElementById('slider-video-button-next').addEventListener('click', function () {
            if (event.data == 1 ) {
                setTimeout(function () {
                    event.target.pauseVideo();
                },10)
            }
        })
    }

    function onPlayerReady(event) {
        event.target.playVideo();
    }

    function onPlayerPlay() {
        self.player.playVideo();
    }

    function onPlayerPause() {
        self.player.pauseVideo();
    }

    self.removeIframe = function() {
        self.videoBox.style.display = 'none';
        self.videoBox.innerHTML = "";
    }

    self.btn.addEventListener('click', function () {
        self.createIframe()
    })

    return {
        play: onPlayerPlay,
        pause: onPlayerPause,
        remove: self.removeIframe,
        open: self.createIframe
    }
}

function initVideo() {
    var video = document.querySelectorAll('.video-card');

    for (let i = 0; i < video.length; i++) {
        video[i].video = new PlayVideo(video[i]);
        video[i].remove = video[i].video.remove;
        video[i].pause = video[i].video.pause;
        video[i].play = video[i].video.play;
    }
}

initVideo();

/////////////////
////////////////
////////////////
////////////////
///////////////////

function startup() {
    menu.addEventListener("touchstart", handleStart, false);
    menu.addEventListener("touchend", handleEnd, false);

    var ongoingTouches = [];
    var startPoint = null;
    var endPoint = null;

    function handleStart(evt) {
        var touches = evt.changedTouches;

        for (var i = 0; i < touches.length; i++) {
            ongoingTouches.push(touches[i]);
        }

        startPoint = ongoingTouches[ongoingTouches.length -1].pageX;
    }

    function handleEnd(evt) {
        var touches = evt.changedTouches;

        for (var i = 0; i < touches.length; i++) {
            ongoingTouches.push(touches[i]);
        }

        endPoint = ongoingTouches[ongoingTouches.length -1].pageX;

        closeMenu();
    }

    function closeMenu() {
        if (startPoint - endPoint >= 50) {
            menu.classList.remove('catalog-container__left_active');
            substrate.classList.remove('substrate_active');
        }
    }
}

/////////////////
////////////////
////////////////
////////////////
///////////////////

function Resizer(node, divisor) {
    var self = this;
    self.node = document.querySelector(node);
    self.divisor = self.node.querySelector(divisor);
    self.drag = self.divisor.querySelector('.draggable');

    self.drag.addEventListener('mousedown', function(e){
        resize(e);
    })

    function resize(ev){
        var _s = this;
        _s.event = ev;
        _s.nodeWidth = self.node.getBoundingClientRect().width;
        _s.startWidth = self.divisor.getBoundingClientRect().width;

        $(document).on('mouseup', function(e){
            $(document).off('mouseup').off('mousemove');
        });

        $(document).on('mousemove', function(me){
            var moveX = (me.pageX - _s.event.pageX);
            moveX *= -1;

            _s.currentWidth = _s.startWidth + moveX;

            self.divisor.style.width =  currentWidth + 'px';

            if (_s.currentWidth >= _s.nodeWidth) {
                $(document).off('mouseup').off('mousemove');
                setTimeout(function () {
                    self.divisor.style.width =  _s.nodeWidth + 'px';
                },0);
            }

            if (_s.currentWidth <= 0) {
                $(document).off('mouseup').off('mousemove');

                setTimeout(function () {
                    self.divisor.style.width =  '0';
                },0);
            }
        });
    }
}

new Resizer('#resultRecall_1', '.divisorAfter');
new Resizer('#resultRecall_2', '.divisorAfter');