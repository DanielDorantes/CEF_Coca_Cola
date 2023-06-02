import { Typography } from "@mui/material";
import Grid from "@mui/material/Grid";

// Material Dashboard 2 PRO React components
import MDBox from "components/MDBox";

import ReportsLineChart from "examples/Charts/LineCharts/ReportsLineChart";

import { useEffect, useMemo, useRef, useState } from "react";
import { ProgresBar } from "./elementos/ProgresBar";

import { Horas } from './elementos/Horas'

export const PCCSL5 = () => {

  const wsUrl = process.env.REACT_APP_AUTH_URL_WEBSOCKET;//192.168.100.13

  let initialState = [
    {
      OzonoLv : 1.5,
      OzonoTorre : 0.17,
      TemperaturaLv : 60.39,
      PhTorre : 6,
      Fecha : "2023-02-20T08:27:47.000Z"
    },
    {
      OzonoLv : 1.5,
      OzonoTorre : 0.17,
      TemperaturaLv : 60.39,
      PhTorre : 6,
      Fecha : "2023-02-20T08:28:47.000Z"
    },
    {
      OzonoLv : 1.5,
      OzonoTorre : 0.17,
      TemperaturaLv : 60.39,
      PhTorre : 6,
      Fecha : "2023-02-20T08:29:47.000Z"
    },
    {
      OzonoLv : 2.55,
      OzonoTorre : 0.17,
      TemperaturaLv : 60.39,
      PhTorre : 6,
      Fecha : "2023-02-20T08:30:47.000Z"
    },
    {
      OzonoLv : 2.55,
      OzonoTorre : 0.17,
      TemperaturaLv : 60.39,
      PhTorre : 6,
      Fecha : "2023-02-20T08:31:47.000Z"
    },
    {
      OzonoLv : 1.5,
      OzonoTorre : 0.17,
      TemperaturaLv : 60.39,
      PhTorre : 6,
      Fecha : "2023-02-20T08:32:47.000Z"
    },
    {
      OzonoLv : 1.5,
      OzonoTorre : 0.17,
      TemperaturaLv : 60.39,
      PhTorre : 6,
      Fecha : "2023-02-20T08:33:47.000Z"
    },
    {
      OzonoLv : 1.5,
      OzonoTorre : 0.17,
      TemperaturaLv : 60.39,
      PhTorre : 6,
      Fecha : "2023-02-20T08:34:47.000Z"
    },
    {
      OzonoLv : 1.5,
      OzonoTorre : 0.17,
      TemperaturaLv : 60.39,
      PhTorre : 6,
      Fecha : "2023-02-20T08:35:47.000Z"
    },
    {
      OzonoLv : 1.5,
      OzonoTorre : 0.17,
      TemperaturaLv : 60.39,
      PhTorre : 6,
      Fecha : "2023-02-20T08:36:47.000Z"
    },
    {
      OzonoLv : 1.5,
      OzonoTorre : 0.17,
      TemperaturaLv : 60.39,
      PhTorre : 6,
      Fecha : "2023-02-20T08:37:47.000Z"
    },
    {
      OzonoLv : 1.5,
      OzonoTorre : 0.17,
      TemperaturaLv : 60.39,
      PhTorre : 6,
      Fecha : "2023-02-20T08:38:47.000Z"
    },
    {
      OzonoLv : 1.5,
      OzonoTorre : 0.17,
      TemperaturaLv : 60.39,
      PhTorre : 6,
      Fecha : "2023-02-20T08:39:47.000Z"
    },
    {
      OzonoLv : 1.5,
      OzonoTorre : 0.17,
      TemperaturaLv : 60.39,
      PhTorre : 6,
      Fecha : "2023-02-20T08:40:47.000Z"
    }
    
  ]

  const ws = useRef(null);

  const [Actual, setActual] = useState();

  const [Datas, setDatas] = useState(initialState);

  const initialAlert = {
    OzLav:
    {
      Escala: {
        Maxima: 3,
        Minima: 0
      },
      Alerta:
      {
        Maxima: 3,
        Minima: 1
      }
    },
    OzTor:
    {
      Escala: {
        Maxima: 0.6,
        Minima: 0
      },
      Alerta: {
        Maxima: 0.3,
        Minima: 0.1
      }
    },
    PhTor: {
      Escala: {
        Maxima: 10,
        Minima: 4
      },
      Alerta: {
        Maxima: 7.5,
        Minima: 5.9
      }
    },
    TemLav: {
      Escala: {
        Maxima: 80,
        Minima: 20
      },
      Alerta: {
        Maxima: 60,
        Minima: 56
      }
    }
  }

  const [AlertasPCCs, setAlertasPCCs] = useState(initialAlert);

  const [Historicos, setHistoricos] = useState({});

  //const [OzonoTorrDatas, setOzonoTorrDatas] = useState([]);
  //const [TemLavDatas, setTemLavDatas] = useState([]);
  //const [phTorreDatas, setphTorreDatas] = useState([]);
  let datos = [];
  let datosHistoricos = {};
  let Alertas = {};

  useEffect(() => {
    //! Se cambio el ws por wss
    ws.current = new WebSocket(`wss://${wsUrl}:3005`);
    ws.current.onopen = () => console.log("ws opened");
    ws.current.onclose = () => console.log("ws closed");

    const wsCurrent = ws.current;

    ws.current.onmessage = function (event) {
      setDatas(JSON.parse(event.data).historialMediciones);
      setActual(JSON.parse(event.data).actualesMediciones);
       // TODO            ^^^^^
       // TODO  PENDIENTE |||||
       // TODO PENDIENTE  ^^^^^ = Alt + 94  ⌂ = Alt +  127 
      // setAlertasPCCs(JSON.parse(event.data).AlertasPCCs);
       // TODO            |||||
    };

    // const ƒ = 0;
    // const f = 0;

    return () => {
      wsCurrent.close();
    };
  }, [])

  // const [OzonoLavadoraEscalaMax, setOzonoLavadoraEscalaMax] = useState(6);
  //  const [OzonoTorreEscalaMax, setOzonoTorreEscalaMax] = useState(0.6);
  // const [TemperaturaLavadoraEscalaMax, setTemperaturaLavadoraEscalaMax] = useState(80);
  //  const [PhTorreEscalaMax, setPhTorreEscalaMax] = useState(14);

  // const[OzonoLavadoraAlertaSuperior, setOzonoLavadoraAlertaSuperior] = useState(3);
  // const[OzonoTorreAlertaSuperior, setOzonoTorreAlertaSuperior] = useState(0.3);
  // const[TemperaturaLavadoraAlertaSuperior, setTemperaturaLavadoraAlertaSuperior] = useState(60);
  // const[PhTorreAlertaSuperior, setPhTorreAlertaSuperior] = useState(7.5);

  //  const[OzonoLavadoraAlertaInferior, setOzonoLavadoraAlertaInferior] = useState(1);
  //  const[OzonoTorreAlertaInferior, setOzonoTorreAlertaInferior] = useState(0.1);
  //  const[TemperaturaLavadoraAlertaInferior, setTemperaturaLavadoraAlertaInferior] = useState(50);
  //  const[PhTorreAlertaInferior, setPhTorreAlertaInferior] = useState(5.9);

  const [OzonoLavadoraAdvertenciaSuperior, setOzonoLavadoraAdvertenciaSuperior] = useState(2);
  const [OzonoLavadoraAdvertenciaInferior, setOzonoLavadoraAdvertenciaInferior] = useState(1.1);

  const lineaHistorica = (async () => {
    const url = `https://${wsUrl}:1880/api/statusPccs`;
    try {
      const response = await fetch(url);
      datosHistoricos = await response.json();
      setHistoricos(datosHistoricos);
    } catch (error) {
      console.log('Hay un error: ' + error);
    }

  });

  useEffect(lineaHistorica, []);

  setTimeout(lineaHistorica, 5000);


  const piecesOzLav = [
    {
      gt: AlertasPCCs.OzLav.Alerta.Maxima || 0,
      color: 'red'
    },

    {
      gte: OzonoLavadoraAdvertenciaSuperior || 0,
      lte: AlertasPCCs.OzLav.Alerta.Maxima || 0,
      color: '#fff207'
    },

    {
      gte: OzonoLavadoraAdvertenciaInferior || 0,
      lte: OzonoLavadoraAdvertenciaSuperior || 0,
      color: '#198754'
    },
    {
      gte: OzonoLavadoraAdvertenciaInferior || 0,
      lte: OzonoLavadoraAdvertenciaInferior || 0,
      color: '#fff207'
    },

    {
      gt: 0,
      lte: OzonoLavadoraAdvertenciaInferior || 0,
      color: 'red'
    }
  ];

  const piecesOzTorr = [
    {
      gt: 0,
      lte: AlertasPCCs.OzTor.Alerta.Minima || 0,
      color: 'red'
    },
    {
      gte: AlertasPCCs.OzTor.Alerta.Minima || 0,
      lte: AlertasPCCs.OzTor.Alerta.Maxima || 0,
      color: '#198754'
    },
    {
      gt: AlertasPCCs.OzTor.Alerta.Maxima || 0,
      color: 'red'
    }
  ];

  const piecesTemLav = [
    {
      gt: 0,
      lte: AlertasPCCs.TemLav.Alerta.Minima || 0,
      color: 'red'
    },
    {
      gte: AlertasPCCs.TemLav.Alerta.Minima || 0,
      lte: AlertasPCCs.TemLav.Alerta.Maxima || 0,
      color: '#198754'
    },
    {
      gt: AlertasPCCs.TemLav.Alerta.Maxima || 0,
      color: 'red'
    }
  ];

  const piecesPhTorr = [
    {
      gt: 0,
      lte: AlertasPCCs.PhTor.Alerta.Minima || 0,
      color: 'red'
    },
    {
      gte: AlertasPCCs.PhTor.Alerta.Minima || 0,
      lte: AlertasPCCs.PhTor.Alerta.Maxima || 0,
      color: '#198754'
    },
    {
      gt: AlertasPCCs.PhTor.Alerta.Maxima || 0,
      color: 'red'
    }
  ];

  const markLineInfOzLav = {
    markLine: {
      data: [{ yAxis: AlertasPCCs.OzLav.Alerta.Maxima, name: 'limit' }//3        1 por esto estaba rojo XD todo arriba de 1 era rojo, 
        , { yAxis: OzonoLavadoraAdvertenciaSuperior, name: 'limit' }//2        2
        , { yAxis: OzonoLavadoraAdvertenciaInferior, name: 'limit' }//1.1       1.1
        , { yAxis: AlertasPCCs.OzLav.Alerta.Minima, name: 'limit' }],//1       0
      symbol: "diamond",
      lineStyle: {
        color: "gray",
        type: "solid",
        width: 1,
        opacity: 0.5//Area == "OzonoLavadora" ? 1 : Area == "TemperaturaLavadora" ? 1 : Area == "OzonoTorre" ? 1 : Area == "PhTorre" ? 1 : 0
      }
    },
  }

  const markLineInfOzTorr = {
    markLine: {
      data: [{ yAxis: AlertasPCCs.OzTor.Alerta.Minima, name: 'limit' }
        , { yAxis: AlertasPCCs.OzTor.Alerta.Maxima, name: 'limit' }],
      symbol: "diamond",
      lineStyle: {
        color: "gray",
        type: "solid",
        width: 1,
        opacity: 0.5//Area == "OzonoLavadora" ? 1 : Area == "TemperaturaLavadora" ? 1 : Area == "OzonoTorre" ? 1 : Area == "PhTorre" ? 1 : 0
      }
    },
  }

  const markLineInfTemLav = {
    markLine: {
      data: [{ yAxis: AlertasPCCs.TemLav.Alerta.Minima, name: 'limit' }
        , { yAxis: AlertasPCCs.TemLav.Alerta.Maxima, name: 'limit' }],
      symbol: "diamond",
      lineStyle: {
        color: "gray",
        type: "solid",
        width: 1,
        opacity: 0.5//Area == "OzonoLavadora" ? 1 : Area == "TemperaturaLavadora" ? 1 : Area == "OzonoTorre" ? 1 : Area == "PhTorre" ? 1 : 0
      }
    },
  }
  const markLineInfPhTorr = {
    markLine: {
      data: [{ yAxis: AlertasPCCs.PhTor.Alerta.Minima, name: 'limit' }
        , { yAxis: AlertasPCCs.PhTor.Alerta.Maxima, name: 'limit' }],
      symbol: "diamond",
      lineStyle: {
        color: "gray",
        type: "solid",
        width: 1,
        opacity: 0.5//Area == "OzonoLavadora" ? 1 : Area == "TemperaturaLavadora" ? 1 : Area == "OzonoTorre" ? 1 : Area == "PhTorre" ? 1 : 0
      }
    },
  }
  //! Trabajando

  let optionOzLav = {
    //animationDuration: 100,

    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross'
      }
    },
    toolbox: {//son herramientas para ver los datos
      show: true,
      feature: {
        dataZoom: {
          yAxisIndex: 'none'
        },
        //dataView: { readOnly: false },
        magicType: { type: ['line', 'bar'] },
        restore: {},
        //saveAsImage: {}
      }
    },

    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: Datas?.map(({ Fecha }) => (Fecha)), //Quitar luego
      // data: Horas.map(item => item),
      axisLabel: {
        interval: 59
      }
    },

    yAxis: {
      type: 'value',
      min: AlertasPCCs.OzLav.Escala.Minima || 0,
      max: AlertasPCCs.OzLav.Escala.Maxima || 0,
      interval: ((AlertasPCCs.OzLav.Escala.Maxima - AlertasPCCs.OzLav.Escala.Minima) / 10) || 0.5,
      axisLabel: {
        formatter: '{value} ppm',
      },
      axisPointer: {
        snap: true
      }
    },
    visualMap: {
      show: false,
      pieces: piecesOzLav,
      outOfRange: {
        color: 'black'
      }
    },
    legend: {
      show: false
    },
    /*dataZoom: [
      {
        type: 'inside',
        start: 0,
        end: 20
      },
      {
        start: 0,
        end: 20
      }
    ],*/
    series: [
      {
        name: 'Valor',
        type: 'line',
        //stack: 'Total', totaliza las graficas
        // data: Datas.map(item => item.OzonoLv),
        data: Datas?.map(({ OzonoLv }) => (OzonoLv)),
        formatter: '{ value } ppm',
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
        ...markLineInfOzLav
      },
    ]

  };

  let optionOzTorr = {
    //animationDuration: 100,

    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross'
      }
    },
    toolbox: {//son herramientas para ver los datos
      show: true,
      feature: {
        dataZoom: {
          yAxisIndex: 'none'
        },
        //dataView: { readOnly: false },
        magicType: { type: ['line', 'bar'] },
        restore: {},
        //saveAsImage: {}
      }
    },
    //! Trabajando
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: Datas?.map(({ Fecha }) => (Fecha)), //Quitar luego
      // data: Horas.map(item => item),
      axisLabel: {
        interval: 59
      }
    },

    yAxis: {
      type: 'value',
      min: AlertasPCCs.OzTor.Escala.Minima || 0,
      max: AlertasPCCs.OzTor.Escala.Maxima || 0,
      interval: ((AlertasPCCs.OzTor.Escala.Maxima - AlertasPCCs.OzTor.Escala.Minima) / 10) || 0.05,
      axisLabel: {
        formatter: '{value} ppm',
      },
      axisPointer: {
        snap: true
      }
    },
    visualMap: {
      show: false,
      pieces: piecesOzTorr,
      outOfRange: {
        color: 'black'
      }
    },
    legend: {
      show: false
    },
    series: [
      //! Trabajando
      {
        name: 'Valor',
        type: 'line',
        //stack: 'Total', totaliza las graficas
        // data: arreglo2,
        data: Datas?.map(item => item.OzonoTorre && item.OzonoTorre),
        formatter: '{ value } ppm',
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
        ...markLineInfOzTorr
      },
    ]

  };

  let optionTemLav = {
    //animationDuration: 100,

    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross'
      }
    },
    toolbox: {//son herramientas para ver los datos
      show: true,
      feature: {
        dataZoom: {
          yAxisIndex: 'none'
        },
        //dataView: { readOnly: false },
        magicType: { type: ['line', 'bar'] },
        restore: {},
        //saveAsImage: {}
      }
    },

    xAxis: {
      type: 'category',
      boundaryGap: false,
      // data: Datas?.map(({ Fecha }) => (Fecha)), //Quitar luego
      data: Horas.map(item => item),
      axisLabel: {
        interval: 59
      }
    },
    yAxis: {
      type: 'value',
      min: AlertasPCCs.TemLav.Escala.Minima || 0,
      max: AlertasPCCs.TemLav.Escala.Maxima || 0,
      interval: ((AlertasPCCs.TemLav.Escala.Maxima - AlertasPCCs.TemLav.Escala.Minima) / 10) || 5,
      axisLabel: {
        formatter: '{value} °C',
      },
      axisPointer: {
        snap: true
      }
    },
    visualMap: {
      show: false,
      pieces: piecesTemLav,
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
        // data: arreglo3,
        data: [56.17,54.97,54.68,58.07,67.05,79.09,70.27,68.73,78.07,64.87,63.81,57.59,77.81,79.65,73.08,69.56,74.98,61.95,72.84,56.79,73.88,66.06,74.57,78.55,61,63.82,73.69,68.18,57.5,65.04,70.77,58.93,70.17,50.62,73.68,71.95,69.15,75.58,55.01,53.65,74.69,67.93,50.04,65.63,59.26,79.62,54.38,58.87,63.71,69.97,70.95,51.41,67.61,73.76,55.4,71.83,65.1,54.46,52.98,62.6,77.13,64.76,74.31,61.72,76.63,59.7,77.7,52.14,54.79,60.78,68.09,53.47,61.72,71.99,65.15,78.01,79.11,70.5,77.22,57.25,76.74,59.63,65.29,61.16,72.33,70.36,59.6,50.31,79.21,68.97,59.91,58.54,62.62,70.84,79.92,51.32,78.33,71.71,69.6,66.23,65.44,50.36,75.95,71.45,68.2,53.67,79.71,75.15,59.3,54.5,74.41,54.91,75.87,66.35,50.56,62.45,77.07,74.25,63.29,68.57,57.62,50.46,61.93,53.1,60.06,52.67,63.8,67.05,58.29,57.65,56.74,52.66,52.59,53.81,50.92,55.98,63.04,64.55,70.97,53.48,51.16,64.6,52.6,78.43,68.01,65.8,52.26,77.35,63.46,57.65,61.94,64.42,68.23,69.81,64.09,56.82,61.93,71.35,65.14,68.92,66.56,53.07,70.72,79.54,72.26,52.73,54.64,59.18,63.99,70.12,79.91,67.56,73.82,79.02,62.1,60.09,54.69,71.38,64,65.2,71.2,54.38,58.92,52.3,57.63,77.17,73.25,75.26,53.44,72.43,61.08,62.82,52.06,58.66,51.95,66.55,58.74,55.67,57.36,57.93,65.49,79.7,64.45,61.29,62.7,56,79.24,76.23,64.62,63.48,69.92,55.18,77.85,68.97,79.45,58.14,54.95,66.56,50.59,64.77,73.53,66.76,59.99,79.16,69.06,59.23,61.76,67.46,55.2,57.7,71.71,55.04,63.21,62.83,59.91,73.73,62.37,55.73,70.36,55.06,52.37,54.57,53.33,77.96,58.06,63.81,68.26,50.97,55.16,79.72,73.51,53.63,60.01,64.68,64.82,55.6,51.39,70.84,58.01,73.44,75.02,70.59,66.12,70.19,76.73,54.13,56.72,57.69,79.46,65.9,65.57,51.08,77.16,63.65,77.97,69.17,60.93,59.29,51.08,70.56,68.34,64.08,59.03,51.59,65.51,52.38,51.91,70.58,67.94,79.06,61.51,68.96,63.52,74.43,69.83,66.33,66.19,59.74,54.55,56.92,51.53,79.47,74.94,64.77,70.75,56.35,61.4,70.31,62.64,74.73,72.25,55.57,64.32,76.5,56.05,66.24,72.11,50.56,72.79,61.89,60.24,60.24,77.23,71.69,51.47,54.84,77.24,61.19,66.43,79.55,78.54,74.84,75.49,65.73,61.82,55.23,65.93,73.24,56.8,64.45,66.81,51.07,62.77,65.48,70.67,66.47,73.08,71.44,56.26,57.53,77.03,50.51,69.27,74.01,63.38,60.25,64.59,72.87,76.6,60.09,67.46,75.85,51.84,77.97,60.5,64.38,55.01,61.51,57.9,72.81,63.49,53.25,66.47,60.44,77.4,56.3,59.61,56.1,72.9,51.94,69.53,53.43,65.88,69.34,61.84,78.73,68.22,63.84,75.86,76.66,56.14,64.01,71.76,79.44,61.45,52.65,68.33,54.03,64.28,68.44,55.28,73.1,53.6,64.81,77.48,66.51,63.95,78.62,54.19,54.08,54.65,57.82,50.52,68.66,71.95,69.34,71.12,76.19,53.56,67.98,72.6,52.36,77.88,55.87,73.59,62.92,55.88,63.5,74.06,60.49,51.86,73.52,72.83,50.03,56.83,73.54,69.74,60.21,61.65,59.45,79.77,67.58,73.38,64.22,59.86,67.55,56.94,54.05,60.14,77.89,77.23,60.13,66.15,63.2,74.89,60.81,58.07,61.76,60.95,51.76,77.73,65.12,68.96,56.44,51.23,54.95,79.46,79.67,50.81,70.95,55.79,61.19,54.82,56.61,59.59,60.81,50.1,77.15,52.31,66.91,72.01,66.28,62.73,67.22,65.85,62.14,74.81,56.26,77.67,70.51,52.93,63.79,74.05,60.62,55.58,70.06,56.34,77.37,53.04,53.21,61.08,64.86,59.22,66.25,55.41,59.9,51.18,50.95,56.5,54.84,51.1,77.74,55.42,52,75.53,61.66,52.69,77.96,76.61,67.19,66.87,57.68,74.44,71.81,65.76,76.46,59.33,74.55,54.93,58.1,54.85,58.86,79.19,50.55,74.61,69.06,66.86,77.15,54.88,59.81,59.68,59.69,74.53,75.83,55.57,53.58,64.01,57.68,62.44,70.66,67.12,52.48,76.4,59.87,68.67,56.32,60.64,56.71,57.21,66.45,73.41,57.59,63.26,57.4],
        formatter: '{ value } °C',
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
        ...markLineInfTemLav
      },
    ]

  };

  let optionPhLav = {
    //animationDuration: 100,
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross'
      }
    },
    toolbox: {//son herramientas para ver los datos
      show: true,
      feature: {
        dataZoom: {
          yAxisIndex: 'none'
        },
        //dataView: { readOnly: false },
        magicType: { type: ['line', 'bar'] },
        restore: {},
        //saveAsImage: {}
      }
    },


    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: Datas?.map(({ Fecha }) => (Fecha)), //Quitar luego
      // data: Horas.map(item => item),
      axisLabel: {
        interval: 59
      }
    },
    yAxis: {
      type: 'value',
      min: AlertasPCCs.PhTor.Escala.Minima,
      max: AlertasPCCs.PhTor.Escala.Maxima,
      interval: ((AlertasPCCs.PhTor.Escala.Maxima - AlertasPCCs.PhTor.Escala.Minima) / 10) || 0.5,
      axisLabel: {
        formatter: '{value} pH',
      },
      axisPointer: {
        snap: true
      }
    },
    visualMap: {
      show: false,
      pieces: piecesPhTorr,
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
        // data: arreglo4,
        data: Datas?.map(item => item.PhTorre && item.PhTorre),
        formatter: '{ value } pH',
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
        ...markLineInfPhTorr
      },
    ]
  };

  //! Trabajando
  //TODO /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //TODO --> Area de visualizacion de los variables en la consola
  //TODO /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  // console.log('Datas')
  // console.log(Datas)
  // console.log('Datas.map(item => item.OzonoLv)')
  // console.log(Datas.map(item => item.OzonoLv))

  // console.log(AlertasPCCs.OzLav.Escala)
  // console.log(AlertasPCCs.OzLav.Alerta)
  // console.log(piecesOzLav)
  
  // console.log(markLineInfOzLav)
  // console.log(Historicos)
  // console.log('Datas.map(item => item.OzonoTorre && item.OzonoTorre)')
  // console.log(Datas)

  //TODO /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12} md={12} lg={12}>
          {/* <MDBox mb={6}>
            <Typography align="center" variant="h4" color="secondary"> Graficos </Typography>
          </MDBox> */}
        </Grid>
        <Grid item xs={12} lg={12}>
          <MDBox>
            <MDBox mb={5}>
              <Typography align="center" variant="h4" color="secondary"> Ozono Lavadora </Typography>
            </MDBox>
            <ReportsLineChart
              color="light"
              title="Ozono Lavadora"
              description={
                <>

                </>
              }

              chart={optionOzLav}
              funReport="OzonoLavadora"
              Escala={AlertasPCCs.OzLav.Escala}
              Alerta={AlertasPCCs.OzLav.Alerta}
              pieces={piecesOzLav}
              markLine={markLineInfOzLav}
              Historicos={Historicos.OzL5}
              Actual={Actual}

            />
          </MDBox>
          {/*  */}
          <MDBox>
            <MDBox mb={5}>
              <Typography align="center" variant="h4" color="secondary"> Ozono Torre </Typography>
            </MDBox>
            <ReportsLineChart
              color="light"
              title="Ozono Torre"
              description={
                <>
                  {/*(<strong>+15%</strong>) increase in today sales.*/}
                </>
              }

              chart={optionOzTorr}
              funReport="OzonoTorre"
              Escala={AlertasPCCs.OzTor.Escala}
              Alerta={AlertasPCCs.OzTor.Alerta}
              pieces={piecesOzTorr}
              markLine={markLineInfOzTorr}
              Historicos={Historicos.OzTrr}
              Actual={Actual}

            />
          </MDBox>
          <MDBox>
            <MDBox mb={5}>
              <Typography align="center" variant="h4" color="secondary"> Temperatura Lavadora </Typography>
            </MDBox>
            <ReportsLineChart
              color="light"
              title="Temperatura Lavadora"
              //description={<>(<strong>+100%</strong>) increase in today sales.</>}
              chart={optionTemLav}
              funReport="TemperaturaLavadora"
              Escala={AlertasPCCs.TemLav.Escala}
              Alerta={AlertasPCCs.TemLav.Alerta}
              pieces={piecesTemLav}
              markLine={markLineInfTemLav}
              Historicos={Historicos.TemL5}
              Actual={Actual}
            />
          </MDBox>
          <MDBox>
            <MDBox mb={5}>
              <Typography align="center" variant="h4" color="secondary"> Ph Torre </Typography>
            </MDBox>
            <ReportsLineChart
              color="light"
              title="pH Torre"
              description={
                <>
                  {/*(<strong>+1%</strong>) increase in today sales. */}
                </>
              }

              chart={optionPhLav}
              funReport="PhTorre"
              Escala={AlertasPCCs.PhTor.Escala}
              Alerta={AlertasPCCs.PhTor.Alerta}
              pieces={piecesPhTorr}
              markLine={markLineInfPhTorr}
              Historicos={Historicos.PhL5}
              Actual={Actual}

            />
          </MDBox>
        </Grid>
      </Grid>
    </>
  );
}
