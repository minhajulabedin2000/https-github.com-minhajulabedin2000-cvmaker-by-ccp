import React from 'react';
import { ResumeData } from '../../types/resume';
import { translations, Language } from '../../data/translations';
import { Heart, Sparkles, UserCheck, ShieldCheck, Phone } from 'lucide-react';

interface Props {
  data: ResumeData;
  onChange: (data: ResumeData) => void;
  lang: Language;
}

export const MatrimonialEditor: React.FC<Props> = ({ data, onChange }) => {
  const matrimonial = data.matrimonial || {
    partnerExpectations: {
      ageRange: '',
      height: '',
      education: '',
      district: '',
      religiousPractices: '',
      otherNotes: '',
    },
    religiousAndLifestyle: {
      prayers: '',
      purdahOrSunnah: '',
      quranRecitation: '',
      hobbies: '',
      healthStatus: '',
      selfDescription: '',
    },
    guardianContact: {
      name: '',
      relation: '',
      phone: '',
    },
  };

  const updateExpectation = (field: keyof typeof matrimonial.partnerExpectations, value: string) => {
    onChange({
      ...data,
      matrimonial: {
        ...matrimonial,
        partnerExpectations: {
          ...matrimonial.partnerExpectations,
          [field]: value,
        },
      },
    });
  };

  const updateReligious = (field: keyof typeof matrimonial.religiousAndLifestyle, value: string) => {
    onChange({
      ...data,
      matrimonial: {
        ...matrimonial,
        religiousAndLifestyle: {
          ...matrimonial.religiousAndLifestyle,
          [field]: value,
        },
      },
    });
  };

  const updateGuardian = (field: keyof typeof matrimonial.guardianContact, value: string) => {
    onChange({
      ...data,
      matrimonial: {
        ...matrimonial,
        guardianContact: {
          ...matrimonial.guardianContact,
          [field]: value,
        },
      },
    });
  };

  return (
    <div className="space-y-6">
      {/* Partner Expectations (পাত্র/পাত্রীর চাহিদা ও প্রত্যাশা) */}
      <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
        <div className="flex items-center gap-2 pb-2 mb-3 border-b border-slate-200">
          <Heart className="w-4 h-4 text-rose-600" />
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">
            পাত্র / পাত্রীর প্রত্যাশা ও পছন্দ (Partner Expectations)
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
          <div>
            <label className="block text-[11px] font-semibold text-slate-700 mb-1">
              প্রত্যাশিত বয়স সীমা
            </label>
            <input
              type="text"
              value={matrimonial.partnerExpectations.ageRange}
              onChange={(e) => updateExpectation('ageRange', e.target.value)}
              placeholder="যেমন: ১৮ - ২৪ বছর"
              className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500"
            />
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-700 mb-1">
              প্রত্যাশিত উচ্চতা
            </label>
            <input
              type="text"
              value={matrimonial.partnerExpectations.height}
              onChange={(e) => updateExpectation('height', e.target.value)}
              placeholder="যেমন: ৫'১&quot; থেকে ৫'৫&quot;"
              className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500"
            />
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-700 mb-1">
              শিক্ষাগত যোগ্যতা
            </label>
            <input
              type="text"
              value={matrimonial.partnerExpectations.education}
              onChange={(e) => updateExpectation('education', e.target.value)}
              placeholder="যেমন: ন্যূনতম এইচএসসি / আলিম বা স্নাতক"
              className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500"
            />
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-700 mb-1">
              কাঙ্ক্ষিত জেলা বা এলাকা
            </label>
            <input
              type="text"
              value={matrimonial.partnerExpectations.district}
              onChange={(e) => updateExpectation('district', e.target.value)}
              placeholder="যেমন: চট্টগ্রাম বিভাগ / যে কোনো জেলা"
              className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500"
            />
          </div>
        </div>

        <div className="space-y-3">
          <div>
            <label className="block text-[11px] font-semibold text-slate-700 mb-1">
              দ্বীনি ও চারিত্রিক গুণাবলী
            </label>
            <textarea
              rows={2}
              value={matrimonial.partnerExpectations.religiousPractices}
              onChange={(e) => updateExpectation('religiousPractices', e.target.value)}
              placeholder="নিয়মিত পাঁচ ওয়াক্ত নামাজী, পর্দাশীল এবং অমায়িক দ্বীনি স্বভাবের হতে হবে..."
              className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 leading-relaxed"
            />
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-700 mb-1">
              অন্যান্য বিশেষ প্রত্যাশা বা মতামত
            </label>
            <textarea
              rows={2}
              value={matrimonial.partnerExpectations.otherNotes}
              onChange={(e) => updateExpectation('otherNotes', e.target.value)}
              placeholder="পারিবারিক সমঝোতাপূর্ণ মানসিকতা ও পারস্পরিক শ্রদ্ধাবোধ..."
              className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 leading-relaxed"
            />
          </div>
        </div>
      </div>

      {/* Religious & Personal Lifestyle (দ্বীনি ও ব্যক্তিগত অভ্যাস) */}
      <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
        <div className="flex items-center gap-2 pb-2 mb-3 border-b border-slate-200">
          <ShieldCheck className="w-4 h-4 text-teal-600" />
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">
            দ্বীনি ও ব্যক্তিগত তথ্যাবলী (Religious & Lifestyle)
          </h3>
        </div>

        <div className="space-y-3">
          <div>
            <label className="block text-[11px] font-semibold text-slate-700 mb-1">
              নামাজ ও ধর্মীয় দায়িত্ব পালন
            </label>
            <input
              type="text"
              value={matrimonial.religiousAndLifestyle.prayers}
              onChange={(e) => updateReligious('prayers', e.target.value)}
              placeholder="আলহামদুলিল্লাহ, নিয়মিত ৫ ওয়াক্ত জামাতে নামাজ আদায় করা হয়।"
              className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                পর্দা / সুন্নতি অনুশাসন
              </label>
              <input
                type="text"
                value={matrimonial.religiousAndLifestyle.purdahOrSunnah}
                onChange={(e) => updateReligious('purdahOrSunnah', e.target.value)}
                placeholder="সুন্নতি দাড়ি রয়েছে / পর্দা রক্ষা করা হয়"
                className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                কুরআন তিলাওয়াত
              </label>
              <input
                type="text"
                value={matrimonial.religiousAndLifestyle.quranRecitation}
                onChange={(e) => updateReligious('quranRecitation', e.target.value)}
                placeholder="সহীহ তিলাওয়াত জানা আছে"
                className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                শখ ও অবসর
              </label>
              <input
                type="text"
                value={matrimonial.religiousAndLifestyle.hobbies}
                onChange={(e) => updateReligious('hobbies', e.target.value)}
                placeholder="ক্যালিগ্রাফি আর্ট, বই পড়া, ভ্রমণ"
                className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                শারীরিক ও মানসিক স্বাস্থ্য
              </label>
              <input
                type="text"
                value={matrimonial.religiousAndLifestyle.healthStatus}
                onChange={(e) => updateReligious('healthStatus', e.target.value)}
                placeholder="আলহামদুলিল্লাহ সম্পূর্ণ সুস্থ"
                className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-700 mb-1">
              নিজের সম্পর্কে সংক্ষিপ্ত কথা
            </label>
            <textarea
              rows={2}
              value={matrimonial.religiousAndLifestyle.selfDescription}
              onChange={(e) => updateReligious('selfDescription', e.target.value)}
              placeholder="শান্ত ও দায়িত্বশীল স্বভাবের। হালাল উপার্জনে বিশ্বাসী..."
              className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 leading-relaxed"
            />
          </div>
        </div>
      </div>

      {/* Guardian Contact (অভিভাবকের সাথে যোগাযোগের বিবরণ) */}
      <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
        <div className="flex items-center gap-2 pb-2 mb-3 border-b border-slate-200">
          <Phone className="w-4 h-4 text-teal-600" />
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">
            অভিভাবকের সাথে যোগাযোগের তথ্য (Guardian Contact)
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div>
            <label className="block text-[11px] font-semibold text-slate-700 mb-1">
              অভিভাবকের নাম
            </label>
            <input
              type="text"
              value={matrimonial.guardianContact.name}
              onChange={(e) => updateGuardian('name', e.target.value)}
              placeholder="পিতা / অভিভাবক"
              className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500"
            />
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-700 mb-1">
              সম্পর্ক
            </label>
            <input
              type="text"
              value={matrimonial.guardianContact.relation}
              onChange={(e) => updateGuardian('relation', e.target.value)}
              placeholder="পিতা / বড় ভাই / চাচা"
              className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500"
            />
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-700 mb-1">
              যোগাযোগের ফোন নম্বর
            </label>
            <input
              type="text"
              value={matrimonial.guardianContact.phone}
              onChange={(e) => updateGuardian('phone', e.target.value)}
              placeholder="+880 1800-000000"
              className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
