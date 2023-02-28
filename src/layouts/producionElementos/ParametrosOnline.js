import React from 'react'

import Grid from "@mui/material/Grid";
import Tooltip from "@mui/material/Tooltip";
import Icon from "@mui/material/Icon";


// Material Dashboard 2 PRO React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";


import { useEffect, useMemo, useRef, useState } from "react";

import SalesTable from '../../examples/Tables/SalesTable';



export const ParametrosOnline = ({IndicadoresProduccion = {
                                  AguaTorreContacto: 0,
                                  AguaLavadoraL5: 0,
                                  Energia: 0,
                                  ProduccionPorcentaje: 0,
                                  ProduccionCantidad: 0,
                                  Velocidad: 0,
                                  Rechazo: 0,
                                  TiempoMuerto: 0,
                                  Rendimiento: 0, //ProduccionReal/produccionEsperada
                                  //OEE's
                                  Disponibilidad: 0, //TiempoEnOperacion/TiempoEsperado
                                  //Rendimiento: 0, ya esta disponible esta variable
                                  Calidad: 0,//piezasBuenas/NumeroDePiezas
                                  OEE: 0//Disponibilidad * Rendimiento * Calidad
                                }}
                                ) => {


    const style = {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: 400,
      bgcolor: 'background.paper',
      border: '2px solid #000',
      boxShadow: 24,
      p: 4,
    };



  let datoOnline = [
    {
      Indicador: [null, "Cajas Unidad"],
      Valor: (IndicadoresProduccion.CajasUnidad || 0) + " Uds",
    },
    {
      Indicador: [null, "Produccion Total"],
      Valor: (IndicadoresProduccion.ProduccionCantidad || 0) + " Uds",
    },
    {
      Indicador: [null, "Rechazos"],
      Valor: (IndicadoresProduccion.Rechazo || 0) + " Uds",
    },
    {
      Indicador: [null, "Indice de llenado"],
      Valor: (IndicadoresProduccion.ProduccionPorcentaje || 0) + " %",
    },


    {
      Indicador: [null, "Disponibilidad"],
      Valor: (IndicadoresProduccion.Disponibilidad || 0) + " %",
    },
    {
      Indicador: [null, "Rendimiento"],
      Valor: (IndicadoresProduccion.Rendimiento || 0) + " %",
    },
    {
      Indicador: [null, "Calidad"],
      Valor: (IndicadoresProduccion.Calidad || 0) + " %",
    },
    {
      Indicador: [null, "OEE"],
      Valor: (IndicadoresProduccion.OEE || 0) + " %",
    },
    {/*
      Indicador: [null, "Rendimiento"],
      Valor: (IndicadoresProduccion.Rendimiento || 0) + " %",
    },
    {
      Indicador: [null, "Produccion"],
      Valor: (IndicadoresProduccion.ProduccionCantidad || 0) + " Uds",
      */
    },
  ];
  // Action buttons for the BookingCard
  const actionButtons = (
    <>
      <Tooltip title="Refresh" placement="bottom">
        <MDTypography
          variant="body1"
          color="primary"
          lineHeight={1}
          sx={{ cursor: "pointer", mx: 3 }}
        >
          <Icon color="inherit">refresh</Icon>
        </MDTypography>
      </Tooltip>
      <Tooltip title="Edit" placement="bottom">
        <MDTypography variant="body1" color="info" lineHeight={1} sx={{ cursor: "pointer", mx: 3 }}>
          <Icon color="inherit">edit</Icon>
        </MDTypography>
      </Tooltip>
    </>
  );
  
  return (
    <>
      <MDBox mb={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} lg={12}>
            <SalesTable title="Indicadores totalizadores del dia" rows={datoOnline} />
          </Grid>
        </Grid>
      </MDBox>
    </>
  );
}

