import './App.css';
import React, { useState, useEffect, useContext } from 'react';
import Button from '@mui/material/Button';
import CustomStravaUpload from './CustomStravaUpload';
import MapStravaUpload from './MapStravaUpload';
import { useNavigate, Link } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import ReactDOM from 'react-dom/client';
import Typography from '@mui/material/Typography';
import {BrowserRouter, Routes,Route, Router} from 'react-router-dom';

function uploadSelection(){
    return(
        <div className='App-header'>
            <Typography color="orange"><h2>Select Activity Type!</h2></Typography>
            <Button sx={{m:"4%"}}variant="contained" onClick={async () => {const root = ReactDOM.createRoot(document.getElementById('root'));root.render(<MapStravaUpload/>)}}>Auto generate a Backpacking Map</Button>
            <Button sx={{m:"4%"}}variant="contained" onClick={async () => {const root = ReactDOM.createRoot(document.getElementById('root'));root.render(<CustomStravaUpload/>)}}>Create Manual Activity</Button>
        </div>
    )

}

export default uploadSelection;