import './style.css';

import {Map, View} from 'ol';
import Overlay from 'ol/Overlay.js';
import {defaults as defaultControls} from 'ol/control.js';
import MousePosition from 'ol/control/MousePosition.js';
import {format} from 'ol/coordinate.js';
import proj4 from 'proj4';
import {transform} from 'ol/proj';
import moment from 'moment/moment';

import {proyeccion3857, proyeccion4326, proyeccion32717, proyeccion32718, proyeccion32719, centroid3857, formatoSalidaJson, formatoSalidaGeoJson, nombresColumnas} from './assets/js/configuracion';
import {arcgisLightGray, bingMapRoadOnDemand, bingMapAerial, bingMapAerialWithLabelsOnDemand, bingMapCanvasDark, osm} from './assets/js/capasBase.js';
import {capitales, ccppAsentamientosDispersos, tiempoDesplazamientoCapitalCercano, ccppCategorizacionRecategorizacion, ccppReconocimientoLey, nucleosPoblados,
  renlim_anotacion,
  viasNacional, viasDepartamental, viasVecinal, aerodromos,
  comunidadesNativas, comunidadesCampesinas,
  evaluacionRiesgos, zonasRiesgosNoMitigable, 
  inventarioInundaciones, tramosCriticosInundaciones,puntosCriticosInundaciones, areasExposicionInundaciones, 
  areasExposicionMovimientoMasa, zonasCriticasMovimientoMasa, inventarioMovimientoMasa,
  serviciosEducativos, localesEducativos, institucionesPrestadorasServiciosSalud,
  limiteDistrital, limiteProvincial, limiteDepartamental} from './assets/js/capasTematicas.js'; //OMD
import { dibujoGeometria } from './assets/js/graficarMapa.js';
import { vectorCalculo, modificarEstilo } from './assets/js/calcularPerimetroSuperficie.js';

proj4.defs('EPSG:4326','+proj=longlat +datum=WGS84 +no_defs +type=crs');
proj4.defs('EPSG:32717','+proj=utm +zone=17 +south +datum=WGS84 +units=m +no_defs +type=crs');
proj4.defs('EPSG:32718','+proj=utm +zone=18 +south +datum=WGS84 +units=m +no_defs +type=crs');
proj4.defs('EPSG:32719','+proj=utm +zone=19 +south +datum=WGS84 +units=m +no_defs +type=crs');

global.activoInformacion='';

function closeAllPopups() {
  const allPopups = document.querySelectorAll('.custom-menu-widget-item-popup');
  allPopups.forEach(popup => {
      popup.style.display = 'none';
  });
}//OMD

const popup = document.getElementById('popup'),
contenido = document.getElementById('popup-content'),
cerrar = document.getElementById('popup-closer');

const cubrir = new Overlay({
  element: popup,
  autoPan: {
    animation: {
      duration: 250,
    },
  },
});

const mousePosicion = new MousePosition({
  coordinateFormat: function(e)
  {
    let zona ='', este='', norte='', texto='', coordenada;
    const e1 = transform(e, proyeccion3857, proyeccion4326);

    if(e1[0] >= -81.497 && e1[0] < -78.000) 
    {
      const punto = { x: e1[0], y: e1[1] };
      coordenada = proj4(proyeccion4326, proyeccion32717, punto);            
      zona = '&nbsp;<b>UTM Zona: 17S </b>';
    }
    if(e1[0] >= -78.000 && e1[0] < -72.000)
    {
      const punto = { x: e1[0], y: e1[1] };
      coordenada = proj4(proyeccion4326, proyeccion32718, punto);       
      zona = '&nbsp;<b>UTM Zona: 18S </b>';
    }
    if(e1[0] >= -72.000 && e1[0] <= -68.504)
    {
      const punto = { x: e1[0], y: e1[1] };
      coordenada = proj4(proyeccion4326, proyeccion32719, punto);       
      zona = '&nbsp;<b>UTM Zona: 19S </b>';
    }

    if(coordenada !== undefined)
    {
      este = new Intl.NumberFormat('es-PE').format(coordenada.x.toFixed(2)).toString();
      norte = new Intl.NumberFormat('es-PE').format(coordenada.y.toFixed(2)).toString();
      texto= format(e1, '<b>GCS Latitud</b>: {y},&nbsp;<b>Longitud</b>: {x}', 4) + '&nbsp;' + zona + '&nbsp;<b>Este</b>: '+ este + 'm.&nbsp;<b>Norte</b>: ' + norte + 'm.';
    }
    else texto= format(e1, '<b>GCS Latitud</b>: {y},&nbsp;<b>Longitud</b>: {x}', 4) + '&nbsp;'
    return texto;
  },  
  projection: proyeccion3857,
  target: document.getElementById('mouse-position'),
});

