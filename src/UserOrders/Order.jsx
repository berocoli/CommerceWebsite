import React, { useState } from "react";
import axios from "axios";
import { StickyNavbar } from "../NavbarComp/Navbar";
import GetOrder from "./GetOrder";

export default function UserOrder(cart) {
    const [orders, setOrders] = useState('');

    const fetchOrders = async () => {
        const response = await axios.get('')
    }

    return (
        <>
            <StickyNavbar />

            <div className="mx-5 my-10">
                <GetOrder />
            </div>
        </>
    )
}