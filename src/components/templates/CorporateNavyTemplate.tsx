import React from 'react';
import { ResumeData } from '../../types/resume';
import { Phone, Mail, Globe, MapPin, Briefcase, GraduationCap, Award, User, Heart } from 'lucide-react';

interface TemplateProps {
  data: ResumeData;
}

export const CorporateNavyTemplate: React.FC<TemplateProps> = ({ data }) => {
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
  const navyColor = theme.primaryColor || '#1e3a8a';

  return (
    <div
      id="cv-page"
      className="a4-page relative text-slate-800 bg-white p-7 flex flex-col justify-between shadow-2xl print-page"
      style={{
        fontFamily: isBn ? "'Noto Sans Bengali', 'Hind Siliguri', 'Plus Jakarta Sans', sans-serif" : "'Plus Jakarta Sans', sans-serif",
        minHeight: '297mm',
        height: '297mm',
        width: '210mm',
      }}
    >
      <div>
        {/* Top Header Bar */}
        <header className="border-b-2 pb-4 flex justify-between items-center gap-6" style={{ borderColor: navyColor }}>
          <div className="flex-1">
            <h1 className="text-2xl font-extrabold tracking-tight uppercase" style={{ color: navyColor }}>
              {personal.name || 'YOUR NAME'}
            </h1>
            <p className="text-xs font-semibold tracking-wide text-slate-600 mt-1 uppercase">
              {personal.tagline || 'PROFESSIONAL TITLE'}
            </p>

            {/* Quick Contact Bar with Facebook & Instagram */}
            <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-600 mt-2.5">
              {personal.phone && (
                <span className="flex items-center gap-1 font-medium">
                  <Phone className="w-3 h-3 text-blue-700" />
                  {personal.phone}
                </span>
              )}
              {personal.email && (
                <span className="flex items-center gap-1">
                  <Mail className="w-3 h-3 text-blue-700" />
                  {personal.email}
                </span>
              )}
              {personal.facebook && (
                <span className="flex items-center gap-1">
                  <svg className="w-3 h-3 fill-blue-700" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                  {personal.facebook.replace(/^https?:\/\/(www\.)?/, '')}
                </span>
              )}
              {personal.instagram && (
                <span className="flex items-center gap-1">
                  <svg className="w-3 h-3 fill-pink-600" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                  {personal.instagram.replace(/^https?:\/\/(www\.)?/, '')}
                </span>
              )}
              {personal.socialMedia && (
                <span className="flex items-center gap-1">
                  <Globe className="w-3 h-3 text-blue-700" />
                  {personal.socialMedia}
                </span>
              )}
              {personal.currentAddress && (
                <span className="flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-blue-700" />
                  {personal.currentAddress}
                </span>
              )}
            </div>
          </div>

          {visibility.photo && personal.photoUrl && (
            <div className="w-24 h-24 rounded-lg overflow-hidden border-2 border-slate-200 shadow-xs shrink-0">
              <img
                src={personal.photoUrl}
                alt={personal.name}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          )}
        </header>

        {/* 2-Column Content Layout */}
        <div className="grid grid-cols-12 gap-5 mt-4">
          {/* Main Column (8 cols) */}
          <div className="col-span-8 space-y-3.5">
            {/* Professional Summary */}
            {visibility.professionalProfile && (
              <section>
                <div className="flex items-center gap-1.5 mb-1.5 pb-1 border-b border-slate-200">
                  <Briefcase className="w-3.5 h-3.5" style={{ color: navyColor }} />
                  <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                    {sectionTitles.profile || (isBn ? 'পেশাদার প্রোফাইল ও উদ্যোগ' : 'Professional Experience & Profile')}
                  </h2>
                </div>
                {profile.profession && (
                  <p className="text-xs font-semibold text-slate-800 mb-1">
                    {isBn ? 'পেশা:' : 'Profession:'} <span className="text-slate-600 font-normal">{profile.profession}</span>
                  </p>
                )}
                {profile.summary && (
                  <p className="text-[11px] text-slate-600 leading-relaxed mb-2">
                    {profile.summary}
                  </p>
                )}
                {profile.businessVentures.length > 0 && (
                  <div className="space-y-1.5 mb-2">
                    {profile.businessVentures.map((v) => (
                      <div key={v.id} className="text-xs border-l-2 pl-2" style={{ borderColor: navyColor }}>
                        <div className="font-bold text-slate-900 flex justify-between text-[11px]">
                          <span>{v.name}</span>
                          <span className="text-slate-500 font-medium italic">{v.role}</span>
                        </div>
                        {v.details && <p className="text-[10px] text-slate-600">{v.details}</p>}
                      </div>
                    ))}
                  </div>
                )}
              </section>
            )}

            {/* Organizational Experience */}
            {visibility.organizationalExperience && experience.length > 0 && (
              <section>
                <div className="flex items-center gap-1.5 mb-1.5 pb-1 border-b border-slate-200">
                  <Award className="w-3.5 h-3.5" style={{ color: navyColor }} />
                  <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                    {sectionTitles.experience || (isBn ? 'সাংগঠনিক অভিজ্ঞতা' : 'Organizational Experience')}
                  </h2>
                </div>
                <div className="space-y-2">
                  {experience.map((exp) => (
                    <div key={exp.id} className="text-xs">
                      <div className="flex justify-between font-bold text-slate-900 text-[11px]">
                        <span>{exp.role}</span>
                        <span className="text-[10px] font-semibold text-slate-500">{exp.period}</span>
                      </div>
                      <div className="text-slate-700 font-medium text-[11px]">{exp.organization}</div>
                      {exp.details && <p className="text-[10px] text-slate-600 mt-0.5">{exp.details}</p>}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Education */}
            {visibility.education && education.length > 0 && (
              <section>
                <div className="flex items-center gap-1.5 mb-1.5 pb-1 border-b border-slate-200">
                  <GraduationCap className="w-3.5 h-3.5" style={{ color: navyColor }} />
                  <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                    {sectionTitles.education || (isBn ? 'শিক্ষাগত যোগ্যতা' : 'Educational Qualifications')}
                  </h2>
                </div>
                <div className="space-y-2">
                  {education.map((edu) => (
                    <div key={edu.id} className="text-xs">
                      <div className="flex justify-between font-bold text-slate-900 text-[11px]">
                        <span>{edu.degree}</span>
                        <span className="text-[10px] text-slate-500 font-medium">{edu.sessionOrYear}</span>
                      </div>
                      <div className="text-slate-700 text-[11px]">{edu.institution}</div>
                      {edu.grade && <div className="text-[10px] text-slate-500">{edu.grade}</div>}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Custom Sections */}
            {visibility.customSections && customSections.length > 0 && (
              <div className="space-y-3">
                {customSections.map((cs) => (
                  <section key={cs.id}>
                    <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 pb-1 mb-1.5 border-b border-slate-200" style={{ color: navyColor }}>
                      {cs.title}
                    </h2>
                    <div className="space-y-1.5">
                      {cs.items.map((item) => (
                        <div key={item.id} className="text-xs">
                          <div className="font-bold text-slate-800 text-[11px]">
                            {item.title} {item.period && <span className="font-normal text-slate-500">({item.period})</span>}
                          </div>
                          {item.subtitle && <div className="text-[10px] text-slate-600">{item.subtitle}</div>}
                          {item.details && <p className="text-[10px] text-slate-600">{item.details}</p>}
                        </div>
                      ))}
                    </div>
                  </section>
                ))}
              </div>
            )}
          </div>

          {/* Sidebar Column (4 cols) */}
          <div className="col-span-4 space-y-3.5 border-l border-slate-200 pl-4">
            {/* Skills */}
            {visibility.skills && skills.length > 0 && (
              <section>
                <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 pb-1 mb-1.5 border-b border-slate-200" style={{ color: navyColor }}>
                  {sectionTitles.skills || (isBn ? 'দক্ষতাসমূহ' : 'Core Skills')}
                </h2>
                <div className="space-y-1">
                  {skills.map((s) => (
                    <div key={s.id} className="text-xs">
                      <div className="flex justify-between text-[10.5px] font-medium text-slate-700 mb-0.5">
                        <span>{s.name}</span>
                        {s.level && <span className="text-slate-400 font-mono text-[9.5px]">{s.level}%</span>}
                      </div>
                      {s.level && (
                        <div className="w-full bg-slate-100 rounded-full h-1 overflow-hidden">
                          <div
                            className="h-full rounded-full"
                            style={{ width: `${s.level}%`, backgroundColor: navyColor }}
                          />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Personal Details */}
            {visibility.personalInfo && (
              <section className="bg-slate-50 p-2.5 rounded-lg text-xs space-y-1">
                <div className="flex items-center gap-1 font-bold uppercase tracking-wider text-[10.5px] text-slate-800 pb-1 border-b border-slate-200">
                  <User className="w-3 h-3" style={{ color: navyColor }} />
                  {isBn ? 'ব্যক্তিগত তথ্য' : 'Particulars'}
                </div>
                {personal.dateOfBirth && <div className="text-[10px]"><span className="text-slate-500">{isBn ? 'জন্ম:' : 'DOB:'}</span> <span className="font-medium text-slate-800">{personal.dateOfBirth}</span></div>}
                {personal.age && <div className="text-[10px]"><span className="text-slate-500">{isBn ? 'বয়স:' : 'Age:'}</span> <span className="font-medium text-slate-800">{personal.age}</span></div>}
                {personal.height && <div className="text-[10px]"><span className="text-slate-500">{isBn ? 'উচ্চতা:' : 'Height:'}</span> <span className="font-medium text-slate-800">{personal.height}</span></div>}
                {personal.bloodGroup && <div className="text-[10px]"><span className="text-slate-500">{isBn ? 'রক্তের গ্রুপ:' : 'Blood:'}</span> <span className="font-bold text-red-600">{personal.bloodGroup}</span></div>}
                {personal.maritalStatus && <div className="text-[10px]"><span className="text-slate-500">{isBn ? 'অবস্থা:' : 'Status:'}</span> <span className="font-medium text-slate-800">{personal.maritalStatus}</span></div>}
              </section>
            )}

            {/* Matrimonial expectations in sidebar if active */}
            {visibility.matrimonialDetails && matrimonial && (
              <section className="bg-amber-50 p-2.5 rounded-lg text-xs space-y-1 border border-amber-200">
                <div className="flex items-center gap-1 font-bold text-amber-900 pb-1 border-b border-amber-200 text-[10.5px]">
                  <Heart className="w-3 h-3 text-rose-600" />
                  <span>{isBn ? 'পাত্র/পাত্রীর প্রত্যাশা' : 'Expectations'}</span>
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

            {/* Family Background */}
            {visibility.familyBackground && (family.fatherName || family.motherName) && (
              <section className="text-xs space-y-1">
                <h2 className="font-bold uppercase tracking-wider text-[10.5px] text-slate-900 pb-1 border-b border-slate-200" style={{ color: navyColor }}>
                  {isBn ? 'পারিবারিক পটভূমি' : 'Family Details'}
                </h2>
                {family.fatherName && (
                  <div className="text-[10px]">
                    <div className="font-semibold text-slate-800">{isBn ? 'পিতা:' : 'Father:'} {family.fatherName}</div>
                    {family.fatherOccupation && <div className="text-slate-500 text-[9.5px]">{family.fatherOccupation}</div>}
                  </div>
                )}
                {family.motherName && (
                  <div className="text-[10px]">
                    <div className="font-semibold text-slate-800">{isBn ? 'মাতা:' : 'Mother:'} {family.motherName}</div>
                  </div>
                )}
                {family.siblings && <div className="text-[10px] text-slate-600">{isBn ? 'ভাই-বোন:' : 'Siblings:'} {family.siblings}</div>}
              </section>
            )}

            {/* Languages */}
            {visibility.languages && languages.length > 0 && (
              <section>
                <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 pb-1 mb-1 border-b border-slate-200" style={{ color: navyColor }}>
                  {isBn ? 'ভাষাজ্ঞান' : 'Languages'}
                </h2>
                <div className="space-y-0.5 text-xs">
                  {languages.map((l) => (
                    <div key={l.id} className="flex justify-between text-[10px]">
                      <span className="font-medium text-slate-800">{l.name}</span>
                      <span className="text-slate-500">{l.proficiency}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-slate-200 pt-1.5 text-center text-[9.5px] text-slate-400">
        Generated with BioCraft • {isBn ? 'যাচাইকৃত বায়োডাটা ও কারিকুলাম ভিটা' : 'Verified Curriculum Vitae & Bio-Data'}
      </footer>
    </div>
  );
};
