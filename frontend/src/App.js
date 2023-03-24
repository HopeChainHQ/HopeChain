import './App.css';
import { Routes, Route } from "react-router-dom"
import Home from "./pages/Home"

function App() {
    return (
        <div>
            <Routes>
                <Route path="/" element={<Home />} />
                {/* <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} /> */}
            </Routes>
        </div>
    );
}

export default App;
