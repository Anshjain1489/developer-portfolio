import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Code2,
  Server,
  Layout,
  Database,
  Wrench,
  Sparkles,
  Cpu,
  Layers,
} from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import { ScrollReveal } from './ScrollReveal';

const iconMap: Record<string, React.ElementType> = {
  Code2,
  Server,
  Layout,
  Database,
  Wrench,
  Sparkles,
  Cpu,
};

export const Skills: React.FC = () => {
  const { skills } = portfolioData;
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', ...skills.map((s) => s.title)];

  const filteredCategories =
    selectedCategory === 'All'
      ? skills
      : skills.filter((s) => s.title === selectedCategory);

  const getToneClasses = (tone: string) => {
    switch (tone) {
      case 'emerald':
        return {
          badge: 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-800 dark:text-emerald-300 border-emerald-200 dark:border-emerald-500/30 hover:border-emerald-400',
          icon: 'text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 border-emerald-200 dark:border-emerald-500/25',
          border: 'border-emerald-200 dark:border-emerald-500/20',
        };
      case 'cyan':
        return {
          badge: 'bg-cyan-50 dark:bg-cyan-500/10 text-cyan-800 dark:text-cyan-300 border-cyan-200 dark:border-cyan-500/30 hover:border-cyan-400',
          icon: 'text-cyan-700 dark:text-cyan-400 bg-cyan-50 dark:bg-cyan-500/10 border-cyan-200 dark:border-cyan-500/25',
          border: 'border-cyan-200 dark:border-cyan-500/20',
        };
      case 'blue':
        return {
          badge: 'bg-blue-50 dark:bg-blue-500/10 text-blue-800 dark:text-blue-300 border-blue-200 dark:border-blue-500/30 hover:border-blue-400',
          icon: 'text-blue-700 dark:text-blue-400 bg-blue-50 dark:bg-blue-500/10 border-blue-200 dark:border-blue-500/25',
          border: 'border-blue-200 dark:border-blue-500/20',
        };
      case 'indigo':
        return {
          badge: 'bg-indigo-50 dark:bg-indigo-500/10 text-indigo-800 dark:text-indigo-300 border-indigo-200 dark:border-indigo-500/30 hover:border-indigo-400',
          icon: 'text-indigo-700 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-500/10 border-indigo-200 dark:border-indigo-500/25',
          border: 'border-indigo-200 dark:border-indigo-500/20',
        };
      case 'amber':
        return {
          badge: 'bg-amber-50 dark:bg-amber-500/10 text-amber-800 dark:text-amber-300 border-amber-200 dark:border-amber-500/30 hover:border-amber-400',
          icon: 'text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-500/10 border-amber-200 dark:border-amber-500/25',
          border: 'border-amber-200 dark:border-amber-500/20',
        };
      case 'violet':
        return {
          badge: 'bg-purple-50 dark:bg-purple-500/10 text-purple-800 dark:text-purple-300 border-purple-200 dark:border-purple-500/30 hover:border-purple-400',
          icon: 'text-purple-700 dark:text-purple-400 bg-purple-50 dark:bg-purple-500/10 border-purple-200 dark:border-purple-500/25',
          border: 'border-purple-200 dark:border-purple-500/20',
        };
      default:
        return {
          badge: 'bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-slate-400 dark:hover:border-slate-500',
          icon: 'text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700',
          border: 'border-slate-200 dark:border-slate-800',
        };
    }
  };

  return (
    <motion.section
      id="skills"
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.08 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="py-20 bg-slate-50 dark:bg-[#0b0f19] border-t border-slate-200 dark:border-slate-800/80 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <ScrollReveal className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-300 dark:border-emerald-500/20 text-emerald-700 dark:text-emerald-400 text-xs font-mono uppercase tracking-wider mb-3">
              Technical Expertise
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
              Skills &amp; Technologies
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-sm mt-2 max-w-xl">
              Categorized technical competencies across backend systems, web architecture, databases, and AI tooling.
            </p>
          </div>

          {/* Recruiter friendly note */}
          <div className="text-xs font-mono text-slate-700 dark:text-slate-400 bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 px-3.5 py-2 rounded-lg shrink-0 shadow-xs">
            <span className="text-emerald-600 dark:text-emerald-400 font-semibold">Focus:</span> Java, Spring Boot, REST APIs, PostgreSQL
          </div>
        </ScrollReveal>

        {/* Filter Pills */}
        <ScrollReveal delay={0.1} duration={0.45} className="flex items-center gap-2 overflow-x-auto pb-3 mb-8 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap ${
                selectedCategory === cat
                  ? 'bg-emerald-600 dark:bg-emerald-500 text-white dark:text-slate-950 font-semibold shadow-xs'
                  : 'bg-white dark:bg-slate-900/80 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 shadow-xs dark:shadow-none'
              }`}
            >
              {cat}
            </button>
          ))}
        </ScrollReveal>

        {/* Skill Category Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCategories.map((category, index) => {
            const Icon = iconMap[category.iconName] || Layers;
            const style = getToneClasses(category.badgeTone);

            return (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.45, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
                className="group rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0f1523] p-5 hover:border-slate-300 dark:hover:border-slate-700 transition-all duration-300 shadow-sm dark:shadow-none hover:shadow-xl dark:hover:shadow-black/40 flex flex-col justify-between"
              >
                <div>
                  {/* Category Header */}
                  <div className="flex items-center gap-3 pb-4 mb-4 border-b border-slate-100 dark:border-slate-800/80">
                    <div className={`p-2 rounded-lg border ${style.icon}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100 group-hover:text-emerald-600 dark:group-hover:text-white transition-colors">
                        {category.title}
                      </h3>
                      <span className="text-[11px] text-slate-500 dark:text-slate-400 font-mono">
                        {category.skills.length} competencies
                      </span>
                    </div>
                  </div>

                  {/* Skills Pills */}
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill) => (
                      <span
                        key={skill}
                        className={`px-2.5 py-1 text-xs font-mono font-medium rounded-md border transition-all duration-150 ${style.badge}`}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-900 text-[11px] text-slate-500 dark:text-slate-400 font-mono flex items-center justify-between">
                  <span>Production verified</span>
                  <span className="text-emerald-600 dark:text-emerald-500 font-bold">•</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.section>
  );
};
