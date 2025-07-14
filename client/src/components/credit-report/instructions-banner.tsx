import { useState } from 'react';
import { X } from 'lucide-react';

export function InstructionsBanner() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) {
    return null;
  }

  return (
    <div className="mb-8 w-full animate-fade-in">
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 relative">
        {/* Close button */}
        <button
          onClick={() => setIsVisible(false)}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Close instructions"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Single instruction sentence */}
        <p className="text-base text-gray-700 text-center max-w-7xl mx-auto">
          🚀 <span className="font-bold">Ready to get started?</span> Just open each section, pick anything that looks wrong, follow the prompts, use the AI tips or write your own, and save your changes!
        </p>
      </div>
    </div>
  );
}