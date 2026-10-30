import React from 'react';
import { ResumeData } from '../../types/resume';
import { translations, Language } from '../../data/translations';
import { Eye, EyeOff, Users, Heart } from 'lucide-react';

interface Props {
  data: ResumeData;
  onChange: (data: ResumeData) => void;
  lang: Language;
}

export const BiodataFamilyEditor: React.FC<Props> = ({ data, onChange, lang }) => {
  const t = translations[lang];

  const updatePersonal = (field: keyof typeof data.personal, value: string) => {
    onChange({
      ...data,
      personal: {
        ...data.personal,
        [field]: value,
      },
    });
  };

  const updateFamily = (field: keyof typeof data.family, value: string) => {
    onChange({
      ...data,
      family: {
        ...data.family,
        [field]: value,
      },
    });
  };

  const toggleVisibility = (field: keyof typeof data.visibility) => {
    onChange({
      ...data,
      visibility: {
        ...data.visibility,
        [field]: !data.visibility[field],
      },
    });
  };

  return (
    <div className="space-y-6">
      {/* Bio-Data Particulars Section */}
      <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
        <div className="flex items-center justify-between pb-3 border-b border-slate-200 mb-4">
          <div className="flex items-center gap-2">
            <Heart className="w-4 h-4 text-teal-600" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">
              {t.bioDataTitle}
            </h3>
          </div>
          <button
            type="button"
            onClick={() => toggleVisibility('personalInfo')}
            className="flex items-center gap-1.5 text-xs text-slate-600 hover:text-slate-900 transition-colors"
          >
            {data.visibility.personalInfo ? (
              <>
                <Eye className="w-3.5 h-3.5 text-teal-600" />
                <span>সেকশন চালু</span>
              </>
            ) : (
              <>
                <EyeOff className="w-3.5 h-3.5 text-slate-400" />
                <span className="text-slate-400">সেকশন বন্ধ</span>
              </>
            )}
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          <div>
            <label className="block text-[11px] font-semibold text-slate-700 mb-1">
              {t.dateOfBirth}
            </label>
            <input
              type="text"
              value={data.personal.dateOfBirth || ''}
              onChange={(e) => updatePersonal('dateOfBirth', e.target.value)}
              placeholder="18 October 2000"
              className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500"
            />
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-700 mb-1">
              {t.age}
            </label>
            <input
              type="text"
              value={data.personal.age || ''}
              onChange={(e) => updatePersonal('age', e.target.value)}
              placeholder="26 Years"
              className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500"
            />
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-700 mb-1">
              {t.height}
            </label>
            <input
              type="text"
              value={data.personal.height || ''}
              onChange={(e) => updatePersonal('height', e.target.value)}
              placeholder="5'5&quot;"
              className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500"
            />
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-700 mb-1">
              {t.weight}
            </label>
            <input
              type="text"
              value={data.personal.weight || ''}
              onChange={(e) => updatePersonal('weight', e.target.value)}
              placeholder="68 kg"
              className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500"
            />
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-700 mb-1">
              {t.complexion}
            </label>
            <input
              type="text"
              value={data.personal.complexion || ''}
              onChange={(e) => updatePersonal('complexion', e.target.value)}
              placeholder="Dark Brown / Fair"
              className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500"
            />
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-700 mb-1">
              {t.bloodGroup}
            </label>
            <select
              value={data.personal.bloodGroup || ''}
              onChange={(e) => updatePersonal('bloodGroup', e.target.value)}
              className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500"
            >
              <option value="">নির্বাচন করুন</option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-700 mb-1">
              {t.maritalStatus}
            </label>
            <input
              type="text"
              value={data.personal.maritalStatus || ''}
              onChange={(e) => updatePersonal('maritalStatus', e.target.value)}
              placeholder="Unmarried / Married"
              className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500"
            />
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-700 mb-1">
              {t.religion}
            </label>
            <input
              type="text"
              value={data.personal.religion || ''}
              onChange={(e) => updatePersonal('religion', e.target.value)}
              placeholder="Islam / Hinduism / etc."
              className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500"
            />
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-700 mb-1">
              {t.nationality}
            </label>
            <input
              type="text"
              value={data.personal.nationality || ''}
              onChange={(e) => updatePersonal('nationality', e.target.value)}
              placeholder="Bangladeshi"
              className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500"
            />
          </div>
        </div>
      </div>

      {/* Family Background Section */}
      <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
        <div className="flex items-center justify-between pb-3 border-b border-slate-200 mb-4">
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-teal-600" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">
              {t.familyTitle}
            </h3>
          </div>
          <button
            type="button"
            onClick={() => toggleVisibility('familyBackground')}
            className="flex items-center gap-1.5 text-xs text-slate-600 hover:text-slate-900 transition-colors"
          >
            {data.visibility.familyBackground ? (
              <>
                <Eye className="w-3.5 h-3.5 text-teal-600" />
                <span>সেকশন চালু</span>
              </>
            ) : (
              <>
                <EyeOff className="w-3.5 h-3.5 text-slate-400" />
                <span className="text-slate-400">সেকশন বন্ধ</span>
              </>
            )}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div>
            <label className="block text-[11px] font-semibold text-slate-700 mb-1">
              {t.fatherName}
            </label>
            <input
              type="text"
              value={data.family.fatherName}
              onChange={(e) => updateFamily('fatherName', e.target.value)}
              placeholder="Anowar Hossain"
              className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500"
            />
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-700 mb-1">
              {t.fatherOccupation}
            </label>
            <input
              type="text"
              value={data.family.fatherOccupation}
              onChange={(e) => updateFamily('fatherOccupation', e.target.value)}
              placeholder="Pharmacy Business"
              className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500"
            />
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-700 mb-1">
              {t.motherName}
            </label>
            <input
              type="text"
              value={data.family.motherName}
              onChange={(e) => updateFamily('motherName', e.target.value)}
              placeholder="Jusna Begum"
              className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500"
            />
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-700 mb-1">
              {t.motherOccupation}
            </label>
            <input
              type="text"
              value={data.family.motherOccupation}
              onChange={(e) => updateFamily('motherOccupation', e.target.value)}
              placeholder="Homemaker"
              className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500"
            />
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-700 mb-1">
              {t.siblings}
            </label>
            <input
              type="text"
              value={data.family.siblings}
              onChange={(e) => updateFamily('siblings', e.target.value)}
              placeholder="3 Sisters and 1 Brother"
              className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500"
            />
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-700 mb-1">
              {t.positionInFamily}
            </label>
            <input
              type="text"
              value={data.family.positionInFamily}
              onChange={(e) => updateFamily('positionInFamily', e.target.value)}
              placeholder="Youngest / Eldest"
              className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-[11px] font-semibold text-slate-700 mb-1">
              {t.sistersMaritalStatus}
            </label>
            <input
              type="text"
              value={data.family.sistersMaritalStatus}
              onChange={(e) => updateFamily('sistersMaritalStatus', e.target.value)}
              placeholder="All Three Sisters Are Married."
              className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
