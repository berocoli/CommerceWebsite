// Cart.jsx
import React from "react";
import {
    Dialog,
    List,
    ListItem,
    ListItemPrefix,
    Avatar,
    Card,
    Typography,
} from "@material-tailwind/react";
import GetCarts from "./GetCarts";

export default function Cart({ open, onClose }) {
    return (
        <Dialog
            size="lg"
            open={open}
            handler={onClose}
            className="bg-transparent shadow-none"
        >
            <div className="container inline-flex flex-col justify-center items-center">
                <Card className="w-auto p-4">
                    <List>
                        {/* Cart Items */}
                        <ListItem>
                            <ListItemPrefix>
                                <Avatar
                                    variant="circular"
                                    alt="candice"
                                    src="https://docs.material-tailwind.com/img/face-1.jpg"
                                />
                            </ListItemPrefix>
                            <div>
                                <Typography variant="h6" color="blue-gray">
                                    Tania Andrew
                                </Typography>
                                <Typography variant="small" color="gray" className="font-normal">
                                    Software Engineer @ Material Tailwind
                                </Typography>
                            </div>
                        </ListItem>
                        <ListItem>
                            <ListItemPrefix>
                                <Avatar
                                    variant="circular"
                                    alt="alexander"
                                    src="https://docs.material-tailwind.com/img/face-2.jpg"
                                />
                            </ListItemPrefix>
                            <div>
                                <Typography variant="h6" color="blue-gray">
                                    Alexander
                                </Typography>
                                <Typography variant="small" color="gray" className="font-normal">
                                    Backend Developer @ Material Tailwind
                                </Typography>
                            </div>
                        </ListItem>
                        <ListItem>
                            <ListItemPrefix>
                                <Avatar
                                    variant="circular"
                                    alt="emma"
                                    src="https://docs.material-tailwind.com/img/face-3.jpg"
                                />
                            </ListItemPrefix>
                            <div>
                                <Typography variant="h6" color="blue-gray">
                                    Emma Willever
                                </Typography>
                                <Typography variant="small" color="gray" className="font-normal">
                                    UI/UX Designer @ Material Tailwind
                                </Typography>
                            </div>
                        </ListItem>
                    </List>
                    <GetCarts onClose={onClose} />
                </Card>
            </div>
        </Dialog>
    );
}
