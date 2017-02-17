const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const app = express();

app.use(morgan('dev'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const port = process.env.PORT || 8080;

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/foo');
const Product = require('./product');

const router = express.Router();

router.use((req, res, next) => {
	next();
});

router.get('/', (req, res) => {
  res.json({ message: 'API response' });
});

router.route('/products')
	.post((req, res) => {
		const product = new Product();
		product.name = req.body.name;
		product.salePrice = req.body.salePrice;
		product.price = req.body.price;

		product.save(function(err) {
			if (err) {
        res.send(err);
      }

      res.json({ message: 'Product created!' });
		});
	})
	.get((req, res) => {
		Product.find(function(err, products) {
			if (err) {
        res.send(err);
      }

			res.json(products);
		});
	});

router.route('/products/:product_id')
	.get((req, res) => {
		Product.findById(req.params.bear_id, (err, product) => {
			if (err) {
        res.send(err);
      }

			res.json(product);
		});
	})
	.put((req, res) => {
		Product.findById(req.params.product_id, (err, product) => {

			if (err) {
        res.send(err);
      }

			product.name = req.body.name;
			product.save(function(err) {
				if (err) {
          res.send(err);
        }

				res.json({ message: 'Product updated!' });
			});

		});
	})
	.delete((req, res) => {
		Product.remove({
			_id: req.params.product_id
		}, function(err, bear) {
			if (err) {
        res.send(err);
      }

			res.json({ message: 'Successfully deleted' });
		});
	});

app.use('/api', router);

app.listen(port);
console.log('Magic happens on port ' + port);
