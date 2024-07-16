import React from 'react';
import {useMutation, useQuery} from "react-query";
import axios from "axios";
import {IProduct} from "../../types";
import ProductComponent from "../product/product.component";
import styles from './products.component.module.scss'
import {useForm} from "react-hook-form";

export function ProductsComponent() {
    const [sort, setSort] = React.useState<'?sort=desc' | ''>('');
    const getProducts = async (sort = '') => {
        const {data} = await axios.get<IProduct[]>(`https://fakestoreapi.com/products${sort}`)
        return data;
    }

    const {
        register,
        handleSubmit,
        watch,
        formState: {errors}
    } = useForm<IProduct>({
        mode: 'onSubmit'
    });

    const {data: products, isLoading, isError, refetch} = useQuery(['products', sort], () => getProducts(sort));

    const mutation = useMutation({
        mutationFn: (newProduct: IProduct) => createProduct(newProduct),
        onSuccess: () => alert('Product Added'),
    })

    const createProduct = (product: IProduct) => {
        return axios.post(`https://fakestoreapi.com/products`, product)
    }


    if (isLoading) {
        return <div>Loading...</div>
    }
    if (isError) {
        return <div>Error`</div>
    }


    const onSubmit = (data: IProduct) => {
        const id = products ? products.length + 1 : 1
        mutation.mutate({...data, id, image: 'https://i.pravatar.cc'})
    }


    return (
        <div>
            <button className={styles.sortButton} onClick={() => setSort("?sort=desc")}>Sort</button>
            <button className={styles.sortButton} onClick={() => setSort("")}>Un Sort</button>
            <form onSubmit={handleSubmit(onSubmit)}>
                <h3>Create Product Form</h3>
                <input type="text" {...register("title")} placeholder='title'/>
                <input type="number" {...register("price")} placeholder={'price'}/>
                <input type="text" {...register("description")} placeholder={'description'}/>
                <input type="text" {...register("category")} placeholder={'category'}/>
                <input type="number" {...register("rating.rate")} placeholder={'rate'}/>
                <input type="number" {...register("rating.count")} placeholder={'count'}/>
                <button type='submit'>Create Product</button>
            </form>
            <div className={styles.container}>

                {products && products.length > 0 ? products.map(product => (
                        <ProductComponent
                            key={product.id}
                            product={product}
                            refetch={refetch}
                        />)) :
                    <div>Product in empty</div>}
            </div>
        </div>
    );
}

