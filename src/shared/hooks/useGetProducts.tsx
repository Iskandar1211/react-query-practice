import React from 'react';
import {useQuery} from "@tanstack/react-query";
import axios from "axios";
import {IProduct} from "../../types";

const getProducts = async (sort = '') => {
    const {data} = await axios.get<IProduct[]>(`${process.env.REACT_APP_POSTS_URL}${sort}`)
    return data;
}

const UseGetProducts = (sort:'?sort=desc' | '') => {
    const {data: products, isLoading, isError} = useQuery({
        queryKey: ['products', sort],
        queryFn: () => getProducts(sort)
    });

    return {products, isLoading, isError};
};

export default UseGetProducts;