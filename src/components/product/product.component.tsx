import React from 'react';
import {IProduct} from "../../types";
import styles from './product.component.module.scss'


const ProductComponent = ({product}: { product: IProduct }) => {
    return (
        <div className={styles.card}>
            <img className={styles.card_img} src={product.image} alt={product.title}/>
            <h4>{product.title}</h4>
        </div>
    );
};

export default ProductComponent;