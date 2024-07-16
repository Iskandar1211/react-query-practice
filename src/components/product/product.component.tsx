import React from 'react';
import {IProduct} from "../../types";

const ProductComponent = ({product}:{product:IProduct}) => {
    return (
        <div>
            <h1>{product.title}</h1>
        </div>
    );
};

export default ProductComponent;