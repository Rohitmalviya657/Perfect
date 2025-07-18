import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Userlist.css';

function UserListWithDelete() {
    const [users, setUsers] = useState([]);
    const [selectedImage, setSelectedImage] = useState({});

    useEffect(() => {
        fetchUsers();
    }, []);

    const token = localStorage.getItem("token");

    const fetchUsers = async () => {
        try {
            const res = await axios.get("http://localhost:5000/user/all", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setUsers(res.data);
        } catch (err) {
            console.error("Error fetching users", err);
            alert("Unauthorized: Please login again");
        }
    };

    const deleteUser = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/user/delete/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            fetchUsers();
        } catch (err) {
            console.error("Delete failed", err);
            alert("Failed to delete user");
        }
    };

    const handleFileChange = (e, userId) => {
        setSelectedImage({ ...selectedImage, [userId]: e.target.files[0] });
    };

    const updateImage = async (email, userId) => {
        const imageFile = selectedImage[userId];
        if (!imageFile) {
            alert("Please select an image first.");
            return;
        }

        const formData = new FormData();
        formData.append("email", email);
        formData.append("image", imageFile);

        try {
            await axios.put("http://localhost:5000/user/update-image", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${token}`
                },
            });

            alert("Image updated successfully");
            fetchUsers();
        } catch (err) {
            console.error("Image update failed:", err);
            alert("Failed to update image");
        }
    };

    return (
        <div className="container mt-5">
            <h3 className="text-center mb-4">All Users</h3>
            <div className="table-responsive">
                <table className="table table-bordered align-middle">
                    <thead className="table-light text-center">
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Image</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.length === 0 ? (
                            <tr><td colSpan="5" className="text-center">No users found</td></tr>
                        ) : (
                            users.map((user) => (
                                <tr key={user._id}>
                                    <td>{user._id}</td>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>
                                        {user.image && (
                                            <img
                                                src={`http://localhost:5000/my-uploads/${user.image}`}
                                                alt="User"
                                                className="img-fluid mb-2"
                                                style={{ width: "80px", height: "80px", objectFit: "cover" }}
                                            />
                                        )}
                                        <input
                                            type="file"
                                            className="form-control mb-1"
                                            onChange={(e) => handleFileChange(e, user._id)}
                                        />
                                        <button
                                            className="btn btn-sm btn-primary w-100"
                                            onClick={() => updateImage(user.email, user._id)}
                                        >
                                            Update Image
                                        </button>
                                    </td>
                                    <td className="text-center">
                                        <button
                                            className="btn btn-sm btn-danger"
                                            onClick={() => deleteUser(user._id)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default UserListWithDelete;
