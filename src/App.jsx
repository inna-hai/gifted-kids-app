import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import WelcomeScreen from './components/WelcomeScreen';
import TopicSelection from './components/TopicSelection';
import QuestionScreen from './components/QuestionScreen';
import ResultScreen from './components/ResultScreen';
import { updateStatsAfterSession, getStats } from './utils/statsManager';
import { checkNewAchievements } from './data/achievements';
import './App.css';

function App() {
  const [screen, setScreen] = useState('welcome');
  const [childName, setChildName] = useState('');
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [score, setScore] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [newLevel, setNewLevel] = useState(null);
  const [stars, setStars] = useState(() => {
    const saved = localStorage.getItem('giftedStars');
    return saved ? parseInt(saved) : 0;
  });
  const [achievementPopup, setAchievementPopup] = useState(null);

  useEffect(() => {
    localStorage.setItem('giftedStars', stars.toString());
  }, [stars]);

  const handleStart = (name) => {
    setChildName(name);
    localStorage.setItem('childName', name);
    setScreen('topics');
  };

  const handleTopicSelect = (topic) => {
    setSelectedTopic(topic);
    setScore(0);
    setTotalQuestions(0);
    setScreen('question');
  };

  const handleQuestionComplete = (correct, total, level) => {
    setScore(correct);
    setTotalQuestions(total);
    setNewLevel(level);
    
    // Update stats
    const stats = updateStatsAfterSession(correct, total, selectedTopic.id, level);
    
    // Check for new achievements
    const newAchievements = checkNewAchievements(stats);
    if (newAchievements.length > 0) {
      // Show first achievement popup
      setAchievementPopup(newAchievements[0]);
      setTimeout(() => setAchievementPopup(null), 4000);
    }
    
    // Update stars
    const earnedStars = Math.floor((correct / total) * 3);
    setStars(prev => prev + earnedStars);
    
    setScreen('result');
  };

  const handleBackToTopics = () => {
    setScreen('topics');
    setSelectedTopic(null);
  };

  return (
    <div className="app">
      <AnimatePresence mode="wait">
        {screen === 'welcome' && (
          <WelcomeScreen key="welcome" onStart={handleStart} />
        )}
        {screen === 'topics' && (
          <TopicSelection 
            key="topics" 
            childName={childName} 
            stars={stars}
            onSelectTopic={handleTopicSelect} 
          />
        )}
        {screen === 'question' && (
          <QuestionScreen 
            key="question" 
            topic={selectedTopic}
            childName={childName}
            onComplete={handleQuestionComplete}
            onBack={handleBackToTopics}
          />
        )}
        {screen === 'result' && (
          <ResultScreen 
            key="result"
            childName={childName}
            score={score}
            total={totalQuestions}
            topic={selectedTopic}
            newLevel={newLevel}
            onBackToTopics={handleBackToTopics}
            onRetry={() => setScreen('question')}
          />
        )}
      </AnimatePresence>

      {/* Achievement Popup */}
      <AnimatePresence>
        {achievementPopup && (
          <motion.div
            className="achievement-popup"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
          >
            <span className="achievement-popup-icon">{achievementPopup.icon}</span>
            <div className="achievement-popup-text">
              <h4>🎉 הישג חדש!</h4>
              <p>{achievementPopup.title} - {achievementPopup.desc}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
