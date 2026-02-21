import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function ResultScreen({ childName, score, total, topic, onBackToTopics, onRetry }) {
  const [showConfetti, setShowConfetti] = useState(false);
  const percentage = Math.round((score / total) * 100);
  const starsEarned = Math.floor((score / total) * 3);

  useEffect(() => {
    if (percentage >= 60) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
    }
  }, [percentage]);

  const getEmoji = () => {
    if (percentage === 100) return '🏆';
    if (percentage >= 80) return '🌟';
    if (percentage >= 60) return '😊';
    if (percentage >= 40) return '💪';
    return '🤗';
  };

  const getMessage = () => {
    if (percentage === 100) return `וואו ${childName}! מושלם! את/ה אלוף/ה!`;
    if (percentage >= 80) return `כל הכבוד ${childName}! עבודה מעולה!`;
    if (percentage >= 60) return `יפה מאוד ${childName}! ממשיכים להתאמן!`;
    if (percentage >= 40) return `לא רע ${childName}! תתרגל/י עוד קצת!`;
    return `בוא/י ננסה שוב ${childName}! את/ה יכול/ה!`;
  };

  return (
    <motion.div
      className="result-screen"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.4 }}
    >
      {showConfetti && (
        <div className="confetti">
          {[...Array(50)].map((_, i) => (
            <motion.div
              key={i}
              style={{
                position: 'absolute',
                left: `${Math.random() * 100}%`,
                top: '-10px',
                fontSize: '30px',
              }}
              animate={{
                y: window.innerHeight + 100,
                rotate: Math.random() * 360,
              }}
              transition={{
                duration: 2 + Math.random() * 2,
                delay: Math.random() * 0.5,
              }}
            >
              {['🎉', '⭐', '🌟', '✨', '🎊'][Math.floor(Math.random() * 5)]}
            </motion.div>
          ))}
        </div>
      )}

      <div className="result-card">
        <motion.div
          className="result-emoji"
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 10, -10, 0]
          }}
          transition={{ duration: 0.5 }}
        >
          {getEmoji()}
        </motion.div>

        <h1 className="result-title">סיימת את {topic.title}!</h1>
        <p className="result-message">{getMessage()}</p>

        <motion.div
          className="score-display"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring' }}
        >
          {score}/{total}
        </motion.div>

        <div className="stars-earned">
          {[...Array(3)].map((_, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ 
                opacity: i < starsEarned ? 1 : 0.3, 
                y: 0 
              }}
              transition={{ delay: 0.4 + i * 0.2 }}
            >
              ⭐
            </motion.span>
          ))}
        </div>

        <div className="result-buttons">
          <motion.button
            className="retry-button"
            onClick={onRetry}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            🔄 לנסות שוב
          </motion.button>
          <motion.button
            className="topics-button"
            onClick={onBackToTopics}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            📚 נושאים אחרים
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
