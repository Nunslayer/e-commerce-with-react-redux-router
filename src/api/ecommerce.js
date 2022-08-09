import axios from 'axios'

export const ecommerceApi=(token) => axios.create({
    baseUrl:'https://ecommerce-exercise-backend.herokuapp.com',
    headers: { Authorization: `Bearer ${token}` }
})