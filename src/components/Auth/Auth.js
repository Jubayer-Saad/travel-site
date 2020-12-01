import React, { useContext, useState } from 'react';
import "./Auth.css"
import Header from '../Header/Header'
import fb from '../../images/icon/fb.png'
import google from '../../images/icon/google.png'
import firebase from "firebase/app";
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router-dom';
import { FormGroup, Button } from 'react-bootstrap';

const Auth = () => {

    const [showArea, setShowArea, loggedIn, setLoggedIn, name, setName]=useContext(UserContext)

    const [confirmationError, setConfirmationError]=useState(false)
    const [isSignedUp, setisSignedUp]=useState(false)
    const [submiter, setSubmiter]=useState("")
    const [user, setUser]=useState({})
    const location=useLocation().location?.pathname
    const history=useHistory()
    const [verified, setVerified]=useState("null")
    const [verifyMessage, setVerifyMessage]=useState(false)


    const formHandler=(event)=>{

        event.preventDefault()
//Signup with email and password
            if(submiter === "signup") {
                user.password==user.confirmationPassword ?
                firebase.auth().createUserWithEmailAndPassword(user.email,user.password)
                .then(res=>{
                    setConfirmationError(false)
                    setUser({...user, signupError:""})
                    setisSignedUp(true)
                    setVerifyMessage(true)
                    const currentUser = firebase.auth().currentUser;
                    currentUser.updateProfile({
                    displayName: `${user.fname} ${user.lname}`
                    })
                    currentUser.sendEmailVerification()

                })
                .catch(err=>{
                    setUser({...user, signupError:err.message})
                })
                : setConfirmationError(true)
            }


// Sign in with email and password


        if(submiter == "signin"){
            setVerifyMessage(false)
            setUser({...user, signinError:""})
                    firebase.auth().signInWithEmailAndPassword(user.email,user.password)
                    .then(res=>{
                        const currentUser = firebase.auth().currentUser;
                        setName(currentUser.displayName)
                        if(currentUser.emailVerified){
                            setLoggedIn(true)
                            history.replace(location || "/" )
                        }else{
                            currentUser.sendEmailVerification()
                            setVerified("false")
                        }

                    })
                    .catch(err=>{
                        setUser({...user, signinError:err.message})
                    })

             }     
    }

//Facebook signin handle

    const facebookSigninHandler =()=>{
        const provider = new firebase.auth.FacebookAuthProvider();
        firebase.auth().signInWithPopup(provider)
        .then(res=>{
            const currentUser = firebase.auth().currentUser;
            setName(currentUser.displayName)
            setLoggedIn(true)
            history.replace(location || '/')
        })
        .catch(err=>{
            setUser({...user, signinError:err.message})
        })
    }

// Google sign in handle
    const googleSigninHandler =()=>{
        const provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider)
        .then(res=>{
            const currentUser = firebase.auth().currentUser;
            setName(currentUser.displayName)
            setLoggedIn(true)
            history.replace(location || '/')
        })
        .catch(err=>{
            setUser({...user, signinError:err.message})
        })
    }


//signup and login toogler button
    const loginToggleHandler=()=>{
        setisSignedUp(true)
        setConfirmationError(false) 
        setUser({...user, signupError:""})
    }

    const signupToggleHandler=()=>{
        setisSignedUp(false)
        setUser({...user, signinError:""})
    }

    //Password reset
    const sendVerification=(email)=>{
        firebase.auth().sendPasswordResetEmail(email)
    }

