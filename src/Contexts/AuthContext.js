import React, { createContext, useContext, useEffect, useState } from 'react';
import firebase from 'firebase/compat/app';
import firebaseConfig from '../Firebase/Firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, getAuth, signOut, updateEmail } from 'firebase/auth';



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
        return createUserWithEmailAndPassword(auth, email, password);
    };

    //  Log In
    const login = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    };

    //  Log Out
    const logout = () => {
        return  signOut(auth);
    };

    //   update Email:
    const updateEmailAddress = (fire, email) => {
        console.log(fire.email, email)
        return updateEmail(fire, email).then(() => {
            // Email updated!
            // ...
        }).catch((error) => {
            // An error occurred
            // ...
            console.log(error)
        });
      };

    //  Update Password:
    const updatePassword = (password) => {
        return setCurrentUser(currentUser.password = password);
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
            updatePassword,}  
        }>{props.children}</AuthContext.Provider>
    );
};

export {AuthenticationContextProvider, useAuth};