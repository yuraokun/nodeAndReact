import { useNavigate } from "react-router-dom";

const About = () => {
  let navigate = useNavigate();

  return (
    <div>
      <h2>About</h2>
      <h4>Version 1.0.0</h4>
      <button
        onClick={() => {
          navigate("/special");
        }}
      >
        Go TO Special Page
      </button>
    </div>
  );
};

export default About;
