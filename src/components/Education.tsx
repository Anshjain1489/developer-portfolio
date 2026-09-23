import React from 'react';
import { motion } from 'motion/react';
import { GraduationCap, BookOpen, Calendar, Award, Building2 } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import { ScrollReveal } from './ScrollReveal';

export const Education: React.FC = () => {
  const { education } = portfolioData;

  return (
    <motion.section
      id="education"
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.08 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="py-20 bg-white dark:bg-[#0b0f19] border-t border-slate-200 dark:border-slate-800/80 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <ScrollReveal className="mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-300 dark:border-emerald-500/20 text-emerald-700 dark:text-emerald-400 text-xs font-mono uppercase tracking-wider mb-3">
            Academic Background
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
            Education
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm mt-2 max-w-xl">
            Formal Computer Science academic foundation and schooling credentials.
          </p>
        </ScrollReveal>

        {/* Education Timeline */}
        <div className="relative border-l border-slate-200 dark:border-slate-800 ml-4 sm:ml-6 space-y-8">
          {education.map((item, index) => (
            <motion.div
              key={item.degree}
              initial={{ opacity: 0, x: -16, y: 8 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
              className="relative pl-6 sm:pl-8 group"
            >
              {/* Timeline Marker Dot */}
              <div
                className={`absolute -left-[9px] top-1.5 h-4 w-4 rounded-full border-2 transition-all ${
                  item.isCurrent
                    ? 'bg-emerald-600 dark:bg-emerald-500 border-emerald-300 ring-4 ring-emerald-500/20'
                    : 'bg-slate-200 dark:bg-slate-900 border-slate-400 dark:border-slate-600 group-hover:border-emerald-500'
                }`}
              />

              {/* Education Card */}
              <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-[#0f1523] p-6 hover:border-slate-300 dark:hover:border-slate-700 transition-all duration-300 shadow-sm dark:shadow-md">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 mb-3 border-b border-slate-200 dark:border-slate-800/80">
                  <div>
                    <span className="text-[11px] font-mono uppercase tracking-wider text-emerald-700 dark:text-emerald-400 font-semibold">
                      {item.isCurrent ? 'Undergraduate Degree (In Progress)' : 'Schooling Credential'}
                    </span>
                    <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100 mt-0.5">
                      {item.degree}
                    </h3>
                  </div>

                  <div className="flex items-center gap-2 text-xs font-mono text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 w-fit shadow-xs dark:shadow-none">
                    <Calendar className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                    <span>{item.period}</span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                  <div className="flex items-center gap-1.5 font-medium text-slate-800 dark:text-slate-200">
                    <Building2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                    <span>{item.institution}</span>
                  </div>

                  {item.score && (
                    <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 text-emerald-700 dark:text-emerald-300 font-mono text-xs">
                      <Award className="w-3.5 h-3.5" />
                      <span>Score: {item.score}</span>
                    </div>
                  )}
                </div>

                {item.details && (
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 font-mono">
                    {item.details}
                  </p>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};
