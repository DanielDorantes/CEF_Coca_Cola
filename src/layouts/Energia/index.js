import { Grid } from '@mui/material';
import MDBox from 'components/MDBox';
import MDTypography from 'components/MDTypography';
import SalesTable from 'examples/Tables/SalesTable';
import React, { useEffect, useRef, useState } from 'react'

export const Energias = () => {
  
  const wsUrl = process.env.REACT_APP_AUTH_URL_WEBSOCKET;//192.168.100.13

  const ws = useRef(null);
    
  let datos = [];
    
    let initialState = {
        Voltage: 0,
        Amperage: 0,
        Factor_Potencia: 0,
        KW_Hr: 0
    }
    const [wsData, setWsData] = useState(initialState);
 const dataWs = () => {
    //alert(`ws://${baseUrl}:3002`)
    ws.current = new WebSocket(`ws://${wsUrl}:3004`);
    ws.current.onopen = () => console.log("ws opened");
    ws.current.onclose = () => console.log("ws closed");
    //alert('paso por aca');
    const wsCurrent = ws.current;
    //console.log(baseUrl);
    ws.current.onmessage = function (event) {
        //console.log(JSON.parse(event.data).statusVelocidadTiempos.turno1_Danger1);
        //alert('luego entro por aqui');
        setWsData(JSON.parse(event.data));
        console.log(wsData);
    };
    
    return () => {
        wsCurrent.close();
    };
  }

  useEffect(dataWs, [])

  

    let datoOnline1 = [
        {
          Indicador: [null, "Voltage"],
          Valor: (wsData.voltajeTR1 || 0).toFixed(2) + " V",
        },
        {
          Indicador: [null, "Amperaje"],
          Valor: (wsData.corrienteTR1 || 0).toFixed(2)  + " A",
        },
        {
          Indicador: [null, "Factor Potencia"],
          Valor: (wsData.factorPotenciaTR1 || 0).toFixed(2) + " FP",
        },
        { Indicador: [null, "kW h"], Valor: (wsData.consumoDiaTR1 || 0).toFixed(2) + " kW⋅h" },
    ];

    let datoOnline2 = [
      {
        Indicador: [null, "Voltage"],
        Valor: (wsData.voltajeTR2 || 0).toFixed(2) + " V",
      },
      {
        Indicador: [null, "Amperaje"],
        Valor: (wsData.corrienteTR2 || 0).toFixed(2)  + " A",
      },
      {
        Indicador: [null, "Factor Potencia"],
        Valor: (wsData.factorPotenciaTR2 || 0).toFixed(2) + " FP",
      },
      { Indicador: [null, "kW h"], Valor: (wsData.consumoDiaTR2 || 0).toFixed(2) + " kW⋅h" },
  ];

  let datoOnline3 = [
    {
      Indicador: [null, "Voltage"],
      Valor: (wsData.voltajeTR3 || 0).toFixed(2) + " V",
    },
    {
      Indicador: [null, "Amperaje"],
      Valor: (wsData.corrienteTR3 || 0).toFixed(2)  + " A",
    },
    {
      Indicador: [null, "Factor Potencia"],
      Valor: (wsData.factorPotenciaTR3 || 0).toFixed(2) + " FP",
    },
    { Indicador: [null, "kW h"], Valor: (wsData.consumoDiaTR3 || 0).toFixed(2) + " kW⋅h" },
];
// alert={datos.factorPotenciaTR1<0.95} 
  return (
    <>
    {/*<MDTypography variant="h3">Energia</MDTypography>*/}
        <MDBox mb={3}>
          <Grid container spacing={1.2}>
          <Grid item xs={12} lg={3}>
              <SalesTable title="Tranformador 1" rows={datoOnline1}  alert={wsData.factorPotenciaTR1<0.95} />
            </Grid>
            <Grid item xs={12} lg={3}>
              <SalesTable title="Transformador 2" rows={datoOnline2}  alert={wsData.factorPotenciaTR2<0.95} />
            </Grid>
            <Grid item xs={12} lg={3}>
              <SalesTable title="Transformador 3" rows={datoOnline3}  alert={wsData.factorPotenciaTR3<0.95} />
            </Grid>
            <Grid item xs={12} lg={3}>
              {/*<SalesTable title="Indicadores" rows={datoOnline} />*/}
            </Grid>
          </Grid>
        </MDBox>
    </>
  )
}
