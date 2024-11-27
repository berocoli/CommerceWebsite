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
            <div className="mx-5 my-6 mr-8">
                <StickyNavbar />
            </div>
            <div className="my-24">
                <Card className="flex flex-col justify-center items-center mt-6 animate-pulse shadow-none">
                    <Spinner color='green' className="h-12 w-12 text-blue-600" />
                </Card>
            </div>
        </>
    );
}

export default LoadingState;
