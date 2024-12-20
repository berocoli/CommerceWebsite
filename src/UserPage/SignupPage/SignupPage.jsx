import React from "react";
import {
  Button,
  Dialog,
  Card,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Checkbox,
} from "@material-tailwind/react";
import LoginPage from "../LoginPage/LoginPage";

export default function SignupPage() {
  const [formData, setFormData] = React.useState({
    name: '',
    surname: '',
    email: '',
    password: '',
  });

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen((cur) => !cur);
  const [showLogin, setShowLogin] = React.useState(false);

  const toggleLoginView = () => {
    setShowLogin(true);
    setOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Data sent to API:", formData); // Log the data being sent to the API
    try {
      const response = await fetch("https://localhost:7281/api/User/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        alert("Sign up successful");
        handleOpen();

        setFormData({
          name: "",
          surname: "",
          email: "",
          password: "",
        });
        // window.location.reload();
      }
    } catch (error) {
      console.log(error);
      console.error("Error:", error);
      alert("Sign up failed. Please try again.");
    }
  };

  return (
    <>
      <Button
        onClick={handleOpen}
        variant="gradient"
        color="blue"
        size="sm"
        className="hidden lg:inline-block outline outline-gray-300 outline-1"
      >
        Sign Up
      </Button>
      <Dialog
        size="xs"
        open={open}
        handler={handleOpen}
        className="bg-transparent shadow-none"
      >
        <Card className="mx-auto w-full max-w-[24rem]">
          <CardBody className="flex flex-col gap-4">
            <Typography variant="h4" color="blue-gray">
              Sign Up
            </Typography>
            <Typography className="mb-1 font-normal" variant="paragraph" color="gray">
              Enter your email and password to Sign Up.
            </Typography>
            <form onSubmit={handleSubmit}>
              <Typography className="mb-2" variant="h6" placeholder="John Doe">
                Your Name
              </Typography>
              <Input
                value={formData.name}
                label="Name"
                size="lg"
                onChange={(e) => setFormData({ ...formData, name: e.target.value })} // Added onChange
              />
              <Typography className="mb-2" variant="h6">
                Your Surname
              </Typography>
              <Input
                value={formData.surname}
                label="Surname"
                size="lg"
                onChange={(e) => setFormData({ ...formData, surname: e.target.value })} // Added onChange
              />
              <Typography className="mb-2" variant="h6">
                Your Email
              </Typography>
              <Input
                value={formData.email}
                label="Email"
                size="lg"
                onChange={(e) => setFormData({ ...formData, email: e.target.value })} // Added onChange
              />
              <Typography className="mb-2" variant="h6">
                Your Password
              </Typography>
              <Input
                value={formData.password}
                label="Password"
                type="password"
                size="lg"
                onChange={(e) => setFormData({ ...formData, password: e.target.value })} // Added onChange
              />
              <CardFooter className="pt-0 mt-7">
                <Button
                  variant="gradient"
                  type="submit"
                  fullWidth
                  className="bg-gradient-to-bl from-blue-300 to-green-400"
                // onClick={handleSubmit} // Added onClick for form submission
                >
                  Sign Up
                </Button>
              </CardFooter>
            </form>
          </CardBody>
          {showLogin ? (
            <LoginPage />
          ) : (
            <Typography variant="small" className="-mt-5 mb-5 flex justify-center">
              Already have an account?
              <Button
                variant="text"
                color="blue"
                onClick={toggleLoginView}
                className="ml-1"
              >
                Login
              </Button>
            </Typography>
          )}
        </Card>
      </Dialog>
    </>
  );
}
