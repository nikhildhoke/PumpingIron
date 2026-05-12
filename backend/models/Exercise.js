const mongoose = require('mongoose');

const exerciseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  muscleGroup: {
    type: String,
    required: true,
    enum: ['Chest', 'Back', 'Legs', 'Biceps', 'Triceps', 'Shoulders', 'Core', 'Cardio', 'Full Body'],
  },
  equipment: {
    type: String,
    default: 'None',
  },
  notes: {
    type: String,
    default: '',
    trim: true,
  },
},   
{
    timestamps: true,
    versionKey: false,
});

const Exercise = mongoose.model('Exercise', exerciseSchema);

module.exports = Exercise; 