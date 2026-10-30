import React from 'react';
import { ResumeData, CustomSection, CustomSectionItem } from '../../types/resume';
import { translations, Language } from '../../data/translations';
import { Plus, Trash2, Layers, Edit2 } from 'lucide-react';

interface Props {
  data: ResumeData;
  onChange: (data: ResumeData) => void;
  lang: Language;
}

export const CustomSectionsEditor: React.FC<Props> = ({ data, onChange, lang }) => {
  const customSections = data.customSections || [];
  const sectionTitles = data.sectionTitles || {};

  // Custom section actions
  const addCustomSection = () => {
    const newSection: CustomSection = {
      id: `cs-${Date.now()}`,
      title: 'নতুন সেকশনের শিরোনাম (Custom Section)',
      items: [
        {
          id: `item-${Date.now()}`,
          title: 'শিরোনাম / বিষয়ের নাম',
          subtitle: 'উপ-শিরোনাম / প্রতিষ্ঠান',
          period: '২০২৫',
          details: 'বিস্তারিত বিবরণ বা অর্জনের তথ্য...',
        },
      ],
    };
    onChange({
      ...data,
      customSections: [...customSections, newSection],
    });
  };

  const updateSectionTitle = (id: string, newTitle: string) => {
    const updated = customSections.map((s) =>
      s.id === id ? { ...s, title: newTitle } : s
    );
    onChange({ ...data, customSections: updated });
  };

  const removeCustomSection = (id: string) => {
    onChange({
      ...data,
      customSections: customSections.filter((s) => s.id !== id),
    });
  };

  // Section items actions
  const addItemToSection = (sectionId: string) => {
    const newItem: CustomSectionItem = {
      id: `item-${Date.now()}`,
      title: '',
      subtitle: '',
      period: '',
      details: '',
    };
    const updated = customSections.map((s) =>
      s.id === sectionId ? { ...s, items: [...s.items, newItem] } : s
    );
    onChange({ ...data, customSections: updated });
  };

  const updateItem = (
    sectionId: string,
    itemId: string,
    field: keyof CustomSectionItem,
    val: string
  ) => {
    const updated = customSections.map((s) => {
      if (s.id !== sectionId) return s;
      return {
        ...s,
        items: s.items.map((i) => (i.id === itemId ? { ...i, [field]: val } : i)),
      };
    });
    onChange({ ...data, customSections: updated });
  };

  const removeItem = (sectionId: string, itemId: string) => {
    const updated = customSections.map((s) => {
      if (s.id !== sectionId) return s;
      return { ...s, items: s.items.filter((i) => i.id !== itemId) };
    });
    onChange({ ...data, customSections: updated });
  };

  // Update default section titles override
  const updateDefaultTitle = (key: keyof typeof sectionTitles, val: string) => {
    onChange({
      ...data,
      sectionTitles: {
        ...sectionTitles,
        [key]: val,
      },
    });
  };

  return (
    <div className="space-y-6">
      {/* Custom Sections Creator */}
      <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
        <div className="flex items-center justify-between pb-2 mb-3 border-b border-slate-200">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-teal-600" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">
              নিজের মতো অতিরিক্ত সেকশন (Custom Sections)
            </h3>
          </div>
          <button
            type="button"
            onClick={addCustomSection}
            className="flex items-center gap-1 px-3 py-1 text-xs font-bold text-white bg-teal-600 hover:bg-teal-700 rounded-lg transition-colors shadow-2xs"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>+ নতুন সেকশন যোগ করুন</span>
          </button>
        </div>

        <div className="space-y-4">
          {customSections.map((section, sIdx) => (
            <div
              key={section.id}
              className="p-4 bg-white rounded-xl border border-slate-200 shadow-2xs space-y-3"
            >
              <div className="flex items-center justify-between gap-3 pb-2 border-b border-slate-100">
                <div className="flex-1">
                  <label className="block text-[10px] font-semibold text-slate-500 mb-0.5">
                    সেকশন #{sIdx + 1} এর শিরোনাম
                  </label>
                  <input
                    type="text"
                    value={section.title}
                    onChange={(e) => updateSectionTitle(section.id, e.target.value)}
                    placeholder="যেমন: পোর্টফোলিও ও প্রজেক্ট / রেফারেন্স / পাবলিকেশন"
                    className="w-full px-2.5 py-1 text-xs font-bold text-slate-800 border border-slate-300 rounded focus:ring-1 focus:ring-teal-500"
                  />
                </div>
                <div className="flex items-center gap-2 pt-4">
                  <button
                    type="button"
                    onClick={() => addItemToSection(section.id)}
                    className="text-xs text-teal-600 hover:text-teal-800 font-semibold flex items-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>আইটেম যোগ</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => removeCustomSection(section.id)}
                    className="text-slate-400 hover:text-red-600 p-1"
                    title="Delete section"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Items list */}
              <div className="space-y-2.5">
                {section.items.map((item) => (
                  <div
                    key={item.id}
                    className="p-2.5 bg-slate-50 rounded-lg border border-slate-200 space-y-2"
                  >
                    <div className="flex justify-between items-center">
                      <input
                        type="text"
                        value={item.title}
                        onChange={(e) =>
                          updateItem(section.id, item.id, 'title', e.target.value)
                        }
                        placeholder="আইটেম শিরোনাম (যেমন: প্রজেক্টের নাম বা পদ)"
                        className="flex-1 px-2 py-1 text-xs font-semibold bg-white border border-slate-300 rounded focus:ring-1 focus:ring-teal-500"
                      />
                      <button
                        type="button"
                        onClick={() => removeItem(section.id, item.id)}
                        className="text-slate-400 hover:text-red-600 ml-2 p-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      <input
                        type="text"
                        value={item.subtitle || ''}
                        onChange={(e) =>
                          updateItem(section.id, item.id, 'subtitle', e.target.value)
                        }
                        placeholder="উপ-শিরোনাম / প্রতিষ্ঠান / ক্লায়েন্ট"
                        className="px-2 py-1 text-xs bg-white border border-slate-300 rounded focus:ring-1 focus:ring-teal-500"
                      />
                      <input
                        type="text"
                        value={item.period || ''}
                        onChange={(e) =>
                          updateItem(section.id, item.id, 'period', e.target.value)
                        }
                        placeholder="সাল / সময়কাল (যেমন: ২০২৪)"
                        className="px-2 py-1 text-xs bg-white border border-slate-300 rounded focus:ring-1 focus:ring-teal-500"
                      />
                    </div>

                    <textarea
                      rows={2}
                      value={item.details || ''}
                      onChange={(e) =>
                        updateItem(section.id, item.id, 'details', e.target.value)
                      }
                      placeholder="বিস্তারিত বিবরণ..."
                      className="w-full px-2 py-1 text-xs bg-white border border-slate-300 rounded focus:ring-1 focus:ring-teal-500 leading-snug"
                    />
                  </div>
                ))}

                {section.items.length === 0 && (
                  <div className="text-center py-2 text-xs text-slate-400 italic">
                    কোনো আইটেম নেই। উপরে '+ আইটেম যোগ' বাটনে চাপ দিন।
                  </div>
                )}
              </div>
            </div>
          ))}

          {customSections.length === 0 && (
            <div className="text-center py-4 text-xs text-slate-400 italic">
              কোনো কাস্টম সেকশন নেই। আপনার প্রয়োজনমতো রেফারেন্স, পোর্টফোলিও বা বিশেষ সেকশন যোগ করতে পারেন।
            </div>
          )}
        </div>
      </div>

      {/* Customize Default Section Headings */}
      <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
        <div className="flex items-center gap-2 pb-2 mb-3 border-b border-slate-200">
          <Edit2 className="w-4 h-4 text-teal-600" />
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">
            ডিফল্ট সেকশন টাইটেল পরিবর্তন (Custom Section Titles)
          </h3>
        </div>

        <p className="text-[11px] text-slate-500 mb-3">
          সিভিতে প্রদর্শিত মূল সেকশনগুলোর নাম আপনার পছন্দমতো পরিবর্তন করতে পারেন (ফাঁকা রাখলে স্বয়ংক্রিয় ডিফল্ট নাম দেখাবে):
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
          <div>
            <label className="block text-[10px] font-semibold text-slate-600 mb-0.5">
              ব্যক্তিগত তথ্য সেকশনের নাম
            </label>
            <input
              type="text"
              value={sectionTitles.personalInfo || ''}
              onChange={(e) => updateDefaultTitle('personalInfo', e.target.value)}
              placeholder="ডিফল্ট: PERSONAL INFORMATION"
              className="w-full px-2.5 py-1 text-xs bg-white border border-slate-300 rounded"
            />
          </div>

          <div>
            <label className="block text-[10px] font-semibold text-slate-600 mb-0.5">
              পেশাদার প্রোফাইল সেকশনের নাম
            </label>
            <input
              type="text"
              value={sectionTitles.profile || ''}
              onChange={(e) => updateDefaultTitle('profile', e.target.value)}
              placeholder="ডিফল্ট: PROFESSIONAL PROFILE"
              className="w-full px-2.5 py-1 text-xs bg-white border border-slate-300 rounded"
            />
          </div>

          <div>
            <label className="block text-[10px] font-semibold text-slate-600 mb-0.5">
              সাংগঠনিক অভিজ্ঞতা সেকশনের নাম
            </label>
            <input
              type="text"
              value={sectionTitles.experience || ''}
              onChange={(e) => updateDefaultTitle('experience', e.target.value)}
              placeholder="ডিফল্ট: ORGANIZATIONAL EXPERIENCE"
              className="w-full px-2.5 py-1 text-xs bg-white border border-slate-300 rounded"
            />
          </div>

          <div>
            <label className="block text-[10px] font-semibold text-slate-600 mb-0.5">
              শিক্ষাগত যোগ্যতা সেকশনের নাম
            </label>
            <input
              type="text"
              value={sectionTitles.education || ''}
              onChange={(e) => updateDefaultTitle('education', e.target.value)}
              placeholder="ডিফল্ট: EDUCATIONAL QUALIFICATIONS"
              className="w-full px-2.5 py-1 text-xs bg-white border border-slate-300 rounded"
            />
          </div>

          <div>
            <label className="block text-[10px] font-semibold text-slate-600 mb-0.5">
              পারিবারিক বিবরণ সেকশনের নাম
            </label>
            <input
              type="text"
              value={sectionTitles.family || ''}
              onChange={(e) => updateDefaultTitle('family', e.target.value)}
              placeholder="ডিফল্ট: FAMILY BACKGROUND"
              className="w-full px-2.5 py-1 text-xs bg-white border border-slate-300 rounded"
            />
          </div>

          <div>
            <label className="block text-[10px] font-semibold text-slate-600 mb-0.5">
              দক্ষতা সেকশনের নাম
            </label>
            <input
              type="text"
              value={sectionTitles.skills || ''}
              onChange={(e) => updateDefaultTitle('skills', e.target.value)}
              placeholder="ডিফল্ট: SKILLS"
              className="w-full px-2.5 py-1 text-xs bg-white border border-slate-300 rounded"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
