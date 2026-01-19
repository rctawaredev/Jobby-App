import './index.css'
import {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'




const Login=()=> {
    const[username,setUsername]= useState('')
    const[password,setPassword]= useState('')
    const[errorMsg,setErrorMsg]= useState('')
    const[showErrorMsg,setShowErrorMsg]= useState(false)

     const navigate = useNavigate()  


    const onSuccessLogin = (jwtToken) => {
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    navigate('/', { replace: true })
    
  }


  const onFailureLogin = (errorMsg) => {
    setErrorMsg(errorMsg)
    setShowErrorMsg(true)
  }


    const onSubmitForm=async(event)=> {
        event.preventDefault()
        const userDetails={username, password}
        
        const LoginApiUrl="https://apis.ccbp.in/login"
        const options={
            method:'POST',
            body:JSON.stringify(userDetails)
        }
        const response= await fetch(LoginApiUrl,options)
        const data= await  response.json()
        console.log(data)
        
        if(response.ok){
            onSuccessLogin(data.jwt_token)

        } else {
            onFailureLogin(data.error_msg)


        }
        console.log(data)
        
    }

    const updateUsername=(event)=> {
        setUsername(event.target.value)
    }
    const updatePass=(event)=> {
        setPassword(event.target.value)
    }

    const renderUsernameField=()=> {
        return (
            <div className="input-field-container">
                <label htmlFor="username" className="login-input-label">
                    USERNAME
                </label>
                <input
                    type="text"
                    value={username}
                    className="login-input-field"
                    placeholder="rahul"
                    id="username"
                    onChange={updateUsername}
                />
            </div>
        )
        
    }

    const renderPasswordField=()=> {
        return (
            <div className="input-field-container">
                <label htmlFor="password" className="login-input-label">
                    PASSWORD
                </label>
                <input
                    type="password"
                    value={password}
                    className="login-input-field"
                    placeholder="rahul@2021"
                    id="password"
                    onChange={updatePass}
                />
            </div>
        )
        
    }




    return (
        <div className="login-container">
            <form className="login-form" onSubmit={onSubmitForm}>
            <img 
                src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
                alt="website logo"
                className="website-logo-login-form"
            />
                {renderUsernameField()}
                {renderPasswordField()}
                <div>
                    <button type="submit" className="login-button">
                        Login
                    </button>
                </div>
                {showErrorMsg && <p className="error-msg">*{errorMsg}</p>}
            </form>

        </div>

    )
}

export default Login

