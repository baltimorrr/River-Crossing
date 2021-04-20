let background, canvas, c
let w, h, w2, h2, elements
let boat, cannibal1, monster1, moves, textures, solution


function init() {
    let old = document.querySelector('canvas')
    if(old) old.remove()

    solution = [4, 5, 0, 4, 5,
                4, 0, 4, 4,
                4, 6, 0, 4, 6,
                4, 0, 4, 4,
                1, 2, 0, 1, 2,
                1, 5, 0, 1, 1, 5, 5,
                1, 3, 0, 1, 3,
                6, 0, 6, 6,
                4, 5, 0, 4, 5,
                4, 0, 6, 0, 4, 6]

    canvas = document.createElement('canvas')
    canvas.width = w = innerWidth
    canvas.height = h = innerHeight
    w4 = w/4
    h4 = h/4
    canvas.addEventListener('click', getElement)

    c = canvas.getContext('2d')
    document.body.appendChild(canvas)

    c.shadowColor = 'rbga(0, 0, 0, 0.5)'
    c.shadowBlur = 50

    background = c.createLinearGradient(0, 0, w, 0)
    background.addColorStop(0,'green')
	background.addColorStop(0.2,'green')
	background.addColorStop(0.27,'#654321')
	background.addColorStop(0.3,'blue')
	background.addColorStop(0.5,'#00BFFF')
	background.addColorStop(0.7,'blue')
	background.addColorStop(0.73,'#654321')
	background.addColorStop(0.8,'green')
	background.addColorStop(1,'green')
    c.fillStyle = background

    elements = []

    cannibal1 = new Passenger(textures['img/farmer.png'], w2, h2, 'cannibal', -1, true)
    cannibal2 = new Passenger(textures['img/farmer.png'], w2, h2, 'cannibal', 0, true)
    cannibal3 = new Passenger(textures['img/farmer.png'], w2, h2, 'cannibal', 1, true)
    monster1 = new Passenger(textures['img/wolf.png'], w2, h2, 'monster', 2)
    monster2 = new Passenger(textures['img/wolf.png'], w2, h2, 'monster', 3)
    monster3 = new Passenger(textures['img/wolf.png'], w2, h2, 'monster', 4)
    boat = new Boat(textures['img/boat.png'])

    elements.push(boat)
    elements.push(cannibal1)
    elements.push(cannibal2)
    elements.push(cannibal3)
    elements.push(monster1)
    elements.push(monster2)
    elements.push(monster3)

    let solve = {
        pos: {
            x: w-150,
            y: h-50
        },
        h: 30,
        w: 100,

        show: function() {
            c.fillStyle = 'gray'
            c.fillRect(this.pos.x, this.pos.y, this.w, this.h)
            c.fillStyle = 'black'
            c.font = '1.2rem Arial'
            let text = 'Solve'
            let m = c.measureText(text)
            c.fillText(text, this.pos.x + m.width/2, this.pos.y + 20)
        },

        action: function() {
            init()
            //canvas.removeEventListener('click', getElement)
            solveMe()
        }
    }

    elements.push(solve)
    draw()
}

function solveMe() {
    if(solution.length > 0) {
        elements[solution.shift()].action()
        draw()
        setTimeout(solveMe, 1000)
    }
}

function draw() {
    c.fillStyle = background
    c.fillRect(0, 0, w, h)

    for(let i = 0; i < elements.length; i++) {
        elements[i].show()
    }

    check()
}

function check() {
}

let getElement = function(e) {
    let x = e.clientX
    let y = e.clientY

    let found = null
    for(let i = 0; i < elements.length; i++) {
        let e = elements[i]
        if(x > e.pos.x && (x < e.pos.x + e.w) && y > e.pos.y && (y < e.pos.y + e.h)){
            found = e
        }
    }

    if(found) found.action()
    draw()
}

function loadImages() {
    let total = 0
    // let imgSrc = ['img/farmer.png', 'img/farmer.png', 'img/farmer.png', 
    // 'img/wofl.png', 'img/wofl.png', 'img/wofl.png', 'img/boat.png']

    let imgSrc = ['img/farmer.png', 'img/farmer.png', 'img/farmer.png',
     'img/wolf.png', 'img/wolf.png', 'img/wolf.png', 'img/boat.png']
    textures = {}
    for(name of imgSrc) {
        textures[name] = new Image()
        textures[name].src = name
        textures[name].onload = function() {
            total++
            if(total == imgSrc.length) init()
        }
    }
}

loadImages()
//init()

window.onresize = function() {
    init()
}
