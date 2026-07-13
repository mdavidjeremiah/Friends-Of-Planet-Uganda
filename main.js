/* ============================================================
   Friends of Planet Uganda — global site behavior
   Shared across every page: nav routing, mobile menu, forms,
   and the donation → confirmation flow.
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Text-based CTA routing ----------
     Several buttons in the original design were plain <button>
     elements (not links). We route them by their visible label so
     every page's "Donate" / "Volunteer" / etc. controls actually
     take the visitor somewhere. */
  const ROUTES = [
    { match: t => t === 'Donate' || t === 'DONATE', go: 'get_involved.html#donate' },
    { match: t => t.startsWith('Donate Now'), go: 'get_involved.html#donate' },
    { match: t => t.startsWith('Donate to the Fund'), go: 'get_involved.html#donate' },
    { match: t => t === 'Volunteer' || t === 'VOLUNTEER', go: 'get_involved.html#volunteer' },
    { match: t => t === 'VIEW ALL UPDATES', go: 'blog.html' },
    { match: t => t === 'PARTNER WITH US', go: 'mailto:partnerships@friendsofplanetuganda.org' },
    { match: t => t === 'READ LATEST IMPACT REPORT', go: 'get_involved.html#impact' },
  ];

  document.querySelectorAll('button').forEach(btn => {
    const label = btn.textContent.trim();
    const route = ROUTES.find(r => r.match(label));
    if (route) {
      btn.style.cursor = 'pointer';
      btn.addEventListener('click', () => { window.location.href = route.go; });
    }
  });

  /* ---------- Mobile menu fallback ----------
     Toggles the existing desktop link list (hidden on small screens)
     open/closed when the hamburger icon is tapped, on any page that
     doesn't already wire up its own menu (blog_2.html has its own). */
  const hamburger = document.querySelector('button.md\\:hidden, button.sm\\:hidden');
  if (hamburger && !document.getElementById('mobile-menu-trigger')) {
    const nav = document.querySelector('nav .hidden.md\\:flex, header .hidden.md\\:flex, .hidden.md\\:flex');
    if (nav) {
      hamburger.addEventListener('click', () => {
        nav.classList.toggle('hidden');
        nav.classList.toggle('flex');
        nav.classList.toggle('flex-col');
        nav.classList.toggle('absolute');
        nav.classList.toggle('top-full');
        nav.classList.toggle('left-0');
        nav.classList.toggle('w-full');
        nav.classList.toggle('bg-primary');
        nav.classList.toggle('p-6');
        nav.classList.toggle('gap-4');
      });
    }
  }

  /* ---------- Donation widget (get_involved.html) ---------- */
  const proceedBtn = Array.from(document.querySelectorAll('button'))
    .find(b => b.textContent.trim() === 'PROCEED TO SECURE PAYMENT');
  if (proceedBtn) {
    const wrap = proceedBtn.closest('.space-y-8') || proceedBtn.parentElement;
    const nameInput = wrap ? wrap.querySelector('input[type="text"]') : null;
    const emailInput = wrap ? wrap.querySelector('input[type="email"]') : null;

    proceedBtn.addEventListener('click', () => {
      const name = nameInput ? nameInput.value.trim() : '';
      const email = emailInput ? emailInput.value.trim() : '';

      [nameInput, emailInput].forEach(el => el && el.classList.remove('border-error'));

      let valid = true;
      if (!name) { valid = false; if (nameInput) nameInput.classList.add('border-error'); }
      if (!email || !email.includes('@')) { valid = false; if (emailInput) emailInput.classList.add('border-error'); }

      if (!valid) {
        proceedBtn.textContent = 'PLEASE FILL IN YOUR DETAILS';
        setTimeout(() => { proceedBtn.textContent = 'PROCEED TO SECURE PAYMENT'; }, 2200);
        return;
      }

      // Selected amount, if any donation-btn is active
      const activeAmountBtn = document.querySelector('.donation-btn.bg-primary');
      const amount = activeAmountBtn ? activeAmountBtn.textContent.trim() : '';
      sessionStorage.setItem('fpu_donation', JSON.stringify({ name, email, amount }));
      window.location.href = 'donation_successful.html';
    });
  }

  /* ---------- Volunteer inquiry form (get_involved.html) ---------- */
  const volunteerForm = document.getElementById('volunteer')
    ? document.getElementById('volunteer').querySelector('form')
    : null;
  if (volunteerForm) {
    volunteerForm.addEventListener('submit', (e) => {
      e.preventDefault();
      volunteerForm.innerHTML = `
        <div class="py-10 text-center">
          <span class="material-symbols-outlined text-secondary text-5xl mb-4" style="font-variation-settings:'FILL' 1;">volunteer_activism</span>
          <h3 class="font-headline-sm text-headline-sm text-primary mb-2">Thank you for stepping forward.</h3>
          <p class="font-body-md text-body-md text-on-surface-variant">A member of our team will reach out within 3–5 business days to discuss next steps.</p>
        </div>`;
    });
  }

  /* ---------- Newsletter signup (index.html) ---------- */
  document.querySelectorAll('form').forEach(form => {
    const emailField = form.querySelector('input[type="email"]');
    const submitBtn = form.querySelector('button');
    if (emailField && submitBtn && /subscribe/i.test(submitBtn.textContent) && form !== volunteerForm) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const original = form.innerHTML;
        form.innerHTML = `<p class="font-body-md text-body-md text-primary">Thank you — you're subscribed to the Canopy update.</p>`;
      });
    }
  });

  /* ---------- Donation success page: personalize if data present ---------- */
  const donorNameEl = document.querySelector('[data-donor-name]');
  const stored = sessionStorage.getItem('fpu_donation');
  if (donorNameEl && stored) {
    try {
      const data = JSON.parse(stored);
      if (data.name) donorNameEl.textContent = data.name.split(' ')[0];
    } catch (err) { /* ignore */ }
  }

});
/* Page-specific interaction scripts, extracted and namespaced per page. Safe no-ops on pages without matching elements. */

