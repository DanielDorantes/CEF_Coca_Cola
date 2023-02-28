import { Alert, AlertTitle, Box, Card, Divider, FormControl, FormControlLabel, Grid, IconButton, Menu, MenuItem, Modal, Paper, Radio, RadioGroup, Table, TableBody, TableCell, TableContainer, TableRow, TextField, Tooltip, Typography } from '@mui/material'
import Stack from "@mui/material/Stack";
import React, { useEffect, useMemo, useState } from 'react'

import ReactECharts from "echarts-for-react";
import { CProgress, CProgressBar } from '@coreui/react';
import { ProgresBar } from 'layouts/producionElementos/ProgresBar';


import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { SavePDF } from 'assets/PDF/SavePDF';
import { SavePDFTableAguaConsumoDirario, SavePDFTableAguaConsumoArea } from 'assets/PDF/SavePDF';
import { SaveExcel } from 'assets/EXCEL/SaveExcel';
import MDBox from 'components/MDBox';
import MDButton from 'components/MDButton';
import { DatePicker, LocalizationProvider } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { es } from 'date-fns/locale';
import moment from 'moment';
import DataTable from 'examples/Tables/DataTable';
import { SavePDFTable } from 'assets/PDF/SavePDF';
import Button from '@mui/material/Button';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import ReplayIcon from '@mui/icons-material/Replay';
import ReactTooltip from 'react-tooltip'