global.vista = new View({
  projection: proyeccion3857,
  center: centroid3857, 
  zoom: 5
});

global.mapa = new Map({
  target: 'map',
  layers: [arcgisLightGray, bingMapRoadOnDemand, bingMapAerial, bingMapAerialWithLabelsOnDemand, bingMapCanvasDark, osm, 
    tiempoDesplazamientoCapitalCercano, ccppAsentamientosDispersos, ccppCategorizacionRecategorizacion, ccppReconocimientoLey, nucleosPoblados, capitales,
    renlim_anotacion,
    viasNacional, viasDepartamental, viasVecinal, aerodromos,
    comunidadesNativas, comunidadesCampesinas,
    evaluacionRiesgos, zonasRiesgosNoMitigable, 
    inventarioInundaciones, tramosCriticosInundaciones, puntosCriticosInundaciones, areasExposicionInundaciones, 
    areasExposicionMovimientoMasa, zonasCriticasMovimientoMasa, inventarioMovimientoMasa,
    serviciosEducativos, localesEducativos, institucionesPrestadorasServiciosSalud,
    limiteDistrital, limiteProvincial, limiteDepartamental, dibujoGeometria],
  controls: defaultControls({
    attribution: false,
    zoom: true,
  }).extend([mousePosicion]),
  overlays: [cubrir],
  view: vista
}); //OMD

//
// Boton Fullscreen
//
function activarFullscreen(element) {
  if (element.requestFullscreen) {
      element.requestFullscreen();
  } else if (element.mozRequestFullScreen) { /* Firefox */
      element.mozRequestFullScreen();
  } else if (element.webkitRequestFullscreen) { /* Chrome, Safari & Opera */
      element.webkitRequestFullscreen();
  } else if (element.msRequestFullscreen) { /* IE/Edge */
      element.msRequestFullscreen();
  }
}
var btnFullscreen = document.getElementById('btnFullscreen');
btnFullscreen.addEventListener('click', function() {
  activarFullscreen(global.mapa.getTargetElement());
});

//
// CONTROLES DE ACCIONES DEL VISOR
//
// 1. Vista General
var vistaGeneral = document.getElementById('vistaGeneral');
vistaGeneral.addEventListener('click', function(){
  closeAllPopups();
  global.vista.setCenter(centroid3857);
  if(global.mapa.getSize()[0] > 1296) global.vista.setZoom(6);
  else global.vista.setZoom(5.4);
});

// 3. Filtro Territorial
import './assets/js/filtroTerritorial.js';

// 4. Graficar sobre el mapa

// 5. Cargar tu información SHP, CSV
import './assets/js/cargarArchivo.js';

// 6. Conectar a un servicio web de mapa
import './assets/js/cargarServicioWeb.js';

// 7. Ubicar coordenadas
import './assets/js/ubicarCoordenadas.js';

// 8. Obtener coordenadas
import './assets/js/obtenerCoordenadas.js';

// 9. Cálculo de superficie, perímetro
global.mapa.addLayer(vectorCalculo);
global.mapa.addInteraction(modificarEstilo);

// 10. Imprimir
import './assets/js/imprimir.js';

// 11. Envíanos sugerencias

// 12. Enlace de interes
import './assets/js/enlacesInteres.js';

window.addEventListener('load', function() {
  setTimeout(function() {
    document.getElementById('loading-screen').style.display = 'none';
    document.getElementById('contenidoSidebar').style.display = 'block';
    document.getElementById('wrapper').style.display = 'block';    
  }, 1000);
});

moment.updateLocale('es', {
  months : 'enero_febrero_marzo_abril_mayo_junio_julio_agosto_septiembre_octubre_noviembre_diciembre'.split('_'),
  monthsShort : 'ene._feb._mar._abr._may._jun._jul._ago._sep._oct._nov._dic.'.split('_'),
  weekdays : 'domingo_lunes_martes_miércoles_jueves_viernes_sábado'.split('_'),
  weekdaysShort : 'dom._lun._mar._mié._jue._vie._sáb.'.split('_'),
  weekdaysMin : 'do_lu_ma_mi_ju_vi_sá'.split('_'),
  longDateFormat : {
      LT : 'H:mm',
      LTS : 'H:mm:ss',
      L : 'DD/MM/YYYY',
      LL : 'D [de] MMMM [de] YYYY',
      LLL : 'D [de] MMMM [de] YYYY H:mm',
      LLLL : 'dddd, D [de] MMMM [de] YYYY H:mm'
  },  
});

