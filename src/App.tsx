import React from 'react';
import './App.scss';
import {ProductsComponent} from "./components/products/products.component";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function App() {
    return (
        <div>
            <ProductsComponent/>
            <ToastContainer/>
        </div>
    );
}

export default App;
