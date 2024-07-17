import {useMutation, useQueryClient} from "@tanstack/react-query";
import {IProduct} from "../../../types";
import axios from "axios";
import {Bounce, toast} from "react-toastify";

const deleteProduct = (id: string) => {
    return axios.delete(`${process.env.REACT_APP_POSTS_URL}/${id}`)
}

const UseDeleteProduct = () => {
    const {mutate, isPending, isSuccess, isError} = useMutation({
        mutationFn: (id: string) => deleteProduct(id),
        onSuccess: () => {
            toast("Product successfully deleted", {
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

export default UseDeleteProduct;