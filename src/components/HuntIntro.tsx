
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useTypingEffect } from '../utils/animations';

interface HuntIntroProps {
  onStart: () => void;
}

const HuntIntro = ({ onStart }: HuntIntroProps) => {
  const [showIntro, setShowIntro] = useState(true);
  
  const introText = "  This is a API Treasure Hunt - a journey through web APIs to discover hidden treasure. ";
  const { displayedText, isComplete } = useTypingEffect(introText, 40);
  
  const handleStart = () => {
    setShowIntro(false);
    setTimeout(onStart, 500); // Delay to allow for exit animation
  };
  
  if (!showIntro) {
    return null;
  }
  
  return (
    <div className={`fixed inset-0 flex items-center justify-center z-50 bg-background transition-all-medium ${showIntro ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
      <div className="max-w-2xl mx-auto p-8 glassmorphism rounded-2xl space-y-6 animate-slide-up">
        <h1 className="text-4xl font-bold tracking-tight">API Treasure Hunt</h1>
        
        <div className="h-16">
          <p className="text-lg text-muted-foreground">{displayedText}<span className={`inline-block w-2 h-4 bg-primary ml-1 ${isComplete ? 'opacity-0' : 'animate-pulse-subtle'}`}></span></p>
        </div>
        
        <div className="space-y-4">
          <h2 className="text-xl font-medium">How to Play:</h2>
          <ul className="space-y-2 list-disc pl-5">
            <li className="text-muted-foreground">Use the console to POST & GET API requests to different endpoints</li>
            <li className="text-muted-foreground">Each response contains a clue to the next endpoint and type of request</li>
            <li className="text-muted-foreground">Follow the trail of clues until you find the treasure</li>
            <li className="text-muted-foreground">Time is ticking - how fast can you solve the puzzle?</li>
          </ul>
        </div>
        
        <div className="pt-4">
          <Button 
            className="w-full py-6 text-lg font-medium transition-all hover:scale-[1.01] active:scale-[0.99]"
            onClick={handleStart}
          >
            Begin the Hunt
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HuntIntro;
