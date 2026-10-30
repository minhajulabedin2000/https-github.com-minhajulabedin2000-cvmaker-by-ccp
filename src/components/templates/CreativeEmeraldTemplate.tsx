import React from 'react';
import { ResumeData } from '../../types/resume';
import { Phone, Mail, Globe, Sparkles, Heart } from 'lucide-react';

interface TemplateProps {
  data: ResumeData;
}

export const CreativeEmeraldTemplate: React.FC<TemplateProps> = ({ data }) => {
  const {
    personal,
    profile,
    experience,
    education,
    skills,
    family,
    matrimonial,
    languages,
    customSections = [],
    sectionTitles = {},
    visibility,
    theme,
    documentLanguage = 'bn',
  } = data;

  const isBn = documentLanguage === 'bn';
  const emeraldColor = theme.primaryColor || '#065f46';

  return (
    <div
      id="cv-page"
      className="a4-page relative text-slate-800 bg-emerald-50/30 flex flex-col justify-between shadow-2xl print-page overflow-hidden"
      style={{
        fontFamily: isBn ? "'Noto Sans Bengali', 'Hind Siliguri', 'Plus Jakarta Sans', sans-serif" : "'Plus Jakarta Sans', sans-serif",
        minHeight: '297mm',
        height: '297mm',
        width: '210mm',
      }}
    >
      <div>
        {/* Top Emerald Header Banner */}
        <div className="p-6 text-white relative" style={{ backgroundColor: emeraldColor }}>
          <div className="flex justify-between items-center gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-1.5 mb-1">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span className="text-[10px] uppercase tracking-widest text-emerald-200 font-bold">
                  {isBn ? 'জীবনবৃত্তান্ত ও বায়োডাটা' : 'Curriculum Vitae & Bio-Data'}
                </span>
              </div>
              <h1 className="text-2xl font-extrabold uppercase tracking-tight text-white">
                {personal.name || 'YOUR NAME'}
              </h1>
              <p className="text-xs font-semibold tracking-wider uppercase mt-0.5 text-amber-300">
                {personal.tagline}
              </p>

              <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-emerald-100 mt-2">
                {personal.phone && (
                  <span className="flex items-center gap-1">
                    <Phone className="w-3 h-3 text-amber-300" /> {personal.phone}
                  </span>
                )}
                {personal.email && (
                  <span className="flex items-center gap-1">
                    <Mail className="w-3 h-3 text-amber-300" /> {personal.email}
                  </span>
                )}
                {personal.facebook && (
                  <span className="flex items-center gap-1">
                    <svg className="w-3 h-3 fill-amber-300" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                    {personal.facebook.replace(/^https?:\/\/(www\.)?/, '')}
                  </span>
                )}
                {personal.instagram && (
                  <span className="flex items-center gap-1">
                    <svg className="w-3 h-3 fill-amber-300" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                    {personal.instagram.replace(/^https?:\/\/(www\.)?/, '')}
                  </span>
                )}
                {personal.socialMedia && (
                  <span className="flex items-center gap-1">
                    <Globe className="w-3 h-3 text-amber-300" /> {personal.socialMedia}
                  </span>
                )}
              </div>
            </div>

            {visibility.photo && personal.photoUrl && (
              <div className="w-24 h-24 rounded-2xl overflow-hidden border-2 border-white/30 shadow-lg shrink-0">
                <img
                  src={personal.photoUrl}
                  alt={personal.name}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            )}
          </div>
        </div>

        {/* Content Body Grid */}
        <div className="p-6 grid grid-cols-12 gap-5">
          {/* Main Column (7 cols) */}
          <div className="col-span-7 space-y-3.5">
            {visibility.professionalProfile && (
              <section className="bg-white p-3.5 rounded-xl shadow-xs border border-emerald-900/10">
                <h2 className="text-xs font-black uppercase tracking-wider text-emerald-900 mb-1.5 border-b border-emerald-100 pb-1">
                  {sectionTitles.profile || (isBn ? 'পেশাদার প্রোফাইল ও উদ্যোগ' : 'Professional Profile & Ventures')}
                </h2>
                {profile.profession && (
                  <div className="text-[11px] font-bold text-slate-800 mb-0.5">
                    {isBn ? 'পেশা:' : 'Profession:'} <span className="text-emerald-700">{profile.profession}</span>
                  </div>
                )}
                {profile.summary && (
                  <p className="text-[10.5px] text-slate-600 leading-relaxed mb-2">
                    {profile.summary}
                  </p>
                )}
                {profile.businessVentures.map((v) => (
                  <div key={v.id} className="text-[10.5px] mb-1.5 pl-2 border-l-2 border-amber-500">
                    <div className="font-bold text-slate-800">
                      {v.name} <span className="font-medium text-emerald-700 italic">{v.role}</span>
                    </div>
                    {v.details && <p className="text-[10px] text-slate-600">{v.details}</p>}
                  </div>
                ))}
              </section>
            )}

            {visibility.organizationalExperience && experience.length > 0 && (
              <section className="bg-white p-3.5 rounded-xl shadow-xs border border-emerald-900/10">
                <h2 className="text-xs font-black uppercase tracking-wider text-emerald-900 mb-1.5 border-b border-emerald-100 pb-1">
                  {sectionTitles.experience || (isBn ? 'সাংগঠনিক অভিজ্ঞতা' : 'Organizational Experience')}
                </h2>
                <div className="space-y-2">
                  {experience.map((exp) => (
                    <div key={exp.id} className="text-xs">
                      <div className="flex justify-between font-bold text-slate-900 text-[11px]">
                        <span>{exp.role}</span>
                        <span className="text-[10px] text-amber-700 font-semibold">{exp.period}</span>
                      </div>
                      <div className="text-slate-700 text-[10.5px]">{exp.organization}</div>
                      {exp.details && <p className="text-[9.5px] text-slate-500 mt-0.5">{exp.details}</p>}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {visibility.education && education.length > 0 && (
              <section className="bg-white p-3.5 rounded-xl shadow-xs border border-emerald-900/10">
                <h2 className="text-xs font-black uppercase tracking-wider text-emerald-900 mb-1.5 border-b border-emerald-100 pb-1">
                  {sectionTitles.education || (isBn ? 'শিক্ষাগত যোগ্যতা' : 'Education')}
                </h2>
                <div className="space-y-1.5">
                  {education.map((edu) => (
                    <div key={edu.id} className="text-xs">
                      <div className="font-bold text-slate-800 text-[11px]">
                        {edu.degree} <span className="text-slate-500 font-medium text-[10px]">({edu.sessionOrYear})</span>
                      </div>
                      <div className="text-[10.5px] text-slate-600">{edu.institution}</div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Custom Sections */}
            {visibility.customSections && customSections.length > 0 && (
              <div className="space-y-3">
                {customSections.map((cs) => (
                  <section key={cs.id} className="bg-white p-3.5 rounded-xl shadow-xs border border-emerald-900/10">
                    <h2 className="text-xs font-black uppercase tracking-wider text-emerald-900 mb-1.5 border-b border-emerald-100 pb-1">
                      {cs.title}
                    </h2>
                    <div className="space-y-1.5">
                      {cs.items.map((item) => (
                        <div key={item.id} className="text-xs">
                          <div className="font-bold text-slate-800 text-[11px]">
                            {item.title} {item.period && <span className="text-slate-500 font-normal">({item.period})</span>}
                          </div>
                          {item.details && <p className="text-[10px] text-slate-600">{item.details}</p>}
                        </div>
                      ))}
                    </div>
                  </section>
                ))}
              </div>
            )}
          </div>

          {/* Sidebar Column (5 cols) */}
          <div className="col-span-5 space-y-3.5">
            {/* Skills */}
            {visibility.skills && skills.length > 0 && (
              <section className="bg-white p-3.5 rounded-xl shadow-xs border border-emerald-900/10">
                <h2 className="text-xs font-black uppercase tracking-wider text-emerald-900 mb-1.5 border-b border-emerald-100 pb-1">
                  {sectionTitles.skills || (isBn ? 'দক্ষতাসমূহ' : 'Skills & Expertise')}
                </h2>
                <div className="space-y-1.5">
                  {skills.map((s) => (
                    <div key={s.id} className="text-xs">
                      <div className="flex justify-between text-[10.5px] font-semibold text-slate-800 mb-0.5">
                        <span>{s.name}</span>
                        {s.level && <span className="text-emerald-700 font-mono text-[9.5px]">{s.level}%</span>}
                      </div>
                      {s.level && (
                        <div className="w-full bg-slate-100 rounded-full h-1 overflow-hidden">
                          <div
                            className="h-full rounded-full bg-gradient-to-r from-emerald-600 to-amber-500"
                            style={{ width: `${s.level}%` }}
                          />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Personal Particulars */}
            {visibility.personalInfo && (
              <section className="bg-emerald-900 text-white p-3.5 rounded-xl shadow-xs text-xs space-y-1">
                <h2 className="font-bold uppercase tracking-wider text-[10.5px] text-amber-300 pb-1 border-b border-emerald-700">
                  {isBn ? 'ব্যক্তিগত তথ্য' : 'Personal Particulars'}
                </h2>
                {personal.dateOfBirth && <div className="text-[10px]"><span className="text-emerald-300">{isBn ? 'জন্ম:' : 'DOB:'}</span> {personal.dateOfBirth}</div>}
                {personal.age && <div className="text-[10px]"><span className="text-emerald-300">{isBn ? 'বয়স:' : 'Age:'}</span> {personal.age}</div>}
                {personal.height && <div className="text-[10px]"><span className="text-emerald-300">{isBn ? 'উচ্চতা:' : 'Height:'}</span> {personal.height}</div>}
                {personal.bloodGroup && <div className="text-[10px]"><span className="text-emerald-300">{isBn ? 'রক্তের গ্রুপ:' : 'Blood Group:'}</span> <span className="font-bold text-amber-300">{personal.bloodGroup}</span></div>}
                {personal.maritalStatus && <div className="text-[10px]"><span className="text-emerald-300">{isBn ? 'অবস্থা:' : 'Status:'}</span> {personal.maritalStatus}</div>}
              </section>
            )}

            {/* Matrimonial expectations if active */}
            {visibility.matrimonialDetails && matrimonial && (
              <section className="bg-amber-50/80 p-3 rounded-xl border border-amber-200 text-xs space-y-1">
                <div className="flex items-center gap-1 font-bold text-emerald-900 pb-1 border-b border-amber-200 text-[10.5px]">
                  <Heart className="w-3.5 h-3.5 text-rose-600" />
                  <span>{isBn ? 'জীবনসঙ্গী যেমন চাই' : 'Partner Expectations'}</span>
                </div>
                {matrimonial.partnerExpectations.ageRange && (
                  <div className="text-[10px]"><span className="text-slate-500">{isBn ? 'বয়স:' : 'Age:'}</span> {matrimonial.partnerExpectations.ageRange}</div>
                )}
                {matrimonial.partnerExpectations.education && (
                  <div className="text-[10px]"><span className="text-slate-500">{isBn ? 'শিক্ষা:' : 'Edu:'}</span> {matrimonial.partnerExpectations.education}</div>
                )}
                {matrimonial.partnerExpectations.religiousPractices && (
                  <p className="text-[9.5px] text-slate-700 leading-snug">{matrimonial.partnerExpectations.religiousPractices}</p>
                )}
              </section>
            )}

            {/* Family Details */}
            {visibility.familyBackground && (family.fatherName || family.motherName) && (
              <section className="bg-white p-3.5 rounded-xl shadow-xs border border-emerald-900/10 text-xs space-y-1">
                <h2 className="text-xs font-black uppercase tracking-wider text-emerald-900 mb-1 border-b border-emerald-100 pb-0.5">
                  {isBn ? 'পারিবারিক পটভূমি' : 'Family Background'}
                </h2>
                {family.fatherName && (
                  <div className="text-[10px]">
                    <span className="font-semibold text-slate-800">{isBn ? 'পিতা:' : 'Father:'}</span> {family.fatherName}
                  </div>
                )}
                {family.motherName && (
                  <div className="text-[10px]">
                    <span className="font-semibold text-slate-800">{isBn ? 'মাতা:' : 'Mother:'}</span> {family.motherName}
                  </div>
                )}
                {family.siblings && <div className="text-[10px] text-slate-600">{isBn ? 'ভাই-বোন:' : 'Siblings:'} {family.siblings}</div>}
              </section>
            )}
          </div>
        </div>
      </div>

      <div className="p-2 text-center text-[9px] text-emerald-800/60 border-t border-emerald-100">
        Created using BioCraft Studio
      </div>
    </div>
  );
};
