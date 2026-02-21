import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function WelcomeScreen({ onStart }) {
  const [name, setName] = useState(() => {
    return localStorage.getItem('childName') || '';
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim()) {
      onStart(name.trim());
    }
  };

  return (
    <motion.div
      className="welcome-screen"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.4 }}
    >
      <div className="welcome-card">
        <motion.div 
          className="welcome-emoji"
          animate={{ 
            rotate: [0, 10, -10, 10, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            duration: 2, 
            repeat: Infinity,
            repeatDelay: 1
          }}
        >
          🌟
        </motion.div>
        
        <h1 className="welcome-title">ברוכים הבאים!</h1>
        <p className="welcome-subtitle">
          בואו נתרגל ביחד לקראת מבחן המחוננים 🚀
        </p>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className="name-input"
            placeholder="מה השם שלך?"
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoFocus
          />
          
          <motion.button
            type="submit"
            className="start-button"
            disabled={!name.trim()}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            בואו נתחיל! 🎮
          </motion.button>
        </form>
      </div>
    </motion.div>
  );
}
