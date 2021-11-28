import Footer from "./components/Footer";
import About from "./components/About";
import Special from "./components/Special";
import OneTask from "./components/OneTask";
import NotFound from "./components/NotFound";
import Login from "./components/Login";

import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  NavLink,
  Navigate,
} from "react-router-dom";
import TaskMain from "./components/TaskMain";
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [userInfo, setUserInfo] = useState(null);

  const login = async (userInfo) => {
    try {
      let result = await axios.post("/login", userInfo);
      console.log(result);
      setUserInfo(result.data.user);
    } catch (err) {
      console.log(err);
    }
  };

  const logout = async () => {
    try {
      let result = await axios.get("/logout");
      console.log(result);
      setUserInfo(null);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const checkIfloggedIn = async () => {
      try {
        let result = await axios.get("/isLoggedIn");
        console.log(result);
        if (result.data.result) {
          setUserInfo(result.data.user);
        }
      } catch (err) {
        console.log(err);
      }
    };
    checkIfloggedIn();
  }, []);

  return (
    <Router>
      {!userInfo && <Login login={login} />}

      {userInfo && (
        <div>
          <header className="header">
            <nav>
              {/* <Link to="/">Task List</Link> */}
              <NavLink
                to="/"
                className={(navData) => (navData.isActive ? "active" : "")}
              >
                Task List
              </NavLink>
              <NavLink
                to="/about"
                className={(navData) => (navData.isActive ? "active" : "")}
              >
                About
              </NavLink>
            </nav>
            <button onClick={logout}>Logout</button>
          </header>

          <Routes>
            <Route path="/" element={<TaskMain />}></Route>
            <Route path="/:id/*" element={<OneTask />}></Route>
            <Route path="/about" element={<About />}></Route>
            <Route path="/special" element={<Special />}></Route>
            <Route path="/NotFound" element={<NotFound />}></Route>
            <Route path="*" element={<Navigate to="/NotFound" />}></Route>
          </Routes>

          <Footer></Footer>
        </div>
      )}
    </Router>
  );
}

export default App;
