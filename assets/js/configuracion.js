export let departamentosJson= './data/departamentos_3857.json',
provinciasJson= './data/provincias_3857.json',
distritosJson= './data/distritos_3857.json',
centrosPobladosJson= './data/centros_poblados_3857.json';

export const urlWMS = 'https://geosdot.servicios.gob.pe/geoserver/geoportal/wms?',
urlWFS = 'https://geosdot.servicios.gob.pe/geoserver/geoportal/wfs?',
//export const urlWMS = 'http://192.168.71.61:8080/geoserver/geoportal/wms?',
//urlWFS = 'http://192.168.71.61:8080/geoserver/geoportal/wfs?',
markers = './assets/images/icon-green50.png',
centroid3857= [-8277259.790554121,-1033993.6428854751],
extension3857= [-9056413.683884881,-2078385.7561873442,-7644744.070702932,-4104.90673861339],
enlacesWeb= [
  'https://geosdot.servicios.gob.pe/geoportal/',
  'https://geosdot.servicios.gob.pe/consultas/',
  'https://app.powerbi.com/view?r=eyJrIjoiNGExMzZhZWEtODQ5Zi00NWE1LWI0YzctNWZkNmQ5M2Y1MzcyIiwidCI6IjM0YjQ4ZTRlLTI1MTktNDA2MC1hMDllLTViMDVkOTAxYTRkNyJ9'
], //OMD
keyBingMap= 'AhoBzwdjV8QbzFYkcGem-IjwJexWX7HL-G3vc7d31dxhW21xzDJEG8n9v4VDvfB_',
proyeccion3857= 'EPSG:3857',
proyeccion4326= 'EPSG:4326',
proyeccion32717 = 'EPSG:32717',
proyeccion32718 = 'EPSG:32718',
proyeccion32719 = 'EPSG:32719',
formatoImagen= 'image/png',
versionWMS= '1.3.0',
versionWFS= '1.1.0',
exepcion= 'application/vnd.ogc.se_inimage',
formatoSalidaJson = 'application/json',
formatoSalidaGeoJson = 'application/geojson',
nombresColumnas = [
  {id: 'anio', nombre: 'Año'},
  {id: 'ambito', nombre: 'Ámbito'},
  {id: 'capital', nombre: 'Es Capital'},
  {id: 'cat_tiempo', nombre: 'Rango de tiempo'},
  {id: 'categoria', nombre: 'Categoría'},
  {id: 'cen_pob', nombre: 'Nombre del centro poblado'}, //OMD
  {id: 'cenpob_ren', nombre: 'Centro poblado'},
  {id: 'codccpp', nombre: 'Código Censal'}, //OMD 
  {id: 'codcp_inei', nombre: 'Código CCPP censal'},
  {id: 'codruta', nombre: 'Código ruta'},
  {id: 'cod_cp_np', nombre: 'Código identificador'}, //OMD
  //{id: 'cod_modu', nombre: 'Código modular'}, //OMD
  //{id: 'cod_nive_m', nombre: 'Código nivel'}, //OMD
  {id: 'descripcio', nombre: 'Descripción'},
  //{id: 'des_cent_e', nombre: 'Insitución educativa'}, //OMD
  //{id: 'des_nive_m', nombre: 'Nivel'}, //OMD
  //{id: 'des_form_a', nombre: 'Tipo'}, //OMD
  //{id: 'des_gest', nombre: 'Gestión'}, //OMD
  //{id: 'des_depe_g', nombre: 'Dependencia'}, //OMD
  {id: 'cod_unic_e', nombre: 'Código'},
  {id: 'cod_tipo_e', nombre: 'Tipo'},
  {id: 'ccpps_agrup', nombre: 'Lista de CCPP conurbados'}, //OMD
  {id: 'des_clas_e', nombre: 'Nombre'},
  {id: 'nom_esta', nombre: 'Nombre del establecimiento'},
  {id: 'des_inst_d', nombre: 'Sector'},
  {id: 'dir_esta', nombre: 'Dirección'},
  {id: 'fec_inic_o', nombre: 'Fecha inicio'},
  {id: 'doc_cate', nombre: 'Resolución'},
  {id: 'cod_cond_e', nombre: 'Condición'},  
  //{id: 'direccion', nombre: 'Documento'}, //OMD
  {id: 'estado_l', nombre: 'Estado'},
  {id: 'ejeclas', nombre: 'Clase'},
  {id: 'fecha', nombre: 'Fecha'},
  {id: 'gid', nombre: 'Código'},
  {id: 'iddist', nombre: 'Código distrito'},
  {id: 'inst', nombre: 'Instrumento'},
  {id: 'jerarq', nombre: 'Jerarquía'},
  //{id: 'nombdep', nombre: 'Departamento'}, //OMD
  //{id: 'nombprov', nombre: 'Provincia'}, //OMD
  //{id: 'nombdist', nombre: 'Distrito'}, //OMD
  {id: 'nombre', nombre: 'Nombre'},
  {id: 'numero', nombre: 'Número'},
  {id: 'num_cp', nombre: 'Nro. CCPP conurbados'},
  {id: 'nrocarril', nombre: 'Número de carril'},
  {id: 'pob', nombre: 'Población 2017'},
  {id: 'pob_2017', nombre: 'Población total 2017'}, //OMD
  {id: 'region_nat', nombre: 'Región natural'},
  {id: 'superfic_l', nombre: 'Tipo superficie'},
  {id: 'trayectori', nombre: 'Trayecto'},
  {id: 'tipo_norma', nombre: 'Tipo de norma'},
  {id: 'tipo_accio', nombre: 'Acción'},
  {id: 'tipo_asent', nombre: 'Tipo de asentamiento'}, //OMD
  {id: 'ubigeo', nombre: 'Ubigeo'},
  {id: 'url', nombre: 'Documento'},
  {id: 'url1', nombre: 'Anexo'},
  {id: 'viv', nombre: 'Viviendas 2017'},

  {id: 'NOMCOM', nombre: 'Nombre de la comunidad'},
  {id: 'DEPAR', nombre: 'Departamento'},
  {id: 'PROVI', nombre: 'Provincia'},
  {id: 'DISTR', nombre: 'Distrito'},
  {id: 'UBIDIS', nombre: 'Ubigeo'},

  {id: 'cod_partida', nombre: 'Partida'}, //OMD
  {id: 'des_limite', nombre: 'Límite'}, //OMD
  {id: 'des_departamento', nombre: 'Departamento'}, //OMD
  {id: 'des_provincia', nombre: 'Provincia'}, //OMD
  {id: 'des_libro', nombre: 'Libro'}, //OMD
  {id: 'des_seccion', nombre: 'Sección'}, //OMD
  {id: 'tramo', nombre: 'Núm. de tramo'}, //OMD
  {id: 'des_tipo_norma', nombre: 'Tipo de norma'}, //OMD
  {id: 'des_numero_norma', nombre: 'Núm. de norma'}, //OMD
  {id: 'fecha_norma', nombre: 'Fecha de norma'}, //OMD
  {id: 'rep_cartografica', nombre: 'Repr. cartográf.'}, //OMD
  {id: 'des_fuente_cartografica', nombre: 'Fuente cartográf.'}, //OMD
  {id: 'mas_inform', nombre: 'Más información'}, //OMD
  {id: 'fecha_actualizacion', nombre: 'Actualización'}, //OMD

  {id: 'CODINST', nombre: 'Código de la IE'}, //OMD
  {id: 'CEN_EDU', nombre: 'Nombre de la IE'}, //OMD
  {id: 'D_DREUGEL', nombre: 'Nombre de la DRE o UGEL'}, //OMD
  {id: 'D_GESTION', nombre: 'Tipo de Gestión'}, //OMD
  {id: 'D_GES_DEP', nombre: 'Dependencia'}, //OMD
  {id: 'D_FORMA', nombre: 'Forma'}, //OMD
  {id: 'COD_MOD', nombre: 'Código modular'}, //OMD
  {id: 'ANEXO', nombre: 'Anexo'}, //OMD
  {id: 'D_NIV_MOD', nombre: 'Nivel/Modalidad'}, //OMD
  {id: 'D_COD_CAR', nombre: 'Característica'}, //OMD
  {id: 'D_TIPSSEXO', nombre: 'Género'}, //OMD
  {id: 'D_TIPOPROG', nombre: 'Tipo de programa'}, //OMD
  {id: 'D_COD_TUR', nombre: 'Turno'}, //OMD

  {id: 'SERVICIOS', nombre: 'Servicio educativo'}, //OMD
  {id: 'DIR_CEN', nombre: 'Dirección'}, //OMD
  {id: 'LOCALIDAD', nombre: 'Localidad'}, //OMD
  {id: 'CEN_POB', nombre: 'Centro Poblado'}, //OMD
  {id: 'D_DPTO', nombre: 'Departamento'}, //OMD
  {id: 'D_PROV', nombre: 'Provincia'}, //OMD
  {id: 'D_DIST', nombre: 'Distrito'}, //OMD
],
capasTematicas = [
  {id: 'capitales', nombre: 'v_capitales'},
  {id: 'ccppAsentamientosDispersos', nombre: 'ccpp_asetamientos_diversos'},
  {id: 'tiempoDesplazamientoCapitalCercano', nombre: 'tiempo_deplazamiento_capital_cercano'},
  {id: 'limiteDepartamental', nombre: 'v_departamentos_2023'},
  {id: 'limiteProvincial', nombre: 'v_provincias_2023'},
  {id: 'limiteDistrital', nombre: 'v_distritos_2023'},
  {id: 'ccppCategorizacionRecategorizacion', nombre: 'ccpp_cate_recate'},
  {id: 'ccppReconocimientoLey', nombre: 'ccpp_reconocimiento_ley'},
  {id: 'nucleosPoblados', nombre: 'nucleos_poblados'},
  
  {id: 'renlim_anotacion', nombre: 'renlim_anotacion'}, //OMD

  {id: 'viasNacional', nombre: 'red_vial_nacional_2022'},
  {id: 'viasDepartamental', nombre: 'red_vial_departamental_2022'},
  {id: 'viasVecinal', nombre: 'red_vial_vecinal_2022'},
  {id: 'comunidadesNativas', nombre: 'comunidades_nativas'},
  {id: 'comunidadesCampesinas', nombre: 'comunidades_campesinas'},
  {id: 'evaluacionRiesgos', nombre: 'evaluacion_riesgos'},
  {id: 'zonasRiesgosNoMitigable', nombre: 'zonas_riesgos_no_mitigable'},
  {id: 'inventarioInundaciones', nombre: 'inventario_inundaciones'},
  {id: 'tramosCriticosInundaciones', nombre: 'tramos_criticos_inundaciones'},
  {id: 'puntosCriticosInundaciones', nombre: 'puntos_criticos_inundaciones'},
  {id: 'areasExposicionInundaciones', nombre: 'areas_exposicion_inundacion'},
  {id: 'areasExposicionMovimientoMasa', nombre: 'areas_exposicion_movimientos_masa'},
  {id: 'zonasCriticasMovimientoMasa', nombre: 'zonas_criticas_movimientos_masa'},
  {id: 'inventarioMovimientoMasa', nombre: 'inventario_movimientos_masa'},
  {id: 'serviciosEducativos', nombre: 'servicios_educativos'},
  {id: 'localesEducativos', nombre: 'locales_educativos'},
  {id: 'institucionesPrestadorasServiciosSalud', nombre: 'instituciones_prestadoras_servicios_salud'},
];

