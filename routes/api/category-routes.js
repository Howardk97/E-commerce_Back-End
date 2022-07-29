// Import packages and Models
const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    // Find all of the category data
    const categoryData = await Category.findAll({
      include: [Product]
    });
    // Send a 200 status code if route was a success
    res.status(200).json(categoryData);

  } catch (err) {
    // Send a 500 status code error if something went wrong in route
    console.log(err);
    res.status(500).json(err)
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    // Find rows of the category data based on 
    const categoryData = await Category.findByPk(req.params.id, {
      include: [Product ]
    })

    // If no category data with the correct id is entered, send a 404 status code error
    if (!categoryData) {
      res.status(404).json({ message: 'There is no category with this id!'})
    }

    // If a success, send a 200 status code
    res.status(200).json(categoryData);
  } catch (err) {
      // If something went wrong, send a 500 status code error
      console.log(err);
      res.status(500).json(categoryData);
  }
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const categoryData = await Category.create(req.body);

    // If a success, send a 200 status code
    res.status(200).json(categoryData);
  } catch (err) {
      // If err, send a 400 status code error
      console.log(err);
      res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    // Update the category data based on the id of the row
    const categoryData = await Category.update(
      req.body, {
        where: {
          id: req.params.id,
        },
      })

      // If no id is entered, throw a 400 status code error
      if (!categoryData) {
        res.status(400).json({ message: 'There is no such category with this id!'});
        return;
      }

    // If all succeeds, throw a 200 status code
    res.status(200).json(categoryData);
  } catch (err) {
    // If there is an error in the route, throw a 500 status code error
    console.log(err);
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    // Delted a row in category data based on it's id value
    const categoryData = await Category.destroy({
      where: {
        id: req.params.id,
      }
    })
    if (!categoryData) {
      // If no id is given, throw a 404 status code error with custom message
      res.status(404).json({ message: 'There is no such category with this id!'});
      return;
    }
    // If route is successful, throw a 200 status code
    res.status(200).json(categoryData);
  } catch (err) {
      // If something goes wrong in route, throw a 500 status code error
      res.status(500).json(err);
  }
});

// export routes
module.exports = router;
