import { useState } from "react";
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';

function UpdateImageByEmail() {
    const [user, setUser] = useState({
        email: "",
        image: null
    });

    const [preview, setPreview] = useState(null);

    // 👇 Easy handle function
    const handle = (e) => {
        const { name, value, files } = e.target;

        setUser(prev => ({
            ...prev,
            [name]: files ? files[0] : value
        }));

        if (files) {
            setPreview(URL.createObjectURL(files[0]));
        }
    };

    // 👇 Submit image + email to backend
    const submit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("email", user.email);
        formData.append("image", user.image);

        try {
            const response = await axios.put("http://localhost:5000/user/update-image", formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            console.log("response is ===============>", response.data);
            alert("Image updated successfully!");
        } catch (error) {
            console.error("Something went wrong", error);
            alert("Update failed!");
        }
    };

    return (
        <div className="container mt-5">
            <h2>Update Image by Email</h2>
            <form onSubmit={submit}>

                <div className="mb-3">
                    <label className="form-label">Email address</label>
                    <input
                        type="email"
                        className="form-control"
                        name="email"
                        value={user.email}
                        onChange={handle}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Upload Image</label>
                    <input
                        type="file"
                        className="form-control"
                        name="image"
                        accept="image/*"
                        onChange={handle}
                        required
                    />
                </div>

                {preview && (
                    <div className="mb-3">
                        <img src={preview} alt="Preview" width={120} height={120} style={{ borderRadius: "10px" }} />
                    </div>
                )}

                <button type="submit" className="btn btn-primary">Update Image</button>
            </form>
        </div>
    );
}

export default UpdateImageByEmail;
