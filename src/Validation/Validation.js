//  First Name Validation:
const validName = new RegExp('^[a-zA-Z]+$');
const validUserName = new RegExp('^[a-zA-Z0-9]+$');
const validEmail =  new RegExp(/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/);
const validPhone = new RegExp(/^\+?(88)?0(19|14|17|13|18|16|15)\d{8}$/);
//  checking string has minimum 1 Capital letter or not
const isUpperCase = (str) => {
    let result = str.split('');
    let regExp = /[A-Z]/;
    result =  result.map(ch => regExp.test(ch));
    return result.includes(true)
}


export function FirstNameValidate (name, invalid, setInvalid) {
    if (!validName.test(name.current.value.trim()) || name.current.value.trim().length < 2) {
        setInvalid({...invalid, 
            message : "First Name should be Minimum 2 characters and shouldn't include any special character!",
            state : true
        });
    }else{
        setInvalid({...invalid, 
            message : '',
            state : false
        });
        return name.current.value.trim();
    }
}


export function LastNameValidate (name, invalid, setInvalid) {
    if (!validName.test(name.current.value.trim()) || name.current.value.trim().length < 3) {
        setInvalid({...invalid, 
            message : "Last Name should be Minimum 3 characters and shouldn't include any special character!",
            state : true
        });
    }else{
        setInvalid({...invalid, 
            message : '',
            state: false
        });
        return name.current.value.trim();
    }
}


export function UsernameValidate (name, invalid, setInvalid) {
    if (!isUpperCase(name.current.value.trim())) {
        setInvalid({...invalid, 
            message : "Enter a valid username which is minimum 1 Capital Letter!",
            state : true
        })
    } else if (name.current.value.trim().length < 3 || !validUserName.test(name.current.value.trim())) {
        setInvalid({...invalid, 
            message : "Enter a valid username",
            state : true
        })
    } else {
        setInvalid({...invalid, 
            message : "",
            state : false
        });
        return name.current.value.trim();
    }
}


export function EmailAddressValidate(name, invalid, setInvalid) {
    if (!validEmail.test(name.current.value.trim())) {
        setInvalid({...invalid, 
            message : "Enter a Valid Email",
            state : true
        });
    }else{
        setInvalid({...invalid, 
            message : "",
            state : false
        });
        return name.current.value.trim();
    }
}


export function PhoneNumberValidate (name, invalid, setInvalid) {
    if (!validPhone.test(name.current.value.trim())) {
        setInvalid({...invalid, 
            message : "Enter a Valid Bangladeshi Phone Number!",
            state : true
        });
    }else{
        setInvalid({...invalid, 
            message : "",
            state : false
        });
        return name.current.value.trim();
    }
}


export function PasswordValidate (password, invalid, setInvalid) {
    if (password.current.value.trim().length === 0) {
        setInvalid({...invalid, 
            message : "Enter Your Password",
            state : true
        });
    } else if (new RegExp(/^(?=.*\s)/).test(password.current.value.trim())) {
        setInvalid({...invalid, 
            message : "Password must not contain any whitespaces!",
            state : true
        });
    } 
    else if (! new RegExp(/^(?=.*[A-Z]).*$/).test(password.current.value.trim())) {
        setInvalid({...invalid, 
            message : "Password must not contain Mimimum 1 Uppercase Letter!",
            state : true
        });
    } 
    else if (! new RegExp(/^(?=.*[a-z])/).test(password.current.value.trim())) {
        setInvalid({...invalid, 
            message : "Password must not contain Mimimum 1 Lowercase Letter!",
            state : true
        });
    } 
    else if (! new RegExp(/^(?=.*[0-9])/).test(password.current.value.trim())) {
        setInvalid({...invalid, 
            message : "Password must not contain Mimimum 1 Digit!",
            state : true
        });
    } 
    else if (! new RegExp(/^(?=.*[~`!@#$%^&*()--+={}[]|\:;"'<>,.?])/).test(password.current.value.trim())) {
        setInvalid({...invalid, 
            message : "Password must not contain Mimimum 1 Special Symbol!",
            state : true
        });
    } 
    else if (! new RegExp(/^.{8,16}$/).test(password.current.value.trim())) {
        setInvalid({...invalid, 
            message : "Password must must be 8-16 characters long!",
            state : true
        });
    } else {
        setInvalid({...invalid, 
            message : "",
            state : false
        });
        return password.current.value;
    }
}


export function confirmPasswordValidate (oldPassword, ConfirmPassword, invalid, setInvalid) {
    if (ConfirmPassword.current.value.trim().length === 0) {
        setInvalid({...invalid, 
            message : "Re-type Your Password",
            state : true
        });
    } else if (oldPassword.current.value.trim() !== ConfirmPassword.current.value.trim()) {
        setInvalid({...invalid, 
            message : "The Password didn't match.",
            state : true
        });
    } else {
        setInvalid({...invalid, 
            message : "",
            state : false
        });
        return ConfirmPassword.current.value.trim();
    }
}

