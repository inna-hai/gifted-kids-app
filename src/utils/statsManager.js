// Stats Manager - tracks all child progress and statistics

const STATS_KEY = 'childStats';
const STREAK_KEY = 'streakData';
const DAILY_KEY = 'dailyProgress';

// Initialize or get stats
export function getStats() {
  const defaults = {
    totalAnswered: 0,
    totalCorrect: 0,
    perfectRounds: 0,
    levelUps: 0,
    maxLevelReached: 1,
    topicsStarted: 0,
    topicsAtLevel3: 0,
    dailyGoalsMet: 0,
    earlyBird: false,
    nightOwl: false,
    weekendPractice: false,
    streak: 0,
    longestStreak: 0,
    totalStars: 0,
    practiceHistory: [], // [{date, questions, correct}]
  };
  
  const saved = localStorage.getItem(STATS_KEY);
  if (saved) {
    return { ...defaults, ...JSON.parse(saved) };
  }
  return defaults;
}

// Save stats
export function saveStats(stats) {
  localStorage.setItem(STATS_KEY, JSON.stringify(stats));
}

// Update stats after a practice session
export function updateStatsAfterSession(correct, total, topicId, newLevel) {
  const stats = getStats();
  const progress = JSON.parse(localStorage.getItem('childProgress') || '{}');
  
  // Update totals
  stats.totalAnswered += total;
  stats.totalCorrect += correct;
  
  // Check for perfect round
  if (correct === total) {
    stats.perfectRounds += 1;
  }
  
  // Check for level up
  const prevProgress = progress[topicId];
  if (prevProgress && newLevel > prevProgress.level) {
    stats.levelUps += 1;
  }
  
  // Update max level reached
  if (newLevel > stats.maxLevelReached) {
    stats.maxLevelReached = newLevel;
  }
  
  // Count topics started
  const topicsWithProgress = Object.keys(progress).length;
  stats.topicsStarted = topicsWithProgress;
  
  // Count topics at level 3
  stats.topicsAtLevel3 = Object.values(progress).filter(p => p.level >= 3).length;
  
  // Check time-based achievements
  const hour = new Date().getHours();
  if (hour < 8) stats.earlyBird = true;
  if (hour >= 20) stats.nightOwl = true;
  
  const day = new Date().getDay();
  if (day === 0 || day === 6) stats.weekendPractice = true;
  
  // Update streak
  updateStreak();
  const streakData = getStreakData();
  stats.streak = streakData.currentStreak;
  stats.longestStreak = Math.max(stats.longestStreak, streakData.currentStreak);
  
  // Add to practice history
  const today = new Date().toISOString().split('T')[0];
  const todayEntry = stats.practiceHistory.find(h => h.date === today);
  if (todayEntry) {
    todayEntry.questions += total;
    todayEntry.correct += correct;
  } else {
    stats.practiceHistory.push({ date: today, questions: total, correct });
  }
  
  // Keep only last 30 days of history
  stats.practiceHistory = stats.practiceHistory.slice(-30);
  
  // Check daily goal (10 questions per day)
  const todayQuestions = stats.practiceHistory.find(h => h.date === today)?.questions || 0;
  const dailyProgress = JSON.parse(localStorage.getItem(DAILY_KEY) || '{}');
  if (todayQuestions >= 10 && !dailyProgress[today]?.goalMet) {
    stats.dailyGoalsMet += 1;
    dailyProgress[today] = { ...(dailyProgress[today] || {}), goalMet: true };
    localStorage.setItem(DAILY_KEY, JSON.stringify(dailyProgress));
  }
  
  // Stars calculation
  stats.totalStars = Math.floor(stats.totalCorrect / 5);
  
  saveStats(stats);
  return stats;
}

// Streak management
export function getStreakData() {
  const defaults = {
    lastPracticeDate: null,
    currentStreak: 0,
  };
  
  const saved = localStorage.getItem(STREAK_KEY);
  if (saved) {
    return { ...defaults, ...JSON.parse(saved) };
  }
  return defaults;
}

export function updateStreak() {
  const streakData = getStreakData();
  const today = new Date().toISOString().split('T')[0];
  const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
  
  if (streakData.lastPracticeDate === today) {
    // Already practiced today, no change
    return streakData;
  } else if (streakData.lastPracticeDate === yesterday) {
    // Practiced yesterday, increment streak
    streakData.currentStreak += 1;
  } else if (streakData.lastPracticeDate === null) {
    // First time practicing
    streakData.currentStreak = 1;
  } else {
    // Missed a day, reset streak
    streakData.currentStreak = 1;
  }
  
  streakData.lastPracticeDate = today;
  localStorage.setItem(STREAK_KEY, JSON.stringify(streakData));
  return streakData;
}

// Get today's progress
export function getTodayProgress() {
  const stats = getStats();
  const today = new Date().toISOString().split('T')[0];
  const todayData = stats.practiceHistory.find(h => h.date === today);
  
  return {
    questionsToday: todayData?.questions || 0,
    correctToday: todayData?.correct || 0,
    dailyGoal: 10,
    goalMet: (todayData?.questions || 0) >= 10,
  };
}

// Get encouraging message based on stats
export function getEncouragingMessage(childName, stats) {
  const messages = [];
  
  if (stats.streak >= 7) {
    messages.push(`🔥 ${childName}, יש לך רצף של ${stats.streak} ימים! מדהים!`);
  } else if (stats.streak >= 3) {
    messages.push(`🔥 רצף של ${stats.streak} ימים! כל הכבוד!`);
  }
  
  if (stats.totalAnswered >= 100) {
    messages.push(`💪 כבר ענית על ${stats.totalAnswered} שאלות! את/ה אלוף/ה!`);
  }
  
  const accuracy = stats.totalAnswered > 0 ? Math.round((stats.totalCorrect / stats.totalAnswered) * 100) : 0;
  if (accuracy >= 80 && stats.totalAnswered >= 10) {
    messages.push(`🎯 דיוק של ${accuracy}%! מרשים!`);
  }
  
  if (stats.topicsAtLevel3 >= 1) {
    messages.push(`🧠 הגעת לרמה הגבוהה ב-${stats.topicsAtLevel3} נושאים!`);
  }
  
  const todayProgress = getTodayProgress();
  if (!todayProgress.goalMet) {
    const remaining = todayProgress.dailyGoal - todayProgress.questionsToday;
    messages.push(`📎 עוד ${remaining} שאלות ליעד היומי!`);
  } else {
    messages.push(`✅ השלמת את היעד היומי! אפשר להמשיך לתרגל 😊`);
  }
  
  return messages[Math.floor(Math.random() * messages.length)] || `בוא נתרגל היום, ${childName}! 💪`;
}
