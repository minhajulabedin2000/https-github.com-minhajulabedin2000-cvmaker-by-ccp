import React from 'react';
import { ResumeData } from '../../types/resume';

interface TemplateProps {
  data: ResumeData;
}

export const ModernSlateTemplate: React.FC<TemplateProps> = ({ data }) => {
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
    documentLanguage = 'bn',
  } = data;

  const isBn = documentLanguage === 'bn';

  return (
    <div
      id="cv-page"
      className="a4-page relative text-slate-800 bg-white p-8 flex flex-col justify-between shadow-2xl print-page"
      style={{
        fontFamily: isBn ? "'Noto Sans Bengali', 'Hind Siliguri', 'Plus Jakarta Sans', sans-serif" : "'Plus Jakarta Sans', sans-serif",
        minHeight: '297mm',
        height: '297mm',
        width: '210mm',
      }}
    >
      <div>
        {/* Minimalist Top Header */}
        <div className="flex justify-between items-start border-b border-slate-900 pb-4">
          <div>
            <h1 className="text-2xl font-light tracking-tight text-slate-900 uppercase">
              <span className="font-bold">{personal.name ? personal.name.split(' ')[0] : 'YOUR'}</span>{' '}
              {personal.name ? personal.name.split(' ').slice(1).join(' ') : 'NAME'}
            </h1>
            <p className="text-[11px] tracking-widest text-slate-500 uppercase mt-0.5 font-mono">
              {personal.tagline || 'CURRICULUM VITAE & BIO-DATA'}
            </p>
          </div>

          <div className="text-right text-[11px] text-slate-600 space-y-0.5">
            {personal.phone && <div>{personal.phone}</div>}
            {personal.email && <div>{personal.email}</div>}
            {personal.facebook && <div>{personal.facebook.replace(/^https?:\/\/(www\.)?/, '')}</div>}
            {personal.instagram && <div>{personal.instagram.replace(/^https?:\/\/(www\.)?/, '')}</div>}
          </div>
        </div>

        {/* Content Body */}
        <div className="grid grid-cols-3 gap-6 mt-5">
          <div className="col-span-2 space-y-4">
            {visibility.professionalProfile && (
              <section>
                <h2 className="text-[11px] font-mono uppercase tracking-wider text-slate-400 mb-1.5">
                  01 / {sectionTitles.profile || (isBn ? 'প্রোফাইল ও উদ্যোগ' : 'PROFILE & VENTURES')}
                </h2>
                {profile.profession && (
                  <div className="text-xs font-semibold text-slate-900 mb-1">
                    {profile.profession}
                  </div>
                )}
                {profile.summary && (
                  <p className="text-[10.5px] text-slate-600 leading-relaxed mb-2">
                    {profile.summary}
                  </p>
                )}
                {profile.businessVentures.length > 0 && (
                  <div className="space-y-1.5">
                    {profile.businessVentures.map((v) => (
                      <div key={v.id} className="text-[10.5px]">
                        <span className="font-semibold text-slate-900">{v.name}</span>
                        <span className="text-slate-500"> {v.role}</span>
                        {v.details && <p className="text-[10px] text-slate-600 mt-0.5">{v.details}</p>}
                      </div>
                    ))}
                  </div>
                )}
              </section>
            )}

            {visibility.organizationalExperience && experience.length > 0 && (
              <section>
                <h2 className="text-[11px] font-mono uppercase tracking-wider text-slate-400 mb-1.5">
                  02 / {sectionTitles.experience || (isBn ? 'অভিজ্ঞতা' : 'ORGANIZATIONAL EXPERIENCE')}
                </h2>
                <div className="space-y-2">
                  {experience.map((exp) => (
                    <div key={exp.id} className="text-xs">
                      <div className="flex justify-between font-semibold text-slate-900 text-[11px]">
                        <span>{exp.role}</span>
                        <span className="text-slate-400 font-mono text-[10px]">{exp.period}</span>
                      </div>
                      <div className="text-slate-600 text-[10.5px]">{exp.organization}</div>
                      {exp.details && <p className="text-[10px] text-slate-500 mt-0.5">{exp.details}</p>}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {visibility.education && education.length > 0 && (
              <section>
                <h2 className="text-[11px] font-mono uppercase tracking-wider text-slate-400 mb-1.5">
                  03 / {sectionTitles.education || (isBn ? 'শিক্ষা' : 'EDUCATION')}
                </h2>
                <div className="space-y-2">
                  {education.map((edu) => (
                    <div key={edu.id} className="text-xs">
                      <div className="flex justify-between font-semibold text-slate-900 text-[11px]">
                        <span>{edu.degree}</span>
                        <span className="text-slate-400 font-mono text-[10px]">{edu.sessionOrYear}</span>
                      </div>
                      <div className="text-slate-600 text-[10.5px]">{edu.institution}</div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {visibility.customSections && customSections.length > 0 && (
              <div className="space-y-3">
                {customSections.map((cs, idx) => (
                  <section key={cs.id}>
                    <h2 className="text-[11px] font-mono uppercase tracking-wider text-slate-400 mb-1.5">
                      0{4 + idx} / {cs.title}
                    </h2>
                    <div className="space-y-1.5">
                      {cs.items.map((item) => (
                        <div key={item.id} className="text-xs">
                          <div className="font-semibold text-slate-900 text-[11px]">
                            {item.title} {item.period && <span className="text-slate-400 font-mono text-[10px]">({item.period})</span>}
                          </div>
                          {item.details && <p className="text-[10px] text-slate-500">{item.details}</p>}
                        </div>
                      ))}
                    </div>
                  </section>
                ))}
              </div>
            )}
          </div>

          {/* Right 1 Col */}
          <div className="space-y-4 border-l border-slate-100 pl-4">
            {visibility.photo && personal.photoUrl && (
              <div className="w-20 h-20 rounded-full overflow-hidden border border-slate-200">
                <img
                  src={personal.photoUrl}
                  alt={personal.name}
                  className="w-full h-full object-cover grayscale"
                  referrerPolicy="no-referrer"
                />
              </div>
            )}

            {visibility.skills && skills.length > 0 && (
              <section>
                <h2 className="text-[11px] font-mono uppercase tracking-wider text-slate-400 mb-1.5">
                  {sectionTitles.skills || (isBn ? 'দক্ষতা' : 'SKILLS')}
                </h2>
                <div className="flex flex-wrap gap-1">
                  {skills.map((s) => (
                    <span
                      key={s.id}
                      className="text-[10px] font-medium text-slate-800 bg-slate-100 px-1.5 py-0.5 rounded"
                    >
                      {s.name}
                    </span>
                  ))}
                </div>
              </section>
            )}

            {visibility.personalInfo && (
              <section>
                <h2 className="text-[11px] font-mono uppercase tracking-wider text-slate-400 mb-1.5">
                  {isBn ? 'ব্যক্তিগত তথ্য' : 'BIO-DATA'}
                </h2>
                <div className="text-[10px] space-y-1 text-slate-700">
                  {personal.dateOfBirth && <div><span className="text-slate-400">{isBn ? 'জন্ম:' : 'DOB:'}</span> {personal.dateOfBirth}</div>}
                  {personal.age && <div><span className="text-slate-400">{isBn ? 'বয়স:' : 'Age:'}</span> {personal.age}</div>}
                  {personal.height && <div><span className="text-slate-400">{isBn ? 'উচ্চতা:' : 'Height:'}</span> {personal.height}</div>}
                  {personal.bloodGroup && <div><span className="text-slate-400">{isBn ? 'রক্ত:' : 'Blood:'}</span> <span className="font-semibold">{personal.bloodGroup}</span></div>}
                  {personal.maritalStatus && <div><span className="text-slate-400">{isBn ? 'অবস্থা:' : 'Status:'}</span> {personal.maritalStatus}</div>}
                </div>
              </section>
            )}

            {visibility.matrimonialDetails && matrimonial && (
              <section className="bg-slate-50 p-2 rounded text-[10px] space-y-1 border border-slate-200">
                <div className="font-mono text-slate-500 uppercase">{isBn ? 'জীবনসঙ্গী প্রত্যাশা' : 'Expectations'}</div>
                {matrimonial.partnerExpectations.ageRange && <div>{matrimonial.partnerExpectations.ageRange}</div>}
                {matrimonial.partnerExpectations.education && <div>{matrimonial.partnerExpectations.education}</div>}
              </section>
            )}

            {visibility.familyBackground && (family.fatherName || family.motherName) && (
              <section>
                <h2 className="text-[11px] font-mono uppercase tracking-wider text-slate-400 mb-1.5">
                  {isBn ? 'পরিবার' : 'FAMILY'}
                </h2>
                <div className="text-[10px] space-y-0.5 text-slate-700">
                  {family.fatherName && <div><span className="font-medium">{isBn ? 'পিতা:' : 'Father:'}</span> {family.fatherName}</div>}
                  {family.motherName && <div><span className="font-medium">{isBn ? 'মাতা:' : 'Mother:'}</span> {family.motherName}</div>}
                  {family.siblings && <div><span className="font-medium">{isBn ? 'ভাই-বোন:' : 'Siblings:'}</span> {family.siblings}</div>}
                </div>
              </section>
            )}
          </div>
        </div>
      </div>

      <div className="border-t border-slate-100 pt-2 text-[9.5px] text-slate-400 font-mono text-center">
        BioCraft Minimalist Edition
      </div>
    </div>
  );
};
