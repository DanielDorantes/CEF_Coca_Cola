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

import { useState, useEffect, useMemo } from "react";

// react-router components
import { Routes, Route, Navigate, useLocation } from "react-router-dom";

// @mui material components
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Icon from "@mui/material/Icon";

// Material Dashboard 2 PRO React components
import MDBox from "components/MDBox";

// Material Dashboard 2 PRO React examples
import Sidenav from "examples/Sidenav";
import Configurator from "examples/Configurator";

// Material Dashboard 2 PRO React themes
import theme from "assets/theme";
import themeRTL from "assets/theme/theme-rtl";

// Material Dashboard 2 PRO React Dark Mode themes
import themeDark from "assets/theme-dark";
import themeDarkRTL from "assets/theme-dark/theme-rtl";

// RTL plugins
import rtlPlugin from "stylis-plugin-rtl";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";

// Material Dashboard 2 PRO React routes
import routes from "routes";

// Material Dashboard 2 PRO React contexts
import { useMaterialUIController, setMiniSidenav, setOpenConfigurator } from "context";

// Images
import brandWhite from "assets/images/logo-ct.png";
import brandDark from "assets/images/logo-ct-dark.png";
import { MainScreen } from "components/MainScreen";
import { Energias } from "layouts/Energia";
import AguaScreem from "layouts/Agua";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import { Alert } from "@mui/material";
import { ProduccionL5 } from "layouts/Produccion/L5/Produccion";
import { PCCSL5 } from "layouts/Produccion/L5/PCCS";

export default function App() {

    //REACT_APP_API_URL=http://10.21.4.61:9095/api              esta es la url de la api
  //REACT_APP_URL=http://10.21.4.61                           esta es la url base del proyecto sin el puerto
  //REACT_APP_AUTH_URL_KEYCLOAK=http://10.21.4.61:8080/auth   esta ya no la usamos
  //REACT_APP_AUTH_URL_WEBSOCKET=10.21.4.61                   esta es la url del webSocked o solo la direccion base(ip)


  //para desarrollo con ip
  //const baseUrl = process.env.REACT_APP_URL || 'http://192.168.100.13';
  //const apiUrl = process.env.REACT_APP_API_URL || 'http://192.168.100.13/5001/api';
  //const wsUrl = process.env.REACT_APP_AUTH_URL_WEBSOCKET || '192.168.100.13';

  
  //para desarrollo con localhost
  const baseUrl = process.env.REACT_APP_URL;//http://192.168.100.13
  const apiUrl = process.env.REACT_APP_API_URL;//http://192.168.100.13/5001/api
  const wsUrl = process.env.REACT_APP_AUTH_URL_WEBSOCKET;//192.168.100.13

  //alert('process = ' + process.env.REACT_APP_URL);
  //alert('process2 = ' + baseUrl);

  //alert('process = ' + process.env.REACT_APP_API_URL);
  //alert('process2 = ' + apiUrl);

  //alert('process = ' + process.env.REACT_APP_AUTH_URL_WEBSOCKET);
  //alert('process2 = ' + wsUrl);


 //alert(wsUrl);
  //para produccion
  //const baseUrl = process.env.REACT_APP_URL || 'http://10.21.4.61';
  //const apiUrl = process.env.REACT_APP_API_URL || 'http://10.21.4.61/9095/api';
  //const wsUrl = process.env.REACT_APP_AUTH_URL_WEBSOCKET || '10.21.4.61';
 //alert(wsUrl + ' ' + apiUrl)
  const [controller, dispatch] = useMaterialUIController();
  const {
    miniSidenav,
    direction,
    layout,
    openConfigurator,
    sidenavColor,
    transparentSidenav,
    whiteSidenav,
    darkMode,
  } = controller;
  const [onMouseEnter, setOnMouseEnter] = useState(false);
  const [rtlCache, setRtlCache] = useState(null);
  const { pathname } = useLocation();

  // Cache for the rtl
  useMemo(() => {
    const cacheRtl = createCache({
      key: "rtl",
      stylisPlugins: [rtlPlugin],
    });

    setRtlCache(cacheRtl);
  }, []);

  // Open sidenav when mouse enter on mini sidenav
  const handleOnMouseEnter = () => {
    if (miniSidenav && !onMouseEnter) {
      setMiniSidenav(dispatch, false);
      setOnMouseEnter(true);
    }
  };

  // Close sidenav when mouse leave mini sidenav
  const handleOnMouseLeave = () => {
    if (onMouseEnter) {
      setMiniSidenav(dispatch, true);
      setOnMouseEnter(false);
    }
  };

  // Change the openConfigurator state
  const handleConfiguratorOpen = () => setOpenConfigurator(dispatch, !openConfigurator);

  // Setting the dir attribute for the body element
  useEffect(() => {
    document.body.setAttribute("dir", direction);
  }, [direction]);

  // Setting page scroll to 0 when changing the route
  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, [pathname]);

  const getRoutes = (allRoutes) =>
    allRoutes.map((route) => {
      if (route.collapse) {
        return getRoutes(route.collapse);
      }

      if (route.route) {
        return <Route exact path={route.route} element={route.component} key={route.key} />;
      }

      return null;
    });

  const configsButton = (
    <MDBox
      display="flex"
      justifyContent="center"
      alignItems="center"
      width="3.25rem"
      height="3.25rem"
      bgColor="white"
      shadow="sm"
      borderRadius="50%"
      position="fixed"
      right="2rem"
      bottom="2rem"
      zIndex={99}
      color="dark"
      sx={{ cursor: "pointer" }}
      onClick={handleConfiguratorOpen}
    >
      <Icon fontSize="small" color="inherit">
        settings
      </Icon>
    </MDBox>
  );

  return direction === "rtl" ? (
    <CacheProvider value={rtlCache}>
      <ThemeProvider theme={darkMode ? themeDarkRTL : themeRTL}>
        <CssBaseline />
        {layout === "dashboard" && (
          <>
            {/*<Sidenav
              color={sidenavColor}
              brand={(transparentSidenav && !darkMode) || whiteSidenav ? brandDark : brandWhite}
              brandName="Material Dashboard PRO"
              routes={routes}
              onMouseEnter={handleOnMouseEnter}
              onMouseLeave={handleOnMouseLeave}
            />*/}
            <Configurator />
            {configsButton}
          </>
        )}
        {layout === "vr" && <Configurator />}
        <Routes>
          {getRoutes(routes)}
          <Route path="*" element={<MainScreen to="/" />} />
        </Routes>
      </ThemeProvider>
    </CacheProvider>
  ) : (
    <ThemeProvider theme={darkMode ? themeDark : theme}>
      <CssBaseline />
      {layout === "dashboard" && (
        <>
          <Sidenav
            color={sidenavColor}
            brand={(transparentSidenav && !darkMode) || whiteSidenav ? brandDark : brandWhite}
            brandName="CEF"
            routes={routes}
            onMouseEnter={handleOnMouseEnter}
            onMouseLeave={handleOnMouseLeave}
          />
          <Configurator />
          {configsButton}
        </>
      )}
      {layout === "vr" && <Configurator />}
        <DashboardLayout>
          {/*<DashboardNavbar />             navbar de la app, activar quitando este comentario y dejando la etiqueta  */}
          <Routes>
            {getRoutes(routes)}
          </Routes>
        </DashboardLayout>
      <Footer />
    </ThemeProvider>
  );
}
