
    /* ── Hamburger menu ──────────────────────────────── */
    const btn = document.getElementById('hamburgerBtn');
    const drawer = document.getElementById('navDrawer');
    btn.addEventListener('click', () => {
      drawer.classList.toggle('open');
    });
    function closeDrawer() { drawer.classList.remove('open'); }

    /* ── Nav background on scroll ────────────────────── */
    const nav = document.getElementById('nav');
    window.addEventListener('scroll', () => {
      if (window.scrollY > 60) {
        nav.style.background = 'rgba(24,24,24,0.97)';
        nav.style.backdropFilter = 'blur(12px)';
        nav.style.webkitBackdropFilter = 'blur(12px)';
      } else {
        nav.style.background = 'var(--canvas)';
        nav.style.backdropFilter = '';
        nav.style.webkitBackdropFilter = '';
      }
    });

    /* ── Scroll reveal ───────────────────────────────── */
    const revealEls = document.querySelectorAll('.reveal, .stagger');
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12 });
    revealEls.forEach(el => io.observe(el));

    /* ── Hero stats counter animation ───────────────── */
    function animateNum(el, target, suffix) {
      let start = 0;
      const dur = 1200;
      const step = (timestamp) => {
        if (!start) start = timestamp;
        const progress = Math.min((timestamp - start) / dur, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.innerHTML = Math.round(eased * target) + '<span>' + suffix + '</span>';
        if (progress < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    }

    const statsSection = document.querySelector('.hero-stats');
    const statsIo = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        const vals = statsSection.querySelectorAll('.hero-stat-val');
        animateNum(vals[0], 4, '+');
        animateNum(vals[1], 5, 'yr');
        animateNum(vals[2], 40, '+');
        statsIo.unobserve(statsSection);
      }
    }, { threshold: 0.5 });
    statsIo.observe(statsSection);

    /* ── Achievement counter ─────────────────────────── */
    const achSection = document.querySelector('.ach-grid');
    const achData = [
      { val: 4, suffix: '+' }, { val: 40, suffix: '+' },
      { val: 60, suffix: '%' }, { val: 5, suffix: 'yr' }
    ];
    const achIo = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        const nums = achSection.querySelectorAll('.ach-num');
        nums.forEach((el, i) => animateNum(el, achData[i].val, achData[i].suffix));
        achIo.unobserve(achSection);
      }
    }, { threshold: 0.3 });
    achIo.observe(achSection);

    /* ── Active nav highlight on scroll ─────────────── */
    const sections = document.querySelectorAll('section[id], div[id]');
    const navLinks = document.querySelectorAll('.nav-links a, .nav-drawer a');
    const scrollSpy = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          navLinks.forEach(a => {
            a.style.color = a.getAttribute('href') === '#' + entry.target.id
              ? 'var(--ink)' : '';
          });
        }
      });
    }, { threshold: 0.4 });
    document.querySelectorAll('section[id]').forEach(s => scrollSpy.observe(s));