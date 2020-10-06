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

(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined'
        ? (module.exports = factory())
        : typeof define === 'function' && define.amd
        ? define(factory)
        : ((global = typeof globalThis !== 'undefined' ? globalThis : global || self), (global.Slick = factory()));
})(this, function () {
    'use strict';

    //var Slick = window.Slick || {};

    var instanceUid = 0;

    // --------------------------
    // Complete
    // --------------------------
    function Slick(element, settings) {
        var _ = this,
            dataSettings;

        _.defaults = {
            accessibility: true,
            adaptiveHeight: false,
            appendArrows: element,
            appendDots: element,
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
                button.text = i + 1 + '';
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

        _.initials = {
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

        //$.extend(_, _.initials);
        _.extendAll(_, _.initials);

        _.activeBreakpoint = null;
        _.animType = null;
        _.animProp = null;
        _.breakpoints = [];
        _.breakpointSettings = [];
        _.cssTransitions = false;
        _.focussed = false;
        _.interrupted = false;
        _.hidden = 'hidden';
        _.paused = true;
        _.positionProp = null;
        _.respondTo = null;
        _.rowCount = 1;
        _.shouldClick = true;
        _.$slider = element;
        _.$slidesCache = null;
        _.transformType = null;
        _.transitionType = null;
        _.visibilityChange = 'visibilitychange';
        _.windowWidth = 0;
        _.windowTimer = null;

        //dataSettings = $(element).data('slick') || {};

        //_.options = $.extend({}, _.defaults, settings, dataSettings);
        _.options = _.extendAll({}, _.defaults, settings, dataSettings);

        _.currentSlide = _.options.initialSlide;

        _.originalSettings = _.options;

        if (typeof document.mozHidden !== 'undefined') {
            _.hidden = 'mozHidden';
            _.visibilityChange = 'mozvisibilitychange';
        } else if (typeof document.webkitHidden !== 'undefined') {
            _.hidden = 'webkitHidden';
            _.visibilityChange = 'webkitvisibilitychange';
        }

        /*_.autoPlay = $.proxy(_.autoPlay, _);
        _.autoPlayClear = $.proxy(_.autoPlayClear, _);
        _.autoPlayIterator = $.proxy(_.autoPlayIterator, _);
        _.changeSlide = $.proxy(_.changeSlide, _);
        _.clickHandler = $.proxy(_.clickHandler, _);
        _.selectHandler = $.proxy(_.selectHandler, _);
        _.setPosition = $.proxy(_.setPosition, _);
        _.swipeHandler = $.proxy(_.swipeHandler, _);
        _.dragHandler = $.proxy(_.dragHandler, _);
        _.keyHandler = $.proxy(_.keyHandler, _);*/

        _.autoPlay = _.autoPlay.bind(_);
        _.autoPlayClear = _.autoPlayClear.bind(_);
        _.autoPlayIterator = _.autoPlayIterator.bind(_);
        _.changeSlide = _.changeSlide.bind(_);
        _.clickHandler = _.clickHandler.bind(_);
        _.selectHandler = _.selectHandler.bind(_);
        _.setPosition = _.setPosition.bind(_);
        _.swipeHandler = _.swipeHandler.bind(_);
        //_.dragHandler = _.dragHandler.bind(_);
        _.keyHandler = _.keyHandler.bind(_);

        _.startSwipeHandler = _.startSwipeHandler.bind(_);
        _.moveSwipeHandler = _.moveSwipeHandler.bind(_);
        _.endSwipeHandler = _.endSwipeHandler.bind(_);

        _.instanceUid = instanceUid++;

        // A simple way to check for HTML strings
        // Strict HTML recognition (must start with <)
        // Extracted from jQuery v1.11 source
        _.htmlExpr = /^(?:\s*(<[\w\W]+>)[^>]*)$/;

        //_.registerBreakpoints();
        _.init(true);
    }

    // --------------------------
    // Complete
    // --------------------------
    Slick.prototype.extendAll = function (out) {
        out = out || {};

        for (var i = 1; i < arguments.length; i++) {
            if (!arguments[i]) continue;

            for (var key in arguments[i]) {
                if (arguments[i].hasOwnProperty(key)) out[key] = arguments[i][key];
            }
        }

        return out;
    };

    //---------------------------
    // Complete
    // -- Not sure of behaviour tho ??
    // ---------------------------
    Slick.prototype.activateADA = function () {
        var _ = this;

        const slickActive = _.$slideTrack.querySelector('.slick-active');
        if (slickActive) {
            slickActive.setAttribute('aria-hidden', 'false');
            const allOther = slickActive.querySelectorAll('a, input, button, select');

            for (let element of allOther) {
                element.setAttribute('tabindex', '0');
            }
        }

        /* $(_.$slideTrack)
            .find('.slick-active')
            .attr({
                'aria-hidden': 'false'
            })
            .find('a, input, button, select')
            .attr({
                tabindex: '0'
            });*/
    };

    Slick.prototype.createFromMarkup = function (markup) {
        // Convert markup to an HTMLElement
        if (!(markup instanceof HTMLElement)) {
            var tempNode = document.createElement('div');
            tempNode.innerHTML = markup;
            return tempNode.children[0];
        }

        return null;
    };

    //---------------------------
    // Complete
    // -- not using $(markup)
    // ---------------------------
    Slick.prototype.addSlide = function (markup, index, addBefore) {
        var _ = this;
        //const thisSlideTrack = $(_.$slideTrack);

        if (typeof index === 'boolean') {
            addBefore = index;
            index = null;
        } else if (index < 0 || index >= _.slideCount) {
            return false;
        }

        _.unload();

        if (typeof index === 'number') {
            if (index === 0 && _.$slides.length === 0) {
                $(markup).appendTo(thisSlideTrack);
            } else if (addBefore) {
                $(markup).insertBefore(_.$slides.eq(index));
            } else {
                $(markup).insertAfter(_.$slides.eq(index));
            }
        } else {
            if (addBefore === true) {
                // not using yet
                $(markup).prependTo(thisSlideTrack);
            } else {
                //$(markup).appendTo(thisSlideTrack);
                _.$slideTrack.appendChild(markup);
            }
        }

        //_.$slides = thisSlideTrack.children(this.options.slide);
        _.$slides = Array.from(_.$slideTrack.children);

        //thisSlideTrack.children(this.options.slide).detach();
        for (let item of Array.from(_.$slideTrack.children)) {
            item.parentNode.removeChild(item);
        }

        //thisSlideTrack.append(_.$slides);
        let indexer = 0;
        for (let item of _.$slides) {
            _.$slideTrack.appendChild(item);
            item.setAttribute('data-slick-index', indexer++);
        }

        /*_.$slides.each(function (index, element) {
            $(element).attr('data-slick-index', index);

        });*/

        _.$slidesCache = _.$slides;

        _.reinit();
    };

    //---------------------------------------
    // Complete
    // -- not using adaptive height, as yet
    // - finish this, if you require this
    // --------------------------------------
    Slick.prototype.animateHeight = function () {
        var _ = this;
        if (_.options.slidesToShow === 1 && _.options.adaptiveHeight === true && _.options.vertical === false) {
            var targetHeight = _.$slides.eq(_.currentSlide).outerHeight(true);
            _.$list.animate(
                {
                    height: targetHeight
                },
                _.options.speed
            );
        }
    };

    // ------------------------------
    // Complete
    // We always use CSS transitions
    // ---------------------------------
    Slick.prototype.animateSlide = function (targetLeft, callback) {
        var animProps = {},
            _ = this;

        _.animateHeight();

        if (_.options.rtl === true && _.options.vertical === false) {
            targetLeft = -targetLeft;
        }

        _.applyTransition();
        targetLeft = Math.ceil(targetLeft);

        if (_.options.vertical === false) {
            animProps[_.animType] = 'translate3d(' + targetLeft + 'px, 0px, 0px)';
        } else {
            animProps[_.animType] = 'translate3d(0px,' + targetLeft + 'px, 0px)';
        }
        //_.$slideTrack.css(animProps);
        _.cssAppender(_.$slideTrack, animProps);

        if (callback) {
            setTimeout(function () {
                _.disableTransition();

                callback.call();
            }, _.options.speed);
        }
    };

    //---------------------------
    // Complete
    // -- not using "asNavFor"
    // ---------------------------
    Slick.prototype.getNavTarget = function () {
        var _ = this,
            asNavFor = _.options.asNavFor;

        if (asNavFor && asNavFor !== null) {
            asNavFor = $(asNavFor).not(_.$slider);
        }

        return asNavFor;
    };

    //---------------------------
    // Complete
    // -- not using "asNavFor"
    // ---------------------------
    Slick.prototype.asNavFor = function (index) {
        var _ = this,
            asNavFor = _.getNavTarget();

        if (asNavFor !== null && typeof asNavFor === 'object') {
            asNavFor.each(function () {
                var target = $(this).slick('getSlick');
                if (!target.unslicked) {
                    target.slideHandler(index, true);
                }
            });
        }
    };

    // ------------------------
    // Complete
    // ------------------------
    Slick.prototype.applyTransition = function (slide) {
        var _ = this,
            transition = {};

        if (_.options.fade === false) {
            transition[_.transitionType] = _.transformType + ' ' + _.options.speed + 'ms ' + _.options.cssEase;
        } else {
            transition[_.transitionType] = 'opacity ' + _.options.speed + 'ms ' + _.options.cssEase;
        }

        if (_.options.fade === false) {
            //_.$slideTrack.css(transition);
            _.cssAppender(_.$slideTrack, transition);
        } else {
            _.$slides.eq(slide).css(transition);
        }
    };

    // ------------------------
    // Complete
    // ------------------------
    Slick.prototype.autoPlay = function () {
        var _ = this;

        _.autoPlayClear();

        if (_.slideCount > _.options.slidesToShow) {
            _.autoPlayTimer = setInterval(_.autoPlayIterator, _.options.autoplaySpeed);
        }
    };

    // ------------------------
    // Complete
    // ------------------------
    Slick.prototype.autoPlayClear = function () {
        var _ = this;

        if (_.autoPlayTimer) {
            clearInterval(_.autoPlayTimer);
        }
    };

    // ------------------------
    // Complete
    // ------------------------
    Slick.prototype.autoPlayIterator = function () {
        var _ = this,
            slideTo = _.currentSlide + _.options.slidesToScroll;

        if (!_.paused && !_.interrupted && !_.focussed) {
            if (_.options.infinite === false) {
                if (_.direction === 1 && _.currentSlide + 1 === _.slideCount - 1) {
                    _.direction = 0;
                } else if (_.direction === 0) {
                    slideTo = _.currentSlide - _.options.slidesToScroll;

                    if (_.currentSlide - 1 === 0) {
                        _.direction = 1;
                    }
                }
            }

            _.slideHandler(slideTo);
        }
    };

    //---------------------------
    // Complete
    // ---------------------------
    Slick.prototype.buildArrows = function () {
        var _ = this;

        if (_.options.arrows === true) {
            /*_.$prevArrow = $(_.options.prevArrow).addClass('slick-arrow');
            _.$nextArrow = $(_.options.nextArrow).addClass('slick-arrow');*/

            _.$prevArrow = _.createFromMarkup(_.options.prevArrow);
            _.$nextArrow = _.createFromMarkup(_.options.nextArrow);

            _.$prevArrow.classList.add('slick-arrow');
            _.$nextArrow.classList.add('slick-arrow');

            if (_.slideCount > _.options.slidesToShow) {
                //_.$prevArrow.removeClass('slick-hidden').removeAttr('aria-hidden tabindex');
                //_.$nextArrow.removeClass('slick-hidden').removeAttr('aria-hidden tabindex');
                _.$prevArrow.classList.remove('slick-hidden');
                _.$nextArrow.classList.remove('slick-hidden');

                _.$prevArrow.removeAttribute('aria-hidden', 'tabindex');
                _.$nextArrow.removeAttribute('aria-hidden', 'tabindex');

                if (_.htmlExpr.test(_.options.prevArrow)) {
                    //_.$prevArrow.prependTo(_.options.appendArrows);
                    _.options.appendArrows.insertBefore(_.$prevArrow, _.options.appendArrows.firstChild);
                }

                if (_.htmlExpr.test(_.options.nextArrow)) {
                    //_.$nextArrow.appendTo(_.options.appendArrows);
                    _.options.appendArrows.appendChild(_.$nextArrow);
                }

                if (_.options.infinite !== true) {
                    //_.$prevArrow.addClass('slick-disabled').attr('aria-disabled', 'true');
                    _.$prevArrow.classList.add('slick-disabled');
                    _.$prevArrow.setAttribute('aria-disabled', 'true');
                }
            } else {
                _.$prevArrow
                    .add(_.$nextArrow)

                    .addClass('slick-hidden')
                    .attr({
                        'aria-disabled': 'true',
                        tabindex: '-1'
                    });
            }
        }
    };

    // ------------------------
    // Complete
    // ------------------------
    Slick.prototype.buildDots = function () {
        var _ = this,
            i,
            dot;
        //const thisSlider = $(_.$slider);

        if (_.options.dots === true && _.slideCount > _.options.slidesToShow) {
            //thisSlider.addClass('slick-dotted');
            _.$slider.classList.add('slick-dotted');

            //dot = $('<ul />').addClass(_.options.dotsClass);
            dot = document.createElement('ul');
            dot.classList.add(_.options.dotsClass);

            for (i = 0; i <= _.getDotCount(); i += 1) {
                const li = document.createElement('li');
                li.appendChild(_.options.customPaging.call(this, _, i));
                dot.appendChild(li);
                //dot.append($('<li />').append(_.options.customPaging.call(this, _, i)));
            }

            //_.$dots = dot.appendTo(_.options.appendDots);
            //_.$dots = $(_.options.appendDots.appendChild(dot));
            _.options.appendDots.appendChild(dot);
            _.$dots = dot; //_.options.appendDots;

            //_.$dots.find('li').first().addClass('slick-active');
            const firstLi = _.$dots.querySelectorAll('li')[0];
            firstLi.classList.add('slick-active');
        }
    };

    // ------------------------
    // Complete
    // ------------------------
    Slick.prototype.buildOut = function () {
        var _ = this;
        //const thisSlider = $(_.$slider);

        _.$slides = _.$slider.children;
        let index = 0;
        for (let item of _.$slides) {
            item.classList.add('slick-slide');
            item.setAttribute('data-slick-index', index);

            index++;
        }

        //_.$slides = thisSlider.children(_.options.slide + ':not(.slick-cloned)');

        _.slideCount = _.$slides.length;

        //_.$slides = thisSlider.children( _.options.slide + ':not(.slick-cloned)');
        //_.$slides.addClass('slick-slide');

        //_.slideCount = _.$slides.length;

        /*_.$slides.each(function(index, element) {
            $(element)
                .attr('data-slick-index', index)
                .data('originalStyling', $(element).attr('style') || '');
        });*/

        //thisSlider.addClass('slick-slider');
        _.$slider.classList.add('slick-slider');

        /*_.$slideTrack = (_.slideCount === 0) ?
            $('<div class="slick-track"/>').appendTo(thisSlider) :
            _.$slides.wrapAll('<div class="slick-track"/>').parent();*/

        const slickTrackDiv = _.creatDiv('slick-track');

        if (_.slideCount === 0) {
            // TODO: still need to do this one
            _.$slideTrack = $('<div class="slick-track"/>').appendTo(thisSlider);
        } else {
            _.$slideTrack = _.wrapAll(_.$slides, slickTrackDiv);
        }

        const slickListDiv = _.creatDiv('slick-list');
        //_.$list = _.$slideTrack.wrap('<div class="slick-list"/>').parent();

        //const lister = _.wrapAll([_.$slideTrack], slickListDiv);
        //_.$list = $(lister);
        _.$list = _.wrapAll([_.$slideTrack], slickListDiv);

        //_.$slideTrack.css('opacity', 0);
        _.$slideTrack.style.opacity = 0;

        if (_.options.centerMode === true || _.options.swipeToSlide === true) {
            _.options.slidesToScroll = 1;
        }

        // ---------------------
        // not using this yet
        //$('img[data-lazy]', thisSlider).not('[src]').addClass('slick-loading');
        // ---------------------

        _.setupInfinite();

        _.buildArrows();

        _.buildDots();

        _.updateDots();

        _.setSlideClasses(typeof _.currentSlide === 'number' ? _.currentSlide : 0);

        if (_.options.draggable === true) {
            //_.$list.addClass('draggable');
            _.$list.classList.add('draggable');
        }
    };

    // ------------------------
    // Complete
    // ------------------------
    Slick.prototype.creatDiv = function (className) {
        const div = document.createElement('div');
        div.classList.add(className);

        return div;
    };

    // ------------------------
    // Complete
    // ------------------------
    Slick.prototype.wrapAll = function (nodes, wrapper) {
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
    };

    // ------------------------
    // Complete
    // ------------------------
    Slick.prototype.buildRows = function () {
        var _ = this,
            a,
            b,
            c,
            newSlides,
            numOfSlides,
            originalSlides,
            slidesPerSection;

        //const thisSlider = $(_.$slider);
        newSlides = document.createDocumentFragment();
        //originalSlides = thisSlider.children();
        originalSlides = Array.from(_.$slider.children).slice();

        if (_.options.rows > 0) {
            slidesPerSection = _.options.slidesPerRow * _.options.rows;
            numOfSlides = Math.ceil(originalSlides.length / slidesPerSection);

            for (a = 0; a < numOfSlides; a++) {
                var slide = document.createElement('div');
                for (b = 0; b < _.options.rows; b++) {
                    var row = document.createElement('div');
                    for (c = 0; c < _.options.slidesPerRow; c++) {
                        var target = a * slidesPerSection + (b * _.options.slidesPerRow + c);
                        /*if (originalSlides.get(target)) {
                            row.appendChild(originalSlides.get(target));
                        }*/
                        if (originalSlides[target]) {
                            if (_.options.variableWidth === false && _.options.slideWidth !== 0) {
                                _.cssAppender(row, {
                                    width: _.options.slideWidth + 'px',
                                    display: 'inline-block'
                                });
                            } else {
                                _.cssAppender(row, {
                                    width: 100 / _.options.slidesPerRow + '%',
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
            _.emptyDOM(_.$slider);
            _.$slider.appendChild(newSlides);

            /* if (_.options.variableWidth === false && _.options.slideWidth !== 0) {
                 thisSlider.children().children().children()
                     .css({
                         'width': _.options.slideWidth + 'px',
                         'display': 'inline-block'
                     });

             } else {
                 thisSlider.children().children().children()
                     .css({
                         'width': (100 / _.options.slidesPerRow) + '%',
                         'display': 'inline-block'
                     });
             }*/
        }
    };

    // ------------------------
    // Complete
    // ------------------------
    Slick.prototype.emptyDOM = function (el) {
        while (el.firstChild) el.removeChild(el.firstChild);
    };

    // --------------------------
    // Complete
    // --------------------------
    Slick.prototype.checkResponsive = function (initial, forceUpdate) {
        var _ = this,
            breakpoint,
            targetBreakpoint,
            respondToWidth,
            triggerBreakpoint = false;

        //const thisSlider = $(_.$slider);
        //var sliderWidth = thisSlider.width();
        var sliderWidth = _.get_Width(_.$slider);

        var windowWidth = window.innerWidth || $(window).width();

        if (_.respondTo === 'window') {
            respondToWidth = windowWidth;
        } else if (_.respondTo === 'slider') {
            respondToWidth = sliderWidth;
        } else if (_.respondTo === 'min') {
            respondToWidth = Math.min(windowWidth, sliderWidth);
        }

        if (_.options.responsive && _.options.responsive.length && _.options.responsive !== null) {
            targetBreakpoint = null;

            for (breakpoint in _.breakpoints) {
                if (_.breakpoints.hasOwnProperty(breakpoint)) {
                    if (_.originalSettings.mobileFirst === false) {
                        if (respondToWidth < _.breakpoints[breakpoint]) {
                            targetBreakpoint = _.breakpoints[breakpoint];
                        }
                    } else {
                        if (respondToWidth > _.breakpoints[breakpoint]) {
                            targetBreakpoint = _.breakpoints[breakpoint];
                        }
                    }
                }
            }

            if (targetBreakpoint !== null) {
                if (_.activeBreakpoint !== null) {
                    if (targetBreakpoint !== _.activeBreakpoint || forceUpdate) {
                        _.activeBreakpoint = targetBreakpoint;
                        if (_.breakpointSettings[targetBreakpoint] === 'unslick') {
                            _.unslick(targetBreakpoint);
                        } else {
                            /*_.options = $.extend({}, _.originalSettings,
                                _.breakpointSettings[
                                    targetBreakpoint]);*/

                            _.options = _.extendAll({}, _.originalSettings, _.breakpointSettings[targetBreakpoint]);

                            if (initial === true) {
                                _.currentSlide = _.options.initialSlide;
                            }
                            _.refresh(initial);
                        }
                        triggerBreakpoint = targetBreakpoint;
                    }
                } else {
                    _.activeBreakpoint = targetBreakpoint;
                    if (_.breakpointSettings[targetBreakpoint] === 'unslick') {
                        _.unslick(targetBreakpoint);
                    } else {
                        /*_.options = $.extend({}, _.originalSettings,
                            _.breakpointSettings[
                                targetBreakpoint]);*/

                        _.options = _.extendAll({}, _.originalSettings, _.breakpointSettings[targetBreakpoint]);

                        if (initial === true) {
                            _.currentSlide = _.options.initialSlide;
                        }
                        _.refresh(initial);
                    }
                    triggerBreakpoint = targetBreakpoint;
                }
            } else {
                if (_.activeBreakpoint !== null) {
                    _.activeBreakpoint = null;
                    _.options = _.originalSettings;
                    if (initial === true) {
                        _.currentSlide = _.options.initialSlide;
                    }
                    _.refresh(initial);
                    triggerBreakpoint = targetBreakpoint;
                }
            }

            // only trigger breakpoints during an actual break. not on initialize.
            if (!initial && triggerBreakpoint !== false) {
                //thisSlider.trigger('breakpoint', [_, triggerBreakpoint]);
                const event = _.createTrigger('breakpoint', [_, triggerBreakpoint]);
                _.$slider.dispatchEvent(event);
            }
        }
    };

    // --------------------------
    // Complete
    // --------------------------
    Slick.prototype.changeSlide = function (event, dontAnimate) {
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
        if (_.isMatches($target, 'a')) {
        }

        // If target is not the <li> element (ie: a child), find the <li>.
        //not using
        /*if (!$target.is('li')) {
            $target = $target.closest('li');
        }*/

        unevenOffset = _.slideCount % _.options.slidesToScroll !== 0;
        indexOffset = unevenOffset ? 0 : (_.slideCount - _.currentSlide) % _.options.slidesToScroll;

        switch (event.data.message) {
            case 'previous':
                slideOffset = indexOffset === 0 ? _.options.slidesToScroll : _.options.slidesToShow - indexOffset;
                if (_.slideCount > _.options.slidesToShow) {
                    _.slideHandler(_.currentSlide - slideOffset, false, dontAnimate);
                }
                break;

            case 'next':
                slideOffset = indexOffset === 0 ? _.options.slidesToScroll : indexOffset;
                if (_.slideCount > _.options.slidesToShow) {
                    _.slideHandler(_.currentSlide + slideOffset, false, dontAnimate);
                }
                break;

            case 'index':
                var index =
                    event.data.index === 0
                        ? 0
                        : event.data.index || _.indexInParent($target) * _.options.slidesToScroll;

                _.slideHandler(_.checkNavigable(index), false, dontAnimate);

                //not doing focus yet
                //$target.children().trigger('focus');
                break;

            default:
                return;
        }
    };

    // --------------------------
    // Complete
    // --------------------------
    Slick.prototype.indexInParent = function (node) {
        var children = node.parentNode.childNodes;
        var num = 0;
        for (var i = 0; i < children.length; i++) {
            if (children[i] === node) return num;
            if (children[i].nodeType === 1) num++;
        }
        return -1;
    };

    // --------------------------
    // Complete
    // --------------------------
    Slick.prototype.checkNavigable = function (index) {
        var _ = this,
            navigables,
            prevNavigable;

        navigables = _.getNavigableIndexes();
        prevNavigable = 0;
        if (index > navigables[navigables.length - 1]) {
            index = navigables[navigables.length - 1];
        } else {
            for (var n in navigables) {
                if (index < navigables[n]) {
                    index = prevNavigable;
                    break;
                }
                prevNavigable = navigables[n];
            }
        }

        return index;
    };

    /*
    NEEDS TO BE FINISHED OFF
    */
    Slick.prototype.cleanUpEvents = function () {
        var _ = this;
        //const thisDots = $(_.$dots);
        //const thisList = $(_.$list);
        const thisSlider = $(_.$slider);
        //const thisPrevArrow = $(_.$prevArrow);
        //const thisNextArrow = $(_.$nextArrow);

        if (_.options.dots && _.$dots !== null) {
            _.queryAll('li', _.$dots).forEach(function (elem) {
                elem.removeEventListener('click', _.changeSlide);
                elem.removeEventListener('mouseenter', _.interrupt.bind(_), true);
                elem.removeEventListener('mouseleave', _.interrupt.bind(_), false);
            });
            /*$('li', thisDots)
                .off('click.slick', _.changeSlide)
                .off('mouseenter.slick', $.proxy(_.interrupt, _, true))
                .off('mouseleave.slick', $.proxy(_.interrupt, _, false));*/

            if (_.options.accessibility === true) {
                //thisDots.off('keydown.slick', _.keyHandler);
                _.$dots.removeEventListener('keydown', _.keyHandler);
            }
        }

        thisSlider.off('focus.slick blur.slick');

        if (_.options.arrows === true && _.slideCount > _.options.slidesToShow) {
            /*thisPrevArrow && thisPrevArrow.off('click', _.changeSlide);
            thisNextArrow && thisNextArrow.off('click', _.changeSlide);*/
            _.$prevArrow && _.$prevArrow.removeEventListener('click', _.changeSlide);
            _.$nextArrow && _.$nextArrow.removeEventListener('click', _.changeSlide);

            if (_.options.accessibility === true) {
                /*thisPrevArrow && thisPrevArrow.off('keydown', _.keyHandler);
                thisNextArrow && thisNextArrow.off('keydown', _.keyHandler);*/
                _.$prevArrow && _.$prevArrow.removeEventListener('keydown', _.keyHandler);
                _.$nextArrow && _.$nextArrow.removeEventListener('keydown', _.keyHandler);
            }
        }

        /*thisList.off('touchstart.slick mousedown.slick', _.swipeHandler);
        thisList.off('touchmove.slick mousemove.slick', _.swipeHandler);
        thisList.off('touchend.slick mouseup.slick', _.swipeHandler);
        thisList.off('touchcancel.slick mouseleave.slick', _.swipeHandler);*/
        _.$list.removeEventListener('touchstart', _.startSwipeHandler);
        _.$list.removeEventListener('mousedown', _.startSwipeHandler);
        _.$list.removeEventListener('touchmove', _.moveSwipeHandler);
        _.$list.removeEventListener('mousemove', _.moveSwipeHandler);
        _.$list.removeEventListener('touchend', _.endSwipeHandler);
        _.$list.removeEventListener('mouseup', _.endSwipeHandler);
        _.$list.removeEventListener('touchcancel', _.endSwipeHandler);
        _.$list.removeEventListener('mouseleave', _.endSwipeHandler);

        //thisList.off('click.slick', _.clickHandler);
        _.$list.removeEventListener('click', _.clickHandler);

        //$(document).off(_.visibilityChange, _.visibility);
        document.removeEventListener(_.visibilityChange, _.visibility);

        _.cleanUpSlideEvents();

        if (_.options.accessibility === true) {
            //thisList.off('keydown.slick', _.keyHandler);
        }

        if (_.options.focusOnSelect === true) {
            //$(_.$slideTrack).children().off('click.slick', _.selectHandler);
            for (let item of Array.from(_.$slideTrack.children)) {
                item.removeEventListener('click', _.selectHandler);
            }
        }

        //leaving this out for now
        //$(window).off('orientationchange.slick.slick-' + _.instanceUid, _.orientationChange);

        //$(window).off('resize.slick.slick-' + _.instanceUid, _.resize);
        window.removeEventListener('resize', _.resize);

        //TODO: find a way to do this using vanilla js
        //$('[draggable!=true]', _.$slideTrack).off('dragstart', _.preventDefault);

        //$(window).off('load.slick.slick-' + _.instanceUid, _.setPosition);
        window.removeEventListener('load', _.setPosition);
    };

    // --------------------------
    // Complete
    // --------------------------
    Slick.prototype.cleanUpSlideEvents = function () {
        var _ = this;
        //const thisList = $(_.$list);

        //thisList.off('mouseenter.slick', $.proxy(_.interrupt, _, true));
        //thisList.off('mouseleave.slick', $.proxy(_.interrupt, _, false));

        _.$list.removeEventListener('mouseenter', _.interrupt.bind(_), true);
        _.$list.removeEventListener('mouseleave', _.interrupt.bind(_), false);
    };

    /*
    NEEDS TO BE FINISHED OFF
    */
    Slick.prototype.cleanUpRows = function () {
        var _ = this,
            originalSlides;
        const thisSlides = $(_.$slides);
        const thisSlider = $(_.$slider);

        if (_.options.rows > 0) {
            originalSlides = thisSlides.children().children();
            originalSlides.removeAttr('style');
            thisSlider.empty().append(originalSlides);
        }
    };

    // --------------------------
    // Complete
    // --------------------------
    Slick.prototype.clickHandler = function (event) {
        var _ = this;

        if (_.shouldClick === false) {
            event.stopImmediatePropagation();
            event.stopPropagation();
            event.preventDefault();
        }
    };

    /*
    NEEDS TO BE FINISHED OFF
    */
    Slick.prototype.destroy = function (refresh) {
        var _ = this;
        const thisSlider = $(_.$slider);
        const thisSlides = $(_.$slides);
        const thisSlideTrack = $(_.$slideTrack);

        _.autoPlayClear();

        _.touchObject = {};

        _.cleanUpEvents();

        //$('.slick-cloned', thisSlider).detach();
        _.queryAll('.slick-cloned', _.$slider).forEach(function (elem) {
            _.removeNodeUtil(elem);
        });

        if (_.$dots) {
            //_.$dots.remove();
            _.$dots.parentNode.removeChild(_.$dots);
        }

        if (_.$prevArrow && _.htmlExpr.test(_.options.prevArrow)) {
            /*_.$prevArrow
                .removeClass('slick-disabled slick-arrow slick-hidden')
                .removeAttr('aria-hidden aria-disabled tabindex')
                .css('display', '');*/
            _.$prevArrow.classList.remove('slick-disabled', 'slick-arrow', 'slick-hidden');
            _.$prevArrow.removeAttribute('aria-hidden', 'aria-disabled', 'tabindex');
            _.$prevArrow.style.display = '';

            //_.$prevArrow.remove();
            _.removeNodeUtil(_.$prevArrow);
        }

        if (_.$nextArrow && _.htmlExpr.test(_.options.nextArrow)) {
            /*_.$nextArrow
                .removeClass('slick-disabled slick-arrow slick-hidden')
                .removeAttr('aria-hidden aria-disabled tabindex')
                .css('display', '');*/
            _.$nextArrow.classList.remove('slick-disabled', 'slick-arrow', 'slick-hidden');
            _.$nextArrow.removeAttribute('aria-hidden', 'aria-disabled', 'tabindex');
            _.$nextArrow.style.display = '';

            //_.$nextArrow.remove();
            _.removeNodeUtil(_.$nextArrow);
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

            $(_.$list).detach();

            thisSlider.append(thisSlides);
        }

        _.cleanUpRows();

        /*thisSlider.removeClass('slick-slider');
        thisSlider.removeClass('slick-initialized');
        thisSlider.removeClass('slick-dotted');*/
        _.$slider.classList.remove('slick-slider', 'slick-initialized', 'slick-dotted');

        _.unslicked = true;

        if (!refresh) {
            //_.$slider.trigger('destroy', [_]);
            const event = _.createTrigger('destroy', [_]);
            _.$slider.dispatchEvent(event);
        }
    };

    // --------------------------
    // Complete
    // -- not using Fade
    // --------------------------
    Slick.prototype.disableTransition = function (slide) {
        var _ = this,
            transition = {};

        transition[_.transitionType] = '';

        if (_.options.fade === false) {
            //_.$slideTrack.css(transition);
            _.cssAppender(_.$slideTrack, transition);
        } else {
            //not using this yet
            //_.$slides.eq(slide).css(transition);
        }
    };

    // --------------------------
    // Complete
    // -- not using Fade
    // --------------------------
    Slick.prototype.fadeSlide = function (slideIndex, callback) {
        var _ = this;

        _.applyTransition(slideIndex);

        _.$slides.eq(slideIndex).css({
            opacity: 1,
            zIndex: _.options.zIndex
        });

        if (callback) {
            setTimeout(function () {
                _.disableTransition(slideIndex);

                callback.call();
            }, _.options.speed);
        }
    };

    // --------------------------
    // Complete
    // -- not using Fade
    // --------------------------
    Slick.prototype.fadeSlideOut = function (slideIndex) {
        var _ = this;

        _.applyTransition(slideIndex);

        _.$slides.eq(slideIndex).css({
            opacity: 0,
            zIndex: _.options.zIndex - 2
        });
    };

    // --------------------------
    // Complete
    // --------------------------
    Slick.prototype.cssAppender = function (el, styles) {
        Object.keys(styles).forEach((t) => {
            el.style[t] = styles[t];
        });
    };

    Slick.prototype.filterSlides = Slick.prototype.slickFilter = function (filter) {
        var _ = this;

        if (filter !== null) {
            _.$slidesCache = _.$slides;

            _.unload();

            $(_.$slideTrack).children(this.options.slide).detach();

            _.$slidesCache.filter(filter).appendTo(_.$slideTrack);

            _.reinit();
        }
    };

    Slick.prototype.focusHandler = function () {
        var _ = this;

        // If any child element receives focus within the slider we need to pause the autoplay
        $(_.$slider)
            .off('focus.slick blur.slick')
            .on('focus.slick', '*', function (event) {
                var $sf = $(this);

                setTimeout(function () {
                    if (_.options.pauseOnFocus) {
                        if ($sf.is(':focus')) {
                            _.focussed = true;
                            _.autoPlay();
                        }
                    }
                }, 0);
            })
            .on('blur.slick', '*', function (event) {
                var $sf = $(this);

                // When a blur occurs on any elements within the slider we become unfocused
                if (_.options.pauseOnFocus) {
                    _.focussed = false;
                    _.autoPlay();
                }
            });
    };

    // --------------------------
    // Complete
    // --------------------------
    Slick.prototype.getCurrent = Slick.prototype.slickCurrentSlide = function () {
        var _ = this;
        return _.currentSlide;
    };

    // --------------------------
    // Complete
    // --------------------------
    Slick.prototype.getDotCount = function () {
        var _ = this;

        var breakPoint = 0;
        var counter = 0;
        var pagerQty = 0;

        if (_.options.infinite === true) {
            if (_.slideCount <= _.options.slidesToShow) {
                ++pagerQty;
            } else {
                while (breakPoint < _.slideCount) {
                    ++pagerQty;
                    breakPoint = counter + _.options.slidesToScroll;
                    counter +=
                        _.options.slidesToScroll <= _.options.slidesToShow
                            ? _.options.slidesToScroll
                            : _.options.slidesToShow;
                }
            }
        } else if (_.options.centerMode === true) {
            pagerQty = _.slideCount;
        } else if (!_.options.asNavFor) {
            pagerQty = 1 + Math.ceil((_.slideCount - _.options.slidesToShow) / _.options.slidesToScroll);
        } else {
            while (breakPoint < _.slideCount) {
                ++pagerQty;
                breakPoint = counter + _.options.slidesToScroll;
                counter +=
                    _.options.slidesToScroll <= _.options.slidesToShow
                        ? _.options.slidesToScroll
                        : _.options.slidesToShow;
            }
        }

        return pagerQty - 1;
    };

    // --------------------------
    // Complete
    // --------------------------
    Slick.prototype.getLeft = function (slideIndex) {
        var _ = this,
            targetLeft,
            verticalHeight,
            verticalOffset = 0,
            targetSlide,
            coef;
        //const thisSlideTrack = $(_.$slideTrack);

        _.slideOffset = 0;
        //verticalHeight = $(_.$slides).first().outerHeight(true);
        verticalHeight = _.get_OuterHeight(_.$slides[0], true);

        if (_.options.infinite === true) {
            if (_.slideCount > _.options.slidesToShow) {
                _.slideOffset = _.slideWidth * _.options.slidesToShow * -1;
                coef = -1;

                if (_.options.vertical === true && _.options.centerMode === true) {
                    if (_.options.slidesToShow === 2) {
                        coef = -1.5;
                    } else if (_.options.slidesToShow === 1) {
                        coef = -2;
                    }
                }
                verticalOffset = verticalHeight * _.options.slidesToShow * coef;
            }
            if (_.slideCount % _.options.slidesToScroll !== 0) {
                if (slideIndex + _.options.slidesToScroll > _.slideCount && _.slideCount > _.options.slidesToShow) {
                    if (slideIndex > _.slideCount) {
                        _.slideOffset = (_.options.slidesToShow - (slideIndex - _.slideCount)) * _.slideWidth * -1;
                        verticalOffset = (_.options.slidesToShow - (slideIndex - _.slideCount)) * verticalHeight * -1;
                    } else {
                        _.slideOffset = (_.slideCount % _.options.slidesToScroll) * _.slideWidth * -1;
                        verticalOffset = (_.slideCount % _.options.slidesToScroll) * verticalHeight * -1;
                    }
                }
            }
        } else {
            if (slideIndex + _.options.slidesToShow > _.slideCount) {
                _.slideOffset = (slideIndex + _.options.slidesToShow - _.slideCount) * _.slideWidth;
                verticalOffset = (slideIndex + _.options.slidesToShow - _.slideCount) * verticalHeight;
            }
        }

        if (_.slideCount <= _.options.slidesToShow) {
            _.slideOffset = 0;
            verticalOffset = 0;
        }

        if (_.options.centerMode === true && _.slideCount <= _.options.slidesToShow) {
            _.slideOffset = (_.slideWidth * Math.floor(_.options.slidesToShow)) / 2 - (_.slideWidth * _.slideCount) / 2;
        } else if (_.options.centerMode === true && _.options.infinite === true) {
            _.slideOffset += _.slideWidth * Math.floor(_.options.slidesToShow / 2) - _.slideWidth;
        } else if (_.options.centerMode === true) {
            _.slideOffset = 0;
            _.slideOffset += _.slideWidth * Math.floor(_.options.slidesToShow / 2);
        }

        if (_.options.vertical === false) {
            targetLeft = slideIndex * _.slideWidth * -1 + _.slideOffset;
        } else {
            targetLeft = slideIndex * verticalHeight * -1 + verticalOffset;
        }

        if (_.options.variableWidth === true) {
            if (_.slideCount <= _.options.slidesToShow || _.options.infinite === false) {
                //targetSlide = thisSlideTrack.children('.slick-slide').eq(slideIndex);
                targetSlide = _.$slideTrack.children[slideIndex];
            } else {
                //targetSlide = thisSlideTrack.children('.slick-slide').eq(slideIndex + _.options.slidesToShow);
                targetSlide = _.$slideTrack.children[slideIndex + _.options.slidesToShow];
            }

            if (_.options.rtl === true) {
                // not using rtl yes - so this wont work yet
                /* if (targetSlide[0]) {
                    targetLeft = (thisSlideTrack.width() - targetSlide[0].offsetLeft - targetSlide.width()) * -1;
                } else {
                    targetLeft = 0;
                }*/
            } else {
                //targetLeft = targetSlide[0] ? targetSlide[0].offsetLeft * -1 : 0;
                targetLeft = targetSlide ? targetSlide.offsetLeft * -1 : 0;
            }

            if (_.options.centerMode === true) {
                if (_.slideCount <= _.options.slidesToShow || _.options.infinite === false) {
                    //targetSlide = thisSlideTrack.children('.slick-slide').eq(slideIndex);
                    targetSlide = _.$slideTrack.children[slideIndex];
                } else {
                    //targetSlide = thisSlideTrack.children('.slick-slide').eq(slideIndex + _.options.slidesToShow + 1);
                    targetSlide = _.$slideTrack.children[slideIndex + _.options.slidesToShow + 1];
                }

                if (_.options.rtl === true) {
                    // not using rtl yes - so this wont work yet
                    /*if (targetSlide) {
                        targetLeft = (thisSlideTrack.width() - targetSlide[0].offsetLeft - targetSlide.width()) * -1;
                    } else {
                        targetLeft = 0;
                    }*/
                } else {
                    //targetLeft = targetSlide[0] ? targetSlide[0].offsetLeft * -1 : 0;
                    targetLeft = targetSlide ? targetSlide.offsetLeft * -1 : 0;
                }

                /*let one = $(_.$list).width();
                let two = targetSlide.outerWidth();*/

                //let one = $(_.$list).width();
                //let other = _.get_Width(_.$list);

                let trueWidth = _.get_Width(_.$list, true);

                //targetLeft += ($(_.$list).width() - targetSlide.outerWidth()) / 2;
                targetLeft += (trueWidth - _.get_OuterWidth(targetSlide)) / 2;
            }
        }

        return targetLeft;
    };

    // --------------------------
    // Complete
    // --------------------------
    Slick.prototype.getOption = Slick.prototype.slickGetOption = function (option) {
        var _ = this;

        return _.options[option];
    };

    // --------------------------
    // Complete
    // --------------------------
    Slick.prototype.getNavigableIndexes = function () {
        var _ = this,
            breakPoint = 0,
            counter = 0,
            indexes = [],
            max;

        if (_.options.infinite === false) {
            max = _.slideCount;
        } else {
            breakPoint = _.options.slidesToScroll * -1;
            counter = _.options.slidesToScroll * -1;
            max = _.slideCount * 2;
        }

        while (breakPoint < max) {
            indexes.push(breakPoint);
            breakPoint = counter + _.options.slidesToScroll;
            counter +=
                _.options.slidesToScroll <= _.options.slidesToShow ? _.options.slidesToScroll : _.options.slidesToShow;
        }

        return indexes;
    };

    // --------------------------
    // Complete
    // --------------------------
    Slick.prototype.getSlick = function () {
        return this;
    };

    // --------------------------
    // Complete
    // -- not using "swipeToSlide"
    // --------------------------
    Slick.prototype.getSlideCount = function () {
        var _ = this,
            slidesTraversed,
            swipedSlide,
            swipeTarget,
            centerOffset;

        //centerOffset = _.options.centerMode === true ? Math.floor(_.$list.width() / 2) : 0;
        centerOffset = _.options.centerMode === true ? Math.floor(_.get_Width(_.$list, true) / 2) : 0;
        swipeTarget = _.swipeLeft * -1 + centerOffset;

        if (_.options.swipeToSlide === true) {
            _.$slideTrack.find('.slick-slide').each(function (index, slide) {
                var slideOuterWidth, slideOffset, slideRightBoundary;
                slideOuterWidth = $(slide).outerWidth();
                slideOffset = slide.offsetLeft;
                if (_.options.centerMode !== true) {
                    slideOffset += slideOuterWidth / 2;
                }

                slideRightBoundary = slideOffset + slideOuterWidth;

                if (swipeTarget < slideRightBoundary) {
                    swipedSlide = slide;
                    return false;
                }
            });

            slidesTraversed = Math.abs($(swipedSlide).attr('data-slick-index') - _.currentSlide) || 1;

            return slidesTraversed;
        } else {
            return _.options.slidesToScroll;
        }
    };

    // --------------------------
    // Complete
    // --------------------------
    Slick.prototype.goTo = Slick.prototype.slickGoTo = function (slide, dontAnimate) {
        var _ = this;

        _.changeSlide(
            {
                data: {
                    message: 'index',
                    index: parseInt(slide)
                }
            },
            dontAnimate
        );
    };

    // --------------------------
    // Complete
    // --------------------------
    Slick.prototype.init = function (creation) {
        var _ = this;
        //const thisSlider = $(_.$slider);

        const _isInit = _.$slider.classList.contains('slick-initialized');
        if (!_isInit) {
            //$(thisSlider).addClass('slick-initialized');
            _.$slider.classList.add('slick-initialized');

            _.buildRows();
            _.buildOut();
            _.setProps();
            _.startLoad();
            _.loadSlider();
            _.initializeEvents();
            _.updateArrows();
            _.updateDots();
            _.checkResponsive(true);
            _.focusHandler();
        }

        if (creation) {
            //thisSlider.trigger('init', [_]);
            const event = _.createTrigger('init', [_]);
            _.$slider.dispatchEvent(event);
        }

        if (_.options.accessibility === true) {
            _.initADA();
        }

        if (_.options.autoplay) {
            _.paused = false;
            _.autoPlay();
        }
    };

    /*
    MUST DO NEXT
    */
    Slick.prototype.initADA = function () {
        var _ = this,
            numDotGroups = Math.ceil(_.slideCount / _.options.slidesToShow),
            tabControlIndexes = _.getNavigableIndexes().filter(function (val) {
                return val >= 0 && val < _.slideCount;
            });

        const thisSlides = $(_.$slides);
        const thisSideTrack = $(_.$slideTrack);
        const thisDots = $(_.$dots);

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
                    id: 'slick-slide' + _.instanceUid + i,
                    tabindex: -1
                });

                if (slideControlIndex !== -1) {
                    var ariaButtonControl = 'slick-slide-control' + _.instanceUid + slideControlIndex;
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
                            id: 'slick-slide-control' + _.instanceUid + i,
                            'aria-controls': 'slick-slide' + _.instanceUid + mappedSlideIndex,
                            'aria-label': i + 1 + ' of ' + numDotGroups,
                            'aria-selected': null,
                            tabindex: '-1'
                        });
                })
                .eq(_.currentSlide)
                .find('button')
                .attr({
                    'aria-selected': 'true',
                    tabindex: '0'
                })
                .end();
        }

        for (var i = _.currentSlide, max = i + _.options.slidesToShow; i < max; i++) {
            if (_.options.focusOnChange) {
                thisSlides.eq(i).attr({ tabindex: '0' });
            } else {
                thisSlides.eq(i).removeAttr('tabindex');
            }
        }

        _.activateADA();
    };

    // --------------------------
    // Complete
    // --------------------------
    Slick.prototype.initArrowEvents = function () {
        var _ = this;

        if (_.options.arrows === true && _.slideCount > _.options.slidesToShow) {
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

            /*_.$prevArrow.off('click.slick').on(
                'click.slick',
                {
                    message: 'previous'
                },
                _.changeSlide
            );*/
            _.$prevArrow.removeEventListener('click', arrowClickPrev);
            _.$prevArrow.addEventListener('click', arrowClickPrev);

            /*_.$nextArrow.off('click.slick').on(
                'click.slick',
                {
                    message: 'next'
                },
                _.changeSlide
            );*/

            _.$nextArrow.removeEventListener('click', arrowClickNext);
            _.$nextArrow.addEventListener('click', arrowClickNext);

            if (_.options.accessibility === true) {
                //_.$prevArrow.on('keydown.slick', _.keyHandler);
                //_.$nextArrow.on('keydown.slick', _.keyHandler);
            }
        }
    };

    // --------------------------
    // Complete
    // --------------------------
    Slick.prototype.initDotEvents = function () {
        var _ = this;
        //const thisDots = $(_.$dots);

        if (_.options.dots === true && _.slideCount > _.options.slidesToShow) {
            /*$('li', thisDots).on(
                'click.slick',
                {
                    message: 'index'
                },
                _.changeSlide
            );*/

            _.queryAll('li', _.$dots).forEach(function (elem) {
                elem.addEventListener('click', function (event) {
                    event.data = { message: 'index' };
                    _.changeSlide(event);
                });
            });

            if (_.options.accessibility === true) {
                //thisDots.on('keydown.slick', _.keyHandler);
                _.$dots.addEventListener('keydown', _.keyHandler);
            }
        }

        if (_.options.dots === true && _.options.pauseOnDotsHover === true && _.slideCount > _.options.slidesToShow) {
            /*$('li', thisDots)
                .on('mouseenter.slick', $.proxy(_.interrupt, _, true))
                .on('mouseleave.slick', $.proxy(_.interrupt, _, false));*/

            _.queryAll('li', _.$dots).forEach(function (elem) {
                elem.addEventListener('mouseenter', _.interrupt.bind(_), true);
                elem.addEventListener('mouseleave', _.interrupt.bind(_), false);
            });
        }
    };

    // --------------------------
    // Complete
    // --------------------------
    Slick.prototype.initSlideEvents = function () {
        var _ = this;
        //const thisList = $(_.$list);

        if (_.options.pauseOnHover) {
            //thisList.on('mouseenter.slick', $.proxy(_.interrupt, _, true));
            //thisList.on('mouseleave.slick', $.proxy(_.interrupt, _, false));

            _.$list.addEventListener('mouseenter', _.interrupt.bind(_), true);
            _.$list.addEventListener('mouseleave', _.interrupt.bind(_), false);
        }
    };

    // --------------------------
    // Complete
    // --------------------------
    Slick.prototype.isMatches = function (el, selector) {
        return (
            el.matches ||
            el.matchesSelector ||
            el.msMatchesSelector ||
            el.mozMatchesSelector ||
            el.webkitMatchesSelector ||
            el.oMatchesSelector
        ).call(el, selector);
    };

    /*
    NEEDS TO BE FINISHED OFF
    */
    Slick.prototype.initializeEvents = function () {
        var _ = this;
        const thisList = $(_.$list);

        _.initArrowEvents();

        _.initDotEvents();
        _.initSlideEvents();

        /*thisList.on(
            'touchstart.slick mousedown.slick',
            {
                action: 'start'
            },
            _.swipeHandler
        );*/
        _.$list.addEventListener('touchstart', _.startSwipeHandler);
        _.$list.addEventListener('mousedown', _.startSwipeHandler);

        /*thisList.on(
            'touchmove.slick mousemove.slick',
            {
                action: 'move'
            },
            _.swipeHandler
        );*/
        _.$list.addEventListener('touchmove', _.moveSwipeHandler);
        _.$list.addEventListener('mousemove', _.moveSwipeHandler);

        /*thisList.on(
            'touchend.slick mouseup.slick',
            {
                action: 'end'
            },
            _.swipeHandler
        );*/
        _.$list.addEventListener('touchend', _.endSwipeHandler);
        _.$list.addEventListener('mouseup', _.endSwipeHandler);

        /*thisList.on(
            'touchcancel.slick mouseleave.slick',
            {
                action: 'end'
            },
            _.swipeHandler
        );*/
        _.$list.addEventListener('touchcancel', _.endSwipeHandler);
        _.$list.addEventListener('mouseleave', _.endSwipeHandler);

        //thisList.on('click.slick', _.clickHandler);
        _.$list.addEventListener('click', _.clickHandler);

        //$(document).on(_.visibilityChange, _.visibility.bind(_));
        document.addEventListener(_.visibilityChange, _.visibility.bind(_));

        if (_.options.accessibility === true) {
            //thisList.on('keydown.slick', _.keyHandler);
            _.$list.addEventListener('keydown', _.keyHandler);
        }

        if (_.options.focusOnSelect === true) {
            //$(_.$slideTrack).children().on('click.slick', _.selectHandler);
            for (let item of Array.from(_.$slideTrack.children)) {
                item.addEventListener('click', _.selectHandler);
            }
        }

        //leaving this out for now
        //$(window).on('orientationchange.slick.slick-' + _.instanceUid, $.proxy(_.orientationChange, _));

        //$(window).on('resize.slick.slick-' + _.instanceUid, $.proxy(_.resize, _));
        window.addEventListener('resize', _.resize.bind(_));

        //TODO: find a way to do this using vanilla js
        //$('[draggable!=true]', _.$slideTrack).on('dragstart', _.preventDefault);

        //$(window).on('load.slick.slick-' + _.instanceUid, _.setPosition);
        window.addEventListener('load', _.setPosition);

        //$(_.setPosition);
    };

    Slick.prototype.onHandler = function (eventName, elementSelector, handler) {
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
    };

    // --------------------------
    // Complete
    // --------------------------
    Slick.prototype.initUI = function () {
        var _ = this;

        if (_.options.arrows === true && _.slideCount > _.options.slidesToShow) {
            //_.$prevArrow.show();
            //_.$nextArrow.show();
            _.$prevArrow.style.display = '';
            _.$nextArrow.style.display = '';
        }

        if (_.options.dots === true && _.slideCount > _.options.slidesToShow) {
            //$(_.$dots).show();
            _.$dots.style.display = '';
        }
    };

    // --------------------------
    // Complete
    // --------------------------
    Slick.prototype.keyHandler = function (event) {
        var _ = this;
        //Dont slide if the cursor is inside the form fields and arrow keys are pressed
        if (!event.target.tagName.match('TEXTAREA|INPUT|SELECT')) {
            if (event.keyCode === 37 && _.options.accessibility === true) {
                _.changeSlide({
                    data: {
                        message: _.options.rtl === true ? 'next' : 'previous'
                    }
                });
            } else if (event.keyCode === 39 && _.options.accessibility === true) {
                _.changeSlide({
                    data: {
                        message: _.options.rtl === true ? 'previous' : 'next'
                    }
                });
            }
        }
    };

    // --------------------------
    // Complete
    // - not using lazy load
    // --------------------------
    Slick.prototype.lazyLoad = function () {
        var _ = this,
            loadRange,
            cloneRange,
            rangeStart,
            rangeEnd;
        const thisSlider = $(_.$slider);

        function loadImages(imagesScope) {
            $('img[data-lazy]', imagesScope).each(function () {
                var image = $(this),
                    imageSource = $(this).attr('data-lazy'),
                    imageSrcSet = $(this).attr('data-srcset'),
                    imageSizes = $(this).attr('data-sizes') || _.$slider.attr('data-sizes'),
                    imageToLoad = document.createElement('img');

                imageToLoad.onload = function () {
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
                        _.$slider.trigger('lazyLoaded', [_, image, imageSource]);
                    });
                };

                imageToLoad.onerror = function () {
                    image.removeAttr('data-lazy').removeClass('slick-loading').addClass('slick-lazyload-error');

                    _.$slider.trigger('lazyLoadError', [_, image, imageSource]);
                };

                imageToLoad.src = imageSource;
            });
        }

        if (_.options.centerMode === true) {
            if (_.options.infinite === true) {
                rangeStart = _.currentSlide + (_.options.slidesToShow / 2 + 1);
                rangeEnd = rangeStart + _.options.slidesToShow + 2;
            } else {
                rangeStart = Math.max(0, _.currentSlide - (_.options.slidesToShow / 2 + 1));
                rangeEnd = 2 + (_.options.slidesToShow / 2 + 1) + _.currentSlide;
            }
        } else {
            rangeStart = _.options.infinite ? _.options.slidesToShow + _.currentSlide : _.currentSlide;
            rangeEnd = Math.ceil(rangeStart + _.options.slidesToShow);
            if (_.options.fade === true) {
                if (rangeStart > 0) rangeStart--;
                if (rangeEnd <= _.slideCount) rangeEnd++;
            }
        }

        loadRange = thisSlider.find('.slick-slide').slice(rangeStart, rangeEnd);

        if (_.options.lazyLoad === 'anticipated') {
            var prevSlide = rangeStart - 1,
                nextSlide = rangeEnd,
                $slides = _.$slider.find('.slick-slide');

            for (var i = 0; i < _.options.slidesToScroll; i++) {
                if (prevSlide < 0) prevSlide = _.slideCount - 1;
                loadRange = loadRange.add($slides.eq(prevSlide));
                loadRange = loadRange.add($slides.eq(nextSlide));
                prevSlide--;
                nextSlide++;
            }
        }

        loadImages(loadRange);

        if (_.slideCount <= _.options.slidesToShow) {
            cloneRange = thisSlider.find('.slick-slide');
            loadImages(cloneRange);
        } else if (_.currentSlide >= _.slideCount - _.options.slidesToShow) {
            cloneRange = thisSlider.find('.slick-cloned').slice(0, _.options.slidesToShow);
            loadImages(cloneRange);
        } else if (_.currentSlide === 0) {
            cloneRange = thisSlider.find('.slick-cloned').slice(_.options.slidesToShow * -1);
            loadImages(cloneRange);
        }
    };

    // --------------------------
    // Complete
    // --------------------------
    Slick.prototype.loadSlider = function () {
        var _ = this;

        _.setPosition();

        /*_.$slideTrack.css({
            opacity: 1
        });*/
        _.$slideTrack.style.opacity = 1;

        //$(_.$slider).removeClass('slick-loading');
        _.$slider.classList.remove('slick-loading');

        _.initUI();

        if (_.options.lazyLoad === 'progressive') {
            _.progressiveLazyLoad();
        }
    };

    // --------------------------
    // Complete
    // --------------------------
    Slick.prototype.next = Slick.prototype.slickNext = function () {
        var _ = this;

        _.changeSlide({
            data: {
                message: 'next'
            }
        });
    };

    // --------------------------
    // Complete
    // --------------------------
    Slick.prototype.orientationChange = function () {
        var _ = this;

        _.checkResponsive();
        _.setPosition();
    };

    // --------------------------
    // Complete
    // --------------------------
    Slick.prototype.pause = Slick.prototype.slickPause = function () {
        var _ = this;

        _.autoPlayClear();
        _.paused = true;
    };

    // --------------------------
    // Complete
    // --------------------------
    Slick.prototype.play = Slick.prototype.slickPlay = function () {
        var _ = this;

        _.autoPlay();
        _.options.autoplay = true;
        _.paused = false;
        _.focussed = false;
        _.interrupted = false;
    };

    Slick.prototype.postSlide = function (index) {
        var _ = this;

        if (!_.unslicked) {
            //$(_.$slider).trigger('afterChange', [_, index]);
            const event = _.createTrigger('afterChange', [_, index]);
            _.$slider.dispatchEvent(event);

            _.animating = false;

            if (_.slideCount > _.options.slidesToShow) {
                _.setPosition();
            }

            _.swipeLeft = null;

            if (_.options.autoplay) {
                _.autoPlay();
            }

            if (_.options.accessibility === true) {
                _.initADA();

                if (_.options.focusOnChange) {
                    var $currentSlide = $(_.$slides.get(_.currentSlide));
                    $currentSlide.attr('tabindex', 0).focus();
                }
            }
        }
    };

    // --------------------------
    // Complete
    // --------------------------
    Slick.prototype.prev = Slick.prototype.slickPrev = function () {
        var _ = this;

        _.changeSlide({
            data: {
                message: 'previous'
            }
        });
    };

    // --------------------------
    // Complete
    // --------------------------
    Slick.prototype.preventDefault = function (event) {
        event.preventDefault();
    };

    // --------------------------
    // Complete
    // --- not using this
    // --------------------------
    Slick.prototype.progressiveLazyLoad = function (tryCount) {
        tryCount = tryCount || 1;

        var _ = this,
            $imgsToLoad = $('img[data-lazy]', _.$slider),
            image,
            imageSource,
            imageSrcSet,
            imageSizes,
            imageToLoad;

        if ($imgsToLoad.length) {
            image = $imgsToLoad.first();
            imageSource = image.attr('data-lazy');
            imageSrcSet = image.attr('data-srcset');
            imageSizes = image.attr('data-sizes') || _.$slider.attr('data-sizes');
            imageToLoad = document.createElement('img');

            imageToLoad.onload = function () {
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

                if (_.options.adaptiveHeight === true) {
                    _.setPosition();
                }

                _.$slider.trigger('lazyLoaded', [_, image, imageSource]);
                _.progressiveLazyLoad();
            };

            imageToLoad.onerror = function () {
                if (tryCount < 3) {
                    /**
                     * try to load the image 3 times,
                     * leave a slight delay so we don't get
                     * servers blocking the request.
                     */
                    setTimeout(function () {
                        _.progressiveLazyLoad(tryCount + 1);
                    }, 500);
                } else {
                    image.removeAttr('data-lazy').removeClass('slick-loading').addClass('slick-lazyload-error');

                    _.$slider.trigger('lazyLoadError', [_, image, imageSource]);

                    _.progressiveLazyLoad();
                }
            };

            imageToLoad.src = imageSource;
        } else {
            _.$slider.trigger('allImagesLoaded', [_]);
        }
    };

    // ----------------------
    // Complete
    // ---------------------
    Slick.prototype.refresh = function (initializing) {
        var _ = this,
            currentSlide,
            lastVisibleIndex;

        lastVisibleIndex = _.slideCount - _.options.slidesToShow;

        // in non-infinite sliders, we don't want to go past the
        // last visible index.
        if (!_.options.infinite && _.currentSlide > lastVisibleIndex) {
            _.currentSlide = lastVisibleIndex;
        }

        // if less slides than to show, go to start.
        if (_.slideCount <= _.options.slidesToShow) {
            _.currentSlide = 0;
        }

        currentSlide = _.currentSlide;

        _.destroy(true);

        //$.extend(_, _.initials, { currentSlide: currentSlide });
        _.extendAll(_, _.initials, { currentSlide: currentSlide });

        _.init();

        if (!initializing) {
            _.changeSlide(
                {
                    data: {
                        message: 'index',
                        index: currentSlide
                    }
                },
                false
            );
        }
    };

    // --------------------------
    // Complete
    // --------------------------
    Slick.prototype.registerBreakpoints = function () {
        var _ = this,
            breakpoint,
            currentBreakpoint,
            l,
            responsiveSettings = _.options.responsive || null;

        if ($.type(responsiveSettings) === 'array' && responsiveSettings.length) {
            _.respondTo = _.options.respondTo || 'window';

            for (breakpoint in responsiveSettings) {
                l = _.breakpoints.length - 1;

                if (responsiveSettings.hasOwnProperty(breakpoint)) {
                    currentBreakpoint = responsiveSettings[breakpoint].breakpoint;

                    // loop through the breakpoints and cut out any existing
                    // ones with the same breakpoint number, we don't want dupes.
                    while (l >= 0) {
                        if (_.breakpoints[l] && _.breakpoints[l] === currentBreakpoint) {
                            _.breakpoints.splice(l, 1);
                        }
                        l--;
                    }

                    _.breakpoints.push(currentBreakpoint);
                    _.breakpointSettings[currentBreakpoint] = responsiveSettings[breakpoint].settings;
                }
            }

            _.breakpoints.sort(function (a, b) {
                return _.options.mobileFirst ? a - b : b - a;
            });
        }
    };

    // --------------------------
    // Complete
    // --------------------------
    Slick.prototype.reinit = function () {
        var _ = this;

        /*_.$slides =
            thisSlideTrack
                .children(_.options.slide)
                .addClass('slick-slide');*/
        _.$slides = _.$slideTrack.children;
        for (let item of _.$slides) {
            item.classList.add('slick-slide');
        }

        _.slideCount = _.$slides.length;

        if (_.currentSlide >= _.slideCount && _.currentSlide !== 0) {
            _.currentSlide = _.currentSlide - _.options.slidesToScroll;
        }

        if (_.slideCount <= _.options.slidesToShow) {
            _.currentSlide = 0;
        }

        //_.registerBreakpoints();

        _.setProps();
        _.setupInfinite();
        _.buildArrows();
        _.updateArrows();
        _.initArrowEvents();
        _.buildDots();
        _.updateDots();
        _.initDotEvents();
        _.cleanUpSlideEvents();
        _.initSlideEvents();

        _.checkResponsive(false, true);

        if (_.options.focusOnSelect === true) {
            // Not using this yet
            $(thisSlideTrack).children().on('click.slick', _.selectHandler);
        }

        _.setSlideClasses(typeof _.currentSlide === 'number' ? _.currentSlide : 0);

        _.setPosition();
        _.focusHandler();

        _.paused = !_.options.autoplay;
        _.autoPlay();

        //$(_.$slider).trigger('reInit', [_]);
        const event = _.createTrigger('reInit', [_]);
        _.$slider.dispatchEvent(event);
    };

    // ------------------------
    // Complete
    // ------------------------
    Slick.prototype.resize = function () {
        var _ = this;

        if ($(window).width() !== _.windowWidth) {
            clearTimeout(_.windowDelay);
            _.windowDelay = window.setTimeout(function () {
                _.windowWidth = $(window).width();
                _.checkResponsive();
                if (!_.unslicked) {
                    _.setPosition();
                }
            }, 50);
        }
    };

    // --------------------------
    // Complete
    // --------------------------
    Slick.prototype.removeSlide = function (index, removeBefore, removeAll) {
        var _ = this;
        //const thisSlideTrack = $(_.$slideTrack);

        if (typeof index === 'boolean') {
            removeBefore = index;
            index = removeBefore === true ? 0 : _.slideCount - 1;
        } else {
            index = removeBefore === true ? --index : index;
        }

        if (_.slideCount < 1 || index < 0 || index > _.slideCount - 1) {
            return false;
        }

        _.unload();

        if (removeAll === true) {
            //thisSlideTrack.children().remove();
            for (let item of Array.from(_.$slideTrack.children)) {
                item.parentNode.removeChild(item);
            }
        } else {
            //thisSlideTrack.children(this.options.slide).eq(index).remove();
            const toRemove = _.$slideTrack.children[index];
            toRemove.parentNode.removeChild(toRemove);
        }

        //_.$slides = thisSlideTrack.children(this.options.slide);        /
        _.$slides = Array.from(_.$slideTrack.children);

        //const makker = thisSlideTrack.children(this.options.slide);
        //thisSlideTrack.children(this.options.slide).detach();
        for (let item of Array.from(_.$slideTrack.children)) {
            item.parentNode.removeChild(item);
        }

        //thisSlideTrack.append(_.$slides);
        for (let item of _.$slides) {
            _.$slideTrack.appendChild(item);
        }

        _.$slidesCache = _.$slides;

        _.reinit();
    };

    // --------------------------
    // Complete
    // --------------------------
    Slick.prototype.setCSS = function (position) {
        var _ = this,
            positionProps = {},
            x,
            y;

        if (_.options.rtl === true) {
            position = -position;
        }
        x = _.positionProp === 'left' ? Math.ceil(position) + 'px' : '0px';
        y = _.positionProp === 'top' ? Math.ceil(position) + 'px' : '0px';

        positionProps[_.animType] = 'translate3d(' + x + ', ' + y + ', 0px)';
        //_.$slideTrack.css(positionProps);
        _.cssAppender(_.$slideTrack, positionProps);
    };

    //------------------
    // Complete
    // ----------------
    Slick.prototype.setDimensions = function () {
        var _ = this;
        //const thisSlides = $(_.$slides);
        //const thisSideTrack = $(_.$slideTrack);
        //const thisList = $(_.$list);

        if (_.options.vertical === false) {
            if (_.options.centerMode === true) {
                /*thisList.css({
                    padding: ('0px ' + _.options.centerPadding)
                });*/
                _.cssAppender(_.$list, {
                    padding: '0px ' + _.options.centerPadding
                });
            }
        } else {
            //thisList.height(thisSlides.first().outerHeight(true) * _.options.slidesToShow);
            const outerHeight = _.get_OuterHeight(_.$slides[0], true) * _.options.slidesToShow;
            _.set_Height(_.$list, outerHeight);
            //thisList.height(outerHeight);

            if (_.options.centerMode === true) {
                /*thisList.css({
                    padding: (_.options.centerPadding + ' 0px')
                });*/
                _.cssAppender(_.$list, {
                    padding: _.options.centerPadding + ' 0px'
                });
            }
        }

        //let check = $(_.$list).width();

        if (_.options.centerMode === true) {
            _.listWidth = _.get_Width(_.$list, true);
        } else {
            _.listWidth = _.get_Width(_.$list);
        }

        //_.listHeight = thisList.height();
        _.listHeight = _.get_Height(_.$list);

        if (_.options.vertical === false && _.options.variableWidth === false) {
            if (!_.options.slideWidth) {
                _.slideWidth = Math.ceil(_.listWidth / _.options.slidesToShow);
            } else {
                _.slideWidth = _.options.slideWidth;
            }

            //const slickSlideChildren = thisSideTrack.children('.slick-slide');
            const width = Math.ceil(_.slideWidth * _.$slideTrack.children.length);

            //thisSideTrack.width(width);
            _.set_Width(_.$slideTrack, width);
        } else if (_.options.variableWidth === true) {
            //thisSideTrack.width(5000 * _.slideCount);
            _.set_Width(_.$slideTrack, 5000 * _.slideCount);
        } else {
            _.slideWidth = Math.ceil(_.listWidth);

            //const slickSlideChildren = thisSideTrack.children('.slick-slide');
            const calc = Math.ceil(_.get_OuterHeight(_.$slides[0], true) * _.$slideTrack.children.length);
            _.set_Height(_.$slideTrack, calc);
            //thisSideTrack.height(Math.ceil((thisSlides.first().outerHeight(true) * thisSideTrack.children('.slick-slide').length)));
        }

        const offset = _.get_OuterWidth(_.$slides[0], true) - _.get_OuterWidth(_.$slides[0]);

        if (_.options.variableWidth === false) {
            //const slickSlideChildren = thisSideTrack.children('.slick-slide');
            //slickSlideChildren.width(_.slideWidth - offset);
            for (let el of _.$slideTrack.children) {
                _.set_Width(el, _.slideWidth - offset);
            }
        }
    };

    // --------------------------
    // Complete
    // --------------------------
    Slick.prototype.get_OuterHeight = function (el, withMargin) {
        if (withMargin) {
            var height = el.offsetHeight;
            var style = getComputedStyle(el);

            height += parseInt(style.marginTop) + parseInt(style.marginBottom);
            return height;
        } else {
            let num = el.offsetHeight;
            if (num) {
                return num;
            }

            return 0;
        }
    };

    // --------------------------
    // Complete
    // --------------------------
    Slick.prototype.get_OuterWidth = function (el, withMargin) {
        if (withMargin) {
            var width = el.offsetWidth;
            var style = getComputedStyle(el);

            width += parseInt(style.marginLeft) + parseInt(style.marginRight);
            return width;
        } else {
            let num = el.offsetWidth;
            if (num) {
                return num;
            }

            return 0;
        }
    };

    //-----------------------------------
    // Complete
    //-----------------------------------
    Slick.prototype.get_Width = function (el, removePadding) {
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
    };

    //-----------------------------------
    // Complete
    //-----------------------------------
    Slick.prototype.get_Height = function (el) {
        let num = parseFloat(getComputedStyle(el, null).height.replace('px', ''));
        if (num) {
            return num;
        }

        return 0;
    };

    //-----------------------------------
    // Complete
    //-----------------------------------
    Slick.prototype.set_Height = function (el, val) {
        if (typeof val === 'function') val = val();
        if (typeof val === 'string') el.style.height = val;
        else el.style.height = val + 'px';
    };

    //-----------------------------------
    // Complete
    //-----------------------------------
    Slick.prototype.set_Width = function (el, val) {
        if (typeof val === 'function') val = val();
        if (typeof val === 'string') el.style.width = val;
        else el.style.width = val + 'px';
    };

    //-----------------------------------
    // Complete
    // ----- Not using "setFade"
    //-----------------------------------
    Slick.prototype.setFade = function () {
        var _ = this,
            targetLeft;

        _.$slides.each(function (index, element) {
            targetLeft = _.slideWidth * index * -1;
            if (_.options.rtl === true) {
                $(element).css({
                    position: 'relative',
                    right: targetLeft,
                    top: 0,
                    zIndex: _.options.zIndex - 2,
                    opacity: 0
                });
            } else {
                $(element).css({
                    position: 'relative',
                    left: targetLeft,
                    top: 0,
                    zIndex: _.options.zIndex - 2,
                    opacity: 0
                });
            }
        });

        _.$slides.eq(_.currentSlide).css({
            zIndex: _.options.zIndex - 1,
            opacity: 1
        });
    };

    //-----------------------------------
    // Complete
    // ---- Not using "adaptiveHeight" yet
    //-----------------------------------
    Slick.prototype.setListHeight = function () {
        var _ = this;

        if (_.options.slidesToShow === 1 && _.options.adaptiveHeight === true && _.options.vertical === false) {
            var targetHeight = _.$slides.eq(_.currentSlide).outerHeight(true);
            //_.$list.css('height', targetHeight);
            _.$list.style.height = targetHeight;
        }
    };

    // --------------------------
    // Complete
    // --------------------------
    Slick.prototype.setOption = Slick.prototype.slickSetOption = function () {
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
            _.options[option] = value;
        } else if (type === 'multiple') {
            $.each(option, function (opt, val) {
                _.options[opt] = val;
            });
        } else if (type === 'responsive') {
            for (let item in value) {
                if ($.type(_.options.responsive) !== 'array') {
                    _.options.responsive = [value[item]];
                } else {
                    l = _.options.responsive.length - 1;

                    // loop through the responsive object and splice out duplicates.
                    while (l >= 0) {
                        if (_.options.responsive[l].breakpoint === value[item].breakpoint) {
                            _.options.responsive.splice(l, 1);
                        }

                        l--;
                    }

                    _.options.responsive.push(value[item]);
                }
            }
        }

        if (refresh) {
            _.unload();
            _.reinit();
        }
    };

    // ------------------------
    // Complete
    // ------------------------
    Slick.prototype.setPosition = function () {
        var _ = this;

        _.setDimensions();

        _.setListHeight();

        if (_.options.fade === false) {
            _.setCSS(_.getLeft(_.currentSlide));
        } else {
            _.setFade();
        }

        //dont really want or need this trigger event
        //$(_.$slider).trigger('setPosition', [_]);
        //const event = _.createTrigger('setPosition', [_]);
        //_.$slider.dispatchEvent(event);
    };

    // --------------------------
    // Complete
    // --------------------------
    Slick.prototype.setProps = function () {
        var _ = this,
            bodyStyle = document.body.style;
        //const thisSlider = $(_.$slider);

        _.positionProp = _.options.vertical === true ? 'top' : 'left';

        if (_.positionProp === 'top') {
            //thisSlider.addClass('slick-vertical');
            _.$slider.classList.add('slick-vertical');
        } else {
            //thisSlider.removeClass('slick-vertical');
            _.$slider.classList.remove('slick-vertical');
        }

        if (
            bodyStyle.WebkitTransition !== undefined ||
            bodyStyle.MozTransition !== undefined ||
            bodyStyle.msTransition !== undefined
        ) {
            if (_.options.useCSS === true) {
                _.cssTransitions = true;
            }
        }

        if (_.options.fade) {
            if (typeof _.options.zIndex === 'number') {
                if (_.options.zIndex < 3) {
                    _.options.zIndex = 3;
                }
            } else {
                _.options.zIndex = _.defaults.zIndex;
            }
        }

        if (bodyStyle.OTransform !== undefined) {
            _.animType = 'OTransform';
            _.transformType = '-o-transform';
            _.transitionType = 'OTransition';
            if (bodyStyle.perspectiveProperty === undefined && bodyStyle.webkitPerspective === undefined)
                _.animType = false;
        }
        if (bodyStyle.MozTransform !== undefined) {
            _.animType = 'MozTransform';
            _.transformType = '-moz-transform';
            _.transitionType = 'MozTransition';
            if (bodyStyle.perspectiveProperty === undefined && bodyStyle.MozPerspective === undefined)
                _.animType = false;
        }
        if (bodyStyle.webkitTransform !== undefined) {
            _.animType = 'webkitTransform';
            _.transformType = '-webkit-transform';
            _.transitionType = 'webkitTransition';
            if (bodyStyle.perspectiveProperty === undefined && bodyStyle.webkitPerspective === undefined)
                _.animType = false;
        }
        if (bodyStyle.msTransform !== undefined) {
            _.animType = 'msTransform';
            _.transformType = '-ms-transform';
            _.transitionType = 'msTransition';
            if (bodyStyle.msTransform === undefined) _.animType = false;
        }
        if (bodyStyle.transform !== undefined && _.animType !== false) {
            _.animType = 'transform';
            _.transformType = 'transform';
            _.transitionType = 'transition';
        }
        _.transformsEnabled = _.options.useTransform && _.animType !== null && _.animType !== false;
    };

    // ------------------
    // Complete
    // ------------------
    Slick.prototype.setSlideClasses = function (index) {
        var _ = this,
            centerOffset,
            allSlides,
            indexOffset,
            remainder;

        /*allSlides = $(_.$slider)
            .find('.slick-slide')
            .removeClass('slick-active slick-center slick-current')
            .attr('aria-hidden', 'true');*/
        allSlides = Array.from(_.$slider.querySelectorAll('.slick-slide'));
        for (let item of allSlides) {
            item.classList.remove('slick-active');
            item.classList.remove('slick-center');
            item.classList.remove('slick-current');

            item.setAttribute('aria-hidden', 'true');
        }

        /*thisSlides
            .eq(index)
            .addClass('slick-current');*/
        if (_.$slides[index]) {
            _.$slides[index].classList.add('slick-current');
        }

        if (_.options.centerMode === true) {
            var evenCoef = _.options.slidesToShow % 2 === 0 ? 1 : 0;

            centerOffset = Math.floor(_.options.slidesToShow / 2);

            if (_.options.infinite === true) {
                if (index >= centerOffset && index <= _.slideCount - 1 - centerOffset) {
                    /*thisSlides
                        .slice(index - centerOffset + evenCoef, index + centerOffset + 1)
                        .addClass('slick-active')
                        .attr('aria-hidden', 'false');*/
                    const ss = Array.from(_.$slides).slice(index - centerOffset + evenCoef, index + centerOffset + 1);
                    for (let item of ss) {
                        item.classList.add('slick-active');
                        item.setAttribute('aria-hidden', 'false');
                    }
                } else {
                    indexOffset = _.options.slidesToShow + index;
                    allSlides
                        .slice(indexOffset - centerOffset + 1 + evenCoef, indexOffset + centerOffset + 2)
                        .addClass('slick-active')
                        .attr('aria-hidden', 'false');
                }

                if (index === 0) {
                    /*allSlides
                        .eq(_.options.slidesToShow + _.slideCount + 1)
                        .addClass('slick-center');*/
                    allSlides[_.options.slidesToShow + _.slideCount + 1].classList.add('slick-center');
                } else if (index === _.slideCount - 1) {
                    /* allSlides
                         .eq(_.options.slidesToShow)
                         .addClass('slick-center');*/
                    allSlides[_.options.slidesToShow].classList.add('slick-center');
                }
            }

            /*thisSlides
                .eq(index)
                .addClass('slick-center');*/
            if (_.$slides[index]) {
                _.$slides[index].classList.add('slick-center');
            }
        } else {
            if (index >= 0 && index <= _.slideCount - _.options.slidesToShow) {
                /*thisSlides
                    .slice(index, index + _.options.slidesToShow)
                    .addClass('slick-active')
                    .attr('aria-hidden', 'false');*/

                // probably need to loop through the array here..??
                const ss = Array.from(_.$slides).slice(index, index + _.options.slidesToShow);
                for (let item of ss) {
                    item.classList.add('slick-active');
                    item.setAttribute('aria-hidden', 'false');
                }
            } else if (allSlides.length <= _.options.slidesToShow) {
                /*allSlides
                    .addClass('slick-active')
                    .attr('aria-hidden', 'false');*/
                for (let item of allSlides) {
                    item.classList.add('slick-active');
                    item.setAttribute('aria-hidden', 'false');
                }
            } else {
                remainder = _.slideCount % _.options.slidesToShow;
                indexOffset = _.options.infinite === true ? _.options.slidesToShow + index : index;

                if (
                    _.options.slidesToShow == _.options.slidesToScroll &&
                    _.slideCount - index < _.options.slidesToShow
                ) {
                    /*allSlides
                        .slice(indexOffset - (_.options.slidesToShow - remainder), indexOffset + remainder)
                        .addClass('slick-active')
                        .attr('aria-hidden', 'false');*/

                    const slicer = allSlides.slice(
                        indexOffset - (_.options.slidesToShow - remainder),
                        indexOffset + remainder
                    );
                    for (let item of slicer) {
                        item.classList.add('slick-active');
                        item.setAttribute('aria-hidden', 'false');
                    }
                } else {
                    /*allSlides
                        .slice(indexOffset, indexOffset + _.options.slidesToShow)
                        .addClass('slick-active')
                        .attr('aria-hidden', 'false');*/

                    const slicer = allSlides.slice(indexOffset, indexOffset + _.options.slidesToShow);
                    for (let item of slicer) {
                        item.classList.add('slick-active');
                        item.setAttribute('aria-hidden', 'false');
                    }
                }
            }
        }

        if (_.options.lazyLoad === 'ondemand' || _.options.lazyLoad === 'anticipated') {
            _.lazyLoad();
        }
    };

    // ----------------
    // Leave for now
    // - dont need infinite yet
    // ----------------
    Slick.prototype.setupInfinite = function () {
        var _ = this,
            i,
            slideIndex,
            infiniteCount;

        if (_.options.fade === true) {
            _.options.centerMode = false;
        }

        if (_.options.infinite === true && _.options.fade === false) {
            slideIndex = null;

            if (_.slideCount > _.options.slidesToShow) {
                if (_.options.centerMode === true) {
                    infiniteCount = _.options.slidesToShow + 1;
                } else {
                    infiniteCount = _.options.slidesToShow;
                }

                for (i = _.slideCount; i > _.slideCount - infiniteCount; i -= 1) {
                    slideIndex = i - 1;
                    $(_.$slides[slideIndex])
                        .clone(true)
                        .attr('id', '')
                        .attr('data-slick-index', slideIndex - _.slideCount)
                        .prependTo(_.$slideTrack)
                        .addClass('slick-cloned');
                }
                for (i = 0; i < infiniteCount + _.slideCount; i += 1) {
                    slideIndex = i;
                    $(_.$slides[slideIndex])
                        .clone(true)
                        .attr('id', '')
                        .attr('data-slick-index', slideIndex + _.slideCount)
                        .appendTo(_.$slideTrack)
                        .addClass('slick-cloned');
                }
                _.$slideTrack
                    .find('.slick-cloned')
                    .find('[id]')
                    .each(function () {
                        $(this).attr('id', '');
                    });
            }
        }
    };

    // ------------------------
    // Complete
    // ------------------------
    Slick.prototype.interrupt = function (toggle) {
        var _ = this;

        if (!toggle) {
            _.autoPlay();
        }
        _.interrupted = toggle;
    };

    Slick.prototype.selectHandler = function (event) {
        var _ = this;

        var targetElement = $(event.target).is('.slick-slide')
            ? $(event.target)
            : $(event.target).parents('.slick-slide');

        var index = parseInt(targetElement.attr('data-slick-index'));

        if (!index) index = 0;

        if (_.slideCount <= _.options.slidesToShow) {
            _.slideHandler(index, false, true);
            return;
        }

        _.slideHandler(index);
    };

    // ---------------------------
    // Complete
    // -- not using "asNavFor"
    // ---------------------------
    Slick.prototype.slideHandler = function (index, sync, dontAnimate) {
        var targetSlide,
            animSlide,
            oldSlide,
            slideLeft,
            targetLeft = null,
            _ = this,
            navTarget;

        sync = sync || false;

        if (_.animating === true && _.options.waitForAnimate === true) {
            return;
        }

        if (_.options.fade === true && _.currentSlide === index) {
            return;
        }

        if (sync === false) {
            _.asNavFor(index);
        }

        targetSlide = index;
        targetLeft = _.getLeft(targetSlide);
        slideLeft = _.getLeft(_.currentSlide);

        _.currentLeft = _.swipeLeft === null ? slideLeft : _.swipeLeft;

        if (
            _.options.infinite === false &&
            _.options.centerMode === false &&
            (index < 0 || index > _.getDotCount() * _.options.slidesToScroll)
        ) {
            if (_.options.fade === false) {
                targetSlide = _.currentSlide;
                if (dontAnimate !== true && _.slideCount > _.options.slidesToShow) {
                    _.animateSlide(slideLeft, function () {
                        _.postSlide(targetSlide);
                    });
                } else {
                    _.postSlide(targetSlide);
                }
            }
            return;
        } else if (
            _.options.infinite === false &&
            _.options.centerMode === true &&
            (index < 0 || index > _.slideCount - _.options.slidesToScroll)
        ) {
            if (_.options.fade === false) {
                targetSlide = _.currentSlide;
                if (dontAnimate !== true && _.slideCount > _.options.slidesToShow) {
                    _.animateSlide(slideLeft, function () {
                        _.postSlide(targetSlide);
                    });
                } else {
                    _.postSlide(targetSlide);
                }
            }
            return;
        }

        if (_.options.autoplay) {
            clearInterval(_.autoPlayTimer);
        }

        if (targetSlide < 0) {
            if (_.slideCount % _.options.slidesToScroll !== 0) {
                animSlide = _.slideCount - (_.slideCount % _.options.slidesToScroll);
            } else {
                animSlide = _.slideCount + targetSlide;
            }
        } else if (targetSlide >= _.slideCount) {
            if (_.slideCount % _.options.slidesToScroll !== 0) {
                animSlide = 0;
            } else {
                animSlide = targetSlide - _.slideCount;
            }
        } else {
            animSlide = targetSlide;
        }

        _.animating = true;

        //$(_.$slider).trigger('beforeChange', [_, _.currentSlide, animSlide]);
        const event = _.createTrigger('beforeChange', [_, _.currentSlide, animSlide]);
        _.$slider.dispatchEvent(event);

        oldSlide = _.currentSlide;
        _.currentSlide = animSlide;

        _.setSlideClasses(_.currentSlide);

        if (_.options.asNavFor) {
            navTarget = _.getNavTarget();
            navTarget = navTarget.slick('getSlick');

            if (navTarget.slideCount <= navTarget.options.slidesToShow) {
                navTarget.setSlideClasses(_.currentSlide);
            }
        }

        _.updateDots();
        _.updateArrows();

        if (_.options.fade === true) {
            if (dontAnimate !== true) {
                _.fadeSlideOut(oldSlide);

                _.fadeSlide(animSlide, function () {
                    _.postSlide(animSlide);
                });
            } else {
                _.postSlide(animSlide);
            }
            _.animateHeight();
            return;
        }

        if (dontAnimate !== true && _.slideCount > _.options.slidesToShow) {
            _.animateSlide(targetLeft, function () {
                _.postSlide(animSlide);
            });
        } else {
            _.postSlide(animSlide);
        }
    };

    // --------------------------
    // Complete
    // ---------------------------
    Slick.prototype.startLoad = function () {
        var _ = this;

        if (_.options.arrows === true && _.slideCount > _.options.slidesToShow) {
            //_.$prevArrow.hide();
            //_.$nextArrow.hide();

            _.$prevArrow.style.display = 'none';
            _.$nextArrow.style.display = 'none';
        }

        if (_.options.dots === true && _.slideCount > _.options.slidesToShow) {
            //$(_.$dots).hide();
            _.$dots.style.display = 'none';
        }

        //$(_.$slider).addClass('slick-loading');
        _.$slider.classList.add('slick-loading');
    };

    // ------------------------
    // Complete
    // ------------------------
    Slick.prototype.swipeDirection = function () {
        var xDist,
            yDist,
            r,
            swipeAngle,
            _ = this;

        xDist = _.touchObject.startX - _.touchObject.curX;
        yDist = _.touchObject.startY - _.touchObject.curY;
        r = Math.atan2(yDist, xDist);

        swipeAngle = Math.round((r * 180) / Math.PI);
        if (swipeAngle < 0) {
            swipeAngle = 360 - Math.abs(swipeAngle);
        }

        if (swipeAngle <= 45 && swipeAngle >= 0) {
            return _.options.rtl === false ? 'left' : 'right';
        }
        if (swipeAngle <= 360 && swipeAngle >= 315) {
            return _.options.rtl === false ? 'left' : 'right';
        }
        if (swipeAngle >= 135 && swipeAngle <= 225) {
            return _.options.rtl === false ? 'right' : 'left';
        }
        if (_.options.verticalSwiping === true) {
            if (swipeAngle >= 35 && swipeAngle <= 135) {
                return 'down';
            } else {
                return 'up';
            }
        }

        return 'vertical';
    };

    // ------------------------
    // Complete
    // ------------------------
    Slick.prototype.swipeEnd = function (event) {
        var _ = this,
            slideCount,
            direction;
        //const thisSlider = $(_.$slider);

        _.dragging = false;
        _.swiping = false;

        if (_.scrolling) {
            _.scrolling = false;
            return false;
        }

        _.interrupted = false;
        _.shouldClick = _.touchObject.swipeLength > 10 ? false : true;

        if (_.touchObject.curX === undefined) {
            return false;
        }

        if (_.touchObject.edgeHit === true) {
            //thisSlider.trigger('edge', [_, _.swipeDirection()]);
            const event = _.createTrigger('edge', [_, _.swipeDirection()]);
            _.$slider.dispatchEvent(event);
        }

        if (_.touchObject.swipeLength >= _.touchObject.minSwipe) {
            direction = _.swipeDirection();

            switch (direction) {
                case 'left':
                case 'down':
                    slideCount = _.options.swipeToSlide
                        ? _.checkNavigable(_.currentSlide + _.getSlideCount())
                        : _.currentSlide + _.getSlideCount();

                    _.currentDirection = 0;

                    break;

                case 'right':
                case 'up':
                    slideCount = _.options.swipeToSlide
                        ? _.checkNavigable(_.currentSlide - _.getSlideCount())
                        : _.currentSlide - _.getSlideCount();

                    _.currentDirection = 1;

                    break;

                default:
            }

            if (direction !== 'vertical') {
                _.slideHandler(slideCount);
                _.touchObject = {};
                //$(thisSlider).trigger('swipe', [_, direction]);
                const event = _.createTrigger('swipe', [_, direction]);
                _.$slider.dispatchEvent(event);
            }
        } else {
            if (_.touchObject.startX !== _.touchObject.curX) {
                _.slideHandler(_.currentSlide);
                _.touchObject = {};
            }
        }
    };

    // ------------------------
    // Complete
    // ------------------------
    Slick.prototype.createTrigger = function (eventName, data) {
        let event;
        if (window.CustomEvent && typeof window.CustomEvent === 'function') {
            event = new CustomEvent(eventName, { detail: data });
        } else {
            event = document.createEvent('CustomEvent');
            event.initCustomEvent(eventName, true, true, data);
        }

        return event;
    };

    Slick.prototype.startSwipeHandler = function (event) {
        var _ = this;
        event.data = { action: 'start' };
        event.originalEvent = event;
        _.swipeHandler(event);
    };

    Slick.prototype.moveSwipeHandler = function (event) {
        var _ = this;
        event.data = { action: 'move' };
        event.originalEvent = event;
        _.swipeHandler(event);
    };

    Slick.prototype.endSwipeHandler = function (event) {
        var _ = this;
        event.data = { action: 'end' };
        event.originalEvent = event;
        _.swipeHandler(event);
    };

    // ------------------------
    // Complete
    // ------------------------
    Slick.prototype.swipeHandler = function (event) {
        var _ = this;

        if (_.options.swipe === false || ('ontouchend' in document && _.options.swipe === false)) {
            return;
        } else if (_.options.draggable === false && event.type.indexOf('mouse') !== -1) {
            return;
        }

        _.touchObject.fingerCount =
            event.originalEvent && event.originalEvent.touches !== undefined ? event.originalEvent.touches.length : 1;

        _.touchObject.minSwipe = _.listWidth / _.options.touchThreshold;

        if (_.options.verticalSwiping === true) {
            _.touchObject.minSwipe = _.listHeight / _.options.touchThreshold;
        }

        switch (event.data.action) {
            case 'start':
                _.swipeStart(event);
                break;

            case 'move':
                _.swipeMove(event);
                break;

            case 'end':
                _.swipeEnd(event);
                break;
        }
    };

    // ------------------------
    // Complete
    // ------------------------
    Slick.prototype.swipeMove = function (event) {
        var _ = this,
            edgeWasHit = false,
            curLeft,
            swipeDirection,
            swipeLength,
            positionOffset,
            touches,
            verticalSwipeLength;

        touches = event.originalEvent !== undefined ? event.originalEvent.touches : null;

        if (!_.dragging || _.scrolling || (touches && touches.length !== 1)) {
            return false;
        }

        curLeft = _.getLeft(_.currentSlide);

        _.touchObject.curX = touches !== undefined ? touches[0].pageX : event.clientX;
        _.touchObject.curY = touches !== undefined ? touches[0].pageY : event.clientY;

        _.touchObject.swipeLength = Math.round(Math.sqrt(Math.pow(_.touchObject.curX - _.touchObject.startX, 2)));

        verticalSwipeLength = Math.round(Math.sqrt(Math.pow(_.touchObject.curY - _.touchObject.startY, 2)));

        if (!_.options.verticalSwiping && !_.swiping && verticalSwipeLength > 4) {
            _.scrolling = true;
            return false;
        }

        if (_.options.verticalSwiping === true) {
            _.touchObject.swipeLength = verticalSwipeLength;
        }

        swipeDirection = _.swipeDirection();

        if (event.originalEvent !== undefined && _.touchObject.swipeLength > 4) {
            _.swiping = true;
            event.preventDefault();
        }

        positionOffset = (_.options.rtl === false ? 1 : -1) * (_.touchObject.curX > _.touchObject.startX ? 1 : -1);
        if (_.options.verticalSwiping === true) {
            positionOffset = _.touchObject.curY > _.touchObject.startY ? 1 : -1;
        }

        swipeLength = _.touchObject.swipeLength;

        _.touchObject.edgeHit = false;

        if (_.options.infinite === false) {
            if (
                (_.currentSlide === 0 && swipeDirection === 'right') ||
                (_.currentSlide >= _.getDotCount() && swipeDirection === 'left')
            ) {
                swipeLength = _.touchObject.swipeLength * _.options.edgeFriction;
                _.touchObject.edgeHit = true;
            }
        }

        if (_.options.vertical === false) {
            _.swipeLeft = curLeft + swipeLength * positionOffset;
        } else {
            _.swipeLeft = curLeft + swipeLength * (_.$list.height() / _.listWidth) * positionOffset;
        }
        if (_.options.verticalSwiping === true) {
            _.swipeLeft = curLeft + swipeLength * positionOffset;
        }

        if (_.options.fade === true || _.options.touchMove === false) {
            return false;
        }

        if (_.animating === true) {
            _.swipeLeft = null;
            return false;
        }

        _.setCSS(_.swipeLeft);
    };

    // ------------------------
    // Complete
    // ------------------------
    Slick.prototype.swipeStart = function (event) {
        var _ = this,
            touches;

        _.interrupted = true;

        if (_.touchObject.fingerCount !== 1 || _.slideCount <= _.options.slidesToShow) {
            _.touchObject = {};
            return false;
        }

        if (event.originalEvent !== undefined && event.originalEvent.touches !== undefined) {
            touches = event.originalEvent.touches[0];
        }

        _.touchObject.startX = _.touchObject.curX = touches !== undefined ? touches.pageX : event.clientX;
        _.touchObject.startY = _.touchObject.curY = touches !== undefined ? touches.pageY : event.clientY;

        _.dragging = true;
    };

    // ------------------------
    // Complete
    // -- not filtering
    // ------------------------
    Slick.prototype.unfilterSlides = Slick.prototype.slickUnfilter = function () {
        var _ = this;
        const thisSlideTrack = $(_.$slideTrack);

        if (_.$slidesCache !== null) {
            _.unload();

            thisSlideTrack.children(this.options.slide).detach();

            _.$slidesCache.appendTo(thisSlideTrack);

            _.reinit();
        }
    };

    // ------------------------
    // Complete
    // ------------------------
    Slick.prototype.unload = function () {
        var _ = this;

        //$('.slick-cloned', _.$slider).remove();
        _.queryAll('.slick-cloned', _.$slider).forEach(function (elem) {
            _.removeNodeUtil(elem);
        });

        if (_.$dots) {
            //_.$dots.remove();
            _.$dots.parentNode.removeChild(_.$dots);
        }

        if (_.$prevArrow && _.htmlExpr.test(_.options.prevArrow)) {
            //_.$prevArrow.remove();
            _.removeNodeUtil(_.$prevArrow);
        }

        if (_.$nextArrow && _.htmlExpr.test(_.options.nextArrow)) {
            //_.$nextArrow.remove();
            _.removeNodeUtil(_.$nextArrow);
        }

        /*$(_.$slides)
            .removeClass('slick-slide slick-active slick-visible slick-current')
            .attr('aria-hidden', 'true')
            .css('width', '');*/
        for (let item of _.$slides) {
            //_.removeClasses(item, ['slick-slide', 'slick-active', 'slick-visible', 'slick-current']);
            item.classList.remove('slick-slide', 'slick-active', 'slick-visible', 'slick-current');
            item.setAttribute('aria-hidden', 'true');
            item.style.width = '';
        }
    };

    // ------------------------
    // Complete
    // ------------------------
    Slick.prototype.removeNodeUtil = function (el) {
        var nodeRemoved = el;
        if (el.parentNode) {
            //Prevent error if node is all ready disconnected from the dom.
            nodeRemoved = el.parentNode.removeChild(el);
        }
        return nodeRemoved;
    };

    // ------------------------
    // Complete
    // ------------------------
    Slick.prototype.queryAll = function (expr, container) {
        return Array.prototype.slice.call(container.querySelectorAll(expr));
    };

    // ------------------------
    // Complete
    // ------------------------
    Slick.prototype.unslick = function (fromBreakpoint) {
        var _ = this;
        //_.$slider.trigger('unslick', [_, fromBreakpoint]);
        const event = _.createTrigger('unslick', [_, fromBreakpoint]);
        _.$slider.dispatchEvent(event);

        _.destroy();
    };

    // --------------------------
    // Complete
    // --------------------------
    Slick.prototype.updateArrows = function () {
        var _ = this,
            centerOffset;

        centerOffset = Math.floor(_.options.slidesToShow / 2);

        if (_.options.arrows === true && _.slideCount > _.options.slidesToShow && !_.options.infinite) {
            //_.$prevArrow.removeClass('slick-disabled').attr('aria-disabled', 'false');
            //_.$nextArrow.removeClass('slick-disabled').attr('aria-disabled', 'false');
            _.$prevArrow.classList.remove('slick-disabled');
            _.$nextArrow.classList.remove('slick-disabled');

            _.$prevArrow.setAttribute('aria-disabled', 'false');
            _.$nextArrow.setAttribute('aria-disabled', 'false');

            if (_.currentSlide === 0) {
                /*_.$prevArrow.addClass('slick-disabled').attr('aria-disabled', 'true');
                _.$nextArrow.removeClass('slick-disabled').attr('aria-disabled', 'false');*/

                _.$prevArrow.classList.add('slick-disabled');
                _.$nextArrow.classList.remove('slick-disabled');

                _.$prevArrow.setAttribute('aria-disabled', 'true');
                _.$nextArrow.setAttribute('aria-disabled', 'false');
            } else if (_.currentSlide >= _.slideCount - _.options.slidesToShow && _.options.centerMode === false) {
                /*_.$nextArrow.addClass('slick-disabled').attr('aria-disabled', 'true');
                _.$prevArrow.removeClass('slick-disabled').attr('aria-disabled', 'false');*/

                _.$nextArrow.classList.add('slick-disabled');
                _.$prevArrow.classList.remove('slick-disabled');

                _.$nextArrow.setAttribute('aria-disabled', 'true');
                _.$prevArrow.setAttribute('aria-disabled', 'false');
            } else if (_.currentSlide >= _.slideCount - 1 && _.options.centerMode === true) {
                /*_.$nextArrow.addClass('slick-disabled').attr('aria-disabled', 'true');
                _.$prevArrow.removeClass('slick-disabled').attr('aria-disabled', 'false');*/

                _.$nextArrow.classList.add('slick-disabled');
                _.$prevArrow.classList.remove('slick-disabled');

                _.$nextArrow.setAttribute('aria-disabled', 'true');
                _.$prevArrow.setAttribute('aria-disabled', 'false');
            }
        }
    };

    // ------------------------
    // Complete
    // ------------------------
    Slick.prototype.updateDots = function () {
        var _ = this;
        //const thisDots = $(_.$dots);

        if (_.$dots !== null) {
            /*thisDots
                .find('li')
                .removeClass('slick-active')
                .end();*/
            const list = _.$dots.querySelectorAll('li');
            for (let li of list) {
                li.classList.remove('slick-active');
            }

            /*thisDots
                .find('li')
                .eq(Math.floor(_.currentSlide / _.options.slidesToScroll))
                .addClass('slick-active');*/
            const index = Math.floor(_.currentSlide / _.options.slidesToScroll);
            const activeLi = _.$dots.querySelectorAll('li')[index];
            activeLi.classList.add('slick-active');
        }
    };

    // ------------------------
    // Complete
    // ------------------------
    Slick.prototype.visibility = function () {
        var _ = this;

        if (_.options.autoplay) {
            if (document[_.hidden]) {
                _.interrupted = true;
            } else {
                _.interrupted = false;
            }
        }
    };

    return Slick;
});
