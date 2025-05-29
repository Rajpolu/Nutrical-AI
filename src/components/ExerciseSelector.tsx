
import React from 'react';
import { Exercise } from '../types/workout';
import { Zap, Target, Flame } from 'lucide-react';

interface ExerciseSelectorProps {
  onSelectExercise: (exercise: Exercise) => void;
}

const exercises: Exercise[] = [
  {
    id: 'squats',
    name: 'Squats',
    description: 'Build leg strength and improve lower body power',
    icon: '🏋️',
    targetMuscles: ['Quadriceps', 'Glutes', 'Hamstrings'],
    difficulty: 'Beginner',
    estimatedCalories: 8
  },
  {
    id: 'pushups',
    name: 'Push-ups',
    description: 'Strengthen your chest, shoulders, and triceps',
    icon: '💪',
    targetMuscles: ['Chest', 'Shoulders', 'Triceps'],
    difficulty: 'Intermediate',
    estimatedCalories: 6
  },
  {
    id: 'lunges',
    name: 'Lunges',
    description: 'Improve balance and unilateral leg strength',
    icon: '🦵',
    targetMuscles: ['Quadriceps', 'Glutes', 'Calves'],
    difficulty: 'Beginner',
    estimatedCalories: 7
  },
  {
    id: 'jumping-jacks',
    name: 'Jumping Jacks',
    description: 'Full-body cardio exercise for endurance',
    icon: '🤸',
    targetMuscles: ['Full Body', 'Cardio'],
    difficulty: 'Beginner',
    estimatedCalories: 10
  }
];

const ExerciseSelector: React.FC<ExerciseSelectorProps> = ({ onSelectExercise }) => {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'text-green-400 bg-green-500/20';
      case 'Intermediate': return 'text-yellow-400 bg-yellow-500/20';
      case 'Advanced': return 'text-red-400 bg-red-500/20';
      default: return 'text-gray-400 bg-gray-500/20';
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-4xl font-bold text-white mb-4">Choose Your Exercise</h2>
        <p className="text-xl text-blue-200">Select an exercise to start your AI-powered workout</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {exercises.map((exercise) => (
          <div
            key={exercise.id}
            onClick={() => onSelectExercise(exercise)}
            className="group relative p-6 bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 hover:bg-white/20 transition-all duration-300 cursor-pointer hover:scale-105 hover:shadow-2xl"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            
            <div className="relative z-10">
              <div className="flex items-start justify-between mb-4">
                <div className="text-4xl">{exercise.icon}</div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(exercise.difficulty)}`}>
                  {exercise.difficulty}
                </span>
              </div>
              
              <h3 className="text-2xl font-bold text-white mb-2">{exercise.name}</h3>
              <p className="text-blue-200 mb-4">{exercise.description}</p>
              
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Target className="w-4 h-4 text-purple-400" />
                  <span className="text-sm text-gray-300">
                    {exercise.targetMuscles.join(', ')}
                  </span>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Flame className="w-4 h-4 text-orange-400" />
                  <span className="text-sm text-gray-300">
                    ~{exercise.estimatedCalories} cal/min
                  </span>
                </div>
              </div>
              
              <div className="mt-6 flex items-center justify-center">
                <div className="flex items-center space-x-2 text-white group-hover:text-blue-300 transition-colors">
                  <Zap className="w-5 h-5" />
                  <span className="font-medium">Start Exercise</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExerciseSelector;