// Returned section of Auth
    return (
        <div>  
            <Header />

            <form onSubmit={formHandler}
            className="form-group auth-form"> 

                {
                        verifyMessage && 
                            // <h5 className="mail-sent">
                                alert('Verification mail sent !')
                            // </h5>
                    }

                <FormGroup>
                    {
                        isSignedUp? <h2 className="mb-4" style={{textAlign:"left"}}>Login</h2>
                        : <h2 className="mb-4" style={{textAlign:"left"}}>Create an account</h2>
                    }

                    {
                        !isSignedUp && <>
                            <input className="form-control mb-3" onBlur={(event)=>setUser({...user,fname:event.target.value})}
                                type="text" placeholder="First name" required/>
                            <input className="form-control mb-3" onBlur={(event)=>setUser({...user,lname:event.target.value})}
                                type="text" placeholder="Last name" required/>
                        </> 
                    }

                    <input className="form-control mb-3" onBlur={(event)=>setUser({...user,email:event.target.value})}
                        type="email" placeholder="Email address" required/>

                    <input className="form-control mb-3" onBlur={(event)=>setUser({...user,password:event.target.value})}
                        type="password" placeholder="Password" required/>
                    {
                        !isSignedUp && 
                            <input className="form-control mb-3" onBlur={(event)=>setUser({...user,confirmationPassword:event.target.value})}
                                type="password" placeholder="Confirm Password" required/>
                    }

                    {
                        isSignedUp && 
                            <div style={{display:"flex", justifyContent:"space-between", fontSize:"13px", fontWeight:"500"}}>
                                <div style={{display:"flex", alignItems:"center"}}>     
                                    <input className="mr-2" id="checkbox" type="Checkbox" />
                                    <label htmlFor="checkbox" style={{marginBottom:"6px"}}>
                                        Remember me
                                    </label>
                                </div>
                                <p onClick={ ()=>user.email && sendVerification(user.email)} style={{color:"blue", cursor:"pointer"}}>Forgot Password</p>
                            </div>
                    }

                    {
                        user.signinError ?
                            <p style={{color:"red", fontSize:"13px"}}>
                                {user.signinError}
                            </p>
                        : ""
                    }
                    {
                         verified &&
                         verified==="false" &&
                            <p style={{color:"red", fontSize:"13px"}}>
                                Email Not verified ! Please check your mail.
                            </p>

                    }
                    {
                         user.signupError ?
                            <p style={{color:"red", fontSize:"13px"}}>
                                {user.signupError}
                            </p>
                         : ""
                    }

                    {
                        confirmationError ?
                            <p style={{color:"red", fontSize:"13px"}}>
                                Doesn't match your password
                            </p>
                        : ""
                    }
                    {
                        isSignedUp ? <Button variant="warning" className="form-control signLogBtn" name="signin" onClick={(event)=>setSubmiter(event.target.name)} type="submit" value="Signin"> Login</Button>
                        : <Button variant="warning" className="form-control signLogBtn" name="signup" onClick={(event)=>setSubmiter(event.target.name)} type="submit" value="Signup">Create an account </Button>
                    }
                </FormGroup>
                    {
                        isSignedUp ?
                            <>
                                <span>Don't have an account? </span>
                                <span onClick={signupToggleHandler} 
                                    style={{color:"blue",cursor:"pointer"}}>
                                        Signup
                                </span>
                            </>

                        :<>
                            <span>Already have an account? </span>
                            <span onClick={loginToggleHandler} 
                                style={{color:"blue",cursor:"pointer"}}>
                                    Login
                            </span>
                        </>

                    } 
            </form>


        { /* ----- OutSide of Form ------ */ }
           <div style={{width:"300px", margin:"auto"}}>
                <p style={{textAlign:"center"}}>
                    ---------- Or -----------
                </p>

                <div onClick={facebookSigninHandler}
                        style={{cursor:"pointer"}} 
                        className="auth-provider">
                    <img style={{width:"30px", height:"30px", marginRight:"10px"}} src={fb} alt=""/>
                    <p>
                        Continue with Facebook
                    </p>
                </div>
                <div onClick={googleSigninHandler} 
                        style={{cursor:"pointer"}} 
                        className="auth-provider">
                    <img style={{width:"30px", height:"30px", marginRight:"10px"}} src={google} alt=""/>
                    <p>
                        Continue with Google
                    </p>
                </div>

            </div>
        </div>
    );
 }

export default Auth;

