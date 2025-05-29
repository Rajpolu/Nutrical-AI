
export interface Exercise {
  id: string;
  name: string;
  description: string;
  icon: string;
  targetMuscles: string[];
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  estimatedCalories: number;
}

export interface PoseKeypoint {
  x: number;
  y: number;
  z?: number;
  visibility?: number;
}

export interface PoseDetection {
  keypoints: PoseKeypoint[];
  confidence: number;
}
