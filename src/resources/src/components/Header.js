import propTypes from "prop-types";
import Button from "./Button";

const Header = (props) => {
  return (
    <header className="header">
      {/* <h1 style={{ color: "white" }}>{props.name}</h1> */}
      <h1 style={headingStyle}>{props.name}</h1>
      <Button
        color="white"
        text={props.showAdd ? "Close" : "Add"}
        onClick={props.onAdd}
      />
    </header>
  );
};

Header.defaultProps = {
  name: "Test Name",
};

Header.propTypes = {
  title: propTypes.string,
};

const headingStyle = {
  color: "white",
};

export default Header;
