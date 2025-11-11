'use client';

import { useState } from 'react';

export function EmailCapture({ onSuccess }: { onSuccess?: () => void }) {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || isSubmitting) return;

    setIsSubmitting(true);
    // TODO: Integrate with your email service (e.g., Mailchimp, ConvertKit)
    // For now, just simulate success
    setTimeout(() => {
      setIsSubmitted(true);
      setIsSubmitting(false);
      if (onSuccess) onSuccess();
    }, 500);
  };

  if (isSubmitted) {
    return (
      <div className="text-xs text-green-600 dark:text-green-400 text-center py-2">
        ✓ Thanks! We&apos;ll keep you updated.
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="py-3 border-t border-neutral-200 dark:border-neutral-700"
    >
      <p className="text-xs font-medium mb-2">Get 10% off your first order</p>
      <div className="flex gap-2">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className="flex-1 px-3 py-2 text-sm border border-neutral-300 dark:border-neutral-600 rounded bg-white dark:bg-neutral-900 focus:outline-none focus:ring-2 focus:ring-neutral-500"
          required
        />
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-4 py-2 text-xs font-medium bg-neutral-800 text-white rounded hover:bg-neutral-700 disabled:opacity-50"
        >
          {isSubmitting ? '...' : 'Sign Up'}
        </button>
      </div>
    </form>
  );
}
