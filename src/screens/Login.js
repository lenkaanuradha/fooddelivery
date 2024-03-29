import React,{useState} from 'react'
import { Link, useNavigate } from 'react-router-dom';

export default function Login() {
  const [credentials, setcredentials] = useState({
    
    email: "",
    password: "",
   
  });
  let navigate=useNavigate();
  const handlesubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/loginuser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
       
        email: credentials.email,
        password: credentials.password,
      
      })
    });
    const json = await response.json();
    console.log(json);
    if (!json.success) {
      alert("Enter valid credentials");
    }
    if(json.success){
      localStorage.setItem("useremail",credentials.email)
      
      localStorage.setItem("authToken",json.authToken);
      console.log(localStorage.getItem("authToken"));
      navigate("/");
    }
  };
  const onChange = async (event) => {
    setcredentials({ ...credentials, [event.target.name]: event.target.value });
  };
  return (
    <div>
     <div className="container">
        <form onSubmit={handlesubmit}>
          
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              name="email"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              value={credentials.email}
              onChange={onChange}
            />
            <div id="emailHelp" className="form-text">
              We'll never share your email with anyone else.
            </div>
          </div>
          
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              name="password"
              id="exampleInputPassword1"
              value={credentials.password}
              onChange={onChange}
            />
          </div>
          <button type="submit" className="m-3 btn btn-success">
            Submit
          </button>
          <Link to="/creatuser" className="m-3 btn btn-danger">
           I'm a new user
          </Link>
        </form>
      </div>
    </div>
  )
}
