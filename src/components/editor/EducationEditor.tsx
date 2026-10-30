import React from 'react';
import { ResumeData, EducationalQualification } from '../../types/resume';
import { translations, Language } from '../../data/translations';
import { Plus, Trash2, GraduationCap } from 'lucide-react';

interface Props {
  data: ResumeData;
  onChange: (data: ResumeData) => void;
  lang: Language;
}

export const EducationEditor: React.FC<Props> = ({ data, onChange, lang }) => {
  const t = translations[lang];

  const addEducation = () => {
    const newEdu: EducationalQualification = {
      id: `edu-${Date.now()}`,
      degree: '',
      sessionOrYear: '',
      institution: '',
      grade: '',
      details: '',
    };
    onChange({
      ...data,
      education: [...data.education, newEdu],
    });
  };

  const updateEducation = (id: string, field: keyof EducationalQualification, value: string) => {
    const updated = data.education.map((e) =>
      e.id === id ? { ...e, [field]: value } : e
    );
    onChange({
      ...data,
      education: updated,
    });
  };

  const removeEducation = (id: string) => {
    const filtered = data.education.filter((e) => e.id !== id);
    onChange({
      ...data,
      education: filtered,
    });
  };

  return (
    <div className="space-y-4">
      <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
        <div className="flex items-center justify-between pb-2 mb-3 border-b border-slate-200">
          <div className="flex items-center gap-2">
            <GraduationCap className="w-4 h-4 text-teal-600" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">
              {t.eduTitle}
            </h3>
          </div>
          <button
            type="button"
            onClick={addEducation}
            className="flex items-center gap-1 px-2.5 py-1 text-xs font-semibold text-teal-700 bg-teal-50 hover:bg-teal-100 rounded-lg transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>{t.addEducation}</span>
          </button>
        </div>

        <div className="space-y-3">
          {data.education.map((edu, idx) => (
            <div key={edu.id} className="p-3 bg-white rounded-lg border border-slate-200 relative group">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-bold text-slate-500">
                  শিক্ষাগত যোগ্যতা #{idx + 1}
                </span>
                <button
                  type="button"
                  onClick={() => removeEducation(edu.id)}
                  className="text-slate-400 hover:text-red-600 transition-colors p-1"
                  title="Remove"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-2">
                <div>
                  <label className="block text-[10px] font-medium text-slate-600 mb-0.5">
                    {t.degree} *
                  </label>
                  <input
                    type="text"
                    value={edu.degree}
                    onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)}
                    placeholder="B.A. (Degree Pass Course) / Alim Examination"
                    className="w-full px-2.5 py-1 text-xs border border-slate-300 rounded focus:ring-1 focus:ring-teal-500 font-medium"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-medium text-slate-600 mb-0.5">
                    {t.sessionOrYear}
                  </label>
                  <input
                    type="text"
                    value={edu.sessionOrYear}
                    onChange={(e) => updateEducation(edu.id, 'sessionOrYear', e.target.value)}
                    placeholder="2022-2023 Session / 2020"
                    className="w-full px-2.5 py-1 text-xs border border-slate-300 rounded focus:ring-1 focus:ring-teal-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                <div className="md:col-span-2">
                  <label className="block text-[10px] font-medium text-slate-600 mb-0.5">
                    {t.institution} *
                  </label>
                  <input
                    type="text"
                    value={edu.institution}
                    onChange={(e) => updateEducation(edu.id, 'institution', e.target.value)}
                    placeholder="Government Hazi Muhammad Mohsin College, Chattogram."
                    className="w-full px-2.5 py-1 text-xs border border-slate-300 rounded focus:ring-1 focus:ring-teal-500"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-medium text-slate-600 mb-0.5">
                    {t.gradeOrResult}
                  </label>
                  <input
                    type="text"
                    value={edu.grade || ''}
                    onChange={(e) => updateEducation(edu.id, 'grade', e.target.value)}
                    placeholder="GPA 4.80 / Passed"
                    className="w-full px-2.5 py-1 text-xs border border-slate-300 rounded focus:ring-1 focus:ring-teal-500"
                  />
                </div>
              </div>
            </div>
          ))}

          {data.education.length === 0 && (
            <div className="text-center py-4 text-xs text-slate-400 italic">
              কোনো শিক্ষাগত যোগ্যতা যোগ করা হয়নি।
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
