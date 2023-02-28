import { Typography } from "@mui/material";
import Grid from "@mui/material/Grid";

// Material Dashboard 2 PRO React components
import MDBox from "components/MDBox";

import ReportsLineChart2 from "examples/Charts/LineCharts/ReportsLineChart2";

import { useEffect, useMemo, useRef, useState } from "react";
// import { ProgresBar } from "layouts/Produccion/L5/Televisor/elementos";

import { Horas } from './elementos/Horas'

export const TelevisorPCCSL5 = () => {

  const wsUrl = process.env.REACT_APP_AUTH_URL_WEBSOCKET;//192.168.100.13

  let initialState = {
    AguaTorreContacto: 0,
    AguaLavadoraL5: 0,
    Energia: 0,
    ProduccionPorcentaje: 0,
    ProduccionCantidad: 0,
    Velocidad: 0,
    Rechazo: 0,
    TiempoMuerto: 0,
    Rendimiento: 0
  }

  const ws = useRef(null);

  const [Actual, setActual] = useState();

  const [Datas, setDatas] = useState([]);

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
      setAlertasPCCs(JSON.parse(event.data).AlertasPCCs);

    };

    return () => {
      wsCurrent.close();
    };
  }, [])

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
      color: 'yellow'//'#ff8000'
    },

    {
      gte: OzonoLavadoraAdvertenciaInferior || 0,
      lte: OzonoLavadoraAdvertenciaSuperior || 0,
      color: '#265dd4'
    },
    {
      gte: OzonoLavadoraAdvertenciaInferior || 0,
      lte: OzonoLavadoraAdvertenciaInferior || 0,
      color: 'yellow'//'#ff8000'
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
      color: '#265dd4'
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
      color: '#265dd4'
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
      color: '#265dd4'
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
    series: [
      {
        name: 'Valor',
        type: 'line',
        //stack: 'Total', totaliza las graficas
        data: Datas.map(item => item.OzonoLv),
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
      {
        name: 'Valor',
        type: 'line',
        //stack: 'Total', totaliza las graficas
        data: Datas.map(item => item.OzonoTorre && item.OzonoTorre),
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
      data: /*Horas,//*/Horas.map(item => item),
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
        data: Datas.map(item => item.TemperaturaLv && item.TemperaturaLv),
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
        data: Datas.map(item => item.PhTorre && item.PhTorre),
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
  return (
    <>
      {/*<MDTypography variant="h3">L5</MDTypography>*/}
      {/* <MDBox mt={6}> */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={12} lg={12}>
          <MDBox mb={6}>
            <Typography ml={'48%'} variant="h4" color="secondary"> Graficos </Typography>
          </MDBox>
        </Grid>
        <Grid item xs={12} lg={12}>
          <MDBox mb={6}>
            <ReportsLineChart2
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
          <MDBox mb={3} mt={3}>
            <ReportsLineChart2
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
        </Grid>
        <Grid item xs={12} lg={12}>
          <MDBox mb={3}>
            <ReportsLineChart2
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

          <MDBox mb={3}>
            <ReportsLineChart2
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






/*

{
    OzLav:{
        Escala:{
            Maxima: 0,
            Minima: 0
        },
        Alerta: {
            Maxima: 0,
            Minima: 0
        }
    },
    OzTor: {
        Escala:{
            Maxima: 0,
            Minima: 0
        },
        Alerta: {
            Maxima: 0,
            Minima: 0
        }
    },
    TemLav: {
        Escala:{
            Maxima: 0,
            Minima: 0
        },
        Alerta: {
            Maxima: 0,
            Minima: 0
        }
    },
    PhTor: {
        Escala:{
            Maxima: 0,
            Minima: 0
        },
        Alerta: {
            Maxima: 0,
            Minima: 0
        }
    }
}

*/

/*

const ws = useRef(null);
 useEffect(() => {
    ws.current = new WebSocket(`ws://${wsUrl}:3006`);
    ws.current.onopen = () => console.log("ws opened");
    ws.current.onclose = () => console.log("ws closed");
  
    const wsCurrent = ws.current;
    //console.log(baseUrl);
    ws.current.onmessage = function (event) {
        //console.log(event.data);
        setProduccionConsumos(JSON.parse(event.data).ProduccionConsumos);
        setProduccionTurnos(JSON.parse(event.data).ProduccionTurnos);
        setstatusVelocidadTiempos(JSON.parse(event.data).statusVelocidadTiempos);
        console.log(ProduccionConsumos);
        console.log(ProduccionTurnos);
        console.log(statusVelocidadTiempos);
        console.log(JSON.parse(event.data));
        console.log(event.data);
    };
    
    return () => {
        wsCurrent.close();
    };
  }, [])

*/