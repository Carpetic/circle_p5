
let planete = []
let slider = null
let NBRCIRCLE = 6
let width = 0;
let height = 0;


function setup() {
    createCanvas(windowWidth, windowHeight);
    let velocity = 0
    let sizeP = 0
    let color = {r:0, g:0, b:0};
    width = windowWidth;
    height = windowHeight;
    planete.push({x:width / 2, y:height / 2, velocity:0, sizeP:55, color:{r:247, g:199, b:0}})
    for (let i = 1; i < NBRCIRCLE; i++) {
        if (random(1) >= 0.5)
            x = (windowWidth / 2) + random(50, 300)
        else
            x = (windowWidth / 2) - random(50, 300)
        if (random(1) >= 0.5)
            y = (windowHeight / 2) + random(50, 300)
        else
            y = (windowHeight / 2) - random(50, 300)
        velocity = random(1, 7)
        sizeP = random(10, 50)
        color = {r:random(255), g:random(255), b:random(255)}
        planete.push({x:x, y:y, velocity:velocity, sizeP:sizeP, color:color})
    }
    trail = 0.05
    slider = createSlider(0, 1, trail, 0.05)
    slider.input(() => {
        trail = slider.value()
    })
    slider.position((windowWidth - 100) / 2 , 10);
}

function draw() {
    background(`rgba(0, 0, 0, ${trail})`);
    noStroke()
    let c = 0
    for (let i = 0; i < NBRCIRCLE; i++) {
        c = color(planete[i].color.r, planete[i].color.g, planete[i].color.b)
        fill(c)
        circle(planete[i].x, planete[i].y, planete[i].sizeP)
        orbit(planete[i], planete[i].velocity)
        collision(planete[i], i)
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight)
}

function orbit(c, angle) {
    let xM, yM, x, y;
    let center = {x:0, y:0}

    angle *= Math.PI / 360;

    for (let i = 1; i < NBRCIRCLE; i++) {
        if (random(1) >= 0.5)
            center.x += ((windowWidth) / 2) + (planete[i].x * 0.15)
        else
            center.x += ((windowWidth) / 2) + (planete[i].x * 0.10)
        if (random(1) >= 0.5)
            center.y += ((windowHeight) / 2) + (planete[i].y * 0.15)
        else
            center.y += ((windowHeight) / 2) + (planete[i].y * 0.10)

    }

    center.x /= NBRCIRCLE
    center.y /= NBRCIRCLE

    xM = c.x - center.x;
    yM = c.y - center.y;

    x = xM * Math.cos(angle) + yM * Math.sin (angle) + center.x;
    y = - xM * Math.sin(angle) + yM * Math.cos (angle) + center.y;

    c.x = x
    c.y = y
}

function collision(circle, i) {
    let dx;
    let dy;
    let distance;

    for (let a = 0; a < NBRCIRCLE; a++) {
        if (i == a)
            continue;
        dx = circle.x - planete[a].x;
        dy = circle.y - planete[a].y;
        distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < (circle.sizeP / 2) + (planete[a].sizeP / 2)) {
            // circle.color = {r:255, g:255, b:255}
            circle.x = circle.x + dx / 2;
            circle.y = circle.y + dy / 2;
        }
    }
}
