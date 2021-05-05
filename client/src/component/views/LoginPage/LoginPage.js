import React,{useState} from 'react';
import {useDispatch} from 'react-redux';
import {loginUser} from  '../../../_actions/user_action'

function LoginPage() {
  const dispatch = useDispatch();

  //use state
  const [Email, setEmail] = useState("")
  const [Password, setPassword] = useState("")

  //event Handler
  const onEmailHandler = (event) =>{
    setEmail(event.currentTarget.value);
  }
  const onPasswordHandler = (event) =>{
    setPassword(event.currentTarget.value);
  }
  const onSubmitHandler = (event) =>{
    //page reload 막기위해서
    event.preventDefault();

    let body = {
      email: Email,
      password: Password
    }
    dispatch(loginUser(body))

  }

  return (
    <div style={{display:'flex', justifyContent:'center',alignItems:'center',width:'100%',height:'100vh'}}>

      <form action="" style={{display:'flex',flexDirection:'column'}} onSubmit={onSubmitHandler}>
        <label htmlFor="">Email</label>
        <input type="email" value={Email} onChange={onEmailHandler} />
        <label htmlFor="">password</label>
        <input type="password" value={Password} onChange={onPasswordHandler} />
        <br />
        <button type="submit">
          Login
        </button>
      </form>
    </div>
  )
}

export default LoginPage
