import React from "react";
import { useState, useEffect } from "react";
import { Typography, Button, Card, CardBody, CardFooter } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { StickyNavbar } from "../NavbarComp/Navbar";

export default function AdminPage() {
  const [adminData, setAdminData] = useState(null);
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
  }, [navigate]);

  const handleLogout = () => {
    sessionStorage.clear();
    localStorage.clear('isLoggedIn', 'role', 'name', 'family_name', 'email');
    navigate('/');
  };

  return (
    <>
    <div className='mx-5 my-6'>
                <StickyNavbar />
            </div>
    <div className="container mx-auto px-4 py-8">
      <Typography variant="h2" className="text-center mb-6">
        Yönetici Sayfası
      </Typography>
      
      {adminData && (
        <Card className="w-96 mx-auto">
          <CardBody>
            <Typography variant="h5" className="mb-2">
              Hoş geldiniz, {adminData.name}
            </Typography>
            <Typography>
              E-posta: {adminData.email}
            </Typography>
          </CardBody>
          <CardFooter className="pt-0">
            <Button onClick={handleLogout} fullWidth>
              Çıkış Yap
            </Button>
          </CardFooter>
        </Card>
      )}
      
      {/* Buraya diğer admin işlevlerini ekleyebilirsiniz */}
    </div>
    </>
  );
}
