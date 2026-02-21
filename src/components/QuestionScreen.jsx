import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { questionsBank } from '../data/questions';

export default function QuestionScreen({ topic, childName, onComplete, onBack }) {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);

  useEffect(() => {
    // Get questions for this topic and shuffle them
    const topicQuestions = questionsBank[topic.id] || [];
    const shuffled = [...topicQuestions].sort(() => Math.random() - 0.5).slice(0, 5);
    setQuestions(shuffled);
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
      onComplete(correctCount + (selectedAnswer === currentQuestion?.correct ? 1 : 0), questions.length);
    }
  };

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
            <div style={{ textAlign: 'center', marginBottom: '20px', fontSize: '60px' }}>
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
