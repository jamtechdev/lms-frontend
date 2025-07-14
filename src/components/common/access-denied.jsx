import { Link } from "react-router-dom";
import unicorn from "../../assets/images/sad-unicorn.png";

const AccessDeniedPage = () => {
  return (
    <div className="access-denied-container">
      <div className="image-container">
        <img src={unicorn} alt="Sad Unicorn" className="bouncy-image" />
      </div>

      <h1 className="heading">Oops! No Entry 🚫</h1>
      <p className="message">
        You can't go there yet, but you can go back to the fun zone!
      </p>

      <Link to="/" className="home-button">
        🏠 Go Home
      </Link>
    </div>
  );
};

export default AccessDeniedPage;
