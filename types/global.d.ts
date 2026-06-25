import type React from 'react';

// The site uses a custom element <image-slot> defined in public/image-slot.js.
// Declare it so TSX/JSX accepts it as an intrinsic element.
declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      'image-slot': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      > & {
        id?: string;
        shape?: string;
        placeholder?: string;
        readonly?: boolean;
      };
    }
  }
}
