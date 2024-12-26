import Feature from 'ol/Feature.js';
import {Vector as VectorSource} from 'ol/source.js';
import {Vector as VectorLayer} from 'ol/layer.js';
import {Circle as CircleStyle, Style, Fill, Stroke} from 'ol/style.js';
import {Point} from 'ol/geom.js';
import { transform } from 'ol/proj';
import {proyeccion3857, proyeccion4326} from './configuracion.js';
const obtenerCoordenadas = document.getElementById('obtenerCoordenadas');
function closeAllPopups() {
    const allPopups = document.querySelectorAll('.custom-menu-widget-item-popup');
    allPopups.forEach(popup => {
        popup.style.display = 'none';
    });
}//OMD
obtenerCoordenadas.addEventListener('click', function(){
    closeAllPopups();
    if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(function(position) {
            const longitud4326 = position.coords.longitude;
            const latitud4326 = position.coords.latitude;            
            const coordenadas3857 = transform([longitud4326, latitud4326], proyeccion4326, proyeccion3857);
            
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
                    name: 'ubicacionActual',
                    id: 'ubicacionActual'
                });

                global.mapa.getLayers().forEach(function(layer) {
                    if (layer.get('id') === 'ubicacionActual') {
                        global.mapa.removeLayer(layer);
                    }
                });
                
                global.mapa.addLayer(punto);
                global.vista.setCenter([coordenadas3857[0], coordenadas3857[1]]);
                global.vista.setZoom(15);
            }
        });
    } else {alert('Geolocalización no soportada por este navegador.');}
});