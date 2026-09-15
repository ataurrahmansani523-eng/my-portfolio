/**
 * Synthesizes a high-end Swiss mechanical luxury click sound entirely in-browser.
 * Uses rapid decay frequency sweep filters for a premium haptic feel.
 */
export const playSoftClick = () => {
  try {
    const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
    
    // Create oscillator and gain nodes
    const osc = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();
    
    osc.connect(gainNode);
    gainNode.connect(audioCtx.destination);
    
    // High premium frequency click
    osc.type = "sine";
    osc.frequency.setValueAtTime(1600, audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(700, audioCtx.currentTime + 0.03);
    
    // Ultra fast volume ramp down to make it a distinct click
    gainNode.gain.setValueAtTime(0.04, audioCtx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.03);
    
    osc.start(audioCtx.currentTime);
    osc.stop(audioCtx.currentTime + 0.04);
  } catch (e) {
    // Graceful fallback for non-supported environments
    console.debug("Web Audio click failed to play", e);
  }
};
