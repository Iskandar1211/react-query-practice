import React, {useEffect} from 'react';
import {IProduct} from "../../types";
import styles from './product.component.module.scss'
import UseDeleteProduct from "../../shared/hooks/mutations/useDeleteProduct";
import useUpdateProduct from "../../shared/hooks/mutations/useUpdateProduct";
import {QueryObserverResult, RefetchOptions} from "@tanstack/react-query";


const ProductComponent = (
    {
        product,
        setupdateProduct,
        refetch
    }: {
        product: IProduct
        setupdateProduct: React.Dispatch<React.SetStateAction<IProduct | null>>
        refetch: (options?: (RefetchOptions | undefined)) => Promise<QueryObserverResult<IProduct[], Error>>
    }) => {

    const {mutate, isSuccess} = UseDeleteProduct()

    useEffect(() => {
        if (!isSuccess) return
        refetch()
    }, [isSuccess])

    return (
        <div className={styles.card}>
            <img className={styles.card_img} src={product.image} alt={product.title}/>
            <div className={styles.card_text}>
                <h4>{product.title}</h4>
                <p>{product.description}</p>
                <p>Price <b>{product.price}$</b></p>
                <p>Cotegory <b>{product.category}</b></p>
                <p>Rating {product.rating.rate}</p>
            </div>
            <div className={styles.card_buttons}>
                <button className={styles.deleteButton} onClick={() => mutate(product.id)}>Delete</button>
                <button className={styles.updateButton} onClick={() => setupdateProduct(product)}>Update</button>
            </div>
        </div>
    );
};

export default ProductComponent;