import React, { useState } from 'react';
import { signup } from '../../actions';
import { useDispatch, useSelector } from 'react-redux';
import './style.css';
import { Redirect, Link } from 'react-router-dom';

/**
* @author
* @function RegisterPage
**/

const RegisterPage = (props) => {

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);

  const registerUser = (e) => {

    e.preventDefault();
    const user = {
      firstName, lastName, email, password
    }

    dispatch(signup(user))
  }

  if(auth.authenticated) {
    return <Redirect to={'/'} />
  }

  return(
    <div class="row justify-content-center mt-5" style={{margin: 0}}>
      <div class="col-md-4">      
        <div class="card shadow">
        <div class="card-body">
          <h5 class="card-title text-center mb-5">Register</h5>
          <form onSubmit={registerUser}>
            <div class="form-group">
              <input name="firstName"
                class="form-control"
                type="text" 
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="First Name"
              />
            </div>
            <div class="form-group">
              <input name="lastName"
                class="form-control"
                type="text" 
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Last Name"
              />
            </div>
            <div class="form-group">
              <input name="email"
                class="form-control"
                type="text" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
              />
            </div>
            <div class="form-group">
              <input name="password"
                class="form-control"
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
              />
            </div>
            <button type="submit" class="btn btn-block btn-primary mt-5">REGISTER</button>
          </form>
          <small class="form-text text-center mt-3">Have an account? <Link to="/login"> Login</Link></small>
        </div>
      </div>
    </div>
    </div>
  )

}

export default RegisterPage