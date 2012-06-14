//////////////////////////////////////////////////////////////////////////////////////////
// jQuery.boxFx.js is like a "DOM particles emitter" factory (Beta V0.95 - 19/05/12)
// "Clash the DOM with the most optimized jQuery animations framework on earth" ^^
// GPL/MIT/Copyleft @molokoloco 28/10/2011 - http://b2bweb.fr
// Sources : https://github.com/molokoloco/jQuery.boxFx/
// Download : https://github.com/molokoloco/jQuery.boxFx/downloads/
/////////////////////////////////////////////////////////////////////////////////////////

// And here we go !
(function($, Modernizr, window) {

    // JS Dependancy ?
    if (typeof(Modernizr) != 'object')       alert('$.fn.boxFx require "./js/modernizr(.min).js"'); // Moderniz for Cross browser CSS-Prefix support

    // Does the current browser support CSS Transitions ? We silently fall back ?
    if (!Modernizr.csstransitions)           console.log('Sad, your old browser don\'t support CSS transition');
    //if (!(Modernizr.prefixed('transition'))) alert('$.fn.boxFx require a (modern) browser, sorry...'); // Don't you play ?
    if (!Modernizr.csstransforms3d)          console.log('Sad, your computer don\'t support CSS 3D');

    ///////////////////////////////////////////////////////////////////////////////
    // PUBLIC : default plugin properties
    ///////////////////////////////////////////////////////////////////////////////
    // See "./js/jquery.boxFx.presets-full-options.js" for FULL options arguments list
    // Options above a setted to the minimal, they makes things works when no values are provided
    // Particules seeds are 'options.seeds' or 'options.targets'...

    var _db_ = !!('console' in window) && false; // Activate boxFx debug logs ?

    $.boxFxOptions = {                       // $.emitter() defaults params Object
        seeds                 : '<div/>',    // '<tag/>' OR '<div class="test">N°{id} - {title}</div>' // Generated DOM element with or without template...
        targets               : null,        // 'img.thumb' // ... OR existing elements inside this container
                                             // options.seeds OR options.targets can have (dynamic) innerHtml template : {mapped} with some datas
        data                  : null,        // [{id:1, title:'toto'}, {}] OR 'callback' : callback(currentIndex) (Check JSONP example preset)
        styles2Class          : true,        // Convert styles to 'class' in <head> instead of dealing in the DOM, for each elements : Cannot be "live" edited
        clss                  : null,        // Custom CSS static (starting) class, default : null (Cf. $.boxFxOptions.styles)
        //perspective         : null,        // 500px // if seeds 'options.styles.webktiTransformStyle' == 'preserve-3d', apply perspective to seeds container

                                             // Optionnal boxFx TYPE : elements iterator, with or without "dispatching effect"
        effect                : null,        // nebula, artifice, center, '' or null // Add your custom effect !
        emitterRadius         : 0,           // 10, '10px' or '50%' // Radius of the boxFx inside the boxFx
        emitterCenterLeft     : null,        // 10, '10px' or '50%' // Seeder position, default to center (50%)
        emitterCenterTop      : null,
        delay                 : null,        // 1500, 0, null // time (ms) interval between seeds // 0 use requestAnimationFrame (as fast as possible) // 'null' : defaut to slowest anim
        maxSeeds              : null,        // Max "seeds" at one moment // Overrided by 'options.targets.length' if setted // else by default == 'options.transition.duration / options.delays'
        newAtTop              : 'random',    // 'random' OR bolean // New element appear in top of others ?
        stopAtEnd             : false,       // true, false, 'detach' // option "detach" to remove element after transitionEnd, false regenerate elements forever, true stop...

        // Pure CSS3 styles, cross-browser compatibility added when possible with modernizr.js
        // Can be overriden by options.effect && options.transition.stylesTo
        // Every CSS property allowed, see ./js/jquery.boxFx.presets.js for examples
        styles                : null,
        // Nb : You cannot animate two times the same property eg. 'options.transition.stylesTo.width' and 'options.keyframes[0].steps[0].width'
        // But, for example, you can move 1 times the seed with 'options.transition.stylesTo.left'
        // ...and do an infinite rotation in 'options.keyframes[x].steps[x].transform'
        transition            : null,        // By default no transition
        keyframes             : null         // By default no keyframes animation(s)
    };

    // If no starting class 'options.clss' and no 'options.styles' is given, fallback to these minimal settings...
    $.boxFxOptions.defaultStyles = {
        position              : 'absolute',
        display               : 'block',
        zIndex                : 500,
        width                 : 50,
        height                : 50,
        backgroundColor       : 'rgb(255, 255, 0)' // Something visible by default
    };

    // If 'options.effect' but no 'options.transition' is set... default transition
    $.boxFxOptions.defaultTransition = {     // In 'options.transition' The 3 arguments below must be sets
        properties            : 'all',
        duration              : '2500ms',
        timingFunction        : 'ease',
        stylesTo              : null         // A CSS object
    };

    // If 'options.keyframe' but miss a value... Default keyframes animation properties "boxFxAnim1320799702670 1500ms linear 0 infinite alternate"
    $.boxFxOptions.defaultKeyframes = [{     // The 7 arguments below must be sets // http://coding.smashingmagazine.com/2011/05/17/an-introduction-to-css3-keyframe-animations/
        name                  : null,        // auto-generated
        duration              : '3000ms',
        timingFunction        : 'ease',
        delay                 : 0,
        iterationCount        : 'infinite',    // 0, 1, 2, ..., infinite
        direction             : 'alternate',  // normal, alternate
        fillMode              : 'both',
        steps                 : []           // Default 'from'/'to' steps [{step: '0%', prop:''}, {step:'100%', prop:''}]
    }];
    
    $.boxFxSeeds = {}; // NameSpace // Containing all sets of seeds for each box
    
    ///////////////////////////////////////////////////////////////////////////////
    // $.boxFx() jQuery plugin !!! Each time you read... YOU CAN ENHANCE ^^
    ///////////////////////////////////////////////////////////////////////////////

    $.fn.boxFx = (function(options) {
        if (_db_)  console.log('$.fn.boxFx(options)', options); // Debug with console.log

        // Deep merge options with defaut
        options = $.extend(true, {}, $.boxFxOptions, options); // jQuery.extend([deep], target, object1 [, objectN])

        return this.each(function() {

            var $canvas     = $(this),       // This is the BOX element for witch the plugin apply
                FX          = {},            // boxFx properties
                S           = {};            // Seeds properties

            ///////////////////////////////////////////////////////////////////////////////
            // PUBLIC // Externals methods // $canvas.bind(publicMethods) : $canvas.trigger('play')
            ///////////////////////////////////////////////////////////////////////////////

            var publicMethods = {
                start: function() {
                    if (_db_) console.log('$.boxFx.trigger.start()');
                    privateMethods.initFx();
                    privateMethods.configSetupFix();
                    publicMethods.play();
                },
                play: function() {
                    if (_db_) console.log('$.boxFx.trigger.play()');
                    setTimeout(function() {  // Be sure all dom manip is over...
                        if (options.keyframes && (FX.id in $.boxFxSeeds)) { // Un-pause
                            var i = $.boxFxSeeds[FX.id].length;
                            while(i--) {
                                if ($.boxFxSeeds[FX.id][i] && $.boxFxSeeds[FX.id][i].length > 0)
                                    $.boxFxSeeds[FX.id][i].crossCss({animationPlayState:'running'}); // Continue
                            }
                        }
                        FX.render = true;
                        publicMethods.newSeed();
                    }, 0);
                },
                // Call it to emit one seed at a time (must stop all before)
                newSeed: function() {
                    if (_db_) console.log('$.boxFx.trigger.newSeed()');
                    addSeed();               // Call factory
                },
                // Pause : for animations keyframes
                pause: function() {
                    if (_db_) console.log('$.boxFx.trigger.pause()');
                    if (options.keyframes && (FX.id in $.boxFxSeeds)) {
                        var i = $.boxFxSeeds[FX.id].length;
                        while (i--) {
                            if ($.boxFxSeeds[FX.id][i] && $.boxFxSeeds[FX.id][i].length > 0)
                                $.boxFxSeeds[FX.id][i].crossCss({animationPlayState:'paused'});
                        }
                    }
                },
                // Stop emitter
                stop: function() {
                    if (_db_) console.log('$.boxFx.trigger.stop()');
                    FX.render = false;       // if requestAnimFrame
                    if (FX.timer) clearTimeout(FX.timer); // if setTimeout Kill factory
                    FX.timer = null;
                    publicMethods.pause();
                },
                // Stop & clear elements stack & options
                reset: function() {
                    if (_db_) console.log('$.boxFx.trigger.reset()');
                    publicMethods.stop();
                    if (!(FX.id in $.boxFxSeeds)) return;
                    var i = $.boxFxSeeds[FX.id].length;
                    while(i--) {
                        if (options.targets) { // Existing elements ?
                            $.boxFxSeeds[FX.id][i]
                                .html($.data($.boxFxSeeds[FX.id][i], 'template')) // Refill
                                .removeData();
                            if (!($.contains($.boxFxSeeds[FX.id][i], $canvas))) { // re-attach()
                                 $.boxFxSeeds[FX.id][i].appendTo($canvas);
                            }
                        }
                        else { // Generated elements ?
                            if ($.boxFxSeeds[FX.id][i] && $.boxFxSeeds[FX.id][i].length > 0) {
                                $.boxFxSeeds[FX.id][i].empty().remove(); // Clean DOM
                            }
                        }
                        delete $.boxFxSeeds[FX.id][i]; // Clean Obj // TO CHECK !!!! TODO 
                    }
                    delete $.boxFxSeeds[FX.id];
                },
                // Update somes values in the current options
                update: function(event, newOptions) { // $boxFx1.trigger('update', [{prop:val,...}]);
                    if (_db_) console.log('$.boxFx.trigger.update()', newOptions);
                    if (!newOptions || $.isEmptyObject(newOptions)) return;
                    // Deep merge options with current (ex. options.styles)
                    options = $.extend(true, {}, options, newOptions);
                    privateMethods.configSetupFix();
                },
                // Regenedelay boxFx : update ALL values, remerge with default
                setOptions: function(event, newOptions) { // $boxFx1.trigger('update', [{prop:val,...}]);
                    if (_db_) console.log('$.boxFx.trigger.setOptions()', newOptions);
                    if (!newOptions || $.isEmptyObject(newOptions)) return;
                    publicMethods.reset(); // If seed HTML is modified, must clear old ones
                    setTimeout(function() {
                        options = $.extend(true, {}, $.boxFxOptions, newOptions);
                        publicMethods.start();
                    }, 0);
                },
                // Global seeds object, with all the seeds and states
                getSeeds: function() {
                    return $.boxFxSeeds[FX.id];
                }
            };

            ///////////////////////////////////////////////////////////////////////////////
            // PRIVATES...
            ///////////////////////////////////////////////////////////////////////////////

            var privateMethods = {
                ///////////////////////////////////////////////////////////////////////////////
                // Internals boxFX mains properties
                initFx: function() {
                    if (_db_) console.log('initFx()');
                    
                    FX                    = {};
                    S                     = {};
                    FX.render             = true; // Continuous requestAnimation ?
                    FX.timer              = null; // setInterval ?
                    FX.id                 = $.getUniqueName('boxFx'); // boxFx element unique ID
                    FX.currentData        = 0;
                    FX.targets            = null;
                    FX.transitionDuration = 0;
                    FX.keyframesDuration  = 0;
                    $.boxFxSeeds[FX.id]   = [];  // Global unique nameSpace to stock all seeds $element

                    // Existing elements ? detach() from DOM before working on it
                    if (options.targets) {
                        $(options.targets).each(function(index) {
                            $.boxFxSeeds[FX.id][index] = $(this).detach();
                            if (!options.template && options.data) {
                                 $.data($.boxFxSeeds[FX.id][index], 'template', $.boxFxSeeds[FX.id][index].html()); // inline tpl ?
                                 $.boxFxSeeds[FX.id][index].html(''); // Reset
                            }
                        });
                    }
                },
                ///////////////////////////////////////////////////////////////////////////////
                // Some "logics" for DEFAULT SETUP and CLEANNUP of the settings values...
                // I know this part of the code i weird. But i don't know 1000 solutions to do "smarts settings"
                configSetupFix: function() {
                    if (_db_) console.log('configSetupFix()', options);

                    FX.canvasW = parseInt($canvas.width(), 10);
                    FX.canvasH = parseInt($canvas.height(), 10);

                    // Transform keyframes obj to usable CSS animation(s)
                    if (options.keyframes) {
                        // Execute functions if we've got some dyn properties in keyframes steps styles
                        $.each(options.keyframes, function(k, val) {
                            $.each(val.steps, function(k2, val2) {
                                $.each(val2, function(k3, val3) {
                                    if (typeof val3 == 'function') // Execute fct
                                        options.keyframes[k].steps[k2][k3] = options.keyframes[k].steps[k2][k3].call(/* S.index */); // No index for keyframes
                                });
                            });
                        });
                        // Overwrite some minimal default settings
                        options.keyframes = $.extend(true, {}, options.defaultKeyframes, options.keyframes);
                        // Get css "obj" with 'animation' et 'animationFillMode'
                        // All properties are inserted in STATIC CSS class, inside <head>
                        options.animationsClss = $.buildKeyframeClass(options.keyframes);
                    }

                    // Extract template ?
                    if (options.seeds && !options.template && options.data) {
                        options.template = $(options.seeds).html();
                        $(options.seeds).html(''); // Reset
                    }

                    // Default styles ? if nothing (no style, no class)
                    if (!options.styles && !options.clss)
                        options.styles = $.extend({}, options.defaultStyles); // Some CSS that print something
                    if (options.styles)
                        $.removeObjEmptyValue(options.styles);

                    // Default class ?
                    if (!options.clss && options.seeds)
                        options.clss = $(options.seeds).attr('class');
                    else if (!options.clss)
                        options.clss = $(options.targets).eq(0).attr('class');

                    if (options.effect) {
                        if (!options.styles)
                            options.styles = {};
                        if (!options.styles.zIndex && options.styles.zIndex !== 0)
                            options.styles.zIndex = options.defaultStyles.zIndex; // 500...
                        if (!options.styles.position)
                            options.styles.position = 'absolute';
                        // Effects generaly need seed width, at least
                        if (!options.styles.width && !options.targets) {
                            var $fake = $(options.seed).css(options.styles).addClass(options.clss).appendTo($canvas);
                            options.styles.width = $fake.width();
                            $fake.remove();
                        }
                    }
                    
                    // CSS Transition ?
                    if (options.effect && !options.transition)
                        options.transition = {};
                    if (options.transition) {
                         options.transition = $.extend(true, {}, options.defaultTransition, options.transition); // fill undefined transition properties ?
                         //if (!options.transition.properties) // Fail with boxShadow > mozBoxShadow // So default == 'all'
                             //options.transition.properties = Object.keys(options.transition.stylesTo).join(',');
                         // APPLY TRANSITION to ending CSS
                         if (!options.transition || !options.transition.stylesTo) options.transition.stylesTo = {};
                         // Convert options.transition config to true style definition
                         options.transition.stylesTo.transition = options.transition.properties+' '+options.transition.duration+' '+options.transition.timingFunction;
                    }

                    // With transition want to stop at the end, with effect or keyframes, forever ?
                    if (options.transition && !options.effect && !options.maxSeeds)
                        options.stopAtEnd = true;

                    //if (options.styles && options.styles2Class)
                        //options.stylesClss = $.buildStyleClass(options.styles);

                    // Fix some time units, and grad a default duratio
                    if (options.transition && options.transition.duration)
                        FX.transitionDuration = $.getMsDuration(options.transition.duration); // convert in ms
                    if (options.keyframes && options.keyframes[0].duration)
                        FX.keyframesDuration = $.getMsDuration(options.keyframes[0].duration); // convert in ms
                    // Default delay ? take the slowest effect...
                    if (!options.delay && options.delay !== 0)
                        options.delay = (FX.transitionDuration > FX.keyframesDuration ? FX.transitionDuration : FX.keyframesDuration);

                    // Extract clss ans clssTo duration : intro/outro ("fadeIn fast", "bounceOut slow", ...)
                    options.animationIntroDuration = 0;
                    options.animationOutroDuration = 0;
                    if (options.clss) {
                        var $fake = $('<div/>').addClass(options.clss).appendTo('body');
                        options.animationIntroDuration = $.getMsDuration($fake.css('-'+$.browserPrefix+'-animation-duration'));
                        if (options.transition && options.transition.clssTo) {
                            $fake.removeClass(options.clss).addClass(options.transition.clssTo);
                            options.animationOutroDuration = $.getMsDuration($fake.css('-'+$.browserPrefix+'-animation-duration'));
                        }
                        $fake.remove();
                    }

                    // MaxSeeds ?
                    if (options.targets) { // Force options.maxSeeds to be the same
                        FX.targets = $(options.targets).hide(); // Cache and hide targets ...
                        options.maxSeeds = FX.targets.length;
                    }
                    else if (!options.maxSeeds && options.data && typeof options.data != 'function' && options.data.length) {
                        options.maxSeeds = options.data.length;
                    }
                    else if (!options.maxSeeds && options.transition) { // TODO check if duration in 's' or 'ms' !!!
                        if (options.delay < 1) options.maxSeeds = parseFloat(options.transition.duration); // hum.......
                        else options.maxSeeds = parseFloat(options.transition.duration) / options.delay;
                    }

                    if (!options.maxSeeds || options.maxSeeds < 1) options.maxSeeds = 1; // If user specify nothing... One seed element...
                    else if (options.maxSeeds > 1000) options.maxSeeds = 1000; // Security : do not do DOM bombing ^^
                    
                    // In 'options.styles', sizes can be setted in "px" or "%"
                    // The plugin deal with numbers (int/float). "px" and "%" units are converted and stripped
                    // options.styles.width = '50%' >>> options.styles.width = '250' // 250 (half parent size, in pixels)
                    if (options.styles)
                        $.fixCssUnit(options.styles, FX.canvasW, FX.canvasH);
                    if (options.transition && options.transition.stylesTo) // !!! So.. before applying back CSS, units must be re-appended
                        $.fixCssUnit(options.transition.stylesTo, FX.canvasW, FX.canvasH);

                    // Convert % or px to (int) - working with this values in effects...
                    if (options.emitterRadius)
                        options.emitterRadius      = $.getSize(options.emitterRadius, FX.canvasW);

                    // and emite from the center of the box by default
                    if (!options.emitterCenterLeft && options.emitterCenterLeft !== 0)
                         options.emitterCenterLeft = FX.canvasW / 2;
                    else options.emitterCenterLeft = $.getSize(options.emitterCenterLeft, FX.canvasW);
                    if (!options.emitterCenterTop && options.emitterCenterTop !== 0)
                         options.emitterCenterTop  = FX.canvasH / 2;
                    else options.emitterCenterTop  = $.getSize(options.emitterCenterTop, FX.canvasH);
                },
                ///////////////////////////////////////////////////////////////////////////////
                // Generate default starting CSS obj
                getCssStart: function() {
                    // if (_db_) console.log('getCssStart()');

                    if (FX.targets && FX.targets.length > 0) {
                        if (!options.styles.width && options.styles.width !== 0)
                            options.styles.width  = parseInt(FX.targets.eq(S.index || 0).width(), 10);
                        if (!options.styles.height && options.styles.height !== 0)
                            options.styles.height = parseInt(FX.targets.eq(S.index || 0).height(), 10);
                    }

                     if (!options.effect && options.styles) // Seed minimal CSS object, clone a copy of options.styles for further manips
                        return $.extend({}, options.styles);

                    if (!options.styles.width && options.styles.width !== 0) {
                        console.log('Config. error, need at least options.styles.width to be setted');
                        options.styles.width = options.styles.height = 0;
                    }

                    // Starting CSS for seed, add element inside (default centered) boxFx radius
                    // options.styles interresting properties are already integer values (cf. "$.fixCssUnit()") : no "px" or "%"
                    var css = {};
                    css.width         = (options.styles.maxSize || options.styles.maxSize === 0 ? // Randomize ?
                                         $.getRand(options.styles.width, options.styles.maxSize) :
                                         options.styles.width);
                    css.height        = (options.styles.height || options.styles.height === 0 ?
                                        (options.styles.maxSize || options.styles.maxSize === 0 ?
                                         $.getRand(options.styles.height , options.styles.maxSize) : // Randomize
                                         options.styles.height) : css.width);
                    // Randomize z-index ?
                    css.zIndex        = (options.newAtTop == 'random' ?
                                         $.getRand(options.styles.zIndex, options.styles.zIndex + options.maxSeeds) :
                                        (options.newAtTop ? options.styles.zIndex++ : options.styles.zIndex--) ); // !!! if < 0 ^^

                    // Seed minimal CSS object
                    return $.extend({}, options.styles, { // Processed params merge with config
                        // No anim
                        zIndex      : css.zIndex,
                        // Animatable
                        width       : css.width,
                        height      : css.height // ...
                    });
                },
                ///////////////////////////////////////////////////////////////////////////////
                // Generate default ending CSS obj
                getCssEnd: function(cssStart) {
                    // if (_db_) console.log('getCssEnd()');
                    if (!options.transition || !options.transition.stylesTo) // Seed minimal ending CSS object ?
                        return {};
                    else if (!options.effect)
                        return $.extend({}, options.transition.stylesTo); // clone a copy

                    // If 'options.effect' used....
                    var css = {};
                    css.width  = cssStart.width;  // Keep same sizes by default
                    css.height = cssStart.height;

                    // Effect endind CSS maxWidth for seed
                    if (options.transition.stylesTo.width || options.transition.stylesTo.width === 0) { // Or let the start size
                        css.width         = (options.transition.stylesTo.maxSize || options.transition.stylesTo.maxSize === 0 ?
                                             $.getRand(options.transition.stylesTo.width, options.transition.stylesTo.maxSize) :
                                             options.transition.stylesTo.width);
                        css.height        = css.width;
                    }
                    if (options.transition.stylesTo.height || options.transition.stylesTo.height === 0) { // Or let the start size
                        css.height        = (options.transition.stylesTo.maxSize || options.transition.stylesTo.maxSize === 0 ?
                                             $.getRand(options.transition.stylesTo.height, options.transition.stylesTo.maxSize) :
                                             options.transition.stylesTo.height);
                    }

                    // Seed minimal CSS object
                    return $.extend({}, options.transition.stylesTo, {
                        width        : css.width,
                        height       : css.height
                   });
                },
                ///////////////////////////////////////////////////////////////////////////////
                // Apply CSS on the element
                applyCssStart: function(name_, index_, cssStart_) {
                    // if (_db_) console.log('applyCssStart()', cssStart_);
                    if (cssStart_) {
                        $.addCssUnit(cssStart_); // Set back 'px' units // Sometimes does not need a REDOO ???
                        $.boxFxSeeds[name_][index_].crossCss(cssStart_); // Custom style // Cross-browsers CSS+
                    }
                    if (options.clss)
                        $.boxFxSeeds[name_][index_].addClass(options.clss); // User custom Class ?
                    if (options.animationsClss) // can trigger an animation (Cf. slideLeft, etc)
                        $.boxFxSeeds[name_][index_].crossCss(options.animationsClss); // APPLY generated CSS keyframe anim ?
                    if ($.boxFxSeeds[name_][index_].css('display') == 'none') // Previously hidden ?
                        $.boxFxSeeds[name_][index_].css({display:''});
                },
                ///////////////////////////////////////////////////////////////////////////////
                // Apply ending CSS styles (Apply transition at this moment)
                applyCssEnd: function(name_, index_, cssEnd_) {
                    // if (_db_) console.log('applyCssEnd(name_, index_, cssEnd_)', name_, index_, cssEnd_);
                    if (!name_ || !(name_ in $.boxFxSeeds) || !(index_ in $.boxFxSeeds[name_]))
                        return; // When killing app, in case some events end after (timeout)
                    if (cssEnd_) {
                        $.addCssUnit(cssEnd_); // Set back 'px'
                        $.boxFxSeeds[name_][index_].crossCss(cssEnd_);
                    }
                },
                ///////////////////////////////////////////////////////////////////////////////
                // Apply ending CSS class
                applyClssEnd: function(name_, index_) {
                    // if (_db_) console.log('applyClssEnd()');
                    if (!name_ || !(name_ in $.boxFxSeeds) || !(index_ in $.boxFxSeeds[name_]))
                        return; // When killing app, in case some events end after (timeout)
                    if (options.clss)
                        $.boxFxSeeds[name_][index_].removeClass(options.clss); // Start class
                    if (options.transition && options.transition.clssTo)
                        $.boxFxSeeds[name_][index_].addClass(options.transition.clssTo);
                },
                ///////////////////////////////////////////////////////////////////////////////
                // Apply ending CSS or ending class
                fireEndStyles: function(data) {
                    // if (_db_) console.log('fireEndStyle', data);
                    privateMethods.applyCssEnd(data.name, data.index, data.cssEnd);  // Pass new css + apply trans
                    var duration = (options.transition ? parseInt(options.transition.duration, 10) : 0);
                    if (options.animationOutroDuration > 0 && duration > 0) {
                        // we trigger "options.transition.clssTo" before the end of the transition,
                        // "options.transition.clssTo:'fade fast'" will end at the same time than the transition
                        setTimeout(function(data_) {
                            privateMethods.applyClssEnd(data_.name, data_.index); // APPLY Class
                        }, (duration - options.animationOutroDuration), data);
                    }
                    else privateMethods.applyClssEnd(data.name, data.index); // immediatly
                }
            };

            ///////////////////////////////////////////////////////////////////////////////
            // Create new element (private main method)
            ///////////////////////////////////////////////////////////////////////////////

            var addSeed = function() {
                // console.log('addSeed', '$.boxFxSeeds', $.boxFxSeeds, 'FX.id', FX.id);

                if (!FX.render) return;
                //if (!(FX.id in $.boxFxSeeds)) $.boxFxSeeds[FX.id] = [];

                // Did we got a element that is not in use in our Array ?
                S.index = -1;
                for (var i = 0; i < options.maxSeeds; i++) { // Check elements stack
                    if (!$.boxFxSeeds[FX.id][i] || !$.data($.boxFxSeeds[FX.id][i], 'inUse')) {
                        S.index = i; // Find an empty place
                        break;
                    }
                }

                if (_db_ && options.maxSeeds < 10 && options.delay > 0) // ! Flood ? ;)
                    console.log('addSeed() - S.index', S.index);

                if (S.index >= 0) { // Create or manage a seed

                    // SPRITE CSS ///////////////////////////////////////////////////////////////////////
                    // Generate S.cssStart & S.cssEnd CSS obj with default properties
                    // CSS properties relative to size ("px" / "%") are converted to int : Cf. "$.fixCssUnit()"
                    S.cssStart = privateMethods.getCssStart();
                    S.cssEnd   = privateMethods.getCssEnd(S.cssStart);

                    // Execute functions if we've got some dyn properties "per/each/element" in styles
                    if (options.styles) {
                        // Ex. : options.styles.transform = function(index) { return 'rotate('+(20 - (Math.random()*40))+'deg)'; }
                        $.each(options.styles, function(k, val) {
                            if (val && typeof val == 'function')
                                S.cssStart[k] = options.styles[k].call(S.index);
                        });
                    }
                    if (options.transition && options.transition.stylesTo) {
                        $.each(options.transition.stylesTo, function(k, val) {
                            if (val && typeof val == 'function')
                                S.cssEnd[k] = options.transition.stylesTo[k].call(S.index);
                        });
                    }

                    ///////////////////////////////////////////////////////////////////////////////
                    // SPRITE EFFECTS (CSS OVERWRITE)
                    // Animate seeds in the pseudo canvas, with the help of CSS transition
                    // Seeds are created within boxFx center radius and 'options.effect' CAN dispatch them - override default CSS

                    switch(options.effect) {
                         case 'center':      // Keep centered, with random elements size, center is not the same for all
                            // For start
                            S.cssStart.left         = options.emitterCenterLeft;
                            S.cssStart.top          = options.emitterCenterTop;
                            S.cssStart.marginLeft   = (-(S.cssStart.width / 2) + $.getRand(-options.emitterRadius, options.emitterRadius));
                            S.cssStart.marginTop    = (-(S.cssStart.height / 2) + $.getRand(-options.emitterRadius, options.emitterRadius));
                            // For end
                            S.cssEnd.marginLeft     = -S.cssEnd.width / 2;
                            S.cssEnd.marginTop      = -S.cssEnd.height / 2;
                        break;
                        case 'artifice':     // Seeds end Inside the border of the box container
                                             // Seeds are placed with left top on the boxFx and centered / moved with margins
                            S.cssStart.left         = options.emitterCenterLeft;
                            S.cssStart.top          = options.emitterCenterTop;
                            S.cssStart.marginLeft   = (-(parseInt(S.cssStart.width, 10) / 2) + $.getRand(-options.emitterRadius, options.emitterRadius));
                            S.cssStart.marginTop    = (-(parseInt(S.cssStart.height, 10) / 2) + $.getRand(-options.emitterRadius, options.emitterRadius));

                            S.marginLeftMin         = -options.emitterCenterLeft;
                            S.marginTopMin          = -options.emitterCenterTop;
                            S.marginLeftMax         = FX.canvasW - options.emitterCenterLeft - parseInt(S.cssEnd.width, 10);
                            S.marginTopMax          = FX.canvasH - options.emitterCenterTop - parseInt(S.cssEnd.height, 10);

                            if (Math.random() > 0.5) {
                                S.cssEnd.marginLeft = $.getRand(S.marginLeftMin, S.marginLeftMax);
                                S.cssEnd.marginTop  = (Math.random() < 0.5 ? S.marginTopMin : S.marginTopMax);
                            }
                            else {
                                S.cssEnd.marginLeft = (Math.random() < 0.5 ? S.marginLeftMin : S.marginLeftMax);
                                S.cssEnd.marginTop  = $.getRand(S.marginTopMin, S.marginTopMax);
                            }
                        break;
                        case 'nebula':       // Seeds end Outside the border of the box container
                                             // Seeds are placed with left top on the boxFx and centered / moved with margins
                            S.cssStart.left         = options.emitterCenterLeft;
                            S.cssStart.top          = options.emitterCenterTop;
                            S.cssStart.marginLeft   = (-(S.cssStart.width / 2) + $.getRand(-options.emitterRadius, options.emitterRadius));
                            S.cssStart.marginTop    = (-(S.cssStart.height / 2) + $.getRand(-options.emitterRadius, options.emitterRadius));

                            S.marginLeftMin         = -options.emitterCenterLeft - S.cssEnd.width;
                            S.marginTopMin          = -options.emitterCenterTop - S.cssEnd.height;
                            S.marginLeftMax         = FX.canvasW - options.emitterCenterLeft;
                            S.marginTopMax          = FX.canvasH - options.emitterCenterTop;
                            if (Math.random() > 0.5) {
                                S.cssEnd.marginLeft = $.getRand(S.marginLeftMin, S.marginLeftMax);
                                S.cssEnd.marginTop  = (Math.random() < 0.5 ? S.marginTopMin : S.marginTopMax);
                            }
                            else {
                                S.cssEnd.marginLeft = (Math.random() < 0.5 ? S.marginLeftMin : S.marginLeftMax);
                                S.cssEnd.marginTop  = $.getRand(S.marginTopMin, S.marginTopMax);
                            }
                        break;

                        case 'circalize':       // TODO // cf. http://jsfiddle.net/molokoloco/EG8m7/
                        break;
                        
                        case 'gravity':
                        break;
                        
                        case 'YourEffect':   // !!! plenty of  properties...
                        break;
                                             // If used with position:relative or display:inline/block we can
                        default:             // just let elements push others, without any effects/positions...
                        break;
                    }

                    ///////////////////////////////////////////////////////////////////////////////
                    // SEED creation

                    // CREATE a new seed element ? $.boxFxSeeds['boxFx78589996'][0] is a $() element
                    if (!$.boxFxSeeds[FX.id][S.index] || $.boxFxSeeds[FX.id][S.index].length < 1)
                        $.boxFxSeeds[FX.id][S.index] = $(options.seeds); // First time init

                    // (RE)FIll HTML with DATA ? (options.targets previously stocked innerHTML)
                    S.template = (options.template ? options.template : $.data($.boxFxSeeds[FX.id][S.index], 'template') ); //
                    if (S.template) {
                        if (typeof options.data == 'function') {
                            // Call callback 'options.data' with current index (index is not ordened)
                            // Ex. : http://jsfiddle.net/molokoloco/Ebc27/ and here ./js/jquery.boxFx.presets.js
                            var self = {seed:$.boxFxSeeds[FX.id][S.index], template:S.template};
                            // "done()" can be call some seconds after, so we must pass argument to keep context
                            $.when(options.data(self)).done(function updateElement(_self, data) { // Call and wait deferred
                                _self.seed.html($.getTpl(_self.template, data));
                            });
                        }
                        else {
                            if (options.data && options.data.length) { // 'string' is also an object ! (feature ;)
                                S.data = options.data[FX.currentData];
                                if (FX.currentData < (options.data.length - 1)) FX.currentData++; // Iterate data in a loop
                                else FX.currentData = 0;
                            }
                            // Update innerHTML
                            S.template = (S.data ? $.getTpl(S.template, S.data) : S.template); // Inject some content ?
                            $.boxFxSeeds[FX.id][S.index].html(S.template);
                        }
                    }

                    // Pass current element to the event context object
                    var eventObjContext = {
                        name        : FX.id,
                        index       : S.index,
                        cssEnd      : S.cssEnd
                    };
                    
                    // Listen seed animationStart event
                    $.boxFxSeeds[FX.id][S.index].bind($.animationStart, eventObjContext, function animStart(event) { // Check "./tool.js" for "$.animationStart" property
                        // if (_db_) console.log($.animationStart);
                        if (!event.data.name || !(event.data.name in $.boxFxSeeds) || !(event.data.index in $.boxFxSeeds[event.data.name]))
                            return;
                        var Se = $.boxFxSeeds[event.data.name][event.data.index]; // $(this) is not the element
                        Se.unbind($.animationStart);
                        $.data(Se, 'isAnimated', 1);
                    });

                    // Todo add support for animation iterations ! We cut at the end of the first loop
                    $.boxFxSeeds[FX.id][S.index].bind($.animationEnd, eventObjContext, function animEnd(event) {
                        // if (_db_) console.log($.animationEnd, event);
                        if (!event.data.name || !(event.data.name in $.boxFxSeeds) || !(event.data.index in $.boxFxSeeds[event.data.name]))
                            return;
                        var Se = $.boxFxSeeds[event.data.name][event.data.index];
                        Se.unbind($.animationEnd);
                        $.data(Se, 'isAnimated', 0); // Finish
                        if (options.animationIntroDuration > 0 || !options.keyframes  || (!options.transition && options.keyframes)) 
                            Se.trigger($.transitionEnd); // FWD event // Re-call (skipped) transitionEnd
                    });

                    // Wait the end event of CSS transition : transitionend || webkitTransitionEnd ...
                    $.boxFxSeeds[FX.id][S.index].bind($.transitionEnd/*'webkitTransitionEnd oTransitionEnd transitionend'*/, eventObjContext, function transEnd(event) {
                        // if (_db_) console.log($.transitionEnd, event);
                        if (!event.data.name || !(event.data.name in $.boxFxSeeds) || !(event.data.index in $.boxFxSeeds[event.data.name]))
                            return;
                        var Se = $.boxFxSeeds[event.data.name][event.data.index];
                        if ((options.animationIntroDuration > 0 || !options.keyframes) && $.data(Se, 'isAnimated'))
                             return;
                        privateMethods.fireEndStyles(event.data);
                        Se.unbind($.transitionEnd);      // $(this).unbind do not work ?
                        if (!options.stopAtEnd) {        // Hide element until re-use ?
                            setTimeout(function(S) {     // Let the fireEndStyle apply
                                $.data(S, 'inUse', 0);   // Release element
                                S.detach()               // Remove from DOM
                                  .attr('style', '');    // Reset all styles (& transition)
                                if (options.transition && options.transition.clssTo) S.removeClass(options.transition.clssTo);
                                if (options.animationsClss) S.removeClass(options.animationsClss);
                            }, 0, Se);
                        }
                        else if (options.stopAtEnd == 'detach') {
                            Se.detach()                // Remove from DOM
                              .attr('style', '');      // Reset all styles (& transition)
                            if (options.transition && options.transition.clssTo) Se.removeClass(options.transition.clssTo);
                            if (options.animationsClss) Se.removeClass(options.animationsClss);
                        }
                    });

                    // SET STYLES a CLASS
                    privateMethods.applyCssStart(FX.id, S.index, S.cssStart); // Styles and Class and Animation Keyframes

                    // (re)attach to DOM (manipulations are done outside)
                    $.boxFxSeeds[FX.id][S.index].appendTo($canvas);
                    // Debug Styles ?
                    // console.log('FX', FX, 'S', S); console.log('S.cssStart', S.cssStart, 'S.cssEnd', S.cssEnd); return;

                    // In use now !
                    $.data($.boxFxSeeds[FX.id][S.index], 'inUse', 1);

                    // If someone outside want to catch our event particule before it move...
                    $canvas.trigger('emit', [$.boxFxSeeds[FX.id][S.index]]); //> $canvas.bind('emit', function(e, $seed) {});

                    // CSS3 animationStarted event trigger with a delay of 25/30 milliseconds
                    // http://stackoverflow.com/questions/8428838/css3-animationstarted-event-trigger-with-a-delay-of-25-30-milliseconds
                    // Eg. : http://jsfiddle.net/molokoloco/yvTje/
                    // So in configSetupFix i put a fake div and calculate some duration for keyframes anim
                    if (options.animationIntroDuration < 1 || options.keyframes) { //  || !$.data($.boxFxSeeds[context.name][context.index], 'isAnimated')) {
                        // OK apply ending styles to seed
                        // wait just a little before applying ending style (time for browser to apply the starting one)
                        setTimeout(function(data_) {
                            privateMethods.fireEndStyles(data_);
                        }, 0, eventObjContext);
                    }
                } // End if "S.index"

                // Stoping after reaching the end of the seeds stack ?
                
                S = {}; // Reset this seed properties
                
                if (!(options.stopAtEnd && S.index == (options.maxSeeds - 1))) {  // Don't stop ?
                    if (options.delay >= 1) { // ...or Do it again ?
                        if (FX.timer) clearTimeout(FX.timer);
                        FX.timer = setTimeout(addSeed, options.delay);
                    }
                    else window.requestAnimFrame(addSeed); // As fast as possible -> Waiting a "maxSpeed" param :-?
                }

            }; // End addSeed

            ///////////////////////////////////////////////////////////////////////////////
            // INIT
            $canvas.bind(publicMethods);     // Map our methods to the element
            $canvas.trigger('start');        // Call init factory through communication gate ^^

            return $canvas;                  // $this

        }); // End each closure

    }); // End plugin

})(jQuery, Modernizr, window);