import React from 'react';
import { ResumeData, BusinessVenture, OrganizationalExperience } from '../../types/resume';
import { translations, Language } from '../../data/translations';
import { Plus, Trash2, Briefcase, Building } from 'lucide-react';

interface Props {
  data: ResumeData;
  onChange: (data: ResumeData) => void;
  lang: Language;
}

export const ExperienceVenturesEditor: React.FC<Props> = ({ data, onChange, lang }) => {
  const t = translations[lang];

  const updateProfile = (field: keyof typeof data.profile, value: unknown) => {
    onChange({
      ...data,
      profile: {
        ...data.profile,
        [field]: value,
      },
    });
  };

  // Business Ventures methods
  const addVenture = () => {
    const newVenture: BusinessVenture = {
      id: `bv-${Date.now()}`,
      name: '',
      role: '',
      details: '',
    };
    updateProfile('businessVentures', [...data.profile.businessVentures, newVenture]);
  };

  const updateVenture = (id: string, field: keyof BusinessVenture, value: string) => {
    const updated = data.profile.businessVentures.map((v) =>
      v.id === id ? { ...v, [field]: value } : v
    );
    updateProfile('businessVentures', updated);
  };

  const removeVenture = (id: string) => {
    const filtered = data.profile.businessVentures.filter((v) => v.id !== id);
    updateProfile('businessVentures', filtered);
  };

  // Organizational Experience methods
  const addExperience = () => {
    const newExp: OrganizationalExperience = {
      id: `exp-${Date.now()}`,
      role: '',
      organization: '',
      period: '',
      details: '',
    };
    onChange({
      ...data,
      experience: [...data.experience, newExp],
    });
  };

  const updateExperience = (id: string, field: keyof OrganizationalExperience, value: string) => {
    const updated = data.experience.map((e) =>
      e.id === id ? { ...e, [field]: value } : e
    );
    onChange({
      ...data,
      experience: updated,
    });
  };

  const removeExperience = (id: string) => {
    const filtered = data.experience.filter((e) => e.id !== id);
    onChange({
      ...data,
      experience: filtered,
    });
  };

  return (
    <div className="space-y-6">
      {/* Professional Overview */}
      <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
        <div className="flex items-center gap-2 pb-2 mb-3 border-b border-slate-200">
          <Briefcase className="w-4 h-4 text-teal-600" />
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">
            {t.profTitle}
          </h3>
        </div>

        <div className="space-y-3">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              {t.profession}
            </label>
            <input
              type="text"
              value={data.profile.profession}
              onChange={(e) => updateProfile('profession', e.target.value)}
              placeholder="All kind of Design Entrepreneur"
              className="w-full px-3 py-1.5 text-xs bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 font-medium"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              {t.summary}
            </label>
            <textarea
              rows={3}
              value={data.profile.summary}
              onChange={(e) => updateProfile('summary', e.target.value)}
              placeholder="Creative design entrepreneur with extensive leadership experience..."
              className="w-full px-3 py-1.5 text-xs bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 leading-relaxed"
            />
          </div>
        </div>
      </div>

      {/* Business Ventures */}
      <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
        <div className="flex items-center justify-between pb-2 mb-3 border-b border-slate-200">
          <div className="flex items-center gap-2">
            <Building className="w-4 h-4 text-teal-600" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">
              {t.venturesTitle}
            </h3>
          </div>
          <button
            type="button"
            onClick={addVenture}
            className="flex items-center gap-1 px-2.5 py-1 text-xs font-semibold text-teal-700 bg-teal-50 hover:bg-teal-100 rounded-lg transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>{t.addVenture}</span>
          </button>
        </div>

        <div className="space-y-3">
          {data.profile.businessVentures.map((venture, idx) => (
            <div key={venture.id} className="p-3 bg-white rounded-lg border border-slate-200 relative group">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-bold text-slate-500">
                  উদ্যোগ #{idx + 1}
                </span>
                <button
                  type="button"
                  onClick={() => removeVenture(venture.id)}
                  className="text-slate-400 hover:text-red-600 transition-colors p-1"
                  title="Remove"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-2">
                <div>
                  <label className="block text-[10px] font-medium text-slate-600 mb-0.5">
                    {t.ventureName}
                  </label>
                  <input
                    type="text"
                    value={venture.name}
                    onChange={(e) => updateVenture(venture.id, 'name', e.target.value)}
                    placeholder="NokshaX / Creative CONCEPT Point"
                    className="w-full px-2.5 py-1 text-xs border border-slate-300 rounded focus:ring-1 focus:ring-teal-500 font-medium"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-medium text-slate-600 mb-0.5">
                    {t.ventureRole}
                  </label>
                  <input
                    type="text"
                    value={venture.role}
                    onChange={(e) => updateVenture(venture.id, 'role', e.target.value)}
                    placeholder="(Owner) / (Project Director)"
                    className="w-full px-2.5 py-1 text-xs border border-slate-300 rounded focus:ring-1 focus:ring-teal-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-medium text-slate-600 mb-0.5">
                  {t.ventureDetails}
                </label>
                <input
                  type="text"
                  value={venture.details}
                  onChange={(e) => updateVenture(venture.id, 'details', e.target.value)}
                  placeholder="Creative Design, Printing, Branding & Event Management Services."
                  className="w-full px-2.5 py-1 text-xs border border-slate-300 rounded focus:ring-1 focus:ring-teal-500"
                />
              </div>
            </div>
          ))}

          {data.profile.businessVentures.length === 0 && (
            <div className="text-center py-4 text-xs text-slate-400 italic">
              কোনো ব্যবসা বা উদ্যোগ যুক্ত করা হয়নি।
            </div>
          )}
        </div>
      </div>

      {/* Organizational Experience */}
      <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
        <div className="flex items-center justify-between pb-2 mb-3 border-b border-slate-200">
          <div className="flex items-center gap-2">
            <Briefcase className="w-4 h-4 text-teal-600" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">
              {t.orgExpTitle}
            </h3>
          </div>
          <button
            type="button"
            onClick={addExperience}
            className="flex items-center gap-1 px-2.5 py-1 text-xs font-semibold text-teal-700 bg-teal-50 hover:bg-teal-100 rounded-lg transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>{t.addExperience}</span>
          </button>
        </div>

        <div className="space-y-3">
          {data.experience.map((exp, idx) => (
            <div key={exp.id} className="p-3 bg-white rounded-lg border border-slate-200 relative group">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-bold text-slate-500">
                  অভিজ্ঞতা #{idx + 1}
                </span>
                <button
                  type="button"
                  onClick={() => removeExperience(exp.id)}
                  className="text-slate-400 hover:text-red-600 transition-colors p-1"
                  title="Remove"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-2">
                <div>
                  <label className="block text-[10px] font-medium text-slate-600 mb-0.5">
                    {t.role} *
                  </label>
                  <input
                    type="text"
                    value={exp.role}
                    onChange={(e) => updateExperience(exp.id, 'role', e.target.value)}
                    placeholder="Founding Director / Member / Senior Designer"
                    className="w-full px-2.5 py-1 text-xs border border-slate-300 rounded focus:ring-1 focus:ring-teal-500 font-medium"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-medium text-slate-600 mb-0.5">
                    {t.period} *
                  </label>
                  <input
                    type="text"
                    value={exp.period}
                    onChange={(e) => updateExperience(exp.id, 'period', e.target.value)}
                    placeholder="2026 - Present / 2024 - 2025"
                    className="w-full px-2.5 py-1 text-xs border border-slate-300 rounded focus:ring-1 focus:ring-teal-500"
                  />
                </div>
              </div>

              <div className="mb-2">
                <label className="block text-[10px] font-medium text-slate-600 mb-0.5">
                  {t.organization} *
                </label>
                <input
                  type="text"
                  value={exp.organization}
                  onChange={(e) => updateExperience(exp.id, 'organization', e.target.value)}
                  placeholder="Gulshakhali Development Foundation / BICS Chattogram"
                  className="w-full px-2.5 py-1 text-xs border border-slate-300 rounded focus:ring-1 focus:ring-teal-500"
                />
              </div>

              <div>
                <label className="block text-[10px] font-medium text-slate-600 mb-0.5">
                  {t.jobDetails}
                </label>
                <input
                  type="text"
                  value={exp.details || ''}
                  onChange={(e) => updateExperience(exp.id, 'details', e.target.value)}
                  placeholder="Key activities or achievements..."
                  className="w-full px-2.5 py-1 text-xs border border-slate-300 rounded focus:ring-1 focus:ring-teal-500"
                />
              </div>
            </div>
          ))}

          {data.experience.length === 0 && (
            <div className="text-center py-4 text-xs text-slate-400 italic">
              কোনো অভিজ্ঞতা যোগ করা হয়নি। উপরে বাটনে ক্লিক করে যোগ করুন।
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
