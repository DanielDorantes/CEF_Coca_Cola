/**
=========================================================
* Material Dashboard 2 PRO React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-pro-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { useEffect, useMemo, useRef, useState } from "react";

// porp-types is a library for typechecking of props
import PropTypes from "prop-types";

// react-chartjs-2 components
//import { Line } from "react-chartjs-2";
import ReactECharts from "echarts-for-react";

// @mui material components
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";


import FileDownloadIcon from '@mui/icons-material/FileDownload';

import SaveAltIcon from '@mui/icons-material/SaveAlt';
import SaveIcon from '@mui/icons-material/Save';
import ReplayIcon from '@mui/icons-material/Replay';



import Stack from "@mui/material/Stack";

// Material Dashboard 2 PRO React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// ReportsLineChart2 configurations
import MDButton from "components/MDButton";
import { useMaterialUIController } from "context";
import { Box, FormControl, FormControlLabel, Grid, IconButton, Modal, Radio, RadioGroup, TextField, Tooltip } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { es } from "date-fns/locale";

import swal from 'sweetalert';

import moment from "moment";
import SimpleCard from "examples/Cards/StatisticsCards/SimpleCard";
import { SavePDFGraph } from "assets/PDF/SavePDF";
import { ProgresBar } from "layouts/Produccion/L5/PCCS/elementos/ProgresBar";
import ReactTooltip from 'react-tooltip'


import { Horas_T1, Horas_T2 } from './components/Horas'
import { ScaleLoader } from "react-spinners";
import Swal from "sweetalert2";


moment.locale("es-mx");

function ReportsLineChart2({ color, title, chart, funReport, Escala = {
  Minima: 0,
  Maxima: 0
}, Alerta = {
  Minima: 0,
  Maxima: 0
}, pieces, markLine, Historicos, Actual = {
  PHL5: 0
  , OzonoTorre: 0
  , OzonoL5: 0
  , TemperaturaL5: 0
} }) {

  let datos = [];

  let datos2 = [];

  const area = title === 'Ozono Lavadora' ? 'OzonoLav' : title === 'Ozono Torre' ? 'OzonoTor' : title === 'Temperatura Lavadora' ? 'TemLav' : title === 'PH Torre' ? 'PhTor' : '';




  const [esMax, setEsMax] = useState(Escala.Maxima);
  const [esMin, setEsMin] = useState(Escala.Minima);
  const [aleMax, setAleMax] = useState(Alerta.Maxima);
  const [aleMin, setAleMin] = useState(Alerta.Minima);

  const [cargando, setCargando] = useState(false);


  //const ref = useRef();
  const wsUrl = process.env.REACT_APP_AUTH_URL_WEBSOCKET;//192.168.100.13


  const alertReset = (async () => {

    //alert(area)
    //alert(`http://${wsUrl}:1880/api/Alertas/pccs/reset`);
    const url = `http://${wsUrl}:1880/api/Alertas/pccs/reset`;
    //alert(url)
    //console.log(url);
    try {
      const response = await fetch(url, { method: 'post', headers: new Headers({ 'Area': area }) });
      // datosHistoricos = await response.json();

      //fill();
      //enableRefresh();
      //console.log(datos)
      //setAlerta(await response.json());
      //console.log(DatosActual);
      //disableNoData();
      Swal.fire(
        'Hecho',
        'los valores de escala y alerta de la grafica ' + area + ' han sido actualizadas',
        'success'
      );
      //alert('cambios correctos')

    } catch (error) {
      console.log('Hay un error: ' + error);
      //alert('error')
      Swal.fire({
        icon: 'error',
        title: 'Algo a salido mal al restaurar los valores de alertas...',
        text: 'contacte a soporte tecnico',
        footer: 'Codigo de error ' + error
      })
      //console.log(response)
      //console.log(datos)
    }

  });



  const AlertUpdate = (async () => {
    //console.log("aqui empieza la falla");
    //alert("entro a medicionesPCC5");
    //alert(area)
    //alert(`http://${wsUrl}:1880/api/Alertas/pccs/update?EsMax=${esMax}&EsMin=${esMin}&AleMax=${aleMax}&AleMin=${aleMin}`);
    const url = `http://${wsUrl}:1880/api/Alertas/pccs/update?EsMax=${esMax}&EsMin=${esMin}&AleMax=${aleMax}&AleMin=${aleMin}`;
    //alert(url)
    //console.log(url);
    try {
      const response = await fetch(url, { method: 'post', headers: new Headers({ 'Area': area }) });
      // datosHistoricos = await response.json();

      //fill();
      //enableRefresh();
      //console.log(datos)
      //setAlerta(await response.json());
      //console.log(DatosActual);
      //disableNoData();
      Swal.fire(
        'Cambios realizados correctamente',
        'De click en ok para continuar',
        'success'
      )

      //alert('cambios correctos')

    } catch (error) {
      console.log('Hay un error: ' + error);
      Swal.fire({
        icon: 'error',
        title: 'Algo a salido mal al restaurar los valores de alertas...',
        text: 'contacte a soporte tecnico',
        footer: 'Codigo de error ' + error
      })
      //alert('error')
      //console.log(response)
      //console.log(datos)
    }

  });

  //useEffect(lineaHistorica, []);


  //setTimeout(lineaHistorica, 5000);


  const [chartRef, setChartRef] = useState()//useRef();


  const handelChangeEscalMax = (e) => setEsMax(e.target.value)
  const handelChangeEscalMin = (e) => setEsMin(e.target.value);
  const handelChangeLimInf = (e) => setAleMin(e.target.value)
  const handelChangeLimSup = (e) => setAleMax(e.target.value)

  const baseUrl = process.env.REACT_APP_AUTH_URL_WEBSOCKET || 'localhost';

  const [medicion, setMedicion] = useState();

  const [open, setOpen] = useState(false);

  const [turno, setTurno] = useState("1");
  const [fecha, setFecha] = useState(moment(Date.now()));

  const [Datas, setDatas] = useState([]);

  const [controller] = useMaterialUIController();
  const { darkMode } = controller;

  const ReporteGrafica = (turno, title) => {
    const ref = chartRef.getEchartsInstance();
    console.log("inicializando la impresion del archivo");
    SavePDFGraph(turno, title, ref, fecha.format("YYYY-MM-DD"));
    console.log("tarea finalizada");
  }

  const Reportes = (e) => {
    setOpen(true);
  }

  const GuardarNuevosValores = () => {

    if ((esMax < esMin || aleMax < aleMin)) {
      Swal.fire({
        icon: 'error',
        title: 'Error en el seteo de alertas y escalas',
        text: 'No se puede agregar un valor minimo mayor a un maximo'
      })
    }
    else {
      if (title == 'Ozono Lavadora' && (esMax < 2 || esMin > 1.1)) {
        Swal.fire({
          icon: 'error',
          title: 'Error en el seteo de alertas y escalas',
          text: 'No se puede agregar un valor de alerta minima mayor al valor de advertencia minima o alerta maxima menor a la advertencia maxima'
        })
      }
      else {
        Swal.fire({
          title: 'Modificando las escalas y alertas',
          text: "¿Desea continuar?",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'si'
        }).then((result) => {
          if (result.isConfirmed) {
            AlertUpdate();
          }
        })
      }
    }
  };

  const resetValores = () => {
    /*alert(Escala.Minima + ' ' + Escala.Maxima + ' ' + Alerta.Maxima + ' ' + Alerta.Minima + ' ' + Alerta);//*/
    alertReset();
    //window.location.reload();
  }

  const handleChangeTurno = (event) => {
    setTurno(event.target.value);
    setCargando(true);
    //console.log(event);
  }

  const handleClose = () => setOpen(false);
  const options = chart;


  let url = `http://${baseUrl}:1880/api/${funReport}/${turno}/${fecha.format("YYYY-MM-DD")}`;

  const styleTable = {
    position: 'absolute',
    top: '10%',
    left: '30%',
    transform: 'translate(-20%, 0%)',
    width: '75%',
    height: '75%',
    bgcolor: 'background.paper',
    borderRadius: '15px',
  };
  useEffect(() => {
    if (funReport === "OzonoLavadora") {
      //setTituloGrafica("Ozono Lavadora");
      setMedicion('ppm');
    } if (funReport === "TemperaturaLavadora") {
      //setTituloGrafica("Temperatura Lavadora");
      setMedicion('°C');
    }
    if (funReport === "OzonoTorre") {
      //setTituloGrafica("Ozono Torre");
      setMedicion('ppm');
    } if (funReport === "PhTorre") {
      //setTituloGrafica("Ph Torre");
      setMedicion('PH');
    }
  }, [funReport])

  const busqueda = async () => {
    try {
      const response = await fetch(url);
      datos = await response.json();
      if (datos && datos.length > 0) {
        setDatas(datos);
        setCargando(false);
      } else {
        console.log('error en la busqueda')
        setDatas([]);
        setCargando(false);
      }
    } catch (error) {
      console.log('Hay un error: ' + error);
    }
  }
  //url
  useEffect(busqueda, [turno + fecha.format("YYYY-MM-DD")]);

  let optionLine = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross'
      }
    },
    toolbox: {//son herramientas para ver los datos
      show: true,
    },
    grid: {
      left: '10%',
      right: '2%',
      bottom: '10%'
    },

    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: turno == 1 ? Horas_T1 : Horas_T2,//Datas.map(item => item.Fecha.substring(11,16)),
      axisLabel: {
        interval: 29
      }
    },
    yAxis: {
      type: 'value',
      min: esMin,
      max: esMax,
      interval: (esMax - esMin) / 10,
      axisLabel: {
        formatter: '{value} ' + medicion,
      },
      axisPointer: {
        snap: true
      }
    },
    visualMap: {
      show: false,
      pieces: pieces,
      outOfRange: {
        color: 'black'
      }
    },
    legend: {
      show: false
    },
    series: [
      {
        name: 'Valor',
        type: 'line',
        //stack: 'Total', totaliza las graficas
        data: Datas.map(item => item.OzonoLv || item.TemperaturaLv || item.OzonoTorre || item.PhTorre),
        formatter: '{ value }' + medicion,
        showSymbol: false,
        emphasis: {
          lineStyle: {
            width: 2
          }
        },
        label: {
          show: false,
          offset: [15, 20]
        },
        ...markLine
      },
    ]
  };

  const valor = funReport === "OzonoLavadora" ? Actual.OzonoL5 : funReport === "TemperaturaLavadora" ? Actual.TemperaturaL5 : funReport === "OzonoTorre" ? Actual.OzonoTorre : funReport === "PhTorre" ? Actual.PHL5 : 0;

  return (
    // <Card sx={{ height: "100%" }}>
      <MDBox padding="rem">
        {useMemo(
          () => (
            <MDBox
              variant="gradient"
              bgColor={color}
              borderRadius="lg"
              coloredShadow={color}
              // py={1}
              // pr={0.5}
              mt={0}
              // height="17.5rem"
            >
              <MDTypography variant="h6" textTransform="capitalize" lineHeight={1} sx={{ mt: 0.15, mr: 0.5, ml: '40%' }}>
                Linea de Tiempo {title}
              </MDTypography>
              <ReactECharts option={options} /*onEvents={onEvents}*/ />
            </MDBox>
          ),
          [chart, color]
        )}
      </MDBox>
    // </Card>
  );
}

// Setting default values for the props of ReportsLineChart2
ReportsLineChart2.defaultProps = {
  color: "dark",
  description: "",
};

// Typechecking props for the ReportsLineChart2
ReportsLineChart2.propTypes = {
  color: PropTypes.oneOf(["primary", "secondary", "info", "success", "warning", "error", "dark", "light"]),
  title: PropTypes.string.isRequired,
  description: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  //date: PropTypes.string.isRequired,
  chart: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.array, PropTypes.object])).isRequired,
};

export default ReportsLineChart2;