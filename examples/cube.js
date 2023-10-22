const cube = new W3D("sketch", 800, 800, update);

const cubeVertices = [
  [-1, -1, -1],
  [1, -1, -1],
  [1, 1, -1],
  [-1, 1, -1],
  [-1, -1, 1],
  [1, -1, 1],
  [1, 1, 1],
  [-1, 1, 1],
];

const cubeEdges = [
  [0, 1],
  [1, 2],
  [2, 3],
  [3, 0],
  [4, 5],
  [5, 6],
  [6, 7],
  [7, 4],
  [0, 4],
  [1, 5],
  [2, 6],
  [3, 7],
];

let angleX = 0;
let angleY = 0;

function update() {
  cube.ctx.lineWidth = 1;

  cube.clear();
  cube.background(240, 240, 240);
  cube.text("3D Cube Rotation", 10, 20, 18, "black");

  const t = Math.tan(angleX);
  const cosX = Math.cos(angleX);
  const sinX = Math.sin(angleX);
  const cosY = Math.cos(angleY);
  const sinY = Math.sin(angleY);

  const vertices = [];

  for (let i = 0; i < cubeVertices.length; i++) {
    const x0 = cubeVertices[i][0];
    const y0 = cubeVertices[i][1];
    const z0 = cubeVertices[i][2];

    const x1 = cosY * x0 - sinY * z0;
    const z1 = sinY * x0 + cosY * z0;
    const x2 = cosX * x1 + sinX * y0;
    const y2 = -sinX * x1 + cosX * y0;

    vertices.push([x2, y2, z1]);
  }

  for (let i = 0; i < cubeEdges.length; i++) {
    const [start, end] = cubeEdges[i];
    const startPoint = vertices[start];
    const endPoint = vertices[end];

    cube.line(
      startPoint[0] * 100 + cube.width / 2,
      startPoint[1] * 100 + cube.height / 2,
      endPoint[0] * 100 + cube.width / 2,
      endPoint[1] * 100 + cube.height / 2,
      "black"
    );
  }

  angleX += 0.01;
  angleY += 0.02;
}

cube.start();
