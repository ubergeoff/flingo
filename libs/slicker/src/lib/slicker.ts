/*
     _ _      _       _
 ___| (_) ___| | __  (_)___
/ __| | |/ __| |/ /  | / __|
\__ \ | | (__|   < _ | \__ \
|___/_|_|\___|_|\_(_)/ |___/
                   |__/

 Version:          0.1.0
 Original Author:  Ken Wheeler
 Slicker TS By:    UberGeoff
 Website:          http://kenwheeler.github.io
    Docs:          http://kenwheeler.github.io/slick
    Repo:          http://github.com/kenwheeler/slick
  Issues:          http://github.com/kenwheeler/slick/issues



 */

import { SlickerConfig } from './slicker-config';

export class Slicker {
    instanceUid = 0;

    defaults: SlickerConfig = {
        accessibility: false,
        adaptiveHeight: false,
        appendArrows: null,
        appendDots: null,
        arrows: true,
        asNavFor: null,
        prevArrow: '<button class="slick-prev" aria-label="Previous" type="button">Previous</button>',
        nextArrow: '<button class="slick-next" aria-label="Next" type="button">Next</button>',
        autoplay: false,
        autoplaySpeed: 3000,
        centerMode: false,
        centerPadding: '50px',
        cssEase: 'ease',
        customPaging: function (slider, i) {
            const button = document.createElement('button');
            button.value = i + 1 + '';
            button.type = 'button';

            return button;
        },
        dots: false,
        dotsClass: 'slick-dots',
        draggable: true,
        easing: 'linear',
        edgeFriction: 0.35,
        fade: false,
        focusOnSelect: false,
        focusOnChange: false,
        infinite: true,
        initialSlide: 0,
        lazyLoad: 'ondemand',
        mobileFirst: false,
        pauseOnHover: true,
        pauseOnFocus: true,
        pauseOnDotsHover: false,
        respondTo: 'window',
        responsive: null,
        rows: 1,
        rtl: false,
        slide: '',
        slidesPerRow: 1,
        slidesToShow: 1,
        slidesToScroll: 1,
        slideWidth: 0,
        speed: 500,
        swipe: true,
        swipeToSlide: false,
        touchMove: true,
        touchThreshold: 5,
        useCSS: true,
        useTransform: true,
        variableWidth: false,
        vertical: false,
        verticalSwiping: false,
        waitForAnimate: true,
        zIndex: 1000
    };

    initials = {
        animating: false,
        dragging: false,
        autoPlayTimer: null,
        currentDirection: 0,
        currentLeft: null,
        currentSlide: 0,
        direction: 1,
        $dots: null,
        listWidth: null,
        listHeight: null,
        loadIndex: 0,
        $nextArrow: null,
        $prevArrow: null,
        scrolling: false,
        slideCount: null,
        $slideTrack: null,
        $slides: null,
        sliding: false,
        slideOffset: 0,
        swipeLeft: null,
        swiping: false,
        $list: null,
        touchObject: {},
        transformsEnabled: false,
        unslicked: false
    };

    activeBreakpoint = null;
    animType = null;
    animProp = null;
    breakpoints = [];
    breakpointSettings = [];
    cssTransitions = false;
    focussed = false;
    interrupted = false;
    hidden = 'hidden';
    paused = true;
    positionProp = null;
    respondTo = null;
    rowCount = 1;
    shouldClick = true;
    $slider = null;
    $slidesCache = null;
    transformType = null;
    transitionType = null;
    visibilityChange = 'visibilitychange';
    windowWidth = 0;
    windowTimer = null;
    options: SlickerConfig;

    // A simple way to check for HTML strings
    // Strict HTML recognition (must start with <)
    // Extracted from jQuery v1.11 source
    htmlExpr = /^(?:\s*(<[\w\W]+>)[^>]*)$/;

    // --------------------------
    // Complete
    // --------------------------
    private currentSlide: number;
    private originalSettings: any;
    private $slideTrack: HTMLElement;
    private slideCount: number;
    private $slides: HTMLCollection;
    private $list: any;
    private autoPlayTimer: any;
    private slideOffset: number;
    private slideWidth: number;
    private transformsEnabled: boolean;
    private windowDelay: any;
    private unslicked: boolean;
    private touchObject = {
        fingerCount: 0,
        startX: 0,
        startY: 0,
        curY: 0,
        curX: 0,
        edgeHit: false,
        swipeLength: 0,
        minSwipe: 0
    };
    private originalTouchObject = {
        fingerCount: 0,
        startX: 0,
        startY: 0,
        curY: 0,
        curX: 0,
        edgeHit: false,
        swipeLength: 0,
        minSwipe: 0
    };
    private $dots: any;
    private $prevArrow: any;
    private $nextArrow: any;
    private direction: number;
    private animating: boolean;
    private dragging: boolean;
    private currentDirection: number;
    private currentLeft: any;
    private swiping: boolean;
    private scrolling: boolean;
    private listWidth: number;
    private swipeLeft: number;
    private listHeight: number;

    constructor(element, settings) {
        this.defaults = {
            ...this.defaults,
            appendArrows: element,
            appendDots: element
        };

        this.$slider = element;

        this.options = this.extendAll({}, this.defaults, settings);
        this.currentSlide = this.options.initialSlide;

        this.originalSettings = this.options;

        // @ts-ignore
        if (typeof document.mozHidden !== 'undefined') {
            this.hidden = 'mozHidden';
            this.visibilityChange = 'mozvisibilitychange';
        } else {
            // @ts-ignore
            if (typeof document.webkitHidden !== 'undefined') {
                this.hidden = 'webkitHidden';
                this.visibilityChange = 'webkitvisibilitychange';
            }
        }

        this.autoPlay = this.autoPlay.bind(this);
        this.autoPlayClear = this.autoPlayClear.bind(this);
        this.autoPlayIterator = this.autoPlayIterator.bind(this);
        this.changeSlide = this.changeSlide.bind(this);
        this.clickHandler = this.clickHandler.bind(this);
        //this.selectHandler = this.selectHandler.bind(this);
        this.setPosition = this.setPosition.bind(this);
        this.swipeHandler = this.swipeHandler.bind(this);
        //this.dragHandler = this.dragHandler.bind(_);
        this.keyHandler = this.keyHandler.bind(this);

        this.startSwipeHandler = this.startSwipeHandler.bind(this);
        this.moveSwipeHandler = this.moveSwipeHandler.bind(this);
        this.endSwipeHandler = this.endSwipeHandler.bind(this);

        this.instanceUid = this.instanceUid++;

        //this.registerBreakpoints();

        this.init(true);
    }

    // --------------------------
    // Complete
    // --------------------------
    extendAll(out, ...args) {
        out = out || {};

        for (var i = 1; i < arguments.length; i++) {
            if (!arguments[i]) continue;

            for (const key in arguments[i]) {
                if (arguments[i].hasOwnProperty(key)) out[key] = arguments[i][key];
            }
        }

        return out;
    }

    //---------------------------
    // Complete
    // -- Not sure of behaviour tho ??
    // ---------------------------
    activateADA() {
        const slickActive = this.$slideTrack.querySelector('.slick-active');
        if (slickActive) {
            slickActive.setAttribute('aria-hidden', 'false');
            const allOther = slickActive.querySelectorAll('a, input, button, select');

            // @ts-ignore
            for (const element of allOther) {
                element.setAttribute('tabindex', '0');
            }
        }
    }

    createFromMarkup(markup) {
        // Convert markup to an HTMLElement
        if (!(markup instanceof HTMLElement)) {
            const tempNode = document.createElement('div');
            tempNode.innerHTML = markup;
            return tempNode.children[0];
        }

        return null;
    }

    //---------------------------
    // Complete
    // -- not using $(markup)
    // ---------------------------
    addSlide(markup, index = null, addBefore = false) {
        //const thisSlideTrack = $(this.$slideTrack);

        if (typeof index === 'boolean') {
            addBefore = index;
            index = null;
        } else if (index < 0 || index >= this.slideCount) {
            return false;
        }

        this.unload();

        if (typeof index === 'number') {
            /*if (index === 0 && this.$slides.length === 0) {
                $(markup).appendTo(thisSlideTrack);
            } else if (addBefore) {
                $(markup).insertBefore(this.$slides.eq(index));
            } else {
                $(markup).insertAfter(this.$slides.eq(index));
            }*/
        } else {
            if (addBefore === true) {
                // not using yet
                // $(markup).prependTo(thisSlideTrack);
            } else {
                //$(markup).appendTo(thisSlideTrack);
                this.$slideTrack.appendChild(markup);
            }
        }

        // @ts-ignore
        this.$slides = Array.from(this.$slideTrack.children);
        // @ts-ignore
        for (const item of Array.from(this.$slideTrack.children)) {
            item.parentNode.removeChild(item);
        }

        let indexer = 0;
        // @ts-ignore
        for (const item of this.$slides) {
            this.$slideTrack.appendChild(item);
            item.setAttribute('data-slick-index', (indexer++).toString());
        }

        this.$slidesCache = this.$slides;

        this.reinit();
    }

    //---------------------------------------
    // Complete
    // -- not using adaptive height, as yet
    // - finish this, if you require this
    // --------------------------------------
    animateHeight() {
        if (
            this.options.slidesToShow === 1 &&
            this.options.adaptiveHeight === true &&
            this.options.vertical === false
        ) {
            /*const targetHeight = this.$slides.eq(this.currentSlide).outerHeight(true);
            this.$list.animate(
                {
                    height: targetHeight
                },
                this.options.speed
            );*/
        }
    }

    // ------------------------------
    // Complete
    // We always use CSS transitions
    // ---------------------------------
    animateSlide(targetLeft, callback) {
        const animProps = {};

        this.animateHeight();

        if (this.options.rtl === true && this.options.vertical === false) {
            targetLeft = -targetLeft;
        }

        this.applyTransition();
        targetLeft = Math.ceil(targetLeft);

        if (this.options.vertical === false) {
            animProps[this.animType] = 'translate3d(' + targetLeft + 'px, 0px, 0px)';
        } else {
            animProps[this.animType] = 'translate3d(0px,' + targetLeft + 'px, 0px)';
        }

        this.cssAppender(this.$slideTrack, animProps);

        if (callback) {
            setTimeout(() => {
                this.disableTransition();

                callback.call();
            }, this.options.speed);
        }
    }

    //---------------------------
    // Complete
    // -- not using "asNavFor"
    // ---------------------------
    getNavTarget() {
        const asNavFor = this.options.asNavFor;

        /*if (asNavFor && asNavFor !== null) {
            asNavFor = $(asNavFor).not(this.$slider);
        }

        return asNavFor;*/
    }

    //---------------------------
    // Complete
    // -- not using "asNavFor"
    // ---------------------------
    /*asNavFor(index) {
        const asNavFor = this.getNavTarget();

        if (asNavFor !== null && typeof asNavFor === 'object') {
            // @ts-ignore
            asNavFor.each(function () {
                var target = $(this).slick('getSlick');
                if (!target.unslicked) {
                    target.slideHandler(index, true);
                }
            });
        }
    }*/

    // ------------------------
    // Complete
    // ------------------------
    applyTransition(slide = null) {
        const transition = {};

        if (this.options.fade === false) {
            transition[this.transitionType] =
                this.transformType + ' ' + this.options.speed + 'ms ' + this.options.cssEase;
        } else {
            transition[this.transitionType] = 'opacity ' + this.options.speed + 'ms ' + this.options.cssEase;
        }

        if (this.options.fade === false) {
            this.cssAppender(this.$slideTrack, transition);
        } else {
            // this.$slides.eq(slide).css(transition);
        }
    }

    // ------------------------
    // Complete
    // ------------------------
    autoPlay() {
        this.autoPlayClear();

        if (this.slideCount > this.options.slidesToShow) {
            this.autoPlayTimer = setInterval(this.autoPlayIterator, this.options.autoplaySpeed);
        }
    }

    // ------------------------
    // Complete
    // ------------------------
    autoPlayClear() {
        if (this.autoPlayTimer) {
            clearInterval(this.autoPlayTimer);
        }
    }

