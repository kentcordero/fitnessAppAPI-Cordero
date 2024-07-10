const User = require('../models/User');
const Workout = require('../models/Workout');

module.exports.addWorkout = (req, res) => {
    const user = User.findById(req.user.id).then(user => user);

    if (!user) {
        return res.status(404).send('User not found');
    }

    let newWorkout = new Workout({
        userId: req.user.id,
		name: req.body.name,
        duration: req.body.duration
	});

	if (!req.body.name) {
	    return res.status(400).send({ error: 'Name is required.' });
	} else {
		return newWorkout.save().then(workout => res.status(201).send(workout)).catch(saveErr => {

			console.error('Error in saving the user: ', saveErr);

			return res.status(500).send({ error: 'Error in Save' });
		})
	}
};

module.exports.getAllWorkoutsByUser = async (req, res) => {
    console.log(req.user.id);
    const user = User.findById(req.user.id).then(user => user);

    if (!user) {
        return res.status(404).send('User not found');
    }

    try {
        const workouts = await Workout.find({ userId: req.user.id }).then(workouts => workouts);
        return res.status(200).send({ workouts });
    } catch (err) {
        console.error('Error in finding workouts:', err);
        return res.status(400).send({ error: 'Error in finding workouts' });
    }
}

module.exports.updateWorkout = async (req, res) => {
    const user = User.findById(req.user.id).then(user => user);

    if (!user) {
        return res.status(404).send('User not found');
    }

    const workoutId = req.params.id;
    const { name, duration } = req.body;

    try {
        const updatedWorkout = await Workout.findByIdAndUpdate(
            workoutId,
            { name, duration },
            { new: true }
        ).then((workout) => {
            console.log(workout);
            return workout
        });

        return res.status(200).send({ message: 'Workout updated successfully', updatedWorkout })
    } catch (err) {
        console.error('Error in updating workout:', err);
        return res.status(400).send({ error: 'Error in updating workout' });
    }
}

module.exports.deleteWorkout = (req, res) => {
    const user = User.findById(req.user.id).then(user => user);

    if (!user) {
        return res.status(404).send('User not found');
    }

    try {
        const deletedWorkout = Workout.deleteOne({ '_id': req.params.id });

        return res.status(200).send({ message: 'Workout deleted successfully' })

    } catch (err) {
        console.error('Error in deleting workout:', err);
        return res.status(400).send({ error: 'Error in deleting workout' });
    }
}

module.exports.completeWorkout = async (req, res) => {
    const user = User.findById(req.user.id).then(user => user);

    if (!user) {
        return res.status(404).send('User not found');
    }
    const workoutId = req.params.id;

    try {
        const updatedStatus = await Workout.findByIdAndUpdate(
            workoutId,
            { status: 'completed' },
            { new: true }
        )

        return res.status(200).send({ message: 'Workout status updated successfully', updatedWorkout: updatedStatus })


    } catch (err) {
        console.error('Error in completing workout:', err);
        return res.status(400).send({ error: 'Error in completing workout' });
    }
}