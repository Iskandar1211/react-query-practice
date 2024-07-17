import React from 'react';
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {IProduct} from "../../../types";
import axios from "axios";
import {Bounce, toast} from "react-toastify";

const createProduct = (product: IProduct) => {
    return axios.post(`${process.env.REACT_APP_POSTS_URL}`, product)
}

const UseCreateProduct = () => {
    const {invalidateQueries} = useQueryClient()
    const {mutate, isPending, isSuccess, isError} = useMutation({
        mutationFn: (newProduct: IProduct) => createProduct(newProduct),
        onSuccess: () => {
            toast("Product successfully created", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            });
            invalidateQueries({
                queryKey: ['products', ''],
            })
        },
    })
    return {mutate, isPending, isSuccess, isError}
};

export default UseCreateProduct;