    // ------------------------
    // Complete
    // ------------------------
    autoPlayIterator() {
        var _ = this,
            slideTo = this.currentSlide + this.options.slidesToScroll;

        if (!this.paused && !this.interrupted && !this.focussed) {
            if (this.options.infinite === false) {
                if (this.direction === 1 && this.currentSlide + 1 === this.slideCount - 1) {
                    this.direction = 0;
                } else if (this.direction === 0) {
                    slideTo = this.currentSlide - this.options.slidesToScroll;

                    if (this.currentSlide - 1 === 0) {
                        this.direction = 1;
                    }
                }
            }

            this.slideHandler(slideTo);
        }
    }

    //---------------------------
    // Complete
    // ---------------------------
    buildArrows() {
        if (this.options.arrows === true) {
            this.$prevArrow = this.createFromMarkup(this.options.prevArrow);
            this.$nextArrow = this.createFromMarkup(this.options.nextArrow);

            this.$prevArrow.classList.add('slick-arrow');
            this.$nextArrow.classList.add('slick-arrow');

            if (this.slideCount > this.options.slidesToShow) {
                this.$prevArrow.classList.remove('slick-hidden');
                this.$nextArrow.classList.remove('slick-hidden');

                this.$prevArrow.removeAttribute('aria-hidden', 'tabindex');
                this.$nextArrow.removeAttribute('aria-hidden', 'tabindex');

                if (this.htmlExpr.test(this.options.prevArrow)) {
                    this.options.appendArrows.insertBefore(this.$prevArrow, this.options.appendArrows.firstChild);
                }

                if (this.htmlExpr.test(this.options.nextArrow)) {
                    this.options.appendArrows.appendChild(this.$nextArrow);
                }

                if (this.options.infinite !== true) {
                    this.$prevArrow.classList.add('slick-disabled');
                    this.$prevArrow.setAttribute('aria-disabled', 'true');
                }
            } else {
                this.$prevArrow.classList.add('slick-hidden');
                this.$prevArrow.setAttribute('aria-disabled', 'true');
                this.$prevArrow.setAttribute('tabindex', '-1');

                this.$nextArrow.classList.add('slick-hidden');
                this.$nextArrow.setAttribute('aria-disabled', 'true');
                this.$nextArrow.setAttribute('tabindex', '-1');
            }
        }
    }

    // ------------------------
    // Complete
    // ------------------------
    buildDots() {
        var _ = this,
            i,
            dot;

        if (this.options.dots === true && this.slideCount > this.options.slidesToShow) {
            this.$slider.classList.add('slick-dotted');

            dot = document.createElement('ul');
            dot.classList.add(this.options.dotsClass);

            for (i = 0; i <= this.getDotCount(); i += 1) {
                const li = document.createElement('li');
                li.appendChild(this.options.customPaging.call(this, _, i));
                dot.appendChild(li);
            }

            this.options.appendDots.appendChild(dot);
            this.$dots = dot;

            const firstLi = this.$dots.querySelectorAll('li')[0];
            firstLi.classList.add('slick-active');
        }
    }

    // ------------------------
    // Complete
    // ------------------------
    buildOut() {
        this.$slides = this.$slider.children;
        let index = 0;
        // @ts-ignore
        for (let item of this.$slides) {
            item.classList.add('slick-slide');
            item.setAttribute('data-slick-index', index);
            item.originalStyling = item.style || '';

            index++;
        }

        //this.$slides = this.$slider.querySelectorAll(':not(.slick-cloned)');

        this.slideCount = this.$slides.length;

        this.$slider.classList.add('slick-slider');

        const slickTrack = this.creatDiv('slick-track');

        if (this.slideCount === 0) {
            // TODO: still need to do this one
            // this.$slideTrack = $('<div class="slick-track"/>').appendTo(thisSlider);
        } else {
            this.$slideTrack = this.wrapAll(this.$slides, slickTrack);
        }

        const slickList = this.creatDiv('slick-list');

        this.$list = this.wrapAll([this.$slideTrack], slickList);
        this.$slides = this.$slideTrack.children;

        this.$slideTrack.style.opacity = '0';

        if (this.options.centerMode === true || this.options.swipeToSlide === true) {
            this.options.slidesToScroll = 1;
        }

        // ---------------------
        // not using this yet
        //$('img[data-lazy]', thisSlider).not('[src]').addClass('slick-loading');
        // ---------------------

        this.setupInfinite();

        this.buildArrows();

        this.buildDots();

        this.updateDots();

        this.setSlideClasses(typeof this.currentSlide === 'number' ? this.currentSlide : 0);

        if (this.options.draggable === true) {
            this.$list.classList.add('draggable');
        }
    }

    // ------------------------
    // Complete
    // ------------------------
    creatDiv(className) {
        const div = document.createElement('div');
        div.classList.add(className);

        return div;
    }

    // ------------------------
    // Complete
    // ------------------------
    wrapAll(nodes, wrapper) {
        // Cache the current parent and previous sibling of the first node.
        var parent = nodes[0].parentNode;
        var previousSibling = nodes[0].previousSibling;

        // Place each node in wrapper.
        //  - If nodes is an array, we must increment the index we grab from
        //    after each loop.
        //  - If nodes is a NodeList, each node is automatically removed from
        //    the NodeList when it is removed from its parent with appendChild.
        for (var i = 0; nodes.length - i; wrapper.firstChild === nodes[0] && i++) {
            wrapper.appendChild(nodes[i]);
        }

        // Place the wrapper just after the cached previousSibling,
        // or if that is null, just before the first child.
        var nextSibling = previousSibling ? previousSibling.nextSibling : parent.firstChild;
        parent.insertBefore(wrapper, nextSibling);

        return wrapper;
    }

    // ------------------------
    // Complete
    // ------------------------
    buildRows() {
        var _ = this,
            a,
            b,
            c,
            newSlides,
            numOfSlides,
            originalSlides,
            slidesPerSection;

        newSlides = document.createDocumentFragment();
        // @ts-ignore
        originalSlides = Array.from(this.$slider.children).slice();

        if (this.options.rows > 0) {
            slidesPerSection = this.options.slidesPerRow * this.options.rows;
            numOfSlides = Math.ceil(originalSlides.length / slidesPerSection);

            for (a = 0; a < numOfSlides; a++) {
                const slide = document.createElement('div');
                for (b = 0; b < this.options.rows; b++) {
                    const row = document.createElement('div');
                    for (c = 0; c < this.options.slidesPerRow; c++) {
                        const target = a * slidesPerSection + (b * this.options.slidesPerRow + c);
                        const rowTarget = originalSlides[target];

                        if (rowTarget) {
                            let cssWidth = '';
                            if (this.options.variableWidth === false && this.options.slideWidth !== 0) {
                                cssWidth = this.options.slideWidth + 'px';
                            } else {
                                cssWidth = 100 / this.options.slidesPerRow + '%';
                            }

                            this.cssAppender(rowTarget, {
                                width: cssWidth,
                                display: 'inline-block'
                            });
                            row.appendChild(rowTarget);
                        }
                    }
                    slide.appendChild(row);
                }
                newSlides.appendChild(slide);
            }

            this.emptyDOM(this.$slider);
            this.$slider.appendChild(newSlides);
        }
    }

    // ------------------------
    // Complete
    // ------------------------
    emptyDOM(el) {
        while (el.firstChild) el.removeChild(el.firstChild);
    }

    // --------------------------
    // Complete
    // --------------------------
    checkResponsive(initial = false, forceUpdate = false) {
        var _ = this,
            breakpoint,
            targetBreakpoint,
            respondToWidth,
            triggerBreakpoint = false;

        var sliderWidth = this.get_Width(this.$slider);

        var windowWidth = window.innerWidth; // || $(window).width();

        if (this.respondTo === 'window') {
            respondToWidth = windowWidth;
        } else if (this.respondTo === 'slider') {
            respondToWidth = sliderWidth;
        } else if (this.respondTo === 'min') {
            respondToWidth = Math.min(windowWidth, sliderWidth);
        }

        // @ts-ignore
        if (this.options?.responsive?.length) {
            targetBreakpoint = null;

            for (breakpoint in this.breakpoints) {
                if (this.breakpoints.hasOwnProperty(breakpoint)) {
                    if (this.originalSettings.mobileFirst === false) {
                        if (respondToWidth < this.breakpoints[breakpoint]) {
                            targetBreakpoint = this.breakpoints[breakpoint];
                        }
                    } else {
                        if (respondToWidth > this.breakpoints[breakpoint]) {
                            targetBreakpoint = this.breakpoints[breakpoint];
                        }
                    }
                }
            }

            if (targetBreakpoint !== null) {
                if (this.activeBreakpoint !== null) {
                    if (targetBreakpoint !== this.activeBreakpoint || forceUpdate) {
                        this.activeBreakpoint = targetBreakpoint;
                        if (this.breakpointSettings[targetBreakpoint] === 'unslick') {
                            this.unslick(targetBreakpoint);
                        } else {
                            /*this.options = $.extend({}, this.originalSettings,
                                this.breakpointSettings[
                                    targetBreakpoint]);*/

                            this.options = this.extendAll(
                                {},
                                this.originalSettings,
                                this.breakpointSettings[targetBreakpoint]
                            );

                            if (initial === true) {
                                this.currentSlide = this.options.initialSlide;
                            }
                            this.refresh(initial);
                        }
                        triggerBreakpoint = targetBreakpoint;
                    }
                } else {
                    this.activeBreakpoint = targetBreakpoint;
                    if (this.breakpointSettings[targetBreakpoint] === 'unslick') {
                        this.unslick(targetBreakpoint);
                    } else {
                        this.options = this.extendAll(
                            {},
                            this.originalSettings,
                            this.breakpointSettings[targetBreakpoint]
                        );

                        if (initial === true) {
                            this.currentSlide = this.options.initialSlide;
                        }
                        this.refresh(initial);
                    }
                    triggerBreakpoint = targetBreakpoint;
                }
            } else {
                if (this.activeBreakpoint !== null) {
                    this.activeBreakpoint = null;
                    this.options = this.originalSettings;
                    if (initial === true) {
                        this.currentSlide = this.options.initialSlide;
                    }
                    this.refresh(initial);
                    triggerBreakpoint = targetBreakpoint;
                }
            }

            // only trigger breakpoints during an actual break. not on initialize.
            if (!initial && triggerBreakpoint !== false) {
                const event = this.createTrigger('breakpoint', [_, triggerBreakpoint]);
                this.$slider.dispatchEvent(event);
            }
        }
    }

    // --------------------------
    // Complete
    // --------------------------
    changeSlide(event, dontAnimate = false) {
        //$target = $(event.currentTarget),

        var _ = this,
            $target = event.currentTarget,
            indexOffset,
            slideOffset,
            unevenOffset;

        // If target is a link, prevent default action.
        //not using
        /*if ($target.is('a')) {
            event.preventDefault();
        }*/
        //if (this.isMatches($target, 'a')) {
        //}

        // If target is not the <li> element (ie: a child), find the <li>.
        //not using
        /*if (!$target.is('li')) {
            $target = $target.closest('li');
        }*/

        unevenOffset = this.slideCount % this.options.slidesToScroll !== 0;
        indexOffset = unevenOffset ? 0 : (this.slideCount - this.currentSlide) % this.options.slidesToScroll;

        switch (event.data.message) {
            case 'previous':
                slideOffset = indexOffset === 0 ? this.options.slidesToScroll : this.options.slidesToShow - indexOffset;
                if (this.slideCount > this.options.slidesToShow) {
                    this.slideHandler(this.currentSlide - slideOffset, false, dontAnimate);
                }
                break;

            case 'next':
                slideOffset = indexOffset === 0 ? this.options.slidesToScroll : indexOffset;
                if (this.slideCount > this.options.slidesToShow) {
                    this.slideHandler(this.currentSlide + slideOffset, false, dontAnimate);
                }
                break;

            case 'index':
                var index =
                    event.data.index === 0
                        ? 0
                        : event.data.index || this.indexInParent($target) * this.options.slidesToScroll;

                this.slideHandler(this.checkNavigable(index), false, dontAnimate);

                //not doing focus yet
                //$target.children().trigger('focus');
                break;

            default:
                return;
        }
    }

