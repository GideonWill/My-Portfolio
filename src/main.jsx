import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

// Fix for mobile viewport height issues
function setViewportHeight() {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
}

// Initial call
setViewportHeight();

// Re-calculate on resize and orientation change
window.addEventListener('resize', setViewportHeight);
window.addEventListener('orientationchange', () => {
  // Small delay to ensure the browser has completed any UI adjustments
  setTimeout(setViewportHeight, 100);
});

// Prevent body bounce effect in iOS Safari
document.body.addEventListener('touchmove', function(e) {
  if(e.target === document.body) {
    e.preventDefault();
  }
}, { passive: false });

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
