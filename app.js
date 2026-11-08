// Управляет интерактивной картой сетевых событий.
const SVG_NS = "http://www.w3.org/2000/svg";
const WIDTH = 1440;
const HEIGHT = 760;

const gridLayer = document.getElementById("gridLayer");
const landLayer = document.getElementById("landLayer");
const routeLayer = document.getElementById("routeLayer");
const targetLayer = document.getElementById("targetLayer");
const nodeLayer = document.getElementById("nodeLayer");
const labelLayer = document.getElementById("labelLayer");
const codeRain = document.getElementById("codeRain");
const signalClock = document.getElementById("signalClock");
const signalPulse = document.getElementById("signalPulse");

const targets = [
  { code: "NYC", lon: -74.006, lat: 40.7128 },
  { code: "BOS", lon: -71.0589, lat: 42.3601 },
  { code: "CHI", lon: -87.6298, lat: 41.8781 },
  { code: "MIA", lon: -80.1918, lat: 25.7617 },
  { code: "DAL", lon: -96.797, lat: 32.7767 },
  { code: "SEA", lon: -122.3321, lat: 47.6062 },
  { code: "SFO", lon: -122.4194, lat: 37.7749 },
  { code: "LAX", lon: -118.2437, lat: 34.0522 },
  { code: "TOR", lon: -79.3832, lat: 43.6532 },
  { code: "MEX", lon: -99.1332, lat: 19.4326 }
];

const europeNodes = [
  { city: "London", lon: -0.1276, lat: 51.5072 },
  { city: "Paris", lon: 2.3522, lat: 48.8566 },
  { city: "Amsterdam", lon: 4.9041, lat: 52.3676 },
  { city: "Brussels", lon: 4.3517, lat: 50.8503 },
  { city: "Berlin", lon: 13.405, lat: 52.52 },
  { city: "Hamburg", lon: 9.9937, lat: 53.5511 },
  { city: "Munich", lon: 11.582, lat: 48.1351 },
  { city: "Frankfurt", lon: 8.6821, lat: 50.1109 },
  { city: "Cologne", lon: 6.9603, lat: 50.9375 },
  { city: "Zurich", lon: 8.5417, lat: 47.3769 },
  { city: "Milan", lon: 9.19, lat: 45.4642 },
  { city: "Turin", lon: 7.6869, lat: 45.0703 },
  { city: "Venice", lon: 12.3155, lat: 45.4408 },
  { city: "Rome", lon: 12.4964, lat: 41.9028 },
  { city: "Naples", lon: 14.2681, lat: 40.8518 },
  { city: "Madrid", lon: -3.7038, lat: 40.4168 },
  { city: "Barcelona", lon: 2.1734, lat: 41.3851 },
  { city: "Lisbon", lon: -9.1393, lat: 38.7223 },
  { city: "Lyon", lon: 4.8357, lat: 45.764 },
  { city: "Marseille", lon: 5.3698, lat: 43.2965 },
  { city: "Nice", lon: 7.262, lat: 43.7102 },
  { city: "Dublin", lon: -6.2603, lat: 53.3498 },
  { city: "Edinburgh", lon: -3.1883, lat: 55.9533 },
  { city: "Manchester", lon: -2.2426, lat: 53.4808 },
  { city: "Copenhagen", lon: 12.5683, lat: 55.6761 },
  { city: "Oslo", lon: 10.7522, lat: 59.9139 },
  { city: "Stockholm", lon: 18.0686, lat: 59.3293 },
  { city: "Helsinki", lon: 24.9384, lat: 60.1699 },
  { city: "Tallinn", lon: 24.7536, lat: 59.437 },
  { city: "Riga", lon: 24.1052, lat: 56.9496 },
  { city: "Vilnius", lon: 25.2797, lat: 54.6872 },
  { city: "Warsaw", lon: 21.0122, lat: 52.2297 },
  { city: "Krakow", lon: 19.945, lat: 50.0647 },
  { city: "Prague", lon: 14.4378, lat: 50.0755 },
  { city: "Vienna", lon: 16.3738, lat: 48.2082 },
  { city: "Bratislava", lon: 17.1077, lat: 48.1486 },
  { city: "Budapest", lon: 19.0402, lat: 47.4979 },
  { city: "Zagreb", lon: 15.9819, lat: 45.815 },
  { city: "Ljubljana", lon: 14.5058, lat: 46.0569 },
  { city: "Belgrade", lon: 20.4489, lat: 44.7866 },
  { city: "Sofia", lon: 23.3219, lat: 42.6977 },
  { city: "Bucharest", lon: 26.1025, lat: 44.4268 },
  { city: "Athens", lon: 23.7275, lat: 37.9838 },
  { city: "Thessaloniki", lon: 22.9444, lat: 40.6401 },
  { city: "Istanbul", lon: 28.9784, lat: 41.0082 },
  { city: "Kyiv", lon: 30.5234, lat: 50.4501 },
  { city: "Lviv", lon: 24.0316, lat: 49.8397 },
  { city: "Odesa", lon: 30.7233, lat: 46.4825 },
  { city: "Minsk", lon: 27.5615, lat: 53.9045 },
  { city: "Chisinau", lon: 28.8638, lat: 47.0105 }
].map((node, index) => ({ ...node, id: index + 1, label: `Satashi ${index + 1}` }));

