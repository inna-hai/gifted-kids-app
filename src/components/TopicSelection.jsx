import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Dashboard from './Dashboard';
import { getStats, getTodayProgress, getStreakData, getEncouragingMessage } from '../utils/statsManager';

const topics = [
  {
    id: 'sequences-numbers',
    icon: '🔢',
    title: 'סדרות מספרים',
    desc: 'מצאו את המספר הבא בסדרה'
  },
  {
    id: 'sequences-shapes',
    icon: '🔷',
    title: 'סדרות צורות',
    desc: 'מצאו את הצורה שממשיכה את הסדרה'
  },
  {
    id: 'word-problems',
    icon: '📝',
    title: 'בעיות מילוליות',
    desc: 'פתרו חידות ובעיות מתמטיות'
  },
  {
    id: 'analogies',
    icon: '🔄',
    title: 'אנלוגיות',
    desc: 'מצאו את הקשר בין המילים'
  },
  {
    id: 'odd-one-out',
    icon: '👀',
    title: 'יוצא דופן',
    desc: 'מצאו מה שונה מהשאר'
  },
  {
    id: 'matrices',
    icon: '🧩',
    title: 'מטריצות',
    desc: 'השלימו את התבנית'
  },
  {
    id: 'sentence-completion',
    icon: '💬',
    title: 'השלמת משפטים',
    desc: 'מצאו את המילה המתאימה'
  },
  {
    id: 'missing-number',
    icon: '❓',
    title: 'מספר חסר',
    desc: 'מצאו את המספר החסר בתרגיל'
  }
];

export default function TopicSelection({ childName, stars, onSelectTopic }) {
  const [showDashboard, setShowDashboard] = useState(false);
  const [stats, setStats] = useState(getStats());
  const [todayProgress, setTodayProgress] = useState(getTodayProgress());
  const [streakData, setStreakData] = useState(getStreakData());
  const progress = JSON.parse(localStorage.getItem('childProgress') || '{}');

  useEffect(() => {
    setStats(getStats());
    setTodayProgress(getTodayProgress());
    setStreakData(getStreakData());
  }, []);

  const getTopicLevel = (topicId) => {
    return progress[topicId]?.level || 0;
  };

  return (
    <motion.div
      className="topics-screen"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
    >
      <button 
        className="dashboard-button"
        onClick={() => setShowDashboard(true)}
      >
        📊 ההתקדמות שלי
      </button>

      <div className="topics-header">
        <h1 className="greeting">היי {childName}! 👋</h1>
        
        {/* Quick Stats Bar */}
        <div className="quick-stats">
          <div className="quick-stat">
            <span className="quick-stat-icon">🔥</span>
            <span className="quick-stat-value">{streakData.currentStreak}</span>
            <span className="quick-stat-label">ימים</span>
          </div>
          <div className="quick-stat">
            <span className="quick-stat-icon">⭐</span>
            <span className="quick-stat-value">{stats.totalStars}</span>
            <span className="quick-stat-label">כוכבים</span>
          </div>
          <div className="quick-stat">
            <span className="quick-stat-icon">🎯</span>
            <span className="quick-stat-value">{todayProgress.questionsToday}/{todayProgress.dailyGoal}</span>
            <span className="quick-stat-label">היום</span>
          </div>
        </div>

        {/* Daily Goal Progress */}
        {!todayProgress.goalMet && (
          <div className="daily-reminder">
            <div className="mini-progress-bar">
              <div 
                className="mini-progress-fill"
                style={{ width: `${Math.min(100, (todayProgress.questionsToday / todayProgress.dailyGoal) * 100)}%` }}
              />
            </div>
            <span>עוד {todayProgress.dailyGoal - todayProgress.questionsToday} שאלות ליעד היומי!</span>
          </div>
        )}
        {todayProgress.goalMet && (
          <div className="daily-complete">
            ✅ כל הכבוד! השלמת את היעד היומי! אפשר להמשיך לתרגל 🌟
          </div>
        )}
      </div>

      <div className="topics-grid">
        {topics.map((topic, index) => {
          const level = getTopicLevel(topic.id);
          return (
            <motion.div
              key={topic.id}
              className="topic-card"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onSelectTopic(topic)}
            >
              <div className="topic-icon">{topic.icon}</div>
              <h3 className="topic-title">{topic.title}</h3>
              <p className="topic-desc">{topic.desc}</p>
              {level > 0 && (
                <div className="topic-level-indicator">
                  {[1, 2, 3].map(l => (
                    <span key={l} className={l <= level ? 'filled' : ''}>⭐</span>
                  ))}
                </div>
              )}
            </motion.div>
          );
        })}
      </div>

      <AnimatePresence>
        {showDashboard && (
          <Dashboard 
            childName={childName}
            onClose={() => setShowDashboard(false)}
          />
        )}
      </AnimatePresence>
      
      <div style={{ 
        textAlign: 'center', 
        marginTop: '2rem', 
        fontSize: '0.75rem', 
        color: '#888',
        opacity: 0.6 
      }}>
        גרסה 2.9 • בחירת רמה 🆕
      </div>
    </motion.div>
  );
}
