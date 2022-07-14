import React, { useRef, useState } from 'react';
import '../../Components/Sign_Up/SignUp'
import { useNavigate } from "react-router-dom";
import { useAuth } from '../../Contexts/AuthContext';
import { getAuth } from 'firebase/auth';

const UpdateProfile = () => {
    const emailRef = useRef();
    const passwordRef = useRef();
    const confirmPasswordRef = useRef();
    const [showPassDetail, setShoPassDetail] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const {currentUser, updateEmailAddress, updateThePassword} = useAuth();
    const auth =  getAuth();


    const handleUpdate = (e) => {
      e.preventDefault();
      if (passwordRef.current.value !== confirmPasswordRef.current.value) {
        return setError("Passwords do not match!");
      }
      setError("");
      const promises = [];
      if (emailRef.current.value !== currentUser.email) {
        updateEmailAddress(auth.currentUser, emailRef.current.value);
      }
      if (passwordRef.current.value) {
        updateThePassword(auth.currentUser, confirmPasswordRef.current.value)
      }
      Promise.all(promises)
        .then(() => {
        navigate("/dashboard");
      })
      .catch((error) => {
        setError("Please Try Again!");
      });
    }


    return (
        <div className="wrapper">
          <div className="inner">
            <form className="RegistrationForm">
              <h3>Update</h3>
              {error ? ( <p className="danger" style={{textAlign: 'center', padding: '5px 3px 20px 3px'}}>{JSON.stringify(error)}</p>) : ("")}
              <div className="form-wrapper">
                <input ref={emailRef} type="text" className="form-control email" defaultValue={currentUser.email} placeholder="Email:" />
              </div>
              <div className="form-wrapper" style={{margin: '30px 0px'}}>
                <input ref={passwordRef} type="password" className="form-control password" placeholder="Password:" />
                <i className="zmdi zmdi-info-outline info" onMouseOver={() => setShoPassDetail(true)} onMouseOut={() => setShoPassDetail(false)}></i>
                <div className={`dialog ${showPassDetail ? 'displayDetail' : 'hideDatail'} `}>
                  <span>Password must contain at least one Uppercase and one Lowercase character, one digit, one special symbol like (@#$%^&*).</span>
                  <div className="right-point"></div>
                </div>
              </div>
              <div className="form-wrapper">
                <input ref={confirmPasswordRef} type="password" className="form-control confirmPassword" placeholder="Confirm Password:" />
              </div>
              <button type="submit" onClick={handleUpdate} className="submitBtn">Updated</button>
            </form>
          </div>
		    </div>
    );
};

export default UpdateProfile;