    // --------------------------
    // Complete
    // --------------------------
    indexInParent(node) {
        var children = node.parentNode.childNodes;
        var num = 0;
        for (var i = 0; i < children.length; i++) {
            if (children[i] === node) return num;
            if (children[i].nodeType === 1) num++;
        }
        return -1;
    }

    // --------------------------
    // Complete
    // --------------------------
    checkNavigable(index) {
        var navigables, prevNavigable;

        navigables = this.getNavigableIndexes();
        prevNavigable = 0;
        if (index > navigables[navigables.length - 1]) {
            index = navigables[navigables.length - 1];
        } else {
            // tslint:disable-next-line:forin
            for (const n in navigables) {
                if (index < navigables[n]) {
                    index = prevNavigable;
                    break;
                }
                prevNavigable = navigables[n];
            }
        }

        return index;
    }

    // --------------------------
    // Complete
    // --------------------------
    cleanUpEvents() {
        if (this.options.dots && this.$dots !== null) {
            const _ = this;
            this.queryAll('li', this.$dots).forEach(function (elem) {
                elem.removeEventListener('click', _.changeSlide);
                elem.removeEventListener('mouseenter', _.interrupt.bind(_), true);
                elem.removeEventListener('mouseleave', _.interrupt.bind(_), false);
            });

            if (this.options.accessibility === true) {
                this.$dots.removeEventListener('keydown', this.keyHandler);
            }
        }

        // I believe this is done else where
        //thisSlider.off('focus.slick blur.slick');

        if (this.options.arrows === true && this.slideCount > this.options.slidesToShow) {
            // tslint:disable-next-line:no-unused-expression
            this.$prevArrow && this.$prevArrow.removeEventListener('click', this.changeSlide);
            // tslint:disable-next-line:no-unused-expression
            this.$nextArrow && this.$nextArrow.removeEventListener('click', this.changeSlide);

            if (this.options.accessibility === true) {
                // tslint:disable-next-line:no-unused-expression
                this.$prevArrow && this.$prevArrow.removeEventListener('keydown', this.keyHandler);
                // tslint:disable-next-line:no-unused-expression
                this.$nextArrow && this.$nextArrow.removeEventListener('keydown', this.keyHandler);
            }
        }

        this.$list.removeEventListener('touchstart', this.startSwipeHandler);
        this.$list.removeEventListener('mousedown', this.startSwipeHandler);
        this.$list.removeEventListener('touchmove', this.moveSwipeHandler);
        this.$list.removeEventListener('mousemove', this.moveSwipeHandler);
        this.$list.removeEventListener('touchend', this.endSwipeHandler);
        this.$list.removeEventListener('mouseup', this.endSwipeHandler);
        this.$list.removeEventListener('touchcancel', this.endSwipeHandler);
        this.$list.removeEventListener('mouseleave', this.endSwipeHandler);

        this.$list.removeEventListener('click', this.clickHandler);

        document.removeEventListener(this.visibilityChange, this.visibility);

        this.cleanUpSlideEvents();

        if (this.options.accessibility === true) {
            //thisList.off('keydown.slick', this.keyHandler);
            this.$list.removeEventListener('keydown', this.keyHandler);
        }

        /*if (this.options.focusOnSelect === true) {
            for (let item of Array.from(this.$slideTrack.children)) {
                item.removeEventListener('click', this.selectHandler);
            }
        }*/

        //leaving this out for now
        //$(window).off('orientationchange.slick.slick-' + this.instanceUid, this.orientationChange);

        window.removeEventListener('resize', this.resize);

        //TODO: find a way to do this using vanilla js
        //$('[draggable!=true]', this.$slideTrack).off('dragstart', this.preventDefault);

        window.removeEventListener('load', this.setPosition);
    }

    // --------------------------
    // Complete
    // --------------------------
    cleanUpSlideEvents() {
        this.$list.removeEventListener('mouseenter', this.interrupt.bind(this), true);
        this.$list.removeEventListener('mouseleave', this.interrupt.bind(this), false);
    }

    // --------------------------
    // Complete
    // --------------------------
    cleanUpRows() {
        const originalSlides = [];

        if (this.options.rows > 0) {
            // @ts-ignore// @ts-ignore
            for (let item of this.$slides) {
                item.removeAttribute('style');
                originalSlides.push(item.children[0]);
            }

            this.$slider.append(originalSlides);
        }
    }

    // --------------------------
    // Complete
    // --------------------------
    clickHandler(event) {
        if (this.shouldClick === false) {
            event.stopImmediatePropagation();
            event.stopPropagation();
            event.preventDefault();
        }
    }

    // --------------------------
    // Complete
    // --------------------------
    destroy(refresh = false) {
        const _ = this;
        this.autoPlayClear();

        this.touchObject = { ...this.originalTouchObject };

        this.cleanUpEvents();

        this.queryAll('.slick-cloned', this.$slider).forEach(function (elem) {
            _.removeNodeUtil(elem);
        });

        if (this.$dots) {
            this.$dots.parentNode.removeChild(this.$dots);
        }

        if (this.$prevArrow && this.htmlExpr.test(this.options.prevArrow)) {
            this.$prevArrow.classList.remove('slick-disabled', 'slick-arrow', 'slick-hidden');
            this.$prevArrow.removeAttribute('aria-hidden', 'aria-disabled', 'tabindex');
            this.$prevArrow.style.display = '';

            this.removeNodeUtil(this.$prevArrow);
        }

        if (this.$nextArrow && this.htmlExpr.test(this.options.nextArrow)) {
            this.$nextArrow.classList.remove('slick-disabled', 'slick-arrow', 'slick-hidden');
            this.$nextArrow.removeAttribute('aria-hidden', 'aria-disabled', 'tabindex');
            this.$nextArrow.style.display = '';

            this.removeNodeUtil(this.$nextArrow);
        }

        if (this.$slides && this.$slides.length > 0) {
            // @ts-ignore
            for (let item of this.$slides) {
                item.classList.remove('slick-slide', 'slick-active', 'slick-center', 'slick-visible', 'slick-current');
                item.removeAttribute('aria-hidden');
                item.removeAttribute('data-slick-index');
                item.style = item.originalStyling;
            }

            this.removeNodeUtil(this.$slideTrack);

            this.removeNodeUtil(this.$list);

            this.$slider.append(...this.$slides);
        }

        this.cleanUpRows();

        this.$slider.classList.remove('slick-slider', 'slick-initialized', 'slick-dotted');

        this.unslicked = true;

        if (!refresh) {
            const event = this.createTrigger('destroy', [this]);
            this.$slider.dispatchEvent(event);
        }
    }

    // --------------------------
    // Complete
    // -- not using Fade
    // --------------------------
    disableTransition(slide = null) {
        var _ = this,
            transition = {};

        transition[this.transitionType] = '';

        if (this.options.fade === false) {
            this.cssAppender(this.$slideTrack, transition);
        } else {
            //not using this yet
            //this.$slides.eq(slide).css(transition);
        }
    }

    // --------------------------
    // Complete
    // -- not using Fade yet
    // --------------------------
    fadeSlide(slideIndex, callback) {
        /*this.applyTransition(slideIndex);

        this.$slides.eq(slideIndex).css({
            opacity: 1,
            zIndex: this.options.zIndex
        });

        if (callback) {
            setTimeout(function () {
                this.disableTransition(slideIndex);

                callback.call();
            }, this.options.speed);
        }*/
    }

    // --------------------------
    // Complete
    // -- not using Fade
    // --------------------------
    fadeSlideOut(slideIndex) {
        /*this.applyTransition(slideIndex);

        this.$slides.eq(slideIndex).css({
            opacity: 0,
            zIndex: this.options.zIndex - 2
        });*/
    }

    // --------------------------
    // Complete
    // --------------------------
    cssAppender(el, styles) {
        Object.keys(styles).forEach((t) => {
            el.style[t] = styles[t];
        });
    }

    /*
    NEEDS WORK
    */
    filterSlides(filter) {
        /*if (filter !== null) {
            this.$slidesCache = this.$slides;

            this.unload();

            $(this.$slideTrack).children(this.options.slide).detach();

            this.$slidesCache.filter(filter).appendTo(this.$slideTrack);

            this.reinit();
        }*/
    }

    // --------------------------
    // Complete
    // --------------------------
    focusHandler() {
        const _ = this;

        const focus = function (event) {
            var $sf = this;

            setTimeout(function () {
                if (_.options.pauseOnFocus) {
                    if (_.isMatches($sf, ':focus')) {
                        _.focussed = true;
                        _.autoPlay();
                    }
                }
            }, 0);
        };

        const blur = function (event) {
            // When a blur occurs on any elements within the slider we become unfocused
            if (_.options.pauseOnFocus) {
                _.focussed = false;
                _.autoPlay();
            }
        };

        this.$slider.removeEventListener('focus', focus);
        this.$slider.removeEventListener('blur', blur);

        this.$slider.addEventListener('focus', focus);
        this.$slider.addEventListener('blur', blur);
    }

    // --------------------------
    // Complete
    // --------------------------
    getCurrent() {
        return this.currentSlide;
    }

    // --------------------------
    // Complete
    // --------------------------
    getDotCount() {
        var breakPoint = 0;
        var counter = 0;
        var pagerQty = 0;

        if (this.options.infinite === true) {
            if (this.slideCount <= this.options.slidesToShow) {
                ++pagerQty;
            } else {
                while (breakPoint < this.slideCount) {
                    ++pagerQty;
                    breakPoint = counter + this.options.slidesToScroll;
                    counter +=
                        this.options.slidesToScroll <= this.options.slidesToShow
                            ? this.options.slidesToScroll
                            : this.options.slidesToShow;
                }
            }
        } else if (this.options.centerMode === true) {
            pagerQty = this.slideCount;
        } else if (!this.options.asNavFor) {
            pagerQty = 1 + Math.ceil((this.slideCount - this.options.slidesToShow) / this.options.slidesToScroll);
        } else {
            while (breakPoint < this.slideCount) {
                ++pagerQty;
                breakPoint = counter + this.options.slidesToScroll;
                counter +=
                    this.options.slidesToScroll <= this.options.slidesToShow
                        ? this.options.slidesToScroll
                        : this.options.slidesToShow;
            }
        }

        return pagerQty - 1;
    }

