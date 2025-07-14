import axios, { formToJSON } from "axios"
import { useState } from "react"
import { useNavigate } from "react-router"
function Login() {
    const [user, setUser] = useState({
        email: "",
        password: ""
    })
    const navigate = useNavigate();
    const handle = (e) => {
        let { name, value } = e.target
        setUser({
            ...user,
            [name]: value
        })
    }

    const submit = async (e) => {


        e.preventDefault();
        try {

            const response = await axios.post("http://localhost:5000/user/login", user)
            alert("login succes")
            localStorage.setItem("token", response.data.token);
            navigate("/updatedelete")

        } catch (error) {
            console.log("something went rong");


        }
    }
    return (
        <>
            <form onSubmit={submit}>
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Email address</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name="email" onChange={handle} />
                    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <input type="password" className="form-control" id="exampleInputPassword1" name="password" onChange={handle} />
                </div>
                <div className="form-group form-check">
                    <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                    <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>

        </>
    )
}
export default Login;