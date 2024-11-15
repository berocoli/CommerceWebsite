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
    userId: "",
    cartId: "",
    address: "",
    description: "",
    status: "",
  });

  useEffect(() => {
    if (order) {
      setOrderData({
        id: order.id || "",
        userId: order.userId || "",
        cartId: order.cartId || "",
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
    <Card color="transparent" shadow={false} className="py-1 text-center">
      <Typography variant="h4" color="blue-gray">
        Update Order
      </Typography>
      <Typography color="gray" className="mt-1 font-normal">
        Fill out the form to update order information.
      </Typography>
      <form onSubmit={handleSubmit} className="mt-8 mb-2 w-full max-w-md sm:w-96">
        <div className="mb-4 flex flex-col gap-6">
          <Input size="lg" label="ID" name="id" value={orderData.id} readOnly onChange={handleChange} />
          <Input size="lg" label="User ID" name="userId" value={orderData.userId} readOnly onChange={handleChange} />
          <Input size="lg" label="Cart ID" name="cartId" value={orderData.cartId} readOnly onChange={handleChange} />
          <Input size="lg" label="Address" name="address" value={orderData.address} onChange={handleChange} />
          <Input size="lg" label="Description" name="description" value={orderData.description} onChange={handleChange} />
          <Input size="lg" label="Status" name="status" value={orderData.status} onChange={handleChange} />
        </div>
        <Button className="my-8" fullWidth type="submit" onClick={handleSubmit}>
          Update
        </Button>
      </form>
    </Card>
  );
}

export default UpdateOrders;

