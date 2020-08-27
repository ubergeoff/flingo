declare var $: any;

export class SlickService {
    /*
     _ _      _       _
 ___| (_) ___| | __  (_)___
/ __| | |/ __| |/ /  | / __|
\__ \ | | (__|   < _ | \__ \
|___/_|_|\___|_|\_(_)/ |___/
                   |__/

 Version:          0.1.0
 Original Author:  Ken Wheeler
 Vanilla Slick By: UberGeoff
 Website:          http://kenwheeler.github.io
    Docs:          http://kenwheeler.github.io/slick
    Repo:          http://github.com/kenwheeler/slick
  Issues:          http://github.com/kenwheeler/slick/issues



 */

    instanceUid = 0;

    accessibility = true;
    adaptiveHeight = false;
    appendArrows;
    appendDots;
    arrows = true;
    asNavFor = null;
    prevArrow = '<button class="slick-prev" aria-label="Previous" type="button">Previous</button>';
    nextArrow = '<button class="slick-next" aria-label="Next" type="button">Next</button>';
    autoplay = false;
    autoplaySpeed = 3000;
    centerMode = false;
    centerPadding = '50px';
    cssEase = 'ease';
    customPaging;
    dots = false;
    dotsClass = 'slick-dots';
    draggable = true;
    easing = 'linear';
    edgeFriction = 0.35;
    fade = false;
    focusOnSelect = false;
    focusOnChange = false;
    infinite = true;
    initialSlide = 0;
    lazyLoad = 'ondemand';
    mobileFirst = false;
    pauseOnHover = true;
    pauseOnFocus = true;
    pauseOnDotsHover = false;
    respondTo = 'window';
    responsive = null;
    rows = 1;
    rtl = false;
    slide = '';
    slidesPerRow = 1;
    slidesToShow = 1;
    slidesToScroll = 1;
    slideWidth = 0;
    speed = 500;
    swipe = true;
    swipeToSlide = false;
    touchMove = true;
    touchThreshold = 5;
    useCSS = true;
    useTransform = true;
    variableWidth = false;
    vertical = false;
    verticalSwiping = false;
    waitForAnimate = true;
    zIndex = 1000;

    dataSettings = null;

