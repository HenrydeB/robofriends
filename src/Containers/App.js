import React, { Component } from 'react';
import Cardlist from '../Components/Cardlist';
import SearchBox from '../Components/SearchBox';
import Scroll from '../Components/Scroll';
import './app.css';




class App extends Component {
    constructor () {
        super ()
        // this is what changes in the app. Virtual DOM is affected by REACT because it
        // collects this info 
        this.state = {
            robots: [],
            searchfield:''
        }
    }

    componentDidMount() {
        fetch('https://jsonplaceholder.typicode.com/users')
        .then(response=> response.json())
        .then(users => this.setState({ robots: users}));
    }
//The search change event is triggered by whatever affects the search field

onSearchChange = (event) => {
    this.setState({searchfield: event.target.value})
   
}

//The search box filters through the robot list with the search change
//the robots get filtered by whatever is entered in the search field

    render() {
    const { robots, searchfield } = this.state;
    const filteredRobots = robots.filter(robots =>{
        return robots.name.toLowerCase().includes(searchfield.toLowerCase());
        })
    return !robots.length ?
         <h1>Loading</h1> :
    ( 
        <div className='tc'>
        <h1 className= 'f1'>Robofriends</h1>
        <SearchBox searchChange={this.onSearchChange}/>
        <Scroll>
         <Cardlist robots={filteredRobots}/>
        </Scroll>
    </div>
    );
     
 }
}

export default App;
