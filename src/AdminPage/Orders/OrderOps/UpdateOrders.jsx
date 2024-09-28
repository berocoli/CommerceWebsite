import React, { useState, useEffect, useCallback } from "react";
import {
  Card,
  Input,
  Button,
  Typography,
} from "@material-tailwind/react";
import axios from "axios";

const UpdateOrders = ({ order, onUpdate }) => {
  const [orderData, setOrderData] = useState({
    id: "",
    address: "",
    description: "",
    status: "",
  });

  useEffect(() => {
    if (order) {
      setOrderData({
        id: order.id || "",
        address: order.address || "",
        description: order.description || "",
        status: order.status || "",
      });
    }
  }, [order]);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setOrderData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  }, []);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put("https://localhost:7281/api/Order/Update", orderData);
      console.log("Sipariş güncellendi:", response.data);
      onUpdate();
    } catch (error) {
      console.error("Güncelleme hatası:", error);
    }
  }, [orderData, onUpdate]);

  return (
    <Card color="transparent" shadow={false}>
      <Typography variant="h4" color="blue-gray">
        Sipariş Güncelle
      </Typography>
      <Typography color="gray" className="mt-1 font-normal">
        Sipariş bilgilerini güncellemek için formu doldurun.
      </Typography>
      <form onSubmit={handleSubmit} className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
        <div className="mb-4 flex flex-col gap-6">
          <Input size="lg" label="ID" name="id" value={orderData.id} onChange={handleChange} />
          <Input size="lg" label="Adres" name="address" value={orderData.address} onChange={handleChange} />
          <Input size="lg" label="Açıklama" name="description" value={orderData.description} onChange={handleChange} />
          <Input size="lg" label="Durum" name="status" value={orderData.status} onChange={handleChange} />
        </div>
        <Button className="mt-6" fullWidth type="submit" onClick={handleSubmit}>
          Güncelle
        </Button>
      </form>
    </Card>
  );
}

export default UpdateOrders;

