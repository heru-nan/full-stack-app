import React from "react";

export default function TextField({ type, name, label }) {
  return (
    <div className="text-field">
      <input className="text-field__input" type={type} name={name} required />
      <span className="text-field__line-ripple"></span>
      <label className="text-field__label">{label}</label>
    </div>
  );
}
