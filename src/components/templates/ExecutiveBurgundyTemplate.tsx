import React from 'react';
import { ResumeData } from '../../types/resume';
import { Phone, Mail, MapPin, Heart, Sparkles, Award, Briefcase, GraduationCap, CheckCircle2 } from 'lucide-react';

interface TemplateProps {
  data: ResumeData;
}

export const ExecutiveBurgundyTemplate: React.FC<TemplateProps> = ({ data }) => {
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
  const primaryBurgundy = theme.primaryColor || '#701a75'; // Rich Burgundy
  const accentRose = theme.secondaryColor || '#f43f5e'; // Rose Gold accent

  const labels = {
    contactMe: sectionTitles.contact || (isBn ? 'যোগাযোগ মাধ্যম' : 'CONTACT DETAILS'),
    personalInfo: sectionTitles.personalInfo || (isBn ? 'ব্যক্তিগত পরিচিতি' : 'PERSONAL PROFILE'),
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
    skills: sectionTitles.skills || (isBn ? 'পেশাগত দক্ষতাসমূহ' : 'CORE COMPETENCIES'),
    languages: sectionTitles.languages || (isBn ? 'ভাষাগত দক্ষতা' : 'LANGUAGES'),
    profile: sectionTitles.profile || (isBn ? 'পেশাদার সারসংক্ষেপ ও উদ্যোগ' : 'EXECUTIVE SUMMARY & VENTURES'),
    profession: isBn ? 'বর্তমান পদবি / পেশা:' : 'Current Role / Profession:',
    ventures: isBn ? 'উদ্যোগ ও প্রতিষ্ঠানসমূহ:' : 'Key Ventures & Roles:',
    experience: sectionTitles.experience || (isBn ? 'কাজের অভিজ্ঞতা ও দায়িত্ব' : 'PROFESSIONAL EXPERIENCE'),
    education: sectionTitles.education || (isBn ? 'শিক্ষাগত অর্জন' : 'EDUCATION & QUALIFICATIONS'),
    family: sectionTitles.family || (isBn ? 'পারিবারিক পটভূমি' : 'FAMILY BACKGROUND'),
    father: isBn ? 'পিতা:' : 'Father:',
    fatherOcc: isBn ? 'পিতার পেশা:' : "Father's Occupation:",
    mother: isBn ? 'মাতা:' : 'Mother:',
    motherOcc: isBn ? 'মাতার পেশা:' : "Mother's Occupation:",
    siblings: isBn ? 'ভাই-বোন:' : 'Siblings:',
    posInFamily: isBn ? 'পরিবারে অবস্থান:' : 'Position in Family:',
    sistersMarital: isBn ? 'বোনদের অবস্থা:' : "Sisters' Status:",
    matrimonial: sectionTitles.matrimonial || (isBn ? 'পাত্র / পাত্রী বিষয়ক তথ্য' : 'MATRIMONIAL EXPECTATIONS'),
    expectedAge: isBn ? 'প্রত্যাশিত বয়স:' : 'Expected Age:',
    expectedHeight: isBn ? 'প্রত্যাশিত উচ্চতা:' : 'Expected Height:',
    expectedEdu: isBn ? 'প্রত্যাশিত শিক্ষা:' : 'Expected Education:',
    guardianContact: isBn ? 'অভিভাবকের যোগাযোগ:' : 'Guardian Contact:',
  };

  return (
    <div
      id="cv-page"
      className="a4-page relative text-slate-800 bg-white flex flex-row justify-between shadow-2xl overflow-hidden print-page"
      style={{
        fontFamily: isBn ? "'Noto Sans Bengali', 'Hind Siliguri', 'Plus Jakarta Sans', sans-serif" : "'Plus Jakarta Sans', sans-serif",
        minHeight: '297mm',
        height: '297mm',
        width: '210mm',
      }}
    >
      {/* ================= LEFT SIDEBAR (BURGUNDY & WINE) ================= */}
      <div
        className="w-[36%] text-white flex flex-col justify-between p-5 relative shrink-0"
        style={{
          background: `linear-gradient(180deg, #4a044e 0%, #701a75 50%, #831843 100%)`,
        }}
      >
        <div>
          {/* Top Profile Photo (Large, prestige circular frame) */}
          {visibility.photo && personal.photoUrl && (
            <div className="flex justify-center pt-2 pb-1">
              <div className="relative w-36 h-36 rounded-full border-4 border-rose-200/80 shadow-2xl overflow-hidden bg-slate-900 ring-4 ring-rose-500/30">
                <img
                  src={personal.photoUrl}
                  alt={personal.name}
                  className="w-full h-full object-cover object-top"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
              </div>
            </div>
          )}

          {/* Name & Tagline directly below photo */}
          <div className="text-center pt-2 pb-3 border-b border-rose-400/20">
            <h1 className="text-xl font-extrabold tracking-wide uppercase leading-tight text-white drop-shadow-sm font-['Noto_Sans_Bengali','Plus_Jakarta_Sans']">
              {personal.name || 'YOUR NAME'}
            </h1>
            {personal.tagline && (
              <p className="text-[11px] font-bold tracking-wider uppercase mt-1 px-1 text-rose-200">
                {personal.tagline}
              </p>
            )}
          </div>

          {/* Contact Details */}
          {visibility.contact && (
            <div className="mt-3 mb-3">
              <div className="inline-block border-b-2 border-rose-300 pb-0.5 mb-2">
                <h2 className="text-[11px] font-black uppercase tracking-widest text-rose-100 flex items-center gap-1">
                  <span>{labels.contactMe}</span>
                </h2>
              </div>
              <ul className="space-y-1.5 text-[10px] text-rose-50">
                {personal.phone && (
                  <li className="flex items-center gap-2">
                    <span className="p-1 rounded-full bg-white/20 text-white shrink-0">
                      <Phone className="w-2.5 h-2.5" />
                    </span>
                    <span className="font-semibold tracking-wide text-white">{personal.phone}</span>
                  </li>
                )}
                {personal.email && (
                  <li className="flex items-center gap-2">
                    <span className="p-1 rounded-full bg-white/20 text-white shrink-0">
                      <Mail className="w-2.5 h-2.5" />
                    </span>
                    <span className="truncate">{personal.email}</span>
                  </li>
                )}
                {personal.facebook && (
                  <li className="flex items-center gap-2">
                    <span className="p-1 rounded-full bg-white/20 text-white shrink-0">
                      <svg className="w-2.5 h-2.5 fill-current" viewBox="0 0 24 24">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                      </svg>
                    </span>
                    <span className="truncate">{personal.facebook.replace(/^https?:\/\/(www\.)?/, '')}</span>
                  </li>
                )}
                {personal.instagram && (
                  <li className="flex items-center gap-2">
                    <span className="p-1 rounded-full bg-white/20 text-white shrink-0">
                      <svg className="w-2.5 h-2.5 fill-current" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                      </svg>
                    </span>
                    <span className="truncate">{personal.instagram.replace(/^https?:\/\/(www\.)?/, '')}</span>
                  </li>
                )}
              </ul>
            </div>
          )}

          {/* Personal Particulars Card (With Both Addresses in One Place) */}
          {visibility.personalInfo && (
            <div className="mt-3 bg-white/10 backdrop-blur-xs p-3 rounded-lg border border-rose-300/20 text-white">
              <h2 className="text-[10px] font-black uppercase tracking-wider text-rose-200 pb-1 mb-1.5 border-b border-rose-300/20">
                {labels.personalInfo}
              </h2>
              <div className="grid grid-cols-[65px_8px_1fr] gap-y-1 text-[9px] leading-snug">
                {personal.dateOfBirth && (
                  <>
                    <span className="text-rose-200 font-medium">{labels.dob}</span>
                    <span className="text-rose-300 font-bold">:</span>
                    <span className="font-semibold text-white">{personal.dateOfBirth}</span>
                  </>
                )}
                {personal.age && (
                  <>
                    <span className="text-rose-200 font-medium">{labels.age}</span>
                    <span className="text-rose-300 font-bold">:</span>
                    <span className="font-semibold text-white">{personal.age}</span>
                  </>
                )}
                {personal.height && (
                  <>
                    <span className="text-rose-200 font-medium">{labels.height}</span>
                    <span className="text-rose-300 font-bold">:</span>
                    <span className="font-semibold text-white">{personal.height}</span>
                  </>
                )}
                {personal.bloodGroup && (
                  <>
                    <span className="text-rose-200 font-medium">{labels.bloodGroup}</span>
                    <span className="text-rose-300 font-bold">:</span>
                    <span className="font-bold text-rose-200">{personal.bloodGroup}</span>
                  </>
                )}
                {personal.maritalStatus && (
                  <>
                    <span className="text-rose-200 font-medium">{labels.maritalStatus}</span>
                    <span className="text-rose-300 font-bold">:</span>
                    <span className="font-semibold text-white">{personal.maritalStatus}</span>
                  </>
                )}
              </div>

              {/* Combined Present and Permanent Address in same card */}
              {(personal.currentAddress || personal.permanentAddress) && (
                <div className="pt-2 mt-2 border-t border-rose-300/20 text-[8.5px] space-y-1">
                  {personal.currentAddress && (
                    <div>
                      <span className="text-rose-200 font-bold block">{labels.currentAddr}:</span>
                      <span className="text-white block mt-0.5 leading-snug">{personal.currentAddress}</span>
                    </div>
                  )}
                  {personal.permanentAddress && (
                    <div>
                      <span className="text-rose-200 font-bold block">{labels.permanentAddr}:</span>
                      <span className="text-white block mt-0.5 leading-snug">{personal.permanentAddress}</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Languages */}
          {visibility.languages && languages.length > 0 && (
            <div className="mt-3">
              <div className="inline-block border-b-2 border-rose-300 pb-0.5 mb-1.5">
                <h2 className="text-[10px] font-black uppercase tracking-wider text-rose-100">
                  {labels.languages}
                </h2>
              </div>
              <div className="space-y-1">
                {languages.map((l) => (
                  <div key={l.id} className="flex justify-between text-[9.5px]">
                    <span className="text-white font-medium">{l.name}</span>
                    <span className="text-rose-200 font-semibold">{l.proficiency}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Bottom subtle brand note */}
        <div className="pt-2 border-t border-rose-400/20 text-[8.5px] text-rose-300 text-center font-mono">
          Executive Burgundy Edition
        </div>
      </div>

      {/* ================= RIGHT MAIN BODY ================= */}
      <div className="flex-1 p-6 flex flex-col justify-between overflow-hidden bg-slate-50/50">
        <div className="space-y-4">
          {/* Header Accent Bar */}
          <div className="flex items-center justify-between border-b-2 border-[#701a75] pb-2">
            <div>
              <span className="text-[9px] uppercase tracking-widest text-[#701a75] font-black flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-[#f43f5e]" /> Professional Portfolio & Biodata
              </span>
              <h2 className="text-lg font-black text-slate-900 uppercase tracking-tight">
                {personal.tagline || profile.profession || 'Executive Profile'}
              </h2>
            </div>
            <div className="text-right text-[10px] text-slate-500 font-mono">
              CONFIDENTIAL & VERIFIED
            </div>
          </div>

          {/* Professional Profile & Summary */}
          {visibility.professionalProfile && (
            <section className="bg-white p-3.5 rounded-lg border border-rose-100 shadow-2xs">
              <div className="flex items-center gap-1.5 pb-1 mb-2 border-b border-rose-100">
                <Briefcase className="w-4 h-4 text-[#701a75]" />
                <h3 className="text-xs font-black uppercase tracking-wider text-slate-900">
                  {labels.profile}
                </h3>
              </div>

              {profile.profession && (
                <div className="text-[11px] font-bold text-slate-900 mb-1">
                  {labels.profession} <span className="text-[#831843]">{profile.profession}</span>
                </div>
              )}
              {profile.summary && (
                <p className="text-[10px] text-slate-600 leading-relaxed mb-2 text-justify">
                  {profile.summary}
                </p>
              )}

              {profile.businessVentures.length > 0 && (
                <div className="space-y-1.5 pt-1">
                  <div className="text-[10px] font-bold text-slate-800">{labels.ventures}</div>
                  {profile.businessVentures.map((v) => (
                    <div key={v.id} className="text-[10px] pl-2 border-l-2 border-[#701a75] py-0.5">
                      <div className="font-bold text-slate-900 flex justify-between">
                        <span>{v.name}</span>
                        <span className="text-[#831843] font-medium italic">{v.role}</span>
                      </div>
                      {v.details && <p className="text-[9.5px] text-slate-600 mt-0.5">{v.details}</p>}
                    </div>
                  ))}
                </div>
              )}
            </section>
          )}

          {/* Organizational Experience */}
          {visibility.organizationalExperience && experience.length > 0 && (
            <section className="bg-white p-3.5 rounded-lg border border-rose-100 shadow-2xs">
              <div className="flex items-center gap-1.5 pb-1 mb-2 border-b border-rose-100">
                <Award className="w-4 h-4 text-[#701a75]" />
                <h3 className="text-xs font-black uppercase tracking-wider text-slate-900">
                  {labels.experience}
                </h3>
              </div>
              <div className="space-y-2">
                {experience.map((exp) => (
                  <div key={exp.id} className="text-xs">
                    <div className="flex justify-between font-bold text-slate-900 text-[10.5px]">
                      <span>{exp.role}</span>
                      <span className="text-[9.5px] font-semibold text-[#831843] bg-rose-50 px-1.5 py-0.5 rounded border border-rose-200">
                        {exp.period}
                      </span>
                    </div>
                    <div className="text-slate-700 font-medium text-[10px]">{exp.organization}</div>
                    {exp.details && <p className="text-[9.5px] text-slate-600 mt-0.5 leading-snug">{exp.details}</p>}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Education */}
          {visibility.education && education.length > 0 && (
            <section className="bg-white p-3.5 rounded-lg border border-rose-100 shadow-2xs">
              <div className="flex items-center gap-1.5 pb-1 mb-2 border-b border-rose-100">
                <GraduationCap className="w-4 h-4 text-[#701a75]" />
                <h3 className="text-xs font-black uppercase tracking-wider text-slate-900">
                  {labels.education}
                </h3>
              </div>
              <div className="space-y-1.5">
                {education.map((edu) => (
                  <div key={edu.id} className="text-xs flex justify-between items-start">
                    <div>
                      <div className="font-bold text-slate-900 text-[10.5px]">{edu.degree}</div>
                      <div className="text-slate-600 text-[10px]">{edu.institution}</div>
                      {edu.grade && <div className="text-[9px] text-slate-500">{edu.grade}</div>}
                    </div>
                    <span className="text-[9.5px] font-semibold text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded shrink-0">
                      {edu.sessionOrYear}
                    </span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Skills Grid */}
          {visibility.skills && skills.length > 0 && (
            <section className="bg-white p-3.5 rounded-lg border border-rose-100 shadow-2xs">
              <h3 className="text-xs font-black uppercase tracking-wider text-slate-900 pb-1 mb-2 border-b border-rose-100">
                {labels.skills}
              </h3>
              <div className="grid grid-cols-2 gap-x-4 gap-y-1.5">
                {skills.map((s) => (
                  <div key={s.id} className="text-xs">
                    <div className="flex justify-between text-[10px] font-semibold text-slate-800 mb-0.5">
                      <span>{s.name}</span>
                      {s.level && <span className="text-[#831843] font-mono text-[9px]">{s.level}%</span>}
                    </div>
                    {s.level && (
                      <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-[#701a75] to-[#f43f5e]"
                          style={{ width: `${s.level}%` }}
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Matrimonial Details (if active) */}
          {visibility.matrimonialDetails && matrimonial && (
            <section className="bg-rose-50/70 p-3.5 rounded-lg border border-rose-200 text-xs space-y-1.5">
              <div className="flex items-center gap-1.5 font-bold text-rose-950 pb-1 border-b border-rose-200 text-[10.5px]">
                <Heart className="w-3.5 h-3.5 text-rose-600" />
                <span>{labels.matrimonial}</span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-[9.5px]">
                {matrimonial.partnerExpectations.ageRange && (
                  <div><span className="text-rose-900 font-semibold">{labels.expectedAge}</span> {matrimonial.partnerExpectations.ageRange}</div>
                )}
                {matrimonial.partnerExpectations.education && (
                  <div><span className="text-rose-900 font-semibold">{labels.expectedEdu}</span> {matrimonial.partnerExpectations.education}</div>
                )}
              </div>
              {matrimonial.partnerExpectations.religiousPractices && (
                <p className="text-[9.5px] text-slate-700 leading-snug">{matrimonial.partnerExpectations.religiousPractices}</p>
              )}
            </section>
          )}

          {/* Family Background */}
          {visibility.familyBackground && (family.fatherName || family.motherName) && (
            <section className="bg-white p-3 rounded-lg border border-rose-100 text-xs space-y-1 shadow-2xs">
              <h3 className="text-xs font-black uppercase tracking-wider text-slate-900 pb-1 mb-1 border-b border-rose-100">
                {labels.family}
              </h3>
              <div className="grid grid-cols-2 gap-x-3 gap-y-1 text-[9.5px]">
                {family.fatherName && (
                  <div>
                    <span className="font-semibold text-slate-800">{labels.father}</span> {family.fatherName}
                    {family.fatherOccupation && <span className="text-slate-500 block text-[9px]">{family.fatherOccupation}</span>}
                  </div>
                )}
                {family.motherName && (
                  <div>
                    <span className="font-semibold text-slate-800">{labels.mother}</span> {family.motherName}
                    {family.motherOccupation && <span className="text-slate-500 block text-[9px]">{family.motherOccupation}</span>}
                  </div>
                )}
                {family.siblings && <div className="col-span-2 text-slate-700">{labels.siblings} {family.siblings}</div>}
              </div>
            </section>
          )}

          {/* Custom Sections */}
          {visibility.customSections && customSections.length > 0 && (
            <div className="space-y-2">
              {customSections.map((cs) => (
                <section key={cs.id} className="bg-white p-3 rounded-lg border border-rose-100 shadow-2xs">
                  <h3 className="text-xs font-black uppercase tracking-wider text-slate-900 pb-1 mb-1 border-b border-rose-100">
                    {cs.title}
                  </h3>
                  <div className="space-y-1">
                    {cs.items.map((item) => (
                      <div key={item.id} className="text-[10px]">
                        <span className="font-bold text-slate-800">{item.title}</span>{' '}
                        {item.period && <span className="text-slate-500">({item.period})</span>}
                        {item.details && <p className="text-[9.5px] text-slate-600 mt-0.5">{item.details}</p>}
                      </div>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="pt-2 border-t border-slate-200 text-center text-[9px] text-slate-400 font-mono">
          Executive Portfolio • Verified & Produced with Care
        </div>
      </div>
    </div>
  );
};
