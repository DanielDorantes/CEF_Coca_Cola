import { Button, FormControl, Grid, InputLabel, MenuItem, Select } from '@mui/material'
import MDTypography from 'components/MDTypography'
import React from 'react'

export const ConteinerStatusVelocidad = ({ Nivel, Unidad, handleChangeUnidad, status }) => {
  return (
    <>
            <Button onClick={handleChangeUnidad}><MDTypography variant="h4">Garrafon Ciel { Nivel } { Unidad}</MDTypography></Button>
            <MDTypography ml={'70%'}variant="p">{status}</MDTypography>
    </>
  )
}