    // --------------------------
    // Complete
    // --------------------------
    getLeft(slideIndex) {
        var _ = this,
            targetLeft,
            verticalHeight,
            verticalOffset = 0,
            targetSlide,
            coef;

        this.slideOffset = 0;

        verticalHeight = this.get_OuterHeight(this.$slides[0], true);

        if (this.options.infinite === true) {
            if (this.slideCount > this.options.slidesToShow) {
                this.slideOffset = this.slideWidth * this.options.slidesToShow * -1;
                coef = -1;

                if (this.options.vertical === true && this.options.centerMode === true) {
                    if (this.options.slidesToShow === 2) {
                        coef = -1.5;
                    } else if (this.options.slidesToShow === 1) {
                        coef = -2;
                    }
                }
                verticalOffset = verticalHeight * this.options.slidesToShow * coef;
            }
            if (this.slideCount % this.options.slidesToScroll !== 0) {
                if (
                    slideIndex + this.options.slidesToScroll > this.slideCount &&
                    this.slideCount > this.options.slidesToShow
                ) {
                    if (slideIndex > this.slideCount) {
                        this.slideOffset =
                            (this.options.slidesToShow - (slideIndex - this.slideCount)) * this.slideWidth * -1;
                        verticalOffset =
                            (this.options.slidesToShow - (slideIndex - this.slideCount)) * verticalHeight * -1;
                    } else {
                        this.slideOffset = (this.slideCount % this.options.slidesToScroll) * this.slideWidth * -1;
                        verticalOffset = (this.slideCount % this.options.slidesToScroll) * verticalHeight * -1;
                    }
                }
            }
        } else {
            if (slideIndex + this.options.slidesToShow > this.slideCount) {
                this.slideOffset = (slideIndex + this.options.slidesToShow - this.slideCount) * this.slideWidth;
                verticalOffset = (slideIndex + this.options.slidesToShow - this.slideCount) * verticalHeight;
            }
        }

        if (this.slideCount <= this.options.slidesToShow) {
            this.slideOffset = 0;
            verticalOffset = 0;
        }

        if (this.options.centerMode === true && this.slideCount <= this.options.slidesToShow) {
            this.slideOffset =
                (this.slideWidth * Math.floor(this.options.slidesToShow)) / 2 - (this.slideWidth * this.slideCount) / 2;
        } else if (this.options.centerMode === true && this.options.infinite === true) {
            this.slideOffset += this.slideWidth * Math.floor(this.options.slidesToShow / 2) - this.slideWidth;
        } else if (this.options.centerMode === true) {
            this.slideOffset = 0;
            this.slideOffset += this.slideWidth * Math.floor(this.options.slidesToShow / 2);
        }

        if (this.options.vertical === false) {
            targetLeft = slideIndex * this.slideWidth * -1 + this.slideOffset;
        } else {
            targetLeft = slideIndex * verticalHeight * -1 + verticalOffset;
        }

        if (this.options.variableWidth === true) {
            if (this.slideCount <= this.options.slidesToShow || this.options.infinite === false) {
                targetSlide = this.$slideTrack.children[slideIndex];
            } else {
                targetSlide = this.$slideTrack.children[slideIndex + this.options.slidesToShow];
            }

            if (this.options.rtl === true) {
                // not using rtl yes - so this wont work yet
                /* if (targetSlide[0]) {
                    targetLeft = (thisSlideTrack.width() - targetSlide[0].offsetLeft - targetSlide.width()) * -1;
                } else {
                    targetLeft = 0;
                }*/
            } else {
                targetLeft = targetSlide ? targetSlide.offsetLeft * -1 : 0;
            }

            if (this.options.centerMode === true) {
                if (this.slideCount <= this.options.slidesToShow || this.options.infinite === false) {
                    targetSlide = this.$slideTrack.children[slideIndex];
                } else {
                    targetSlide = this.$slideTrack.children[slideIndex + this.options.slidesToShow + 1];
                }

                if (this.options.rtl === true) {
                    // not using rtl yes - so this wont work yet
                    /*if (targetSlide) {
                        targetLeft = (thisSlideTrack.width() - targetSlide[0].offsetLeft - targetSlide.width()) * -1;
                    } else {
                        targetLeft = 0;
                    }*/
                } else {
                    targetLeft = targetSlide ? targetSlide.offsetLeft * -1 : 0;
                }

                let trueWidth = this.get_Width(this.$list, true);

                targetLeft += (trueWidth - this.get_OuterWidth(targetSlide)) / 2;
            }
        }

        return targetLeft;
    }

    // --------------------------
    // Complete
    // --------------------------
    getOption(option) {
        return this.options[option];
    }

    // --------------------------
    // Complete
    // --------------------------
    getNavigableIndexes() {
        var _ = this,
            breakPoint = 0,
            counter = 0,
            indexes = [],
            max;

        if (this.options.infinite === false) {
            max = this.slideCount;
        } else {
            breakPoint = this.options.slidesToScroll * -1;
            counter = this.options.slidesToScroll * -1;
            max = this.slideCount * 2;
        }

        while (breakPoint < max) {
            indexes.push(breakPoint);
            breakPoint = counter + this.options.slidesToScroll;
            counter +=
                this.options.slidesToScroll <= this.options.slidesToShow
                    ? this.options.slidesToScroll
                    : this.options.slidesToShow;
        }

        return indexes;
    }

    // --------------------------
    // Complete
    // --------------------------
    getSlick() {
        return this;
    }

    // --------------------------
    // Complete
    // -- not using "swipeToSlide"
    // --------------------------
    getSlideCount() {
        var _ = this,
            slidesTraversed,
            swipedSlide,
            swipeTarget,
            centerOffset;

        centerOffset = this.options.centerMode === true ? Math.floor(this.get_Width(this.$list, true) / 2) : 0;
        swipeTarget = this.swipeLeft * -1 + centerOffset;

        if (this.options.swipeToSlide === true) {
            // --------------------------
            // Complete
            // -- not using "swipeToSlide"
            // ----------------------------
            /*this.$slideTrack.find('.slick-slide').each(function (index, slide) {
                var slideOuterWidth, slideOffset, slideRightBoundary;
                slideOuterWidth = $(slide).outerWidth();
                slideOffset = slide.offsetLeft;
                if (this.options.centerMode !== true) {
                    slideOffset += slideOuterWidth / 2;
                }

                slideRightBoundary = slideOffset + slideOuterWidth;

                if (swipeTarget < slideRightBoundary) {
                    swipedSlide = slide;
                    return false;
                }
            });

            slidesTraversed = Math.abs($(swipedSlide).attr('data-slick-index') - this.currentSlide) || 1;

            return slidesTraversed;*/
        } else {
            return this.options.slidesToScroll;
        }
    }

    // --------------------------
    // Complete
    // --------------------------
    goTo(slide, dontAnimate) {
        this.changeSlide(
            {
                data: {
                    message: 'index',
                    // tslint:disable-next-line:radix
                    index: parseInt(slide)
                }
            },
            dontAnimate
        );
    }

    // --------------------------
    // Complete
    // --------------------------
    init(creation = false) {
        const _isInit = this.$slider.classList.contains('slick-initialized');
        if (!_isInit) {
            this.$slider.classList.add('slick-initialized');

            this.buildRows();
            this.buildOut();
            this.setProps();
            this.startLoad();
            this.loadSlider();
            this.initializeEvents();
            this.updateArrows();
            this.updateDots();
            this.checkResponsive(true);
            this.focusHandler();

            // some weird bug - need to set position again
            this.setPosition();
        }

        if (creation) {
            const event = this.createTrigger('init', [this]);
            this.$slider.dispatchEvent(event);
        }

        /*if (this.options.accessibility === true) {
            this.initADA();
        }*/

        if (this.options.autoplay) {
            this.paused = false;
            this.autoPlay();
        }
    }

    // --------------------------
    // Complete
    // Not using "accessibility"
    // --------------------------
    /*initADA() {
        var _ = this,
            numDotGroups = Math.ceil(this.slideCount / this.options.slidesToShow),
            tabControlIndexes = this.getNavigableIndexes().filter(function (val) {
                return val >= 0 && val < this.slideCount;
            });

        const thisSlides = $(this.$slides);
        const thisSideTrack = $(this.$slideTrack);
        const thisDots = $(this.$dots);

        thisSlides
            .add(thisSideTrack.find('.slick-cloned'))
            .attr({
                'aria-hidden': 'true',
                tabindex: '-1'
            })
            .find('a, input, button, select')
            .attr({
                tabindex: '-1'
            });

        if (thisDots !== null) {
            thisSlides.not(thisSideTrack.find('.slick-cloned')).each(function (i) {
                var slideControlIndex = tabControlIndexes.indexOf(i);

                $(this).attr({
                    role: 'tabpanel',
                    id: 'slick-slide' + this.instanceUid + i,
                    tabindex: -1
                });

                if (slideControlIndex !== -1) {
                    var ariaButtonControl = 'slick-slide-control' + this.instanceUid + slideControlIndex;
                    if ($('#' + ariaButtonControl).length) {
                        $(this).attr({
                            'aria-describedby': ariaButtonControl
                        });
                    }
                }
            });

            thisDots
                .attr('role', 'tablist')
                .find('li')
                .each(function (i) {
                    var mappedSlideIndex = tabControlIndexes[i];

                    $(this).attr({
                        role: 'presentation'
                    });

                    $(this)
                        .find('button')
                        .first()
                        .attr({
                            role: 'tab',
                            id: 'slick-slide-control' + this.instanceUid + i,
                            'aria-controls': 'slick-slide' + this.instanceUid + mappedSlideIndex,
                            'aria-label': i + 1 + ' of ' + numDotGroups,
                            'aria-selected': null,
                            tabindex: '-1'
                        });
                })
                .eq(this.currentSlide)
                .find('button')
                .attr({
                    'aria-selected': 'true',
                    tabindex: '0'
                })
                .end();
        }

        for (var i = this.currentSlide, max = i + this.options.slidesToShow; i < max; i++) {
            if (this.options.focusOnChange) {
                thisSlides.eq(i).attr({ tabindex: '0' });
            } else {
                thisSlides.eq(i).removeAttr('tabindex');
            }
        }

        this.activateADA();
    }*/

    // --------------------------
    // Complete
    // --------------------------
    initArrowEvents() {
        const _ = this;

        if (this.options.arrows === true && this.slideCount > this.options.slidesToShow) {
            const arrowClickPrev = function (event) {
                event.data = { message: 'previous' };
                event.originalEvent = event;
                _.changeSlide(event);
            };

            const arrowClickNext = function (event) {
                event.data = { message: 'next' };
                event.originalEvent = event;
                _.changeSlide(event);
            };

            this.$prevArrow.removeEventListener('click', arrowClickPrev);
            this.$prevArrow.addEventListener('click', arrowClickPrev);

            this.$nextArrow.removeEventListener('click', arrowClickNext);
            this.$nextArrow.addEventListener('click', arrowClickNext);

            if (this.options.accessibility === true) {
                this.$prevArrow.addEventListener('keydown', this.keyHandler);
                this.$nextArrow.addEventListener('keydown', this.keyHandler);
            }
        }
    }

    // --------------------------
    // Complete
    // --------------------------
    initDotEvents() {
        //const thisDots = $(this.$dots);
        const _ = this;

        if (this.options.dots === true && this.slideCount > this.options.slidesToShow) {
            this.queryAll('li', this.$dots).forEach(function (elem) {
                elem.addEventListener('click', function (event) {
                    event.data = { message: 'index' };
                    _.changeSlide(event);
                });
            });

            if (this.options.accessibility === true) {
                this.$dots.addEventListener('keydown', this.keyHandler);
            }
        }

        if (
            this.options.dots === true &&
            this.options.pauseOnDotsHover === true &&
            this.slideCount > this.options.slidesToShow
        ) {
            this.queryAll('li', this.$dots).forEach(function (elem) {
                elem.addEventListener('mouseenter', _.interrupt.bind(_), true);
                elem.addEventListener('mouseleave', _.interrupt.bind(_), false);
            });
        }
    }

    // --------------------------
    // Complete
    // --------------------------
    initSlideEvents() {
        //const thisList = $(this.$list);

        if (this.options.pauseOnHover) {
            this.$list.addEventListener('mouseenter', this.interrupt.bind(this), true);
            this.$list.addEventListener('mouseleave', this.interrupt.bind(this), false);
        }
    }

    // --------------------------
    // Complete
    // --------------------------
    isMatches(el, selector) {
        return (
            el.matches ||
            el.matchesSelector ||
            el.msMatchesSelector ||
            el.mozMatchesSelector ||
            el.webkitMatchesSelector ||
            el.oMatchesSelector
        ).call(el, selector);
    }

    // --------------------------
    // Complete
    // --------------------------
    initializeEvents() {
        this.initArrowEvents();

        this.initDotEvents();
        this.initSlideEvents();

        this.$list.addEventListener('touchstart', this.startSwipeHandler);
        this.$list.addEventListener('mousedown', this.startSwipeHandler);

        this.$list.addEventListener('touchmove', this.moveSwipeHandler);
        this.$list.addEventListener('mousemove', this.moveSwipeHandler);

        this.$list.addEventListener('touchend', this.endSwipeHandler);
        this.$list.addEventListener('mouseup', this.endSwipeHandler);

        this.$list.addEventListener('touchcancel', this.endSwipeHandler);
        this.$list.addEventListener('mouseleave', this.endSwipeHandler);

        this.$list.addEventListener('click', this.clickHandler);

        document.addEventListener(this.visibilityChange, this.visibility.bind(this));

        if (this.options.accessibility === true) {
            this.$list.addEventListener('keydown', this.keyHandler);
        }

        /*if (this.options.focusOnSelect === true) {
            for (let item of Array.from(this.$slideTrack.children)) {
                item.addEventListener('click', this.selectHandler);
            }
        }*/

        //leaving this out for now
        //$(window).on('orientationchange.slick.slick-' + this.instanceUid, $.proxy(this.orientationChange, _));

        window.addEventListener('resize', this.resize.bind(this));

        //TODO: find a way to do this using vanilla js
        //$('[draggable!=true]', this.$slideTrack).on('dragstart', this.preventDefault);

        window.addEventListener('load', this.setPosition);
    }

