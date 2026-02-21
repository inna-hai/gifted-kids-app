import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getStats, getTodayProgress, getStreakData, getEncouragingMessage } from '../utils/statsManager';
import { getUnlockedAchievements, achievements } from '../data/achievements';

export default function Dashboard({ childName, onClose, onSelectTopic }) {
  const [stats, setStats] = useState(getStats());
  const [todayProgress, setTodayProgress] = useState(getTodayProgress());
  const [streakData, setStreakData] = useState(getStreakData());
  const [unlockedAchievements, setUnlockedAchievements] = useState([]);
  const [activeTab, setActiveTab] = useState('progress');

  useEffect(() => {
    setStats(getStats());
    setTodayProgress(getTodayProgress());
    setStreakData(getStreakData());
    setUnlockedAchievements(getUnlockedAchievements());
  }, []);

  const accuracy = stats.totalAnswered > 0 
    ? Math.round((stats.totalCorrect / stats.totalAnswered) * 100) 
    : 0;

  const dailyGoalPercent = Math.min(100, (todayProgress.questionsToday / todayProgress.dailyGoal) * 100);

  return (
    <motion.div
      className="dashboard-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="dashboard-card"
        initial={{ scale: 0.9, y: 50 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 50 }}
      >
        <button className="dashboard-close" onClick={onClose}>✕</button>
        
        <div className="dashboard-header">
          <h2>📊 ההתקדמות של {childName}</h2>
          <p className="encouraging-message">
            {getEncouragingMessage(childName, stats)}
          </p>
        </div>

        <div className="dashboard-tabs">
          <button 
            className={`tab ${activeTab === 'progress' ? 'active' : ''}`}
            onClick={() => setActiveTab('progress')}
          >
            📈 התקדמות
          </button>
          <button 
            className={`tab ${activeTab === 'achievements' ? 'active' : ''}`}
            onClick={() => setActiveTab('achievements')}
          >
            🏆 הישגים
          </button>
        </div>

        {activeTab === 'progress' && (
          <div className="dashboard-content">
            {/* Daily Goal */}
            <div className="stat-section daily-goal-section">
              <h3>🎯 יעד יומי</h3>
              <div className="daily-progress-bar">
                <div 
                  className="daily-progress-fill"
                  style={{ width: `${dailyGoalPercent}%` }}
                />
              </div>
              <p>{todayProgress.questionsToday} / {todayProgress.dailyGoal} שאלות היום</p>
              {todayProgress.goalMet && <span className="goal-badge">✅ הושלם!</span>}
            </div>

            {/* Streak */}
            <div className="stat-section streak-section">
              <div className="streak-display">
                <span className="streak-fire">🔥</span>
                <span className="streak-number">{streakData.currentStreak}</span>
                <span className="streak-label">ימים ברצף</span>
              </div>
              {stats.longestStreak > streakData.currentStreak && (
                <p className="best-streak">שיא: {stats.longestStreak} ימים</p>
              )}
            </div>

            {/* Stats Grid */}
            <div className="stats-grid">
              <div className="stat-box">
                <span className="stat-value">{stats.totalAnswered}</span>
                <span className="stat-label">שאלות</span>
              </div>
              <div className="stat-box">
                <span className="stat-value">{accuracy}%</span>
                <span className="stat-label">דיוק</span>
              </div>
              <div className="stat-box">
                <span className="stat-value">{stats.perfectRounds}</span>
                <span className="stat-label">סיבובים מושלמים</span>
              </div>
              <div className="stat-box">
                <span className="stat-value">{stats.totalStars}⭐</span>
                <span className="stat-label">כוכבים</span>
              </div>
            </div>

            {/* Topics Progress */}
            <div className="stat-section">
              <h3>📚 התקדמות בנושאים</h3>
              <TopicsProgress />
            </div>
          </div>
        )}

        {activeTab === 'achievements' && (
          <div className="dashboard-content achievements-content">
            <p className="achievements-count">
              {unlockedAchievements.length} / {achievements.length} הישגים
            </p>
            <div className="achievements-grid">
              {achievements.map(achievement => {
                const isUnlocked = unlockedAchievements.some(a => a.id === achievement.id);
                return (
                  <div 
                    key={achievement.id}
                    className={`achievement-item ${isUnlocked ? 'unlocked' : 'locked'}`}
                  >
                    <span className="achievement-icon">
                      {isUnlocked ? achievement.icon : '🔒'}
                    </span>
                    <div className="achievement-info">
                      <span className="achievement-title">{achievement.title}</span>
                      <span className="achievement-desc">
                        {isUnlocked ? achievement.desc : '???'}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}

function TopicsProgress() {
  const progress = JSON.parse(localStorage.getItem('childProgress') || '{}');
  
  const topics = [
    { id: 'sequences-numbers', name: 'סדרות מספרים', icon: '🔢' },
    { id: 'sequences-shapes', name: 'סדרות צורות', icon: '🔷' },
    { id: 'word-problems', name: 'בעיות מילוליות', icon: '📝' },
    { id: 'analogies', name: 'אנלוגיות', icon: '🔄' },
    { id: 'odd-one-out', name: 'יוצא דופן', icon: '👀' },
    { id: 'matrices', name: 'מטריצות', icon: '🧩' },
    { id: 'sentence-completion', name: 'השלמת משפטים', icon: '💬' },
    { id: 'missing-number', name: 'מספר חסר', icon: '❓' },
  ];

  return (
    <div className="topics-progress-list">
      {topics.map(topic => {
        const topicProgress = progress[topic.id];
        const level = topicProgress?.level || 0;
        const attempts = topicProgress?.attempts || 0;
        
        return (
          <div key={topic.id} className="topic-progress-item">
            <span className="topic-icon">{topic.icon}</span>
            <span className="topic-name">{topic.name}</span>
            <div className="topic-level">
              {[1, 2, 3].map(l => (
                <span 
                  key={l} 
                  className={`level-star ${l <= level ? 'filled' : ''}`}
                >
                  ⭐
                </span>
              ))}
            </div>
            {attempts > 0 && (
              <span className="topic-attempts">{attempts} תרגולים</span>
            )}
          </div>
        );
      })}
    </div>
  );
}
