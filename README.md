***This is a prototype...***

[![No Maintenance Intended](https://img.shields.io/badge/No_Maintenance_Intended-%C3%97-red.svg)](http://unmaintained.tech/)

---

jQuery.boxFx.js
================

**BoxFx JS is like a "DOM particles emitter" factory**  
"*Clash the DOM with the most optimized jQuery animations framework on earth*" ^^   
GPL/MIT/Copyleft - Beta V0.97 - [@molokoloco](https://twitter.com/#!/molokoloco/) 2011 - <http://b2bweb.fr>

---

- Infos (on my blog)  : <http://www.b2bweb.fr/molokoloco/dynamisez-vos-pages-web-avec-jquery-boxfx-js/>
- Fiddle live example : <http://jsfiddle.net/molokoloco/sBqWq/>
- Full demo           : <http://molokoloco.github.com/jQuery.boxFx/>
- Sources & download  : <https://github.com/molokoloco/jQuery.boxFx/>

---

EXAMPLE(S) SETTINGS 
================

See the BoxFx (full) options properties list here : "***./js/jquery.boxFx.presets-full-options.js***"  
All is *heavily* commented, check also "*./js/jquery.boxFx.presets-XXX.js*"  
Here a code example for your site :

    $emitter1 = $('div#emitterZone1').boxFx({
        delay       : 500,
        seeds       : '<div class="test">N°{id} - {title}</div>',
        data        : [
            {id:1, title:'toto'}, {id:2, title:'tutu'}, {id:3, title:'toto'}, {id:4, title:'tutu'},
            {id:5, title:'toto'}, {id:6, title:'tutu'}, {id:7, title:'toto'}, {id:8, title:'tutu'}
        ],
        clss        : 'bounceIn fast',
        styles      : {
            position       : 'absolute',
            width          : 150,
            height         : 20,
            opacity        : 0,
            background     : 'white',
            transform      : 'rotate(-20deg) translate(200px, 300px)'
        },
        transition  : {
            duration       : '3000ms',
            timingFunction : $.cubicBeziers.easeInOutQuad,
            stylesTo       : {
                opacity        : 1,
                textShadow     : '0 0 10px rgba(255,255,255,1)',
                transform      : function(index) { 
                    return 'rotate(0deg) translate(30px, '+(30+(index*20))+'px)';
                }
            }
        }
    });

    $('a#stop').click(function() { $emitter1.trigger('stop'); });


WHAT are we talking about ?
================

The idea behind **boxFx** JS was to give ten lines facilities for developper and designer  
to animate HTML elements with polished CSS3. Dead simple and hard at the same time !

**Basically, you can use the plugin in a lot of ways :**

- Create elements or use existing collections
- Manage simple transitions or keyframes or effects or all in the same time 
- Create pure animations, full of graphics or only automatize DOM inserting
- Mass handle CSS and animations properties, or fine tune based on element index
- Apply some "effects" on all the elements and manage them in the time
- If you use a data provider (JSON), you can deal with a template for each elements


PARADIGMS
================

With JavaScript, we dynamically **animate HTML elements based on CSS3**, like a proxy  
We take avantage of the both world, GPU acceleration and interactivity

We work on a set of HTML  &lt;elements&gt; ("Seeds") inside a "Box".  
A "Box" and a "Seed" can be ether the &lt;body&gt;, a &lt;div&gt;, or whatever jQuery element we want.

The seeds are generated one after other in the "box".  
A "*options.delay*" parameters tell the plugin the time to wait before (re)generate a new seed.  
If "0" is used, plugin create as fast as possible a new one with "*requestAnimationFrame*"  
otherwise it use a "*setTimeout()*"...

**Transition** : seeds are created with a starting styles ("*options.styles*") and/or a starting  
class ("*options.clss*"). If "*options.transition*" is set, plugin also apply the "ending" styles ("*options.transition.stylesTo*").  
The "*options.transition.duration*" you've set determine the time to morph properties from one(s) to the other(s).

**Effects** can also be used to apply individual settings to each seed, in opposite to values for the entire set.  
For example, "*options.effect = 'nebula'*" will manage left/top positioning and left/top margin for each seed (Moves them in 2D space). 
Effects can overwrite defaults seeds styles values at start and end (collections values VS per/element).

If you need a lot of granularity and parameters for your animation, you can even use "*options.keyframes*".  
**Keyframes** are a way of giving multiple sets of animations to elements.  
For example you can set a first keyframe with infinite rotation and a second keyframe with a one time fadeIn opacity.  
Check full example provided here : "./jquery.boxFx.presets-full-options.js"  
Internal implementation as shown here : <http://jsfiddle.net/molokoloco/rf8zt/>

We can feed the seeds with some **data provider**. For the moment, data are some content stored in  
a JSON object OR a dynamic *$deferred* function (Example with websocket, to come ?)  
Asynchronous "*jsonp*" provider can be a little tricky, see current implementation here :  
<http://jsfiddle.net/molokoloco/Ebc27/>  
This content is injected in a (simple) template you can set in seeds *innerHTML* (See below)

And finaly, have to say : "*Time Is What Prevents Everything From Happening At Once...*" - John Wheeler (1911-2008)  
...So take your time :)


LIMITATIONS
================

We cannot animate more than a certain number of DOM elements.  
In one of the effect i have tested 800... This is already to much ^^  
The purpose is to animate few HTML elements, otherwise it's better to use Canvas or SVG  
The plugin is like a proxy for the CSS3 model, you can setup hundreds of properties.  
I recommend to only use few of them each time. Some CSS3 properties are good  
speed killer : gradient, boxShadow, opacity, borderRadius...

CSS animations keyframes and CSS transition styles properties can be in conflict.  
We cannot animate the same CSS property in "options.transition.stylesTo.XXX" and  
in "*options.keyframes[0].steps.XXX*" (The same apply between two keyframes :  
"*options.keyframes[0].steps.XXX*" and "*options.keyframes[1].steps.XXX*").  
But, for example, you can move 1 times the seed with "*options.transition.stylesTo.left*"  
...and do an infinite rotation in "*options.keyframes[0].steps[0].transform*"  

As i said : Kill your own PC before killing the ones of your visitors !  
That a good "**STRECSS** case" plugin, if you overload settings... ^^

We cannot support to old browsers. That not the purpose here.  
-*No animations for them, but they can not take the blame on the code*- ;)

The next modernizr.js will certainly emulate a better cross-browser CSS3 full interface


CODE IS POETRY
================

There is a lot to say about all the configurations possibilities... and sometimes,  
"Smarts defaults" settings means fucking code... ^^  
Hopefully, tricks for configuring default, settings in conflict, sizes units,  
and browsers compatibility are in "*./js/jquery.boxFx.js*" and "*./js/jquery.boxFx.tools.js*".  
Both combined you've got less than 1000 lines to read ^^  
The best is to go in the source, as i have tried to comment a much as possible.

* Fork it and get updated on GitHub : <https://github.com/molokoloco/jquery.boxfx>  
* Edit it in your <http://cloud9ide.com> editor and send me feedback ;)  
* Sugestions or effects to share ? Contact me : <molokoloco@gmail.com>


HOW-TO / TIPS
================

JavaScripted properties have the advantage to be more customizable than plain CSS.  
For that, plugin add a lot of sugar on settings :

* Every properties is correctly "CSS3-browsers-prefixed"
* They can be set as plain string or as a function that take an 'index' as argument
* CSS sizes units can be set as : 10, '10px' or '50%' (plugin internally work with "px")

Example :

    options.styles : {
        width        : '25%', // Will be internally converted in "px"
        borderRadius : 10,    // borderRadius : Camel case ("camelCase") declaration, 10 will be converted to '"10px"
        transform    :  function(index) { return 'rotate('+(10 * index)+'deg)'; } // Each element increment with an index
    },

Plugin fix and apply styles on element with correct browsers prefix, based on Modernizer.js :  
<https://github.com/Modernizr/Modernizr/blob/master/modernizr.js>  
Internals methods example :

    Modernizr.prefixed("borderRadius"); // e.g FF3.6 'MozBorderRadius', FF4 'borderRadius'
    $(e).crossCss({borderRadius:'10px'}) ==> $(e).css({WebkitBorderRadius:'10px'})

Plugin only handle CSS3 "*properties*" not the "*values*".  
For example, in some particular case, where the CSS property value also take a browser prefix, you should use :

    options.styles : {
        backgroundImage : '-'+$.browserPrefix+'-radial-gradient(33% 33%, circle cover,rgba(230,230,0,1) 25%,rgba(50,50,0,1) 80%)'
    },

Within all the animations/transitions you can use "*ms*" (Milliseconds) or "*s*" (Seconds) units.  
Some tools for "timingFunction" are also provided. After the famous "*linear*" and "*ease-in*"  
you can now use more advanced modes : "*easeInOutQuad*", "*snap*", "*easeInSine*", etc...  
Look at "*./js/jquery.boxFx.tools.js*" for easing listing.

    options.transition : {
        duration         : '6500ms',
        timingFunction   : $.cubicBeziers.easeInOutQuad,
        stylesTo         : {opacity:1, transform:'translate(0,-480px)'}
    }

Keyframes animations can be a little tricky, but powerfull

    options.keyframes = [{
        duration              : '2s',
        timingFunction        : $.cubicBeziers.easeOutQuad,
        delay                 : 0,
        iterationCount        : 5,
        direction             : 'normal',
        fillMode              : 'forwards',
        steps: [{
                step              : '0%, 100%',
                boxShadow         : '0 0 0 rgba(0,0,0,0)',
                // ...
            }, {
                step              : '50%',
                boxShadow         : '0 0 30px rgba(100, 100, 0, 1)',
        }]
    }, {
        other:animation
    }]
        
We can "feed" the seed with the data provider we want.  
Data are some content stored in a JSON object or a dynamic *$.deferred* function.  
This content is injected in a (dead simple) template you can set in seeds innerHTML  
Template example : <http://jsfiddle.net/molokoloco/w8xSx/>

    options : {
        seeds : '<div class="test">N°{id} - {title}</div>', // Template is inside seed fragment tag
        data  : [
            {id:1, title:'toto'}, {id:2, title:'tutu'}, {id:3, title:'toto'}, {id:4, title:'tutu'},
            {id:5, title:'toto'}, {id:6, title:'tutu'}, {id:7, title:'toto'}, {id:8, title:'xoxo'}
        ],
    }

Maybe you also want to give a external JSONP webservice as provider for your animated content.  
You can then give a function as data provider, see the concept here :  
<http://jsfiddle.net/molokoloco/Ebc27/>  
An implementation of this can be found in the presets examples files "*./js/jquery.boxFx.presets.XXX.js*"

The plugin is listening various events, so you can dynamically interact with him.  
Example :

    // To update the properties you want during the runtime...
    $emitter1.trigger('update', [{emitterRadius:16, rate:0}]);

The plugin send events on witch you can bind listeners.  
For example :

    // Bind a new sprite creation
    $emitter1.bind('emit', function(e, $sprite) {
        $sprite.html('Ok'); 
    });

RESSOURCES AND DEPENDENCIES
================

Scripts loaded with LAB.js <https://github.com/getify/LABjs>  
The project is build with **jQuery 1.7** from <http://jquery.com/>, but i though 1.5 can work too  
I also use jQuery Color for some fancy rainbow <https://github.com/jquery/jquery-color>

    $("#block").css({
        backgroundColor: $.Color({saturation: 0})
    }, 1500);

Some stunning **CSS animations presets** with <https://github.com/daneden/animate.css>  
Check <http://daneden.me/animate> for more infos

* Usage : 
    * ```<div class="fadeOut slow"/>```
* 3 preset speed :
    * fast (0.6s), medium (1.2s), slow (2s)
* Effects :
    * Attention seekers : flash bounce shake tada swing wobble pulse
    * Flippers (currently Webkit & IE10 only) : flip flipInX flipOutX flipInY flipOutY
    * Fading entrances : fadeIn fadeInUp fadeInDown fadeInLeft fadeInRight fadeInUpBig fadeInDownBig fadeInLeftBig fadeInRightBig
    * Fading exits : fadeOut fadeOutUp fadeOutDown fadeOutLeft fadeOutRight fadeOutUpBig fadeOutDownBig fadeOutLeftBig fadeOutRightBig
    * Bouncing entrances : bounceIn bounceInDown bounceInUp bounceInLeft bounceInRight
    * Bouncing exits : bounceOut bounceOutDown bounceOutUp bounceOutLeft bounceOutRight
    * Rotating entrances : rotateIn rotateInDownLeft rotateInDownRight rotateInUpLeft rotateInUpRight
    * Rotating exits : rotateOut rotateOutDownLeft rotateOutDownRight rotateOutUpLeft rotateOutUpRight
    * Specials : hinge rollIn rollOut

In this example "*fadeInLeft*" is the type of effect and "*fast*" is a generic class to give delay and easing
When "*clss*" is used like this, it's help you achieve intro and outro animations **over** the general transition
Animated class cannot be used with options.keyframes (must choose)

    $("#banniere").boxFx({
        clss: 'fadeInLeft fast'
        transition: {clssTo:'bounceOutDown slow', color:'XXX' /* ,... */}
    });

HTML5/CSS3 compatibility mode is managed with <https://github.com/Modernizr/Modernizr/blob/master/modernizr.js>  
For the demo, MarkDown "*README.md*" it displayed as HTML with <http://code.google.com/p/pagedown/>

Also, i would make a lot of kiss to <https://github.com> and <http://cloud9ide.com> :)  
without forgeting <http://stackoverflow.com>. How can i have done before ?!


Further READING about CSS3 and animations ? (You would ;)
================

* **Docs**
    * <https://developer.mozilla.org/en/CSS/CSS_animations>
    * <http://developer.apple.com/library/safari/#documentation/InternetWeb/Conceptual/SafariVisualEffectsProgGuide/>
    * <http://www.w3.org/TR/css3-3d-transforms/#transform-functions>
    * <http://www.w3schools.com/css3/css3_animations.asp>
    * <http://lea.verou.me/2011/10/animatable-a-css-transitions-gallery/>
    * <http://instacss.com/>
    * <http://webdesign.tutsplus.com/tutorials/htmlcss-tutorials/css3-transitions-and-transforms-from-scratch/>
* **Plugins**
    * <https://github.com/codler/jQuery-Css3-Finalize>
    * <http://ricostacruz.com/jquery.transit/>
    * <https://github.com/benbarnett/jQuery-Animate-Enhanced>
    * <http://coding.smashingmagazine.com/2011/11/21/create-web-animations-with-paperjs/>
    * <http://marcinignac.com/blog/timeline-js/>
    * <http://lesscss.org/>
    * <http://www.queness.com/post/9999/10-css-and-javascript-animation-plugins-frameworks-and-libraries>
* **Examples**
    * <https://gist.github.com/984039>
    * <http://lea.verou.me/2011/09/a-better-tool-for-cubic-bezier-easing/>
    * <http://lea.verou.me/2011/09/pure-css3-typing-animation-with-steps/>
    * <http://jsfiddle.net/leaverou/7rnQP/light/>
    * <http://jsperf.com/class-vs-style>
    * <http://jsfiddle.net/molokoloco/rf8zt/> (CSS animation(s) with 'options.keyframes' OBJ)
    * <http://jsfiddle.net/molokoloco/7rV7a/> (CSS 3D animations via sources)

Et...

* <https://twitter.com/molokoloco/> (Some infos, from time to time ;)
* Contact me for any trouble using this : molokoloco{at}gmail.com
  
---

![CSS Transform] (http://d3pr5r64n04s3o.cloudfront.net/articles/042_css_animation_intro/tut.html/images/axis-5.jpg)
