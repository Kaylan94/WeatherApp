import React, { Component } from 'react';
/*We need this statement to use the Fetch API. You will also need to install isomorphic-fetch 
('npm install --save isomorphic-fetch es6-promise') for this code to work when you write your 
own code with the Fetch API. This was already done when you 'npm install'ed this project*/
import 'isomorphic-fetch'; 
import './App.css';
import Table from 'react-bootstrap/Table';

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items: [],
            cityName:"",
        };
    }
/*With React, asynchronous calls needed to load data from a remote endpoint are usually made in the componentDidMount lifecycle method. 
The componentDidMount method is invoked immediately after a component is mounted. 
The fetch() method takes one mandatory argument, the path to the resource you want to fetch. 
It returns a Promise that resolves to the Response to that request, whether it is successful or not.

Remember that a promise basically allows the interpreter to carry on with other tasks while a function is executed without waiting for that function to finish. 
This is because the promise, ‘promises’ to let you know the outcome of the function once it is finished. The basic structure of a promise is:
doSomething().then(successCallback, failureCallback);
A promise uses callbacks to execute different functions based on whether the desired action succeeded or failed. 
*/

cityInput(evt) {

    this.setState({cityName: evt})
}


componentDidUpdate(prevProps, prevState) {

    const cityName = this.state.cityName;

    if(cityName.length > 0) {
        fetch(`api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${process.env.WEATHER_API_KEY}`)
            //Here the response received from fetching the data from the API is passed as an argument to the res.json() method. This method returns a promise that resolves with the result of parsing the res text as JSON.
            /* the second .then statement consumes the promise returned when res.json is called. This second .then() method has two arguments: 
            a callback for successful execution and a callback for failure. */
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        items: result.items
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
}

render() {
    const { error, isLoaded, items } = this.state;
    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Loading...</div>;
    } else {
        return (
            <div className="App">
                <link
                rel="stylesheet"
                href="https://maxcdn.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css"
                integrity="sha384-GJzZqFGwb1QTTN6wy59ffF1BuGJpLSa9DkKMp0DgiMDm4iYMj70gZWKYbI706tWS" crossorigin="anonymous" />
                {items.map(items => (
                    <Table striped bordered hover variant="dark">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Desription</th>
                        <th>Value</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>1</td>
                        <td>Temperature</td>
                        <td>{items.main.temp}</td>
                      </tr>
                      <tr>
                        <td>2</td>
                        <td>Pressure</td>
                        <td>{items.main.pressure}</td>
                      </tr>
                      <tr>
                        <td>3</td>
                        <td>Humidity</td>
                        <td>{items.main.humidity}</td>
                      </tr>
                      <tr>
                        <td>4</td>
                        <td>Temp_min</td>
                        <td>{items.main.temp_min}</td>
                      </tr>
                      <tr>
                        <td>5</td>
                        <td>Temp_max</td>
                        <td>{items.main.temp_max}</td>
                      </tr>
                    </tbody>
                  </Table>
                ))}
            </div>
        );
        }
    }
}


export default Main;
