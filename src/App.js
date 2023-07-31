//import logo from './logo.svg';
import './App.css';



import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';




import { createTheme, ThemeProvider } from '@mui/material/styles';
import { DataGrid } from '@mui/x-data-grid';


const pages = ['Browse', 'Search', 'Chart', 'About'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];



//create your forceUpdate hook. see https://stackoverflow.com/questions/46240647/how-to-force-a-functional-react-component-to-render
function useForceUpdate()
{
  const [value, setValue] = React.useState(0); // integer state
  return () => setValue(value => value + 1); // update state to force render
  // A function that increment 👆🏻 the previous state like here 
  // is better than direc tly setting `setValue(value + 1)`
} 



var stories=[]
function fetchHn()
{
  return new Promise(function(resolve, reject)
  {
    fetch('https://hacker-news.firebaseio.com/v0/topstories.json')
      .then(response => response.json())
      .then(topStories =>
        {
        // get the top 10 stories
        const storyIds = topStories.slice(0, 100);
        // fetch each story in parallel
        const storyPromises = storyIds.map(id => fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`));
        // resolve all promises
        Promise.all(storyPromises)
          .then(responses => Promise.all(responses.map(res => res.json())))
          .then(stories => {
            // handle the array of stories here
            //console.log(stories);
            resolve(stories)
          })
          .catch(error => console.error(error));
      })
      .catch(error => console.error(error));
    })
  }

  

  function makeHnChart(rows)
  {

    return <img style={{display:'block'}} src='https://www.amcharts.com/wp-content/uploads/2013/12/demo_7394_none-7-1024x690.png' />

  }


  function makeHnTable(rows)
  {

    const columns = [
      { field: 'id', headerName: 'ID', width: 90 },
      {
        field: 'title',
        headerName: 'Title',
        width: 450,
        editable: true,
      },
      {
        field: 'by',
        headerName: 'Author',
        width: 150,
        editable: true,
      },,
      {
        field: 'type',
        headerName: 'Type',
        width: 90
      },
      {
        field: 'time',
        headerName: 'Time',
        width: 150,
        editable: true,
      },
      {
        field: 'url',
        headerName: 'URL',
        description: 'The full URL',
        sortable: false,
        width: 260
      },
      {
        field: 'score',
        headerName: 'Score',
        sortable: false,
        width: 60
      }
    ];
    
    
    /*{state.map((entry) => (
    
      <div >{entry.title}</div>
    ))}*/


    /*const rows = [
      { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
      { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
      { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
      { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
      { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
      { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
      { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
      { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
      { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
    ];*/
    
      return (
        <Box sx={{height: '100%', width: '100%' }}>
          <DataGrid
            rows={rows}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 10,
                },
              },
            }}
            pageSizeOptions={[10]}
            checkboxSelection
            disableRowSelectionOnClick
          />
        </Box>
      );
  }
function App() {
  
  //see https://blog.bitsrc.io/fetching-data-in-react-using-hooks-c6fdd71cb24a
  //const forceUpdate = useForceUpdate();
  const [state, setState] = React.useState([])
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);


  React.useEffect(() => {
    fetchHn().then(function(res)
    {
      //console.log('res='+JSON.stringify(res))
      setState(res)
    })

  }, [])


  
  const [curPage, setCurPage] = React.useState('browse');
  const handle_tab_change = (event, newValue) => {
    setCurPage(newValue);
  };

  const makePage=function()
  {
    if(curPage=='browse')
      return makeHnTable(state)
    
    if(curPage=='browse')
      return makeHnChart(state)
  }

  const handleOpenNavMenu = (event) => {

    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = (e) => {
    console.log('event.currentTarget='+e.target.dataset.val)
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

    const theme = createTheme(
    {
      palette:
      {
        primary: {main:'#f36523'}
      }
    });

    //todo: use datagrid. see https://mui.com/x/react-data-grid/
    //JSON.stringify(state)
 

  return (
    <ThemeProvider theme={theme}> 
    <Container fixed>
      <AppBar sx={{bgcolor: "black", textColor:'white', padding:'9px 25px'}} position="static">
        <Toolbar disableGutters>
        <img src='hn_logo.png' style={{marginRight:10, height:25, display:'inline-block'}} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
              paddingRight:'90px'
            }}
          >

            HackerNews
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >


            </Menu>
          </Box>
 
          <Box sx={{ width: '100%' }}>
          <Tabs  value={curPage} textColor='white'  onChange={handle_tab_change} >
                <Tab value="browse"label="Browse"/>
                <Tab value="search" label="Search" />
                <Tab value="chart" label="Chart" />
              </Tabs>
              </Box>
              <Button
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
               About
              </Button>
        </Toolbar>
        
        </AppBar>
      <Box sx={{display:'flex', justifyContent:'center', margin:'0 auto'}}  >
         {makePage(curPage) }
      </Box>
      </Container>
    </ThemeProvider>
  );
}

export default App;
