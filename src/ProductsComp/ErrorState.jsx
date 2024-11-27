// ErrorState.jsx
import React from 'react';
import { StickyNavbar } from '../NavbarComp/Navbar';
import { Typography, Button } from "@material-tailwind/react";

function ErrorState({ error, onRetry }) {
  return (
    <>
      <div className="mx-5 my-6">
        <StickyNavbar />
      </div>
      <div className="flex flex-col items-center justify-center mb-10">
        <Typography color="red">{error}</Typography>
        <Button
          color="blue"
          ripple="light"
          className="mt-4"
          onClick={onRetry}
        >
          Retry
        </Button>
      </div>
    </>
  );
}

export default ErrorState;
