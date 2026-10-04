/* Caldrens Solutions — site behavior */
(function () {
  'use strict';

  var root = document.documentElement;
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Page ready (hero load-in) ---------- */
  function markReady() { root.classList.add('is-ready'); }
  var heroImg = document.querySelector('.hero__media img');
  if (heroImg && !heroImg.complete) {
    heroImg.addEventListener('load', markReady, { once: true });
    heroImg.addEventListener('error', markReady, { once: true });
    setTimeout(markReady, 900); // never hold content back on a slow connection
  } else {
    requestAnimationFrame(markReady);
  }

  /* ---------- Images: fade in when loaded, degrade gracefully on failure ---------- */
  document.querySelectorAll('.media img').forEach(function (img) {
    function loaded() { img.classList.add('is-loaded'); }
    function failed() { img.classList.add('is-missing'); }
    if (img.complete) {
      if (img.naturalWidth > 0) loaded(); else failed();
    } else {
      img.addEventListener('load', loaded, { once: true });
      img.addEventListener('error', failed, { once: true });
    }
  });

  /* ---------- Sticky header state ---------- */
  var header = document.querySelector('[data-header]');
  function onScroll() {
    header.classList.toggle('is-scrolled', window.scrollY > 24);
  }
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ---------- Mobile menu ---------- */
  var toggle = document.querySelector('[data-nav-toggle]');
  var toggleLabel = document.querySelector('[data-nav-toggle-label]');
  var menu = document.querySelector('[data-mobile-menu]');

  function setMenu(open) {
    toggle.setAttribute('aria-expanded', String(open));
    toggleLabel.textContent = open ? 'Close menu' : 'Open menu';
    menu.hidden = !open;
    header.classList.toggle('is-open', open);
    document.body.classList.toggle('is-locked', open);
  }

  toggle.addEventListener('click', function () {
    setMenu(toggle.getAttribute('aria-expanded') !== 'true');
  });
  menu.addEventListener('click', function (e) {
    if (e.target.closest('a')) setMenu(false);
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
      setMenu(false);
      toggle.focus();
    }
  });
  window.matchMedia('(min-width: 1024px)').addEventListener('change', function (mq) {
    if (mq.matches) setMenu(false);
  });

  /* ---------- Active nav link ---------- */
  var navLinks = Array.prototype.slice.call(document.querySelectorAll('.primary-nav a'));
  var sections = navLinks
    .map(function (a) { return document.querySelector(a.getAttribute('href')); })
    .filter(Boolean);

  if ('IntersectionObserver' in window && sections.length) {
    var current = null;
    var navObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) current = entry.target.id;
      });
      navLinks.forEach(function (a) {
        a.classList.toggle('is-active', a.getAttribute('href') === '#' + current);
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    sections.forEach(function (s) { navObserver.observe(s); });
  }

  /* ---------- Scroll reveal ---------- */
  var revealEls = document.querySelectorAll('[data-reveal]');

  // Stagger siblings inside the same grid/list
  revealEls.forEach(function (el) {
    var parent = el.parentElement;
    var siblings = Array.prototype.filter.call(parent.children, function (c) {
      return c.hasAttribute('data-reveal');
    });
    var i = siblings.indexOf(el);
    if (i > 0) el.style.setProperty('--reveal-delay', Math.min(i * 0.08, 0.4) + 's');
  });

  if ('IntersectionObserver' in window && !reduceMotion) {
    var revealObserver = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    revealEls.forEach(function (el) { revealObserver.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('is-visible'); });
  }

  /* ---------- CTA topic prefill ---------- */
  var form = document.querySelector('[data-contact-form]');
  var topicSelect = document.getElementById('f-topic');

  document.addEventListener('click', function (e) {
    var link = e.target.closest('[data-topic]');
    if (!link || !topicSelect) return;
    var topic = link.getAttribute('data-topic');
    var match = Array.prototype.find.call(topicSelect.options, function (o) {
      return o.value === topic || o.text === topic;
    });
    if (match) {
      topicSelect.value = match.value;
      clearError(topicSelect);
    }
    if (link.hasAttribute('data-focus-form')) {
      e.preventDefault();
      var nameField = document.getElementById('f-name');
      nameField.focus({ preventScroll: true });
      form.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'center' });
    }
  });

  /* ---------- Contact form ---------- */
  if (!form) return;

  var success = document.querySelector('[data-form-success]');
  var status = document.querySelector('[data-form-status]');
  var submitBtn = form.querySelector('[data-submit]');
  var submitLabel = form.querySelector('[data-submit-label]');
  var EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  var messages = {
    name: 'Please enter your full name.',
    company: 'Please enter your company name.',
    email: 'Please enter a valid work email address.',
    phone: 'Please enter a valid phone number.',
    industry: 'Please select your industry.',
    topic: 'Please tell us what we can help you with.',
    message: 'Please include a brief message about your requirement.'
  };

  function fieldWrap(input) { return input.closest('.field'); }
  function errorEl(input) { return document.getElementById(input.id + '-err'); }

  function setError(input, msg) {
    fieldWrap(input).classList.add('has-error');
    input.setAttribute('aria-invalid', 'true');
    input.setAttribute('aria-describedby', input.id + '-err');
    errorEl(input).textContent = msg;
  }
  function clearError(input) {
    fieldWrap(input).classList.remove('has-error');
    input.removeAttribute('aria-invalid');
    errorEl(input).textContent = '';
  }

  function validate(input) {
    var v = input.value.trim();
    var ok = true;
    if (input.required && !v) ok = false;
    else if (input.type === 'email' && v && !EMAIL_RE.test(v)) ok = false;
    else if (input.type === 'tel' && v && !/^[+()\d\s.\-]{7,}$/.test(v)) ok = false;
    else if (input.name === 'message' && v.length < 10) ok = false;
    if (ok) clearError(input); else setError(input, messages[input.name]);
    return ok;
  }

  var inputs = form.querySelectorAll('input:not([type="hidden"]):not([name="_honey"]), select, textarea');
  inputs.forEach(function (input) {
    input.addEventListener('blur', function () {
      if (input.value.trim() || fieldWrap(input).classList.contains('has-error')) validate(input);
    });
    input.addEventListener('input', function () {
      if (fieldWrap(input).classList.contains('has-error')) validate(input);
    });
    input.addEventListener('change', function () {
      if (input.tagName === 'SELECT') validate(input);
    });
  });

  function setHidden(name, value) {
    var field = form.querySelector('input[type="hidden"][name="' + name + '"]');
    if (!field) {
      field = document.createElement('input');
      field.type = 'hidden';
      field.name = name;
      form.appendChild(field);
    }
    field.value = value;
  }

  function showSuccess() {
    form.hidden = true;
    success.hidden = false;
    success.focus();
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    status.textContent = '';

    var firstInvalid = null;
    inputs.forEach(function (input) {
      if (!validate(input) && !firstInvalid) firstInvalid = input;
    });
    if (firstInvalid) {
      firstInvalid.focus();
      status.textContent = 'Please review the highlighted fields.';
      return;
    }

    submitBtn.disabled = true;
    submitLabel.textContent = 'Submitting…';

    // Inquiries are emailed through FormSubmit (see README).
    var endpoint = form.getAttribute('data-endpoint');
    var done = function () {
      submitBtn.disabled = false;
      submitLabel.textContent = 'Submit Inquiry';
    };

    var isWeb = /^https?:$/.test(location.protocol);
    setHidden('_url', location.href);

    fetch(endpoint, {
      method: 'POST',
      body: new FormData(form),
      headers: { Accept: 'application/json' }
    })
      .then(function (res) {
        return res.json().catch(function () { return {}; }).then(function (data) {
          if (!res.ok || String(data.success) !== 'true') {
            throw new Error(data.message || 'HTTP ' + res.status);
          }
        });
      })
      .then(function () {
        done();
        showSuccess();
      })
      .catch(function (err) {
        if (window.console) console.warn('Inquiry could not be sent in the background:', err.message);
        if (isWeb) {
          // Fall back to a standard form post. FormSubmit handles it on its own
          // page (including first-time activation), then returns the visitor here.
          setHidden('_next', location.origin + location.pathname + '#inquiry-sent');
          HTMLFormElement.prototype.submit.call(form);
          return;
        }
        done();
        status.textContent = 'We could not submit your inquiry. Please try again in a moment.';
      });
  });

  // Returning from a standard (non-background) form post
  if (location.hash === '#inquiry-sent') {
    showSuccess();
    success.scrollIntoView({ block: 'center' });
    if (history.replaceState) history.replaceState(null, '', location.pathname + location.search);
  }

  document.querySelector('[data-form-reset]').addEventListener('click', function () {
    form.reset();
    inputs.forEach(clearError);
    success.hidden = true;
    form.hidden = false;
    document.getElementById('f-name').focus();
  });
})();
