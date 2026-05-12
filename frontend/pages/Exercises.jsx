import { useEffect, useState } from "react";
import { createExercise, getExercises } from "../services/exerciseService";

function Exercises() {
  const [exercises, setExercises] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    muscleGroup: "",
    equipment: "",
    notes: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const muscleGroups = [
    "Chest",
    "Back",
    "Shoulders",
    "Biceps",
    "Triceps",
    "Legs",
    "Core",
    "Full Body",
    "Cardio",
  ];

  const fetchExercises = async () => {
    try {
      setLoading(true);
      const data = await getExercises();
      setExercises(data);
      setError("");
    } catch (err) {
      setError("Failed to load exercises");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExercises();
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.muscleGroup) {
      setError("Exercise name and muscle group are required");
      return;
    }

    try {
      await createExercise(formData);
      setFormData({
        name: "",
        muscleGroup: "",
        equipment: "",
        notes: "",
      });
      fetchExercises();
      setError("");
    } catch (err) {
      setError("Failed to create exercise");
    }
  };

  return (
    <main className="container page">
      <section className="hero">
        <h1>PumpingIron</h1>
        <p>Track exercises, workouts, and strength progress.</p>
      </section>

      <section className="grid">
        <div className="card">
          <h2>Add Exercise</h2>

          {error && <p className="error">{error}</p>}

          <form onSubmit={handleSubmit} className="form">
            <label>
              Exercise Name
              <input
                type="text"
                name="name"
                placeholder="e.g. Bench Press"
                value={formData.name}
                onChange={handleChange}
              />
            </label>

            <label>
              Muscle Group
              <select
                name="muscleGroup"
                value={formData.muscleGroup}
                onChange={handleChange}
              >
                <option value="">Select muscle group</option>
                {muscleGroups.map((group) => (
                  <option key={group} value={group}>
                    {group}
                  </option>
                ))}
              </select>
            </label>

            <label>
              Equipment
              <input
                type="text"
                name="equipment"
                placeholder="e.g. Barbell"
                value={formData.equipment}
                onChange={handleChange}
              />
            </label>

            <label>
              Notes
              <textarea
                name="notes"
                placeholder="Any useful notes"
                value={formData.notes}
                onChange={handleChange}
              />
            </label>

            <button type="submit">Add Exercise</button>
          </form>
        </div>

        <div className="card">
          <h2>Exercise Library</h2>

          {loading ? (
            <p>Loading exercises...</p>
          ) : exercises.length === 0 ? (
            <p>No exercises added yet.</p>
          ) : (
            <div className="exercise-list">
              {exercises.map((exercise) => (
                <div className="exercise-card" key={exercise._id}>
                  <h3>{exercise.name}</h3>
                  <p>
                    <strong>Muscle:</strong> {exercise.muscleGroup}
                  </p>
                  <p>
                    <strong>Equipment:</strong> {exercise.equipment || "None"}
                  </p>
                  {exercise.notes && <p>{exercise.notes}</p>}
                  <small>
                    Created:{" "}
                    {new Date(exercise.createdAt).toLocaleDateString()}
                  </small>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

export default Exercises;