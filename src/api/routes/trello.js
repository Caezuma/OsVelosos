const express = require('express');
const router = express.Router();
const boardController = require('../controllers/boardController');
const checklistController = require('../controllers/checklistController');
const labelController = require('../controllers/labelController');
const listController = require('../controllers/listController');
const commentController = require('../controllers/commentController');

router.post('/boards', boardController.createBoard);
router.delete('/boards/:boardId', boardController.deleteBoard);
router.get('/checklists/:checklistId', checklistController.getChecklist);
router.get('/labels/:labelId', labelController.getLabel);
router.put('/lists/:listId', listController.updateList);
router.post('/cards/:cardId/comments', commentController.createComment);  
router.delete('/cards/:cardId/comments/:commentId', commentController.deleteComment);

module.exports = router;
