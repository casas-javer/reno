// ImageWithSkeleton.tsx
import React, { Suspense, lazy } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

const Video = lazy(() => import('./video'));

const VideoWithSkeleton: React.FC<{ width?: number; height?: number; }> = () => {
    return (
        <Suspense
            fallback={
                <Skeleton className="w-full h-5/6" /> // Ajusta el tamaño según tus necesidades
            }
        >
            <Video />
        </Suspense>
    );
};

export default VideoWithSkeleton;
