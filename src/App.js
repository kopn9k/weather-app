import React from "react";
import Titles from "./components/Titles";
import Form from "./components/Form";
import Weather from './components/Weather'

const API_KEY = "dc50362f421145039e0d43b7627ffaca";
const WETHER_API_URL = "http://api.openweathermap.org/data/2.5/weather";
const URL_PARAMETER_APPID = "appid";
const URL_PARAMETER_LOCATION = "q";
const URL_PARAMETER_UNITS = "units";


class App extends React.Component {

  getWeather = async (e) => {
    e.preventDefault();
    const api_call = await fetch(`${WETHER_API_URL}?${URL_PARAMETER_LOCATION}=Manchester,uk
      &${URL_PARAMETER_APPID}=${API_KEY}&${URL_PARAMETER_UNITS}=metric`);
    const data = await api_call.json();
    console.log(data);
  }

  render() {
    return (
      <div> 
        <Titles />
        <Form getWeather={this.getWeather}/>
        <Weather />
      </div>
    );
  }
}

export default App;