// ImageWithSkeleton.tsx
import React, { Suspense, lazy } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

const LazyImagen = lazy(() => import('./imagen'));

const ImageWithSkeleton: React.FC<{ width?: number; height?: number; }> = ({ width, height }) => {
    return (
        <Suspense
            fallback={
                <Skeleton className="w-full h-full" /> // Ajusta el tamaño según tus necesidades
            }
        >
            <LazyImagen width={width} height={height} />
        </Suspense>
    );
};

export default ImageWithSkeleton;
