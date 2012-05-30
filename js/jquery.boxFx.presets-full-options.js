/*
    // jQuery boxFx options presets
    // GPL/MIT License - @molokoloco 2011 - http://b2bweb.fr
    // Dependancy to "jquery.boxFx.tools.js" for some sugar...
*/

$(function() { // Wait jQuery to be ready

    ////////////////////////////////////////////////////////////////////////////////
    // "Full" options example for configuring $.boxFx() -
    // 'boxFxFullOptions' is a mashup of all congigurables properties of the plugin  
    ///////////////////////////////////////////////////////////////////////////////
    
    // Array to stock some options presets...
    var boxFxFullOptions = window.boxFxFullOptions = { // $.emitter() defaults params Object
        seeds                 : '<div>N°#id# - #title#</div>', // '<tag/>' OR '<div class="test">{title}</div>' // DOM element with or without template...
        targets               : null,        // 'img.thumb' (xPath) // ... OR existing elements inside this container
                                             // options.seeds OR options.targets can have (dynamic) innerHtml template : {mapped} with some datas
        template              : null,        // 'N°{id} - {title}' // By default can be set in options.seeds
        data                  : [{id:1, title:'toto'}, {id:2, title:'tutu'}], // [{id:1}, {id:2}, {}] OR a "callback()" // Cf. preset example below
        styles2Class          : true,        // Convert styles to 'class' in <head> instead of dealing in the DOM, for each elements : cannot be "live" edited
        clss                  : null,        // 'rollOut animated' // Custom CSS static (starting) class, default : null (Cf. ./animate.css) for example
        //perspective         : null,        // TODO // 500px // if seeds 'options.styles.webktiTransformStyle' == 'preserve-3d', apply perspective to seeds container

        // Effect work mostly with 'options.transition', giving custom ending style foreach elements
        // At least if you use effect, specify 'options.style.width'
        effect                : 'artifice',  // 'nebula', 'artifice', 'center', 'YOUR' or null // Add your custom effect !
        
        delay                 : 250,         // New seed/target every 'ms' (not 's'), Set to 0 and the plugin will use requestAnimationFrame (as fast as possible)
        maxSeeds              : 50,          // Max simultaneous seeds, overrided by 'options.targets.length' and, by default, 'options.transition.duration / options.delays'
        newAtTop              : 'random',    // 'random' OR bolean // New element appear in top of others ?
        stopAtEnd             : false,       // Force continuous animation, even without effect

        emitterRadius         : '0px',      // 10, '10px' or '50%' // Radius of the boxFx inside the boxFx
        emitterCenterLeft     : '50%',       // 10, '10px' or '50%' // boxFx position, 50% to put in the center
        emitterCenterTop      : '50%',

        // Styles, Transition and Keyframes will be set outside (to reduce indentation) ^^
        // Nb : You cannot animate twice the same property in both 'options.transition.stylesTo.XXX' and 'options.keyframes[0].steps[0].XXX'
        // But, for example, you can move 1 times the seed with 'options.transition.stylesTo.left'
        // ...and do an infinite rotation in 'options.keyframes[0].steps[0].transform'
        styles                : {},
        transition            : {},
        keyframes             : {}
    };

    ///////////////////////////////////////////////////////////////////////////////
    // Elements (Starting) CSS, some relevants examples properties
    // ANY CSS/1/2/3 you want... 
    //     - Except "transition, transitionName, transitionDuration..." (it's in options.transition)
    //     - Except "animation, animationName, animationDelay..." (it's in options.keyframes)
    // Cross-browsers compatibility added when possible with modernizr.js
    // Can be overriden by options.effect && options.transition.stylesTo

    // Not Full (but interresting) properties list
    // It's a sample, do not activate all CSS effects if you want to keep some rendering rate ^^
    
    boxFxFullOptions.styles = {

        // Some default properties, not animatables... --------------------------------
        position              : 'absolute',  // 'absolute' | 'fixed' | 'relative' | ''
        display               : 'block',     // 'block' | 'inline' // default null (div already 'block')
        float                 : '',          // 'left' | 'right' | ''
        zIndex                : 500,         // Starting index for seeds // Cf. options.newAtTop

        overflow              : 'hidden',    // 'hidden' | 'visible'
        whiteSpace            : null,        // 'nowrap',
        textOverflow          : null,        // 'ellipsis', ...
        cursor                : 'pointer',   // 'pointer',
        textAlign             : 'center',    // 'nowrap',
        
        // Animatables with CSS gradients not with images --------------------------------
        
        maskImage             : null,        // 'gradient()' | 'url()' // Text effect (Mostly webkit) // better with background-clip:text && display:inline-block
        backgroundImage       : '-'+$.browserPrefix+'-radial-gradient(33% 33%, circle cover,rgba(230,230,0,1) 25%,rgba(180,180,0,1) 80%)', // 'url()' | '-BROWSER-radial-gradient()'
                                             // TODO : Add advanced background-image: linear-gradient() https://github.com/codler/jQuery-Css3-Finalize/
        
        // Some properties, managed by 'options.effect' --------------------------------
        top                   : 0,           // Element is positionned within the boxFx 'options.emitterRadius' with 'top'/'left'
        left                  : 0,
        marginTop             : null,        // ... and auto-centered with negatives 'margins', by 'options.effect'
        marginLeft            : null,

        // Some properties, ANIMATABLES ! --------------------------------

        width                 : 160,         // '10', '10px' or '50%' // Radius of a seed, minimalist settings : If 'options.effect' MUST be SET
        height                : 30,          // Default == width

                                             // translate(10px, 0px), translate3d, translateX, translateY, translateZ, scale(5), scale3d(x,y,z), scaleX, scaleY, scaleZ,
        transform             : null,        // rotate(180deg), rotateX, rotateY, rotateZ, skew(-10deg,10deg), skewX, skewY, perspective, matrix, matrix3d and rotate3d(1,1,0,360deg)
        transformOrigine      : null,        // '10px', '50%', 'left', 'center center', ...
        transformStyle        : 'preserve-3d', // 'flat' | 'preserve-3d'
        backfaceVisibility    : 'visible',   // visible | hidden
        
        minWidth              : null,
        maxWidth              : null,
        minHeight             : null,
        maxHeight             : null,

        right                 : null,
        bottom                : null,
        marginRight           : null,
        marginBottom          : null,

        padding               : null,        // '20px 0', ...

        backgroundPosition    : null,        // 'top left', '10px 10px', ...
        backgroundSize        : '100% 100%', // '95% 95%' | 'cover' | 'contain' | 'auto'
        backgroundRepeat      : 'no-repeat', // 'no-repeat', 'repeat-x', 'space', 'round' ...
        backgroundAttachment  : null,        // 'scroll', 'fixed'
        backgroundOrigin      : 'border-box', // 'padding-box',
        backgroundClip        : 'border-box', // px | % | border-box | padding-box | content-box | no-clip | text ?
        backgroundColor       : 'rgba(255, 255, 0, 1)',

        clip                  : null,        // 'rect(0px,60px,200px,0px)' // cropping if seed is <img> && overflow != visible

        boxSizing             : null,        //  border-box | padding-box  ...
        boxShadow             : '1px 1px 3px rgba(30,30,0,0.8)', // '' || '0 0 10px rgba(0,0,0,1)', // OFFSET_X OFFSET_Y SPREAD COLOR
        boxReflect            : null,        // (Mostly webkit) // 'below 5px -webkit-gradient(linear, left top, left bottom, from(transparent), color-stop(0.5, transparent), to(white))'

        border                : '1px solid white', // '1px dashed rgb(0,0,0)', // buggus with rgba() alpha
        borderImage           : null,        // 'url(border-image.jpg) 45 20 45 30 repeat'
        borderWidth           : null,
        borderRadius          : '20px / 50px',       // '10px' or '50%',  '10px 30px 20px 0px' or '50px / 150px' // Default round with half W/H radius or 50%
        outline               : null,        // '1px dashed rgb(0,0,0)',
        outlineOffset         : null,        // '10px', ...
        
        color                 : 'navy',
        
        textShadow            : null,        // '0 0 30px rgba(255,255,255,1)' // Heavy !
        textStroke            : null,        // '2px #006600'
        fontSize              : '25px',
        letterSpacing         : null,
        wordSpacing           : null,
        textIndent            : null,
        lineHeight            : '30px',      // Same as height, for text to be verticaly aligned in the middle

        opacity               : 1,           // 0 <= 0.xxx <= 1

        //                                   // Custom 'options.effect' property...
        maxSize               : null         // 10, '10px' or '50%' // Effect randomize size between width/height and maxSize ?
    };

    /*
        // From https://github.com/codler/jQuery-Css3-Finalize

        // Animation
        animation animation-delay animation-direction animation-duration animation-fill-mode animation-iteration-count animation-name animation-play-state animation-timing-function
        appearance backface-visibility
        // Background
        background-clip background-composite background-origin background-position-x background-position-y background-size
        // Border - corner/image/radius
        border-corner-image border-image border-top-image border-right-image border-bottom-image border-left-image border-top-left-image border-top-right-image border-bottom-left-image border-bottom-right-image border-radius
        box-align box-direction box-flex box-flex-group box-lines box-ordinal-group box-orient box-pack box-reflect box-shadow box-sizing
        column-count column-gap column-rule column-rule-color column-rule-style column-rule-width column-width columns
        dashboard-region hyphenate-character hyphens line-break
        // Grid
        grid-columns grid-rows
        // Marquee
        marquee marquee-direction marquee-increment marquee-repetition marquee-speed marquee-style
        // Mask
        mask mask-attachment mask-box-image mask-clip mask-composite mask-image mask-origin mask-position mask-position-x mask-position-y mask-repeat mask-size
        nbsp-mode
        // Perspective
        perspective perspective-origin
        tab-size tap-highlight-color text-fill-color text-overflow text-security text-size-adjust
        // Text-stroke
        text-stroke text-stroke-color text-stroke-width
        touch-callout
        // Transform
        transform transform-origin transform-origin-x transform-origin-y transform-origin-z transform-style
        // Transition
        transition transition-delay transition-duration transition-property transition-timing-function
        user-drag user-modify user-select
    */

    ///////////////////////////////////////////////////////////////////////////////
    // IF CSS 'options.transition' : apply endind clssTo or stylesTo
    // FROM (options.styles) / TO (options.transition.stylesTo)
    // transition : 'all 3000ms '+$.cubicBeziers.easeInOutQuad == 'properties' 'duration' 'timingFunction'
    // If 'options.effect' effect, somes properties in 'options.transition.stylesTo' will be overrided

    boxFxFullOptions.transition = {
        properties            : 'all',       // 'all', 'width,height'
        duration              : '5000ms',    // time // with unit : '1500ms' | '3s'
        timingFunction        : 'ease',      // $.cubicBeziers.xxx OR steps(10, end) OR ease, ease-out, ease-in, ease-in-out, linear, cubic-bezier(1,.2,1,1)
        clssTo                : null,        // Custom static CSS class TO, added at the end
        stylesTo              :  {           // Any CSS/1/2/3 you want... except "transition, transitionName, transitionDuration..." (it's just above...)
            opacity               : 1,
            color                 : 'white',
            backgroundColor       : 'rgba(100, 100, 0, 1)',
            //...
                                             // Custom 'options.effect' property...
            maxSize               : null     // 10, '10px' or '50%' // Randomize size between width/height and maxSize ?
        }
    };

    ///////////////////////////////////////////////////////////////////////////////
    // IF CSS keyframes, animation(s) steps  // Will be converted to plain CSS class
    // animation : 'myAnim0 3s steps(10, end) 0 3 forwards, myAnim1 .8s ease 0 infinite',...
    // Each keyframes animation can have differents parameters and differents steps, for exemple one is infinite an the other occurs twice
    // You can use $.cubicBeziers ( console.log($.cubicBeziers) ) for 'timingFunction'
    boxFxFullOptions.keyframes = [{          // The 7 arguments have default values (if you use keyframes) Check $.boxFxOptions.defaultKeyframes
            duration              : '2s',
            timingFunction        : $.cubicBeziers.easeOutQuad, // $.cubicBeziers.xxx OR steps(10, end) OR ease, ease-out, ease-in, ease-in-out, linear, cubic-bezier(1,.2,1,1)
            delay                 : 0,       // time // Wait until start anim ?
            iterationCount        : 5,       // infinite | <number>
            direction             : 'normal', // normal | alternate
            fillMode              : 'forwards', // to persist the end state // none/backwards/forwards/both
            steps: [{                               
                    // "step" is the only "non-CSS" property (Added by plugin and translated to real CSS keyframes)
                    step              : '0%, 100%', // % or [%,%] // Example : Keyframe will be at 0% and 100% of the duration
                    boxShadow         : '0 0 0 rgba(0,0,0,0)', // All CSS property that you want
                    // CSS props...
                }, {
                    step              : '50%', 
                    boxShadow         : '0 0 30px rgba(100, 100, 0, 1)',
            }]
        }, {
            duration              : '500ms',
            timingFunction        : 'linear',
            delay                 : 0,       // function() { return 1000* Math.random(); },
            iterationCount        : 'infinite', // often used with an 'animationDirection' : 'alternate'
            direction             : 'alternate',
            fillMode              : 'backwards',
            steps: [{
                    step              : 0,   // Keyframe 'from' in %
                    transform         : 'translate(0,0)'
                }, {
                    step              : 33,
                    timingFunction    : $.cubicBeziers.easeInOutQuad, // Can also re-insert custom timingFunction for a step
                    transform         : function(index) { return 'translate('+(20 - (Math.random()*40))+'px, 0)'; }
                }, {
                    step              : 100, // Keyframe 'to' : 100%
                    transform         : 'translate(0,0)'
            }]
    }];

});