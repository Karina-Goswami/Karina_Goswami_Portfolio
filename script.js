/* =============================================
   KARINA GOSWAMI · PORTFOLIO SCRIPTS
   EmailJS integrated — replace 3 keys below
   ============================================= */

/* ────────────────────────────────────────────
   ✏️  STEP 1: Paste your 3 EmailJS values here
   Get them from: https://www.emailjs.com
   ──────────────────────────────────────────── */
var EMAILJS_PUBLIC_KEY  = 'A6ZVqlsx18v-nSebt';   // Account → General → Public Key
var EMAILJS_SERVICE_ID  = 'service_74pkn86';   // Email Services → your Gmail service ID
var EMAILJS_TEMPLATE_ID = 'template_kugkgjj';  // Email Templates → your template ID

/* Initialize EmailJS */
emailjs.init(EMAILJS_PUBLIC_KEY);

/* ── NAV SCROLL SHRINK ── */
var nav = document.getElementById('nav');
window.addEventListener('scroll', function () {
  if (window.scrollY > 50) { nav.classList.add('scrolled'); }
  else { nav.classList.remove('scrolled'); }
});

/* ── MOBILE MENU ── */
var navToggle  = document.getElementById('navToggle');
var mobileMenu = document.getElementById('mobileMenu');
navToggle.addEventListener('click', function () {
  mobileMenu.classList.toggle('open');
});
document.querySelectorAll('.mm-link').forEach(function (link) {
  link.addEventListener('click', function () { mobileMenu.classList.remove('open'); });
});

/* ── SMOOTH SCROLL (fixed nav offset) ── */
document.querySelectorAll('a[href^="#"]').forEach(function (link) {
  link.addEventListener('click', function (e) {
    var target = document.querySelector(this.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    var top = target.getBoundingClientRect().top + window.scrollY - 80;
    window.scrollTo({ top: top, behavior: 'smooth' });
  });
});

/* ── SCROLL REVEAL ── */
var revealEls = document.querySelectorAll(
  '.project-card, .case-card, .cert-badge, .exp-card, .stat-block, .about-left, .contact-left, .msg-form, .skill-group'
);
revealEls.forEach(function (el) { el.classList.add('reveal'); });

var revealObserver = new IntersectionObserver(function (entries) {
  entries.forEach(function (entry, i) {
    if (entry.isIntersecting) {
      setTimeout(function () { entry.target.classList.add('visible'); }, 80 * i);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

revealEls.forEach(function (el) { revealObserver.observe(el); });

/* ── SKILL BARS ANIMATE ON SCROLL ── */
var skillSection  = document.getElementById('skills');
var barsAnimated  = false;

var skillObserver = new IntersectionObserver(function (entries) {
  if (entries[0].isIntersecting && !barsAnimated) {
    barsAnimated = true;
    document.querySelectorAll('.skill-fill').forEach(function (bar) {
      var w = bar.getAttribute('data-width') + '%';
      bar.style.width = '0';
      setTimeout(function () { bar.style.width = w; }, 200);
    });
  }
}, { threshold: 0.2 });

if (skillSection) { skillObserver.observe(skillSection); }

/* ── FORM VALIDATION HELPERS ── */
function setError(fieldId, errId, msg) {
  var field = document.getElementById(fieldId);
  var err   = document.getElementById(errId);
  field.classList.add('invalid');
  err.textContent = msg;
}

function clearError(fieldId, errId) {
  var field = document.getElementById(fieldId);
  var err   = document.getElementById(errId);
  field.classList.remove('invalid');
  err.textContent = '';
}

function validateForm() {
  var valid = true;

  var name    = document.getElementById('fname').value.trim();
  var email   = document.getElementById('femail').value.trim();
  var subject = document.getElementById('fsubject').value;
  var msg     = document.getElementById('fmsg').value.trim();
  var emailRx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  clearError('fname',    'err-fname');
  clearError('femail',   'err-femail');
  clearError('fsubject', 'err-fsubject');
  clearError('fmsg',     'err-fmsg');

  if (!name) { setError('fname', 'err-fname', 'Please enter your name.'); valid = false; }
  if (!email || !emailRx.test(email)) { setError('femail', 'err-femail', 'Please enter a valid email.'); valid = false; }
  if (!subject) { setError('fsubject', 'err-fsubject', 'Please select a topic.'); valid = false; }
  if (!msg) { setError('fmsg', 'err-fmsg', 'Please write a message.'); valid = false; }

  return valid;
}

/* ── CONTACT FORM — EMAILJS SEND ── */
function handleSubmit(e) {
  e.preventDefault();

  if (!validateForm()) return;

  var btn      = document.getElementById('submitBtn');
  var btnText  = document.getElementById('btnText');
  var spinner  = document.getElementById('btnSpinner');
  var success  = document.getElementById('formSuccess');
  var fail     = document.getElementById('formFail');
  var form     = document.getElementById('contactForm');

  /* Show loading state */
  btn.disabled         = true;
  btnText.style.display = 'none';
  spinner.style.display = 'block';
  success.classList.remove('show');
  fail.classList.remove('show');

  var templateParams = {
    from_name:  document.getElementById('fname').value.trim(),
    from_email: document.getElementById('femail').value.trim(),
    subject:    document.getElementById('fsubject').value,
    message:    document.getElementById('fmsg').value.trim(),
  };

  emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams)
    .then(function () {
      /* SUCCESS */
      btn.disabled          = false;
      btnText.style.display = 'block';
      spinner.style.display = 'none';
      form.reset();
      success.classList.add('show');
      setTimeout(function () { success.classList.remove('show'); }, 6000);
    })
    .catch(function (error) {
      /* FAIL */
      console.error('EmailJS error:', error);
      btn.disabled          = false;
      btnText.style.display = 'block';
      spinner.style.display = 'none';
      fail.classList.add('show');
      setTimeout(function () { fail.classList.remove('show'); }, 8000);
    });
}

/* ── CLEAR FIELD ERRORS ON INPUT ── */
['fname', 'femail', 'fsubject', 'fmsg'].forEach(function (id) {
  var el = document.getElementById(id);
  if (!el) return;
  el.addEventListener('input', function () { clearError(id, 'err-' + id); });
  el.addEventListener('change', function () { clearError(id, 'err-' + id); });
});
