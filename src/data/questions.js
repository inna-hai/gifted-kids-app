// Difficulty levels: 1 = easy, 2 = medium, 3 = hard

export const questionsBank = {
  'sequences-numbers': [
    // Easy (level 1)
    { question: 'מה המספר הבא בסדרה? 1, 2, 3, 4, ?', answers: ['5', '6', '7', '8'], correct: '5', difficulty: 1 },
    { question: 'מה המספר הבא בסדרה? 2, 4, 6, 8, ?', answers: ['9', '10', '11', '12'], correct: '10', difficulty: 1 },
    { question: 'מה המספר הבא בסדרה? 5, 10, 15, 20, ?', answers: ['22', '24', '25', '30'], correct: '25', difficulty: 1 },
    { question: 'מה המספר הבא בסדרה? 10, 20, 30, 40, ?', answers: ['45', '50', '55', '60'], correct: '50', difficulty: 1 },
    // Medium (level 2)
    { question: 'מה המספר הבא בסדרה? 1, 3, 5, 7, ?', answers: ['8', '9', '10', '11'], correct: '9', difficulty: 2 },
    { question: 'מה המספר הבא בסדרה? 3, 6, 9, 12, ?', answers: ['13', '14', '15', '16'], correct: '15', difficulty: 2 },
    { question: 'מה המספר הבא בסדרה? 2, 5, 8, 11, ?', answers: ['12', '13', '14', '15'], correct: '14', difficulty: 2 },
    { question: 'מה המספר הבא בסדרה? 100, 90, 80, 70, ?', answers: ['50', '55', '60', '65'], correct: '60', difficulty: 2 },
    // Hard (level 3)
    { question: 'מה המספר הבא בסדרה? 1, 2, 4, 8, ?', answers: ['10', '12', '14', '16'], correct: '16', difficulty: 3 },
    { question: 'מה המספר הבא בסדרה? 1, 4, 9, 16, ?', answers: ['20', '23', '25', '28'], correct: '25', difficulty: 3 },
    { question: 'מה המספר הבא בסדרה? 2, 6, 12, 20, ?', answers: ['28', '30', '32', '36'], correct: '30', difficulty: 3 },
    { question: 'מה המספר הבא בסדרה? 1, 1, 2, 3, 5, ?', answers: ['6', '7', '8', '9'], correct: '8', difficulty: 3 },
  ],

  'sequences-shapes': [
    // Easy (level 1)
    { question: 'איזו צורה ממשיכה את הסדרה?', image: '🔵 🔴 🔵 🔴 ?', answers: ['🔵', '🔴', '🟢', '🟡'], correct: '🔵', difficulty: 1 },
    { question: 'איזו צורה ממשיכה את הסדרה?', image: '🔺 🔺 🔺 ?', answers: ['🔺', '🔻', '⬛', '⬜'], correct: '🔺', difficulty: 1 },
    { question: 'איזו צורה ממשיכה את הסדרה?', image: '⭐ ⭐ ⭐ ?', answers: ['⭐', '🌙', '☀️', '🌟'], correct: '⭐', difficulty: 1 },
    // Medium (level 2)
    { question: 'איזו צורה ממשיכה את הסדרה?', image: '⬛ ⬛ ⬜ ⬛ ⬛ ?', answers: ['⬛', '⬜', '🔲', '🔳'], correct: '⬜', difficulty: 2 },
    { question: 'איזו צורה ממשיכה את הסדרה?', image: '🔺 🔻 🔺 🔻 ?', answers: ['🔺', '🔻', '⬛', '⬜'], correct: '🔺', difficulty: 2 },
    { question: 'איזו צורה ממשיכה את הסדרה?', image: '🔷 🔶 🔷 🔶 ?', answers: ['🔷', '🔶', '💠', '🔸'], correct: '🔷', difficulty: 2 },
    // Hard (level 3)
    { question: 'איזו צורה ממשיכה את הסדרה?', image: '⭐ ⭐ 🌙 ⭐ ⭐ ?', answers: ['⭐', '🌙', '☀️', '🌟'], correct: '🌙', difficulty: 3 },
    { question: 'איזו צורה ממשיכה את הסדרה?', image: '🍎 🍊 🍋 🍎 🍊 ?', answers: ['🍎', '🍊', '🍋', '🍇'], correct: '🍋', difficulty: 3 },
    { question: 'איזו צורה ממשיכה את הסדרה?', image: '➡️ ⬆️ ⬅️ ⬇️ ?', answers: ['➡️', '⬆️', '⬅️', '⬇️'], correct: '➡️', difficulty: 3 },
    { question: 'איזו צורה ממשיכה את הסדרה?', image: '🟢 🟢 🔵 🟢 🟢 🔵 🟢 ?', answers: ['🟢', '🔵', '🔴', '🟡'], correct: '🟢', difficulty: 3 },
  ],

  'word-problems': [
    // Easy (level 1)
    { question: 'לדני יש 3 תפוחים. הוא קיבל עוד 2 תפוחים. כמה תפוחים יש לדני?', answers: ['4', '5', '6', '7'], correct: '5', difficulty: 1 },
    { question: 'היו 5 ציפורים על העץ. 2 עפו. כמה נשארו?', answers: ['2', '3', '4', '5'], correct: '3', difficulty: 1 },
    { question: 'לשרה יש 4 בובות. היא קיבלה עוד 3. כמה בובות יש לה?', answers: ['5', '6', '7', '8'], correct: '7', difficulty: 1 },
    // Medium (level 2)
    { question: 'לדני יש 5 תפוחים. הוא קיבל עוד 3 תפוחים. כמה תפוחים יש לדני עכשיו?', answers: ['6', '7', '8', '9'], correct: '8', difficulty: 2 },
    { question: 'בכיתה יש 12 ילדים. 4 ילדים יצאו להפסקה. כמה ילדים נשארו בכיתה?', answers: ['6', '7', '8', '9'], correct: '8', difficulty: 2 },
    { question: 'לשרה יש 10 סוכריות. היא נתנה 3 סוכריות לחברה. כמה סוכריות נשארו לשרה?', answers: ['5', '6', '7', '8'], correct: '7', difficulty: 2 },
    // Hard (level 3)
    { question: 'בחנות יש 4 מדפים. בכל מדף יש 5 ספרים. כמה ספרים יש בסך הכל?', answers: ['9', '15', '20', '25'], correct: '20', difficulty: 3 },
    { question: 'יוסי קנה 2 שקיות סוכריות. בכל שקית יש 6 סוכריות. כמה סוכריות יש ליוסי?', answers: ['8', '10', '12', '14'], correct: '12', difficulty: 3 },
    { question: 'אוטובוס יכול להכיל 30 נוסעים. עלו 12 נוסעים בתחנה הראשונה ו-8 בתחנה השנייה. כמה מקומות פנויים נשארו?', answers: ['8', '10', '12', '14'], correct: '10', difficulty: 3 },
    { question: 'לאמא יש 20 ש"ח. היא קנתה לחם ב-8 ש"ח וחלב ב-5 ש"ח. כמה כסף נשאר לה?', answers: ['5', '6', '7', '8'], correct: '7', difficulty: 3 },
  ],

  'analogies': [
    // Easy (level 1)
    { question: 'כלב : נביחה = חתול : ?', answers: ['נהימה', 'מיאו', 'שריקה', 'צפצוף'], correct: 'מיאו', difficulty: 1 },
    { question: 'יד : כפפה = רגל : ?', answers: ['נעל', 'חולצה', 'כובע', 'מכנס'], correct: 'נעל', difficulty: 1 },
    { question: 'גדול : קטן = חם : ?', answers: ['חמים', 'קר', 'רטוב', 'יבש'], correct: 'קר', difficulty: 1 },
    { question: 'הקשר בין פרה לחלב הוא כמו הקשר בין תרנגולת ל...?', answers: ['נוצה', 'ביצה', 'לול', 'אפרוח'], correct: 'ביצה', difficulty: 1 },
    { question: 'הקשר בין שנה לחודש הוא כמו הקשר בין שבוע ל...?', answers: ['שעה', 'דקה', 'יום', 'חודש'], correct: 'יום', difficulty: 1 },
    { question: 'הקשר בין דג למים הוא כמו הקשר בין ציפור ל...?', answers: ['קן', 'שמיים', 'עץ', 'נוצות'], correct: 'שמיים', difficulty: 1 },
    { question: 'הקשר בין עין לראות הוא כמו הקשר בין אוזן ל...?', answers: ['לשמוע', 'להריח', 'לטעום', 'לגעת'], correct: 'לשמוע', difficulty: 1 },
    // Medium (level 2)
    { question: 'ציפור : קן = דג : ?', answers: ['עץ', 'ים', 'מערה', 'בית'], correct: 'ים', difficulty: 2 },
    { question: 'עיניים : לראות = אוזניים : ?', answers: ['להריח', 'לטעום', 'לשמוע', 'לגעת'], correct: 'לשמוע', difficulty: 2 },
    { question: 'שמש : יום = ירח : ?', answers: ['בוקר', 'צהריים', 'לילה', 'ערב'], correct: 'לילה', difficulty: 2 },
    { question: 'הקשר בין פרח לזר הוא כמו הקשר בין כדורגלן ל...?', answers: ['כדור', 'קבוצה', 'מגרש', 'נעליים'], correct: 'קבוצה', difficulty: 2 },
    { question: 'הקשר בין ספה לסלון הוא כמו הקשר בין מיטה ל...?', answers: ['מטבח', 'חדר שינה', 'חדר אמבטיה', 'מרפסת'], correct: 'חדר שינה', difficulty: 2 },
    { question: 'הקשר בין מים לצמאון הוא כמו הקשר בין אוכל ל...?', answers: ['שובע', 'רעב', 'טעם', 'בישול'], correct: 'רעב', difficulty: 2 },
    { question: 'הקשר בין נצן לפרי הוא כמו הקשר בין ילד ל...?', answers: ['תינוק', 'מבוגר', 'בית ספר', 'משחק'], correct: 'מבוגר', difficulty: 2 },
    { question: 'הקשר בין קיץ לים הוא כמו הקשר בין חורף ל...?', answers: ['שמש', 'שלג', 'גשם', 'קור'], correct: 'שלג', difficulty: 2 },
    { question: 'הקשר בין רופא לחולה הוא כמו הקשר בין מורה ל...?', answers: ['בית ספר', 'ספר', 'תלמיד', 'לוח'], correct: 'תלמיד', difficulty: 2 },
    // Hard (level 3)
    { question: 'מורה : בית ספר = רופא : ?', answers: ['משרד', 'חנות', 'בית חולים', 'מגרש'], correct: 'בית חולים', difficulty: 3 },
    { question: 'פרח : גינה = ספר : ?', answers: ['שולחן', 'ספרייה', 'תיק', 'עט'], correct: 'ספרייה', difficulty: 3 },
    { question: 'בוקר : ערב = התחלה : ?', answers: ['אמצע', 'סוף', 'צהריים', 'לילה'], correct: 'סוף', difficulty: 3 },
    { question: 'אריה : חיה = תפוז : ?', answers: ['ירק', 'פרי', 'עץ', 'מים'], correct: 'פרי', difficulty: 3 },
    { question: 'הקשר בין עץ לנייר הוא כמו הקשר בין חול ל...?', answers: ['ים', 'מדבר', 'זכוכית', 'אבן'], correct: 'זכוכית', difficulty: 3 },
    { question: 'הקשר בין משפט למילה הוא כמו הקשר בין מילה ל...?', answers: ['אות', 'סיפור', 'ספר', 'נקודה'], correct: 'אות', difficulty: 3 },
    { question: 'הקשר בין מרק לחורף הוא כמו הקשר בין לביבה ל...?', answers: ['שמן', 'חנוכה', 'סופגניה', 'פסח'], correct: 'חנוכה', difficulty: 3 },
    { question: 'הקשר בין דבורה לדבש הוא כמו הקשר בין עכביש ל...?', answers: ['זבוב', 'קורים', 'רגליים', 'ארס'], correct: 'קורים', difficulty: 3 },
    { question: 'הקשר בין סופר לספר הוא כמו הקשר בין צייר ל...?', answers: ['מכחול', 'תמונה', 'צבע', 'גלריה'], correct: 'תמונה', difficulty: 3 },
    { question: 'הקשר בין שעון לזמן הוא כמו הקשר בין מד-חום ל...?', answers: ['חום', 'קור', 'מחלה', 'רופא'], correct: 'חום', difficulty: 3 },
    { question: 'הקשר בין כנף לציפור הוא כמו הקשר בין סנפיר ל...?', answers: ['ים', 'דג', 'שחייה', 'מים'], correct: 'דג', difficulty: 3 },
    { question: 'הקשר בין זרע לפרח הוא כמו הקשר בין ביצה ל...?', answers: ['תרנגולת', 'אפרוח', 'קליפה', 'חביתה'], correct: 'אפרוח', difficulty: 3 },
  ],

  'odd-one-out': [
    // Easy (level 1)
    { question: 'מה לא שייך לקבוצה?', image: '🍎 🍊 🍋 🥕', answers: ['🍎', '🍊', '🍋', '🥕'], correct: '🥕', difficulty: 1 },
    { question: 'מה לא שייך לקבוצה?', image: '🐕 🐈 🐁 🐟', answers: ['🐕', '🐈', '🐁', '🐟'], correct: '🐟', difficulty: 1 },
    { question: 'מה לא שייך לקבוצה?', image: '🌸 🌺 🌻 🌲', answers: ['🌸', '🌺', '🌻', '🌲'], correct: '🌲', difficulty: 1 },
    // Medium (level 2)
    { question: 'מה לא שייך לקבוצה?', answers: ['אדום', 'ירוק', 'עגול', 'כחול'], correct: 'עגול', difficulty: 2 },
    { question: 'מה לא שייך לקבוצה?', answers: ['כיסא', 'שולחן', 'מיטה', 'טלוויזיה'], correct: 'טלוויזיה', difficulty: 2 },
    { question: 'מה לא שייך לקבוצה?', image: '✈️ 🚗 🚲 🚀', answers: ['✈️', '🚗', '🚲', '🚀'], correct: '🚲', difficulty: 2 },
    // Hard (level 3)
    { question: 'מה לא שייך לקבוצה?', answers: ['ינואר', 'פברואר', 'שני', 'מרץ'], correct: 'שני', difficulty: 3 },
    { question: 'מה לא שייך לקבוצה?', answers: ['2', '4', '5', '8'], correct: '5', difficulty: 3 },
    { question: 'מה לא שייך לקבוצה?', answers: ['עיפרון', 'מחק', 'סרגל', 'כדור'], correct: 'כדור', difficulty: 3 },
  ],

  'matrices': [
    // Easy (level 1)
    { question: 'מה המספר שחסר בטבלה?\n| 1 | 2 | 3 |\n| 4 | 5 | ? |', answers: ['6', '7', '8', '9'], correct: '6', difficulty: 1 },
    { question: 'מה הצורה שחסרה?\n🔵 🔵\n🔵 ?', answers: ['🔵', '🔴', '🟢', '🟡'], correct: '🔵', difficulty: 1 },
    // Medium (level 2)
    { question: 'מה הצורה שחסרה בריבוע?\n🔵 🔴 ?\n🔴 🔵 🔴\n🔵 🔴 🔵', answers: ['🔵', '🔴', '🟢', '🟡'], correct: '🔵', difficulty: 2 },
    { question: 'מה המספר שחסר בטבלה?\n| 1 | 2 | 3 |\n| 4 | 5 | 6 |\n| 7 | 8 | ? |', answers: ['7', '8', '9', '10'], correct: '9', difficulty: 2 },
    // Hard (level 3)
    { question: 'מה הצורה שחסרה?\n⬜ ⬛ ⬜\n⬛ ⬜ ⬛\n⬜ ⬛ ?', answers: ['⬜', '⬛', '🔲', '🔳'], correct: '⬜', difficulty: 3 },
    { question: 'מה הצורה שחסרה בתבנית?\n🌟 🌟 🌙\n🌟 🌙 🌟\n🌙 🌟 ?', answers: ['🌟', '🌙', '⭐', '☀️'], correct: '🌟', difficulty: 3 },
    { question: 'מה המספר שחסר?\n| 2 | 4 | 6 |\n| 3 | 6 | 9 |\n| 4 | 8 | ? |', answers: ['10', '11', '12', '14'], correct: '12', difficulty: 3 },
  ],

  'sentence-completion': [
    // Easy (level 1)
    { question: 'הציפור _____ בשמיים.', answers: ['שוחה', 'עפה', 'רצה', 'זוחלת'], correct: 'עפה', difficulty: 1 },
    { question: 'הדג _____ במים.', answers: ['עף', 'רץ', 'שוחה', 'קופץ'], correct: 'שוחה', difficulty: 1 },
    { question: 'בלילה יוצאים ה_____.', answers: ['שמשות', 'עננים', 'כוכבים', 'ציפורים'], correct: 'כוכבים', difficulty: 1 },
    // Medium (level 2)
    { question: 'השמש זורחת ב_____ ושוקעת בערב.', answers: ['לילה', 'בוקר', 'צהריים', 'חושך'], correct: 'בוקר', difficulty: 2 },
    { question: 'בחורף יורד _____ ובקיץ חם.', answers: ['שמש', 'גשם', 'חום', 'רוח'], correct: 'גשם', difficulty: 2 },
    { question: 'אנחנו קוראים _____ בספרייה.', answers: ['אוכל', 'ספרים', 'טלוויזיה', 'מוזיקה'], correct: 'ספרים', difficulty: 2 },
    // Hard (level 3)
    { question: 'הילד _____ לבית הספר כל בוקר.', answers: ['ישן', 'הולך', 'אוכל', 'שר'], correct: 'הולך', difficulty: 3 },
    { question: 'כשאנחנו _____ אנחנו שותים מים.', answers: ['עייפים', 'שמחים', 'צמאים', 'עצובים'], correct: 'צמאים', difficulty: 3 },
    { question: 'הרופא עובד ב_____ ומטפל בחולים.', answers: ['מסעדה', 'בית חולים', 'בית ספר', 'חנות'], correct: 'בית חולים', difficulty: 3 },
  ],

  'missing-number': [
    // Easy (level 1)
    { question: 'מה המספר החסר? 2 + ? = 5', answers: ['2', '3', '4', '5'], correct: '3', difficulty: 1 },
    { question: 'מה המספר החסר? 1 + ? = 4', answers: ['2', '3', '4', '5'], correct: '3', difficulty: 1 },
    { question: 'מה המספר החסר? 6 - ? = 4', answers: ['1', '2', '3', '4'], correct: '2', difficulty: 1 },
    // Medium (level 2)
    { question: 'מה המספר החסר? 3 + ? = 7', answers: ['3', '4', '5', '6'], correct: '4', difficulty: 2 },
    { question: 'מה המספר החסר? ? + 5 = 12', answers: ['5', '6', '7', '8'], correct: '7', difficulty: 2 },
    { question: 'מה המספר החסר? 10 - ? = 6', answers: ['2', '3', '4', '5'], correct: '4', difficulty: 2 },
    // Hard (level 3)
    { question: 'מה המספר החסר? ? × 2 = 8', answers: ['2', '3', '4', '5'], correct: '4', difficulty: 3 },
    { question: 'מה המספר החסר? 15 - ? = 9', answers: ['4', '5', '6', '7'], correct: '6', difficulty: 3 },
    { question: 'מה המספר החסר? ? + ? = 10 (שני מספרים שווים)', answers: ['3', '4', '5', '6'], correct: '5', difficulty: 3 },
    { question: 'מה המספר החסר? 4 × ? = 20', answers: ['4', '5', '6', '7'], correct: '5', difficulty: 3 },
  ]
};
