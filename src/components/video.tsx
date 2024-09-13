import { useRef, useEffect } from "react";
import '@justinribeiro/lite-youtube';

const Video = () => {

    const youtubeRef = useRef<HTMLElement | null>(null);

    useEffect(() => {
        if (youtubeRef.current) {
            // Manipular el atributo 'class' directamente en el Web Component
            youtubeRef.current.setAttribute('class', 'ml-auto w-full lg:max-w-2xl h-64 rounded-lg sm:h-96 shadow-xl');
        }
    }, []);

    return (
        <div>
            <lite-youtube ref={youtubeRef} videoid="vri5jwbG7xo">
            </lite-youtube>
        </div>
    )
}

export default Video

