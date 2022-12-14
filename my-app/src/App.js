import './App.css';
import React, { useState, useEffect, useContext } from 'react';
import Button from '@mui/material/Button';
import CustomStravaUpload from './CustomStravaUpload'
import { useNavigate, Link } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import ReactDOM from 'react-dom/client';
import Typography from '@mui/material/Typography';
import {BrowserRouter, Routes,Route, Router} from 'react-router-dom';


function App() {
  const navigate = useNavigate();
  let searchStr = window.location.search;
  let urlParams1 = new URLSearchParams(searchStr);
  let code1 = urlParams1.get('code')
 
  return (
    <div className="App-header">
      <Typography color="orange"><h2>To proceed you must link your Strava</h2></Typography>
      <a href="https://www.strava.com/oauth/authorize?client_id=98457&redirect_uri=http://danielzfinger.github.io/StravaAutoMap/&response_type=code&scope=read_all,activity:read_all,activity:write">Connect to Strava</a>
      <Button sx={{m:"2%"}} disabled={code1 != null ? false : true} variant="contained" onClick={async () => {const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<BrowserRouter><CustomStravaUpload/></BrowserRouter>)}}>Create an activity</Button>
    </div>
  );
}

export default App;
