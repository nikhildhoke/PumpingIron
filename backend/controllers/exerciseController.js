const exercise = require('../models/Exercise');

// Create a new exercise
exports.createExercise = async (req, res) => {
  try {
    const { name, muscleGroup, equipment, notes } = req.body;
    if (!name || !muscleGroup) {    
        return res.status(400).json({ 
            message: 'Name and muscle group are required' 
        });
    }
    const newExercise = await exercise.create({ name, muscleGroup, equipment, notes });
    res.status(201).json(exercise);
  } catch (error) {
    res.status(500).json({ message: "Failed to create exercise", error: error.message });
  }
};

// Get all exercises
exports.getExercises = async (req, res) => {
  try {
    const exercises = await exercise.find().sort({ createdAt: -1 });
    res.status(200).json(exercises);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch exercises", error: error.message });
  }
};

// Get a single exercise by ID
exports.getExerciseById = async (req, res) => {
  try {
    const exercise = await exercise.findById(req.params.id);     
    if (!exercise) {
      return res.status(404).json({ message: 'Exercise not found' });
    }
    res.status(200).json(exercise);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch exercise", error: error.message });
  }
};

// Update an exercise by ID
exports.updateExercise = async (req, res) => {
  try {
    const exerciseId = req.params.id;
    const { name, muscleGroup, equipment, notes } = req.body;
    const updatedExercise = await exercise.findByIdAndUpdate(
      exerciseId,
      { name, muscleGroup, equipment, notes },
      { new: true }
    );
    if (!updatedExercise) {
      return res.status(404).json({ message: 'Exercise not found' });
    }
    res.status(200).json(updatedExercise);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete an exercise by ID
exports.deleteExercise = async (req, res) => {
  try {
    const exerciseId = req.params.id;
    const deletedExercise = await exercise.findByIdAndDelete(exerciseId);
    if (!deletedExercise) {
      return res.status(404).json({ message: 'Exercise not found' });
    }
    await exercise.deleteOne();
    res.status(200).json({ message: 'Exercise deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete exercise", error: error.message });
  }
};

module.exports = {
  createExercise: exports.createExercise,
  getExercises: exports.getExercises,
  getExerciseById: exports.getExerciseById,
  updateExercise: exports.updateExercise,
  deleteExercise: exports.deleteExercise,
};  