//
// Evento de identificar
//
cerrar.onclick = function () {
  cubrir.setPosition(undefined);
  cerrar.blur();
  return false;
};

global.mapa.on('singleclick', function(e){
  const resolucionVista = /** @type {number} */ (global.vista.getResolution());
  var urlInterno = '';

  const capaTematica = global.mapa.getLayers().getArray().find(layer => layer.get('id') === activoInformacion) || null;
  if(capaTematica != null)
  {
    urlInterno = capaTematica.getSource().getFeatureInfoUrl(
      e.coordinate,
      resolucionVista,
      proyeccion3857,
      {'INFO_FORMAT': formatoSalidaJson}
    );
  }
  
  if(urlInterno){ //debugger
    console.log(urlInterno);
    fetch(urlInterno)
      .then((response) => response.json())
      .then((json) =>{
        var datos = json.features[0].properties;
        var tabla ='<table>';
        for (const i in datos){
          var id = nombresColumnas.find(e => e.id === i);
          if(id !== undefined)
          {
            if(i === 'gid') continue;
            else if(i === 'viv' && (activoInformacion === 'ccpp_cate_recate' || activoInformacion === 'ccpp_reconocimiento_ley')) continue;
            else if(i === 'direccion' && activoInformacion === 'tiempo_deplazamiento_capital_cercano') continue;
            else if(i === 'capital')
            {
              var esCapital = datos[i];

              if(esCapital === null) continue;
              else if(esCapital === '1')
              {
                tabla += '<tr><td>' + ((id != undefined)? id.nombre : i) + '</td><td>:</td><td>Si</td></tr>';
              }
            } 
            else if(i === 'fecha' || i === 'fecha_fin' || i === 'fecha_inst' || i === 'fec_inic_o') 
            {
              var date = moment(datos[i], 'YYYY-MM-DD');
              //if(url != null) tabla += '<tr><td>Fecha</td><td>:</td><td>' + date.format('LL') + '</td></tr>';
              tabla += '<tr><td>Fecha</td><td>:</td><td>' + date.format('LL') + '</td></tr>';
            }
            else if(i === 'pob' || i === 'pob_2017')
            {
              tabla += '<tr><td>' + ((id != undefined)? id.nombre : i) + '</td><td>:</td><td>' + datos[i] + ' hab.</td></tr>';
            }            
            else if(i === 'direccion' || i === 'url' || i === 'url1')
            {
              var url = datos[i];
              if(url != null) tabla += '<tr><td>'+ id.nombre +'</td><td>:</td><td><i class="bi bi-file-pdf-fill"></i>&nbsp;<a href="'+ url + '" target="_blank" rel="noopener noreferrer"">Descargar</a></td></tr>';
            }
            else if(i === 'rep_cartografica') //OMD
            { //OMD
              var enlace = datos[i]; //OMD
              if(enlace != null) tabla += '<tr><td>'+ id.nombre +'</td><td>:</td><td><a href="'+ enlace + '" target="_blank" rel="noopener noreferrer"">Ver imagen</a>&nbsp;<i class="bi bi-file-image"></i></td></tr>'; //OMD
            } //OMD
            else if(i === 'mas_inform') //OMD
            { //OMD
              var enlace = datos[i]; //OMD
              if(enlace != null) tabla += '<tr><td>'+ id.nombre +'</td><td>:</td><td><a href="'+ enlace + '" target="_blank" rel="noopener noreferrer"">Ver más</a>&nbsp;<i class="bi bi-box-arrow-up-right"></i></td></tr>'; //OMD
            } //OMD
            else
            {              
              if(datos[i] === null) continue;
              tabla += '<tr><td>' + ((id != undefined)? id.nombre : i) + '</td><td>:</td><td>' + datos[i] + '</td></tr>';
            }
          }        
        }
        tabla += '</table>';
        contenido.innerHTML = '<div>' + tabla + '</div>';
        cubrir.setPosition(e.coordinate);
      });
  }
});

function ajustarTamaño() {
  //console.log(global.mapa.getSize()[1]);
  //if(global.mapa.getSize()[1] > 575) 
  if(global.mapa.getSize()[1] <= 778) 
  {
    global.vista.setZoom(5.4);
    document.body.classList.toggle('sb-sidenav-toggled');
    localStorage.setItem('sb|sidebar-toggle', document.body.classList.contains('sb-sidenav-toggled'));
  }
  else global.vista.setZoom(6);
}

//window.addEventListener('resize', ajustarTamaño);
ajustarTamaño();