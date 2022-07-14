import React, { createContext, useContext, useEffect, useState } from 'react';
import firebase from 'firebase/compat/app';
import firebaseConfig from '../Firebase/Firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, getAuth, signOut, updateEmail, updatePassword } from 'firebase/auth';
import swal from '@sweetalert/with-react';


// Initialize Firebase
if(!firebase.apps.length){
    firebase.initializeApp(firebaseConfig);
}

const auth = getAuth();
const AuthContext = createContext();
const useAuth = () => {
    return useContext(AuthContext);
}


const AuthenticationContextProvider = (props) => {
    const [currentUser, setCurrentUser] = useState({});
    const [userInfo, setUserInfo] = useState({})

    //  sign up
    const signup = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            swal(
                <div>
                  <h1>Congratulations!</h1>
                  <p>
                    Signed Up successfully
                  </p>
                </div>
            );
          });
    };

    //  Log In
    const login = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
            // Signed in 
            swal(
                <div className='swalStyle'>
                  <h1>Congress!</h1>
                  <p>
                    You Have Logged in Successfully
                  </p>
                </div>
            )
          })
    };

    //  Log Out
    const logout = () => {
        return  signOut(auth).then(() => {
            // Sign-out successful.
            swal(
                <div className='swalStyle'>
                  <h3>You Have Logged Out</h3>
                </div>
            )
          })
    };

    //   update Email:
    const updateEmailAddress = (fire, email) => {
        return updateEmail(fire, email).then(() => {
            // Email updated!
            swal(
                <div>
                  <h1>Wow</h1>
                  <p>
                    Your Email Address Updated
                  </p>
                </div>
            )
        })
      };

    //  Update Password:
    const updateThePassword = (user, newPassword) => {
        return updatePassword(user, newPassword).then(() => {
            swal(
                <div>
                  <h1>Wow</h1>
                  <p>
                    Your Password Updated
                  </p>
                </div>
              )
            // Update successful.
          })
    };

    //  get user information
    const getUserInfomation = (info) => {
        setUserInfo(info)
    }





    //  set current user on every state change:
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setCurrentUser(user);
        });
        return unsubscribe;
    }, []);

    return (
        <AuthContext.Provider value={
            {signup, login, logout, currentUser, getUserInfomation, userInfo, updateEmailAddress,
            updateThePassword,}  
        }>{props.children}</AuthContext.Provider>
    );
};

export {AuthenticationContextProvider, useAuth};