import jsPDF from 'jspdf';
import moment from 'moment';
import { IconCEF } from './IconBase64/Ion';
import autoTable from 'jspdf-autotable';


moment.locale("es-mx");

export const SavePDFGraph = (turno, title, chartRef, fecha) => {

  //console.log(turno + '   ' + title)
  console.log(chartRef)
  //alert(moment())
  console.log(fecha)
  const doc = new jsPDF({
    orientation: 'l',
    unit: 'mm',
    format: 'a4',
    putOnlyUsedFonts: true,
    floatPrecision: 16
  });

  //const ImageCEF = '"data:image/jpeg;base64,'+IconCEF;

  if (IconCEF) {
    doc.addImage(
      IconCEF,
      "JPEG",
      0,
      0,
      300,
      0
    );
  }
  //Formato del archivo pdf
  //doc.addImage(imagePacifico, 'PNG', 10, 2, 50, 15);

  doc.setFontSize(14);
  doc.setTextColor(0, 0, 0);
  doc.setFont("Arial");
  //doc.setFontType("bold");
  doc.text(110, 18, "Reporte PCC 2Q");//doc.text(110, 18, "Reporte PCC Linea 5");

  //doc.addImage(ImageCEF, 'JPEG', 0, 2, 50, 15);
  doc.line(10, 20, 285, 20);


  //Fuentes #1
  doc.setFontSize(12);
  doc.setTextColor(0, 0, 0);

  doc.text("Medicion:", 10, 30);
  doc.text("Fecha reporte:", 10, 40);
  doc.text("Turno:", 10, 50, 0, 100);


  doc.setTextColor(255, 0, 0);
  doc.text(32, 30, title);
  doc.text(42, 40, fecha);
  doc.text(27, 50, turno);

  doc.setTextColor(0, 0, 0);


  doc.setFontSize(10);
  doc.text(title.includes("Ozono") ? "ppm" : title.includes("Temperatura") ? 'Temperatura' : 'pH', 10, 125, 90);
  doc.text("Hora", 140, 195);

  const hora = moment().format('HH:mm');
  doc.setFontSize(10);
  doc.text(230, 200, moment().format(`YYYY-MM-DD ${hora}`));
  doc.setFontSize(8);
  doc.text("Este archivo es confidencial y su información solo puede ser vista por el personal autorizado", 10, 200,);


  const chartImg = chartRef.getDataURL({
    type: 'png', // can be jpeg or png
    pixelRatio: 5, // image's ratio. default is 1
    backgroundColor: '#fff', // hex color defining the background of the chart  
    //pixelRatio: 1.5,
    //backgroundColor: '#fff'
  });
  console.log(chartImg)
  // doc.addImage(chartImg, 13, 65, 263, 100);
  doc.addImage(chartImg, 0, 0, 0, 0);
  doc.save(title + '_' + '2022-07-01' + '.pdf');



  /*

  // I know the proper spelling is colour ;)
  doc.setTextColor(100);
  doc.text("Pagina de prueba.", 20, 20);
  
  doc.setTextColor(150);
  doc.text("Pagina de prueba.", 20, 30);
  
  doc.setTextColor(255, 0, 0);
  doc.text("Pagina de prueba.", 20, 40);
  
  doc.setTextColor(0, 255, 0);
  doc.text("Pagina de prueba.", 20, 50);
  
  doc.setTextColor(0, 0, 255);
  doc.text("Pagina de prueba.", 20, 60);
  
  doc.setTextColor("red");
  doc.text("Pagina de prueba.", 60, 40);
  
  doc.setTextColor("green");
  doc.text("Pagina de prueba.", 60, 50);
  
  doc.setTextColor("blue");
  doc.text("Pagina de prueba.", 60, 60);
  
  doc.save('pagina de prueba.pdf');

  */
}
//! Trabajando
export const SavePDFTableAguaConsumoDirario = (data, fileName, fechaInicio, fechaFin) => {

  //alert(fileName);

  console.log('data')
  console.log(data)
  
  const d = new Date();
  const dateTime =
    d.toLocaleDateString("es-MX") +
    " " +
    d.getHours() +
    ":" +
    d.getMinutes() +
    ":" +
    d.getSeconds();

  var columns = [
    //{ title: "Fecha", dataKey: "fecha" },
    //{ title: "Dia Semana", dataKey: "diaSemana" },
    { title: "Area", dataKey: "area" },
    { title: "Consumo Total en Metros Cúbicos", dataKey: "consumoTotal" },
  ];
  var rows = [];

  data.map(function (x) {
    rows.push({
      //fecha: x.fecha,
      //diaSemana: x.diaSemana,
      area: x.Area,
      consumoTotal: x.Flujo
    });
    return null;
  });

  var doc = new jsPDF("p", "pt");
  var totalPagesExp = "{total_pages_count_string}";
  doc.autoTable(columns, rows, {
    margin: { top: 120 },
    theme: "striped",
    headStyles: { fillColor: [190, 4, 4] },
    styles: { fontSize: 8 },
    didDrawPage: function (data) {
      // Header
      doc.setFontSize(20);
      doc.setFont("Helvetica", "bold");
      if (IconCEF) {
        doc.addImage(
          IconCEF,
          "JPEG",
          0,
          0,
          630,
          60
        );
      }
      
      doc.setFontSize(12);
      //doc.setFont("Arial");
      doc.text(fileName, /*data.settings.margin.left*/85, 50);
      //Fuentes #1
      doc.setFontSize(13);
      doc.setTextColor(0, 0, 0);

      doc.text("Fechas del reporte:", 40, 95);


      doc.setTextColor(255, 0, 0);
      doc.text(160, 95, fechaInicio + ' a ' + fechaFin);


      // Footer
      var str = "Page " + doc.internal.getNumberOfPages();
      // Total page number plugin only available in jspdf v1.0+
      if (typeof doc.putTotalPages === "function") {
        str = str + " of " + totalPagesExp;
      }
      doc.setFontSize(10);

      // jsPDF 1.4+ uses getWidth, <1.4 uses .width
      var pageSize = doc.internal.pageSize;
      var pageHeight = pageSize.height
        ? pageSize.height
        : pageSize.getHeight();
      doc.text(str, data.settings.margin.left, pageHeight - 20);
      doc.text(dateTime, data.settings.margin.left * 11.8, pageHeight - 20);
    },
  });
  // Total page number plugin only available in jspdf v1.0+
  if (typeof doc.putTotalPages === "function") {
    doc.putTotalPages(totalPagesExp);
  }

  doc.save(fileName + ".pdf");
}

