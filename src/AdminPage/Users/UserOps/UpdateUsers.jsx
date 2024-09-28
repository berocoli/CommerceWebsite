import React, { useState, useEffect, useCallback } from "react";
import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import axios from "axios";
import DeleteUser from "./DeleteUser";

const UpdateUsers = ({ user, onUpdate }) => {
  const [userData, setUserData] = useState({
    id: "",
    name: "",
    surname: "",
    email: "",
    password: "",
    role: false,
  });

  useEffect(() => {
    if (user) {
      setUserData({
        id: user.id || "",
        name: user.name || "",
        surname: user.surname || "",
        email: user.email || "",
        password: "",
        role: user.role || false,
      });
    }
  }, [user]);

  const handleChange = useCallback((e) => {
    const { name, value, type, checked } = e.target;
    setUserData(prevData => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  }, []);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put("https://localhost:7281/api/User/update", userData);
      console.log("Kullanıcı güncellendi:", response.data);
      onUpdate();
    } catch (error) {
      console.error("Güncelleme hatası:", error);
    }
  }, [userData, onUpdate]);

  return (
    <>
    <Card color="transparent" shadow={false}>
      <Typography variant="h4" color="blue-gray">
        Users
      </Typography>
      <Typography color="gray" className="mt-1 font-normal">
        Fill out the form to update user information.
      </Typography>
      <form onSubmit={handleSubmit} className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
        <div className="mb-4 flex flex-col gap-6">
          <Input size="lg" label="ID" name="id" value={userData.id} onChange={handleChange} disabled />
          <Input size="lg" label="Name" name="name" value={userData.name} onChange={handleChange} />
          <Input size="lg" label="Last Name" name="surname" value={userData.surname} onChange={handleChange} />
          <Input size="lg" label="E-Mail" name="email" value={userData.email} onChange={handleChange} />
          <Input type="password" size="lg" label="Şifre" name="password" value={userData.password} onChange={handleChange} />
          <Checkbox
            label="Administrator"
            name="role"
            checked={userData.role}
            onChange={handleChange}
          />
        </div>
        <Button className="mt-6" fullWidth type="submit" onClick={handleSubmit}>
          Update
        </Button>
      </form>
      <DeleteUser userId={userData.id} />
    </Card>
    </>
  );
}
export default UpdateUsers;
