import React, { useState } from 'react'
import { Grid } from '@mui/material';

import MDBox from 'components/MDBox';
import MDTypography from 'components/MDTypography';
import SalesTable from 'examples/Tables/SalesTable';


export const DREnergia = ({datos = {
                            consumoDiaTR1: 0,
                            factorPotenciaTR1: 0,
                            consumoDiaTR2: 0,
                            factorPotenciaTR2: 0,
                            consumoDiaTR3: 0,
                            factorPotenciaTR3: 0
                          }}) => {

    

    let datoOnline1 = [
        { Indicador: [null, "kW h"], Valor: (datos.consumoDiaTR1 || 0).toFixed(2) + " kW⋅h" },
        { Indicador: [null, "Factor Potencia"], Valor: (datos.factorPotenciaTR1 || 0).toFixed(2) + " FP" }
    ];

    let datoOnline2 = [
      { Indicador: [null, "kW h"], Valor: (datos.consumoDiaTR2 || 0).toFixed(2) + " kW⋅h" },
      { Indicador: [null, "Factor Potencia"], Valor: (datos.factorPotenciaTR2 || 0).toFixed(2) + " FP" }
  ];

  let datoOnline3 = [
    { Indicador: [null, "kW h"], Valor: (datos.consumoDiaTR3 || 0).toFixed(2) + " kW⋅h" },
    { Indicador: [null, "Factor Potencia"], Valor: (datos.factorPotenciaTR3 || 0).toFixed(2) + " FP" }
];
  return (
    <>
    {/*<MDTypography variant="h3">Energia</MDTypography>*/}
        <MDBox mb={4}>
          <Grid container spacing={0.5}>
          <Grid item xs={12} lg={3}>
              <SalesTable width='10%' title="Tranformador 1" rows={datoOnline1} alert={datos.factorPotenciaTR1<0.95} />
            </Grid>
            <Grid item xs={12} lg={3}>
              <SalesTable autoPageSize="true" title="Transformador 2" rows={datoOnline2} alert={datos.factorPotenciaTR2<0.95} />
            </Grid>
            <Grid item xs={12} lg={3}>
              <SalesTable autoPageSize="true" title="Transformador 3" rows={datoOnline3} alert={datos.factorPotenciaTR3<0.95} />
            </Grid>
            <Grid item xs={12} lg={3}>
              {<SalesTable autoPageSize="true" title="Indicadores"  />}
            </Grid>
          </Grid>
        </MDBox>
    </>
  )
}


