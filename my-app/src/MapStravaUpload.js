import './App.css';
import React, { useState, useEffect, useContext } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Confirmation from './confirmation'
import CustomStravaUpload from './CustomStravaUpload'
import UploadSelection from './UploadSelection';
// import Gpx from "gpx-parser-builder";
import { useNavigate, Link } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import ReactDOM from 'react-dom/client';
import Typography from '@mui/material/Typography';
import {BrowserRouter, Routes,Route, Router} from 'react-router-dom';
import fakegpx from 'localhost:3000?StravaAutoMap/tesytestbaby.gpx'

const auth_link="https://www.strava.com/oauth/token"
let ACCESS_TOKEN;
let FILE_FORMATTED
const fs = require('./tesytestbaby.gpx')
// fs.readFile('tesytestbaby.gpx', 'utf8',(err,data) => {if(err){console.log(err);return;}console.log("here is our fun data stuff ",data)})



function MapUpload(){
    // variables needed to make activity
    let NAME;
    let TYPE;
    let SET_TIME;
    let MOVE_TIME;
    let STRAVA_DESCRIPTION;
    let DATA_TYPE="gpx";
    let TRAIL;

    const activitieOPTS = [
        {value: 'Run', label: 'Run',},{ value: 'Hike',label: 'Hike', }
      ];
      const possibleYears = [
        {value: '2022',label: '2022',},{value: '2023',label: '2023',}
      ];
      const hikingTrails = [
        {value: 'PCT',label: 'Pacific Crest Trail',},{value: 'CT',label: 'Colrado Trail',}
      ];

      const [value, setValue] = useState("0.0");
      let year;
      let month;
      let day;
      let hour;
      let min;
    return(
        <div>
        <div className='App-header'>
            <Typography color="orange"><h2>Upload</h2></Typography>
            <Button sx={{m:"1%"}}variant="contained" onClick={async () => {const root = ReactDOM.createRoot(document.getElementById('root'));root.render(<UploadSelection/>)}}>Go back</Button>
           {/* ACTIVITY TITLE DESCRIPTION */}
            <TextField
onChange={(name) => {
                NAME=name.target.value}} helperText="Title of activity"/>
        </div>
        <div className="line">
        {/* START TIME OF ACTIVITY */}
                <TextField  select
                label="Year"
              onChange={(year1) => {
                year=year1.target.value}}helperText="Year">{possibleYears.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}</TextField>
                <TextField 
                              onChange={(month1) => {
                month=month1.target.value}}helperText="Month"type="number"
                InputProps={{ inputProps: { min: 1, max: 12 } }}/>
                <TextField type="number"  InputProps={{ inputProps: { min: 1, max: 31 } }}
  
              onChange={(day1) => {
                day=day1.target.value}}helperText="Day"/>
                <TextField type="number"   InputProps={{ inputProps: { min: 0, max: 23 } }}
              onChange={(hour1) => {
                hour=hour1.target.value}}helperText="Hour"/>
                <TextField type="number"   InputProps={{ inputProps: { min: 0, max: 59 } }}
              onChange={(min1) => {
                min=min1.target.value; SET_TIME=year+"-"+month+"-"+day+"T"+hour+":"+min+":00.000"}}helperText="Minute"/>
                </div>
                <div className="App-header">
                {/* ACTIVITY MOVING TIME */}
                <TextField type="number"
              onChange={(moving_time) => {
                MOVE_TIME=moving_time.target.value*60}}helperText="Activity Moving Time in Minutes"/>
                {/*  ACTIVITY BODY DESCRIPTION*/}
                <TextField
              onChange={(desc) => {
                STRAVA_DESCRIPTION=desc.target.value}}helperText="Activity description"/>
                {/* WHICH TRAIL MAP IS BEING GENERATED */}
                <TextField  select
                label="Trail"
              onChange={(trail1) => {
                TRAIL=trail1.target.value}}helperText="Trail">{hikingTrails.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}</TextField>

                  {/* Submit all th data just entered above */}

            <Button sx={{p:"1%"}}variant="contained" onClick={async() =>{getToken()}}>Submit Activity</Button>
                </div>
                </div>
    )

    function uploadActivity(res1){
        ACCESS_TOKEN=res1.access_token;
        // calling api to pass our data with user token to make a strava activity
        const Upload_Link = 'https://www.strava.com/api/v3/uploads?name='+NAME+'&type='+TYPE+'&description='+STRAVA_DESCRIPTION+'&data_type=gpx'
        // let w = window.open('tesytestbaby.gpx');
        // w.print();
        // var testString = JSON.stringify(fakegpx)
        // fetch(fakegpx).then(response => console.log(response.json()))
        // fs.readFile('tesytestbaby.gpx', 'utf8',(err,data) => {if(err){console.log(err);return;}console.log("here is our fun data stuff ",data)})
        // fetch(fs).then(response =>
        // console.log("post above log");
        // console.log("after the 2 logs we have thiss: ", FILE_FORMATTED)
        fetch(Upload_Link,{
          method: 'post',
          headers:{
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            data: fakegpx,
            access_token: ACCESS_TOKEN,
          })
        }).then((res) => console.log(res.json()))
        // )
      }

    function getToken(){
        // using url to get code for access token
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
        }).then(res => res.json()).then(res => uploadActivity(res))
      }

}

export default MapUpload;