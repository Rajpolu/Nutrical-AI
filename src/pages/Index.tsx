
import React, { useState } from 'react';
import { Camera, Play, Pause, RotateCcw, Target, Coffee, Github } from 'lucide-react';
import WorkoutCamera from '../components/WorkoutCamera';
import ExerciseSelector from '../components/ExerciseSelector';
import WorkoutStats from '../components/WorkoutStats';
import { Exercise } from '../types/workout';

const Index = () => {
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);
  const [isWorkoutActive, setIsWorkoutActive] = useState(false);
  const [reps, setReps] = useState(0);
  const [workoutTime, setWorkoutTime] = useState(0);

  const handleStartWorkout = () => {
    setIsWorkoutActive(true);
    setReps(0);
    setWorkoutTime(0);
  };

  const handleStopWorkout = () => {
    setIsWorkoutActive(false);
  };

  const handleResetWorkout = () => {
    setReps(0);
    setWorkoutTime(0);
    setIsWorkoutActive(false);
  };

  const handleRepCount = () => {
    setReps(prev => prev + 1);
  };

  const handleBuyMeACoffee = () => {
    window.open('https://www.buymeacoffee.com/yourprofile', '_blank');
  };

  const handleGitHub = () => {
    window.open('https://github.com/yourusername/nutrical-ai', '_blank');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      {/* Header */}
      <div className="relative z-10 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-pink-500 rounded-xl flex items-center justify-center">
                <Target className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white">Nutrical AI</h1>
                <p className="text-blue-200">Smart Fitness Tracking</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              {/* GitHub Button */}
              <button
                onClick={handleGitHub}
                className="flex items-center space-x-2 px-4 py-2 bg-gray-800 text-white rounded-xl font-medium hover:bg-gray-700 transition-all duration-200 shadow-lg"
              >
                <Github className="w-5 h-5" />
                <span>GitHub</span>
              </button>

              {/* Buy Me a Coffee Button */}
              <button
                onClick={handleBuyMeACoffee}
                className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-xl font-medium hover:from-yellow-600 hover:to-orange-600 transition-all duration-200 shadow-lg"
              >
                <Coffee className="w-5 h-5" />
                <span>Buy Me a Coffee</span>
              </button>

              {selectedExercise && (
                <>
                  <button
                    onClick={isWorkoutActive ? handleStopWorkout : handleStartWorkout}
                    className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-medium hover:from-green-600 hover:to-emerald-700 transition-all duration-200 shadow-lg"
                  >
                    {isWorkoutActive ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                    <span>{isWorkoutActive ? 'Pause' : 'Start'}</span>
                  </button>
                  
                  <button
                    onClick={handleResetWorkout}
                    className="flex items-center space-x-2 px-4 py-3 bg-gray-700 text-white rounded-xl font-medium hover:bg-gray-600 transition-colors duration-200"
                  >
                    <RotateCcw className="w-5 h-5" />
                    <span>Reset</span>
                  </button>
                </>
              )}
            </div>
          </div>

          {!selectedExercise ? (
            <ExerciseSelector onSelectExercise={setSelectedExercise} />
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {/* Camera Feed */}
              <div className="lg:col-span-3">
                <WorkoutCamera
                  exercise={selectedExercise}
                  isActive={isWorkoutActive}
                  onRepCount={handleRepCount}
                  onTimeUpdate={setWorkoutTime}
                />
              </div>
              
              {/* Stats Panel */}
              <div className="lg:col-span-1">
                <WorkoutStats
                  exercise={selectedExercise}
                  reps={reps}
                  time={workoutTime}
                  isActive={isWorkoutActive}
                  onBackToSelection={() => setSelectedExercise(null)}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