export const SavePDFTableAguaConsumoArea = (data, fileName) => {

  const d = new Date();
  const dateTime =
    d.toLocaleDateString("es-MX") +
    " " +
    d.getHours() +
    ":" +
    d.getMinutes() +
    ":" +
    d.getSeconds();

  var columns = [
    { title: "Fecha", dataKey: "fecha" },
    { title: "Area", dataKey: "area" },
    { title: "Consumo Total en Metros Cúbicos", dataKey: "consumoTotal" },
  ];
  var rows = [];

  data.map(function (x) {
    rows.push({
      fecha: x.fecha,
      area: x.area,
      consumoTotal: x.consumoTotal
    });
    return null;
  });

  var doc = new jsPDF("p", "pt");
  var totalPagesExp = "{total_pages_count_string}";

  //doc.setFont("Arial");
  //doc.setTextColor(255, 0, 0);

  doc.autoTable(columns, rows, {
    margin: { top: 120 },
    theme: "striped",
    headStyles: { fillColor: [190, 4, 4] },
    styles: { fontSize: 8 },
    didDrawPage: function (data) {
      // Header
      doc.setFontSize(20);
      doc.setFont("Helvetica", "bold");
      if (IconCEF) {
        doc.addImage(
          IconCEF,
          "JPEG",
          0,
          0,
          630,
          60
        );
      }
      //doc.text("", data.settings.margin.left, 50);
      doc.setFontSize(12);
      doc.text(fileName, /*data.settings.margin.left*/85, 50);

      // Footer
      var str = "Page " + doc.internal.getNumberOfPages();
      // Total page number plugin only available in jspdf v1.0+
      if (typeof doc.putTotalPages === "function") {
        str = str + " of " + totalPagesExp;
      }
      doc.setFontSize(10);

      // jsPDF 1.4+ uses getWidth, <1.4 uses .width
      var pageSize = doc.internal.pageSize;
      var pageHeight = pageSize.height
        ? pageSize.height
        : pageSize.getHeight();
      doc.text(str, data.settings.margin.left, pageHeight - 20);
      doc.text(dateTime, data.settings.margin.left * 11.8, pageHeight - 20);
    },
  });
  // Total page number plugin only available in jspdf v1.0+
  if (typeof doc.putTotalPages === "function") {
    doc.putTotalPages(totalPagesExp);
  }
  doc.save(fileName + ".pdf");
}

