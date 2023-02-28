import { Divider, Grid } from '@mui/material'
import MDBox from 'components/MDBox'
import MDTypography from 'components/MDTypography'
import SimpleCard from 'examples/Cards/StatisticsCards/SimpleCard'
import { ParametrosOnline } from 'layouts/producionElementos/ParametrosOnline'
import { ProgresBar } from 'layouts/producionElementos/ProgresBar'
import { StatusVelocidad } from 'layouts/producionElementos/StatusVelocidad'
import React, { useState } from 'react'

export const DRProduccion = ({ AlertasPCCs = {
  OzLav: {
    Escala: { Maxima: 0, Minima: 0 },
    Alerta: { Maxima: 0, Minima: 0 }
  },
  OzTor: {
    Escala: { Maxima: 0, Minima: 0 },
    Alerta: { Maxima: 0, Minima: 0 }
  },
  TemLav: {
    Escala: { Maxima: 0, Minima: 0 },
    Alerta: { Maxima: 0, Minima: 0 }
  },
  PhTor: {
    Escala: { Maxima: 0, Minima: 0 },
    Alerta: { Maxima: 0, Minima: 0 }
  }
}, PCCs = { OzonoL5: 0, OzonoTorre: 0, TemperaturaL5: 0, PHL5: 0 }, statusVelocidad, statusVelocidadTurno, IndicadoresProduccion }) => {


  const [UnidadMedicion, setUnidadMedicion] = useState(true);

  const Agua = 0.02 * (UnidadMedicion ? 1000 : 1);

  const handleChangeUnidad = () => {
    setUnidadMedicion(!UnidadMedicion)
  }
  return (
    <>
      {/*<MDTypography variant="h3">Energia</MDTypography>*/}
      <MDBox mb={3}>
        <StatusVelocidad
          statusVelocidad={statusVelocidad}
          Nivel={Agua.toFixed(2)}
          Unidad={UnidadMedicion ? "L" : "m³"}
          handleChangeUnidad={handleChangeUnidad}
        />
        <Divider />
        <Grid container spacing={5} alignItems="center">
          <Grid item xs={12}>
            <MDTypography ml={'50%'} variant="h4">PCC</MDTypography>
          </Grid>
          <Grid item xs={12} lg={3}>
            <MDBox mb={1.5}>
              Ozono Lavadora
              <MDBox mb={3} ml={3}>
                <SimpleCard
                  title={'ppm'}
                  count={PCCs.OzonoL5}
                  alerta={(PCCs.OzonoL5 < AlertasPCCs.OzLav.Alerta.Minima || PCCs.OzonoL5 > AlertasPCCs.OzLav.Alerta.Maxima) ? true : false}
                  percentage={{
                    color: "warning",
                    amount: "valor de alerta: ",
                    label: AlertasPCCs.OzLav.Alerta.Minima + " - " + AlertasPCCs.OzLav.Alerta.Maxima,
                  }}
                />
              </MDBox>
            </MDBox>
          </Grid>
          <Grid item xs={12} lg={3}>
            <MDBox mb={1.5}>
              Ozono Torre
              <MDBox mb={3} ml={3}>
                <SimpleCard
                  title={'ppm'}
                  count={PCCs.OzonoTorre}
                  alerta={(PCCs.OzonoTorre < AlertasPCCs.OzTor.Alerta.Minima || PCCs.OzonoTorre > AlertasPCCs.OzTor.Alerta.Maxima) ? true : false}
                  percentage={{
                    color: "warning",
                    amount: "valores de alerta: ",
                    label: AlertasPCCs.OzTor.Alerta.Minima + " - " + AlertasPCCs.OzTor.Alerta.Maxima,
                  }}
                />
              </MDBox>
            </MDBox>
          </Grid>
          <Grid item xs={12} lg={3}>
            <MDBox mb={1.5}>
              Temperatura Lavadora
              <MDBox mb={3} ml={3}>
                <SimpleCard
                  title={'°C'}
                  count={PCCs.TemperaturaL5}
                  alerta={(PCCs.TemperaturaL5 < AlertasPCCs.TemLav.Alerta.Minima || PCCs.TemperaturaL5 > AlertasPCCs.TemLav.Alerta.Maxima) ? true : false}
                  percentage={{
                    color: "warning",
                    amount: "valores de alerta: ",
                    label: AlertasPCCs.TemLav.Alerta.Minima + " - " + AlertasPCCs.TemLav.Alerta.Maxima,
                  }}
                />
              </MDBox>
            </MDBox>
          </Grid>
          <Grid item xs={12} lg={3}>
            <MDBox mb={1.5}>
              Ph Torre
              <MDBox mb={3} ml={3}>
                <SimpleCard
                  title={'pH'}
                  count={PCCs.PHL5}
                  alerta={(PCCs.PHL5 < AlertasPCCs.PhTor.Alerta.Minima || PCCs.PHL5 > AlertasPCCs.PhTor.Alerta.Maxima) ? true : false}
                  percentage={{
                    color: "warning",
                    amount: "valores de alerta: ",
                    label: AlertasPCCs.PhTor.Alerta.Minima + " - " + AlertasPCCs.PhTor.Alerta.Maxima,
                  }}
                />
              </MDBox>
            </MDBox>
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <MDTypography ml={'50%'} variant="h4">Produccion</MDTypography>
          </Grid>
          <Grid item xs={12} lg={6}>
            <MDTypography variant="h4">Turno 1</MDTypography>
            <ProgresBar turno={1} statusVelocidadTurno={statusVelocidadTurno} />
            <Divider />
            <MDTypography variant="h4">Turno 2</MDTypography>
            <ProgresBar turno={2} statusVelocidadTurno={statusVelocidadTurno} />
          </Grid>
          <Grid item xs={12} lg={6}>
            <ParametrosOnline IndicadoresProduccion={IndicadoresProduccion} />
          </Grid>
        </Grid>
      </MDBox>
    </>
  )
}
