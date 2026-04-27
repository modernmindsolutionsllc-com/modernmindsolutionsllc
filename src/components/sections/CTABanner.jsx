import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send } from 'lucide-react';
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

export default function CTABanner() {
  const [ref, isVisible] = useScrollAnimation();
  const [submitStatus, setSubmitStatus] = useState('idle');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitStatus('submitting');

    if (!formspreeEndpoint) {
      setSubmitStatus('missing-endpoint');
      return;
    }

    const form = event.currentTarget;
    const formData = new FormData(form);
    const name = formData.get('name') || 'Website visitor';

    formData.append('_subject', `New project inquiry from ${name}`);

    try {
      const response = await fetch(formspreeEndpoint, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Formspree submission failed');
      }

      form.reset();
      setSubmitStatus('success');
    } catch {
      setSubmitStatus('error');
    }
  };

  return (
    <section
      id="contact"
      className="relative w-full py-16 sm:py-24 md:py-44 mt-10 md:mt-20 overflow-hidden"
    >
      <motion.div
        ref={ref}
        className="contact-form-shell"
        initial={{ opacity: 0, y: 30 }}
        animate={isVisible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        <div className="w-full text-center mb-12 md:mb-14">
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
          onSubmit={handleSubmit}
          className="grid w-full grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2 md:gap-6"
        >
          <input
            required
            name="name"
            type="text"
            placeholder="Name"
            className="h-14 rounded-xl border border-[var(--border)] bg-[var(--card-bg)] px-5 font-body text-sm text-[var(--text-primary)] shadow-[5px_5px_0_rgba(0,0,0,0.08)] outline-none transition-all duration-300 placeholder:text-[var(--text-secondary)]/70 focus:border-[var(--accent)] focus:shadow-[5px_5px_0_rgba(232,118,58,0.16)]"
          />
          <input
            required
            name="phone"
            type="tel"
            placeholder="Phone"
            className="h-14 rounded-xl border border-[var(--border)] bg-[var(--card-bg)] px-5 font-body text-sm text-[var(--text-primary)] shadow-[5px_5px_0_rgba(0,0,0,0.08)] outline-none transition-all duration-300 placeholder:text-[var(--text-secondary)]/70 focus:border-[var(--accent)] focus:shadow-[5px_5px_0_rgba(232,118,58,0.16)]"
          />
          <input
            required
            name="email"
            type="email"
            placeholder="Email"
            className="h-14 rounded-xl border border-[var(--border)] bg-[var(--card-bg)] px-5 font-body text-sm text-[var(--text-primary)] shadow-[5px_5px_0_rgba(0,0,0,0.08)] outline-none transition-all duration-300 placeholder:text-[var(--text-secondary)]/70 focus:border-[var(--accent)] focus:shadow-[5px_5px_0_rgba(232,118,58,0.16)]"
          />
          <input
            required
            name="company"
            type="text"
            placeholder="Company Name"
            className="h-14 rounded-xl border border-[var(--border)] bg-[var(--card-bg)] px-5 font-body text-sm text-[var(--text-primary)] shadow-[5px_5px_0_rgba(0,0,0,0.08)] outline-none transition-all duration-300 placeholder:text-[var(--text-secondary)]/70 focus:border-[var(--accent)] focus:shadow-[5px_5px_0_rgba(232,118,58,0.16)]"
          />
          <select
            required
            name="service"
            defaultValue=""
            className="h-14 rounded-xl border border-[var(--border)] bg-[var(--card-bg)] px-5 font-body text-sm text-[var(--text-primary)] shadow-[5px_5px_0_rgba(0,0,0,0.08)] outline-none transition-all duration-300 focus:border-[var(--accent)] focus:shadow-[5px_5px_0_rgba(232,118,58,0.16)] md:col-span-2"
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
          <textarea
            required
            name="description"
            placeholder="Description"
            rows="7"
            className="min-h-[180px] resize-y rounded-xl border border-[var(--border)] bg-[var(--card-bg)] px-5 py-4 font-body text-sm text-[var(--text-primary)] shadow-[5px_5px_0_rgba(0,0,0,0.08)] outline-none transition-all duration-300 placeholder:text-[var(--text-secondary)]/70 focus:border-[var(--accent)] focus:shadow-[5px_5px_0_rgba(232,118,58,0.16)] md:col-span-2"
          />
          <div className="md:col-span-2 flex justify-center pt-5">
            <button
              type="submit"
              disabled={submitStatus === 'submitting'}
              className="inline-flex h-14 min-w-[170px] items-center justify-center gap-3 rounded-full bg-gradient-to-r from-[#F5A623] to-[#F15A24] px-8 font-body text-sm font-bold text-white shadow-[0_12px_30px_rgba(241,90,36,0.28)] transition-all duration-300 hover:-translate-y-1 hover:brightness-110 hover:shadow-[0_16px_38px_rgba(241,90,36,0.36)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:ring-offset-2 focus:ring-offset-[var(--bg-primary)] disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0 disabled:hover:brightness-100"
            >
              <Send size={18} strokeWidth={2} />
              {submitStatus === 'submitting' ? 'Sending...' : 'Submit'}
            </button>
          </div>
          {submitStatus === 'success' && (
            <p className="md:col-span-2 text-center md:text-right font-body text-sm font-medium text-[var(--accent)]">
              Thanks. Your inquiry has been sent successfully.
            </p>
          )}
          {submitStatus === 'error' && (
            <p className="md:col-span-2 text-center md:text-right font-body text-sm font-medium text-red-400">
              Something went wrong. Please try again in a moment.
            </p>
          )}
          {submitStatus === 'missing-endpoint' && (
            <p className="md:col-span-2 text-center md:text-right font-body text-sm font-medium text-red-400">
              Formspree endpoint is missing. Add VITE_FORMSPREE_ENDPOINT in Vercel.
            </p>
          )}
        </form>
      </motion.div>
    </section>
  );
}
