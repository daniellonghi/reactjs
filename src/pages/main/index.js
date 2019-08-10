import React, { Component } from 'react';
import api from '../../services/api';
import { Link } from 'react-router-dom';

import './styles.css';

export default class Main extends Component{
    state = {
        products: [],
        productInfo: {},
        page: 1,
    };

    componentDidMount(){
        this.loadProducts();
    }

    loadProducts = async  (page = 1) => {
        const response = await api.get(`/products?page=${page}`);
        // DESISTRUTURO COM OUTRO NOME
        const {docs: products, ...productInfo} = response.data;
        this.setState({products, productInfo, page});
    };

    prevPage = () => {
        const { page } = this.state;

        if(page === 1) return alert("Você já está na primeira.");

        const pageNumber = page - 1;
        this.loadProducts(pageNumber);
    }
    nextPage = () => {
        const { page, productInfo} = this.state;
        if(page === productInfo.pages) return alert("Você já está na última.");

        const pageNumber = page + 1;
        this.loadProducts(pageNumber);
    }

    render(){
        const {products, page, productInfo} = this.state;
        return(
            <div className="product-list">
                {
                    products.map( item => (
                        <article key={item._id}>
                            <strong>{item.title}</strong>
                            <p>{item.description}</p>
                            <Link to={`/products/${item._id}`}>Acessar</Link>
                        </article>
                    ))
                }
                <div className="actions">
                    <button disabled={page === 1} onClick={this.prevPage}>Anterior</button>
                    <button disabled={page === productInfo.pages} onClick={this.nextPage}>Próxima</button>
                </div>
            </div>
        );
    };
}