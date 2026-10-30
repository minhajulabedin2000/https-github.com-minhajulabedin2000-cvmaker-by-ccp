import React, { useRef, useState } from 'react';
import { ResumeData, SkillItem, BusinessVenture } from '../../types/resume';
import { translations, Language } from '../../data/translations';
import { PhotoCropModal } from '../common/PhotoCropModal';
import {
  Camera,
  Trash2,
  Eye,
  EyeOff,
  Sparkles,
  Loader2,
  Crop,
  CheckCircle,
  FileText,
} from 'lucide-react';

interface Props {
  data: ResumeData;
  onChange: (data: ResumeData) => void;
  lang: Language;
}

export const PersonalEditor: React.FC<Props> = ({ data, onChange, lang }) => {
  const t = translations[lang];
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [rawImageForCrop, setRawImageForCrop] = useState<string | null>(null);
  const [isCropModalOpen, setIsCropModalOpen] = useState(false);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [aiSuccessMsg, setAiSuccessMsg] = useState<string | null>(null);

  const updatePersonal = (field: keyof typeof data.personal, value: string) => {
    onChange({
      ...data,
      personal: {
        ...data.personal,
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

  // Photo upload and trigger crop modal
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setRawImageForCrop(reader.result as string);
        setIsCropModalOpen(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCropComplete = (croppedDataUrl: string) => {
    updatePersonal('photoUrl', croppedDataUrl);
  };

  // Gemini AI Suggestion handler
  const handleGenerateAiSummaryAndSkills = async () => {
    const targetTitle = data.personal.tagline || data.profile.profession || 'Graphic Designer & Calligrapher';
    setIsAiLoading(true);
    setAiSuccessMsg(null);

    try {
      const response = await fetch('/api/gemini/suggest-profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          jobTitle: targetTitle,
          profession: data.profile.profession,
          lang: data.documentLanguage || 'bn',
          mode: data.cvMode || 'comprehensive',
        }),
      });

      if (!response.ok) {
        throw new Error('AI suggestion failed');
      }

      const res = await response.json();
      if (res.success && res.data) {
        const { summary, skills, suggestedVentures, partnerExpectations } = res.data;

        // Merge skills
        const formattedSkills: SkillItem[] = (skills || []).map((s: { name: string; level?: number }, i: number) => ({
          id: `ai-sk-${Date.now()}-${i}`,
          name: s.name,
          level: s.level || 85,
        }));

        // Merge ventures if empty
        const newVentures: BusinessVenture[] = (suggestedVentures || []).map((v: { name: string; role?: string; details?: string }, i: number) => ({
          id: `ai-bv-${Date.now()}-${i}`,
          name: v.name,
          role: v.role || '',
          details: v.details || '',
        }));

        onChange({
          ...data,
          profile: {
            ...data.profile,
            summary: summary || data.profile.summary,
            businessVentures:
              data.profile.businessVentures.length > 0
                ? data.profile.businessVentures
                : newVentures,
          },
          skills: formattedSkills.length > 0 ? formattedSkills : data.skills,
          matrimonial: partnerExpectations && data.matrimonial ? {
            ...data.matrimonial,
            partnerExpectations: {
              ...data.matrimonial.partnerExpectations,
              otherNotes: partnerExpectations,
            },
          } : data.matrimonial,
        });

        setAiSuccessMsg('✨ AI দ্বারা প্রফেশনাল সামারি ও স্কিল সফলভাবে যুক্ত হয়েছে!');
        setTimeout(() => setAiSuccessMsg(null), 4000);
      }
    } catch (err) {
      console.error(err);
      alert('AI সাজেশন লোড করতে সমস্যা হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।');
    } finally {
      setIsAiLoading(false);
    }
  };

  return (
    <div className="space-y-5">
      {/* Photo Crop Modal */}
      {rawImageForCrop && (
        <PhotoCropModal
          imageSrc={rawImageForCrop}
          isOpen={isCropModalOpen}
          onClose={() => setIsCropModalOpen(false)}
          onCropComplete={handleCropComplete}
        />
      )}

      {/* AI Assistant Banner */}
      <div className="p-4 bg-gradient-to-r from-teal-50 via-teal-100/60 to-amber-50 rounded-xl border border-teal-200 shadow-2xs">
        <div className="flex items-start justify-between gap-3">
          <div className="space-y-1">
            <div className="flex items-center gap-1.5 font-bold text-xs text-teal-900">
              <Sparkles className="w-4 h-4 text-amber-500 animate-pulse" />
              <span>Gemini AI অ্যাসিস্ট্যান্ট</span>
            </div>
            <p className="text-[11px] text-teal-800 leading-snug">
              আপনার পদবী (Job Title) অনুযায়ী আকর্ষণীয় প্রফেশনাল সামারি ও সেরা স্কিলগুলো এক ক্লিকে সাজিয়ে নিন।
            </p>
          </div>

          <button
            type="button"
            onClick={handleGenerateAiSummaryAndSkills}
            disabled={isAiLoading}
            className="px-3 py-1.5 bg-teal-700 hover:bg-teal-800 text-white rounded-lg text-xs font-bold shadow-xs transition-all flex items-center gap-1.5 shrink-0 cursor-pointer disabled:opacity-60"
          >
            {isAiLoading ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                <span>তৈরি হচ্ছে...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>AI দিয়ে সাজান</span>
              </>
            )}
          </button>
        </div>

        {aiSuccessMsg && (
          <div className="mt-2 text-[11px] text-emerald-800 font-semibold flex items-center gap-1.5 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200 animate-in fade-in">
            <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
            <span>{aiSuccessMsg}</span>
          </div>
        )}
      </div>

      {/* Photo Uploader with 2-finger Crop & Zoom support */}
      <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
        <div className="flex items-center justify-between mb-3">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
            {t.photo} (ড্রাগ ও ২ ফিংগার জুম ক্রপ)
          </label>
          <button
            type="button"
            onClick={() => toggleVisibility('photo')}
            className="flex items-center gap-1.5 text-xs text-slate-600 hover:text-slate-900 transition-colors"
          >
            {data.visibility.photo ? (
              <>
                <Eye className="w-3.5 h-3.5 text-teal-600" />
                <span>ছবি দৃশ্যমান</span>
              </>
            ) : (
              <>
                <EyeOff className="w-3.5 h-3.5 text-slate-400" />
                <span className="text-slate-400">ছবি লুকানো</span>
              </>
            )}
          </button>
        </div>

        <div className="flex items-center gap-4 flex-wrap sm:flex-nowrap">
          <div className="relative w-20 h-20 rounded-full border-2 border-slate-300 overflow-hidden bg-white shadow-xs shrink-0 flex items-center justify-center">
            {data.personal.photoUrl ? (
              <img
                src={data.personal.photoUrl}
                alt="Profile"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            ) : (
              <Camera className="w-7 h-7 text-slate-400" />
            )}
          </div>

          <div className="flex flex-wrap gap-2 items-center">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handlePhotoUpload}
              accept="image/*"
              className="hidden"
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold shadow-xs transition-colors flex items-center gap-1"
            >
              <Camera className="w-3.5 h-3.5" />
              <span>{t.changePhoto}</span>
            </button>

            {data.personal.photoUrl && (
              <button
                type="button"
                onClick={() => {
                  setRawImageForCrop(data.personal.photoUrl);
                  setIsCropModalOpen(true);
                }}
                className="px-2.5 py-1.5 bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1"
                title="Crop / Resize photo"
              >
                <Crop className="w-3.5 h-3.5 text-teal-600" />
                <span>ক্রপ ও অ্যাডজাস্ট</span>
              </button>
            )}

            {data.personal.photoUrl && (
              <button
                type="button"
                onClick={() => updatePersonal('photoUrl', '')}
                className="px-2.5 py-1.5 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>{t.removePhoto}</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Info Inputs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            {t.fullName} *
          </label>
          <input
            type="text"
            value={data.personal.name}
            onChange={(e) => updatePersonal('name', e.target.value)}
            placeholder="MD. MINHAJUL ABEDIN / আপনার নাম"
            className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-teal-500 focus:border-teal-500 font-medium"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            {t.designation} *
          </label>
          <input
            type="text"
            value={data.personal.tagline}
            onChange={(e) => updatePersonal('tagline', e.target.value)}
            placeholder="GRAPHIC DESIGNER & CALLIGRAPHER"
            className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-teal-500 focus:border-teal-500 font-medium"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            {t.phone}
          </label>
          <input
            type="text"
            value={data.personal.phone}
            onChange={(e) => updatePersonal('phone', e.target.value)}
            placeholder="+880 1700-000000"
            className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-teal-500"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            {t.email}
          </label>
          <input
            type="email"
            value={data.personal.email}
            onChange={(e) => updatePersonal('email', e.target.value)}
            placeholder="designer.profile@example.com"
            className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-teal-500"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            ফেসবুক প্রোফাইল / পেজ (Facebook)
          </label>
          <input
            type="text"
            value={data.personal.facebook || ''}
            onChange={(e) => updatePersonal('facebook', e.target.value)}
            placeholder="fb.com/Md.MinhajulAbedin"
            className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-teal-500"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            ইনস্টাগ্রাম হ্যান্ডেল (Instagram)
          </label>
          <input
            type="text"
            value={data.personal.instagram || ''}
            onChange={(e) => updatePersonal('instagram', e.target.value)}
            placeholder="instagram.com/minhaj_calligraphy"
            className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-teal-500"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            {t.socialMedia} / পোর্টফোলিও বা অন্যান্য লিংক
          </label>
          <input
            type="text"
            value={data.personal.socialMedia}
            onChange={(e) => updatePersonal('socialMedia', e.target.value)}
            placeholder="behance.net/username | github.com/username | linkedin.com/in/username"
            className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-teal-500"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            {t.currentAddress}
          </label>
          <textarea
            rows={2}
            value={data.personal.currentAddress}
            onChange={(e) => updatePersonal('currentAddress', e.target.value)}
            placeholder="দেওয়ানহাট, চট্টগ্রাম, বাংলাদেশ।"
            className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-teal-500"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            {t.permanentAddress}
          </label>
          <textarea
            rows={2}
            value={data.personal.permanentAddress}
            onChange={(e) => updatePersonal('permanentAddress', e.target.value)}
            placeholder="রাঙ্গামাটি, চট্টগ্রাম, বাংলাদেশ।"
            className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-teal-500"
          />
        </div>
      </div>
    </div>
  );
};
