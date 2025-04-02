import React, { useState, FormEvent, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../api/authAPI';

// registering credentials
// should take user to this page when they press "register", and successfully filled in the credentials
// handles the registration process
const Register: React.FC = () => {
    const [formState, setFormState] = useState({ username: '', password: '' });
    const [register, { error, data }] = useMutation(REGISTER_USER);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
    
        setFormState({
          ...formState,
          [name]: value,
        });
      };

      const handleFormSubmit = async (event: FormEvent) => {
        event.preventDefault();
        console.log(formState);
        try {
          const { data } = await register({
            variables: { ...formState },
          });
    
          Auth.register(data.register.token);
        } catch (e) {
          console.error(e);
        }
    
        setFormState({
          username: '',
          password: '',
        });
      };
    return (
      <div>
        <h2>Join CRNTLY</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>First Name:</label>
            <input
              type="text"
              name="firstName"
              value={registerData.firstName}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Last Name:</label>
            <input
              type="text"
              name="lastName"
              value={registerData.lastName}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Create Username:</label>
            <input
              type="text"
              name="username"
              value={registerData.username}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Create Password:</label>
            <input
              type="password"
              name="password"
              value={registerData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Confirm Password:</label>
            <input
              type="password"
              name="confirmPassword"
              value={registerData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <button type="submit">Register</button>
        </form>
      </div>
    );
  };
};
  
  export default Register;

  