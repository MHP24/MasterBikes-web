const connection = require('../database/db.js');

exports.profile = (req, res) => {
    const { user } = req;
    connection.query('SELECT * FROM bills WHERE client_id = ?', [user.id], (error, results) => {
        if(error) {
            console.log(error);
            return;
        }
        connection.query('SELECT * FROM repairs WHERE client_id = ?', [user.id], (error, repairsResults) => {
            if(error) {
                console.log(error);
                return;
            }
            connection.query('SELECT * FROM rent WHERE client_id = ?', [user.id], (error, rentResults) => {
                if(error) {
                    console.log(error);
                    return;
                }
                res.render('profile', {data: user, 
                    bills:results, 
                    repairs:repairsResults,
                    rents:rentResults});
            });
        });
    });
}

exports.billDetails = (req, res) => {
    const { id } = req.params;
    connection.query('SELECT b.product_sku, p.product_category, p.product_name, b.product_price, b.payment_date \
    FROM bills_details b join products p on p.product_sku = b.product_sku  where id = ?', 
    [id], (error, results) => {
        if(error) {
            console.log(error);
            return;
        }
        const paymentDate = (`${results[0].payment_date}`.split(':'))[0].split(' ').slice(1, 4).join(' ');
        let totalPrice = 0;
        results.forEach(({product_price}) => {totalPrice += product_price;});
        res.render('bill-details', 
        {data: results, 
        total:totalPrice, 
        rut:req.user.rut, 
        username:req.user.username, 
        billId: id,
        date: paymentDate});
    });
}