import {Circle as CircleStyle, Fill, RegularShape, Stroke, Style, Text} from 'ol/style.js';
import {Draw, Modify} from 'ol/interaction.js';
import {LineString, Point} from 'ol/geom.js';
import {Vector as VectorSource} from 'ol/source.js';
import {Vector as VectorLayer} from 'ol/layer.js';
import {getArea, getLength} from 'ol/sphere.js';

const tipoCalculo = document.getElementById('tipoCalculo');

const style = new Style({
  fill: new Fill({
    color: 'rgba(255, 255, 0, 0.2)',
  }),
  stroke: new Stroke({
    color: 'rgba(0, 0, 0, 0.5)',
    lineDash: [10, 10],
    width: 2,
  }),
  image: new CircleStyle({
    radius: 5,
    stroke: new Stroke({
      color: 'rgba(0, 0, 0, 0.7)',
    }),
    fill: new Fill({
      color: 'rgba(255, 255, 0, 0.2)',
    }),
  }),
});

const labelStyle = new Style({
  text: new Text({
    font: '14px Calibri,sans-serif',
    fill: new Fill({
      color: 'rgba(255, 255, 0, 1)',
    }),
    backgroundFill: new Fill({
      color: 'rgba(0, 0, 0, 0.7)',
    }),
    padding: [3, 3, 3, 3],
    textBaseline: 'bottom',
    offsetY: -15,
  }),
  image: new RegularShape({
    radius: 8,
    points: 3,
    angle: Math.PI,
    displacement: [0, 10],
    fill: new Fill({
      color: 'rgba(0, 0, 0, 0.7)',
    }),
  }),
});

const tipStyle = new Style({
  text: new Text({
    font: '12px Calibri,sans-serif',
    fill: new Fill({
      color: 'rgba(255, 255, 0, 1)',
    }),
    backgroundFill: new Fill({
      color: 'rgba(0, 0, 0, 0.4)',
    }),
    padding: [2, 2, 2, 2],
    textAlign: 'left',
    offsetX: 15,
  }),
});

const modifyStyle = new Style({
  image: new CircleStyle({
    radius: 5,
    stroke: new Stroke({
      color: 'rgba(0, 0, 0, 0.7)',
    }),
    fill: new Fill({
      color: 'rgba(0, 0, 0, 0.4)',
    }),
  }),
  text: new Text({
    text: 'Arrastra para modificar',
    font: '12px Calibri,sans-serif',
    fill: new Fill({
      color: 'rgba(255, 255, 0, 1)',
    }),
    backgroundFill: new Fill({
      color: 'rgba(0, 0, 0, 0.7)',
    }),
    padding: [2, 2, 2, 2],
    textAlign: 'left',
    offsetX: 15,
  }),
});

const segmentStyle = new Style({
  text: new Text({
    font: '12px Calibri,sans-serif',
    fill: new Fill({
      color: 'rgba(255, 255, 0, 1)',
    }),
    backgroundFill: new Fill({
      color: 'rgba(0, 0, 0, 0.4)',
    }),
    padding: [2, 2, 2, 2],
    textBaseline: 'bottom',
    offsetY: -12,
  }),
  image: new RegularShape({
    radius: 6,
    points: 3,
    angle: Math.PI,
    displacement: [0, 8],
    fill: new Fill({
      color: 'rgba(0, 0, 0, 0.4)',
    }),
  }),
});

const segmentStyles = [segmentStyle];

const formatLength = function (line) {
  const length = getLength(line);
  let output;
  if (length > 100) {
    output = Math.round((length / 1000) * 100) / 100 + ' km';
  } else {
    output = Math.round(length * 100) / 100 + ' m';
  }
  return output;
};

const formatArea = function (polygon) {
  const area = getArea(polygon);
  let output;
  if (area > 10000) {
    output = Math.round((area / 1000000) * 100) / 100 + ' km\xB2';
  } else {
    output = Math.round(area * 100) / 100 + ' m\xB2';
  }
  return output;
};

const source = new VectorSource();

export const modificarEstilo = new Modify({source: source, style: modifyStyle});

let tipPoint;

function styleFunction(feature, segments, drawType, tip) {
  const styles = [];
  const geometry = feature.getGeometry();
  const type = geometry.getType();
  let point, label, line;
  if (!drawType || drawType === type || type === 'Point') {
    styles.push(style);
    if (type === 'Polygon') {
      point = geometry.getInteriorPoint();
      label = formatArea(geometry);
      line = new LineString(geometry.getCoordinates()[0]);
    } else if (type === 'LineString') {
      point = new Point(geometry.getLastCoordinate());
      label = formatLength(geometry);
      line = geometry;
    }
  }
  if (segments && line) {
    let count = 0;
    line.forEachSegment(function (a, b) {
      const segment = new LineString([a, b]);
      const label = formatLength(segment);
      if (segmentStyles.length - 1 < count) {
        segmentStyles.push(segmentStyle.clone());
      }
      const segmentPoint = new Point(segment.getCoordinateAt(0.5));
      segmentStyles[count].setGeometry(segmentPoint);
      segmentStyles[count].getText().setText(label);
      styles.push(segmentStyles[count]);
      count++;
    });
  }
  if (label) {
    labelStyle.setGeometry(point);
    labelStyle.getText().setText(label);
    styles.push(labelStyle);
  }
  if (
    tip &&
    type === 'Point' &&
    !modificarEstilo.getOverlay().getSource().getFeatures().length
  ) {
    tipPoint = geometry;
    tipStyle.getText().setText(tip);
    styles.push(tipStyle);
  }
  return styles;
}

export const vectorCalculo = new VectorLayer({
  source: source,
  style: function (feature) {
    return styleFunction(feature, true);
  },
});



let draw; // global so we can remove it later

function addInteraction() {
  const drawType = tipoCalculo.value;
  const activeTip =
    'Haga clic para continuar dibujando el ' +
    (drawType === 'Polygon' ? 'Polígono' : 'Línea');
  const idleTip = 'Haga clic para comenzar a medir';
  let tip = idleTip;
  draw = new Draw({
    source: source,
    type: drawType,
    style: function (feature) {
      return styleFunction(feature, true, drawType, tip);
    },
  });
  draw.on('drawstart', function(){
    //if (clearPrevious.checked) {
    if (true) {
      source.clear();
    }
    modificarEstilo.setActive(false);
    tip = activeTip;
  });
  draw.on('drawend', function () {
    modifyStyle.setGeometry(tipPoint);
    modificarEstilo.setActive(true);
    global.mapa.once('pointermove', function () {
      modifyStyle.setGeometry();
    });
    tip = idleTip;
  });
  modificarEstilo.setActive(true);
  global.mapa.addInteraction(draw);
}

tipoCalculo.onchange = function () {
    global.mapa.removeInteraction(draw);
    if(this.value != 'None') addInteraction();      
};

limpiarCalculo.addEventListener('click', function(){
    global.mapa.removeInteraction(draw);
    source.clear();
    let opcion = tipoCalculo.querySelector('option[value="None"]');
    opcion.selected = true;
});
//addInteraction();

/*showSegments.onchange = function () {
  vector.changed();
  draw.getOverlay().changed();
};*/