const continents = [
  {
    name: "North America",
    points: [
      [-168, 71],
      [-151, 68],
      [-139, 62],
      [-126, 58],
      [-112, 58],
      [-96, 52],
      [-83, 48],
      [-63, 51],
      [-53, 44],
      [-61, 35],
      [-78, 30],
      [-84, 25],
      [-96, 20],
      [-108, 24],
      [-117, 32],
      [-124, 41],
      [-136, 49],
      [-149, 56],
      [-165, 61]
    ]
  },
  {
    name: "Central America",
    points: [
      [-111, 25],
      [-98, 22],
      [-88, 18],
      [-81, 11],
      [-77, 8],
      [-84, 7],
      [-91, 14],
      [-105, 17]
    ]
  },
  {
    name: "South America",
    points: [
      [-81, 12],
      [-68, 7],
      [-52, -2],
      [-45, -13],
      [-48, -24],
      [-58, -34],
      [-64, -49],
      [-72, -55],
      [-77, -42],
      [-74, -25],
      [-81, -12],
      [-78, 3]
    ]
  },
  {
    name: "Greenland",
    points: [
      [-52, 83],
      [-28, 78],
      [-24, 70],
      [-39, 61],
      [-55, 60],
      [-68, 67],
      [-68, 77]
    ]
  },
  {
    name: "Europe",
    points: [
      [-11, 58],
      [-2, 64],
      [12, 61],
      [27, 60],
      [40, 55],
      [36, 46],
      [28, 42],
      [19, 39],
      [10, 44],
      [2, 42],
      [-8, 43],
      [-10, 50]
    ]
  },
  {
    name: "Asia",
    points: [
      [36, 69],
      [58, 66],
      [82, 70],
      [107, 63],
      [135, 58],
      [166, 53],
      [171, 43],
      [151, 34],
      [130, 31],
      [118, 18],
      [101, 10],
      [82, 19],
      [70, 28],
      [56, 24],
      [42, 32],
      [33, 44],
      [40, 55]
    ]
  },
  {
    name: "Africa",
    points: [
      [-17, 36],
      [3, 37],
      [28, 31],
      [39, 17],
      [45, 3],
      [40, -16],
      [29, -31],
      [18, -35],
      [7, -27],
      [-7, -34],
      [-16, -20],
      [-10, -2],
      [-17, 16]
    ]
  },
  {
    name: "Australia",
    points: [
      [113, -12],
      [131, -10],
      [151, -20],
      [154, -31],
      [141, -39],
      [121, -35],
      [113, -24]
    ]
  },
  {
    name: "Japan",
    points: [
      [130, 44],
      [142, 42],
      [145, 35],
      [138, 31],
      [131, 34]
    ]
  },
  {
    name: "United Kingdom",
    points: [
      [-8, 58],
      [-1, 56],
      [1, 51],
      [-4, 49],
      [-8, 53]
    ]
  },
  {
    name: "Madagascar",
    points: [
      [47, -13],
      [51, -20],
      [49, -27],
      [45, -25],
      [44, -17]
    ]
  }
];

function createElement(tagName, attributes = {}) {
  const element = document.createElementNS(SVG_NS, tagName);

  for (const [key, value] of Object.entries(attributes)) {
    element.setAttribute(key, value);
  }

  return element;
}

function project(lon, lat) {
  const x = ((lon + 180) / 360) * WIDTH;
  const y = ((90 - lat) / 180) * HEIGHT;
  return { x, y };
}

