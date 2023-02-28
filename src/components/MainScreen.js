import { Divider } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import MDTypography from 'components/MDTypography';
import { Grid } from '@mui/material';
import MDBox from 'components/MDBox';
import { DREnergia } from './DatosReales/DREnergia';
import { DRAgua } from './DatosReales/DRAgua';
import { DRProduccion } from './DatosReales/DRProduccion';

export const MainScreen =()=> {
  /*
  {
    Eneregia: msg.Energia,
    Agua: msg.Agua,
    PCCs: msg.PCCs,
    statusVelocidad: msg.statusPccs,
    statusVelocidadTurno: msg.statusVelocidadTurno,
    IndicadoresProduccion: msg.IndicadoresProduccion
} */
  const ws = useRef(null);

  const wsUrl = process.env.REACT_APP_AUTH_URL_WEBSOCKET;//192.168.100.13

  const initialState = {
  }
  const [wsData, setWsData] = useState(initialState);
  useEffect(() => {
    ws.current = new WebSocket(`ws://${wsUrl}:3002`);
    ws.current.onopen = () => console.log("ws opened");
    ws.current.onclose = () => console.log("ws closed");
  
    const wsCurrent = ws.current;
    //console.log(baseUrl);
    ws.current.onmessage = function (event) {
        //console.log(event.data);
        setWsData(JSON.parse(event.data));
        //console.log(wsData);
    };
    
    return () => {
        wsCurrent.close();
    };
  }, [])

  return (
      <>
      <MDBox mb={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} lg={12}>
            <Divider component="li" variant="inset" flexItem />
            <MDTypography ml={'50%'} variant="h3">Energia</MDTypography>
          </Grid>
        </Grid>
      </MDBox>
      <DREnergia datos = {wsData.Eneregia}/>
      <MDBox mb={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} lg={12}>
            <Divider component="li" variant="inset" flexItem />
            <MDTypography ml={'50%'} variant="h3">Agua</MDTypography>
          </Grid>
        </Grid>
      </MDBox>
      <DRAgua datos = {wsData.Agua} />
        <MDBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} lg={12}>
              <Divider component="li" variant="inset" flexItem />
              <MDTypography ml={'50%'} variant="h3">L5</MDTypography>
            </Grid>
          </Grid>
        </MDBox>
        <DRProduccion AlertasPCCs={wsData.AlertasPCCs} PCCs={wsData.PCCs} statusVelocidad={wsData.statusVelocidad} statusVelocidadTurno={wsData.statusVelocidadTurno} IndicadoresProduccion={wsData.IndicadoresProduccion} />
        </>
  )
}
