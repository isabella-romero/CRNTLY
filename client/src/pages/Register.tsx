import React, { useState, FormEvent, ChangeEvent } from 'react';
import { useMutation } from '@apollo/client';
import { gql } from '@apollo/client';
import Auth from '../utils/auth'; // Adjusted the path to match the correct location

const REGISTER_USER = gql`
  mutation RegisterUser($username: String!, $password: String!) {
    register(username: $username, password: $password) {
      token
    }
  }
`;

// registering credentials
// should take user to this page when they press "register", and successfully filled in the credentials
// handles the registration process
const Register: React.FC = () => {
    const [formState, setFormState] = useState({ firstName: '', lastName: '', username: '', password: '', confirmPassword: '' });
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
                variables: { 
                    username: formState.username, 
                    password: formState.password 
                },
            });
    
            Auth.register(data.register.token, formState.password);
        } catch (e) {
            console.error(e);
        }
    
        setFormState({
            firstName: '',
            lastName: '',
            username: '',
            password: '',
            confirmPassword: '',
        });
    };
    return (
      <div>
        <h2>Join CRNTLY</h2>
        <form onSubmit={handleFormSubmit}>
          <div>
            <label>First Name:</label>
            <input
              type="text"
              name="firstName"
              value={formState.firstName}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Last Name:</label>
            <input
              type="text"
              name="lastName"
              value={formState.lastName}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Create Username:</label>
            <input
              type="text"
              name="username"
              value={formState.username}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Create Password:</label>
            <input
              type="password"
              name="password"
              value={formState.password}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Confirm Password:</label>
            <input
              type="password"
              name="confirmPassword"
              value={formState.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>
          {error && <p style={{ color: 'red' }}>{error.message}</p>}
          <button type="submit">Register</button>
        </form>
      </div>
    );
  };

export default Register;
