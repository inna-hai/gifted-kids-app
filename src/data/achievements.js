// Achievement definitions
export const achievements = [
  // Practice achievements
  { id: 'first_question', icon: '🌟', title: 'צעד ראשון', desc: 'ענית על השאלה הראשונה!', condition: (stats) => stats.totalAnswered >= 1 },
  { id: 'ten_questions', icon: '🔥', title: 'מתחממים', desc: 'ענית על 10 שאלות!', condition: (stats) => stats.totalAnswered >= 10 },
  { id: 'fifty_questions', icon: '💪', title: 'מתאמנים', desc: 'ענית על 50 שאלות!', condition: (stats) => stats.totalAnswered >= 50 },
  { id: 'hundred_questions', icon: '🏆', title: 'אלוף/ה', desc: 'ענית על 100 שאלות!', condition: (stats) => stats.totalAnswered >= 100 },
  { id: 'two_hundred', icon: '👑', title: 'מלך/מלכת התרגול', desc: 'ענית על 200 שאלות!', condition: (stats) => stats.totalAnswered >= 200 },
  
  // Accuracy achievements
  { id: 'perfect_round', icon: '💯', title: 'מושלם!', desc: 'סיימת סיבוב עם 100% הצלחה!', condition: (stats) => stats.perfectRounds >= 1 },
  { id: 'five_perfect', icon: '🌈', title: 'כוכב/ת על', desc: '5 סיבובים מושלמים!', condition: (stats) => stats.perfectRounds >= 5 },
  { id: 'accuracy_master', icon: '🎯', title: 'דייקן/ית', desc: 'דיוק כולל מעל 80%!', condition: (stats) => stats.totalAnswered >= 20 && (stats.totalCorrect / stats.totalAnswered) >= 0.8 },
  
  // Streak achievements
  { id: 'streak_3', icon: '🔥', title: 'רצף!', desc: 'תרגלת 3 ימים ברצף!', condition: (stats) => stats.streak >= 3 },
  { id: 'streak_7', icon: '⚡', title: 'שבוע של כוכב/ת', desc: 'תרגלת 7 ימים ברצף!', condition: (stats) => stats.streak >= 7 },
  { id: 'streak_14', icon: '🚀', title: 'סופר סטאר', desc: 'תרגלת שבועיים ברצף!', condition: (stats) => stats.streak >= 14 },
  { id: 'streak_30', icon: '🏅', title: 'אגדה!', desc: 'תרגלת חודש ברצף!', condition: (stats) => stats.streak >= 30 },
  
  // Topic mastery achievements
  { id: 'first_level_up', icon: '📈', title: 'עולים!', desc: 'עלית רמה בנושא כלשהו!', condition: (stats) => stats.levelUps >= 1 },
  { id: 'level_3_any', icon: '🧠', title: 'גאון/ה קטן/ה', desc: 'הגעת לרמה 3 בנושא כלשהו!', condition: (stats) => stats.maxLevelReached >= 3 },
  { id: 'all_topics', icon: '🌍', title: 'חוקר/ת', desc: 'תרגלת את כל הנושאים!', condition: (stats) => stats.topicsStarted >= 8 },
  { id: 'topic_master', icon: '🎓', title: 'מומחה/ית', desc: 'הגעת לרמה 3 ב-3 נושאים!', condition: (stats) => stats.topicsAtLevel3 >= 3 },
  
  // Daily goals
  { id: 'daily_goal', icon: '✅', title: 'יעד יומי', desc: 'השלמת את היעד היומי!', condition: (stats) => stats.dailyGoalsMet >= 1 },
  { id: 'weekly_goals', icon: '📅', title: 'שבוע מוצלח', desc: 'השלמת 5 יעדים יומיים בשבוע!', condition: (stats) => stats.dailyGoalsMet >= 5 },
  
  // Special achievements
  { id: 'early_bird', icon: '🌅', title: 'ציפור מוקדמת', desc: 'תרגלת לפני 8 בבוקר!', condition: (stats) => stats.earlyBird },
  { id: 'night_owl', icon: '🦉', title: 'ינשוף', desc: 'תרגלת אחרי 8 בערב!', condition: (stats) => stats.nightOwl },
  { id: 'weekend_warrior', icon: '🎮', title: 'לוחם/ת סופ"ש', desc: 'תרגלת בסוף שבוע!', condition: (stats) => stats.weekendPractice },
];

// Check which new achievements were unlocked
export function checkNewAchievements(stats) {
  const unlockedIds = JSON.parse(localStorage.getItem('unlockedAchievements') || '[]');
  const newlyUnlocked = [];
  
  achievements.forEach(achievement => {
    if (!unlockedIds.includes(achievement.id) && achievement.condition(stats)) {
      newlyUnlocked.push(achievement);
      unlockedIds.push(achievement.id);
    }
  });
  
  localStorage.setItem('unlockedAchievements', JSON.stringify(unlockedIds));
  return newlyUnlocked;
}

// Get all unlocked achievements
export function getUnlockedAchievements() {
  const unlockedIds = JSON.parse(localStorage.getItem('unlockedAchievements') || '[]');
  return achievements.filter(a => unlockedIds.includes(a.id));
}
