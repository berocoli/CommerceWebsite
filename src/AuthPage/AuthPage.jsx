import React, { useState, useEffect } from "react";
import { Dialog, Card, CardBody, CardFooter, Button, Typography, Input, Alert } from "@material-tailwind/react";
import loginIcon from "../assets/log-cabin-svgrepo-com.svg";
import { useNavigate } from 'react-router-dom';

// JWT decode function
function parseJwt(token) {
    try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        return JSON.parse(jsonPayload);
    } catch (error) {
        console.error('Token parsing error:', error);
        return {};
    }
}

export default function AuthPage() {
    const [isLogin, setIsLogin] = useState(true);
    const [open, setOpen] = useState(false);
    const [formFields, setFormFields] = useState({ name: '', surname: '', eMail: '', password: '' });
    const [authError, setAuthError] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
        setIsLoggedIn(loggedIn);
    }, []);

    const handleOpen = () => setOpen((cur) => !cur);

    const handleInputChange = (e) => {
        setFormFields({ ...formFields, [e.target.name]: e.target.value });
    };

    const handleLogout = () => {
        localStorage.clear();
        setIsLoggedIn(false);
        setShowAlert(true);
        setTimeout(() => setShowAlert(false), 3000);
        window.location.reload();
    };

    const handleAuth = async (e) => {
        e.preventDefault();
        try {
            const url = isLogin ? 'https://localhost:7281/api/Auth/Login' : 'https://localhost:7281/api/User/create';
            const body = isLogin ?
                { email: formFields.eMail, password: formFields.password } :
                { name: formFields.name, surname: formFields.surname, eMail: formFields.eMail, password: formFields.password };

            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
            });

            if (response.ok) {
                if (isLogin) {
                    const data = await response.json();
                    const token = data.token?.access;
                    if (token) {
                        const decodedToken = parseJwt(token);
                        localStorage.setItem('isLoggedIn', 'true');
                        localStorage.setItem('token', token);
                        localStorage.setItem('name', decodedToken.name);
                        localStorage.setItem('family_name', decodedToken.family_name);
                        localStorage.setItem('email', decodedToken.email);
                        localStorage.setItem('sub', decodedToken.sub);
                        localStorage.setItem('role', decodedToken.role);
                        console.log('Decoded Token:', decodedToken); // For debugging
                        setIsLoggedIn(true);
                        setOpen(false);
                        window.location.reload();
                        navigate('/');
                    } else {
                        setAuthError('Failed to obtain a valid token.');
                    }
                } else {
                    alert("Registration successful");
                    setIsLogin(true);
                    navigate('/admin');
                }
            } else {
                const errorData = await response.json();
                setAuthError(errorData.message || (isLogin ? 'Login failed. Please try again.' : 'Registration failed. Please try again.'));
            }
        } catch (error) {
            console.error('Authentication error:', error);
            setAuthError('An error occurred. Please try again.');
        }
    };

    const toggleAuthMode = () => {
        setIsLogin(!isLogin);
        setAuthError(null);
        setFormFields({ name: '', surname: '', eMail: '', password: '' });
    };

    return (
        <>
            {isLoggedIn ? (
                <>
                    <Button
                        onClick={handleLogout}
                        variant="gradient"
                        color="red"
                        className="hidden lg:inline-block px-4 py-2.5 text-base font-medium whitespace-nowrap"
                    >
                        Log Out
                    </Button>
                    {showAlert && (
                        <Alert
                            color="green"
                            dismissible={{
                                onClose: () => setShowAlert(false),
                            }}
                            open={showAlert}
                        >
                            Successfully logged out.
                        </Alert>
                    )}
                </>
            ) : (
                <Button
                    onClick={handleOpen}
                    variant="gradient"
                    color="blue-gray"
                    className="hidden lg:inline-block px-4 py-2.5 text-base font-medium whitespace-nowrap"
                >
                    {isLogin ? "Log In" : "Sign Up"}
                </Button>
            )}
            <Dialog
                size="xs"
                open={open}
                handler={handleOpen}
                className="bg-transparent shadow-none"
            >
                <Card className="mx-auto w-full max-w-[24rem]">
                    <CardBody className="flex flex-col gap-4">
                        <Typography variant="h4" color="blue-gray">
                            {isLogin ? "Log In" : "Sign Up"}
                        </Typography>
                        <div className="flex items-center justify-center">
                            <img src={loginIcon} alt="log cabin" className="w-24 h-24 mx-auto" />
                        </div>
                        <form onSubmit={handleAuth} className="flex flex-col gap-4">
                            {!isLogin && (
                                <>
                                    <Input type="text" name="name" value={formFields.name} onChange={handleInputChange} label="Name" size="lg" />
                                    <Input type="text" name="surname" value={formFields.surname} onChange={handleInputChange} label="Surname" size="lg" />
                                </>
                            )}
                            <Input type="email" name="eMail" value={formFields.eMail} onChange={handleInputChange} label="Email" size="lg" />
                            <Input type="password" name="password" value={formFields.password} onChange={handleInputChange} label="Password" size="lg" />
                            <Button type="submit" variant="gradient" fullWidth>
                                {isLogin ? "Log In" : "Sign Up"}
                            </Button>
                        </form>
                        {authError && <Typography color="red" className="text-center">{authError}</Typography>}
                    </CardBody>
                    <CardFooter className="pt-0">
                        <Typography variant="small" className="mt-4 flex items-center justify-center">
                            {isLogin ? "Don't have an account?" : "Already have an account?"}
                            <Button
                                variant="text"
                                color="blue"
                                onClick={toggleAuthMode}
                                className="ml-2"
                            >
                                {isLogin ? "Sign Up" : "Log In"}
                            </Button>
                        </Typography>
                    </CardFooter>
                </Card>
            </Dialog>
        </>
    );
}