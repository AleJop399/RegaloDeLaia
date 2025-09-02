
import React, { useState, useCallback } from 'react';
import CatMessage from './components/CatMessage';
import FinalSurprise from './components/FinalSurprise';
import { DIALOGUES } from './constants';

const App: React.FC = () => {
    const [dialogueIndex, setDialogueIndex] = useState(0);
    const [isComplete, setIsComplete] = useState(false);

    const handleNext = useCallback(() => {
        if (dialogueIndex < DIALOGUES.length - 1) {
            setDialogueIndex(prevIndex => prevIndex + 1);
        } else {
            setIsComplete(true);
        }
    }, [dialogueIndex]);

    return (
        <div className="min-h-screen w-full bg-[#1f1035] flex flex-col items-center justify-center p-4 overflow-hidden text-white relative">
            <div aria-hidden="true" className="absolute inset-0 z-0">
                {/* Increased size of all blobs and added a violet color */}
                <div className="absolute top-1/4 left-1/3 w-[28rem] h-[28rem] bg-purple-600 rounded-full filter blur-3xl opacity-30 animate-blob-1"></div>
                <div className="absolute bottom-1/4 right-1/3 w-[32rem] h-[32rem] bg-violet-900 rounded-full filter blur-3xl opacity-40 animate-blob-2"></div>
                <div className="absolute bottom-1/3 left-1/4 w-[26rem] h-[26rem] bg-violet-500 rounded-full filter blur-3xl opacity-20 animate-blob-3"></div>
                <div className="absolute top-1/3 right-1/4 w-[36rem] h-[36rem] bg-purple-900 rounded-full filter blur-3xl opacity-50 animate-blob-4"></div>
            </div>
            
            <div className="relative z-10">
                {isComplete ? (
                    <FinalSurprise />
                ) : (
                    <CatMessage
                        key={dialogueIndex}
                        imageUrl="https://i.imgur.com/Z9owoac.png"
                        dialogue={DIALOGUES[dialogueIndex]}
                        onNext={handleNext}
                        isLastDialogue={dialogueIndex === DIALOGUES.length - 1}
                    />
                )}
            </div>
        </div>
    );
};

export default App;