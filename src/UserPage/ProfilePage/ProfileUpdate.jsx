import React, { useState } from "react";
import axios from "axios";

export default function ProfileUpdate() {
    const [email, setEmail] = useState();

    const id = localStorage.getItem('sub');
    const name = localStorage.getItem('name');
    const surname = localStorage.getItem('family_name');

    const handleEmailUpdate = async () => {
        try {
            const response = await axios.put(
                `https://localhost:7281/api/User/update`,
                {
                        
                    email: email,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            console.log(response.data);
            alert("Email successfully updated");
        } catch (error) {
            console.error("Update error:", error.response ? error.response.data : error.message);
            alert("Error updating email");
        }
    }
    return (
        <div>
            <Input type="email" label="New Mail Address" className="mb-5" />
            <Button type="submit" onClick={handleEmailUpdate} color="blue" ripple="light" className="flex items-center gap-3 mt-4">
                <ArrowRightIcon className="w-5 h-5 -ml-2" />
                Update Address
            </Button>
        </div>
    )
}