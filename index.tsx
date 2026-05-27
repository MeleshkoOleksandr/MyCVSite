// --- Core Dependencies ---
import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';

// --- Icons ---
import {
  Mail,
  Phone,
  MapPin,
  ChevronDown,
  ChevronUp,
  X,
  Search,
  Calendar,
  Flag,
  FileCheck,
  Award,
  Briefcase,
  User,
  Heart,
  Cpu,
  Github,
} from 'lucide-react';

// --- Animation Library ---
import { motion, AnimatePresence } from 'framer-motion';

// --- Types & Data Interfaces ---
// Define TypeScript interfaces to ensure strict typings for dynamic JSON content
type Language = string;

interface ExperienceItem {
  role: string;
  company: string;
  period: string;
  sector?: string;
  details: string[];
  tech?: string[];
}

interface EducationItem {
  degree: string;
  school: string;
  period: string;
  specialization?: string;
}

interface LanguageSkill {
  name: string;
  level: string;
  dots: number;
}

interface TechnicalSkill {
  name: string;
  level: number;
}

/**
 * Interface corresponding to the structure of the language JSON files (e.g., en.json).
 * It enforces that every localization file provides the correct UI texts and content.
 */
interface Translation {
  ui: {
    sections: {
      summary: string;
      comp: string;
      work: string;
      edu: string;
      personal: string;
      hobbies: string;
    };
    labels: {
      skills: string;
      languages: string;
      location: string;
      email: string;
      phone: string;
      nationality: string;
      birth: string;
      permit: string;
      nationalityVal: string;
    };
    skillCategories: {
      lang: string;
      devops: string;
      scada: string;
    };
  };
  content: {
    header: {
      title: string;
    };
    summary: string;
    personalCharacteristics: string;
    hobbies: string[];
    technicalSkills: {
      lang: TechnicalSkill[];
      devops: TechnicalSkill[];
      scada: TechnicalSkill[];
    };
    userLanguages: LanguageSkill[];
    competencies: { title: string; desc: string }[];
    workItems: ExperienceItem[];
    eduItems: EducationItem[];
  };
}

// --- Components ---

/**
 * Renders a visual "dot level" indicator for skills.
 * Active dots are colored orange, inactive dots are hollow boxes.
 */
const DotLevel = ({ level, total = 6 }: { level: number; total?: number }) => (
  <div className="flex gap-1">
    {[...Array(total)].map((_, i) => (
      <div key={i} className={`w-2.5 h-2.5 rounded-full ${i < level ? 'bg-[#ff8c00]' : 'bg-transparent border border-white/30'}`} />
    ))}
  </div>
);

/**
 * Accordion component for collapsible content sections.
 * Uses framer-motion for smooth height and opacity transitions.
 */
