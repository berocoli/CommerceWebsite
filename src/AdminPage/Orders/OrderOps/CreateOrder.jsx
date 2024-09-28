import React, { useState } from 'react';
import {
  Card,
  Input,
  Button,
  Typography,
} from "@material-tailwind/react";

const CreateOrder = () => {
  const [orderData, setOrderData] = useState({
    customerName: '',
    productId: '', 
    quantity: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setOrderData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Sipariş verileri:', orderData);
  };

  return (
    <Card color="transparent" shadow={false} className="max-w-lg mx-auto mt-8">
      <Typography variant="h4" color="blue-gray" className="mb-4">
        Yeni Sipariş Oluştur
      </Typography>
      <form onSubmit={handleSubmit} className="mt-8 mb-2 w-full">
        <div className="mb-4 flex flex-col gap-6">
          <Input
            size="lg"
            label="Müşteri Adı"
            name="customerName"
            value={orderData.customerName}
            onChange={handleInputChange}
          />
          <Input
            size="lg"
            label="Ürün ID"
            name="productId"
            value={orderData.productId}
            onChange={handleInputChange}
          />
          <Input
            type="number"
            size="lg"
            label="Miktar"
            name="quantity"
            value={orderData.quantity}
            onChange={handleInputChange}
          />
        </div>
        <Button type="submit" className="mt-6" fullWidth>
          Sipariş Oluştur
        </Button>
      </form>
    </Card>
  );
};

export default CreateOrder;
