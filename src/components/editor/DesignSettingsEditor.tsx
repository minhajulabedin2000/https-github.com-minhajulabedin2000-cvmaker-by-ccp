import React from 'react';
import { ResumeData, TemplateId, CvMode, DocumentLanguage } from '../../types/resume';
import { translations, Language } from '../../data/translations';
import { Palette, Layout, Eye, Check, Globe, Briefcase, Heart, Sparkles } from 'lucide-react';

interface Props {
  data: ResumeData;
  onChange: (data: ResumeData) => void;
  lang: Language;
}

const templates: Array<{ id: TemplateId; name: string; desc: string; previewColor: string }> = [
  {
    id: 'royal-gold',
    name: 'রয়্যাল লাক্সারি গোল্ড',
    desc: 'অভিজাত ডিপ অবসিডিয়ান, উষ্ণ গোল্ডেন রিম ও ভারসাম্যপূর্ণ ২-কলাম এক্সিকিউটিভ ভিউ',
    previewColor: '#d97706',
  },
  {
    id: 'executive-burgundy',
    name: 'এক্সিকিউটিভ বার্গান্ডি',
    desc: 'ডিপ বার্গান্ডি ওয়াইন ও রোজ-গোল্ড ফ্রেমওয়ার্ক, অত্যন্ত স্মুথ ও প্রিমিয়াম স্টাইল',
    previewColor: '#701a75',
  },
  {
    id: 'elite-sapphire',
    name: 'এলিট স্যাফায়ার ব্লু',
    desc: 'আধুনিক রয়্যাল স্যাফায়ার ও স্কাই ব্লু কার্ড লেআউট, ক্রিস্প হাই-টেক লুক',
    previewColor: '#0284c7',
  },
  {
    id: 'minhaj-teal',
    name: 'মিনহাজ এক্সিকিউটিভ টিল',
    desc: 'ডিপ টিল ব্যাকগ্রাউন্ড, গোল্ড অ্যাকসেন্ট, সুবিন্যস্ত আর্চ ও নিখুঁত অ্যালাইনমেন্ট',
    previewColor: '#0b4f6c',
  },
  {
    id: 'corporate-navy',
    name: 'কর্পোরেট নেভি ব্লু',
    desc: 'আন্তর্জাতিক চাকরির জন্য ক্লাসিক দুই-কলাম কর্পোরেট ফরম্যাট',
    previewColor: '#1e3a8a',
  },
  {
    id: 'modern-slate',
    name: 'মডার্ন মিনিমাল স্লেট',
    desc: 'পরিচ্ছন্ন হাই-এন্ড এডিটোরিয়াল ও মিনিমালিস্ট ডিজাইন',
    previewColor: '#334155',
  },
  {
    id: 'creative-emerald',
    name: 'ক্রিয়েটিভ এমারেল্ড',
    desc: 'আধুনিক ডিজাইনার, উদ্যোক্তা ও ক্রিয়েটিভ প্রোফাইলের জন্য ফ্রেশ স্টাইল',
    previewColor: '#065f46',
  },
];

const colorPresets = [
  { name: 'ডিপ টিল (অরিজিনাল)', primary: '#0b4f6c', secondary: '#d97706', accent: '#063447' },
  { name: 'রয়্যাল নেভি', primary: '#1e3a8a', secondary: '#3b82f6', accent: '#0f172a' },
  { name: 'ক্লাসিক এমারেল্ড', primary: '#065f46', secondary: '#10b981', accent: '#022c22' },
  { name: 'চারকোল গ্রে', primary: '#1f2937', secondary: '#f59e0b', accent: '#111827' },
  { name: 'বার্গান্ডি ওয়াইন', primary: '#831843', secondary: '#fb7185', accent: '#500724' },
  { name: 'ডিপ পার্পল', primary: '#581c87', secondary: '#a855f7', accent: '#3b0764' },
];

