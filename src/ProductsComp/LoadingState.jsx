// LoadingState.jsx
import React from 'react';
import {
    Card,
    Spinner
} from "@material-tailwind/react";
import { StickyNavbar } from '../NavbarComp/Navbar';

function LoadingState() {
    return (
        <>
            <StickyNavbar />

            <Card className="flex flex-col justify-center items-center mt-6 animate-pulse shadow-none">
                <Spinner color='green' className="h-12 w-12 text-blue-600" />
            </Card>
        </>
    );
}

export default LoadingState;
