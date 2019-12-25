const express = require('express');
const router = express.Router();


router.get('/', (req, res, next) =>{
    res.status(200).json({
        message:'account details'
    });
});


router.post('/', (req, res, next) =>{
    const account ={
       name: req.body.name,
       number: req.body.number

    };
    res.status(201).json({
        message:'account created',
        createdAccount: account

    });
});



router.delete('/:bankId', (req, res, next) =>{
    const id =req.params.productId;
    if (id === 'special') {
        res.status(200).json({
            message:'you discovered a special ID',
            id:id
        });
    } else {
        res.status(200).json({
            message:'you passed an id'
        })
    }
    res.status(200).json({
        message:'account deleted'
    });
});




module.exports = router;
