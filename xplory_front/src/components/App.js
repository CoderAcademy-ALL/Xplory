import React, { useEffect, useReducer } from "react"
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom'
import Home from "./Home"
import About from "./About"
import NotFound from "./NotFound"
import Navigation from "./Navigation"
import LoginForm from "./LoginForm"
import SignupForm from "./SignupForm"
import ParkForm from "./ParkForm"
import Parks from "./Parks"
import Park from "./Park"
import Maps from './Maps'
import Filter from "./Filter"
import Friends from "./Friends"
import reducer from '../utils/reducer'
import { StateContext } from '../utils/stateContext'

const App = () => {
	const initialstate ={
		messageList: [],
		loggedInUser: sessionStorage.getItem("username") || null, 
		auth: {token: sessionStorage.getItem("token") || null}
	  }
	  const [store, dispatch] = useReducer(reducer, initialstate )
 	  const {parkList} = store

	  useEffect(()=>{
		getParks()
		.then((parks)=>{
		  dispatch({
			type: "setParkList",
			data: parks
		})})
		.catch(error => console.log(error))
	},[]
	)
  
	function getParks(id){
		return parkList.find(m=> m.id === parseInt(id))
	  }

	return (
		<div >
      <h1>Chatti</h1>
      <StateContext.Provider value={{store, dispatch}}>
        <BrowserRouter>
        <Navigation/>
        <Switch>
		<Route exact path='/Home' component={Home} />
		<Route exact path='/Navigation' component={Navigation} />
		<Route exact path='/Filter' component={Filter} />
		<Route exact path='/About' component={About} />
		<Route exact path='/LoginForm' component={LoginForm} />
		<Route exact path='/Friends' component={Friends} />
		<Route exact path='/ParkForm' component={ParkForm} />
		<Route exact path='/Park' component={Park} />
		<Route exact path='/Parks' component={Parks} />
		<Route exact path='/NotFound' component={NotFound} />
		<Route exact path='/Signup' component={SignupForm} />
		</Switch>
        </BrowserRouter>
      </StateContext.Provider>    
    </div>
	);
};

export default App;
