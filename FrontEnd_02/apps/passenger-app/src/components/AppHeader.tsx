import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface AppHeaderProps {
  titleEn: string;
  titleBn: string;
  showBack?: boolean;
  onBack?: () => void;
  rightElement?: React.ReactNode;
  variant?: 'white' | 'green';
}

export const AppHeader: React.FC<AppHeaderProps> = ({
  titleEn,
  titleBn,
  showBack = false,
  onBack,
  rightElement,
  variant = 'white',
}) => {
  const navigate = useNavigate();
  const { language, toggleLanguage } = useLanguage();

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      navigate(-1);
    }
  };

  const isGreen = variant === 'green';

  return (
    <header
      className={`sticky top-0 z-30 px-4 pt-[max(14px,env(safe-area-inset-top))] pb-3.5 transition-colors ${
        isGreen
          ? 'bg-pothe text-white shadow-md'
          : 'bg-white text-slate-900 border-b border-slate-200 shadow-xs'
      }`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5 flex-1 min-w-0">
          {showBack && (
            <button
              onClick={handleBack}
              className={`p-2 -ml-2 rounded-xl transition-colors ${
                isGreen ? 'hover:bg-black/15 active:bg-black/25 text-white' : 'hover:bg-slate-100 active:bg-slate-200 text-slate-800'
              }`}
              aria-label="Back"
            >
              <ArrowLeft className={`w-5 h-5 ${isGreen ? 'text-white' : 'text-slate-800'}`} />
            </button>
          )}
          <div className="truncate">
            <h1 className={`text-base font-extrabold tracking-tight truncate leading-tight ${isGreen ? 'text-white' : 'text-slate-900'}`}>
              {titleEn} <span className={`font-bengali font-bold text-sm ${isGreen ? 'text-emerald-100' : 'text-slate-600'}`}>/ {titleBn}</span>
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {rightElement || (
            <button
              onClick={toggleLanguage}
              className={`px-3 py-1 rounded-full text-xs font-bold transition-all border ${
                isGreen
                  ? 'bg-black/20 text-white border-white/30 hover:bg-black/30'
                  : 'bg-slate-100 text-slate-800 border-slate-300 hover:bg-slate-200'
              }`}
            >
              {language === 'en' ? 'EN | বাং' : 'বাং | EN'}
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
