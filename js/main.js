// B-Health Solutions LLC — shared site behavior

document.addEventListener('DOMContentLoaded', function () {

  /* ---------- Mobile nav ---------- */
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.querySelector('.main-nav');
  var scrim = document.querySelector('.nav-scrim');

  function closeNav() {
    nav && nav.classList.remove('open');
    scrim && scrim.classList.remove('open');
    toggle && toggle.setAttribute('aria-expanded', 'false');
  }
  function openNav() {
    nav && nav.classList.add('open');
    scrim && scrim.classList.add('open');
    toggle && toggle.setAttribute('aria-expanded', 'true');
  }
  if (toggle) {
    toggle.addEventListener('click', function () {
      nav.classList.contains('open') ? closeNav() : openNav();
    });
  }
  scrim && scrim.addEventListener('click', closeNav);

  // Mobile dropdown (Services) toggle on tap
  document.querySelectorAll('.has-dropdown > a').forEach(function (link) {
    link.addEventListener('click', function (e) {
      if (window.innerWidth <= 980) {
        var parent = link.parentElement;
        var isServicesLink = link.getAttribute('href') && link.getAttribute('href').indexOf('services.html') !== -1 && !parent.classList.contains('open');
        if (!parent.classList.contains('open')) {
          e.preventDefault();
          document.querySelectorAll('.has-dropdown.open').forEach(function (el) { el !== parent && el.classList.remove('open'); });
          parent.classList.add('open');
        }
      }
    });
  });

  // Close mobile nav when a non-dropdown link is clicked
  document.querySelectorAll('.main-nav a:not(.has-dropdown > a)').forEach(function (a) {
    a.addEventListener('click', closeNav);
  });

  /* ---------- Active nav link ---------- */
  var current = (location.pathname.split('/').pop() || 'index.html');
  document.querySelectorAll('.main-nav a[href]').forEach(function (a) {
    var href = a.getAttribute('href').split('#')[0];
    if (href === current || (current === '' && href === 'index.html')) {
      a.classList.add('active');
    }
  });

  /* ---------- Reveal on scroll ---------- */
  var revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(function (el, i) {
      el.style.setProperty('--i', i % 8);
      io.observe(el);
    });
  } else {
    revealEls.forEach(function (el) { el.classList.add('in'); });
  }

  /* ---------- FAQ accordion ---------- */
  document.querySelectorAll('.faq-q').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var item = btn.closest('.faq-item');
      var answer = item.querySelector('.faq-a');
      var isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item.open').forEach(function (el) {
        el.classList.remove('open');
        el.querySelector('.faq-a').style.maxHeight = null;
      });
      if (!isOpen) {
        item.classList.add('open');
        answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });
  });

  /* ---------- Forms (Formspree-ready, graceful no-backend fallback) ---------- */
  document.querySelectorAll('form[data-form]').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      var status = form.querySelector('.form-status');
      var action = form.getAttribute('action') || '';
      var placeholder = action.indexOf('YOUR_FORM_ID') !== -1 || !action;

      if (placeholder) {
        // No live form endpoint connected yet — show instructions instead of failing silently.
        e.preventDefault();
        if (status) {
          status.textContent = 'Thanks! This form isn’t connected to an inbox yet — please call 469-648-3475 or email infobhealthsolutions@gmail.com and we’ll be glad to help.';
          status.className = 'form-status show err';
          status.setAttribute('role', 'alert');
        }
        return;
      }

      e.preventDefault();
      var btn = form.querySelector('button[type="submit"]');
      var originalText = btn ? btn.textContent : '';
      if (btn) { btn.disabled = true; btn.textContent = 'Sending…'; }

      fetch(action, {
        method: 'POST',
        body: new FormData(form),
        headers: { 'Accept': 'application/json' }
      }).then(function (res) {
        if (res.ok) {
          form.reset();
          if (status) {
            status.textContent = 'Thank you — your request has been sent. Our office will contact you shortly during business hours (Mon–Fri, 8am–5pm).';
            status.className = 'form-status show ok';
            status.setAttribute('role', 'status');
          }
        } else {
          throw new Error('Submission failed');
        }
      }).catch(function () {
        if (status) {
          status.textContent = 'Something went wrong sending your request. Please call us at 469-648-3475 or email infobhealthsolutions@gmail.com.';
          status.className = 'form-status show err';
          status.setAttribute('role', 'alert');
        }
      }).finally(function () {
        if (btn) { btn.disabled = false; btn.textContent = originalText; }
      });
    });
  });

  /* ---------- Current year in footer ---------- */
  document.querySelectorAll('[data-year]').forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });
});
