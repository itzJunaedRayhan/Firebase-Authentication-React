import React, { useRef, useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../Contexts/AuthContext';
import './SignUp.css'


const SignUp = () => {
    const [showUserDetail, setShowUserDetail] = useState(false);
    const [showPhoneDetail, setShowPhoneDetail] = useState(false);
    const [showPassDetail, setShoPassDetail] = useState(false);
    const firstNameRef = useRef();
    const lastNameRef = useRef();
    const usernameRef = useRef();
    const emailRef = useRef();
    const phoneRef = useRef();
    const passwordRef = useRef();
    const confirmPasswordRef = useRef();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
	const {signup, currentUser, getUserInfomation} = useAuth();
	const navigate = useNavigate();
	
    const handleSubmit = async (e) => {
        e.preventDefault();
		
		if (passwordRef.current.value !== confirmPasswordRef.current.value) {
			return setError("Passwords do not match!");
		}

        const inputData = {
            firstName : firstNameRef.current.value,
            lastName  : lastNameRef.current.value,
            userName  : usernameRef.current.value,
            email     : emailRef.current.value,
            phone     : phoneRef.current.value,
            password  : passwordRef.current.value,
            confirmPasswor : confirmPasswordRef.current.value
        }
		

		try {
			setLoading(true);
			setError("");
			await signup(emailRef.current.value, passwordRef.current.value);
			await getUserInfomation(inputData);
			navigate("/dashboard");
		  } catch (error) {
			setError(error);
			console.log(error)
		  }
		  setLoading(false);
    }


    return (
        <div className="wrapper">
			<div className="inner">
				<form className="RegistrationForm">
					<h3>Registration Form</h3>
                    {error ? (
                        <p className="danger">{JSON.stringify(error)}</p>
                    ) : (
                        ""
                    )}
					<div className="form-group">
						<div className="form-wrapper">
							<input ref={firstNameRef} type="text" className="form-control firstName" placeholder="First Name:" />
							<p className="Error"> </p>
						</div>
						<div className="form-wrapper">
							<input ref={lastNameRef} type="text" className="form-control lastName" placeholder="Last Name:" />
							<p className="Error"> </p>
						</div>
					</div>
					<div className="form-wrapper">
						<input ref={usernameRef} type="text" className="form-control username" placeholder="Username:" />
						<i className="zmdi zmdi-info-outline info" onMouseOver={() => setShowUserDetail(true)} onMouseOut={() => setShowUserDetail(false)}></i>
						<div className={`dialog ${showUserDetail ? 'displayDetail' : 'hideDatail'} `}>
							<span>Username must contain at least one Uppercase and one Lowercase character and no space between characters.</span>
							<div className="right-point"></div>
						</div>
						<p className="Error"> </p>
					</div>
					<div className="form-wrapper">
						<input ref={emailRef} type="text" className="form-control email" placeholder="Email:" />
						<p className="Error"> </p>
					</div>
					<div className="form-wrapper">
						<input ref={phoneRef} type="number" className="form-control phone" placeholder="Phone Number:" />
						<i className="zmdi zmdi-info-outline info" onMouseOver={() => setShowPhoneDetail(true)} onMouseOut={() => setShowPhoneDetail(false)}></i>
						<div className={`dialog ${showPhoneDetail ? 'displayDetail' : 'hideDatail'} `}>
							<span>only Bangladeshi Phone Number are acceptable.</span>
							<div className="right-point"></div>
						</div>
						<p className="Error"> </p>
					</div>
					<div className="form-wrapper">
						<input ref={passwordRef} type="password" className="form-control password" placeholder="Password:" />
						<i className="zmdi zmdi-info-outline info" onMouseOver={() => setShoPassDetail(true)} onMouseOut={() => setShoPassDetail(false)}></i>
						<div className={`dialog ${showPassDetail ? 'displayDetail' : 'hideDatail'} `}>
							<span>Password must contain at least one Uppercase and one Lowercase character, one digit, one special symbol like (@#$%^&*).</span>
							<div className="right-point"></div>
						</div>
						<p className="Error"> </p>
					</div>
					<div className="form-wrapper">
						<input ref={confirmPasswordRef} type="password" className="form-control confirmPassword" placeholder="Confirm Password:" />
						<p className="Error"> </p>
					</div>
					<button type="submit" onClick={handleSubmit} className="submitBtn">Sign Up</button>
					<div className="form-bottom">
						Already have an account? <span onClick={() => navigate("/login")}>Sign In</span>
					</div>
				</form>
			</div>
		</div>
    );
};

export default SignUp;