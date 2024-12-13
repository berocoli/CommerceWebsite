import React from "react";
import {
    Avatar,
    Card,
    CardBody,
    CardHeader,
    Textarea,
    Typography,
    Tabs,
    TabsHeader,
    TabsBody,
    Tab,
    TabPanel,
    Button,
    Input,
    Suspense,
} from "@material-tailwind/react";
import axios from "axios";
import { UserCircleIcon, Cog6ToothIcon, TrashIcon, ArrowRightIcon } from "@heroicons/react/24/solid";
import image from "../assets/loginBg.svg";
import { StickyNavbar } from "../NavbarComp/Navbar";
import DeleteProfile from "./ProfileDelete";
import { FooterComponent } from "../Footer/FooterComponent";


const id = localStorage.getItem('sub');
const name = localStorage.getItem('name');
const surname = localStorage.getItem('family_name');
const email = localStorage.getItem('email');

const handleDelete = async () => { // Define as async
    try {
        const response = await axios.delete('https://localhost:7281/api/User/byId', { // Use await
            data: { id: id },
            headers: { 'Content-Type': 'application/json' }
        });
        console.log(response.data);
        localStorage.clear();
        alert("Kullanıcı başarıyla silindi");
        window.location.reload(); // Move this outside of alert
    } catch (error) {
        console.error("Silme hatası:", error.response ? error.response.data : error.message);
        alert("Kullanıcı silme hatası");
    }
}

function ProfilePage() {
    const handleDeleteClick = () => {
        // DeleteUser bileşenini burada çağırmak yerine, sadece silme işlemini başlatın
        if (window.confirm("Hesabınızı silmek istediğinizden emin misiniz?")) {
            // Silme işlemi için DeleteUser bileşeninin handleDelete fonksiyonunu çağırın
            // Bu örnek için doğrudan API çağrısı yapıyoruz
            <Suspense fallback={<div>Loading...</div>}>
                {handleDelete()}
            </Suspense>

        }
    };

    const data = [
        {
            label: "Settings",
            value: "settings",
            icon: Cog6ToothIcon,
            content: (
                <div className="space-y-6">
                    <div>
                        <Typography variant="h6" color="blue-gray" className="mb-3">

                        </Typography>

                        
                    </div>
                    <div>
                        <Typography variant="h6" color="blue-gray" className="animate-pulse mb-3 font-thin text-gray-800 hover:text-gray-600">
                            If it's time to go...
                        </Typography>
                        <DeleteProfile />
                    </div>
                </div>
            ),
        },
    ];

    return (
        <>
            
            <section className="container mx-auto py-10 max-w-screen-lg overflow-hidden">
                <Card className="w-full border border-gray-300 rounded-2xl overflow-hidden">
                    <CardBody className="px-6">
                        <div className="flex lg:gap-0 gap-6 flex-wrap justify-between items-center mb-6">
                            <div className="flex items-center gap-3">
                                <Avatar src={image} alt="avatar" size="xl" variant="circular" className="border-2 border-white" />
                                <div>
                                    <Typography variant="h5" color="blue-gray" className="mb-1">
                                        {name} {surname}
                                    </Typography>
                                    <Typography variant="small" className="font-normal text-gray-600">
                                        {email}
                                    </Typography>
                                </div>
                            </div>
                        </div>
                        <Tabs value="profile">
                            <TabsHeader>
                                {data.map(({ label, value, icon }) => (
                                    <Tab key={value} value={value}>
                                        <div className="flex items-center gap-2">
                                            {React.createElement(icon, { className: "w-5 h-5" })}
                                            {label}
                                        </div>
                                    </Tab>
                                ))}
                            </TabsHeader>
                            <TabsBody>
                                {data.map(({ value, content }) => (
                                    <TabPanel key={value} value={value}>
                                        {content}
                                    </TabPanel>
                                ))}
                            </TabsBody>
                        </Tabs>
                    </CardBody>
                </Card>
            </section>
            <div className="my-11"></div>
            <div className='mt-98'>
                <FooterComponent />
            </div>
        </>
    );
}

export default ProfilePage;