export const RegistrosProduccion = ({ turno, ProduccionTurnos = {
  produccion: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  RechazosT1: 0,
  RechazosT2: 0,
  IndiceLlenadoT1: 0,
  IndiceLlenadoT2: 0,
  RendimientoT1: 0,
  RendimientoT2: 0
}, datosVelocidad = { turno1_Danger1: '00:00', turno1_Success1: '00:00', turno1_Warning1: '00:00', turno2_Danger2: '00:00', turno2_Success2: '00:00', turno2_Warning2: '00:00', turno2_outLine: '00:00', turno1_outLine: '00:00' } }) => {
  const { RechazosT1, RechazosT2, IndiceLlenadoT1, IndiceLlenadoT2, RendimientoT1, RendimientoT2 } = ProduccionTurnos;
  const produccion = ProduccionTurnos.produccion || [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  //{turno1_Danger1,turno1_Success1,turno1_Warning1,turno2_Danger2,turno2_Success2,turno2_Warning2}
  //datos={wsData.statusVelocidadTiempos}
  const { turno1_Danger1, turno1_Success1, turno1_Warning1, turno2_Danger2, turno2_Success2, turno2_Warning2, turno1_outLine, turno2_outLine } = datosVelocidad;
  const [Turno, setTurno] = useState(turno);
  const styleTable = {
    position: 'absolute',
    top: '10%',
    left: '30%',
    transform: 'translate(-20%, 0%)',
    width: '75%',
    height: '75%',
    bgcolor: 'background.paper',
    //border: '2px solid #000',
    borderRadius: '30px',
    //boxShadow: 24,
    //p: 4,
  };




  const wsUrl = process.env.REACT_APP_AUTH_URL_WEBSOCKET;//192.168.100.13

  const [anchorEl, setAnchorEl] = useState(null);

  const [fecha, setFecha] = useState(moment(Date.now()));
  const [Data, setDate] = useState([]);

  const open = Boolean(anchorEl);

  const handleClick = (e) => {
    //console.log(event)
    //alert(event);  
    setAnchorEl(e.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const ReporteProduccion = () => setModal(true);

  const handleClose2 = () => setModal(false);

  //const [turnoActual, setTurnoActual] = useState(0);

  const [modal, setModal] = useState(false);
  const [tiempoStatusVelocidad, setTiempoStatusVelocidad] = useState({
    danger1: 0,
    success1: 0,
    warning1: 0,

    danger2: 0,
    success2: 0,
    warning2: 0
  });


  let datos2 = {};

  const rechazos = [RechazosT1, RechazosT2]
  const indiceLlenado = [IndiceLlenadoT1, IndiceLlenadoT2]
  const rendimiento = [RendimientoT1, RendimientoT2]

  const datosPorTurno = turno === 1 ? [produccion[0], produccion[1], produccion[2], produccion[3], produccion[4], produccion[5], produccion[6], produccion[7]] : [produccion[8], produccion[9], produccion[10], produccion[11], produccion[12], produccion[13], produccion[14], produccion[15]];


  const [showRefresh, setShowRefresh] = useState(true);

  /*
//Danger1=msg.turno1[0].tiempo || 0;//danger
//Success1=msg.turno1[1].tiempo || 0;//success
//Warning1=msg.turno1[2].tiempo || 0;//warning

//Danger2=msg.turno2[0].tiempo || 0;//danger
//Success2=msg.turno2[1].tiempo || 0;//success
//Warning2=msg.turno2[2].tiempo || 0;//warning
          */

  //const Danger1='00:00';//tiempoStatusVelocidad.turno1[0].tiempo === undefined?0:tiempoStatusVelocidad.turno1[0].tiempo;//danger
  //const Success1='01:00';//tiempoStatusVelocidad.turno1[1].tiempo === undefined?0:tiempoStatusVelocidad.turno1[1].tiempo;//success
  //const Warning1='02:00';//tiempoStatusVelocidad.turno1[2].tiempo === undefined?0:tiempoStatusVelocidad.turno1[2].tiempo;//warning

  //const Danger2='00:15';//tiempoStatusVelocidad.turno2[0].tiempo === undefined?0:tiempoStatusVelocidad.turno2[0].tiempo;//danger
  //const Success2='2:00';//tiempoStatusVelocidad.turno2[1].tiempo === undefined?0:tiempoStatusVelocidad.turno2[1].tiempo;//success
  //const Warning2='5:45';//tiempoStatusVelocidad.turno2[2].tiempo === undefined?0:tiempoStatusVelocidad.turno2[2].tiempo;//warning


  const rows = [
    {
      name: 'Cajas Unidad',
      value: turno === 1 ? ((produccion[0] + produccion[1] + produccion[2] + produccion[3] + produccion[4] + produccion[5] + produccion[6] + produccion[7]) * 3.346248).toFixed(0) :
        ((produccion[9] + produccion[10] + produccion[11] + produccion[12] + produccion[13] + produccion[14] + produccion[15]) * 3.346248).toFixed(0)
    }
    , {
      name: 'Produccion Total',
      value: turno === 1 ? (produccion[0] + produccion[1] + produccion[2] + produccion[3] + produccion[4] + produccion[5] + produccion[6] + produccion[7]) :
        (produccion[9] + produccion[10] + produccion[11] + produccion[12] + produccion[13] + produccion[14] + produccion[15])
    }
    , {
      name: 'Rechazos',
      value: turno === 1 ? (rechazos[0] || 0) :
        (rechazos[1] || 0)
    }
    , {
      name: 'Indice de llenado',
      value: turno === 1 ? (indiceLlenado[0] || 0).toFixed(2) + ' %' :
        (indiceLlenado[1] || 0).toFixed(2) + ' %'
    }
    , {
      name: 'Rendimineto',
      value: turno === 1 ? (rendimiento[0] || 0).toFixed(2) + ' %' :
        (rendimiento[1] || 0).toFixed(2) + ' %'
    }
  ]

  const option = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      },
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: turno === 1 ? ['6:30-7:30', '7:30-8:30', '8:30-9:30', '9:30-10:30', '10:30-11:30', '11:30-12:30', '12:30-13:30', '13:30-14:30'] :
        ['14:30-15:30', '15:30-16:30', '16:30-17:30', '17:30-18:30', '18:30-19:30', '19:30-20:30', '20:30-21:30', '21:30-22:30'],
    },
    yAxis: {
      type: 'value',
      axisLine: {
        show: false
      }
    },
    series: [
      {
        name: 'Cajas físicas',
        barWidth: '60%',
        data: datosPorTurno.map(item => (
          {
            value: item,
            itemStyle: {
              color: item > 660 ? '#a90000' : '#0b00a9'
            }
          })),
        type: 'bar'
      }

    ]
  };
  let datos;
  let url5 = `http://${wsUrl}:1880/api/getProduccionPCCL5/${Turno}/${fecha.format('YYYY-MM-DD')}`;
  const reporte = async () => {
    //console.log(url);
    try {
      const response3 = await fetch(url5);
      datos = await response3.json();
      //console.log(url);
      //console.log(datos)
      //fill();
      //enableRefresh();
      setDate(datos);
      //console.log(DatosActual);
      //disableNoData();

    } catch (error) {
      console.log('Hay un error: ' + error);
    }
  }
  const handleChangeTurno = (event) => {
    setTurno(event.target.value);
    //console.log(event);
  }
  //url
  useEffect(reporte, [url5])

  const dataTableData = {
    columns: [
      { Header: "Área", accessor: "Area" },
      { Header: "Hora (hh:mm)", accessor: "hora" },
      { Header: "Tiempo de produccion (hh:mm)", accessor: "TiempoProduccion" },
      { Header: "Cajas fisicas (unidades)", accessor: "CajasFisicas", width: "20%" },
      { Header: "Cajas unidad (unidades)", accessor: "CajasUnidad", width: "25%" },
      { Header: "Rechazos (unidades)", accessor: "Rechazos" },
      { Header: "Indice de llenado (%)", accessor: "IndiceCalidad", width: "7%" },
    ],

    rows: Data,
  };

  const DownloadPdf = (data) => {
    //import { SavePDFTable } from "assets/PDF/SavePDF";
    //alert(event);
    console.log("inicializando la impresion del archivo");
    SavePDFTable(
      data
      , `REPORTE DE CONSUMO DE PRODUCCION PCC5 ${moment(Date.now()).format("DD-MM-YYYY")}`,
      fecha.format('DD-MM-YYYY'),
      Turno
    );
    console.log("tarea finalizada");
  }

  const refrescarTabla = () => reporte();
  const setRefesh = () => moment(fecha).format("YYYY-MM-DD") === moment(Date.now()).format("YYYY-MM-DD") ? setShowRefresh(true) : setShowRefresh(false);
  useEffect(setRefesh, [fecha]);
  //moment(fecha).format("YYYY-MM-DD")===moment(Date.now()).format("YYYY-MM-DD")?datosActuales:getDatosConsumoAgua,
  //setShowRefresh(false)   
  return (
    <>
      <Grid item xs={12}>
        <Stack mt={2} direction={'row'} alignItems="center" spacing='5%'>
          <Typography ml={'5%'} variant="subtitle2" color="secondary">  {"Turno " + turno} </Typography>
          <Typography variant="subtitle2" color="secondary"> Horario {turno === 1 ? "6:30-14:30" : "14:30-22:30"}
            <ReactTooltip
              id='btnReporteProduccion'
              place='bottom'
              //type='info'
              effect='solid'
              backgroundColor='#5596F9'
            >
              Reporte de producción
            </ReactTooltip>
            <IconButton data-tip data-for='btnReporteProduccion' aria-label="delete" size="large" onClick={ReporteProduccion}>
              <SaveAltIcon fontSize="inherit" />
            </IconButton>

          </Typography>
        </Stack>
        <Stack mt={4} direction={'row'} alignItems="center" spacing={10}>
          <MDBox
            pb={2}
            px={2}
            display="flex"
            flexDirection={{ xs: "column", sm: "row" }}
            mt="auto"
          >
            {/*<MDBox width={{ xs: "100%", sm: "100%" }} textAlign="right" mt={{ xs: 2, sm: "auto" }}>
            <MDButton color="light" onClick={ ReporteProduccion }>Reporte</MDButton>
          </MDBox>*/}
          </MDBox>
        </Stack>
      </Grid>
      <ReactECharts option={option} />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.name}>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell style={{ width: 160 }} align="right">
                  {row.value}
                </TableCell>
                <TableCell style={{ width: 160 }} align="right"></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <ProgresBar turno={turno} />
      <Divider />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
          <TableBody>
            <TableRow key={0}>
              <TableCell style={{ width: 160 }} align="right">
                <Alert severity="success"><AlertTitle>Velocidad optima</AlertTitle></Alert>
              </TableCell>
              {/*
const Danger1=msg.turno1[0].tiempo || 0;//danger
const Success1=msg.turno1[1].tiempo || 0;//success
const Warning1=msg.turno1[2].tiempo || 0;//warning

const Danger2=msg.turno2[0].tiempo || 0;//danger
const Success2=msg.turno2[1].tiempo || 0;//success
const Warning2=msg.turno2[2].tiempo || 0;//warning
          */}
              <TableCell style={{ width: 160 }} align="right">
                {turno == 1 ? turno1_Success1 : turno2_Success2} Hrs
              </TableCell>
              <TableCell style={{ width: 160 }} align="right"></TableCell>
            </TableRow>
            <TableRow key={1}>
              <TableCell component="th" scope="row">
                <Alert severity="warning"><AlertTitle>Velocidad baja</AlertTitle></Alert>
              </TableCell>
              <TableCell style={{ width: 160 }} align="right">
                {turno == 1 ? turno1_Warning1 : turno2_Warning2} Hrs
              </TableCell>
              <TableCell style={{ width: 160 }} align="right"></TableCell>
            </TableRow>
            <TableRow key={2}>
              <TableCell component="th" scope="row">
                <Alert severity="error"><AlertTitle>Paro critico</AlertTitle></Alert>
              </TableCell>
              <TableCell style={{ width: 160 }} align="right">
                {turno == 1 ? turno1_Danger1 : turno2_Danger2} Hrs
              </TableCell>
              <TableCell style={{ width: 160 }} align="right"></TableCell>
            </TableRow>

            <TableRow key={2}>
              <TableCell component="th" scope="row">
                <Alert severity="error"><AlertTitle>Sin señal</AlertTitle></Alert>
              </TableCell>
              <TableCell style={{ width: 160 }} align="right">
                {turno == 1 ? turno1_outLine : turno2_outLine} Hrs
              </TableCell>
              <TableCell style={{ width: 160 }} align="right"></TableCell>
            </TableRow>

          </TableBody>
        </Table>
      </TableContainer>
      <Modal
        open={modal}
        onClose={handleClose2}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <MDBox sx={styleTable} mb={3}>
          <Card>
            <MDBox p={3} lineHeight={3}>
              <Grid container>
                <Grid item xs={10}>
                  <h4>Reporte de produccion</h4>
                </Grid>
                <ReactTooltip
                  id='btnRefresh'
                  place='bottom'
                  //type='info'
                  effect='solid'
                  backgroundColor='#5596F9'
                >
                  Recargar datos
                </ReactTooltip>
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
                  data-tip data-for='btnDownload'
                  aria-label="FileDownload"
                  aria-controls={open ? 'basic-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? 'true' : undefined}
                  onClick={handleClick}
                  ml='80%'
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
                  <MenuItem onClick={() => alert('imprimir Excel')}>Excel (.xlsx)</MenuItem>
                  <MenuItem onClick={() => DownloadPdf(dataTableData.rows)}>PDF (.pdf)</MenuItem>
                </Menu>

              </Grid>
              <Grid container spacing={2} sx={{ mb: 2 }}>
                <Grid item>
                  <LocalizationProvider dateAdapter={AdapterDateFns} locale={es}>
                    <DatePicker
                      label="Fecha"
                      value={fecha}
                      onChange={(newValue) => setFecha(moment(newValue))}
                      renderInput={(params) => <TextField {...params} size="small" />}
                    />
                  </LocalizationProvider>
                </Grid>
                <Grid item>
                  <FormControl>
                    <RadioGroup
                      row
                      aria-labelledby="demo-controlled-radio-buttons-group"
                      name="controlled-radio-buttons-group"
                      value={Turno}
                      onChange={handleChangeTurno}
                    >
                      <FormControlLabel value="1" control={<Radio />} label="Turno 1" />
                      <FormControlLabel value="2" control={<Radio />} label="Turno 2" />
                      <IconButton
                        data-tip data-for='btnRefresh'
                        aria-label="delete"
                        onClick={() => refrescarTabla()}
                        disabled={!showRefresh}
                        sx={{
                          opacity: showRefresh ? 1 : 0
                        }}
                      >
                        <ReplayIcon />
                      </IconButton>
                    </RadioGroup>
                  </FormControl>
                </Grid>
              </Grid>
            </MDBox>
            <DataTable table={dataTableData} />
          </Card>
        </MDBox>
        {/*</Box>*/}
      </Modal>
    </>
  )
}
