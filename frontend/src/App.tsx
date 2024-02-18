import {
  Routes,
  Route,
  useLocation,
  useNavigate,
  Navigate,
} from "react-router-dom";
import Navigation from "./components/Navigation/Navigation";
import Home from "./pages/Home";
import Registration from "./pages/Registration";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import DashboardContent from "./components/Dashboard Components/DashboardContent/DashboardContent";
import Verify from "./pages/Verify";
import DashboardClothes from "./components/Dashboard Components/DashboardClothes/DashboardClothes";
import Clothes from "./pages/Clothes";
import Singleclothes from "./pages/Singleclothes";
import Cart from "./pages/Cart";
import { useAuthContext } from "./context/useAuthContext";
import Users from "./components/Dashboard Components/User/Users";
import UserOrders from "./components/Dashboard Components/Orders/UserOrders";
import Orders from "./pages/Orders";
import Success from "./pages/Success";

const App = () => {
  const { user } = useAuthContext();
  const role = user?.user.roles;
  const location = useLocation();
  const navigate = useNavigate();

  // Determine whether to show the Navigation component based on the current route
  const showNavigation = !location.pathname.startsWith("/dashboard");

  return (
    <>
      {showNavigation && <Navigation />}
      <Routes>
        <Route path="/" element={<Home />} />
        {user ? <Route path="/checkout" element={<Cart />} /> : null}
        <Route
          path="/sign-in"
          element={!user ? <Login /> : <Navigate to="/" />}
        />
        <Route
          path="/sign-up"
          element={!user ? <Registration /> : <Navigate to="/" />}
        />
        <Route path="/clothes" element={<Clothes />} />
        <Route path="/user-orders" element={<Orders />} />
        <Route path="/clothes/:id" element={<Singleclothes />} />(
        <Route
          path="/dashboard/*"
          element={role === "admin" ? <Dashboard /> : <Navigate to="/" />}
        >
          <Route index element={<DashboardContent />} />
          <Route path="clothes" element={<DashboardClothes />} />
          <Route path="users" element={<Users />} />
          <Route path="orders" element={<UserOrders />} />
        </Route>
        ) : <Route path="/" element={<Home />} />
        <Route path="/:verification" element={<Verify />} />
        <Route path="/success" element={<Success/>}/>
      </Routes>
    </>
  );
};

export default App;
