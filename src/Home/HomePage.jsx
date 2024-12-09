import React, { useEffect, useState } from 'react';
import { StickyNavbar } from '../NavbarComp/Navbar';
import {
    Typography,
    Card,
    CardHeader,
    CardBody,
    Avatar,
} from '@material-tailwind/react';
import ProductsHome from './ProductsHome';
import { FooterComponent } from '../Footer/FooterComponent';

function HomePage() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userName, setUserName] = useState('');
    const [userFamilyName, setUserFamilyName] = useState('');

    useEffect(() => {
        const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
        const name = localStorage.getItem('name');
        const familyName = localStorage.getItem('family_name');
        setIsLoggedIn(loggedIn);
        setUserName(name || '');
        setUserFamilyName(familyName || '');

        // Hata ayıklama için konsol logları
        console.log('Login durumu:', loggedIn);
        console.log('İsim:', name);
        console.log('Soyisim:', familyName);
    }, []);

    return (
        <>
            <StickyNavbar />

            <div className="mx-auto max-w-screen-md py-12">
                {isLoggedIn && userName && userFamilyName && (
                    <Typography variant="h4" color="blue-gray" className="mb-4">
                        Welcome to MarketWave, <span className="bg-gradient-to-br from-blue-300 to-green-500 inline-block text-transparent bg-clip-text">{userName} {userFamilyName}!</span>
                    </Typography>
                )}
            </div>
            <div>
                <ProductsHome />
            </div>
            <div className='mt-48 mr-5'>
                <FooterComponent />
            </div>
        </>
    );
}

export default HomePage;