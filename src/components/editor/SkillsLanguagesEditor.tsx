import React, { useState } from 'react';
import { ResumeData, SkillItem, LanguageItem } from '../../types/resume';
import { translations, Language } from '../../data/translations';
import { Plus, Trash2, Zap, Globe } from 'lucide-react';

interface Props {
  data: ResumeData;
  onChange: (data: ResumeData) => void;
  lang: Language;
}

export const SkillsLanguagesEditor: React.FC<Props> = ({ data, onChange, lang }) => {
  const t = translations[lang];
  const [newSkillText, setNewSkillText] = useState('');

  // Skills
  const addQuickSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSkillText.trim()) return;

    const newSkill: SkillItem = {
      id: `sk-${Date.now()}`,
      name: newSkillText.trim(),
      level: 90,
    };
    onChange({
      ...data,
      skills: [...data.skills, newSkill],
    });
    setNewSkillText('');
  };

  const updateSkillLevel = (id: string, level: number) => {
    const updated = data.skills.map((s) => (s.id === id ? { ...s, level } : s));
    onChange({ ...data, skills: updated });
  };

  const removeSkill = (id: string) => {
    onChange({
      ...data,
      skills: data.skills.filter((s) => s.id !== id),
    });
  };

  // Languages
  const addLanguage = () => {
    const newLang: LanguageItem = {
      id: `lang-${Date.now()}`,
      name: '',
      proficiency: 'Fluent',
    };
    onChange({
      ...data,
      languages: [...data.languages, newLang],
    });
  };

  const updateLanguage = (id: string, field: keyof LanguageItem, value: string) => {
    const updated = data.languages.map((l) =>
      l.id === id ? { ...l, [field]: value } : l
    );
    onChange({ ...data, languages: updated });
  };

  const removeLanguage = (id: string) => {
    onChange({
      ...data,
      languages: data.languages.filter((l) => l.id !== id),
    });
  };

  return (
    <div className="space-y-6">
      {/* Skills Section */}
      <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
        <div className="flex items-center gap-2 pb-2 mb-3 border-b border-slate-200">
          <Zap className="w-4 h-4 text-teal-600" />
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">
            {t.skillsTitle}
          </h3>
        </div>

        {/* Quick Add Form */}
        <form onSubmit={addQuickSkill} className="flex gap-2 mb-4">
          <input
            type="text"
            value={newSkillText}
            onChange={(e) => setNewSkillText(e.target.value)}
            placeholder="দক্ষতা লিখুন (যেমন: Graphic Design, Calligraphy, UI Design)..."
            className="flex-1 px-3 py-1.5 text-xs bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500"
          />
          <button
            type="submit"
            className="px-3 py-1.5 bg-teal-600 hover:bg-teal-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>যোগ করুন</span>
          </button>
        </form>

        {/* Skills list */}
        <div className="space-y-2">
          {data.skills.map((skill) => (
            <div
              key={skill.id}
              className="flex items-center justify-between p-2.5 bg-white rounded-lg border border-slate-200 text-xs"
            >
              <div className="font-semibold text-slate-800 min-w-[120px]">
                {skill.name}
              </div>

              <div className="flex items-center gap-3 flex-1 max-w-[200px] mx-3">
                <input
                  type="range"
                  min="30"
                  max="100"
                  step="5"
                  value={skill.level || 85}
                  onChange={(e) => updateSkillLevel(skill.id, Number(e.target.value))}
                  className="w-full accent-teal-600 h-1.5 bg-slate-200 rounded-lg cursor-pointer"
                />
                <span className="text-[11px] font-mono text-slate-500 w-8 text-right">
                  {skill.level || 85}%
                </span>
              </div>

              <button
                type="button"
                onClick={() => removeSkill(skill.id)}
                className="text-slate-400 hover:text-red-600 transition-colors p-1"
                title="Remove"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}

          {data.skills.length === 0 && (
            <div className="text-center py-4 text-xs text-slate-400 italic">
              কোনো দক্ষতা যোগ করা হয়নি। উপরের বক্সে নাম লিখে যোগ করুন।
            </div>
          )}
        </div>
      </div>

      {/* Languages Section */}
      <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
        <div className="flex items-center justify-between pb-2 mb-3 border-b border-slate-200">
          <div className="flex items-center gap-2">
            <Globe className="w-4 h-4 text-teal-600" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">
              {t.languagesTitle}
            </h3>
          </div>
          <button
            type="button"
            onClick={addLanguage}
            className="flex items-center gap-1 px-2.5 py-1 text-xs font-semibold text-teal-700 bg-teal-50 hover:bg-teal-100 rounded-lg transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>{t.addLanguage}</span>
          </button>
        </div>

        <div className="space-y-2.5">
          {data.languages.map((langItem) => (
            <div
              key={langItem.id}
              className="flex items-center gap-3 p-2 bg-white rounded-lg border border-slate-200 text-xs"
            >
              <input
                type="text"
                value={langItem.name}
                onChange={(e) => updateLanguage(langItem.id, 'name', e.target.value)}
                placeholder="যেমন: Bengali (বাংলা), English, Arabic"
                className="flex-1 px-2.5 py-1 text-xs border border-slate-300 rounded focus:ring-1 focus:ring-teal-500"
              />
              <select
                value={langItem.proficiency}
                onChange={(e) =>
                  updateLanguage(langItem.id, 'proficiency', e.target.value as LanguageItem['proficiency'])
                }
                className="px-2 py-1 text-xs border border-slate-300 rounded bg-white"
              >
                <option value="Native">Native (মাতৃভাষা)</option>
                <option value="Fluent">Fluent (সাবলীল)</option>
                <option value="Intermediate">Intermediate (মধ্যম)</option>
                <option value="Basic">Basic (প্রাথমিক)</option>
              </select>
              <button
                type="button"
                onClick={() => removeLanguage(langItem.id)}
                className="text-slate-400 hover:text-red-600 transition-colors p-1"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}

          {data.languages.length === 0 && (
            <div className="text-center py-3 text-xs text-slate-400 italic">
              কোনো ভাষা যোগ করা হয়নি।
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
