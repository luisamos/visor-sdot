import GeoJSON from 'ol/format/GeoJSON';
import {Vector as VectorSource} from 'ol/source';
import {Vector as VectorLayer} from 'ol/layer.js';
import {proyeccion3857} from './configuracion.js';

const subirArchivo = document.getElementById('subirArchivo'),
limpiarArchivo = document.getElementById('limpiarArchivo'),
archivoShpCsv = document.getElementById('archivoShpCsv');

function archivoZipFile(file){
	const r = new FileReader();
  	r.onload = function(){
	  if (r.readyState != 2 || r.error) return;
	  else convertirCapa(r.result);  	
  	}
  	r.readAsArrayBuffer(file);
}
function convertirCapa(buffer){
	shp(buffer).then(function(geojson){
		const formatoGeoJson = new GeoJSON();
		const features = formatoGeoJson.readFeatures(geojson, {featureProjection: proyeccion3857});				
		const vectorSource = new VectorSource({features: features,});
        const vectorLayer = new VectorLayer({source: vectorSource, name:'archivoSHP', id:'archivoSHP',
		style: {
			'stroke-width': 1,
			'stroke-color': '#ff0000',
			'fill-color': 'rgba(100,100,100,0.25)',
		}});
        global.mapa.addLayer(vectorLayer);
        const extension = vectorSource.getExtent();
        global.vista.fit(extension, global.mapa.getSize());
        const zoom = global.vista.getZoom();
        global.vista.setZoom(zoom -1);
		limpiarArchivo.classList.remove('disabled');		
  	});
}

subirArchivo.addEventListener('click', function(){
    const files = archivoShpCsv.files;    
    if(files != null)
	{        
		if (files.length == 0) return;	  
	  	const file = files[0];

        if (file.name.slice(-3) === 'zip'){
            archivoZipFile(file);
        }
    }
});

limpiarArchivo.addEventListener('click', function(){
	global.mapa.getLayers().forEach(function(layer){
		if(layer.get('id') === 'archivoSHP') {
			archivoShpCsv.value = '';
			limpiarArchivo.classList.add('disabled');
			global.mapa.removeLayer(layer);
			//global.vista.setCenter(centroid3857);
			//if(global.mapa.getSize()[0] > 1296) global.vista.setZoom(6);
			//else global.vista.setZoom(5.4);
		}
	})
});