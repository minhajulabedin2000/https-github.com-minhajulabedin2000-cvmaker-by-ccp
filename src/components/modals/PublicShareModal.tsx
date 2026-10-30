import React from 'react';
import { Globe, X, CheckCircle2, ExternalLink, AlertTriangle, Smartphone, Copy, Check } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const PublicShareModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = React.useState(false);

  if (!isOpen) return null;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.origin);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl max-w-xl w-full border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-slate-900 via-teal-900 to-slate-900 text-white p-5 flex items-center justify-between border-b border-teal-800">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-teal-500/20 rounded-xl border border-teal-400/30">
              <Globe className="w-5 h-5 text-teal-300" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">পাবলিক লিংক ও পাবলিশ গাইড</h3>
              <p className="text-xs text-teal-200/80">যেকোনো ফোন বা কম্পিউটার থেকে সিভি তৈরির লিংক</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-4 text-slate-700 text-xs leading-relaxed">
          {/* Why Error: Page Not Found happened */}
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-3.5 flex gap-3 text-amber-900">
            <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-amber-950 text-xs mb-1">
                মোবাইলে "Error: Page not found" কেন এসেছিল?
              </h4>
              <p className="text-[11.5px] leading-relaxed text-amber-900/90">
                Google AI Studio এর অভ্যন্তরীণ <code>...asia-southeast1.run.app</code> লিংকটি একটি <strong>প্রাইভেট ডেভেলপমেন্ট স্যান্ডবক্স</strong>। গুগল সিকিউরিটির কারণে এটি শুধুমাত্র আপনার ব্রাউজার সেশনে কাজ করে এবং বাইরের কোনো ফোনে সরাসরি ওপেন করলে <code>Page not found</code> দেখায়।
              </p>
            </div>
          </div>

          {/* Solutions to get 100% Free Public Permanent Link */}
          <div className="space-y-3">
            <h4 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              যেভাবে সবার জন্য ফ্রি পাবলিক লিংক পাবেন:
            </h4>

            {/* Option 1: AI Studio Deploy button */}
            <div className="bg-slate-50 border border-slate-200 p-3.5 rounded-xl">
              <div className="font-bold text-slate-900 text-xs mb-1 flex items-center justify-between">
                <span>১. AI Studio এর "Deploy" বাটন (সবচেয়ে সহজ)</span>
                <span className="text-[10px] bg-teal-100 text-teal-800 px-2 py-0.5 rounded-full font-bold">১ মিনিট</span>
              </div>
              <p className="text-slate-600 text-[11px] mb-1.5">
                স্ক্রিনের ওপরের ডানদিকের কোণায় থাকা <strong>"Deploy"</strong> বা <strong>"Share"</strong> বাটনে চাপ দিন। গুগল এটি সরাসরি ক্লাউড রানে হোস্ট করে একটি অফিসিয়াল পাবলিক লিংক দিয়ে দেবে।
              </p>
            </div>

            {/* Option 2: Vercel Free Hosting & Short Link */}
            <div className="bg-slate-50 border border-slate-200 p-3.5 rounded-xl space-y-2">
              <div className="font-bold text-slate-900 text-xs flex items-center justify-between">
                <span>২. Vercel লিংক কিভাবে ছোট করবেন? (যেমন: ccp-cv.vercel.app)</span>
                <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-bold">খুবই সহজ</span>
              </div>
              <p className="text-slate-600 text-[11px] leading-relaxed">
                আপনার বর্তমান ডিপ্লয়মেন্ট লিঙ্ক (<code>my-cv-maker-...vercel.app</code>) টি Vercel এর অটো-জেনারেটেড প্রিভিউ ডোমেন। এটি খুব সহজে ছোট করা যায়:
              </p>
              <div className="bg-white border border-slate-200 rounded-lg p-2.5 text-[11px] space-y-1.5 text-slate-700">
                <div className="font-semibold text-slate-900 text-[11.5px] text-teal-800">পদ্ধতি ১: ভার্সেলের নিজস্ব ফ্রি শর্ট ডোমেন (বেস্ট)</div>
                <p>১. <a href="https://vercel.com" target="_blank" rel="noreferrer" className="text-teal-700 underline font-semibold">vercel.com</a> এ আপনার প্রজেক্ট ওপেন করুন।</p>
                <p>২. ওপরের মেনু থেকে <strong>Settings</strong> &gt; <strong>Domains</strong> এ যান।</p>
                <p>৩. সেখানে বক্সে লিখুন আপনার পছন্দের ছোট নাম (যেমন: <code>ccp-cv.vercel.app</code> বা <code>creative-cv.vercel.app</code>) এবং <strong>Add</strong> চাপুন। ব্যাস, সাথে সাথে ছোট লিংক এক্টিভ হয়ে যাবে!</p>
                
                <div className="font-semibold text-slate-900 text-[11.5px] text-teal-800 pt-1">পদ্ধতি ২: TinyURL বা Bitly শর্টনার (১০ সেকেন্ডে)</div>
                <p>
                  <a href="https://tinyurl.com" target="_blank" rel="noreferrer" className="text-teal-700 underline font-semibold">tinyurl.com</a> এ গিয়ে আপনার লিঙ্কটি পেস্ট করুন। কাস্টম অ্যালিয়াস বক্সে <code>ccp-cv</code> লিখে ক্রিয়েট করুন। আপনি পেয়ে যাবেন: <code>tinyurl.com/ccp-cv</code>
                </p>
              </div>
            </div>

            {/* Option 3: Instant Current Preview */}
            <div className="bg-slate-50 border border-slate-200 p-3.5 rounded-xl flex items-center justify-between gap-2">
              <div>
                <span className="font-bold text-slate-900 block text-xs">বর্তমান সেশন প্রিভিউ লিংক</span>
                <span className="text-slate-500 text-[11px]">এই ব্রাউজার বা ডিভাইসে টেস্ট করার জন্য</span>
              </div>
              <button
                type="button"
                onClick={handleCopyLink}
                className="px-3 py-1.5 rounded-lg bg-teal-700 hover:bg-teal-800 text-white font-semibold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'কপি হয়েছে' : 'লিংক কপি'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs rounded-xl transition-colors cursor-pointer"
          >
            বুঝেছি, বন্ধ করুন
          </button>
        </div>
      </div>
    </div>
  );
};
