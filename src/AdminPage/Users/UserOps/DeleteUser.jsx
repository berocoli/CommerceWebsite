import React, { useCallback } from "react";
import axios from "axios";
import { Typography, Button } from "@material-tailwind/react";

const DeleteUser = ({ userId }) => {
  const handleDelete = useCallback(async () => {
    if (!userId) return;

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
      window.location.reload();
    } catch (error) {
      console.error(
        "Deletion error:",
        error.response ? error.response.data : error.message
      );
      alert("Error deleting user");
    }
  }, [userId]);

  if (!userId) {
    return <Typography>User not found.</Typography>;
  }

  return (
    <Button
      onClick={handleDelete}
      className="w-full h-10 bg-red-500 text-white hover:bg-red-700"
    >
      Delete User
    </Button>
  );
};
export default DeleteUser;
