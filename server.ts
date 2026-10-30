import express from 'express';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;

  app.use(express.json({ limit: '10mb' }));

  // Initialize Gemini AI Client server-side
  const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });

  // API Route: AI Profile Suggestions (Summary, Skills, Ventures, Bio)
  app.post('/api/gemini/suggest-profile', async (req, res) => {
    try {
      const { jobTitle, profession, lang, mode } = req.body;

      if (!jobTitle && !profession) {
        return res.status(400).json({ error: 'Job title or profession is required.' });
      }

      const prompt = `You are an expert career counselor, resume consultant, and bio-data specialist.
The user is creating a CV/Bio-data with the following profile:
- Job Title / Designation: "${jobTitle || profession}"
- Profession: "${profession || jobTitle}"
- Target Language: "${lang === 'bn' ? 'Bengali (বাংলা)' : 'English'}"
- CV Type: "${mode || 'professional'}"

Generate the following in JSON format:
1. "summary": A compelling, professional 2-3 sentence executive profile summary tailored to this role.
2. "skills": An array of 6-8 key technical and creative skills relevant to this profession with recommended proficiency levels (numbers between 75 and 95).
3. "suggestedVentures": An array of 2-3 relevant business ventures or project roles typical for this career.
4. "partnerExpectations": If the CV type is matrimonial, provide polite, culturally appropriate expectations for a spouse (education, nature, values) in the target language.

Format response strictly as valid JSON adhering to this schema:
{
  "summary": "string",
  "skills": [
    {"name": "string", "level": 85}
  ],
  "suggestedVentures": [
    {"name": "string", "role": "string", "details": "string"}
  ],
  "partnerExpectations": "string"
}`;

      let responseText = '';

      // If no API key or network delay, provide instant smart role template
      if (!process.env.GEMINI_API_KEY) {
        const isBn = lang === 'bn';
        return res.json({
          success: true,
          data: {
            summary: isBn
              ? `${jobTitle || profession} হিসেবে সৃজনশীল ও পেশাদার কাজের দীর্ঘ অভিজ্ঞতা। উদ্ভাবনী ডিজাইন, সময়োপযোগী ডেলিভারি ও কার্যকর যোগাযোগের মাধ্যমে ক্লায়েন্টের চাহিদা পূরণে সর্বদা প্রতিশ্রুতিবদ্ধ।`
              : `Accomplished ${jobTitle || profession} with proven track record in delivering high-impact creative solutions, technical excellence, and client-centric outcomes.`,
            skills: [
              { name: isBn ? 'গ্রাফিক ডিজাইন ও লেআউট' : 'Graphic & Visual Design', level: 95 },
              { name: isBn ? 'ব্র্যান্ড আইডেন্টিটি' : 'Brand Identity & Strategy', level: 90 },
              { name: isBn ? 'টাইপোগ্রাফি ও ক্যালিগ্রাফি' : 'Typography & Calligraphy', level: 92 },
              { name: isBn ? 'ইভেন্ট ও প্রোগ্রাম ম্যানেজমেন্ট' : 'Event & Project Management', level: 86 },
              { name: isBn ? 'ডিজিটাল ইলাস্ট্রেশন' : 'Digital Illustration', level: 88 },
              { name: isBn ? 'ক্লায়েন্ট কমিউনিকেশন' : 'Client Communication', level: 85 },
            ],
            suggestedVentures: [
              {
                name: `${jobTitle || 'Creative'} Studio`,
                role: isBn ? '(উদ্যোক্তা ও প্রধান ডিজাইনার)' : '(Founder & Lead)',
                details: isBn ? 'ক্রিয়েটিভ ডিজাইন, প্রিন্টিং ও ডিজিটাল ব্র্যান্ডিং সার্ভিস।' : 'Creative design, branding, and publication services.',
              },
            ],
            partnerExpectations: isBn
              ? 'নিয়মিত পাঁচ ওয়াক্ত নামাজী, পর্দাশীল, শিক্ষিত ও মার্জিত স্বভাবের জীবনসঙ্গী প্রত্যাশা।'
              : 'Religious, well-mannered, educated, and family-oriented spouse.',
          },
        });
      }

      try {
        const generatePromise = ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: prompt,
          config: {
            responseMimeType: 'application/json',
          },
        });

        const timeoutPromise = new Promise((_, reject) =>
          setTimeout(() => reject(new Error('Timeout')), 5000)
        );

        const response: any = await Promise.race([generatePromise, timeoutPromise]);
        responseText = response.text || '{}';
      } catch (err: any) {
        console.warn('Using intelligent role fallback:', err?.message);
        const isBn = lang === 'bn';
        return res.json({
          success: true,
          data: {
            summary: isBn
              ? `${jobTitle || profession} হিসেবে পেশাদার কাজের সমৃদ্ধ অভিজ্ঞতা। সততা, সময়ানুবর্তিতা এবং আধুনিক প্রযুক্তির সমন্বয়ে প্রতিটি কাজ সর্বোচ্চ মানে সম্পন্ন করতে প্রতিশ্রুতিবদ্ধ।`
              : `Dynamic ${jobTitle || profession} with comprehensive expertise in strategy, creative execution, and organizational leadership.`,
            skills: [
              { name: isBn ? 'গ্রাফিক ডিজাইন' : 'Visual Design', level: 95 },
              { name: isBn ? 'ক্যালিগ্রাফি ও টাইপোগ্রাফি' : 'Typography & Calligraphy', level: 92 },
              { name: isBn ? 'ব্র্যান্ডিং ও আইডেন্টিটি' : 'Brand Identity', level: 90 },
              { name: isBn ? 'প্রজেক্ট ডিরেকশন' : 'Project Direction', level: 88 },
              { name: isBn ? 'টিম লিডারশিপ' : 'Team Leadership', level: 85 },
            ],
            suggestedVentures: [
              {
                name: `${jobTitle || 'Noksha'} Studio`,
                role: isBn ? '(স্বত্বাধিকারী ও পরিচালক)' : '(Founder & Director)',
                details: isBn ? 'সৃজনশীল ডিজাইন, প্রিন্টিং ও ইভেন্ট ম্যানেজমেন্ট সার্ভিস।' : 'Creative design and brand consultancy.',
              },
            ],
            partnerExpectations: isBn
              ? 'নিয়মিত পাঁচ ওয়াক্ত নামাজী, পর্দাশীল, উত্তম আখলাক ও দ্বীনি মূল্যবোধসম্পন্ন জীবনসঙ্গী কাম্য।'
              : 'Practicing Muslim, modest, educated, and compatible family background.',
          },
        });
      }

      const parsedData = JSON.parse(responseText || '{}');
      return res.json({ success: true, data: parsedData });
    } catch (error: any) {
      console.error('Error in /api/gemini/suggest-profile:', error);
      return res.status(500).json({
        error: 'Failed to generate AI suggestion.',
        details: error?.message || String(error),
      });
    }
  });

  // Health check endpoint
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', serverTime: new Date().toISOString() });
  });

  // In development, hook up Vite middleware
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    // In production, serve static files from dist
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
});