    onHandler(eventName, elementSelector, handler) {
        document.addEventListener(
            eventName,
            function (e) {
                // loop parent nodes from the target to the delegation node
                for (var target = e.target; target && target !== this; target = target.parentNode) {
                    if (target.matches(elementSelector)) {
                        handler.call(target, e);
                        break;
                    }
                }
            },
            false
        );
    }

    // --------------------------
    // Complete
    // --------------------------
    initUI() {
        if (this.options.arrows === true && this.slideCount > this.options.slidesToShow) {
            this.$prevArrow.style.display = '';
            this.$nextArrow.style.display = '';
        }

        if (this.options.dots === true && this.slideCount > this.options.slidesToShow) {
            this.$dots.style.display = '';
        }
    }

    // --------------------------
    // Complete
    // --------------------------
    keyHandler(event) {
        //Dont slide if the cursor is inside the form fields and arrow keys are pressed
        if (!event.target.tagName.match('TEXTAREA|INPUT|SELECT')) {
            if (event.keyCode === 37 && this.options.accessibility === true) {
                this.changeSlide({
                    data: {
                        message: this.options.rtl === true ? 'next' : 'previous'
                    }
                });
            } else if (event.keyCode === 39 && this.options.accessibility === true) {
                this.changeSlide({
                    data: {
                        message: this.options.rtl === true ? 'previous' : 'next'
                    }
                });
            }
        }
    }

    // --------------------------
    // Complete
    // - not using lazy load
    // --------------------------
    /*lazyLoad() {
        var _ = this,
            loadRange,
            cloneRange,
            rangeStart,
            rangeEnd;
        const thisSlider = $(this.$slider);

        function loadImages(imagesScope) {
            $('img[data-lazy]', imagesScope).each(function () {
                var image = $(this),
                    imageSource = $(this).attr('data-lazy'),
                    imageSrcSet = $(this).attr('data-srcset'),
                    imageSizes = $(this).attr('data-sizes') || this.$slider.attr('data-sizes'),
                    imageToLoad = document.createElement('img');

                imageToLoad.onload() {
                    image.animate({ opacity: 0 }, 100, function () {
                        if (imageSrcSet) {
                            image.attr('srcset', imageSrcSet);

                            if (imageSizes) {
                                image.attr('sizes', imageSizes);
                            }
                        }

                        image.attr('src', imageSource).animate({ opacity: 1 }, 200, function () {
                            image.removeAttr('data-lazy data-srcset data-sizes').removeClass('slick-loading');
                        });
                        this.$slider.trigger('lazyLoaded', [_, image, imageSource]);
                    });
                }

                imageToLoad.onerror() {
                    image.removeAttr('data-lazy').removeClass('slick-loading').addClass('slick-lazyload-error');

                    this.$slider.trigger('lazyLoadError', [_, image, imageSource]);
                }

                imageToLoad.src = imageSource;
            });
        }

        if (this.options.centerMode === true) {
            if (this.options.infinite === true) {
                rangeStart = this.currentSlide + (this.options.slidesToShow / 2 + 1);
                rangeEnd = rangeStart + this.options.slidesToShow + 2;
            } else {
                rangeStart = Math.max(0, this.currentSlide - (this.options.slidesToShow / 2 + 1));
                rangeEnd = 2 + (this.options.slidesToShow / 2 + 1) + this.currentSlide;
            }
        } else {
            rangeStart = this.options.infinite ? this.options.slidesToShow + this.currentSlide : this.currentSlide;
            rangeEnd = Math.ceil(rangeStart + this.options.slidesToShow);
            if (this.options.fade === true) {
                if (rangeStart > 0) rangeStart--;
                if (rangeEnd <= this.slideCount) rangeEnd++;
            }
        }

        loadRange = thisSlider.find('.slick-slide').slice(rangeStart, rangeEnd);

        if (this.options.lazyLoad === 'anticipated') {
            var prevSlide = rangeStart - 1,
                nextSlide = rangeEnd,
                $slides = this.$slider.find('.slick-slide');

            for (var i = 0; i < this.options.slidesToScroll; i++) {
                if (prevSlide < 0) prevSlide = this.slideCount - 1;
                loadRange = loadRange.add($slides.eq(prevSlide));
                loadRange = loadRange.add($slides.eq(nextSlide));
                prevSlide--;
                nextSlide++;
            }
        }

        loadImages(loadRange);

        if (this.slideCount <= this.options.slidesToShow) {
            cloneRange = thisSlider.find('.slick-slide');
            loadImages(cloneRange);
        } else if (this.currentSlide >= this.slideCount - this.options.slidesToShow) {
            cloneRange = thisSlider.find('.slick-cloned').slice(0, this.options.slidesToShow);
            loadImages(cloneRange);
        } else if (this.currentSlide === 0) {
            cloneRange = thisSlider.find('.slick-cloned').slice(this.options.slidesToShow * -1);
            loadImages(cloneRange);
        }
    }*/

    // --------------------------
    // Complete
    // --------------------------
    loadSlider() {
        this.setPosition();

        this.$slideTrack.style.opacity = '1';

        this.$slider.classList.remove('slick-loading');

        this.initUI();

        if (this.options.lazyLoad === 'progressive') {
            /*this.progressiveLazyLoad();*/
        }
    }

    // --------------------------
    // Complete
    // --------------------------
    next() {
        this.changeSlide({
            data: {
                message: 'next'
            }
        });
    }

    // --------------------------
    // Complete
    // --------------------------
    orientationChange() {
        this.checkResponsive();
        this.setPosition();
    }

    // --------------------------
    // Complete
    // --------------------------
    pause() {
        this.autoPlayClear();
        this.paused = true;
    }

    // --------------------------
    // Complete
    // --------------------------
    play() {
        this.autoPlay();
        this.options.autoplay = true;
        this.paused = false;
        this.focussed = false;
        this.interrupted = false;
    }

    postSlide(index) {
        if (!this.unslicked) {
            const event = this.createTrigger('afterChange', [this, index]);
            this.$slider.dispatchEvent(event);

            this.animating = false;

            if (this.slideCount > this.options.slidesToShow) {
                this.setPosition();
            }

            this.swipeLeft = null;

            if (this.options.autoplay) {
                this.autoPlay();
            }

            /*if (this.options.accessibility === true) {
                this.initADA();

                if (this.options.focusOnChange) {
                    var $currentSlide = $(this.$slides.get(this.currentSlide));
                    $currentSlide.attr('tabindex', 0).focus();
                }
            }*/
        }
    }

    // --------------------------
    // Complete
    // --------------------------
    prev() {
        this.changeSlide({
            data: {
                message: 'previous'
            }
        });
    }

    // --------------------------
    // Complete
    // --------------------------
    preventDefault(event) {
        event.preventDefault();
    }

    // --------------------------
    // Complete
    // --- not using this
    // --------------------------
    /*progressiveLazyLoad(tryCount) {
        tryCount = tryCount || 1;

        var _ = this,
            $imgsToLoad = $('img[data-lazy]', this.$slider),
            image,
            imageSource,
            imageSrcSet,
            imageSizes,
            imageToLoad;

        if ($imgsToLoad.length) {
            image = $imgsToLoad.first();
            imageSource = image.attr('data-lazy');
            imageSrcSet = image.attr('data-srcset');
            imageSizes = image.attr('data-sizes') || this.$slider.attr('data-sizes');
            imageToLoad = document.createElement('img');

            imageToLoad.onload() {
                if (imageSrcSet) {
                    image.attr('srcset', imageSrcSet);

                    if (imageSizes) {
                        image.attr('sizes', imageSizes);
                    }
                }

                image
                    .attr('src', imageSource)
                    .removeAttr('data-lazy data-srcset data-sizes')
                    .removeClass('slick-loading');

                if (this.options.adaptiveHeight === true) {
                    this.setPosition();
                }

                this.$slider.trigger('lazyLoaded', [_, image, imageSource]);
                this.progressiveLazyLoad();
            }

            imageToLoad.onerror() {
                if (tryCount < 3) {
                    /!**
                     * try to load the image 3 times,
                     * leave a slight delay so we don't get
                     * servers blocking the request.
                     *!/
                    setTimeout(function () {
                        this.progressiveLazyLoad(tryCount + 1);
                    }, 500);
                } else {
                    image.removeAttr('data-lazy').removeClass('slick-loading').addClass('slick-lazyload-error');

                    this.$slider.trigger('lazyLoadError', [_, image, imageSource]);

                    this.progressiveLazyLoad();
                }
            }

            imageToLoad.src = imageSource;
        } else {
            this.$slider.trigger('allImagesLoaded', [_]);
        }
    }*/

    // ----------------------
    // Complete
    // ---------------------
    refresh(initializing) {
        var _ = this,
            currentSlide,
            lastVisibleIndex;

        lastVisibleIndex = this.slideCount - this.options.slidesToShow;

        // in non-infinite sliders, we don't want to go past the
        // last visible index.
        if (!this.options.infinite && this.currentSlide > lastVisibleIndex) {
            this.currentSlide = lastVisibleIndex;
        }

        // if less slides than to show, go to start.
        if (this.slideCount <= this.options.slidesToShow) {
            this.currentSlide = 0;
        }

        currentSlide = this.currentSlide;

        this.destroy(true);

        this.extendAll(_, this.initials, { currentSlide: currentSlide });

        this.init();

        if (!initializing) {
            this.changeSlide(
                {
                    data: {
                        message: 'index',
                        index: currentSlide
                    }
                },
                false
            );
        }
    }

    // --------------------------
    // Complete
    // --------------------------
    registerBreakpoints() {
        let breakpoint;
        let currentBreakpoint;
        let l;
        let responsiveSettings = this.options.responsive || null;

        if (Array.isArray(responsiveSettings) && responsiveSettings.length) {
            this.respondTo = this.options.respondTo || 'window';

            for (breakpoint of responsiveSettings) {
                l = this.breakpoints.length - 1;

                currentBreakpoint = breakpoint.breakpoint;
                // loop through the breakpoints and cut out any existing
                // ones with the same breakpoint number, we don't want dupes.
                while (l >= 0) {
                    if (this.breakpoints[l] && this.breakpoints[l] === currentBreakpoint) {
                        this.breakpoints.splice(l, 1);
                    }
                    l--;
                }

                this.breakpoints.push(currentBreakpoint);
                this.breakpointSettings[currentBreakpoint] = breakpoint.settings;
            }
            this.breakpoints.sort((a, b) => {
                return this.options.mobileFirst ? a - b : b - a;
            });
        }
    }

    // --------------------------
    // Complete
    // --------------------------
    reinit() {
        /*this.$slides =
            thisSlideTrack
                .children(this.options.slide)
                .addClass('slick-slide');*/
        this.$slides = this.$slideTrack.children;
        // @ts-ignore
        for (let item of this.$slides) {
            item.classList.add('slick-slide');
        }

        this.slideCount = this.$slides.length;

        if (this.currentSlide >= this.slideCount && this.currentSlide !== 0) {
            this.currentSlide = this.currentSlide - this.options.slidesToScroll;
        }

        if (this.slideCount <= this.options.slidesToShow) {
            this.currentSlide = 0;
        }

        this.registerBreakpoints();

        this.setProps();
        this.setupInfinite();
        this.buildArrows();
        this.updateArrows();
        this.initArrowEvents();
        this.buildDots();
        this.updateDots();
        this.initDotEvents();
        this.cleanUpSlideEvents();
        this.initSlideEvents();

        this.checkResponsive(false, true);

        if (this.options.focusOnSelect === true) {
            // Not using this yet
            // $(thisSlideTrack).children().on('click.slick', this.selectHandler);
        }

        this.setSlideClasses(typeof this.currentSlide === 'number' ? this.currentSlide : 0);

        this.setPosition();
        this.focusHandler();

        this.paused = !this.options.autoplay;
        this.autoPlay();

        //$(this.$slider).trigger('reInit', [_]);
        const event = this.createTrigger('reInit', [this]);
        this.$slider.dispatchEvent(event);
    }