    defaults = {
        accessibility: true,
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
            //return $('<button type="button" />').text(i + 1);
            const button = document.createElement('button');
            //button.text = i + 1 + '';
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

    options = {
        accessibility: true,
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
            //return $('<button type="button" />').text(i + 1);
            const button = document.createElement('button');
            //button.text = i + 1 + '';
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

    activeBreakpoint = null;
    animType = null;
    //animProp = null;
    breakpoints = [];
    breakpointSettings = [];
    cssTransitions = false;
    focussed = false;
    interrupted = false;
    hidden = 'hidden';
    paused = true;
    positionProp = null;
    rowCount = 1;
    shouldClick = true;
    $slider;
    transformType = null;
    transitionType = null;
    visibilityChange = 'visibilitychange';
    windowWidth = 0;
    windowTimer = null;

    private currentSlide: any;
    private originalSettings: any;
    private htmlExpr: RegExp;
    private $slideTrack: any;
    private slideCount: number;
    $slides;
    private $slidesCache: any;
    private currentLeft: number;
    private $list: any;
    private transformsEnabled: Boolean;
    private autoPlayTimer: number;
    private direction: number;
    private animating: boolean;
    $prevArrow: any;
    $nextArrow: any;
    $dots: any;
    private slideOffset: number;
    private touchObject: any;
    private swipeLeft: number;
    private windowDelay: number;
    private listWidth: number;
    private dragging: boolean;
    private swiping: boolean;
    private unslicked: boolean;
    private listHeight: number;
    private scrolling: any;
    private currentDirection: number;

    constructor() {
        //$.extend(_, this.initials);
        //this.extendAll(_, this.initials);

        //dataSettings = $(element).data('slick') || {};

        //this.options = $.extend({}, this.defaults, settings, dataSettings);
        //this.options = this.extendAll({}, this.defaults, settings, dataSettings);

        //this.currentSlide = this.options.initialSlide;

        this.originalSettings = this.options;

        /*  if (typeof document.mozHidden !== 'undefined') {
              this.hidden = 'mozHidden';
              this.visibilityChange = 'mozvisibilitychange';
          } else if (typeof document.webkitHidden !== 'undefined') {
              this.hidden = 'webkitHidden';
              this.visibilityChange = 'webkitvisibilitychange';
          }*/

        this.autoPlay = $.proxy(this.autoPlay, this);
        this.autoPlayClear = $.proxy(this.autoPlayClear, this);
        this.autoPlayIterator = $.proxy(this.autoPlayIterator, this);
        this.changeSlide = $.proxy(this.changeSlide, this);
        this.clickHandler = $.proxy(this.clickHandler, this);
        /*this.selectHandler = $.proxy(this.selectHandler, _);
        this.setPosition = $.proxy(this.setPosition, _);
        this.swipeHandler = $.proxy(this.swipeHandler, _);
        this.dragHandler = $.proxy(this.dragHandler, _);
        this.keyHandler = $.proxy(this.keyHandler, _);*/

        this.instanceUid = this.instanceUid++;

        // A simple way to check for HTML strings
        // Strict HTML recognition (must start with <)
        // Extracted from jQuery v1.11 source
        this.htmlExpr = /^(?:\s*(<[\w\W]+>)[^>]*)$/;

        //this.registerBreakpoints();
        this.init(true);
    }

    // --------------------------
    // Complete
    // --------------------------
    extendAll(out) {
        out = out || {};

        for (const i = 1; i < arguments.length; i++) {
            if (!arguments[i]) continue;

            for (const key in arguments[i]) {
                if (arguments[i].hasOwnProperty(key)) out[key] = arguments[i][key];
            }
        }

        return out;
    }

    activateADA() {
        const _ = this;

        $(this.$slideTrack)
            .find('.slick-active')
            .attr({
                'aria-hidden': 'false'
            })
            .find('a, input, button, select')
            .attr({
                tabindex: '0'
            });
    }

    addSlide(markup, index, addBefore) {
        const _ = this;
        const thisSlideTrack = $(this.$slideTrack);

        if (typeof index === 'boolean') {
            addBefore = index;
            index = null;
        } else if (index < 0 || index >= this.slideCount) {
            return false;
        }

        this.unload();

        if (typeof index === 'number') {
            if (index === 0 && this.$slides.length === 0) {
                $(markup).appendTo(thisSlideTrack);
            } else if (addBefore) {
                $(markup).insertBefore(this.$slides.eq(index));
            } else {
                $(markup).insertAfter(this.$slides.eq(index));
            }
        } else {
            if (addBefore === true) {
                $(markup).prependTo(thisSlideTrack);
            } else {
                $(markup).appendTo(thisSlideTrack);
            }
        }

        this.$slides = thisSlideTrack.children(this.options.slide);

        thisSlideTrack.children(this.options.slide).detach();

        thisSlideTrack.append(this.$slides);

        // tslint:disable-next-line:no-shadowed-variable
        this.$slides.each(function (index, element) {
            $(element).attr('data-slick-index', index);
        });

        this.$slidesCache = this.$slides;

        this.reinit();
    }

    animateHeight() {
        const _ = this;
        if (
            this.options.slidesToShow === 1 &&
            this.options.adaptiveHeight === true &&
            this.options.vertical === false
        ) {
            const targetHeight = this.$slides.eq(this.currentSlide).outerHeight(true);
            this.$list.animate(
                {
                    height: targetHeight
                },
                this.options.speed
            );
        }
    }

    animateSlide(targetLeft, callback) {
        const animProps = {},
            _ = this;

        this.animateHeight();

        if (this.options.rtl === true && this.options.vertical === false) {
            targetLeft = -targetLeft;
        }
        if (this.transformsEnabled === false) {
            if (this.options.vertical === false) {
                this.$slideTrack.animate(
                    {
                        left: targetLeft
                    },
                    this.options.speed,
                    this.options.easing,
                    callback
                );
            } else {
                this.$slideTrack.animate(
                    {
                        top: targetLeft
                    },
                    this.options.speed,
                    this.options.easing,
                    callback
                );
            }
        } else {
            if (this.cssTransitions === false) {
                if (this.options.rtl === true) {
                    this.currentLeft = -this.currentLeft;
                }
                $({
                    animStart: this.currentLeft
                }).animate(
                    {
                        animStart: targetLeft
                    },
                    {
                        duration: this.options.speed,
                        easing: this.options.easing,
                        step: function (now) {
                            now = Math.ceil(now);
                            if (this.options.vertical === false) {
                                animProps[this.animType] = 'translate(' + now + 'px, 0px)';
                                //this.$slideTrack.css(animProps);
                                this.cssAppender(this.$slideTrack, animProps);
                            } else {
                                animProps[this.animType] = 'translate(0px,' + now + 'px)';
                                //this.$slideTrack.css(animProps);
                                this.cssAppender(this.$slideTrack, animProps);
                            }
                        },
                        complete: function () {
                            if (callback) {
                                callback.call();
                            }
                        }
                    }
                );
            } else {
                this.applyTransition();
                targetLeft = Math.ceil(targetLeft);

                if (this.options.vertical === false) {
                    animProps[this.animType] = 'translate3d(' + targetLeft + 'px, 0px, 0px)';
                } else {
                    animProps[this.animType] = 'translate3d(0px,' + targetLeft + 'px, 0px)';
                }
                //this.$slideTrack.css(animProps);
                this.cssAppender(this.$slideTrack, animProps);

                if (callback) {
                    setTimeout(function () {
                        this.disableTransition();

                        callback.call();
                    }, this.options.speed);
                }
            }
        }
    }

    getNavTarget() {
        //const _ = this,
        let asNavFor = this.options.asNavFor;

        if (asNavFor && asNavFor !== null) {
            asNavFor = $(asNavFor).not(this.$slider);
        }

        return asNavFor;
    }

    asNavForIt(index) {
        const _ = this,
            asNavFor = this.getNavTarget();

        if (asNavFor !== null && typeof asNavFor === 'object') {
            asNavFor.each(function () {
                const target = $(this).slick('getSlick');
                if (!target.unslicked) {
                    target.slideHandler(index, true);
                }
            });
        }
    }

    // ------------------------
    // Complete
    // ------------------------
    applyTransition(slide = '') {
        const _ = this,
            transition = {};

        if (this.options.fade === false) {
            transition[this.transitionType] =
                this.transformType + ' ' + this.options.speed + 'ms ' + this.options.cssEase;
        } else {
            transition[this.transitionType] = 'opacity ' + this.options.speed + 'ms ' + this.options.cssEase;
        }

        if (this.options.fade === false) {
            //this.$slideTrack.css(transition);
            this.cssAppender(this.$slideTrack, transition);
        } else {
            this.$slides.eq(slide).css(transition);
        }
    }

    // ------------------------
    // Complete
    // ------------------------
    autoPlay() {
        const _ = this;

        this.autoPlayClear();

        if (this.slideCount > this.options.slidesToShow) {
            this.autoPlayTimer = setInterval(this.autoPlayIterator, this.options.autoplaySpeed);
        }
    }

    // ------------------------
    // Complete
    // ------------------------
    autoPlayClear() {
        const _ = this;

        if (this.autoPlayTimer) {
            clearInterval(this.autoPlayTimer);
        }
    }

    // ------------------------
    // Complete
    // ------------------------
    autoPlayIterator() {
        const _ = this;
        let slideTo = this.currentSlide + this.options.slidesToScroll;

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

    buildArrows() {
        const _ = this;

        if (this.options.arrows === true) {
            this.$prevArrow = $(this.options.prevArrow).addClass('slick-arrow');
            this.$nextArrow = $(this.options.nextArrow).addClass('slick-arrow');

            if (this.slideCount > this.options.slidesToShow) {
                this.$prevArrow.removeClass('slick-hidden').removeAttr('aria-hidden tabindex');
                this.$nextArrow.removeClass('slick-hidden').removeAttr('aria-hidden tabindex');

                if (this.htmlExpr.test(this.options.prevArrow)) {
                    this.$prevArrow.prependTo(this.options.appendArrows);
                }

                if (this.htmlExpr.test(this.options.nextArrow)) {
                    this.$nextArrow.appendTo(this.options.appendArrows);
                }

                if (this.options.infinite !== true) {
                    this.$prevArrow.addClass('slick-disabled').attr('aria-disabled', 'true');
                }
            } else {
                this.$prevArrow
                    .add(this.$nextArrow)

                    .addClass('slick-hidden')
                    .attr({
                        'aria-disabled': 'true',
                        tabindex: '-1'
                    });
            }
        }
    }

    // ------------------------
    // Complete
    // ------------------------
    buildDots() {
        let i, dot;
        //const thisSlider = $(this.$slider);

        if (this.options.dots === true && this.slideCount > this.options.slidesToShow) {
            //thisSlider.addClass('slick-dotted');
            this.$slider.classList.add('slick-dotted');

            //dot = $('<ul />').addClass(this.options.dotsClass);
            dot = document.createElement('ul');
            dot.classList.add(this.options.dotsClass);

            for (i = 0; i <= this.getDotCount(); i += 1) {
                const li = document.createElement('li');
                li.appendChild(this.options.customPaging.call(this, _, i));
                dot.appendChild(li);
                //dot.append($('<li />').append(this.options.customPaging.call(this, _, i)));
            }

            //this.$dots = dot.appendTo(this.options.appendDots);
            //this.$dots = $(this.options.appendDots.appendChild(dot));
            this.options.appendDots.appendChild(dot);
            this.$dots = dot; //this.options.appendDots;

            //this.$dots.find('li').first().addClass('slick-active');
            const firstLi = this.$dots.querySelectorAll('li')[0];
            firstLi.classList.add('slick-active');
        }
    }

    // ------------------------
    // Complete
    // ------------------------
    buildOut() {
        const _ = this;
        //const thisSlider = $(this.$slider);

        this.$slides = this.$slider.children;
        let index = 0;
        for (const item of this.$slides) {
            item.classList.add('slick-slide');
            item.setAttribute('data-slick-index', index);

            index++;
        }

        //this.$slides = thisSlider.children(this.options.slide + ':not(.slick-cloned)');

        this.slideCount = this.$slides.length;

        //this.$slides = thisSlider.children( this.options.slide + ':not(.slick-cloned)');
        //this.$slides.addClass('slick-slide');

        //this.slideCount = this.$slides.length;

        /*this.$slides.each(function(index, element) {
            $(element)
                .attr('data-slick-index', index)
                .data('originalStyling', $(element).attr('style') || '');
        });*/

        //thisSlider.addClass('slick-slider');
        this.$slider.classList.add('slick-slider');

        /*this.$slideTrack = (this.slideCount === 0) ?
            $('<div class="slick-track"/>').appendTo(thisSlider) :
            this.$slides.wrapAll('<div class="slick-track"/>').parent();*/

        const slickTrackDiv = this.creatDiv('slick-track');

        if (this.slideCount === 0) {
            // TODO: still need to do this one
            //this.$slideTrack = $('<div class="slick-track"/>').appendTo(thisSlider);
        } else {
            this.$slideTrack = this.wrapAll(this.$slides, slickTrackDiv);
        }

        const slickListDiv = this.creatDiv('slick-list');
        //this.$list = this.$slideTrack.wrap('<div class="slick-list"/>').parent();

        //const lister = this.wrapAll([this.$slideTrack], slickListDiv);
        //this.$list = $(lister);
        this.$list = this.wrapAll([this.$slideTrack], slickListDiv);

        //this.$slideTrack.css('opacity', 0);
        this.$slideTrack.style.opacity = 0;

        if (this.options.centerMode === true || this.options.swipeToSlide === true) {
            this.options.slidesToScroll = 1;
        }

        // ---------------------
        // not using this yet
        //$('img[data-lazy]', thisSlider).not('[src]').addClass('slick-loading');
        // ---------------------

        this.setupInfinite();

        //this.buildArrows();

        this.buildDots();

        this.updateDots();

        this.setSlideClasses(typeof this.currentSlide === 'number' ? this.currentSlide : 0);

        if (this.options.draggable === true) {
            //this.$list.addClass('draggable');
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
    // Wrap an HTMLElement around another HTMLElement or an array of them.
    wrapAll(nodes, wrapper) {
        // Cache the current parent and previous sibling of the first node.
        const parent = nodes[0].parentNode;
        const previousSibling = nodes[0].previousSibling;

        // Place each node in wrapper.
        //  - If nodes is an array, we must increment the index we grab from
        //    after each loop.
        //  - If nodes is a NodeList, each node is automatically removed from
        //    the NodeList when it is removed from its parent with appendChild.
        for (const i = 0; nodes.length - i; wrapper.firstChild === nodes[0] && i++) {
            wrapper.appendChild(nodes[i]);
        }

        // Place the wrapper just after the cached previousSibling,
        // or if that is null, just before the first child.
        const nextSibling = previousSibling ? previousSibling.nextSibling : parent.firstChild;
        parent.insertBefore(wrapper, nextSibling);

        return wrapper;
    }

    // ------------------------
    // Complete
    // ------------------------
    buildRows() {
        let a, b, c, newSlides, numOfSlides, originalSlides, slidesPerSection;

        //const thisSlider = $(this.$slider);
        newSlides = document.createDocumentFragment();
        //originalSlides = thisSlider.children();
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
                        /*if (originalSlides.get(target)) {
                            row.appendChild(originalSlides.get(target));
                        }*/
                        if (originalSlides[target]) {
                            if (this.options.variableWidth === false && this.options.slideWidth !== 0) {
                                this.cssAppender(row, {
                                    width: this.options.slideWidth + 'px',
                                    display: 'inline-block'
                                });
                            } else {
                                this.cssAppender(row, {
                                    width: 100 / this.options.slidesPerRow + '%',
                                    display: 'inline-block'
                                });
                            }

                            row.appendChild(originalSlides[target]);
                        }
                    }
                    slide.appendChild(row);
                }
                newSlides.appendChild(slide);
            }

            //thisSlider.empty().append(newSlides);
            this.emptyDOM(this.$slider);
            this.$slider.appendChild(newSlides);

            /* if (this.options.variableWidth === false && this.options.slideWidth !== 0) {
                 thisSlider.children().children().children()
                     .css({
                         'width': this.options.slideWidth + 'px',
                         'display': 'inline-block'
                     });

             } else {
                 thisSlider.children().children().children()
                     .css({
                         'width': (100 / this.options.slidesPerRow) + '%',
                         'display': 'inline-block'
                     });
             }*/
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
        let breakpoint,
            targetBreakpoint,
            respondToWidth,
            triggerBreakpoint = false;

        //const thisSlider = $(this.$slider);
        //const sliderWidth = thisSlider.width();
        const sliderWidth = this.get_Width(this.$slider);

        const windowWidth = window.innerWidth || $(window).width();

        if (this.respondTo === 'window') {
            respondToWidth = windowWidth;
        } else if (this.respondTo === 'slider') {
            respondToWidth = sliderWidth;
        } else if (this.respondTo === 'min') {
            respondToWidth = Math.min(windowWidth, sliderWidth);
        }

        if (this.options.responsive && this.options.responsive.length && this.options.responsive !== null) {
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
                //thisSlider.trigger('breakpoint', [_, triggerBreakpoint]);
                const event = this.createTrigger('breakpoint', [_, triggerBreakpoint]);
                this.$slider.dispatchEvent(event);
            }
        }
    }

    changeSlide(event, dontAnimate = true) {
        let $target = $(event.currentTarget),
            indexOffset,
            slideOffset,
            unevenOffset;

        // If target is a link, prevent default action.
        if ($target.is('a')) {
            event.preventDefault();
        }

        // If target is not the <li> element (ie: a child), find the <li>.
        if (!$target.is('li')) {
            $target = $target.closest('li');
        }

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
                const index =
                    event.data.index === 0 ? 0 : event.data.index || $target.index() * this.options.slidesToScroll;

                this.slideHandler(this.checkNavigable(index), false, dontAnimate);
                $target.children().trigger('focus');
                break;

            default:
                return;
        }
    }

