// Imagen.tsx
import React from 'react';

// Versiones en diferentes tamaños
import fovisteSmallWebp from '../assets/fovissste-small.webp';
import fovisteMediumWebp from '../assets/fovissste-medium.webp';
import fovisteLargeWebp from '../assets/fovissste-large.webp';

import fovisteSmallJpg from '../assets/fovissste-small.jpg';
import fovisteMediumJpg from '../assets/fovissste-medium.jpg';
import fovisteLargeJpg from '../assets/fovissste-large.jpg';

interface ImagenProps {
    width?: number;
    height?: number;
}

const Imagen: React.FC<ImagenProps> = ({ width = 800, height = 800 }) => {
    return (
        <picture>
            {/* Imagen para pantallas pequeñas (móviles) */}
            <source srcSet={fovisteSmallWebp} type="image/webp" media="(max-width: 600px)" />
            <source srcSet={fovisteSmallJpg} type="image/jpeg" media="(max-width: 600px)" />

            {/* Imagen para pantallas medianas (tablets, laptops pequeñas) */}
            <source srcSet={fovisteMediumWebp} type="image/webp" media="(max-width: 1024px)" />
            <source srcSet={fovisteMediumJpg} type="image/jpeg" media="(max-width: 1024px)" />

            {/* Imagen para pantallas grandes */}
            <source srcSet={fovisteLargeWebp} type="image/webp" />
            <source srcSet={fovisteLargeJpg} type="image/jpeg" />

            <img className="d" width={width} height={height} src={fovisteLargeJpg} alt="foviste" />
        </picture>
    );
};

export default Imagen;