export const DesignSettingsEditor: React.FC<Props> = ({ data, onChange, lang }) => {
  const t = translations[lang];

  const setCvMode = (mode: CvMode) => {
    let visibility = { ...data.visibility };
    if (mode === 'professional') {
      visibility.familyBackground = false;
      visibility.matrimonialDetails = false;
      visibility.professionalProfile = true;
      visibility.organizationalExperience = true;
    } else if (mode === 'matrimonial') {
      visibility.familyBackground = true;
      visibility.matrimonialDetails = true;
      visibility.personalInfo = true;
    } else {
      visibility.familyBackground = true;
      visibility.matrimonialDetails = true;
      visibility.professionalProfile = true;
      visibility.organizationalExperience = true;
    }

    onChange({
      ...data,
      cvMode: mode,
      visibility,
    });
  };

  const setDocumentLanguage = (docLang: DocumentLanguage) => {
    onChange({
      ...data,
      documentLanguage: docLang,
    });
  };

  const setTemplate = (template: TemplateId) => {
    let primary = data.theme.primaryColor;
    let secondary = data.theme.secondaryColor;

    if (template === 'royal-gold') {
      primary = '#0f172a';
      secondary = '#d97706';
    } else if (template === 'executive-burgundy') {
      primary = '#701a75';
      secondary = '#f43f5e';
    } else if (template === 'elite-sapphire') {
      primary = '#1e3a8a';
      secondary = '#0284c7';
    } else if (template === 'minhaj-teal') {
      primary = '#0b4f6c';
      secondary = '#d97706';
    } else if (template === 'corporate-navy') {
      primary = '#1e3a8a';
      secondary = '#2563eb';
    } else if (template === 'modern-slate') {
      primary = '#1e293b';
      secondary = '#64748b';
    } else if (template === 'creative-emerald') {
      primary = '#065f46';
      secondary = '#b45309';
    }

    onChange({
      ...data,
      theme: {
        ...data.theme,
        template,
        primaryColor: primary,
        secondaryColor: secondary,
      },
    });
  };

  const setColorPreset = (primary: string, secondary: string, accent: string) => {
    onChange({
      ...data,
      theme: {
        ...data.theme,
        primaryColor: primary,
        secondaryColor: secondary,
        accentColor: accent,
      },
    });
  };

  const toggleSection = (section: keyof typeof data.visibility) => {
    onChange({
      ...data,
      visibility: {
        ...data.visibility,
        [section]: !data.visibility[section],
      },
    });
  };

  return (
    <div className="space-y-6">
      {/* CV Mode & Purpose Switch */}
      <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
        <div className="flex items-center gap-2 pb-2 mb-3 border-b border-slate-200">
          <Sparkles className="w-4 h-4 text-teal-600" />
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">
            সিভি / বায়োডাটার ধরন (Purpose & Mode)
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          <button
            type="button"
            onClick={() => setCvMode('professional')}
            className={`p-3 rounded-xl border-2 text-left transition-all ${
              data.cvMode === 'professional'
                ? 'border-teal-600 bg-white shadow-xs ring-1 ring-teal-500/20'
                : 'border-slate-200 bg-white/70 hover:border-slate-300'
            }`}
          >
            <div className="flex items-center gap-1.5 font-bold text-xs text-slate-900 mb-1">
              <Briefcase className="w-3.5 h-3.5 text-teal-600" />
              <span>প্রফেশনাল জব সিভি</span>
            </div>
            <p className="text-[10.5px] text-slate-500 leading-snug">
              চাকরি ও ফ্রিল্যান্সিং এর জন্য উপযুক্ত, ব্যক্তিগত পরিবার বাদ রাখে।
            </p>
          </button>

          <button
            type="button"
            onClick={() => setCvMode('matrimonial')}
            className={`p-3 rounded-xl border-2 text-left transition-all ${
              data.cvMode === 'matrimonial'
                ? 'border-rose-600 bg-white shadow-xs ring-1 ring-rose-500/20'
                : 'border-slate-200 bg-white/70 hover:border-slate-300'
            }`}
          >
            <div className="flex items-center gap-1.5 font-bold text-xs text-slate-900 mb-1">
              <Heart className="w-3.5 h-3.5 text-rose-600" />
              <span>বৈবাহিক বায়োডাটা</span>
            </div>
            <p className="text-[10.5px] text-slate-500 leading-snug">
              পাত্র/পাত্রীর চাহিদা, দ্বীনি অভ্যাস ও পারিবারিক বিস্তারিত তথ্য প্রাধান্য পায়।
            </p>
          </button>

          <button
            type="button"
            onClick={() => setCvMode('comprehensive')}
            className={`p-3 rounded-xl border-2 text-left transition-all ${
              data.cvMode === 'comprehensive'
                ? 'border-teal-600 bg-white shadow-xs ring-1 ring-teal-500/20'
                : 'border-slate-200 bg-white/70 hover:border-slate-300'
            }`}
          >
            <div className="flex items-center gap-1.5 font-bold text-xs text-slate-900 mb-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>উভয় সমন্বিত (Full)</span>
            </div>
            <p className="text-[10.5px] text-slate-500 leading-snug">
              পেশাদার ক্যারিয়ার এবং পারিবারিক ও ব্যক্তিগত সব তথ্য একসাথে।
            </p>
          </button>
        </div>
      </div>

      {/* Document Output Print Language */}
      <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
        <div className="flex items-center gap-2 pb-2 mb-2 border-b border-slate-200">
          <Globe className="w-4 h-4 text-teal-600" />
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">
            ফাইনাল প্রিন্ট ও পিডিএফ এর ভাষা (Document Print Language)
          </h3>
        </div>

        <p className="text-[11px] text-slate-600 mb-3">
          সিভির মূল সেকশন ও শিরোনামগুলো বাংলায় প্রিন্ট করতে চান নাকি ইংরেজিতে?
        </p>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setDocumentLanguage('bn')}
            className={`flex-1 p-2.5 rounded-lg border text-center text-xs font-bold transition-all ${
              data.documentLanguage === 'bn'
                ? 'border-teal-600 bg-white text-teal-800 shadow-xs ring-1 ring-teal-500/20'
                : 'border-slate-200 bg-white/60 text-slate-600 hover:bg-slate-50'
            }`}
          >
            বাংলায় প্রিন্ট করুন (Bengali Output)
          </button>
          <button
            type="button"
            onClick={() => setDocumentLanguage('en')}
            className={`flex-1 p-2.5 rounded-lg border text-center text-xs font-bold transition-all ${
              data.documentLanguage === 'en'
                ? 'border-teal-600 bg-white text-teal-800 shadow-xs ring-1 ring-teal-500/20'
                : 'border-slate-200 bg-white/60 text-slate-600 hover:bg-slate-50'
            }`}
          >
            English Print (ইংরেজি আউটপুট)
          </button>
        </div>
      </div>

      {/* Template Chooser */}
      <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
        <div className="flex items-center gap-2 pb-2 mb-3 border-b border-slate-200">
          <Layout className="w-4 h-4 text-teal-600" />
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">
            {t.chooseTemplate}
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {templates.map((tmpl) => {
            const isSelected = data.theme.template === tmpl.id;
            return (
              <div
                key={tmpl.id}
                onClick={() => setTemplate(tmpl.id)}
                className={`p-3 rounded-xl border-2 cursor-pointer transition-all ${
                  isSelected
                    ? 'border-teal-600 bg-white shadow-xs ring-1 ring-teal-500/20'
                    : 'border-slate-200 bg-white/70 hover:border-slate-300'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <span
                      className="w-4 h-4 rounded-full shrink-0"
                      style={{ backgroundColor: tmpl.previewColor }}
                    />
                    <div className="font-bold text-xs text-slate-800">{tmpl.name}</div>
                  </div>
                  {isSelected && (
                    <span className="p-0.5 rounded-full bg-teal-600 text-white">
                      <Check className="w-3 h-3" />
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-slate-500 mt-1.5 leading-snug">
                  {tmpl.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Color Palette */}
      <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
        <div className="flex items-center gap-2 pb-2 mb-3 border-b border-slate-200">
          <Palette className="w-4 h-4 text-teal-600" />
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">
            {t.colorPalette}
          </h3>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-3">
          {colorPresets.map((preset) => {
            const isActive = data.theme.primaryColor === preset.primary;
            return (
              <button
                key={preset.primary}
                type="button"
                onClick={() => setColorPreset(preset.primary, preset.secondary, preset.accent)}
                className={`p-2 rounded-lg border text-left flex items-center gap-2 transition-all ${
                  isActive
                    ? 'border-teal-600 bg-teal-50/50 font-bold'
                    : 'border-slate-200 bg-white hover:bg-slate-50'
                }`}
              >
                <span
                  className="w-4 h-4 rounded-full shrink-0 shadow-2xs"
                  style={{ backgroundColor: preset.primary }}
                />
                <span className="text-[11px] text-slate-700 truncate">{preset.name}</span>
              </button>
            );
          })}
        </div>

        {/* Custom Hex Color Pickers */}
        <div className="flex items-center gap-4 pt-2 border-t border-slate-200 text-xs">
          <div className="flex items-center gap-2">
            <label className="text-[11px] text-slate-600">মূল রঙ:</label>
            <input
              type="color"
              value={data.theme.primaryColor}
              onChange={(e) =>
                onChange({
                  ...data,
                  theme: { ...data.theme, primaryColor: e.target.value },
                })
              }
              className="w-7 h-7 rounded border border-slate-300 cursor-pointer p-0 bg-transparent"
            />
          </div>
          <div className="flex items-center gap-2">
            <label className="text-[11px] text-slate-600">অ্যাকসেন্ট রঙ:</label>
            <input
              type="color"
              value={data.theme.secondaryColor}
              onChange={(e) =>
                onChange({
                  ...data,
                  theme: { ...data.theme, secondaryColor: e.target.value },
                })
              }
              className="w-7 h-7 rounded border border-slate-300 cursor-pointer p-0 bg-transparent"
            />
          </div>
        </div>
      </div>

      {/* Show/Hide Sections */}
      <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
        <div className="flex items-center gap-2 pb-2 mb-3 border-b border-slate-200">
          <Eye className="w-4 h-4 text-teal-600" />
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">
            {t.showHideSections}
          </h3>
        </div>

        <div className="grid grid-cols-2 gap-2 text-xs">
          {[
            { key: 'photo', label: 'প্রোফাইল ছবি' },
            { key: 'personalInfo', label: 'ব্যক্তিগত তথ্য (Bio-data)' },
            { key: 'professionalProfile', label: 'পেশাদার প্রোফাইল ও উদ্যোগ' },
            { key: 'organizationalExperience', label: 'সাংগঠনিক অভিজ্ঞতা' },
            { key: 'education', label: 'শিক্ষাগত যোগ্যতা' },
            { key: 'skills', label: 'দক্ষতাসমূহ (Skills)' },
            { key: 'familyBackground', label: 'পারিবারিক পটভূমি (Family)' },
            { key: 'matrimonialDetails', label: 'পাত্র/পাত্রীর প্রত্যাশা (Matrimonial)' },
            { key: 'languages', label: 'ভাষাজ্ঞান (Languages)' },
            { key: 'customSections', label: 'কাস্টম সেকশনসমূহ' },
          ].map(({ key, label }) => {
            const isVisible = data.visibility[key as keyof typeof data.visibility];
            return (
              <label
                key={key}
                className="flex items-center gap-2 p-2 bg-white rounded-lg border border-slate-200 cursor-pointer hover:bg-slate-50"
              >
                <input
                  type="checkbox"
                  checked={isVisible}
                  onChange={() => toggleSection(key as keyof typeof data.visibility)}
                  className="rounded text-teal-600 focus:ring-teal-500 w-4 h-4 accent-teal-600"
                />
                <span className="text-[11px] text-slate-700 font-medium">{label}</span>
              </label>
            );
          })}
        </div>
      </div>
    </div>
  );
};
