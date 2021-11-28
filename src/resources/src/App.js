import Footer from "./components/Footer";
import About from "./components/About";
import Special from "./components/Special";
import OneTask from "./components/OneTask";
import NotFound from "./components/NotFound";

import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  NavLink,
  Navigate,
} from "react-router-dom";
import TaskMain from "./components/TaskMain";

function App() {
  return (
    <Router>
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
    </Router>
  );
}

export default App;
