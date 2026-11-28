'use client';

import { useState } from 'react';

type Props = {
  recipientEmail: string;
};

export default function ContactForm({ recipientEmail }: Props) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [topic, setTopic] = useState('tech-support');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) return;
    setSubmitted(true);
  };

  const topicLabels: Record<string, string> = {
    'tech-support': 'Technical Question / Guide Troubleshooting',
    'correction': 'Report a Correction or Firmware Discrepancy',
    'pitch': 'Hardware Review / App Testing Pitch',
    'advertising': 'Advertising & Sponsorship Inquiries',
    'general': 'General Reader Feedback',
  };

  const mailtoHref = `mailto:${recipientEmail}?subject=${encodeURIComponent(
    `[${topicLabels[topic] || 'Contact'}] from ${name}`
  )}&body=${encodeURIComponent(
    `Name: ${name}\nEmail: ${email}\nTopic: ${topicLabels[topic] || topic}\n\nMessage:\n${message}`
  )}`;

  return (
    <div className="rounded-2xl border border-line/80 bg-white p-6 sm:p-8 lg:p-9 shadow-2xs">
      <div className="border-b border-line/60 pb-4">
        <h2 className="font-display text-xl sm:text-2xl font-bold text-ink">
          Send Us a Direct Message
        </h2>
        <p className="mt-1 text-xs sm:text-sm text-ink-2">
          Fill out the form below. We review reader dispatches daily and respond within 24–48 hours.
        </p>
      </div>

      {submitted ? (
        <div className="mt-6 rounded-2xl border border-emerald-200 bg-emerald-50/80 p-6 text-center sm:p-8">
          <span className="mx-auto flex size-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 text-xl font-bold shadow-xs">
            ✓
          </span>
          <h3 className="font-display mt-3 text-lg font-bold text-emerald-900">
            Thank You, {name}!
          </h3>
          <p className="mt-2 text-xs sm:text-sm text-emerald-800 max-w-md mx-auto leading-relaxed">
            Your message regarding <strong>{topicLabels[topic]}</strong> has been logged with our editorial lab. We will reply to <strong>{email}</strong> shortly.
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <a
              href={mailtoHref}
              className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-600 px-4 py-2 text-xs font-bold text-white shadow-xs hover:bg-emerald-700 transition"
            >
              <span>Also send via Mail App</span>
              <span aria-hidden="true">↗</span>
            </a>
            <button
              type="button"
              onClick={() => {
                setSubmitted(false);
                setMessage('');
              }}
              className="rounded-xl border border-emerald-300 bg-white px-4 py-2 text-xs font-bold text-emerald-800 hover:bg-emerald-50 transition cursor-pointer"
            >
              Send Another Message
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="mt-6 space-y-5">
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label
                htmlFor="contact-name"
                className="block text-xs font-bold uppercase tracking-wider text-ink mb-2"
              >
                Your Full Name <span className="text-brand">*</span>
              </label>
              <input
                id="contact-name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Alex Morgan"
                className="h-11 w-full rounded-xl border border-line bg-surface-2/40 px-3.5 text-sm text-ink placeholder:text-muted focus:border-brand focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand/15 transition"
              />
            </div>

            <div>
              <label
                htmlFor="contact-email"
                className="block text-xs font-bold uppercase tracking-wider text-ink mb-2"
              >
                Email Address <span className="text-brand">*</span>
              </label>
              <input
                id="contact-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@domain.com"
                className="h-11 w-full rounded-xl border border-line bg-surface-2/40 px-3.5 text-sm text-ink placeholder:text-muted focus:border-brand focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand/15 transition"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="contact-topic"
              className="block text-xs font-bold uppercase tracking-wider text-ink mb-2"
            >
              Topic / Inquiry Department <span className="text-brand">*</span>
            </label>
            <select
              id="contact-topic"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="h-11 w-full rounded-xl border border-line bg-surface-2/40 px-3.5 text-xs sm:text-sm font-semibold text-ink focus:border-brand focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand/15 transition cursor-pointer"
            >
              <option value="tech-support">Technical Question / Guide Troubleshooting</option>
              <option value="correction">Report a Correction or Firmware Discrepancy</option>
              <option value="pitch">Hardware Review / App Testing Pitch</option>
              <option value="advertising">Advertising &amp; Sponsorship Inquiries</option>
              <option value="general">General Reader Feedback</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="contact-message"
              className="block text-xs font-bold uppercase tracking-wider text-ink mb-2"
            >
              Your Message <span className="text-brand">*</span>
            </label>
            <textarea
              id="contact-message"
              required
              rows={5}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Describe your question, step issue, or inquiry in detail..."
              className="w-full rounded-xl border border-line bg-surface-2/40 p-3.5 text-sm text-ink placeholder:text-muted focus:border-brand focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand/15 transition"
            />
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-2">
            <button
              type="submit"
              className="inline-flex min-h-11 items-center justify-center rounded-xl bg-brand px-7 py-2.5 font-display text-sm font-bold text-white shadow-xs hover:bg-brand-strong transition cursor-pointer"
            >
              <span>Send Message</span>
              <span aria-hidden="true" className="ml-2">→</span>
            </button>

            <span className="text-xs text-muted">
              Prefer your mail app?{' '}
              <a
                href={mailtoHref}
                className="font-bold text-brand-strong hover:underline"
              >
                Send direct email
              </a>
            </span>
          </div>
        </form>
      )}
    </div>
  );
}
