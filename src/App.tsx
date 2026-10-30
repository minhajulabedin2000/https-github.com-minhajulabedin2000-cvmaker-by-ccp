import React, { useState, useEffect, useRef } from 'react';
import { ResumeData } from './types/resume';
import { initialSampleData, emptyResumeData } from './data/initialData';
import { translations, Language } from './data/translations';
import { downloadPdfFromElement, printDocument, exportJsonData } from './utils/pdfExport';
import { PersonalEditor } from './components/editor/PersonalEditor';
import { BiodataFamilyEditor } from './components/editor/BiodataFamilyEditor';
import { MatrimonialEditor } from './components/editor/MatrimonialEditor';
import { ExperienceVenturesEditor } from './components/editor/ExperienceVenturesEditor';
import { EducationEditor } from './components/editor/EducationEditor';
import { SkillsLanguagesEditor } from './components/editor/SkillsLanguagesEditor';
import { CustomSectionsEditor } from './components/editor/CustomSectionsEditor';
import { DesignSettingsEditor } from './components/editor/DesignSettingsEditor';
import { CvPreviewContainer } from './components/preview/CvPreviewContainer';
import { PublicShareModal } from './components/modals/PublicShareModal';
import {
  FileDown,
  Printer,
  RotateCcw,
  Sparkles,
  User,
  Heart,
  Briefcase,
  GraduationCap,
  Zap,
  Palette,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Upload,
  Download,
  CheckCircle2,
  FileText,
  Eye,
  Edit3,
  Layers,
  Globe,
} from 'lucide-react';

const STORAGE_KEY = 'ccp_cv_maker_data_v1';

