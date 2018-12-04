const express = require('express');

const router = express.Router();

const {
  getAllTennants, postNewTennant, deleteTennant, updateTennant 
} = require('../handlers/tennantHandler');

router.get('/:id/all', getAllTennants);
router.post('/:id/newTennant', postNewTennant);
router.delete('/:id/deleteTennant/:tennant', deleteTennant);
router.post('/:id/updateTennant/:tennant', updateTennant);


module.exports = router;

