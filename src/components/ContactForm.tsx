import { useState, useEffect, type FormEvent } from 'react';
import {
  Send,
  CheckCircle2,
  AlertCircle,
  Mail,
  MessageCircle,
  ArrowUpRight,
  RotateCcw,
} from 'lucide-react';

const PROJECT_FOCUSES = [
  'Real Estate',
  'Fashion & Retail',
  'Service Business',
  'Brand Website',
] as const;

type ProjectFocus = (typeof PROJECT_FOCUSES)[number];

interface ContactFormProps {
  recipientEmail: string;
  whatsappUrl: string;
  initialSubjectNote?: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

export function ContactForm({
  recipientEmail,
  whatsappUrl,
  initialSubjectNote,
}: ContactFormProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [focus, setFocus] = useState<ProjectFocus>('Real Estate');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (initialSubjectNote) {
      setMessage(initialSubjectNote);
      setSubmitted(false);
    }
  }, [initialSubjectNote]);

  const validate = (): FormErrors => {
    const nextErrors: FormErrors = {};
    if (!name.trim()) {
      nextErrors.name = 'Please enter your name.';
    }
    if (!email.trim()) {
      nextErrors.email = 'Please enter your email address.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      nextErrors.email = 'Please enter a valid email address.';
    }
    if (!message.trim() || message.trim().length < 10) {
      nextErrors.message = 'Please share a few details about your project.';
    }
    return nextErrors;
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    setSubmitted(true);
  };

  const composedSubject = `Website Inquiry (${focus}) — ${name.trim()}`;
  const composedBody = `Hi Fortune,\n\nName: ${name.trim()}\nEmail: ${email.trim()}\nProject Focus: ${focus}\n\nProject Details:\n${message.trim()}`;

  const mailtoHref = `mailto:${recipientEmail}?subject=${encodeURIComponent(
    composedSubject
  )}&body=${encodeURIComponent(composedBody)}`;

  const whatsappBase = whatsappUrl.split('?')[0];
  const whatsappHref = `${whatsappBase}?text=${encodeURIComponent(composedBody)}`;

  if (submitted) {
    return (
      <div className="rounded-2xl border border-[#27272A] bg-[#0C0C0E] p-6 sm:p-8 lg:p-10 space-y-6">
        <div className="flex items-start gap-3.5">
          <CheckCircle2
            className="w-6 h-6 text-[#60A5FA] shrink-0 mt-0.5"
            aria-hidden="true"
          />
          <div className="space-y-1.5">
            <h3 className="text-xl sm:text-2xl font-semibold tracking-tight text-[#F4F4F5]">
              Inquiry ready, {name.trim()}
            </h3>
            <p className="text-sm leading-relaxed text-[#A1A1AA]">
              Choose how you would like to send your project brief below. I respond within 12 hours.
            </p>
          </div>
        </div>

        <div className="border-t border-[#27272A] pt-5 space-y-2 text-sm">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-[#A1A1AA]">
            <span className="text-[#F4F4F5] font-medium">{focus}</span>
            <span aria-hidden="true">·</span>
            <span>{email.trim()}</span>
          </div>
          <p className="text-sm leading-relaxed text-[#D4D4D8] whitespace-pre-line">
            {message.trim()}
          </p>
        </div>

        <div className="pt-2 flex flex-wrap items-center gap-3">
          <a
            href={mailtoHref}
            className="inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold text-white bg-[#2563EB] hover:bg-[#1D4ED8] rounded-lg transition-colors duration-150 whitespace-nowrap"
          >
            <Mail className="w-4 h-4" aria-hidden="true" />
            <span>Open Email App</span>
          </a>

          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold text-white bg-[#15803D] hover:bg-[#166534] border border-[#22C55E]/40 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4ADE80] rounded-lg transition-colors duration-150 whitespace-nowrap"
          >
            <MessageCircle className="w-4 h-4" aria-hidden="true" />
            <span>Send on WhatsApp</span>
            <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
          </a>

          <button
            type="button"
            onClick={() => setSubmitted(false)}
            className="inline-flex items-center gap-1.5 px-4 py-3 text-sm font-medium text-[#A1A1AA] hover:text-[#F4F4F5] transition-colors cursor-pointer whitespace-nowrap"
          >
            <RotateCcw className="w-4 h-4" aria-hidden="true" />
            <span>Edit Details</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="rounded-2xl border border-[#27272A] bg-[#0C0C0E] p-6 sm:p-8 lg:p-10 space-y-6"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="space-y-2">
          <label
            htmlFor="contact-name"
            className="block text-xs font-medium text-[#E4E4E7]"
          >
            Your Name
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            autoComplete="name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }));
            }}
            placeholder="Amara Osei"
            aria-invalid={Boolean(errors.name)}
            className={`w-full rounded-lg bg-[#050505] border px-4 py-3 text-sm text-[#F4F4F5] placeholder:text-[#71717A] transition-colors duration-150 focus:outline-none ${
              errors.name
                ? 'border-[#EF4444] focus:border-[#EF4444]'
                : 'border-[#27272A] focus:border-[#3B82F6]'
            }`}
          />
          {errors.name && (
            <p role="alert" className="inline-flex items-center gap-1.5 text-xs text-[#F87171]">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
              <span>{errors.name}</span>
            </p>
          )}
        </div>

        <div className="space-y-2">
          <label
            htmlFor="contact-email"
            className="block text-xs font-medium text-[#E4E4E7]"
          >
            Email Address
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
            }}
            placeholder="you@company.com"
            aria-invalid={Boolean(errors.email)}
            className={`w-full rounded-lg bg-[#050505] border px-4 py-3 text-sm text-[#F4F4F5] placeholder:text-[#71717A] transition-colors duration-150 focus:outline-none ${
              errors.email
                ? 'border-[#EF4444] focus:border-[#EF4444]'
                : 'border-[#27272A] focus:border-[#3B82F6]'
            }`}
          />
          {errors.email && (
            <p role="alert" className="inline-flex items-center gap-1.5 text-xs text-[#F87171]">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
              <span>{errors.email}</span>
            </p>
          )}
        </div>
      </div>

      <div className="space-y-2.5">
        <span className="block text-xs font-medium text-[#E4E4E7]">
          Business or Brand Focus
        </span>
        <div
          role="group"
          aria-label="Select business or brand focus"
          className="grid grid-cols-2 sm:grid-cols-4 gap-2"
        >
          {PROJECT_FOCUSES.map((option) => {
            const isSelected = focus === option;
            return (
              <button
                key={option}
                type="button"
                aria-pressed={isSelected}
                onClick={() => setFocus(option)}
                className={`px-3 py-2.5 text-xs font-medium rounded-lg border transition-colors duration-150 cursor-pointer whitespace-nowrap truncate ${
                  isSelected
                    ? 'bg-[#2563EB]/15 border-[#3B82F6] text-[#F4F4F5]'
                    : 'bg-[#050505] border-[#27272A] text-[#A1A1AA] hover:text-[#F4F4F5] hover:border-[#3F3F46]'
                }`}
              >
                {option}
              </button>
            );
          })}
        </div>
      </div>

      <div className="space-y-2">
        <label
          htmlFor="contact-message"
          className="block text-xs font-medium text-[#E4E4E7]"
        >
          Project Details
        </label>
        <textarea
          id="contact-message"
          name="message"
          rows={4}
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
            if (errors.message) setErrors((prev) => ({ ...prev, message: undefined }));
          }}
          placeholder="Tell me about your business, what you want your website to achieve, and your timeline..."
          aria-invalid={Boolean(errors.message)}
          className={`w-full rounded-lg bg-[#050505] border px-4 py-3 text-sm leading-relaxed text-[#F4F4F5] placeholder:text-[#71717A] transition-colors duration-150 focus:outline-none resize-y min-h-[120px] ${
            errors.message
              ? 'border-[#EF4444] focus:border-[#EF4444]'
              : 'border-[#27272A] focus:border-[#3B82F6]'
          }`}
        />
        {errors.message && (
          <p role="alert" className="inline-flex items-center gap-1.5 text-xs text-[#F87171]">
            <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
            <span>{errors.message}</span>
          </p>
        )}
      </div>

      <div className="pt-1 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <button
          type="submit"
          className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm sm:text-base font-semibold text-white bg-[#2563EB] hover:bg-[#1D4ED8] rounded-lg transition-colors duration-150 cursor-pointer whitespace-nowrap shrink-0"
        >
          <span>Send Inquiry</span>
          <Send className="w-4 h-4" aria-hidden="true" />
        </button>

        <p className="text-sm text-[#A1A1AA]">
          I respond within 12 hours.
        </p>
      </div>
    </form>
  );
}
