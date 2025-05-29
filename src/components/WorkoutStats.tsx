
import React from 'react';
import { Exercise } from '../types/workout';
import { Clock, Zap, Target, ArrowLeft, Flame } from 'lucide-react';

interface WorkoutStatsProps {
  exercise: Exercise;
  reps: number;
  time: number;
  isActive: boolean;
  onBackToSelection: () => void;
}

const WorkoutStats: React.FC<WorkoutStatsProps> = ({
  exercise,
  reps,
  time,
  isActive,
  onBackToSelection
}) => {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const estimatedCalories = Math.round((time / 60) * exercise.estimatedCalories);
  const avgRepsPerMinute = time > 0 ? Math.round((reps / time) * 60) : 0;

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <button
        onClick={onBackToSelection}
        className="flex items-center space-x-2 text-blue-300 hover:text-white transition-colors duration-200"
      >
        <ArrowLeft className="w-5 h-5" />
        <span>Back to Exercises</span>
      </button>

      {/* Exercise Info */}
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 p-6">
        <div className="flex items-center space-x-3 mb-4">
          <div className="text-3xl">{exercise.icon}</div>
          <div>
            <h3 className="text-xl font-bold text-white">{exercise.name}</h3>
            <p className="text-blue-200 text-sm">{exercise.difficulty}</p>
          </div>
        </div>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-gray-300">Target Muscles</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {exercise.targetMuscles.map((muscle, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-purple-500/30 text-purple-200 rounded-full text-sm"
              >
                {muscle}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Real-time Stats */}
      <div className="space-y-4">
        <h4 className="text-lg font-semibold text-white">Workout Stats</h4>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gradient-to-r from-green-500/20 to-emerald-600/20 rounded-xl p-4 border border-green-500/30">
            <div className="flex items-center space-x-2 mb-2">
              <Zap className="w-5 h-5 text-green-400" />
              <span className="text-green-300 text-sm font-medium">Reps</span>
            </div>
            <div className="text-2xl font-bold text-white">{reps}</div>
          </div>
          
          <div className="bg-gradient-to-r from-blue-500/20 to-cyan-600/20 rounded-xl p-4 border border-blue-500/30">
            <div className="flex items-center space-x-2 mb-2">
              <Clock className="w-5 h-5 text-blue-400" />
              <span className="text-blue-300 text-sm font-medium">Time</span>
            </div>
            <div className="text-2xl font-bold text-white">{formatTime(time)}</div>
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-orange-500/20 to-red-600/20 rounded-xl p-4 border border-orange-500/30">
          <div className="flex items-center space-x-2 mb-2">
            <Flame className="w-5 h-5 text-orange-400" />
            <span className="text-orange-300 text-sm font-medium">Calories Burned</span>
          </div>
          <div className="text-2xl font-bold text-white">{estimatedCalories}</div>
        </div>
        
        <div className="bg-gradient-to-r from-purple-500/20 to-pink-600/20 rounded-xl p-4 border border-purple-500/30">
          <div className="flex items-center space-x-2 mb-2">
            <Target className="w-5 h-5 text-purple-400" />
            <span className="text-purple-300 text-sm font-medium">Avg RPM</span>
          </div>
          <div className="text-2xl font-bold text-white">{avgRepsPerMinute}</div>
        </div>
      </div>

      {/* Status Indicator */}
      <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4 border border-white/20">
        <div className="flex items-center space-x-3">
          <div className={`w-3 h-3 rounded-full ${isActive ? 'bg-green-400 animate-pulse' : 'bg-gray-400'}`}></div>
          <span className="text-white font-medium">
            {isActive ? 'Workout in Progress' : 'Workout Paused'}
          </span>
        </div>
      </div>

      {/* Tips */}
      <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4 border border-white/20">
        <h5 className="text-white font-medium mb-2">💡 Pro Tips</h5>
        <ul className="text-gray-300 text-sm space-y-1">
          <li>• Keep your body visible in frame</li>
          <li>• Maintain proper form for accurate counting</li>
          <li>• Ensure good lighting for best detection</li>
        </ul>
      </div>
    </div>
  );
};

export default WorkoutStats;
