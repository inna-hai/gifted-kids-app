import React from 'react';
import { motion } from 'framer-motion';

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
  return (
    <motion.div
      className="topics-screen"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
    >
      <div className="topics-header">
        <h1 className="greeting">היי {childName}! 👋</h1>
        <div className="stars-display">
          <span>⭐</span>
          <span>{stars} כוכבים</span>
        </div>
      </div>

      <div className="topics-grid">
        {topics.map((topic, index) => (
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
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
