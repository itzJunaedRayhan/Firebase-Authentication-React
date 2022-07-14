import React, { useRef, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../Contexts/AuthContext';
import './SignUp.css'
import { confirmPasswordValidate, EmailAddressValidate, FirstNameValidate, LastNameValidate, PasswordValidate, PhoneNumberValidate, UsernameValidate } from '../../Validation/Validation';

const SignUp = () => {
    const [showUserDetail, setShowUserDetail] = useState(false);
    const [showPhoneDetail, setShowPhoneDetail] = useState(false);
    const [showPassDetail, setShoPassDetail] = useState(false);
	const [Error, setError] = useState(false);
    const firstNameRef = useRef();
    const lastNameRef = useRef();
    const usernameRef = useRef();
    const emailRef = useRef();
    const phoneRef = useRef();
    const passwordRef = useRef();
    const confirmPasswordRef = useRef();
	const {signup, getUserInfomation} = useAuth();
	const navigate = useNavigate();

	const [firstNameDetails, setFirstNameDetails] = useState({
		message : "",
		state : false
	});

	const [lastNameDetails, setLastNameDetails] = useState({
		message : "",
		state : false
	});

	const [userNameDetails, setUserNameDetails] = useState({
		message : "",
		state : false
	})

	const [emailDetails, setEmailDetails] = useState({
		message : "",
		state : false
	})

	const [phoneNumDetails, setPhoneNumDetails] = useState({
		message : "",
		state : false
	})

	const [passwordDetails, setPasswordDetails] = useState({
		message : "",
		state : false
	})

	const [confirmPassDetails, setConfirmPassDetails] = useState({
		message : "",
		state : false
	})

	
    const handleSubmit = async (e) => {
        e.preventDefault();

        const inputData = {
            firstName : FirstNameValidate(firstNameRef, firstNameDetails, setFirstNameDetails),
            lastName  : LastNameValidate(lastNameRef, lastNameDetails, setLastNameDetails),
            userName  : UsernameValidate(usernameRef, userNameDetails, setUserNameDetails),
            email     : EmailAddressValidate(emailRef, emailDetails, setEmailDetails),
            phone     : PhoneNumberValidate(phoneRef, phoneNumDetails, setPhoneNumDetails),
            password  : PasswordValidate(passwordRef, passwordDetails, setPasswordDetails),
            confirmPasswor : confirmPasswordValidate(passwordRef, confirmPasswordRef, confirmPassDetails, setConfirmPassDetails)
        }
		//console.log(inputData)


		
		

		try {
			if (firstNameDetails.state || lastNameDetails.state || userNameDetails.state || emailDetails.state || phoneNumDetails.state || passwordDetails.state || confirmPassDetails.state) {
				setError("Thare is an Error")
			}else{
				await signup(emailRef.current.value, passwordRef.current.value);
				await getUserInfomation(inputData);
				navigate("/dashboard");
			}
		} catch (error) {
			console.log(error)
		}
    }


    return (
        <div className="wrapper">
			<div className="inner">
				<form className="RegistrationForm">
					<h3>Registration Form</h3>
                    
					<div className="form-group">
						<div className="form-wrapper">
							<input ref={firstNameRef} type="text" className="form-control firstName" onChange={() => {FirstNameValidate(firstNameRef, firstNameDetails, setFirstNameDetails)}} placeholder="First Name:" />
							<p className="Error">{firstNameDetails.state && firstNameDetails.message}</p>
						</div>
						<div className="form-wrapper">
							<input ref={lastNameRef} type="text" className="form-control lastName" onChange={() => {LastNameValidate(lastNameRef, lastNameDetails, setLastNameDetails)}} placeholder="Last Name:" />
							<p className="Error">{lastNameDetails.state && lastNameDetails.message}</p>
						</div>
					</div>
					<div className="form-wrapper">
						<input ref={usernameRef} type="text" className="form-control username" onChange={() => {UsernameValidate(usernameRef, userNameDetails, setUserNameDetails)}} placeholder="Username:" />
						<i className="zmdi zmdi-info-outline info" onMouseOver={() => setShowUserDetail(true)} onMouseOut={() => setShowUserDetail(false)}></i>
						<div className={`dialog ${showUserDetail ? 'displayDetail' : 'hideDatail'} `}>
							<span>Username must contain at least one Uppercase and one Lowercase character and no space between characters.</span>
							<div className="right-point"></div>
						</div>
						<p className="Error">{userNameDetails.state && userNameDetails.message}</p>
					</div>
					<div className="form-wrapper">
						<input ref={emailRef} type="text" className="form-control email" onChange={() => {EmailAddressValidate(emailRef, emailDetails, setEmailDetails)}} placeholder="Email:" />
						<p className="Error">{emailDetails.state && emailDetails.message}</p>
					</div>
					<div className="form-wrapper">
						<input ref={phoneRef} type="number" className="form-control phone" onChange={() => {PhoneNumberValidate(phoneRef, phoneNumDetails, setPhoneNumDetails)}} placeholder="Phone Number:" />
						<i className="zmdi zmdi-info-outline info" onMouseOver={() => setShowPhoneDetail(true)} onMouseOut={() => setShowPhoneDetail(false)}></i>
						<div className={`dialog ${showPhoneDetail ? 'displayDetail' : 'hideDatail'} `}>
							<span>only Bangladeshi Phone Number are acceptable.</span>
							<div className="right-point"></div>
						</div>
						<p className="Error">{phoneNumDetails.state && phoneNumDetails.message}</p>
					</div>
					<div className="form-wrapper">
						<input ref={passwordRef} type="password" className="form-control password" onChange={() => {PasswordValidate(passwordRef, passwordDetails, setPasswordDetails)}} placeholder="Password:" />
						<i className="zmdi zmdi-info-outline info" onMouseOver={() => setShoPassDetail(true)} onMouseOut={() => setShoPassDetail(false)}></i>
						<div className={`dialog ${showPassDetail ? 'displayDetail' : 'hideDatail'} `}>
							<span>Password must contain at least one Uppercase and one Lowercase character, one digit, one special symbol like (@#$%^&*).</span>
							<div className="right-point"></div>
						</div>
						<p className="Error">{passwordDetails.state && passwordDetails.message}</p>
					</div>
					<div className="form-wrapper">
						<input ref={confirmPasswordRef} type="password" className="form-control confirmPassword" onChange={() => {confirmPasswordValidate(passwordRef, confirmPasswordRef, confirmPassDetails, setConfirmPassDetails)}} placeholder="Confirm Password:" />
						<p className="Error">{confirmPassDetails.state && confirmPassDetails.message}</p>
					</div>
					<p className='Error' style={{textAlign: 'center', fontSize: '15px'}}>{firstNameDetails.state || lastNameDetails.state || userNameDetails.state || emailDetails.state || phoneNumDetails.state || passwordDetails.state || confirmPassDetails.state ? "Please Fill up the Form" : ""}</p>
					<button type="submit" onClick={handleSubmit} className="submitBtn">Sign Up</button>
					<div className="form-bottom">
						Already have an account? <span onClick={() => navigate("/login")} style={{fontWeight: 'bold', fontSize: '14px'}}>Sign In</span>
					</div>
				</form>
			</div>
		</div>
    );
};

export default SignUp;