import React from 'react';
import { ResumeData } from '../../types/resume';
import { Phone, Mail, Globe, MapPin, Heart, ShieldCheck } from 'lucide-react';

interface TemplateProps {
  data: ResumeData;
}

export const MinhajExecutiveTealTemplate: React.FC<TemplateProps> = ({ data }) => {
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
  const primaryColor = theme.primaryColor || '#0b4f6c';
  const secondaryColor = theme.secondaryColor || '#d97706';

  // Section Labels dictionary for Template
  const labels = {
    contactMe: sectionTitles.contact || (isBn ? 'যোগাযোগ' : 'CONTACT ME'),
    personalInfo: sectionTitles.personalInfo || (isBn ? 'ব্যক্তিগত তথ্য' : 'PERSONAL INFORMATION'),
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
    skills: sectionTitles.skills || (isBn ? 'দক্ষতাসমূহ' : 'SKILLS'),
    languages: sectionTitles.languages || (isBn ? 'ভাষাজ্ঞান' : 'LANGUAGES'),
    profile: sectionTitles.profile || (isBn ? 'পেশাদার প্রোফাইল' : 'PROFESSIONAL PROFILE'),
    profession: isBn ? 'পেশা:' : 'Profession:',
    ventures: isBn ? 'উদ্যোগ ও ব্যবসা:' : 'Business Ventures:',
    experience: sectionTitles.experience || (isBn ? 'সাংগঠনিক ও কাজের অভিজ্ঞতা' : 'ORGANIZATIONAL EXPERIENCE'),
    education: sectionTitles.education || (isBn ? 'শিক্ষাগত যোগ্যতা' : 'EDUCATIONAL QUALIFICATIONS'),
    family: sectionTitles.family || (isBn ? 'পারিবারিক বিবরণ' : 'FAMILY BACKGROUND'),
    father: isBn ? 'পিতা:' : 'Father:',
    fatherOcc: isBn ? 'পিতার পেশা:' : "Father's Occupation:",
    mother: isBn ? 'মাতা:' : 'Mother:',
    motherOcc: isBn ? 'মাতার পেশা:' : "Mother's Occupation:",
    siblings: isBn ? 'ভাই-বোন:' : 'Siblings:',
    posInFamily: isBn ? 'পরিবারে অবস্থান:' : 'Position in the Family:',
    sistersMarital: isBn ? 'বোনদের অবস্থা:' : "Sisters' Marital Status:",
    matrimonial: sectionTitles.matrimonial || (isBn ? 'পাত্র / পাত্রীর প্রত্যাশা' : 'PARTNER EXPECTATIONS'),
    expectedAge: isBn ? 'প্রত্যাশিত বয়স:' : 'Expected Age:',
    expectedHeight: isBn ? 'প্রত্যাশিত উচ্চতা:' : 'Expected Height:',
    expectedEdu: isBn ? 'প্রত্যাশিত শিক্ষা:' : 'Expected Education:',
    expectedDistrict: isBn ? 'কাঙ্ক্ষিত এলাকা:' : 'Preferred Area:',
    religiousPractices: isBn ? 'দ্বীনি অভ্যাস:' : 'Religious Values:',
    lifestyle: isBn ? 'দ্বীনি ও ব্যক্তিগত অভ্যাস' : 'RELIGIOUS & LIFESTYLE',
    guardianContact: isBn ? 'অভিভাবকের যোগাযোগ:' : 'Guardian Contact:',
  };

  return (
    <div
      id="cv-page"
      className="a4-page relative text-slate-800 flex flex-row shadow-2xl overflow-hidden print-page"
      style={{
        fontFamily: isBn ? "'Noto Sans Bengali', 'Hind Siliguri', 'Plus Jakarta Sans', sans-serif" : "'Plus Jakarta Sans', sans-serif",
        minHeight: '297mm',
        height: '297mm',
        width: '210mm',
      }}
    >
      {/* ================= LEFT SIDEBAR (TEAL) ================= */}
      <div
        className="w-[38%] text-white flex flex-col justify-between p-5 relative shrink-0"
        style={{
          backgroundColor: primaryColor,
        }}
      >
        <div>
          {/* Profile Photo (Bigger size, dominant top anchor) */}
          {visibility.photo && personal.photoUrl && (
            <div className="flex justify-center pt-2 pb-1">
              <div className="relative w-40 h-40 rounded-full border-4 border-white shadow-2xl overflow-hidden bg-slate-800 ring-2 ring-teal-300/40">
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
          <div className="text-center pt-2 pb-3">
            <h1 className="text-xl font-extrabold tracking-wide uppercase leading-tight text-white drop-shadow-sm font-['Noto_Sans_Bengali','Plus_Jakarta_Sans']">
              {personal.name || 'YOUR NAME'}
            </h1>
            {personal.tagline && (
              <p
                className="text-[11px] font-bold tracking-wider uppercase mt-1 px-2"
                style={{ color: secondaryColor }}
              >
                {personal.tagline}
              </p>
            )}
          </div>

          {/* Contact Me with Phone, Email, Facebook, Instagram */}
          {visibility.contact && (
            <div className="mt-2 mb-3">
              <div className="inline-block border-b-2 border-white/60 pb-0.5 mb-2">
                <h2 className="text-xs font-black uppercase tracking-widest text-white">
                  {labels.contactMe}
                </h2>
              </div>
              <ul className="space-y-1.5 text-[10.5px] text-teal-50">
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
                      {/* Clean SVG Facebook Icon */}
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
                      {/* Clean SVG Instagram Icon */}
                      <svg className="w-2.5 h-2.5 fill-current" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                      </svg>
                    </span>
                    <span className="truncate">{personal.instagram.replace(/^https?:\/\/(www\.)?/, '')}</span>
                  </li>
                )}
                {personal.socialMedia && !personal.facebook && !personal.instagram && (
                  <li className="flex items-center gap-2">
                    <span className="p-1 rounded-full bg-white/20 text-white shrink-0">
                      <Globe className="w-2.5 h-2.5" />
                    </span>
                    <span className="truncate">{personal.socialMedia}</span>
                  </li>
                )}
              </ul>
            </div>
          )}

          {/* Personal Information (Curved Arch Card with BOTH Present & Permanent Address in ONE PLACE) */}
          {visibility.personalInfo && (
            <div className="mt-3 bg-[#063447]/95 rounded-2xl p-3.5 border-t border-teal-400/30 text-teal-100 shadow-inner">
              <h2 className="text-center text-[11px] font-black uppercase tracking-wider text-white pb-1.5 mb-2 border-b border-teal-500/40">
                {labels.personalInfo}
              </h2>

              {/* STRICT 3-Column Tabular Alignment: Label | Colon | Value */}
              <div className="grid grid-cols-[72px_8px_1fr] gap-y-1 text-[9.5px] leading-snug">
                {personal.dateOfBirth && (
                  <>
                    <span className="text-teal-200 font-medium whitespace-nowrap">{labels.dob}</span>
                    <span className="text-teal-400 font-bold">:</span>
                    <span className="font-semibold text-white">{personal.dateOfBirth}</span>
                  </>
                )}
                {personal.age && (
                  <>
                    <span className="text-teal-200 font-medium whitespace-nowrap">{labels.age}</span>
                    <span className="text-teal-400 font-bold">:</span>
                    <span className="font-semibold text-white">{personal.age}</span>
                  </>
                )}
                {personal.height && (
                  <>
                    <span className="text-teal-200 font-medium whitespace-nowrap">{labels.height}</span>
                    <span className="text-teal-400 font-bold">:</span>
                    <span className="font-semibold text-white">{personal.height}</span>
                  </>
                )}
                {personal.weight && (
                  <>
                    <span className="text-teal-200 font-medium whitespace-nowrap">{labels.weight}</span>
                    <span className="text-teal-400 font-bold">:</span>
                    <span className="font-semibold text-white">{personal.weight}</span>
                  </>
                )}
                {personal.complexion && (
                  <>
                    <span className="text-teal-200 font-medium whitespace-nowrap">{labels.complexion}</span>
                    <span className="text-teal-400 font-bold">:</span>
                    <span className="font-semibold text-white">{personal.complexion}</span>
                  </>
                )}
                {personal.bloodGroup && (
                  <>
                    <span className="text-teal-200 font-medium whitespace-nowrap">{labels.bloodGroup}</span>
                    <span className="text-teal-400 font-bold">:</span>
                    <span className="font-bold text-amber-300">{personal.bloodGroup}</span>
                  </>
                )}
                {personal.maritalStatus && (
                  <>
                    <span className="text-teal-200 font-medium whitespace-nowrap">{labels.maritalStatus}</span>
                    <span className="text-teal-400 font-bold">:</span>
                    <span className="font-semibold text-white">{personal.maritalStatus}</span>
                  </>
                )}
                {personal.religion && (
                  <>
                    <span className="text-teal-200 font-medium whitespace-nowrap">{labels.religion}</span>
                    <span className="text-teal-400 font-bold">:</span>
                    <span className="font-semibold text-white">{personal.religion}</span>
                  </>
                )}
              </div>

              {/* BOTH Present and Permanent Address together in ONE place */}
              {(personal.currentAddress || personal.permanentAddress) && (
                <div className="pt-2 mt-2 border-t border-teal-600/40 text-[9px] space-y-1.5">
                  {personal.currentAddress && (
                    <div>
                      <span className="text-teal-300 block font-semibold">{labels.currentAddr}:</span>
                      <span className="text-white block mt-0.5 leading-snug">{personal.currentAddress}</span>
                    </div>
                  )}
                  {personal.permanentAddress && (
                    <div>
                      <span className="text-teal-300 block font-semibold">{labels.permanentAddr}:</span>
                      <span className="text-white block mt-0.5 leading-snug">{personal.permanentAddress}</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Skills */}
          {visibility.skills && skills.length > 0 && (
            <div className="mt-3">
              <h2 className="text-[11px] font-black uppercase tracking-wider text-white pb-1 mb-1.5 border-b border-teal-400/40">
                {labels.skills}
              </h2>
              <ul className="space-y-1 text-[10.5px]">
                {skills.map((skill) => (
                  <li key={skill.id} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-amber-400 shrink-0"></span>
                    <span className="font-medium text-white">{skill.name}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Languages */}
          {visibility.languages && languages.length > 0 && (
            <div className="mt-3">
              <h2 className="text-[11px] font-black uppercase tracking-wider text-white pb-1 mb-1 border-b border-teal-400/40">
                {labels.languages}
              </h2>
              <div className="space-y-1 text-[10px]">
                {languages.map((lang) => (
                  <div key={lang.id} className="flex justify-between items-center text-teal-100">
                    <span className="font-medium text-white">{lang.name}</span>
                    <span className="text-[9.5px] text-teal-300">{lang.proficiency}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ================= RIGHT MAIN BODY (WHITE) ================= */}
      <div className="w-[62%] bg-white p-6 flex flex-col justify-between relative">
        {/* Top Gradient Decorative Bar */}
        <div className="absolute top-0 right-0 left-0 h-2 bg-gradient-to-r from-teal-700 via-teal-500 to-amber-500" />

        <div className="space-y-3.5 pt-1">
          {/* PROFESSIONAL PROFILE */}
          {visibility.professionalProfile && (
            <section>
              <div className="border-b-2 border-slate-200 pb-1 mb-2">
                <h2
                  className="text-xs font-black uppercase tracking-wider flex items-center gap-2"
                  style={{ color: primaryColor }}
                >
                  {labels.profile}
                </h2>
              </div>

              {profile.profession && (
                <div className="flex items-start gap-1.5 mb-1 text-[11px]">
                  <span className="w-1.5 h-1.5 mt-1 shrink-0" style={{ backgroundColor: primaryColor }}></span>
                  <div>
                    <span className="font-bold text-slate-800">{labels.profession} </span>
                    <span className="text-slate-700 font-medium">{profile.profession}</span>
                  </div>
                </div>
              )}

              {profile.summary && (
                <p className="text-[10px] text-slate-600 mb-2 leading-relaxed pl-3">
                  {profile.summary}
                </p>
              )}

              {profile.businessVentures.length > 0 && (
                <div className="text-[11px]">
                  <div className="flex items-start gap-1.5 mb-1">
                    <span className="w-1.5 h-1.5 mt-1 shrink-0" style={{ backgroundColor: primaryColor }}></span>
                    <span className="font-bold text-slate-800">{labels.ventures}</span>
                  </div>
                  <div className="pl-4 space-y-1">
                    {profile.businessVentures.map((venture) => (
                      <div key={venture.id} className="text-[10.5px]">
                        <div className="flex items-baseline gap-1.5 font-bold text-slate-800">
                          <span className="w-1 h-1 bg-slate-400 shrink-0"></span>
                          <span>{venture.name}</span>
                          {venture.role && (
                            <span className="font-semibold text-slate-600 italic">
                              — {venture.role}
                            </span>
                          )}
                        </div>
                        {venture.details && (
                          <p className="text-[10px] text-slate-600 pl-2.5 leading-tight">
                            {venture.details}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </section>
          )}

          {/* ORGANIZATIONAL EXPERIENCE */}
          {visibility.organizationalExperience && experience.length > 0 && (
            <section>
              <div className="border-b-2 border-slate-200 pb-1 mb-2">
                <h2
                  className="text-xs font-black uppercase tracking-wider flex items-center gap-2"
                  style={{ color: primaryColor }}
                >
                  {labels.experience}
                </h2>
              </div>

              <div className="space-y-2 text-[11px]">
                {experience.map((exp) => (
                  <div key={exp.id} className="flex items-start gap-1.5">
                    <span className="w-1.5 h-1.5 mt-1 shrink-0" style={{ backgroundColor: primaryColor }}></span>
                    <div className="flex-1">
                      <div className="font-bold text-slate-800 text-[11px] leading-tight">
                        {exp.role}
                      </div>
                      <div className="text-[10.5px] text-slate-700 leading-snug">
                        {exp.organization}
                      </div>
                      <div className="text-[9.5px] text-slate-500 font-medium">
                        ({exp.period})
                      </div>
                      {exp.details && (
                        <p className="text-[9.5px] text-slate-600 mt-0.5 leading-snug">
                          {exp.details}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* EDUCATIONAL QUALIFICATIONS */}
          {visibility.education && education.length > 0 && (
            <section>
              <div className="border-b-2 border-slate-200 pb-1 mb-2">
                <h2
                  className="text-xs font-black uppercase tracking-wider flex items-center gap-2"
                  style={{ color: primaryColor }}
                >
                  {labels.education}
                </h2>
              </div>

              <div className="space-y-2 text-[11px]">
                {education.map((edu) => (
                  <div key={edu.id} className="flex items-start gap-1.5">
                    <span className="w-1.5 h-1.5 mt-1 shrink-0" style={{ backgroundColor: primaryColor }}></span>
                    <div className="flex-1">
                      <div className="font-bold text-slate-800 text-[11px] leading-tight">
                        {edu.degree}
                        {edu.sessionOrYear && (
                          <span className="font-semibold text-slate-600">
                            {' '}— {edu.sessionOrYear}
                          </span>
                        )}
                      </div>
                      <div className="text-[10.5px] text-slate-700 leading-snug">
                        {edu.institution}
                      </div>
                      {edu.grade && (
                        <div className="text-[9.5px] text-slate-500 font-medium">
                          {edu.grade}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* FAMILY BACKGROUND */}
          {visibility.familyBackground && (family.fatherName || family.motherName) && (
            <section>
              <div className="border-b-2 border-slate-200 pb-1 mb-1.5">
                <h2
                  className="text-xs font-black uppercase tracking-wider flex items-center gap-2"
                  style={{ color: primaryColor }}
                >
                  {labels.family}
                </h2>
              </div>

              <div className="space-y-1 text-[10.5px]">
                {family.fatherName && (
                  <div className="flex items-start gap-1.5">
                    <span className="w-1.5 h-1.5 mt-1 shrink-0" style={{ backgroundColor: primaryColor }}></span>
                    <div>
                      <span className="font-bold text-slate-800">{labels.father} </span>
                      <span className="font-semibold text-slate-700">{family.fatherName}</span>
                      {family.fatherOccupation && (
                        <span className="block text-[9.5px] text-slate-600">
                          {labels.fatherOcc} {family.fatherOccupation}
                        </span>
                      )}
                    </div>
                  </div>
                )}

                {family.motherName && (
                  <div className="flex items-start gap-1.5">
                    <span className="w-1.5 h-1.5 mt-1 shrink-0" style={{ backgroundColor: primaryColor }}></span>
                    <div>
                      <span className="font-bold text-slate-800">{labels.mother} </span>
                      <span className="font-semibold text-slate-700">{family.motherName}</span>
                      {family.motherOccupation && (
                        <span className="block text-[9.5px] text-slate-600">
                          {labels.motherOcc} {family.motherOccupation}
                        </span>
                      )}
                    </div>
                  </div>
                )}

                {family.siblings && (
                  <div className="flex items-start gap-1.5">
                    <span className="w-1.5 h-1.5 mt-1 shrink-0" style={{ backgroundColor: primaryColor }}></span>
                    <div>
                      <span className="font-bold text-slate-800">{labels.siblings} </span>
                      <span className="text-slate-700 font-medium">{family.siblings}</span>
                      {family.positionInFamily && (
                        <span className="block text-[9.5px] text-slate-700 font-semibold italic">
                          {labels.posInFamily} {family.positionInFamily}
                        </span>
                      )}
                    </div>
                  </div>
                )}

                {family.sistersMaritalStatus && (
                  <div className="flex items-start gap-1.5">
                    <span className="w-1.5 h-1.5 mt-1 shrink-0" style={{ backgroundColor: primaryColor }}></span>
                    <div>
                      <span className="font-bold text-slate-800">{labels.sistersMarital} </span>
                      <span className="text-[10px] italic text-slate-700 font-medium">
                        {family.sistersMaritalStatus}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </section>
          )}

          {/* MATRIMONIAL EXPECTATIONS & RELIGIOUS HABITS (If Active) */}
          {visibility.matrimonialDetails && matrimonial && (
            <section className="bg-amber-50/50 p-2.5 rounded-lg border border-amber-200/60">
              <div className="border-b border-amber-300/80 pb-1 mb-1.5 flex items-center justify-between">
                <h2
                  className="text-xs font-black uppercase tracking-wider flex items-center gap-1.5"
                  style={{ color: primaryColor }}
                >
                  <Heart className="w-3.5 h-3.5 text-rose-600" />
                  <span>{labels.matrimonial}</span>
                </h2>
              </div>

              <div className="space-y-1 text-[10px] text-slate-700">
                {(matrimonial.partnerExpectations.ageRange || matrimonial.partnerExpectations.education) && (
                  <div className="grid grid-cols-2 gap-1 pb-1 border-b border-amber-200/50">
                    {matrimonial.partnerExpectations.ageRange && (
                      <div>
                        <span className="font-bold text-slate-800">{labels.expectedAge} </span>
                        <span>{matrimonial.partnerExpectations.ageRange}</span>
                      </div>
                    )}
                    {matrimonial.partnerExpectations.education && (
                      <div>
                        <span className="font-bold text-slate-800">{labels.expectedEdu} </span>
                        <span>{matrimonial.partnerExpectations.education}</span>
                      </div>
                    )}
                  </div>
                )}

                {matrimonial.partnerExpectations.religiousPractices && (
                  <div>
                    <span className="font-bold text-slate-800">{labels.religiousPractices} </span>
                    <span className="text-slate-700 leading-snug">
                      {matrimonial.partnerExpectations.religiousPractices}
                    </span>
                  </div>
                )}

                {matrimonial.religiousAndLifestyle?.prayers && (
                  <div className="pt-1 border-t border-amber-200/50">
                    <span className="font-bold text-slate-800">{labels.lifestyle}: </span>
                    <span className="text-slate-700">
                      {matrimonial.religiousAndLifestyle.prayers}
                    </span>
                  </div>
                )}

                {matrimonial.guardianContact?.phone && (
                  <div className="pt-1 font-semibold text-amber-900 flex items-center gap-1">
                    <span>{labels.guardianContact}</span>
                    <span>
                      {matrimonial.guardianContact.name ? `${matrimonial.guardianContact.name} - ` : ''}
                      {matrimonial.guardianContact.phone}
                    </span>
                  </div>
                )}
              </div>
            </section>
          )}

          {/* CUSTOM USER SECTIONS */}
          {visibility.customSections && customSections.length > 0 && (
            <div className="space-y-3">
              {customSections.map((cs) => (
                <section key={cs.id}>
                  <div className="border-b-2 border-slate-200 pb-1 mb-1.5">
                    <h2
                      className="text-xs font-black uppercase tracking-wider flex items-center gap-2"
                      style={{ color: primaryColor }}
                    >
                      {cs.title}
                    </h2>
                  </div>
                  <div className="space-y-1.5 text-[10.5px]">
                    {cs.items.map((item) => (
                      <div key={item.id} className="flex items-start gap-1.5">
                        <span
                          className="w-1.5 h-1.5 mt-1 shrink-0"
                          style={{ backgroundColor: primaryColor }}
                        ></span>
                        <div className="flex-1">
                          <div className="font-bold text-slate-800 leading-tight">
                            {item.title}
                            {item.period && (
                              <span className="font-semibold text-slate-500"> ({item.period})</span>
                            )}
                          </div>
                          {item.subtitle && (
                            <div className="text-[10px] text-slate-600 font-medium">{item.subtitle}</div>
                          )}
                          {item.details && (
                            <p className="text-[9.5px] text-slate-600 leading-snug">{item.details}</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          )}
        </div>

        {/* Bottom Right Decorative Geometric Intersecting Circles */}
        <div className="flex justify-end items-center mt-2 pt-1">
          <div className="relative w-14 h-8 flex items-center justify-end">
            <div
              className="w-7 h-7 rounded-full opacity-90 -mr-2.5"
              style={{ backgroundColor: secondaryColor }}
            />
            <div
              className="w-7 h-7 rounded-full mix-blend-multiply opacity-90"
              style={{ backgroundColor: primaryColor }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
