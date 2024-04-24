const router = require('express').Router();

const {
  getUsers,
  getOneUser,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  deleteFriend,
} = require('../../controllers/user');

// /api/user
router.route('/').get(getUsers).post(createUser);

// /api/userId
router.route('/:userId').get(getOneUser).put(updateUser).post(addFriend).delete(deleteUser);

// /api/friends
router.route('/:userId/friends').post(addFriend);

// /api/friendsId
router.route('/:userId/friends/:friendId').delete(deleteFriend);

module.exports = router;
