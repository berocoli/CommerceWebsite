import React from "react";
import { Button, Typography } from "@material-tailwind/react";
import FileSaver from "file-saver";
import axios from "axios";

export default function GetUsers() {
    const fetchUsers = async () => {
        try {
            const response = await axios.get("https://localhost:7281/api/User/PDF", {
                responseType: 'blob',
            });
            if (response.status === 200 && response.data) {
                const pdfBlob = new Blob([response.data], { type: 'application/pdf' });
                FileSaver.saveAs(pdfBlob, 'Users.pdf');
            } else {
                console.error('Error fetching data:', error);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    return (
        <div className="flex flex-col items-center justify-center">
            <Button color="blue" ripple="light" className="" onClick={fetchUsers}>
                Download PDF File
            </Button>
        </div>
    );
}