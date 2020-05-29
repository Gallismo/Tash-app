const {Router} = require('express');
const Product = require('../models/Product');
const router = Router();
const auth = require('../middleware/auth.middleware');
const config = require('config');
const shortId = require('shortid');

router.post('/create-product', auth, async (req, res) => {
    try {
        const baseUrl = config.get('baseUrl');
        const {name, description, cost, phoneNumber, createdByNick} = req.body;
        const code = shortId.generate();
        const to = baseUrl + '/t/' + code;

        const product = new Product({
            code, name, description, cost, to, phoneNumber, createdBy: req.user.userId, createdByNick
        });

        await product.save();

        res.status(201).json({message: "Product created"});

    }  catch(e) {
        res.status(500).json({ message: "Что-то пошло не так"});
    }  
})

router.get('/my', auth, async (req, res) => {
    try {
        const products = await Product.find({ createdBy: req.user.userId });
        res.json(products);
    }  catch(e) {
        res.status(500).json({ message: "Что-то пошло не так"});
    }  
})

router.get('/all', auth, async (req, res) => {
    try {
        const products = await Product.find(item => item);
        res.json(products);
    }  catch(e) {
        res.status(500).json({ message: "Что-то пошло не так"});
    }  
})

router.get('/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (product) {
            product.clicks++;
            await product.save();
        }
        res.json(product);
    }  catch(e) {
        res.status(500).json({ message: "Что-то пошло не так"});
    }  
});

router.delete('/delete/:id', auth, async (req, res) => {
    try {
        const deleted = await Product.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Deleted"});
        res.redirect('/products');
    } catch(e) {
        res.status(500).json({ message: "Что-то пошло не так"});
    }
});

router.put('/edit/:id', auth, async (req, res) => {
    try {
        const edited = await Product.findByIdAndUpdate(req.params.id, 
            {$set:{
                name: req.body.name, 
                description: req.body.description, 
                cost: req.body.cost, 
                phoneNumber: req.body.phoneNumber}}, {useFindAndModify: false});
        await edited.save();
        res.status(201).json({ message: "Edited"});
        res.redirect(`/detail/${req.params.id}`);
    } catch(e) {
        res.status(500).json({ message: "Что-то пошло не так"});
    }
});

module.exports = router;