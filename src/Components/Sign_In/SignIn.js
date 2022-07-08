import React, { useRef, useState, useEffect, useContext } from 'react';
import "../Sign_Up/SignUp.css"
import { useNavigate } from "react-router-dom";
import { useAuth } from '../../Contexts/AuthContext';

const SignIn = () => {
    const emailRef = useRef();
    const passwordRef = useRef();
    const [showPassDetail, setShoPassDetail] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const {login} = useAuth();


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            setError("");
            await login(emailRef.current.value, passwordRef.current.value);
            navigate("/dashboard")
        } catch (error) {
            setError(error);
            console.log(error);
        }
        setLoading(false);
    }


    


    return (
        <div className="wrapper">
			<div className="inner">
				<form className="RegistrationForm">
					<h3>Log In</h3>
                    {error ? (
                        <p className="danger">{JSON.stringify(error)}</p>
                    ) : (
                        ""
                    )}
					<div className="form-wrapper">
						<input ref={emailRef} type="text" className="form-control email" placeholder="Email:" />
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
					<button type="submit" onClick={handleSubmit} className="submitBtn">Sign In</button>

                    <div className="form-bottom">
                        Don't have an account? <span onClick={() => navigate("/")}>Sign Up</span>
                    </div>
				</form>
			</div>
		</div>
    );
};

export default SignIn;