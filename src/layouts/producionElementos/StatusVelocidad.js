import {  Grid    } from '@mui/material';
import React from 'react'
import { ConteinerStatusVelocidad } from './ConteinerStatusVelocidad';

export const StatusVelocidad = ({ statusVelocidad = {}, Nivel, Unidad, handleChangeUnidad }) => {


  return (
    <Grid container >
      <Grid item xs={12} lg={12}>
        {
          statusVelocidad.statusActual === 'success' ?
            <div className="alert alert-success" role="alert">
              <ConteinerStatusVelocidad
                Nivel={Nivel}
                Unidad={Unidad}
                handleChangeUnidad={handleChangeUnidad}
                status='Velocidad optima'
              />
            </div> :
            statusVelocidad.statusActual === 'warning' ?
              <div className="alert alert-warning" role="alert">
                <ConteinerStatusVelocidad
                  Nivel={Nivel}
                  Unidad={Unidad}
                  handleChangeUnidad={handleChangeUnidad}
                  status='baja velocidad/micro paro'
                />
              </div> :
              statusVelocidad.statusActual === 'danger' ?
                <div className="alert alert-danger" role="alert">
                  <ConteinerStatusVelocidad
                    Nivel={Nivel}
                    Unidad={Unidad}
                    handleChangeUnidad={handleChangeUnidad}
                    status='paro critico'
                  />
                </div> :
                <div className="alert alert-dark" role="alert">
                  <ConteinerStatusVelocidad
                    Nivel={Nivel}
                    Unidad={Unidad}
                    handleChangeUnidad={handleChangeUnidad}
                    status='sin señal'
                  />
                </div>
        }
      </Grid>
    </Grid>
  )
}

{/* 
            <Grid item xs={12} lg={9}>
                <MDTypography variant="h4">Ciel: { Nivel } { Unidad}</MDTypography>
                <FormControl sx={{ m: 4, minWidth: 120 }}>
                <InputLabel id="demo-simple-select-label">cambiar unidad</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={UnidadMedicion}
                  label="cambiar unidad"
                  onChange={handleChangeUnidad}
                  >
                  <MenuItem value={1}>Metros cubicos</MenuItem>
                  <MenuItem value={1000}>Litros</MenuItem>
                </Select>
              </FormControl>
                </Grid>
                <Grid item xs={12} lg={3}>
                Velocidad optima
                </Grid>
            */}