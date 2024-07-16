import React from 'react';
import {useMutation, useQuery} from "react-query";
import axios from "axios";
import {IProduct} from "../../types";
import ProductComponent from "../product/product.component";
import styles from './products.component.module.scss'
import {useForm} from "react-hook-form";

export function ProductsComponent() {
    const [limit, setLimit] = React.useState<number>(50);
    const getProducts = async (limit: number = 5) => {
        const {data} = await axios.get<IProduct[]>(`https://fakestoreapi.com/products?limit=${limit}`)
        return data;
    }
    const {
        register,
        handleSubmit,
        watch,
        formState: {errors}
    } = useForm<IProduct>();

    const mutation = useMutation({
        mutationFn:(newProduct:IProduct) => createProduct(newProduct),
        onSuccess:() => alert('Product Added'),
    })

    const createProduct = (product:IProduct) => {
       return axios.post(`https://fakestoreapi.com/products`,product)
    }

    const {data: products, isLoading, isError} = useQuery(['products', limit], () => getProducts(limit));

    if (isLoading) {
        return <div>Loading...</div>
    }
    if (isError) {
        return <div>Error`</div>
    }


    const onSubmit = (data: IProduct) => {
        mutation.mutate(data)
    }

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <h3>Create Product Form</h3>
                <input type="text" {...register("title")} placeholder='title'/>
                <input type="number" {...register("price")} placeholder={'price'}/>
                <input type="text" {...register("description")} placeholder={'description'}/>
                <input type="text" {...register("category")} placeholder={'category'}/>
                <input type="number" {...register("rating.rate")} placeholder={'rate'}/>
                <input type="number" {...register("rating.count")} placeholder={'count'} />
                <button type='submit'>Create Product</button>
            </form>
            <div className={styles.container}>

                {products && products.length > 0 ? products.map(product => (
                        <ProductComponent
                            key={product.id}
                            product={product}
                        />)) :
                    <div>Product in empty</div>}
            </div>
        </div>
    );
}

