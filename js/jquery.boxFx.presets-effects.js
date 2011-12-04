
$(function() { // Wait jQuery to be ready

    ///////////////////////////////////////////////////////////////////////////////
    // Object to stock some options presets...
    var optionsEffects = window.optionsEffects = {};

    // optionsEffects can be used like a JSON "Editable" object for LIVE Textarea editing purpose

    optionsEffects.html5Ize = {
        seeds             : '<img src="http://www.w3.org/html/logo/downloads/HTML5_Badge_32.png" width="32" heigh="32"/>',
        effect            : 'nebula',
        newAtTop          : true,
        delay             : 0,
        maxSeeds          : 280,
        emitterRadius     : 150,
        emitterCenterLeft : '50%',
        emitterCenterTop  : '50%',
        styles            : {
            position         : 'absolute',
            width            : 32,
            height           : 32,
            borderRadius     : 0
        },
        transition        : {
            duration         : '2000ms',
            timingFunction   : 'linear',
            stylesTo         : {
                opacity        : 0,
                transform      : 'rotateY(-260deg)'
            }
        }
    };

    optionsEffects.hyperSpace = {
        effect            : 'nebula',
        newAtTop          : true,
        delay             : 0,
        maxSeeds          : 900,
        emitterRadius     : 5,
        emitterCenterLeft : '50%',
        emitterCenterTop  : '75%',
        styles            : {
            position         : 'absolute',
            width            : 1,
            backgroundColor  : 'rgba(255,255,10,0)',
            borderRadius     : 0
        },
        transition         : {
            duration         : '900ms',
            timingFunction   : 'cubic-bezier(.6,.2,.8,.4)',
            stylesTo         : {
                backgroundColor : 'rgba(255,255,100,1)',
                transform       : 'rotateY(-260deg)',
                width           : 1,
                maxSize         : 5
            }
        }
    };

    optionsEffects.deepSuns = {
        effect            : 'center',
        newAtTop          : false,
        delay             : 420,
        maxSeeds          : 16,
        emitterRadius     : '100%',
        emitterCenterLeft : '50%',
        emitterCenterTop  : '50%',
        styles            : {
            position         : 'absolute',
            width            : '80%',
            maxSize          : null,
            backgroundImage  : '-'+$.browserPrefix+'-radial-gradient(50% 50%, circle cover,rgba(0,0,0,0) 0%, rgba(250,250,36,1) 100%)',
            borderRadius     : '50%',
            boxShadow        : '0 0 30px rgba(250,250,36,0)',
            opacity          : 0
        },
        transition       : {
            duration         : '4000ms',
            timingFunction   : 'linear',
            stylesTo         : {
                width          : 0,
                borderRadius   : '50%',
                boxShadow      : '0 0 30px rgba(250,250,36,1)',
                opacity        : 1
            }
        }
    };

    optionsEffects.whiteHole = {
        effect            : 'center',
        newAtTop          : false,
        delay             : 150,
        maxSeeds          : 33,
        emitterRadius       : 20,
        emitterCenterLeft   : '50%',
        emitterCenterTop    : '50%',
        styles            : {
            position         : 'absolute',
            width            : 150,
            maxSize          : 200,
            backgroundColor  : 'rgba(255,255,255,0.8)',
            borderRadius     : '50%',
            boxShadow        : '0 0 40px #FFFFFF,0 0 6px #FFFFFF'
        },
        transition        : {
            duration         : '1800ms',
            timingFunction   : 'cubic-bezier(1,0.3,.5,0)',
            stylesTo         : {
                width          : 150,
                maxSize        : 200,
                borderRadius   : '50%'
            }
        }
    };

    optionsEffects.rainbowArrows = {
        effect            : 'artifice',
        newAtTop          : 'random',
        delay             : 500,
        maxSeeds          : 16,
        emitterRadius     : 60,
        emitterCenterLeft : '50%',
        emitterCenterTop  : '140%',
        styles            : {
            position         : 'absolute',
            width            : 50,
            height           : 100,
            backgroundColor  : 'rgba(219,20,80,1)',
            borderRadius     : '50px / 100px',
            boxShadow        : '0 0 50px rgba(219,20,80,1)'
        },
        transition         : {
            duration         : '7000ms',
            timingFunction   : 'cubic-bezier(1, 1, 0, 0)',
            stylesTo         : {
                width          : 1,
                height         : 600,
                borderRadius   : '1px / 600px',
                backgroundColor: 'rgba(255,255,5,1)',
                boxShadow      : '0 0 50px rgba(255,255,5,1)',
                opacity        : 0
            }
        }
    };
    /*
    {
    "effect": "artifice",
    "newAtTop": "random",
    "delay": 500,
    "maxSeeds": 16,
    "emitterRadius": 60,
    "emitterCenterLeft": "50%",
    "emitterCenterTop": "140%",
    "styles": {
        "position": "absolute",
        "width": 30,
        "height": 200,
        "backgroundColor": "rgba(219,20,80,1)",
        "borderRadius": 1000,
        "boxShadow": "0 0 50px rgba(219,20,80,1)"
    },
    "transition": {
        "duration": "7000ms",
        "timingFunction": "cubic-bezier(1, 1, 0, 0)",
        "stylesTo": {
            "width": 1,
            "height": 600,
            "borderRadius": 1000,
            "backgroundColor": "rgba(255,255,5,1)",
            "boxShadow": "0 0 50px rgba(255,255,5,1)",
            "opacity": 0
        }
    }
}
*/

    optionsEffects.sunnyClouds = {
        effect            : 'artifice',
        newAtTop          : true,
        delay             : 1000,
        maxSeeds          : 6,
        emitterRadius     : 0,
        emitterCenterLeft : '50%',
        emitterCenterTop  : '50%',
        styles            : {
            position       : 'absolute',
            width          : '150%',
            height         : '150%',
            backgroundImage: 'url(http://www.b2bweb.fr/bonus/gradientBigMap.png)',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center center',
            backgroundSize: '200% 200%',
            borderRadius   : 0,
            opacity        : 0
        },
        transition     : {
            duration       : '6000ms',
            timingFunction : 'linear',
            stylesTo       : {
                backgroundSize: '100% 100%',
                opacity        : 1
            }
        }
    };

    optionsEffects.videosWall = {
        seeds             : '<video preload="auto" autoplay="true" width="160" src="http://videos.mozilla.org/serv/mozhacks/demos/resources/plztouchme/burritttoooo.webm"></video>',
        stopAtEnd         : true,
        delay             : 900,
        maxSeeds          : 9,
        styles            : {
            float            : 'left',
            display          : 'block',
            width            : 160,
            height           : 90,
            borderRadius     : 0
        },
        transition        : {
            duration         : '3000ms',
            timingFunction   : 'linear',
            stylesTo         : {
                transform      : 'scale(0.2)'
            }
        }
    };

    optionsEffects.acidSquares = {
        effect            : 'artifice',
        newAtTop          : true,
        delay             : 0,
        maxSeeds          : 200,
        emitterRadius     : '100%',
        emitterCenterLeft : '50%',
        emitterCenterTop  : '50%',
        styles            : {
            position         : 'absolute',
            width            : '200px',
            transform        : 'rotate(45deg)',
            backgroundColor  : 'rgba(195,216,37,0.1)',
            border           : '1px solid yellow',
            boxSizing        : 'border-box',
            borderRadius     : 0
        },
        transition        : {
            duration         : '2600ms',
            timingFunction   : 'linear',
            stylesTo         : {
                opacity        : 0
            }
        }
    };

    optionsEffects.lolCatz = {
        seeds             : '<img src="http://www.b2bweb.fr/bonus/nian-cat.png" width="772" heigh="93"/>',
        effect            : 'nebula',
        newAtTop          : true,
        delay             : 900,
        maxSeeds          : 14,
        emitterRadius     : 50,
        emitterCenterLeft : 0,
        emitterCenterTop  : '10%',
        styles            : {
            position         : 'absolute',
            width            : 772,
            height           : 93,
            transform        : 'scale(0.1) skew(-10deg,10deg)',
            borderRadius     : 0
        },
        transition        : {
            duration         : '4000ms',
            timingFunction   : 'linear',
            stylesTo         : {
                transform      : 'scaleY(2) scaleX(2.5) skew(10deg,-10deg)',
                opacity        : 0
            }
        }
    };

    optionsEffects.typoGraphe = {
        seeds             : '<span>DOM<br />is alive</span>',
        effect            : 'artifice',
        newAtTop          : false,
        delay             : 190,
        maxSeeds          : 33,
        emitterRadius     : '33%',
        emitterCenterLeft : '50%',
        emitterCenterTop  : '130%',
        styles            : {
            position         : 'absolute',
            width            : 180,
            height           : 100,
            transform        : 'scale(0.1)',
            font             : 'bold 35px Trebuchet,Verdana',
            color            : 'grey',
            textAlign        : 'center',
            textShadow       : '0 0 1px grey, 0 0 20px black',

            // http://goo.gl/5KhFZ // Bug // TODO
            //maskImage       : 'url(http://d3pr5r64n04s3o.cloudfront.net/articles/042_css_animation_intro/tut.html/images/axis-5.jpg)',
            maskImage        : '-'+$.browserPrefix+'-gradient(linear, left top, left bottom, from(rgba(0,0,0,0)), color-stop(50%, rgba(0,0,0,1)), to(rgba(0,0,0,0)))',
            maskOrigin       : 'content',
            textFillColor    : 'transparent',
            backgroundClip   : 'text',

            borderRadius     : 0
        },
        transition        : {
            duration         : '2500ms',
            timingFunction   : 'ease',
            stylesTo         : {
                transform        : 'scale(1)'//,
                //color            : 'transparent',
                //textShadow       : '0 0 1px rgba(255,255,255,1)',
                //textStroke       : '1px rgba(0,0,0,.33)'
            }
        }
    };

    optionsEffects.starsParty = {
        seeds             : '<div>★</div>',
        effect            : 'artifice',
        newAtTop          : 'random',
        delay             : 125,
        maxSeeds          : 30,
        emitterRadius     : 40,
        emitterCenterLeft : '50%',
        emitterCenterTop  : '50%',
        styles            : {
            position         : 'absolute',
            width            : 160,
            transform        : 'scale(1)',
            font             : '150px verdana',
            color            : 'rgb(230,230,10)',
            borderRadius     : 0
        },
        transition        : {
            duration         : '2000ms',
            timingFunction   : 'linear',
            stylesTo         : {
                transform        : 'scale(0.01) rotate(250deg)',
                color            : 'rgb(230,230,10)'
            }
        }
    };

    optionsEffects.hypnoWork = {
        effect            : 'artifice',
        newAtTop          : 'random',
        delay             : 100,
        maxSeeds          : 40,
        emitterRadius     : '10%',
        emitterCenterLeft : '50%',
        emitterCenterTop  : '50%',
        styles            : {
            position         : 'absolute',
            width            : '20%',
            maxSize          : '50%',
            backgroundImage  : '-'+$.browserPrefix+'-linear-gradient(-45deg, #FFFD69 25%,transparent 26%,transparent 50%,#FFFD69 51%,#FFFD69 75%,transparent 76%,transparent 100%)',
            backgroundSize   : '10px 10px',
            border           : '8px solid #FFFD69',
            opacity          : 0,
            borderRadius     : 0
        },
        transition        : {
            duration         : '2000ms',
            timingFunction   : 'linear',
            stylesTo         : {
                width            : 1,
                border           : '1px solid #FFFD69',
                borderRadius     : 0,
                opacity          : 1
            }
        }
    };

    optionsEffects.tunneLize = {
        effect            : 'center',
        newAtTop          : 1,
        delay             : 750,
        maxSeeds          : 23,
        emitterRadius     : 5,
        emitterCenterLeft : '50%',
        emitterCenterTop  : '75%',
        styles            : {
            position         : 'absolute',
            width            : 5,
            maxSize          : 12,
            backgroundImage  : '-'+$.browserPrefix+'-radial-gradient(50% 50%, circle cover,#FFFD69 30%,violet 70%,#FFFD69 100%)',
            backgroundSize   : '150px 150px',
            backgroundPosition: 'center center',
            border           : '1px solid violet ',
            opacity          : 0.1,
            borderRadius     : '50%'
        },
        transition        : {
            duration         : '9000ms',
            timingFunction   : 'ease-in',
            stylesTo         : {
                width            : '150%',
                maxSize          : '160%',
                backgroundSize   : '1px 1px',
                border           : '8px solid #FFFD69',
                borderRadius     : '50%',
                transform        : 'rotate(-300deg)',
                opacity          : 1
            }
        }
    };

    optionsEffects.masterMind = {
        seeds             : '<div>✖</div>',
        stopAtEnd         : false, // Continous animation even without effect
        newAtTop          : 1,
        delay             : 0,
        maxSeeds          : 300,
        emitterRadius     : 0,
        emitterCenterLeft : 0,
        emitterCenterTop  : 0,
        styles            : {
            float            : 'left',
            display          : 'block',
            width            : 25,
            textAlign        : 'center',
            color            : 'orange',
            font             : 'bold 10px/25px Arial',
            backgroundColor  : 'orange',
            opacity          : 0
        },
        transition        : {
            duration         : '7000ms',
            timingFunction   : 'linear',
            stylesTo         : {
                fontSize         : '20px',
                textShadow       : '2px 2px 4px black',
                backgroundColor  : 'yellow',
                opacity          : 1
            }
        }
    };

    optionsEffects.subWoofer = {
        effect            : 'center',
        newAtTop          : 1,
        delay             : 580,
        maxSeeds          : 25,
        emitterRadius     : 0,
        emitterCenterLeft : '50%',
        emitterCenterTop  : '50%',
        styles            : {
            position         : 'absolute',
            width            : '25%',
            backgroundImage  : '-'+$.browserPrefix+'-radial-gradient(10% 30%, circle cover,rgba(230,230,230,1) 0%,rgba(230,230,230,1) 35%,rgba(50,50,50,1) 90%,rgba(50,50,50,1) 100%)',
            boxShadow        : 'inset 0 0 30px rgba(50,50,50,1)',
            borderRadius     : '50%'
        },
        transition        : {
            duration         : '9000ms',
            timingFunction   : 'cubic-bezier(.2,.8,.8,.2)',
            stylesTo         : {
                width            : '75%',
                boxShadow        : 'inset 0 0 5px rgba(250,250,250,1)',
                borderRadius     : '50%',
                opacity          : 0
            }
        }
    };

});