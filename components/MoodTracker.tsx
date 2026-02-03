import { useState, useEffect } from 'react';
import { Smile, Meh, Frown, CloudRain, Sun } from 'lucide-react';

type MoodLevel = 1 | 2 | 3 | 4 | 5;

interface MoodEntry {
  date: string;
  mood: MoodLevel;
  note?: string;
}

const moodOptions = [
  { level: 1 as MoodLevel, icon: CloudRain, label: 'Very Low', color: 'from-gray-400 to-gray-500' },
  { level: 2 as MoodLevel, icon: Frown, label: 'Low', color: 'from-blue-400 to-blue-500' },
  { level: 3 as MoodLevel, icon: Meh, label: 'Okay', color: 'from-yellow-400 to-yellow-500' },
  { level: 4 as MoodLevel, icon: Smile, label: 'Good', color: 'from-green-400 to-green-500' },
  { level: 5 as MoodLevel, icon: Sun, label: 'Great', color: 'from-orange-400 to-orange-500' },
];

export function MoodTracker() {
  const [moods, setMoods] = useState<MoodEntry[]>([]);
  const [selectedMood, setSelectedMood] = useState<MoodLevel | null>(null);
  const [note, setNote] = useState('');
  const [todayLogged, setTodayLogged] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('moodEntries');
    if (stored) {
      const parsed = JSON.parse(stored);
      setMoods(parsed);
      
      const today = new Date().toDateString();
      const todayEntry = parsed.find((entry: MoodEntry) => new Date(entry.date).toDateString() === today);
      if (todayEntry) {
        setTodayLogged(true);
        setSelectedMood(todayEntry.mood);
        setNote(todayEntry.note || '');
      }
    }
  }, []);

  const saveMood = () => {
    if (!selectedMood) return;

    const today = new Date().toDateString();
    const newEntry: MoodEntry = {
      date: new Date().toISOString(),
      mood: selectedMood,
      note: note.trim() || undefined,
    };

    const updatedMoods = moods.filter(m => new Date(m.date).toDateString() !== today);
    updatedMoods.unshift(newEntry);
    
    setMoods(updatedMoods);
    localStorage.setItem('moodEntries', JSON.stringify(updatedMoods));
    setTodayLogged(true);
  };

  const recentMoods = moods.slice(0, 7);

  return (
    <div className="space-y-6">
      {/* Today's Mood */}
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">How are you feeling today?</h2>
        
        <div className="grid grid-cols-5 gap-3 mb-4">
          {moodOptions.map((option) => {
            const Icon = option.icon;
            return (
              <button
                key={option.level}
                onClick={() => setSelectedMood(option.level)}
                className={`flex flex-col items-center gap-2 p-4 rounded-xl transition-all ${
                  selectedMood === option.level
                    ? `bg-gradient-to-br ${option.color} text-white shadow-md scale-105`
                    : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Icon className="w-8 h-8" />
                <span className="text-xs">{option.label}</span>
              </button>
            );
          })}
        </div>

        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Add a note about your day (optional)..."
          className="w-full px-4 py-3 border border-gray-200 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-purple-400"
          rows={3}
        />

        <button
          onClick={saveMood}
          disabled={!selectedMood}
          className="mt-4 w-full py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg transition-all"
        >
          {todayLogged ? 'Update Today\'s Mood' : 'Save Mood'}
        </button>
      </div>

      {/* Mood History */}
      {recentMoods.length > 0 && (
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h3 className="font-semibold text-gray-800 mb-4">Recent History</h3>
          <div className="space-y-3">
            {recentMoods.map((entry, index) => {
              const moodOption = moodOptions.find(m => m.level === entry.mood);
              const Icon = moodOption?.icon || Meh;
              const date = new Date(entry.date);
              const isToday = date.toDateString() === new Date().toDateString();
              
              return (
                <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className={`p-2 rounded-lg bg-gradient-to-br ${moodOption?.color}`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-gray-800">
                        {isToday ? 'Today' : date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                      </span>
                      <span className="text-sm text-gray-500">• {moodOption?.label}</span>
                    </div>
                    {entry.note && <p className="text-sm text-gray-600 mt-1">{entry.note}</p>}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