// ---- from index.html ----
(function() {
        // Simple Intersection Observer for scroll reveal animations
        const observerOptions = {
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                }
            });
        }, observerOptions);

        document.querySelectorAll('.reveal-up').forEach(el => {
            observer.observe(el);
        });

        // Micro-interaction for buttons
        document.querySelectorAll('button').forEach(btn => {
            btn.addEventListener('mousedown', () => {
                btn.style.transform = 'scale(0.96)';
            });
            btn.addEventListener('mouseup', () => {
                btn.style.transform = 'scale(1)';
            });
            btn.addEventListener('mouseleave', () => {
                btn.style.transform = 'scale(1)';
            });
        });
    
})();

// ---- from our_work.html ----
(function() {
        // Simple Intersection Observer for scroll animations
        const observerOptions = {
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('opacity-100', 'translate-y-0');
                    entry.target.classList.remove('opacity-0', 'translate-y-10');
                }
            });
        }, observerOptions);

        document.querySelectorAll('section > div').forEach(el => {
            el.classList.add('transition-all', 'duration-1000', 'opacity-0', 'translate-y-10');
            observer.observe(el);
        });

        // Top nav scroll effect
        window.addEventListener('scroll', () => {
            const nav = document.querySelector('nav');
            if (window.scrollY > 50) {
                nav.classList.add('py-2', 'bg-primary/95');
                nav.classList.remove('py-4', 'bg-primary/80');
            } else {
                nav.classList.add('py-4', 'bg-primary/80');
                nav.classList.remove('py-2', 'bg-primary/95');
            }
        });
    
})();

// ---- from get_involved.html ----
(function() {
    // Simple micro-interaction for donation buttons
    document.querySelectorAll('.donation-btn').forEach(btn => {
      btn.addEventListener('click', function() {
        document.querySelectorAll('.donation-btn').forEach(b => {
          b.classList.remove('bg-primary', 'text-on-primary');
          b.classList.add('text-primary', 'border-outline');
        });
        this.classList.add('bg-primary', 'text-on-primary');
        this.classList.remove('text-primary', 'border-outline');
      });
    });

    // Intersection Observer for fade-in animations
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('opacity-100', 'translate-y-0');
          entry.target.classList.remove('opacity-0', 'translate-y-10');
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('section').forEach(section => {
      section.classList.add('transition-all', 'duration-1000', 'opacity-0', 'translate-y-10');
      observer.observe(section);
    });
  
})();

// ---- from donation_successful.html ----
(function() {
    // Subtle scroll reveals
    document.addEventListener('DOMContentLoaded', () => {
      const observerOptions = {
        threshold: 0.1
      };

      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100', 'translate-y-0');
            entry.target.classList.remove('opacity-0', 'translate-y-8');
          }
        });
      }, observerOptions);

      document.querySelectorAll('section > div').forEach(el => {
        el.classList.add('transition-all', 'duration-1000', 'opacity-0', 'translate-y-8');
        observer.observe(el);
      });
    });
  
})();

// ---- from blog_1.html ----
(function() {
    // Micro-interactions for header on scroll
    window.addEventListener('scroll', () => {
      const header = document.querySelector('header');
      if (window.scrollY > 50) {
        header.classList.add('py-3', 'shadow-md');
        header.classList.remove('py-4', 'shadow-sm');
      } else {
        header.classList.add('py-4', 'shadow-sm');
        header.classList.remove('py-3', 'shadow-md');
      }
    });

    // Simple fade-in effect for articles
    const observerOptions = {
      threshold: 0.1
    };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('opacity-100', 'translate-y-0');
          entry.target.classList.remove('opacity-0', 'translate-y-8');
        }
      });
    }, observerOptions);

    document.querySelectorAll('article, .bg-white, .bg-surface-container').forEach(el => {
      el.classList.add('transition-all', 'duration-700', 'opacity-0', 'translate-y-8');
      observer.observe(el);
    });
  
})();

// ---- from blog_2.html ----
(function() {
        const trigger = document.getElementById('mobile-menu-trigger');
        const overlay = document.getElementById('mobile-nav-overlay');
        const close = document.getElementById('close-menu');

        trigger.addEventListener('click', () => {
            overlay.classList.remove('translate-x-full');
        });

        close.addEventListener('click', () => {
            overlay.classList.add('translate-x-full');
        });

        // Simple parallax-like header effect
        window.addEventListener('scroll', () => {
            const header = document.querySelector('header');
            if (window.scrollY > 20) {
                header.classList.add('bg-primary/95');
                header.classList.remove('bg-primary/80');
            } else {
                header.classList.add('bg-primary/80');
                header.classList.remove('bg-primary/95');
            }
        });
    
})();

// ---- from about_us.html ----
(function() {
        document.addEventListener('DOMContentLoaded', () => {
            const observerOptions = {
                threshold: 0.1
            };

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('opacity-100', 'translate-y-0');
                        entry.target.classList.remove('opacity-0', 'translate-y-10');
                    }
                });
            }, observerOptions);

            document.querySelectorAll('section > div').forEach(el => {
                el.classList.add('transition-all', 'duration-1000', 'ease-out', 'opacity-0', 'translate-y-10');
                observer.observe(el);
            });
        });
    
})();
