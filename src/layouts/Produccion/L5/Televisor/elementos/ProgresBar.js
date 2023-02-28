import React, { useEffect, useState } from 'react'
import { CProgress, CProgressBar } from '@coreui/react'

export const ProgresBar = ({Historicos=[{id:0,tiempo:0,Alerta:"warning",Fecha:"1995-03-19T11:45:07.090Z",factor:""}]}) => {


    const datos = Historicos.map(({Alerta, id, tiempo}) => <CProgressBar key={id}  color={Alerta} value={tiempo/864} />)
    //const [valorBar, setValorBar] = useState();
    //if(title === "Ozono Lavadora")
      //setValorBar(OzonoL5);
  return (
    <>
    <div>
        <CProgress className="mb-3" height={30}>
            {datos}
        </CProgress>
      </div>
      <div>
        <CProgress className="mb-3">
          {/* 00:00 */}
          <CProgressBar  color='dark' value={2.0833} >00:00</CProgressBar>
          <CProgressBar  color='secondary'  value={2.0833} >00:30</CProgressBar>

          {/* 01:00 */}
          <CProgressBar  color='dark' value={2.0833} >01:00</CProgressBar>
          <CProgressBar  color='secondary'  value={2.0833} >01:30</CProgressBar>

          {/* 02:00 */}
          <CProgressBar  color='dark' value={2.0833} >02:00</CProgressBar>
          <CProgressBar  color='secondary'  value={2.0833} >02:30</CProgressBar>

          {/* 03:00 */}
          <CProgressBar  color='dark' value={2.0833} >03:00</CProgressBar>
          <CProgressBar  color='secondary'  value={2.0833} >03:30</CProgressBar>

          {/* 04:00 */}
          <CProgressBar  color='dark' value={2.0833} >04:00</CProgressBar>
          <CProgressBar  color='secondary'  value={2.0833} >04:30</CProgressBar>

          {/* 05:00 */}
          <CProgressBar  color='dark' value={2.0833} >05:00</CProgressBar>
          <CProgressBar  color='secondary'  value={2.0833} >05:30</CProgressBar>

          {/* 06:00 */}
          <CProgressBar  color='dark' value={2.0833} >06:00</CProgressBar>
          <CProgressBar  color='secondary'  value={2.0833} >06:30</CProgressBar>

          {/* 07:00 */}
          <CProgressBar  color='dark' value={2.0833} >07:00</CProgressBar>
          <CProgressBar  color='secondary'  value={2.0833} >07:30</CProgressBar>

          {/* 08:00 */}
          <CProgressBar  color='dark' value={2.0833} >08:00</CProgressBar>
          <CProgressBar  color='secondary'  value={2.0833} >08:30</CProgressBar>

          {/* 09:00 */}
          <CProgressBar  color='dark' value={2.0833} >09:00</CProgressBar>
          <CProgressBar  color='secondary'  value={2.0833} >09:30</CProgressBar>

          {/* 10:00 */}
          <CProgressBar  color='dark' value={2.0833} >10:00</CProgressBar>
          <CProgressBar  color='secondary'  value={2.0833} >10:30</CProgressBar>

          {/* 11:00 */}
          <CProgressBar  color='dark' value={2.0833} >11:00</CProgressBar>
          <CProgressBar  color='secondary'  value={2.0833} >11:30</CProgressBar>

          {/* 12:00 */}
          <CProgressBar  color='dark' value={2.0833} >12:00</CProgressBar>
          <CProgressBar  color='secondary'  value={2.0833} >12:30</CProgressBar>

          {/* 13:00 */}
          <CProgressBar  color='dark' value={2.0833} >13:00</CProgressBar>
          <CProgressBar  color='secondary'  value={2.0833} >13:30</CProgressBar>

          {/* 14:00 */}
          <CProgressBar  color='dark' value={2.0833} >14:00</CProgressBar>
          <CProgressBar  color='secondary'  value={2.0833} >14:30</CProgressBar>

          {/* 15:00 */}
          <CProgressBar  color='dark' value={2.0833} >15:00</CProgressBar>
          <CProgressBar  color='secondary'  value={2.0833} >15:30</CProgressBar>

          {/* 16:00 */}
          <CProgressBar  color='dark' value={2.0833} >16:00</CProgressBar>
          <CProgressBar  color='secondary'  value={2.0833} >16:30</CProgressBar>

          {/* 17:00 */}
          <CProgressBar  color='dark' value={2.0833} >17:00</CProgressBar>
          <CProgressBar  color='secondary'  value={2.0833} >17:30</CProgressBar>

          {/* 18:00 */}
          <CProgressBar  color='dark' value={2.0833} >18:00</CProgressBar>
          <CProgressBar  color='secondary'  value={2.0833} >18:30</CProgressBar>

          {/* 19:00 */}
          <CProgressBar  color='dark' value={2.0833} >19:00</CProgressBar>
          <CProgressBar  color='secondary'  value={2.0833} >19:30</CProgressBar>

          {/* 20:00 */}
          <CProgressBar  color='dark' value={2.0833} >20:00</CProgressBar>
          <CProgressBar  color='secondary'  value={2.0833} >20:30</CProgressBar>

          {/* 21:00 */}
          <CProgressBar  color='dark' value={2.0833} >21:00</CProgressBar>
          <CProgressBar  color='secondary'  value={2.0833} >21:30</CProgressBar>

          {/* 22:00 */}
          <CProgressBar  color='dark' value={2.0833} >22:00</CProgressBar>
          <CProgressBar  color='secondary'  value={2.0833} >22:30</CProgressBar>

          {/* 23:00 */}
          <CProgressBar  color='dark' value={2.0833} >23:00</CProgressBar>
          <CProgressBar  color='secondary'  value={2.0833} >23:30</CProgressBar>
        </CProgress>
      </div>
      </>
  )
}