const Accordion = ({
  title,
  icon: Icon,
  children,
  isOpen,
  onClick,
}: {
  title: string;
  icon?: React.ElementType;
  children?: React.ReactNode;
  isOpen: boolean;
  onClick: () => void;
}) => (
  <div className="border-b border-gray-200">
    <button onClick={onClick} className="w-full flex justify-between items-center py-5 text-left transition-colors">
      <div className="flex items-center gap-4">
        {Icon && <Icon size={22} className="text-[#ff8c00] shrink-0" />}
        <h2 className="text-2xl font-semibold text-gray-800 tracking-tight">{title}</h2>
      </div>
      {/* Toggle chevron icon based on open state */}
      {isOpen ? <ChevronUp size={24} className="text-gray-400" /> : <ChevronDown size={24} className="text-gray-400" />}
    </button>
    <AnimatePresence initial={false}>
      {isOpen && (
        <motion.div
          key="content"
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className="overflow-hidden">
          <div className="pb-8 text-gray-600 text-lg leading-relaxed">{children}</div>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);

// Simple aesthetic divider line
const SectionDivider = () => <div className="w-full h-px bg-gray-100" />;

/**
 * Floating Language Selection Menu.
 * Expands on hover to show available languages parsed from the manifest.
 */
const LanguageMenu = ({ current, languages, onSelect }: { current: Language; languages: Language[]; onSelect: (l: Language) => void }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="fixed top-6 right-6 z-50 flex flex-col items-end"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}>
      <motion.div
        layout
        className="bg-white/95 backdrop-blur-md rounded-full shadow-xl border border-gray-100 overflow-hidden flex flex-col items-center"
        initial={false}
        animate={{
          height: isHovered ? 'auto' : '44px',
          width: '44px',
          borderRadius: isHovered ? '22px' : '22px',
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}>
        <div className="h-11 w-11 shrink-0 flex items-center justify-center cursor-pointer">
          <span className="text-[11px] font-black text-[#ff8c00]">{current.toUpperCase()}</span>
        </div>

        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="pb-2 w-full flex flex-col items-center gap-1">
              {languages.map(
                l =>
                  l !== current && (
                    <button
                      key={l}
                      onClick={() => {
                        onSelect(l);
                        setIsHovered(false);
                      }}
                      className="w-9 h-9 rounded-full text-[10px] font-bold text-gray-500 hover:text-[#ff8c00] hover:bg-gray-50 transition-colors flex items-center justify-center">
                      {l.toUpperCase()}
                    </button>
                  )
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

// --- Main Application Component ---
const App = () => {
  // State for the currently selected language ID
  const [lang, setLang] = useState<Language>('');

  // Maps language IDs (e.g., "en") to their respective JSON file paths
  const [translationsMap, setTranslationsMap] = useState<Record<string, string>>({});

  // The loaded translation object. If null, data is still loading.
  const [t, setT] = useState<Translation | null>(null);

  // Tracks which accordion section is currently open (only one open at a time)
  const [openSection, setOpenSection] = useState<string | null>(null);

  // Tracks whether the profile photo lightbox is open
  const [isPhotoOpen, setIsPhotoOpen] = useState(false);

  // Primary profile photo to attempt to load
  const profilePhoto = 'MainPhoto.jpg';

  // Load language manifest on component mount
  useEffect(() => {
    fetch('/localization.json')
      .then(r => r.json())
      .then((data: { id: string; file: string }[]) => {
        const map: Record<string, string> = {};
        data.forEach(item => (map[item.id] = item.file));
        setTranslationsMap(map);
        if (data.length > 0) {
          // Set the first available language as default
          setLang(data[0].id);
        }
      });
  }, []);

  // Fetch the actual translation file whenever the selected language changes
  useEffect(() => {
    if (lang && translationsMap[lang]) {
      fetch('/' + translationsMap[lang])
        .then(r => r.json())
        .then(data => setT(data));
    }
  }, [lang, translationsMap]);

  // Helper to toggle accordion sections
  const toggleSection = (id: string) => {
    setOpenSection(openSection === id ? null : id);
  };

  // Fallback handler if the main photo fails to load
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const target = e.target as HTMLImageElement;
    if (target.src.includes('MainPhoto.jpg')) {
      // Fallback to external imgur link if local MainPhoto.jpg does not exist
      target.src = 'https://i.imgur.com/iSSw2bc.jpeg';
    } else {
      // Stop infinite loop if fallback also fails
      target.onerror = null;
    }
  };

  // Prevent rendering until localization data is completely downloaded
  if (!t) return <div className="min-h-screen flex items-center justify-center text-gray-500">Loading...</div>;

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans">
      {/* --- Photo Lightbox Overlay --- */}
      <AnimatePresence>
        {isPhotoOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsPhotoOpen(false)}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md flex items-center justify-center p-4 md:p-10 cursor-zoom-out">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-full max-h-full overflow-hidden rounded-lg shadow-2xl"
              onClick={e => e.stopPropagation()}>
              <button
                onClick={() => setIsPhotoOpen(false)}
                className="absolute top-4 right-4 z-10 p-2 bg-black/50 hover:bg-black/80 text-white rounded-full transition-colors">
                <X size={24} />
              </button>
              <img
                src={profilePhoto}
                alt="Oleksandr Meleshko"
                className="max-h-[90vh] w-auto object-contain rounded-lg shadow-xl"
                onError={handleImageError}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- Language Switcher --- */}
      <LanguageMenu current={lang} languages={Object.keys(translationsMap)} onSelect={setLang} />

      <div className="flex flex-col md:flex-row">
        {/* --- Sidebar Configuration --- */}
        <aside className="w-full md:w-[360px] bg-[#333333] text-white p-8 md:p-10 md:min-h-screen flex flex-col gap-8">
          {/* Mobile Only: Name Header */}
          <div className="md:hidden mb-2">
            <h1 className="text-4xl font-light text-white tracking-tight leading-tight">Oleksandr Meleshko</h1>
          </div>

          {/* Avatar Area */}
          <div className="flex justify-center">
            <div
              className="group relative w-56 h-72 border-[8px] border-[#444444] overflow-hidden shadow-xl cursor-zoom-in transition-transform duration-500 hover:scale-[1.02]"
              onClick={() => setIsPhotoOpen(true)}>
              <img src={profilePhoto} alt="Oleksandr Meleshko" className="w-full h-full object-cover" onError={handleImageError} />
              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <Search className="text-white" size={24} />
              </div>
            </div>
          </div>

          {/* Sidebar Domain Skills Loop */}
          <section className="space-y-4">
            <h2 className="text-xl font-bold border-b border-white/10 pb-2 mb-4 tracking-wide">{t.ui.labels.skills}</h2>

            <div className="space-y-4">
              {/* Category: Languages */}
              <div className="space-y-1">
                <h3 className="text-[11px] font-black uppercase tracking-[0.1em] text-gray-400 mb-1.5">{t.ui.skillCategories.lang}</h3>
                {t.content.technicalSkills.lang.map(skill => (
                  <div key={skill.name} className="flex justify-between items-center text-sm font-medium leading-tight py-0.5">
                    <span>{skill.name}</span>
                    <DotLevel level={skill.level} />
                  </div>
                ))}
              </div>

              {/* Category: DevOps */}
              <div className="space-y-1">
                <h3 className="text-[11px] font-black uppercase tracking-[0.1em] text-gray-400 mb-1.5">{t.ui.skillCategories.devops}</h3>
                {t.content.technicalSkills.devops.map(skill => (
                  <div key={skill.name} className="flex justify-between items-center text-sm font-medium leading-tight py-0.5">
                    <span>{skill.name}</span>
                    <DotLevel level={skill.level} />
                  </div>
                ))}
              </div>

              {/* Category: SCADA */}
              <div className="space-y-1">
                <h3 className="text-[11px] font-black uppercase tracking-[0.1em] text-gray-400 mb-1.5 leading-tight">{t.ui.skillCategories.scada}</h3>
                {t.content.technicalSkills.scada.map(skill => (
                  <div key={skill.name} className="flex justify-between items-center text-sm font-medium leading-tight py-0.5">
                    <span>{skill.name}</span>
                    <DotLevel level={skill.level} />
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Sidebar Human Languages Loop */}
          <section className="space-y-4">
            <h2 className="text-xl font-bold border-b border-white/10 pb-2 mb-4 tracking-wide">{t.ui.labels.languages}</h2>
            <div className="space-y-2">
              {t.content.userLanguages.map(l => (
                <div key={l.name} className="flex justify-between items-center text-sm font-medium">
                  <span className="flex flex-col">
                    <span>{l.name}</span>
                    <span className="text-[10px] text-gray-400 font-normal leading-none mt-0.5">{l.level}</span>
                  </span>
                  <DotLevel level={l.dots} />
                </div>
              ))}
            </div>
          </section>
        </aside>

        {/* --- Main Reading Content Context --- */}
        <main className="flex-1 p-8 md:p-16 lg:p-20 max-w-6xl">
          {/* Header Block with Metadata Links */}
          <header className="mb-4">
            {/* Desktop Only: Name Header */}
            <h1 className="hidden md:block text-5xl md:text-6xl font-light text-gray-900 mb-12 tracking-tight">Oleksandr Meleshko</h1>

            {/* Contact Details Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-2 gap-x-12 border-t border-b border-gray-100 py-6">
              <div className="flex items-center gap-4 text-gray-700">
                <Mail size={18} className="text-[#ff8c00]" />
                <a href="mailto:meleshko.alex@gmail.com" className="hover:text-[#ff8c00] transition-colors font-medium text-sm">
                  meleshko.alex@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-4 text-gray-700">
                <Phone size={18} className="text-[#ff8c00]" />
                <a href="tel:+41764934033" className="hover:text-[#ff8c00] transition-colors font-medium text-sm">
                  +41 76 493 40 33
                </a>
              </div>
              <div className="flex items-center gap-4 text-gray-700">
                <Github size={18} className="text-[#ff8c00]" />
                <a
                  href="https://github.com/MeleshkoOleksandr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#ff8c00] transition-colors font-medium text-sm">
                  GitHub
                </a>
              </div>
              <div className="flex items-center gap-4 text-gray-700">
                <Flag size={18} className="text-gray-400" />
                <span className="font-medium text-sm">
                  {t.ui.labels.nationality} {t.ui.labels.nationalityVal}
                </span>
              </div>
              <div className="flex items-center gap-4 text-gray-700">
                <Calendar size={18} className="text-gray-400" />
                <span className="font-medium text-sm">13/09/1986</span>
              </div>
              <div className="flex items-center gap-4 text-gray-700">
                <FileCheck size={18} className="text-gray-400" />
                <span className="font-medium text-sm">{t.ui.labels.permit} S</span>
              </div>
              <div className="flex items-center gap-4 text-gray-700">
                <MapPin size={18} className="text-gray-400" />
                <div className="flex flex-col">
                  <span className="font-medium text-sm leading-tight">Via Maestri Comacini 19</span>
                  <span className="text-xs text-gray-400 leading-tight">6500 Bellinzona Switzerland</span>
                </div>
              </div>
            </div>
          </header>

          {/* Personal Summary Area */}
          <section className="mb-6">
            <div className="mt-4">
              <h2 className="text-3xl font-extrabold text-gray-900 mb-4 tracking-tight">{t.ui.sections.summary}</h2>
              <p className="text-gray-600 text-xl leading-relaxed max-w-4xl font-light">{t.content.summary}</p>
            </div>
            <div className="mt-6">
              <SectionDivider />
            </div>
          </section>

          {/* Renderable List of Content Sections */}
          <div className="space-y-0.5">
            {/* Competencies Section */}
            <Accordion title={t.ui.sections.comp} icon={Cpu} isOpen={openSection === 'comp'} onClick={() => toggleSection('comp')}>
              <ul className="list-disc pl-6 space-y-2 mt-4 marker:text-[#ff8c00]">
                {t.content.competencies.map((comp, idx) => (
                  <li key={idx}>
                    <span className="font-bold text-gray-800">{comp.title}:</span> {comp.desc}
                  </li>
                ))}
              </ul>
            </Accordion>

            {/* Work Experience Section */}
            <Accordion title={t.ui.sections.work} icon={Briefcase} isOpen={openSection === 'work'} onClick={() => toggleSection('work')}>
              <div className="space-y-10 mt-6">
                {t.content.workItems.map((item, idx) => (
                  <div key={idx} className="relative pl-6 border-l-2 border-gray-100">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline mb-2">
                      <h4 className="text-xl font-bold text-gray-800">{item.role}</h4>
                      <span className="text-[10px] font-black bg-gray-100 text-gray-500 px-3 py-1 tracking-tighter rounded-full uppercase">
                        {item.period}
                      </span>
                    </div>
                    <p className="text-[#ff8c00] font-semibold text-sm mb-3">{item.company}</p>
                    {item.sector && <p className="text-gray-500 text-xs italic mb-3">{item.sector}</p>}
                    <ul className="list-disc pl-5 space-y-1.5 text-base text-gray-600">
                      {item.details.map((detail, dIdx) => (
                        <li key={dIdx}>{detail}</li>
                      ))}
                    </ul>
                    {/* Render specific tech stacks used during experience item */}
                    {item.tech && (
                      <div className="mt-4 flex flex-wrap gap-2">
                        {item.tech.map((tItem, tIdx) => (
                          <span key={tIdx} className="text-[10px] bg-gray-50 text-gray-400 border border-gray-100 px-2 py-0.5 rounded">
                            {tItem}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </Accordion>

            {/* Education History Section */}
            <Accordion title={t.ui.sections.edu} icon={Award} isOpen={openSection === 'edu'} onClick={() => toggleSection('edu')}>
              <div className="space-y-8 mt-6">
                {t.content.eduItems.map((item, idx) => (
                  <div key={idx} className="relative pl-6 border-l-2 border-gray-100">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline mb-2">
                      <h4 className="text-xl font-bold text-gray-800">{item.degree}</h4>
                      <span className="text-[10px] font-black bg-gray-100 text-gray-500 px-3 py-1 tracking-tighter rounded-full uppercase">
                        {item.period}
                      </span>
                    </div>
                    <p className="text-[#ff8c00] font-semibold text-sm">{item.school}</p>
                    {item.specialization && <p className="text-gray-600 text-base mt-1 italic">{item.specialization}</p>}
                  </div>
                ))}
              </div>
            </Accordion>

            {/* Personal Statement Section */}
            <Accordion title={t.ui.sections.personal} icon={User} isOpen={openSection === 'personal'} onClick={() => toggleSection('personal')}>
              <p className="text-gray-600 text-lg leading-relaxed bg-gray-50 p-6 rounded-2xl border border-gray-100 mt-4">
                {t.content.personalCharacteristics}
              </p>
            </Accordion>

            {/* Hobbies Listing Area */}
            <Accordion title={t.ui.sections.hobbies} icon={Heart} isOpen={openSection === 'hobbies'} onClick={() => toggleSection('hobbies')}>
              <div className="flex flex-wrap gap-2 mt-4">
                {t.content.hobbies.map(hobby => (
                  <span
                    key={hobby}
                    className="px-4 py-2 bg-white border border-gray-100 shadow-sm rounded-full text-sm font-medium text-gray-600 hover:border-[#ff8c00] hover:text-[#ff8c00] transition-colors cursor-default">
                    {hobby}
                  </span>
                ))}
              </div>
            </Accordion>
          </div>
        </main>
      </div>
    </div>
  );
};

// --- Initialization ---
const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(<App />);
}
