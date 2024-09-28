import React, { useState, useEffect } from "react";
import { Typography, Button, Card, CardBody, CardFooter } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { StickyNavbar } from "../NavbarComp/Navbar";
import UserManager from "./Users/UserManager";
import ProductManager from "./Products/ProductManager";
import OrderManager from "./Orders/OrderManager";



export default function AdminPage() {
  const [adminData, setAdminData] = useState(null);
  const [activeComponent, setActiveComponent] = useState('dashboard');
  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const userRole = localStorage.getItem('role');

    if (!isLoggedIn || userRole !== 'True') {
      navigate('/');
    } else {
      const name = localStorage.getItem('name');
      const surname = localStorage.getItem('family_name');
      const email = localStorage.getItem('email');
      setAdminData({ name, surname, email });
    }
  }, []);

  const renderComponent = () => {
    switch (activeComponent) {
      case 'users':
        return <UserManager />;
      case 'products':
        return <ProductManager />;
      case 'orders':
        return <OrderManager />;
      case 'dashboard':
      default:
        return (
          <Card className="w-96 mx-auto">
            <CardBody>
              <Typography variant="h5" className="mb-2">
                Welcome, {adminData?.name}
              </Typography>
              <Typography>
                Email: {adminData?.email}
              </Typography>
            </CardBody>
            <CardFooter className="pt-0">
              <Button
                onClick={() => navigate('/')}
                fullWidth
                className="hover:bg-deep-orange-900"
              >
                Logout
              </Button>
            </CardFooter>
          </Card>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-200 to-gray-700">
      <div className='mx-5 my-6'>
        <StickyNavbar />
      </div>
      <div className="container mx-auto px-4 py-8">
        <Typography variant="h2" className="text-center mb-6">
          Admin Panel
        </Typography>

        <div className="flex justify-center mb-6">
          <Button
            color={activeComponent === 'dashboard' ? 'blue' : 'gray'}
            onClick={() => setActiveComponent('dashboard')}
            className="mr-4"
          >
            Dashboard
          </Button>
          <Button
            color={activeComponent === 'users' ? 'blue' : 'gray'}
            onClick={() => setActiveComponent('users')}
            className="mr-4"
          >
            User Management
          </Button>
          <Button
            color={activeComponent === 'products' ? 'blue' : 'gray'}
            onClick={() => setActiveComponent('products')}
            className="mr-4"
          >
            Product Management
          </Button>
          <Button
            color={activeComponent === 'orders' ? 'blue' : 'gray'}
            onClick={() => setActiveComponent('orders')}
            className="mr-4"
          >
            Order Management
          </Button>
        </div>

        {renderComponent()}
      </div>
    </div>
  );
}
