// Hello.
let W = window.innerWidth;
let H = window.innerHeight;
//SIZE_ALL = document.getElementsByClassName('current')[0];
//W = SIZE_ALL.scrollHeight
//H = SIZE_ALL.scrollWidth
const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
const maxConfettis = 150;
const particles = [];

const possibleColors = [
  "DodgerBlue",
  "OliveDrab",
  "Gold",
  "Pink",
  "SlateBlue",
  "LightBlue",
  "Gold",
  "Violet",
  "PaleGreen",
  "SteelBlue",
  "SandyBrown",
  "Chocolate",
  "Crimson"
];

function randomFromTo(from, to) {
  return Math.floor(Math.random() * (to - from + 1) + from);
}

function confettiParticle() {
  this.x = Math.random() * W; // x
  this.y = Math.random() * H - H; // y
  this.r = randomFromTo(11, 33); // radius
  this.d = Math.random() * maxConfettis + 11;
  this.color =
    possibleColors[Math.floor(Math.random() * possibleColors.length)];
  this.tilt = Math.floor(Math.random() * 33) - 11;
  this.tiltAngleIncremental = Math.random() * 0.07 + 0.05;
  this.tiltAngle = 0;

  this.draw = function() {
    context.beginPath();
    context.lineWidth = this.r / 2;
    context.strokeStyle = this.color;
    context.moveTo(this.x + this.tilt + this.r / 3, this.y);
    context.lineTo(this.x + this.tilt, this.y + this.tilt + this.r / 5);
    return context.stroke();
  };
}

function Draw() {
  const results = [];

  // Magical recursive functional love
  requestAnimationFrame(Draw);

  context.clearRect(0, 0, W, window.innerHeight);

  for (var i = 0; i < maxConfettis; i++) {
    results.push(particles[i].draw());
  }

  let particle = {};
  let remainingFlakes = 0;
  for (var i = 0; i < maxConfettis; i++) {
    particle = particles[i];

    particle.tiltAngle += particle.tiltAngleIncremental;
    particle.y += (Math.cos(particle.d) + 3 + particle.r / 2) / 2;
    particle.tilt = Math.sin(particle.tiltAngle - i / 3) * 15;

    if (particle.y <= H) remainingFlakes++;

    // If a confetti has fluttered out of view,
    // bring it back to above the viewport and let if re-fall.
    if (particle.x > W + 30 || particle.x < -30 || particle.y > H) {
      particle.x = Math.random() * W;
      particle.y = -30;
      particle.tilt = Math.floor(Math.random() * 10) - 20;
    }
  }

  return results;
}

window.addEventListener(
  "resize",
  function() {
    W = window.innerWidth;
    H = window.innerHeight;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  },
  false
);

// Push new confetti objects to `particles[]`
for (var i = 0; i < maxConfettis; i++) {
  particles.push(new confettiParticle());
}

// Initialize
canvas.width = W;
canvas.height = H;
Draw();


var anchors = document.querySelectorAll('a')

Array.prototype.forEach.call(anchors, function(anchor) {
	anchor.addEventListener('click', explode)
})

function explode(e) {
	var x = e.clientX
	var y = e.clientY
	var c = document.createElement('canvas')
	var ctx = c.getContext('2d')
	var ratio = window.devicePixelRatio
	var particles = []
	
	document.body.appendChild(c)
	
	c.style.position = 'absolute'
	c.style.left = (x - 100) + 'px'
	c.style.top = (y - 100) + 'px'
	c.style.pointerEvents = 'none'
	c.style.width = 200 + 'px'
	c.style.height = 200 + 'px'
	c.width = 200 * ratio
	c.height = 200 * ratio
	
	function Particle() {
		return {
			x: c.width / 2,
			y: c.height / 2,
			radius: r(20,30),
			color: 'rgb(' + [r(0,255), r(0,255), r(0,255)].join(',') + ')',
			rotation: r(0,360, true),
			speed: r(8,12),
			friction: 0.9,
			opacity: r(0,0.5, true),
			yVel: 0,
			gravity: 0.1
		}
	}
	
	for(var i=0; ++i<25;) {
		particles.push(Particle())
	}
	
	console.log(particles[0])
	
	function render() {
		ctx.clearRect(0, 0, c.width, c.height)
		
		particles.forEach(function(p, i) {
			
			angleTools.moveOnAngle(p, p.speed)
			
			p.opacity -= 0.01
			p.speed *= p.friction
			p.radius *= p.friction
			
			p.yVel += p.gravity
			p.y += p.yVel
			
			if(p.opacity < 0) return
			if(p.radius < 0) return
			
			ctx.beginPath()
			ctx.globalAlpha = p.opacity
			ctx.fillStyle = p.color
			ctx.arc(p.x, p.y, p.radius, 0, 2 * Math.PI, false)
			ctx.fill()
		})
	}
	
	;(function renderLoop(){
		requestAnimationFrame(renderLoop)
		render()
	})()
	
	setTimeout(function() {
		document.body.removeChild(c)
	}, 3000)
}

var angleTools={getAngle:function(t,n){var a=n.x-t.x,e=n.y-t.y;return Math.atan2(e,a)/Math.PI*180},getDistance:function(t,n){var a=t.x-n.x,e=t.y-n.y;return Math.sqrt(a*a+e*e)},moveOnAngle:function(t,n){var a=this.getOneFrameDistance(t,n);t.x+=a.x,t.y+=a.y},getOneFrameDistance:function(t,n){return{x:n*Math.cos(t.rotation*Math.PI/180),y:n*Math.sin(t.rotation*Math.PI/180)}}};
function r(a,b,c){ return parseFloat((Math.random()*((a?a:1)-(b?b:0))+(b?b:0)).toFixed(c?c:0)); }