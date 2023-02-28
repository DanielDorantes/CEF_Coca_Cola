import React, { useEffect, useRef, useState } from 'react'
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { ClickAwayListener, Divider, Grid, Modal, TextField } from '@mui/material';
import { styled } from '@mui/material/styles';
import { CProgress, CProgressBar } from '@coreui/react';
import MDBox from 'components/MDBox';
import ReactECharts from "echarts-for-react";
//import timelines from '../../components/TimeLine/timelines';

import { Liquid } from '@ant-design/plots';

import * as d3 from "d3";
import { timelines } from "d3-timelines";
import { Horas } from '../../components/Elementos/Horas'

/////////////////
import CocaCola from '../../assets/logos/coca-cola-base.png';
import CocaColaLight from '../../assets/logos/coca-cola-light.png';
import CocaColaZero from '../../assets/logos/coca-cola-zero.png';
import CielMineral from '../../assets/logos/ciel.png';
import FantaFresa from '../../assets/logos/Fanta-Fresa.png';
import FantaNaranja from '../../assets/logos/fanta-naranja.jpg';
import Fresca from '../../assets/logos/Fresca.png';
import FuzeTea from '../../assets/logos/fuze-tea.png';
import SidralMundet from '../../assets/logos/Sidral-Mundet.png';
import SpriteZero from '../../assets/logos/Sprite-zero.png';
import Sprite from '../../assets/logos/Sprite.png';
import { Progress } from './Elementos/Progress';
import moment from 'moment';
import { DatePicker, LocalizationProvider } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { es } from 'date-fns/locale';



