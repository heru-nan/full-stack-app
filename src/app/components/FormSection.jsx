import React, { useRef, useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const FormSection = ({ submit }) => {
  const [form, setForm] = useState(false);
  const textInput = useRef(null);
  useEffect(() => {
    if (textInput.current) textInput.current.focus();
  }, [form]);
  return !form ? (
    <li>
      <button
        onClick={() => {
          setForm(true);
        }}
      >
        add task
        <FontAwesomeIcon
          icon="tasks"
          style={{
            color: "lightblue",
            marginLeft: "5px",
          }}
        />
      </button>
    </li>
  ) : (
    <li style={{ position: "relative" }}>
      <form onSubmit={submit} style={{ display: "flex", flexDirection: "row" }}>
        <input
          ref={textInput}
          type="text"
          placeholder="task"
          name="task"
          defaultValue=""
        />
        <button type="submit">
          <FontAwesomeIcon icon="check" />
        </button>
        <button
          type="button"
          onClick={() => setForm(false)}
          value="cancel"
          name="cancel"
        >
          <FontAwesomeIcon icon="window-close" />
        </button>
      </form>
    </li>
  );
};

export default FormSection;
