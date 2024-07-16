import React from 'react';
import {useQuery} from "react-query";
import axios from "axios";
import {IProduct} from "../../types";
import ProductComponent from "../product/product.component";

export function ProductsComponent() {
    const getProducts = async () => {
        const {data} = await axios.get<IProduct[]>(`https://fakestoreapi.com/products`)
        return data;
    }
    const {data: products, isLoading, isError} = useQuery('products', getProducts);

    if (isLoading) {
        return <div>Loading...</div>
    }
    if (isError) {
        return <div>Error`</div>
    }

    return (
        <div>
            {products ? products.map(product => (
                    <ProductComponent
                        key={product.id}
                        product={product}
                    />)) :
                <div>Product in empty</div>}
        </div>
    );
}

