import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { LANDING_FAQS } from '../landingData';
import { fadeInUp, stagger } from './animations';

export const FaqSection = () => {
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  return (
    <motion.section
      id="faq"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      variants={stagger}
      className="max-w-3xl mx-auto px-6 space-y-6"
    >
      <motion.div variants={fadeInUp} className="text-center space-y-2">
        <h2 className="text-2xl font-heading font-bold text-slate-900">Pertanyaan Umum (FAQ)</h2>
        <p className="text-xs text-slate-500">Informasi penting seputar reservasi dan layanan Fattah WO</p>
      </motion.div>

      <div className="space-y-3">
        {LANDING_FAQS.map((faq, idx) => {
          const isOpen = openFaqIndex === idx;
          return (
            <motion.div
              key={idx}
              variants={fadeInUp}
              className="border border-slate-200 rounded-xl overflow-hidden bg-white transition-shadow hover:shadow-sm"
            >
              <button
                onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                className="w-full p-4 text-left font-bold text-sm text-slate-900 flex justify-between items-center hover:bg-slate-50 transition-colors"
              >
                <span>{faq.q}</span>
                <ChevronDown
                  className={`w-4 h-4 text-slate-400 shrink-0 ml-3 transition-transform duration-200 ${
                    isOpen ? 'rotate-180 text-primary' : ''
                  }`}
                />
              </button>
              {isOpen && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                  className="px-4 pb-4 text-xs text-slate-600 border-t border-slate-100 bg-slate-50/50 leading-relaxed pt-3"
                >
                  {faq.a}
                </motion.div>
              )}
            </motion.div>
          );
        })}
      </div>
    </motion.section>
  );
};

export default FaqSection;
