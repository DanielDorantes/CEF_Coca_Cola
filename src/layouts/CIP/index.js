import React, { useState, useRef, useEffect } from 'react'

import { Box, Card, FormControl, Grid, IconButton, InputLabel, Menu, MenuItem, OutlinedInput, Select, Stack, Typography } from '@mui/material'

import moment from 'moment';
import MDBox from 'components/MDBox';
import ReactECharts from "echarts-for-react";
import { Horas } from '../../components/Elementos/Horas'
import 'dayjs/locale/es';
import { Calendar } from 'react-calendar';
import '../CIP/Calendar.css'
import { SaveCipPDF } from 'assets/PDF/SavePDF';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import ReactTooltip from 'react-tooltip';

// import echarts from 'echarts';


// import { SavePDFTableAguaConsumoDirario, SavePDFCip } from 'assets/PDF/SavePDF';


export const CIP = () => {

  const ws = useRef(null);

  const wsUrl = process.env.REACT_APP_AUTH_URL_WEBSOCKET;//192.168.100.13

  // const [fecha, setFecha] = useState(Date.now());
  const [fecha, setFecha] = useState(new Date());

  const [cipEstado, setCipEstado] = useState('todos');

  const [urlTotalArrays, setUrlTotalArrays] = useState(`http://${wsUrl}:1880/getcipdiaozono/${moment(fecha).format("YYYY-MM-DD")}`);

  const [urlApiFolio, setUrlApiFolio] = useState(`http://${wsUrl}:1880/getozonofolio/${moment(fecha).format("YYYY-MM-DD")}`);

  const initialData = {
    Ozono: {
      Usuario: 'VISUAL',
      OzonoLavadora: '',
      OzonoTipo: '',
      OzonoSecuencia: '',
      OzonoTiempoSecuencia: 0,
      OzonoHoras: 0,
      OzonoMinutos: 0,
      OzonoSalida: 0,
      OzonoRetorno: 0,
      FechaOzonoActivacion: 0,
      FolioOzono: ''

    },
    Caliente: {
      Usuario: 'VISUAL',
      CalienteLavadora: '',
      CalienteTipo: '',
      CalienteSecuencia: '',
      CalienteTiempoSecuencia: 0,
      CalienteHoras: 0,
      CalienteMinutos: 0,
      CalienteTemperaturaRetorno: 0,
      CalienteTemperaturaSalida: 0,
      CalienteConductividad: 0,
      CalienteTempSecuencia: 0,
      FechaCalienteActivacion: '',
      FolioCaliente: ''
    }
    , Datos: []
  }


  const [cipArray, setCipArray] = useState(initialData);

  const [arreglo, setArreglo] = useState(initialData);

  const [cip, setCip] = useState('ozono');

  const [folio, setFolio] = useState([]);
  // Eliminra el primer folio ya que en la api trae un folio de dia anterior
  const foliosReales = folio.slice(1);

  const CipActual = () => {
    //alert('por los jejes')
    ws.current = new WebSocket(`ws://${wsUrl}:3008`);
    ws.current.onopen = () => console.log("ws opened");
    ws.current.onclose = () => console.log("ws closed");

    const wsCurrent = ws.current;
    ws.current.onmessage = function (event) {
      setCipArray(JSON.parse(event.data));
    };

    return () => {
      wsCurrent.close();
    };
  }

  const folios = async () => {
    try {
      const response = await fetch(urlApiFolio);
      setFolio(await response.json());
      // console.log(urlApiFolio);
    } catch (error) {
      console.log('Hay un error: ' + error);
    }
  }

  useEffect(folios, [urlApiFolio])

  const total = async () => {
    try {
      const response = await fetch(`${urlTotalArrays}/${cipEstado}`);
      setArreglo(await response.json());
    } catch (error) {
      console.log('Hay un error: ' + error);
    }
  }

  useEffect(total, [urlTotalArrays + cipEstado]);//el que esta dentro es una funcion, no es la variable


  useEffect(CipActual, []);


  // useEffect(() => {
  //   setCipEstado('todos');
  //   // setUrlTanques(`http://${wsUrl}:1880/gettanques/${moment(fecha).format("YYYY-MM-DD")}`);
  //   setCip(cip)
  // }, [fecha])

  useEffect(() => {
    setCipEstado('todos');
    setUrlTotalArrays(`http://${wsUrl}:1880/getcipdiaozono/${moment(fecha).format("YYYY-MM-DD")}`);
    setCip(cip)
  }, [fecha])

  useEffect(() => {
    setCipEstado('todos');
  }, [cip])


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

  const colors = ['#0b00a9', '#a90000', ' #a90fff', '#1ace44'];
  const option = {
    color: colors,
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross'
      }
    },
    grid: {
      width: '60%'
    },
    legend: {
      data: cip === 'caliente' ? ['Retorno °C', 'Salida °C', 'Activacion', 'Conductividad'] : ['Retorno PPM', 'Salida PPM', 'Activacion']
    },
    xAxis: [
      {
        type: 'category',
        axisTick: {
          alignWithLabel: true
        },
        // prettier-ignore
        data: arreglo.Datos.map(({ Fecha }) => (Fecha.substr(11, 5))),
      }
    ],
    yAxis: [
      {
        type: 'value',
        name: cip === 'caliente' ? 'Retorno °C' : 'Retorno PPM',
        position: 'left',
        alignTicks: true,
        axisLine: {
          show: true,
          lineStyle: {
            color: colors[0]
          }
        },
        axisLabel: {
          formatter: cip === 'caliente' ? '{value} C°' : '{value} PPM'
        }
      },
      {
        type: 'value',
        name: cip === 'caliente' ? 'Salida °C' : 'Salida PPM',
        position: 'right',
        alignTicks: true,
        offset: 68,
        axisLine: {
          show: true,
          lineStyle: {
            color: colors[1]
          }
        },
        axisLabel: {
          formatter: cip === 'caliente' ? '{value} C°' : '{value} PPM'
        }
      },
      {
        type: 'value',
        name: 'Activacion',
        position: 'right',
        alignTicks: true,
        axisLine: {
          show: true,
          lineStyle: {
            color: colors[3]
          }
        },
        axisLabel: {
          formatter: '{value}'
        }
      },
      {
        type: 'value',
        name: 'Conductividad',
        position: 'right',
        alignTicks: true,
        offset: 150,
        axisLine: {
          show: true,
          lineStyle: {
            color: colors[2]
          }
        },
        // axisLabel: {
        //   formatter: cip === 'caliente' ? '{value} ' : ''
        // }
      }
    ],
    series: [
      {
        // label: 'Temperatura_Retorno',
        name: cip === 'caliente' ? 'Retorno °C' : 'Retorno PPM',
        data: cip === 'caliente' ? arreglo.Datos.map(({ Temperatura_Retorno }) => (Temperatura_Retorno)) || [] : arreglo.Datos.map(({ Ozono_ppm_Retorno }) => (Ozono_ppm_Retorno)) || [],
        type: 'line',
      },
      {
        // label: 'Temperatura_Salida',
        name: cip === 'caliente' ? 'Salida °C' : 'Salida PPM',
        // barWidth: '60%',
        yAxisIndex: 1,
        data: cip === 'caliente' ? arreglo.Datos.map(({ Temperatura_Salida }) => (Temperatura_Salida)) || [] : arreglo.Datos.map(({ Ozono_ppm_Salida }) => (Ozono_ppm_Salida)) || [],
        type: 'line',
      },
      {
        name: 'Conductividad',
        // barWidth: '60%',
        yAxisIndex: 3,
        data: cip === 'caliente' ? arreglo.Datos.map(({ Conductividad }) => (Conductividad)) || [] : [],
        type: 'line',
      },
      {
        name: 'Activacion',
        // barWidth: '60%',
        yAxisIndex: 2,
        data: cip === 'caliente' ? arreglo.Datos.map(({ ValorActivacion }) => (ValorActivacion)) || [] : arreglo.Datos.map(({ ValorActivacion }) => (ValorActivacion)) || [],
        type: 'line',
      }


    ]
  };

  const Consulta = () => {
    console.log('Area(s): ' + cip);
    console.log('Fecha: ' + moment(fecha).format('YYYY-MM-DD'));
    //console.log('Fecha: ' + fecha);
  }

  useEffect(() => Consulta, [cip + fecha])

  const handleChangeGraf = (event) => {
    // setCip(event.target.value)
    // event.target.value === 'ozono' ? setUrlApiArrays(`http://${wsUrl}:1880/getcipozono`) : setUrlApiArrays(`http://${wsUrl}:1880/getcipcaliente`)  
    event.target.value === 'ozono' ? setUrlApiFolio(`http://${wsUrl}:1880/getozonofolio/${moment(fecha).format("YYYY-MM-DD")}`) : setUrlApiFolio(`http://${wsUrl}:1880/getcalientefolio/${moment(fecha).format("YYYY-MM-DD")}`)
    event.target.value === 'ozono' ? setUrlTotalArrays(`http://${wsUrl}:1880/getcipdiaozono/${moment(fecha).format("YYYY-MM-DD")}`) : setUrlTotalArrays(`http://${wsUrl}:1880/getcipdiacaliente/${moment(fecha).format("YYYY-MM-DD")}`)
    setCip(event.target.value)

  }

  const handleChangeDate = (event) => {
    console.log(event)
    // setFecha(new Date(moment(event).toDate()));
    setFecha(new Date(event));

  }


  const OzonoHora = cipEstado === 'todos' ? (cipArray.Ozono.OzonoHoras >= 10 ? cipArray.Ozono.OzonoHoras : '0' + cipArray.Ozono.OzonoHoras) : (arreglo.Datos[arreglo.Datos.length - 1].Horas >= 10 ? arreglo.Datos[arreglo.Datos.length - 1].Horas : '0' + arreglo.Datos[arreglo.Datos.length - 1].Horas);
  const OzonoMinuto = cipEstado === 'todos' ? (cipArray.Ozono.OzonoMinutos >= 10 ? cipArray.Ozono.OzonoMinutos : '0' + cipArray.Ozono.OzonoMinutos) : (arreglo.Datos[arreglo.Datos.length - 1].Minutos >= 10 ? arreglo.Datos[arreglo.Datos.length - 1].Minutos : '0' + arreglo.Datos[arreglo.Datos.length - 1].Minutos);

  const CalienteHora = cipEstado === 'todos' ? (cipArray.Caliente.CalienteHoras >= 10 ? cipArray.Caliente.CalienteHoras : '0' + cipArray.Caliente.CalienteHoras) : (arreglo.Datos[arreglo.Datos.length - 1].Horas >= 10 ? arreglo.Datos[arreglo.Datos.length - 1].Horas : '0' + arreglo.Datos[arreglo.Datos.length - 1].Horas);
  const CalienteMinuto = cipEstado === 'todos' ? (cipArray.Caliente.CalienteMinutos >= 10 ? cipArray.Caliente.CalienteMinutos : '0' + cipArray.Caliente.CalienteMinutos) : (arreglo.Datos[arreglo.Datos.length - 1].Minutos >= 10 ? arreglo.Datos[arreglo.Datos.length - 1].Minutos : '0' + arreglo.Datos[arreglo.Datos.length - 1].Minutos);

  /*-----------------------------------------------------------------------*/

  const [chartRef, setChartRef] = useState()//useRef();

  const ReporteGrafica = () => {
    const ref = chartRef.getEchartsInstance();
    console.log("inicializando la impresion del archivo");
    SaveCipPDF(ref, moment(fecha).format("YYYY-MM-DD"), cipArray, cipEstado, cip, arreglo);
    console.log("tarea finalizada");
  }

  /*-----------------------------------------------------------------------*/


  // console.log(fecha);
  // console.log('Folio: '+folio);
  // console.log('CalienteTemperaturaSalida :'+ data.Caliente.CalienteTemperaturaSalida);
  // console.log('COMENTARIO '+cipArray.Ozono.USUARIO)
  // console.log(folio[0].Folio)
  // console.log(cipArray);
  // console.log(arreglo);
  // console.log(arreglo.Datos[arreglo.Datos.length-1]);
  // console.log(arreglo.Datos);
  // console.log(arreglo.Datos.map(({ Ozono_ppm_Salida }) => (Ozono_ppm_Salida)));
  // console.log(arreglo.Datos.map(({ Temperatura_Salida }) => (Temperatura_Salida)));
  // console.log(cipArray);


  return (
    <>
      <Box>
        <Grid container spacing={2} columns={{ md: 16 }} >
          <Grid md={4} >
            <MDBox mr={2}>
              <Card sx={{ height: "100%" }}>
                <MDBox
                  display="inline"
                  justifyContent="space-between"
                  pt={6} pb={8} px={2} mb={"52%"}>
                  <InputLabel id="demo-multiple-name-label" >Fecha</InputLabel>
                  <Stack spacing={1} alignItems="left" >
                    <Grid align="center">
                      <Calendar
                        // value={moment(fecha).toDate()}
                        value={fecha}
                        onChange={handleChangeDate}
                      />
                    </Grid>

                    <FormControl sx={{ width: "auto" }} >
                      <InputLabel id="demo-multiple-name-label">Area</InputLabel>
                      <Select
                        displayEmpty
                        value={cip}
                        onChange={handleChangeGraf}
                        input={<OutlinedInput label="Area" />}
                        MenuProps={MenuProps}
                        style={{ height: 40 }}
                      >
                        <MenuItem value="ozono">
                          Ozono
                        </MenuItem>
                        <MenuItem value="caliente" >
                          Caliente
                        </MenuItem>
                      </Select>
                    </FormControl>
                    <FormControl sx={{ width: "auto" }} >
                      <InputLabel id="demo-multiple-name-label">CIP</InputLabel>
                      <Select
                        value={cipEstado}
                        onChange={(event) => setCipEstado(event.target.value)}
                        input={<OutlinedInput label="CIP" />}
                        MenuProps={MenuProps}
                        style={{ height: 40 }}
                      >
                        <MenuItem
                          value='todos'
                        >
                          Todos
                        </MenuItem>
                        {foliosReales.map(({ Folio }) => (
                          <MenuItem
                            key={Folio}
                            value={Folio}
                          >
                            {Folio}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Stack>
                </MDBox>
              </Card>
            </MDBox>
          </Grid>
          {/*  */}
          <Grid md={12} justifyContent="center" alignItems="center">
            <MDBox mb={2}>
              <Card sx={{ height: "100%" }}>
                <Box>
                  <Typography gutterBottom variant="h2" component="div" align='center' mt='2%'  >
                    Gráfica CIP
                    <Box
                      display="inline-block"
                    >
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
                        size='large'
                        aria-label="FileDownload"
                        data-tip data-for='btnDownload'
                        aria-controls="basic-menu"
                        aria-haspopup="true"
                        onClick={() => ReporteGrafica(chartRef, fecha)}
                      >
                        <FileDownloadIcon fontSize="inherit" />
                      </IconButton>
                    </Box>
                  </Typography>
                  {/*  */}
                </Box>
                <Box ml={'2%'} mb={"2%"} md={4} >
                  <ReactECharts
                    option={option}
                    theme={"theme_name"}
                    // sx={{mb: '10%', ml:'5%' }}
                    ref={(e) => { setChartRef(e) }}
                  // style={{ width: '98%', height: '300px',  }}
                  />
                </Box>
              </Card>
            </MDBox>
            {/*  */}
            <MDBox >
              <Card mt={'40%'}>
                <MDBox ml={'5%'} mt={'2%'} mb={"5%"} pt={6} >
                  <Typography gutterBottom variant="h4" component="div"  >INFORMACION DEL CIP</Typography>
                  <Grid container >
                    <Grid md={5}  >
                      <Typography gutterBottom variant="h6" component="div"  >USUARIO: {cipEstado === 'todos' ? (cip === 'ozono' ? cipArray.Ozono.Usuario : cipArray.Caliente.Usuario) : (cip === 'ozono' ? arreglo.Datos[arreglo.Datos.length - 1].Usuario : arreglo.Datos[arreglo.Datos.length - 1].Usuario)}  </Typography>
                      <Typography gutterBottom variant="h6" component="div"  >EQUIPO: {cipEstado === 'todos' ? (cip === 'ozono' ? cipArray.Ozono.OzonoLavadora : cipArray.Caliente.CalienteLavadora) : (cip === 'ozono' ? arreglo.Datos[arreglo.Datos.length - 1].Lavadora : arreglo.Datos[arreglo.Datos.length - 1].Lavadora)} </Typography>
                      <Typography gutterBottom variant="h6" component="div"  >TIPO DE CIP: {cipEstado === 'todos' ? (cip === 'ozono' ? cipArray.Ozono.OzonoTipo : cipArray.Caliente.CalienteTipo) : (cip === 'ozono' ? arreglo.Datos[arreglo.Datos.length - 1].Tipo : arreglo.Datos[arreglo.Datos.length - 1].Tipo)} </Typography>
                    </Grid>
                    <Grid md={5}  >
                      <Typography gutterBottom variant="h6" component="div"  >SECUENCIA: {cipEstado === 'todos' ? (cip === 'ozono' ? cipArray.Ozono.OzonoSecuencia : cipArray.Caliente.CalienteSecuencia) : (cip === 'ozono' ? arreglo.Datos[arreglo.Datos.length - 1].Secuencia : arreglo.Datos[arreglo.Datos.length - 1].Secuencia)} </Typography>
                      <Typography gutterBottom variant="h6" component="div"  >TIEMPO DE SECUENCIA: {cipEstado === 'todos' ? (cip === 'ozono' ? cipArray.Ozono.OzonoTiempoSecuencia : cipArray.Caliente.CalienteTiempoSecuencia) : (cip === 'ozono' ? arreglo.Datos[arreglo.Datos.length - 1].TiempoSecuencia : arreglo.Datos[arreglo.Datos.length - 1].TiempoSecuencia)} SEG </Typography>
                      <Typography gutterBottom variant="h6" component="div"  >TIEMPO DE PROCESO: {cip === 'ozono' ? OzonoHora + ':' + OzonoMinuto : CalienteHora + ':' + CalienteMinuto}</Typography>
                    </Grid>
                    <Grid md={5}>
                      {cip === 'ozono' ? <>
                        {<Typography gutterBottom variant="h6" component="div"  >PPM RETORNO PROMEDIO: {cipEstado === 'todos' ? (cipArray.Ozono.OzonoRetorno || 0).toFixed(2) : (arreglo.Datos[arreglo.Datos.length - 1].Ozono_ppm_Retorno).toFixed(2)} PPM</Typography>}
                        {<Typography gutterBottom variant="h6" component="div"  >PPM SALIDA PROMEDIO: {cipEstado === 'todos' ? (cipArray.Ozono.OzonoSalida || 0).toFixed(2) : (arreglo.Datos[arreglo.Datos.length - 1].Ozono_ppm_Salida).toFixed(2)} PPM</Typography>}
                      </>
                        : <>
                          {<Typography gutterBottom variant="h6" component="div"  >PORCENTAJE Ms: {cipEstado === 'todos' ? cipArray.Caliente.CalienteConductividad : arreglo.Datos[arreglo.Datos.length - 1].Conductividad}%</Typography>}
                          {<Typography gutterBottom variant="h6" component="div"  >TEMPERATURA RETORNO PROMEDIO: {cipEstado === 'todos' ? (cipArray.Caliente.CalienteTemperaturaRetorno) : arreglo.Datos[arreglo.Datos.length - 1].Temperatura_Retorno} °C</Typography>}
                          {<Typography gutterBottom variant="h6" component="div"  >TEMPERATURA SALIDA PROMEDIO: {cipEstado === 'todos' ? (cipArray.Caliente.CalienteTemperaturaSalida) : arreglo.Datos[arreglo.Datos.length - 1].Temperatura_Salida} °C</Typography>}
                        </>
                      }
                    </Grid>
                  </Grid>
                </MDBox>
              </Card>
            </MDBox>
          </Grid>
        </Grid>
      </Box >
    </>
  )
}


