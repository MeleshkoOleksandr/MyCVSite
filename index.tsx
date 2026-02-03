import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
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
  Languages,
  Github
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// --- Types & Data ---
type Language = 'en' | 'it' | 'de' | 'uk';

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

interface Translation {
  title: string;
  summaryTitle: string;
  summary: string;
  personalCharacteristicsTitle: string;
  personalCharacteristics: string;
  hobbiesTitle: string;
  hobbies: string[];
  sections: {
    comp: string;
    work: string;
    edu: string;
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
  competencies: { title: string; desc: string }[];
  workItems: ExperienceItem[];
  eduItems: EducationItem[];
}

const translations: Record<Language, Translation> = {
  en: {
    title: 'Software Engineer',
    summaryTitle: 'Software Engineer',
    summary: 'Senior Software Engineer with over 12 years’ experience in the development and design of complex software systems. Specialized in high-load, distributed, real-time, embedded solutions with a strong focus on large-scale data processing, algorithms, and visualization. Solid expertise in software architecture, OOP, SOLID principles, and design patterns, with hands-on experience in database design and in delivering reliable and scalable end-to-end solutions, from requirements analysis to production.',
    personalCharacteristicsTitle: 'Personal Characteristics',
    personalCharacteristics: 'I am an analytical and problem-solving oriented person, quick learner, and responsible professional. I work effectively in team environments, maintaining discipline, attention to detail, and excellent organizational skills. I remain reliable and stress-resistant in complex environments, always focusing on results and quality.',
    hobbiesTitle: 'Hobbies & Interests',
    hobbies: ['Hiking', 'Mountain Biking', 'Snowboarding', 'Skiing', 'Photography', 'Music', 'Reading', 'Traveling'],
    sections: {
      comp: 'Professional competencies',
      work: 'Work experience',
      edu: 'Education'
    },
    labels: {
      skills: 'Technical Skills',
      languages: 'Languages',
      location: 'Location',
      email: 'Email',
      phone: 'Phone',
      nationality: 'Nationality',
      birth: 'Date of Birth',
      permit: 'Permit',
      nationalityVal: 'Ukrainian'
    },
    competencies: [
      { title: 'High-Load & Real-Time', desc: 'Management of large data volumes and real-time processing systems.' },
      { title: 'System Architecture', desc: 'Design of scalable, distributed architectures and multi-tier systems.' },
      { title: 'Software Design', desc: 'Advanced OOP, SOLID principles and Architectural Design Patterns.' },
      { title: 'Algorithmic Development', desc: 'Classification, tracking and object identification algorithms.' },
      { title: 'Data Fusion', desc: 'Integration of heterogeneous data sources.' },
      { title: 'Data Visualization', desc: 'Advanced analytics, interactive real-time maps and geospatial visualization.' },
      { title: 'Database Engineering', desc: 'Design, modeling and optimization of relational databases and complex SQL queries.' },
      { title: 'Multi-Platform Development', desc: 'Desktop (.NET/WPF), Embedded (C++) and multi-stack project experience.' },
      { title: 'UI Development', desc: 'Developed advanced desktop user interfaces for complex data presentation.' },
      { title: 'Quality & Reliability', desc: 'Code maintenance, refactoring and performance optimization.' },
      { title: 'Tools & Observability', desc: 'Proficient in Jira/Git; experienced in monitoring and rapid troubleshooting.' }
    ],
    workItems: [
      {
        role: 'Senior Software Engineer',
        company: 'Bit-Team LLC, Kyiv, Ukraine',
        period: '01.2012 – 09.2024',
        sector: 'Sectors: radar systems, navigation, and aerial/maritime object monitoring.',
        details: [
          'Development of real-time data processing systems for radar (1D/2D/3D), infrared sensors and satellite data.',
          'Implementation of object classification and identification algorithms based on dynamic and radar features.',
          'Design of unified radar situation awareness systems for civilian and defense applications.',
          'Development of GPS-independent navigation systems using inertial sensors and correction algorithms.',
          'Design of maritime navigation and vessel identification systems.',
          'Development of embedded software for military and industrial devices (C++).',
          'Implementation of high-performance solutions for real-time monitoring of air and maritime domains.',
          'Visualization of up to 100,000 tracked objects on interactive maps.',
          'Tools for data analysis and visualization (charts, reports, time series).',
          'Developing advanced UI using DevExpress libraries.'
        ],
        tech: ['.NET / C# (WPF, LINQ, EF)', 'Qt (C++ / Linux)', 'Python', 'SQL Server/PostgreSQL/Oracle']
      },
      {
        role: 'Automation Engineer',
        company: 'Scientific Production Corporation “Kiev Institute for Automated Systems”, Kyiv',
        period: '10.2010 – 12.2011',
        details: [
          'Design and implementation of SCADA systems (Citect) for industrial control.',
          'Data integration and development of industrial databases.',
          'Process automation and optimization.'
        ]
      },
      {
        role: 'System Administrator',
        company: 'LLC Chistyj-svet (KARCHER Ukraine), Kyiv, Ukraine',
        period: '07.2009 – 09.2010',
        details: [
          'Administration of corporate networks and IT infrastructure.',
          'Management of servers, databases, and mail systems.',
          'Configuration of Active Directory and network services.',
          'Development of internal support tools and utilities.'
        ]
      },
      {
        role: 'Software Developer (Part-time)',
        company: 'KSK-Atomization, Kyiv, Ukraine',
        period: '10.2007 – 03.2009',
        details: [
          'Development of industrial control applications using SCADA systems.'
        ]
      }
    ],
    eduItems: [
      {
        degree: 'Master’s Degree',
        school: 'National Technical University of Ukraine "KPI"',
        period: '09.2007 – 06.2009',
        specialization: 'Computer-Aided Monitoring and Systems'
      },
      {
        degree: 'Bachelor’s Degree',
        school: 'National Technical University of Ukraine "KPI"',
        period: '09.2003 – 06.2007',
        specialization: 'Computer Science'
      },
      {
        degree: 'Compulsory Education',
        school: 'Ivano-Frankivsk, Ukraine',
        period: '09.1993 – 06.2003'
      }
    ]
  },
  it: {
    title: 'Ingegnere del Software',
    summaryTitle: 'Ingegnere del Software',
    summary: 'Ingegnere del Software Senior con oltre 12 anni di esperienza nello sviluppo e nella progettazione di sistemi software complessi. Specializzato in soluzioni ad alto carico, distribuite, in tempo reale ed embedded con un forte focus sull\'elaborazione dati su larga scala, algoritmi e visualizzazione. Solida competenza nell\'architettura del software, OOP, principi SOLID e pattern di progettazione, con esperienza pratica nella progettazione di database e nella fornitura di soluzioni end-to-end affidabili e scalabili.',
    personalCharacteristicsTitle: 'Caratteristiche Personali',
    personalCharacteristics: 'Sono una persona analitica e orientata alla risoluzione dei problemi, apprendo velocemente e sono un professionista responsabile. Lavoro efficacemente in team, mantenendo disciplina, attenzione ai dettagli e ottime capacità organizzative. Rimango affidabile e resistente allo stress in ambienti complessi, concentrandomi sempre sui risultati e sulla qualità.',
    hobbiesTitle: 'Hobby e Interessi',
    hobbies: ['Escursionismo', 'Mountain Bike', 'Snowboard', 'Sci', 'Fotografia', 'Musica', 'Lettura', 'Viaggi'],
    sections: {
      comp: 'Competenze professionali',
      work: 'Esperienza lavorativa',
      edu: 'Istruzione'
    },
    labels: {
      skills: 'Competenze Tecniche',
      languages: 'Lingue',
      location: 'Località',
      email: 'Email',
      phone: 'Telefono',
      nationality: 'Nazionalità',
      birth: 'Data di nascita',
      permit: 'Permesso',
      nationalityVal: 'Ucraina'
    },
    competencies: [
      { title: 'High-Load & Real-Time', desc: 'Gestione di grandi volumi di dati e sistemi di elaborazione in tempo reale.' },
      { title: 'Architettura di Sistema', desc: 'Progettazione di architetture scalabili, distribuite e sistemi multi-livello.' },
      { title: 'Software Design', desc: 'OOP avanzato, principi SOLID e Design Patterns architettonici.' },
      { title: 'Sviluppo Algoritmico', desc: 'Algoritmi di classificazione, tracciamento e identificazione di oggetti.' },
      { title: 'Data Fusion', desc: 'Integrazione di fonti di dati eterogenee.' },
      { title: 'Data Visualization', desc: 'Analitica avanzata, mappe interattive in tempo reale e visualizzazione geospaziale.' },
      { title: 'Ingegneria dei Database', desc: 'Progettazione, modellazione e ottimizzazione di database relazionali e query SQL complesse.' },
      { title: 'Sviluppo Multi-Piattaforma', desc: 'Desktop (.NET/WPF), Embedded (C++) ed esperienza in progetti multi-stack.' },
      { title: 'Sviluppo UI', desc: 'Sviluppo di interfacce utente desktop avanzate per la presentazione di dati complessi.' },
      { title: 'Qualità e Affidabilità', desc: 'Manutenzione del codice, refactoring e ottimizzazione delle prestazioni.' },
      { title: 'Strumenti e Osservabilità', desc: 'Esperto in Jira/Git; esperienza nel monitoraggio e nella risoluzione rapida dei problemi.' }
    ],
    workItems: [
      {
        role: 'Ingegnere del Software Senior',
        company: 'Bit-Team LLC, Kiev, Ucraina',
        period: '01.2012 – 09.2024',
        sector: 'Settori: sistemi radar, navigazione e monitoraggio di oggetti aerei/marittimi.',
        details: [
          'Sviluppo di sistemi di elaborazione dati in tempo reale per radar (1D/2D/3D), sensori infrarossi e dati satellitari.',
          'Implementazione di algoritmi di classificazione e identificazione di oggetti basati su caratteristiche dinamiche e radar.',
          'Progettazione di sistemi unificati di situational awareness radar per applicazioni civili e di difesa.',
          'Sviluppo di sistemi di navigazione indipendenti dal GPS utilizzando sensori inerziali e algoritmi di correzione.',
          'Progettazione di sistemi di navigazione marittima e identificazione di navi.',
          'Sviluppo di software embedded per dispositivi militari e industriali (C++).',
          'Implementazione di soluzioni ad alte prestazioni per il monitoraggio in tempo reale dei domini aerei e marittimi.',
          'Visualizzazione di oltre 100.000 oggetti tracciati su mappe interattive.',
          'Strumenti per l\'analisi e la visualizzazione dei dati (grafici, report, serie temporali).',
          'Sviluppo di UI avanzate utilizzando le librerie DevExpress.'
        ],
        tech: ['.NET / C# (WPF, LINQ, EF)', 'Qt (C++ / Linux)', 'Python', 'SQL Server/PostgreSQL/Oracle']
      },
      {
        role: 'Ingegnere dell\'Automazione',
        company: 'SPC “Istituto di Kiev per i Sistemi Automatizzati”, Kiev',
        period: '10.2010 – 12.2011',
        details: [
          'Progettazione e implementazione di sistemi SCADA (Citect) per il controllo industriale.',
          'Integrazione dei dati e sviluppo di database industriali.',
          'Automazione e ottimizzazione dei processi.'
        ]
      },
      {
        role: 'Amministratore di Sistema',
        company: 'LLC Chistyj-svet (KARCHER Ucraina), Kiev, Ucraina',
        period: '07.2009 – 09.2010',
        details: [
          'Amministrazione di reti aziendali e infrastruttura IT.',
          'Gestione di server, database e sistemi di posta.',
          'Configurazione di Active Directory e servizi di rete.',
          'Sviluppo di strumenti di supporto interno e utility.'
        ]
      },
      {
        role: 'Sviluppatore Software (Part-time)',
        company: 'KSK-Atomization, Kiev, Ucraina',
        period: '10.2007 – 03.2009',
        details: [
          'Sviluppo di applicazioni di controllo industriale utilizzando sistemi SCADA.'
        ]
      }
    ],
    eduItems: [
      {
        degree: 'Laurea Magistrale',
        school: 'Università Tecnica Nazionale dell\'Ucraina "KPI"',
        period: '09.2007 – 06.2009',
        specialization: 'Sistemi e Monitoraggio Computerizzato'
      },
      {
        degree: 'Laurea Triennale',
        school: 'Università Tecnica Nazionale dell\'Ucraina "KPI"',
        period: '09.2003 – 06.2007',
        specialization: 'Informatica'
      },
      {
        degree: 'Istruzione Obbligatoria',
        school: 'Ivano-Frankivsk, Ucraina',
        period: '09.1993 – 06.2003'
      }
    ]
  },
  de: {
    title: 'Software-Entwickler',
    summaryTitle: 'Software-Entwickler',
    summary: 'Senior Software-Entwickler mit über 12 Jahren Erfahrung in der Entwicklung und dem Design komplexer Softwaresysteme. Spezialisiert auf Hochlast-, verteilte, Echtzeit- und eingebettete Lösungen mit Schwerpunkt auf Datenverarbeitung, Algorithmen und Visualisierung. Fundierte Expertise in Softwarearchitektur, OOP, SOLID-Prinzipien und Design-Patterns, mit praktischer Erfahrung im Datenbankdesign und in der Bereitstellung zuverlässiger und skalierbarer End-to-End-Lösungen.',
    personalCharacteristicsTitle: 'Persönliche Eigenschaften',
    personalCharacteristics: 'Ich bin eine analytische und lösungsorientierte Person, lerne schnell und bin ein verantwortungsbewusster Profi. Ich arbeite effektiv in Teams, bewahre Disziplin, Detailgenauigkeit und verfüge über exzellente organisatorische Fähigkeiten. Ich bleibe in komplexen Umgebungen zuverlässig und stressresistent, wobei ich mich stets auf Ergebnisse und Qualität konzentriere.',
    hobbiesTitle: 'Hobbys & Interessen',
    hobbies: ['Wandern', 'Mountainbiken', 'Snowboarden', 'Skifahren', 'Fotografie', 'Musik', 'Lesen', 'Reisen'],
    sections: {
      comp: 'Fachkompetenzen',
      work: 'Berufserfahrung',
      edu: 'Ausbildung'
    },
    labels: {
      skills: 'Technische Fähigkeiten',
      languages: 'Sprachen',
      location: 'Standort',
      email: 'E-Mail',
      phone: 'Telefon',
      nationality: 'Nationalität',
      birth: 'Geburtsdatum',
      permit: 'Bewilligung',
      nationalityVal: 'Ukrainisch'
    },
    competencies: [
      { title: 'Hochlast & Echtzeit', desc: 'Verwaltung großer Datenmengen und Echtzeit-Verarbeitungssysteme.' },
      { title: 'Systemarchitektur', desc: 'Design skalierbarer, verteilter Architekturen und mehrschichtiger Systeme.' },
      { title: 'Software-Design', desc: 'Fortgeschrittenes OOP, SOLID-Prinzipien und Architektur-Design-Patterns.' },
      { title: 'Algorithmen-Entwicklung', desc: 'Klassifizierungs-, Tracking- und Objektidentifikationsalgorithmen.' },
      { title: 'Data Fusion', desc: 'Integration heterogener Datenquellen.' },
      { title: 'Datenvisualisierung', desc: 'Fortgeschrittene Analytik, interaktive Echtzeitkarten und geospatiale Visualisierung.' },
      { title: 'Datenbank-Engineering', desc: 'Design, Modellierung und Spezialisierung relationaler Datenbanken und komplexer SQL-Abfragen.' },
      { title: 'Multi-Plattform-Entwicklung', desc: 'Desktop (.NET/WPF), Embedded (C++) und Multi-Stack-Projekterfahrung.' },
      { title: 'UI-Entwicklung', desc: 'Entwicklung fortgeschrittener Desktop-Benutzeroberflächen für komplexe Datendarstellung.' },
      { title: 'Qualität & Zuverlässigkeit', desc: 'Code-Wartung, Refactoring und Performance-Optimierung.' },
      { title: 'Tools & Observability', desc: 'Versiert in Jira/Git; erfahren in Monitoring und schneller Fehlerbehebung.' }
    ],
    workItems: [
      {
        role: 'Senior Software-Entwickler',
        company: 'Bit-Team LLC, Kiew, Ukraine',
        period: '01.2012 – 09.2024',
        sector: 'Bereiche: Radarsysteme, Navigation und Überwachung von Luft-/Seeobjekten.',
        details: [
          'Entwicklung von Echtzeit-Datenverarbeitungssystemen für Radar (1D/2D/3D), Infrarotsensoren und Satellitendaten.',
          'Implementierung von Algorithmen zur Objektklassifizierung und -identifizierung basierend auf dynamischen und Radarmerkmalen.',
          'Design einheitlicher Radar-Lagebildsysteme für zivile und militärische Anwendungen.',
          'Entwicklung von GPS-unabhängigen Navigationssystemen mit Inertialsensoren und Korrekturalгоrithmen.',
          'Design maritimer Navigations- und Schiffidentifikationssysteme.',
          'Entwicklung von Embedded-Software für militärische und industrielle Geräte (C++).',
          'Implementierung von Hochleistungslösungen zur Echtzeitüberwachung von Luft- und Seeräumen.',
          'Visualisierung von bis zu 100.000 verfolgten Objekten auf interaktiven Karten.',
          'Tools zur Datenanalyse und -visualisierung (Diagramme, Berichte, Zeitreihen).',
          'Entwicklung fortgeschrittener UIs mit DevExpress-Bibliotheken.'
        ],
        tech: ['.NET / C# (WPF, LINQ, EF)', 'Qt (C++ / Linux)', 'Python', 'SQL Server/PostgreSQL/Oracle']
      },
      {
        role: 'Automatisierungstechniker',
        company: 'SPC “Kiewer Institut für automatisierte Systeme”, Kiew',
        period: '10.2010 – 12.2011',
        details: [
          'Design und Implementierung von SCADA-Systemen (Citect) für die industrielle Steuerung.',
          'Datenintegration und Entwicklung industrieller Datenbanken.',
          'Prozessautomatisierung und -optimierung.'
        ]
      },
      {
        role: 'Systemadministrator',
        company: 'LLC Chistyj-svet (KARCHER Ukraine), Kiew, Ukraine',
        period: '07.2009 – 09.2010',
        details: [
          'Administration von Unternehmensnetzwerken und IT-Inфраструктур.',
          'Verwaltung von Servern, Datenbanken und E-Mail-Systemen.',
          'Konfiguration von Active Directory und Netzwerkdiensten.',
          'Entwicklung interner Support-Tools und Dienstprogramme.'
        ]
      },
      {
        role: 'Software-Entwickler (Teilzeit)',
        company: 'KSK-Atomization, Kiew, Ukraine',
        period: '10.2007 – 03.2009',
        details: [
          'Entwicklung industrieller Steuerungsanwendungen mit SCADA-Systemen.'
        ]
      }
    ],
    eduItems: [
      {
        degree: 'Master-Abschluss',
        school: 'Nationale Technische Universität der Ukraine "KPI"',
        period: '09.2007 – 06.2009',
        specialization: 'Computergestützte Überwachung und Systeme'
      },
      {
        degree: 'Bachelor-Abschluss',
        school: 'Nationale Technische Universität der Ukraine "KPI"',
        period: '09.2003 – 06.2007',
        specialization: 'Informatik'
      },
      {
        degree: 'Schulpflicht',
        school: 'Iwano-Frankiwsk, Ukraine',
        period: '09.1993 – 06.2003'
      }
    ]
  },
  uk: {
    title: 'Інженер-програміст',
    summaryTitle: 'Інженер-програміст',
    summary: 'Старший інженер-програміст із понад 12-річним досвідом розробки та проектування складних програмних систем. Спеціалізується на високонавантажених, розподілених рішеннях реального часу з акцентом на обробку великих обсягів даних, алгоритми та візуалізацію. Глибока експертиза в архітектурі програмного забезпечення, ООП, принципах SOLID та шаблонах проектування, практичний досвід проектування баз даних та впровадження надійних і масштабованих комплексних рішень.',
    personalCharacteristicsTitle: 'Особисті характеристики',
    personalCharacteristics: 'Я аналітична та орієнтована на вирішення проблем людина, швидко вчуся та є відповідальним професіоналом. Ефективно працюю в команді, зберігаючи дисципліну, увагу до деталей та відмінні організаційні навички. Залишаюся надійним і стресостійким у складних умовах, завжди зосереджуючись на результаті та якості.',
    hobbiesTitle: 'Хобі та інтереси',
    hobbies: ['Піші прогулянки', 'Гірський велосипед', 'Сноубординг', 'Лижі', 'Фотографія', 'Музика', 'Читання', 'Подорожі'],
    sections: {
      comp: 'Професійні компетенції',
      work: 'Досвід роботи',
      edu: 'Освіта'
    },
    labels: {
      skills: 'Технічні навички',
      languages: 'Мови',
      location: 'Локація',
      email: 'Ел. пошта',
      phone: 'Телефон',
      nationality: 'Громадянство',
      birth: 'Дата народження',
      permit: 'Дозвіл',
      nationalityVal: 'Українець'
    },
    competencies: [
      { title: 'High-Load & Real-Time', desc: 'Управління великими обсягами даних та системами обробки в реальному часі.' },
      { title: 'Архітектура систем', desc: 'Проектування масштабованих, розподілених архітектур та багаторівневих систем.' },
      { title: 'Software Design', desc: 'Поглиблене ООП, принципи SOLID та архітектурні шаблони проектування.' },
      { title: 'Розробка алгоритмів', desc: 'Алгоритми класифікації, трекінгу та ідентифікації об\'єктів.' },
      { title: 'Data Fusion', desc: 'Інтеграція гетерогенних джерел даних.' },
      { title: 'Візуалізація даних', desc: 'Розширена аналітика, інтерактивні карти реального часу та геопросторова візуалізація.' },
      { title: 'Проектування баз даних', desc: 'Проектування, моделювання та оптимізація реляційних баз даних та складних SQL-запитів.' },
      { title: 'Кросплатформна розробка', desc: 'Desktop (.NET/WPF), Embedded (C++) та досвід у мультистекових проектах.' },
      { title: 'Розробка UI', desc: 'Створення складних інтерфейсів користувача для візуалізації даних.' },
      { title: 'Якість та надійність', desc: 'Супровід коду, рефакторинг та оптимізація продуктивності.' },
      { title: 'Інструменти та моніторинг', desc: 'Досвід роботи з Jira/Git; моніторинг та швидке усунення несправностей.' }
    ],
    workItems: [
      {
        role: 'Старший інженер-програміст',
        company: 'Bit-Team LLC, Київ, Україна',
        period: '01.2012 – 09.2024',
        sector: 'Сектори: радарні системи, навігація та моніторинг повітряних/морських об\'єктів.',
        details: [
          'Розробка систем обробки даних реального часу для радарів (1D/2D/3D), ІЧ-сенсорів та супутникових даних.',
          'Впровадження алгоритмів класифікації та ідентифікації об\'єктів на основі динамічних та радарних характеристик.',
          'Проектування уніфікованих систем ситуаційної обізнаності для цивільних та оборонних застосувань.',
          'Розробка GPS-незалежних навігаційних систем з використанням інерціальних датчиків та алгоритмів корекції.',
          'Проектування систем морської навігації та ідентифікації суден.',
          'Розробка вбудованого ПЗ для військових та промислових пристроїв (C++).',
          'Впровадження високоефективних рішень для моніторингу повітряного та морського простору.',
          'Візуалізація до 100 000 об\'єктів трекінгу на інтерактивних картах.',
          'Інструменти аналізу та візуалізації даних (графіки, звіти, часові ряди).',
          'Розробка розширеного UI з використанням бібліотек DevExpress.'
        ],
        tech: ['.NET / C# (WPF, LINQ, EF)', 'Qt (C++ / Linux)', 'Python', 'SQL Server/PostgreSQL/Oracle']
      },
      {
        role: 'Інженер з автоматизації',
        company: 'НВО «Київський інститут автоматизованих систем», Київ',
        period: '10.2010 – 12.2011',
        details: [
          'Проектування та впровадження систем SCADA (Citect) для промислового управління.',
          'Інтеграція даних та розробка промислових баз даних.',
          'Автоматизація та оптимізація процесів.'
        ]
      },
      {
        role: 'Системний адміністратор',
        company: 'ТОВ «Чистий світ» (KARCHER Ukraine), Київ, Україна',
        period: '07.2009 – 09.2010',
        details: [
          'Адміністрування корпоративних мереж та ІТ-інфраструктури.',
          'Управління серверами, базами даних та поштовими системами.',
          'Налаштування Active Directory та мережевих сервісів.',
          'Розробка внутрішніх інструментів підтримки та утиліт.'
        ]
      },
      {
        role: 'Розробник ПЗ (за сумісництвом)',
        company: 'КСК-Автоматизація, Київ, Україна',
        period: '10.2007 – 03.2009',
        details: [
          'Розробка промислових додатків управління з використанням систем SCADA.'
        ]
      }
    ],
    eduItems: [
      {
        degree: 'Магістр',
        school: 'Національний технічний університет України "КПІ"',
        period: '09.2007 – 06.2009',
        specialization: 'Комп\'ютерний моніторинг та системи'
      },
      {
        degree: 'Бакалавр',
        school: 'Національний технічний університет України "КПІ"',
        period: '09.2003 – 06.2007',
        specialization: 'Комп\'ютерні науки'
      },
      {
        degree: 'Обов\'язкова освіта',
        school: 'Івано-Франківськ, Україна',
        period: '09.1993 – 06.2003'
      }
    ]
  }
};

const technicalSkills = {
  lang: [
    { name: 'C#', level: 6 },
    { name: '.NET Framework', level: 6 },
    { name: 'WPF', level: 6 },
    { name: 'LINQ', level: 6 },
    { name: 'ADO.NET', level: 5 },
    { name: 'Entity Framework', level: 5 },
    { name: 'SQL', level: 5 },
    { name: 'XML', level: 5 },
    { name: 'Qt', level: 4 },
    { name: 'C/C++', level: 3 },
    { name: 'Python', level: 3 },
  ],
  devops: [
    { name: 'MS SQL Server', level: 4 },
    { name: 'PostgreSQL', level: 4 },
    { name: 'Oracle DB', level: 4 },
    { name: 'Git', level: 5 },
    { name: 'Docker', level: 2 },
  ],
  scada: [
    { name: 'SCADA (Citect)', level: 4 },
  ]
};

const userLanguages: LanguageSkill[] = [
  { name: 'Ukrainian', level: 'Native', dots: 6 },
  { name: 'Russian', level: 'Native', dots: 6 },
  { name: 'English', level: 'Advanced (C1)', dots: 5 },
  { name: 'Italian', level: 'Basic (A2)', dots: 2 },
];

// --- Components ---

const DotLevel = ({ level, total = 6 }: { level: number, total?: number }) => (
  <div className="flex gap-1">
    {[...Array(total)].map((_, i) => (
      <div 
        key={i} 
        className={`w-2.5 h-2.5 rounded-full ${i < level ? 'bg-[#ff8c00]' : 'bg-transparent border border-white/30'}`} 
      />
    ))}
  </div>
);

const Accordion = ({ 
  title, 
  icon: Icon, 
  children, 
  isOpen, 
  onClick 
}: { 
  title: string, 
  icon?: React.ElementType, 
  children?: React.ReactNode, 
  isOpen: boolean, 
  onClick: () => void 
}) => (
  <div className="border-b border-gray-200">
    <button 
      onClick={onClick}
      className="w-full flex justify-between items-center py-5 text-left transition-colors"
    >
      <div className="flex items-center gap-4">
        {Icon && <Icon size={22} className="text-[#ff8c00] shrink-0" />}
        <h2 className="text-2xl font-semibold text-gray-800 tracking-tight">{title}</h2>
      </div>
      {isOpen ? <ChevronUp size={24} className="text-gray-400" /> : <ChevronDown size={24} className="text-gray-400" />}
    </button>
    <AnimatePresence initial={false}>
      {isOpen && (
        <motion.div
          key="content"
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="overflow-hidden"
        >
          <div className="pb-8 text-gray-600 text-lg leading-relaxed">
            {children}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);

const SectionDivider = () => <div className="w-full h-px bg-gray-100" />;

const PLACEHOLDER_AVATAR = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop';

const LanguageMenu = ({ current, onSelect }: { current: Language, onSelect: (l: Language) => void }) => {
  const languages: Language[] = ['en', 'it', 'de', 'uk'];
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="fixed top-6 right-6 z-50 flex flex-col items-end"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div 
        layout
        className="bg-white/95 backdrop-blur-md rounded-full shadow-xl border border-gray-100 overflow-hidden flex flex-col items-center"
        initial={false}
        animate={{
          height: isHovered ? 'auto' : '44px',
          width: '44px',
          borderRadius: isHovered ? '22px' : '22px'
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      >
        <div className="h-11 w-11 shrink-0 flex items-center justify-center cursor-pointer">
          <span className="text-[11px] font-black text-[#ff8c00]">{current.toUpperCase()}</span>
        </div>
        
        <AnimatePresence>
          {isHovered && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="pb-2 w-full flex flex-col items-center gap-1"
            >
              {languages.map((l) => l !== current && (
                <button
                  key={l}
                  onClick={() => {
                    onSelect(l);
                    setIsHovered(false);
                  }}
                  className="w-9 h-9 rounded-full text-[10px] font-bold text-gray-500 hover:text-[#ff8c00] hover:bg-gray-50 transition-colors flex items-center justify-center"
                >
                  {l.toUpperCase()}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

const App = () => {
  const [lang, setLang] = useState<Language>('en');
  const [openSection, setOpenSection] = useState<string | null>(null);
  const [isPhotoOpen, setIsPhotoOpen] = useState(false);
  
  const profilePhoto = 'https://i.imgur.com/iSSw2bc.jpeg';
  const t = translations[lang];

  const toggleSection = (id: string) => {
    setOpenSection(openSection === id ? null : id);
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const target = e.target as HTMLImageElement;
    if (target.src.includes('imgur')) {
        target.src = 'MainPhoto.jpg';
    } else {
        target.src = PLACEHOLDER_AVATAR;
        target.onerror = null;
    }
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans">
      {/* Photo Lightbox */}
      <AnimatePresence>
        {isPhotoOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsPhotoOpen(false)}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md flex items-center justify-center p-4 md:p-10 cursor-zoom-out"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-full max-h-full overflow-hidden rounded-lg shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                onClick={() => setIsPhotoOpen(false)}
                className="absolute top-4 right-4 z-10 p-2 bg-black/50 hover:bg-black/80 text-white rounded-full transition-colors"
              >
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

      <LanguageMenu current={lang} onSelect={setLang} />

      <div className="flex flex-col md:flex-row">
        {/* Sidebar */}
        <aside className="w-full md:w-[360px] bg-[#333333] text-white p-8 md:p-10 md:min-h-screen flex flex-col gap-8">
          
          {/* Mobile Only: Name Header */}
          <div className="md:hidden mb-2">
            <h1 className="text-4xl font-light text-white tracking-tight leading-tight">Oleksandr Meleshko</h1>
          </div>

          {/* Avatar Area */}
          <div className="flex justify-center">
            <div 
              className="group relative w-56 h-72 border-[8px] border-[#444444] overflow-hidden shadow-xl cursor-zoom-in transition-transform duration-500 hover:scale-[1.02]"
              onClick={() => setIsPhotoOpen(true)}
            >
              <img 
                src={profilePhoto} 
                alt="Oleksandr Meleshko" 
                className="w-full h-full object-cover"
                onError={handleImageError}
              />
              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <Search className="text-white" size={24} />
              </div>
            </div>
          </div>

          {/* Sidebar Skills */}
          <section className="space-y-4">
            <h2 className="text-xl font-bold border-b border-white/10 pb-2 mb-4 tracking-wide">{t.labels.skills}</h2>
            
            <div className="space-y-4">
              <div className="space-y-1">
                <h3 className="text-[11px] font-black uppercase tracking-[0.1em] text-gray-400 mb-1.5">Languages & Frameworks</h3>
                {technicalSkills.lang.map(skill => (
                  <div key={skill.name} className="flex justify-between items-center text-sm font-medium leading-tight py-0.5">
                    <span>{skill.name}</span>
                    <DotLevel level={skill.level} />
                  </div>
                ))}
              </div>

              <div className="space-y-1">
                <h3 className="text-[11px] font-black uppercase tracking-[0.1em] text-gray-400 mb-1.5">DevOps & Databases</h3>
                {technicalSkills.devops.map(skill => (
                  <div key={skill.name} className="flex justify-between items-center text-sm font-medium leading-tight py-0.5">
                    <span>{skill.name}</span>
                    <DotLevel level={skill.level} />
                  </div>
                ))}
              </div>

              <div className="space-y-1">
                <h3 className="text-[11px] font-black uppercase tracking-[0.1em] text-gray-400 mb-1.5 leading-tight">SCADA Systems</h3>
                {technicalSkills.scada.map(skill => (
                  <div key={skill.name} className="flex justify-between items-center text-sm font-medium leading-tight py-0.5">
                    <span>{skill.name}</span>
                    <DotLevel level={skill.level} />
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Sidebar Languages */}
          <section className="space-y-4">
            <h2 className="text-xl font-bold border-b border-white/10 pb-2 mb-4 tracking-wide">{t.labels.languages}</h2>
            <div className="space-y-2">
              {userLanguages.map(l => (
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

        {/* Main Content */}
        <main className="flex-1 p-8 md:p-16 lg:p-20 max-w-6xl">
          {/* Header */}
          <header className="mb-4">
            {/* Desktop Only: Name Header */}
            <h1 className="hidden md:block text-5xl md:text-6xl font-light text-gray-900 mb-12 tracking-tight">Oleksandr Meleshko</h1>

            {/* Contact Details Grid - Smaller vertical gap and padding */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-2 gap-x-12 border-t border-b border-gray-100 py-6">
              <div className="flex items-center gap-4 text-gray-700">
                <Phone size={18} className="text-[#ff8c00]" />
                <a href="tel:+41764934033" className="hover:text-[#ff8c00] transition-colors font-medium">+41 76 493 40 33</a>
              </div>
              <div className="flex items-center gap-4 text-gray-700">
                <Mail size={18} className="text-[#ff8c00]" />
                <a href="mailto:meleshko.alex@gmail.com" className="hover:text-[#ff8c00] transition-colors font-medium">meleshko.alex@gmail.com</a>
              </div>
              <div className="flex items-center gap-4 text-gray-700">
                <Github size={18} className="text-[#ff8c00]" />
                <a href="https://github.com/MeleshkoOleksandr" target="_blank" rel="noopener noreferrer" className="hover:text-[#ff8c00] transition-colors font-medium">GitHub.com</a>
              </div>
              <div className="flex items-center gap-4 text-gray-700">
                <Calendar size={18} className="text-gray-400" />
                <span className="font-medium text-sm">13/09/1986</span>
              </div>
              <div className="flex items-center gap-4 text-gray-700">
                <Flag size={18} className="text-gray-400" />
                <span className="font-medium text-sm">{t.labels.nationality} {t.labels.nationalityVal}</span>
              </div>
              <div className="flex items-center gap-4 text-gray-700">
                <FileCheck size={18} className="text-gray-400" />
                <span className="font-medium text-sm">{t.labels.permit} S</span>
              </div>
              <div className="flex items-center gap-4 text-gray-700">
                <MapPin size={18} className="text-gray-400" />
                <div className="flex flex-col">
                  <span className="font-medium text-sm leading-tight">Via Maestri Comacini 19</span>
                  <span className="text-xs text-gray-400 leading-tight">6500 Bellinzona</span>
                </div>
              </div>
            </div>
          </header>

          {/* Summary Section */}
          <section className="mb-6">
            <div className="mt-4">
              <h2 className="text-3xl font-extrabold text-gray-900 mb-4 tracking-tight">{t.summaryTitle}</h2>
              <p className="text-gray-600 text-xl leading-relaxed max-w-4xl font-light">
                {t.summary}
              </p>
            </div>
            <div className="mt-6">
              <SectionDivider />
            </div>
          </section>

          {/* Accordion List */}
          <div className="space-y-0.5">
            <Accordion 
              title={t.sections.comp} 
              icon={Cpu}
              isOpen={openSection === 'comp'} 
              onClick={() => toggleSection('comp')}
            >
              <ul className="list-disc pl-6 space-y-2 mt-4 marker:text-[#ff8c00]">
                {t.competencies.map((comp, idx) => (
                  <li key={idx}>
                    <span className="font-bold text-gray-800">{comp.title}:</span> {comp.desc}
                  </li>
                ))}
              </ul>
            </Accordion>

            <Accordion 
              title={t.sections.work} 
              icon={Briefcase}
              isOpen={openSection === 'work'} 
              onClick={() => toggleSection('work')}
            >
              <div className="space-y-10 mt-6">
                {t.workItems.map((item, idx) => (
                  <div key={idx} className="relative pl-6 border-l-2 border-gray-100">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline mb-2">
                      <h4 className="text-xl font-bold text-gray-800">{item.role}</h4>
                      <span className="text-[10px] font-black bg-gray-100 text-gray-500 px-3 py-1 tracking-tighter rounded-full uppercase">{item.period}</span>
                    </div>
                    <p className="text-[#ff8c00] font-semibold text-sm mb-3">{item.company}</p>
                    {item.sector && <p className="text-gray-500 text-xs italic mb-3">{item.sector}</p>}
                    <ul className="list-disc pl-5 space-y-1.5 text-base text-gray-600">
                      {item.details.map((detail, dIdx) => (
                        <li key={dIdx}>{detail}</li>
                      ))}
                    </ul>
                    {item.tech && (
                      <div className="mt-4 flex flex-wrap gap-2">
                        {item.tech.map((tItem, tIdx) => (
                          <span key={tIdx} className="text-[10px] bg-gray-50 text-gray-400 border border-gray-100 px-2 py-0.5 rounded">{tItem}</span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </Accordion>

            <Accordion 
              title={t.sections.edu} 
              icon={Award}
              isOpen={openSection === 'edu'} 
              onClick={() => toggleSection('edu')}
            >
              <div className="space-y-8 mt-6">
                {t.eduItems.map((item, idx) => (
                  <div key={idx} className="relative pl-6 border-l-2 border-gray-100">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline mb-2">
                      <h4 className="text-xl font-bold text-gray-800">{item.degree}</h4>
                      <span className="text-[10px] font-black bg-gray-100 text-gray-500 px-3 py-1 tracking-tighter rounded-full uppercase">{item.period}</span>
                    </div>
                    <p className="text-[#ff8c00] font-semibold text-sm">{item.school}</p>
                    {item.specialization && <p className="text-gray-600 text-base mt-1 italic">{item.specialization}</p>}
                  </div>
                ))}
              </div>
            </Accordion>

            <Accordion 
              title={t.personalCharacteristicsTitle} 
              icon={User}
              isOpen={openSection === 'personal'} 
              onClick={() => toggleSection('personal')}
            >
              <p className="text-gray-600 text-lg leading-relaxed bg-gray-50 p-6 rounded-2xl border border-gray-100 mt-4">
                {t.personalCharacteristics}
              </p>
            </Accordion>

            <Accordion 
              title={t.hobbiesTitle} 
              icon={Heart}
              isOpen={openSection === 'hobbies'} 
              onClick={() => toggleSection('hobbies')}
            >
              <div className="flex flex-wrap gap-2 mt-4">
                {t.hobbies.map(hobby => (
                  <span key={hobby} className="px-4 py-2 bg-white border border-gray-100 shadow-sm rounded-full text-sm font-medium text-gray-600 hover:border-[#ff8c00] hover:text-[#ff8c00] transition-colors cursor-default">
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

const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(<App />);
}
