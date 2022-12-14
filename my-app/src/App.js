import './App.css';

const auth_link="https://www.strava.com/oauth/token"
let ACCESS_TOKEN;
let switcher=0;



function App() {
  let searchStr = window.location.search;
  let urlParams1 = new URLSearchParams(searchStr);
  let code1 = urlParams1.get('code')
  if(code1!=null && switcher===0){
    getToken()
  }
  return (
    <div className="App">
      <p>STRAVA WEE WOO API STUFF</p>
      <p>count is </p>
      <p>distance is </p>
      <p>move time is </p>
      <a href="https://www.strava.com/oauth/authorize?client_id=98457&redirect_uri=http://localhost:3000/StravaAutoMap/&response_type=code&scope=read_all,activity:read_all,activity:write">Connect to Strava</a>
      
    </div>
  );
}

function uploadActivity(res1){
  // console.log('The access token is:',res.access_token);
  ACCESS_TOKEN=res1.access_token;
  console.log('THE ACCESS TOKEN IS:',ACCESS_TOKEN)
  let NAME = 'STRAVA API TEST 5'
  let TYPE = 'Run'
  let SET_TIME = '2022-12-14T4:36:00.000'
  let MOVE_TIME ='600'
  let STRAVA_DESCRIPTION='idk what it is but something feels off about the activities im publishing from this js code...all the data is correct but something just feels off'
  let ACTIVITY_DIST='2000'
  const Upload_Link = 'https://www.strava.com/api/v3/activities?name='+NAME+'&type='+TYPE+'&sport_type='+TYPE+'&start_date_local='+SET_TIME+'&elapsed_time='+MOVE_TIME+'&description='+STRAVA_DESCRIPTION+'&distance='+ACTIVITY_DIST+'&trainer=1'
  console.log('Upload link is: ', Upload_Link)
  fetch(Upload_Link,{
    method: 'post',
    headers:{
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      access_token: ACCESS_TOKEN,
    })
  }).then((res) => console.log(res.json()))
}

function getToken(){
  console.log("in get token")
  const queryString = window.location.search;
  console.log('query string is: ',queryString);
  const urlParams = new URLSearchParams(queryString);
  const CODE_VAL = urlParams.get('code')
  console.log('code is:',CODE_VAL);
  switcher=1
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

export default App;
