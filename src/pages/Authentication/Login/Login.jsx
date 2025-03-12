import React, { useState, useContext } from 'react';
import { AuthenticatedContext } from '../../../Context/AuthenticatedContext';
import { Link, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AWS from 'aws-sdk';

// Configure AWS Cognito
const cognito = new AWS.CognitoIdentityServiceProvider();

const initialState = { email: "", password: "" };

function Login() {
  const [state, setState] = useState(initialState);
  const { setIsAuthenticated } = useContext(AuthenticatedContext);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    e.preventDefault();
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const { email, password } = state;

    const params = {
      AuthFlow: 'USER_PASSWORD_AUTH',
      ClientId: 'YOUR_COGNITO_APP_CLIENT_ID', // Your Cognito App Client ID
      AuthParameters: {
        USERNAME: email,
        PASSWORD: password,
      },
    };

    try {
      const data = await cognito.adminInitiateAuth(params).promise();
      toast.success("Login successful!");
      setIsAuthenticated(true);
      navigate('/dashboard'); // Redirect to dashboard or desired page
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='mvh-100 loginPage d-flex justify-content-center align-items-center'>
      <div className="container ">
        <div className="row">
          <div className="col">
            <Link className='btn btn-home' to="/"><i class="fa-solid fa-arrow-left"></i></Link>
          </div>
        </div>
        <div className="row">
          <div className="col-12 col-md-8 offset-md-2 col-lg-6 offset-lg-3">
            <div className="card  w-100">
              <div className="div card-body">
                <h3>LOGIN</h3>
                <form onSubmit={handleSubmit}>
                  <label htmlFor="email" className="form-label">Email</label>
                  <input type="email" className="form-control" id="email" name='email' placeholder="Email" required onChange={handleChange} />
                  <label htmlFor="password" className="form-label">Password</label>
                  <input type="password" className="form-control" id="password" name='password' placeholder="Password" required onChange={handleChange} />
                  <button type="submit" disabled={isLoading} className="btn btn-danger text-center">{!isLoading ? "Login" : <div className='spinner-border spinner-border-sm'></div>}</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div style={{ position: "relative" }}><span className='OR text-center'><i class="fa-solid fa-o"></i><i class="fa-solid fa-r"></i></span><hr /></div>
      <div className='text-center'>
        Need an account? <span><Link to="/signUp">SIGNUP</Link></span>
      </div>
    </div>
  )
}

export default Login