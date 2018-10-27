module.exports = {
    getPayments: (req, res) => {
        let {ownerId} = req.session;
        req.app.get('db').get_payments([ownerId])
            .then(payments =>{
                console.log(payments);
                res.send(payments)
            })
            .catch(err => console.log(err));
    }
}