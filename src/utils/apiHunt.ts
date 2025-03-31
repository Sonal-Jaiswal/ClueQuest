
import { toast } from "sonner";

// Types for the API hunt application
export interface Clue {
  id: string;
  hint: string;
  endpoint: string;
  method: "GET" | "POST" | "PUT" | "DELETE";
  requestBody?: Record<string, any>;
  responseKey?: string;
  nextClueId?: string;
  isCompleted: boolean;
}

export interface HuntProgress {
  currentClueId: string;
  completedClues: string[];
  startTime: number;
  endTime?: number;
}

// Mock API endpoints for the treasure hunt
// In a real production app, this would be on a server
const CLUES: Record<string, Clue> = {
  "start": {
    id: "start",
    hint: "Welcome, treasure hunter! Your first clue awaits at the '/api/clue/first' endpoint. Make a request to begin.",
    endpoint: "/api/clue/first",
    method: "GET",
    nextClueId: "cipher",
    isCompleted: false
  },
  "cipher": {
    id: "cipher",
    hint: "You found the first clue! Now decode the cipher by sending an object with attribute key and value 'treasure' to '/api/clue/decode'.",
    endpoint: "/api/clue/decode",
    method: "POST",
    requestBody: { key: "treasure" },
    nextClueId: "coordinate",
    isCompleted: false
  },
  "coordinate": {
    id: "coordinate",
    hint: "Excellent decoding! The coordinates point to '/api/clue/map'. Send a GET request with query parameter '?x=42&y=18'.",
    endpoint: "/api/clue/map?x=42&y=18",
    method: "GET",
    nextClueId: "key",
    isCompleted: false
  },
  "key": {
    id: "key",
    hint: "Map location found! Now you need to forge a key. POST to '/api/clue/forge' with the pattern: {pattern: '1-3-5-7-9'}.",
    endpoint: "/api/clue/forge",
    method: "POST",
    requestBody: { pattern: "1-3-5-7-9" },
    nextClueId: "final",
    isCompleted: false
  },
  "final": {
    id: "final",
    hint: "The key worked! Make one final GET request to '/api/clue/treasure' to claim your prize!",
    endpoint: "/api/clue/treasure",
    method: "GET",
    isCompleted: false
  }
};

// Mock API responses
const API_RESPONSES: Record<string, any> = {
  "/api/clue/first": {
    message: "First clue discovered!",
    clue: "The cipher awaits decoding. Use the key 'treasure' to unlock the next step.",
    nextEndpoint: "/api/clue/decode",
    pass: "Good"
  },
  "/api/clue/decode": {
    message: "Cipher successfully decoded!",
    clue: "The decoded message reveals coordinates: x=42, y=18. Find this location on the map.",
    nextEndpoint: "/api/clue/map?x=42&y=18",
    pass: "Great"
  },
  "/api/clue/map?x=42&y=18": {
    message: "Location found on the map!",
    clue: "This location contains a locked door. You need to forge a key with the pattern: 1-3-5-7-9",
    nextEndpoint: "/api/clue/forge",
    pass: "Nice"
  },
  "/api/clue/forge": {
    message: "Key successfully forged!",
    clue: "The door opens to reveal a final chamber. Claim your treasure!",
    nextEndpoint: "/api/clue/treasure",
    pass: "KeepGoing"
  },
  "/api/clue/treasure": {
    message: "Congratulations, treasure hunter!",
    clue: "  You've completed the API Treasure Hunt! Your prize is the knowledge and skills you've gained along the way.",
    finalTime: true,
    pass: "YourPasswordHasAlwaysBeenHere - Though this is not the password"
  }
};

// Initialize the hunt
export const initializeHunt = (): HuntProgress => {
  return {
    currentClueId: "start",
    completedClues: [],
    startTime: Date.now()
  };
};

// Get a clue by ID
export const getClue = (clueId: string): Clue | null => {
  return CLUES[clueId] || null;
};

// Get all clues
export const getAllClues = (): Clue[] => {
  return Object.values(CLUES);
};

// Make API request
export const makeApiRequest = async (
  clue: Clue, 
  onSuccess: (response: any) => void,
  onError: (error: string) => void
): Promise<void> => {
  try {
    // In a real app, this would be actual API calls
    // For this demo, we're simulating API responses
    const endpoint = clue.endpoint;
    
    // Artificial delay to simulate network request
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const response = API_RESPONSES[endpoint];
    
    if (!response) {
      throw new Error("Invalid endpoint or parameters");
    }
    
    // Simulate successful API call
    onSuccess(response);
    
  } catch (error) {
    onError(error instanceof Error ? error.message : "An unknown error occurred");
  }
};

// Update hunt progress
export const updateProgress = (
  progress: HuntProgress,
  clueId: string,
  isCompleted: boolean
): HuntProgress => {
  const nextClue = CLUES[clueId].nextClueId;
  
  const updatedProgress = {
    ...progress,
    completedClues: isCompleted 
      ? [...progress.completedClues, clueId]
      : progress.completedClues,
    currentClueId: nextClue || progress.currentClueId
  };
  
  // Check if the hunt is complete
  if (clueId === "final" && isCompleted) {
    updatedProgress.endTime = Date.now();
    toast.success("Congratulations! You've completed the treasure hunt!");
  }
  
  return updatedProgress;
};

// Format time elapsed
export const formatTimeElapsed = (startTime: number, endTime?: number): string => {
  const elapsed = (endTime || Date.now()) - startTime;
  const seconds = Math.floor((elapsed / 1000) % 60);
  const minutes = Math.floor((elapsed / (1000 * 60)) % 60);
  
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
};