export default function App() {
  const [data, setData] = useState<ResumeData>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Failed to load from storage:', e);
    }
    return initialSampleData;
  });

  const [lang, setLang] = useState<Language>('bn');
  const [activeTab, setActiveTab] = useState<
    'personal' | 'biodata' | 'matrimonial' | 'experience' | 'education' | 'skills' | 'custom' | 'theme'
  >('personal');
  const [mobileView, setMobileView] = useState<'edit' | 'preview'>('edit');
  const [zoomScale, setZoomScale] = useState<number>(0.85);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isShareModalOpen, setIsShareModalOpen] = useState<boolean>(false);
  const fileImportRef = useRef<HTMLInputElement>(null);

  const t = translations[lang];

  // Save to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
      console.error('Failed to save to storage:', e);
    }
  }, [data]);

  // Adjust default zoom on window resize
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setZoomScale(0.42);
      } else if (width < 1024) {
        setZoomScale(0.65);
      } else if (width < 1440) {
        setZoomScale(0.8);
      } else {
        setZoomScale(0.92);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleDownloadPdf = async () => {
    setIsGeneratingPdf(true);
    const fileName = `${data.personal.name ? data.personal.name.replace(/\s+/g, '_') : 'BioData'}_CV.pdf`;
    const success = await downloadPdfFromElement('cv-page', fileName, setIsGeneratingPdf);
    if (success) {
      showToast(t.pdfSuccess);
    }
  };

  const handlePrint = () => {
    printDocument();
  };

  const handleResetToSample = () => {
    if (window.confirm('নমুনা ডেমো ডাটা পুনরায় লোড করতে চান?')) {
      setData(initialSampleData);
      showToast(t.dataLoadedSuccess);
    }
  };

  const handleClear = () => {
    if (window.confirm('সব তথ্য মুছে সম্পূর্ণ নতুন ফাঁকা সিভি তৈরি করতে চান?')) {
      setData(emptyResumeData);
    }
  };

  const handleImportJson = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const parsed = JSON.parse(event.target?.result as string);
          if (parsed.personal) {
            setData(parsed);
            showToast(t.dataLoadedSuccess);
          }
        } catch (err) {
          console.error(err);
          alert('অবৈধ JSON ফাইল!');
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col text-slate-800 antialiased selection:bg-teal-500 selection:text-white">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed top-4 right-4 z-50 bg-slate-900 text-white px-4 py-2.5 rounded-xl shadow-xl flex items-center gap-2 text-xs font-semibold animate-in fade-in slide-in-from-top-2 no-print">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Bar Contract (1-line wordmark, nav links, 1 primary action) */}
      <header className="no-print bg-white border-b border-slate-200 px-6 py-3 flex items-center justify-between gap-8 sticky top-0 z-40 shadow-xs">
        {/* Zone 1: Brand Wordmark */}
        <div className="flex items-center gap-2.5 shrink-0">
          <div className="w-8 h-8 rounded-lg bg-teal-700 flex items-center justify-center text-white shadow-2xs font-black text-xs">
            CCP
          </div>
          <div>
            <a href="/" className="text-base font-bold tracking-tight text-slate-900 whitespace-nowrap shrink-0 block">
              ক্রিয়েটিভ কনসেপ্ট পয়েন্ট
            </a>
            <span className="text-[10.5px] text-teal-700 font-semibold block leading-none">
              সিভি মেকার | {t.appSubtitle}
            </span>
          </div>
        </div>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden xl:flex items-center gap-5 text-xs font-medium text-slate-600">
          <button
            onClick={() => setActiveTab('personal')}
            className={`hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 ${activeTab === 'personal' ? 'text-teal-700 font-bold' : ''}`}
          >
            {t.tabs.personal}
          </button>
          <button
            onClick={() => setActiveTab('biodata')}
            className={`hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 ${activeTab === 'biodata' ? 'text-teal-700 font-bold' : ''}`}
          >
            {t.tabs.biodata}
          </button>
          <button
            onClick={() => setActiveTab('matrimonial')}
            className={`hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 flex items-center gap-1 ${activeTab === 'matrimonial' ? 'text-rose-700 font-bold' : ''}`}
          >
            <Heart className="w-3 h-3 text-rose-500" />
            <span>পাত্র/পাত্রী প্রত্যাশা</span>
          </button>
          <button
            onClick={() => setActiveTab('experience')}
            className={`hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 ${activeTab === 'experience' ? 'text-teal-700 font-bold' : ''}`}
          >
            {t.tabs.experience}
          </button>
          <button
            onClick={() => setActiveTab('education')}
            className={`hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 ${activeTab === 'education' ? 'text-teal-700 font-bold' : ''}`}
          >
            {t.tabs.education}
          </button>
          <button
            onClick={() => setActiveTab('custom')}
            className={`hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 ${activeTab === 'custom' ? 'text-teal-700 font-bold' : ''}`}
          >
            কাস্টম সেকশন
          </button>
        </nav>

        {/* Zone 3: Primary Actions */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Final Print Language Switcher */}
          <div className="flex items-center bg-slate-100 p-0.5 rounded-lg border border-slate-200" title="প্রিন্ট/পিডিএফ এর ভাষা">
            <button
              type="button"
              onClick={() => setData({ ...data, documentLanguage: 'bn' })}
              className={`px-2 py-1 text-[11px] font-bold rounded-md transition-all ${
                data.documentLanguage === 'bn' ? 'bg-white text-teal-800 shadow-2xs' : 'text-slate-500'
              }`}
            >
              প্রিন্ট: বাংলা
            </button>
            <button
              type="button"
              onClick={() => setData({ ...data, documentLanguage: 'en' })}
              className={`px-2 py-1 text-[11px] font-bold rounded-md transition-all ${
                data.documentLanguage === 'en' ? 'bg-white text-teal-800 shadow-2xs' : 'text-slate-500'
              }`}
            >
              Print: EN
            </button>
          </div>

          {/* Public Link / Publish Button */}
          <button
            type="button"
            onClick={() => setIsShareModalOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-teal-800 bg-teal-50 border border-teal-300 hover:bg-teal-100 rounded-lg transition-colors whitespace-nowrap shrink-0 shadow-2xs cursor-pointer"
            title="সবার সাথে শেয়ার বা পাবলিশ করার গাইড"
          >
            <Globe className="w-3.5 h-3.5 text-teal-600" />
            <span className="hidden sm:inline">পাবলিক লিংক</span>
          </button>

          {/* Print/Save Vector Button */}
          <button
            type="button"
            onClick={handlePrint}
            title={t.printPdf}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors whitespace-nowrap shrink-0 shadow-2xs"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>{t.printPdf}</span>
          </button>

          {/* Primary Action Button: PDF Download */}
          <button
            type="button"
            onClick={handleDownloadPdf}
            disabled={isGeneratingPdf}
            className="px-3.5 py-1.5 text-xs font-bold text-white bg-teal-700 hover:bg-teal-800 rounded-lg transition-colors whitespace-nowrap shrink-0 shadow-xs flex items-center gap-1.5 cursor-pointer disabled:opacity-60"
          >
            <FileDown className="w-4 h-4" />
            <span>{isGeneratingPdf ? t.pdfGenerating : t.downloadPdf}</span>
          </button>
        </div>
      </header>

      {/* Sub-Header Toolbar */}
      <div className="no-print bg-slate-50 border-b border-slate-200 px-6 py-2 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 flex-wrap">
          <button
            type="button"
            onClick={handleResetToSample}
            className="px-2.5 py-1 bg-white hover:bg-teal-50 text-teal-800 font-semibold border border-teal-200 rounded-md transition-colors flex items-center gap-1.5 shadow-2xs"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>ডেমো ডাটা লোড</span>
          </button>

          <button
            type="button"
            onClick={handleClear}
            className="px-2.5 py-1 bg-white hover:bg-red-50 text-slate-600 hover:text-red-700 font-medium border border-slate-200 rounded-md transition-colors flex items-center gap-1"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>{t.clearAll}</span>
          </button>

          <input
            type="file"
            ref={fileImportRef}
            onChange={handleImportJson}
            accept=".json"
            className="hidden"
          />
          <button
            type="button"
            onClick={() => fileImportRef.current?.click()}
            className="hidden md:flex items-center gap-1 px-2.5 py-1 bg-white hover:bg-slate-100 text-slate-600 font-medium border border-slate-200 rounded-md transition-colors"
          >
            <Upload className="w-3.5 h-3.5" />
            <span>{t.importJson}</span>
          </button>

          <button
            type="button"
            onClick={() => exportJsonData(data, `${data.personal.name || 'CV'}_data.json`)}
            className="hidden md:flex items-center gap-1 px-2.5 py-1 bg-white hover:bg-slate-100 text-slate-600 font-medium border border-slate-200 rounded-md transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>{t.exportJson}</span>
          </button>
        </div>

        {/* Zoom Controls for Preview */}
        <div className="flex items-center gap-1 bg-white border border-slate-200 rounded-lg p-0.5">
          <button
            type="button"
            onClick={() => setZoomScale((z) => Math.max(0.35, Number((z - 0.1).toFixed(2))))}
            className="p-1 hover:bg-slate-100 text-slate-600 rounded transition-colors"
            title="Zoom Out"
          >
            <ZoomOut className="w-3.5 h-3.5" />
          </button>
          <span className="text-[11px] font-mono text-slate-700 px-1 font-semibold w-10 text-center">
            {Math.round(zoomScale * 100)}%
          </span>
          <button
            type="button"
            onClick={() => setZoomScale((z) => Math.min(1.5, Number((z + 0.1).toFixed(2))))}
            className="p-1 hover:bg-slate-100 text-slate-600 rounded transition-colors"
            title="Zoom In"
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => setZoomScale(0.85)}
            className="p-1 hover:bg-slate-100 text-slate-600 rounded transition-colors border-l border-slate-200 pl-1.5 ml-0.5"
            title="Fit Default"
          >
            <Maximize2 className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Mobile View Toggle Switch (Edit vs Preview) */}
        <div className="lg:hidden flex items-center bg-slate-200 p-0.5 rounded-lg w-full sm:w-auto justify-center mt-1 sm:mt-0">
          <button
            type="button"
            onClick={() => setMobileView('edit')}
            className={`flex-1 sm:flex-none flex items-center justify-center gap-1 px-3 py-1.5 text-xs font-bold rounded-md transition-all ${
              mobileView === 'edit' ? 'bg-white text-teal-800 shadow-xs' : 'text-slate-600'
            }`}
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>{t.editTab}</span>
          </button>
          <button
            type="button"
            onClick={() => setMobileView('preview')}
            className={`flex-1 sm:flex-none flex items-center justify-center gap-1 px-3 py-1.5 text-xs font-bold rounded-md transition-all ${
              mobileView === 'preview' ? 'bg-white text-teal-800 shadow-xs' : 'text-slate-600'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>{t.previewTab}</span>
          </button>
        </div>
      </div>

      {/* Main Workspace Layout (Two Columns on Desktop) */}
      <main className="flex-1 flex flex-col lg:flex-row overflow-hidden relative">
        {/* Left Side: Interactive Editor */}
        <section
          className={`no-print lg:w-[48%] xl:w-[42%] 2xl:w-[38%] bg-white border-r border-slate-200 flex flex-col shrink-0 ${
            mobileView === 'preview' ? 'hidden lg:flex' : 'flex'
          }`}
        >
          {/* Editor Tabs Navigation */}
          <div className="flex border-b border-slate-200 overflow-x-auto bg-slate-50/70 p-2 gap-1.5 scrollbar-thin">
            <button
              type="button"
              onClick={() => setActiveTab('personal')}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg flex items-center gap-1.5 whitespace-nowrap transition-all ${
                activeTab === 'personal'
                  ? 'bg-teal-700 text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-200/70'
              }`}
            >
              <User className="w-3.5 h-3.5" />
              <span>{t.tabs.personal}</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('biodata')}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg flex items-center gap-1.5 whitespace-nowrap transition-all ${
                activeTab === 'biodata'
                  ? 'bg-teal-700 text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-200/70'
              }`}
            >
              <Heart className="w-3.5 h-3.5" />
              <span>{t.tabs.biodata}</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('matrimonial')}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg flex items-center gap-1.5 whitespace-nowrap transition-all ${
                activeTab === 'matrimonial'
                  ? 'bg-rose-700 text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-200/70'
              }`}
            >
              <Heart className="w-3.5 h-3.5 text-rose-300" />
              <span>পাত্র/পাত্রী প্রত্যাশা</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('experience')}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg flex items-center gap-1.5 whitespace-nowrap transition-all ${
                activeTab === 'experience'
                  ? 'bg-teal-700 text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-200/70'
              }`}
            >
              <Briefcase className="w-3.5 h-3.5" />
              <span>{t.tabs.experience}</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('education')}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg flex items-center gap-1.5 whitespace-nowrap transition-all ${
                activeTab === 'education'
                  ? 'bg-teal-700 text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-200/70'
              }`}
            >
              <GraduationCap className="w-3.5 h-3.5" />
              <span>{t.tabs.education}</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('skills')}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg flex items-center gap-1.5 whitespace-nowrap transition-all ${
                activeTab === 'skills'
                  ? 'bg-teal-700 text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-200/70'
              }`}
            >
              <Zap className="w-3.5 h-3.5" />
              <span>{t.tabs.skills}</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('custom')}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg flex items-center gap-1.5 whitespace-nowrap transition-all ${
                activeTab === 'custom'
                  ? 'bg-teal-700 text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-200/70'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>কাস্টম সেকশন</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('theme')}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg flex items-center gap-1.5 whitespace-nowrap transition-all ${
                activeTab === 'theme'
                  ? 'bg-teal-700 text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-200/70'
              }`}
            >
              <Palette className="w-3.5 h-3.5" />
              <span>{t.tabs.theme}</span>
            </button>
          </div>

          {/* Tab Content Form */}
          <div className="flex-1 overflow-y-auto p-5 space-y-6">
            {activeTab === 'personal' && (
              <PersonalEditor data={data} onChange={setData} lang={lang} />
            )}
            {activeTab === 'biodata' && (
              <BiodataFamilyEditor data={data} onChange={setData} lang={lang} />
            )}
            {activeTab === 'matrimonial' && (
              <MatrimonialEditor data={data} onChange={setData} lang={lang} />
            )}
            {activeTab === 'experience' && (
              <ExperienceVenturesEditor data={data} onChange={setData} lang={lang} />
            )}
            {activeTab === 'education' && (
              <EducationEditor data={data} onChange={setData} lang={lang} />
            )}
            {activeTab === 'skills' && (
              <SkillsLanguagesEditor data={data} onChange={setData} lang={lang} />
            )}
            {activeTab === 'custom' && (
              <CustomSectionsEditor data={data} onChange={setData} lang={lang} />
            )}
            {activeTab === 'theme' && (
              <DesignSettingsEditor data={data} onChange={setData} lang={lang} />
            )}
          </div>
        </section>

        {/* Right Side: Live A4 Document Preview */}
        <section
          className={`flex-1 bg-slate-300/70 overflow-auto flex flex-col items-center justify-start relative ${
            mobileView === 'edit' ? 'hidden lg:flex' : 'flex'
          }`}
        >
          {/* Responsive Preview Sticky Notice on mobile */}
          <div className="lg:hidden no-print w-full bg-slate-900 text-white px-4 py-2 flex items-center justify-between text-xs sticky top-0 z-30 shadow-md">
            <span>লাইভ প্রিভিউ ({data.documentLanguage === 'bn' ? 'বাংলা সংস্করণ' : 'English Edition'})</span>
            <button
              type="button"
              onClick={handleDownloadPdf}
              disabled={isGeneratingPdf}
              className="px-3 py-1 bg-teal-600 text-white font-bold rounded text-xs flex items-center gap-1"
            >
              <FileDown className="w-3.5 h-3.5" />
              <span>ডাউনলোড</span>
            </button>
          </div>

          {/* Central Scaled Preview Container */}
          <div className="w-full flex-1 flex justify-center items-start p-4 md:p-8">
            <CvPreviewContainer data={data} zoomScale={zoomScale} />
          </div>
        </section>
      </main>

      {/* Public Share & Deployment Guide Modal */}
      <PublicShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
      />
    </div>
  );
}
