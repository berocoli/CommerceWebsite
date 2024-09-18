import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom"; // Import ReactDOM for portals
import { Drawer, Button, Typography, IconButton, Input, Alert } from "@material-tailwind/react";
import loginIcon from "../assets/log-cabin-svgrepo-com.svg";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
    const [formFields, setFormFields] = useState({ email: '', password: '' });
    const [open, setOpen] = useState(false);
    const [loginError, setLoginError] = useState(null);
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        setFormFields({ ...formFields, [e.target.name]: e.target.value });
    };

    const loginUser = async (e) => {
        e.preventDefault();
        try {
            const loginResponse = await fetch(`https://localhost:7281/api/Auth/Login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: formFields.email, password: formFields.password }),
            });

            if (loginResponse.ok) {
                const data = await loginResponse.json();
                const token = data.token?.access;

                if (token) {
                    sessionStorage.setItem('token', token);

                    const tokenPayload = JSON.parse(atob(token.split('.')[1]));
                    const { name, email, role } = tokenPayload;

                    sessionStorage.setItem('name', name);
                    sessionStorage.setItem('email', email);
                    sessionStorage.setItem('role', role);
                    sessionStorage.setItem('isLoggedIn', 'true');

                    // Redirect based on user role
                    if (role === 'Admin') {
                        navigate('/admin');
                    } else {
                        navigate('/products');
                    }
                } else {
                    setLoginError('Failed to retrieve a valid token.');
                }
            } else {
                setLoginError('Login failed. Please try again.');
            }
        } catch (error) {
            console.error('Login error:', error);
            setLoginError('An error occurred. Please try again.');
        }
    };
    const openDrawer = () => setOpen(true);
    const closeDrawer = () => setOpen(false);

    const drawerContent = (
        <>
            <Drawer open={open} onClose={closeDrawer} className="bg-gradient-to-bl from-blue-300 to-green-400">
                <div className="flex items-center justify-between px-4 pb-2 mt-2">
                    <Typography variant="h5" color="white">
                        Log In
                    </Typography>
                    <IconButton variant="text" color="white" onClick={closeDrawer}> {/*The X that closes the drawer: */}
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={2}
                            stroke="currentColor"
                            className="h-5 w-5"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </IconButton>
                </div>
                <div className="mb-5 px-4">
                    <div className="flex items-center justify-center">
                        <img src={loginIcon} alt="log cabin" className="w-32 h-32 mx-auto" />
                    </div>
                </div>

                <form onSubmit={loginUser} className="flex flex-col gap-6 p-4">
                    <Typography variant="h6" color="white" className="-mb-3">
                        Your Email
                    </Typography>
                    <Input type="email" name="email" value={formFields.email} onChange={handleInputChange} label="Email" placeholder="youremail@mail.com" />
                    <Typography variant="h6" color="white" className="-mb-3">
                        Your Password
                    </Typography>
                    <Input type="password" name="password" value={formFields.password} onChange={handleInputChange} label="Password" placeholder="*******" />
                    <Button type="submit" onSubmit={loginUser} color="white" variant="filled" className="hover:bg-blue-gray-100">Send Message</Button>
                    {loginError && <Alert color="red">{loginError}</Alert>}
                </form>
            </Drawer >
        </>
    );

    return (
        <>
            <Button onClick={openDrawer} variant="gradient" color="blue-gray" size="sm" className="hidden lg:inline-block outline outline-gray-300 outline-1">
                Log In
            </Button>

            {/* Render drawer content using portal */}
            {ReactDOM.createPortal(drawerContent, document.body)}
        </>
    );
}
