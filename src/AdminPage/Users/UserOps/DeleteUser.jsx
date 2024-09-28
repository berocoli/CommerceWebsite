import React, { useCallback } from "react";
import axios from "axios";
import { 
    Typography,
    Button 
} from "@material-tailwind/react";

const DeleteUser = ({ userId }) => {  // Destructuring ile prop'u alıyoruz
    const handleDelete = useCallback(async () => {
        if (!userId) return;

        try {
            const response = await axios.delete(`https://localhost:7281/api/User/byId`, {
                data: { id: userId },  // data içinde id'yi gönderiyoruz
                headers: { 'Content-Type': 'application/json' }
            });
            console.log(response.data);
            alert("Kullanıcı başarıyla silindi", window.location.reload());
            // Kullanıcı silindikten sonra gerekli işlemleri yapın (örneğin, state'i güncelleyin veya sayfayı yenileyin)
        } catch(error) {
            console.error("Silme hatası:", error.response ? error.response.data : error.message);
            alert("Kullanıcı silme hatası");
        }
    }, [userId]);  // userId'yi dependency array'e ekliyoruz

    if (!userId) {
        return <Typography>Kullanıcı bulunamadı.</Typography>;
    }

    return (
        <div>
            <Button onClick={handleDelete} className="bg-red-500 text-white text-center mx-auto block mt-4 w-full hover:bg-red-700 hover:text-white">
                Kullanıcıyı Sil
            </Button>
        </div>
    );
}
export default DeleteUser;
