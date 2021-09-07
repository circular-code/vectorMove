function setup() {
    // set up canvas
    var canvas = createCanvas(windowWidth, windowHeight);
    canvas.style('display', 'block');
    background(0);

    // set up data
    thing = new Thing(200,400);
    target = new Target();
}
  
function draw() {
    background(0);
    thing.update();
    thing.render();
    target.render();

    if (p5.Vector.sub(thing.pos, target.pos).mag() < (16 + (thing.thicc / 2))) {
        target = new Target();
        thing.thicc += 5;
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

class Target {
    constructor (x, y) {
        this.pos = createVector(random(windowWidth),random(windowHeight));
    }

    render () {
        stroke(255);
        strokeWeight(0);
        fill(255, 100, 100);
        ellipse(this.pos.x, this.pos.y, 32);
    }
}

class Thing {
    constructor(x, y) {
        this.pos = createVector(x, y);
        this.vel = createVector(1,-1);
        this.thicc = 5;
    }

    update() {
        // let mouse = createVector(mouseX, mouseY);
        // this.acc = p5.Vector.sub(mouse, this.pos);
        this.acc = p5.Vector.sub(target.pos, this.pos);
        this.acc.setMag(1);

        this.vel.add(this.acc);
        this.vel.limit(2);

        this.pos.add(this.vel);
    }

    render() {
        fill(255, 100);
        ellipse(this.pos.x, this.pos.y, this.thicc);
    }
}