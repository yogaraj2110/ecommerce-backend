import React, { useEffect, useState } from 'react';

interface IdleTimerProps {
  timeout: number; // Idle timeout duration in milliseconds
  onIdle: () => void; // Callback function to be called on idle
}

const IdleTimer: React.FC<IdleTimerProps> = ({ timeout, onIdle }) => {
  let idleTimer: NodeJS.Timeout | null = null;

  const resetTimer = () => {
    if (idleTimer) {
      clearTimeout(idleTimer);
    }

    idleTimer = setTimeout(onIdle, timeout);
  };

  const handleUserActivity = () => {
    resetTimer();
  };

  useEffect(() => {
    window.addEventListener('mousemove', handleUserActivity);
    window.addEventListener('keydown', handleUserActivity);
    window.addEventListener('scroll', handleUserActivity);

    resetTimer();

    return () => {
      window.removeEventListener('mousemove', handleUserActivity);
      window.removeEventListener('keydown', handleUserActivity);
      window.removeEventListener('scroll', handleUserActivity);

      if (idleTimer) {
        clearTimeout(idleTimer);
      }
    };
  }, []);

  return null; // This component doesn't render anything
};

export default IdleTimer;
