import { Routes, Route } from "react-router-dom"
import Navigation from "./components/Navigation/Navigation"
import Home from "./pages/Home"


const App = () => {
  return (
    <>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </>
  )
}

export default App