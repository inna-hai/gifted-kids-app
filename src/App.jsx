import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import WelcomeScreen from './components/WelcomeScreen';
import TopicSelection from './components/TopicSelection';
import QuestionScreen from './components/QuestionScreen';
import ResultScreen from './components/ResultScreen';
import './App.css';

function App() {
  const [screen, setScreen] = useState('welcome');
  const [childName, setChildName] = useState('');
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [score, setScore] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [stars, setStars] = useState(() => {
    const saved = localStorage.getItem('giftedStars');
    return saved ? parseInt(saved) : 0;
  });

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

  const handleQuestionComplete = (correct, total) => {
    setScore(correct);
    setTotalQuestions(total);
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
            onBackToTopics={handleBackToTopics}
            onRetry={() => setScreen('question')}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
