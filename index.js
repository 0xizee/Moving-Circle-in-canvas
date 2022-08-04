// import utils from './utils'
function randomIntFromRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
  }
  
  function randomColor(colors) {
    return colors[Math.floor(Math.random() * colors.length)]
  }
  
  function distance(x1, y1, x2, y2) {
    const xDist = x2 - x1
    const yDist = y2 - y1
  
    return Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2))
  }
  
  
  const canvas = document.querySelector('canvas')
  const c = canvas.getContext('2d')
  
  canvas.width = innerWidth
  canvas.height = innerHeight
  
  const mouse = {
    x: innerWidth / 2,
    y: innerHeight / 2
  }
  
  const colors =  ["#a2a0a1" , "#929092" , "#817e80" ,"#767476"]// ['#21 85C5', '#7ECEFD', '#FFF6E5', '#FF7F66']
  
  // Event Listeners
  addEventListener('mousemove', (event) => {
    mouse.x = event.clientX
    mouse.y = event.clientY
  })
  
  addEventListener('resize', () => {
    canvas.width = innerWidth
    canvas.height = innerHeight
  
    init()
  })
  
  // Objects
  class Particle {
    constructor(x, y, radius, color) {
      this.x = x
      this.y = y
      this.radius = radius
      this.color = color
      this.radians = Math.random() * Math.PI * 2
      this.velocity = 0.02
      this.distance = randomIntFromRange(50 , 120)
      this.lastPointMouse = {
        x : x , y : y
      }
    }
  
    draw = lastPoint => {
      c.beginPath()
     
     c.strokeStyle = this.color
     c.lineWidth = this.radius
     c.moveTo(lastPoint.x , lastPoint.y)
     c.lineTo(this.x , this.y)
     c.stroke()
      c.closePath()
    }
  
    update() {
      const lastPoint = {x : this.x  , y : this.y}
      this.radians += this.velocity;
      
      this.lastPointMouse.x += (mouse.x - this.lastPointMouse.x) * 0.05
      this.lastPointMouse.y += (mouse.y - this.lastPointMouse.y) * 0.05
  
      this.x = this.lastPointMouse.x+ Math.cos(this.radians) *this.distance ;
      this.y = this.lastPointMouse.y+ Math.sin(this.radians) *this.distance;
      this.draw(lastPoint)
  
    }
  }
  
  // Implementation
  let particles;
  function init() {
    particles = []
  
    for (let i = 0; i < 60; i++) {
      const radius = (Math.random() * 2) + 1
      particles.push(new Particle(canvas.width /2 , canvas.height /2 , radius , randomColor(colors)));
    }
    console.log(particles)
  }
  
  // Animation Loop
  function animate() {
    requestAnimationFrame(animate)
    c.fillStyle = "rgba(255 , 255 , 255 , 0.02)"
    c.fillRect(0, 0, canvas.width, canvas.height)
  
   
    particles.forEach(object => {
     object.update()
    })
  }
  
  init()
  animate()
  