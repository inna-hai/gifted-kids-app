import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { questionsBank } from '../data/questions';

// Get child's current level for a topic (1-3)
function getChildLevel(topicId) {
  const progress = JSON.parse(localStorage.getItem('childProgress') || '{}');
  return progress[topicId]?.level || 1;
}

// Update child's level based on performance
function updateChildLevel(topicId, correctRatio) {
  const progress = JSON.parse(localStorage.getItem('childProgress') || '{}');
  const currentLevel = progress[topicId]?.level || 1;
  
  let newLevel = currentLevel;
  if (correctRatio >= 0.8 && currentLevel < 3) {
    newLevel = currentLevel + 1; // Level up!
  } else if (correctRatio < 0.4 && currentLevel > 1) {
    newLevel = currentLevel - 1; // Level down
  }
  
  progress[topicId] = {
    level: newLevel,
    lastScore: correctRatio,
    attempts: (progress[topicId]?.attempts || 0) + 1
  };
  
  localStorage.setItem('childProgress', JSON.stringify(progress));
  return newLevel;
}

// Get questions adapted to child's level
function getAdaptiveQuestions(topicId, count = 5) {
  const allQuestions = questionsBank[topicId] || [];
  const childLevel = getChildLevel(topicId);
  
  // Get questions at current level, +/- 1 level
  const relevantQuestions = allQuestions.filter(q => 
    q.difficulty >= Math.max(1, childLevel - 1) && 
    q.difficulty <= Math.min(3, childLevel + 1)
  );
  
  // Prioritize current level questions
  const sorted = relevantQuestions.sort((a, b) => {
    const aDiff = Math.abs(a.difficulty - childLevel);
    const bDiff = Math.abs(b.difficulty - childLevel);
    return aDiff - bDiff;
  });
  
  // Shuffle and take count
  const shuffled = sorted.sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

// Get questions for a specific level
function getQuestionsForLevel(topicId, level, count = 5) {
  const allQuestions = questionsBank[topicId] || [];
  
  // Get questions at selected level, with some from adjacent levels
  const relevantQuestions = allQuestions.filter(q => 
    q.difficulty >= Math.max(1, level - 1) && 
    q.difficulty <= Math.min(3, level + 1)
  );
  
  // Prioritize selected level questions
  const sorted = relevantQuestions.sort((a, b) => {
    const aDiff = Math.abs(a.difficulty - level);
    const bDiff = Math.abs(b.difficulty - level);
    return aDiff - bDiff;
  });
  
  // Shuffle and take count
  const shuffled = sorted.sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

export default function QuestionScreen({ topic, childName, onComplete, onBack }) {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [currentLevel, setCurrentLevel] = useState(1);
  const [showLevelSelect, setShowLevelSelect] = useState(true);

  const handleLevelSelect = (level) => {
    setCurrentLevel(level);
    // Save the selected level
    const progress = JSON.parse(localStorage.getItem('childProgress') || '{}');
    progress[topic.id] = { ...progress[topic.id], level };
    localStorage.setItem('childProgress', JSON.stringify(progress));
    
    const levelQuestions = getQuestionsForLevel(topic.id, level, 5);
    setQuestions(levelQuestions);
    setShowLevelSelect(false);
  };

  useEffect(() => {
    // Check if this is first time playing this topic
    const progress = JSON.parse(localStorage.getItem('childProgress') || '{}');
    if (progress[topic.id]?.attempts > 0) {
      // Already played before, use saved level
      const level = progress[topic.id]?.level || 1;
      setCurrentLevel(level);
      const adaptiveQuestions = getAdaptiveQuestions(topic.id, 5);
      setQuestions(adaptiveQuestions);
      setShowLevelSelect(false);
    }
  }, [topic]);

  const currentQuestion = questions[currentIndex];

  const handleAnswerSelect = (answer) => {
    if (showFeedback) return;
    
    setSelectedAnswer(answer);
    setShowFeedback(true);
    
    if (answer === currentQuestion.correct) {
      setCorrectCount(prev => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setShowFeedback(false);
    } else {
      // correctCount already includes the last answer from handleAnswerSelect
      const ratio = correctCount / questions.length;
      const newLevel = updateChildLevel(topic.id, ratio);
      onComplete(correctCount, questions.length, newLevel);
    }
  };

  // Show level selection screen
  if (showLevelSelect) {
    return (
      <motion.div
        className="question-screen"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="question-card" style={{ textAlign: 'center' }}>
          <button className="back-button" onClick={onBack} style={{ position: 'absolute', top: '20px', right: '20px' }}>
            ← חזרה
          </button>
          
          <h2 style={{ fontSize: '28px', marginBottom: '10px', marginTop: '20px' }}>
            {topic.icon} {topic.title}
          </h2>
          <p style={{ fontSize: '18px', color: '#666', marginBottom: '30px' }}>
            באיזו רמה תרצה להתחיל?
          </p>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', maxWidth: '300px', margin: '0 auto' }}>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleLevelSelect(1)}
              style={{
                padding: '20px',
                fontSize: '20px',
                fontWeight: '600',
                background: 'linear-gradient(135deg, #74ebd5 0%, #9face6 100%)',
                border: 'none',
                borderRadius: '15px',
                cursor: 'pointer',
                color: '#333'
              }}
            >
              ⭐ קל
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleLevelSelect(2)}
              style={{
                padding: '20px',
                fontSize: '20px',
                fontWeight: '600',
                background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                border: 'none',
                borderRadius: '15px',
                cursor: 'pointer',
                color: 'white'
              }}
            >
              ⭐⭐ בינוני
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleLevelSelect(3)}
              style={{
                padding: '20px',
                fontSize: '20px',
                fontWeight: '600',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                border: 'none',
                borderRadius: '15px',
                cursor: 'pointer',
                color: 'white'
              }}
            >
              ⭐⭐⭐ מאתגר
            </motion.button>
          </div>
        </div>
      </motion.div>
    );
  }

  if (!currentQuestion) {
    return (
      <div className="question-screen">
        <div className="question-card">
          <p>טוען שאלות...</p>
        </div>
      </div>
    );
  }

  const isCorrect = selectedAnswer === currentQuestion.correct;
  const progress = ((currentIndex + 1) / questions.length) * 100;

  const levelNames = { 1: '⭐ קל', 2: '⭐⭐ בינוני', 3: '⭐⭐⭐ מאתגר' };

  return (
    <motion.div
      className="question-screen"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.3 }}
    >
      <div className="question-header">
        <button className="back-button" onClick={onBack}>
          ← חזרה
        </button>
        <div className="level-badge">
          {levelNames[currentLevel]}
        </div>
        <div className="progress-bar">
          <motion.div 
            className="progress-fill" 
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
          />
        </div>
        <span className="question-number">
          {currentIndex + 1} / {questions.length}
        </span>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          className="question-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          <h2 className="question-text">{currentQuestion.question}</h2>

          {currentQuestion.image && (
            <div style={{ textAlign: 'center', marginBottom: '20px', fontSize: '50px' }}>
              {currentQuestion.image}
            </div>
          )}

          <div className="answers-grid">
            {currentQuestion.answers.map((answer, index) => (
              <motion.button
                key={index}
                className={`answer-button ${
                  selectedAnswer === answer ? 'selected' : ''
                } ${
                  showFeedback && answer === currentQuestion.correct ? 'correct' : ''
                } ${
                  showFeedback && selectedAnswer === answer && answer !== currentQuestion.correct ? 'wrong' : ''
                }`}
                onClick={() => handleAnswerSelect(answer)}
                whileHover={!showFeedback ? { scale: 1.02 } : {}}
                whileTap={!showFeedback ? { scale: 0.98 } : {}}
                disabled={showFeedback}
              >
                {answer}
              </motion.button>
            ))}
          </div>

          {showFeedback && (
            <motion.div
              className={`feedback ${isCorrect ? 'correct' : 'wrong'}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {isCorrect ? (
                <>
                  <span style={{ fontSize: '30px' }}>🎉</span> מעולה {childName}! תשובה נכונה!
                </>
              ) : (
                <>
                  <span style={{ fontSize: '30px' }}>💪</span> לא נורא! התשובה הנכונה היא: {currentQuestion.correct}
                </>
              )}
            </motion.div>
          )}

          {showFeedback && (
            <motion.button
              className="next-button"
              onClick={handleNext}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {currentIndex < questions.length - 1 ? 'לשאלה הבאה ←' : 'סיימתי! 🎯'}
            </motion.button>
          )}
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}
