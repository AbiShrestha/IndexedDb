import { Formik } from 'formik';
import { useContext } from 'react';
import { UserContext, ThemeContext } from './ThemeContext';

const Form = (props) => {
  const theme = useContext(ThemeContext);
  const { user, setUser } = useContext(UserContext);
  const handleChange = (e) => {
    let u = { ...user, [e.name]: e.value };
    setUser(u);
  };
  return (
    <Formik
      initialValues={{
        email: user.email,
        name: user.name,
        age: user.age,
        ssn: user.ssn,
      }}
      onSubmit={props.addData}
    >
      {({ handleBlur, handleSubmit, errors, touched }) => (
        <form
          onSubmit={handleSubmit}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <div
            style={{
              display: 'flex',
              margin: '10px',
            }}
          >
            <label style={{ marginRight: '30px' }}>Name</label>
            <input
              name="name"
              type="name"
              value={user.name}
              onChange={(event) => handleChange(event.target)}
              onBlur={handleBlur}
            />
            {errors.name && touched.name && errors.name}
          </div>
          <div
            style={{
              display: 'flex',
              margin: '10px',
            }}
          >
            <label style={{ marginRight: '10px' }}>Email</label>
            <input
              name="email"
              type="email"
              value={user.email}
              onChange={(event) => handleChange(event.target)}
              onBlur={handleBlur}
            />
            {errors.email && touched.email && errors.email}
          </div>
          <div
            style={{
              display: 'flex',
              margin: '10px',
            }}
          >
            <label style={{ marginRight: '30px' }}>Age</label>
            <input
              name="age"
              type="age"
              value={user.age}
              onChange={(event) => handleChange(event.target)}
              onBlur={handleBlur}
            />
            {errors.age && touched.age && errors.age}
          </div>
          <div
            style={{
              display: 'flex',
              margin: '10px',
            }}
          >
            <label style={{ marginRight: '30px' }}>SSN</label>
            <input
              name="ssn"
              type="ssn"
              value={user.ssn}
              onChange={(event) => handleChange(event.target)}
              onBlur={handleBlur}
            />
            {errors.ssn && touched.ssn && errors.ssn}
          </div>
          <div
            style={{
              display: 'flex',
              margin: '10px',
            }}
          >
            <button
              style={{
                height: '30px',
                width: '80px',
                background: theme.background,
                color: theme.foreground,
                cursor: 'pointer',
              }}
              type="submit"
            >
              Add Data
            </button>
          </div>
        </form>
      )}
    </Formik>
  );
};
export default Form;
