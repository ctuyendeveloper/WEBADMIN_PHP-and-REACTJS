import React, { useState } from "react";
import AxiosInstance from "../helper/AxiosInstance";


const Login = (props) => {
    const { saveUser } = props;
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const login = async () => {
        try {
            const body = {email, password}
            const result = await AxiosInstance().post('/login.php', body)
            console.log(result);
            if(result.status)
            {
              saveUser(result.user);
            }
            else
            {
              alert('Dang nhap that bai');
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <form>
        <div classNameName="mb-3 mt-3"> 
          <label for="email" className="form-label">Email:</label>
          <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" className="form-control" placeholder="Enter email" name="email"/>
        </div>
        <div className="mb-3">
          <label for="pwd" className="form-label">Password:</label>
          <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" className="form-control" placeholder="Enter password" name="pswd"/>
        </div>
        <button onClick={login} type="button" className="btn btn-primary">Submit</button>
      </form>
    )
}

export default Login;