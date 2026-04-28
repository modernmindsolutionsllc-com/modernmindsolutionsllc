import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, CheckCircle2, AlertCircle } from 'lucide-react';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';

const formspreeEndpoint = import.meta.env.VITE_FORMSPREE_ENDPOINT || 'https://formspree.io/f/xzdywqvj';

const serviceOptions = [
  'Web Development',
  'Mobile Apps',
  'AI & Automation',
  'UI/UX Design',
  'Oracle Fusion HCM Implementation',
  'Oracle Fusion HCM - Managed Services',
];

// ── Validation helpers ─────────────────────────────────────────────────────────
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
// Allow +, digits, spaces, dashes, parentheses; total digits 7–15
const PHONE_VALID_CHARS = /^[+\d\s\-().]*$/;
const PHONE_DIGIT_RANGE = /^\+?[\d\s\-().]{7,20}$/;

function countDigits(val) {
  return (val.match(/\d/g) || []).length;
}

export default function CTABanner() {
  const [ref, isVisible] = useScrollAnimation();
  const [submitStatus, setSubmitStatus] = useState('idle'); // idle | submitting | success | error | missing-endpoint
  const [errors, setErrors] = useState({ phone: '', email: '' });
  const formRef = useRef(null);

  // ── Phone: only allow valid characters as you type ─────────────────────────
  const handlePhoneKeyDown = (e) => {
    const allowed = /^[0-9+\s\-().]$/;
    const controlKeys = [
      'Backspace', 'Delete', 'Tab', 'Escape', 'Enter',
      'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown',
      'Home', 'End',
    ];
    if (controlKeys.includes(e.key) || (e.ctrlKey || e.metaKey)) return;
    if (!allowed.test(e.key)) e.preventDefault();
  };

  const handlePhoneChange = (e) => {
    const val = e.target.value;
    if (!PHONE_VALID_CHARS.test(val)) {
      e.target.value = val.replace(/[^+\d\s\-().]/g, '');
    }
    // Clear error as user types
    if (errors.phone) setErrors((prev) => ({ ...prev, phone: '' }));
  };

  const validatePhone = (val) => {
    if (!val.trim()) return 'Phone number is required.';
    if (!PHONE_VALID_CHARS.test(val)) return 'Only digits, +, -, spaces and parentheses are allowed.';
    if (!PHONE_DIGIT_RANGE.test(val)) return 'Enter a valid phone number (7–15 digits).';
    if (countDigits(val) < 7 || countDigits(val) > 15) return 'Phone must have 7–15 digits.';
    return '';
  };

  const validateEmail = (val) => {
    if (!val.trim()) return 'Email address is required.';
    if (!EMAIL_REGEX.test(val)) return 'Enter a valid email address (e.g. name@domain.com).';
    return '';
  };

  // ── Email: show error on blur ───────────────────────────────────────────────
  const handleEmailBlur = (e) => {
    setErrors((prev) => ({ ...prev, email: validateEmail(e.target.value) }));
  };
  const handlePhoneBlur = (e) => {
    setErrors((prev) => ({ ...prev, phone: validatePhone(e.target.value) }));
  };
  const handleEmailChange = () => {
    if (errors.email) setErrors((prev) => ({ ...prev, email: '' }));
  };

  // ── Submit ─────────────────────────────────────────────────────────────────
  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    const phoneVal = formData.get('phone') || '';
    const emailVal = formData.get('email') || '';
    const phoneErr = validatePhone(phoneVal);
    const emailErr = validateEmail(emailVal);

    if (phoneErr || emailErr) {
      setErrors({ phone: phoneErr, email: emailErr });
      return;
    }

    setSubmitStatus('submitting');

    if (!formspreeEndpoint) {
      setSubmitStatus('missing-endpoint');
      return;
    }

    const name = formData.get('name') || 'Website visitor';
    formData.append('_subject', `New project inquiry from ${name}`);

    try {
      const response = await fetch(formspreeEndpoint, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: formData,
      });

      if (!response.ok) throw new Error('Formspree submission failed');

      form.reset();
      setErrors({ phone: '', email: '' });
      setSubmitStatus('success');
    } catch {
      setSubmitStatus('error');
    }
  };

  const inputBase =
    'h-14 rounded-xl border bg-[var(--card-bg)] px-5 font-body text-sm text-[var(--text-primary)] shadow-[5px_5px_0_rgba(0,0,0,0.08)] outline-none transition-all duration-300 placeholder:text-[var(--text-secondary)]/70 focus:shadow-[5px_5px_0_rgba(14,165,233,0.16)]';
  const inputOk = 'border-[var(--border)] focus:border-[var(--accent)]';
  const inputErr = 'border-red-500 focus:border-red-500';

  return (
    <section
      id="contact"
      className="section relative w-full overflow-hidden"
    >
      {/* ── "Query Submitted" success overlay banner ────────────────────────── */}
      <AnimatePresence>
        {submitStatus === 'success' && (
          <motion.div
            key="success-banner"
            initial={{ opacity: 0, scale: 0.88, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.88, y: -20 }}
            transition={{ type: 'spring', stiffness: 260, damping: 22 }}
            className="absolute inset-x-0 top-10 z-50 flex justify-center px-4 pointer-events-none"
          >
            <div className="pointer-events-auto flex items-center gap-4 rounded-2xl border border-[var(--accent)]/40 bg-gradient-to-r from-[#0EA5E9]/20 to-[#4F46E5]/20 px-8 py-5 shadow-[0_8px_40px_rgba(14,165,233,0.30)] backdrop-blur-lg">
              <CheckCircle2 size={28} className="shrink-0 text-[var(--accent)]" strokeWidth={2} />
              <div>
                <p className="font-display text-lg font-bold text-[var(--text-primary)]">
                  Query Submitted!
                </p>
                <p className="font-body text-sm text-[var(--text-secondary)] mt-0.5">
                  Thanks for reaching out — we&apos;ll get back to you shortly.
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        ref={ref}
        className="contact-form-shell"
        initial={{ opacity: 0, y: 30 }}
        animate={isVisible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        <div className="w-full text-center mb-10 md:mb-12">
          <p className="font-mono text-xs uppercase tracking-[0.28em] text-[var(--accent)] mb-5">
            Start a Project
          </p>
          <h2 className="font-display text-3xl md:text-4xl lg:text-[3.25rem] font-bold text-[var(--text-primary)] mb-6 leading-[1.12]">
            Ready to Build Something Extraordinary?
          </h2>
          <p className="font-body text-base md:text-lg text-[var(--text-secondary)] leading-relaxed max-w-2xl mx-auto">
            Tell us what you are planning, and our team will get back to you with the next step.
          </p>
        </div>

        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="grid w-full grid-cols-1 gap-5 md:grid-cols-2 md:gap-6"
          noValidate
        >
          {/* Name */}
          <input
            required
            name="name"
            type="text"
            placeholder="Name"
            className={`${inputBase} ${inputOk}`}
          />

          {/* Phone */}
          <div className="flex flex-col gap-1">
            <input
              required
              name="phone"
              type="tel"
              placeholder="Phone (e.g. +1 800 555 0199)"
              maxLength={20}
              onKeyDown={handlePhoneKeyDown}
              onChange={handlePhoneChange}
              onBlur={handlePhoneBlur}
              className={`${inputBase} ${errors.phone ? inputErr : inputOk}`}
            />
            <AnimatePresence>
              {errors.phone && (
                <motion.p
                  key="phone-err"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center gap-1.5 font-body text-xs text-red-400 px-1"
                >
                  <AlertCircle size={12} strokeWidth={2} />
                  {errors.phone}
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          {/* Email */}
          <div className="flex flex-col gap-1">
            <input
              required
              name="email"
              type="email"
              placeholder="Email"
              onChange={handleEmailChange}
              onBlur={handleEmailBlur}
              className={`${inputBase} ${errors.email ? inputErr : inputOk}`}
            />
            <AnimatePresence>
              {errors.email && (
                <motion.p
                  key="email-err"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center gap-1.5 font-body text-xs text-red-400 px-1"
                >
                  <AlertCircle size={12} strokeWidth={2} />
                  {errors.email}
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          {/* Company */}
          <input
            required
            name="company"
            type="text"
            placeholder="Company Name"
            className={`${inputBase} ${inputOk}`}
          />

          {/* Service */}
          <select
            required
            name="service"
            defaultValue=""
            className={`h-14 rounded-xl border border-[var(--border)] bg-[var(--card-bg)] px-5 font-body text-sm text-[var(--text-primary)] shadow-[5px_5px_0_rgba(0,0,0,0.08)] outline-none transition-all duration-300 focus:border-[var(--accent)] focus:shadow-[5px_5px_0_rgba(14,165,233,0.16)] md:col-span-2`}
          >
            <option value="" disabled>
              Services that you want to avail
            </option>
            {serviceOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>

          {/* Description */}
          <textarea
            required
            name="description"
            placeholder="Description"
            rows="7"
            className="min-h-[180px] resize-y rounded-xl border border-[var(--border)] bg-[var(--card-bg)] px-5 py-4 font-body text-sm text-[var(--text-primary)] shadow-[5px_5px_0_rgba(0,0,0,0.08)] outline-none transition-all duration-300 placeholder:text-[var(--text-secondary)]/70 focus:border-[var(--accent)] focus:shadow-[5px_5px_0_rgba(14,165,233,0.16)] md:col-span-2"
          />

          {/* Submit */}
          <div className="md:col-span-2 flex justify-center pt-5">
            <button
              type="submit"
              disabled={submitStatus === 'submitting'}
              className="inline-flex h-14 min-w-[170px] items-center justify-center gap-3 rounded-full bg-gradient-to-r from-[#0EA5E9] to-[#4F46E5] px-8 font-body text-sm font-bold text-white shadow-[0_12px_30px_rgba(14,165,233,0.28)] transition-all duration-300 hover:-translate-y-1 hover:brightness-110 hover:shadow-[0_16px_38px_rgba(14,165,233,0.36)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:ring-offset-2 focus:ring-offset-[var(--bg-primary)] disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0 disabled:hover:brightness-100"
            >
              <Send size={18} strokeWidth={2} />
              {submitStatus === 'submitting' ? 'Sending...' : 'Submit Query'}
            </button>
          </div>

          {/* Error / missing-endpoint messages */}
          {submitStatus === 'error' && (
            <p className="md:col-span-2 text-center font-body text-sm font-medium text-red-400">
              Something went wrong. Please try again in a moment.
            </p>
          )}
          {submitStatus === 'missing-endpoint' && (
            <p className="md:col-span-2 text-center font-body text-sm font-medium text-red-400">
              Formspree endpoint is missing. Add VITE_FORMSPREE_ENDPOINT in Vercel.
            </p>
          )}
        </form>
      </motion.div>
    </section>
  );
}
