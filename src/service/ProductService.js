import axios from 'axios';

export default class ProductService {
    getProductsSmall() {
        return axios.get('assets/demo/data/products-small.json').then((res) => res.data.data);
    }

    getProducts() {
        return axios.get('https://tecjusbackend.vercel.app/pessoafisica').then((res) => res.data.rows);
    }

    getProductsMixed() {
        return axios.get('assets/demo/data/products-mixed.json').then((res) => res.data.data);
    }

    getProductsWithOrdersSmall() {
        return axios.get('assets/demo/data/products-orders-small.json').then((res) => res.data.data);
    }
}