    // --------------------------
    // Complete
    // --------------------------
    checkNavigable(index) {
        let navigables, prevNavigable;

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

    cleanUpEvents() {
        const _ = this;
        const thisDots = $(this.$dots);
        const thisList = $(this.$list);
        const thisSlider = $(this.$slider);

        if (this.options.dots && this.$dots !== null) {
            $('li', thisDots)
                .off('click.slick', this.changeSlide)
                .off('mouseenter.slick', $.proxy(this.interrupt, _, true))
                .off('mouseleave.slick', $.proxy(this.interrupt, _, false));

            if (this.options.accessibility === true) {
                thisDots.off('keydown.slick', this.keyHandler);
            }
        }

        thisSlider.off('focus.slick blur.slick');

        if (this.options.arrows === true && this.slideCount > this.options.slidesToShow) {
            if (this.$prevArrow) this.$prevArrow.off('click.slick', this.changeSlide);
            if (this.$nextArrow) this.$nextArrow.off('click.slick', this.changeSlide);

            if (this.options.accessibility === true) {
                if (this.$prevArrow) this.$prevArrow.off('keydown.slick', this.keyHandler);
                if (this.$nextArrow) this.$nextArrow.off('keydown.slick', this.keyHandler);
            }
        }

        thisList.off('touchstart.slick mousedown.slick', this.swipeHandler);
        thisList.off('touchmove.slick mousemove.slick', this.swipeHandler);
        thisList.off('touchend.slick mouseup.slick', this.swipeHandler);
        thisList.off('touchcancel.slick mouseleave.slick', this.swipeHandler);

        thisList.off('click.slick', this.clickHandler);

        $(document).off(this.visibilityChange, this.visibility);

        this.cleanUpSlideEvents();

        if (this.options.accessibility === true) {
            thisList.off('keydown.slick', this.keyHandler);
        }

        if (this.options.focusOnSelect === true) {
            $(this.$slideTrack).children().off('click.slick', this.selectHandler);
        }

        $(window).off('orientationchange.slick.slick-' + this.instanceUid, this.orientationChange);

        $(window).off('resize.slick.slick-' + this.instanceUid, this.resize);

        $('[draggable!=true]', this.$slideTrack).off('dragstart', this.preventDefault);

        $(window).off('load.slick.slick-' + this.instanceUid, this.setPosition);
    }

    cleanUpSlideEvents() {
        const _ = this;
        const thisList = $(this.$list);

        thisList.off('mouseenter.slick', $.proxy(this.interrupt, _, true));
        thisList.off('mouseleave.slick', $.proxy(this.interrupt, _, false));
    }

    cleanUpRows() {
        let originalSlides;
        const thisSlides = $(this.$slides);
        const thisSlider = $(this.$slider);

        if (this.options.rows > 0) {
            originalSlides = thisSlides.children().children();
            originalSlides.removeAttr('style');
            thisSlider.empty().append(originalSlides);
        }
    }

    // --------------------------
    // Complete
    // --------------------------
    clickHandler(event) {
        const _ = this;

        if (this.shouldClick === false) {
            event.stopImmediatePropagation();
            event.stopPropagation();
            event.preventDefault();
        }
    }

    destroy(refresh = false) {
        const _ = this;
        const thisSlider = $(this.$slider);
        const thisSlides = $(this.$slides);
        const thisSlideTrack = $(this.$slideTrack);

        this.autoPlayClear();

        this.touchObject = {};

        this.cleanUpEvents();

        $('.slick-cloned', thisSlider).detach();

        if (this.$dots) {
            //this.$dots.remove();
            this.$dots.parentNode.removeChild(this.$dots);
        }

        if (this.$prevArrow && this.$prevArrow.length) {
            this.$prevArrow
                .removeClass('slick-disabled slick-arrow slick-hidden')
                .removeAttr('aria-hidden aria-disabled tabindex')
                .css('display', '');

            if (this.htmlExpr.test(this.options.prevArrow)) {
                //this.$prevArrow.remove();
                this.$prevArrow.parentNode.removeChild(this.$prevArrow);
            }
        }

        if (this.$nextArrow && this.$nextArrow.length) {
            this.$nextArrow
                .removeClass('slick-disabled slick-arrow slick-hidden')
                .removeAttr('aria-hidden aria-disabled tabindex')
                .css('display', '');

            if (this.htmlExpr.test(this.options.nextArrow)) {
                //this.$nextArrow.remove();
                this.$nextArrow.parentNode.removeChild(this.$nextArrow);
            }
        }

        if (thisSlides) {
            thisSlides
                .removeClass('slick-slide slick-active slick-center slick-visible slick-current')
                .removeAttr('aria-hidden')
                .removeAttr('data-slick-index')
                .each(function () {
                    $(this).attr('style', $(this).data('originalStyling'));
                });

            thisSlideTrack.children(this.options.slide).detach();

            thisSlideTrack.detach();

            $(this.$list).detach();

            thisSlider.append(thisSlides);
        }

        this.cleanUpRows();

        thisSlider.removeClass('slick-slider');
        thisSlider.removeClass('slick-initialized');
        thisSlider.removeClass('slick-dotted');

        this.unslicked = true;

        if (!refresh) {
            //this.$slider.trigger('destroy', [_]);
            const event = this.createTrigger('destroy', [_]);
            this.$slider.dispatchEvent(event);
        }
    }

    // --------------------------
    // Complete
    // -- not using Fade
    // --------------------------
    disableTransition(slide) {
        const _ = this,
            transition = {};

        transition[this.transitionType] = '';

        if (this.options.fade === false) {
            //this.$slideTrack.css(transition);
            this.cssAppender(this.$slideTrack, transition);
        } else {
            //not using this yet
            //this.$slides.eq(slide).css(transition);
        }
    }

    // --------------------------
    // Complete
    // -- not using Fade
    // --------------------------
    fadeSlide(slideIndex, callback) {
        const _ = this;

        if (this.cssTransitions === false) {
            this.$slides.eq(slideIndex).css({
                zIndex: this.options.zIndex
            });

            this.$slides.eq(slideIndex).animate(
                {
                    opacity: 1
                },
                this.options.speed,
                this.options.easing,
                callback
            );
        } else {
            this.applyTransition(slideIndex);

            this.$slides.eq(slideIndex).css({
                opacity: 1,
                zIndex: this.options.zIndex
            });

            if (callback) {
                setTimeout(function () {
                    this.disableTransition(slideIndex);

                    callback.call();
                }, this.options.speed);
            }
        }
    }

    // --------------------------
    // Complete
    // -- not using Fade
    // --------------------------
    fadeSlideOut(slideIndex) {
        const _ = this;

        if (this.cssTransitions === false) {
            this.$slides.eq(slideIndex).animate(
                {
                    opacity: 0,
                    zIndex: this.options.zIndex - 2
                },
                this.options.speed,
                this.options.easing
            );
        } else {
            this.applyTransition(slideIndex);

            this.$slides.eq(slideIndex).css({
                opacity: 0,
                zIndex: this.options.zIndex - 2
            });
        }
    }

    // --------------------------
    // Complete
    // --------------------------
    cssAppender(el, styles) {
        Object.keys(styles).forEach((t) => {
            const val = styles[t];
            el.style[t] = val;
        });
    }

    slickFilter(filter) {
        const _ = this;

        if (filter !== null) {
            this.$slidesCache = this.$slides;

            this.unload();

            $(this.$slideTrack).children(this.options.slide).detach();

            this.$slidesCache.filter(filter).appendTo(this.$slideTrack);

            this.reinit();
        }
    }

    focusHandler() {
        const _ = this;

        // If any child element receives focus within the slider we need to pause the autoplay
        $(this.$slider)
            .off('focus.slick blur.slick')
            .on('focus.slick', '*', function (event) {
                const $sf = $(this);

                setTimeout(function () {
                    if (this.options.pauseOnFocus) {
                        if ($sf.is(':focus')) {
                            this.focussed = true;
                            this.autoPlay();
                        }
                    }
                }, 0);
            })
            .on('blur.slick', '*', function (event) {
                const $sf = $(this);

                // When a blur occurs on any elements within the slider we become unfocused
                if (this.options.pauseOnFocus) {
                    this.focussed = false;
                    this.autoPlay();
                }
            });
    }

    // --------------------------
    // Complete
    // --------------------------
    slickCurrentSlide() {
        const _ = this;
        return this.currentSlide;
    }

    // --------------------------
    // Complete
    // --------------------------
    getDotCount() {
        const _ = this;

        let breakPoint = 0;
        let counter = 0;
        let pagerQty = 0;

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

    getLeft(slideIndex) {
        let targetLeft,
            verticalHeight,
            verticalOffset = 0,
            targetSlide,
            coef;
        const thisSlideTrack = $(this.$slideTrack);

        this.slideOffset = 0;
        verticalHeight = $(this.$slides).first().outerHeight(true);

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
                targetSlide = thisSlideTrack.children('.slick-slide').eq(slideIndex);
            } else {
                targetSlide = thisSlideTrack.children('.slick-slide').eq(slideIndex + this.options.slidesToShow);
            }

            if (this.options.rtl === true) {
                if (targetSlide[0]) {
                    targetLeft = (thisSlideTrack.width() - targetSlide[0].offsetLeft - targetSlide.width()) * -1;
                } else {
                    targetLeft = 0;
                }
            } else {
                targetLeft = targetSlide[0] ? targetSlide[0].offsetLeft * -1 : 0;
            }

            if (this.options.centerMode === true) {
                if (this.slideCount <= this.options.slidesToShow || this.options.infinite === false) {
                    targetSlide = thisSlideTrack.children('.slick-slide').eq(slideIndex);
                } else {
                    targetSlide = thisSlideTrack
                        .children('.slick-slide')
                        .eq(slideIndex + this.options.slidesToShow + 1);
                }

                if (this.options.rtl === true) {
                    if (targetSlide[0]) {
                        targetLeft = (thisSlideTrack.width() - targetSlide[0].offsetLeft - targetSlide.width()) * -1;
                    } else {
                        targetLeft = 0;
                    }
                } else {
                    targetLeft = targetSlide[0] ? targetSlide[0].offsetLeft * -1 : 0;
                }

                targetLeft += (this.$list.width() - targetSlide.outerWidth()) / 2;
            }
        }

        return targetLeft;
    }

