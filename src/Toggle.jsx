import React from "react";
import "./Toggle.css";

export const Toggle = ({ checked, onChange, size = "medium", serviceType }) => {
  return (
    <label className={`toggle-switch ${size}`} data-service-type={serviceType}>
      <input type="checkbox" checked={checked} onChange={onChange} />
      <span className="toggle-slider"></span>
    </label>
  );
};
