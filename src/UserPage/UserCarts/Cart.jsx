// Cart.jsx
import React from "react";
import { Dialog } from "@material-tailwind/react";
import GetCarts from "./GetCarts";

export default function Cart({ open, onClose, onCartCountChange }) {
    return (
        <div>
            <style>
                {`
        /* Hide scrollbar for Chrome, Safari, and Opera */
        .scrollbar-hide::-webkit-scrollbar {
            display: none;
        }
        /* Hide scrollbar for IE, Edge, and Firefox */
        .scrollbar-hide {
            -ms-overflow-style: none;  /* IE and Edge */
            scrollbar-width: none;  /* Firefox */
        }
        `}
            </style>

            <Dialog
                size="xl"
                open={open}
                handler={onClose}
                className="bg-transparent shadow-none flex items-center justify-center"
            >
                <div className="max-h-[80vh] w-full overflow-y-auto scrollbar-hide">
                    {/* Pass onCartCountChange to GetCarts */}
                    <GetCarts onClose={onClose} onCartCountChange={onCartCountChange} />
                </div>
            </Dialog>
        </div>
    );
}
