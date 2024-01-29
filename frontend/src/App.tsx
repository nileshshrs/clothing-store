import { Routes, Route, useLocation } from "react-router-dom"
import Navigation from "./components/Navigation/Navigation"
import Home from "./pages/Home"
import Registration from "./pages/Registration"
import Login from "./pages/Login"
import Dashboard from "./pages/Dashboard"
import DashboardContent from "./components/Dashboard Components/DashboardContent/DashboardContent"
import Verify from "./pages/Verify"
import DashboardClothes from "./components/Dashboard Components/DashboardClothes/DashboardClothes"
import Clothes from "./pages/Clothes"
import Singleclothes from "./pages/Singleclothes"
import Cart from "./pages/Cart"




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
        <Route path="/cart" element={<Cart />} />
        <Route path="/sign-in" element={<Login />} />
        <Route path="/clothes" element={<Clothes />} />
        <Route path="/clothes/:id" element={<Singleclothes />} />
        <Route path="/dashboard/*" element={<Dashboard />} >
          <Route index element={<DashboardContent />} />
          <Route path="clothes" element={<DashboardClothes />} />
        </Route>
        <Route path="/:verification" element={<Verify />} />

      </Routes>
    </>
  )
}

export default App