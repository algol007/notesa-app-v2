import React, { useState } from 'react';
import './style.css';
import { signin } from '../../actions/auth.actions';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';

/**
* @author
* @function LoginPage
**/

const LoginPage = (props) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);

  const userLogin = (e) => {
    e.preventDefault();

    if(email === "") {
      alert("email is required!");
      return;
    }
    if(password === "") {
      alert("password is required!");
      return;
    }

    dispatch(signin({ email, password }));
  }

  if(auth.authenticated) {
    return <Redirect to={'/'} />
  }


  return(
      <div class="row justify-content-center mt-5" style={{margin: 0}}>
      <div class="col-md-4">      
        <div class="card shadow">
          <div class="card-body">
            <h5 class="card-title text-center mb-5">Login Page</h5>
            <form onSubmit={userLogin}>
              <div class="form-group">
                <input name="email"
                  class="form-control"
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email Address" />
              </div>
              <div class="form-group">
                <input name="password"
                  class="form-control"
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password" />
              </div>
              <button type="submit" class="btn btn-block btn-primary mt-5">LOGIN</button>
            </form>
            <small class="form-text text-center mt-3">Not have an account? <Link to="/register"> Register</Link></small>
          </div>
        </div>
      </div>
      </div>
  )

}

export default LoginPage