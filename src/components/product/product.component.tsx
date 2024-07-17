import React from 'react';
import {IProduct} from "../../types";
import styles from './product.component.module.scss'

import axios from "axios";
import {QueryObserverResult, RefetchOptions, RefetchQueryFilters, useMutation} from "@tanstack/react-query";


const ProductComponent = ({product}: {
    product: IProduct,
}) => {
    const deleteProduct = (id: number) => {
        return axios.delete(`https://fakestoreapi.com/products/${id}`)
    }

    const mutation = useMutation({
        mutationFn: (id: number) => deleteProduct(id)
    })

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
            <button onClick={() => mutation.mutate(product.id)}>Delete</button>
        </div>
    );
};

export default ProductComponent;