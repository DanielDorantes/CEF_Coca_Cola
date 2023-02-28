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
      OzonoLv : 19.45,
      OzonoTorre : 0.17,
      TemperaturaLv : 60.39,
      PhTorre : 6,
      Fecha : "2023-02-20T08:27:47.000Z"
    },
    {
      OzonoLv : 19.45,
      OzonoTorre : 0.17,
      TemperaturaLv : 60.39,
      PhTorre : 6,
      Fecha : "2023-02-20T08:28:47.000Z"
    },
    {
      OzonoLv : 19.45,
      OzonoTorre : 0.17,
      TemperaturaLv : 60.39,
      PhTorre : 6,
      Fecha : "2023-02-20T08:29:47.000Z"
    },
    {
      OzonoLv : 19.45,
      OzonoTorre : 0.17,
      TemperaturaLv : 60.39,
      PhTorre : 6,
      Fecha : "2023-02-20T08:30:47.000Z"
    },
    {
      OzonoLv : 19.45,
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
    ws.current = new WebSocket(`ws://${wsUrl}:3005`);
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
    const url = `http://${wsUrl}:1880/api/statusPccs`;
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
      data: Horas.map(item => item),
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
      data: Horas.map(item => item),
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
        data: Datas?.map(item => item.TemperaturaLv && item.TemperaturaLv),
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
      data: Horas.map(item => item),
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
