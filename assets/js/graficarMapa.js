import { saveAs } from 'file-saver';
import {fechaHoy, proyeccion3857, proyeccion4326, bbox} from './configuracion.js';
import GeoJSON from 'ol/format/GeoJSON';
import Draw from 'ol/interaction/Draw.js';
import {Vector as VectorSource} from 'ol/source.js';
import {Vector as VectorLayer} from 'ol/layer.js';

let dibujo = null;
const tipoGeometria = document.getElementById('tipoGeometria'),
limpiarDibujo = document.getElementById('limpiarDibujo'),
descargarDibujo = document.getElementById('descargarDibujo');

const fuente = new VectorSource({wrapX: false});
export const dibujoGeometria = new VectorLayer({id: 'dibujoGeometria', source: fuente});

const estilos = {
  Point: {
    'circle-radius': 5,
    'circle-fill-color': 'red',
  },
  LineString: {
    'circle-radius': 5,
    'circle-fill-color': 'red',
    'stroke-color': 'yellow',
    'stroke-width': 2,
  },
  Polygon: {
    'circle-radius': 5,
    'circle-fill-color': 'red',
    'stroke-color': 'yellow',
    'stroke-width': 2,
    'fill-color': 'blue',
  },
  Circle: {
    'circle-radius': 5,
    'circle-fill-color': 'red',
    'stroke-color': 'blue',
    'stroke-width': 2,
    'fill-color': 'yellow',
  },
};

function agregarInteraccion() {
  const tipo = tipoGeometria.value;
  if (tipo !== 'None') {
    dibujo = new Draw({
      source: fuente,
      type: tipoGeometria.value,
      style: estilos[tipo],
    });
    global.mapa.addInteraction(dibujo);
  }
}

tipoGeometria.onchange = function (){  
  if(tipoGeometria.value !== 'None')
  {
    limpiarDibujo.classList.remove('disabled');
  }
  else limpiarDibujo.classList.add('disabled');
  global.mapa.removeInteraction(dibujo);
  agregarInteraccion();
};

descargarDibujo.addEventListener('click', function(){
  const vectorSource = dibujoGeometria.getSource();
  const features = vectorSource.getFeatures();
  if(features.length > 0)
  {
    features.forEach(feature => {
      const geometry = feature.getGeometry();
      geometry.transform(proyeccion3857, proyeccion4326);
    });
    const geoJSONFormat = new GeoJSON();
    const geoJSONData = geoJSONFormat.writeFeatures(features);
    //const geoJSONString = JSON.stringify(geoJSONData, null, 2);
    const blob = new Blob([geoJSONData], {type: 'application/json'});
    const nombreArchivo = 'datos_' + fechaHoy() + '.geojson';
    saveAs(blob, nombreArchivo);
    bbox('mensajeGraficar','Se descargó correctamente: <strong>'+ nombreArchivo + '</strong>', 'primary');
    features.forEach(feature => {
      const geometry = feature.getGeometry();
      geometry.transform(proyeccion4326, proyeccion3857);
    });
    if(features.length === 0) limpiarDibujo.classList.add('disabled');
    tipoGeometria.selectedIndex = 0;
  }
  else
  {
    bbox('mensajeGraficar','<strong>Error: </strong> NO existe registro alguno para la descarga.', 'secondary');
    tipoGeometria.selectedIndex = 0;
  }
});

limpiarDibujo.addEventListener('click', function(){
  document.getElementById('mensajeGraficar').innerHTML = '';
  tipoGeometria.selectedIndex = 0;
  const vectorSource = dibujoGeometria.getSource();
  vectorSource.clear();
  global.mapa.removeInteraction(dibujo);
});