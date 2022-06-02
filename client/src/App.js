import React, { useReducer, useContext, useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";
import { AdminContext } from "./context/AdminContext";
import { reducer, initialState } from "./reducers/adminReducer";
import Login from "./components/login/Login";
import Signup from "./components/signup/Signup";
import EmpData from "./components/empData/EmpData";
import HomePageComponent from "./components/homePageComponent/HomePageComponent";
import Dashboard from "./components/dashboardComponent/DashboardComponent";
import "./App.css";

const Routing = () => {
  const history = useNavigate();

  const { state, dispatch } = useContext(AdminContext);

  useEffect(() => {
    const admin = JSON.parse(localStorage.getItem("admin"));
    if (admin) {
      dispatch({ type: "ADMIN", payload: admin });
    } else {
      history("/");
    }
  }, []);

  return (
    <Routes>
      {state ? (
        <>
          <Route exact path="/empdata" element={<EmpData />} />
          <Route exact path="/dashboard" element={<Dashboard />} />
          <Route path="*" element={<Navigate replace to="/dashboard" />} />
        </>
      ) : (
        <>
          <Route exact path="/" element={<HomePageComponent />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/signup" element={<Signup />} />
        </>
      )}
    </Routes>
  );
};

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AdminContext.Provider value={{ state, dispatch }}>
      <BrowserRouter>
        <Routing />
      </BrowserRouter>
    </AdminContext.Provider>
  );
}

export default App;
