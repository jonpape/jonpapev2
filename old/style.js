let limit;
let count;
let space;
let minDim;
let anchorHue;
let hueRange;
let smoothness;
let mappingDirection;

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  pixelDensity(Math.min(window.devicePixelRatio, 2));
  noLoop();
  noStroke();
  angleMode(DEGREES);
  colorMode(HSB, 360, 100, 100);
  resetMountain();
  draw();
}

function resetMountain() {
  minDim = windowWidth < windowHeight ? windowWidth : windowHeight;
  limit = minDim / random(1.3, 2);
  count = random(100, 150);
  space = windowWidth / count;
  hueRange = random(160, 300);
  anchorHue = random(360);
  smoothness = random(10, 15);
  mappingDirection = random([true, false]);
}

const getNoise = (i, j) => {
  const value = noise(i / smoothness, j / smoothness);
  return map(value, 0, 1, -limit / 3, limit);
};

function mountainMaker() {
  for (let i = 0; i < count; i++) {
    for (let j = 0; j < count; j++) {
      let from = mappingDirection ? -limit / 3 : limit;
      let to = mappingDirection ? limit : -limit / 3;

      const hue = map(
        getNoise(i, j),
        from,
        to,
        anchorHue - hueRange,
        anchorHue + hueRange
      );

      fill(hue, 100, 100);
      beginShape();
      vertex((i + 1) * space, (j + 1) * space, getNoise(i + 1, j + 1));
      vertex((i + 1) * space, (j - 1) * space, getNoise(i + 1, j - 1));
      vertex((i - 1) * space, (j - 1) * space, getNoise(i - 1, j - 1));
      vertex((i - 1) * space, (j + 1) * space, getNoise(i - 1, j + 1));
      endShape();
    }
  }
}

function draw() {
  background(0);
  push();
  translate(-windowWidth / 2, minDim / 10);
  rotateX(random(50, 65));
  mountainMaker();
  pop();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  resetMountain();
  clear();
  draw();
}
