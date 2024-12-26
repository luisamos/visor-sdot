import Feature from 'ol/Feature.js';
import {Vector as VectorSource} from 'ol/source.js';
import {Vector as VectorLayer} from 'ol/layer.js';
import {Circle as CircleStyle, Style, Fill, Stroke} from 'ol/style.js';
import {Point} from 'ol/geom.js';
import proj4 from 'proj4';
import { transform } from 'ol/proj';
import {proyeccion3857, proyeccion4326, proyeccion32717, proyeccion32718, proyeccion32719} from './configuracion.js';

proj4.defs('EPSG:4326','+proj=longlat +datum=WGS84 +no_defs +type=crs');
proj4.defs('EPSG:32717','+proj=utm +zone=17 +south +datum=WGS84 +units=m +no_defs +type=crs');
proj4.defs('EPSG:32718','+proj=utm +zone=18 +south +datum=WGS84 +units=m +no_defs +type=crs');
proj4.defs('EPSG:32719','+proj=utm +zone=19 +south +datum=WGS84 +units=m +no_defs +type=crs');
//proj4.defs('EPSG:3857','+proj=merc +a=6378137 +b=6378137 +lat_ts=0 +lon_0=0 +x_0=0 +y_0=0 +k=1 +units=m +nadgrids=@null +wktext +no_defs +type=crs');

const proyeccion = document.getElementById('proyeccion'),
zona = document.getElementById('zona'),
grupoZona = document.getElementById('grupoZona'),
coordenada01 = document.getElementById('coordenada01'),
labelCoordenada01 = document.getElementById('labelCoordenada01'),
coordenada02 = document.getElementById('coordenada02'),
labelCoordenada02 = document.getElementById('labelCoordenada02'),
graficarCoordenadas = document.getElementById('graficarCoordenadas'),
limpiarCoordenadas = document.getElementById('limpiarCoordenadas');

proyeccion.addEventListener('change', function(){
    const i = this.value;
    if(i === '01')
    {
        coordenada01.disabled = false;
        labelCoordenada01.textContent  = 'Longitud';
        coordenada01.focus();
        coordenada02.disabled = false;
        labelCoordenada02.textContent  = 'Latitud';
        grupoZona.style.display = 'none';
        const opcion = zona.querySelector('option[value="-1"]');
        opcion.selected = true;     
    }
    else if(i === '02')
    {
        coordenada01.disabled = true;
        labelCoordenada01.textContent  = 'X';
        coordenada02.disabled = true;
        coordenada01.placeholder = 'Y';
        labelCoordenada02.textContent  = 'Y';
        grupoZona.style.display = 'block';
    }   
});

zona.addEventListener('change', function(){
    coordenada01.disabled = false;
    coordenada02.disabled = false;
    coordenada01.focus();
});

graficarCoordenadas.addEventListener('click', function(){
    let p = proyeccion.value,
    coordenadas4326,
    coordenadas3857;

    if(coordenada01.value.length !== 0 && coordenada02.value.length !== 0)
    {
        if(p === '01')
        {
            coordenadas3857 = transform([coordenada01.value.trim(), coordenada02.value.trim()], proyeccion4326, proyeccion3857);
        }
        else if(p === '02')
        {
            const x = Number.parseFloat(coordenada01.value.trim()),
			y = Number.parseFloat(coordenada02.value.trim()); 
            switch (zona.value) {
                case '17S':
                    coordenadas4326 = proj4(proyeccion32717,proyeccion4326, [x,y]);                    
                break;
                case '18S':
                    coordenadas4326 = proj4(proyeccion32718,proyeccion4326, [x,y]);                    
                break;
                case '19S':
                    coordenadas4326 = proj4(proyeccion32719,proyeccion4326, [x,y]);                    
                break;
            }
            coordenadas3857 = transform([coordenadas4326[0], coordenadas4326[1]], proyeccion4326, proyeccion3857);
        }

        if(coordenadas3857.length > 0)
        {
            const geolocalizacion = new Feature({
                geometry: new Point([coordenadas3857[0], coordenadas3857[1]])
            });

            const estilo = new Style({
                image: new CircleStyle({
                    radius: 5,
                    fill: new Fill({
                    color: 'red'
                    }),
                    stroke: new Stroke({
                    color: 'black',
                    width: 1
                    })
                })
            });
                
            geolocalizacion.setStyle(estilo);
            const vectorSource = new VectorSource({
                features: [geolocalizacion],
            });

            const punto = new VectorLayer({
                source: vectorSource,
                id: 'ubicacionActual'
            });

            global.mapa.getLayers().forEach(function(layer) {
                if (layer.get('id') === 'ubicacionActual') {
                    global.mapa.removeLayer(layer);
                }
            });

            global.mapa.addLayer(punto);             
            global.vista.setCenter([coordenadas3857[0], coordenadas3857[1]]);
            global.vista.setZoom(12);                
        }
    }
});

limpiarCoordenadas.addEventListener('click', function(){
    const opcion01 = proyeccion.querySelector('option[value="-1"]');
    opcion01.selected = true;
    coordenada01.disabled = true;
    coordenada01.value= '';
    labelCoordenada01.textContent  = 'Longitud';
    coordenada02.disabled = true;
    coordenada02.value= '';
    labelCoordenada02.textContent  = 'Latitud';
    grupoZona.style.display = 'none';
    const opcion02 = zona.querySelector('option[value="-1"]');
    opcion02.selected = true;
});