export function fechaHoy()
{
  const fecha = new Date(),
  dia = String(fecha.getDate()).padStart(2, '0'),
  mes = String(fecha.getMonth() + 1).padStart(2, '0'),
  año = fecha.getFullYear();
  return (dia + '' + mes + '' + año);
}

export function bbox(id, mensaje, tipo)
{
  const alertPlaceholder = document.getElementById(id);
  const texto = '<div class="alert alert-'+ tipo + ' alert-dismissible" role="alert">' +
    ' <div>'+ mensaje +'</div>' +
    ' <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>' +
    '</div>';
  alertPlaceholder.innerHTML = texto;
}

export function validarURLServicioWMS(url) {
  const regex = /[?&](?=.*\brequest\b)(?=.*\bservice\b)/i;
  return regex.test(url);
}

export function modificarURLServicioWMS(url) {
  if (!/\?/.test(url) || !/(?:[?&])(REQUEST|SERVICE)=/i.test(url)) {
    const parametrosFaltantes = [];

    if (!/(?:[?&])REQUEST=/i.test(url)) {
      parametrosFaltantes.push('REQUEST=GetCapabilities');
    }
    if (!/(?:[?&])SERVICE=/i.test(url)) {
      parametrosFaltantes.push('SERVICE=WMS');
    }

    url += (url.includes('?') ? '&' : '?') + parametrosFaltantes.join('&');
  }
  return url;
}

export function validarUrl(url) {
  try {
    new URL(url);
    return true;
  } catch (error) {
    return false;
  }
}

// OGC: WMS
//https://idesep.senamhi.gob.pe:443/geoserver/g_05_01/wms?
//05_01_001_03_001_512_2021_00_00

//http://34.125.26.195:8080/geoserver/geoportal/wms?

//https://espacialg.geoperu.gob.pe/geoserver/geoperu/wms?service=WMS&request=GetCapabilities&version=1.1.1

// OGC: WFS -- ?service=WFS&version=1.1.0&request=getCapabilities
//https://espacialg.geoperu.gob.pe/geoserver/geoperu/wfs
//peru_caminos_inka_

// Rest ArcGIS
//https://portalgeo.sbn.gob.pe/geosrv/rest/services/sdrc/wms_sinabip_libre/MapServer
//https://geospatial.sernanp.gob.pe/arcgis_server/rest/services/base_fisica/peru_sernanp_010200/MapServer

//https://geominsa.minsa.gob.pe/geominsaserver/rest/services/SRV_DGAIN_DIPOS/SRV_DIPOS_GeoRIS_SeguridadHospitalaria/MapServer