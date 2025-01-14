import { createContext, useEffect, useState } from "react";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, updateProfile, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import app from "../Firebase/Firebase.config";

import useSecurePublic from "../Hook/useSecurePublic";

export const Context = createContext()
const Authprovider = ({children}) => {
const [user, setUser]= useState(null)
const [loading, setLoading]=useState(true)
const axiosSecurePublic = useSecurePublic()

const auth = getAuth(app);
const Googleprovider = new GoogleAuthProvider();


// google signup
const GoogleLogin = ()=>{
    return signInWithPopup(auth, Googleprovider)
}

// create user
const CreateUser = (email, password)=>{
    setLoading(true)
    return createUserWithEmailAndPassword(auth, email, password)
    
}
// update profile
const Profile = (displayName, photoURL) => {
    setLoading(true)
    return updateProfile(auth.currentUser, {
      displayName: displayName,
      photoURL: photoURL
    });
  }


// Login user
const Login = (email, password)=>{
    setLoading(true)
    return signInWithEmailAndPassword(auth, email, password)
}

// sign out
const Signout = ()=>{
    return signOut(auth);
}

   useEffect(()=>{
    const unsubscribe =onAuthStateChanged(auth, (currentUser)=>{
        setUser(currentUser)
        // if(currentUser){
        //     const userInfo = {email : currentUser.email}
        //     axiosSecurePublic.post('/jwt', userInfo)
        //     .then(res=>{
        //         if(res.data.token){
        //             localStorage.setItem('access-token', res.data.token)
        //         }
        //     })
        // }
        // else{
        //     localStorage.removeItem('access-token')
        // }
        setLoading(false)
      return ()=> unsubscribe()
      
   })
   },[])
    const info ={
        user,
        CreateUser,
        Login,
        Signout,
        Profile,
        GoogleLogin,
        loading,
        setLoading

    }
    return (
        <Context.Provider value={info}>
            {children}
        </Context.Provider>
    );
};

export default Authprovider;