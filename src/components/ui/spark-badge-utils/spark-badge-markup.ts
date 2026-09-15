export const SPARK_BADGE_MARKUP = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">
  <title>Ataur Rahman Sani - Holographic Credential Badge</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;600;700;800;900&family=Plus+Jakarta+Sans:wght@500;700;800&family=Space+Mono:wght@400;700&display=swap" rel="stylesheet">
  <style>
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
      user-select: none;
      -webkit-user-select: none;
    }
    html, body {
      width: 100%;
      height: 100%;
      overflow: hidden;
      background: transparent;
      font-family: 'Outfit', -apple-system, sans-serif;
      display: flex;
      align-items: center;
      justify-content: center;
      perspective: 1200px;
    }
    #rain-canvas {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 10;
    }
    .scene {
      position: relative;
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      transform-style: preserve-3d;
      padding: 12px;
    }
    
    /* BADGE CARD */
    .badge-card {
      position: relative;
      width: 100%;
      max-width: 380px;
      aspect-ratio: 1.58 / 1;
      border-radius: 18px;
      background: linear-gradient(135deg, rgba(22, 24, 34, 0.85) 0%, rgba(10, 12, 18, 0.95) 100%);
      border: 1px solid rgba(255, 255, 255, 0.16);
      box-shadow: 
        0 25px 50px -12px rgba(0, 0, 0, 0.85),
        0 0 40px -10px rgba(37, 99, 235, 0.35),
        inset 0 1px 1px 0 rgba(255, 255, 255, 0.3),
        inset 0 -1px 2px 0 rgba(0, 0, 0, 0.6);
      backdrop-filter: blur(24px);
      -webkit-backdrop-filter: blur(24px);
      overflow: hidden;
      transform-style: preserve-3d;
      transition: transform 0.15s ease-out, box-shadow 0.3s ease;
      cursor: grab;
    }
    .badge-card:active {
      cursor: grabbing;
    }

    /* BACKGROUND VIDEO & DARKENING OVERLAY */
    .card-bg-video {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
      z-index: 1;
      pointer-events: none;
      opacity: 0.78;
      filter: saturate(1.15) contrast(1.1);
    }
    .card-video-overlay {
      position: absolute;
      inset: 0;
      background: radial-gradient(circle at 50% 50%, rgba(8, 12, 24, 0.42) 0%, rgba(4, 6, 14, 0.82) 100%);
      z-index: 2;
      pointer-events: none;
    }

    /* HOLOGRAPHIC FOIL OVERLAY */
    .holo-sheen {
      position: absolute;
      inset: 0;
      z-index: 3;
      background: linear-gradient(
        115deg,
        transparent 0%,
        rgba(56, 189, 248, 0.15) 25%,
        rgba(236, 72, 153, 0.18) 45%,
        rgba(234, 179, 8, 0.15) 65%,
        rgba(99, 102, 241, 0.18) 85%,
        transparent 100%
      );
      mix-blend-mode: color-dodge;
      opacity: 0.65;
      pointer-events: none;
      transition: opacity 0.3s ease;
      background-size: 200% 200%;
    }

    .badge-card:hover .holo-sheen {
      opacity: 0.9;
    }

    /* SPECULAR LIGHT FLARE */
    .light-glare {
      position: absolute;
      inset: 0;
      z-index: 4;
      background: radial-gradient(circle at 50% 50%, rgba(255,255,255,0.25) 0%, transparent 60%);
      opacity: 0;
      mix-blend-mode: overlay;
      pointer-events: none;
      transition: opacity 0.2s ease;
    }

    /* INNER CONTENT */
    .card-content {
      position: relative;
      width: 100%;
      height: 100%;
      padding: 24px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
      z-index: 5;
    }

    /* MAIN NAME & IDENTITY */
    .card-body {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
      width: 100%;
    }
    .name-lead {
      font-size: 11px;
      font-weight: 700;
      letter-spacing: 0.22em;
      color: #94a3b8;
      text-transform: uppercase;
      margin-bottom: 6px;
      font-family: 'Space Mono', monospace;
    }
    .name-title {
      font-size: 24px;
      font-weight: 900;
      letter-spacing: -0.01em;
      color: #ffffff;
      text-transform: uppercase;
      line-height: 1.1;
      text-shadow: 0 3px 20px rgba(255,255,255,0.35);
      background: linear-gradient(180deg, #ffffff 30%, #cbd5e1 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    .role-desc {
      font-size: 12px;
      font-weight: 600;
      color: #38bdf8;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      margin-top: 8px;
    }
  </style>
</head>
<body>
  <canvas id="rain-canvas"></canvas>

  <div class="scene" id="scene">
    <div class="badge-card" id="card">
      <video
        class="card-bg-video"
        id="bg-video"
        autoplay
        loop
        muted
        playsinline
        webkit-playsinline="true"
        preload="auto"
      >
        <source src="https://i.imgur.com/3xsEomS.mp4" type="video/mp4" />
      </video>
      <div class="card-video-overlay"></div>
      <div class="holo-sheen" id="holo"></div>
      <div class="light-glare" id="glare"></div>

      <div class="card-content">
        <!-- Name & Title -->
        <div class="card-body">
          <div class="name-lead">ENGINEER & CREATOR</div>
          <div class="name-title">ATAUR RAHMAN SANI</div>
          <div class="role-desc">Full-Stack Architect & AI Specialist</div>
        </div>
      </div>
    </div>
  </div>

  <script>
    // --- AUTOPLAY BACKGROUND VIDEO ---
    const bgVideo = document.getElementById('bg-video');
    if (bgVideo) {
      bgVideo.play().catch(() => {
        const startVideo = () => {
          bgVideo.play();
          window.removeEventListener('click', startVideo);
          window.removeEventListener('touchstart', startVideo);
        };
        window.addEventListener('click', startVideo, { once: true });
        window.addEventListener('touchstart', startVideo, { once: true });
      });
    }

    // --- 3D TILT & HOLOGRAPHIC SHEEN ---
    const card = document.getElementById('card');
    const holo = document.getElementById('holo');
    const glare = document.getElementById('glare');
    const scene = document.getElementById('scene');

    let mouseX = 0;
    let mouseY = 0;
    let targetRotateX = 0;
    let targetRotateY = 0;
    let currentRotateX = 0;
    let currentRotateY = 0;

    function handleMove(e) {
      const rect = card.getBoundingClientRect();
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      
      const x = clientX - rect.left;
      const y = clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      targetRotateY = ((x - centerX) / centerX) * 14;
      targetRotateX = -((y - centerY) / centerY) * 14;

      const posX = (x / rect.width) * 100;
      const posY = (y / rect.height) * 100;
      holo.style.backgroundPosition = \`\${posX}%\ \${posY}%\`;

      glare.style.opacity = '1';
      glare.style.background = \`radial-gradient(circle at \${posX}% \${posY}%, rgba(255,255,255,0.3) 0%, transparent 60%)\`;
    }

    function handleLeave() {
      targetRotateX = 0;
      targetRotateY = 0;
      glare.style.opacity = '0';
    }

    window.addEventListener('mousemove', handleMove);
    window.addEventListener('touchmove', handleMove, { passive: true });
    window.addEventListener('mouseleave', handleLeave);
    window.addEventListener('touchend', handleLeave);

    function animateCard() {
      currentRotateX += (targetRotateX - currentRotateX) * 0.1;
      currentRotateY += (targetRotateY - currentRotateY) * 0.1;

      card.style.transform = \`rotateX(\${currentRotateX}deg) rotateY(\${currentRotateY}deg)\`;
      requestAnimationFrame(animateCard);
    }
    animateCard();

    // --- RAIN & SPARK PARTICLES ENGINE ---
    const canvas = document.getElementById('rain-canvas');
    const ctx = canvas.getContext('2d');

    function resize() {
      canvas.width = window.innerWidth * window.devicePixelRatio;
      canvas.height = window.innerHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    }
    window.addEventListener('resize', resize);
    resize();

    class RainDrop {
      constructor() {
        this.reset();
      }
      reset() {
        this.x = Math.random() * window.innerWidth;
        this.y = Math.random() * -100;
        this.speed = 7 + Math.random() * 8;
        this.length = 12 + Math.random() * 16;
        this.opacity = 0.15 + Math.random() * 0.35;
        this.isSpark = Math.random() > 0.85;
      }
      update() {
        this.y += this.speed;
        this.x += 0.8;
        if (this.y > window.innerHeight) {
          this.reset();
        }
      }
      draw() {
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x + 1, this.y + this.length);
        if (this.isSpark) {
          ctx.strokeStyle = \`rgba(56, 189, 248, \${this.opacity * 1.5})\`;
          ctx.lineWidth = 1.2;
        } else {
          ctx.strokeStyle = \`rgba(255, 255, 255, \${this.opacity})\`;
          ctx.lineWidth = 0.8;
        }
        ctx.stroke();
      }
    }

    const drops = Array.from({ length: 45 }, () => new RainDrop());

    function renderRain() {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      for (let i = 0; i < drops.length; i++) {
        drops[i].update();
        drops[i].draw();
      }
      requestAnimationFrame(renderRain);
    }
    renderRain();
  </script>
</body>
</html>`;
