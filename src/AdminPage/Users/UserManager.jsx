import React, { useState, useEffect } from "react";
import UpdateUsers from "./UserOps/UpdateUsers";
import {
    Card,
    CardHeader,
    CardBody,
    Typography,
    Button,
} from "@material-tailwind/react";
import axios from "axios";

export default function UserManager() {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await axios.get("https://localhost:7281/api/User/list");
            setUsers(response.data);
            console.log(response.data);
        } catch (error) {
            console.error("Kullanıcıları getirme hatası:", error);
        }
    };
    const handleUserSelect = (user) => {
        setSelectedUser(user);
    };

    return (
        <div className="bg-gray-100 rounded-xl shadow-sm">
            <div className="container mx-auto px-4 py-8">
                <Typography variant="h2" color="blue-gray" className="text-center mb-4 pb-8">
                    User Management
                </Typography>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <Card>
                        <CardHeader color="blue" className="p-5">
                            <Typography variant="h5" color="white" className="text-center">
                                User List
                            </Typography>
                        </CardHeader>
                        <CardBody>
                            {users.map((user) => (
                                <Button
                                    key={user.id}
                                    color={selectedUser?.id === user.id ? "blue" : "gray"}
                                    className="mb-2 w-full justify-start"
                                    onClick={() => handleUserSelect(user)}
                                >
                                    {user.name} {user.surname}
                                </Button>
                            ))}
                        </CardBody>
                    </Card>
                    <Card>
                        <CardHeader color="blue" className="p-5">
                            <Typography variant="h5" color="white" className="text-center">
                                Update User
                            </Typography>
                        </CardHeader>
                        <CardBody>
                            {selectedUser ? (
                                <UpdateUsers user={selectedUser} onUpdate={fetchUsers} />
                            ) : (
                                <Typography>Please select a user to update.</Typography>
                            )}
                        </CardBody>
                    </Card>
                </div>
            </div>
        </div>
    );
}

