import React, { useState } from 'react'
import styles from "./login.module.scss"
import { Navigate, useNavigate } from 'react-router-dom';


export default function LoginPage() {

    const [userDetails, setUserDetails] = useState<any>({
        email : '',
        password: ''
        });
    const [emailError, setEmailError] = useState<any>(false);
    const [passwordError, setpasswordError] = useState<any>(false);
    const navigate = useNavigate();
    const saveEmail: any =(e: any) =>{
        setEmailError(false)
        setpasswordError(false)
        setUserDetails({...userDetails,  email: e.target.value})
    }
 
    const savePassword: any =(e: any) =>{
        setpasswordError(false)
        setEmailError(false)
        setUserDetails({...userDetails,  password: e.target.value})
    }

    const doSubmit = ()=>{
        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        if(userDetails?.email !== '' && userDetails?.password !== ''){
            const isValidEmail = emailPattern.test(userDetails?.email);
            if(isValidEmail){
                navigate('/home')
            } else{
                setEmailError(true)
            }
        } else{
            setEmailError(true);
            setpasswordError(true)
        }
    }
    return (
        <div className={styles.loginPage}>
            <div className={styles.loginBox}>
                <p className={styles.loginTitle}>Login Page</p>
                <div className={styles.formRow}>
                    <label>Email</label>
                    <input id="email" name="email" type="email" autoComplete="email" required className="" onChange={saveEmail}/>
                    {emailError && <span className={styles.inputErr}>Please enter valid email</span>}
                </div>
                <div className={styles.formRow}>
                    <label>Password</label>
                    <input id="password" name="password" type="password" autoComplete="password" required className="" onChange={savePassword}/>
                    {passwordError && <span className={styles.inputErr}>Please enter valid password</span>}
                </div>
                <button type="submit" className={styles.loginBtn} onClick={doSubmit}>Sign in</button>
            </div>

        </div>
    )
}
