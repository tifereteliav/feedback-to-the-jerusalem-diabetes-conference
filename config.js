// Google Forms Integration Configuration
const CONFIG = {
  // The actual URL where Google Forms receives form submissions
  formActionUrl: "https://docs.google.com/forms/d/e/1FAIpQLScTJ6ALhNPhF6N5a_Gk-b29-adlCFNDPEv3ExOqEBJudB4pWg/formResponse",
  
  // Mapping of form steps to Google Forms input name attributes (entry.XXXXXXXX)
  fields: {
    overallSatisfaction: "entry.809622584",      // 1. שביעות רצון כללית
    contentQuality: "entry.551520750",            // 2. איכות התוכן והרלוונטיות המקצועית
    lectureInnovation: "entry.1576838029",         // 3. עד כמה תכני ההרצאות חידשו
    interactiveChallenges: "entry.1314295044",     // 4. חווית הלמידה באתגרים האינטראקטיביים
    logisticsOrganization: "entry.182013579",     // 5. ארגון ולוגיסטיקה
    addedValueLecture: "entry.1229614979",         // 6. הרצאה בעלת ערך מוסף יוצא דופן
    lessRelevantLecture: "entry.1828528562"        // 7. הרצאה פחות רלוונטית או לא מחדשת
  }
};
