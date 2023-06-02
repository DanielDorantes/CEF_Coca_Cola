import { FormControl, Grid, IconButton, InputLabel, Menu, MenuItem, OutlinedInput, Select, TextField, Typography } from '@mui/material'
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import MDBox from 'components/MDBox'
import ComplexStatisticsCard from 'examples/Cards/StatisticsCards/ComplexStatisticsCard'
import React, { useEffect, useMemo, useState } from 'react'
import Card from "@mui/material/Card";
import ReplayIcon from '@mui/icons-material/Replay';
import Stack from "@mui/material/Stack";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar, Line } from 'react-chartjs-2'
import MDTypography from 'components/MDTypography';
import DataTable from 'examples/Tables/DataTable';
import moment from 'moment';
import { DatePicker, LocalizationProvider } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { es } from 'date-fns/locale';
import { Scrollbars } from 'react-custom-scrollbars';
import { SavePDFTableAguaConsumoDirario, SavePDFTableAguaConsumoArea } from 'assets/PDF/SavePDF';
import { SaveExcel } from 'assets/EXCEL/SaveExcel';
import ReactTooltip from 'react-tooltip'
import ReactECharts from 'react-echarts-resizable';

moment.locale("es-mx");

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function AguaScreem() {

  const [consumoHistoricosAguaGrafica, setConsumoHistoricosAguaGrafica] = useState([]);

  const [consumoHistoricosAguaGrafica2, setConsumoHistoricosAguaGrafica2] = useState([]);

  const state = {
    labels: ['00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00'],
    datasets: [
      {
        label: ' m³ ',
        backgroundColor: 'rgba(75,192,192,0.8)',
        borderColor: 'rgba(0,0,0,1)',
        borderWidth: 1,
        data: consumoHistoricosAguaGrafica.map(value => value.valor)
      }
    ]
  }
  // Segunda grafica -- Second graph
  const state2 = {
    labels: ['00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00'],
    datasets: [
      {
        label: ' m³ ',
        backgroundColor: 'rgba(75,192,192,0.8)',
        borderColor: 'rgba(0,0,0,1)',
        borderWidth: 1,
        data: consumoHistoricosAguaGrafica2.map(value => value.valor)
      }
    ]
  }

  // Api de visual studio -- Api of visual studio
  const apiUrl = process.env.REACT_APP_API_URL;//http://192.168.100.13/5001/api
  // Api de Node-red -- Api of Node-red
  const wsUrl = process.env.REACT_APP_AUTH_URL_WEBSOCKET;//192.168.100.13
  // console.log(wsUrl)

  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

  let initialState = {
    Taxte: 15,
    Japama: 50,
    L1: 10,
    L2: 0,
    L3: 5,
    L5: 3
  };

  let initialState2 = [];

  let initialState3 = {
    taxtes: [350.75, 0, 0, 0, 0, 63.75, 155.75, 304.5, 278.75, 231.25, 334, 90.75, 234.75, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    Japama: [0, 0.03, 0, 0, 0.03, 0, 0, 0, 0.03, 0, 0.03, 0, 0.03, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    Total: [350.75, 0.03, 0, 0, 0.03, 63.75, 155.75, 304.5, 278.78, 231.25, 334.03, 90.75, 234.78, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  }

  const initialData = [
    { "Flujo": 15.65, "ConsumoTotal": 15.65, "Area": "Alblend" },
    { "Flujo": 1942.62, "ConsumoTotal": 1644.26, "Area": "Atlantium" },
    { "Flujo": 0, "ConsumoTotal": 48863, "Area": "Calderas" },
    { "Flujo": 4.14, "ConsumoTotal": 4.14, "Area": "CIP" },
    { "Flujo": 0.14, "ConsumoTotal": 52982.14, "Area": "Condensadores" },
    { "Flujo": 9.22, "ConsumoTotal": 8071.45, "Area": "Enjuagador Linea 2" },
    { "Flujo": 232.24, "ConsumoTotal": 207.5, "Area": "JAPAMA" },
    { "Flujo": 21.18, "ConsumoTotal": 0, "Area": "Jarabes" },
    { "Flujo": 0, "ConsumoTotal": 57.6, "Area": "Jarabes Linea 2" },
    { "Flujo": 5.79, "ConsumoTotal": 48692.81, "Area": "Lavadora Linea 1" },
    { "Flujo": 1.47, "ConsumoTotal": 1.47, "Area": "Lavadora Linea 3" },
    { "Flujo": 51.52, "ConsumoTotal": 40.08, "Area": "Lavadora Linea 5" },
    { "Flujo": 0, "ConsumoTotal": 56348, "Area": "Microfiltrada" },
    { "Flujo": 782.87, "ConsumoTotal": 0.39, "Area": "Permeada" },
    { "Flujo": 25.81, "ConsumoTotal": 51.21, "Area": "Prep Bebida L1" },
    { "Flujo": 52.65, "ConsumoTotal": 1262.33, "Area": "Prep Bebida L2" },
    { "Flujo": 0.21, "ConsumoTotal": 0.21, "Area": "Prep Bebida L3" },
    { "Flujo": 134.6, "ConsumoTotal": 125.19, "Area": "Rechazo Osmosis" },
    { "Flujo": 3.3, "ConsumoTotal": 2.71, "Area": "Recuperada" },
    { "Flujo": 60.97, "ConsumoTotal": 58.35, "Area": "Suavizada" },
    { "Flujo": 438, "ConsumoTotal": 12091.25, "Area": "TAXTES" },
    { "Flujo": 128.96, "ConsumoTotal": 111.65, "Area": "Torre Contacto Linea 2" },
    { "Flujo": 123.41, "ConsumoTotal": 94.12, "Area": "Torre Contacto Linea 5" }

  ]

  // Variables para inicializar 
  let datos = [];
  let datos2 = [];
  let datos3 = [];
  let datos6 = [];
  let datos7 = [];

  const [fechaInicio, setFechaInicio] = useState(moment(Date.now()));
  const [fechaFin, setFechaFin] = useState(moment(Date.now()));
  const [fecha, setFecha] = useState(Date.now());
  const [areasName, setAreasName] = useState([]);
  //const [areasName, setAreasName] = useState("--- TODAS ---");
  const [areasReporte, setAreasReporte] = useState([]);
  // const [fecha, setFecha] = useState(moment(Date.now()));
  const [fechaGrafica, setFechaGrafica] = useState(moment(Date.now())/*.subtract(1, "days")*/)
  //! Trabajando
  const [Data2, setData2] = useState(initialState3);
  const [Data, setData] = useState(initialState);
  const [Data3, setData3] = useState(initialState2);
  const [Data4, setData4] = useState(initialState2);
  const [showRefresh, setShowRefresh] = useState(true);
  const showRefreshDiario = moment(fechaFin).format("YYYY-MM-DD") === moment(Date.now()).format("YYYY-MM-DD") ? true : false

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    //console.log(event)
    //alert(event);  
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };


  const [anchorEl2, setAnchorEl2] = useState(null);
  const open2 = Boolean(anchorEl2);

  const handleClick2 = (event) => {
    setAnchorEl2(event.currentTarget);
  };

  const handleClose2 = () => {
    setAnchorEl2(null);
  };

  const ConsumoAguaActual = async () => {
    const urlConsumoActual = `https://${wsUrl}:1880/api/ConsumoAguaActual`;
    //console.log(url);
    try {
      const response = await fetch(urlConsumoActual);
      datos = await response.json();

      setData(datos);

    } catch (error) {
      console.log('Hay un error: ' + error);
    }
  }

  const ReporteConsumoAguaHora = async () => {
    const urlReporteConsumoAguaHoras = `https://${wsUrl}:1880/api/ReporteConsumoAguaHoras`;
    //! Trabajando
    try {
      const response2 = await fetch(urlReporteConsumoAguaHoras);
      datos2 = await response2.json();
      if (datos2 != Data2) {
        setData2(datos2);
      }
      //console.log(DatosActual);
      //disableNoData();

    } catch (error) {
      console.log('Hay un error: ' + error);
    }
  }

  const urlConsumoAguaporArea = `https://${wsUrl}:1880/api/ConsumoAguaporArea`;

  const ReporteConsumoAguaporArea = () => fetch(urlConsumoAguaporArea)
    .then(res => res.json())
    .catch(error => console.error('Error:', error))
    .then(response => setData4(response));

  const minuto = new Date().getMinutes();

  useEffect(ConsumoAguaActual, [minuto]);

  useEffect(ReporteConsumoAguaHora, [minuto]);

  useEffect(ReporteConsumoAguaporArea, [minuto]);

  const [url4, setUrl4] = useState(`https://${wsUrl}:1880/getreportetiempoagua/${moment(fechaInicio).format("YYYY-MM-DD")}/${moment(fechaFin).format("YYYY-MM-DD")}`)

  const url5 = `https://${wsUrl}:1880/api/consumoTotalizadoActual`;

  //! Objetivo 1
  // const url3 = `${apiUrl}/agua/getTotalizadoAgua?Fecha=${moment(fecha).format("YYYY-MM-DD")}`;
  const url3 = `${apiUrl}/agua/getTotalizadoAgua?Fecha=${moment(fecha).format("YYYY-MM-DD")}`;

  //! Objetivo 2
  const url6 = `${apiUrl}/agua/getGraficoConsumoAguaHora/${moment(fechaGrafica).format("YYYY-MM-DD")}/${moment(fechaGrafica).format("YYYY-MM-DD")}/${areasReporte.join(' ')}`;

  //! Objetivo 3
  const url7 = `${apiUrl}/agua/getGraficoConsumoAguaHora/${moment(fechaGrafica).format("YYYY-MM-DD")}/${moment(fechaGrafica).format("YYYY-MM-DD")}/${areasReporte}`;


  const GraficaReportAguaConsumo = async () => {
    try {
      const response7 = await fetch(url6);
      datos3 = await response7.json();
      setConsumoHistoricosAguaGrafica(datos3);
      //console.log(datos3);
    } catch (error) {
      console.log('Hay un error: ' + error);
    }
  }

  useEffect(GraficaReportAguaConsumo, [url6]);

  const GraficaReportAguaConsumo2 = async () => {
    try {
      const response7 = await fetch(url7);
      datos7 = await response7.json();
      setConsumoHistoricosAguaGrafica2(datos7);
      //console.log(datos7);
    } catch (error) {
      console.log('Hay un error: ' + error);
    }
  }

  useEffect(GraficaReportAguaConsumo2, [url7]);

  const datosActuales = async () => {
    try {
      const response5 = await fetch(url5);
      datos6 = await response5.json();
      setData1(datos6);
    } catch (error) {
      console.log('Hay un error: ' + error);
    }
  }

  const getDatosConsumoAgua = async () => {

    setShowRefresh(false)
    try {
      const response3 = await fetch(url3);
      datos3 = await response3.json();

      setData1(datos3);
    } catch (error) {
      console.log('Hay un error: ' + error);
    }
  }

  useEffect(moment(fecha).format("YYYY-MM-DD") === moment(Date.now()).format("YYYY-MM-DD") ? datosActuales : getDatosConsumoAgua, [url3])

  const consumoAguaDario = async () => {

    try {
      const response = await fetch(`${url4}`);
      datos3 = await response.json();
      setData3(datos3);

    } catch (error) {
      console.log('Hay un error: ' + error);
    }
  }

  useEffect(consumoAguaDario, [url4 + fechaInicio + fechaFin]);

  //? //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //?   --> useEffect para el cambio de estado de la variables para las direcciones url -- UseEffect for changing state of variables for url
  //? //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  useEffect(() => {
    setUrl4(`https://${wsUrl}:1880/getreportetiempoagua/${moment(fechaInicio).format("YYYY-MM-DD")}/${moment(fechaFin).format("YYYY-MM-DD")}`);
  }, [fechaInicio, fechaFin])

  //? //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  useEffect(consumoAguaDario, [url4 + areasName.join('/')])

  const labels = ['00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00'];

  // Variable para mostrar las Areas -- Variable to show the Areas
  const Area = [
    "TAXTES",
    "JAPAMA",
    "Jarabes Linea 2",
    "Prep Bebida L1",
    "Lavadora Linea 1",
    "Rechazo Osmosis",
    "Calderas",
    "Prep Bebida L2",
    "Condensadores",
    "Lavadora Linea 3",
    "Suavizada",
    "CIP",
    "Recuperada",
    "Alblend",
    "Enjuagador Linea 2",
    "Permeada",
    "Prep Bebida L3",
    "Jarabes",
    "Lavadora Linea 5",
    "Torre Contacto Linea 5"
  ];

  //? ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //? --> Graficas -- Graphs
  //? ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  //* Configuraciones de la grafica -- Chart settings
  //* Grafica en la que se baso https://echarts.apache.org/examples/en/editor.html?c=bar-label-rotation

  //?  Structure for graphs graph (Not necessary for all graphs, only in these) -- Estructura para las graficas grafica (No es necesario para todas las graficas, solo en estas)
  //? ------>
  const labelOption = {
    show: true,
    position: 'insideBottom',
    distance: 0,
    align: 'left',
    verticalAlign: 'middle',
    rotate: 90,
    // formatter: '{c}  {name|{a}}',
    fontSize: 0,
    rich: {
      name: {}
    }
  };
  //? <------

  //! ///////////////////////////////////////////////////////////
  //! --> Grafica de entrada consumo por hora (m³) --> DATOS <--
  //! ///////////////////////////////////////////////////////////

  const datos4 = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    grid: {
      left: '5%',
      right: '5%',
      top: '10%',
      bottom: '8%',
      width: '90%',
      height: '90%',
      containLabel: true

    },
    legend: {
      data: ['Taxtes', 'Japama', 'Total']
    },
    toolbox: {
      show: true,
      orient: 'vertical',
      left: 'right',
      top: 'center',
      feature: {
        mark: { show: true },
        // dataView: { show: true, readOnly: false },
        magicType: { show: true, type: ['line', 'bar'/* , 'stack' */] },
        // restore: { show: true },
        saveAsImage: { show: true }
      }
    },
    xAxis: [
      {
        type: 'category',
        // axisTick: { show: false },
        data: labels
      }
    ],
    yAxis: [
      {
        type: 'value'
      }
    ],
    series: [
      {
        name: 'Taxtes',
        type: 'bar',
        barGap: 0,
        label: labelOption,
        emphasis: {
          focus: 'series'
        },
        data: Data2.taxtes,
        itemStyle: {
          color: '#FF6384'
        }
      },
      {
        name: 'Japama',
        type: 'bar',
        label: labelOption,
        emphasis: {
          focus: 'series'
        },
        data: Data2.Japama,
        itemStyle: {
          color: '#4BC0C0'
        }

      },
      {
        name: 'Total',
        type: 'bar',
        label: labelOption,
        emphasis: {
          focus: 'series'
        },
        data: Data2.Total,
        itemStyle: {
          color: '#35A2EB'
        }
      },
    ]
  };

  //! <--////////////////////////////////////////////////////////

  //! //////////////////////////////////////////////////////////////
  //! --> Grafica de agua general (m³) --> DATOS <--
  //! /////////////////////////////////////////////////////////////

  const datos5 = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    grid: {
      left: '5%',
      right: '5%',
      top: '10%',
      bottom: '8%',
      width: '90%',
      height: '90%',
      containLabel: true

    },
    legend: {
      data: ['Entradas ( m³ )', 'Salidas ( m³ )']
    },
    toolbox: {
      show: true,
      orient: 'vertical',
      left: 'right',
      top: 'center',
      feature: {
        mark: { show: true },
        // dataView: { show: true, readOnly: false },
        magicType: { show: true, type: ['line', 'bar'/* , 'stack' */] },
        // restore: { show: true },
        saveAsImage: { show: true }
      }
    },
    xAxis: [
      {
        type: 'category',
        // axisTick: { show: false },
        data: Area,
        axisLabel: {
          interval: 0,
          rotate: 40 // Propiedad para poder mover el angulo del texto
        },

      }
    ],
    yAxis: [
      {
        type: 'value',

      }
    ],
    series: [
      {
        name: 'Entradas ( m³ )',
        type: 'bar',
        barGap: 0,
        label: labelOption,
        emphasis: {
          focus: 'series'
        },
        data: Data4.slice(0, 2), // La data es un arreglo que debe tener la misma cantidad de valores que la cantidad de etiquetas
        itemStyle: {
          color: '#008000'
        }
      },
      {
        name: 'Salidas ( m³ )',
        type: 'bar',
        label: labelOption,
        emphasis: {
          focus: 'series'
        },
        data: [0, 0].concat(Data4.slice(2, 18)), // La data es un arreglo que debe tener la misma cantidad de valores que la cantidad de etiquetas
        itemStyle: {
          color: '#36A2EB'
        }

      }
    ]
  };

  //! <--////////////////////////////////////////////////////////


  // Variable de initialState de Data1
  let initialState1 = [];

  const [Data1, setData1] = useState(initialState1);

  const handleChange = (event) => {
    setAreasName(event.target.value);
  };

  const handleChangeGraf = (event) => {
    setAreasReporte(event.target.value);
  };

  // Tabla de informacion para llenar el PDF de Reporte Totalizador de Sistema de Medidores
  const dataTableData = {
    columns: [
      //{ Header: "Fecha", accessor: "fecha" },
      { Header: "Área", accessor: "area" },
      { Header: "Consumo Totalizado (m³)", accessor: "consumoTotal" },
    ],
    rows: Data1,
  };

  // Tabla de informacion para llenar el PDF de consumo Reporte consumo por tiempo
  const dataTableData2 = {
    columns: [
      //{ Header: "Fecha", accessor: "fecha" },
      //{ Header: "Dia", accessor: "diaSemana" },
      { Header: "Área", accessor: "Area" },
      { Header: "Consumo Totalizado (m³)", accessor: "Flujo" },
    ],
    rows: Data3,
  };

  // Envio de informacion de la tabla Reporte Totalizador de Sistema de Medidores
  const ReporteConsumoArea = (dataTableData) => {
    //alert(event);
    console.log("inicializando la impresion del archivo");
    SavePDFTableAguaConsumoArea(
      dataTableData
      , `REPORTE DE CONSUMO DE AGUA POR ÁREA ${moment(Date.now()).format("DD-MM-YYYY")}`
    );
    console.log("tarea finalizada");
    setAnchorEl(null);
  }
  // Envio de informacion de la tabla Reporte consumo por tiempo
  const ReporteConsumoDiario = (dataTableData2) => {
    //alert(event);
    console.log("inicializando la impresion del archivo");
    SavePDFTableAguaConsumoDirario(
      dataTableData2
      , `REPORTE DE CONSUMO DE AGUA POR DIA ${moment(Date.now()).format("DD/MM/YYYY")}`
      , moment(fechaInicio).format("DD/MM/YYYY")
      , moment(fechaFin).format("DD/MM/YYYY"));
    console.log("tarea finalizada");
  }

  const handleExcelExportTtotalizado = (dataTableData) => {
    let heading = [
      [
        "Área",
        "Consumo Totalizado en Metros Cúbicos",
      ],
    ];
    let headers = [
      "area",
      "consumoTotal",
    ];
    SaveExcel(
      heading,
      headers,
      dataTableData,
      `REPORTE DE CONSUMO DE AGUA Totalizado ${moment(Date.now()).format("DD-MM-YYYY")}`
    );
    setAnchorEl(null);
  };

  const handleExcelExporDiario = (dataTableData) => {

    let heading = [
      [
        "Fecha",
        "Área",
        "Consumo Diario en Metros Cúbicos",
      ],
    ];

    let headers = [
      `${moment(fechaInicio).format("YYYY-MM-DD")}-${moment(fechaFin).format("YYYY-MM-DD")}`,
      "area",
      "consumoTotal",
    ];

    SaveExcel(
      heading,
      headers,
      dataTableData,
      `REPORTE DE CONSUMO DE AGUA Diario ${moment(Date.now()).format("DD-MM-YYYY")}`
    );
    setAnchorEl2(null);
  };

  const refrescarTablaTotalizado = () => {
    datosActuales();
    //setShowRefresh(true);
  }

  const refrescarTablaDiario = () => {
    consumoAguaDario();
    //setShowRefresh(true);
  }

  //TODO /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //TODO --> Area de visualizacion de los variables en la consola
  //TODO /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  //! Trabajando
  // console.log(Data)
  // console.log(Data2.Japama)
  // console.log(Data2.Total)
  // console.log(Data3)

  //TODO /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  return (
    <>
      <MDBox mt={1.5}>
        {/* Primary section */}
        <Grid container spacing={3}>
          <Grid item xs={6} md={6} lg={2}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="success"
                icon="opacity"
                title="Taxtes"
                count={Data.Taxte + " m³"}
                percentage={{
                  color: "success",
                  amount: "",
                  label: "",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={6} md={6} lg={2}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="success"
                icon="opacity"
                title="Japama"
                count={Data.Japama + " m³"}
                percentage={{
                  color: "success",
                  amount: "",
                  label: "",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={6} md={6} lg={2}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                //color="dark"
                icon="opacity"
                title="L1"
                count={Data.L1 + " m³"}
                percentage={{
                  color: "success",
                  amount: "",
                  label: "",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={6} md={6} lg={2}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                icon="opacity"
                title="L2"
                count={Data.L2 + " m³"}
                percentage={{
                  color: "success",
                  amount: "",
                  label: "",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={6} md={6} lg={2}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                icon="opacity"
                title="L3"
                count={Data.L3 + " m³"}
                percentage={{
                  color: "success",
                  amount: "",
                  label: "",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={6} md={6} lg={2}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                icon="opacity"
                title="L5"
                count={Data.L5 + " m³"}
                percentage={{
                  color: "success",
                  amount: "",
                  label: "",
                }}
              />
            </MDBox>
          </Grid>
        </Grid>
        {/* Second section */}
        <Grid container spacing={3}>
          <Grid item xs={12} md={12} lg={12}>
            {/* Grafica de entrada consumo por hora(m3) */}
            <MDBox mb={1.5} >
              <Card sx={{ height: "100%" }} >
                <Typography variant='h6' align='center' > Grafica de entrada consumo por hora (m³) </Typography>
                <ReactECharts option={datos4} style={{ height: '400px' }} />
                {/* <Bar options={options} data={datos4} /> */}
              </Card>
            </MDBox>
            {/* Grafica de agua general */}
            <MDBox mb={1.5} >
              <Card sx={{ height: "100%" }}>
                <Typography variant='h6' align='center' > Grafica de agua general (m³) </Typography>
                <ReactECharts option={datos5} style={{ height: '400px' }} />
                {/* <Bar options={optionsporArea} data={datos5} /> */}
              </Card>
            </MDBox>
            {/* Reporte consumo agua) */}
            <MDBox mb={1.5}>
              <Card sx={{ height: "100%" }}>
                <MDBox display="flex" justifyContent="space-between" pt={2} px={2}>
                  <Stack direction="row" spacing={1}>
                    <LocalizationProvider dateAdapter={AdapterDateFns} locale={es}>
                      <DatePicker
                        label="Fecha"
                        value={fechaGrafica}
                        onChange={(newValue) => {
                          setFechaGrafica(newValue);
                        }}
                        renderInput={(params) => <TextField {...params} size="small" />}
                      />
                    </LocalizationProvider>
                    <FormControl sx={{ width: 250 }} size="small" >
                      <InputLabel id="demo-multiple-name-label">Area</InputLabel>
                      <Select
                        multiple
                        displayEmpty
                        //labelId="demo-multiple-name-label"
                        //id="demo-multiple-name"
                        value={areasReporte}
                        onChange={handleChangeGraf}
                        input={<OutlinedInput label="Area" />}
                        renderValue={(selected) => {
                          /*  if (selected.length === 0) {
                              
                              return <em>--- TODAS ---</em>;
                            }*/
                          //alert('Areas: ' + areasName)
                          return selected.join('/');
                        }}
                        MenuProps={MenuProps}
                        style={{ height: 35 }}
                      //options https://react-select.com/home
                      >
                        <MenuItem
                          value="Alblend"
                        >
                          Alblend
                        </MenuItem>
                        <MenuItem
                          value="Atlantium"
                        >
                          Atlantium
                        </MenuItem>
                        <MenuItem
                          value="Calderas"
                        >
                          Calderas
                        </MenuItem>
                        <MenuItem
                          value="CIP"
                        >
                          CIP
                        </MenuItem>
                        <MenuItem
                          value="Condensadores"
                        >
                          Condensadores
                        </MenuItem>
                        <MenuItem
                          value="Enjuagador Linea 2"
                        >
                          Enjuagador Linea 2
                        </MenuItem>
                        <MenuItem
                          value="JAPAMA"
                        >
                          JAPAMA
                        </MenuItem>
                        <MenuItem
                          value="Jarabes"
                        >
                          Jarabes
                        </MenuItem>
                        <MenuItem
                          value="Jarabes Linea 2"
                        >
                          Jarabes Linea 2
                        </MenuItem>
                        <MenuItem
                          value="Lavadora Linea 1"
                        >
                          Lavadora Linea 1
                        </MenuItem>
                        <MenuItem
                          value="Lavadora Linea 3"
                        >
                          Lavadora Linea 3
                        </MenuItem>
                        <MenuItem
                          value="Lavadora Linea 5"
                        >
                          Lavadora Linea 5
                        </MenuItem>
                        <MenuItem
                          value="Microfiltrado"
                        >
                          Microfiltrado
                        </MenuItem>
                        <MenuItem
                          value="Permeada"
                        >
                          Permeada
                        </MenuItem>
                        <MenuItem
                          value="Prep Bebida L1"
                        >
                          Prep Bebida L1
                        </MenuItem>
                        <MenuItem
                          value="Prep Bebida L2"
                        >
                          Prep Bebida L2
                        </MenuItem>
                        <MenuItem
                          value="Prep Bebida L3"
                        >
                          Prep Bebida L3
                        </MenuItem>
                        <MenuItem
                          value="Rechazo Osmosis"
                        >
                          Rechazo Osmosis
                        </MenuItem>
                        <MenuItem
                          value="Recuperada"
                        >
                          Recuperada
                        </MenuItem>
                        <MenuItem
                          value="Suavizada"
                        >
                          Suavizada
                        </MenuItem>
                        <MenuItem
                          value="Tanque reactor"
                        >
                          Tanque reactor
                        </MenuItem>
                        <MenuItem
                          value="TAXTES"
                        >
                          TAXTES
                        </MenuItem>
                        <MenuItem
                          value="Torre Contacto Linea 2"
                        >
                          Torre Contacto Linea 2
                        </MenuItem>
                        <MenuItem
                          value="Torre Contacto Linea 5"
                        >
                          Torre Contacto Linea 5
                        </MenuItem>
                      </Select>
                    </FormControl>
                  </Stack>
                </MDBox>
                <Bar data={state}
                  options={
                    {
                      plugins: {
                        title: {
                          display: true,
                          text: 'Reporte consumo Agua',
                          //align: 'right',
                          fontSize: 20
                        },
                        legend: {
                          display: false,
                          position: 'top'
                        }
                      }
                    }} />
              </Card>
            </MDBox>
          </Grid>
        </Grid>
        {/* Third section */}
        <Grid container spacing={2}>
          <Grid item xs={12} md={6} lg={6} >
            <MDTypography variant="h5"> Reporte Totalizador de Sistema de Medidores </MDTypography>
            <MDBox mb={1.5}>
              <Card sx={{ height: "100%" }}>
                <MDBox display="flex" justifyContent="space-between" pt={2} px={2}>
                  <Stack direction="row" spacing={1}>
                    <LocalizationProvider dateAdapter={AdapterDateFns} locale={es}>
                      <DatePicker
                        label="Fecha"
                        value={fecha}
                        onChange={(newValue) => {
                          setFecha(moment(newValue))
                          //alert(moment(newValue).format("YYYY-MM-DD") +'==='+ moment(Date.now()).format("YYYY-MM-DD"))
                          if (moment(newValue).format("YYYY-MM-DD") === moment(Date.now()).format("YYYY-MM-DD")) {
                            //alert('es igual')
                            setShowRefresh(true);
                          }
                          else {
                            //alert('no es igual')
                            setShowRefresh(false);
                          }
                        }}
                        renderInput={(params) => <TextField {...params} size="small" />}
                      />
                    </LocalizationProvider>
                    <ReactTooltip
                      id='btnRefresh'
                      place='bottom'
                      effect='solid'
                      backgroundColor='#5596F9'
                    >
                      Actualizar datos
                    </ReactTooltip>
                    <IconButton
                      aria-label="delete"
                      data-tip data-for='btnRefresh'
                      onClick={() => refrescarTablaTotalizado()}
                      disabled={!showRefresh}
                      sx={{
                        opacity: showRefresh ? 1 : 0
                      }}
                    >
                      <ReplayIcon />
                    </IconButton>
                    <IconButton
                      aria-label="FileDownload"
                      data-tip data-for='btnDownload'
                      aria-controls="basic-menu"
                      aria-haspopup="true"
                      aria-expanded={open ? 'true' : undefined}
                      onClick={handleClick}
                    >
                      <FileDownloadIcon />
                    </IconButton>
                    <Menu
                      id="basic-menu"
                      anchorEl={anchorEl}
                      open={open}
                      onClose={handleClose}
                      MenuListProps={{
                        'aria-labelledby': 'basic-button',
                      }}
                    >
                      {/* Tabla de informacion para totalizado de agua */}
                      <MenuItem onClick={() => handleExcelExportTtotalizado(dataTableData.rows)}>Excel (.xlsx)</MenuItem>
                      <MenuItem onClick={() => ReporteConsumoArea(dataTableData.rows)}>PDF (.pdf)</MenuItem>
                    </Menu>
                  </Stack>
                </MDBox>
                <Scrollbars style={{ width: '100%', height: 500 }}>
                  <DataTable table={dataTableData} />
                </Scrollbars>
              </Card>
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={6} >
            <MDBox mb={1.5}>
              <MDTypography alignItems="center" variant="h5">Reporte consumo por tiempo</MDTypography>
              <Card sx={{ height: "100%" }}>
                <MDBox display="flex" justifyContent="space-between" pt={2} px={2}>
                  <Stack direction="row" spacing={1}>
                    <LocalizationProvider dateAdapter={AdapterDateFns} locale={es}>
                      <DatePicker
                        label="Fecha Inicio"
                        value={fechaInicio}
                        onChange={(newValue) => {
                          setFechaInicio(newValue);
                        }}
                        renderInput={(params) => <TextField {...params} size="small" />}
                      />
                    </LocalizationProvider>
                    <LocalizationProvider dateAdapter={AdapterDateFns} locale={es}>
                      <DatePicker
                        label="Fecha Fin"
                        value={fechaFin}
                        onChange={(newValue) => {
                          setFechaFin(newValue);
                        }}
                        renderInput={(params) => <TextField {...params} size="small" />}
                      />
                    </LocalizationProvider>
                    <FormControl sx={{ width: 200 }} size="small" >
                      <InputLabel id="demo-multiple-name-label">Area</InputLabel>
                      <Select
                        multiple
                        displayEmpty
                        //labelId="demo-multiple-name-label"
                        //id="demo-multiple-name"
                        value={areasName}
                        onChange={handleChange}
                        input={<OutlinedInput label="Area" />}
                        renderValue={(selected) => {
                          /*  if (selected.length === 0) {
                              
                              return <em>--- TODAS ---</em>;
                            }*/
                          //alert('Areas: ' + areasName)
                          return selected.join('/');
                        }}
                        MenuProps={MenuProps}
                        style={{ height: 35 }}
                      //options https://react-select.com/home
                      >
                        <MenuItem
                          value="Alblend"
                        >
                          Alblend
                        </MenuItem>
                        <MenuItem
                          value="Atlantium"
                        >
                          Atlantium
                        </MenuItem>
                        <MenuItem
                          value="Calderas"
                        >
                          Calderas
                        </MenuItem>
                        <MenuItem
                          value="CIP"
                        >
                          CIP
                        </MenuItem>
                        <MenuItem
                          value="Condensadores"
                        >
                          Condensadores
                        </MenuItem>
                        <MenuItem
                          value="Enjuagador Linea 2"
                        >
                          Enjuagador Linea 2
                        </MenuItem>
                        <MenuItem
                          value="JAPAMA"
                        >
                          JAPAMA
                        </MenuItem>
                        <MenuItem
                          value="Jarabes"
                        >
                          Jarabes
                        </MenuItem>
                        <MenuItem
                          value="Jarabes Linea 2"
                        >
                          Jarabes Linea 2
                        </MenuItem>
                        <MenuItem
                          value="Lavadora Linea 1"
                        >
                          Lavadora Linea 1
                        </MenuItem>
                        <MenuItem
                          value="Lavadora Linea 3"
                        >
                          Lavadora Linea 3
                        </MenuItem>
                        <MenuItem
                          value="Lavadora Linea 5"
                        >
                          Lavadora Linea 5
                        </MenuItem>
                        <MenuItem
                          value="Microfiltrado"
                        >
                          Microfiltrado
                        </MenuItem>
                        <MenuItem
                          value="Permeada"
                        >
                          Permeada
                        </MenuItem>
                        <MenuItem
                          value="Prep Bebida L1"
                        >
                          Prep Bebida L1
                        </MenuItem>
                        <MenuItem
                          value="Prep Bebida L2"
                        >
                          Prep Bebida L2
                        </MenuItem>
                        <MenuItem
                          value="Prep Bebida L3"
                        >
                          Prep Bebida L3
                        </MenuItem>
                        <MenuItem
                          value="Rechazo Osmosis"
                        >
                          Rechazo Osmosis
                        </MenuItem>
                        <MenuItem
                          value="Recuperada"
                        >
                          Recuperada
                        </MenuItem>
                        <MenuItem
                          value="Suavizada"
                        >
                          Suavizada
                        </MenuItem>
                        <MenuItem
                          value="Tanque reactor"
                        >
                          Tanque reactor
                        </MenuItem>
                        <MenuItem
                          value="TAXTES"
                        >
                          TAXTES
                        </MenuItem>
                        <MenuItem
                          value="Torre Contacto Linea 2"
                        >
                          Torre Contacto Linea 2
                        </MenuItem>
                        <MenuItem
                          value="Torre Contacto Linea 5"
                        >
                          Torre Contacto Linea 5
                        </MenuItem>
                      </Select>
                    </FormControl>
                    <IconButton
                      aria-label="delete"
                      data-tip data-for='btnRefresh'
                      onClick={() => refrescarTablaDiario()}
                      disabled={!showRefreshDiario}
                      sx={{
                        opacity: showRefreshDiario ? 1 : 0
                      }}
                    >
                      <ReplayIcon />
                    </IconButton>
                    <ReactTooltip
                      id='btnDownload'
                      place='bottom'
                      //type='info'
                      effect='solid'
                      backgroundColor='#5596F9'
                    >
                      Descargar reporte
                    </ReactTooltip>
                    <IconButton
                      aria-label="FileDownload"
                      data-tip data-for='btnDownload'
                      aria-controls="basic-menu"
                      aria-haspopup="true"
                      aria-expanded={open2 ? 'true' : undefined}
                      onClick={handleClick2}
                    >
                      <FileDownloadIcon />
                    </IconButton>
                    <Menu
                      id="basic-menu"
                      anchorEl={anchorEl2}
                      open={open2}
                      onClose={handleClose2}
                      MenuListProps={{
                        'aria-labelledby': 'basic-button',
                      }}
                    >
                      <MenuItem onClick={() => handleExcelExporDiario(dataTableData2.rows)}>Excel (.xlsx)</MenuItem>
                      <MenuItem onClick={() => ReporteConsumoDiario(dataTableData2.rows)}>PDF (.pdf)</MenuItem>
                    </Menu>
                  </Stack>
                </MDBox>
                <Scrollbars style={{ width: '100%', height: 500 }}>
                  <DataTable table={dataTableData2} />
                </Scrollbars>
              </Card>
            </MDBox>
          </Grid>
          {/* Grafica consumo por tiempo */}
          <Grid item xs={12} md={12} lg={12}>
            <MDBox mb={1.5}>
              <Card sx={{ height: "100%" }}>
                <MDBox display="flex" justifyContent="space-between" pt={2} px={2}>
                  <Stack direction="row" spacing={1}>
                    <LocalizationProvider dateAdapter={AdapterDateFns} locale={es}>
                      <DatePicker
                        label="Fecha"
                        value={fechaGrafica}
                        onChange={(newValue) => {
                          setFechaGrafica(newValue);
                        }}
                        renderInput={(params) => <TextField {...params} size="small" />}
                      />
                    </LocalizationProvider>
                    <FormControl sx={{ width: 250 }} size="small" >
                      <InputLabel id="demo-multiple-name-label">Area</InputLabel>
                      <Select
                        multiple
                        displayEmpty
                        value={areasReporte}
                        onChange={handleChangeGraf}
                        input={<OutlinedInput label="Area" />}
                        renderValue={(selected) => {
                          return selected.join('/');
                        }}
                        MenuProps={MenuProps}
                        style={{ height: 35 }}
                      //options https://react-select.com/home
                      >
                        <MenuItem
                          value="Alblend"
                        >
                          Alblend
                        </MenuItem>
                        <MenuItem
                          value="Atlantium"
                        >
                          Atlantium
                        </MenuItem>
                        <MenuItem
                          value="Calderas"
                        >
                          Calderas
                        </MenuItem>
                        <MenuItem
                          value="CIP"
                        >
                          CIP
                        </MenuItem>
                        <MenuItem
                          value="Condensadores"
                        >
                          Condensadores
                        </MenuItem>
                        <MenuItem
                          value="Enjuagador Linea 2"
                        >
                          Enjuagador Linea 2
                        </MenuItem>
                        <MenuItem
                          value="JAPAMA"
                        >
                          JAPAMA
                        </MenuItem>
                        <MenuItem
                          value="Jarabes"
                        >
                          Jarabes
                        </MenuItem>
                        <MenuItem
                          value="Jarabes Linea 2"
                        >
                          Jarabes Linea 2
                        </MenuItem>
                        <MenuItem
                          value="Lavadora Linea 1"
                        >
                          Lavadora Linea 1
                        </MenuItem>
                        <MenuItem
                          value="Lavadora Linea 3"
                        >
                          Lavadora Linea 3
                        </MenuItem>
                        <MenuItem
                          value="Lavadora Linea 5"
                        >
                          Lavadora Linea 5
                        </MenuItem>
                        <MenuItem
                          value="Microfiltrado"
                        >
                          Microfiltrado
                        </MenuItem>
                        <MenuItem
                          value="Permeada"
                        >
                          Permeada
                        </MenuItem>
                        <MenuItem
                          value="Prep Bebida L1"
                        >
                          Prep Bebida L1
                        </MenuItem>
                        <MenuItem
                          value="Prep Bebida L2"
                        >
                          Prep Bebida L2
                        </MenuItem>
                        <MenuItem
                          value="Prep Bebida L3"
                        >
                          Prep Bebida L3
                        </MenuItem>
                        <MenuItem
                          value="Rechazo Osmosis"
                        >
                          Rechazo Osmosis
                        </MenuItem>
                        <MenuItem
                          value="Recuperada"
                        >
                          Recuperada
                        </MenuItem>
                        <MenuItem
                          value="Suavizada"
                        >
                          Suavizada
                        </MenuItem>
                        <MenuItem
                          value="Tanque reactor"
                        >
                          Tanque reactor
                        </MenuItem>
                        <MenuItem
                          value="TAXTES"
                        >
                          TAXTES
                        </MenuItem>
                        <MenuItem
                          value="Torre Contacto Linea 2"
                        >
                          Torre Contacto Linea 2
                        </MenuItem>
                        <MenuItem
                          value="Torre Contacto Linea 5"
                        >
                          Torre Contacto Linea 5
                        </MenuItem>
                      </Select>
                    </FormControl>
                  </Stack>
                </MDBox>
                <Line data={state2}
                  options={
                    {
                      plugins: {
                        title: {
                          display: true,
                          text: 'Grafica de consumo por tiempo',
                          //align: 'right',
                          fontSize: 20
                        },
                        legend: {
                          display: false,
                          position: 'top'
                        }
                      }
                    }
                  }
                />
              </Card>
            </MDBox>
          </Grid>
        </Grid>
      </MDBox>
    </>
  );
}

export default AguaScreem;