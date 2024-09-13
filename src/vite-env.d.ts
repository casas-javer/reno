/// <reference types="vite/client" />
// global.d.ts
// global.d.ts
declare namespace JSX {
    interface IntrinsicElements {
        'lite-youtube': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & { videoid: string };
    }
}