    // ------------------------
    // Complete
    // ------------------------
    resize() {
        //const _ = this;

        if (window.innerWidth !== this.windowWidth) {
            clearTimeout(this.windowDelay);
            this.windowDelay = setTimeout(() => {
                this.windowWidth = window.innerWidth;
                this.checkResponsive();
                if (!this.unslicked) {
                    this.setPosition();
                }
            }, 50);
        }
    }

    // --------------------------
    // Complete
    // --------------------------
    removeSlide(index, removeBefore = false, removeAll = false) {
        if (typeof index === 'boolean') {
            removeBefore = index;
            index = removeBefore === true ? 0 : this.slideCount - 1;
        } else {
            index = removeBefore === true ? --index : index;
        }

        if (this.slideCount < 1 || index < 0 || index > this.slideCount - 1) {
            return false;
        }

        this.unload();

        if (removeAll === true) {
            // @ts-ignore
            for (let item of Array.from(this.$slideTrack.children)) {
                item.parentNode.removeChild(item);
            }
        } else {
            const toRemove = this.$slideTrack.children[index];
            toRemove.parentNode.removeChild(toRemove);
        }

        // @ts-ignore
        this.$slides = Array.from(this.$slideTrack.children);

        // @ts-ignore
        for (let item of Array.from(this.$slideTrack.children)) {
            item.parentNode.removeChild(item);
        }

        // @ts-ignore
        for (let item of this.$slides) {
            this.$slideTrack.appendChild(item);
        }

        this.$slidesCache = this.$slides;

        this.reinit();
    }

    // --------------------------
    // Complete
    // --------------------------
    setCSS(position) {
        var _ = this,
            positionProps = {},
            x,
            y;

        if (this.options.rtl === true) {
            position = -position;
        }
        x = this.positionProp === 'left' ? Math.ceil(position) + 'px' : '0px';
        y = this.positionProp === 'top' ? Math.ceil(position) + 'px' : '0px';

        positionProps[this.animType] = 'translate3d(' + x + ', ' + y + ', 0px)';

        this.cssAppender(this.$slideTrack, positionProps);
    }

    //------------------
    // Complete
    // ----------------
    setDimensions() {
        if (this.options.vertical === false) {
            if (this.options.centerMode === true) {
                /*thisList.css({
                    padding: ('0px ' + this.options.centerPadding)
                });*/
                this.cssAppender(this.$list, {
                    padding: '0px ' + this.options.centerPadding
                });
            }
        } else {
            const outerHeight = this.get_OuterHeight(this.$slides[0], true) * this.options.slidesToShow;
            this.set_Height(this.$list, outerHeight);

            if (this.options.centerMode === true) {
                /*thisList.css({
                    padding: (this.options.centerPadding + ' 0px')
                });*/
                this.cssAppender(this.$list, {
                    padding: this.options.centerPadding + ' 0px'
                });
            }
        }

        if (this.options.centerMode === true) {
            this.listWidth = this.get_Width(this.$list, true);
        } else {
            this.listWidth = this.get_Width(this.$list);
        }

        this.listHeight = this.get_Height(this.$list);

        if (this.options.vertical === false && this.options.variableWidth === false) {
            if (!this.options.slideWidth) {
                this.slideWidth = Math.ceil(this.listWidth / this.options.slidesToShow);
            } else {
                this.slideWidth = this.options.slideWidth;
            }

            const width = Math.ceil(this.slideWidth * this.$slideTrack.children.length);

            this.set_Width(this.$slideTrack, width);
        } else if (this.options.variableWidth === true) {
            this.set_Width(this.$slideTrack, 5000 * this.slideCount); // <= seems a bit weird ?? 5000 ??
            //this.set_Width(this.$slideTrack, this.get_OuterHeight(this.$slides[0], true) * this.slideCount);
        } else {
            this.slideWidth = Math.ceil(this.listWidth);

            const calc = Math.ceil(this.get_OuterHeight(this.$slides[0], true) * this.$slideTrack.children.length);
            this.set_Height(this.$slideTrack, calc);
        }

        const offset = this.get_OuterWidth(this.$slides[0], true) - this.get_OuterWidth(this.$slides[0]);

        if (this.options.variableWidth === false) {
            // @ts-ignore
            for (let el of this.$slideTrack.children) {
                this.set_Width(el, this.slideWidth - offset);
            }
        }
    }

    // --------------------------
    // Complete
    // --------------------------
    get_OuterHeight(el, withMargin) {
        if (withMargin) {
            var height = el.offsetHeight;
            var style = getComputedStyle(el);

            // tslint:disable-next-line:radix
            height += parseInt(style.marginTop) + parseInt(style.marginBottom);
            return height;
        } else {
            let num = el.offsetHeight;
            if (num) {
                return num;
            }

            return 0;
        }
    }

    // --------------------------
    // Complete
    // --------------------------
    get_OuterWidth(el, withMargin = false) {
        if (withMargin) {
            var width = el.offsetWidth;
            var style = getComputedStyle(el);

            // tslint:disable-next-line:radix
            width += parseInt(style.marginLeft) + parseInt(style.marginRight);
            return width;
        } else {
            let num = el.offsetWidth;
            if (num) {
                return num;
            }

            return 0;
        }
    }

    //-----------------------------------
    // Complete
    //-----------------------------------
    get_Width(el, removePadding = false) {
        let comp = getComputedStyle(el, null);

        if (removePadding) {
            let num = parseFloat(comp.width.replace('px', ''));
            let padLeft = parseFloat(comp.paddingLeft.replace('px', ''));
            let padRight = parseFloat(comp.paddingRight.replace('px', ''));
            if (num) {
                return num - padLeft - padRight;
            }
        } else {
            let num = parseFloat(comp.width.replace('px', ''));
            if (num) {
                return num;
            }
        }

        return 0;
    }

    //-----------------------------------
    // Complete
    //-----------------------------------
    get_Height(el) {
        let num = parseFloat(getComputedStyle(el, null).height.replace('px', ''));
        if (num) {
            return num;
        }

        return 0;
    }

    //-----------------------------------
    // Complete
    //-----------------------------------
    set_Height(el, val) {
        if (typeof val === 'function') val = val();
        if (typeof val === 'string') el.style.height = val;
        else el.style.height = val + 'px';
    }

    //-----------------------------------
    // Complete
    //-----------------------------------
    set_Width(el, val) {
        if (typeof val === 'function') val = val();
        if (typeof val === 'string') el.style.width = val;
        else el.style.width = val + 'px';
    }

    //-----------------------------------
    // Complete
    // ----- Not using "setFade"
    //-----------------------------------
    setFade() {
        var _ = this,
            targetLeft;

        /*this.$slides.each(function (index, element) {
            targetLeft = this.slideWidth * index * -1;
            if (this.options.rtl === true) {
                $(element).css({
                    position: 'relative',
                    right: targetLeft,
                    top: 0,
                    zIndex: this.options.zIndex - 2,
                    opacity: 0
                });
            } else {
                $(element).css({
                    position: 'relative',
                    left: targetLeft,
                    top: 0,
                    zIndex: this.options.zIndex - 2,
                    opacity: 0
                });
            }
        });

        this.$slides.eq(this.currentSlide).css({
            zIndex: this.options.zIndex - 1,
            opacity: 1
        });*/
    }

    //-----------------------------------
    // Complete
    // ---- Not using "adaptiveHeight" yet
    //-----------------------------------
    setListHeight() {
        if (
            this.options.slidesToShow === 1 &&
            this.options.adaptiveHeight === true &&
            this.options.vertical === false
        ) {
            var targetHeight = this.get_OuterHeight(this.$slides[this.currentSlide], true);

            this.$list.style.height = targetHeight;
        }
    }

    // --------------------------
    // Complete
    // --------------------------
    setOption() {
        /**
         * accepts arguments in format of:
         *
         *  - for changing a single option's value:
         *     .slick("setOption", option, value, refresh )
         *
         *  - for changing a set of responsive options:
         *     .slick("setOption", 'responsive', [{}, ...], refresh )
         *
         *  - for updating multiple values at once (not responsive)
         *     .slick("setOption", { 'option': value, ... }, refresh )
         */

        var _ = this,
            l,
            option,
            value,
            refresh = false,
            type;

        /*
        if ($.type(arguments[0]) === 'object') {
            option = arguments[0];
            refresh = arguments[1];
            type = 'multiple';
        } else if ($.type(arguments[0]) === 'string') {
            option = arguments[0];
            value = arguments[1];
            refresh = arguments[2];

            if (arguments[0] === 'responsive' && $.type(arguments[1]) === 'array') {
                type = 'responsive';
            } else if (typeof arguments[1] !== 'undefined') {
                type = 'single';
            }
        }

        if (type === 'single') {
            this.options[option] = value;
        } else if (type === 'multiple') {
            $.each(option, function (opt, val) {
                this.options[opt] = val;
            });
        } else if (type === 'responsive') {
            for (let item in value) {
                if ($.type(this.options.responsive) !== 'array') {
                    this.options.responsive = [value[item]];
                } else {
                    l = this.options.responsive.length - 1;

                    // loop through the responsive object and splice out duplicates.
                    while (l >= 0) {
                        if (this.options.responsive[l].breakpoint === value[item].breakpoint) {
                            this.options.responsive.splice(l, 1);
                        }

                        l--;
                    }

                    this.options.responsive.push(value[item]);
                }
            }
        }*/

        if (refresh) {
            this.unload();
            this.reinit();
        }
    }

    // ------------------------
    // Complete
    // ------------------------
    setPosition() {
        this.setDimensions();

        this.setListHeight();

        if (this.options.fade === false) {
            this.setCSS(this.getLeft(this.currentSlide));
        } else {
            this.setFade();
        }

        //dont really want or need this trigger event
        //$(this.$slider).trigger('setPosition', [_]);
        //const event = this.createTrigger('setPosition', [_]);
        //this.$slider.dispatchEvent(event);

        /*const event = this.createTrigger('setPosition', [this]);
        this.$slider.dispatchEvent(event);*/
    }

    // --------------------------
    // Complete
    // --------------------------
    setProps() {
        var _ = this,
            bodyStyle = document.body.style as any;

        this.positionProp = this.options.vertical === true ? 'top' : 'left';

        if (this.positionProp === 'top') {
            this.$slider.classList.add('slick-vertical');
        } else {
            this.$slider.classList.remove('slick-vertical');
        }

        if (
            bodyStyle.WebkitTransition !== undefined ||
            bodyStyle.MozTransition !== undefined ||
            bodyStyle.msTransition !== undefined
        ) {
            if (this.options.useCSS === true) {
                this.cssTransitions = true;
            }
        }

        if (this.options.fade) {
            if (typeof this.options.zIndex === 'number') {
                if (this.options.zIndex < 3) {
                    this.options.zIndex = 3;
                }
            } else {
                this.options.zIndex = this.defaults.zIndex;
            }
        }

        if (bodyStyle.OTransform !== undefined) {
            this.animType = 'OTransform';
            this.transformType = '-o-transform';
            this.transitionType = 'OTransition';
            if (bodyStyle.perspectiveProperty === undefined && bodyStyle.webkitPerspective === undefined)
                this.animType = false;
        }
        if (bodyStyle.MozTransform !== undefined) {
            this.animType = 'MozTransform';
            this.transformType = '-moz-transform';
            this.transitionType = 'MozTransition';
            if (bodyStyle.perspectiveProperty === undefined && bodyStyle.MozPerspective === undefined)
                this.animType = false;
        }
        if (bodyStyle.webkitTransform !== undefined) {
            this.animType = 'webkitTransform';
            this.transformType = '-webkit-transform';
            this.transitionType = 'webkitTransition';
            if (bodyStyle.perspectiveProperty === undefined && bodyStyle.webkitPerspective === undefined)
                this.animType = false;
        }
        if (bodyStyle.msTransform !== undefined) {
            this.animType = 'msTransform';
            this.transformType = '-ms-transform';
            this.transitionType = 'msTransition';
            if (!bodyStyle.msTransform) this.animType = false;
        }
        if (bodyStyle.transform !== undefined && this.animType !== false) {
            this.animType = 'transform';
            this.transformType = 'transform';
            this.transitionType = 'transition';
        }
        this.transformsEnabled = this.options.useTransform && this.animType !== null && this.animType !== false;
    }

