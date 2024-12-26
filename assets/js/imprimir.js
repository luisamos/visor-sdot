const format = document.getElementById('formatoPagina').value,
resolution = document.getElementById('resolucionImagen').value,
dims = {
  a0: [1189, 841],
  a1: [841, 594],
  a2: [594, 420],
  a3: [420, 297],
  a4: [297, 210],
  a5: [210, 148],
};

const exportarPdf = document.getElementById('exportarPdf');

exportarPdf.addEventListener('click',function (){
  exportarPdf.disabled = true;
    document.body.style.cursor = 'progress';
    const dim = dims[format];
    const width = Math.round((dim[0] * resolution) / 25.4);
    const height = Math.round((dim[1] * resolution) / 25.4);
    const size = global.mapa.getSize();
    const viewResolution = global.mapa.getView().getResolution();

    global.mapa.once('rendercomplete', function (){
      const mapCanvas = document.createElement('canvas');
      mapCanvas.width = width;
      mapCanvas.height = height;
      
      const mapContext = mapCanvas.getContext('2d');
      Array.prototype.forEach.call(
        document.querySelectorAll('.ol-layer canvas'),
        function (canvas) {
          if (canvas.width > 0) {
            const opacity = canvas.parentNode.style.opacity;
            mapContext.globalAlpha = opacity === '' ? 1 : Number(opacity);
            const transform = canvas.style.transform;            
            const matrix = transform
              .match(/^matrix\(([^\(]*)\)$/)[1]
              .split(',')
              .map(Number);
            
            CanvasRenderingContext2D.prototype.setTransform.apply(
              mapContext,
              matrix,
            );
            
            mapContext.drawImage(canvas, 0, 0);
          }
        },
      );
      mapContext.globalAlpha = 1;
      mapContext.setTransform(1, 0, 0, 1, 0, 0);
      const pdf = new jspdf.jsPDF('landscape', undefined, format);
      pdf.addImage(
        mapCanvas.toDataURL('image/jpeg'),
        'JPEG',
        0,
        0,
        dim[0],
        dim[1],
      );
      pdf.save('SDOT.pdf');
      global.mapa.setSize(size);
      global.mapa.getView().setResolution(viewResolution);
      exportarPdf.disabled = false;
      document.body.style.cursor = 'auto';
    });

    const printSize = [width, height];
    global.mapa.setSize(printSize);
    const scaling = Math.min(width / size[0], height / size[1]);
    global.mapa.getView().setResolution(viewResolution / scaling);
  },
  false,
);