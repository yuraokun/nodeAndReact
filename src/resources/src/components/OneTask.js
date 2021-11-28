import {
  useParams,
  useNavigate,
  Routes,
  Route,
  NavLink,
} from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const OneTask = () => {
  let { id } = useParams();
  let navigate = useNavigate();

  const [task, setTask] = useState({});

  useEffect(() => {
    const getTask = async () => {
      try {
        const res = await axios.get(`/api/tasks/${id}`);
        if (res.status === 200) {
          console.log(12);
          setTask(res.data);
        }
      } catch (err) {
        console.log(3232);
        navigate("/NotFound");
      }
    };
    getTask();
  }, []);

  return (
    <div>
      <nav>
        <NavLink
          to="detail"
          className={(navData) => (navData.isActive ? "active" : "")}
        >
          Show Detail
        </NavLink>
        <NavLink
          to="id"
          className={(navData) => (navData.isActive ? "active" : "")}
        >
          Show ID
        </NavLink>
      </nav>

      <Routes>
        <Route path="/detail" element={<h3>Task Detail : {task.text}</h3>} />
        <Route path="/id" element={<h3>Task Id : {task.id}</h3>} />
      </Routes>
    </div>
  );
};

export default OneTask;
