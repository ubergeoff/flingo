/*
          _ _      _       _
      ___| (_) ___| | __  (_)___
     / __| | |/ __| |/ /  | / __|
     \__ \ | | (__|	  < _ | \__ \
     |___/_|_|\___|_|\_(_)/ |___/
                 __/
     Version: 1.5.9
     Author: Ken Wheeler
     Author: Ken Wheeler
     Website: http://kenwheeler.github.io
     Docs: http://kenwheeler.github.io/slick
     Repo: http://github.com/kenwheeler/slick
     Issues: http://github.com/kenwheeler/slick/issues
     */
/* global window, document, define, jQuery, setInterval, clearInterval */
(function (factory) {
    'use strict';
    if (typeof define === 'function' && define.amd) {
        define(['jquery'], factory);
    } else if (typeof exports !== 'undefined') {
        module.exports = factory(require('jquery'));
    } else {
        factory(jQuery);
    }
})(function ($) {
    'use strict';
    var Slick = window.Slick || {};

    Slick = (function () {
        var instanceUid = 0;

        function Slick(element, settings) {
            var _ = this,
                dataSettings;

            _.defaults = {
                accessibility: true,
                adaptiveHeight: false,
                appendArrows: $(element),
                appendDots: $(element),
                arrows: true,
                asNavFor: null,
                prevArrow:
                    '<button type="button" data-role="none" class="slick-prev" aria-label="Previous" tabindex="0" role="button">Previous</button>',
                nextArrow:
                    '<button type="button" data-role="none" class="slick-next" aria-label="Next" tabindex="0" role="button">Next</button>',
                autoplay: false,
                autoplaySpeed: 3000,
                centerMode: false,
                centerPadding: '50px',
                cssEase: 'ease',
                customPaging: function (slider, i) {
                    return $('<button type="button" data-role="none" role="button" tabindex="0" />').text(i + 1);
                },
                dots: false,
                dotsClass: 'slick-dots',
                draggable: true,
                easing: 'linear',
                edgeFriction: 0.35,
                fade: false,
                focusOnSelect: false,
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
                slideCount: null,
                slideWidth: null,
                $slideTrack: null,
                $slides: null,
                sliding: false,
                slideOffset: 0,
                swipeLeft: null,
                $list: null,
                touchObject: {},
                transformsEnabled: false,
                unslicked: false
            };

            _.extend(_, _.initials);

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
            _.$slider = $(element);
            _.$slidesCache = null;
            _.transformType = null;
            _.transitionType = null;
            _.visibilityChange = 'visibilitychange';
            _.windowWidth = 0;
            _.windowTimer = null;

            dataSettings = $(element).data('slick') || {};

            _.options = _.extend({}, _.defaults, settings, dataSettings);

            _.currentSlide = _.options.initialSlide;

            _.originalSettings = _.options;

            if (typeof document.mozHidden !== 'undefined') {
                _.hidden = 'mozHidden';
                _.visibilityChange = 'mozvisibilitychange';
            } else if (typeof document.webkitHidden !== 'undefined') {
                _.hidden = 'webkitHidden';
                _.visibilityChange = 'webkitvisibilitychange';
            }

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

            _.instanceUid = instanceUid++;

            // A simple way to check for HTML strings
            // Strict HTML recognition (must start with <)
            // Extracted from jQuery v1.11 source
            _.htmlExpr = /^(?:\s*(<[\w\W]+>)[^>]*)$/;
            _.registerBreakpoints();
            _.init(true);
        }

        return Slick;
    })();

    Slick.prototype.activateADA = function () {
        var _ = this;

        // TODO remove this line once $slideTrack is no longer a jquery object
        var _slideTrack = _.$slideTrack.get(0); // assuming there is only one track

        _.queryAll('.slick-active', _slideTrack).forEach(function (element, index, array) {
            element.setAttribute('aria-hidden', 'false');
            _.queryAll('a, input, button, select', element).forEach(function (element2, index2, array2) {
                element2.setAttribute('tabindex', '0');
            });
        });
    };

    Slick.prototype.addSlide = Slick.prototype.slickAdd = function (markup, index, addBefore) {
        var _ = this,
            $slideTrack = _.$slideTrack.get(0), // TODO remove .get(0) in future
            $slides = Array.prototype.slice.call(_.$slides.get()); // TODO remove .get() in future (maybe the array converter too)

        if (typeof index === 'boolean') {
            addBefore = index;
            index = null;
        } else if (index < 0 || index >= _.slideCount) {
            return false;
        }

        _.unload();

        // Convert markup to an HTMLElement
        if (!(markup instanceof HTMLElement)) {
            var tempNode = document.createElement('div');
            tempNode.innerHTML = markup;
            markup = tempNode.children[0];
        }

        if (typeof index === 'number') {
            if (index === 0 && _.$slides.length === 0) {
                $slideTrack.appendChild(markup);
            } else if (addBefore) {
                $slideTrack.insertBefore(markup, $slides[index]);
            } else {
                $slideTrack.insertBefore(markup, $slides[index].nextSibling);
            }
        } else {
            if (addBefore === true) {
                $slideTrack.insertBefore(markup, $slideTrack.firstChild);
            } else {
                $slideTrack.appendChild(markup);
            }
        }

        $slides = _.filterNodeUtil($slideTrack.children, _.options.slide); // Save slides

        $slides.forEach(function (elem) {
            $slideTrack.removeChild(elem);
        }); // (Detach) each slide from slideTrack

        $slides.forEach(function (elem) {
            $slideTrack.appendChild(elem);
        }); // Append each slide on slideTrack

        $slides.forEach(function (elem, index) {
            elem.setAttribute('data-slick-index', index);
        });

        _.$slidesCache = _.$slides = $($slides); // TODO remove $() in future
        _.$slideTrack = $($slideTrack); // TODO remove $() in future

        _.reinit();
    };

    Slick.prototype.animateHeight = function () {
        var _ = this;

        if (_.options.slidesToShow === 1 && _.options.adaptiveHeight === true && _.options.vertical === false) {
            var _slides = _.$slides.get();
            var _list = _.$list.get(0);
            var targetHeight = _.outerHeight(_slides[_.currentSlide]);

            _list.style.height = targetHeight + 'px';
            _list.style.transition = 'height ' + _.options.speed + 'ms';
        }
    };

    Slick.prototype.animateSlide = function (targetLeft, callback) {
        var animProps = {},
            _ = this;

        _.animateHeight();

        if (_.options.rtl === true && _.options.vertical === false) {
            targetLeft = -targetLeft;
        }
        if (_.transformsEnabled === false) {
            if (_.options.vertical === false) {
                _.$slideTrack.animate(
                    {
                        left: targetLeft
                    },
                    _.options.speed,
                    _.options.easing,
                    callback
                );
            } else {
                _.$slideTrack.animate(
                    {
                        top: targetLeft
                    },
                    _.options.speed,
                    _.options.easing,
                    callback
                );
            }
        } else {
            if (_.cssTransitions === false) {
                if (_.options.rtl === true) {
                    _.currentLeft = -_.currentLeft;
                }
                $({
                    animStart: _.currentLeft
                }).animate(
                    {
                        animStart: targetLeft
                    },
                    {
                        duration: _.options.speed,
                        easing: _.options.easing,
                        step: function (now) {
                            now = Math.ceil(now);
                            if (_.options.vertical === false) {
                                animProps[_.animType] = 'translate(' + now + 'px, 0px)';
                                _.$slideTrack.css(animProps);
                            } else {
                                animProps[_.animType] = 'translate(0px,' + now + 'px)';
                                _.$slideTrack.css(animProps);
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
                _.applyTransition();
                targetLeft = Math.ceil(targetLeft);

                if (_.options.vertical === false) {
                    animProps[_.animType] = 'translate3d(' + targetLeft + 'px, 0px, 0px)';
                } else {
                    animProps[_.animType] = 'translate3d(0px,' + targetLeft + 'px, 0px)';
                }
                _.$slideTrack.css(animProps);

                if (callback) {
                    setTimeout(function () {
                        _.disableTransition();

                        callback.call();
                    }, _.options.speed);
                }
            }
        }
    };

    Slick.prototype.getNavTarget = function () {
        var _ = this,
            asNavFor = _.options.asNavFor;

        if (asNavFor && asNavFor !== null) {
            asNavFor = _.queryAll(asNavFor).filter(function (elem, index, array) {
                return elem !== _.$slider.get(0);
            });
            asNavFor = $(asNavFor);
        }

        return asNavFor;
    };

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

    Slick.prototype.applyTransition = function (slide) {
        var _ = this;

        if (_.options.fade === false) {
            _.$slideTrack.get(0).style[_.transitionType] =
                _.transformType + ' ' + _.options.speed + 'ms ' + _.options.cssEase;
        } else {
            _.$slides.get()[slide].style[_.transitionType] = 'opacity ' + _.options.speed + 'ms ' + _.options.cssEase;
        }
    };

    Slick.prototype.autoPlay = function () {
        var _ = this;

        _.autoPlayClear();

        if (_.slideCount > _.options.slidesToShow) {
            _.autoPlayTimer = setInterval(_.autoPlayIterator, _.options.autoplaySpeed);
        }
    };

    Slick.prototype.autoPlayClear = function () {
        var _ = this;

        if (_.autoPlayTimer) {
            clearInterval(_.autoPlayTimer);
        }
    };

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

    Slick.prototype.buildArrows = function () {
        var _ = this;

        if (_.options.arrows === true) {
            var $prevArrow;
            var $nextArrow;

            _.$prevArrow = $(_.options.prevArrow);
            _.$nextArrow = $(_.options.nextArrow);

            // New set of vars to prevent conflict with other funcitons
            // To be replace eventually
            $prevArrow = _.$prevArrow[0];
            $nextArrow = _.$nextArrow[0];

            [].forEach.call([$prevArrow, $nextArrow], function (arrow) {
                arrow.classList.add('slick-arrow');
            });

            if (_.slideCount > _.options.slidesToShow) {
                [].forEach.call([$prevArrow, $nextArrow], function (arrow) {
                    arrow.classList.remove('slick-hidden');
                    arrow.removeAttribute('aria-hidden tabindex');
                });

                if (_.htmlExpr.test(_.options.prevArrow)) {
                    _.options.appendArrows[0].insertBefore($prevArrow, _.options.appendArrows[0].firstChild);
                }

                if (_.htmlExpr.test(_.options.nextArrow)) {
                    _.options.appendArrows[0].appendChild($nextArrow);
                }

                if (_.options.infinite !== true) {
                    $prevArrow.classList.add('slick-disabled');
                    $prevArrow.setAttribute('aria-disabled', 'true');
                }
            } else {
                [].forEach.call([$prevArrow, $nextArrow], function (arrow) {
                    arrow.classList.add('slick-hidden');
                    arrow.setAttribute('aria-disabled', 'true');
                    arrow.setAttribute('tabindex', '-1');
                });
            }
        }
    };

    Slick.prototype.buildDots = function () {
        var _ = this;
        var i;
        var dot;
        var $slider = _.$slider[0];

        if (_.options.dots === true && _.slideCount > _.options.slidesToShow) {
            $slider.classList.add('slick-dotted');

            dot = document.createElement('ul');

            dot.classList.add(_.options.dotsClass);

            for (i = 0; i <= _.getDotCount(); i += 1) {
                dot.insertAdjacentHTML('beforeend', '<li></li>');
                dot.children[i].appendChild(_.options.customPaging.call(this, _, i)[0]);
            }

            _.$dots = _.options.appendDots[0].appendChild(dot);

            if (_.$dots.firstElementChild.nodeName === 'LI') {
                _.$dots.firstElementChild.classList.add('slick-active');
                _.$dots.firstElementChild.setAttribute('aria-hidden', 'false');
            }

            _.$dots = $(_.$dots);
        }
    };

    Slick.prototype.buildOut = function () {
        var _ = this;

        _.$$slider = _.$slider.get(0);
        _.$$slideTrack = document.createElement('div');
        _.$$list = document.createElement('div');
        _.$$slides = _.filterNodeUtil(_.$$slider.children, _.options.slide + ':not(.slick-cloned)');
        _.slideCount = _.$$slides.length;

        _.$$slider.classList.add('slick-slider');
        _.$$slideTrack.classList.add('slick-track');
        _.$$slideTrack.style.opacity = 0;
        _.$$list.setAttribute('aria-live', 'polite');
        _.$$list.classList.add('slick-list');

        _.$$slides.forEach(function (elem, index) {
            _.$$slideTrack.appendChild(elem);
            elem.classList.add('slick-slide');
            elem.setAttribute('data-slick-index', index);
            elem.setAttribute('data-originalStyling', elem.getAttribute('style') || '');
        });

        _.$$list.appendChild(_.$$slideTrack);
        _.$$slider.appendChild(_.$$list);

        if (_.options.centerMode === true || _.options.swipeToSlide === true) {
            _.options.slidesToScroll = 1;
        }

        _.queryAll('img[data-lazy]:not([src])', _.$$slider).forEach(function (elem) {
            elem.classList.add('slick-loading');
        });

        _.$slides = $(_.$$slides); //TODO remove at end
        _.$slideTrack = $(_.$$slideTrack); //TODO remove at end
        _.$list = $(_.$$list); //TODO remove at end
        _.$slider = $(_.$$slider); //TODO remove at end

        _.setupInfinite();

        _.buildArrows();

        _.buildDots();

        _.updateDots();

        _.setSlideClasses(typeof _.currentSlide === 'number' ? _.currentSlide : 0);

        if (_.options.draggable === true) {
            _.$$list = _.$list.get(0); //TODO remove at end
            _.$$list.classList.add('draggable');
            _.$list = $(_.$$list); //TODO remove at end
        }
    };

    Slick.prototype.buildRows = function () {
        var _ = this,
            a,
            b,
            c,
            newSlides,
            numOfSlides,
            originalSlides,
            slidesPerSection;

        newSlides = document.createDocumentFragment();
        originalSlides = [].slice.call(_.$slider.get(0).children);

        if (_.options.rows > 1) {
            slidesPerSection = _.options.slidesPerRow * _.options.rows;
            numOfSlides = Math.ceil(originalSlides.length / slidesPerSection);
            for (a = 0; a < numOfSlides; a++) {
                var slide = document.createElement('div');
                for (b = 0; b < _.options.rows; b++) {
                    var row = document.createElement('div');
                    for (c = 0; c < _.options.slidesPerRow; c++) {
                        var target = a * slidesPerSection + (b * _.options.slidesPerRow + c);
                        if (originalSlides[target]) {
                            row.appendChild(originalSlides[target]);
                        }
                    }
                    slide.appendChild(row);
                }
                newSlides.appendChild(slide);
            }
            var vanilla$slider = _.$slider.get();
            vanilla$slider[0].innerHTML = '';
            vanilla$slider[0].appendChild(newSlides);

            [].forEach.call(originalSlides[0], function (children) {
                children.style.width = 100 / _.options.slidesPerRow + '%';
                children.style.display = 'inline-block';
            });
        }
    };

    Slick.prototype.checkResponsive = function (initial, forceUpdate) {
        var _ = this,
            breakpoint,
            targetBreakpoint,
            respondToWidth,
            triggerBreakpoint = false;

        _.$$slider = _.$slider.get(0);

        var sliderWidth = _.width(_.$$slider);
        var windowWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

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
                            _.options = _.extend({}, _.originalSettings, _.breakpointSettings[targetBreakpoint]);
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
                        _.options = _.extend({}, _.originalSettings, _.breakpointSettings[targetBreakpoint]);
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
                _.triggerEvent(_.$$slider, 'breakpoint', [_, triggerBreakpoint]);
            }
        }
    };

    Slick.prototype.changeSlide = function (event, dontAnimate) {
        var _ = this;
        var $target = event.currentTarget || false;
        var indexOffset;
        var slideOffset;
        var unevenOffset;

        // If target is a link, prevent default action.
        if (_.matches($target, 'a')) {
            event.preventDefault();
        }

        // If target is not the <li> element (ie: a child), find the <li>.
        if (!_.matches($target, 'li')) {
            $target = _.getClosest($target, 'li');
        }

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
                        : event.data.index ||
                          [].slice.call($target.parentNode.children).indexOf($target) * _.options.slidesToScroll;
                var customTrigger = document.createEvent('HTMLEvents');

                customTrigger.initEvent('focus', true, false);

                _.slideHandler(_.checkNavigable(index), false, dontAnimate);

                if ($target) {
                    [].forEach.call($target.children, function (child) {
                        child.dispatchEvent(customTrigger);
                    });
                }
                break;

            default:
                return;
        }
    };

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

    Slick.prototype.cleanUpEvents = function () {
        var _ = this;

        if (_.options.dots && _.$dots !== null) {
            $('li', _.$dots)
                .off('click.slick', _.changeSlide)
                .off('mouseenter.slick', _.interrupt.bind(_, true))
                .off('mouseleave.slick', _.interrupt.bind(_, false));
        }

        _.$slider.off('focus.slick blur.slick');

        if (_.options.arrows === true && _.slideCount > _.options.slidesToShow) {
            _.$prevArrow && _.$prevArrow.off('click.slick', _.changeSlide);
            _.$nextArrow && _.$nextArrow.off('click.slick', _.changeSlide);
        }

        _.$list.off('touchstart.slick mousedown.slick', _.swipeHandler);
        _.$list.off('touchmove.slick mousemove.slick', _.swipeHandler);
        _.$list.off('touchend.slick mouseup.slick', _.swipeHandler);
        _.$list.off('touchcancel.slick mouseleave.slick', _.swipeHandler);

        _.$list.off('click.slick', _.clickHandler);

        $(document).off(_.visibilityChange, _.visibility);

        _.cleanUpSlideEvents();

        if (_.options.accessibility === true) {
            _.$list.off('keydown.slick', _.keyHandler);
        }

        if (_.options.focusOnSelect === true) {
            $(_.$slideTrack).children().off('click.slick', _.selectHandler);
        }

        $(window).off('orientationchange.slick.slick-' + _.instanceUid, _.orientationChange);

        $(window).off('resize.slick.slick-' + _.instanceUid, _.resize);

        $('[draggable!=true]', _.$slideTrack).off('dragstart', _.preventDefault);

        $(window).off('load.slick.slick-' + _.instanceUid, _.setPosition);
        $(document).off('ready.slick.slick-' + _.instanceUid, _.setPosition);
    };

    Slick.prototype.cleanUpSlideEvents = function () {
        var _ = this;

        _.$list.off('mouseenter.slick', _.interrupt.bind(_, true));
        _.$list.off('mouseleave.slick', _.interrupt.bind(_, false));
    };

    Slick.prototype.cleanUpRows = function () {
        var _ = this,
            originalSlides;

        if (_.options.rows > 1) {
            originalSlides = _.$slides.children.children;
            originalSlides.removeAttribute('style');
            _.$slider.innerHTML = '';
            _.$slider.appendChild(originalSlides);
        }
    };

    Slick.prototype.clickHandler = function (event) {
        var _ = this;

        if (_.shouldClick === false) {
            event.stopImmediatePropagation();
            event.stopPropagation();
            event.preventDefault();
        }
    };

    Slick.prototype.destroy = function (refresh) {
        var _ = this;

        _.autoPlayClear();

        _.touchObject = {};

        _.cleanUpEvents();

        $('.slick-cloned', _.$slider).detach();

        if (_.$dots) {
            _.$dots.remove();
        }

        if (_.$prevArrow && _.$prevArrow.length) {
            _.$prevArrow
                .removeClass('slick-disabled slick-arrow slick-hidden')
                .removeAttr('aria-hidden aria-disabled tabindex')
                .css('display', '');

            if (_.htmlExpr.test(_.options.prevArrow)) {
                _.$prevArrow.remove();
            }
        }

        if (_.$nextArrow && _.$nextArrow.length) {
            _.$nextArrow
                .removeClass('slick-disabled slick-arrow slick-hidden')
                .removeAttr('aria-hidden aria-disabled tabindex')
                .css('display', '');

            if (_.htmlExpr.test(_.options.nextArrow)) {
                _.$nextArrow.remove();
            }
        }

        if (_.$slides) {
            _.$slides
                .removeClass('slick-slide slick-active slick-center slick-visible slick-current')
                .removeAttr('aria-hidden')
                .removeAttr('data-slick-index')
                .each(function () {
                    $(this).attr('style', $(this).data('originalStyling'));
                });

            _.$slideTrack.children(this.options.slide).detach();

            _.$slideTrack.detach();

            _.$list.detach();

            _.$slider.append(_.$slides);
        }

        _.cleanUpRows();

        _.$slider.removeClass('slick-slider');
        _.$slider.removeClass('slick-initialized');
        _.$slider.removeClass('slick-dotted');

        _.unslicked = true;

        if (!refresh) {
            _.$slider.trigger('destroy', [_]);
        }
    };

    Slick.prototype.disableTransition = function (slide) {
        var _ = this,
            transition = {};

        transition[_.transitionType] = '';

        if (_.options.fade === false) {
            _.$slideTrack.css(transition);
        } else {
            _.$slides.eq(slide).css(transition);
        }
    };

    Slick.prototype.fadeSlide = function (slideIndex, callback) {
        var _ = this;

        if (_.cssTransitions === false) {
            _.$slides.eq(slideIndex).css({
                zIndex: _.options.zIndex
            });

            _.$slides.eq(slideIndex).animate(
                {
                    opacity: 1
                },
                _.options.speed,
                _.options.easing,
                callback
            );
        } else {
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
        }
    };

    Slick.prototype.fadeSlideOut = function (slideIndex) {
        var _ = this;

        if (_.cssTransitions === false) {
            _.$slides.eq(slideIndex).animate(
                {
                    opacity: 0,
                    zIndex: _.options.zIndex - 2
                },
                _.options.speed,
                _.options.easing
            );
        } else {
            _.applyTransition(slideIndex);

            _.$slides.eq(slideIndex).css({
                opacity: 0,
                zIndex: _.options.zIndex - 2
            });
        }
    };

    Slick.prototype.filterSlides = Slick.prototype.slickFilter = function (filter) {
        var _ = this;

        if (filter !== null) {
            _.$slidesCache = _.$slides;

            _.unload();

            _.filterNodeUtil(_.$slideTrack.get(0).children, _.options.slide).forEach(function (elem) {
                _.$slideTrack.get(0).removeChild(elem);
            });

            _.filterNodeUtil(_.$slidesCache.get(), filter).forEach(function (elem) {
                _.$slideTrack.get(0).appendChild(elem);
            });

            _.reinit();
        }
    };

    Slick.prototype.focusHandler = function () {
        var _ = this;

        _.$slider.off('focus.slick blur.slick').on('focus.slick blur.slick', '*:not(.slick-arrow)', function (event) {
            event.stopImmediatePropagation();
            var $sf = $(this);

            setTimeout(function () {
                if (_.options.pauseOnFocus) {
                    _.focussed = _.matches($sf[0], ':focus');
                    _.autoPlay();
                }
            }, 0);
        });
    };

    Slick.prototype.getCurrent = Slick.prototype.slickCurrentSlide = function () {
        var _ = this;
        return _.currentSlide;
    };

    Slick.prototype.getDotCount = function () {
        var _ = this;

        var breakPoint = 0;
        var counter = 0;
        var pagerQty = 0;

        if (_.options.infinite === true) {
            while (breakPoint < _.slideCount) {
                ++pagerQty;
                breakPoint = counter + _.options.slidesToScroll;
                counter +=
                    _.options.slidesToScroll <= _.options.slidesToShow
                        ? _.options.slidesToScroll
                        : _.options.slidesToShow;
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

    Slick.prototype.getLeft = function (slideIndex) {
        var _ = this,
            targetLeft,
            verticalHeight,
            verticalOffset = 0,
            targetSlide;

        _.slideOffset = 0;
        verticalHeight = _.$slides.first().outerHeight(true);

        if (_.options.infinite === true) {
            if (_.slideCount > _.options.slidesToShow) {
                _.slideOffset = _.slideWidth * _.options.slidesToShow * -1;
                verticalOffset = verticalHeight * _.options.slidesToShow * -1;
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

        if (_.options.centerMode === true && _.options.infinite === true) {
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
                targetSlide = _.$slideTrack.children('.slick-slide').eq(slideIndex);
            } else {
                targetSlide = _.$slideTrack.children('.slick-slide').eq(slideIndex + _.options.slidesToShow);
            }

            if (_.options.rtl === true) {
                if (targetSlide[0]) {
                    targetLeft = (_.$slideTrack.width() - targetSlide[0].offsetLeft - targetSlide.width()) * -1;
                } else {
                    targetLeft = 0;
                }
            } else {
                targetLeft = targetSlide[0] ? targetSlide[0].offsetLeft * -1 : 0;
            }

            if (_.options.centerMode === true) {
                if (_.slideCount <= _.options.slidesToShow || _.options.infinite === false) {
                    targetSlide = _.$slideTrack.children('.slick-slide').eq(slideIndex);
                } else {
                    targetSlide = _.$slideTrack.children('.slick-slide').eq(slideIndex + _.options.slidesToShow + 1);
                }

                if (_.options.rtl === true) {
                    if (targetSlide[0]) {
                        targetLeft = (_.$slideTrack.width() - targetSlide[0].offsetLeft - targetSlide.width()) * -1;
                    } else {
                        targetLeft = 0;
                    }
                } else {
                    targetLeft = targetSlide[0] ? targetSlide[0].offsetLeft * -1 : 0;
                }

                targetLeft += (_.$list.width() - targetSlide.outerWidth()) / 2;
            }
        }

        return targetLeft;
    };

    Slick.prototype.getOption = Slick.prototype.slickGetOption = function (option) {
        var _ = this;

        return _.options[option];
    };

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

    Slick.prototype.getSlick = function () {
        return this;
    };

    Slick.prototype.getSlideCount = function () {
        var _ = this,
            slidesTraversed,
            swipedSlide,
            centerOffset;

        centerOffset = _.options.centerMode === true ? _.slideWidth * Math.floor(_.options.slidesToShow / 2) : 0;

        if (_.options.swipeToSlide === true) {
            _.$slideTrack.find('.slick-slide').each(function (index, slide) {
                if (slide.offsetLeft - centerOffset + $(slide).outerWidth() / 2 > _.swipeLeft * -1) {
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

    Slick.prototype.init = function (creation) {
        var _ = this;

        if (!$(_.$slider).hasClass('slick-initialized')) {
            $(_.$slider).addClass('slick-initialized');

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
            _.triggerEvent(_.$slider.get(0), 'init', [_]);
        }

        if (_.options.accessibility === true) {
            _.initADA();
        }

        if (_.options.autoplay) {
            _.paused = false;
            _.autoPlay();
        }
    };

    Slick.prototype.initADA = function () {
        var _ = this;
        _.$slides
            .add(_.$slideTrack.find('.slick-cloned'))
            .attr({
                'aria-hidden': 'true',
                tabindex: '-1'
            })
            .find('a, input, button, select')
            .attr({
                tabindex: '-1'
            });

        _.$slideTrack.attr('role', 'listbox');

        _.$slides.not(_.$slideTrack.find('.slick-cloned')).each(function (i) {
            $(this).attr({
                role: 'option',
                'aria-describedby': 'slick-slide' + _.instanceUid + i + ''
            });
        });

        if (_.$dots !== null) {
            _.$dots
                .attr('role', 'tablist')
                .find('li')
                .each(function (i) {
                    $(this).attr({
                        role: 'presentation',
                        'aria-selected': 'false',
                        'aria-controls': 'navigation' + _.instanceUid + i + '',
                        id: 'slick-slide' + _.instanceUid + i + ''
                    });
                })
                .first()
                .attr('aria-selected', 'true')
                .end()
                .find('button')
                .attr('role', 'button')
                .end()
                .closest('div')
                .attr('role', 'toolbar');
        }
        _.activateADA();
    };

    Slick.prototype.initArrowEvents = function () {
        var _ = this;

        if (_.options.arrows === true && _.slideCount > _.options.slidesToShow) {
            var $prevArrow = _.$prevArrow[0];
            var $nextArrow = _.$nextArrow[0];

            var initPrevArrowEvent = function (thatEvt) {
                thatEvt.data = { message: 'previous' };

                return _.changeSlide(thatEvt);
            };

            var initNextArrowEvent = function (thatEvt) {
                thatEvt.data = { message: 'next' };

                return _.changeSlide(thatEvt);
            };

            $prevArrow.removeEventListener('click', initPrevArrowEvent, false);
            $nextArrow.removeEventListener('click', initNextArrowEvent, false);

            $prevArrow.addEventListener('click', initPrevArrowEvent, false);
            $nextArrow.addEventListener('click', initNextArrowEvent, false);
        }
    };

    Slick.prototype.initDotEvents = function () {
        var _ = this;

        if (_.options.dots === true && _.slideCount > _.options.slidesToShow) {
            $('li', _.$dots).on(
                'click.slick',
                {
                    message: 'index'
                },
                _.changeSlide
            );
        }

        if (_.options.dots === true && _.options.pauseOnDotsHover === true) {
            $('li', _.$dots)
                .on('mouseenter.slick', _.interrupt.bind(_, true))
                .on('mouseleave.slick', _.interrupt.bind(_, false));
        }
    };

    Slick.prototype.initSlideEvents = function () {
        var _ = this;

        if (_.options.pauseOnHover) {
            _.$list.on('mouseenter.slick', _.interrupt.bind(_, true));
            _.$list.on('mouseleave.slick', _.interrupt.bind(_, false));
        }
    };

    Slick.prototype.initializeEvents = function () {
        var _ = this;

        _.initArrowEvents();

        _.initDotEvents();
        _.initSlideEvents();

        _.$list.on(
            'touchstart.slick mousedown.slick',
            {
                action: 'start'
            },
            _.swipeHandler
        );
        _.$list.on(
            'touchmove.slick mousemove.slick',
            {
                action: 'move'
            },
            _.swipeHandler
        );
        _.$list.on(
            'touchend.slick mouseup.slick',
            {
                action: 'end'
            },
            _.swipeHandler
        );
        _.$list.on(
            'touchcancel.slick mouseleave.slick',
            {
                action: 'end'
            },
            _.swipeHandler
        );

        _.$list.on('click.slick', _.clickHandler);

        $(document).on(_.visibilityChange, _.visibility.bind(_));

        if (_.options.accessibility === true) {
            _.$list.on('keydown.slick', _.keyHandler);
        }

        if (_.options.focusOnSelect === true) {
            $(_.$slideTrack).children().on('click.slick', _.selectHandler);
        }

        $(window).on('orientationchange.slick.slick-' + _.instanceUid, _.orientationChange.bind(_));

        $(window).on('resize.slick.slick-' + _.instanceUid, _.resize.bind(_));

        $('[draggable!=true]', _.$slideTrack).on('dragstart', _.preventDefault);

        $(window).on('load.slick.slick-' + _.instanceUid, _.setPosition);
        $(document).on('ready.slick.slick-' + _.instanceUid, _.setPosition);
    };

    Slick.prototype.initUI = function () {
        var _ = this;

        if (_.options.arrows === true && _.slideCount > _.options.slidesToShow) {
            _.$prevArrow.show();
            _.$nextArrow.show();
        }

        if (_.options.dots === true && _.slideCount > _.options.slidesToShow) {
            _.$dots.show();
        }
    };

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

    Slick.prototype.lazyLoad = function () {
        var _ = this,
            loadRange,
            cloneRange,
            rangeStart,
            rangeEnd;

        function loadImages(imagesScope) {
            $('img[data-lazy]', imagesScope).each(function () {
                var image = $(this),
                    imageSource = $(this).attr('data-lazy'),
                    imageToLoad = document.createElement('img');

                imageToLoad.onload = function () {
                    image.animate({ opacity: 0 }, 100, function () {
                        image.attr('src', imageSource).animate({ opacity: 1 }, 200, function () {
                            image.removeAttr('data-lazy').removeClass('slick-loading');
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

        loadRange = _.$slider.find('.slick-slide').slice(rangeStart, rangeEnd);
        loadImages(loadRange);

        if (_.slideCount <= _.options.slidesToShow) {
            cloneRange = _.$slider.find('.slick-slide');
            loadImages(cloneRange);
        } else if (_.currentSlide >= _.slideCount - _.options.slidesToShow) {
            cloneRange = _.$slider.find('.slick-cloned').slice(0, _.options.slidesToShow);
            loadImages(cloneRange);
        } else if (_.currentSlide === 0) {
            cloneRange = _.$slider.find('.slick-cloned').slice(_.options.slidesToShow * -1);
            loadImages(cloneRange);
        }
    };

    Slick.prototype.loadSlider = function () {
        var _ = this;

        _.setPosition();

        _.$slideTrack.css({
            opacity: 1
        });

        _.$slider.removeClass('slick-loading');

        _.initUI();

        if (_.options.lazyLoad === 'progressive') {
            _.progressiveLazyLoad();
        }
    };

    Slick.prototype.next = Slick.prototype.slickNext = function () {
        var _ = this;

        _.changeSlide({
            data: {
                message: 'next'
            }
        });
    };

    Slick.prototype.orientationChange = function () {
        var _ = this;

        _.checkResponsive();
        _.setPosition();
    };

    Slick.prototype.pause = Slick.prototype.slickPause = function () {
        var _ = this;

        _.autoPlayClear();
        _.paused = true;
    };

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
            _.$slider.trigger('afterChange', [_, index]);

            _.animating = false;

            _.setPosition();

            _.swipeLeft = null;

            if (_.options.autoplay) {
                _.autoPlay();
            }

            if (_.options.accessibility === true) {
                _.initADA();
            }
        }
    };

    Slick.prototype.prev = Slick.prototype.slickPrev = function () {
        var _ = this;

        _.changeSlide({
            data: {
                message: 'previous'
            }
        });
    };

    Slick.prototype.preventDefault = function (event) {
        event.preventDefault();
    };

    Slick.prototype.progressiveLazyLoad = function (tryCount) {
        tryCount = tryCount || 1;

        var _ = this,
            $imgsToLoad = $('img[data-lazy]', _.$slider),
            image,
            imageSource,
            imageToLoad;

        if ($imgsToLoad.length) {
            image = $imgsToLoad.first();
            imageSource = image.attr('data-lazy');
            imageToLoad = document.createElement('img');

            imageToLoad.onload = function () {
                image.attr('src', imageSource).removeAttr('data-lazy').removeClass('slick-loading');

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

        _.extend(_, _.initials, { currentSlide: currentSlide });

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
                currentBreakpoint = responsiveSettings[breakpoint].breakpoint;

                if (responsiveSettings.hasOwnProperty(breakpoint)) {
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

    Slick.prototype.reinit = function () {
        var _ = this;

        _.$slides = _.$slideTrack.children(_.options.slide).addClass('slick-slide');

        _.slideCount = _.$slides.length;

        if (_.currentSlide >= _.slideCount && _.currentSlide !== 0) {
            _.currentSlide = _.currentSlide - _.options.slidesToScroll;
        }

        if (_.slideCount <= _.options.slidesToShow) {
            _.currentSlide = 0;
        }

        _.registerBreakpoints();

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
            $(_.$slideTrack).children().on('click.slick', _.selectHandler);
        }

        _.setSlideClasses(typeof _.currentSlide === 'number' ? _.currentSlide : 0);

        _.setPosition();
        _.focusHandler();

        _.paused = !_.options.autoplay;
        _.autoPlay();

        _.$slider.trigger('reInit', [_]);
    };

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

    Slick.prototype.removeSlide = Slick.prototype.slickRemove = function (index, removeBefore, removeAll) {
        var _ = this;

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
            _.$slideTrack.children().remove();
        } else {
            _.$slideTrack.children(this.options.slide).eq(index).remove();
        }

        _.$slides = _.$slideTrack.children(this.options.slide);

        _.$slideTrack.children(this.options.slide).detach();

        _.$slideTrack.append(_.$slides);

        _.$slidesCache = _.$slides;

        _.reinit();
    };

    Slick.prototype.setCSS = function (position) {
        var _ = this,
            positionProps = {},
            x,
            y;

        if (_.options.rtl === true) {
            position = -position;
        }
        x = _.positionProp == 'left' ? Math.ceil(position) + 'px' : '0px';
        y = _.positionProp == 'top' ? Math.ceil(position) + 'px' : '0px';

        positionProps[_.positionProp] = position;

        if (_.transformsEnabled === false) {
            _.$slideTrack.css(positionProps);
        } else {
            positionProps = {};
            if (_.cssTransitions === false) {
                positionProps[_.animType] = 'translate(' + x + ', ' + y + ')';
                _.$slideTrack.css(positionProps);
            } else {
                positionProps[_.animType] = 'translate3d(' + x + ', ' + y + ', 0px)';
                _.$slideTrack.css(positionProps);
            }
        }
    };

    Slick.prototype.setDimensions = function () {
        var _ = this,
            list = _.$list.get(0),
            slides = _.$slides.get(),
            slideTrack = _.$slideTrack.get(0);

        if (_.options.vertical === false) {
            if (_.options.centerMode === true) {
                list.style['padding'] = '0px ' + _.options.centerPadding;
            }
        } else {
            _.$list.style['height'] = _.outerHeight(slides[0]) * _.options.slidesToShow + 'px';
            if (_.options.centerMode === true) {
                list.style['padding'] = _.options.centerPadding + ' 0px';
            }
        }

        _.listWidth = _.width(list);
        _.listHeight = _.height(list);

        if (_.options.vertical === false && _.options.variableWidth === false) {
            _.slideWidth = Math.ceil(_.listWidth / _.options.slidesToShow);
            slideTrack.style['width'] =
                Math.ceil(_.slideWidth * slideTrack.getElementsByClassName('slick-slide').length) + 'px';
        } else if (_.options.variableWidth === true) {
            slideTrack.style['width'] = 5000 * _.slideCount + 'px';
        } else {
            _.slideWidth = Math.ceil(_.listWidth);
            slideTrack.style['height'] =
                Math.ceil(_.outerHeight(slides[0]) * slideTrack.getElementsByClassName('slick-slide').length) + 'px';
        }

        if (slides.length && _.options.variableWidth === false) {
            var offset = _.outerWidth(slides[0]) - _.width(slides[0]);
            Array.prototype.forEach.call(slideTrack.getElementsByClassName('slick-slide'), function (element) {
                element.style['width'] = _.slideWidth - offset + 'px';
            });
        }
    };

    Slick.prototype.setFade = function () {
        var _ = this,
            targetLeft,
            slidesArray = _.$slides.toArray();

        slidesArray.forEach(function (element, index) {
            targetLeft = _.slideWidth * index * -1;
            element.style['position'] = 'relative';
            element.style['top'] = 0;
            element.style['zIndex'] = _.options.zIndex - 2;
            element.style['opacity'] = 0;
            if (_.options.rtl === true) {
                element.style.right = targetLeft + 'px';
            } else {
                element.style.left = targetLeft + 'px';
            }
        });

        slidesArray[_.currentSlide].style['zIndex'] = _.options.zIndex - 1;
        slidesArray[_.currentSlide].style['opacity'] = 1;
    };

    Slick.prototype.setHeight = function () {
        var _ = this;

        if (_.options.slidesToShow === 1 && _.options.adaptiveHeight === true && _.options.vertical === false) {
            var targetHeight = _.outerHeight(_.$slides.get()[_.currentSlide]);
            _.$list[0].style.height = targetHeight + 'px';
        }
    };

    Slick.prototype.setOption = Slick.prototype.slickSetOption = function () {
        /**
         * accepts arguments in format of:
         *
         *	- for changing a single option's value:
         *	   .slick("setOption", option, value, refresh )
         *
         *	- for changing a set of responsive options:
         *	   .slick("setOption", 'responsive', [{}, ...], refresh )
         *
         *	- for updating multiple values at once (not responsive)
         *	   .slick("setOption", { 'option': value, ... }, refresh )
         */

        var _ = this,
            l,
            item,
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
            for (item in value) {
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

    Slick.prototype.setPosition = function () {
        var _ = this;

        _.setDimensions();

        _.setHeight();

        if (_.options.fade === false) {
            _.setCSS(_.getLeft(_.currentSlide));
        } else {
            _.setFade();
        }

        _.triggerEvent(_.$slider.get(0), 'setPosition', [_]);
    };

    Slick.prototype.setProps = function () {
        var _ = this,
            bodyStyle = document.body.style;

        _.positionProp = _.options.vertical === true ? 'top' : 'left';

        if (_.positionProp === 'top') {
            _.$slider.addClass('slick-vertical');
        } else {
            _.$slider.removeClass('slick-vertical');
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

    Slick.prototype.setSlideClasses = function (index) {
        var _ = this,
            centerOffset,
            allSlides,
            indexOffset,
            remainder,
            _slidesToShow;
        var _slider = _.$slider.get(0),
            _slides = _.$slides.get();

        allSlides = _.queryAll('.slick-slide', _slider);

        allSlides.forEach(function ($myElem) {
            $myElem.classList.remove('slick-active');
            $myElem.classList.remove('slick-center');
            $myElem.classList.remove('slick-current');
            $myElem.setAttribute('aria-hidden', 'true');
        });

        if (_.eq(_slides, index)) {
            _.eq(_slides, index).classList.add('slick-current');
        }

        if (_.options.centerMode === true) {
            centerOffset = Math.floor(_.options.slidesToShow / 2);

            if (_.options.infinite === true) {
                if (index >= centerOffset && index <= _.slideCount - 1 - centerOffset) {
                    _slidesToShow = _slides.slice(index - centerOffset, index + centerOffset + 1);
                    _slidesToShow.forEach(function ($myElem) {
                        $myElem.classList.add('slick-active');
                        $myElem.setAttribute('aria-hidden', 'false');
                    });
                } else {
                    indexOffset = _.options.slidesToShow + index;

                    _slidesToShow = _slides.slice(indexOffset - centerOffset + 1, indexOffset + centerOffset + 2);
                    _slidesToShow.forEach(function ($myElem) {
                        $myElem.classList.add('slick-active');
                        $myElem.setAttribute('aria-hidden', 'false');
                    });
                }

                if (index === 0) {
                    _.eq(allSlides, allSlides.length - 1 - _.options.slidesToShow).classList.add('slick-center');
                } else if (index === _.slideCount - 1) {
                    _.eq(allSlides, _.options.slidesToShow).classList.add('slick-center');
                }
            }

            if (_.eq(_slides, index)) {
                _.eq(_slides, index).classList.add('slick-center');
            }
        } else {
            if (index >= 0 && index <= _.slideCount - _.options.slidesToShow) {
                _slidesToShow = _slides.slice(index, index + _.options.slidesToShow);
                _slidesToShow.forEach(function ($myElem) {
                    $myElem.classList.add('slick-active');
                    $myElem.setAttribute('aria-hidden', 'false');
                });
            } else if (allSlides.length <= _.options.slidesToShow) {
                allSlides.forEach(function ($myElem) {
                    $myElem.classList.add('slick-active');
                    $myElem.setAttribute('aria-hidden', 'false');
                });
            } else {
                remainder = _.slideCount % _.options.slidesToShow;
                indexOffset = _.options.infinite === true ? _.options.slidesToShow + index : index;

                if (
                    _.options.slidesToShow == _.options.slidesToScroll &&
                    _.slideCount - index < _.options.slidesToShow
                ) {
                    _slidesToShow = allSlides.slice(
                        indexOffset - (_.options.slidesToShow - remainder),
                        indexOffset + remainder
                    );

                    _slidesToShow.forEach(function ($myElem) {
                        $myElem.classList.add('slick-active');
                        $myElem.setAttribute('aria-hidden', 'false');
                    });
                } else {
                    _slidesToShow = allSlides.slice(indexOffset, indexOffset + _.options.slidesToShow);

                    _slidesToShow.forEach(function ($myElem) {
                        $myElem.classList.add('slick-active');
                        $myElem.setAttribute('aria-hidden', 'false');
                    });
                }
            }
        }

        if (_.options.lazyLoad === 'ondemand') {
            _.lazyLoad();
        }
    };

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
                for (i = 0; i < infiniteCount; i += 1) {
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

    Slick.prototype.interrupt = function (toggle) {
        var _ = this;

        if (!toggle) {
            _.autoPlay();
        }
        _.interrupted = toggle;
    };

    Slick.prototype.selectHandler = function (event) {
        var _ = this;
        var targetElement = _.matches($(event.target)[0], '.slick-slide')
            ? $(event.target)
            : $(event.target).parents('.slick-slide');
        var index = parseInt(targetElement.attr('data-slick-index'));

        if (!index) index = 0;

        if (_.slideCount <= _.options.slidesToShow) {
            _.setSlideClasses(index);
            _.asNavFor(index);
            return;
        }

        _.slideHandler(index);
    };

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

        if (_.slideCount <= _.options.slidesToShow) {
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
                if (dontAnimate !== true) {
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
                if (dontAnimate !== true) {
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

        _.$slider.trigger('beforeChange', [_, _.currentSlide, animSlide]);

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

        if (dontAnimate !== true) {
            _.animateSlide(targetLeft, function () {
                _.postSlide(animSlide);
            });
        } else {
            _.postSlide(animSlide);
        }
    };

    Slick.prototype.startLoad = function () {
        var _ = this;

        if (_.options.arrows === true && _.slideCount > _.options.slidesToShow) {
            _.$prevArrow.hide();
            _.$nextArrow.hide();
        }

        if (_.options.dots === true && _.slideCount > _.options.slidesToShow) {
            _.$dots.hide();
        }

        _.$slider.addClass('slick-loading');
    };

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

    Slick.prototype.swipeEnd = function (event) {
        var _ = this,
            slideCount,
            direction;

        _.dragging = false;
        _.interrupted = false;
        _.shouldClick = _.touchObject.swipeLength > 10 ? false : true;

        if (_.touchObject.curX === undefined) {
            return false;
        }

        if (_.touchObject.edgeHit === true) {
            _.$slider.trigger('edge', [_, _.swipeDirection()]);
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

            if (direction != 'vertical') {
                _.slideHandler(slideCount);
                _.touchObject = {};
                _.$slider.trigger('swipe', [_, direction]);
            }
        } else {
            if (_.touchObject.startX !== _.touchObject.curX) {
                _.slideHandler(_.currentSlide);
                _.touchObject = {};
            }
        }
    };

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

    Slick.prototype.swipeMove = function (event) {
        var _ = this,
            edgeWasHit = false,
            curLeft,
            swipeDirection,
            swipeLength,
            positionOffset,
            touches;

        touches = event.originalEvent !== undefined ? event.originalEvent.touches : null;

        if (!_.dragging || (touches && touches.length !== 1)) {
            return false;
        }

        curLeft = _.getLeft(_.currentSlide);

        _.touchObject.curX = touches !== undefined ? touches[0].pageX : event.clientX;
        _.touchObject.curY = touches !== undefined ? touches[0].pageY : event.clientY;

        _.touchObject.swipeLength = Math.round(Math.sqrt(Math.pow(_.touchObject.curX - _.touchObject.startX, 2)));

        if (_.options.verticalSwiping === true) {
            _.touchObject.swipeLength = Math.round(Math.sqrt(Math.pow(_.touchObject.curY - _.touchObject.startY, 2)));
        }

        swipeDirection = _.swipeDirection();

        if (swipeDirection === 'vertical') {
            return;
        }

        if (event.originalEvent !== undefined && _.touchObject.swipeLength > 4) {
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

    Slick.prototype.unfilterSlides = Slick.prototype.slickUnfilter = function () {
        var _ = this;

        if (_.$slidesCache !== null) {
            var _slidesCache = _.$slidesCache.get(),
                _slideTrack = _.$slideTrack.get(0);

            _.unload();

            var slidesToDetach = _.filterNodeUtil(_slideTrack.children, _.options.slide);

            slidesToDetach.forEach(function (elem) {
                _slideTrack.removeChild(elem);
            });

            _slidesCache.forEach(function (elem) {
                _slideTrack.appendChild(elem);
            });

            _.reinit();
        }
    };

    Slick.prototype.unload = function () {
        var _ = this;

        _.$$slides = _.$slides.get();
        _.$$slider = _.$slider.get(0);
        _.$$dots = _.$dots ? _.$dots.get(0) : false;
        _.$$prevArrow = _.$prevArrow ? _.$prevArrow.get(0) : false;
        _.$$nextArrow = _.$nextArrow ? _.$nextArrow.get(0) : false;
        // $dots, $prevArrow and $nextArrow can be `null` or a `node`

        _.queryAll('.slick-cloned', _.$$slider).forEach(function (elem) {
            _.removeNodeUtil(elem);
        });

        if (_.$$dots) {
            _.removeNodeUtil(_.$$dots);
        }

        if (_.$$prevArrow && _.htmlExpr.test(_.options.prevArrow)) {
            _.removeNodeUtil(_.$$prevArrow);
        }

        if (_.$$nextArrow && _.htmlExpr.test(_.options.nextArrow)) {
            _.removeNodeUtil(_.$$nextArrow);
        }

        _.$$slides.forEach(function (elem) {
            elem.classList.remove('slick-slide', 'slick-active', 'slick-visible', 'slick-current');
            elem.setAttribute('aria-hidden', 'true');
            elem.style.width = '';
        });
    };

    Slick.prototype.unslick = function (fromBreakpoint) {
        var _ = this;
        _.$slider.trigger('unslick', [_, fromBreakpoint]);
        _.destroy();
    };

    Slick.prototype.updateArrows = function () {
        var _ = this,
            centerOffset;

        centerOffset = Math.floor(_.options.slidesToShow / 2);

        if (_.options.arrows === true && _.slideCount > _.options.slidesToShow && !_.options.infinite) {
            var $prevArrow = _.$prevArrow[0],
                $nextArrow = _.$nextArrow[0];

            $prevArrow.classList.remove('slick-disabled');
            $prevArrow.setAttribute('aria-disabled', 'false');
            $nextArrow.classList.remove('slick-disabled');
            $nextArrow.setAttribute('aria-disabled', 'false');

            if (_.currentSlide === 0) {
                $prevArrow.classList.add('slick-disabled');
                $prevArrow.setAttribute('aria-disabled', 'true');
                $nextArrow.classList.remove('slick-disabled');
                $nextArrow.setAttribute('aria-disabled', 'false');
            } else if (_.currentSlide >= _.slideCount - _.options.slidesToShow && _.options.centerMode === false) {
                $nextArrow.classList.add('slick-disabled');
                $nextArrow.setAttribute('aria-disabled', 'true');
                $prevArrow.classList.remove('slick-disabled');
                $prevArrow.setAttribute('aria-disabled', 'false');
            } else if (_.currentSlide >= _.slideCount - 1 && _.options.centerMode === true) {
                $nextArrow.classList.add('slick-disabled');
                $nextArrow.setAttribute('aria-disabled', 'true');
                $prevArrow.classList.remove('slick-disabled');
                $prevArrow.setAttribute('aria-disabled', 'false');
            }
        }
    };

    Slick.prototype.updateDots = function () {
        var _ = this;

        if (_.$dots !== null) {
            var $lis = _.queryAll('li', _.$dots[0]),
                $nextDot = $lis[Math.floor(_.currentSlide / _.options.slidesToScroll)];

            $lis.forEach(function ($myElem) {
                $myElem.classList.remove('slick-active');
                $myElem.setAttribute('aria-hidden', 'true');
            });

            $nextDot.classList.add('slick-active');
            $nextDot.setAttribute('aria-hidden', 'false');

            var $lis = _.queryAll('li', _.$dots[0]),
                $nextDot = $lis[Math.floor(_.currentSlide / _.options.slidesToScroll)];
        }
    };

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

    // Slick utils
    // ===========

    // @param {Object} `out`
    // @return {Object} `out`
    // @usage Slick.extend({}, objA, objB);
    // Equivalent to jQuery.extend()
    Slick.prototype.extend = function (out) {
        out = out || {};

        for (var i = 1; i < arguments.length; i++) {
            if (!arguments[i]) {
                continue;
            }

            for (var key in arguments[i]) {
                if (arguments[i].hasOwnProperty(key)) {
                    out[key] = arguments[i][key];
                }
            }
        }

        return out;
    };

    // @param  {Array}|{NodeList} `collectionOfNode` A collection of node to filter
    // @param  {function}|{cssSelector}|{Node} `filter` The filter param
    // @return {Array} of HTMLElement filtred by `filter`
    // @usage Slick.filterNodeUtil(collectionOfNode, (funtion(elem,index,array){...} | '.my-selector' | node) );
    // Equivalent to jQuery.filter() method, BUT do not support extended jQuery selector https://api.jquery.com/category/selectors/jquery-selector-extensions/
    Slick.prototype.filterNodeUtil = function (collectionOfNode, filter) {
        var _ = this,
            domParent = document.createElement('div'),
            filterFunction;

        if (typeof filter === 'string' && filter) {
            Array.prototype.forEach.call(collectionOfNode, function (elem) {
                if (elem.parentNode === null) {
                    // Needed for matches, if collectionOfNode is out the DOM
                    domParent.appendChild(elem);
                }
            });
            filterFunction = function (elem) {
                return _.matches(elem, filter);
            };
        } else if (filter instanceof HTMLElement) {
            filterFunction = function (elem) {
                return filter === elem;
            };
        } else if (typeof filter === 'function') {
            filterFunction = filter;
        } else {
            filterFunction = function () {
                return true;
            };
        }

        return Array.prototype.filter.call(collectionOfNode, filterFunction);
    };

    // @param  {Array} `elementArray` Array from which to take the element at `index`
    // @param  {Number} `index` index of the element
    // @return {Node} HTMLElement at `index` param || {Boolean} false
    // @usage Slick.eq(myArray, -1); //get the last element of the array
    // Equivalent to jQuery.eq() method
    Slick.prototype.eq = function (elementArray, index) {
        var arrayLength = elementArray.length,
            elementIndexToReturn = 0 + index;
        if (elementIndexToReturn < 0) {
            elementIndexToReturn += arrayLength;
        }
        if (elementIndexToReturn < 0 || elementIndexToReturn >= arrayLength) {
            return false;
        }
        return elementArray[elementIndexToReturn];
    };

    // @param  {Node} `el` The base element
    // @param  {String} `selector` The class, id, data attribute, or tag to look for
    // @return {Boolean} true || false
    // @usage Slick.matches(el, '.my-class');
    // Equivalent to jQuery.is() method
    Slick.prototype.matches = function (el, selector) {
        return el instanceof HTMLElement
            ? (
                  el.matches ||
                  el.matchesSelector ||
                  el.msMatchesSelector ||
                  el.mozMatchesSelector ||
                  el.webkitMatchesSelector ||
                  el.oMatchesSelector
              ).call(el, selector)
            : false;
    };

    // @param  {Node} `el` The base element
    // @param  {String} `selector` The class, id, data attribute, or tag to look for
    // @return {Node} HTMLElement from the `selector` param || {Boolean} false
    // @usage Slick.getClosest(el, '.my-selector');
    // Equivalent to jQuery.closest() method
    Slick.prototype.getClosest = function (el, selector) {
        // Variables
        var initEl = el;
        var firstChar = selector.charAt(0);
        var supports = 'classList' in document.documentElement;
        var attribute, value;

        // If selector is a data attribute, split attribute from value
        if (firstChar === '[') {
            selector = selector.substr(1, selector.length - 2);
            attribute = selector.split('=');

            if (attribute.length > 1) {
                value = true;
                attribute[1] = attribute[1].replace(/"/g, '').replace(/'/g, '');
            }
        }

        // Get closest match
        for (; el && el !== document && el.nodeType === 1; el = el.parentNode) {
            // If selector is a class
            if (firstChar === '.') {
                if (supports) {
                    if (el.classList.contains(selector.substr(1))) {
                        return el;
                    }
                } else {
                    if (new RegExp('(^|\\s)' + selector.substr(1) + '(\\s|$)').test(el.className)) {
                        return el;
                    }
                }
            }

            // If selector is an ID
            if (firstChar === '#') {
                if (el.id === selector.substr(1)) {
                    return el;
                }
            }

            // If selector is a data attribute
            if (firstChar === '[') {
                if (el.hasAttribute(attribute[0])) {
                    if (value) {
                        if (el.getAttribute(attribute[0]) === attribute[1]) {
                            return el;
                        }
                    } else {
                        return el;
                    }
                }
            }

            // If selector is a tag
            if (el.tagName.toLowerCase() === selector) {
                return el;
            }
        }

        return initEl;
    };

    // @param  {Node} `el` The element to remove
    // @return {Node} The element removed.
    // @usage Slick.removeNodeUtil(el);
    Slick.prototype.removeNodeUtil = function (el) {
        var nodeRemoved = el;
        if (el.parentNode) {
            //Prevent error if node is allready out the dom.
            nodeRemoved = el.parentNode.removeChild(el);
        }
        return nodeRemoved;
    };

    // @param  {Node} `el` The base element
    // @return {Number} The outerHeight(true) of the `el` element.
    // @usage Slick.outerHeight(el);
    Slick.prototype.outerHeight = function (el) {
        var height = el.offsetHeight,
            style = getComputedStyle(el),
            marginTop = parseInt(style.marginTop) || 0,
            marginBottom = parseInt(style.marginBottom) || 0;

        height += marginTop + marginBottom;
        return height;
    };

    // @param  {Node} `el` The base element
    // @return {Number} The outerWidth(true) of the `el` element.
    // @usage Slick.outerWidth(el);
    Slick.prototype.outerWidth = function (el) {
        var width = el.offsetWidth,
            style = getComputedStyle(el),
            marginLeft = parseInt(style.marginLeft) || 0,
            marginRight = parseInt(style.marginRight) || 0;

        width += marginLeft + marginRight;
        return width;
    };

    // @param  {Node} `el` The base element
    // @return {Number} The width() of the `el` element.
    // @usage Slick.width(el);
    Slick.prototype.width = function (el) {
        var width = el.offsetWidth,
            style = getComputedStyle(el),
            paddingLeft = parseInt(style.paddingLeft) || 0,
            paddingRight = parseInt(style.paddingRight) || 0,
            borderLeft = parseInt(style.borderLeft) || 0,
            borderRight = parseInt(style.borderRight) || 0;

        width -= paddingLeft + paddingRight + borderLeft + borderRight;
        return width;
    };

    // @param  {Node} `el` The base element
    // @return {Number} The height() of the `el` element.
    // @usage Slick.height(el);
    Slick.prototype.height = function (el) {
        var height = el.offsetWidth,
            style = getComputedStyle(el),
            paddingTop = parseInt(style.paddingTop) || 0,
            paddingBottom = parseInt(style.paddingBottom) || 0,
            borderTop = parseInt(style.borderTop) || 0,
            borderBottom = parseInt(style.borderBottom) || 0;

        height -= paddingTop + paddingBottom + borderTop + borderBottom;
        return height;
    };

    // @param  {Node} `el` The base element
    // @param  {String} `eventType` The event type or name
    // @param  {Object} `eventData` The detail property. Data associated with the event
    // @usage : Slick.triggerEvent(element, 'mousedown', [myBigFatData, 'Hello Goodbye!']);
    Slick.prototype.triggerEvent = function (el, eventType, eventData) {
        var _customEvent;

        if (window.CustomEvent) {
            _customEvent = new CustomEvent(eventType, { detail: eventData });
        } else {
            _customEvent = document.createEvent('CustomEvent');

            _customEvent.initCustomEvent(eventType, true, true, eventData);
        }

        el.dispatchEvent(_customEvent);
    };

    //next function comes almost directly from http://lea.verou.me/2015/04/jquery-considered-harmful/
    Slick.prototype.queryAll = function (expr, container) {
        return Array.prototype.slice.call((container || document).querySelectorAll(expr));
    };

    $.fn.slick = function () {
        var _ = this,
            opt = arguments[0],
            args = Array.prototype.slice.call(arguments, 1),
            l = _.length,
            i,
            ret;
        for (i = 0; i < l; i++) {
            if (typeof opt == 'object' || typeof opt == 'undefined') _[i].slick = new Slick(_[i], opt);
            else ret = _[i].slick[opt].apply(_[i].slick, args);
            if (typeof ret != 'undefined') return ret;
        }
        return _;
    };
});
