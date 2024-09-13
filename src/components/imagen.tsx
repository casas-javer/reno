// Imagen.tsx
import React from 'react';
import fovisteWebp from '../assets/foviste-gob.webp';
import fovisteJpg from '../assets/foviste-gob.jpg';

interface ImagenProps {
    width?: number;
    height?: number;
}

const Imagen: React.FC<ImagenProps> = ({ width = 800, height = 800 }) => {
    return (
        <picture>
            <source srcSet={fovisteWebp} type="image/webp" />
            <source srcSet={fovisteJpg} type="image/jpeg" />
            <img className="d" width={width} height={height} src={fovisteJpg} alt="foviste" />
        </picture>
    );
};

export default Imagen;
