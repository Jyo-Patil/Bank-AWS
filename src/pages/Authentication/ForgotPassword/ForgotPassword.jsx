import React, { useState } from 'react'
import { Link } from "react-router-dom"
import AWS from 'aws-sdk';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

// Configure AWS Cognito
const cognito = new AWS.CognitoIdentityServiceProvider({
  region: 'YOUR_REGION', // Your AWS region
});

function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)



  const navigate = useNavigate()
  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const params = {
      ClientId: 'YOUR_COGNITO_APP_CLIENT_ID', // Your Cognito App Client ID
      Username: email,
    };

    try {
      await cognito.forgotPassword(params).promise();
      toast.success('Password recovery email sent!');
      navigate("/")
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className='mvh-100 ForgotPasswordPage d-flex justify-content-center align-items-center'>
      <div className="container ">
        <div className="row">
          <div className="col">
          <Link className='btn btn-home' to="/"><i class="fa-solid fa-arrow-left"></i></Link>
          </div> 
        </div>
        <div className="row">
          <div className="col-12 col-md-8 offset-md-2 col-lg-6 offset-lg-3">
            <div className="card ForgotPasswordCard w-100">
              <div className="div card-body">
                <h3>Forgot Password</h3>
                <form onSubmit={handleSubmit}>
                  <label for="exampleInputEmail1" className="form-label">Email</label>
                  <div className="input-group flex-nowrap">
                    <input type="email" className="form-control" id="exampleInputEmail1" placeholder="Email" name='email' aria-label="Email" required value={email} onChange={handleChange} />
                  </div>
                  <div className="text-center">
                    <button type="submit"  disabled={isLoading} className="btn  loginButton mt-2 mb-2">
                    {
                      !isLoading ?
                        "Send Recovery Email"
                        :
                        <div className='spinner-border spinner-border-sm'></div>
                    }
                    </button>
                  </div>
                </form>
                <div style={{ position: "relative" }}><span className='OR'><i className="fa-solid fa-o"></i><i className="fa-solid fa-r"></i></span><hr /></div>
                <div className="text-center">
                  Already a user? <span><Link to="/login" >Login</Link></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ForgotPassword