// Import packages and Models
const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');

// The `/api/products` endpoint

// get all products
router.get('/', async (req, res) => {
  // find all products
  // be sure to include its associated Category and Tag data
  try {
    const productData = await Product.findAll();

    res.status(200).json(productData);
  } catch (err) {
      res.status(500).json(err);
  }
});

// get one product
router.get('/:id', async (req, res) => {
  // find a single product by its `id`
  // be sure to include its associated Category and Tag data
  try {
    // Finds the data by the primary key entered in the url
    const productData = await Product.findByPk(req.params.id, {
      // Includes data from the Category and Tag models
      include: [
        {model: Category}, 
        {model: Tag}
      ]
    })

    // If no product data entered...
    if (!productData) {
      // Throw a 404 status code error with the custom message
      res.status(404).json({ message: "There are no products with this id!"});
      return;
    }
    // Throw a 200 status code if product data went through successfully
    res.status(200).json(productData);
  } catch (err) {
    // Throw a 500 status code error if there was an error in the route
      res.status(500).json(err);
  }
});

// create new product
router.post('/', (req, res) => {
  /* req.body should look like this...
    {
      product_name: "Basketball",
      price: 200.00,
      stock: 3,
      tagIds: [1, 2, 3, 4]
    }
  */

    // Create 
  Product.create(req.body)
    .then((product) => {
      // if there's product tags, we need to create pairings to bulk create in the ProductTag model
      if (req.body.tagIds.length) {
        const productTagIdArr = req.body.tagIds.map((tag_id) => {
          return {
            product_id: product.id,
            tag_id,
          };
        });
        return ProductTag.bulkCreate(productTagIdArr);
      }
      // if no product tags, just respond
      res.status(200).json(product);
    })
    .then((productTagIds) => res.status(200).json(productTagIds))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

// update product
router.put('/:id', (req, res) => {
  // update product data
  Product.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((product) => {
      // find all associated tags from ProductTag
      return ProductTag.findAll({ where: { product_id: req.params.id } });
    })
    .then((productTags) => {
      // get list of current tag_ids
      const productTagIds = productTags.map(({ tag_id }) => tag_id);
      // create filtered list of new tag_ids
      const newProductTags = req.body.tagIds
        .filter((tag_id) => !productTagIds.includes(tag_id))
        .map((tag_id) => {
          return {
            product_id: req.params.id,
            tag_id,
          };
        });
      // figure out which ones to remove
      const productTagsToRemove = productTags
        .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
        .map(({ id }) => id);

      // run both actions
      return Promise.all([
        ProductTag.destroy({ where: { id: productTagsToRemove } }),
        ProductTag.bulkCreate(newProductTags),
      ]);
    })
    .then((updatedProductTags) => res.json(updatedProductTags))
    .catch((err) => {
      // console.log(err);
      res.status(400).json(err);
    });
});

router.delete('/:id', async(req, res) => {
  // delete one product by its `id` value
  try {
    // Delete the data using the id entered in the URL
    const productData = await Product.destroy({
      where: {
        id: req.params.id,
      }
    })

    // If no key provided...
    if(!productData) {
      // Throw a 404 status code error
      res.status(404).json({ message: 'There is no such product with this id!' });
      return;
    }
    // If successful, throw a 200 status code
    res.status(200).json(productData);
  } catch (err) {
    // Throw a 500 status code error if error in route
      res.status(500).json(err);
  }
});

// Export routes
module.exports = router;
