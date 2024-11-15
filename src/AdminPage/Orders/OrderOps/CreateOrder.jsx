import React, { useState } from "react";
import {
  Card,
  Input,
  Button,
  Typography,
} from "@material-tailwind/react";
import axios from "axios";

const CreateOrder = ({ onCreate }) => {
  const [orderData, setOrderData] = useState({
    userId: "",
    cartId: "",
    productId: "",
    quantity: "",
    status: "",
    address: "",
    description: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setOrderData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://localhost:7281/api/Order/insert", orderData);
      if (response.status === 200) {
        console.log("Order created:", response.data);
        onCreate();
      } else {
        console.error("Error creating order:", response.data);
      }
    } catch (error) {
      console.error("Error creating order:", error);
    }
    console.log("Order data:", orderData);
  };

  return (
    <Card color="transparent" shadow={false} className="py-1 text-center">
      <Typography variant="h4" color="blue-gray">
        Create Order
      </Typography>
      <Typography color="gray" className="mt-1 font-normal">
        Fill out the form to create a new order.
      </Typography>
      <form onSubmit={handleSubmit} className="mt-8 mb-2 w-full max-w-md sm:w-96">
        <div className="mb-4 flex flex-col gap-6">
          <Input size="lg" label="User ID" name="userId" value={orderData.userId} onChange={handleInputChange} />
          <Input size="lg" label="Cart ID" name="cartId" value={orderData.cartId} onChange={handleInputChange} />
          <Input size="lg" label="Product ID" name="productId" value={orderData.productId} onChange={handleInputChange} />
          <Input size="lg" label="Quantity" name="quantity" value={orderData.quantity} onChange={handleInputChange} />
          <Input size="lg" label="Status" name="status" value={orderData.status} onChange={handleInputChange} />
          <Input size="lg" label="Address" name="address" value={orderData.address} onChange={handleInputChange} />
          <Input size="lg" label="Description" name="description" value={orderData.description} onChange={handleInputChange} />
        </div>
        <Button className="my-8" fullWidth type="submit" onClick={handleSubmit}>
          Create
        </Button>
      </form>
    </Card>
  );
};

export default CreateOrder;