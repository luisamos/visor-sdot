import ImageWMS from 'ol/source/ImageWMS';
import {Image as ImageLayer} from 'ol/layer.js';
import { urlWMS, urlWFS, formatoImagen, versionWMS, capasTematicas, fechaHoy} from './configuracion.js';

//
// Capas temáticas
//
export const capitales = new ImageLayer({
  id: 'capitales',
  visible: false,
  source: new ImageWMS({
    ratio: 1,
    url: urlWMS,
    crossOrigin: 'Anonymous',
    params: {
        'FORMAT': formatoImagen,
        'VERSION': versionWMS,
        'TRANSPARENT': true, 
        'STYLES': '',
        //'exceptions': exepcion,
        'LAYERS': 'geoportal:v_capitales',
    }
  })
});
export const ccppAsentamientosDispersos = new ImageLayer({
  id: 'ccppAsentamientosDispersos',
  visible: false,
  source: new ImageWMS({
    ratio: 1,
    url: urlWMS,
    crossOrigin: 'Anonymous',
    params: {
        'FORMAT': formatoImagen,
        'VERSION': versionWMS,
        'TRANSPARENT': true, 
        'STYLES': '',
        //'exceptions': exepcion,
        'LAYERS': 'geoportal:ccpp_asetamientos_diversos',
    }
  })
});
export const tiempoDesplazamientoCapitalCercano = new ImageLayer({
  id: 'tiempoDesplazamientoCapitalCercano',
  visible: false,
  source: new ImageWMS({
    ratio: 1,
    url: urlWMS,
    crossOrigin: 'Anonymous',
    params: {
        'FORMAT': formatoImagen,
        'VERSION': versionWMS,
        'TRANSPARENT': true, 
        'STYLES': '',
        //'exceptions': exepcion,
        'LAYERS': 'geoportal:tiempo_deplazamiento_capital_cercano',
    }
  })
});
export const ccppCategorizacionRecategorizacion = new ImageLayer({
  id: 'ccppCategorizacionRecategorizacion',
  visible: false,
  source: new ImageWMS({
    ratio: 1,
    url: urlWMS,
    crossOrigin: 'Anonymous',
    params: {
        'FORMAT': formatoImagen,
        'VERSION': versionWMS,
        'TRANSPARENT': true, 
        'STYLES': '',
        //'exceptions': exepcion,
        'LAYERS': 'geoportal:ccpp_cate_recate',
    }
  })
});
export const ccppReconocimientoLey = new ImageLayer({
  id: 'ccppReconocimientoLey',
  visible: false,
  source: new ImageWMS({
    ratio: 1,
    url: urlWMS,
    crossOrigin: 'Anonymous',
    params: {
        'FORMAT': formatoImagen,
        'VERSION': versionWMS,
        'TRANSPARENT': true, 
        'STYLES': '',
        //'exceptions': exepcion,
        'LAYERS': 'geoportal:ccpp_reconocimiento_ley',
    }
  })
});
export const nucleosPoblados = new ImageLayer({
  id: 'nucleosPoblados',
  visible: false,
  source: new ImageWMS({
    ratio: 1,
    url: urlWMS,
    crossOrigin: 'Anonymous',
    params: {
        'FORMAT': formatoImagen,
        'VERSION': versionWMS,
        'TRANSPARENT': true, 
        'STYLES': '',
        //'exceptions': exepcion,
        'LAYERS': 'geoportal:nucleos_poblados',
    }
  })
});
export const renlim_anotacion = new ImageLayer({
  id: 'renlim_anotacion',
  visible: false,
  source: new ImageWMS({
    ratio: 1,
    url: urlWMS,
    crossOrigin: 'Anonymous',
    params: {
        'FORMAT': formatoImagen,
        'VERSION': versionWMS,
        'TRANSPARENT': true, 
        'STYLES': '',
        //'exceptions': exepcion,
        'LAYERS': 'geoportal:renlim_limites_tramos, geoportal:renlim_nodos',
    }
  })
}); //OMD
export const viasNacional = new ImageLayer({
  id: 'viasNacional',
  visible: false,
  source: new ImageWMS({
    ratio: 1,
    url: urlWMS,
    crossOrigin: 'Anonymous',
    params: {
        'FORMAT': formatoImagen,
        'VERSION': versionWMS,
        'TRANSPARENT': true, 
        'STYLES': '',
        //'exceptions': exepcion,
        'LAYERS': 'geoportal:red_vial_nacional_2022',
    }
  })
});
export const viasDepartamental = new ImageLayer({
  id: 'viasDepartamental',
  visible: false,
  source: new ImageWMS({
    ratio: 1,
    url: urlWMS,
    crossOrigin: 'Anonymous',
    params: {
        'FORMAT': formatoImagen,
        'VERSION': versionWMS,
        'TRANSPARENT': true, 
        'STYLES': '',
        //'exceptions': exepcion,
        'LAYERS': 'geoportal:red_vial_departamental_2022',
    }
  })
});
export const viasVecinal = new ImageLayer({
  id: 'viasVecinal',
  visible: false,
  source: new ImageWMS({
    ratio: 1,
    url: urlWMS,
    crossOrigin: 'Anonymous',
    params: {
        'FORMAT': formatoImagen,
        'VERSION': versionWMS,
        'TRANSPARENT': true, 
        'STYLES': '',
        //'exceptions': exepcion,
        'LAYERS': 'geoportal:red_vial_vecinal_2022',
    }
  })
});
export const aerodromos = new ImageLayer({
  id: 'aerodromos',
  visible: false,
  source: new ImageWMS({
    ratio: 1,
    url: urlWMS,
    crossOrigin: 'Anonymous',
    params: {
        'FORMAT': formatoImagen,
        'VERSION': versionWMS,
        'TRANSPARENT': true, 
        'STYLES': '',
        //'exceptions': exepcion,
        'LAYERS': 'geoportal:aerodromo_2022',
    }
  })
});
export const comunidadesNativas = new ImageLayer({
  id: 'comunidadesNativas',
  visible: false,
  source: new ImageWMS({
    ratio: 1,
    url: 'https://winlmprap09.midagri.gob.pe/winlmprap13/services/ogc/Catastro_Rural/MapServer/WMSServer?',
    crossOrigin: 'Anonymous',
    params: {
        'FORMAT': formatoImagen,
        'VERSION': versionWMS,
        'TRANSPARENT': true, 
        'STYLES': '',
        //'exceptions': exepcion,
        'LAYERS': '3',
    }
  })
});
export const comunidadesCampesinas = new ImageLayer({
  id: 'comunidadesCampesinas',
  visible: false,
  source: new ImageWMS({
    ratio: 1,
    url: 'https://winlmprap09.midagri.gob.pe/winlmprap13/services/ogc/Catastro_Rural/MapServer/WMSServer?',
    crossOrigin: 'Anonymous',
    params: {
        'FORMAT': formatoImagen,
        'VERSION': versionWMS,
        'TRANSPARENT': true, 
        'STYLES': '',
        //'exceptions': exepcion,
        'LAYERS': '4',
    }
  })
});
export const evaluacionRiesgos = new ImageLayer({
  id: 'evaluacionRiesgos',
  visible: false,
  source: new ImageWMS({
    ratio: 1,
    url: urlWMS,
    crossOrigin: 'Anonymous',
    params: {
        'FORMAT': formatoImagen,
        'VERSION': versionWMS,
        'TRANSPARENT': true, 
        'STYLES': '',
        //'exceptions': exepcion,
        'LAYERS': 'geoportal:evaluacion_riesgos',
    }
  })
});
export const zonasRiesgosNoMitigable = new ImageLayer({
  id: 'zonasRiesgosNoMitigable',
  visible: false,
  source: new ImageWMS({
    ratio: 1,
    url: urlWMS,
    crossOrigin: 'Anonymous',
    params: {
        'FORMAT': formatoImagen,
        'VERSION': versionWMS,
        'TRANSPARENT': true, 
        'STYLES': '',
        //'exceptions': exepcion,
        'LAYERS': 'geoportal:zonas_riesgos_no_mitigable',
    }
  })
});
export const inventarioInundaciones = new ImageLayer({
  id: 'inventarioInundaciones',
  visible: false,
  source: new ImageWMS({
    ratio: 1,
    url: urlWMS,
    crossOrigin: 'Anonymous',
    params: {
        'FORMAT': formatoImagen,
        'VERSION': versionWMS,
        'TRANSPARENT': true, 
        'STYLES': '',
        //'exceptions': exepcion,
        'LAYERS': 'geoportal:inventario_inundaciones',
    }
  })
});
export const tramosCriticosInundaciones = new ImageLayer({
  id: 'tramosCriticosInundaciones',
  visible: false,
  source: new ImageWMS({
    ratio: 1,
    url: urlWMS,
    crossOrigin: 'Anonymous',
    params: {
        'FORMAT': formatoImagen,
        'VERSION': versionWMS,
        'TRANSPARENT': true, 
        'STYLES': '',
        //'exceptions': exepcion,
        'LAYERS': 'geoportal:tramos_criticos_inundaciones',
    }
  })
});
export const puntosCriticosInundaciones = new ImageLayer({
  id: 'puntos_criticos_inundaciones',
  visible: false,
  source: new ImageWMS({
    ratio: 1,
    url: urlWMS,
    crossOrigin: 'Anonymous',
    params: {
        'FORMAT': formatoImagen,
        'VERSION': versionWMS,
        'TRANSPARENT': true, 
        'STYLES': '',
        //'exceptions': exepcion,
        'LAYERS': 'geoportal:puntos_criticos_inundaciones',
    }
  })
});
export const areasExposicionInundaciones = new ImageLayer({
  id: 'areasExposicionInundaciones',
  visible: false,
  source: new ImageWMS({
    ratio: 1,
    url: urlWMS,
    crossOrigin: 'Anonymous',
    params: {
        'FORMAT': formatoImagen,
        'VERSION': versionWMS,
        'TRANSPARENT': true, 
        'STYLES': '',
        //'exceptions': exepcion,
        'LAYERS': 'geoportal:areas_exposicion_inundacion',
    }
  })
});
export const areasExposicionMovimientoMasa = new ImageLayer({
  id: 'areasExposicionMovimientoMasa',
  visible: false,
  source: new ImageWMS({
    ratio: 1,
    url: urlWMS,
    crossOrigin: 'Anonymous',
    params: {
        'FORMAT': formatoImagen,
        'VERSION': versionWMS,
        'TRANSPARENT': true, 
        'STYLES': '',
        //'exceptions': exepcion,
        'LAYERS': 'geoportal:areas_exposicion_movimientos_masa',
    }
  })
});
export const zonasCriticasMovimientoMasa = new ImageLayer({
  id: 'zonasCriticasMovimientoMasa',
  visible: false,
  source: new ImageWMS({
    ratio: 1,
    url: urlWMS,
    crossOrigin: 'Anonymous',
    params: {
        'FORMAT': formatoImagen,
        'VERSION': versionWMS,
        'TRANSPARENT': true, 
        'STYLES': '',
        //'exceptions': exepcion,
        'LAYERS': 'geoportal:zonas_criticas_movimientos_masa',
    }
  })
});
export const inventarioMovimientoMasa = new ImageLayer({
  id: 'inventarioMovimientoMasa',
  visible: false,
  source: new ImageWMS({
    ratio: 1,
    url: urlWMS,
    crossOrigin: 'Anonymous',
    params: {
        'FORMAT': formatoImagen,
        'VERSION': versionWMS,
        'TRANSPARENT': true, 
        'STYLES': '',
        //'exceptions': exepcion,
        'LAYERS': 'geoportal:inventario_movimientos_masa',
    }
  })
});
export const serviciosEducativos = new ImageLayer({
  id: 'serviciosEducativos',
  visible: false,
  source: new ImageWMS({
    ratio: 1,
    url: urlWMS,
    crossOrigin: 'Anonymous',
    params: {
        'FORMAT': formatoImagen,
        'VERSION': versionWMS,
        'TRANSPARENT': true, 
        'STYLES': '',
        //'exceptions': exepcion,
        'LAYERS': 'geoportal:servicios_educativos',
    }
  })
});
export const localesEducativos = new ImageLayer({
  id: 'localesEducativos',
  visible: false,
  source: new ImageWMS({
    ratio: 1,
    url: urlWMS,
    crossOrigin: 'Anonymous',
    params: {
        'FORMAT': formatoImagen,
        'VERSION': versionWMS,
        'TRANSPARENT': true, 
        'STYLES': '',
        //'exceptions': exepcion,
        'LAYERS': 'geoportal:locales_educativos',
    }
  })
});
export const institucionesPrestadorasServiciosSalud = new ImageLayer({
  id: 'institucionesPrestadorasServiciosSalud',
  visible: false,
  source: new ImageWMS({
    ratio: 1,
    url: urlWMS,
    crossOrigin: 'Anonymous',
    params: {
        'FORMAT': formatoImagen,
        'VERSION': versionWMS,
        'TRANSPARENT': true, 
        'STYLES': '',
        //'exceptions': exepcion,
        'LAYERS': 'geoportal:instituciones_prestadoras_servicios_salud',
    }
  })
});
export const limiteDepartamental = new ImageLayer({
  id: 'limiteDepartamental',
  visible: true,
  source: new ImageWMS({
    ratio: 1,
    url: urlWMS,
    crossOrigin: 'Anonymous',
    params: {
        'FORMAT': formatoImagen,
        'VERSION': versionWMS,
        'TRANSPARENT': true, 
        'STYLES': '',
        //'exceptions': exepcion,
        'LAYERS': 'geoportal:v_departamentos_2023',
    }
  })
});
export const limiteProvincial = new ImageLayer({
  id: 'limiteProvincial',
  visible: false,
  source: new ImageWMS({
    ratio: 1,
    url: urlWMS,
    crossOrigin: 'Anonymous',
    params: {
        'FORMAT': formatoImagen,
        'VERSION': versionWMS,
        'TRANSPARENT': true, 
        'STYLES': '',
        //'exceptions': exepcion,
        'LAYERS': 'geoportal:v_provincias_2023',
    }
  })
});
export const limiteDistrital = new ImageLayer({
  id: 'limiteDistrital',
  visible: false,
  source: new ImageWMS({
    ratio: 1,
    url: urlWMS,
    crossOrigin: 'Anonymous',
    params: {
        'FORMAT': formatoImagen,
        'VERSION': versionWMS,
        'TRANSPARENT': true, 
        'STYLES': '',
        //'exceptions': exepcion,
        'LAYERS': 'geoportal:v_distritos_2023',
    }
  })
});

