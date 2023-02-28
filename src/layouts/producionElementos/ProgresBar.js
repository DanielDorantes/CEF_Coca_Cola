import React, { useEffect, useState } from 'react'
import { CProgress, CProgressBar } from '@coreui/react'
import ReactTooltip from 'react-tooltip';
import { Autocomplete, Box, Grid, Modal, TextField, Typography } from '@mui/material';

//import '@coreui/coreui/dist/css/coreui.min.css'

//import './estilos.scss';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 750,
  height: 750,
  //width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

export const ProgresBar = ({ turno }) => {

  const top100Films = () => [
    { label: 'The Shawshank Redemption', year: 1994 },
    { label: 'The Godfather', year: 1972 },
    { label: 'The Godfather: Part II', year: 1974 },
    { label: 'The Dark Knight', year: 2008 },
    { label: '12 Angry Men', year: 1957 },
    { label: "Schindler's List", year: 1993 },
    { label: 'Pulp Fiction', year: 1994 },
    {
      label: 'The Lord of the Rings: The Return of the King',
      year: 2003,
    },
    { label: 'The Good, the Bad and the Ugly', year: 1966 },
    { label: 'Fight Club', year: 1999 },
    {
      label: 'The Lord of the Rings: The Fellowship of the Ring',
      year: 2001,
    },
    {
      label: 'Star Wars: Episode V - The Empire Strikes Back',
      year: 1980,
    },
    { label: 'Forrest Gump', year: 1994 },
    { label: 'Inception', year: 2010 },
    {
      label: 'The Lord of the Rings: The Two Towers',
      year: 2002,
    },
    { label: "One Flew Over the Cuckoo's Nest", year: 1975 },
    { label: 'Goodfellas', year: 1990 },
    { label: 'The Matrix', year: 1999 },
    { label: 'Seven Samurai', year: 1954 },
    {
      label: 'Star Wars: Episode IV - A New Hope',
      year: 1977,
    },
    { label: 'City of God', year: 2002 },
    { label: 'Se7en', year: 1995 },
    { label: 'The Silence of the Lambs', year: 1991 },
    { label: "It's a Wonderful Life", year: 1946 },
    { label: 'Life Is Beautiful', year: 1997 },
    { label: 'The Usual Suspects', year: 1995 },
    { label: 'Léon: The Professional', year: 1994 },
    { label: 'Spirited Away', year: 2001 },
    { label: 'Saving Private Ryan', year: 1998 },
    { label: 'Once Upon a Time in the West', year: 1968 },
    { label: 'American History X', year: 1998 },
    { label: 'Interstellar', year: 2014 },
    { label: 'Casablanca', year: 1942 },
    { label: 'City Lights', year: 1931 },
    { label: 'Psycho', year: 1960 },
    { label: 'The Green Mile', year: 1999 },
    { label: 'The Intouchables', year: 2011 },
    { label: 'Modern Times', year: 1936 },
    { label: 'Raiders of the Lost Ark', year: 1981 },
    { label: 'Rear Window', year: 1954 },
    { label: 'The Pianist', year: 2002 },
    { label: 'The Departed', year: 2006 },
    { label: 'Terminator 2: Judgment Day', year: 1991 },
    { label: 'Back to the Future', year: 1985 },
    { label: 'Whiplash', year: 2014 },
    { label: 'Gladiator', year: 2000 },
    { label: 'Memento', year: 2000 },
    { label: 'The Prestige', year: 2006 },
    { label: 'The Lion King', year: 1994 },
    { label: 'Apocalypse Now', year: 1979 },
    { label: 'Alien', year: 1979 },
    { label: 'Sunset Boulevard', year: 1950 },
    {
      label: 'Dr. Strangelove or: How I Learned to Stop Worrying and Love the Bomb',
      year: 1964,
    },
    { label: 'The Great Dictator', year: 1940 },
    { label: 'Cinema Paradiso', year: 1988 },
    { label: 'The Lives of Others', year: 2006 },
    { label: 'Grave of the Fireflies', year: 1988 },
    { label: 'Paths of Glory', year: 1957 },
    { label: 'Django Unchained', year: 2012 },
    { label: 'The Shining', year: 1980 },
    { label: 'WALL·E', year: 2008 },
    { label: 'American Beauty', year: 1999 },
    { label: 'The Dark Knight Rises', year: 2012 },
    { label: 'Princess Mononoke', year: 1997 },
    { label: 'Aliens', year: 1986 },
    { label: 'Oldboy', year: 2003 },
    { label: 'Once Upon a Time in America', year: 1984 },
    { label: 'Witness for the Prosecution', year: 1957 },
    { label: 'Das Boot', year: 1981 },
    { label: 'Citizen Kane', year: 1941 },
    { label: 'North by Northwest', year: 1959 },
    { label: 'Vertigo', year: 1958 },
    {
      label: 'Star Wars: Episode VI - Return of the Jedi',
      year: 1983,
    },
    { label: 'Reservoir Dogs', year: 1992 },
    { label: 'Braveheart', year: 1995 },
    { label: 'M', year: 1931 },
    { label: 'Requiem for a Dream', year: 2000 },
    { label: 'Amélie', year: 2001 },
    { label: 'A Clockwork Orange', year: 1971 },
    { label: 'Like Stars on Earth', year: 2007 },
    { label: 'Taxi Driver', year: 1976 },
    { label: 'Lawrence of Arabia', year: 1962 },
    { label: 'Double Indemnity', year: 1944 },
    {
      label: 'Eternal Sunshine of the Spotless Mind',
      year: 2004,
    },
    { label: 'Amadeus', year: 1984 },
    { label: 'To Kill a Mockingbird', year: 1962 },
    { label: 'Toy Story 3', year: 2010 },
    { label: 'Logan', year: 2017 },
    { label: 'Full Metal Jacket', year: 1987 },
    { label: 'Dangal', year: 2016 },
    { label: 'The Sting', year: 1973 },
    { label: '2001: A Space Odyssey', year: 1968 },
    { label: "Singin' in the Rain", year: 1952 },
    { label: 'Toy Story', year: 1995 },
    { label: 'Bicycle Thieves', year: 1948 },
    { label: 'The Kid', year: 1921 },
    { label: 'Inglourious Basterds', year: 2009 },
    { label: 'Snatch', year: 2000 },
    { label: '3 Idiots', year: 2009 },
    { label: 'Monty Python and the Holy Grail', year: 1975 },
  ];


  const [id, setId] = useState(0);
  const [Estado, setEstado] = useState('');
  const [Inicio, setInicio] = useState('');
  const [Fin, setFin] = useState('');
  const [Duracion, setDuracion] = useState('');
  const [open, setOpen] = useState(false);



  const calcularDuracion = (tiempo) => {
    const Horas = parseInt(tiempo / 3600000);//el parseInt tiene la funcion de convertir los valores a enteros para que estos no sean impresos como decimales, es decir sean valores redondos
    const Minutos = parseInt((tiempo - (Horas * 3600000)) / 60000);

    return (Horas < 10 ? '0' + Horas : Horas) + ':' + (Minutos < 10 ? '0' + Minutos : Minutos);
  }

  const calcularFecha = (tiempo) => {
    const Hora = new Date(tiempo).getHours() < 10 ? '0' + new Date(tiempo).getHours() : new Date(tiempo).getHours();
    const Minuto = new Date(tiempo).getMinutes() < 10 ? '0' + new Date(tiempo).getMinutes() : new Date(tiempo).getMinutes();

    const fullTime = Hora + ':' + Minuto;
    return fullTime
  }

  const wsUrl = process.env.REACT_APP_AUTH_URL_WEBSOCKET;//192.168.100.13
  const [valor, setValor] = useState([])
  const statusDeVelocidad = () => {
    fetch(`http://${wsUrl}:1880/api/statusVelocidad/${turno}`)
      .then((response) => response.json())
      .then((json) => {
        setValor(json);
      })
      .catch((error) => {
        // console.log('fetch data failed', error);
      });
    //alert(valor)
  }
  useEffect(statusDeVelocidad, [valor]);

  //console.log(valor);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = (estado, tiempoFin, tiempo) => {
    //alert(saludo)
    setId(tiempoFin);
    setEstado(estado === 'VelocidadOptima' ? 'Velocidad Optima' : estado === 'VelocidadBaja' ? 'Velocidad Baja' : estado === 'MicroParo' ? 'Micro Paro' : estado === 'ParoCritico' ? 'Paro Critico' : 'Apagado/Sin señal');
    setInicio(tiempoFin ? calcularFecha(tiempoFin - tiempo) : calcularFecha(new Date() - tiempo));
    setFin(tiempoFin ? calcularFecha(parseInt(tiempoFin)) : 'en proceso');
    setDuracion(calcularDuracion(parseInt(tiempo)));
    setOpen(true);
  }


  return (
    <>
      {/*
      <ReactTooltip
        id='progressBar'
        place='bottom'
        //type='info'
        effect='solid'
        backgroundColor='#5596F9'
      >
        <CProgress className="mb-3">
          <CProgressBar  color='success' value={100} >Velocidad Optima</CProgressBar>
        </CProgress>
        <CProgress className="mb-3">
          <CProgressBar color='#900' variant="striped" animated value={100} >Velocidad Baja</CProgressBar>
        </CProgress>
        <CProgress className="mb-3">
          <CProgressBar  color='warning' value={100} >Micro paro</CProgressBar>
        </CProgress>
        <CProgress className="mb-3">
          <CProgressBar  color='danger' value={100} >Paro Critico</CProgressBar>
        </CProgress>
        <CProgress className="mb-3">
          <CProgressBar  color='secondary' value={100} >Sin señal/Apagado</CProgressBar>
        </CProgress>
      </ReactTooltip>  
*/}

      {
        //<div data-tip data-for='progressBar'>
        //VelocidadOptima
        //VelocidadBaja
        //MicroParo
        //ParoCritico
        //Apagado/SinSeñal
        //</div>
      }
      <CProgress className="mb-3" height={30} /* md={12} */ >

        {valor.map(({ estado, id, index, tiempo, tiempoFin }) => <>
          <CProgressBar data-tip data-for={tiempoFin} key={id} onClick={() => handleOpen(estado, tiempoFin, tiempo)} color={estado === 'VelocidadOptima' ? 'success' : estado === 'VelocidadBaja' ? 'warning' : estado === 'MicroParo' ? 'warning' : estado === 'ParoCritico' ? 'danger' : 'secondary'} value={tiempo / 288000} />
          <ReactTooltip
            id={tiempoFin}
            place='bottom'
            //type='info'
            effect='solid'
            // backgroundColor='#5596F9'
            backgroundColor='#FFFFFF'
          >
            <Grid>
              <Typography color='#000000'> Estado: {estado}</Typography>
            </Grid>
            <Grid>
              {tiempoFin ? <Typography color='#000000'> Inicio: {calcularFecha(tiempoFin - tiempo)}</Typography> : <Typography color='#000000'> Inicio: {calcularFecha(new Date() - tiempo)}</Typography>}
            </Grid>
            <Grid>
              {tiempoFin ? <Typography color='#000000'> Fin: {calcularFecha(parseInt(tiempoFin))}</Typography> : <Typography color='#000000'> Fin: en proceso</Typography>}
            </Grid>
            <Grid>
              <Typography color='#000000'> Duracion: {calcularDuracion(parseInt(tiempo))}</Typography>
            </Grid>
          </ReactTooltip>
        </>
        )}
      </CProgress>

      <div>
        <CProgress className="mb-3">
          <CProgressBar color='dark' variant="striped" value={3.125} >{turno == 1 ? '06:30' : '14:30'}</CProgressBar>
          <CProgressBar color="secondary " variant="striped" animated value={3.125} >{turno == 1 ? ':45' : ':45'}</CProgressBar>
          <CProgressBar color="dark" value={3.125} >{turno == 1 ? '07' : '15'}</CProgressBar>
          <CProgressBar color="secondary " variant="striped" animated value={3.125} >{turno == 1 ? ':15' : ':15'}</CProgressBar>
          <CProgressBar color='secondary' value={3.125} >{turno == 1 ? ':30' : ':30'}</CProgressBar>
          <CProgressBar color="secondary " variant="striped" animated value={3.125} >{turno == 1 ? ':45' : ':45'}</CProgressBar>
          <CProgressBar color='dark' value={3.125} >{turno == 1 ? '08' : '16'}</CProgressBar>
          <CProgressBar color="secondary " variant="striped" animated value={3.125} >{turno == 1 ? ':15' : ':15'}</CProgressBar>
          <CProgressBar color='secondary' value={3.125} >{turno == 1 ? ':30' : ':30'}</CProgressBar>
          <CProgressBar color="secondary " variant="striped" animated value={3.125} >{turno == 1 ? ':45' : ':45'}</CProgressBar>
          <CProgressBar color="dark" value={3.125} >{turno == 1 ? '09' : '17'}</CProgressBar>
          <CProgressBar color="secondary " variant="striped" animated value={3.125} >{turno == 1 ? ':15' : ':15'}</CProgressBar>
          <CProgressBar color='secondary' value={3.125} >{turno == 1 ? ':30' : ':30'}</CProgressBar>
          <CProgressBar color="secondary " variant="striped" animated value={3.125} >{turno == 1 ? ':45' : ':45'}</CProgressBar>
          <CProgressBar color='dark' value={3.125} >{turno == 1 ? '10' : '18'}</CProgressBar>
          <CProgressBar color="secondary " variant="striped" animated value={3.125} >{turno == 1 ? ':15' : ':15'}</CProgressBar>
          <CProgressBar color='secondary' value={3.125} >{turno == 1 ? ':30' : ':30'}</CProgressBar>
          <CProgressBar color="secondary " variant="striped" animated value={3.125} >{turno == 1 ? ':45' : ':45'}</CProgressBar>
          <CProgressBar color="dark" value={3.125} >{turno == 1 ? '11' : '19'}</CProgressBar>
          <CProgressBar color="secondary " variant="striped" animated value={3.125} >{turno == 1 ? ':15' : ':15'}</CProgressBar>
          <CProgressBar color='secondary' value={3.125} >{turno == 1 ? ':30' : ':30'}</CProgressBar>
          <CProgressBar color="secondary " variant="striped" animated value={3.125} >{turno == 1 ? ':45' : ':45'}</CProgressBar>
          <CProgressBar color='dark' value={3.125} >{turno == 1 ? '12' : '20'}</CProgressBar>
          <CProgressBar color="secondary " variant="striped" animated value={3.125} >{turno == 1 ? ':15' : ':15'}</CProgressBar>
          <CProgressBar color='secondary' value={3.125} >{turno == 1 ? ':30' : ':30'}</CProgressBar>
          <CProgressBar color="secondary " variant="striped" animated value={3.125} >{turno == 1 ? ':45' : ':45'}</CProgressBar>
          <CProgressBar color="dark" value={3.125} >{turno == 1 ? '13' : '21'}</CProgressBar>
          <CProgressBar color="secondary " variant="striped" animated value={3.125} >{turno == 1 ? ':15' : ':15'}</CProgressBar>
          <CProgressBar color='secondary' value={3.125} >{turno == 1 ? ':30' : ':30'}</CProgressBar>
          <CProgressBar color="secondary " variant="striped" animated value={3.125} >{turno == 1 ? ':45' : ':45'}</CProgressBar>
          <CProgressBar color='dark' value={3.125} >{turno == 1 ? '14' : '22'}</CProgressBar>
          <CProgressBar color="secondary " variant="striped" animated value={3.125} >{turno == 1 ? ':15' : ':15'}</CProgressBar>
        </CProgress>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style }}>
          <h2 id="parent-modal-title">{Estado}</h2>
          <p id="parent-modal-description">
            Inicio: {Inicio}
          </p>
          <p id="parent-modal-description">
            Fin: {Fin}
          </p>
          <p id="parent-modal-description">
            Duracion: {Duracion}
          </p>
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={top100Films()}
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="Movie" />}
          />
        </Box>
      </Modal>
    </>
  )
}
