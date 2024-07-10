const express = require('express');
const { verify } = require('../auth');
const workoutController = require('../controllers/workout');

const router = express.Router();

router.post('/addWorkout', verify, workoutController.addWorkout);
router.get('/getMyWorkouts', verify, workoutController.getAllWorkoutsByUser);
router.patch('/updateWorkout/:id', verify, workoutController.updateWorkout);
router.delete('/deleteWorkout/:id', verify, workoutController.deleteWorkout);
router.patch('/completeWorkoutStatus/:id', verify, workoutController.completeWorkout);

module.exports = router;