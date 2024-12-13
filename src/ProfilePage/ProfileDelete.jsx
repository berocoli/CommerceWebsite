import React  from "react";
import axios from "axios";
import { Button } from "@material-tailwind/react";
import { TrashIcon } from "@heroicons/react/20/solid";

export default function DeleteProfile () {
    const [userId, setUserId] = React.useState(localStorage.getItem("sub"));
    const handleDelete = async () => {
        try {
            const response = await axios.delete(
                `https://localhost:7281/api/User/byId`,
                {
                    data: { id: userId },
                    headers: { "Content-Type": "application/json" },
                }
            );
            console.log(response.data);
            alert("User successfully deleted");
            localStorage.clear();
            window.location.reload();
        } catch (error) {
            console.error(
                "Deletion error:",
                error.response ? error.response.data : error.message
            );
            alert("Error deleting user");
        }
    }

    return (
        <Button color="red" ripple="light" onClick={handleDelete} className="flex items-center gap-3">
            <TrashIcon className="w-5 h-5 -ml-2" />
            Delete Account
        </Button>
    );
}