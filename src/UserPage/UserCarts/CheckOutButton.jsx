import React, { useState } from "react";
import { Dialog, DialogHeader, DialogBody, DialogFooter } from "@material-tailwind/react"; 
import OrderForm from "./OrderForm";
import axios from "axios";

const CheckOutButton = ({ subtotal, shipping, userId, cartId }) => {
  const [open, setOpen] = useState(false);

  console.log('[CheckOutButton] Received userId:', userId, 'and cartId:', cartId);

  const calculateTotal = () => {
    return (parseFloat(subtotal) + shipping).toFixed(2);
  };

  const handleDialogOpen = () => {
    console.log('[CheckOutButton] Opening checkout dialog');
    setOpen(true);
  };

  const handleDialogClose = () => {
    console.log('[CheckOutButton] Closing checkout dialog');
    setOpen(false);
  };

  return (
    <>
      <div className="flex justify-between">
        <p className="text-lg font-bold">Total</p>
        <div>
          <p className="mb-1 text-lg font-bold">{`${calculateTotal()} USD`}</p>
          <p className="text-sm text-gray-700">including VAT</p>
        </div>
      </div>
      <button
        className="mt-6 w-full rounded-md bg-blue-500 py-1.5 font-medium text-white hover:bg-blue-600"
        onClick={handleDialogOpen}
      >
        Check out
      </button>

      <Dialog
        open={open}
        handler={handleDialogClose}
        className="rounded-xl"
        size="sm"
      >
        <DialogHeader>Your order details:</DialogHeader>
        <DialogBody>
          <OrderForm
            userId={userId}
            cartId={cartId}
            onClose={handleDialogClose}
          />
        </DialogBody>
        <DialogFooter>
        </DialogFooter>
      </Dialog>
    </>
  );
};

export default CheckOutButton;