    // ------------------
    // Complete
    // ------------------
    setSlideClasses(index) {
        var _ = this,
            centerOffset,
            allSlides,
            indexOffset,
            remainder;

        // @ts-ignore
        allSlides = Array.from(this.$slider.querySelectorAll('.slick-slide'));
        for (let item of allSlides) {
            item.classList.remove('slick-active');
            item.classList.remove('slick-center');
            item.classList.remove('slick-current');

            item.setAttribute('aria-hidden', 'true');
        }

        if (this.$slides[index]) {
            this.$slides[index].classList.add('slick-current');
        }

        if (this.options.centerMode === true) {
            var evenCoef = this.options.slidesToShow % 2 === 0 ? 1 : 0;

            centerOffset = Math.floor(this.options.slidesToShow / 2);

            if (this.options.infinite === true) {
                //do cloned slides "selected" manipulation
                if (this.slideCount - 1 === index) {
                    let x = Array.from(this.$slides).find((t) => {
                        return t.classList.contains('slick-clone-start');
                    });
                    x.classList.add('slick-current');
                } else if (index === 0) {
                    let x = Array.from(this.$slides).find((t) => {
                        return t.classList.contains('slick-clone-end');
                    });
                    x.classList.add('slick-current');
                }

                if (index >= centerOffset && index <= this.slideCount - 1 - centerOffset) {
                    // @ts-ignore
                    const ss = allSlides.slice(
                        //const ss = Array.from(this.$slides).slice(
                        index - centerOffset + evenCoef,
                        index + centerOffset + 1
                    );
                    for (let item of ss) {
                        item.classList.add('slick-active');
                        item.setAttribute('aria-hidden', 'false');
                    }
                } else {
                    indexOffset = this.options.slidesToShow + index;
                    const ss = allSlides.slice(
                        // const ss = Array.from(this.$slides).slice(
                        indexOffset - centerOffset + 1 + evenCoef,
                        indexOffset + centerOffset + 2
                    );

                    for (let item of ss) {
                        item.classList.add('slick-active');
                        item.setAttribute('aria-hidden', 'false');
                    }
                }

                if (index === 0) {
                    allSlides[this.options.slidesToShow + this.slideCount + 1].classList.add('slick-center');
                } else if (index === this.slideCount - 1) {
                    allSlides[this.options.slidesToShow].classList.add('slick-center');
                }
            }

            if (this.$slides[index]) {
                this.$slides[index].classList.add('slick-center');
            }
        } else {
            if (index >= 0 && index <= this.slideCount - this.options.slidesToShow) {
                // probably need to loop through the array here..??
                // @ts-ignore
                const ss = Array.from(this.$slides).slice(index, index + this.options.slidesToShow);
                for (let item of ss) {
                    item.classList.add('slick-active');
                    item.setAttribute('aria-hidden', 'false');
                }
            } else if (allSlides.length <= this.options.slidesToShow) {
                /*allSlides
                    .addClass('slick-active')
                    .attr('aria-hidden', 'false');*/
                for (let item of allSlides) {
                    item.classList.add('slick-active');
                    item.setAttribute('aria-hidden', 'false');
                }
            } else {
                remainder = this.slideCount % this.options.slidesToShow;
                indexOffset = this.options.infinite === true ? this.options.slidesToShow + index : index;

                if (
                    this.options.slidesToShow === this.options.slidesToScroll &&
                    this.slideCount - index < this.options.slidesToShow
                ) {
                    const slicer = allSlides.slice(
                        indexOffset - (this.options.slidesToShow - remainder),
                        indexOffset + remainder
                    );
                    for (let item of slicer) {
                        item.classList.add('slick-active');
                        item.setAttribute('aria-hidden', 'false');
                    }
                } else {
                    const slicer = allSlides.slice(indexOffset, indexOffset + this.options.slidesToShow);
                    for (let item of slicer) {
                        item.classList.add('slick-active');
                        item.setAttribute('aria-hidden', 'false');
                    }
                }
            }
        }

        if (this.options.lazyLoad === 'ondemand' || this.options.lazyLoad === 'anticipated') {
            // not doing this yet
            //this.lazyLoad();
        }
    }

    // ------------------------
    // Complete
    // ------------------------
    setupInfinite() {
        let i, slideIndex, infiniteCount;

        if (this.options.fade === true) {
            this.options.centerMode = false;
        }

        if (this.options.infinite === true && this.options.fade === false) {
            slideIndex = null;

            if (this.slideCount > this.options.slidesToShow) {
                if (this.options.centerMode === true) {
                    infiniteCount = this.options.slidesToShow + 1;
                } else {
                    infiniteCount = this.options.slidesToShow;
                }

                const slideCopy = Array.from(this.$slides);
                let first = true;

                for (i = this.slideCount; i > this.slideCount - infiniteCount; i -= 1) {
                    slideIndex = i - 1;
                    const el = slideCopy[slideIndex];

                    const clone = el.cloneNode(true) as HTMLElement;
                    clone.setAttribute('id', '');
                    clone.setAttribute('data-slick-index', (slideIndex - this.slideCount).toString());
                    clone.classList.add('slick-cloned');

                    if (first) {
                        first = false;
                        clone.classList.add('slick-clone-start');
                    }

                    this.$slideTrack.insertBefore(clone, this.$slideTrack.firstChild);
                }

                first = true;
                for (i = 0; i < infiniteCount + this.slideCount; i += 1) {
                    slideIndex = i;
                    const el = slideCopy[slideIndex];

                    if (el) {
                        const clone = el.cloneNode(true) as HTMLElement;
                        clone.setAttribute('id', '');
                        clone.setAttribute('data-slick-index', (slideIndex + this.slideCount).toString());
                        clone.classList.add('slick-cloned');

                        if (first) {
                            first = false;
                            clone.classList.add('slick-clone-end');
                        }

                        this.$slideTrack.appendChild(clone);
                    }
                }

                // do i still need to do this..??
                /* this.$slideTrack
                    .find('.slick-cloned')
                    .find('[id]')
                    .each(function () {
                        $(this).attr('id', '');
                    });*/
            }
        }
    }

    // ------------------------
    // Complete
    // ------------------------
    interrupt(toggle) {
        if (!toggle) {
            this.autoPlay();
        }
        this.interrupted = toggle;
    }

    /*selectHandler(event) {
        var targetElement = $(event.target).is('.slick-slide')
            ? $(event.target)
            : $(event.target).parents('.slick-slide');

        var index = parseInt(targetElement.attr('data-slick-index'));

        if (!index) index = 0;

        if (this.slideCount <= this.options.slidesToShow) {
            this.slideHandler(index, false, true);
            return;
        }

        this.slideHandler(index);
    }*/

    // ---------------------------
    // Complete
    // -- not using "asNavFor"
    // ---------------------------
    slideHandler(index, sync = false, dontAnimate = false) {
        var targetSlide,
            animSlide,
            oldSlide,
            slideLeft,
            targetLeft = null,
            _ = this,
            navTarget;

        if (this.animating === true && this.options.waitForAnimate === true) {
            return;
        }

        if (this.options.fade === true && this.currentSlide === index) {
            return;
        }

        if (sync === false) {
            // this.asNavFor(index);
        }

        targetSlide = index;
        targetLeft = this.getLeft(targetSlide);
        slideLeft = this.getLeft(this.currentSlide);

        this.currentLeft = this.swipeLeft === null ? slideLeft : this.swipeLeft;

        if (
            this.options.infinite === false &&
            this.options.centerMode === false &&
            (index < 0 || index > this.getDotCount() * this.options.slidesToScroll)
        ) {
            if (this.options.fade === false) {
                targetSlide = this.currentSlide;
                if (dontAnimate !== true && this.slideCount > this.options.slidesToShow) {
                    this.animateSlide(slideLeft, () => {
                        this.postSlide(targetSlide);
                    });
                } else {
                    this.postSlide(targetSlide);
                }
            }
            return;
        } else if (
            this.options.infinite === false &&
            this.options.centerMode === true &&
            (index < 0 || index > this.slideCount - this.options.slidesToScroll)
        ) {
            if (this.options.fade === false) {
                targetSlide = this.currentSlide;
                if (dontAnimate !== true && this.slideCount > this.options.slidesToShow) {
                    this.animateSlide(slideLeft, () => {
                        this.postSlide(targetSlide);
                    });
                } else {
                    this.postSlide(targetSlide);
                }
            }
            return;
        }

        if (this.options.autoplay) {
            clearInterval(this.autoPlayTimer);
        }

        if (targetSlide < 0) {
            if (this.slideCount % this.options.slidesToScroll !== 0) {
                animSlide = this.slideCount - (this.slideCount % this.options.slidesToScroll);
            } else {
                animSlide = this.slideCount + targetSlide;
            }
        } else if (targetSlide >= this.slideCount) {
            if (this.slideCount % this.options.slidesToScroll !== 0) {
                animSlide = 0;
            } else {
                animSlide = targetSlide - this.slideCount;
            }
        } else {
            animSlide = targetSlide;
        }

        this.animating = true;

        const event = this.createTrigger('beforeChange', [_, this.currentSlide, animSlide]);
        this.$slider.dispatchEvent(event);

        oldSlide = this.currentSlide;
        this.currentSlide = animSlide;

        this.setSlideClasses(this.currentSlide);

        if (this.options.asNavFor) {
            navTarget = this.getNavTarget();
            navTarget = navTarget.slick('getSlick');

            if (navTarget.slideCount <= navTarget.options.slidesToShow) {
                navTarget.setSlideClasses(this.currentSlide);
            }
        }

        this.updateDots();
        this.updateArrows();

        if (this.options.fade === true) {
            if (dontAnimate !== true) {
                this.fadeSlideOut(oldSlide);

                this.fadeSlide(animSlide, () => {
                    this.postSlide(animSlide);
                });
            } else {
                this.postSlide(animSlide);
            }
            this.animateHeight();
            return;
        }

        if (dontAnimate !== true && this.slideCount > this.options.slidesToShow) {
            this.animateSlide(targetLeft, () => {
                this.postSlide(animSlide);
            });
        } else {
            this.postSlide(animSlide);
        }
    }

    // --------------------------
    // Complete
    // ---------------------------
    startLoad() {
        if (this.options.arrows === true && this.slideCount > this.options.slidesToShow) {
            this.$prevArrow.style.display = 'none';
            this.$nextArrow.style.display = 'none';
        }

        if (this.options.dots === true && this.slideCount > this.options.slidesToShow) {
            this.$dots.style.display = 'none';
        }

        this.$slider.classList.add('slick-loading');
    }

