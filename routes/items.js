const express = require('express');
const router = new express.Router()
const ExpressError = require('../expressError');
const items = require('../fakeDB')


router.get('/items', (req, res) => {
    res.json({items})
})

router.post('/items', (req, res) => {
    const item = {name: `${req.body.name}`, price: `${req.body.price}`}
    items.push(item)
    res.status(201).json({added: item})
})

router.get('/items/:name', (req, res) => {
    const item = items.find(i => i.name === req.params.name)
    if (item === undefined) {
        throw new ExpressError('Item not found', 404);
    }
    
    res.json({item})
})
 
router.patch('/items/:name', (req, res) => {
    const item = items.find(i => i.name === req.params.name)
    
    if (item === undefined) {
        throw new ExpressError('Item not found', 404);
    }
    item.name = req.body.name;
    item.price = req.body.price;
    res.send({updated: item})
})

router.delete('/items/:name', (req, res) => {
    const item = items.find(i => i.name === req.params.name)
    
    if (item === undefined) {
        throw new ExpressError('Item not found', 404);
    }
    items.splice(item, 1);
    res.json({message: 'Deleated'})
})

module.exports = router