    // --------------------------
    // Complete
    // --------------------------
    slickGetOption(option) {
        const _ = this;

        return this.options[option];
    }

    // --------------------------
    // Complete
    // --------------------------
    getNavigableIndexes() {
        let breakPoint = 0,
            counter = 0,
            max;

        const indexes = [];

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

    getSlideCount() {
        let slidesTraversed, swipedSlide, swipeTarget, centerOffset;

        centerOffset = this.options.centerMode === true ? Math.floor(this.$list.width() / 2) : 0;
        swipeTarget = this.swipeLeft * -1 + centerOffset;

        if (this.options.swipeToSlide === true) {
            this.$slideTrack.find('.slick-slide').each(function (index, slide) {
                let slideOuterWidth, slideOffset, slideRightBoundary;
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

            return slidesTraversed;
        } else {
            return this.options.slidesToScroll;
        }
    }

    // --------------------------
    // Complete
    // --------------------------
    slickGoTo(slide, dontAnimate) {
        const _ = this;

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
        const _ = this;
        //const thisSlider = $(this.$slider);

        const _isInit = this.$slider.classList.contains('slick-initialized');
        if (!_isInit) {
            //$(thisSlider).addClass('slick-initialized');
            this.$slider.classList.add('slick-initialized');

            this.buildRows();
            this.buildOut();
            this.setProps();
            this.startLoad();
            this.loadSlider();
            this.initializeEvents();
            //this.updateArrows();
            this.updateDots();
            this.checkResponsive(true);
            this.focusHandler();
        }

        if (creation) {
            //thisSlider.trigger('init', [_]);
            const event = this.createTrigger('init', [_]);
            this.$slider.dispatchEvent(event);
        }

        if (this.options.accessibility === true) {
            this.initADA();
        }

        if (this.options.autoplay) {
            this.paused = false;
            this.autoPlay();
        }
    }

    initADA() {
        const that = this,
            numDotGroups = Math.ceil(this.slideCount / this.options.slidesToShow),
            tabControlIndexes = this.getNavigableIndexes().filter(function (val) {
                return val >= 0 && val < that.slideCount;
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
                const slideControlIndex = tabControlIndexes.indexOf(i);

                $(this).attr({
                    role: 'tabpanel',
                    id: 'slick-slide' + that.instanceUid + i,
                    tabindex: -1
                });

                if (slideControlIndex !== -1) {
                    const ariaButtonControl = 'slick-slide-control' + that.instanceUid + slideControlIndex;
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
                    const mappedSlideIndex = tabControlIndexes[i];

                    $(this).attr({
                        role: 'presentation'
                    });

                    $(this)
                        .find('button')
                        .first()
                        .attr({
                            role: 'tab',
                            id: 'slick-slide-control' + that.instanceUid + i,
                            'aria-controls': 'slick-slide' + that.instanceUid + mappedSlideIndex,
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

        for (const i = this.currentSlide, max = i + this.options.slidesToShow; i < max; i++) {
            if (this.options.focusOnChange) {
                thisSlides.eq(i).attr({ tabindex: '0' });
            } else {
                thisSlides.eq(i).removeAttr('tabindex');
            }
        }

        this.activateADA();
    }

    //----------
    // Complete - not using Arrows
    //----------
    initArrowEvents() {
        const _ = this;

        if (this.options.arrows === true && this.slideCount > this.options.slidesToShow) {
            this.$prevArrow.off('click.slick').on(
                'click.slick',
                {
                    message: 'previous'
                },
                this.changeSlide
            );
            this.$nextArrow.off('click.slick').on(
                'click.slick',
                {
                    message: 'next'
                },
                this.changeSlide
            );

            if (this.options.accessibility === true) {
                this.$prevArrow.on('keydown.slick', this.keyHandler);
                this.$nextArrow.on('keydown.slick', this.keyHandler);
            }
        }
    }

    initDotEvents() {
        const _ = this;
        const thisDots = $(this.$dots);

        if (this.options.dots === true && this.slideCount > this.options.slidesToShow) {
            $('li', thisDots).on(
                'click.slick',
                {
                    message: 'index'
                },
                this.changeSlide
            );

            if (this.options.accessibility === true) {
                thisDots.on('keydown.slick', this.keyHandler);
            }
        }

        if (
            this.options.dots === true &&
            this.options.pauseOnDotsHover === true &&
            this.slideCount > this.options.slidesToShow
        ) {
            $('li', thisDots)
                .on('mouseenter.slick', $.proxy(this.interrupt, _, true))
                .on('mouseleave.slick', $.proxy(this.interrupt, _, false));
        }
    }

    initSlideEvents() {
        const _ = this;
        const thisList = $(this.$list);

        if (this.options.pauseOnHover) {
            thisList.on('mouseenter.slick', $.proxy(this.interrupt, _, true));
            thisList.on('mouseleave.slick', $.proxy(this.interrupt, _, false));
        }
    }

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

    initializeEvents() {
        const _ = this;
        const thisList = $(this.$list);

        //this.initArrowEvents();

        this.initDotEvents();
        this.initSlideEvents();

        thisList.on(
            'touchstart.slick mousedown.slick',
            {
                action: 'start'
            },
            this.swipeHandler
        );
        thisList.on(
            'touchmove.slick mousemove.slick',
            {
                action: 'move'
            },
            this.swipeHandler
        );
        thisList.on(
            'touchend.slick mouseup.slick',
            {
                action: 'end'
            },
            this.swipeHandler
        );
        thisList.on(
            'touchcancel.slick mouseleave.slick',
            {
                action: 'end'
            },
            this.swipeHandler
        );

        thisList.on('click.slick', this.clickHandler);

        $(document).on(this.visibilityChange, $.proxy(this.visibility, _));

        if (this.options.accessibility === true) {
            thisList.on('keydown.slick', this.keyHandler);
        }

        if (this.options.focusOnSelect === true) {
            $(this.$slideTrack).children().on('click.slick', this.selectHandler);
        }

        $(window).on('orientationchange.slick.slick-' + this.instanceUid, $.proxy(this.orientationChange, _));

        $(window).on('resize.slick.slick-' + this.instanceUid, $.proxy(this.resize, _));

        $('[draggable!=true]', this.$slideTrack).on('dragstart', this.preventDefault);

        $(window).on('load.slick.slick-' + this.instanceUid, this.setPosition);
        $(this.setPosition);
    }

    onHandler(eventName, elementSelector, handler) {
        document.addEventListener(
            eventName,
            function (e) {
                // loop parent nodes from the target to the delegation node
                for (let target = e.target; target && target !== this; target = target.parentNode) {
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
    // --- not using arrows
    // --------------------------
    initUI() {
        const _ = this;

        if (this.options.arrows === true && this.slideCount > this.options.slidesToShow) {
            // --- not using arrows
            //this.$prevArrow.show();
            //this.$nextArrow.show();
        }

        if (this.options.dots === true && this.slideCount > this.options.slidesToShow) {
            //$(this.$dots).show();
            this.$dots.style.display = '';
        }
    }

    // --------------------------
    // Complete
    // --------------------------
    keyHandler(event) {
        const _ = this;
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
    lazyLoadIt() {
        let loadRange, cloneRange, rangeStart, rangeEnd;
        const thisSlider = $(this.$slider);

        function loadImages(imagesScope) {
            $('img[data-lazy]', imagesScope).each(function () {
                const image = $(this),
                    imageSource = $(this).attr('data-lazy'),
                    imageSrcSet = $(this).attr('data-srcset'),
                    imageSizes = $(this).attr('data-sizes') || this.$slider.attr('data-sizes'),
                    imageToLoad = document.createElement('img');

                const that = this;
                // @ts-ignore
                imageToLoad.onload();
                {
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
                        that.$slider.trigger('lazyLoaded', [that, image, imageSource]);
                    });
                }
                // @ts-ignore
                imageToLoad.onerror();
                {
                    image.removeAttr('data-lazy').removeClass('slick-loading').addClass('slick-lazyload-error');

                    that.$slider.trigger('lazyLoadError', [that, image, imageSource]);
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
            let prevSlide = rangeStart - 1,
                nextSlide = rangeEnd;
            const $slides = this.$slider.find('.slick-slide');

            for (const i = 0; i < this.options.slidesToScroll; i++) {
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
    }

    // --------------------------
    // Complete
    // --------------------------
    loadSlider() {
        const _ = this;

        this.setPosition();

        /*this.$slideTrack.css({
            opacity: 1
        });*/
        this.$slideTrack.style.opacity = 1;

        //$(this.$slider).removeClass('slick-loading');
        this.$slider.classList.remove('slick-loading');

        this.initUI();

        if (this.options.lazyLoad === 'progressive') {
            this.progressiveLazyLoad();
        }
    }

    // --------------------------
    // Complete
    // --------------------------
    slickNext() {
        const _ = this;

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
        const _ = this;

        this.checkResponsive();
        this.setPosition();
    }

    // --------------------------
    // Complete
    // --------------------------
    slickPause() {
        const _ = this;

        this.autoPlayClear();
        this.paused = true;
    }

    // --------------------------
    // Complete
    // --------------------------
    slickPlay() {
        const _ = this;

        this.autoPlay();
        this.options.autoplay = true;
        this.paused = false;
        this.focussed = false;
        this.interrupted = false;
    }

    postSlide(index) {
        const _ = this;

        if (!this.unslicked) {
            //$(this.$slider).trigger('afterChange', [_, index]);
            const event = this.createTrigger('afterChange', [_, index]);
            this.$slider.dispatchEvent(event);

            this.animating = false;

            if (this.slideCount > this.options.slidesToShow) {
                this.setPosition();
            }

            this.swipeLeft = null;

            if (this.options.autoplay) {
                this.autoPlay();
            }

            if (this.options.accessibility === true) {
                this.initADA();

                if (this.options.focusOnChange) {
                    const $currentSlide = $(this.$slides.get(this.currentSlide));
                    $currentSlide.attr('tabindex', 0).focus();
                }
            }
        }
    }

    // --------------------------
    // Complete
    // --------------------------
    slickPrev() {
        const _ = this;

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
    progressiveLazyLoad(tryCount = 1) {
        tryCount = tryCount || 1;

        const that = this;
        let image, imageSource, imageSrcSet, imageSizes, imageToLoad;

        const $imgsToLoad = $('img[data-lazy]', this.$slider);

        if ($imgsToLoad.length) {
            image = $imgsToLoad.first();
            imageSource = image.attr('data-lazy');
            imageSrcSet = image.attr('data-srcset');
            imageSizes = image.attr('data-sizes') || this.$slider.attr('data-sizes');
            imageToLoad = document.createElement('img');

            imageToLoad.onload();
            {
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
            imageToLoad.onerror();
            {
                if (tryCount < 3) {
                    /**
                     * try to load the image 3 times,
                     * leave a slight delay so we don't get
                     * servers blocking the request.
                     */
                    setTimeout(function () {
                        that.progressiveLazyLoad(tryCount + 1);
                    }, 500);
                } else {
                    image.removeAttr('data-lazy').removeClass('slick-loading').addClass('slick-lazyload-error');

                    this.$slider.trigger('lazyLoadError', [that, image, imageSource]);

                    this.progressiveLazyLoad();
                }
            }
            imageToLoad.src = imageSource;
        } else {
            this.$slider.trigger('allImagesLoaded', [this]);
        }
    }

    // ----------------------
    // Complete
    // ---------------------
    refresh(initializing) {
        let currentSlide, lastVisibleIndex;

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

        //$.extend(_, this.initials, { currentSlide: currentSlide });
        this.extendAll(this, this.initials, { currentSlide: currentSlide });

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
        let breakpoint, currentBreakpoint, l;

        const responsiveSettings = this.options.responsive || null;

        if ($.type(responsiveSettings) === 'array' && responsiveSettings.length) {
            this.respondTo = this.options.respondTo || 'window';

            // tslint:disable-next-line:forin
            for (breakpoint in responsiveSettings) {
                l = this.breakpoints.length - 1;

                if (responsiveSettings.hasOwnProperty(breakpoint)) {
                    currentBreakpoint = responsiveSettings[breakpoint].breakpoint;

                    // loop through the breakpoints and cut out any existing
                    // ones with the same breakpoint number, we don't want dupes.
                    while (l >= 0) {
                        if (this.breakpoints[l] && this.breakpoints[l] === currentBreakpoint) {
                            this.breakpoints.splice(l, 1);
                        }
                        l--;
                    }

                    this.breakpoints.push(currentBreakpoint);
                    this.breakpointSettings[currentBreakpoint] = responsiveSettings[breakpoint].settings;
                }
            }

            this.breakpoints.sort(function (a, b) {
                return this.options.mobileFirst ? a - b : b - a;
            });
        }
    }

    // --------------------------
    // Complete
    // --------------------------
    reinit() {
        const _ = this;

        /*this.$slides =
            thisSlideTrack
                .children(this.options.slide)
                .addClass('slick-slide');*/
        this.$slides = this.$slideTrack.children;
        for (const item of this.$slides) {
            item.classList.add('slick-slide');
        }

        this.slideCount = this.$slides.length;

        if (this.currentSlide >= this.slideCount && this.currentSlide !== 0) {
            this.currentSlide = this.currentSlide - this.options.slidesToScroll;
        }

        if (this.slideCount <= this.options.slidesToShow) {
            this.currentSlide = 0;
        }

        //this.registerBreakpoints();

        this.setProps();
        this.setupInfinite();
        //this.buildArrows();
        //this.updateArrows();
        //this.initArrowEvents();
        this.buildDots();
        this.updateDots();
        this.initDotEvents();
        this.cleanUpSlideEvents();
        this.initSlideEvents();

        this.checkResponsive(false, true);

        if (this.options.focusOnSelect === true) {
            // Not using this yet
            //$(thisSlideTrack).children().on('click.slick', this.selectHandler);
        }

        this.setSlideClasses(typeof this.currentSlide === 'number' ? this.currentSlide : 0);

        this.setPosition();
        this.focusHandler();

        this.paused = !this.options.autoplay;
        this.autoPlay();

        //$(this.$slider).trigger('reInit', [_]);
        const event = this.createTrigger('reInit', [_]);
        this.$slider.dispatchEvent(event);
    }

    // ------------------------
    // Complete
    // ------------------------
    resize() {
        const that = this;

        if ($(window).width() !== this.windowWidth) {
            clearTimeout(this.windowDelay);
            this.windowDelay = window.setTimeout(function () {
                that.windowWidth = $(window).width();
                that.checkResponsive();
                if (!that.unslicked) {
                    that.setPosition();
                }
            }, 50);
        }
    }

    // --------------------------
    // Complete
    // --------------------------
    removeSlide(index, removeBefore, removeAll) {
        const _ = this;
        //const thisSlideTrack = $(this.$slideTrack);

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
            //thisSlideTrack.children().remove();
            for (const item of Array.from(this.$slideTrack.children)) {
                // @ts-ignore
                item.parentNode.removeChild(item);
            }
        } else {
            //thisSlideTrack.children(this.options.slide).eq(index).remove();
            const toRemove = this.$slideTrack.children[index];
            toRemove.parentNode.removeChild(toRemove);
        }

        //this.$slides = thisSlideTrack.children(this.options.slide);        /
        this.$slides = Array.from(this.$slideTrack.children);

        //const makker = thisSlideTrack.children(this.options.slide);
        //thisSlideTrack.children(this.options.slide).detach();
        for (const item of Array.from(this.$slideTrack.children)) {
            // @ts-ignore
            item.parentNode.removeChild(item);
        }

        //thisSlideTrack.append(this.$slides);
        for (const item of this.$slides) {
            this.$slideTrack.appendChild(item);
        }

        this.$slidesCache = this.$slides;

        this.reinit();
    }

    // --------------------------
    // Complete
    // --------------------------
    setCSS(position) {
        let positionProps = {},
            x,
            y;

        if (this.options.rtl === true) {
            position = -position;
        }
        x = this.positionProp === 'left' ? Math.ceil(position) + 'px' : '0px';
        y = this.positionProp === 'top' ? Math.ceil(position) + 'px' : '0px';

        positionProps[this.positionProp] = position;

        if (this.transformsEnabled === false) {
            //this.$slideTrack.css(positionProps);
            this.cssAppender(this.$slideTrack, positionProps);
        } else {
            positionProps = {};
            if (this.cssTransitions === false) {
                positionProps[this.animType] = 'translate(' + x + ', ' + y + ')';
                //this.$slideTrack.css(positionProps);
                this.cssAppender(this.$slideTrack, positionProps);
            } else {
                positionProps[this.animType] = 'translate3d(' + x + ', ' + y + ', 0px)';
                //this.$slideTrack.css(positionProps);
                this.cssAppender(this.$slideTrack, positionProps);
            }
        }
    }

    //------------------
    // Complete
    // ----------------
    setDimensions() {
        const _ = this;
        //const thisSlides = $(this.$slides);
        //const thisSideTrack = $(this.$slideTrack);
        //const thisList = $(this.$list);

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
            //thisList.height(thisSlides.first().outerHeight(true) * this.options.slidesToShow);
            const outerHeight = this.get_OuterHeight(this.$slides[0], true) * this.options.slidesToShow;
            this.set_Height(this.$list, outerHeight);
            //thisList.height(outerHeight);

            if (this.options.centerMode === true) {
                /*thisList.css({
                    padding: (this.options.centerPadding + ' 0px')
                });*/
                this.cssAppender(this.$list, {
                    padding: this.options.centerPadding + ' 0px'
                });
            }
        }

        //this.listWidth = thisList.width();
        this.listWidth = this.get_Width(this.$list);
        //this.listHeight = thisList.height();
        this.listHeight = this.get_Height(this.$list);

        if (this.options.vertical === false && this.options.variableWidth === false) {
            if (!this.options.slideWidth) {
                this.slideWidth = Math.ceil(this.listWidth / this.options.slidesToShow);
            } else {
                this.slideWidth = this.options.slideWidth;
            }

            //const slickSlideChildren = thisSideTrack.children('.slick-slide');
            const width = Math.ceil(this.slideWidth * this.$slideTrack.children.length);

            //thisSideTrack.width(width);
            this.set_Width(this.$slideTrack, width);
        } else if (this.options.variableWidth === true) {
            //thisSideTrack.width(5000 * this.slideCount);
            this.set_Width(this.$slideTrack, 5000 * this.slideCount);
        } else {
            this.slideWidth = Math.ceil(this.listWidth);

            //const slickSlideChildren = thisSideTrack.children('.slick-slide');
            const calc = Math.ceil(this.get_OuterHeight(this.$slides[0], true) * this.$slideTrack.children.length);
            this.set_Height(this.$slideTrack, calc);
            //thisSideTrack.height(Math.ceil((thisSlides.first().outerHeight(true) * thisSideTrack.children('.slick-slide').length)));
        }

        const offset = this.get_OuterWidth(this.$slides[0], true) - this.get_OuterWidth(this.$slides[0]);

        //let aa = thisSlides.first().outerWidth(true);
        //let bb = thisSlides.first().width();
        //const offsetOther = aa - bb;
        if (this.options.variableWidth === false) {
            //const slickSlideChildren = thisSideTrack.children('.slick-slide');
            //slickSlideChildren.width(this.slideWidth - offset);
            for (const el of this.$slideTrack.children) {
                this.set_Width(el, this.slideWidth - offset);
            }
        }
    }

    // --------------------------
    // Complete
    // --------------------------
    get_OuterHeight(el, withMargin) {
        if (withMargin) {
            let height = el.offsetHeight;
            const style = getComputedStyle(el);

            // tslint:disable-next-line:radix
            height += parseInt(style.marginTop) + parseInt(style.marginBottom);
            return height;
        } else {
            const num = el.offsetHeight;
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
            let width = el.offsetWidth;
            const style = getComputedStyle(el);

            // tslint:disable-next-line:radix
            width += parseInt(style.marginLeft) + parseInt(style.marginRight);
            return width;
        } else {
            const num = el.offsetWidth;
            if (num) {
                return num;
            }

            return 0;
        }
    }

    //-----------------------------------
    // Complete
    //-----------------------------------
    get_Width(el) {
        const num = parseFloat(getComputedStyle(el, null).width.replace('px', ''));
        if (num) {
            return num;
        }

        return 0;
    }

    //-----------------------------------
    // Complete
    //-----------------------------------
    get_Height(el) {
        const num = parseFloat(getComputedStyle(el, null).height.replace('px', ''));
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
        let that = this,
            targetLeft;

        this.$slides.each(function (index, element) {
            targetLeft = that.slideWidth * index * -1;
            if (that.options.rtl === true) {
                $(element).css({
                    position: 'relative',
                    right: targetLeft,
                    top: 0,
                    zIndex: that.options.zIndex - 2,
                    opacity: 0
                });
            } else {
                $(element).css({
                    position: 'relative',
                    left: targetLeft,
                    top: 0,
                    zIndex: that.options.zIndex - 2,
                    opacity: 0
                });
            }
        });

        this.$slides.eq(this.currentSlide).css({
            zIndex: this.options.zIndex - 1,
            opacity: 1
        });
    }

    //-----------------------------------
    // Complete
    // ---- Not using "adaptiveHeight" yet
    //-----------------------------------
    setListHeight() {
        const _ = this;

        if (
            this.options.slidesToShow === 1 &&
            this.options.adaptiveHeight === true &&
            this.options.vertical === false
        ) {
            const targetHeight = this.$slides.eq(this.currentSlide).outerHeight(true);
            //this.$list.css('height', targetHeight);
            this.$list.style.height = targetHeight;
        }
    }

    // --------------------------
    // Complete
    // --------------------------
    slickSetOption() {
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

        let l,
            item,
            option,
            value,
            refresh = false,
            type;
        const that = this;

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
                that.options[opt] = val;
            });
        } else if (type === 'responsive') {
            for (item in value) {
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
        }

        if (refresh) {
            this.unload();
            this.reinit();
        }
    }

    // ------------------------
    // Complete
    // ------------------------
    setPosition() {
        const _ = this;

        this.setDimensions();

        this.setListHeight();

        if (this.options.fade === false) {
            this.setCSS(this.getLeft(this.currentSlide));
        } else {
            this.setFade();
        }

        //$(this.$slider).trigger('setPosition', [_]);
        const event = this.createTrigger('setPosition', [_]);
        this.$slider.dispatchEvent(event);
    }

    // --------------------------
    // Complete
    // --------------------------
    setProps() {
        const _ = this,
            bodyStyle = document.body.style as any;
        //const thisSlider = $(this.$slider);

        this.positionProp = this.options.vertical === true ? 'top' : 'left';

        if (this.positionProp === 'top') {
            //thisSlider.addClass('slick-vertical');
            this.$slider.classList.add('slick-vertical');
        } else {
            //thisSlider.removeClass('slick-vertical');
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
            if (bodyStyle.msTransform === undefined) this.animType = false;
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
        let centerOffset, allSlides, indexOffset, remainder;

        /*allSlides = $(this.$slider)
            .find('.slick-slide')
            .removeClass('slick-active slick-center slick-current')
            .attr('aria-hidden', 'true');*/
        allSlides = Array.from(this.$slider.querySelectorAll('.slick-slide'));
        for (const item of allSlides) {
            item.classList.remove('slick-active');
            item.classList.remove('slick-center');
            item.classList.remove('slick-current');

            item.setAttribute('aria-hidden', 'true');
        }

        /*thisSlides
            .eq(index)
            .addClass('slick-current');*/
        if (this.$slides[index]) {
            this.$slides[index].classList.add('slick-current');
        }

        if (this.options.centerMode === true) {
            const evenCoef = this.options.slidesToShow % 2 === 0 ? 1 : 0;

            centerOffset = Math.floor(this.options.slidesToShow / 2);

            if (this.options.infinite === true) {
                if (index >= centerOffset && index <= this.slideCount - 1 - centerOffset) {
                    /*thisSlides
                        .slice(index - centerOffset + evenCoef, index + centerOffset + 1)
                        .addClass('slick-active')
                        .attr('aria-hidden', 'false');*/
                    const ss = Array.from(this.$slides).slice(
                        index - centerOffset + evenCoef,
                        index + centerOffset + 1
                    );
                    for (const item of ss) {
                        // @ts-ignore
                        item.classList.add('slick-active');
                        // @ts-ignore
                        item.setAttribute('aria-hidden', 'false');
                    }
                } else {
                    indexOffset = this.options.slidesToShow + index;
                    allSlides
                        .slice(indexOffset - centerOffset + 1 + evenCoef, indexOffset + centerOffset + 2)
                        .addClass('slick-active')
                        .attr('aria-hidden', 'false');
                }

                if (index === 0) {
                    /*allSlides
                        .eq(this.options.slidesToShow + this.slideCount + 1)
                        .addClass('slick-center');*/
                    allSlides[this.options.slidesToShow + this.slideCount + 1].classList.add('slick-center');
                } else if (index === this.slideCount - 1) {
                    /* allSlides
                         .eq(this.options.slidesToShow)
                         .addClass('slick-center');*/
                    allSlides[this.options.slidesToShow].classList.add('slick-center');
                }
            }

            /*thisSlides
                .eq(index)
                .addClass('slick-center');*/
            if (this.$slides[index]) {
                this.$slides[index].classList.add('slick-center');
            }
        } else {
            if (index >= 0 && index <= this.slideCount - this.options.slidesToShow) {
                /*thisSlides
                    .slice(index, index + this.options.slidesToShow)
                    .addClass('slick-active')
                    .attr('aria-hidden', 'false');*/

                // probably need to loop through the array here..??
                const ss = Array.from(this.$slides).slice(index, index + this.options.slidesToShow);
                for (const item of ss) {
                    // @ts-ignore
                    item.classList.add('slick-active');
                    // @ts-ignore
                    item.setAttribute('aria-hidden', 'false');
                }
            } else if (allSlides.length <= this.options.slidesToShow) {
                /*allSlides
                    .addClass('slick-active')
                    .attr('aria-hidden', 'false');*/
                for (const item of allSlides) {
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
                    allSlides
                        .slice(indexOffset - (this.options.slidesToShow - remainder), indexOffset + remainder)
                        .addClass('slick-active')
                        .attr('aria-hidden', 'false');
                } else {
                    allSlides
                        .slice(indexOffset, indexOffset + this.options.slidesToShow)
                        .addClass('slick-active')
                        .attr('aria-hidden', 'false');
                }
            }
        }

        if (this.options.lazyLoad === 'ondemand' || this.options.lazyLoad === 'anticipated') {
            //this.lazyLoad();
        }
    }

    // ----------------
    // Leave for now
    // ----------------
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

                for (i = this.slideCount; i > this.slideCount - infiniteCount; i -= 1) {
                    slideIndex = i - 1;
                    $(this.$slides[slideIndex])
                        .clone(true)
                        .attr('id', '')
                        .attr('data-slick-index', slideIndex - this.slideCount)
                        .prependTo(this.$slideTrack)
                        .addClass('slick-cloned');
                }
                for (i = 0; i < infiniteCount + this.slideCount; i += 1) {
                    slideIndex = i;
                    $(this.$slides[slideIndex])
                        .clone(true)
                        .attr('id', '')
                        .attr('data-slick-index', slideIndex + this.slideCount)
                        .appendTo(this.$slideTrack)
                        .addClass('slick-cloned');
                }
                this.$slideTrack
                    .find('.slick-cloned')
                    .find('[id]')
                    .each(function () {
                        $(this).attr('id', '');
                    });
            }
        }
    }

    // ------------------------
    // Complete
    // ------------------------
    interrupt(toggle) {
        const _ = this;

        if (!toggle) {
            this.autoPlay();
        }
        this.interrupted = toggle;
    }

    selectHandler(event) {
        const _ = this;

        const targetElement = $(event.target).is('.slick-slide')
            ? $(event.target)
            : $(event.target).parents('.slick-slide');

        // tslint:disable-next-line:radix
        let index = parseInt(targetElement.attr('data-slick-index'));

        if (!index) index = 0;

        if (this.slideCount <= this.options.slidesToShow) {
            this.slideHandler(index, false, true);
            return;
        }

        this.slideHandler(index);
    }

    // ---------------------------
    // Complete
    // -- not using "asNavFor"
    // ---------------------------
    slideHandler(index, sync = false, dontAnimate = true) {
        let targetSlide,
            animSlide,
            oldSlide,
            slideLeft,
            targetLeft = null,
            navTarget;

        sync = sync || false;

        if (this.animating === true && this.options.waitForAnimate === true) {
            return;
        }

        if (this.options.fade === true && this.currentSlide === index) {
            return;
        }

        if (sync === false) {
            this.asNavFor(index);
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
                    this.animateSlide(slideLeft, function () {
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
                    this.animateSlide(slideLeft, function () {
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

        //$(this.$slider).trigger('beforeChange', [_, this.currentSlide, animSlide]);
        const event = this.createTrigger('beforeChange', [this, this.currentSlide, animSlide]);
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
        // not using this yet
        //this.updateArrows();

        if (this.options.fade === true) {
            if (dontAnimate !== true) {
                this.fadeSlideOut(oldSlide);

                this.fadeSlide(animSlide, function () {
                    this.postSlide(animSlide);
                });
            } else {
                this.postSlide(animSlide);
            }
            this.animateHeight();
            return;
        }

        if (dontAnimate !== true && this.slideCount > this.options.slidesToShow) {
            this.animateSlide(targetLeft, function () {
                this.postSlide(animSlide);
            });
        } else {
            this.postSlide(animSlide);
        }
    }

    // --------------------------
    // Complete
    // -- not using arrows
    // ---------------------------
    startLoad() {
        const _ = this;

        if (this.options.arrows === true && this.slideCount > this.options.slidesToShow) {
            // -- not using arrows
            //this.$prevArrow.hide();
            //this.$nextArrow.hide();
        }

        if (this.options.dots === true && this.slideCount > this.options.slidesToShow) {
            //$(this.$dots).hide();
            this.$dots.style.display = 'none';
        }

        //$(this.$slider).addClass('slick-loading');
        this.$slider.classList.add('slick-loading');
    }

    // ------------------------
    // Complete
    // ------------------------
    swipeDirection() {
        let xDist, yDist, r, swipeAngle;

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
        let slideCount, direction;
        //const thisSlider = $(this.$slider);

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
            //thisSlider.trigger('edge', [_, this.swipeDirection()]);
            const eventer = this.createTrigger('edge', [_, this.swipeDirection()]);
            this.$slider.dispatchEvent(eventer);
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
                this.touchObject = {};
                //$(thisSlider).trigger('swipe', [_, direction]);
                // tslint:disable-next-line:no-shadowed-variable
                const event = this.createTrigger('swipe', [_, direction]);
                this.$slider.dispatchEvent(event);
            }
        } else {
            if (this.touchObject.startX !== this.touchObject.curX) {
                this.slideHandler(this.currentSlide);
                this.touchObject = {};
            }
        }
    }

    // ------------------------
    // Complete
    // ------------------------
    createTrigger(eventName, data) {
        if (window.CustomEvent && typeof window.CustomEvent === 'function') {
            const event = new CustomEvent(eventName, { detail: data });
        } else {
            const event = document.createEvent('CustomEvent');
            event.initCustomEvent(eventName, true, true, data);
        }

        return event;
    }

    // ------------------------
    // Complete
    // ------------------------
    swipeHandler(event) {
        const _ = this;

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
        let curLeft, swipeDirection, swipeLength, positionOffset, touches, verticalSwipeLength;

        const edgeWasHit = false;

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
        let touches;

        this.interrupted = true;

        if (this.touchObject.fingerCount !== 1 || this.slideCount <= this.options.slidesToShow) {
            this.touchObject = {};
            return false;
        }

        if (event.originalEvent !== undefined && event.originalEvent.touches !== undefined) {
            touches = event.originalEvent.touches[0];
        }

        this.touchObject.startX = this.touchObject.curX = touches !== undefined ? touches.pageX : event.clientX;
        this.touchObject.startY = this.touchObject.curY = touches !== undefined ? touches.pageY : event.clientY;

        this.dragging = true;
    }

    slickUnfilter() {
        const _ = this;
        const thisSlideTrack = $(this.$slideTrack);

        if (this.$slidesCache !== null) {
            this.unload();

            thisSlideTrack.children(this.options.slide).detach();

            this.$slidesCache.appendTo(thisSlideTrack);

            this.reinit();
        }
    }

    unload() {
        const _ = this;

        $('.slick-cloned', this.$slider).remove();

        if (this.$dots) {
            //this.$dots.remove();
            this.$dots.parentNode.removeChild(this.$dots);
        }

        if (this.$prevArrow && this.htmlExpr.test(this.options.prevArrow)) {
            //this.$prevArrow.remove();
            this.$prevArrow.parentNode.removeChild(this.$prevArrow);
        }

        if (this.$nextArrow && this.htmlExpr.test(this.options.nextArrow)) {
            this.$nextArrow.parentNode.removeChild(this.$nextArrow);
        }

        /*$(this.$slides)
            .removeClass('slick-slide slick-active slick-visible slick-current')
            .attr('aria-hidden', 'true')
            .css('width', '');*/
        for (const item of this.$slides) {
            this.removeClasses(item, ['slick-slide', 'slick-active', 'slick-visible', 'slick-current']);

            item.setAttribute('aria-hidden', 'true');
            item.style.width = '';
        }
    }

    removeClasses(el, classArray) {
        for (const cl of classArray) {
            el.classList.remove(cl);
        }
    }

    // ------------------------
    // Complete
    // ------------------------
    unslick(fromBreakpoint) {
        const _ = this;
        //this.$slider.trigger('unslick', [_, fromBreakpoint]);
        const event = this.createTrigger('unslick', [_, fromBreakpoint]);
        this.$slider.dispatchEvent(event);

        this.destroy();
    }

    // ------------------------
    // Not using "updateArrows"
    // ------------------------
    updateArrows() {
        let centerOffset;

        centerOffset = Math.floor(this.options.slidesToShow / 2);

        if (this.options.arrows === true && this.slideCount > this.options.slidesToShow && !this.options.infinite) {
            this.$prevArrow.removeClass('slick-disabled').attr('aria-disabled', 'false');
            this.$nextArrow.removeClass('slick-disabled').attr('aria-disabled', 'false');

            if (this.currentSlide === 0) {
                this.$prevArrow.addClass('slick-disabled').attr('aria-disabled', 'true');
                this.$nextArrow.removeClass('slick-disabled').attr('aria-disabled', 'false');
            } else if (
                this.currentSlide >= this.slideCount - this.options.slidesToShow &&
                this.options.centerMode === false
            ) {
                this.$nextArrow.addClass('slick-disabled').attr('aria-disabled', 'true');
                this.$prevArrow.removeClass('slick-disabled').attr('aria-disabled', 'false');
            } else if (this.currentSlide >= this.slideCount - 1 && this.options.centerMode === true) {
                this.$nextArrow.addClass('slick-disabled').attr('aria-disabled', 'true');
                this.$prevArrow.removeClass('slick-disabled').attr('aria-disabled', 'false');
            }
        }
    }

    // ------------------------
    // Complete
    // ------------------------
    updateDots() {
        const _ = this;
        //const thisDots = $(this.$dots);

        if (this.$dots !== null) {
            /*thisDots
                .find('li')
                .removeClass('slick-active')
                .end();*/
            const list = this.$dots.querySelectorAll('li');
            for (const li of list) {
                li.classList.remove('slick-active');
            }

            /*thisDots
                .find('li')
                .eq(Math.floor(this.currentSlide / this.options.slidesToScroll))
                .addClass('slick-active');*/
            const index = Math.floor(this.currentSlide / this.options.slidesToScroll);
            const activeLi = this.$dots.querySelectorAll('li')[index];
            activeLi.classList.add('slick-active');
        }
    }

    // ------------------------
    // Complete
    // ------------------------
    visibility() {
        const _ = this;

        if (this.options.autoplay) {
            if (document[this.hidden]) {
                this.interrupted = true;
            } else {
                this.interrupted = false;
            }
        }
    }
}
