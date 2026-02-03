import { useState, useEffect } from 'react';
import { MoodTracker } from './components/MoodTracker';
import { Journal } from './components/Journal';
import { BreathingExercise } from './components/BreathingExercise';
import { Resources } from './components/Resources';
import { Affirmations } from './components/Affirmations';
import { Heart, BookOpen, Wind, Lightbulb, Sparkles } from 'lucide-react';

type Tab = 'mood' | 'journal' | 'breathing' | 'affirmations' | 'resources';

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>('mood');

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-purple-100 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center">
              <Heart className="w-5 h-5 text-white fill-white" />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-gray-800">MindCare</h1>
              <p className="text-sm text-gray-500">Your daily mental wellness companion</p>
            </div>
          </div>
        </div>
      </header>

      {/* Disclaimer */}
      <div className="max-w-4xl mx-auto px-4 py-3">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-sm text-blue-800">
          <strong>Note:</strong> This app is a supportive tool and does not replace professional mental health care. If you're experiencing a crisis, please contact a mental health professional or emergency services.
        </div>
      </div>

      {/* Navigation Tabs */}
      <nav className="max-w-4xl mx-auto px-4 py-4">
        <div className="flex gap-2 overflow-x-auto pb-2">
          <TabButton
            active={activeTab === 'mood'}
            onClick={() => setActiveTab('mood')}
            icon={<Heart className="w-4 h-4" />}
            label="Mood"
          />
          <TabButton
            active={activeTab === 'journal'}
            onClick={() => setActiveTab('journal')}
            icon={<BookOpen className="w-4 h-4" />}
            label="Journal"
          />
          <TabButton
            active={activeTab === 'breathing'}
            onClick={() => setActiveTab('breathing')}
            icon={<Wind className="w-4 h-4" />}
            label="Breathe"
          />
          <TabButton
            active={activeTab === 'affirmations'}
            onClick={() => setActiveTab('affirmations')}
            icon={<Sparkles className="w-4 h-4" />}
            label="Affirmations"
          />
          <TabButton
            active={activeTab === 'resources'}
            onClick={() => setActiveTab('resources')}
            icon={<Lightbulb className="w-4 h-4" />}
            label="Resources"
          />
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 pb-8">
        {activeTab === 'mood' && <MoodTracker />}
        {activeTab === 'journal' && <Journal />}
        {activeTab === 'breathing' && <BreathingExercise />}
        {activeTab === 'affirmations' && <Affirmations />}
        {activeTab === 'resources' && <Resources />}
      </main>
    </div>
  );
}

function TabButton({ active, onClick, icon, label }: { active: boolean; onClick: () => void; icon: React.ReactNode; label: string }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap transition-all ${
        active
          ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-md'
          : 'bg-white text-gray-600 hover:bg-gray-50'
      }`}
    >
      {icon}
      <span className="text-sm font-medium">{label}</span>
    </button>
  );
}
