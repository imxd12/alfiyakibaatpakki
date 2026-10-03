/**
 * MOHABBAT KA AAGHAZ — DATE ANNOUNCEMENT SCRIPT
 * Pure Vanilla JavaScript: High-performance, Accessible, Mobile-first
 * 
 * Comprehensive Suite:
 * 1. 3D Envelope Opening Choreography (Shimmer -> Flap -> Rise -> Draw -> Names)
 * 2. Auto Song Playback on "Tap to Open" click (User-Gesture enabled)
 * 3. Strict Viewport & Scroll Locking until Opened
 * 4. High-DPI Canvas Scratch-to-Reveal with devicePixelRatio calibration
 * 5. Interactive "Bhejiye Dua" Jasmine Petal & Gold Stardust Shower
 * 6. WhatsApp Sharing & Direct Wishes
 * 7. One-Click 1080x1920 High-Res Story Card Image Export
 * 8. Live Real-Time Countdown to 27 November 2026 (Days, Hours, Minutes, Seconds)
 * 9. Web Audio Native Chime Resonance (Zero external sound files needed)
 * 10. Add-to-Calendar (.ics) instant generation
 * 11. 3D Parallax & Gyroscope Tilt Effects
 * 12. Audio Controller with Soundwave Equalizer
 */

(function () {
  'use strict';

  // ==========================================================================
  // DOM ELEMENT REFERENCES
  // ==========================================================================
  const body = document.body;
  const tapToOpenBtn = document.getElementById('tapToOpenBtn');
  const openTriggerTextBtn = document.getElementById('openTriggerTextBtn');
  const skipAnimationBtn = document.getElementById('skipAnimationBtn');
  const momentOpening = document.getElementById('momentOpening');
  const momentNames = document.getElementById('momentNames');
  const momentDate = document.getElementById('momentDate');
  const announcementCard = document.getElementById('announcementCard');
  const envelopeTiltWrapper = document.getElementById('envelopeTiltWrapper');
  const cardTiltWrapper = document.getElementById('cardTiltWrapper');

  // Date Scratch & Reveal Elements
  const scratchCanvas = document.getElementById('scratchCanvas');
  const heartChamber = document.getElementById('heartChamber');
  const scratchHint = document.getElementById('scratchHint');
  const fallbackRevealBtn = document.getElementById('fallbackRevealBtn');
  const scrollCue = document.querySelector('.scroll-down-invitation');

  // Countdown Elements
  const countDays = document.getElementById('countDays');
  const countHours = document.getElementById('countHours');
  const countMinutes = document.getElementById('countMinutes');
  const countSeconds = document.getElementById('countSeconds');
  const addToCalendarBtn = document.getElementById('addToCalendarBtn');

  // Blessings & WhatsApp Hub Elements
  const blessingsCanvas = document.getElementById('blessingsCanvas');
  const sendDuaBtn = document.getElementById('sendDuaBtn');
  const whatsappWishBtn = document.getElementById('whatsappWishBtn');
  const whatsappShareBtn = document.getElementById('whatsappShareBtn');
  const downloadStoryBtn = document.getElementById('downloadStoryBtn');
  const storyExportCanvas = document.getElementById('storyExportCanvas');
  const toastNotification = document.getElementById('toastNotification');
  const toastMessage = document.getElementById('toastMessage');

  // Audio Control Elements
  const musicToggle = document.getElementById('musicToggle');
  const invitationAudio = document.getElementById('invitationAudio');

  // State Variables
  let isEnvelopeOpened = false;
  let isDateRevealed = false;
  let isScratching = false;
  let scratchCtx = null;
  let canvasWidth = 0;
  let canvasHeight = 0;
  let lastX = 0;
  let lastY = 0;
  let scratchCheckThrottleTimer = null;
  let scratchedStrokeCount = 0;

  // Reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Target Date: Jumu'ah, 27 November 2026, 11:00:00 AM IST
  const TARGET_NIKAH_DATE = new Date('2026-11-27T11:00:00+05:30').getTime();

  // Web Audio Context for Chimes (Initialized on user gesture)
  let audioCtx = null;

  function getAudioContext() {
    if (!audioCtx) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (AudioContextClass) {
        audioCtx = new AudioContextClass();
      }
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    return audioCtx;
  }

  // Pure Web Audio Synthesizer: Sacred Crystal Chime / Harp Resonance
  function playSacredChime(frequencies = [528, 660, 792, 1056]) {
    try {
      const ctx = getAudioContext();
      if (!ctx) return;

      const now = ctx.currentTime;
      frequencies.forEach((freq, index) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + index * 0.08);

        gain.gain.setValueAtTime(0.001, now + index * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.12, now + index * 0.08 + 0.04);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + index * 0.08 + 1.6);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now + index * 0.08);
        osc.stop(now + index * 0.08 + 1.8);
      });
    } catch (e) {
      // Audio autoplay restrictions fail silently
    }
  }

  // ==========================================================================
  // TOAST NOTIFICATION HELPER
  // ==========================================================================
  let toastTimeout = null;
  function showToast(msg) {
    if (!toastNotification || !toastMessage) return;
    toastMessage.textContent = msg;
    toastNotification.classList.add('is-active');

    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => {
      toastNotification.classList.remove('is-active');
    }, 3800);
  }

  // ==========================================================================
  // AUTO PLAY MUSIC HELPER (ON USER GESTURE "TAP TO OPEN")
  // ==========================================================================
  function playMusicAutomatically() {
    if (!invitationAudio) return;

    invitationAudio.volume = 0.65;
    const playPromise = invitationAudio.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          if (musicToggle) {
            musicToggle.classList.add('is-playing');
            musicToggle.setAttribute('aria-label', 'Pause background music');
          }
        })
        .catch((error) => {
          console.log('Auto playback was restricted:', error);
        });
    }
  }

  // ==========================================================================
  // 1. OPENING INVITATION ENVELOPE CHOREOGRAPHY (REFINED 4-5 SEC SEQUENCE)
  // ==========================================================================
  function openEnvelope(isImmediate = false) {
    if (isEnvelopeOpened) return;
    isEnvelopeOpened = true;

    // Auto-play the background song (Din Shagna Da) on user click
    playMusicAutomatically();

    // Play gentle opening chime
    playSacredChime([440, 554, 659, 880]);

    if (isImmediate || prefersReducedMotion) {
      body.classList.remove('is-sealed');
      body.classList.add('is-opened');
      if (momentOpening) momentOpening.style.display = 'none';
      if (momentNames) {
        momentNames.scrollIntoView({ behavior: 'auto' });
      }
      return;
    }

    // Phase a: Seal Golden Shimmer
    body.classList.add('is-opening');

    // Phase b: Flap opens with 3D transform (0.3s) and Phase c: Card rises out (1.0s)
    setTimeout(() => {
      // Unlock the page and reveal all sections below
      body.classList.remove('is-sealed');
      body.classList.add('is-opened');

      // Scroll smoothly down to the centered grand announcement card
      setTimeout(() => {
        if (announcementCard) {
          announcementCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 1400);

      setTimeout(() => {
        if (momentOpening) {
          momentOpening.style.display = 'none';
        }
      }, 3500);

    }, 1200);
  }

  if (tapToOpenBtn) {
    tapToOpenBtn.addEventListener('click', () => openEnvelope(false));
  }
  if (openTriggerTextBtn) {
    openTriggerTextBtn.addEventListener('click', () => openEnvelope(false));
  }

  if (skipAnimationBtn) {
    skipAnimationBtn.addEventListener('click', () => {
      openEnvelope(true);
      skipAnimationBtn.style.display = 'none';
    });
  }

  if (scrollCue) {
    const handleScrollCue = () => {
      if (momentDate) {
        momentDate.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    };
    scrollCue.addEventListener('click', handleScrollCue);
    scrollCue.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handleScrollCue();
      }
    });
  }

  // ==========================================================================
  // 2. INTERSECTION OBSERVER FOR HEART DRAWING & SCROLL REVEALS
  // ==========================================================================
  function initIntersectionObserver() {
    if (!('IntersectionObserver' in window)) {
      if (momentDate) momentDate.classList.add('heart-drawn');
      document.querySelectorAll('.scroll-reveal').forEach(el => el.classList.add('is-visible'));
      return;
    }

    const heartObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('heart-drawn');
          resizeScratchCanvas();
          heartObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.25 });

    if (momentDate) {
      heartObserver.observe(momentDate);
    }

    const scrollObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          scrollObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    document.querySelectorAll('.scroll-reveal').forEach(el => {
      scrollObserver.observe(el);
    });
  }

  // ==========================================================================
  // 3. NATIVE CANVAS SCRATCH-TO-REVEAL EFFECT (HIGH-DPI CALIBRATED)
  // ==========================================================================
  function initScratchCanvas() {
    if (!scratchCanvas || !heartChamber) return;

    scratchCtx = scratchCanvas.getContext('2d', { willReadFrequently: true });
    if (!scratchCtx) return;

    resizeScratchCanvas();
    attachScratchEvents();
  }

  function resizeScratchCanvas() {
    if (!scratchCanvas || !heartChamber || isDateRevealed) return;

    const rect = heartChamber.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;

    const dpr = window.devicePixelRatio || 1;
    canvasWidth = rect.width;
    canvasHeight = rect.height;

    scratchCanvas.width = canvasWidth * dpr;
    scratchCanvas.height = canvasHeight * dpr;
    scratchCanvas.style.width = `${canvasWidth}px`;
    scratchCanvas.style.height = `${canvasHeight}px`;

    scratchCtx.scale(dpr, dpr);
    drawGoldFoilLayer();
  }

  function drawGoldFoilLayer() {
    if (!scratchCtx) return;

    scratchCtx.save();
    scratchCtx.globalCompositeOperation = 'source-over';

    const gradient = scratchCtx.createRadialGradient(
      canvasWidth * 0.5, canvasHeight * 0.45, 10,
      canvasWidth * 0.5, canvasHeight * 0.5, canvasWidth * 0.65
    );
    gradient.addColorStop(0, '#FFF2CA');
    gradient.addColorStop(0.35, '#E2C889');
    gradient.addColorStop(0.75, '#B9914B');
    gradient.addColorStop(1, '#8C682A');

    scratchCtx.fillStyle = gradient;
    scratchCtx.fillRect(0, 0, canvasWidth, canvasHeight);

    scratchCtx.fillStyle = 'rgba(255, 255, 255, 0.45)';
    const numSpecks = 40;
    for (let i = 0; i < numSpecks; i++) {
      const x = (Math.sin(i * 99) * 0.5 + 0.5) * canvasWidth;
      const y = (Math.cos(i * 77) * 0.5 + 0.5) * canvasHeight;
      const r = (i % 3 === 0) ? 2 : 1;
      scratchCtx.beginPath();
      scratchCtx.arc(x, y, r, 0, Math.PI * 2);
      scratchCtx.fill();
    }

    scratchCtx.fillStyle = 'rgba(18, 59, 50, 0.9)';
    scratchCtx.font = `600 ${Math.max(14, canvasWidth * 0.052)}px 'Cormorant Garamond', Georgia, serif`;
    scratchCtx.textAlign = 'center';
    scratchCtx.textBaseline = 'middle';
    scratchCtx.fillText('Khurch kar tareekh dekhiye', canvasWidth / 2, canvasHeight / 2 - 14);

    scratchCtx.fillStyle = 'rgba(140, 104, 42, 0.9)';
    scratchCtx.font = `500 ${Math.max(11, canvasWidth * 0.038)}px 'Plus Jakarta Sans', sans-serif`;
    scratchCtx.fillText('✦ Scratch gently to reveal ✦', canvasWidth / 2, canvasHeight / 2 + 14);

    scratchCtx.restore();
  }

  function getPointerPos(event) {
    const rect = scratchCanvas.getBoundingClientRect();
    let clientX = event.clientX;
    let clientY = event.clientY;

    if (event.touches && event.touches.length > 0) {
      clientX = event.touches[0].clientX;
      clientY = event.touches[0].clientY;
    }

    return {
      x: clientX - rect.left,
      y: clientY - rect.top
    };
  }

  function startScratching(e) {
    if (isDateRevealed) return;
    isScratching = true;

    if (scratchHint) {
      scratchHint.style.opacity = '0';
      setTimeout(() => scratchHint.remove(), 400);
    }

    const pos = getPointerPos(e);
    lastX = pos.x;
    lastY = pos.y;
    scratch(pos.x, pos.y);
  }

  function handleScratchMove(e) {
    if (!isScratching || isDateRevealed) return;
    if (e.cancelable) e.preventDefault();

    const pos = getPointerPos(e);
    scratchLine(lastX, lastY, pos.x, pos.y);
    lastX = pos.x;
    lastY = pos.y;
    scratchedStrokeCount++;

    scheduleScratchCheck();
  }

  function stopScratching() {
    isScratching = false;
  }

  function scratch(x, y) {
    if (!scratchCtx) return;
    scratchCtx.save();
    scratchCtx.globalCompositeOperation = 'destination-out';
    scratchCtx.beginPath();
    const brushRadius = Math.max(22, canvasWidth * 0.095);
    scratchCtx.arc(x, y, brushRadius, 0, Math.PI * 2);
    scratchCtx.fill();
    scratchCtx.restore();
  }

  function scratchLine(x1, y1, x2, y2) {
    if (!scratchCtx) return;
    scratchCtx.save();
    scratchCtx.globalCompositeOperation = 'destination-out';
    scratchCtx.lineWidth = Math.max(44, canvasWidth * 0.19);
    scratchCtx.lineCap = 'round';
    scratchCtx.lineJoin = 'round';
    scratchCtx.beginPath();
    scratchCtx.moveTo(x1, y1);
    scratchCtx.lineTo(x2, y2);
    scratchCtx.stroke();
    scratchCtx.restore();
  }

  function attachScratchEvents() {
    scratchCanvas.addEventListener('pointerdown', startScratching, { passive: true });
    window.addEventListener('pointermove', handleScratchMove, { passive: false });
    window.addEventListener('pointerup', stopScratching, { passive: true });
    window.addEventListener('pointercancel', stopScratching, { passive: true });

    scratchCanvas.addEventListener('touchstart', startScratching, { passive: true });
    scratchCanvas.addEventListener('touchmove', handleScratchMove, { passive: false });
    window.addEventListener('touchend', stopScratching, { passive: true });
  }

  function scheduleScratchCheck() {
    if (scratchCheckThrottleTimer || isDateRevealed) return;
    scratchCheckThrottleTimer = setTimeout(() => {
      scratchCheckThrottleTimer = null;
      checkScratchPercentage();
    }, 180);
  }

  function checkScratchPercentage() {
    if (!scratchCtx || isDateRevealed) return;

    if (scratchedStrokeCount > 35) {
      completeDateReveal();
      return;
    }

    try {
      const dpr = window.devicePixelRatio || 1;
      const w = Math.floor(canvasWidth * dpr);
      const h = Math.floor(canvasHeight * dpr);
      const stride = 18;
      const imgData = scratchCtx.getImageData(0, 0, w, h);
      const data = imgData.data;

      let transparentPixels = 0;
      let totalSampled = 0;

      for (let y = 0; y < h; y += stride) {
        for (let x = 0; x < w; x += stride) {
          const alphaIndex = (y * w + x) * 4 + 3;
          totalSampled++;
          if (data[alphaIndex] < 64) {
            transparentPixels++;
          }
        }
      }

      const percentCleared = (transparentPixels / totalSampled) * 100;
      if (percentCleared >= 40) {
        completeDateReveal();
      }
    } catch (e) {
      if (scratchedStrokeCount > 20) {
        completeDateReveal();
      }
    }
  }

  function completeDateReveal() {
    if (isDateRevealed) return;
    isDateRevealed = true;

    playSacredChime([528, 660, 792, 1056]);
    triggerFlowerShower(40);

    if (momentDate) {
      momentDate.classList.add('date-is-revealed');
    }

    if (scratchCanvas) {
      scratchCanvas.classList.add('fade-out');
      setTimeout(() => {
        scratchCanvas.style.display = 'none';
      }, 800);
    }

    if (fallbackRevealBtn) {
      fallbackRevealBtn.style.opacity = '0';
      setTimeout(() => {
        fallbackRevealBtn.style.display = 'none';
      }, 400);
    }

    if (scratchHint) {
      scratchHint.remove();
    }
  }

  if (fallbackRevealBtn) {
    fallbackRevealBtn.addEventListener('click', completeDateReveal);
  }

  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      if (!isDateRevealed) {
        resizeScratchCanvas();
      }
      initBlessingsCanvasSize();
    }, 200);
  });


  // ==========================================================================
  // 4. INTERACTIVE "BHEJIYE DUA" FLOWER SHOWER PHYSICS (PURE VANILLA CANVAS)
  // ==========================================================================
  let blessingParticles = [];
  let blessingsCtx = null;
  let isPetalAnimationRunning = false;

  function initBlessingsCanvasSize() {
    if (!blessingsCanvas) return;
    const dpr = window.devicePixelRatio || 1;
    blessingsCanvas.width = window.innerWidth * dpr;
    blessingsCanvas.height = window.innerHeight * dpr;
    blessingsCtx = blessingsCanvas.getContext('2d');
    if (blessingsCtx) {
      blessingsCtx.scale(dpr, dpr);
    }
  }

  function triggerFlowerShower(count = 55) {
    initBlessingsCanvasSize();
    if (!blessingsCtx) return;

    const colors = ['#C99B91', '#DFB7AE', '#FFF2CA', '#E2C889', '#F7F2E8'];

    for (let i = 0; i < count; i++) {
      blessingParticles.push({
        x: Math.random() * window.innerWidth,
        y: -20 - Math.random() * 80,
        vx: (Math.random() - 0.5) * 2.5,
        vy: 1.8 + Math.random() * 2.8,
        size: 8 + Math.random() * 12,
        rotation: Math.random() * Math.PI * 2,
        vRot: (Math.random() - 0.5) * 0.08,
        color: colors[Math.floor(Math.random() * colors.length)],
        type: Math.random() > 0.4 ? 'petal' : 'star',
        alpha: 1,
        life: 0
      });
    }

    if (!isPetalAnimationRunning) {
      isPetalAnimationRunning = true;
      requestAnimationFrame(renderBlessingParticles);
    }
  }

  function renderBlessingParticles() {
    if (!blessingsCtx) return;
    blessingsCtx.clearRect(0, 0, window.innerWidth, window.innerHeight);

    for (let i = blessingParticles.length - 1; i >= 0; i--) {
      const p = blessingParticles[i];
      p.x += p.vx + Math.sin(p.life * 0.05) * 0.8;
      p.y += p.vy;
      p.rotation += p.vRot;
      p.life++;

      if (p.y > window.innerHeight - 80) {
        p.alpha -= 0.025;
      }

      if (p.alpha <= 0 || p.y > window.innerHeight + 40) {
        blessingParticles.splice(i, 1);
        continue;
      }

      blessingsCtx.save();
      blessingsCtx.globalAlpha = p.alpha;
      blessingsCtx.translate(p.x, p.y);
      blessingsCtx.rotate(p.rotation);

      if (p.type === 'petal') {
        blessingsCtx.fillStyle = p.color;
        blessingsCtx.beginPath();
        blessingsCtx.moveTo(0, -p.size);
        blessingsCtx.quadraticCurveTo(p.size * 0.8, 0, 0, p.size);
        blessingsCtx.quadraticCurveTo(-p.size * 0.8, 0, 0, -p.size);
        blessingsCtx.fill();
      } else {
        blessingsCtx.fillStyle = p.color;
        blessingsCtx.beginPath();
        blessingsCtx.arc(0, 0, p.size * 0.25, 0, Math.PI * 2);
        blessingsCtx.fill();
      }

      blessingsCtx.restore();
    }

    if (blessingParticles.length > 0) {
      requestAnimationFrame(renderBlessingParticles);
    } else {
      isPetalAnimationRunning = false;
      blessingsCtx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    }
  }

  // Handle "Bhejiye Dua" Button Tap
  if (sendDuaBtn) {
    sendDuaBtn.addEventListener('click', () => {
      triggerFlowerShower(65);
      playSacredChime([660, 880, 1056]);
      showToast('Aapki mubarakbaad aur dua shaamil ho gayi! 🌸');
    });
  }

  // ==========================================================================
  // 5. WHATSAPP SHARING & DIRECT WISHES
  // ==========================================================================
  if (whatsappWishBtn) {
    whatsappWishBtn.addEventListener('click', () => {
      showToast('WhatsApp khul raha hai...');
    });
  }

  if (whatsappShareBtn) {
    whatsappShareBtn.addEventListener('click', () => {
      const shareUrl = window.location.href;
      const shareText = encodeURIComponent(
        `Alhamdulillah! Ms. Alfiya Khan aur Mr. Jawwad Qazi ki Tareekh-e-Nikah tay ho gayi hai: Jumu'ah, 27 November 2026.\n\nEk nayi manzil ki ibtida... Dekhiye khas ailan:\n${shareUrl}`
      );
      const waShareUrl = `https://api.whatsapp.com/send?text=${shareText}`;
      window.open(waShareUrl, '_blank');
      showToast('Khushkhabri share ki ja rahi hai...');
    });
  }

  // ==========================================================================
  // 6. ONE-CLICK 1080x1920 HIGH-RES STORY CARD / WALLPAPER GENERATOR
  // ==========================================================================
  if (downloadStoryBtn && storyExportCanvas) {
    downloadStoryBtn.addEventListener('click', () => {
      showToast('Aesthetic Story Card taiyar ho raha hai...');

      const ctx = storyExportCanvas.getContext('2d');
      if (!ctx) return;

      const W = 1080;
      const H = 1920;

      // 1. Background Luxury Ivory & Subtle Radial Glow
      ctx.fillStyle = '#F7F2E8';
      ctx.fillRect(0, 0, W, H);

      const radGlow = ctx.createRadialGradient(W / 2, H * 0.45, 50, W / 2, H * 0.45, 600);
      radGlow.addColorStop(0, 'rgba(255, 242, 202, 0.4)');
      radGlow.addColorStop(1, 'rgba(247, 242, 232, 0)');
      ctx.fillStyle = radGlow;
      ctx.fillRect(0, 0, W, H);

      // 2. Mughal Gold Outer & Inner Frame
      ctx.strokeStyle = '#B9914B';
      ctx.lineWidth = 4;
      ctx.strokeRect(60, 60, W - 120, H - 120);

      ctx.lineWidth = 1.5;
      ctx.setLineDash([12, 8]);
      ctx.strokeRect(80, 80, W - 160, H - 160);
      ctx.setLineDash([]);

      // 3. Top Title & Bismillah
      ctx.textAlign = 'center';
      ctx.fillStyle = '#B9914B';
      ctx.font = '600 32px "Plus Jakarta Sans", sans-serif';
      ctx.fillText('✦ MOHABBAT KA AAGHAZ ✦', W / 2, 190);

      ctx.font = '700 48px "Amiri", Georgia, serif';
      ctx.fillStyle = '#123B32';
      ctx.fillText('بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ', W / 2, 280);

      ctx.font = 'italic 34px "Cormorant Garamond", Georgia, serif';
      ctx.fillStyle = '#3D4F48';
      ctx.fillText('Bismillah-ir-Rahman-ir-Raheem', W / 2, 330);

      // 4. Main Heading
      ctx.font = '600 52px "Cormorant Garamond", Georgia, serif';
      ctx.fillStyle = '#B9914B';
      ctx.fillText('AILAN-E-TAREEKH-E-NIKAH', W / 2, 450);

      ctx.font = 'italic 32px "Cormorant Garamond", Georgia, serif';
      ctx.fillStyle = '#C99B91';
      ctx.fillText('Alhamdulillah, Tareekh-e-Nikah Tay Ho Gayi', W / 2, 500);

      // 5. Couple Names Block
      ctx.font = '500 28px "Plus Jakarta Sans", sans-serif';
      ctx.fillStyle = '#8C682A';
      ctx.fillText('BRIDE', W / 2, 630);

      ctx.font = '700 84px "Cormorant Garamond", Georgia, serif';
      ctx.fillStyle = '#123B32';
      ctx.fillText('Ms. Alfiya Khan', W / 2, 720);

      ctx.font = 'italic 56px "Cormorant Garamond", Georgia, serif';
      ctx.fillStyle = '#B9914B';
      ctx.fillText('&', W / 2, 810);

      ctx.font = '500 28px "Plus Jakarta Sans", sans-serif';
      ctx.fillStyle = '#8C682A';
      ctx.fillText('GROOM', W / 2, 890);

      ctx.font = '700 84px "Cormorant Garamond", Georgia, serif';
      ctx.fillStyle = '#123B32';
      ctx.fillText('Mr. Jawwad Qazi', W / 2, 980);

      ctx.font = 'italic 34px "Cormorant Garamond", Georgia, serif';
      ctx.fillStyle = '#C99B91';
      ctx.fillText('“Do dilon ka haseen vaada”', W / 2, 1060);

      // 6. Confirmed Date Card Box
      ctx.fillStyle = '#123B32';
      ctx.beginPath();
      ctx.roundRect(180, 1140, W - 360, 360, 24);
      ctx.fill();
      ctx.strokeStyle = '#E2C889';
      ctx.lineWidth = 3;
      ctx.stroke();

      ctx.fillStyle = '#E2C889';
      ctx.font = '600 40px "Cormorant Garamond", Georgia, serif';
      ctx.fillText('JUMU’AH', W / 2, 1220);

      ctx.fillStyle = '#FFF2CA';
      ctx.font = '700 130px "Cormorant Garamond", Georgia, serif';
      ctx.fillText('27', W / 2, 1340);

      ctx.fillStyle = '#F7F2E8';
      ctx.font = '500 42px "Cormorant Garamond", Georgia, serif';
      ctx.fillText('NOVEMBER 2026', W / 2, 1420);

      // 7. Sacred Dua
      ctx.fillStyle = '#123B32';
      ctx.font = 'italic 36px "Cormorant Garamond", Georgia, serif';
      ctx.fillText('“Ek nayi manzil ki ibtida”', W / 2, 1590);

      ctx.fillStyle = '#17211E';
      ctx.font = 'italic 32px "Cormorant Garamond", Georgia, serif';
      ctx.fillText('“Allah is rishte ko mohabbat, sukoon aur barkat se bhar de. Aameen.”', W / 2, 1660);

      // 8. Footer Seal & Couple Monogram
      ctx.fillStyle = '#B9914B';
      ctx.font = '600 36px "Cormorant Garamond", Georgia, serif';
      ctx.fillText('Alfiya  ♥  Jawwad', W / 2, 1780);

      const link = document.createElement('a');
      link.download = 'Mohabbat_Ka_Aaghaz_Alfiya_Jawaad_27Nov2026.png';
      link.href = storyExportCanvas.toDataURL('image/png');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      showToast('Story Card download ho gaya! Status par lagayein.');
    });
  }


  // ==========================================================================
  // 7. LIVE REAL-TIME COUNTDOWN TO 27 NOVEMBER 2026
  // ==========================================================================
  function updateCountdown() {
    if (!countDays || !countHours || !countMinutes || !countSeconds) return;

    const now = new Date().getTime();
    const difference = TARGET_NIKAH_DATE - now;

    if (difference <= 0) {
      countDays.textContent = '00';
      countHours.textContent = '00';
      countMinutes.textContent = '00';
      countSeconds.textContent = '00';
      return;
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    countDays.textContent = days < 100 ? String(days).padStart(2, '0') : String(days);
    countHours.textContent = String(hours).padStart(2, '0');
    countMinutes.textContent = String(minutes).padStart(2, '0');
    countSeconds.textContent = String(seconds).padStart(2, '0');
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);


  // ==========================================================================
  // 8. ADD TO CALENDAR (.ICS FILE GENERATION)
  // ==========================================================================
  if (addToCalendarBtn) {
    addToCalendarBtn.addEventListener('click', () => {
      const title = 'Nikah: Ms. Alfiya Khan & Mr. Jawwad Qazi';
      const description = 'Alhamdulillah! Ailan-e-Tareekh-e-Nikah. Ek nayi manzil ki ibtida. Allah is rishte ko mohabbat, sukoon aur barkat se bhar de. Aameen.';
      const location = 'Confirmed Date Announcement';
      const startDate = '20261127T110000';
      const endDate = '20261127T160000';

      const icsContent = [
        'BEGIN:VCALENDAR',
        'VERSION:2.0',
        'PRODID:-//Mohabbat Ka Aaghaz//Date Announcement//EN',
        'CALSCALE:GREGORIAN',
        'METHOD:PUBLISH',
        'BEGIN:VEVENT',
        `SUMMARY:${title}`,
        `DESCRIPTION:${description}`,
        `LOCATION:${location}`,
        `DTSTART:${startDate}`,
        `DTEND:${endDate}`,
        'STATUS:CONFIRMED',
        'END:VEVENT',
        'END:VCALENDAR'
      ].join('\r\n');

      const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'Alfiya_Jawaad_Nikah_27Nov2026.ics';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(link.href);

      showToast('Tareekh calendar me mehfooz ho gayi!');
    });
  }


  // ==========================================================================
  // 9. SUBTLE 3D PARALLAX & GYROSCOPE TILT
  // ==========================================================================
  function setupParallaxTilt() {
    if (prefersReducedMotion) return;

    const cards = [
      { el: envelopeTiltWrapper, maxTilt: 7 },
      { el: cardTiltWrapper, maxTilt: 5 }
    ];

    cards.forEach(({ el, maxTilt }) => {
      if (!el) return;

      el.addEventListener('mousemove', (e) => {
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        const tiltX = -(y / (rect.height / 2)) * maxTilt;
        const tiltY = (x / (rect.width / 2)) * maxTilt;

        el.style.transform = `perspective(1000px) rotateX(${tiltX.toFixed(2)}deg) rotateY(${tiltY.toFixed(2)}deg)`;
      });

      el.addEventListener('mouseleave', () => {
        el.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
      });
    });

    if (window.DeviceOrientationEvent && typeof DeviceOrientationEvent.requestPermission !== 'function') {
      window.addEventListener('deviceorientation', (e) => {
        if (!e.gamma || !e.beta) return;
        const tiltY = Math.min(Math.max(e.gamma / 5, -6), 6);
        const tiltX = Math.min(Math.max((e.beta - 45) / 6, -6), 6);

        if (cardTiltWrapper) {
          cardTiltWrapper.style.transform = `perspective(1000px) rotateX(${tiltX.toFixed(1)}deg) rotateY(${tiltY.toFixed(1)}deg)`;
        }
      }, { passive: true });
    }
  }


  // ==========================================================================
  // 10. USER-TRIGGERED BACKGROUND MUSIC CONTROLLER
  // ==========================================================================
  function setupAudioController() {
    if (!musicToggle || !invitationAudio) return;

    let isAudioPlaying = false;

    // Track audio state changes
    invitationAudio.addEventListener('play', () => {
      isAudioPlaying = true;
      musicToggle.classList.add('is-playing');
      musicToggle.setAttribute('aria-label', 'Pause background music');
    });

    invitationAudio.addEventListener('pause', () => {
      isAudioPlaying = false;
      musicToggle.classList.remove('is-playing');
      musicToggle.setAttribute('aria-label', 'Play ambient background music');
    });

    musicToggle.addEventListener('click', () => {
      if (isAudioPlaying) {
        invitationAudio.pause();
        showToast('Mausiqi rok di gayi');
      } else {
        invitationAudio.volume = 0.65;
        const playPromise = invitationAudio.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              showToast('Mausiqi shuru ho gayi 🎶');
            })
            .catch((error) => {
              console.log('Audio playback prevented by browser:', error);
            });
        }
      }
    });
  }


  // ==========================================================================
  // INITIALIZATION ON DOM READY
  // ==========================================================================
  document.addEventListener('DOMContentLoaded', () => {
    initScratchCanvas();
    initIntersectionObserver();
    initBlessingsCanvasSize();
    setupAudioController();
    setupParallaxTilt();

    if (prefersReducedMotion) {
      openEnvelope(true);
      completeDateReveal();
    }
  });

})();
