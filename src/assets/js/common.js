class Animate {
    constructor(node, animationName, opt) {
        this.node = document.getElementsByClassName(node)[0] || node;
        this.animationName = animationName;
        this.opt = opt || {};
        this.option = Object.assign({
            transition: 300,
            delay: 0,
            cubicBezier: 'cubic-bezier(.29,.16,.19,.82)',
            positionStart: 250
        }, this.opt);

        let {transition, delay, cubicBezier, positionStart} = this.option;

        this.transition = transition + 'ms';
        this.delay = delay + 'ms';
        this.cubicBezier = cubicBezier;
        this.positionStart = positionStart;
        this.top = null;
        this.initAnimateEl = this.initAnimateEl.bind(this);
        this.startAnimateEl = this.startAnimateEl.bind(this);
    }

    initAnimateEl() {
        this.node.classList.add(this.animationName);
        this.node.style.transition = this.transition + ' ' + this.cubicBezier + ' ' + this.delay;
    }

    startAnimateEl() {
        if (!this.node.classList.contains(this.animationName)) { return }

        this.top = this.node.getBoundingClientRect().top;

        if (this.top + this.positionStart <= window.innerHeight) {
            this.node.classList.remove(this.animationName);
        }
    }
}

window.addEventListener('load', function () {
    if (window.innerWidth >= 768) {
        var advantageCard = document.querySelectorAll('.when-needed .advantage-card');
        var delayAdvantageCard = 0;

        for (let i = 0; i < advantageCard.length; i++) {

            if (i % 3 || i === 1) {
                delayAdvantageCard += 300;
            } else {
                delayAdvantageCard = 0
            }

            advantageCard[i].animEl = new Animate(advantageCard[i],'in-Left-Up', {
                transition: 500,
                delay: delayAdvantageCard,
                cubicBezier: 'cubic-bezier(.4,1.63,.87,1.21)'
            });

            advantageCard[i].animEl.initAnimateEl();
            advantageCard[i].animEl.startAnimateEl();
        }

        var advantageCardSmall = document.querySelectorAll('.advantage-card_small');
        var delayAdvantageCardSmall = 0;

        for (let i = 0; i < advantageCardSmall.length; i++) {

            if (i % 3 || i === 1) {
                delayAdvantageCardSmall += 300;
            } else {
                delayAdvantageCardSmall = 0
            }

            advantageCardSmall[i].animEl = new Animate(advantageCardSmall[i],'fade', {
                transition: 500,
                delay: delayAdvantageCardSmall,
                cubicBezier: 'cubic-bezier(.4,1.63,.87,1.21)'
            });

            advantageCardSmall[i].animEl.initAnimateEl();
            advantageCardSmall[i].animEl.startAnimateEl();
        }

        var listBoxItem = document.querySelectorAll('.list-box__item');
        var delayListBoxItem = 0;

        for (let i = 0; i < listBoxItem.length; i++) {

            if (i % 2 || i === 1) {
                delayListBoxItem += 400;
            } else {
                delayListBoxItem = 0
            }

            listBoxItem[i].animEl = new Animate(listBoxItem[i],'in-Left-Up', {
                transition: 600,
                delay: delayListBoxItem,
                cubicBezier: 'cubic-bezier(.4,1.63,.87,1.21)'
            });

            listBoxItem[i].animEl.initAnimateEl();
            listBoxItem[i].animEl.startAnimateEl();
        }

        var specialistCard = new Animate('specialist-card-box','in-Right-Up', {
            transition: 600,
            delay: 0,
        });

        specialistCard.initAnimateEl();
        specialistCard.startAnimateEl();

        window.addEventListener('scroll', function () {
            for (let i = 0; i < advantageCard.length; i++) {
                advantageCard[i].animEl.startAnimateEl();
            }

            for (let i = 0; i < advantageCardSmall.length; i++) {
                advantageCardSmall[i].animEl.startAnimateEl();
            }

            for (let i = 0; i < listBoxItem.length; i++) {
                listBoxItem[i].animEl.startAnimateEl();
            }

            specialistCard.startAnimateEl();
        })
    }
});