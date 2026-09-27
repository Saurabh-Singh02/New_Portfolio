    // Typed.js initialization
    var typed = new Typed('#element', {
      strings: ['Full Stack Developer.', 'Python Developer.', 'Django Developer.', 'Problem Solver.'],
      typeSpeed: 70,
      backSpeed: 40,
      loop: true,
      backDelay: 2200
    });

    // Theme toggle with persistence
    (function () {
      var root = document.documentElement;
      var btn = document.getElementById('theme-button');
      var icon = btn.querySelector('i');
      var stored = localStorage.getItem('theme');

      // Default to light
      if (stored === 'dark') {
        root.setAttribute('data-bs-theme', 'dark');
      } else {
        root.setAttribute('data-bs-theme', 'light');
      }

      function sync() {
        var isDark = root.getAttribute('data-bs-theme') === 'dark';
        icon.className = isDark ? 'bi bi-sun-fill' : 'bi bi-moon-stars-fill';
      }
      sync();

      btn.addEventListener('click', function () {
        var next = root.getAttribute('data-bs-theme') === 'dark' ? 'light' : 'dark';
        root.setAttribute('data-bs-theme', next);
        localStorage.setItem('theme', next);
        sync();
      });
    })();
 
