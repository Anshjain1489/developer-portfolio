import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ExternalLink, Award, CheckCircle2, ShieldCheck, Calendar, Clock, Hash } from 'lucide-react';
import { CertificationItem } from '../types/portfolio';

interface CertificateModalProps {
  cert: CertificationItem | null;
  onClose: () => void;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({ cert, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (cert) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [cert, onClose]);

  if (!cert) return null;

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/85 backdrop-blur-md"
        onClick={onClose}
        id="certificate-viewer-backdrop"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.25 }}
          className="relative w-full max-w-2xl rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#0f1523] p-6 sm:p-8 shadow-2xl my-8 overflow-hidden text-left"
          onClick={(e) => e.stopPropagation()}
          role="dialog"
          aria-modal="true"
        >
          {/* Header */}
          <div className="flex items-start justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/25 text-emerald-700 dark:text-emerald-400">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] font-mono uppercase tracking-wider text-emerald-700 dark:text-emerald-400 font-semibold">
                  Verified Credential
                </span>
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mt-0.5">
                  {cert.title}
                </h3>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-lg text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Certificate Credential Canvas Preview */}
          <div className="mt-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#0c101d] p-6 space-y-4 shadow-inner">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800/80 pb-3">
              <span className="text-xs font-mono uppercase tracking-wider text-slate-600 dark:text-slate-400">
                Issuer: <strong className="text-slate-900 dark:text-slate-200">{cert.issuer}</strong>
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 text-emerald-700 dark:text-emerald-400 text-xs font-mono">
                <ShieldCheck className="w-3.5 h-3.5" /> Authenticated
              </span>
            </div>

            <div className="space-y-2 py-2">
              <p className="text-xs text-slate-500 dark:text-slate-400 font-mono">Awarded To:</p>
              <h4 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">Ansh Jain</h4>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                For successful completion and proficiency verification in{' '}
                <span className="text-slate-800 dark:text-slate-200 font-medium">{cert.title}</span>.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs font-mono">
              <div className="flex items-center gap-2 p-2.5 rounded bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800/80 text-slate-800 dark:text-slate-300 shadow-xs dark:shadow-none">
                <Calendar className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>Issued: {cert.issuedDate}</span>
              </div>
              {cert.hours && (
                <div className="flex items-center gap-2 p-2.5 rounded bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800/80 text-slate-800 dark:text-slate-300 shadow-xs dark:shadow-none">
                  <Clock className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <span>Duration: {cert.hours}</span>
                </div>
              )}
              {cert.credentialId && (
                <div className="sm:col-span-2 flex items-center gap-2 p-2.5 rounded bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800/80 text-slate-800 dark:text-slate-300 shadow-xs dark:shadow-none overflow-hidden">
                  <Hash className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <span className="truncate">ID: {cert.credentialId}</span>
                </div>
              )}
            </div>

            {cert.topics && cert.topics.length > 0 && (
              <div className="pt-2">
                <p className="text-[11px] font-mono uppercase text-slate-500 dark:text-slate-400 mb-2">
                  Verified Curriculum &amp; Competencies
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {cert.topics.map((t) => (
                    <div key={t} className="flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                      <span>{t}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Modal Actions */}
          <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between gap-3">
            {cert.verificationUrl ? (
              <a
                href={cert.verificationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-400 text-white dark:text-slate-950 text-xs font-semibold transition-colors shadow-xs"
              >
                <span>Verify on Official Portal</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            ) : (
              <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">Verified Credential Record</span>
            )}

            <button
              onClick={onClose}
              className="px-4 py-2 rounded-lg text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white text-xs font-medium border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-colors"
            >
              Close
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
