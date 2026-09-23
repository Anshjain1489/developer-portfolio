import React from 'react';
import { motion } from 'motion/react';
import { Search, Code2, ShieldAlert, Rocket } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import { ScrollReveal } from './ScrollReveal';

const stepIcons = [Search, Code2, ShieldAlert, Rocket];

export const HowIBuild: React.FC = () => {
  const { buildSteps } = portfolioData;

  return (
    <motion.section
      id="how-i-build"
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.08 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="py-20 bg-slate-50 dark:bg-[#0b0f19] border-t border-slate-200 dark:border-slate-800/80 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <ScrollReveal className="mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-300 dark:border-emerald-500/20 text-emerald-700 dark:text-emerald-400 text-xs font-mono uppercase tracking-wider mb-3">
            Engineering Methodology
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
            How I Build
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm mt-2 max-w-xl">
            A disciplined four-stage development workflow balancing clean architecture, database normalization, and robust security.
          </p>
        </ScrollReveal>

        {/* 4 Steps Grid with Staggered Scroll Entry */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {buildSteps.map((item, index) => {
            const Icon = stepIcons[index] || Code2;
            return (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.45, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="relative rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0f1523] p-6 hover:border-slate-300 dark:hover:border-slate-700 transition-all duration-300 shadow-sm dark:shadow-none hover:shadow-lg dark:hover:shadow-black/40 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100 dark:border-slate-800/80">
                    <span className="text-xs font-mono font-extrabold text-emerald-600 dark:text-emerald-400 tracking-wider">
                      {item.step}
                    </span>
                    <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300">
                      <Icon className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                    </div>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 mb-2">
                    {item.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="mt-6 pt-3 border-t border-slate-100 dark:border-slate-900 text-[11px] font-mono text-slate-500 dark:text-slate-400">
                  Phase {index + 1} Execution
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.section>
  );
};

