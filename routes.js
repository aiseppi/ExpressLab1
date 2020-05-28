const express = require("express");
const cart = express.Router();
const cartEndpointURI = "/cart";
const cartItems = [
    {
        id: 1,
        product: "puppy food",
        price: 9.99,
        quantity: 1,
    },
    {
        id: 2,
        product: "ranch dressing",
        price: 2.75,
        quantity: 20,
    },
    {
        id: 3,
        product: "cat treats",
        price: 4.49,
        quantity: 2,
    },
    {
        id: 4,
        product: "blueberries",
        price: 3.99,
        quantity: 1,
    }
];
let nextId = cartItems.length + 1;

cart.get(cartEndpointURI, (request, response) => {
    response.json(cartItems);
})
cart.get(`${cartEndpointURI}/:id`, (request, response) => {
    let id = parseInt(request.params.id);
    let cartItem = cartItems.find((item) => {
        if (item.id === id) {
            return true
        }
    })
    if (cartItem) {
        response.status(200);
        response.json(cartItem);
    } else
        response.status(404);
    response.send("ID not found");
})

cart.post(cartEndpointURI, (request, response) => {
    const newCartItem = request.body;
    newCartItem.id = nextId;
    nextId++;
    cartItems.push(newCartItem);
    response.status(201);
    response.json(newCartItem);
})

cart.put(`${cartEndpointURI}/:id`, (request, response) => {
    let id = parseInt(request.params.id);
    const updatedCartItem = request.body;
    updatedCartItem.id = id;
    let foundIndex = cartItems.findIndex((item) => {
        if (item.id === id) {
            return true
        }
    })
    if (foundIndex > -1) {
        cartItems.splice(foundIndex, 1, updatedCartItem);
        response.status(200);
        response.json(updatedCartItem);
    }
})

cart.delete(`${cartEndpointURI}/:id`, (request, response) => {
    let id = parseInt(request.params.id);
    let foundIndex = cartItems.findIndex((item) => {
        if (item.id === id) {
            return true
        }
    })
    if (foundIndex > -1) {
        cartItems.splice(foundIndex, 1);
        response.status(204);

    }
})

module.exports = { cart };