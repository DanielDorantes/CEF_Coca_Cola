/**
=========================================================
* Material Dashboard 2 PRO React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-pro-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// @mui material components
import Card from "@mui/material/Card";
import Tooltip from "@mui/material/Tooltip";
import Icon from "@mui/material/Icon";
import Grid from "@mui/material/Grid";

// Material Dashboard 2 PRO React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import MDBadgeDot from "components/MDBadgeDot";
import ReactECharts from "echarts-for-react";
import FileDownloadIcon from '@mui/icons-material/FileDownload';
//import PieChart from "examples/Charts/PieChart";

// Data
import channelChartData from "layouts/dashboards/sales/components/ChannelsChart/data";

import Modal from '@mui/material/Modal';

// Material Dashboard 2 PRO React contexts
import { useMaterialUIController } from "context";
import { useEffect, useState } from "react";
import { Box } from "@mui/system";
import { Autocomplete, Divider, FormControl, FormControlLabel, FormLabel, IconButton, InputLabel, MenuItem, OutlinedInput, Radio, RadioGroup, Select, TextField, Typography } from "@mui/material";
//import dataTableData from "../../data/dataTableData";
import DataTable from "examples/Tables/DataTable";
//import { item } from "examples/Sidenav/styles/sidenavItem";
//import dataTableData from "layouts/applications/data-tables/data/dataTableData";
import { DatePicker, LocalizationProvider } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { es } from 'date-fns/locale';
import moment from "moment";
import MDInput from "components/MDInput";
import Scrollbars from "react-custom-scrollbars";
import { SavePDFTable } from "assets/PDF/SavePDF";
import {VictoryAnimation, VictoryLabel, VictoryPie, VictoryTheme} from 'victory';
import { CircularProgressbar, buildStyles  } from 'react-circular-progressbar';
import { ChartPieBase } from "./chartPie";

moment.locale("es-mx");
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};


function ChannelsChart({ porcentaje,chart, funBotton }) {

  //console.log(chart);
  let datos = [];
  const [Data, setDate] = useState([]);
  const baseUrl = process.env.REACT_APP_AUTH_URL_WEBSOCKET || 'localhost';
  const [turno, setTurno] = useState("1");
  const [fecha, setFecha] = useState(moment(Date.now()).subtract(1, "days"));

  let url = `http://${baseUrl}:1880/api/getProduccionPCCL5/${turno}/${fecha.format('YYYY-MM-DD')}`;

  const DownloadClick = (data) => {
    //alert(event);
    console.log("inicializando la impresion del archivo");
    SavePDFTable(
      data
      ,`REPORTE DE CONSUMO DE PRODUCCION PCC5 ${moment(Date.now()).format("DD-MM-YYYY")}`
      );
    console.log("tarea finalizada");
  }


  const reporte = async () => {
    //console.log(url);
    try {
        const response3 = await fetch(url);
        datos = await response3.json();
        //console.log(url);
        //console.log(datos)
        //fill();
        //enableRefresh();
        setDate(datos);
          //console.log(DatosActual);
            //disableNoData();
        
    } catch (error) {
        console.log('Hay un error: ' + error);
    }
  }
  //url
  useEffect(reporte, [turno, fecha])

  //setTimeout(reporte, 1000);
  
  /*
  setTimeout(async () => {
    const url = `http://${baseUrl}:1880/api/getProduccionPCCL5/${turno}/${fecha}`;
    console.log(url);
    //console.log(url);
    try {
        const response3 = await fetch(url);
        datos = await response3.json();
        
        //fill();
        //enableRefresh();
        setDate(datos);
          //console.log(DatosActual);
            //disableNoData();
        
    } catch (error) {
        console.log('Hay un error: ' + error);
    }
  }, 1000);*/

  const dataTableData = {
    columns: [
      { Header: "Área", accessor: "Area" },
      { Header: "Hora", accessor: "Hora" },
      { Header: "Tiempo de produccion", accessor: "TiempoProduccion" },
      { Header: "Cajas fisicas", accessor: "CajasFisicas", width: "20%" },
      { Header: "Cajas unidad", accessor: "CajasUnidad", width: "25%" },
      { Header: "Rechazos", accessor: "Rechazos" },
      { Header: "Indice de llenado", accessor: "IndiceCalidad", width: "7%" },
    ],
  
    rows: Data,
  };
  const [open, setOpen] = useState(false);

  const styleTable = {
    position: 'absolute',
    top: '10%',
    left: '30%',
    transform: 'translate(-20%, 0%)',
    width: '75%',
    height:'75%',
    bgcolor: 'background.paper',
    //border: '2px solid #000',
    borderRadius: '30px',
    //boxShadow: 24,
    //p: 4,
  };

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 1200,
    height:800 ,
    bgcolor: 'background.paper',
    //border: '2px solid #000',
    borderRadius: '30px',
    boxShadow: 24,
    p: 4,
  };

  const ReporteProduccion = (e) => setOpen(true);

  const handleClose = () => setOpen(false);
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;

  const handleChangeTurno = (event) => {
    setTurno(event.target.value);
    //console.log(event);
  }  

  return (
    <>
    <Card sx={{ height: "100%" }}>
      <MDBox display="flex" justifyContent="space-between" alignItems="center" pt={2} px={2}>
        <MDTypography variant="h6">Produccion</MDTypography>
        
      </MDBox>
      <MDBox mt={3}>
        <Grid container alignItems="center">
          <Grid item xs={4} p={3} ml={'10%'}>
          {/*<ReactECharts
            option={chart}
            height="12.5rem" 
          />*/}
          <MDTypography variant="p">Unidades de produccion</MDTypography>
          <ChartPieBase porcentaje = {porcentaje.Produccion || 10} />
          </Grid>
          <Grid item xs={4} p={3} ml={'10%'}>
          {/*<ReactECharts
            option={chart}
            height="12.5rem" 
          />*/}
          <MDTypography variant="p">Tiempo de produccion</MDTypography>
          <ChartPieBase porcentaje = {porcentaje.Tiempos || 50} />
          </Grid>
        </Grid>
      </MDBox>
      <Divider />
      <MDBox
        pt={4}
        pb={2}
        px={2}
        display="flex"
        flexDirection={{ xs: "column", sm: "row" }}
        mt="auto"
      >
        <MDBox width={{ xs: "100%", sm: "100%" }} textAlign="right" mt={{ xs: 2, sm: "auto" }}>
          <MDButton color={darkMode ? "white" : "light"} value={funBotton} onClick={ ReporteProduccion }>Reporte</MDButton>
        </MDBox>
      </MDBox>
    </Card>
    <Modal
    open={open}
    onClose={handleClose}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description"
  >
    {/*<Box sx={style}>*/}
      <MDBox sx={styleTable} mb={3}>
        <Card>
          <MDBox p={3} lineHeight={3}>
          <Grid container>
            <Grid item xs={10}>
              <h4>Reporte de produccion</h4>
            </Grid>
            <Tooltip title="See traffic channels" placement="bottom" arrow>
          <IconButton
                  aria-label="FileDownload"
                  aria-controls="basic-menu"
                  aria-haspopup="true"
                  onClick={() => DownloadClick(dataTableData.rows)}
                >
                  <FileDownloadIcon fontSize="inherit" />
                </IconButton>
        </Tooltip>
          </Grid>
          <Grid container spacing={2} sx={{ mb: 2 }}>
          <Grid item>
            <LocalizationProvider dateAdapter={AdapterDateFns} locale={es}>
              <DatePicker
                label="Fecha"
                value={fecha}
                onChange={(newValue) => /*alert(fecha.format('YYYY-MM-DD')) */setFecha(moment(newValue))}
                renderInput={(params) => <TextField {...params} size="small" />}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item>{/*
          <FormControl sx={{ width: 250 }} size="medium">
            <InputLabel id="demo-multiple-name-label">Turno</InputLabel>
            <Select
              labelId="demo-multiple-name-label"
              id="demo-multiple-name"
              value={turno}
              onChange={handleChangeTurno}
              input={<OutlinedInput label="Turno" />}
              MenuProps={MenuProps}
            >
                <MenuItem
                  key={1}
                  value={"1"}
                >
                  {"Turno 1"}
                </MenuItem>
                <MenuItem
                  key={2}
                  value={"2"}
                >
                  {"Turno 2"}
                </MenuItem>
            </Select>
            </FormControl>*/}
            {/*<MDBox mb={1} spacing={2} sx={{ mb: 2 }} >
              <MDButton variant={turno==1 ? "gradient" : "outlined"} value={"1"} color="info" onClick={ handleChangeTurno }>Turno 1</MDButton>
              <MDButton variant={turno==2 ? "gradient" : "outlined"} value={"2"} color="info" onClick={ handleChangeTurno }>Turno 2</MDButton>
          </MDBox>*/}
            <FormControl>
              <RadioGroup
                row
               aria-labelledby="demo-controlled-radio-buttons-group"
                name="controlled-radio-buttons-group"
                value={turno}
                onChange={handleChangeTurno}
              >
                <FormControlLabel value="1" control={<Radio />} label="Turno 1" />
                <FormControlLabel value="2" control={<Radio />} label="Turno 2" />
              </RadioGroup>
            </FormControl>
          </Grid>
        </Grid>
      </MDBox>
      <DataTable table={dataTableData} />
    </Card>
    </MDBox>
    {/*</Box>*/}
  </Modal>
  </>
  );
}

export default ChannelsChart;
