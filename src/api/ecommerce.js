import axios from 'axios'

const tryThis = localStorage.getItem('tryToken')
console.log(tryThis)
export const ecommerceApi=(token) => axios.create({
    baseUrl:'https://ecommerce-exercise-backend.herokuapp.com',
    headers: { Authorization: `Bearer ${token}` }
})