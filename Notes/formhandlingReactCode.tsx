import React, { useState } from "react";

const Handling = () => {
  const [errors, setErrors] = useState({
    name: false,
    email: false,
  });

  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (value.trim() === "") {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: true,
      }));
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: false,
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      
      const newerrors = {
          name: formData.name.trim() === "",
          email: formData.email.trim() === "",
      };

      setErrors(newerrors);

      const hasErrors = Object.values(newerrors).some((error) => error);
      
      if (!hasErrors) {
          console.log(formData);
      }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              onBlur={handleBlur}
              style={{ borderColor: errors.name ? "red" : "black" }}
            />
          </label>
        </div>
        <div>
          <label>
            Email:
            <input
              type="text"
              name="email"
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
              style={{ borderColor: errors.email ? "red" : "black" }}
            />
          </label>
        </div>
        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default Handling;
