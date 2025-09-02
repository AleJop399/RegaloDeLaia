import React from 'react';

interface PolaroidProps {
    imageUrl: string;
    isCentered: boolean;
    onClick: () => void;
}

const Polaroid: React.FC<PolaroidProps> = ({ imageUrl, isCentered, onClick }) => {
    const scaleClass = isCentered ? 'scale-110' : 'scale-90';
    const opacityClass = isCentered ? 'opacity-100' : 'opacity-60';

    return (
        <div
            className={`relative w-64 h-72 sm:w-72 sm:h-80 transition-all duration-500 ease-in-out ${scaleClass} ${opacityClass} cursor-pointer`}
            onClick={onClick}
            role="button"
            aria-label="Tocar para ver el mensaje"
        >
            <div className="bg-white p-2 sm:p-3 pb-4 sm:pb-6 rounded-md shadow-lg w-full h-full">
                <div className="w-full h-full bg-gray-200">
                    <img src={imageUrl} alt="Recuerdo de cumpleaños" className="w-full h-full object-cover" />
                </div>
            </div>
        </div>
    );
};

export default Polaroid;
