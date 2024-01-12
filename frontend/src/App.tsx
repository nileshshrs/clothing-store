import { Routes, Route } from "react-router-dom"
import Navigation from "./components/Navigation/Navigation"
import Home from "./pages/Home"
import Registration from "./pages/Registration"



const App = () => {
  return (
    <>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-up" element={<Registration />} />
      </Routes>
    </>
  )
}

export default App