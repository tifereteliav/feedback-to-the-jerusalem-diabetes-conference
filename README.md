# כנס סוכרת והשמנה: ניהול אינטגרטיבי וחדשנות - טופס משוב אינטראקטיבי

טופס משוב חדשני, מונפש וחוויתי בעיצוב Glassmorphism פרימיום, המיועד למילוי משוב על ידי משתתפי הכנס. התשובות נשלחות ישירות לטופס גוגל (Google Forms) ללא צורך במערכת Backend או שרת ייעודי.

## ✨ תכונות עיקריות (Features)
- **עיצוב מרהיב ויוקרתי (Premium Dark Glassmorphism)**: צבעי מותג הכנס (כחול עמוק, זהב וטורקיז זוהר) בשילוב כרטיסיות שקופות למחצה וצללית מרהיבה של חומות ירושלים.
- **אנימציות עדינות (Micro-Animations)**: כפתורי אמוג'י אינטראקטיביים שקופצים ומאירים בבחירה, דירוג כוכבים זוהר, ואנימציית קו-דופק (ECG) מונפשת.
- **מעבר שלבים אוטומטי (Auto-Advance)**: לאחר בחירת דירוג, השאלה הבאה מוחלקת למסך באופן אוטומטי לאחר חצי שנייה לשיפור חווית המילוי.
- **אינטגרציה חלקה ל-Google Forms**: שליחת הנתונים מתבצעת ברקע דרך `iframe` נסתר על מנת למנוע מעבר לדף ברירת המחדל של גוגל.
- **חגיגת סיום (Celebration Screen)**: שליחת הטופס בהצלחה מפעילה מטח קונפטי דינמי (בטכנולוגיית Canvas Confetti).
- **רספונסיביות מלאה ותמיכה ב-RTL**: מותאם בצורה מושלמת לטלפונים ניידים וטאבלטים.

---

## 🛠️ טכנולוגיות (Tech Stack)
- HTML5 (Semantic & Accessible)
- Vanilla CSS3 (Custom Variables, Keyframe Animations, Flexbox & Grid Layouts)
- Modern JavaScript (ES6+, DOM Manipulation)
- [Canvas Confetti](https://github.com/catdad/canvas-confetti) (CDN)

---

## ⚙️ הגדרות וחיבור לטופס גוגל (Configuration)
החיבור לטופס הגוגל שלכם מוגדר בקובץ `config.js`. 
ניתן לערוך את הלינק ואת מזהי השדות לפי הצורך:

```javascript
const CONFIG = {
  // כתובת שליחת המשוב של גוגל פורמס
  formActionUrl: "https://docs.google.com/forms/d/e/YOUR-FORM-ID/formResponse",
  
  // מזהי השדות כפי שמתקבלים בטופס שמולא מראש (entry.XXXXXXXX)
  fields: {
    overallSatisfaction: "entry.809622584",
    contentQuality: "entry.551520750",
    lectureInnovation: "entry.1576838029",
    interactiveChallenges: "entry.1314295044",
    logisticsOrganization: "entry.182013579",
    addedValueLecture: "entry.1229614979",
    lessRelevantLecture: "entry.1828528562"
  }
};
```

---

## 🚀 הרצה מקומית (How to Run)
1. שכפלו את הפרויקט או הורידו את הקבצים.
2. פתחו את קובץ `index.html` ישירות בדפדפן, או הריצו שרת מקומי מהיר:
   ```bash
   npx http-server -p 8080
   ```
