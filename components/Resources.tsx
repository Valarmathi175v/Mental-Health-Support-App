import { Phone, MessageCircle, Globe, Book, Users, Heart } from 'lucide-react';

export function Resources() {
  const crisisLines = [
    {
      name: '988 Suicide & Crisis Lifeline',
      phone: '988',
      description: '24/7 free and confidential support',
      icon: Phone,
    },
    {
      name: 'Crisis Text Line',
      phone: 'Text HOME to 741741',
      description: 'Free 24/7 text support',
      icon: MessageCircle,
    },
    {
      name: 'SAMHSA National Helpline',
      phone: '1-800-662-4357',
      description: 'Mental health & substance abuse referrals',
      icon: Phone,
    },
  ];

  const selfCareActivities = [
    'Take a short walk outside',
    'Listen to calming music',
    'Practice deep breathing',
    'Connect with a friend or loved one',
    'Engage in a hobby you enjoy',
    'Get adequate sleep',
    'Drink water and eat nutritious food',
    'Limit social media time',
    'Write down your thoughts',
    'Practice gratitude',
  ];

  const resources = [
    {
      title: 'National Alliance on Mental Illness (NAMI)',
      description: 'Education, support, and advocacy',
      icon: Users,
      url: 'nami.org',
    },
    {
      title: 'Mental Health America',
      description: 'Screening tools and resources',
      icon: Heart,
      url: 'mhanational.org',
    },
    {
      title: 'Psychology Today',
      description: 'Find a therapist directory',
      icon: Book,
      url: 'psychologytoday.com',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Crisis Support */}
      <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-6">
        <h2 className="text-lg font-semibold text-red-900 mb-4">Crisis Support - Available 24/7</h2>
        <div className="space-y-3">
          {crisisLines.map((line, index) => {
            const Icon = line.icon;
            return (
              <div key={index} className="bg-white rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 text-red-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800">{line.name}</h3>
                    <p className="text-lg font-medium text-red-600 mt-1">{line.phone}</p>
                    <p className="text-sm text-gray-600 mt-1">{line.description}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Self-Care Activities */}
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <h3 className="font-semibold text-gray-800 mb-4">Self-Care Activities</h3>
        <p className="text-sm text-gray-600 mb-4">
          Small actions can make a big difference in how you feel
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {selfCareActivities.map((activity, index) => (
            <div
              key={index}
              className="flex items-start gap-2 p-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg"
            >
              <div className="w-1.5 h-1.5 bg-purple-400 rounded-full mt-2 flex-shrink-0" />
              <span className="text-sm text-gray-700">{activity}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Mental Health Resources */}
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <h3 className="font-semibold text-gray-800 mb-4">Mental Health Resources</h3>
        <div className="space-y-3">
          {resources.map((resource, index) => {
            const Icon = resource.icon;
            return (
              <div
                key={index}
                className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
              >
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Icon className="w-5 h-5 text-purple-600" />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-gray-800">{resource.title}</h4>
                  <p className="text-sm text-gray-600 mt-1">{resource.description}</p>
                  <div className="flex items-center gap-1 mt-2 text-sm text-purple-600">
                    <Globe className="w-3 h-3" />
                    <span>{resource.url}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Professional Help */}
      <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-6">
        <h3 className="font-semibold text-gray-800 mb-3">When to Seek Professional Help</h3>
        <p className="text-sm text-gray-700 mb-3">
          Consider reaching out to a mental health professional if you experience:
        </p>
        <ul className="space-y-2 text-sm text-gray-700">
          <li className="flex items-start gap-2">
            <span className="text-purple-500 mt-1">•</span>
            <span>Persistent feelings of sadness, anxiety, or emptiness</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-purple-500 mt-1">•</span>
            <span>Loss of interest in activities you once enjoyed</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-purple-500 mt-1">•</span>
            <span>Significant changes in sleep or appetite</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-purple-500 mt-1">•</span>
            <span>Difficulty functioning in daily life</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-purple-500 mt-1">•</span>
            <span>Thoughts of self-harm or suicide</span>
          </li>
        </ul>
        <p className="text-sm text-gray-700 mt-4 font-medium">
          Remember: Seeking help is a sign of strength, not weakness.
        </p>
      </div>
    </div>
  );
}