const imagenes = [{ CocaCola }, { CocaColaLight }, { CocaColaZero }, { CielMineral }, { FantaFresa }, { FantaNaranja }, { Fresca }, { FuzeTea }, { SidralMundet }, { SpriteZero }, { Sprite }]
/*

const random = () => {
  let value = (Math.random() * 100);
  return;
}

*/
export const Jarabes = () => {

  const wsUrl = process.env.REACT_APP_AUTH_URL_WEBSOCKET;//192.168.100.13

  const initialStateHis = [
    {
      Nivel: 0,
      RPM: 0,
      Temperatura: 0,
      Fecha: "2022-01-01T00:00:00.307Z"
    }
  ]


  ///////////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////////////

  const initialState = {
    Tanque1: {
      Nivel: 0,
      Porcentaje: 0,
      Producto: '',
      Temperatura: '',
      RPM: '',
      VidaUtil: '',
      TiempoVidaReceta: '',
      FechaLlenado: ''
    },
    Tanque2: {
      Nivel: 0,
      Porcentaje: 0,
      Producto: '',
      Temperatura: '',
      RPM: '',
      VidaUtil: '',
      TiempoVidaReceta: '',
      FechaLlenado: ''
    },
    Tanque3: {
      Nivel: 0,
      Porcentaje: 0,
      Producto: '',
      Temperatura: '',
      RPM: '',
      VidaUtil: '',
      TiempoVidaReceta: '',
      FechaLlenado: ''
    },
    Tanque4: {
      Nivel: 0,
      Porcentaje: 0,
      Producto: '',
      Temperatura: '',
      RPM: '',
      VidaUtil: '',
      TiempoVidaReceta: '',
      FechaLlenado: ''
    },
    Tanque5: {
      Nivel: 0,
      Porcentaje: 0,
      Producto: '',
      Temperatura: '',
      RPM: '',
      VidaUtil: '',
      TiempoVidaReceta: '',
      FechaLlenado: ''
    },
    Tanque6: {
      Nivel: 0,
      Porcentaje: 0,
      Producto: '',
      Temperatura: '',
      RPM: '',
      VidaUtil: '',
      TiempoVidaReceta: '',
      FechaLlenado: ''
    },
    Tanque7: {
      Nivel: 0,
      Porcentaje: 0,
      Producto: '',
      Temperatura: '',
      RPM: '',
      VidaUtil: '',
      TiempoVidaReceta: '',
      FechaLlenado: ''
    },
    Tanque8: {
      Nivel: 0,
      Porcentaje: 0,
      Producto: '',
      Temperatura: '',
      RPM: '',
      VidaUtil: '',
      TiempoVidaReceta: '',
      FechaLlenado: ''
    },
    Tanque9: {
      Nivel: 0,
      Porcentaje: 0,
      Producto: '',
      Temperatura: '',
      RPM: '',
      VidaUtil: '',
      TiempoVidaReceta: '',
      FechaLlenado: ''
    },
    Tanque10: {
      Nivel: 0,
      Porcentaje: 0,
      Producto: '',
      Temperatura: '',
      RPM: '',
      VidaUtil: '',
      TiempoVidaReceta: '',
      FechaLlenado: ''
    },
    Tanque11: {
      Nivel: 0,
      Porcentaje: 0,
      Producto: '',
      Temperatura: '',
      RPM: '',
      VidaUtil: '',
      TiempoVidaReceta: '',
      FechaLlenado: ''
    },
    Tanque12: {
      Nivel: 0,
      Porcentaje: 0,
      Producto: '',
      Temperatura: '',
      RPM: '',
      VidaUtil: '',
      TiempoVidaReceta: '',
      FechaLlenado: ''
    },
    Temperatura: 0
  }


  const [data, setData] = useState(initialState);

  const ws = useRef(null);


  useEffect(() => {
    ws.current = new WebSocket(`ws://${wsUrl}:3007`);
    ws.current.onopen = () => console.log("ws opened");
    ws.current.onclose = () => console.log("ws closed");

    const wsCurrent = ws.current;
    //console.log(baseUrl);
    ws.current.onmessage = function (event) {
      setData(JSON.parse(event.data));
    };

    return () => {
      wsCurrent.close();
    };
  }, []);


  setTimeout(() => {
    document.location.reload();
  }, 300000);

  const Fecha = new Date().toLocaleString();

  const AlertaT1 = data.Tanque3.Estado == 7 ? "Azul" : data.Tanque3.Estado == 6 ? "Verde" : "Amarillo";
  const AlertaT2 = data.Tanque4.Estado == 7 ? "Azul" : data.Tanque4.Estado == 6 ? "Verde" : "Amarillo";
  const AlertaT3 = data.Tanque5.Estado == 7 ? "Azul" : data.Tanque5.Estado == 6 ? "Verde" : "Amarillo";
  const AlertaT4 = data.Tanque6.Estado == 7 ? "Azul" : data.Tanque6.Estado == 6 ? "Verde" : "Amarillo";
  const AlertaT5 = data.Tanque7.Estado == 7 ? "Azul" : data.Tanque7.Estado == 6 ? "Verde" : "Amarillo";
  const AlertaT6 = data.Tanque8.Estado == 7 ? "Azul" : data.Tanque8.Estado == 6 ? "Verde" : "Amarillo";
  const AlertaT7 = data.Tanque9.Estado == 7 ? "Azul" : data.Tanque9.Estado == 6 ? "Verde" : "Amarillo";
  const AlertaT8 = data.Tanque9.Estado == 7 ? "Azul" : data.Tanque9.Estado == 6 ? "Verde" : "Amarillo";
  const AlertaT9 = data.Tanque9.Estado == 7 ? "Azul" : data.Tanque9.Estado == 6 ? "Verde" : "Amarillo";
  const AlertaT10 = data.Tanque12.Estado == 7 ? "Azul" : data.Tanque12.Estado == 6 ? "Verde" : "Amarillo";


  const TituloT1 = data.Tanque3.Estado == 7 ? "Preparacion" : data.Tanque3.Estado == 6 ? "Liberado" : "Terminado";
  const TituloT2 = data.Tanque4.Estado == 7 ? "Preparacion" : data.Tanque4.Estado == 6 ? "Liberado" : "Terminado";
  const TituloT3 = data.Tanque5.Estado == 7 ? "Preparacion" : data.Tanque5.Estado == 6 ? "Liberado" : "Terminado";
  const TituloT4 = data.Tanque6.Estado == 7 ? "Preparacion" : data.Tanque6.Estado == 6 ? "Liberado" : "Terminado";
  const TituloT5 = data.Tanque7.Estado == 7 ? "Preparacion" : data.Tanque7.Estado == 6 ? "Liberado" : "Terminado";
  const TituloT6 = data.Tanque8.Estado == 7 ? "Preparacion" : data.Tanque8.Estado == 6 ? "Liberado" : "Terminado";
  const TituloT7 = data.Tanque9.Estado == 7 ? "Preparacion" : data.Tanque9.Estado == 6 ? "Liberado" : "Terminado";
  const TituloT8 = data.Tanque9.Estado == 7 ? "Preparacion" : data.Tanque9.Estado == 6 ? "Liberado" : "Terminado";
  const TituloT9 = data.Tanque9.Estado == 7 ? "Preparacion" : data.Tanque9.Estado == 6 ? "Liberado" : "Terminado";
  const AlTituloT10 = data.Tanque12.Estado == 7 ? "Preparacion" : data.Tanque12.Estado == 6 ? "Liberado" : "Terminado";


  return (

    <>
      {/*****Fila 1*****/}
      {/*
    orden de las filas y columnas

    [1,1][1,2][1,3]
    [2,1][2,2][2,3]
    [3,1][3,2][3,3]
    [4,1][4,2][4,3]
        
    */}
      <Box sx={{ flexGrow: 1 }}>
        <Grid
          container
          spacing={{ xs: 2, md: 2 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          {/*****Card [1,1]*****/}
          <Grid item xs={12} sm={3} md={4} ml={0} >
            <Card sx={{ width: '100%', height: '102%', mb:'8%', borderRadius: 0 }} >
              <Grid ml={2} mr={2} mt={1} >
                <Box sx={{ borderRadius: '0px', bgcolor: 'grey.400', display: 'grid' }} mt={-1} ml={-2} mr={-2} >
                  <Typography gutterBottom variant="h4" component="div" align="center" color='#000000' >
                    Jarabe Simple 1
                  </Typography>
                </Box>
                <Box mb={-1} ml={-2} mr={-2} className={AlertaT1 == "Verde" ? "alert alert-success" : AlertaT1 == "Azul" ? "alert alert-primary" : AlertaT1 == "Amarillo" && "alert alert-warning"} role="alert" height={41} sx={{ borderRadius: '0px' }} >
                  <Typography variant="h4" color='#000000' align="center" mt={-2} > {TituloT1} </Typography>
                </Box>
                <Box >
                  <Grid container height={50} mt={2} >
                    <Typography item variant="h4" color='#000000' >
                      Producto:   <Typography variant="h5" color='#fe001a' display="inline" > {data.Tanque1.Producto || ''} </Typography>
                    </Typography>
                  </Grid>
                  <Grid container height={50} mt={3} >
                    <Typography gutterBottom variant="h4" component="div" color='#000000' >
                      Nivel: <Typography variant="h5" color='#fe001a' display="inline" > {(data.Tanque1.Nivel || 0).toFixed(2)}  </Typography>L
                    </Typography>
                  </Grid>
                  {/* <Grid container heigh5={44} >
                  <Typography gutterBottom variant="h4" component="div" color='#000000' >
                    Temperatura:{(data.Tanque3.Temperatura || 0).toFixed(2)} C° */}
                  {/* </Typography>
                </Grid> */}
                  <Grid container height={50} >
                    <Typography gutterBottom variant="h4" component="div" color='#000000' >
                      Agitación: <Typography variant="h5" color='#fe001a' display="inline" > {(data.Tanque1.RPM || 0)} </Typography>RPM
                    </Typography>
                  </Grid>
                  <Grid container height={50} >
                    <Typography gutterBottom variant="h4" component="div" color='#000000' >
                      Fecha de llenado: <Typography variant="h5" color='#fe001a' display="inline" > {(data.Tanque1.Fecha || '0000-00-00')}</Typography>
                    </Typography>
                  </Grid>
                </Box>
              </Grid>
            </Card>
          </Grid>
          {/*****Card [1,2]*****/}
          <Grid item xs={12} sm={3} md={4} ml={0} >
            <Card sx={{ width: '100%', height: '102%', mb:'8%', borderRadius: 0  }} >
              <Grid ml={2} mr={2} mt={1} >
                <Box sx={{ borderRadius: '0px', bgcolor: 'grey.400', display: 'grid' }} mt={-1} ml={-2} mr={-2} >
                  <Typography gutterBottom variant="h4" component="div" align="center" color='#000000' >
                    Jarabe Simple 2
                  </Typography>
                </Box>
                <Box mb={-1} ml={-2} mr={-2} className={AlertaT1 == "Verde" ? "alert alert-success" : AlertaT1 == "Azul" ? "alert alert-primary" : AlertaT1 == "Amarillo" && "alert alert-warning"} role="alert" height={41} sx={{ borderRadius: '0px' }} >
                  <Typography variant="h4" color='#000000' align="center" mt={-2} > {TituloT1} </Typography>
                </Box>
                <Box >
                  <Grid container height={50} mt={2} >
                    <Typography item variant="h4" color='#000000' >
                      Producto:   <Typography variant="h5" color='#fe001a' display="inline" > {data.Tanque2.Producto || ''} </Typography>
                    </Typography>
                  </Grid>
                  <Grid container height={50} mt={3} >
                    <Typography gutterBottom variant="h4" component="div" color='#000000' >
                      Nivel: <Typography variant="h5" color='#fe001a' display="inline" > {(data.Tanque2.Nivel || 0).toFixed(2)}  </Typography>L
                    </Typography>
                  </Grid>
                  {/* <Grid container heigh5={44} >
                  <Typography gutterBottom variant="h4" component="div" color='#000000' >
                    Temperatura:{(data.Tanque3.Temperatura || 0).toFixed(2)} C° */}
                  {/* </Typography>
                </Grid> */}
                  <Grid container height={50} >
                    <Typography gutterBottom variant="h4" component="div" color='#000000' >
                      Agitación: <Typography variant="h5" color='#fe001a' display="inline" > {(data.Tanque2.RPM || 0)} </Typography>RPM
                    </Typography>
                  </Grid>
                  <Grid container height={50} >
                    <Typography gutterBottom variant="h4" component="div" color='#000000' >
                      Fecha de llenado: <Typography variant="h5" color='#fe001a' display="inline" > {(data.Tanque2.Fecha || '0000-00-00')}</Typography>
                    </Typography>
                  </Grid>
                </Box>
              </Grid>
            </Card>
          </Grid>
          {/*****Card [1,3]*****/}
          <Grid item xs={12} sm={3} md={4} >
          </Grid>
          {/*****Card [2,1]*****/}
          <Grid item xs={12} sm={3} md={4} ml={0} >
            <Card sx={{ width: '100%', height: '102%', mb:'8%', borderRadius: 0  }} >
              <Grid ml={2} mr={2} mt={1} >
                <Box sx={{ borderRadius: '0px', bgcolor: 'grey.400', display: 'grid' }} mt={-1} ml={-2} mr={-2} >
                  <Typography gutterBottom variant="h4" component="div" align="center" color='#000000' >
                    Jarabe Terminado 1
                  </Typography>
                </Box>
                <Box mb={-1} ml={-2} mr={-2} className={AlertaT1 == "Verde" ? "alert alert-success" : AlertaT1 == "Azul" ? "alert alert-primary" : AlertaT1 == "Amarillo" && "alert alert-warning"} role="alert" height={41} sx={{ borderRadius: '0px' }} >
                  <Typography variant="h4" color='#000000' align="center" mt={-2} > {TituloT1} </Typography>
                </Box>
                <Box >
                  <Grid container height={50} mt={2} >
                    <Typography item variant="h4" color='#000000' >
                      Producto:   <Typography variant="h5" color='#fe001a' display="inline" > {data.Tanque3.Producto || ''} </Typography>
                    </Typography>
                  </Grid>
                  <Grid container height={50} mt={3} >
                    <Typography gutterBottom variant="h4" component="div" color='#000000' >
                      Nivel: <Typography variant="h5" color='#fe001a' display="inline" > {(data.Tanque3.Nivel || 0).toFixed(2)}  </Typography>L
                    </Typography>
                  </Grid>
                  {/* <Grid container heigh5={44} >
                  <Typography gutterBottom variant="h4" component="div" color='#000000' >
                    Temperatura:{(data.Tanque3.Temperatura || 0).toFixed(2)} C° */}
                  {/* </Typography>
                </Grid> */}
                  <Grid container height={50} >
                    <Typography gutterBottom variant="h4" component="div" color='#000000' >
                      Agitación: <Typography variant="h5" color='#fe001a' display="inline" > {(data.Tanque3.RPM || 0)} </Typography>RPM
                    </Typography>
                  </Grid>
                  <Grid container height={50} >
                    <Typography gutterBottom variant="h4" component="div" color='#000000' >
                      Fecha de llenado: <Typography variant="h5" color='#fe001a' display="inline" > {(data.Tanque3.Fecha || '0000-00-00')}</Typography>
                    </Typography>
                  </Grid>
                </Box>
              </Grid>
            </Card>
          </Grid>
          {/*****Card [2,2]*****/}
          <Grid item xs={12} sm={3} md={4} ml={0} >
            <Card sx={{ width: '100%', height: '102%', mb:'8%', borderRadius: 0  }} >
              <Grid ml={2} mr={2} mt={1} >
                <Box sx={{ borderRadius: '0px', bgcolor: 'grey.400', display: 'grid' }} mt={-1} ml={-2} mr={-2} >
                  <Typography gutterBottom variant="h4" component="div" align="center" color='#000000' >
                    Jarabe Terminado 2
                  </Typography>
                </Box>
                <Box mb={-1} ml={-2} mr={-2} className={AlertaT2 == "Verde" ? "alert alert-success" : AlertaT2 == "Azul" ? "alert alert-primary" : AlertaT2 == "Amarillo" && "alert alert-warning"} role="alert" height={41} sx={{ borderRadius: '0px' }} >
                  <Typography variant="h4" color='#000000' align="center" mt={-2} > {TituloT2} </Typography>
                </Box>
                <Box >
                  <Grid container height={50} mt={2} >
                    <Typography gutterBottom variant="h4" component="div" color='#000000' >
                      Producto: <Typography variant="h5" color='#fe001a' display="inline" > {data.Tanque4.Producto || ''} </Typography>
                    </Typography>
                  </Grid>
                  <Grid container height={50} mt={3} >
                    <Typography gutterBottom variant="h4" component="div" color='#000000' >
                      Nivel: <Typography variant="h5" color='#fe001a' display="inline" > {(data.Tanque4.Nivel || 0).toFixed(2)}  </Typography>L
                    </Typography>
                  </Grid>
                  {/* <Grid container heigh5={44} >
                  <Typography gutterBottom variant="h4" component="div" color='#000000' >
                    Temperatura:{(data.Tanque4.Temperatura || 0).toFixed(2)} C° */}
                  {/* </Typography>
                </Grid> */}
                  <Grid container height={50} >
                    <Typography gutterBottom variant="h4" component="div" color='#000000' >
                      Agitación: <Typography variant="h5" color='#fe001a' display="inline" >  {(data.Tanque4.RPM || 0)} </Typography>RPM
                    </Typography>
                  </Grid>
                  <Grid container height={50} >
                    <Typography gutterBottom variant="h4" component="div" color='#000000' >
                      Fecha de llenado: <Typography variant="h5" color='#fe001a' display="inline" >  {(data.Tanque4.Fecha || '0000-00-00')}</Typography>
                    </Typography>
                  </Grid>
                </Box>
              </Grid>
            </Card>
          </Grid>
          {/*****Card [2,3]*****/}
          <Grid item xs={12} sm={3} md={4} ml={0} >
            <Card sx={{ width: '100%', height: '102%', mb:'8%', borderRadius: 0  }} >
              <Grid ml={2} mr={2} mt={1} >
                <Box sx={{ borderRadius: '0px', bgcolor: 'grey.400', display: 'grid' }} mt={-1} ml={-2} mr={-2} >
                  <Typography gutterBottom variant="h4" component="div" align="center" color='#000000' >
                    Jarabe Terminado 3
                  </Typography>
                </Box>
                <Box mb={-1} ml={-2} mr={-2} className={AlertaT3 == "Verde" ? "alert alert-success" : AlertaT3 == "Azul" ? "alert alert-primary" : AlertaT3 == "Amarillo" && "alert alert-warning"} role="alert" height={41} sx={{ borderRadius: '0px' }} >
                  <Typography variant="h4" color='#000000' align="center" mt={-2} > {TituloT3} </Typography>
                </Box>
                <Box >
                  <Grid container height={50} mt={2} >
                    <Typography gutterBottom variant="h4" component="div" color='#000000' >
                      Producto: <Typography variant="h5" color='#fe001a' display="inline" > {data.Tanque5.Producto || ''} </Typography>
                    </Typography>
                  </Grid>
                  <Grid container height={50} mt={3} >
                    <Typography gutterBottom variant="h4" component="div" color='#000000' >
                      Nivel: <Typography variant="h5" color='#fe001a' display="inline" > {(data.Tanque5.Nivel || 0).toFixed(2)}  </Typography>L
                    </Typography>
                  </Grid>
                  {/* <Grid container heigh5={44} >
                  <Typography gutterBottom variant="h4" component="div" color='#000000' >
                    Temperatura:{(data.Tanque5.Temperatura || 0).toFixed(2)} C° */}
                  {/* </Typography>
                </Grid> */}
                  <Grid container height={50} >
                    <Typography gutterBottom variant="h4" component="div" color='#000000'  >
                      Agitación: <Typography variant="h5" color='#fe001a' display="inline" >{(data.Tanque5.RPM || 0)}  </Typography>RPM
                    </Typography>
                  </Grid>
                  <Grid container height={50} >
                    <Typography gutterBottom variant="h4" component="div" color='#000000' >
                      Fecha de llenado: <Typography variant="h5" color='#fe001a' display="inline" >  {(data.Tanque5.Fecha || '0000-00-00')}</Typography>
                    </Typography>
                  </Grid>
                </Box>
              </Grid>
            </Card>
          </Grid>
          {/*****Card [3,1]*****/}
          <Grid item xs={12} sm={3} md={4} ml={0} >
            <Card sx={{ width: '100%', height: '102%', mb:'8%', borderRadius: 0  }} >
              <Grid ml={2} mr={2} mt={1} >
                <Box sx={{ borderRadius: '0px', bgcolor: 'grey.400', display: 'grid' }} mt={-1} ml={-2} mr={-2} >
                  <Typography gutterBottom variant="h4" component="div" align="center" color='#000000' >
                    Jarabe Terminado 4
                  </Typography>
                </Box>
                <Box mb={-1} ml={-2} mr={-2} className={AlertaT4 == "Verde" ? "alert alert-success" : AlertaT4 == "Azul" ? "alert alert-primary" : AlertaT4 == "Amarillo" && "alert alert-warning"} role="alert" height={41} sx={{ borderRadius: '0px' }} >
                  <Typography variant="h4" color='#000000' align="center" mt={-2} > {TituloT4} </Typography>
                </Box>
                <Box >
                  <Grid container height={50} mt={2} >
                    <Typography gutterBottom variant="h4" component="div" color='#000000' >
                      Producto: <Typography variant="h5" color='#fe001a' display="inline" > {data.Tanque6.Producto || ''} </Typography>
                    </Typography>
                  </Grid>
                  <Grid container height={50} mt={3} >
                    <Typography gutterBottom variant="h4" component="div" color='#000000' >
                      Nivel: <Typography variant="h5" color='#fe001a' display="inline" > {(data.Tanque6.Nivel || 0).toFixed(2)}  </Typography>L
                    </Typography>
                  </Grid>
                  {/* <Grid container heigh5={44} >
                  <Typography gutterBottom variant="h4" component="div" color='#000000' >
                    Temperatura:{(data.Tanque6.Temperatura || 0).toFixed(2)} C° */}
                  {/* </Typography>
                </Grid> */}
                  <Grid container height={50} >
                    <Typography gutterBottom variant="h4" component="div" color='#000000' >
                      Agitación: <Typography variant="h5" color='#fe001a' display="inline" >  {(data.Tanque6.RPM || 0)} </Typography>RPM
                    </Typography>
                  </Grid>
                  <Grid container height={50} >
                    <Typography gutterBottom variant="h4" component="div" color='#000000' >
                      Fecha de llenado: <Typography variant="h5" color='#fe001a' display="inline" >  {(data.Tanque6.Fecha || '0000-00-00')}</Typography>
                    </Typography>
                  </Grid>
                </Box>
              </Grid>
            </Card>
          </Grid>
          {/*****Card [3,2]*****/}
          <Grid item xs={12} sm={3} md={4} ml={0}>
            <Card sx={{ width: '100%', height: '102%', mb:'8%', borderRadius: 0  }} >
              <Grid ml={2} mr={2} mt={1} >
                <Box sx={{ borderRadius: '0px', bgcolor: 'grey.400', display: 'grid' }} mt={-1} ml={-2} mr={-2} >
                  <Typography gutterBottom variant="h4" component="div" align="center" color='#000000' >
                    Jarabe Terminado 5
                  </Typography>
                </Box>
                <Box mb={-1} ml={-2} mr={-2} className={AlertaT5 == "Verde" ? "alert alert-success" : AlertaT5 == "Azul" ? "alert alert-primary" : AlertaT5 == "Amarillo" && "alert alert-warning"} role="alert" height={41} sx={{ borderRadius: '0px' }} >
                  <Typography variant="h4" color='#000000' align="center" mt={-2} > {TituloT5} </Typography>
                </Box>
                <Box >
                  <Grid container height={50} mt={2} >
                    <Typography gutterBottom variant="h4" component="div" color='#000000' >
                      Producto: <Typography variant="h5" color='#fe001a' display="inline" > {data.Tanque7.Producto || ''} </Typography>
                    </Typography>
                  </Grid>
                  <Grid container height={50} mt={3} >
                    <Typography gutterBottom variant="h4" component="div" color='#000000' >
                      Nivel: <Typography variant="h5" color='#fe001a' display="inline" > {(data.Tanque7.Nivel || 0).toFixed(2)}  </Typography>L
                    </Typography>
                  </Grid>
                  {/* <Grid container heigh5={44} >
                  <Typography gutterBottom variant="h4" component="div" color='#000000' >
                    Temperatura:{(data.Tanque7.Temperatura || 0).toFixed(2)} C° */}
                  {/* </Typography>
                </Grid> */}
                  <Grid container height={50} >
                    <Typography gutterBottom variant="h4" component="div" color='#000000' >
                      Agitación: <Typography variant="h5" color='#fe001a' display="inline" >  {(data.Tanque7.RPM || 0)} </Typography>RPM
                    </Typography>
                  </Grid>
                  <Grid container height={50} >
                    <Typography gutterBottom variant="h4" component="div" color='#000000' >
                      Fecha de llenado: <Typography variant="h5" color='#fe001a' display="inline" >  {(data.Tanque7.Fecha || '0000-00-00')}</Typography>
                    </Typography>
                  </Grid>
                </Box>
              </Grid>
            </Card>
          </Grid>
          {/*****Card [3,3]*****/}
          <Grid item xs={12} sm={3} md={4} ml={0} >
            <Card sx={{ width: '100%', height: '102%', mb:'8%', borderRadius: 0  }} >
              <Grid ml={2} mr={2} mt={1} >
                <Box sx={{ borderRadius: '0px', bgcolor: 'grey.400', display: 'grid' }} mt={-1} ml={-2} mr={-2} >
                  <Typography gutterBottom variant="h4" component="div" align="center" color='#000000' >
                    Jarabe Terminado 6
                  </Typography>
                </Box>
                <Box mb={-1} ml={-2} mr={-2} className={AlertaT6 == "Verde" ? "alert alert-success" : AlertaT6 == "Azul" ? "alert alert-primary" : AlertaT6 == "Amarillo" && "alert alert-warning"} role="alert" height={41} sx={{ borderRadius: '0px' }} >
                  <Typography variant="h4" color='#000000' align="center" mt={-2} > {TituloT6} </Typography>
                </Box>
                <Box >
                  <Grid container height={50} mt={2} >
                    <Typography gutterBottom variant="h4" component="div" color='#000000' >
                      Producto: <Typography variant="h5" color='#fe001a' display="inline" > {data.Tanque8.Producto || ''} </Typography>
                    </Typography>
                  </Grid>
                  <Grid container height={50} mt={3} >
                    <Typography gutterBottom variant="h4" component="div" color='#000000' >
                      Nivel: <Typography variant="h5" color='#fe001a' display="inline" > {(data.Tanque8.Nivel || 0).toFixed(2)}  </Typography>L
                    </Typography>
                  </Grid>
                  {/* <Grid container heigh5={44} >
                  <Typography gutterBottom variant="h4" component="div" color='#000000' >
                    Temperatura:{(data.Tanque8.Temperatura || 0).toFixed(2)} C° */}
                  {/* </Typography>
                </Grid> */}
                  <Grid container height={50} >
                    <Typography gutterBottom variant="h4" component="div" color='#000000' >
                      Agitación: <Typography variant="h5" color='#fe001a' display="inline" >  {(data.Tanque8.RPM || 0)} </Typography>RPM
                    </Typography>
                  </Grid>
                  <Grid container height={50} >
                    <Typography gutterBottom variant="h4" component="div" color='#000000' >
                      Fecha de llenado: <Typography variant="h5" color='#fe001a' display="inline" >  {(data.Tanque8.Fecha || '0000-00-00')}</Typography>
                    </Typography>
                  </Grid>
                </Box>
              </Grid>
            </Card>
          </Grid>
          {/*****Card [4,1]*****/}
          <Grid item xs={12} sm={3} md={4} ml={0} >
            <Card sx={{ width: '100%', height: '102%', mb:'8%', borderRadius: 0  }} >
              <Grid ml={2} mr={2} mt={1} >
                <Box sx={{ borderRadius: '0px', bgcolor: 'grey.400', display: 'grid' }} mt={-1} ml={-2} mr={-2} >
                  <Typography gutterBottom variant="h4" component="div" align="center" color='#000000' >
                    Jarabe Terminado 7
                  </Typography>
                </Box>
                <Box mb={-1} ml={-2} mr={-2} className={AlertaT7 == "Verde" ? "alert alert-success" : AlertaT7 == "Azul" ? "alert alert-primary" : AlertaT7 == "Amarillo" && "alert alert-warning"} role="alert" height={41} sx={{ borderRadius: '0px' }} >
                  <Typography variant="h4" color='#000000' align="center" mt={-2} > {TituloT7} </Typography>
                </Box>
                <Box >
                  <Grid container height={50} mt={2} >
                    <Typography gutterBottom variant="h4" component="div" color='#000000' >
                      Producto: <Typography variant="h5" color='#fe001a' display="inline" > {data.Tanque9.Producto || ''} </Typography>
                    </Typography>
                  </Grid>
                  <Grid container height={50} mt={3} >
                    <Typography gutterBottom variant="h4" component="div" color='#000000' >
                      Nivel: <Typography variant="h5" color='#fe001a' display="inline" > {(data.Tanque9.Nivel || 0).toFixed(2)}  </Typography>L
                    </Typography>
                  </Grid>
                  {/* <Grid container heigh5={44} >
                  <Typography gutterBottom variant="h4" component="div" color='#000000' >
                    Temperatura:{(data.Tanque9.Temperatura || 0).toFixed(2)} C° */}
                  {/* </Typography>
                </Grid> */}
                  <Grid container height={50} >
                    <Typography gutterBottom variant="h4" component="div" color='#000000' >
                      Agitación: <Typography variant="h5" color='#fe001a' display="inline" >  {(data.Tanque9.RPM || 0)} </Typography>RPM
                    </Typography>
                  </Grid>
                  <Grid container height={50} >
                    <Typography gutterBottom variant="h4" component="div" color='#000000' >
                      Fecha de llenado: <Typography variant="h5" color='#fe001a' display="inline" >  {(data.Tanque9.Fecha || '0000-00-00')}</Typography>
                    </Typography>
                  </Grid>
                </Box>
              </Grid>
            </Card>
          </Grid>
          {/*****Card [4,1]*****/}
          <Grid item xs={12} sm={3} md={4} ml={0} >
            <Card sx={{ width: '100%', height: '102%', mb:'8%', borderRadius: 0  }} >
              <Grid ml={2} mr={2} mt={1} >
                <Box sx={{ borderRadius: '0px', bgcolor: 'grey.400', display: 'grid' }} mt={-1} ml={-2} mr={-2} >
                  <Typography gutterBottom variant="h4" component="div" align="center" color='#000000' >
                    Jarabe Terminado 8
                  </Typography>
                </Box>
                <Box mb={-1} ml={-2} mr={-2} className={AlertaT7 == "Verde" ? "alert alert-success" : AlertaT7 == "Azul" ? "alert alert-primary" : AlertaT7 == "Amarillo" && "alert alert-warning"} role="alert" height={41} sx={{ borderRadius: '0px' }} >
                  <Typography variant="h4" color='#000000' align="center" mt={-2} > {TituloT7} </Typography>
                </Box>
                <Box >
                  <Grid container height={50} mt={2} >
                    <Typography gutterBottom variant="h4" component="div" color='#000000' >
                      Producto: <Typography variant="h5" color='#fe001a' display="inline" > {data.Tanque10.Producto || ''} </Typography>
                    </Typography>
                  </Grid>
                  <Grid container height={50} mt={3} >
                    <Typography gutterBottom variant="h4" component="div" color='#000000' >
                      Nivel: <Typography variant="h5" color='#fe001a' display="inline" > {(data.Tanque10.Nivel || 0).toFixed(2)}  </Typography>L
                    </Typography>
                  </Grid>
                  {/* <Grid container heigh5={44} >
                  <Typography gutterBottom variant="h4" component="div" color='#000000' >
                    Temperatura:{(data.Tanque9.Temperatura || 0).toFixed(2)} C° */}
                  {/* </Typography>
                </Grid> */}
                  <Grid container height={50} >
                    <Typography gutterBottom variant="h4" component="div" color='#000000' >
                      Agitación: <Typography variant="h5" color='#fe001a' display="inline" >  {(data.Tanque10.RPM || 0)} </Typography>RPM
                    </Typography>
                  </Grid>
                  <Grid container height={50} >
                    <Typography gutterBottom variant="h4" component="div" color='#000000' >
                      Fecha de llenado: <Typography variant="h5" color='#fe001a' display="inline" >  {(data.Tanque10.Fecha || '0000-00-00')}</Typography>
                    </Typography>
                  </Grid>
                </Box>
              </Grid>
            </Card>
          </Grid>
          {/*****Card [4,2]*****/}
          <Grid item xs={12} sm={3} md={4} ml={0} >
            <Card sx={{ width: '100%', height: '102%', mb:'8%', borderRadius: 0  }} >
              <Grid ml={2} mr={2} mt={1} >
                <Box sx={{ borderRadius: '0px', bgcolor: 'grey.400', display: 'grid' }} mt={-1} ml={-2} mr={-2} >
                  <Typography gutterBottom variant="h4" component="div" align="center" color='#000000' >
                    Jarabe Terminado 10
                  </Typography>
                </Box>
                <Box mb={-1} ml={-2} mr={-2} className={AlertaT10 == "Verde" ? "alert alert-success" : AlertaT10 == "Azul" ? "alert alert-primary" : AlertaT10 == "Amarillo" && "alert alert-warning"} role="alert" height={41} sx={{ borderRadius: '0px' }} >
                  <Typography variant="h4" color='#000000' align="center" mt={-2} > {AlTituloT10} </Typography>
                </Box>
                <Box >
                  <Grid container height={50} mt={2} >
                    <Typography gutterBottom variant="h4" component="div" color='#000000' >
                      Producto: <Typography variant="h5" color='#fe001a' display="inline" > {data.Tanque12.Producto || ''} </Typography>
                    </Typography>
                  </Grid>
                  <Grid container height={50} mt={3} >
                    <Typography gutterBottom variant="h4" component="div" color='#000000' >
                      Nivel: <Typography variant="h5" color='#fe001a' display="inline" > {(data.Tanque12.Nivel || 0).toFixed(2)}  </Typography>L
                    </Typography>
                  </Grid>
                  {/* <Grid container heigh5={44} >
                  <Typography gutterBottom variant="h4" component="div" color='#000000' >
                    Temperatura:{(data.Tanque12.Temperatura || 0).toFixed(2)} C° */}
                  {/* </Typography>
                </Grid> */}
                  <Grid container height={50} >
                    <Typography gutterBottom variant="h4" component="div" color='#000000' >
                      Agitación: <Typography variant="h5" color='#fe001a' display="inline" >  {(data.Tanque12.RPM || 0)} </Typography>RPM
                    </Typography>
                  </Grid>
                  <Grid container height={50} >
                    <Typography gutterBottom variant="h4" component="div" color='#000000' >
                      Fecha de llenado: <Typography variant="h5" color='#fe001a' display="inline" >  {(data.Tanque12.Fecha || '0000-00-00')}</Typography>
                    </Typography>
                  </Grid>
                </Box>
              </Grid>
            </Card>
          </Grid>
        </Grid>
      </Box>
      <Progress datos={data} />
    </>
  )
}
