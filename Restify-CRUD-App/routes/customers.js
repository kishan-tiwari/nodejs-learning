const errors = require('restify-errors');
const Customer = require('../models/Customer');


module.exports = server => {
    //Get Customers
    server.get('/customers', async (req, res, next)=>{ 
        try {
            const customers = await Customer.find();
            res.send(customers);
            next();
        } catch (err) {
            return next(new errors.InvalidContentError(err))
        }

    });

    //Get the single customer
    server.get('/customers/:id', async(req, res, next)=>{
        try {
            const customerDetails = await Customer.findById(req.params.id);
            res.send(customerDetails);
            next();
        } catch (err) {
            return next(new errors.ResourceNotFoundError(`There is not any customer with id ${req.params.id}`));        
        };
    });

    //Add Customer
    server.post('/customers', async(req,res,next)=>{
        //Check for JSON
        if(!req.is('application/json')){
            return next(new errors.InvalidContentError("Expects 'application/json'"));
        }
        const {name, email, balance} = req.body;
        let customer = new Customer({
            name,
            email,
            balance
        });

        try {
            const newCustomer = await customer.save();
            res.send(201);
            next();
        } catch (err) {
            return next(new errors.InternalError(err.message));
        };
    });

    //Update cutomer details
    server.put('/customers/:id', async(req,res,next)=>{
        //Check for JSON
        if(!req.is('application/json')){
            return next(new errors.InvalidContentError("Expects 'application/json'"));
        }
        try {
            const updateCustomerDetails = await Customer.findOneAndUpdate({_id: req.params.id}, req.body);
            res.status(200)
            next();
        } catch (err) {
            return next(new errors.ResourceNotFoundError(`There is not any customer with id ${req.params.id}`));        
        };
    });

    //Delete User By Id
    server.del('/customers/:id', async(req,res,next)=>{
        try {
            const deleteCustomer = await Customer.findOneAndRemove({_id: req.params.id});
            res.send(204)
            next();
        } catch (err) {
            return next(new errors.ResourceNotFoundError(`There is not any customer with id ${req.params.id}`));        
        };
    });
};

