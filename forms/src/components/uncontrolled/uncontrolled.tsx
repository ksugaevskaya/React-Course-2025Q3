import { useState } from "react";
import "./uncontrolled.css";

export default function UncontrolledForm() {
  const [firstNameError, setFirstNameError] = useState("");
  const [emailError, setEmailError] = useState("");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const values = Object.fromEntries(formData.entries());

    console.log(values);
    // values.fname, values.age, values.email и т.д.

    if (values.fname === "") {
      setFirstNameError("First name is required");
    }

    if (values.fname[0] !== values.fname[0]?.toUpperCase?.()) {
      setFirstNameError("The first letter should be capitalized");
    }

    if (values.email !== values.email.trim()) {
      setEmailError(
        "Email address must not contain leading or trailing whitespace"
      );
    }
    if (!values.email.includes("@")) {
      setEmailError("Email address must contain @");
    }
    const parts = values.email.split("@");
    if (parts.length !== 2 || !parts[1]) {
      setEmailError(
        "Email address must contain a domain name (e.g., example.com)"
      );
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(values.email)) {
      setEmailError(
        "Email address must be properly formatted (e.g., user@example.com)"
      );
    }
  }
  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="fname">First name:</label>
        <input
          type="text"
          id="fname"
          name="fname"
          placeholder="Write your name"
        />

        {firstNameError && <div className="error"> {firstNameError}</div>}

        <label htmlFor="age">Age:</label>
        <input type="number" id="age" name="age" placeholder="Write your age" />

        <label htmlFor="email">Email:</label>
        <input type="text" id="email" name="email" />

        {emailError && <div className="error">{emailError}</div>}

        <label htmlFor="password">Password:</label>
        <input type="password" id="password" name="password" />

        <label htmlFor="passwordRepeat">Repeat password:</label>
        <input
          type="passwordRepeat"
          id="passwordRepeat"
          name="passwordRepeat"
        />

        <p>Gender:</p>
        <input type="radio" id="female" name="gender" value="female" />
        <label htmlFor="female">Female</label>
        <input type="radio" id="male" name="gender" value="male" />
        <label htmlFor="male">Male</label>

        <input type="checkbox" id="checkbox" name="checkbox" />
        <label htmlFor="checkbox"> Accept Terms and Conditions agreement</label>

        <label htmlFor="myfile"> Upload picture:</label>
        <input type="file" id="myfile" name="myfile"></input>

        <input type="submit" value="Submit" />
      </form>
    </>
  );
}
