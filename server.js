const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const app = express();

app.use(morgan('dev'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const port = process.env.PORT || 8080;

// Connect to our database
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/foo');
const Product = require('./product');
const Category = require('./category');

const router = express.Router();

router.use((req, res, next) => {

  // Add CORS Headers, so browser will correctly handle responses
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
	next();
});

router.get('/', (req, res) => {
  res.json({ message: 'API for "my-app"' });
});

// Routes for products
router.route('/products')
	.post((req, res) => {
		const product = new Product();
		product.category = req.body.category;
		product.name = req.body.name;
		product.salePrice = req.body.salePrice;
		product.price = req.body.price;

		product.save((err) => {
			if (err) {
        res.send(err);
      }

      res.json({ message: 'Продукт успешно добавлен' });
		});
	})
	.get((req, res) => {
		Product.find({category: req.query.category_id}, (err, products) => {
			if (err) {
        res.send(err);
      }

			res.json(products);
		});
	});

router.route('/products/:product_id')
	.get((req, res) => {
		Product.find({id: req.params.product_id}, (err, product) => {
			if (err) {
        res.send(err);
      }

			res.json(product);
		});
	})
	.put((req, res) => {
		Product.find({id: req.params.product_id}, (err, product) => {
			if (err) {
        res.send(err);
      }

      product.category = req.body.category;
  		product.name = req.body.name;
  		product.salePrice = req.body.salePrice;
  		product.price = req.body.price;
			product.save((err) => {
				if (err) {
          res.send(err);
        }

				res.json({ message: 'Продукт успешно обновлён' });
			});

		});
	})
	.delete((req, res) => {
		Product.remove({
      id: req.params.product_id
		}, (err, product) => {
			if (err) {
        res.send(err);
      }

			res.json({ message: 'Продукт удалён' });
		});
	});

// Routes for categories
router.route('/categories')
	.post((req, res) => {
		const category = new Category();
		category.name = req.body.name;

		category.save(function(err) {
			if (err) {
        res.send(err);
      }

      res.json({ message: 'Категория успешно создана' });
		});
	})
	.get((req, res) => {
		Category.find(function(err, categories) {
			if (err) {
        res.send(err);
      }

			res.json(categories);
		});
	});

router.route('/categories/:category_id')
	.get((req, res) => {
		Category.findById(req.params.category_id, (err, category) => {
			if (err) {
        res.send(err);
      }

			res.json(category);
		});
	})
	.put((req, res) => {
		Category.findById(req.params.product_id, (err, category) => {
			if (err) {
        res.send(err);
      }

			category.name = req.body.name;
			category.save((err) => {
				if (err) {
          res.send(err);
        }

				res.json({ message: 'Категория изменена' });
			});

		});
	})
	.delete((req, res) => {
		Category.remove({
			_id: req.params.category_id
		}, (err, category) => {
			if (err) {
        res.send(err);
      }

			res.json({ message: 'Категория удалена' });
		});
	});

app.use('/api', router);

app.listen(port);
