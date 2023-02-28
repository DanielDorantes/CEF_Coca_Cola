import { FormControl, Grid, IconButton, InputLabel, MenuItem, OutlinedInput, Select, TextField } from '@mui/material'
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import MDBox from 'components/MDBox'
import ComplexStatisticsCard from 'examples/Cards/StatisticsCards/ComplexStatisticsCard'
import SearchIcon from "@mui/icons-material/Search";
import React, { useEffect, useMemo, useState } from 'react'
import Card from "@mui/material/Card";
import LoopIcon from "@mui/icons-material/Loop";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2'
import MDTypography from 'components/MDTypography';
import DataTable from 'examples/Tables/DataTable';
import moment from 'moment';
import { DatePicker, LocalizationProvider } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { es } from 'date-fns/locale';
import { Scrollbars } from 'react-custom-scrollbars';
import { SavePDF } from 'assets/PDF/SavePDF';

export const DRAgua = ({ datos = {
  Taxte: 0,
  Japama: 0,
  L1: 0,
  L2: 0,
  L3: 0,
  L5: 0
} }) => {

  return (
    <>
      {/*<MDTypography variant="h3">Agua</MDTypography>*/}
      <MDBox mt={1}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={2}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="success"
                icon="opacity"
                title="Taxtes"
                count={datos.Taxte + " m³"}
                percentage={{
                  color: "success",
                  amount: "",
                  label: "",
                }}

              />
            </MDBox>
          </Grid>

          <Grid item xs={12} md={6} lg={2}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="success"
                icon="opacity"
                title="Japama"
                count={datos.Japama + " m³"}
                percentage={{
                  color: "success",
                  amount: "",
                  label: "",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={2}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                //color="dark"
                icon="opacity"
                title="L1"
                count={datos.L1 + " m³"}
                percentage={{
                  color: "success",
                  amount: "",
                  label: "",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={2}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                icon="opacity"
                title="L2"
                count={datos.L2 + " m³"}
                percentage={{
                  color: "success",
                  amount: "",
                  label: "",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={2}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                icon="opacity"
                title="L3"
                count={datos.L3 + " m³"}
                percentage={{
                  color: "success",
                  amount: "",
                  label: "",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={2}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                icon="opacity"
                title="L5"
                count={datos.L5 + " m³"}
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
    </>
  );
}