    // ------------------------
    // Complete
    // ------------------------
    swipeDirection() {
        var xDist,
            yDist,
            r,
            swipeAngle,
            _ = this;

        xDist = this.touchObject.startX - this.touchObject.curX;
        yDist = this.touchObject.startY - this.touchObject.curY;
        r = Math.atan2(yDist, xDist);

        swipeAngle = Math.round((r * 180) / Math.PI);
        if (swipeAngle < 0) {
            swipeAngle = 360 - Math.abs(swipeAngle);
        }

        if (swipeAngle <= 45 && swipeAngle >= 0) {
            return this.options.rtl === false ? 'left' : 'right';
        }
        if (swipeAngle <= 360 && swipeAngle >= 315) {
            return this.options.rtl === false ? 'left' : 'right';
        }
        if (swipeAngle >= 135 && swipeAngle <= 225) {
            return this.options.rtl === false ? 'right' : 'left';
        }
        if (this.options.verticalSwiping === true) {
            if (swipeAngle >= 35 && swipeAngle <= 135) {
                return 'down';
            } else {
                return 'up';
            }
        }

        return 'vertical';
    }

    // ------------------------
    // Complete
    // ------------------------
    swipeEnd(event) {
        var _ = this,
            slideCount,
            direction;

        this.dragging = false;
        this.swiping = false;

        if (this.scrolling) {
            this.scrolling = false;
            return false;
        }

        this.interrupted = false;
        this.shouldClick = this.touchObject.swipeLength > 10 ? false : true;

        if (this.touchObject.curX === undefined) {
            return false;
        }

        if (this.touchObject.edgeHit === true) {
            // tslint:disable-next-line:no-shadowed-variable
            const event = this.createTrigger('edge', [_, this.swipeDirection()]);
            this.$slider.dispatchEvent(event);
        }

        if (this.touchObject.swipeLength >= this.touchObject.minSwipe) {
            direction = this.swipeDirection();

            switch (direction) {
                case 'left':
                case 'down':
                    slideCount = this.options.swipeToSlide
                        ? this.checkNavigable(this.currentSlide + this.getSlideCount())
                        : this.currentSlide + this.getSlideCount();

                    this.currentDirection = 0;

                    break;

                case 'right':
                case 'up':
                    slideCount = this.options.swipeToSlide
                        ? this.checkNavigable(this.currentSlide - this.getSlideCount())
                        : this.currentSlide - this.getSlideCount();

                    this.currentDirection = 1;

                    break;

                default:
            }

            if (direction !== 'vertical') {
                this.slideHandler(slideCount);
                this.touchObject = { ...this.originalTouchObject };

                // tslint:disable-next-line:no-shadowed-variable
                const event = this.createTrigger('swipe', [_, direction]);
                this.$slider.dispatchEvent(event);
            }
        } else {
            if (this.touchObject.startX !== this.touchObject.curX) {
                this.slideHandler(this.currentSlide);
                this.touchObject = { ...this.originalTouchObject };
            }
        }
    }

    // ------------------------
    // Complete
    // ------------------------
    createTrigger(eventName, data) {
        let event;
        if (window.CustomEvent && typeof window.CustomEvent === 'function') {
            event = new CustomEvent(eventName, { detail: data });
        } else {
            event = document.createEvent('CustomEvent');
            event.initCustomEvent(eventName, true, true, data);
        }

        return event;
    }

    startSwipeHandler(event) {
        event.data = { action: 'start' };
        event.originalEvent = event;
        this.swipeHandler(event);
    }

    moveSwipeHandler(event) {
        event.data = { action: 'move' };
        event.originalEvent = event;
        this.swipeHandler(event);
    }

    endSwipeHandler(event) {
        event.data = { action: 'end' };
        event.originalEvent = event;
        this.swipeHandler(event);
    }

    // ------------------------
    // Complete
    // ------------------------
    swipeHandler(event) {
        // @ts-ignore
        if (this.options.swipe === false || ('ontouchend' in document && this.options.swipe === false)) {
            return;
        } else if (this.options.draggable === false && event.type.indexOf('mouse') !== -1) {
            return;
        }

        this.touchObject.fingerCount =
            event.originalEvent && event.originalEvent.touches !== undefined ? event.originalEvent.touches.length : 1;

        this.touchObject.minSwipe = this.listWidth / this.options.touchThreshold;

        if (this.options.verticalSwiping === true) {
            this.touchObject.minSwipe = this.listHeight / this.options.touchThreshold;
        }

        switch (event.data.action) {
            case 'start':
                this.swipeStart(event);
                break;

            case 'move':
                this.swipeMove(event);
                break;

            case 'end':
                this.swipeEnd(event);
                break;
        }
    }

    // ------------------------
    // Complete
    // ------------------------
    swipeMove(event) {
        var _ = this,
            edgeWasHit = false,
            curLeft,
            swipeDirection,
            swipeLength,
            positionOffset,
            touches,
            verticalSwipeLength;

        touches = event.originalEvent !== undefined ? event.originalEvent.touches : null;

        if (!this.dragging || this.scrolling || (touches && touches.length !== 1)) {
            return false;
        }

        curLeft = this.getLeft(this.currentSlide);

        this.touchObject.curX = touches !== undefined ? touches[0].pageX : event.clientX;
        this.touchObject.curY = touches !== undefined ? touches[0].pageY : event.clientY;

        this.touchObject.swipeLength = Math.round(
            Math.sqrt(Math.pow(this.touchObject.curX - this.touchObject.startX, 2))
        );

        verticalSwipeLength = Math.round(Math.sqrt(Math.pow(this.touchObject.curY - this.touchObject.startY, 2)));

        if (!this.options.verticalSwiping && !this.swiping && verticalSwipeLength > 4) {
            this.scrolling = true;
            return false;
        }

        if (this.options.verticalSwiping === true) {
            this.touchObject.swipeLength = verticalSwipeLength;
        }

        swipeDirection = this.swipeDirection();

        if (event.originalEvent !== undefined && this.touchObject.swipeLength > 4) {
            this.swiping = true;
            event.preventDefault();
        }

        positionOffset =
            (this.options.rtl === false ? 1 : -1) * (this.touchObject.curX > this.touchObject.startX ? 1 : -1);
        if (this.options.verticalSwiping === true) {
            positionOffset = this.touchObject.curY > this.touchObject.startY ? 1 : -1;
        }

        swipeLength = this.touchObject.swipeLength;

        this.touchObject.edgeHit = false;

        if (this.options.infinite === false) {
            if (
                (this.currentSlide === 0 && swipeDirection === 'right') ||
                (this.currentSlide >= this.getDotCount() && swipeDirection === 'left')
            ) {
                swipeLength = this.touchObject.swipeLength * this.options.edgeFriction;
                this.touchObject.edgeHit = true;
            }
        }

        if (this.options.vertical === false) {
            this.swipeLeft = curLeft + swipeLength * positionOffset;
        } else {
            this.swipeLeft = curLeft + swipeLength * (this.$list.height() / this.listWidth) * positionOffset;
        }
        if (this.options.verticalSwiping === true) {
            this.swipeLeft = curLeft + swipeLength * positionOffset;
        }

        if (this.options.fade === true || this.options.touchMove === false) {
            return false;
        }

        if (this.animating === true) {
            this.swipeLeft = null;
            return false;
        }

        this.setCSS(this.swipeLeft);
    }

    // ------------------------
    // Complete
    // ------------------------
    swipeStart(event) {
        var _ = this,
            touches;

        this.interrupted = true;

        if (this.touchObject.fingerCount !== 1 || this.slideCount <= this.options.slidesToShow) {
            this.touchObject = { ...this.originalTouchObject };
            return false;
        }

        if (event.originalEvent !== undefined && event.originalEvent.touches !== undefined) {
            touches = event.originalEvent.touches[0];
        }

        this.touchObject.startX = this.touchObject.curX = touches !== undefined ? touches.pageX : event.clientX;
        this.touchObject.startY = this.touchObject.curY = touches !== undefined ? touches.pageY : event.clientY;

        this.dragging = true;
    }

    // ------------------------
    // Complete
    // -- not filtering
    // ------------------------
    /* unfilterSlides() {
        const thisSlideTrack = $(this.$slideTrack);

        if (this.$slidesCache !== null) {
            this.unload();

            thisSlideTrack.children(this.options.slide).detach();

            this.$slidesCache.appendTo(thisSlideTrack);

            this.reinit();
        }
    }*/

    // ------------------------
    // Complete
    // ------------------------
    unload() {
        const _ = this;
        this.queryAll('.slick-cloned', this.$slider).forEach(function (elem) {
            _.removeNodeUtil(elem);
        });

        if (this.$dots) {
            this.removeNodeUtil(this.$dots);
        }

        if (this.$prevArrow && this.htmlExpr.test(this.options.prevArrow)) {
            this.removeNodeUtil(this.$prevArrow);
        }

        if (this.$nextArrow && this.htmlExpr.test(this.options.nextArrow)) {
            this.removeNodeUtil(this.$nextArrow);
        }

        // @ts-ignore
        for (let item of this.$slides) {
            //this.removeClasses(item, ['slick-slide', 'slick-active', 'slick-visible', 'slick-current']);
            item.classList.remove('slick-slide', 'slick-active', 'slick-visible', 'slick-current');
            item.setAttribute('aria-hidden', 'true');
            item.style.width = '';
        }
    }

    // ------------------------
    // Complete
    // ------------------------
    removeNodeUtil(el) {
        var nodeRemoved = el;
        if (el.parentNode) {
            //Prevent error if node is all ready disconnected from the dom.
            nodeRemoved = el.parentNode.removeChild(el);
        }
        return nodeRemoved;
    }

    // ------------------------
    // Complete
    // ------------------------
    queryAll(expr, container) {
        if (!container) {
            return [];
        }
        
        return Array.prototype.slice.call(container.querySelectorAll(expr));
    }

    // ------------------------
    // Complete
    // ------------------------
    unslick(fromBreakpoint = null) {
        //this.$slider.trigger('unslick', [_, fromBreakpoint]);
        const event = this.createTrigger('unslick', [this, fromBreakpoint]);
        this.$slider.dispatchEvent(event);

        this.destroy();
    }

    // --------------------------
    // Complete
    // --------------------------
    updateArrows() {
        var _ = this,
            centerOffset;

        centerOffset = Math.floor(this.options.slidesToShow / 2);

        if (this.options.arrows === true && this.slideCount > this.options.slidesToShow && !this.options.infinite) {
            this.$prevArrow.classList.remove('slick-disabled');
            this.$nextArrow.classList.remove('slick-disabled');

            this.$prevArrow.setAttribute('aria-disabled', 'false');
            this.$nextArrow.setAttribute('aria-disabled', 'false');

            if (this.currentSlide === 0) {
                this.$prevArrow.classList.add('slick-disabled');
                this.$nextArrow.classList.remove('slick-disabled');

                this.$prevArrow.setAttribute('aria-disabled', 'true');
                this.$nextArrow.setAttribute('aria-disabled', 'false');
            } else if (
                this.currentSlide >= this.slideCount - this.options.slidesToShow &&
                this.options.centerMode === false
            ) {
                this.$nextArrow.classList.add('slick-disabled');
                this.$prevArrow.classList.remove('slick-disabled');

                this.$nextArrow.setAttribute('aria-disabled', 'true');
                this.$prevArrow.setAttribute('aria-disabled', 'false');
            } else if (this.currentSlide >= this.slideCount - 1 && this.options.centerMode === true) {
                this.$nextArrow.classList.add('slick-disabled');
                this.$prevArrow.classList.remove('slick-disabled');

                this.$nextArrow.setAttribute('aria-disabled', 'true');
                this.$prevArrow.setAttribute('aria-disabled', 'false');
            }
        }
    }

    // ------------------------
    // Complete
    // ------------------------
    updateDots() {
        //const thisDots = $(this.$dots);

        if (this.$dots) {
            const list = this.$dots.querySelectorAll('li');
            for (let li of list) {
                li.classList.remove('slick-active');
            }

            const index = Math.floor(this.currentSlide / this.options.slidesToScroll);
            const activeLi = this.$dots.querySelectorAll('li')[index];
            activeLi.classList.add('slick-active');
        }
    }

    // ------------------------
    // Complete
    // ------------------------
    visibility() {
        if (this.options.autoplay) {
            if (document[this.hidden]) {
                this.interrupted = true;
            } else {
                this.interrupted = false;
            }
        }
    }
}
