const express = require('express');
const router = express.Router();

const getAllUsers = (req, res) => {
  res.status(500).json({
    status: 'Error',
    message: 'The route is not defined',
  });
};

const addUser = (req, res) => {
  res.status(500).json({
    status: 'Error',
    message: 'The route is not defined',
  });
};

const getUser = (req, res) => {
  res.status(500).json({
    status: 'Error',
    message: 'The route is not defined',
  });
};

const updateUser = (req, res) => {
  res.status(500).json({
    status: 'Error',
    message: 'The route is not defined',
  });
};

const deleteUser = (req, res) => {
  res.status(500).json({
    status: 'Error',
    message: 'The route is not defined',
  });
};

router.route('/').get(getAllUsers).post(addUser);
router.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);

module.exports = router;
