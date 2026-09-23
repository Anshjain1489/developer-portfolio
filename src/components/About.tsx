import React from 'react';
import { motion } from 'motion/react';
import {
  GraduationCap,
  Building2,
  Calendar,
  Layers,
  Sparkles,
  MapPin,
  CheckCircle,
  FileText,
} from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import { ScrollReveal } from './ScrollReveal';

export const About: React.FC = () => {
  const { personal } = portfolioData;

  const infoCards = [
    {
      label: 'Education',
      value: personal.degree,
      icon: GraduationCap,
      accent: 'text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 border-emerald-200 dark:border-emerald-500/20',
    },
    {
      label: 'College',
      value: personal.college,
      icon: Building2,
      accent: 'text-cyan-700 dark:text-cyan-400 bg-cyan-50 dark:bg-cyan-500/10 border-cyan-200 dark:border-cyan-500/20',
    },
    {
      label: 'Graduation Year',
      value: personal.expectedGraduation,
      icon: Calendar,
      accent: 'text-blue-700 dark:text-blue-400 bg-blue-50 dark:bg-blue-500/10 border-blue-200 dark:border-blue-500/20',
    },
    {
      label: 'Primary Focus',
      value: personal.primaryFocus,
      icon: Layers,
      accent: 'text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-500/10 border-amber-200 dark:border-amber-500/20',
    },
    {
      label: 'Secondary Focus',
      value: personal.secondaryFocus,
      icon: Sparkles,
      accent: 'text-purple-700 dark:text-purple-400 bg-purple-50 dark:bg-purple-500/10 border-purple-200 dark:border-purple-500/20',
    },
    {
      label: 'Location',
      value: personal.location,
      icon: MapPin,
      accent: 'text-teal-700 dark:text-teal-400 bg-teal-50 dark:bg-teal-500/10 border-teal-200 dark:border-teal-500/20',
    },
  ];

  return (
    <motion.section
      id="about"
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.08 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="py-20 border-t border-slate-200 dark:border-slate-800/80 bg-white dark:bg-[#090d16] overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header with subtle scroll reveal */}
        <ScrollReveal className="mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-300 dark:border-emerald-500/20 text-emerald-700 dark:text-emerald-400 text-xs font-mono uppercase tracking-wider mb-3">
            Profile Overview
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
            About Me
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Narrative introduction */}
          <ScrollReveal
            delay={0.1}
            duration={0.6}
            className="lg:col-span-7 space-y-5"
          >
            <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-[#0f1523]/80 p-6 sm:p-8 space-y-4 shadow-sm dark:shadow-lg">
              <p className="text-slate-700 dark:text-slate-300 text-base leading-relaxed">
                I am a BCA Computer Science student at IPS Academy, Indore, with hands-on experience
                developing and deploying full-stack and backend applications. My primary focus is{' '}
                <strong className="text-slate-900 dark:text-white font-semibold">
                  Java, Spring Boot, Spring Security, REST APIs, React, and PostgreSQL
                </strong>
                .
              </p>

              <p className="text-slate-700 dark:text-slate-300 text-base leading-relaxed">
                I enjoy building practical applications that combine clean backend architecture,
                secure authentication, database integration, and modern user interfaces. I also use{' '}
                <strong className="text-emerald-700 dark:text-emerald-400 font-semibold">
                  Generative AI and AI-assisted development tools
                </strong>{' '}
                to accelerate development, debugging, and experimentation.
              </p>

              <div className="p-4 rounded-lg bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-500/25">
                <p className="text-emerald-900 dark:text-emerald-200 text-sm font-medium leading-relaxed">
                  "I am currently seeking internship and entry-level opportunities in Java Backend,
                  Spring Boot, Full-Stack Development, and Software Engineering."
                </p>
              </div>

              {/* Core Strengths Checklist for Recruiters */}
              <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="flex items-center gap-2.5 text-xs text-slate-700 dark:text-slate-300 font-mono">
                  <CheckCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <span>Stateless JWT &amp; Role-Based Security</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-slate-700 dark:text-slate-300 font-mono">
                  <CheckCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <span>JPA / Hibernate Entity Relationships</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-slate-700 dark:text-slate-300 font-mono">
                  <CheckCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <span>Decoupled React &amp; RESTful APIs</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-slate-700 dark:text-slate-300 font-mono">
                  <CheckCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <span>AI-Assisted Fast Prototyping</span>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Compact Developer Information Card */}
          <ScrollReveal
            delay={0.2}
            duration={0.6}
            className="lg:col-span-5"
          >
            <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0f1523] p-6 shadow-sm dark:shadow-lg space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
                <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-200 uppercase font-mono tracking-wider">
                  Developer Profile Snapshot
                </h3>
                <span className="text-[11px] px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-mono">
                  Verified Data
                </span>
              </div>

              <div className="space-y-3.5">
                {infoCards.map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <motion.div
                      key={item.label}
                      initial={{ opacity: 0, x: 12 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.35, delay: 0.2 + idx * 0.05 }}
                      className="p-3 rounded-lg bg-slate-50 dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800/80 flex items-start gap-3.5 hover:border-slate-300 dark:hover:border-slate-700 transition-colors"
                    >
                      <div className={`p-2 rounded-md border shrink-0 ${item.accent}`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">{item.label}</p>
                        <p className="text-sm font-semibold text-slate-900 dark:text-slate-100 truncate mt-0.5">
                          {item.value}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </motion.section>
  );
};
