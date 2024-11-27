// Cart.jsx
import React from "react";
import { Dialog } from "@material-tailwind/react";
import GetCarts from "./GetCarts";

export default function Cart({ open, onClose }) {
    return (
        <div>
            <Dialog
                size="xl"
                open={open}
                handler={onClose}
                className="bg-transparent shadow-none"
            >
                <GetCarts onClose={onClose} />
            </Dialog>
        </div>
    );
}
