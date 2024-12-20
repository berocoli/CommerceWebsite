// ErrorState.jsx
import React from 'react';
import { StickyNavbar } from '../NavbarComp/Navbar';
import { Typography, Button } from "@material-tailwind/react";

function ErrorState({ error, onRetry }) {
  return (
    <>

      <div className="flex flex-col items-center justify-center mb-10">
        <Typography color="red">{error}</Typography>
        <Button
          color="blue"
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
