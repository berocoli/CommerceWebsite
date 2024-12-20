import React, { useState } from "react";
import axios from "axios";
import { StickyNavbar } from "../NavbarComp/Navbar";
import GetOrder from "./GetOrder";

export default function UserOrder() {
    const [orders, setOrders] = useState('');

    const fetchOrders = async () => {
        const response = await axios.get('')
    }

    return (
        <>
            <div className="mx-5 my-10">
                <GetOrder />
            </div>
        </>
    )
}