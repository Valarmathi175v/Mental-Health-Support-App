import { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw } from 'lucide-react';

type Phase = 'inhale' | 'hold' | 'exhale' | 'rest';

export function BreathingExercise() {
  const [isActive, setIsActive] = useState(false);
  const [phase, setPhase] = useState<Phase>('inhale');
  const [count, setCount] = useState(4);
  const [cycles, setCycles] = useState(0);
  const timerRef = useRef<number>();

  const exercises = [
    { name: '4-7-8 Breathing', inhale: 4, hold: 7, exhale: 8, rest: 0, description: 'Calming technique for anxiety' },
    { name: 'Box Breathing', inhale: 4, hold: 4, exhale: 4, rest: 4, description: 'Used by Navy SEALs for focus' },
    { name: 'Simple Deep Breathing', inhale: 4, hold: 2, exhale: 6, rest: 0, description: 'Easy stress relief' },
  ];

  const [selectedExercise, setSelectedExercise] = useState(exercises[0]);

  useEffect(() => {
    if (isActive) {
      timerRef.current = window.setInterval(() => {
        setCount((prev) => {
          if (prev <= 1) {
            // Move to next phase
            if (phase === 'inhale') {
              setPhase('hold');
              return selectedExercise.hold;
            } else if (phase === 'hold') {
              setPhase('exhale');
              return selectedExercise.exhale;
            } else if (phase === 'exhale') {
              if (selectedExercise.rest > 0) {
                setPhase('rest');
                return selectedExercise.rest;
              } else {
                setPhase('inhale');
                setCycles((c) => c + 1);
                return selectedExercise.inhale;
              }
            } else {
              setPhase('inhale');
              setCycles((c) => c + 1);
              return selectedExercise.inhale;
            }
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isActive, phase, selectedExercise]);

  const reset = () => {
    setIsActive(false);
    setPhase('inhale');
    setCount(selectedExercise.inhale);
    setCycles(0);
  };

  const toggleActive = () => {
    if (!isActive && phase === 'inhale' && count === selectedExercise.inhale) {
      // Starting fresh
      setCycles(0);
    }
    setIsActive(!isActive);
  };

  const getPhaseColor = () => {
    switch (phase) {
      case 'inhale': return 'from-blue-400 to-blue-600';
      case 'hold': return 'from-yellow-400 to-yellow-600';
      case 'exhale': return 'from-green-400 to-green-600';
      case 'rest': return 'from-purple-400 to-purple-600';
    }
  };

  const getPhaseText = () => {
    switch (phase) {
      case 'inhale': return 'Breathe In';
      case 'hold': return 'Hold';
      case 'exhale': return 'Breathe Out';
      case 'rest': return 'Rest';
    }
  };

  return (
    <div className="space-y-6">
      {/* Exercise Selection */}
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <h3 className="font-semibold text-gray-800 mb-4">Choose an Exercise</h3>
        <div className="grid gap-3">
          {exercises.map((exercise) => (
            <button
              key={exercise.name}
              onClick={() => {
                setSelectedExercise(exercise);
                reset();
                setCount(exercise.inhale);
              }}
              className={`text-left p-4 rounded-xl transition-all ${
                selectedExercise.name === exercise.name
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-md'
                  : 'bg-gray-50 hover:bg-gray-100'
              }`}
            >
              <div className="font-medium">{exercise.name}</div>
              <div className={`text-sm mt-1 ${selectedExercise.name === exercise.name ? 'text-white/80' : 'text-gray-500'}`}>
                {exercise.description}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Breathing Circle */}
      <div className="bg-white rounded-2xl p-8 shadow-sm">
        <div className="flex flex-col items-center">
          <div className="relative w-64 h-64 flex items-center justify-center">
            {/* Animated Circle */}
            <div
              className={`absolute w-full h-full rounded-full bg-gradient-to-br ${getPhaseColor()} transition-all duration-1000 ${
                isActive ? 'scale-100 opacity-30' : 'scale-75 opacity-20'
              } ${phase === 'inhale' && isActive ? 'scale-110' : ''} ${phase === 'exhale' && isActive ? 'scale-75' : ''}`}
            />
            
            {/* Content */}
            <div className="relative z-10 text-center">
              <div className={`text-6xl font-bold bg-gradient-to-br ${getPhaseColor()} bg-clip-text text-transparent`}>
                {count}
              </div>
              <div className="mt-2 text-lg font-medium text-gray-600">
                {getPhaseText()}
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="flex gap-3 mt-8">
            <button
              onClick={toggleActive}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-medium hover:shadow-lg transition-all"
            >
              {isActive ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
              {isActive ? 'Pause' : 'Start'}
            </button>
            <button
              onClick={reset}
              className="flex items-center gap-2 px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-all"
            >
              <RotateCcw className="w-5 h-5" />
              Reset
            </button>
          </div>

          {/* Cycles Counter */}
          <div className="mt-6 text-sm text-gray-500">
            Completed cycles: {cycles}
          </div>
        </div>
      </div>

      {/* Benefits */}
      <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-6">
        <h3 className="font-semibold text-gray-800 mb-3">Benefits of Breathing Exercises</h3>
        <ul className="space-y-2 text-sm text-gray-700">
          <li className="flex items-start gap-2">
            <span className="text-purple-500 mt-1">•</span>
            <span>Reduces stress and anxiety</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-purple-500 mt-1">•</span>
            <span>Improves focus and mental clarity</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-purple-500 mt-1">•</span>
            <span>Lowers heart rate and blood pressure</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-purple-500 mt-1">•</span>
            <span>Promotes better sleep</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
