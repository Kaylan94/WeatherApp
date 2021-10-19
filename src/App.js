import React, { Component } from 'react';
import Logo from './logo.svg';
/*We need this statement to use the Fetch API. You will also need to install isomorphic-fetch 
('npm install --save isomorphic-fetch es6-promise') for this code to work when you write your 
own code with the Fetch API. This was already done when you 'npm install'ed this project*/
import 'isomorphic-fetch'; 
import './App.css';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
//after installing dotenv, require and config dotenv
//this module loads environment variables from a .env file into process.env
require('dotenv').config();

//apiKey from .env file is stored in a variable
const apiKey = process.env.REACT_APP_WEATHER_API_KEY;


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items: [],
            cityName:""
        }
        //these methods are bound so that it has access to properties and for rendering purposes
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleReload = this.handleReload.bind(this);
    }

    //here the componentDidUpdate method is called when the cityName property is updated
    componentDidUpdate(prevProps, prevState) {
        const city = this.state.cityName;

        //we use the api key and city name defined above in the fetch function to get the desired data
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`)
        //Here the response received from fetching the data from the API is passed as an argument to the res.json() method. This method returns a promise that resolves with the result of parsing the res text as JSON.
        /* the second .then statement consumes the promise returned when res.json is called. This second .then() method has two arguments: 
        a callback for successful execution and a callback for failure. */
        .then(res => res.json())
        .then(
            (result) => {
                this.setState({
                    isLoaded: true,
                    items: result.main
                });
            },
            // Note: it's important to handle errors here  instead of a catch() block so that we don't swallow
            // exceptions from actual bugs in components.
            (error) => {
                this.setState({
                    isLoaded: true,
                    error
                });
            });       
    }

    /*a handleSubmit method is created here to change the state of the cityName property, which in turn calls the 
      method to fetch the data from the api*/
    handleSubmit(e){
    
        let nameOfCity = document.getElementById("input1").value;

        this.setState({cityName: nameOfCity});

    }

    //simple method to reload the page => reload the input field => setting all properties back to original state
    handleReload(){
        window.location.reload();
    }

    
    render() {

        const items = this.state.items;
        const { error, isLoaded} = this.state;

        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div className="App">
                <link
                    rel="stylesheet"
                    href="https://maxcdn.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css"
                    integrity="sha384-GJzZqFGwb1QTTN6wy59ffF1BuGJpLSa9DkKMp0DgiMDm4iYMj70gZWKYbI706tWS" 
                    crossorigin="anonymous" 
                />
                <div className="App-header">
                    <img className="App-logo" src={Logo} alt="logo"></img>
                    <br></br>
                    <h1>Weather Today</h1>
                </div>
                <div>
                    <br></br>
                    <h3 className="heading">Enter a city name below to get the weather report</h3>
                    <br></br>
                    <form type="submit">
                        <input 
                            type="text" 
                            className="City-input"
                            id="input1"
                            placeholder="City Name">
                        </input>
                    </form>
                    <br></br>
                    <Button variant="dark" size="lg" onClick={this.handleSubmit}>Submit</Button>
                    <hr className="H-rule"></hr>
                    <div>Waiting...</div>
                </div>
            </div>
            } else {
            return (
                <div className="App">
                    <link
                    rel="stylesheet"
                    href="https://maxcdn.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css"
                    integrity="sha384-GJzZqFGwb1QTTN6wy59ffF1BuGJpLSa9DkKMp0DgiMDm4iYMj70gZWKYbI706tWS" 
                    crossorigin="anonymous" />
                    <div className="App-header">
                        <img className="App-logo" src={Logo} alt="logo"></img>
                        <br></br>
                        <h1>Weather Today</h1>
                    </div>
                    <br></br>
                        <h3 className="heading">Enter a city name below to get the weather report</h3>
                        <br></br>
                        
                        <Button variant="danger" size="lg" onClick={this.handleReload}>Reload</Button>
                        
                        <hr className="H-rule"></hr>


                    <Table striped bordered hover variant="dark" className="result-table">
                            <thead>
                                <tr>
                                <th>#</th>
                                <th>Description</th>
                                <th>Value</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>1</td>
                                    <td>Temperature</td>
                                    <td>{items.temp}°C</td>
                                </tr>
                                <tr>
                                    <td>2</td>
                                    <td>Pressure</td>
                                    <td>{items.pressure} millibars</td>
                                </tr>
                                <tr>
                                    <td>3</td>
                                    <td>humidity</td>
                                    <td>{items.humidity}%</td>
                                </tr>
                                <tr>
                                    <td>4</td>
                                    <td>Temp_min</td>
                                    <td>{items.temp_min}°C</td>
                                </tr>
                                <tr>
                                    <td>5</td>
                                    <td>Temp_max</td>
                                    <td>{items.temp_max}°C</td>
                                </tr>
                            </tbody>
                        </Table>
        
                </div>
        );
        }
    } 
}

export default App;
