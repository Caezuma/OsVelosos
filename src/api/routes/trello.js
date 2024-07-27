const express = require('express');
const router = express.Router();
const boardController = require('../controllers/boardController');
const checklistController = require('../controllers/checklistController');
const labelController = require('../controllers/labelController');
const listController = require('../controllers/listController');
const commentController = require('../controllers/commentController');

router.post('/boards', boardController.createBoard);
router.get('/boards/:boardId', boardController.getBoard);
router.get('/boards/:boardId/actions', boardController.getBoardActions);
router.put('/boards/:boardId', boardController.updateBoard);
router.delete('/boards/:boardId', boardController.deleteBoard);

router.post('/checklists', checklistController.createChecklist);
router.get('/checklists/:checklistId', checklistController.getChecklist);
router.put('/checklists/:checklistId', checklistController.updateChecklist);
router.delete('/checklists/:checklistId', checklistController.deleteChecklist);

router.post('/labels', labelController.createLabel);
router.get('/labels/:labelId', labelController.getLabel);
router.put('/labels/:labelId', labelController.updateLabel);
router.delete('/labels/:labelId', labelController.deleteLabel);

router.post('/lists', listController.createList);
router.get('/lists/:listId', listController.getList);
router.put('/lists/:listId', listController.updateList);
router.delete('/lists/:listId', listController.deleteList);

router.post('/cards/:cardId/comments', commentController.createComment);  
router.get('/cards/:cardId/comments/:commentId', commentController.getComment);
router.put('/cards/:cardId/comments/:commentId', commentController.updateComment);
router.delete('/cards/:cardId/comments/:commentId', commentController.deleteComment);

module.exports = router;
