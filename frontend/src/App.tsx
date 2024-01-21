import { Routes, Route, useLocation } from "react-router-dom"
import Navigation from "./components/Navigation/Navigation"
import Home from "./pages/Home"
import Registration from "./pages/Registration"
import Login from "./pages/Login"
import Dashboard from "./pages/Dashboard"



const App = () => {

  const location = useLocation();

  // Determine whether to show the Navigation component based on the current route
  const showNavigation = !location.pathname.startsWith("/dashboard");

  return (
    <>
      {showNavigation && <Navigation />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-up" element={<Registration />} />
        <Route path="/sign-in" element={<Login />} />
        <Route path="/dashboard/*" element={<Dashboard />} >

        </Route>

      </Routes>
    </>
  )
}

export default App