export const SavePDFTable = (data, fileName, fecha, turno) => {
  const d = new Date();
  const dateTime =
    d.toLocaleDateString("es-MX") +
    " " +
    (d.getHours() < 10 ? '0' + d.getHours() : d.getHours()) +
    ":" +
    (d.getMinutes() < 10 ? '0' + d.getMinutes() : d.getMinutes()) +
    ":" +
    (d.getSeconds() < 10 ? '0' + d.getSeconds() : d.getSeconds());

  var columns = [
    { title: "Area", dataKey: "Area" },
    { title: "Hora (hh:mm)", dataKey: "Hora" },
    { title: "Tiempo de Produccion (hh:mm)", dataKey: "TiempoProduccion" },
    { title: "Cajas Fisicas", dataKey: "CajasFisicas" },
    { title: "Cajas Unidad", dataKey: "CajasUnidad" },
    { title: "Rechazos", dataKey: "Rechazos" },
    { title: "Indice de llenado (%)", dataKey: "IndiceCalidad" },
  ];
  var rows = [];

  data.map(function (x) {
    rows.push({
      Area: x.Area,
      Hora: x.Hora,
      TiempoProduccion: x.TiempoProduccion,
      CajasFisicas: x.CajasFisicas,
      CajasUnidad: x.CajasUnidad,
      Rechazos: x.Rechazos,
      IndiceCalidad: x.IndiceCalidad,
    });
    return null;
  });

  var doc = new jsPDF("p", "pt");
  var totalPagesExp = "{total_pages_count_string}";
  doc.autoTable(columns, rows, {
    margin: { top: 120 },
    theme: "striped",
    headStyles: { fillColor: [190, 4, 4] },
    styles: { fontSize: 8 },
    didDrawPage: function (data) {
      // Header
      doc.setFontSize(20);
      doc.setFont("Helvetica", "bold");
      if (IconCEF) {
        doc.addImage(
          IconCEF,
          "JPEG",
          0,
          0,
          630,
          60
        );
      }
      doc.setFontSize(12);
      doc.text(fileName, /*data.settings.margin.left*/85, 50);

      doc.setFontSize(13);
      doc.setTextColor(0, 0, 0);

      doc.text("Fechas del reporte: ", 40, 80);

      doc.text("Turno: ", 40, 100);


      doc.setTextColor(255, 0, 0);
      doc.text(fecha, 165, 80);
      doc.text(turno + '', 85, 100);
      //turno+''
      //`${turno}`
      //String(turno)
      //turno.toString()


      // Footer
      var str = "Page " + doc.internal.getNumberOfPages();
      // Total page number plugin only available in jspdf v1.0+
      if (typeof doc.putTotalPages === "function") {
        str = str + " of " + totalPagesExp;
      }
      doc.setFontSize(10);

      // jsPDF 1.4+ uses getWidth, <1.4 uses .width
      var pageSize = doc.internal.pageSize;
      var pageHeight = pageSize.height
        ? pageSize.height
        : pageSize.getHeight();
      doc.text(str, data.settings.margin.left, pageHeight - 20);
      doc.text(dateTime, data.settings.margin.left * 11.8, pageHeight - 20);
    },
  });
  // Total page number plugin only available in jspdf v1.0+
  if (typeof doc.putTotalPages === "function") {
    doc.putTotalPages(totalPagesExp);
  }
  doc.save(fileName + ".pdf");
}

