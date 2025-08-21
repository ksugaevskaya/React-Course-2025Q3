export default function UncontrolledForm() {
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const values = Object.fromEntries(formData.entries());

    console.log(values);
    // values.fname, values.age, values.email и т.д.
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
        <label htmlFor="age">Age:</label>
        <input type="number" id="age" name="age" placeholder="Write your age" />

        <label htmlFor="email">Email:</label>
        <input type="text" id="email" name="email" />

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
