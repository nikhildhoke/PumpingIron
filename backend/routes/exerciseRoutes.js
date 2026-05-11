const express = require('express');
const router = express.Router();
const {
    createExercise,
    getExercises,
    getExerciseById,
    updateExercise,
    deleteExercise
} = require('../controllers/exerciseController');

router.route('/').get(getExercises).post(createExercise);
router.route('/:id').get(getExerciseById).put(updateExercise).delete(deleteExercise);
module.exports = router;