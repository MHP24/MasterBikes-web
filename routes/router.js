const express = require('express');
const router = express.Router();
// const connection = require('../database/db.js');
const authController = require('../controllers/authController.js');
const productController = require('../controllers/productController.js');
const shoppingCartController = require('../controllers/shoppingCartController.js');
const profileController = require('../controllers/profileController.js');
const requestController = require('../controllers/requestController.js')
// Router Views
router.get('/', authController.isAuthenticated, (req, res) => {
    res.render('index', {alert:false});
});

router.get('/login', (req, res) => {
    res.render('login', {alert:false});
});

router.get('/register', (req, res) => {
    res.render('register');
});

router.get('/servicios', (req, res) => {
    res.render('services');
});

router.get('/servicios/arrendar', (req, res) => {
    res.render('rent-form', {alert:false});
});

router.get('/nosotros', (req, res) => {
    res.render('about');
});

router.get('/contacto', (req, res) => {
    res.render('contact');
});

router.get('/add/:productSku', authController.isAuthenticated, (req, res) => {
    const { id } = req.user;
    const { productSku } = req.params;
    shoppingCartController.addToCart(productSku, id);    
    res.redirect(`/catalogo/${productSku}`);
});

router.get('/success/:billId', authController.isAuthenticated, (req, res) => {
    res.render('success', {id: req.params.billId});
});

//Method views controller
router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/logout', authController.logout);
router.get('/catalogo', productController.loadProducts);
router.get('/catalogo/:productSku', productController.loadProduct);
router.post('/search', productController.searchProduct);
router.get('/categorias/:category', productController.searchByCategory);
router.get('/categorias/catalogo/:productSku', productController.loadProduct);
router.get('/carrito', authController.isAuthenticated, shoppingCartController.getCart);
router.get('/remove/:productId', authController.isAuthenticated, shoppingCartController.remove);
router.get('/payment', authController.isAuthenticated, shoppingCartController.pay);
router.get('/perfil', authController.isAuthenticated, profileController.profile);
router.get('/detalles/:id', authController.isAuthenticated, profileController.billDetails);
router.post('/send', authController.isAuthenticated, requestController.contact)
router.post('/rent', authController.isAuthenticated, requestController.rent);
router.get('/servicios/reparaciones', authController.isAuthenticated, requestController.loadSchedule);
router.post('/repair', authController.isAuthenticated, requestController.addRepair);
module.exports = router;