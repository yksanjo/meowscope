export type FGCCategory = 'FOOD' | 'LIFE' | 'FIGHT' | 'SEX' | 'COMPLAINT';

export interface FGCClass {
  code: string;
  category: FGCCategory;
  definition: string;
  vocalization: string;
  description: string;
  gender?: 'Adult' | 'Young' | 'Female' | 'Male';
  soundType: 'SS' | 'RS' | 'CSS'; // Single Sound, Repeated Sequence, Complex Sound Sequence
}

export const FGC_CATEGORIES = {
  FOOD: { name: 'Food', color: '#4ade80', description: 'Food-related vocalizations' },
  LIFE: { name: 'Life', color: '#fbbf24', description: 'Life events and social calls' },
  FIGHT: { name: 'Fight', color: '#f87171', description: 'Defensive and aggressive sounds' },
  SEX: { name: 'Sex', color: '#60a5fa', description: 'Mating-related vocalizations' },
  COMPLAINT: { name: 'Complaint', color: '#f472b6', description: 'Distress and health-related sounds' }
};

export const FGC_CLASSES: FGCClass[] = [
  // FOOD Category
  { code: 'f110F', category: 'FOOD', definition: 'Breast feeding', vocalization: 'Chomp', description: 'Kitten nursing sound', gender: 'Female', soundType: 'CSS' },
  { code: 'f120Y', category: 'FOOD', definition: 'Starving', vocalization: 'Ultrasonic', description: 'Desperate hunger cry', gender: 'Young', soundType: 'RS' },
  { code: 'f130A', category: 'FOOD', definition: 'Anticipation', vocalization: 'Mrrrrrr', description: 'Excited food anticipation', gender: 'Adult', soundType: 'RS' },
  { code: 'f140A', category: 'FOOD', definition: 'Hunger', vocalization: 'Meow', description: 'Standard hunger meow', gender: 'Adult', soundType: 'SS' },
  { code: 'f150A', category: 'FOOD', definition: 'Dry food', vocalization: 'Crunch', description: 'Eating dry kibble', gender: 'Adult', soundType: 'RS' },
  { code: 'f160A', category: 'FOOD', definition: 'Wet food', vocalization: 'Chaw', description: 'Eating wet food', gender: 'Adult', soundType: 'RS' },
  { code: 'f170A', category: 'FOOD', definition: 'Tasty', vocalization: 'YumYumYum', description: 'Enjoying delicious food', gender: 'Adult', soundType: 'RS' },
  { code: 'f180A', category: 'FOOD', definition: 'Drink', vocalization: 'Lip', description: 'Lapping water', gender: 'Adult', soundType: 'RS' },

  // LIFE Category
  { code: 'f210F', category: 'LIFE', definition: "Mother's call", vocalization: 'HrrrMeow', description: 'Mother calling kittens', gender: 'Female', soundType: 'CSS' },
  { code: 'f215Y', category: 'LIFE', definition: 'Pleasure', vocalization: 'Baby Purring', description: 'Kitten contentment purr', gender: 'Young', soundType: 'RS' },
  { code: 'f220A', category: 'LIFE', definition: 'Relaxation', vocalization: 'Adult Purring', description: 'Relaxed, happy purring', gender: 'Adult', soundType: 'RS' },
  { code: 'f225A', category: 'LIFE', definition: 'Tickling', vocalization: 'Agitated licking', description: 'Grooming sounds', gender: 'Adult', soundType: 'RS' },
  { code: 'f230A', category: 'LIFE', definition: 'Liking', vocalization: 'LikLikLik', description: 'Self-grooming licks', gender: 'Adult', soundType: 'RS' },
  { code: 'f235A', category: 'LIFE', definition: 'Deep sleep', vocalization: 'Snoring', description: 'Sleeping snore', gender: 'Adult', soundType: 'RS' },
  { code: 'f240A', category: 'LIFE', definition: 'Greeting', vocalization: 'Hrrr', description: 'Friendly greeting trill', gender: 'Adult', soundType: 'SS' },
  { code: 'f245A', category: 'LIFE', definition: 'Scratching', vocalization: 'Scratch', description: 'Scratching post sound', gender: 'Adult', soundType: 'RS' },
  { code: 'f250A', category: 'LIFE', definition: 'Urgent Call', vocalization: 'Scream', description: 'Urgent attention needed', gender: 'Adult', soundType: 'SS' },
  { code: 'f255A', category: 'LIFE', definition: 'Open the door', vocalization: 'Plea', description: 'Requesting door access', gender: 'Adult', soundType: 'SS' },
  { code: 'f260A', category: 'LIFE', definition: 'Boring waul', vocalization: 'Howl', description: 'Boredom yowl', gender: 'Adult', soundType: 'SS' },
  { code: 'f265A', category: 'LIFE', definition: 'Displeasure', vocalization: 'Grudge', description: 'Annoyed grumble', gender: 'Adult', soundType: 'SS' },
  { code: 'f270A', category: 'LIFE', definition: 'Restroom', vocalization: 'Buzz', description: 'Litter box announcement', gender: 'Adult', soundType: 'SS' },
  { code: 'f275A', category: 'LIFE', definition: 'Litter scooping', vocalization: 'Scrape', description: 'Burying waste', gender: 'Adult', soundType: 'RS' },

  // FIGHT Category
  { code: 'f310A', category: 'FIGHT', definition: 'Spiting', vocalization: 'MoMoMoh', description: 'Defensive spitting', gender: 'Adult', soundType: 'RS' },
  { code: 'f320A', category: 'FIGHT', definition: 'Birdhunting chirp', vocalization: 'QuackQuackQuack', description: 'Chattering at prey', gender: 'Adult', soundType: 'RS' },
  { code: 'f330Y', category: 'FIGHT', definition: 'Baby Growling', vocalization: 'Squeak', description: 'Kitten warning growl', gender: 'Young', soundType: 'RS' },
  { code: 'f340A', category: 'FIGHT', definition: 'Adult Growling', vocalization: 'Roar', description: 'Deep warning growl', gender: 'Adult', soundType: 'RS' },
  { code: 'f350Y', category: 'FIGHT', definition: 'Baby Hissing', vocalization: 'Ssssss', description: 'Kitten defensive hiss', gender: 'Young', soundType: 'SS' },
  { code: 'f360A', category: 'FIGHT', definition: 'Adult Hissing', vocalization: 'Ssssss', description: 'Aggressive warning hiss', gender: 'Adult', soundType: 'SS' },
  { code: 'f370Y', category: 'FIGHT', definition: 'Baby Yelling', vocalization: 'Yeow', description: 'Kitten distress cry', gender: 'Young', soundType: 'SS' },
  { code: 'f380A', category: 'FIGHT', definition: 'Adult Yelling', vocalization: 'Waooo', description: 'Adult battle cry', gender: 'Adult', soundType: 'SS' },
  { code: 'f390A', category: 'FIGHT', definition: 'Attack', vocalization: 'Nyaaan', description: 'Attacking scream', gender: 'Adult', soundType: 'SS' },

  // SEX Category
  { code: 'f410M', category: 'SEX', definition: 'Mating', vocalization: 'GmyaGmyaGmya', description: 'Male mating call', gender: 'Male', soundType: 'SS' },
  { code: 'f420F', category: 'SEX', definition: 'Desire', vocalization: 'Lust', description: 'Female in heat call', gender: 'Female', soundType: 'SS' },
  { code: 'f430F', category: 'SEX', definition: 'Flirt', vocalization: 'False resistance', description: 'Mating play sounds', gender: 'Female', soundType: 'CSS' },
  { code: 'f440F', category: 'SEX', definition: 'Intimacy', vocalization: 'Climax', description: 'Mating completion cry', gender: 'Female', soundType: 'CSS' },

  // COMPLAINT Category
  { code: 'f510F', category: 'COMPLAINT', definition: 'Labor', vocalization: 'Miu', description: 'Birthing sounds', gender: 'Female', soundType: 'RS' },
  { code: 'f520A', category: 'COMPLAINT', definition: 'Throw up', vocalization: 'Puke', description: 'Vomiting sounds', gender: 'Adult', soundType: 'CSS' },
  { code: 'f530A', category: 'COMPLAINT', definition: 'Sneezing', vocalization: 'Achoo', description: 'Sneeze', gender: 'Adult', soundType: 'RS' },
  { code: 'f540A', category: 'COMPLAINT', definition: 'Cough', vocalization: 'UghUghUgh', description: 'Coughing', gender: 'Adult', soundType: 'RS' },
  { code: 'f550A', category: 'COMPLAINT', definition: 'Panting', vocalization: 'Wheeze', description: 'Labored breathing', gender: 'Adult', soundType: 'RS' },
  { code: 'f560A', category: 'COMPLAINT', definition: 'Paining', vocalization: 'Miyoou', description: 'Pain expression', gender: 'Adult', soundType: 'RS' },
];

