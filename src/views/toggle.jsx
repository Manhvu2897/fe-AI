import React from "react";
import styled from "styled-components";

const Switch2 = ({ checked, value }) => {
  return (
    <StyledWrapper>
      <label className="switch">
        <input
          type="checkbox"
          className="input"
          value={value}
          onChange={(e) => checked(e.target.checked)}
        />
        <span className="slider" />
      </label>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  /* The switch - the box around the slider */
  .switch {
    /* Variables */
    --switch_width: 2em;
    --switch_height: 1em;
    --thumb_color: green;
    --track_color: #e8e8e8;
    --track_active_color: #888;
    --outline_color: #000;
    font-size: 17px;
    position: relative;
    display: inline-block;
    width: var(--switch_width);
    height: var(--switch_height);
  }

  /* Hide default HTML checkbox */
  .switch .input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  /* The slider */
  .slider {
    box-sizing: border-box;
    border: 2px solid var(--outline_color);
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    transition: 0.15s;
    border-radius: var(--switch_height);
  }

  .slider:before {
    box-sizing: border-box;
    position: absolute;
    content: "";
    height: var(--switch_height);
    width: var(--switch_height);
    border: 2px solid var(--outline_color);
    border-radius: 100%;
    left: -2px;
    bottom: -2px;
    background-color: var(--thumb_color);
    transform: translateY(-0.2em);
    box-shadow: 0 0.2em 0 var(--outline_color);
    transition: 0.15s;
  }

  .input:checked + .slider {
    background-color: var(--track_active_color);
  }

  .input:focus-visible + .slider {
    box-shadow: 0 0 0 2px var(--track_active_color);
  }

  /* Raise thumb when hovered */
  .input:hover + .slider:before {
    transform: translateY(-0.3em);
    box-shadow: 0 0.3em 0 var(--outline_color);
  }

  .input:checked + .slider:before {
    transform: translateX(calc(var(--switch_width) - var(--switch_height)))
      translateY(-0.2em);
    background-color: red;
  }

  /* Raise thumb when hovered & checked */
  .input:hover:checked + .slider:before {
    transform: translateX(calc(var(--switch_width) - var(--switch_height)))
      translateY(-0.3em);
    box-shadow: 0 0.3em 0 var(--outline_color);
  }
`;

export default Switch2;
