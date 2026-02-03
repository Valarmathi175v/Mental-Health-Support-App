import { useState } from 'react';
import { RefreshCw, Heart } from 'lucide-react';

const affirmations = [
  "I am worthy of love and respect.",
  "My feelings are valid and important.",
  "I am doing the best I can, and that's enough.",
  "I choose to be kind to myself today.",
  "I am stronger than my challenges.",
  "It's okay to not be okay sometimes.",
  "I am making progress, even when it's not visible.",
  "I deserve peace and happiness.",
  "My mental health matters.",
  "I am brave for facing each day.",
  "I am not alone in this journey.",
  "Small steps are still steps forward.",
  "I am more than my thoughts and feelings.",
  "I have the power to create positive change.",
  "I am worthy of rest and self-care.",
  "My story isn't over yet.",
  "I am learning and growing every day.",
  "I choose hope over fear.",
  "I am resilient and capable.",
  "Better days are coming.",
];

export function Affirmations() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [favorites, setFavorites] = useState<string[]>(() => {
    const stored = localStorage.getItem('favoriteAffirmations');
    return stored ? JSON.parse(stored) : [];
  });

  const getRandomAffirmation = () => {
    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * affirmations.length);
    } while (newIndex === currentIndex && affirmations.length > 1);
    setCurrentIndex(newIndex);
  };

  const toggleFavorite = (affirmation: string) => {
    let updated;
    if (favorites.includes(affirmation)) {
      updated = favorites.filter(f => f !== affirmation);
    } else {
      updated = [...favorites, affirmation];
    }
    setFavorites(updated);
    localStorage.setItem('favoriteAffirmations', JSON.stringify(updated));
  };

  const currentAffirmation = affirmations[currentIndex];

  return (
    <div className="space-y-6">
      {/* Daily Affirmation */}
      <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl p-8 shadow-lg text-white">
        <div className="text-center space-y-6">
          <div className="flex justify-center">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
              <Heart className="w-8 h-8 fill-white" />
            </div>
          </div>
          
          <p className="text-2xl font-medium leading-relaxed px-4">
            "{currentAffirmation}"
          </p>

          <div className="flex gap-3 justify-center pt-4">
            <button
              onClick={getRandomAffirmation}
              className="flex items-center gap-2 px-6 py-3 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-xl font-medium transition-all"
            >
              <RefreshCw className="w-4 h-4" />
              New Affirmation
            </button>
            <button
              onClick={() => toggleFavorite(currentAffirmation)}
              className={`px-6 py-3 rounded-xl font-medium transition-all ${
                favorites.includes(currentAffirmation)
                  ? 'bg-white text-purple-500'
                  : 'bg-white/20 hover:bg-white/30 backdrop-blur-sm'
              }`}
            >
              <Heart className={`w-4 h-4 inline ${favorites.includes(currentAffirmation) ? 'fill-current' : ''}`} />
            </button>
          </div>
        </div>
      </div>

      {/* How to Use */}
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <h3 className="font-semibold text-gray-800 mb-4">How to Use Affirmations</h3>
        <div className="space-y-3 text-sm text-gray-700">
          <div className="flex gap-3">
            <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-purple-600 font-semibold text-xs">1</span>
            </div>
            <p>Read the affirmation slowly and let it sink in</p>
          </div>
          <div className="flex gap-3">
            <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-purple-600 font-semibold text-xs">2</span>
            </div>
            <p>Repeat it out loud or in your mind several times</p>
          </div>
          <div className="flex gap-3">
            <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-purple-600 font-semibold text-xs">3</span>
            </div>
            <p>Try to feel the meaning and believe in the words</p>
          </div>
          <div className="flex gap-3">
            <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-purple-600 font-semibold text-xs">4</span>
            </div>
            <p>Use affirmations daily for best results</p>
          </div>
        </div>
      </div>

      {/* Favorites */}
      {favorites.length > 0 && (
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h3 className="font-semibold text-gray-800 mb-4">Your Favorites</h3>
          <div className="space-y-2">
            {favorites.map((affirmation, index) => (
              <div
                key={index}
                className="flex items-start gap-3 p-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg"
              >
                <Heart className="w-4 h-4 text-purple-500 fill-purple-500 flex-shrink-0 mt-1" />
                <p className="text-sm text-gray-700 flex-1">"{affirmation}"</p>
                <button
                  onClick={() => toggleFavorite(affirmation)}
                  className="text-gray-400 hover:text-gray-600 text-xs"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
