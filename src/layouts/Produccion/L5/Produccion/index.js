
import Grid from "@mui/material/Grid";

// Material Dashboard 2 PRO React components
import MDBox from "components/MDBox";

import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";



import { useEffect, useRef, useState } from "react";


//import ChannelsChart from "layouts/dashboards/sales/components/ChannelsChart";
//import salesTableData from '../sales/data/salesTableData';
//import SalesTable from 'examples/Tables/SalesTable';
import { Divider } from "@mui/material";
import { Box } from "@mui/system";
import { Card } from "react-bootstrap";
import { RegistrosProduccion } from "./components/Registros";


export const ProduccionL5 = () => {

  const wsUrl = process.env.REACT_APP_AUTH_URL_WEBSOCKET;//192.168.100.13

  const statusVelocidadInicial = {
    turno1_Danger1: '00:00',
    turno1_Success1: '00:00',
    turno1_Warning1: '00:00',
    turno2_Danger2: '00:00',
    turno2_Success2: '00:00',
    turno2_Warning2: '00:00',
  }

  let initialStateConsumo = {
    AguaTorreContacto: 0,
    AguaLavadoraL5: 0,
    Energia: 0,
    ProduccionPorcentaje: 0,
    ProduccionCantidad: 0,
    Velocidad: 0,
    Rechazo: 0,
    TiempoMuerto: 0,
    Rendimiento: 0,
    statusVelocidadTiempos: statusVelocidadInicial
  }
  let initialStateTurno = {
    produccion: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    RechazosT1: 0,
    RechazosT2: 0,
    IndiceLlenadoT1: 0,
    IndiceLlenadoT2: 0,
    RendimientoT1: 0,
    RendimientoT2: 0
  }

  const ws = useRef(null);

  const [ProduccionConsumos, setProduccionConsumos] = useState(initialStateConsumo);
  const [ProduccionTurnos, setProduccionTurnos] = useState(initialStateTurno);
  const [statusVelocidadTiempos, setstatusVelocidadTiempos] = useState(statusVelocidadInicial);
  //let wsDatas = {ProduccionConsumos: initialState,ProduccionTurnos:{}}

  //vParo={wsData.statusVelocidadTiempos.turno2_Danger2 || '00:00'} vBaja={wsData.statusVelocidadTiempos.turno2_Warning2 || '00:00'} vOptima={wsData.statusVelocidadTiempos.turno2_Success2 || '00:00'}

  let datoOnline = [
    {
      Indicador: [null, "Produccion"],
      Valor: (ProduccionConsumos.ProduccionCantidad || 0) + " Uds",
    },
    {
      Indicador: [null, "Velocidad"],
      Valor: (ProduccionConsumos.Velocidad || 0) + " Uds/Hr",
    },
    {
      Indicador: [null, "Rechazo de Inspección"],
      Valor: (ProduccionConsumos.RechazoInspeccion || 0) + " Uds",
    },
    { Indicador: [null, "Rechazos Totales"], Valor: (ProduccionConsumos.Rechazo || 0) + " Uds" },
    { Indicador: [null, "Tiempos Muertos"], Valor: (ProduccionConsumos.TiempoMuerto || 0) + " hrs" },
  ];
  // Action buttons for the BookingCard

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
      //console.log(ProduccionConsumos);
      //console.log(ProduccionTurnos);
      //console.log(statusVelocidadTiempos);
      //console.log(JSON.parse(event.data));
      //console.log(event.data);
    };

    return () => {
      wsCurrent.close();
    };
  }, [])

  /*
    const porcentajeProduccion = wsData.Rechazo===0 && wsData.ProduccionCantidad===0 ? 0 : (wsData.ProduccionCantidad/(wsData.Rechazo + wsData.ProduccionCantidad)*100);
  
    const porcentajeTiempo = wsData.PorcentajeTiemposMuertos;
  
    const porcentaje={
      Produccion: porcentajeProduccion,
      Tiempos: porcentajeTiempo
    };
  
    let optionsGraficoRendimiento = {
      tooltip: {
        trigger: 'item'
      },
      color:['#B10A0A', '#0E26F4 '],
      legend: {
        top: '5%',
        left: 'center'
      },
      toolbox: {
        show: true,
        feature: {
          //dataView: { show: true, readOnly: true },
          //restore: { show: true },
          saveAsImage: { show: true },
        },
      },
      series: [
        {
          name: 'Rendimiento',
          type: 'pie',
          radius: ['40%', '70%'],
          avoidLabelOverlap: false,
          label: {
            show: false,
            position: 'center'
          },
          emphasis: {
            label: {
              show: true,
              fontSize: '40',
              fontWeight: 'bold'
            }
          },
          labelLine: {
            show: false
          },
          data: [
            { value: wsData.Rechazo, name: 'Rechazo' },
            { value: wsData.ProduccionCantidad, name: 'Produccion' }
          ]
        }
      ]
    }
  */
  return (
    <>
      {/*<MDTypography variant="h3">L5</MDTypography>*/}
      <MDBox mt={1.5}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              Ciel: {20} litros
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              {/*(wsData.BotellasHora || 0).toFixed(2)*/680} btll/Hora
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              Ciclo: {(ProduccionConsumos.Ciclo || 0).toFixed(2)} seg
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <Box component="span" sx={{ p: 2, border: '1px dashed grey' }}>
                Cajas Unidad: {ProduccionConsumos.CajasUnidad}
              </Box>
            </MDBox>
          </Grid>
        </Grid>
      </MDBox>
      <Divider />
      <MDBox mt={1.5}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                //color="dark"
                icon="opacity"
                title="Litros por Garrafon Torre"
                count={(ProduccionConsumos.AguaPorGarrafonTorre || 0).toFixed(2) + " L"}
                percentage={{
                  color: "success",
                  amount: "",
                  label: "",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                icon="opacity"
                title="Litros por Garrafon Lavadora"
                count={(ProduccionConsumos.AguaPorGarrafonLavadora || 0).toFixed(2) + " L"}
                percentage={{
                  color: "success",
                  amount: "",
                  label: "",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="warning"
                icon="bolt"
                title="Kilowatt por Garrafon"
                count={(ProduccionConsumos.KwhPorGarrafon || '0.00') + " KW/hr"}
                percentage={{
                  color: "success",
                  amount: "",
                  label: "",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="dark"
                icon="timeline"
                title="índice de llenado de Garrafon"
                count={(ProduccionConsumos.ProduccionPorcentaje || 0) + " %"}
                percentage={{
                  color: "success",
                  amount: "",
                  label: "",
                }}
              />
            </MDBox>
          </Grid>
        </Grid>
      </MDBox>
      <MDBox mt={1.5}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                //color="dark"
                icon="opacity"
                title="Total Agua torre contacto"
                count={(ProduccionConsumos.AguaTorreContacto || '0.00') + " m³"}
                percentage={{
                  color: "success",
                  amount: "",
                  label: "",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                icon="opacity"
                title="Total Agua Lavadora L5"
                count={(ProduccionConsumos.AguaLavadoraL5 || '0.00') + " m³"}
                percentage={{
                  color: "success",
                  amount: "",
                  label: "",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="warning"
                icon="bolt"
                title="Kilowats L5"
                count={(ProduccionConsumos.Energia || '0.00') + " KW/hr"}
                percentage={{
                  color: "success",
                  amount: "",
                  label: "",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="dark"
                icon="timeline"
                title="Rendimiento"
                count={(ProduccionConsumos.Rendimiento || 0) + " %"}
                percentage={{
                  color: "success",
                  amount: "",
                  label: "",
                }}
              />
            </MDBox>
          </Grid>
        </Grid>
      </MDBox>

      <Divider />
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} lg={6}>
          <MDBox>
            <Card sx={{ height: "100%" }}>
              <RegistrosProduccion turno={1} ProduccionTurnos={ProduccionTurnos} datosVelocidad={statusVelocidadTiempos} />
            </Card>
          </MDBox>
        </Grid>
        <Grid item xs={12} lg={6}>
          <MDBox>
            <Card sx={{ height: "100%" }}>
              <RegistrosProduccion turno={2} ProduccionTurnos={ProduccionTurnos} datosVelocidad={statusVelocidadTiempos} />
            </Card>
          </MDBox>
        </Grid>
      </Grid>


      {/*
        <MDBox mb={3}>
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={12} lg={4}>
              <ChannelsChart 
                porcentaje={porcentaje}
                chart= {optionsGraficoRendimiento}
                funBotton="ReporteProduccion"
              />
            </Grid>
            <Grid item xs={12} lg={4}>
              <SalesTable title="Indicadores" rows={datoOnline} />
            </Grid>
          </Grid>
        </MDBox>*/}
      {/*<MDBox mt={2}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mt={3}>
                <BookingCard
                  image={booking1}
                  title="Cozy 5 Stars Apartment"
                  description='The place is close to Barceloneta Beach and bus stop just 2 min by walk and near to "Naviglio" where you can enjoy the main night life in Barcelona.'
                  price="$899/night"
                  location="Barcelona, Spain"
                  action={actionButtons}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mt={3}>
                <BookingCard
                  image={booking2}
                  title="Office Studio"
                  description='The place is close to Metro Station and bus stop just 2 min by walk and near to "Naviglio" where you can enjoy the night life in London, UK.'
                  price="$1.119/night"
                  location="London, UK"
                  action={actionButtons}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mt={3}>
                <BookingCard
                  image={booking3}
                  title="Beautiful Castle"
                  description='The place is close to Metro Station and bus stop just 2 min by walk and near to "Naviglio" where you can enjoy the main night life in Milan.'
                  price="$459/night"
                  location="Milan, Italy"
                  action={actionButtons}
                />
              </MDBox>
            </Grid>
          </Grid>*/}
      {/*<Modal
            open={Modal}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Text in a modal
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
            </Typography>
          </Box>
        </Modal>
        </MDBox>*/}
    </>
  );
}
