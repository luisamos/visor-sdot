import {keyBingMap} from './configuracion.js';
import { Tile as TileLayer} from 'ol/layer.js';
import BingMaps from 'ol/source/BingMaps.js';
import OSM from 'ol/source/OSM';
import TileArcGISRest from 'ol/source/TileArcGISRest.js';

//
// Mapas base
//
export const arcgisLightGray = new TileLayer({
  id : 'arcgisLightGray',
  visible: false,  
  source: new TileArcGISRest({
    attribution: '<a href="https://www.gob.pe/pcm" target="_blank">&copy; Secretaria de Demarcación y Organización Territorial</a>',
    url: 'https://services.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer',
  })
});
export const bingMapRoadOnDemand = new TileLayer({
  id : 'bingMapRoadOnDemand',
  visible: false,
  preload: Infinity,
  source: new BingMaps({
    key: keyBingMap,
    imagerySet: 'RoadOnDemand',
    placeholderTiles: false,
  })
});
export const bingMapAerial = new TileLayer({
  id : 'bingMapAerial',
  visible: true,
  preload: Infinity,
  source: new BingMaps({
    key: keyBingMap,
    imagerySet: 'Aerial',
    placeholderTiles: false,
  })
});
export const bingMapAerialWithLabelsOnDemand = new TileLayer({
  id : 'bingMapAerialWithLabelsOnDemand',
  visible: false,
  preload: Infinity,
  source: new BingMaps({
    key: keyBingMap,
    imagerySet: 'AerialWithLabelsOnDemand',
    placeholderTiles: false,
  })
});
export const bingMapCanvasDark = new TileLayer({
  id : 'bingMapCanvasDark',
  visible: false,
  preload: Infinity,
  source: new BingMaps({
    key: keyBingMap,
    imagerySet: 'CanvasDark',
    placeholderTiles: false,
  })
});
export const osm = new TileLayer({
  id : 'osm',
  visible: false, 
  type: 'base',
  title: 'OSM',
  source: new OSM()
});

let elementosLista = document.querySelectorAll('#capasBase .list-group-item');
elementosLista.forEach(function(elemento){  
  elemento.addEventListener('click', function(event){
    event.preventDefault();
    elementosLista.forEach(function(el) {
      el.classList.remove('active');
    });

    if(this.id === 'capaBase01')
    {
      this.classList.add('active');
      arcgisLightGray.setVisible(true);
      bingMapAerial.setVisible(false);
      bingMapAerialWithLabelsOnDemand.setVisible(false);
      bingMapCanvasDark.setVisible(false);
      osm.setVisible(false);
    }
    if(this.id === 'capaBase02')
    {
      this.classList.add('active');
      arcgisLightGray.setVisible(false);
      bingMapAerial.setVisible(true);
      bingMapAerialWithLabelsOnDemand.setVisible(false);
      bingMapCanvasDark.setVisible(false);
      osm.setVisible(false);
    }
    if(this.id === 'capaBase03')
    {
      this.classList.add('active');
      arcgisLightGray.setVisible(false);
      bingMapAerial.setVisible(false);
      bingMapAerialWithLabelsOnDemand.setVisible(true);
      bingMapCanvasDark.setVisible(false);
      osm.setVisible(false);
    }
    if(this.id === 'capaBase04')
    {
      this.classList.add('active');
      arcgisLightGray.setVisible(false);
      bingMapAerial.setVisible(false);
      bingMapAerialWithLabelsOnDemand.setVisible(false);
      bingMapCanvasDark.setVisible(true);
      osm.setVisible(false);
    }
    if(this.id === 'capaBase05')
    {
      this.classList.add('active');
      arcgisLightGray.setVisible(false);
      bingMapAerial.setVisible(false);
      bingMapAerialWithLabelsOnDemand.setVisible(false);
      bingMapCanvasDark.setVisible(false);
      osm.setVisible(true);
    }
  });
});