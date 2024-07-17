import React from 'react';
import {IProduct} from "../../types";
import ProductComponent from "../product/product.component";
import styles from './products.component.module.scss'
import {useForm} from "react-hook-form";
import UseGetProducts from "../../shared/hooks/queries/useGetProducts";
import UseCreateProduct from "../../shared/hooks/mutations/useCreateProduct";

export function ProductsComponent() {
    const [sort, setSort] = React.useState<'?sort=desc' | ''>('');

    const {products, isLoading, isError: isGetProductsError} = UseGetProducts({sort, isEnabled: true})
    const {mutate, isError, isSuccess, isPending} = UseCreateProduct()

    const {
        register,
        handleSubmit,
        formState: {errors}
    } = useForm<IProduct>({
        mode: 'onSubmit'
    });


    if (isLoading) {
        return <div>Loading...</div>
    }
    if (isGetProductsError) {
        return <div>Error`</div>
    }


    const onSubmit = (data: IProduct) => {
        const id = products ? products.length + 1 : 1
        mutate({...data, id, image: 'https://i.pravatar.cc'})
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

                        />)) :
                    <div>Product in empty</div>}
            </div>
        </div>
    );
}

