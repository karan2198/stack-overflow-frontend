import React from "react";
import "./LeftSidebar.css";
import { NavLink } from "react-router-dom";
import Globe from "../../assets/Globe.svg";
import PropTypes from 'prop-types';

const LeftSidebar = ({ slideIn, handleSlideIn, isDay }) => {
  LeftSidebar.propTypes = {
    slideIn: PropTypes.bool.isRequired,
    handleSlideIn: PropTypes.func.isRequired,
    isDay: PropTypes.bool.isRequired,
  };
  console.log('isDay in leftSideBar:', isDay);
  const slideInStyle = {
    transform: "translateX(0%)",
  };

  const slideOutStyle = {
    transform: "translateX(-100%)",
  };

  const toggleSlide = () => {
    console.log('handleSlideIn:', handleSlideIn);
    console.log('typeof handleSlideIn:', typeof handleSlideIn);

    if (typeof handleSlideIn === 'function') {
      handleSlideIn(!slideIn);
    } else {
      console.error('handleSlideIn is not a function');
    }
  };

  return (
    <div
      className={`left-sidebar ${isDay ? 'day' : 'night'}`}
      style={slideIn ? slideInStyle : slideOutStyle}
    >
      <nav className={`side-nav ${isDay ? 'day' : 'night'}`}>
        <button onClick={toggleSlide} className="nav-btn">
          <NavLink to="/" className="side-nav-links" activeClassName="active">
            <p className={`all ${isDay ? 'day' : 'night'} `}>Home</p>
          </NavLink>
        </button>
        <div className="side-nav-div">
          <div style={{ display: 'flex', flexDirection: 'row', }}>
            <p className={`all ${isDay ? 'day' : 'night'} `}>PUBLIC</p>
          </div>
          <button onClick={toggleSlide} className="nav-btn">
            <NavLink
              to="/Questions"
              className="side-nav-links"
              activeClassName="active"
            >
              <img src={Globe} alt="Globe" />
              <p className={`all ${isDay ? 'day' : 'night'} `} style={{ paddingLeft: "10px" }}> Questions </p>
            </NavLink>
          </button>
          <button onClick={toggleSlide} className="nav-btn">
            <NavLink
              to="/Tags"
              className="side-nav-links"
              activeClassName="active"
              style={{ paddingLeft: "40px" }}
            >
              <p className={`all ${isDay ? 'day' : 'night'} `}>Tags</p>
            </NavLink>
          </button>
          <button onClick={toggleSlide} className="nav-btn">
            <NavLink
              to="/Users"
              className="side-nav-links"
              activeClassName="active"
              style={{ paddingLeft: "40px" }}
            >
              <p className={`all ${isDay ? 'day' : 'night'} `}>Users</p>
            </NavLink>
          </button>
        </div>
      </nav>
    </div>
  );
};

export default LeftSidebar;
