import React from "react";
import Titles from "./components/Titles";
import Form from "./components/Form";
import Weather from './components/Weather'

const API_KEY = "dc50362f421145039e0d43b7627ffaca";
const WETHER_API_URL = "http://api.openweathermap.org/data/2.5/weather";
const URL_PARAMETER_APPID = "appid";
const URL_PARAMETER_LOCATION = "q";
const URL_PARAMETER_UNITS = "units";
const DEFAULT_UNITS = "metric";


class App extends React.Component {
  state = {
    temperature: undefined,
    city: undefined,
    country: undefined,
    humidity: undefined,
    description: undefined,
    error: undefined
  }

  getWeather = async (e) => {
    e.preventDefault();

    const city = e.target.elements.city.value;
    const country = e.target.elements.country.value;

    const api_call = await fetch(`${WETHER_API_URL}?${URL_PARAMETER_LOCATION}=${city},${country}
      &${URL_PARAMETER_APPID}=${API_KEY}&${URL_PARAMETER_UNITS}=${DEFAULT_UNITS}`);
    const data = await api_call.json();

    if (city && country) {

      if (data.message) {

        this.setState({
          temperature: undefined,
          city: undefined,
          country: undefined,
          humidity: undefined,
          description: undefined,
          error: data.message
        });

      } else {

        this.setState({
          temperature: data.main.temp,
          city: data.name,
          country: data.sys.country,
          humidity: data.main.humidity,
          description: data.weather[0].description,
          error: ""
        });

      }
    } else {

      this.setState({
        temperature: undefined,
        city: undefined,
        country: undefined,
        humidity: undefined,
        description: undefined,
        error: "Please enter the values :)"
      });

    }
  }

  render() {
    return (
      <div>
        <div className="wrapper">
          <div className="main">
            <div className="container">
              <div className="row">
                <div className="col-xs-5 title-container">
                  <Titles />
                </div>
                <div className="col-xs-7 form-container">
                  <Form getWeather={this.getWeather}/>
                  <Weather temperature = {this.state.temperature}
                    city = {this.state.city}
                    country = {this.state.country}
                    humidity = {this.state.humidity}
                    description = {this.state.description}
                    error = {this.state.error}/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
    );
  }
}

export default App;