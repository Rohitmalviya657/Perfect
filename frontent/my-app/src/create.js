import { useState } from "react";
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import * as Yup from 'yup';
import { useNavigate } from "react-router";

// ✅ Yup Validation Schema
const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    image: Yup.mixed().required('Image is required')
});

function Create() {
    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
        image: null
    });
    const navigate = useNavigate();

    const handle = (e) => {
        let { name, value, files } = e.target;
        setUser({
            ...user,
            [name]: files ? files[0] : value
        });
    };

    const submit = async (e) => {
        e.preventDefault();

        try {
            // ✅ Validate data using Yup
            await validationSchema.validate(user, { abortEarly: false });

            const formData = new FormData();
            formData.append("name", user.name);
            formData.append("email", user.email);
            formData.append("password", user.password);
            formData.append("image", user.image);

            const response = await axios.post("http://localhost:5000/user/create", formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            console.log("response is ===============>", response);
            alert("Registered successfully!");
            navigate("/login");
        } catch (error) {
            if (error.name === "ValidationError") {
                // Show all validation errors
                alert(error.errors.join("\n"));
            } else {
                console.log("Something went wrong:", error);
                alert("Registration failed.");
            }
        }
    };

    return (
        <form onSubmit={submit}>
            <div className="mb-3">
                <label className="form-label">Name</label>
                <input type="text" className="form-control" name="name" onChange={handle} />
            </div>
            <div className="mb-3">
                <label className="form-label">Email address</label>
                <input type="email" className="form-control" name="email" onChange={handle} />
            </div>
            <div className="mb-3">
                <label className="form-label">Password</label>
                <input type="password" className="form-control" name="password" onChange={handle} />
            </div>
            <div className="mb-3">
                <label className="form-label">Upload Image</label>
                <input type="file" className="form-control" name="image" onChange={handle} />
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    );
}

export default Create;
