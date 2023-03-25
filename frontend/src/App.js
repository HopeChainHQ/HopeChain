import "./App.css"
import { Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import DownloadApp from "./pages/DownloadApp"
import Disaster from "./components/Disaster"
import DisasterInfo from "./pages/DisasterInfo"
import Organizations from "./components/Organizations"
import Admin from "./components/Admin"

function App() {
	return (
		<div>
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='downloadApp' element={<DownloadApp />} />
				<Route path='/disasterinfo/:id' element={<DisasterInfo />} />
				<Route path='/disaster' element={<Disaster />} />
				<Route path='/disaster/:id' element={<Organizations />} />
				<Route path='/admin' element={<Admin />} />
			</Routes>
		</div>
	)
}

export default App
