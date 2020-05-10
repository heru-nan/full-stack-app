import React, { useRef, useState, useEffect } from "react";

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
        new task
      </button>
    </li>
  ) : (
    <li>
      <form onSubmit={submit}>
        <input
          ref={textInput}
          type="text"
          placeholder="task"
          name="task"
          defaultValue=""
        />
        <button type="submit">add task</button>
        <button
          type="button"
          onClick={() => setForm(false)}
          value="cancel"
          name="cancel"
        >
          cancel
        </button>
      </form>
    </li>
  );
};

export default FormSection;