export const SaveCipPDF = (chartRef, fecha, cipArray, cipEstado, cip, arreglo) => {

  const OzonoHora = cipEstado === 'todos' ? (cipArray.Ozono.OzonoHoras >= 10 ? cipArray.Ozono.OzonoHoras : '0' + cipArray.Ozono.OzonoHoras) : (arreglo.Datos[arreglo.Datos.length - 1].Horas >= 10 ? arreglo.Datos[arreglo.Datos.length - 1].Horas : '0' + arreglo.Datos[arreglo.Datos.length - 1].Horas);
  const OzonoMinuto = cipEstado === 'todos' ? (cipArray.Ozono.OzonoMinutos >= 10 ? cipArray.Ozono.OzonoMinutos : '0' + cipArray.Ozono.OzonoMinutos) : (arreglo.Datos[arreglo.Datos.length - 1].Minutos >= 10 ? arreglo.Datos[arreglo.Datos.length - 1].Minutos : '0' + arreglo.Datos[arreglo.Datos.length - 1].Minutos);

  const CalienteHora = cipEstado === 'todos' ? (cipArray.Caliente.CalienteHoras >= 10 ? cipArray.Caliente.CalienteHoras : '0' + cipArray.Caliente.CalienteHoras) : (arreglo.Datos[arreglo.Datos.length - 1].Horas >= 10 ? arreglo.Datos[arreglo.Datos.length - 1].Horas : '0' + arreglo.Datos[arreglo.Datos.length - 1].Horas);
  const CalienteMinuto = cipEstado === 'todos' ? (cipArray.Caliente.CalienteMinutos >= 10 ? cipArray.Caliente.CalienteMinutos : '0' + cipArray.Caliente.CalienteMinutos) : (arreglo.Datos[arreglo.Datos.length - 1].Minutos >= 10 ? arreglo.Datos[arreglo.Datos.length - 1].Minutos : '0' + arreglo.Datos[arreglo.Datos.length - 1].Minutos);


  const usuario = cipEstado === 'todos' ? (cip === 'ozono' ? cipArray.Ozono.Usuario : cipArray.Caliente.Usuario) : (cip === 'ozono' ? arreglo.Datos[arreglo.Datos.length - 1].Usuario : arreglo.Datos[arreglo.Datos.length - 1].Usuario);
  const equipo = cipEstado === 'todos' ? (cip === 'ozono' ? cipArray.Ozono.OzonoLavadora : cipArray.Caliente.CalienteLavadora) : (cip === 'ozono' ? arreglo.Datos[arreglo.Datos.length - 1].Lavadora : arreglo.Datos[arreglo.Datos.length - 1].Lavadora);
  const tipoCip = cipEstado === 'todos' ? (cip === 'ozono' ? cipArray.Ozono.OzonoTipo : cipArray.Caliente.CalienteTipo) : (cip === 'ozono' ? arreglo.Datos[arreglo.Datos.length - 1].Tipo : arreglo.Datos[arreglo.Datos.length - 1].Tipo);
  const secuencia = cipEstado === 'todos' ? (cip === 'ozono' ? cipArray.Ozono.OzonoSecuencia : cipArray.Caliente.CalienteSecuencia) : (cip === 'ozono' ? arreglo.Datos[arreglo.Datos.length - 1].Secuencia : arreglo.Datos[arreglo.Datos.length - 1].Secuencia);
  const tiempoSecuencia = cipEstado === 'todos' ? (cip === 'ozono' ? cipArray.Ozono.OzonoTiempoSecuencia || '00:00' : cipArray.Caliente.CalienteTiempoSecuencia || '00:00') : (cip === 'ozono' ? arreglo.Datos[arreglo.Datos.length - 1].TiempoSecuencia || '00:00' : arreglo.Datos[arreglo.Datos.length - 1].TiempoSecuencia || '00:00');
  const tiempoProceso = cip === 'ozono' ? OzonoHora + ':' + OzonoMinuto : CalienteHora + ':' + CalienteMinuto;
  const ppmRetorno = cipEstado === 'todos' ? (cipArray.Ozono.OzonoRetorno || 0).toFixed(2) : (arreglo.Datos[arreglo.Datos.length - 1].Ozono_ppm_Retorno);
  const ppmSalida = cipEstado === 'todos' ? (cipArray.Ozono.OzonoSalida || 0).toFixed(2) : (arreglo.Datos[arreglo.Datos.length - 1].Ozono_ppm_Salida);

  const porcentaje = cipEstado === 'todos' ? (cipArray.Caliente.CalienteConductividad) : (arreglo.Datos[arreglo.Datos.length - 1].Conductividad);
  const temperaturaRetorno = cipEstado === 'todos' ? (cipArray.Caliente.CalienteTemperaturaRetorno) : (arreglo.Datos[arreglo.Datos.length - 1].Temperatura_Retorno);
  const temperaturaSalida = cipEstado === 'todos' ? (cipArray.Caliente.CalienteTemperaturaSalida) : (arreglo.Datos[arreglo.Datos.length - 1].Temperatura_Salida);
  
  let valor = 0;
  const posicionX = cip === 'ozono' ? valor=196 : valor=178;
  const posicionX2 = cip === 'ozono' ? valor=192 : valor=209;
  // const posicionX3 = cip === 'ozono' ? valor=0 : valor=206;
  
  const texto = cip === 'ozono' ? 'PPM Retorno Promedio:' : 'Porcentaje Ms:';
  const texto2 = cip === 'ozono' ? 'PPM Salida Promedio:' : 'Temperatura retorno promedio:';
  const texto3 = cip === 'ozono' ? ' ' : 'Temperatura salida promedio:';

  const dato = cip === 'ozono' ? ppmRetorno.toString() : porcentaje.toString();
  const dato2 = cip === 'ozono' ? ppmSalida.toString() : temperaturaRetorno.toString();
  const dato3 = cip === 'ozono' ? ' ' : temperaturaSalida.toString();

  console.log(tiempoSecuencia);



  //console.log(turno + '   ' + title)
  console.log(chartRef)
  //alert(moment())
  console.log(fecha)
  const doc = new jsPDF({
    orientation: 'l',
    unit: 'mm',
    format: 'a4',
    putOnlyUsedFonts: true,
    floatPrecision: 16
  });

  //const ImageCEF = '"data:image/jpeg;base64,'+IconCEF;

  if (IconCEF) {
    doc.addImage(
      IconCEF,
      "JPEG",
      0,
      0,
      315,
      20
    );
  }
  //Formato del archivo pdf
  //doc.addImage(imagePacifico, 'PNG', 10, 2, 50, 15);

  doc.setFontSize(14);
  doc.setTextColor(0, 0, 0);
  doc.setFont("Arial");
  //doc.setFontType("bold");
  doc.text(110, 18, "Reporte CIP");//doc.text(110, 18, "Reporte PCC Linea 5");

  //doc.addImage(ImageCEF, 'JPEG', 0, 2, 50, 15);
  doc.line(0, 20, 300, 20);


  //Fuentes #1
  doc.setFontSize(12);
  doc.setFont(undefined, 'bold')
  doc.setTextColor(0, 0, 0);

  doc.text("Usuario:", 10, 30);
  doc.text("Equipo:", 10, 40);
  doc.text("Tipo de cip:", 10, 50, 0, 100);

  doc.text("Secuencia:", 75, 30);
  doc.text("Tiempo de secuencia:", 75, 40);
  doc.text("Tiempo de proceso:", 75, 50, 0, 100);

  doc.text(texto, 150, 30);
  doc.text(texto2, 150, 40);
  doc.text(texto3, 150, 50, 0, 100);


  doc.text("Folio:", 240, 30);
  doc.text("Area:", 240, 40);
  // doc.text("CIP:", 240, 50);

  //-------------------------------------------------------------
  // Valores de variables 
  //-------------------------------------------------------------
  doc.setFont(undefined, 'normal')
  doc.setTextColor(255, 0, 0);
  doc.text(26, 30, usuario);
  doc.text(25, 40, equipo);
  doc.text(32, 50, tipoCip);

  doc.text(95, 30, secuencia);
  doc.text(114, 40, tiempoSecuencia);
  doc.text(111, 50, tiempoProceso);
  
  doc.text(posicionX, 30, dato);
  doc.text(posicionX2, 40, dato2);
  doc.text(206, 50, dato3);

  doc.text(251, 30, '202212210101');
  doc.text(250, 40, 'Todos');
  // doc.text(249, 50, '202212210101');

  doc.setTextColor(0, 0, 0);


  doc.setFontSize(10);
  // doc.text(title.includes("Ozono")?"ppm":title.includes("Temperatura")?'Temperatura':'pH', 10, 125, 90);
  // doc.text("Hora", 140, 195);

  const hora = moment().format('HH:mm');
  doc.setFontSize(10);
  doc.text(230, 200, moment().format(`YYYY-MM-DD ${hora}`));
  doc.setFontSize(8);
  doc.text("Este archivo es confidencial y su información solo puede ser vista por el personal autorizado", 10, 200,);


  const chartImg = chartRef.getDataURL({
    type: 'png', // can be jpeg or png
    pixelRatio: 5, // image's ratio. default is 1
    backgroundColor: '#fff', // hex color defining the background of the chart  
    //pixelRatio: 1.5,
    //backgroundColor: '#fff'
  });
  console.log(chartImg)
  //                     x, y, , 
  doc.addImage(chartImg, 1, 65, 300, 110);
  doc.save('Reporte' + '_'+'CIP'+ '_' + fecha + '.pdf');
}