function polygonPath(points) {
  return points
    .map(([lon, lat], index) => {
      const point = project(lon, lat);
      return `${index === 0 ? "M" : "L"} ${point.x.toFixed(1)} ${point.y.toFixed(1)}`;
    })
    .join(" ")
    .concat(" Z");
}

function curvePath(from, to, index) {
  const distance = Math.abs(to.x - from.x);
  const lift = 54 + (index % 8) * 12 + distance * 0.05;
  const spread = 98 + (index % 6) * 18;
  const c1x = from.x - spread;
  const c1y = from.y - lift;
  const c2x = to.x + spread * 0.9;
  const c2y = to.y - lift * 0.72;

  return `M ${from.x.toFixed(1)} ${from.y.toFixed(1)} C ${c1x.toFixed(1)} ${c1y.toFixed(1)} ${c2x.toFixed(1)} ${c2y.toFixed(1)} ${to.x.toFixed(1)} ${to.y.toFixed(1)}`;
}

function labelPosition(index) {
  const lanes = [
    { x: 556, y: 92, step: 18, rows: 13 },
    { x: 684, y: 86, step: 18, rows: 13 },
    { x: 812, y: 94, step: 18, rows: 12 },
    { x: 940, y: 112, step: 18, rows: 12 }
  ];
  const laneIndex = index < 26 ? Math.floor(index / 13) : 2 + Math.floor((index - 26) / 12);
  const lane = lanes[laneIndex];
  const row = laneIndex < 2 ? index % 13 : (index - 26) % 12;

  return {
    x: lane.x + (row % 2) * 7,
    y: lane.y + row * lane.step
  };
}

function drawGrid() {
  for (let lon = -180; lon <= 180; lon += 30) {
    const from = project(lon, 82);
    const to = project(lon, -62);
    gridLayer.append(
      createElement("line", {
        x1: from.x,
        y1: from.y,
        x2: to.x,
        y2: to.y,
        class: lon % 60 === 0 ? "major" : ""
      })
    );
  }

  for (let lat = -60; lat <= 75; lat += 15) {
    const from = project(-180, lat);
    const to = project(180, lat);
    gridLayer.append(
      createElement("line", {
        x1: from.x,
        y1: from.y,
        x2: to.x,
        y2: to.y,
        class: lat % 30 === 0 ? "major" : ""
      })
    );
  }

  const equator = project(-180, 0);
  gridLayer.append(
    createElement("line", {
      x1: 0,
      y1: equator.y,
      x2: WIDTH,
      y2: equator.y,
      class: "major"
    })
  );
}

function drawLand() {
  for (const continent of continents) {
    const path = polygonPath(continent.points);
    landLayer.append(createElement("path", { d: path, class: "coast-shadow" }));
    landLayer.append(createElement("path", { d: path, class: "land" }));
  }
}

function drawTargets() {
  targets.forEach((target, index) => {
    const point = project(target.lon, target.lat);
    const group = createElement("g", {
      class: "target",
      style: `animation-delay:${(index * 0.18).toFixed(2)}s`
    });
    const impact = createElement("circle", {
      cx: point.x,
      cy: point.y,
      r: 24 + (index % 3) * 4,
      class: "target-impact"
    });
    const ring = createElement("circle", {
      cx: point.x,
      cy: point.y,
      r: 12,
      class: "target-ring",
      style: `animation-delay:${(index * 0.2).toFixed(2)}s`
    });
    const dot = createElement("circle", {
      cx: point.x,
      cy: point.y,
      r: 3.8,
      class: "target-dot"
    });
    const text = createElement("text", {
      x: point.x + 10,
      y: point.y - 10,
      class: "target-text"
    });
    text.textContent = target.code;

    group.append(impact, ring, dot, text);
    targetLayer.append(group);
  });
}

function drawRoutes() {
  europeNodes.forEach((node, index) => {
    const from = project(node.lon, node.lat);
    const target = targets[(index * 3 + 2) % targets.length];
    const to = project(target.lon, target.lat);
    const d = curvePath(from, to, index);

    routeLayer.append(
      createElement("path", {
        d,
        class: "route",
        style: `animation-delay:${(-index * 0.09).toFixed(2)}s`
      })
    );

    if (index % 3 === 0) {
      routeLayer.append(
        createElement("path", {
          d,
          class: "route route-hot",
          style: `animation-delay:${(-index * 0.15).toFixed(2)}s`
        })
      );
    }

    const packet = createElement("circle", {
      r: index % 5 === 0 ? 3.4 : 2.4,
      class: index % 5 === 0 ? "packet alt" : "packet"
    });
    const motion = createElement("animateMotion", {
      dur: `${2.8 + (index % 8) * 0.17}s`,
      begin: `${(index % 11) * 0.13}s`,
      repeatCount: "indefinite",
      path: d
    });
    packet.append(motion);
    routeLayer.append(packet);
  });
}

