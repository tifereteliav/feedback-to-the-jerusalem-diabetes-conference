/**
 * Jerusalem Diabetes Conference - Feedback Form Logic
 * Handles interactive transitions, input selection, auto-advancing, 
 * Google Forms submission, and celebration animations.
 */

document.addEventListener("DOMContentLoaded", () => {
  // --- App State ---
  let currentStep = 0; // 0 = Welcome, 1-7 = Questions, 8 = Success
  const totalQuestions = 7;
  
  const answers = {
    overallSatisfaction: null,      // Step 1
    contentQuality: null,           // Step 2
    lectureInnovation: null,        // Step 3
    interactiveChallenges: null,    // Step 4
    logisticsOrganization: null,    // Step 5
    addedValueLecture: "",          // Step 6
    lessRelevantLecture: ""         // Step 7
  };

  // --- DOM Elements ---
  const welcomeSlide = document.getElementById("slide-welcome");
  const successSlide = document.getElementById("slide-success");
  const progressContainer = document.getElementById("progress-container");
  const progressBar = document.getElementById("progress-bar");
  const currentStepNumSpan = document.getElementById("current-step-num");
  const navControls = document.getElementById("navigation-controls");
  const btnStart = document.getElementById("btn-start");
  const btnPrev = document.getElementById("btn-prev");
  const btnNext = document.getElementById("btn-next");
  const nextBtnText = document.getElementById("next-btn-text");
  
  // --- Helper: Get Slide Element by Index ---
  function getSlideElement(step) {
    if (step === 0) return welcomeSlide;
    if (step === 8) return successSlide;
    return document.getElementById(`slide-${step}`);
  }

  // --- Step Navigation & Transitions ---
  function goToStep(targetStep) {
    if (targetStep < 0 || targetStep > 8) return;

    const currentSlide = getSlideElement(currentStep);
    const nextSlide = getSlideElement(targetStep);

    // 1. Trigger exit animation on current slide
    currentSlide.classList.add("slide-out");

    setTimeout(() => {
      // Hide current slide
      currentSlide.classList.remove("active", "slide-out");
      
      // 2. Set up next slide styles
      nextSlide.classList.add("slide-in");
      nextSlide.classList.add("active");

      // Trigger redraw/reflow to apply transitions
      nextSlide.offsetHeight; 

      // Remove transition helper class
      nextSlide.classList.remove("slide-in");

      // Update state
      currentStep = targetStep;
      
      // 3. Update UI elements based on new step
      updateNavigationUI();
    }, 350); // Matches CSS transition duration
  }

  // --- Update Navigation, Progress, and Footers ---
  function updateNavigationUI() {
    // Show/Hide Progress Bar
    if (currentStep > 0 && currentStep <= totalQuestions) {
      progressContainer.style.display = "block";
      const progressPercent = (currentStep / totalQuestions) * 100;
      progressBar.style.width = `${progressPercent}%`;
      currentStepNumSpan.textContent = currentStep;
    } else {
      progressContainer.style.display = "none";
    }

    // Show/Hide Navigation controls
    if (currentStep > 0 && currentStep <= totalQuestions) {
      navControls.style.display = "flex";
      
      // Previous button state
      btnPrev.disabled = (currentStep === 1);
      
      // Next button text
      if (currentStep === totalQuestions) {
        nextBtnText.textContent = "שלח משוב";
      } else {
        nextBtnText.textContent = "הבא";
      }
    } else {
      navControls.style.display = "none";
    }
  }

  // --- Auto-Advance Mechanism ---
  let autoAdvanceTimeout = null;
  function triggerAutoAdvance() {
    // Clear any pending auto-advances
    if (autoAdvanceTimeout) clearTimeout(autoAdvanceTimeout);
    
    autoAdvanceTimeout = setTimeout(() => {
      // Only auto-advance if we are on rating screens (steps 1 to 5)
      if (currentStep >= 1 && currentStep < 5) {
        goToStep(currentStep + 1);
      }
    }, 450); // Slight delay so the user witnesses the selection effect
  }

  // --- Input Validation ---
  function validateCurrentStep() {
    // We only validate rating questions (steps 1-5). Text questions (6-7) are optional.
    if (currentStep === 1 && !answers.overallSatisfaction) {
      showError(1);
      return false;
    }
    if (currentStep === 2 && !answers.contentQuality) {
      showError(2);
      return false;
    }
    if (currentStep === 3 && !answers.lectureInnovation) {
      showError(3);
      return false;
    }
    if (currentStep === 4 && !answers.interactiveChallenges) {
      showError(4);
      return false;
    }
    if (currentStep === 5 && !answers.logisticsOrganization) {
      showError(5);
      return false;
    }
    
    hideAllErrors();
    return true;
  }

  function showError(stepNum) {
    const errorEl = document.getElementById(`error-${stepNum}`);
    if (errorEl) errorEl.style.display = "block";
  }

  function hideAllErrors() {
    const errors = document.querySelectorAll(".error-msg");
    errors.forEach(err => err.style.display = "none");
  }

  // --- Interactions: Emoji Selection (Step 1) ---
  const emojiButtons = document.querySelectorAll(".emoji-btn");
  emojiButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      // Clear previous selection
      emojiButtons.forEach(b => b.classList.remove("selected"));
      
      // Select current
      btn.classList.add("selected");
      answers.overallSatisfaction = parseInt(btn.getAttribute("data-value"));
      
      hideAllErrors();
      triggerAutoAdvance();
    });
  });

  // --- Interactions: Star Ratings (Steps 2-5) ---
  const starWrappers = document.querySelectorAll(".star-rating-wrapper");
  starWrappers.forEach(wrapper => {
    const targetKey = wrapper.getAttribute("data-target");
    const starBtns = wrapper.querySelectorAll(".star-btn");
    
    starBtns.forEach(star => {
      star.addEventListener("click", () => {
        const ratingVal = parseInt(star.getAttribute("data-value"));
        answers[targetKey] = ratingVal;
        
        // Update styling classes for stars in this wrapper
        starBtns.forEach(s => {
          const val = parseInt(s.getAttribute("data-value"));
          if (val <= ratingVal) {
            s.classList.add("selected");
          } else {
            s.classList.remove("selected");
          }
        });
        
        hideAllErrors();
        triggerAutoAdvance();
      });
      
      // Optional: Add hover enhancements via JS if wanted, 
      // but CSS row-reverse handles general hover nicely.
    });
  });

  // --- Interactions: Text Fields (Steps 6-7) ---
  const textAddedValue = document.getElementById("text-added-value");
  const textLessRelevant = document.getElementById("text-less-relevant");

  textAddedValue.addEventListener("input", (e) => {
    answers.addedValueLecture = e.target.value;
  });

  textLessRelevant.addEventListener("input", (e) => {
    answers.lessRelevantLecture = e.target.value;
  });

  // --- Form Submission Pipeline ---
  function submitFeedback() {
    const form = document.getElementById("google-form");
    
    // Clear any pre-existing inputs
    form.innerHTML = "";
    form.action = CONFIG.formActionUrl;

    // Populate inputs dynamically from CONFIG mappings
    for (const [key, value] of Object.entries(answers)) {
      const entryId = CONFIG.fields[key];
      if (entryId) {
        const input = document.createElement("input");
        input.type = "hidden";
        input.name = entryId;
        // fallback to empty string if null (unfilled optional comments)
        input.value = value !== null ? value : ""; 
        form.appendChild(input);
      }
    }

    // Submit form targetting hidden iframe (no redirect!)
    form.submit();
    
    // Transition to Success Card
    goToStep(8);
    
    // Launch Confetti Celebration!
    triggerCelebration();
  }

  // --- Confetti Celebration Effects ---
  function triggerCelebration() {
    if (typeof confetti === "function") {
      // 1. Core Center Burst
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.55 },
        colors: ["#00f0ff", "#e9c46a", "#ffffff", "#008f9c"]
      });

      // 2. Left Side Cannon (delayed)
      setTimeout(() => {
        confetti({
          particleCount: 60,
          angle: 60,
          spread: 60,
          origin: { x: 0, y: 0.65 },
          colors: ["#00f0ff", "#e9c46a", "#ffffff"]
        });
      }, 200);

      // 3. Right Side Cannon (delayed)
      setTimeout(() => {
        confetti({
          particleCount: 60,
          angle: 120,
          spread: 60,
          origin: { x: 1, y: 0.65 },
          colors: ["#00f0ff", "#e9c46a", "#ffffff"]
        });
      }, 400);

      // 4. Subtle rain of gold stars
      setTimeout(() => {
        confetti({
          particleCount: 40,
          spread: 100,
          origin: { y: 0.3 },
          colors: ["#e9c46a", "#ffffff"]
        });
      }, 700);
    }
  }

  // --- Button Action Listeners ---
  btnStart.addEventListener("click", () => {
    goToStep(1);
  });

  btnPrev.addEventListener("click", () => {
    // If auto-advance is pending, cancel it
    if (autoAdvanceTimeout) clearTimeout(autoAdvanceTimeout);
    
    goToStep(currentStep - 1);
  });

  btnNext.addEventListener("click", () => {
    // If auto-advance is pending, cancel it
    if (autoAdvanceTimeout) clearTimeout(autoAdvanceTimeout);
    
    if (validateCurrentStep()) {
      if (currentStep === totalQuestions) {
        submitFeedback();
      } else {
        goToStep(currentStep + 1);
      }
    }
  });
});
