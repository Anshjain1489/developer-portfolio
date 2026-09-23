import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Award, ExternalLink, Calendar, CheckCircle2, ShieldCheck, Eye } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import { CertificationItem } from '../types/portfolio';
import { CertificateModal } from './CertificateModal';
import { ScrollReveal } from './ScrollReveal';

export const Certifications: React.FC = () => {
  const { certifications } = portfolioData;
  const [selectedCert, setSelectedCert] = useState<CertificationItem | null>(null);

  return (
    <motion.section
      id="certifications"
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.08 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="py-20 bg-slate-50 dark:bg-[#090d16] border-t border-slate-200 dark:border-slate-800/80 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <ScrollReveal className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-300 dark:border-emerald-500/20 text-emerald-700 dark:text-emerald-400 text-xs font-mono uppercase tracking-wider mb-3">
              Verified Credentials
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
              Certifications &amp; Accreditations
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-sm mt-2 max-w-xl">
              Professional credentials validating backend Java/Spring Boot proficiency and modern Generative AI engineering workflows.
            </p>
          </div>

          <div className="text-xs font-mono text-slate-600 dark:text-slate-400 bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 px-3 py-1.5 rounded-md shadow-xs">
            Click any credential to inspect verification details
          </div>
        </ScrollReveal>

        {/* Certifications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {certifications.map((cert, index) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.12 }}
              transition={{ duration: 0.45, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="group rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0f1523] p-6 hover:border-slate-300 dark:hover:border-slate-700 transition-all duration-300 shadow-sm dark:shadow-none hover:shadow-xl dark:hover:shadow-black/40 flex flex-col justify-between"
            >
              <div>
                {/* Header with Issuer & Date */}
                <div className="flex items-start justify-between gap-3 pb-3 mb-3 border-b border-slate-100 dark:border-slate-800/80">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 rounded-lg bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/25 text-emerald-700 dark:text-emerald-400 shrink-0">
                      <Award className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-xs font-mono uppercase text-emerald-700 dark:text-emerald-400 font-semibold tracking-wide">
                        {cert.issuer}
                      </p>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 font-mono flex items-center gap-1 mt-0.5">
                        <Calendar className="w-3 h-3" />
                        <span>{cert.issuedDate}</span>
                      </p>
                    </div>
                  </div>

                  <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 shrink-0">
                    Verified
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100 group-hover:text-emerald-600 dark:group-hover:text-emerald-300 transition-colors leading-snug">
                  {cert.title}
                </h3>

                {/* Credential ID if present */}
                {cert.credentialId && (
                  <p className="text-[11px] font-mono text-slate-500 dark:text-slate-400 mt-2 truncate">
                    Credential ID: <span className="text-slate-700 dark:text-slate-300">{cert.credentialId}</span>
                  </p>
                )}

                {/* Key topics preview */}
                {cert.topics && (
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {cert.topics.slice(0, 2).map((topic) => (
                      <span
                        key={topic}
                        className="px-2 py-0.5 text-[11px] font-mono rounded bg-slate-50 dark:bg-slate-900/80 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800"
                      >
                        {topic}
                      </span>
                    ))}
                    {cert.topics.length > 2 && (
                      <span className="px-2 py-0.5 text-[11px] font-mono rounded bg-slate-100 dark:bg-slate-900/80 text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-800">
                        +{cert.topics.length - 2} more
                      </span>
                    )}
                  </div>
                )}
              </div>

              {/* Card Footer Actions */}
              <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between gap-3">
                <button
                  onClick={() => setSelectedCert(cert)}
                  className="flex items-center gap-1.5 text-xs font-medium text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 transition-colors"
                >
                  <Eye className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  <span>Inspect Credential</span>
                </button>

                {cert.verificationUrl && (
                  <a
                    href={cert.verificationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-xs font-mono text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors"
                  >
                    <span>Verify</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Certificate Modal */}
      <CertificateModal
        cert={selectedCert}
        onClose={() => setSelectedCert(null)}
      />
    </motion.section>
  );
};
