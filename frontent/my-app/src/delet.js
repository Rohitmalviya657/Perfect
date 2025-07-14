import React, { useEffect, useState } from 'react';
import axios from 'axios';

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
                    Authorization: `Bearer ${token}` // Send token in header
                }
            });

            console.log(res);
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
            <h3>All Users</h3>
            <table className="table table-bordered mt-3">
                <thead>
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
                        <tr><td colSpan="5">No users found</td></tr>
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
                                            width="100"
                                            height="100"
                                        />


                                    )}
                                    <input
                                        type="file"
                                        onChange={(e) => handleFileChange(e, user._id)}
                                    />
                                    <button
                                        className="btn btn-sm btn-primary mt-1"
                                        onClick={() => updateImage(user.email, user._id)}
                                    >
                                        Update Image
                                    </button>
                                </td>
                                <td>
                                    <button
                                        className="btn btn-danger"
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
    );
}

export default UserListWithDelete;
