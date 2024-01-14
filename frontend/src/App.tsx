import { Routes, Route } from "react-router-dom"
import Navigation from "./components/Navigation/Navigation"
import Home from "./pages/Home"
import Registration from "./pages/Registration"
import Login from "./pages/Login"



const App = () => {
  return (
    <>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-up" element={<Registration />} />
        <Route path="/sign-in" element={<Login />} />
      </Routes>
    </>
  )
}

export default App