function drawNodesAndLabels() {
  europeNodes.forEach((node, index) => {
    const point = project(node.lon, node.lat);
    const label = labelPosition(index);
    const textWidth = node.id < 10 ? 58 : 66;

    nodeLayer.append(
      createElement("circle", {
        cx: point.x,
        cy: point.y,
        r: 5.4,
        class: "node-halo",
        style: `animation-delay:${(index * 0.06).toFixed(2)}s`
      })
    );
    nodeLayer.append(
      createElement("circle", {
        cx: point.x,
        cy: point.y,
        r: 2.9,
        class: index % 9 === 0 ? "node-dot alt" : "node-dot"
      })
    );

    labelLayer.append(
      createElement("line", {
        x1: point.x,
        y1: point.y,
        x2: label.x,
        y2: label.y,
        class: "leader"
      })
    );

    const group = createElement("g", { class: "label-group" });
    group.append(
      createElement("rect", {
        x: label.x - 5,
        y: label.y - 9,
        width: textWidth,
        height: 17,
        class: "satashi-tag"
      })
    );

    const text = createElement("text", {
      x: label.x,
      y: label.y,
      class: "satashi-label"
    });
    text.textContent = node.label;
    group.append(text);
    labelLayer.append(group);
  });
}

function initCodeRain() {
  if (!codeRain) {
    return;
  }

  const ctx = codeRain.getContext("2d");
  const glyphs = "01 SATASHI SIGNAL VISUAL MODE GRID SYNC ";
  let columns = [];
  let fontSize = 15;
  let width = 0;
  let height = 0;

  function resize() {
    const rect = codeRain.getBoundingClientRect();
    const scale = window.devicePixelRatio || 1;
    width = Math.max(1, Math.floor(rect.width));
    height = Math.max(1, Math.floor(rect.height));
    codeRain.width = Math.floor(width * scale);
    codeRain.height = Math.floor(height * scale);
    ctx.setTransform(scale, 0, 0, scale, 0, 0);
    fontSize = width < 700 ? 12 : 15;
    columns = Array.from({ length: Math.ceil(width / fontSize) }, () => ({
      y: Math.random() * height,
      speed: 0.35 + Math.random() * 1.25,
      alpha: 0.12 + Math.random() * 0.34
    }));
  }

  function draw() {
    ctx.fillStyle = "rgba(1, 2, 2, 0.12)";
    ctx.fillRect(0, 0, width, height);
    ctx.font = `${fontSize}px ui-monospace, SFMono-Regular, Menlo, Consolas, monospace`;

    columns.forEach((column, index) => {
      const glyph = glyphs[Math.floor(Math.random() * glyphs.length)];
      const x = index * fontSize;
      ctx.fillStyle = `rgba(76, 255, 158, ${column.alpha})`;
      ctx.fillText(glyph, x, column.y);
      column.y += fontSize * column.speed;

      if (column.y > height + fontSize && Math.random() > 0.975) {
        column.y = -fontSize * (2 + Math.random() * 18);
        column.speed = 0.35 + Math.random() * 1.25;
        column.alpha = 0.12 + Math.random() * 0.34;
      }
    });

    requestAnimationFrame(draw);
  }

  resize();
  window.addEventListener("resize", resize);
  requestAnimationFrame(draw);
}

function initSignalHud() {
  const phrases = [
    "SIGNAL 07",
    "GRID 19",
    "NODE 50",
    "SYNC 33",
    "TRACE 12",
    "VISUAL 88"
  ];
  let index = 0;

  function tick() {
    const now = new Date();

    if (signalClock) {
      signalClock.textContent = now.toLocaleTimeString("ru-RU", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit"
      });
    }

    if (signalPulse) {
      signalPulse.textContent = phrases[index % phrases.length];
      index += 1;
    }
  }

  tick();
  setInterval(tick, 1000);
}

drawGrid();
drawLand();
drawRoutes();
drawTargets();
drawNodesAndLabels();
initCodeRain();
initSignalHud();