// Get class by code
export function getFGCClass(code: string): FGCClass | undefined {
  return FGC_CLASSES.find(c => c.code === code);
}

// Get classes by category
export function getFGCClassesByCategory(category: FGCCategory): FGCClass[] {
  return FGC_CLASSES.filter(c => c.category === category);
}

// Mock analysis function - simulates ML model prediction
export function analyzeCatVocalization(audioData?: Blob): {
  primaryClass: FGCClass;
  confidence: number;
  allPredictions: Array<{ class: FGCClass; confidence: number }>;
} {
  // For demo purposes, randomly select a class with realistic confidence scores
  const randomIndex = Math.floor(Math.random() * FGC_CLASSES.length);
  const primaryClass = FGC_CLASSES[randomIndex];
  const confidence = 0.85 + Math.random() * 0.14; // 85-99% confidence

  // Generate some alternative predictions
  const allPredictions = [
    { class: primaryClass, confidence },
  ];

  // Add 2-3 lower confidence alternatives from same category
  const sameCategory = FGC_CLASSES.filter(
    c => c.category === primaryClass.category && c.code !== primaryClass.code
  );

  for (let i = 0; i < Math.min(2, sameCategory.length); i++) {
    const altClass = sameCategory[Math.floor(Math.random() * sameCategory.length)];
    allPredictions.push({
      class: altClass,
      confidence: confidence * (0.3 + Math.random() * 0.3)
    });
  }

  return {
    primaryClass,
    confidence,
    allPredictions: allPredictions.sort((a, b) => b.confidence - a.confidence)
  };
}
