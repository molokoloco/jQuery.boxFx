/*
Animate.css - http://daneden.me/animate
LICENSED UNDER THE  MIT LICENSE (MIT)
Copyright (c) 2011 Dan Eden
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/


.animated {
	animation: 2s ease;
}

flash {
	0%, 50%, 100% {opacity: 1;}	
	25%, 75% {opacity: 0;}
}

shake {
	0%, 100% {transform: translateX(0);}
	10%, 30%, 50%, 70%, 90% {transform: translateX(-10px);}
	20%, 40%, 60%, 80% {transform: translateX(10px);}
}

bounce {
	0%, 20%, 50%, 80%, 100% {transform: translateY(0);}
	40% {transform: translateY(-30px);}
	60% {transform: translateY(-15px);}
}

tada {
	0% {transform: scale(1);}	
	10%, 20% {transform: scale(0.9) rotate(-3deg);}
	30%, 50%, 70%, 90% {transform: scale(1.1) rotate(3deg);}
	40%, 60%, 80% {transform: scale(1.1) rotate(-3deg);}
	100% {transform: scale(1) rotate(0);}
}

swing {
	20%, 40%, 60%, 80%, 100% { transform-origin: top center; }
	20% { transform: rotate(15deg); }	
	40% { transform: rotate(-10deg); }
	60% { transform: rotate(5deg); }	
	80% { transform: rotate(-5deg); }	
	100% { transform: rotate(0deg); }
}

wobble {
  0% { transform: translateX(0%); }
  15% { transform: translateX(-25%) rotate(-5deg); }
  30% { transform: translateX(20%) rotate(3deg); }
  45% { transform: translateX(-15%) rotate(-3deg); }
  60% { transform: translateX(10%) rotate(2deg); }
  75% { transform: translateX(-5%) rotate(-1deg); }
  100% { transform: translateX(0%); }
}

pulse {
    0% { transform: scale(1); }	
	50% { transform: scale(1.1); }
    100% { transform: scale(1); }
}

pulse {
    0% { -moz-transform: scale(1); }	
	50% { -moz-transform: scale(1.1); }
    100% { -moz-transform: scale(1); }
}

flip {
	0% {
		transform: perspective(400px) rotateY(0);
		animation-timing-function: ease-out;
	}
	40% {
		transform: perspective(400px) translateZ(150px) rotateY(170deg);
		animation-timing-function: ease-out;
	}
	50% {
		transform: perspective(400px) translateZ(150px) rotateY(190deg) scale(1);
		animation-timing-function: ease-in;
	}
	80% {
		transform: perspective(400px) rotateY(360deg) scale(.95);
		animation-timing-function: ease-in;
	}
	100% {
		transform: perspective(400px) scale(1);
		animation-timing-function: ease-in;
	}
}

flipInX {
    0% {
        transform: perspective(400px) rotateX(90deg);
        opacity: 0;
    }
    
    40% {
        transform: perspective(400px) rotateX(-10deg);
    }
    
    70% {
        transform: perspective(400px) rotateX(10deg);
    }
    
    100% {
        transform: perspective(400px) rotateX(0deg);
        opacity: 1;
    }
}

flipOutX {
    0% {
        transform: perspective(400px) rotateX(0deg);
        opacity: 1;
    }
	100% {
        transform: perspective(400px) rotateX(90deg);
        opacity: 0;
    }
}

flipInY {
    0% {
        transform: perspective(400px) rotateY(90deg);
        opacity: 0;
    }
    
    40% {
        transform: perspective(400px) rotateY(-10deg);
    }
    
    70% {
        transform: perspective(400px) rotateY(10deg);
    }
    
    100% {
        transform: perspective(400px) rotateY(0deg);
        opacity: 1;
    }
}
flipOutY {
    0% {
        transform: perspective(400px) rotateY(0deg);
        opacity: 1;
    }
	100% {
        transform: perspective(400px) rotateY(90deg);
        opacity: 0;
    }
}

fadeIn {
	0% {opacity: 0;}	
	100% {opacity: 1;}
}

fadeInUp {
	0% {
		opacity: 0;
		transform: translateY(20px);
	}
	
	100% {
		opacity: 1;
		transform: translateY(0);
	}
}
fadeInDown {
	0% {
		opacity: 0;
		transform: translateY(-20px);
	}
	
	100% {
		opacity: 1;
		transform: translateY(0);
	}
}

fadeInLeft {
	0% {
		opacity: 0;
		transform: translateX(-20px);
	}
	
	100% {
		opacity: 1;
		transform: translateX(0);
	}
}

fadeInRight {
	0% {
		opacity: 0;
		transform: translateX(20px);
	}
	
	100% {
		opacity: 1;
		transform: translateX(0);
	}
}
fadeInUpBig {
	0% {
		opacity: 0;
		transform: translateY(2000px);
	}
	
	100% {
		opacity: 1;
		transform: translateY(0);
	}
}
fadeInDownBig {
	0% {
		opacity: 0;
		transform: translateY(-2000px);
	}
	
	100% {
		opacity: 1;
		transform: translateY(0);
	}
}
fadeInLeftBig {
	0% {
		opacity: 0;
		transform: translateX(-2000px);
	}
	
	100% {
		opacity: 1;
		transform: translateX(0);
	}
}
fadeInRightBig {
	0% {
		opacity: 0;
		transform: translateX(2000px);
	}
	
	100% {
		opacity: 1;
		transform: translateX(0);
	}
}
fadeOut {
	0% {opacity: 1;}
	100% {opacity: 0;}
}
fadeOutUp {
	0% {
		opacity: 1;
		transform: translateY(0);
	}
	
	100% {
		opacity: 0;
		transform: translateY(-20px);
	}
}
fadeOutDown {
	0% {
		opacity: 1;
		transform: translateY(0);
	}
	
	100% {
		opacity: 0;
		transform: translateY(20px);
	}
}
fadeOutLeft {
	0% {
		opacity: 1;
		transform: translateX(0);
	}
	
	100% {
		opacity: 0;
		transform: translateX(-20px);
	}
}
fadeOutRight {
	0% {
		opacity: 1;
		transform: translateX(0);
	}
	
	100% {
		opacity: 0;
		transform: translateX(20px);
	}
}
fadeOutUpBig {
	0% {
		opacity: 1;
		transform: translateY(0);
	}
	
	100% {
		opacity: 0;
		transform: translateY(-2000px);
	}
}
fadeOutDownBig {
	0% {
		opacity: 1;
		transform: translateY(0);
	}
	
	100% {
		opacity: 0;
		transform: translateY(2000px);
	}
}
fadeOutLeftBig {
	0% {
		opacity: 1;
		transform: translateX(0);
	}
	
	100% {
		opacity: 0;
		transform: translateX(-2000px);
	}
}
fadeOutRightBig {
	0% {
		opacity: 1;
		transform: translateX(0);
	}
	
	100% {
		opacity: 0;
		transform: translateX(2000px);
	}
}
bounceIn {
	0% {
		opacity: 0;
		transform: scale(.3);
	}
	
	50% {
		opacity: 1;
		transform: scale(1.05);
	}
	
	70% {
		transform: scale(.9);
	}
	
	100% {
		transform: scale(1);
	}
}
bounceInUp {
	0% {
		opacity: 0;
		transform: translateY(2000px);
	}
	
	60% {
		opacity: 1;
		transform: translateY(-30px);
	}
	
	80% {
		transform: translateY(10px);
	}
	
	100% {
		transform: translateY(0);
	}
}
bounceInDown {
	0% {
		opacity: 0;
		transform: translateY(-2000px);
	}
	
	60% {
		opacity: 1;
		transform: translateY(30px);
	}
	
	80% {
		transform: translateY(-10px);
	}
	
	100% {
		transform: translateY(0);
	}
}
bounceInLeft {
	0% {
		opacity: 0;
		transform: translateX(-2000px);
	}
	
	60% {
		opacity: 1;
		transform: translateX(30px);
	}
	
	80% {
		transform: translateX(-10px);
	}
	
	100% {
		transform: translateX(0);
	}
}
bounceInRight {
	0% {
		opacity: 0;
		transform: translateX(2000px);
	}
	
	60% {
		opacity: 1;
		transform: translateX(-30px);
	}
	
	80% {
		transform: translateX(10px);
	}
	
	100% {
		transform: translateX(0);
	}
}
bounceOut {
	0% {
		transform: scale(1);
	}
	
	25% {
		transform: scale(.95);
	}
	
	50% {
		opacity: 1;
		transform: scale(1.1);
	}
	
	100% {
		opacity: 0;
		transform: scale(.3);
	}	
}
bounceOutUp {
	0% {
		transform: translateY(0);
	}
	
	20% {
		opacity: 1;
		transform: translateY(20px);
	}
	
	100% {
		opacity: 0;
		transform: translateY(-2000px);
	}
}
bounceOutDown {
	0% {
		transform: translateY(0);
	}
	
	20% {
		opacity: 1;
		transform: translateY(-20px);
	}
	
	100% {
		opacity: 0;
		transform: translateY(2000px);
	}
}
bounceOutLeft {
	0% {
		transform: translateX(0);
	}
	
	20% {
		opacity: 1;
		transform: translateX(20px);
	}
	
	100% {
		opacity: 0;
		transform: translateX(-2000px);
	}
}
bounceOutRight {
	0% {
		transform: translateX(0);
	}
	
	20% {
		opacity: 1;
		transform: translateX(-20px);
	}
	
	100% {
		opacity: 0;
		transform: translateX(2000px);
	}
}
rotateIn {
	0% {
		transform-origin: center center;
		transform: rotate(-200deg);
		opacity: 0;
	}
	
	100% {
		transform-origin: center center;
		transform: rotate(0);
		opacity: 1;
	}
}
rotateInUpLeft {
	0% {
		transform-origin: left bottom;
		transform: rotate(90deg);
		opacity: 0;
	}
	
	100% {
		transform-origin: left bottom;
		transform: rotate(0);
		opacity: 1;
	}
}
rotateInDownLeft {
	0% {
		transform-origin: left bottom;
		transform: rotate(-90deg);
		opacity: 0;
	}
	
	100% {
		transform-origin: left bottom;
		transform: rotate(0);
		opacity: 1;
	}
}
rotateInUpRight {
	0% {
		transform-origin: right bottom;
		transform: rotate(-90deg);
		opacity: 0;
	}
	
	100% {
		transform-origin: right bottom;
		transform: rotate(0);
		opacity: 1;
	}
}
rotateInDownRight {
	0% {
		transform-origin: right bottom;
		transform: rotate(90deg);
		opacity: 0;
	}
	
	100% {
		transform-origin: right bottom;
		transform: rotate(0);
		opacity: 1;
	}
}
rotateOut {
	0% {
		transform-origin: center center;
		transform: rotate(0);
		opacity: 1;
	}
	
	100% {
		transform-origin: center center;
		transform: rotate(200deg);
		opacity: 0;
	}
}
rotateOutUpLeft {
	0% {
		transform-origin: left bottom;
		transform: rotate(0);
		opacity: 1;
	}
	
	100% {
		transform-origin: left bottom;
		transform: rotate(-90deg);
		opacity: 0;
	}
}
rotateOutDownLeft {
	0% {
		transform-origin: left bottom;
		transform: rotate(0);
		opacity: 1;
	}
	
	100% {
		transform-origin: left bottom;
		transform: rotate(90deg);
		opacity: 0;
	}
}
rotateOutUpRight {
	0% {
		transform-origin: right bottom;
		transform: rotate(0);
		opacity: 1;
	}
	
	100% {
		transform-origin: right bottom;
		transform: rotate(90deg);
		opacity: 0;
	}
}
rotateOutDownRight {
	0% {
		transform-origin: right bottom;
		transform: rotate(0);
		opacity: 1;
	}
	
	100% {
		transform-origin: right bottom;
		transform: rotate(-90deg);
		opacity: 0;
	}
}
hinge {
	0% { transform: rotate(0); -webkit-transform-origin: top left; -webkit-animation-timing-function: ease-in-out; }	
	20%, 60% { transform: rotate(80deg); -webkit-transform-origin: top left; -webkit-animation-timing-function: ease-in-out; }	
	40% { transform: rotate(60deg); -webkit-transform-origin: top left; -webkit-animation-timing-function: ease-in-out; }	
	80% { transform: rotate(60deg) translateY(0); opacity: 1; -webkit-transform-origin: top left; -webkit-animation-timing-function: ease-in-out; }	
	100% { transform: translateY(700px); opacity: 0; }
}
rollIn {
	0% { opacity: 0; transform: translateX(-100%) rotate(-120deg); }
	100% { opacity: 1; transform: translateX(0px) rotate(0deg); }
}
rollOut {
    0% {
		opacity: 1;
		transform: translateX(0px) rotate(0deg);
	}
    100% {
		opacity: 0;
		transform: translateX(100%) rotate(120deg);
	}
}