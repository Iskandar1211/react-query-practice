import React from 'react';
import {IProduct} from "../../types";
import styles from './product.component.module.scss'


const ProductComponent = ({product}: { product: IProduct }) => {
    return (
        <div className={styles.card}>
            <img className={styles.card_img} src={product.image} alt={product.title}/>
            <div className={styles.card_text}>
                <h4>{product.title}</h4>
                <p>Price <b>{product.price}$</b></p>
                <p>Cotegory <b>{product.category}</b></p>
                <p>Rating {product.rating.rate}</p>
            </div>
        </div>
    );
};

export default ProductComponent;