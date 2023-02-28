
import { CProgress, CProgressBar } from '@coreui/react'
import { Card } from '@mui/material'
//import MDBox from 'components/MDBox'
import React from 'react'
import ReactTooltip from 'react-tooltip'

export const Progress = ({datos}) => {

    // <div data-tip data-for='progressBar'>
    
  return (
    <>

<ReactTooltip
        id='progressBarJS1'
        place='bottom'
        //type='info'
        padding='8px 21px'
        backgroundColor='#ffff'
        textColor='red'
        delayShow={200}
        >
        <Card sx={{ width: 345 }}>
            <CProgress className="mb-3">
                <CProgressBar value={datos.Tanque1.Porcentaje} >{datos.Tanque1.Porcentaje.toFixed(2)} %</CProgressBar>
            </CProgress>
        </Card>
      </ReactTooltip> 

      <ReactTooltip
        id='progressBarJS2'
        place='bottom'
        //type='info'
        padding='8px 21px'
        backgroundColor='#ffff'
        textColor='red'
        delayShow={200}
        >
        <Card sx={{ width: 345 }}>
            <CProgress className="mb-3">
                <CProgressBar value={datos.Tanque2.Porcentaje} >{datos.Tanque2.Porcentaje.toFixed(2)} %</CProgressBar>
            </CProgress>
        </Card>
      </ReactTooltip> 

      <ReactTooltip
        id='progressBarJT1'
        place='bottom'
        //type='info'
        padding='8px 21px'
        backgroundColor='#ffff'
        textColor='red'
        delayShow={200}
        >
        <Card sx={{ width: 345 }}>
            <CProgress className="mb-3">
                <CProgressBar value={datos.Tanque3.Porcentaje} >{datos.Tanque3.Porcentaje.toFixed(2)} %</CProgressBar>
            </CProgress>
        </Card>
      </ReactTooltip> 

      <ReactTooltip
        id='progressBarJT2'
        place='bottom'
        //type='info'
        padding='8px 21px'
        backgroundColor='#ffff'
        textColor='red'
        delayShow={200}
        >
        <Card sx={{ width: 345 }}>
            <CProgress className="mb-3">
                <CProgressBar value={datos.Tanque4.Porcentaje} >{datos.Tanque4.Porcentaje.toFixed(2)} %</CProgressBar>
            </CProgress>
        </Card>
      </ReactTooltip> 

      <ReactTooltip
        id='progressBarJT3'
        place='bottom'
        //type='info'
        padding='8px 21px'
        backgroundColor='#ffff'
        textColor='red'
        delayShow={200}
        >
        <Card sx={{ width: 345 }}>
            <CProgress className="mb-3">
                <CProgressBar value={datos.Tanque5.Porcentaje} >{datos.Tanque5.Porcentaje.toFixed(2)} %</CProgressBar>
            </CProgress>
        </Card>
      </ReactTooltip> 

      <ReactTooltip
        id='progressBarJT4'
        place='bottom'
        //type='info'
        padding='8px 21px'
        backgroundColor='#ffff'
        textColor='red'
        delayShow={200}
        >
        <Card sx={{ width: 345 }}>
            <CProgress className="mb-3">
                <CProgressBar value={datos.Tanque6.Porcentaje} >{datos.Tanque6.Porcentaje.toFixed(2)} %</CProgressBar>
            </CProgress>
        </Card>
      </ReactTooltip> 

      <ReactTooltip
        id='progressBarJT5'
        place='bottom'
        //type='info'
        padding='8px 21px'
        backgroundColor='#ffff'
        textColor='red'
        delayShow={200}
        >
        <Card sx={{ width: 345 }}>
            <CProgress className="mb-3">
                <CProgressBar value={datos.Tanque7.Porcentaje} >{datos.Tanque7.Porcentaje.toFixed(2)} %</CProgressBar>
            </CProgress>
        </Card>
      </ReactTooltip> 

      <ReactTooltip
        id='progressBarJT6'
        place='bottom'
        //type='info'
        padding='8px 21px'
        backgroundColor='#ffff'
        textColor='red'
        delayShow={200}
        >
        <Card sx={{ width: 345 }}>
            <CProgress className="mb-3">
                <CProgressBar value={datos.Tanque8.Porcentaje} >{datos.Tanque8.Porcentaje.toFixed(2)} %</CProgressBar>
            </CProgress>
        </Card>
      </ReactTooltip> 

      <ReactTooltip
        id='progressBarJT7'
        place='bottom'
        //type='info'
        padding='8px 21px'
        backgroundColor='#ffff'
        textColor='red'
        delayShow={200}
        >
        <Card sx={{ width: 345 }}>
            <CProgress className="mb-3">
                <CProgressBar value={datos.Tanque9.Porcentaje} >{datos.Tanque9.Porcentaje.toFixed(2)} %</CProgressBar>
            </CProgress>
        </Card>
      </ReactTooltip> 


    <ReactTooltip
        id='progressBarJT10'
        place='bottom'
        //type='info'
        padding='8px 21px'
        backgroundColor='#ffff'
        textColor='red'
        delayShow={200}
        >
        <Card sx={{ width: 345 }}>
            <CProgress className="mb-3">
                <CProgressBar value={datos.Tanque12.Porcentaje} >{datos.Tanque12.Porcentaje.toFixed(2)} %</CProgressBar>
            </CProgress>
        </Card>
      </ReactTooltip> 
    </>
  )
}


