import React, { useEffect, useState } from 'react';
import { StickyNavbar } from '../NavbarComp/Navbar';
import { Typography } from '@material-tailwind/react';

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
            <div className='mx-5 my-6'>
                <StickyNavbar />
            </div>
            <div className="mx-auto max-w-screen-md py-12">
                {isLoggedIn && userName && userFamilyName && (
                    <Typography variant="h4" color="blue-gray" className="mb-4">
                        Hoş geldiniz, {userName} {userFamilyName}!
                    </Typography>
                )}
                <Typography variant="h2" color="blue-gray" className="mb-2">
                    What is <span className="bg-gradient-to-br from-blue-300 to-green-500 inline-block text-transparent bg-clip-text">MarketWave?</span>
                </Typography>
                <Typography color="gray" className="font-normal">
                    MarketWave is a dynamic e-commerce platform designed to offer a seamless shopping experience across a wide range of products,
                    from electronics and fashion to home essentials and lifestyle goods. With an intuitive interface and responsive design,
                    users can easily browse through categories, search for specific items, and take advantage of personalized recommendations.
                    MarketWave integrates secure payment gateways, ensuring that transactions are safe and reliable.
                    The website also features user-friendly tools for tracking orders, leaving reviews, and managing accounts.
                    With a focus on convenience, customer satisfaction, and an ever-expanding product selection,
                    MarketWave aims to be a go-to destination for modern online shoppers.
                </Typography>
            </div>
        </>
    );
}

export default HomePage;