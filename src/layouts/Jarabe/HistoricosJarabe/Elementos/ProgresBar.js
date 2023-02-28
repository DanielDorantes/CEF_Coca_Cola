import React, { useEffect, useState } from 'react'
import { CProgress, CProgressBar } from '@coreui/react'
import ReactTooltip from 'react-tooltip';
import { Grid } from '@mui/material';

//////////////////////////////////////////////////////////////////////////////////////
//                              IMPORTANTE 
//   EL archivo original se encuentra en 'layouts/producionElementos/ProgresBar'

export const ProgresBar = ({ turno }) => {


  const wsUrl = process.env.REACT_APP_AUTH_URL_WEBSOCKET;//192.168.100.13
  const [valor, setValor] = useState([])
  const statusDeVelocidad = () => {
    fetch(`http://${wsUrl}:1880/api/statusVelocidad/${turno}`)
      .then((response) => response.json())
      .then((json) => {
        setValor(json);
        console.log(valor.tiempoFin);
        console.log(new Date(valor.tiempoFin))

        console.log(valor.tiempo);
        console.log(new Date(valor.tiempo))

        console.log(valor.tiempoFin - valor.tiempo);
        console.log(new Date(valor.tiempoFin - valor.tiempo))

      })
      .catch((error) => {
        console.log('fetch data failed', error);
      });
    //alert(valor)
  }
  useEffect(statusDeVelocidad, [valor]);

  return (
    <>
      <CProgress className="mb-3" height={30} /* md={12} */ >

        {valor.map(({ estado, id, index, tiempo, tiempoFin }) => <>
          <CProgressBar data-tip data-for={tiempoFin} key={id} color={estado === 'VelocidadOptima' ? 'success' : estado === 'VelocidadBaja' ? 'warning' : estado === 'MicroParo' ? 'warning' : estado === 'ParoCritico' ? 'danger' : 'secondary'} value={tiempo / 288000} />
          <ReactTooltip
            id={tiempoFin}
            place='bottom'
            //type='info'
            effect='solid'
            backgroundColor='#5596F9'
          >
            <Grid>
              Estado: {estado}
            </Grid>
            <Grid>
              Inicio: {tiempoFin - tiempo}
            </Grid>
            <Grid>
              Fin: {tiempoFin}
            </Grid>
            <Grid>
              Duracion: {tiempo}
            </Grid>
          </ReactTooltip>
        </>
        )}
      </CProgress>

      <div>
        <CProgress className="mb-3">
          <CProgressBar color='secondary' value={2.702702702702703} > 00:00 </CProgressBar>
          <CProgressBar color='secondary' value={2.702702702702703} > 01:00 </CProgressBar>
          <CProgressBar color="secondary" value={2.702702702702703} > 02:00 </CProgressBar>
          <CProgressBar color="secondary" value={2.702702702702703} > 03:00 </CProgressBar>
          <CProgressBar color="secondary" value={2.702702702702703} > 04:00 </CProgressBar>
          <CProgressBar color='secondary' value={2.702702702702703} > 05:00 </CProgressBar>
          <CProgressBar color="secondary" value={2.702702702702703} > 06:00 </CProgressBar>
          <CProgressBar color='secondary' value={2.702702702702703} > 07:00 </CProgressBar>
          <CProgressBar color="secondary" value={2.702702702702703} > 08:00 </CProgressBar>
          <CProgressBar color='secondary' value={2.702702702702703} > 09:00 </CProgressBar>
          <CProgressBar color="secondary" value={2.702702702702703} > 10:00 </CProgressBar>
          <CProgressBar color="secondary" value={2.702702702702703} > 11:00 </CProgressBar>
          <CProgressBar color="secondary" value={2.702702702702703} > 12:00 </CProgressBar>
          <CProgressBar color='secondary' value={2.702702702702703} > 13:00 </CProgressBar>
          <CProgressBar color="secondary" value={2.702702702702703} > 14:00 </CProgressBar>
          <CProgressBar color='secondary' value={2.702702702702703} > 15:00 </CProgressBar>
          <CProgressBar color="secondary" value={2.702702702702703} > 16:00 </CProgressBar>
          <CProgressBar color='secondary' value={2.702702702702703} > 17:00 </CProgressBar>
          <CProgressBar color="secondary" value={2.702702702702703} > 18:00 </CProgressBar>
          <CProgressBar color="secondary" value={2.702702702702703} > 19:00 </CProgressBar>
          <CProgressBar color="secondary" value={2.702702702702703} > 20:00 </CProgressBar>
          <CProgressBar color='secondary' value={2.702702702702703} > 21:00 </CProgressBar>
          <CProgressBar color="secondary" value={2.702702702702703} > 22:00 </CProgressBar>
          <CProgressBar color='secondary' value={2.702702702702703} > 23:00 </CProgressBar>
          <CProgressBar color='secondary' value={2.702702702702703} > 24:00 </CProgressBar>
          <CProgressBar color='secondary' value={2.702702702702703} > 25:00 </CProgressBar>
          <CProgressBar color='secondary' value={2.702702702702703} > 26:00 </CProgressBar>
          <CProgressBar color='secondary' value={2.702702702702703} > 27:00 </CProgressBar>
          <CProgressBar color='secondary' value={2.702702702702703} > 28:00 </CProgressBar>
          <CProgressBar color='secondary' value={2.702702702702703} > 29:00 </CProgressBar>
          <CProgressBar color='secondary' value={2.702702702702703} > 30:00 </CProgressBar>
          <CProgressBar color='secondary' value={2.702702702702703} > 31:00 </CProgressBar>
          <CProgressBar color='secondary' value={2.702702702702703} > 32:00 </CProgressBar>
          <CProgressBar color='secondary' value={2.702702702702703} > 33:00 </CProgressBar>
          <CProgressBar color='secondary' value={2.702702702702703} > 34:00 </CProgressBar>
          <CProgressBar color='secondary' value={2.702702702702703} > 35:00 </CProgressBar>
          <CProgressBar color='secondary' value={2.702702702702703} > 36:00 </CProgressBar>
        </CProgress>
      </div>
    </>
  )
}
