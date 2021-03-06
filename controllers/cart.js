import Cart from "../models/cart.js";
import Product from "../models/ProductModel.js";

// getting all carts
const getAllCarts = async (req, res) => {
    try {
        const carts = await Cart.find({ user: req.user._id });
        res.status(200).send(carts);
    } catch (e) {
        res.status(400).send(e);
    }
}

// creating cart
const createCart = async (req, res) => {
    try {
        const cart = await Cart.create(req.body);
        res.status(200).send(cart);
    } catch (e) {
        res.status(400).send(e);
    }
}

// getting cart
const getCart = async (req, res) => {
    try {
        const cart = await Cart.findOne({ user: req.user._id , _id: req.params.cartId});
        res.status(200).send(cart);
    } catch (e) {
        res.status(400).send(e);
    }
}

// removing cart
const removeCart = async (req, res) => {
    try {
        const cart = await Cart.deleteOne({ user: req.user._id , _id: req.params.cartId});
        res.status(200).send(cart);
    } catch (e) {
        res.status(400).send(e);
    }
}

// getting products from cart
const getProductsFromCart = async (req, res) => {
    try {
        const cart = await Cart.findOne({ user: req.user._id , _id: req.params.cartId});
        const products = await Product.find({ _id: { $in: cart.products.map(item => item.product) } });
        res.status(200).send(products);
    } catch (e) {
        res.status(400).send(e);
    }
}

// adding product to cart
const addProductToCart = async (req, res) => {
    try {
        const cart = await Cart.findOne({ user: req.user._id , _id: req.params.cartId});
        const product = await Product.findById(req.params.productId.toString());
        const cartItem = cart.products.find(item => item.product.toString() === product._id.toString());
        if (cartItem) {
            cartItem.quantity += 1;
            calculateCartPrice(cartItem, 0.1);
        } else {
            cart.products.push({
                product: product._id,
                quantity: 1,
                itemPrice: product.price,
                itemTax: product.tax,
                totalPrice: product.price,
                totalTax: product.tax,
                priceWithTax: product.price + product.tax
            });
        }
        cart.updatedAt = Date.now();
        await cart.save();
        res.status(200).send(cart);
    } catch (e) {
        console.log(e.message);
        res.status(400).send(e.message);
    }
}

// removing product from cart
const removeProductFromCart = async (req, res) => {
    try {
        const cart = await Cart.findOne({ user: req.user._id , _id: req.params.cartId});
        const product = await Product.findById(req.params.productId);
        const cartItem = cart.products.find(item => item.product.toString() === product._id.toString());
        if (cartItem) {
            if (cartItem.quantity === 1) {
                cart.products.pull(cartItem);
            } else {
                cartItem.quantity -= 1;
                calculateCartPrice(cartItem, 0.1);
            }

        }
        cart.updatedAt = Date.now();
        await cart.save();
        res.status(200).send(cart);
    } catch (e) {
        res.status(400).send(e);
    }
}

// getting products status
const getProductsStatus = async (req, res) => {
    try {
        const cart = await Cart.findOne({ user: req.user._id.toString() , _id: req.params.cartId.toString()});
        const products = await Product.find({ _id: { $in: cart.products.map(item => item.product) } });
        const productsStatus = products.map(product => {
            const cartItem = cart.products.find(item => item.product.toString() === product._id.toString());
            return {
                product: product._id,
                status: cartItem.status
            }
        });
        res.status(200).send(productsStatus);
    } catch (e) {
        res.status(400).send(e);
    }
}

// updating product status
const updateProductStatus = async (req, res) => {
    try {
        const cart = await Cart.findOne({ user: req.user._id , _id: req.params.cartId});
        const product = await Product.findById(req.params.productId);
        const cartItem = cart.products.find(item => item.product.toString() === product._id.toString());
        if (cartItem) {
            cartItem.status = req.body.status;
        }
        cart.updatedAt = Date.now();
        await cart.save();
        res.status(200).send(cart);
    } catch (e) {
        res.status(400).send(e);
    }
}

// helper function for calculating cart price
const calculateCartPrice = (item , tax) => {
    item.totalPrice = item.quantity * item.itemPrice;
    item.priceWithTax = item.totalPrice * tax;
    return { 'totalPrice':item.totalPrice, 'priceWithTax':item.priceWithTax };
}


export {
    getAllCarts,
    getCart,
    createCart,
    removeCart,
    getProductsFromCart,
    addProductToCart,
    removeProductFromCart,
    getProductsStatus,
    updateProductStatus
}

