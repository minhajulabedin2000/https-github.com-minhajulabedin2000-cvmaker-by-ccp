import React from 'react';
import { ResumeData } from '../../types/resume';
import { MinhajExecutiveTealTemplate } from '../templates/MinhajExecutiveTealTemplate';
import { CorporateNavyTemplate } from '../templates/CorporateNavyTemplate';
import { ModernSlateTemplate } from '../templates/ModernSlateTemplate';
import { CreativeEmeraldTemplate } from '../templates/CreativeEmeraldTemplate';
import { RoyalGoldTemplate } from '../templates/RoyalGoldTemplate';
import { ExecutiveBurgundyTemplate } from '../templates/ExecutiveBurgundyTemplate';
import { EliteSapphireTemplate } from '../templates/EliteSapphireTemplate';

interface Props {
  data: ResumeData;
  zoomScale: number;
}

export const CvPreviewContainer: React.FC<Props> = ({ data, zoomScale }) => {
  const renderTemplate = () => {
    switch (data.theme.template) {
      case 'royal-gold':
        return <RoyalGoldTemplate data={data} />;
      case 'executive-burgundy':
        return <ExecutiveBurgundyTemplate data={data} />;
      case 'elite-sapphire':
        return <EliteSapphireTemplate data={data} />;
      case 'corporate-navy':
        return <CorporateNavyTemplate data={data} />;
      case 'modern-slate':
        return <ModernSlateTemplate data={data} />;
      case 'creative-emerald':
        return <CreativeEmeraldTemplate data={data} />;
      case 'minhaj-teal':
      default:
        return <MinhajExecutiveTealTemplate data={data} />;
    }
  };

  return (
    <div className="flex justify-center items-start w-full min-h-full py-4 overflow-auto">
      <div
        id="cv-preview-scale-wrapper"
        style={{
          transform: `scale(${zoomScale})`,
          transformOrigin: 'top center',
          transition: 'transform 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
        className="shrink-0"
      >
        <div id="cv-preview-container" className="shadow-2xl rounded-xs overflow-hidden">
          {renderTemplate()}
        </div>
      </div>
    </div>
  );
};