function activarBoton(id, estado)
{
  const button = document.getElementById('btn'+ id);
  if(estado) button.style.display = '';
  else button.style.display = 'none';
}

//
// CONTROLES DE MANIPULACIÓN DE CAPAS
//
const checkboxes = document.querySelectorAll('.form-check-input');
checkboxes.forEach(checkbox => {  
  checkbox.addEventListener('click', function() {

    const capaTematica = global.mapa.getLayers().getArray().find(layer => layer.get('id') === this.id) || null;

    if(capaTematica != null)
    {
      if (this.checked) 
      {
        capaTematica.setVisible(true);
        activarBoton(this.id, true);
      }
      else 
      {
        capaTematica.setVisible(false);
        activarBoton(this.id, false);
      }
    }
  });
});

const dropdownItems = document.querySelectorAll('.dropdown-item');
dropdownItems.forEach(item => {
  item.addEventListener('click', function(event){
    event.preventDefault();
    const i = item.getAttribute('id');
    const link = document.createElement('a');  
    const capa = capasTematicas.find(e => e.id === i.substring(1));
    if(capa != undefined)
    {
      if(i.substring(0,1) === 'i') activoInformacion= capa.id;
      if(i.substring(0,1) === 'd')
      {            
          const url = urlWFS + 'service=WFS&request=GetFeature&outputFormat=SHAPE-ZIP&typeName=' + capa.nombre;
          link.href = url;
          link.download = capa.nombre + '_' + fechaHoy() + '.zip';
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);        
      }   
    }  
  });
});