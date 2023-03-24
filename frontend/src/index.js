import React from "react"
import ReactDOM from "react-dom"
// import { Dapp } from "./components/Dapp";
import Disaster from "./components/Disaster"
import Admin from "./components/Admin"
import Layout from "./components/Layout"
import { ethers } from "ethers"

import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

import "./index.css"
// import "bootstrap/dist/css/bootstrap.css";

// This is the entry point of your application, but it just renders the Dapp
// react component. All of the logic is contained in it.

ReactDOM.render(
	<React.StrictMode>
		<Router>
			<Layout>
				<Routes>
					<Route path='/' element={<Disaster />} />
					<Route path='/admin' element={<Admin />} />
				</Routes>
			</Layout>
		</Router>
	</React.StrictMode>,
	document.getElementById("root")
)
