const productModel = require("../models/product")
const express = require("express")

const productRoute = express.Router()

productRoute.get("/", (req, res)=>{
    productModel.find({})
        .then((products)=>{
            
            res.render("products", {user : req.user, products})
        }).catch((err)=>{
            res.status(500).send({
                message:"unable to get data",
                data: err
            })
        })

})

productRoute.post("/", (req, res)=>{
    const product = req.body
    productModel.create(product)
        .then((product)=>{
            res.status(201).send({
                message: "successfully created a product",
                data: product
            })
        }).catch((err)=>{
            res.status(500).send({
                message: "an unexpected server error occurred",
                data: err
            })
        })
})

productRoute.get("/:id", (req, res)=>{
    const productID = req.params.id
    productModel.findById(productID)
        .then((product)=>{
            res.status(200).send(product)
        }).catch((err)=>{
            res.status(500).send({
                message:"an error occurred",
                error: err
            })

        })
})

productRoute.put("/:id", (req, res)=>{
    const productID = req.params.id
    const product = req.body
    productModel.findByIdAndUpdate(productID, product, {new: true})
        .then((product)=>{
            res.status(200).send({
                message: "successfully updated",
                product: product
            })
        }).catch((err)=>{
            res.status(404).send({
                message: "unable to update product",
                error: err
            })
        })
})

productRoute.delete("/:id", (req, res)=>{
    const productID = req.params.id
    productModel.findByIdAndDelete(productID)

        .then((product)=>{
            res.status(200).send({
                message:"successfully deleted product",
                product
            })
        }).catch((err)=>{
            res.status(500).send({
                message: 'unable to delete product',
                error: err
            })
        })
})

module.exports = productRoute