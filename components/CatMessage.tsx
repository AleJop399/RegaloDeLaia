import React, { useState } from 'react';
import useTypewriter from '../hooks/useTypewriter';

interface CatMessageProps {
    imageUrl: string;
    dialogue: string;
    onNext: () => void;
    isLastDialogue: boolean;
}

const CatMessage: React.FC<CatMessageProps> = ({ imageUrl, dialogue, onNext, isLastDialogue }) => {
    const { displayedText, isFinished } = useTypewriter(dialogue, 40);
    const [isExiting, setIsExiting] = useState(false);

    const handleNextClick = () => {
        if (!isFinished || isExiting) return;
        setIsExiting(true);
    };

    const handleAnimationEnd = () => {
        if (isExiting) {
            onNext();
        }
    };

    const cursorClass = isFinished ? 'cursor-blink' : '';

    return (
        <div className="flex flex-col items-center justify-center gap-4 sm:gap-6 max-w-lg w-full">

            {/* Dialogue bubble with entry animation and fixed height */}
            <div className="relative bg-white text-violet-800 p-4 sm:p-6 rounded-3xl shadow-2xl w-full animate-scale-in-fade-in h-[160px] sm:h-[180px] flex items-center justify-center" aria-live="polite" aria-atomic="true">
                <div className="absolute left-1/2 -bottom-3 transform -translate-x-1/2 w-0 h-0 border-l-[15px] border-l-transparent border-r-[15px] border-r-transparent border-t-[20px] border-t-white"></div>
                <p className="text-center text-base sm:text-xl font-semibold leading-relaxed">
                    <span>
                        {displayedText}
                        <span className={cursorClass}>|</span>
                    </span>
                </p>
            </div>

            {/* Cat image with entry animation */}
            <div className="w-24 h-24 sm:w-32 sm:h-32 animate-float animate-scale-in-fade-in">
                <img
                    src={imageUrl}
                    alt="Noor el gatito"
                    className="w-full h-full object-contain drop-shadow-xl"
                />
            </div>

            {/* Container to prevent layout shift, button with conditional entry animation */}
            <div className="h-16 flex items-center">
                {isFinished && (
                    <button
                        onClick={handleNextClick}
                        onAnimationEnd={handleAnimationEnd}
                        className={`bg-white/20 backdrop-blur-md text-white font-bold py-2 px-6 sm:py-3 sm:px-8 text-sm sm:text-base rounded-full shadow-lg transform transition-all duration-300 hover:bg-white/30 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-75 ${isExiting ? 'animate-zoom-out-bounce' : 'animate-zoom-in-bounce animation-delay-200'}`}
                    >
                        {isLastDialogue ? 'Finalizar ❤️' : 'Continuar'}
                    </button>
                )}
            </div>
        </div>
    );
};

export default CatMessage;