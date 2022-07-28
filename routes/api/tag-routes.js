// Import packages and Models
const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    // Finds all of the Tag data
    const tagData = await Tag.findAll();

    // If no errors, throw a 200 status code
    res.status(200).json(tagData);
  } catch (err) {
    // If errors, throw a 500 status code error
      res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  try {
    // Get tag data for id specified by the URL parameter
    const tagData = await Tag.findByPk(req.params.id)

    // If successful, throw a 200 status code
    res.status(200).json(tagData);
  } catch (err) {
    // If error, throw a 500 status code error
    res.status(500).json(err);
  }
  // be sure to include its associated Product data
  
});

router.post('/', async (req, res) => {
  // create a new tag
  try {
    // Create a new tag
    const tagData = await Tag.create(req.body);

    // If no tag data entered by user...
    if(!tagData) {
      // Throw a 404 status code error with the custom message
      res.status(404).json({ message: "There was no tag data entered!"});
      return;
    }

    // If successful, throw a 200 status code
    res.status(200).json(tagData);
  } catch (err) {
    // If error, throw a 500 status code error
    res.status(500).status(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
    // Update tag by id
    const tagData = await Tag.update(req.body, {
      where: {
        id: req.params.id,
      }
    })

    // If no tag data entered by user...
    if(!tagData) {
      // Throw a 404 status code error with the custom message
      res.status(404).json({ message: "There is no tag data with this id!" });
      return;
    }

    // If successful, throw a 200 status code
    res.status(200).json(tagData);
  } catch (err) {
      // If error, throw a 500 status code error
      res.status(500).json(err);
  }
});

router.delete('/:id', async(req, res) => {
  // delete on tag by its `id` value
  try{
      // Delete a tag by its id
    const tagData = await Tag.destroy({
      where: {
        id: req.params.id,
    }
  });

  // If no tagData is entered by user...
  if(!tagData) {
    // Throw a 404 status code error with custom message
    res.status(404).json({ message: "There is no tag data with this id!" });
    return;
  }

  // If successful, throw a 200 status code
  res.status(200).json(tagData);
  } catch(err) {
    // If error, throw a 500 status code error
    res.status(500).json(err);
  }
});

// Export routes
module.exports = router;
