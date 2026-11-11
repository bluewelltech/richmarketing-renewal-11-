import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { flushSync } from 'react-dom';
import App from './App';

// Block native selection/drag menus while preserving controls and pointer-based carousels.
const isEditable = (target: EventTarget | null) => target instanceof Element && !!target.closest('input, textarea, [contenteditable="true"]');
for (const type of ['contextmenu', 'selectstart', 'dragstart']) {
  document.addEventListener(type, event => {
    if (!isEditable(event.target)) event.preventDefault();
  });
}

// Give the browser the complete initial layout before its load-time scroll restoration.
const root = createRoot(document.getElementById('root')!);
flushSync(() => root.render(<StrictMode><App /></StrictMode>));
