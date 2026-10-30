import React from 'react';
import { ResumeData } from '../../types/resume';
import { Phone, Mail, Globe, MapPin, Heart, Sparkles, Award, ShieldCheck, Briefcase, GraduationCap, CheckCircle2 } from 'lucide-react';

interface TemplateProps {
  data: ResumeData;
}

export const EliteSapphireTemplate: React.FC<TemplateProps> = ({ data }) => {
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
  const primaryColor = theme.primaryColor || '#1e3a8a'; // Deep Sapphire Blue
  const accentColor = theme.secondaryColor || '#0284c7'; // Vibrant Sapphire Cyan

  const labels = {
    contactMe: sectionTitles.contact || (isBn ? 'যোগাযোগ' : 'CONTACT INFO'),
    personalInfo: sectionTitles.personalInfo || (isBn ? 'ব্যক্তিগত তথ্য' : 'PERSONAL PARTICULARS'),
    dob: isBn ? 'জন্ম তারিখ' : 'Date of Birth',
    age: isBn ? 'বয়স' : 'Age',
    height: isBn ? 'উচ্চতা' : 'Height',
    weight: isBn ? 'ওজন' : 'Weight',
    complexion: isBn ? 'গায়ের রঙ' : 'Complexion',
    bloodGroup: isBn ? 'রক্তের গ্রুপ' : 'Blood Group',
    maritalStatus: isBn ? 'বৈবাহিক অবস্থা' : 'Marital Status',
    religion: isBn ? 'ধর্ম' : 'Religion',
    currentAddr: isBn ? 'বর্তমান ঠিকানা' : 'Current Address',
    permanentAddr: isBn ? 'স্থায়ী ঠিকানা' : 'Permanent Address',
    skills: sectionTitles.skills || (isBn ? 'দক্ষতা ও পারদর্শিতা' : 'EXPERTISE & SKILLS'),
    languages: sectionTitles.languages || (isBn ? 'ভাষাগত দক্ষতা' : 'LANGUAGES'),
    profile: sectionTitles.profile || (isBn ? 'পেশাদার প্রোফাইল ও উদ্যোগ' : 'PROFESSIONAL SUMMARY & VENTURES'),
    profession: isBn ? 'পেশা:' : 'Profession:',
    ventures: isBn ? 'ব্যবসা ও উদ্যোগসমূহ:' : 'Key Ventures & Studios:',
    experience: sectionTitles.experience || (isBn ? 'কাজের অভিজ্ঞতা ও দায়িত্ব' : 'ORGANIZATIONAL EXPERIENCE'),
    education: sectionTitles.education || (isBn ? 'শিক্ষাগত যোগ্যতা' : 'EDUCATION & QUALIFICATIONS'),
    family: sectionTitles.family || (isBn ? 'পারিবারিক পরিচয়' : 'FAMILY DETAILS'),
    father: isBn ? 'পিতা:' : 'Father:',
    fatherOcc: isBn ? 'পিতার পেশা:' : "Father's Occupation:",
    mother: isBn ? 'মাতা:' : 'Mother:',
    motherOcc: isBn ? 'মাতার পেশা:' : "Mother's Occupation:",
    siblings: isBn ? 'ভাই-বোন:' : 'Siblings:',
    posInFamily: isBn ? 'পরিবারে অবস্থান:' : 'Position in Family:',
    sistersMarital: isBn ? 'বোনদের অবস্থা:' : "Sisters' Status:",
    matrimonial: sectionTitles.matrimonial || (isBn ? 'পাত্র / পাত্রীর প্রত্যাশা' : 'PARTNER EXPECTATIONS'),
    expectedAge: isBn ? 'প্রত্যাশিত বয়স:' : 'Expected Age:',
    expectedHeight: isBn ? 'প্রত্যাশিত উচ্চতা:' : 'Expected Height:',
    expectedEdu: isBn ? 'প্রত্যাশিত শিক্ষা:' : 'Expected Education:',
    guardianContact: isBn ? 'অভিভাবকের যোগাযোগ:' : 'Guardian Contact:',
  };

  return (
    <div
      id="cv-page"
      className="a4-page relative text-slate-800 bg-[#f8fafc] flex flex-col justify-between shadow-2xl overflow-hidden print-page"
      style={{
        fontFamily: isBn ? "'Noto Sans Bengali', 'Hind Siliguri', 'Plus Jakarta Sans', sans-serif" : "'Plus Jakarta Sans', sans-serif",
        minHeight: '297mm',
        height: '297mm',
        width: '210mm',
      }}
    >
      <div>
        {/* Top Sapphire Banner Lockup */}
        <div className="bg-gradient-to-r from-[#0f172a] via-[#1e3a8a] to-[#0369a1] text-white p-6 relative overflow-hidden shadow-lg border-b-4 border-[#38bdf8]">
          {/* Subtle geometric circles */}
          <div className="absolute right-0 top-0 w-64 h-64 bg-white/5 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute left-1/3 -top-10 w-40 h-40 bg-sky-400/10 rounded-full blur-xl pointer-events-none" />

          <div className="flex items-center justify-between gap-6 relative z-10">
            {/* Left Info */}
            <div className="flex-1">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-sky-500/20 border border-sky-400/30 text-sky-300 text-[10px] font-mono font-bold uppercase tracking-wider mb-2">
                <Sparkles className="w-3 h-3 text-sky-400" />
                Elite Sapphire Bio-Data
              </div>
              <h1 className="text-3xl font-black uppercase tracking-tight text-white leading-tight font-['Noto_Sans_Bengali','Plus_Jakarta_Sans']">
                {personal.name || 'YOUR NAME'}
              </h1>
              {personal.tagline && (
                <p className="text-xs font-bold tracking-wider uppercase mt-1 text-sky-300">
                  {personal.tagline}
                </p>
              )}

              {/* Quick Contacts Bar */}
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] text-sky-100 mt-3 pt-2.5 border-t border-sky-500/30">
                {personal.phone && (
                  <span className="flex items-center gap-1.5 font-semibold text-white">
                    <span className="p-0.5 rounded-full bg-sky-500/30">
                      <Phone className="w-2.5 h-2.5 text-sky-300" />
                    </span>
                    {personal.phone}
                  </span>
                )}
                {personal.email && (
                  <span className="flex items-center gap-1.5">
                    <span className="p-0.5 rounded-full bg-sky-500/30">
                      <Mail className="w-2.5 h-2.5 text-sky-300" />
                    </span>
                    {personal.email}
                  </span>
                )}
                {personal.facebook && (
                  <span className="flex items-center gap-1.5">
                    <svg className="w-3 h-3 fill-sky-300" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                    {personal.facebook.replace(/^https?:\/\/(www\.)?/, '')}
                  </span>
                )}
                {personal.instagram && (
                  <span className="flex items-center gap-1.5">
                    <svg className="w-3 h-3 fill-sky-300" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                    {personal.instagram.replace(/^https?:\/\/(www\.)?/, '')}
                  </span>
                )}
              </div>
            </div>

            {/* Profile Photo (Prominent Octagon / Squircle with Cyan Rim) */}
            {visibility.photo && personal.photoUrl && (
              <div className="relative w-36 h-36 rounded-2xl overflow-hidden border-2 border-sky-400 shadow-2xl shrink-0 p-1 bg-gradient-to-tr from-sky-600 via-blue-500 to-indigo-400">
                <img
                  src={personal.photoUrl}
                  alt={personal.name}
                  className="w-full h-full object-cover rounded-xl"
                  referrerPolicy="no-referrer"
                />
              </div>
            )}
          </div>
        </div>

        {/* 2-Column Balanced Layout */}
        <div className="p-6 grid grid-cols-12 gap-6">
          {/* Main Column (7 cols) */}
          <div className="col-span-7 space-y-4">
            {/* Professional Profile */}
            {visibility.professionalProfile && (
              <section className="bg-white p-4 rounded-xl border border-sky-100 shadow-xs">
                <div className="border-b-2 border-sky-500 pb-1 mb-2 flex items-center justify-between">
                  <h2 className="text-xs font-black uppercase tracking-wider text-slate-900 flex items-center gap-1.5">
                    <Briefcase className="w-3.5 h-3.5 text-sky-600" />
                    <span>{labels.profile}</span>
                  </h2>
                </div>

                {profile.profession && (
                  <div className="text-[11px] font-bold text-slate-800 mb-1">
                    {labels.profession} <span className="text-sky-700">{profile.profession}</span>
                  </div>
                )}
                {profile.summary && (
                  <p className="text-[10.5px] text-slate-600 leading-relaxed mb-2.5">
                    {profile.summary}
                  </p>
                )}

                {profile.businessVentures.length > 0 && (
                  <div className="space-y-1.5">
                    {profile.businessVentures.map((v) => (
                      <div key={v.id} className="text-[10.5px] border-l-2 border-sky-500 pl-2 py-0.5">
                        <div className="font-bold text-slate-900 flex justify-between">
                          <span>{v.name}</span>
                          <span className="text-sky-700 font-medium italic">{v.role}</span>
                        </div>
                        {v.details && <p className="text-[10px] text-slate-600 mt-0.5">{v.details}</p>}
                      </div>
                    ))}
                  </div>
                )}
              </section>
            )}

            {/* Organizational Experience */}
            {visibility.organizationalExperience && experience.length > 0 && (
              <section className="bg-white p-4 rounded-xl border border-sky-100 shadow-xs">
                <div className="border-b-2 border-sky-500 pb-1 mb-2">
                  <h2 className="text-xs font-black uppercase tracking-wider text-slate-900 flex items-center gap-1.5">
                    <Award className="w-3.5 h-3.5 text-sky-600" />
                    <span>{labels.experience}</span>
                  </h2>
                </div>
                <div className="space-y-2.5">
                  {experience.map((exp) => (
                    <div key={exp.id} className="text-xs">
                      <div className="flex justify-between font-bold text-slate-900 text-[11px]">
                        <span>{exp.role}</span>
                        <span className="text-[10px] font-semibold text-sky-700 bg-sky-50 px-2 py-0.5 rounded border border-sky-200">
                          {exp.period}
                        </span>
                      </div>
                      <div className="text-slate-700 font-medium text-[10.5px] mt-0.5">{exp.organization}</div>
                      {exp.details && <p className="text-[10px] text-slate-600 mt-0.5 leading-snug">{exp.details}</p>}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Education */}
            {visibility.education && education.length > 0 && (
              <section className="bg-white p-4 rounded-xl border border-sky-100 shadow-xs">
                <div className="border-b-2 border-sky-500 pb-1 mb-2">
                  <h2 className="text-xs font-black uppercase tracking-wider text-slate-900 flex items-center gap-1.5">
                    <GraduationCap className="w-3.5 h-3.5 text-sky-600" />
                    <span>{labels.education}</span>
                  </h2>
                </div>
                <div className="space-y-2">
                  {education.map((edu) => (
                    <div key={edu.id} className="text-xs">
                      <div className="flex justify-between font-bold text-slate-900 text-[11px]">
                        <span>{edu.degree}</span>
                        <span className="text-[10px] text-slate-500 font-medium">{edu.sessionOrYear}</span>
                      </div>
                      <div className="text-slate-700 text-[10.5px]">{edu.institution}</div>
                      {edu.grade && <div className="text-[9.5px] text-slate-500">{edu.grade}</div>}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Custom Sections */}
            {visibility.customSections && customSections.length > 0 && (
              <div className="space-y-3">
                {customSections.map((cs) => (
                  <section key={cs.id} className="bg-white p-4 rounded-xl border border-sky-100 shadow-xs">
                    <h2 className="text-xs font-black uppercase tracking-wider text-slate-900 pb-1 mb-2 border-b-2 border-sky-500">
                      {cs.title}
                    </h2>
                    <div className="space-y-1.5">
                      {cs.items.map((item) => (
                        <div key={item.id} className="text-xs">
                          <div className="font-bold text-slate-800 text-[11px]">
                            {item.title} {item.period && <span className="font-normal text-slate-500">({item.period})</span>}
                          </div>
                          {item.details && <p className="text-[10px] text-slate-600 mt-0.5">{item.details}</p>}
                        </div>
                      ))}
                    </div>
                  </section>
                ))}
              </div>
            )}
          </div>

          {/* Sidebar Column (5 cols) */}
          <div className="col-span-5 space-y-4">
            {/* Skills */}
            {visibility.skills && skills.length > 0 && (
              <section className="bg-white p-4 rounded-xl border border-sky-100 shadow-xs">
                <h2 className="text-xs font-black uppercase tracking-wider text-slate-900 pb-1 mb-2 border-b-2 border-sky-500">
                  {labels.skills}
                </h2>
                <div className="space-y-1.5">
                  {skills.map((s) => (
                    <div key={s.id} className="text-xs">
                      <div className="flex justify-between text-[10.5px] font-semibold text-slate-800 mb-0.5">
                        <span>{s.name}</span>
                        {s.level && <span className="text-sky-600 font-mono text-[9.5px]">{s.level}%</span>}
                      </div>
                      {s.level && (
                        <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                          <div
                            className="h-full rounded-full bg-gradient-to-r from-blue-600 to-sky-400"
                            style={{ width: `${s.level}%` }}
                          />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Personal Particulars & Addresses TOGETHER */}
            {visibility.personalInfo && (
              <section className="bg-gradient-to-b from-[#0f172a] to-[#1e3a8a] text-white p-4 rounded-xl shadow-md border-t-2 border-sky-400">
                <h2 className="font-black uppercase tracking-wider text-[11px] text-sky-300 pb-1.5 mb-2 border-b border-sky-700/50">
                  {labels.personalInfo}
                </h2>
                <div className="grid grid-cols-[68px_8px_1fr] gap-y-1 text-[9.5px] leading-snug">
                  {personal.dateOfBirth && (
                    <>
                      <span className="text-sky-200/80 font-medium">{labels.dob}</span>
                      <span className="text-sky-400 font-bold">:</span>
                      <span className="font-semibold text-white">{personal.dateOfBirth}</span>
                    </>
                  )}
                  {personal.age && (
                    <>
                      <span className="text-sky-200/80 font-medium">{labels.age}</span>
                      <span className="text-sky-400 font-bold">:</span>
                      <span className="font-semibold text-white">{personal.age}</span>
                    </>
                  )}
                  {personal.height && (
                    <>
                      <span className="text-sky-200/80 font-medium">{labels.height}</span>
                      <span className="text-sky-400 font-bold">:</span>
                      <span className="font-semibold text-white">{personal.height}</span>
                    </>
                  )}
                  {personal.bloodGroup && (
                    <>
                      <span className="text-sky-200/80 font-medium">{labels.bloodGroup}</span>
                      <span className="text-sky-400 font-bold">:</span>
                      <span className="font-bold text-sky-300">{personal.bloodGroup}</span>
                    </>
                  )}
                  {personal.maritalStatus && (
                    <>
                      <span className="text-sky-200/80 font-medium">{labels.maritalStatus}</span>
                      <span className="text-sky-400 font-bold">:</span>
                      <span className="font-semibold text-white">{personal.maritalStatus}</span>
                    </>
                  )}
                </div>

                {/* Both Addresses together */}
                {(personal.currentAddress || personal.permanentAddress) && (
                  <div className="pt-2 mt-2 border-t border-sky-700/50 text-[9px] space-y-1">
                    {personal.currentAddress && (
                      <div>
                        <span className="text-sky-300 block font-semibold">{labels.currentAddr}:</span>
                        <span className="text-slate-200 block mt-0.5 leading-snug">{personal.currentAddress}</span>
                      </div>
                    )}
                    {personal.permanentAddress && (
                      <div>
                        <span className="text-sky-300 block font-semibold">{labels.permanentAddr}:</span>
                        <span className="text-slate-200 block mt-0.5 leading-snug">{personal.permanentAddress}</span>
                      </div>
                    )}
                  </div>
                )}
              </section>
            )}

            {/* Matrimonial expectations if active */}
            {visibility.matrimonialDetails && matrimonial && (
              <section className="bg-sky-50/80 p-3.5 rounded-xl border border-sky-200 text-xs space-y-1.5 shadow-2xs">
                <div className="flex items-center gap-1 font-bold text-sky-950 pb-1 border-b border-sky-200 text-[11px]">
                  <Heart className="w-3.5 h-3.5 text-rose-500" />
                  <span>{labels.matrimonial}</span>
                </div>
                {matrimonial.partnerExpectations.ageRange && (
                  <div className="text-[10px]"><span className="text-slate-600 font-medium">{labels.expectedAge}</span> {matrimonial.partnerExpectations.ageRange}</div>
                )}
                {matrimonial.partnerExpectations.education && (
                  <div className="text-[10px]"><span className="text-slate-600 font-medium">{labels.expectedEdu}</span> {matrimonial.partnerExpectations.education}</div>
                )}
                {matrimonial.partnerExpectations.religiousPractices && (
                  <p className="text-[9.5px] text-slate-700 leading-snug">{matrimonial.partnerExpectations.religiousPractices}</p>
                )}
              </section>
            )}

            {/* Family Details */}
            {visibility.familyBackground && (family.fatherName || family.motherName) && (
              <section className="bg-white p-3.5 rounded-xl border border-sky-100 text-xs space-y-1 shadow-xs">
                <h2 className="text-xs font-black uppercase tracking-wider text-slate-900 pb-1 mb-1 border-b-2 border-sky-500">
                  {labels.family}
                </h2>
                {family.fatherName && (
                  <div className="text-[10px]">
                    <span className="font-semibold text-slate-800">{labels.father}</span> {family.fatherName}
                    {family.fatherOccupation && <div className="text-slate-500 text-[9px]">{family.fatherOccupation}</div>}
                  </div>
                )}
                {family.motherName && (
                  <div className="text-[10px]">
                    <span className="font-semibold text-slate-800">{labels.mother}</span> {family.motherName}
                  </div>
                )}
                {family.siblings && <div className="text-[10px] text-slate-600">{labels.siblings} {family.siblings}</div>}
              </section>
            )}

            {/* Languages */}
            {visibility.languages && languages.length > 0 && (
              <section className="bg-white p-3 rounded-xl border border-sky-100 text-xs shadow-xs">
                <h2 className="text-xs font-black uppercase tracking-wider text-slate-900 pb-1 mb-1 border-b-2 border-sky-500">
                  {labels.languages}
                </h2>
                <div className="space-y-1">
                  {languages.map((l) => (
                    <div key={l.id} className="flex justify-between text-[10.5px]">
                      <span className="font-medium text-slate-800">{l.name}</span>
                      <span className="text-sky-600 font-semibold text-[10px]">{l.proficiency}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t-2 border-sky-400 p-2 bg-[#0f172a] text-center text-[10px] text-sky-200/80 font-mono">
        Elite Sapphire Edition • BioCraft Verified Curriculum Vitae
      </footer>
    </div>
  );
};
