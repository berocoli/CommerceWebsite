import React, { useState, useEffect } from "react";
import {
    Card,
    CardHeader,
    CardBody,
    Typography,
    Button,
} from "@material-tailwind/react";
import axios from "axios";
import UpdateProduct from "./ProductOps/UpdateProduct";

export default function ProductManager() {
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);

    const fetchProducts = async () => {
        try {
            const response = await axios.get("https://localhost:7281/api/Products/list");
            setProducts(response.data);
            console.log(response.data);
        } catch (error) {
            console.error("Ürünleri getirme hatası:", error);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleProductSelect = (product) => {
        setSelectedProduct(product);
    };

    return (
        <div className="bg-gray-100 rounded-xl shadow-sm">
            <div className="container mx-auto px-4 py-8">
                <Typography variant="h2" color="blue-gray" className="text-center mb-4 pb-8">
                    Product Management
                </Typography>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <Card>
                        <CardHeader color="blue" className="p-5">
                            <Typography variant="h5" color="white" className="text-center">
                                Product List
                            </Typography>
                        </CardHeader>
                        <CardBody>
                            {products.map((product) => (
                                <Button
                                    key={product.id}
                                    color={selectedProduct?.id === product.id ? "blue" : "gray"}
                                    className="mb-2 w-full justify-start"
                                    onClick={() => handleProductSelect(product)}
                                >
                                    {product.name}
                                </Button>
                            ))}
                        </CardBody>
                    </Card>
                    <Card>
                        <CardHeader color="blue" className="p-5">
                            <Typography variant="h5" color="white" className="text-center">
                                Update Product
                            </Typography>
                        </CardHeader>
                        <CardBody>
                            {selectedProduct ? (
                                <UpdateProduct product={selectedProduct} onUpdate={fetchProducts} />
                            ) : (
                                <Typography>Please select a product to update.</Typography>
                            )}
                        </CardBody>
                    </Card>
                </div>
            </div>
        </div>
    );
}
