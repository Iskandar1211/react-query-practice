import React, {useEffect} from 'react';
import {IProduct} from "../../types";
import ProductComponent from "../product/product.component";
import styles from './products.component.module.scss'
import {useForm} from "react-hook-form";
import UseGetProducts from "../../shared/hooks/queries/useGetProducts";
import UseCreateProduct from "../../shared/hooks/mutations/useCreateProduct";
import useUpdateProduct from "../../shared/hooks/mutations/useUpdateProduct";

export function ProductsComponent() {
    const [sort, setSort] = React.useState<'?_sort=20' | ''>('');
    const [updateProduct, setupdateProduct] = React.useState<IProduct | null>(null);
    const {products, isLoading, isError: isGetProductsError, refetch} = UseGetProducts({sort, isEnabled: true})
    const {mutate, isError, isSuccess: isCreateSuccess, isPending} = UseCreateProduct()
    const {mutate: updateMutate, isSuccess: isUpdateSuccess} = useUpdateProduct()

    const {
        register,
        handleSubmit,
        setValue,
        formState: {errors},
        reset
    } = useForm<IProduct>({
        mode: 'onSubmit'
    });

    useEffect(() => {
        refetch()
    }, [isCreateSuccess, isUpdateSuccess])

    useEffect(() => {
        if (!updateProduct) return
        setValue('id', updateProduct.id)
        setValue('category', updateProduct.category)
        setValue('description', updateProduct.description)
        setValue('title', updateProduct.title)
        setValue('price', updateProduct.price)
        setValue('rating.rate', updateProduct.rating.rate)
        setValue('rating.count', updateProduct.rating.count)
    }, [updateProduct])


    if (isLoading) {
        return <div>Loading...</div>
    }
    if (isGetProductsError) {
        return <div>Error`</div>
    }


    const onSubmit = (data: IProduct) => {
        if (updateProduct) {
            updateMutate({
                ...updateProduct,
                category: data.category,
                description: data.description,
                title: data.title,
                price: data.price,
                rating: {
                    rate: data.rating.rate,
                    count: data.rating.count,
                }
            })
        } else {
            const id = products ? String(products.length + 1) : ''
            mutate({...data, id, image: 'https://i.pravatar.cc'})
        }
        reset()
    }

    return (
        <div>
            <button className={styles.sortButton} onClick={() => setSort("?_sort=20")}>Sort</button>
            <button className={styles.sortButton} onClick={() => setSort("")}>Un Sort</button>
            <form onSubmit={handleSubmit(onSubmit)}>
                <h3>Create Product Form</h3>
                <input type="text" {...register("title")} placeholder='title'/>
                <input type="number" {...register("price")} placeholder={'price'}/>
                <input type="text" {...register("description")} placeholder={'description'}/>
                <input type="text" {...register("category")} placeholder={'category'}/>
                <input type="number" {...register("rating.rate")} placeholder={'rate'}/>
                <input type="number" {...register("rating.count")} placeholder={'count'}/>
                <button type='submit'
                        disabled={isPending}>{updateProduct ? 'Update Product' : 'Create Product'}</button>
            </form>
            <div className={styles.container}>
                {products && products.length > 0 ? products.map(product => (
                        <ProductComponent
                            key={product.id}
                            product={product}
                            setupdateProduct={setupdateProduct}
                            refetch={refetch}
                        />)) :
                    <div>Product in empty</div>}
            </div>
        </div>
    );
}

