import './App.css';
import React, { useState, useEffect, useContext } from 'react';
import Button from '@mui/material/Button';
import CustomStravaUpload from './CustomStravaUpload'
import { useNavigate, Link } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import ReactDOM from 'react-dom/client';
import Typography from '@mui/material/Typography';
import {BrowserRouter, Routes,Route, Router} from 'react-router-dom';


const auth_link="https://www.strava.com/oauth/token"
const deauth_link="https://www.strava.com/oauth/deauthorize"

function confirmPage(){
    console.log("hmm in here")
    return(
        <div className="App-header">
            <Typography color="orange"><h2>Activity has been Uploaded</h2></Typography>
            <Button sx={{m:"1%"}}variant="contained" onClick={async () => {const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<CustomStravaUpload/>)}}>Post another activity</Button>
            <Button sx={{m:"1%"}}variant="contained" onClick={async()=>{;window.location.href = "https://danielzfinger.github.io/StravaAutoMap/";}}>Quit Application</Button>
            <Typography sx={{fontSize:"60%",ml:"20%",mr:"20%"}}color="grey"><p>Clicking 'Quit Application' will de-authorize your token and redirect you to the main page.</p></Typography>
            <Typography sx={{fontSize:"60%",ml:"20%",mr:"20%"}}color="grey"><p>This link will still exist however no more calls to Strava will be approved.</p></Typography>
            <Typography sx={{fontSize:"60%",ml:"20%",mr:"20%"}}color="grey"><p>You will have to sign in again and get a new token to upload anything.</p></Typography>
            <Typography sx={{fontSize:"60%",ml:"20%",mr:"20%"}}color="grey"><p>All tokens will automatically be de-authorized 6 hours after creation.</p></Typography>
        </div>
    )

}
function getToken(){
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const CODE_VAL = urlParams.get('code')
    fetch(auth_link,{
        method: 'post',
        headers:{
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
        },
    
        body: JSON.stringify({
        client_id: '98457',
        client_secret: '13e74e5deb9db6a8b61af49514e72f93158315de',
        code: CODE_VAL,
        grant_type: 'authorization_code'
        })
    }).then(res => res.json()).then(res => logout(res))
    }
    function logout(res1){
        fetch(deauth_link,{
            method: 'post',
            headers:{
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
            },
        
            body: JSON.stringify({
            access_token: res1.access_token
            })
    })
}


export default confirmPage;