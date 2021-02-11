import React, { useState, useEffect } from 'react';
import Cardlist from '../Components/Cardlist';
import SearchBox from '../Components/SearchBox';
import Scroll from '../Components/Scroll';
import ErrorBoundry from '../Components/ErrorBoundary';
import './app.css';

//Program to learn how to use react hooks

function App() {
    const [robots, setRobots] = useState([])
    const [searchfield, setSearchField]=useState('')
    const [count, setCount] = useState(0)

useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
        .then(response=> response.json())
        .then(users => {setRobots(users)});
        console.log(count)
}, [count])//means only run if count changes

const onSearchChange = (event) => {
    setSearchField(event.target.value)
}
//The search box filters through the robot list with the search change
//the robots get filtered by whatever is entered in the search field
const filteredRobots = robots.filter(robots =>{ 
    return robots.name.toLowerCase().includes(searchfield.toLowerCase());
    })
        
    return !robots.length ?
         <h1>Loading</h1> :
    ( 
        <div className='tc'>
        <h1 className= 'f1'>Robofriends</h1>
        <button onClick={()=>setCount(count+1)}>Click Me!</button>
        <SearchBox searchChange={onSearchChange}/>
        <Scroll>
        <ErrorBoundry>
         <Cardlist robots={filteredRobots}/>
         </ErrorBoundry>
        </Scroll>
    </div>
    );
 }
export default App;
