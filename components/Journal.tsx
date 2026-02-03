import { useState, useEffect } from 'react';
import { Plus, Trash2, Calendar } from 'lucide-react';

interface JournalEntry {
  id: string;
  date: string;
  content: string;
}

export function Journal() {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [isWriting, setIsWriting] = useState(false);
  const [currentEntry, setCurrentEntry] = useState('');

  useEffect(() => {
    const stored = localStorage.getItem('journalEntries');
    if (stored) {
      setEntries(JSON.parse(stored));
    }
  }, []);

  const saveEntry = () => {
    if (!currentEntry.trim()) return;

    const newEntry: JournalEntry = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      content: currentEntry.trim(),
    };

    const updated = [newEntry, ...entries];
    setEntries(updated);
    localStorage.setItem('journalEntries', JSON.stringify(updated));
    setCurrentEntry('');
    setIsWriting(false);
  };

  const deleteEntry = (id: string) => {
    const updated = entries.filter(e => e.id !== id);
    setEntries(updated);
    localStorage.setItem('journalEntries', JSON.stringify(updated));
  };

  const prompts = [
    "What's one thing I'm grateful for today?",
    "What emotions am I experiencing right now?",
    "What's a small win I had today?",
    "What's been on my mind lately?",
    "What would make tomorrow better?",
  ];

  return (
    <div className="space-y-6">
      {/* Writing Prompts */}
      <div className="bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl p-6">
        <h3 className="font-semibold text-gray-800 mb-3">Writing Prompts</h3>
        <div className="space-y-2">
          {prompts.slice(0, 3).map((prompt, index) => (
            <button
              key={index}
              onClick={() => {
                setIsWriting(true);
                setCurrentEntry(prompt + '\n\n');
              }}
              className="w-full text-left px-4 py-2 bg-white/60 hover:bg-white/80 rounded-lg text-sm text-gray-700 transition-all"
            >
              {prompt}
            </button>
          ))}
        </div>
      </div>

      {/* New Entry */}
      {isWriting ? (
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h3 className="font-semibold text-gray-800 mb-4">New Entry</h3>
          <textarea
            value={currentEntry}
            onChange={(e) => setCurrentEntry(e.target.value)}
            placeholder="Write your thoughts here..."
            className="w-full px-4 py-3 border border-gray-200 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-purple-400 min-h-[200px]"
            autoFocus
          />
          <div className="flex gap-3 mt-4">
            <button
              onClick={saveEntry}
              disabled={!currentEntry.trim()}
              className="flex-1 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg transition-all"
            >
              Save Entry
            </button>
            <button
              onClick={() => {
                setIsWriting(false);
                setCurrentEntry('');
              }}
              className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-all"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setIsWriting(true)}
          className="w-full py-4 bg-white rounded-2xl shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-2 text-gray-700 font-medium"
        >
          <Plus className="w-5 h-5" />
          New Journal Entry
        </button>
      )}

      {/* Past Entries */}
      {entries.length > 0 && (
        <div className="space-y-4">
          <h3 className="font-semibold text-gray-800">Past Entries</h3>
          {entries.map((entry) => {
            const date = new Date(entry.date);
            return (
              <div key={entry.id} className="bg-white rounded-2xl p-6 shadow-sm">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Calendar className="w-4 h-4" />
                    {date.toLocaleDateString('en-US', { 
                      weekday: 'long', 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </div>
                  <button
                    onClick={() => deleteEntry(entry.id)}
                    className="text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-gray-700 whitespace-pre-wrap">{entry.content}</p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
