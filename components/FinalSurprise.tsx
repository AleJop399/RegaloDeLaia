import React, { useState, useEffect, useRef } from 'react';
import { POLAROIDS, PolaroidData } from '../constants';
import Polaroid from './Polaroid';

const FinalSurprise: React.FC = () => {
    const [activeId, setActiveId] = useState<number | null>(POLAROIDS.length > 0 ? POLAROIDS[0].id : null);
    const [expandedPolaroid, setExpandedPolaroid] = useState<PolaroidData | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        itemRefs.current = itemRefs.current.slice(0, POLAROIDS.length);

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const id = entry.target.getAttribute('data-id');
                        if (id) {
                            setActiveId(parseInt(id, 10));
                        }
                    }
                });
            },
            {
                root: containerRef.current,
                threshold: 0.6, // More reliable threshold
                rootMargin: '0px',
            }
        );

        const currentItemRefs = itemRefs.current;
        currentItemRefs.forEach((item) => {
            if (item) observer.observe(item);
        });

        return () => {
            currentItemRefs.forEach((item) => {
                if (item) observer.unobserve(item);
            });
        };
    }, []); // Empty dependency array ensures this runs only once
    
    const handleExpandPolaroid = (polaroid: PolaroidData) => {
        setExpandedPolaroid(polaroid);
    };

    const handleCloseModal = () => {
        setExpandedPolaroid(null);
    };

    return (
        <>
            <div className="flex flex-col items-center justify-center text-center w-full h-screen max-w-4xl mx-auto px-4 animate-fade-in" aria-live="polite">
                <h1 className="text-2xl sm:text-3xl font-bold text-white drop-shadow-lg mb-4 sm:mb-6 flex-shrink-0">
                    Toca las fotos para ver el reverso
                </h1>
                
                <div
                    ref={containerRef}
                    className="w-full h-[80vh] flex flex-col items-center gap-24 py-[30vh] overflow-y-scroll snap-y snap-mandatory no-scrollbar"
                >
                    {POLAROIDS.map((polaroid, index) => (
                        <div
                            key={polaroid.id}
                            ref={el => { itemRefs.current[index] = el; }}
                            data-id={polaroid.id}
                            className="snap-center"
                        >
                            <Polaroid
                                imageUrl={polaroid.imageUrl}
                                isCentered={activeId === polaroid.id}
                                onClick={() => handleExpandPolaroid(polaroid)}
                            />
                        </div>
                    ))}
                </div>
            </div>

            {expandedPolaroid && (
                <div
                    className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 cursor-pointer animate-modal-fade-in"
                    onClick={handleCloseModal}
                    role="dialog"
                    aria-modal="true"
                    aria-label="Mensaje de la foto"
                >
                    <div 
                        className="flex flex-col items-center gap-4 sm:gap-6 animate-modal-text-slide-up max-w-md w-full"
                        onClick={(e) => e.stopPropagation()} // Evita que el clic en el contenido cierre el modal
                    >
                        <img 
                            src={expandedPolaroid.imageUrl} 
                            alt="Recuerdo ampliado" 
                            className="w-full h-auto object-cover rounded-xl shadow-2xl"
                        />
                        <p
                            className="text-white text-center text-xl sm:text-2xl font-semibold leading-relaxed drop-shadow-lg"
                        >
                            {expandedPolaroid.backText}
                        </p>
                    </div>
                </div>
            )}
        </>
    );
};

export default FinalSurprise;