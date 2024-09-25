import React from "react";
import {
    Avatar,
    Card,
    CardBody,
    CardHeader,
    Typography,
    Tabs,
    TabsHeader,
    TabsBody,
    Tab,
    TabPanel,
    Button,
    Input,
} from "@material-tailwind/react";
import { UserCircleIcon, Cog6ToothIcon } from "@heroicons/react/24/solid";
import image from "../assets/loginBg.svg";

const deleteId = sessionStorage.getItem('id');

const deleteAccount = async (e) => {
    e.preventDefault();
    try{
        const response = await axios.delete(`http://localhost:3000/users/${encodeURIComponent(deleteId)}`);
        console.log(response);
    }catch(error){
        console.log(error);
    }
}

const name = sessionStorage.getItem('name');
const surname = sessionStorage.getItem('surname');
const email = sessionStorage.getItem('email');

function ProfilePage() {
    const data = [
        {
            label: "Profile",
            value: "profile",
            icon: UserCircleIcon,
            content: (
                <div className="space-y-4">
                    <Typography variant="h6" color="blue-gray">
                        Kişisel Bilgiler
                    </Typography>
                    <Typography>Ad: {name}</Typography>
                    <Typography>Soyad: {surname}</Typography>
                    <Typography>E-posta: {email}</Typography>
                    <Typography className="mt-4">
                        Tutkulu bir UI/UX tasarımcısı olarak, sezgisel ve ilgi çekici dijital deneyimler yaratmaya odaklanıyorum. Tasarım düşüncesi, yaratıcılık ve problem çözme aşkıyla yönlendiriliyorum.
                    </Typography>
                </div>
            ),
        },
        {
            label: "Ayarlar",
            value: "settings",
            icon: Cog6ToothIcon,
            content: (
                <div className="space-y-6">
                    <div>
                        <Typography variant="h6" color="blue-gray" className="mb-3">
                            E-posta Değiştir
                        </Typography>
                        <Input type="email" label="Yeni E-posta" className="mb-3" />
                        <Button color="blue" ripple="light">
                            E-posta Güncelle
                        </Button>
                    </div>
                    <div>
                        <Typography variant="h6" color="blue-gray" className="mb-3">
                            Hesabı Sil
                        </Typography>
                        <Button color="red" ripple="light">
                            Hesabı Sil
                        </Button>
                    </div>
                </div>
            ),
        },
    ];

    return (
        <section className="container mx-auto px-8 py-10">
            <Card className="border border-gray-300 rounded-2xl overflow-hidden">
                <CardHeader shadow={false} floated={false} className="relative h-60">
                    <img
                        src={image}
                        alt="profile-picture"
                        className="w-full h-full object-cover"
                    />
                </CardHeader>
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
    );
}

export default ProfilePage;