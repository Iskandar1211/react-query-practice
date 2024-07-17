import {useMutation, useQueryClient} from "@tanstack/react-query";
import {IProduct} from "../../../types";
import axios from "axios";
import {Bounce, toast} from "react-toastify";

const updateProduct = (product: IProduct) => {
    return axios.put(`${process.env.REACT_APP_POSTS_URL}/${product.id}`, product)
}

const UseUpdateProduct = () => {

    const {mutate, isPending, isSuccess, isError} = useMutation({
        mutationFn: (newProduct: IProduct) => updateProduct(newProduct),
        onSuccess: () => {
            toast("Product successfully updated", {
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
        },
    })
    return {mutate, isPending, isSuccess, isError}
};

export default UseUpdateProduct;