let canvas = document.getElementById('myCanvas')

canvas.width = window.innerWidth
canvas.height = window.innerHeight

let ctx = canvas.getContext('2d')

window.addEventListener('resize', function (event) {
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
})
function Ball(x, y, dx, dy, radius, color) {
  this.x = x
  this.y = y
  this.dx = dx
  this.dy = dy
  this.radius = radius
  this.color = color

  this.draw = function () {
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false)
    ctx.fillStyle = this.color
    ctx.fill()
    ctx.closePath()
  }

  this.updated = function () {
    if (this.x + this.radius > canvas.width || this.x - this.radius < 0) {
      this.dx = -this.dx
    }
    if (this.y + this.radius > canvas.height || this.y - this.radius < 0) {
      this.dx = -this.dy
    }
    this.x += this.dx
    this.y += this.dy
    this.draw()
  }
}

let ballArray = []
let colorArray = ['#7db695', '#41897d', '#122d40', '#9dbe8f', '#eab543', '#ef6e73', '#6c9dc6']
for (let i = 0; i < 350; i++) {
  let radius = Math.random() * 4 + 1
  let x = Math.random() * canvas.width
  let y = Math.random() * canvas.height
  let dx = (Math.random() - 0.5) * 2
  let dy = (Math.random() - 0.5) * 2
  let color = colorArray[Math.floor(Math.random() * 5)]
  ballArray.push(new Ball(x, y, dx, dy, radius, color))
}

function animate() {
  requestAnimationFrame(animate)
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  for (let b of ballArray) {
    b.updated()
  }
}
animate()
