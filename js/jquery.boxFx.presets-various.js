/*
    // jQuery boxFx options presets
    // GPL/MIT License - @molokoloco 2011 - http://b2bweb.fr
    // Dependancy to "jquery.boxFx.tools.js" for some sugar...
*/

$(function() { // Wait jQuery to be ready

    // Array to stock some options presets...
    var optionsVarious = window.optionsVarious = {};
    
    // Here you can find various plugin declaration examples
    // At the bottom you can find the full options examples
    
    ///////////////////////////////////////////////////////////////////////////////
    // Simplest transition
    ///////////////////////////////////////////////////////////////////////////////
    
    optionsVarious.simpleTransition = {
        styles         : { // Draw default div with this styles
            width          : 60,
            height         : 60,
            opacity        : 0,
            background     : 'orange'
        },
        transition     : {
            duration       : '3000ms',
            timingFunction : $.cubicBeziers.easeInOutQuad,
            stylesTo       : { // Animate to
                opacity:1,
                transform:'translate(230px, 100px) rotate(180deg)'
            }
        }
    };
    
    ///////////////////////////////////////////////////////////////////////////////
    // Simple transition for some <div>
    // Optionnal, fill innerHTML template with provided data obj
    ///////////////////////////////////////////////////////////////////////////////
    
    optionsVarious.transitionWithTemplate = {
        seeds          : '<div>N°{id} - {title}</div>',
        data           : [
            {id:1, title:'toto'}, {id:2, title:'tutu'}, {id:3, title:'toto'}, {id:4, title:'tutu'},
            {id:5, title:'toto'}, {id:6, title:'tutu'}, {id:7, title:'toto'}, {id:8, title:'tutu'}
        ],
        delay          : 500, // Emit every 500ms
        styles         : {
            position       : 'absolute',
            width          : 150,
            opacity        : 0,
            background     : 'white',
            transform      : 'rotate(-20deg) translate(200px, 300px)',
            textAlign      : 'center',
            borderRadius   : '3px'
        },
        transition     : {
            duration       : '3000ms',
            timingFunction : $.cubicBeziers.easeInOutQuad,
            stylesTo       : {
                opacity       : 1,
                textShadow    : '0 0 10px rgba(255,255,255,1)',
                transform     : function(index) { 
                    return 'translate(30px, '+(30+(index*20))+'px)';
                }
            }
        }
    };
    
    ///////////////////////////////////////////////////////////////////////////////
    // Animate with CSS effect keyframes (multi-steps)
    ///////////////////////////////////////////////////////////////////////////////
    optionsVarious.treeStepsKeyframes = {
        //targets      : 'body' // element xPath
        seeds          : '<div>OK</div>',
        styles         : {
            width            : 150,
            background       : 'white'
        },
        keyframes      : [{
            duration         : '2500ms',
            timingFunction   : 'linear',
            delay            : '0',
            iterationCount   : 'infinite',
            direction        : 'alternate',
            fillMode         : 'forwards',
            steps: [{
                    step            : '0%',
                    transform       : 'translate(0,0)',
                    height          : '25px'
                }, {
                    step            : '33%',
                    timingFunction  : $.cubicBeziers.easeInOutQuad,
                    transform       : 'translate(150px,80px)',
                    height          : '150px',
                    background      : 'orange'
                }, {
                    step            : '100%',
                    transform       : 'translate(300px,0)',
                    height          : '25px'
            }]
        }]
    };
     
    ///////////////////////////////////////////////////////////////////////////////
    // Animate with CSS effect emitter and keyframes
    ///////////////////////////////////////////////////////////////////////////////
    
    optionsVarious.emitterWithKeyframes = {
        seeds             : '<div></div>',
        
        styles2Class      : false, ////////////////////////////////////////////////////////////////////////////

        effect            : 'nebula',
        newAtTop          : 'random',
        delay             : 500,
        maxSeeds          : 100,
        maxSeedSize       : '50%',
        emitterRadius       : '20px',
        emitterCenterLeft   : '50%',
        emitterCenterTop    : '50%',

        perspective       : '500px',
        keyframes         : [{ // Translate forever from left to right
            duration         : '1500ms',
            timingFunction   : 'linear',
            iterationCount   : 'infinite',
            direction        : 'alternate',
            fillMode         : 'forwards',
            steps: [{
                    step            : '0%, 100%',
                    timingFunction  : $.cubicBeziers.easeInOutQuad,
                    transform       : 'translate(0,0)'
                }, {
                    step            : '50%',
                    transform       : 'translate(150px,50px)'
            }]
        }]
    };
    
    ///////////////////////////////////////////////////////////////////////////////
    // Data for filling the template is provided by a function with asynchronous JSONP inside
    // Ex. : http://jsfiddle.net/molokoloco/sBqWq/ - http://stackoverflow.com/q/8190016/174449
    ///////////////////////////////////////////////////////////////////////////////
    
    var twitsObj = null,
        twitsCurrent = 0,
        jsonReq = null,
        reqQueue = [];
    
    // I want each call to "streamNewTweet()" to give back a new tweet...
    var streamNewTweet = function(_self) { // Plugin inject 'self' context when calling streamNewTweet(), must give it back
        // db('streamNewTweet', _self, twitsCurrent);
        var dfd = $.Deferred(); // http://api.jquery.com/category/deferred-object/
        if (!jsonReq) { // Let's do our first request
            jsonReq = $.ajax({
                cache: false,
                dataType: 'jsonp',
                url: 'http://search.twitter.com/search.json', // Here our distant webservice
                data: {q: 'html5'},
                success: function(data) {
                    twitsObj = $.map(data.results, function(obj) { // Map all tweets to 'options.seeds' {template}
                        return {
                            username: obj.from_user,
                            tweet: obj.text,
                            avatar: obj.profile_image_url
                        };
                    });
                    for (var i in reqQueue) { // Resolve awaiting result(s)
                        reqQueue[i]['dfd'].resolve(reqQueue[i]['self'], twitsObj[i]); // Give back 'self' context + new data
                    }
                }
            });
            reqQueue.push({dfd:dfd, self:_self}); // Ajax is pending : no result yet, wait
        }
        else if (!twitsObj) {
            reqQueue.push({dfd:dfd, self:_self}); // Ajax is pending : no result yet
        }
        else {
            dfd.resolve(_self, twitsObj[twitsCurrent]); // Ok, now we have data, Resolve current with 'self' context + new data
        }
        twitsCurrent++;
        if (twitsObj && !twitsObj[twitsCurrent]) { // If next twits is empty, reset to recall webservice
            twitsObj = null;
            twitsCurrent = 0;
            jsonReq = null;
            reqQueue = [];
        }
        return dfd.promise(); // Always give back the promise to do the job ;)
    };
    
    // Test (debug)
    // $.when(new streamNewTweet({})).then(function(o, t) { db(o, t); });
    
    // We create some CSS class for our element...
    $('<style type="text/css">\
        div.twit {\
            position:absolute;\
            padding:5px;\
            background:orange;\
            overflow:hidden;\
            font-size:13px;\
            line-height:13px;\
            text-shadow:none;\
            color:darkblue;\
        }\
        div.twit img {\
            float:right;\
            border:1px solid darkblue;\
            width:48px;\
            height:48px;\
        }\
    </style>').appendTo('head');
    
    // Ok let's go with our data EMITTER :)
    optionsVarious.transitionWithJsonpData = {
        seeds             : '<div class="twit"><img src="{avatar}" align="right"/>@{username} - {tweet}</div>',
        data              : streamNewTweet, // Our magical function(), return an object that map to the template
        
        effect            : 'center',
        newAtTop          : 'random',
        delay             : 1600,
        maxSeeds          : 10,
        emitterRadius     : 0,
        emitterCenterLeft : '50%',
        emitterCenterTop  : '125%',
        
        styles            : {
            width             : 340, 
            height            : 50, 
            opacity           : 0, 
            borderRadius      : '5px', 
            transform         :  function(index) { return 'rotate('+(10 - (Math.random()*20))+'deg)'; }
        },

        transition        : {
            duration          : '8000ms',
            timingFunction    : $.cubicBeziers.easeOutQuad,
            stylesTo          : {opacity:1, transform:'rotate(0deg) translate(0,-480px)'}
        }
    };
    
});