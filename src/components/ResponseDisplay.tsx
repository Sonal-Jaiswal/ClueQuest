
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useTypingEffect } from '../utils/animations';

interface ResponseDisplayProps {
  response: any;
  onContinue: () => void;
}

const ResponseDisplay = ({ response, onContinue }: ResponseDisplayProps) => {
  const [showJson, setShowJson] = useState(false);
  const { displayedText, isComplete } = useTypingEffect(response.clue || response.message, 30);
  
  useEffect(() => {
    // Reset the state when a new response comes in
    setShowJson(false);
  }, [response]);
  
  if (!response) return null;
  
  const formattedJson = JSON.stringify(response, null, 2);
  
  return (
    <div className="glassmorphism rounded-xl p-6 animate-fade-in space-y-4">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-lg font-semibold">Response</h2>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => setShowJson(!showJson)}
          className="text-xs"
        >
          {showJson ? "Show Message" : "View JSON"}
        </Button>
      </div>
      
      {showJson ? (
        <div className="bg-muted/50 p-4 rounded-md overflow-auto max-h-64">
          <pre className="font-mono text-sm">{formattedJson}</pre>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="bg-primary/10 p-4 rounded-md">
            <h3 className="text-sm font-medium mb-2">{response.message}</h3>
            <p className="text-muted-foreground">
              {displayedText}
              <span className={`inline-block w-2 h-4 bg-primary ml-1 ${isComplete ? 'opacity-0' : 'animate-pulse-subtle'}`}></span>
            </p>
          </div>
          
          {isComplete && (
            <Button 
              onClick={onContinue}
              className="w-full transition-all hover:scale-[1.01] active:scale-[0.99]"
            >
              {response.pass}
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default ResponseDisplay;
