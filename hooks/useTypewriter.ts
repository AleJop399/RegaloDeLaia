import { useState, useEffect } from 'react';

const useTypewriter = (text: string, speed: number = 50) => {
    const [displayedText, setDisplayedText] = useState('');
    const [isFinished, setIsFinished] = useState(false);

    useEffect(() => {
        setDisplayedText('');
        setIsFinished(false);
        let i = 0;
        const intervalId = setInterval(() => {
            if (i < text.length) {
                setDisplayedText(text.substring(0, i + 1));
                i++;
            } else {
                clearInterval(intervalId);
                setIsFinished(true);
            }
        }, speed);

        return () => {
            clearInterval(intervalId);
        };
    }, [text, speed]);

    return { displayedText, isFinished };
};

export default useTypewriter;