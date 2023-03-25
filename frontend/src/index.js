import React from "react"
import ReactDOM from "react-dom"
// import { Dapp } from "./components/TokenTransfer/Dapp"
import Disaster from "./components/Disaster"
import Organizations from "./components/Organizations"
import Admin from "./components/Admin"
import Layout from "./components/Layout"

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
					<Route path='/disaster/:id' element={<Organizations />} />
					<Route path='/admin' element={<Admin />} />
				</Routes>
			</Layout>
		</Router>
	</React.StrictMode>,
	document.getElementById("root")
)
