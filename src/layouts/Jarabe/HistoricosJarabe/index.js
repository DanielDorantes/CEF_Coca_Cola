import React, { useEffect, useRef, useState } from 'react'
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { FormControl, Grid, InputLabel, MenuItem, Select, OutlinedInput, TextField, Stack } from '@mui/material';
import MDBox from 'components/MDBox';


////////////////////////////////////////////////////////////////////////////////////

import moment from 'moment';
import { DatePicker, LocalizationProvider } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { es } from 'date-fns/locale';
//! import { Horas } from 'components/Elementos/Horas'


import { ProgresBar } from 'layouts/Jarabe/HistoricosJarabe/Elementos/ProgresBar';

import ReactECharts from "echarts-for-react";
import { RestartAlt } from '@mui/icons-material';
//! import { Bar, Line } from 'react-chartjs-2';

export const HistoricosJarabe = ({ turno /* , datosVelocidad = { turno1_Danger1: '00:00', turno1_Success1: '00:00', turno1_Warning1: '00:00', turno2_Danger2: '00:00', turno2_Success2: '00:00', turno2_Warning2: '00:00', turno2_outLine: '00:00', turno1_outLine: '00:00' } */ }) => {

  /**
   * Metodo uno de usar comentarios de colores 
   ** Important information is highlighted
   *! decrecated method, do not use 
   *? Should this method be exposed in the public api
   * TODO: refactor this method so that it conforms t the api
   * @param myParam the parameter for this method
  */

  // Metodo dos de utilizar los comentarios de colores
  //*|
  //!
  //?
  //todo


  //* Variables para la conexion a el servidor de manera remota
  const ws = useRef(null);
  const wsUrl = process.env.REACT_APP_AUTH_URL_WEBSOCKET;//192.168.100.13

  //? Metodos para las api y sus variables de InitialState o InitialData
  const [fecha, setFecha] = useState(Date.now());
  const [urlTanques, setUrlTanques] = useState(`http://${wsUrl}:1880/gettanques/${moment(fecha).format("YYYY-MM-DD")}`);
  const [urlFolio, setUrlFolio] = useState(`http://${wsUrl}:1880/getfolio/${moment(fecha).format("YYYY-MM-DD")}`)
  const [area, setArea] = useState('js1');
  const [folio, setFolio] = useState('todos');
  const [producto, setProducto] = useState('todos');


  //todo Variables de InitialData o InitialState
  const initialData = [
    {
      "RPM": 0,
      "Nivel": 0,
      "TemperaturaSala": 25,
      "Fecha": "2023-01-09T00:00:40.517Z"
    },
    {
      "RPM": 0,
      "Nivel": 0,
      "TemperaturaSala": 25,
      "Fecha": "2023-01-09T00:01:40.500Z"
    },
    {
      "RPM": 0,
      "Nivel": 0,
      "TemperaturaSala": 25,
      "Fecha": "2023-01-09T00:02:40.517Z"
    },
    {
      "RPM": 0,
      "Nivel": 0,
      "TemperaturaSala": 25,
      "Fecha": "2023-01-09T00:03:40.517Z"
    },
    {
      "RPM": 0,
      "Nivel": 0,
      "TemperaturaSala": 25,
      "Fecha": "2023-01-09T00:04:40.510Z"
    },
    {
      "RPM": 0,
      "Nivel": 0,
      "TemperaturaSala": 25,
      "Fecha": "2023-01-09T00:05:40.517Z"
    },
    {
      "RPM": 0,
      "Nivel": 0,
      "TemperaturaSala": 25,
      "Fecha": "2023-01-09T00:06:40.523Z"
    },
    {
      "RPM": 0,
      "Nivel": 0,
      "TemperaturaSala": 25,
      "Fecha": "2023-01-09T00:07:40.593Z"
    },
    {
      "RPM": 0,
      "Nivel": 0,
      "TemperaturaSala": 25,
      "Fecha": "2023-01-09T00:08:40.533Z"
    },
    {
      "RPM": 0,
      "Nivel": 0,
      "TemperaturaSala": 25,
      "Fecha": "2023-01-09T00:09:40.540Z"
    },
    {
      "RPM": 0,
      "Nivel": 0,
      "TemperaturaSala": 25,
      "Fecha": "2023-01-09T00:10:40.513Z"
    },
    {
      "RPM": 0,
      "Nivel": 0,
      "TemperaturaSala": 25,
      "Fecha": "2023-01-09T00:11:40.527Z"
    },
    {
      "RPM": 0,
      "Nivel": 0,
      "TemperaturaSala": 25,
      "Fecha": "2023-01-09T00:12:40.620Z"
    },
    {
      "RPM": 0,
      "Nivel": 0,
      "TemperaturaSala": 25,
      "Fecha": "2023-01-09T00:13:40.597Z"
    },
    {
      "RPM": 0,
      "Nivel": 0,
      "TemperaturaSala": 25,
      "Fecha": "2023-01-09T00:14:40.530Z"
    },
    {
      "RPM": 0,
      "Nivel": 0,
      "TemperaturaSala": 25,
      "Fecha": "2023-01-09T00:15:40.530Z"
    },
    {
      "RPM": 0,
      "Nivel": 0,
      "TemperaturaSala": 25,
      "Fecha": "2023-01-09T00:16:40.570Z"
    },
    {
      "RPM": 0,
      "Nivel": 0,
      "TemperaturaSala": 25,
      "Fecha": "2023-01-09T00:17:40.580Z"
    },
    {
      "RPM": 0,
      "Nivel": 0,
      "TemperaturaSala": 25,
      "Fecha": "2023-01-09T00:18:40.530Z"
    },
    {
      "RPM": 0,
      "Nivel": 0,
      "TemperaturaSala": 25,
      "Fecha": "2023-01-09T00:19:40.613Z"
    },
    {
      "RPM": 0,
      "Nivel": 0,
      "TemperaturaSala": 25,
      "Fecha": "2023-01-09T00:20:40.540Z"
    },
    {
      "RPM": 0,
      "Nivel": 0,
      "TemperaturaSala": 25,
      "Fecha": "2023-01-09T00:21:40.640Z"
    },
    {
      "RPM": 0,
      "Nivel": 0,
      "TemperaturaSala": 25,
      "Fecha": "2023-01-09T00:22:40.543Z"
    },
    {
      "RPM": 0,
      "Nivel": 0,
      "TemperaturaSala": 25,
      "Fecha": "2023-01-09T00:23:40.623Z"
    },
    {
      "RPM": 0,
      "Nivel": 0,
      "TemperaturaSala": 25,
      "Fecha": "2023-01-09T00:24:40.530Z"
    },
    {
      "RPM": 0,
      "Nivel": 0,
      "TemperaturaSala": 25,
      "Fecha": "2023-01-09T00:25:40.530Z"
    },
    {
      "RPM": 0,
      "Nivel": 0,
      "TemperaturaSala": 25,
      "Fecha": "2023-01-09T00:26:40.527Z"
    },
    {
      "RPM": 0,
      "Nivel": 0,
      "TemperaturaSala": 25,
      "Fecha": "2023-01-09T00:27:40.543Z"
    },
    {
      "RPM": 0,
      "Nivel": 0,
      "TemperaturaSala": 25,
      "Fecha": "2023-01-09T00:28:40.533Z"
    },
    {
      "RPM": 0,
      "Nivel": 0,
      "TemperaturaSala": 25,
      "Fecha": "2023-01-09T00:29:40.633Z"
    },
    {
      "RPM": 0,
      "Nivel": 0,
      "TemperaturaSala": 25,
      "Fecha": "2023-01-09T00:30:40.563Z"
    },
    {
      "RPM": 0,
      "Nivel": 0,
      "TemperaturaSala": 25,
      "Fecha": "2023-01-09T00:31:40.637Z"
    },
    {
      "RPM": 0,
      "Nivel": 0,
      "TemperaturaSala": 25,
      "Fecha": "2023-01-09T00:32:40.610Z"
    },
    {
      "RPM": 0,
      "Nivel": 0,
      "TemperaturaSala": 25,
      "Fecha": "2023-01-09T00:33:40.530Z"
    },
    {
      "RPM": 0,
      "Nivel": 0,
      "TemperaturaSala": 25,
      "Fecha": "2023-01-09T00:34:40.553Z"
    },
    {
      "RPM": 0,
      "Nivel": 0,
      "TemperaturaSala": 25,
      "Fecha": "2023-01-09T00:35:40.543Z"
    },
    {
      "RPM": 0,
      "Nivel": 0,
      "TemperaturaSala": 25,
      "Fecha": "2023-01-09T00:36:40.523Z"
    }
  ]
  const initialData2 = [
    {
      "Folio": 202301130202
    }

  ]

  const [arreglo, setArreglo] = useState(initialData);
  const [arregloFolios, setArregloFolio] = useState(initialData2);
  const [arregloProductos, setArregloProductos] = useState(initialData2);

  const total = async () => {

    try {
      const response = await fetch(`${urlTanques}/${area}/${folio}`);
      setArreglo(await response.json());
    } catch (error) {
      console.log('Hay un error: ' + error);
    }
  }

  useEffect(total, [urlTanques + area + folio]);//el que esta dentro es una funcion, no es la variable

  const folios = async () => {

    try {
      const response = await fetch(`${urlFolio}/${area}`);
      setArregloFolio(await response.json());
    } catch (error) {
      console.log('Hay un error: ' + error);
    }
  }

  useEffect(folios, [urlFolio + area]);//el que esta dentro es una funcion, no es la variable


  //? //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //?   --> useEffect para el cambio de estado de la variables para las direcciones url
  //? //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  useEffect(() => {
    setUrlTanques(`http://${wsUrl}:1880/gettanques/${moment(fecha).format("YYYY-MM-DD")}`);
    setUrlFolio(`http://${wsUrl}:1880/getfolio/${moment(fecha).format("YYYY-MM-DD")}`)
    setArea(area)
    setFolio('todos')
  }, [fecha])


  // useEffect(() => {
  //   setUrlTanques(`http://${wsUrl}:1880/gettanques/${moment(fecha).format("YYYY-MM-DD")}`);
  //   setArea(area)
  // }, [folio])

  useEffect(() => {
    setFolio('todos')
  }, [area])

  //? //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  //* //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //*   --> Funcion para tomar el ultimo valor de un arreglo 
  //* //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // Se toma el ultimo valor de producto
  let lista = arreglo.map(({ Producto }) => (Producto))
  let prod = lista[lista.length - 1]


  let listaFecha = arreglo.map(({ Fecha }) => (Fecha))
  // Se toma el primer valor de fecha
  let dateStart = listaFecha[0]
  // Se toma el ultimo valor de producto
  let dateEnd = listaFecha[listaFecha.length - 1]

  //TODO De aqui saque el metodo para restar las Fechas
  //TODO https://www.delftstack.com/es/howto/javascript/javascript-subtract-dates/
  var day1 = new Date(dateStart);
  var day2 = new Date(dateEnd);;
  var difference = Math.abs(day2 - day1);
  var days = (difference / 1000) / 60 / 60;



  //* //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  //* //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //*  --> Graficas
  //* //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  //* Grafica 1
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
      left: '5%',
      right: '5%',
      bottom: '8%',
      width: '90%',

      containLabel: true

    },
    // toolbox: {
    //   feature: {
    //     dataView: { show: true, readOnly: false },
    //     restore: { show: true },
    //     saveAsImage: { show: true }
    //   }
    // },
    legend: {
      data: ['Nivel Tanque (%)', 'Temperatura (°C)']
    },
    xAxis: [
      {
        type: 'category',
        axisTick: {
          alignWithLabel: true
        },
        // prettier-ignore
        data: arreglo.map(({ Fecha }) => (Fecha.substr(11, 5))),
      }
    ],
    yAxis: [
      {
        type: 'value',
        name: 'Nivel Tanque (%)',
        position: 'left',
        max: 100,
        alignTicks: true,
        axisLine: {
          show: true,
          lineStyle: {
            color: colors[0]
          }
        },
        // axisLabel: {
        //   formatter:  '{value} PPM'
        // }
      },
      {
        type: 'value',
        name: 'Temperatura (°C)',
        position: 'right',
        max: 50,
        alignTicks: true,
        // offset: 80,
        axisLine: {
          show: true,
          lineStyle: {
            color: colors[1]
          }
        },
        // axisLabel: {
        //   formatter:  '{value} PPM'
        // }
      }
    ],
    series: [
      {
        name: 'Nivel Tanque (%)',
        data: arreglo.map(({ Nivel }) => (Nivel)),
        type: 'line',
      },
      {
        name: 'Temperatura (°C)',
        data: arreglo.map(({ TemperaturaSala }) => (TemperaturaSala)),
        yAxisIndex: 1,
        type: 'line',
      }
    ]
  };

  //* Grafica 2
  const option2 = {
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      data: ['RPM']
    },
    grid: {
      left: '5%',
      right: '5%',
      bottom: '8%',
      width: '92%',
      containLabel: true
    },
    toolbox: {
      feature: {
        saveAsImage: {}
      }
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: arreglo.map(({ Fecha }) => (Fecha.substr(11, 5))), //Horas
    },
    yAxis: {
      type: 'value',
      min: 0,
      max: 100,
    },
    series: [
      {
        name: 'RPM',
        data: arreglo.map(({ RPM }) => (RPM)),
        type: 'line',
      },

    ]
  };

  //* //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  //! //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //!  --> Recarga de pantalla
  //! //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // setTimeout(() => {
  //   document.location.reload();
  // }, 300000);
  //! //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  //TODO //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //TODO   --> Investigar como funciona esto. Esta relazionado con los metodos de las graficas cuando cambia sus valores en el textbox
  //TODO //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  const handleChangeGraf = (event) => {
    setArea(event.target.value);
  }
  const handleChangeGraf2 = (event) => {
    setFolio(event.target.value);
  }

  const handleChangeDate = (event) => {
    setFecha(moment(event).toDate());
  }

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

  //TODO //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


  //TODO //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //TODO --> Area de visualizacion de los variables en la consola
  //TODO //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // console.log(area)
  // console.log(urlTanques)
  // console.log('llego aqui')
  // console.log(arreglo);
  // console.log(`${urlTanques}/${area}/${folio}`)
  
  //TODO //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  return (
    <>
      <Grid
        container
        spacing={{ xs: 2, md: 2 }}
      >
        <Grid item xs={12} md={12} lg={12}>
          <Card >
            <Grid ml={2} mr={2} >
              <Typography align='center' mt='2%' variant='h2' >Historicos</Typography>
              <Box display="flex" justifyContent="space-between" ml='5%' >
                <Stack direction="row" spacing={1}>
                  <LocalizationProvider dateAdapter={AdapterDateFns} locale={es} >
                    <DatePicker
                      label="Fecha"
                      value={moment(fecha).toDate()}
                      onChange={handleChangeDate}
                      renderInput={(params) => <TextField {...params} size="small" />}
                    />
                  </LocalizationProvider>
                  <FormControl sx={{ width: 250 }} size="small" >
                    <InputLabel id="demo-multiple-name-label">Area</InputLabel>
                    <Select
                      displayEmpty
                      //! labelId="demo-multiple-name-label"
                      //! id="demo-multiple-name"
                      value={area}
                      onChange={handleChangeGraf}
                      input={<OutlinedInput label="Area" />}
                      MenuProps={MenuProps}
                      style={{ height: 35 }}
                    //* options https://react-select.com/home
                    >
                      <MenuItem
                        value="js1"
                      >
                        Jarabe simple 1
                      </MenuItem>
                      <MenuItem
                        value="js2"
                      >
                        Jarabe simple 2
                      </MenuItem>
                      <MenuItem
                        value="jt1"
                      >
                        Jarabe terminado 1
                      </MenuItem>
                      <MenuItem
                        value="jt2"
                      >
                        Jarabe terminado 2
                      </MenuItem>
                      <MenuItem
                        value="jt3"
                      >
                        Jarabe terminado 3
                      </MenuItem>
                      <MenuItem
                        value="jt4"
                      >
                        Jarabe terminado 4
                      </MenuItem>
                      <MenuItem
                        value="jt5"
                      >
                        Jarabe terminado 5
                      </MenuItem>
                      <MenuItem
                        value="jt6"
                      >
                        Jarabe terminado 6
                      </MenuItem>
                      <MenuItem
                        value="jt7"
                      >
                        Jarabe terminado 7
                      </MenuItem>
                      <MenuItem
                        value="jt8"
                      >
                        Jarabe terminado 8
                      </MenuItem>
                      {/** 
                      // Esta area no se planea utilizar a corto o mediano plazo
                        <MenuItem
                          value="Jarabe terminado 9 "
                        >
                          Jarabe terminado 9
                        </MenuItem> */}
                      <MenuItem
                        value="jt10"
                      >
                        Jarabe terminado 10
                      </MenuItem>
                    </Select>
                  </FormControl>
                  <FormControl sx={{ width: 250 }} size="small" >
                    <InputLabel id="demo-multiple-name-label">Folio</InputLabel>
                    <Select
                      displayEmpty
                      // labelId="demo-multiple-name-label"
                      // id="demo-multiple-name"
                      value={folio}
                      onChange={handleChangeGraf2}
                      input={<OutlinedInput label="Area" />}
                      MenuProps={MenuProps}
                      style={{ height: 35 }}
                    //* options https://react-select.com/home
                    >
                      <MenuItem
                        value='todos'
                      >
                        Todos
                      </MenuItem>
                      {arregloFolios.map(({ Folio }) => (
                        <MenuItem
                          key={Folio}
                          value={Folio}
                        >
                          {Folio}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <Typography align='center' variant='h5' color='#000' >Producto: {prod} </Typography>
                </Stack>
              </Box>
            </Grid>
            <Grid>
              <MDBox
                variant="gradient"
                borderRadius="lg"
              >
                <ReactECharts option={option} style={{ height: '300px' }} />
              </MDBox>
            </Grid>
          </Card>
        </Grid>
        {/* //TODO Segunda seccion  */}
        <Grid item xs={12} md={12} lg={12}>
          <Card >
            <Grid ml={'6%'} mr={2} mt={1} mb={0}>
              {folio === 'todos' ? <>          </>
                : <>
                  <Grid>
                    <Typography display="inline" variant='h6' color='#000'>Fecha inicio: {dateStart.substr(0, 10)} {dateStart.substr(11, 5)}</Typography>
                    <Typography display="inline" variant='h6' color='#000' ml={'3%'}>Fecha fin: {dateEnd.substr(0, 10)}  {dateEnd.substr(11, 5)}</Typography>
                    <Typography display="inline" variant='h6' color='#000' ml={'3%'}>Horas transcurridas: {days.toFixed(0)} Hrs  </Typography>

                  </Grid>
                </>
              }
              <Grid md={11.5}  >
                <ProgresBar turno={turno} />
              </Grid>
            </Grid>
          </Card>
        </Grid>
        {/* //TODO Tercera seccion */}
        <Grid item xs={12} md={12} lg={12}>
          <MDBox mb={1.5}>
            <Card sx={{ height: "100%" }}>
              <MDBox justifyContent="space-between" pt={2} px={2}>
                <ReactECharts option={option2} />
              </MDBox>
            </Card>
          </MDBox>
        </Grid>
      </Grid>
    </>
  )
}