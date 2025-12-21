"use client";

import { useState, useRef, useEffect } from "react";
import svgPaths from "./imports/svg-vwybhmkqfj";
import clsx from "clsx";

// Product Name with Tooltip Component
function ProductNameWithTooltip({ text, className }: { text: string, className?: string }) {
  const nameRef = useRef<HTMLParagraphElement>(null);
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    if (nameRef.current) {
      const isOverflowing = nameRef.current.scrollWidth > nameRef.current.clientWidth;
      setShowTooltip(isOverflowing);
    }
  }, [text]);

  return (
    <div className="relative group w-full">
      <p 
        ref={nameRef}
        dir="auto" 
        style={{ 
          fontSize: 'clamp(0.875rem, 1.04vw, 1rem)',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap'
        }}
        className={`text-center cursor-pointer ${className}`}
      >
        {text}
      </p>
      {showTooltip && (
        <div className="absolute min-w-52 bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-[#2a2a2a] text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-50 border border-white/20 shadow-lg">
        {text}
      </div>
      )}
    </div>
  );
}
import {
  imgVibrantColorsWaterCreateAbstractWavePatternGeneratedByAi3,
  img4066180884Cf1Da234Ada498F99878E38474B39B91,
  imgImage5,
  imgImage7,
  imgImage8,
  imgImage2,
  imgImage9,
  img1,
  imgImage6,
  imgImage3,
  imgMockupAtfXlBackgroundRemoved,
  imgMockupAtfZfBackgroundRemoved,
  imgMockupAtfVmBackgroundRemoved,
  imgImage1,
  imgImage4,
} from "./imports/image-placeholders";
import { imgVibrantColorsWaterCreateAbstractWavePatternGeneratedByAi2, img, imgRectangle45, imgRectangle42, imgRectangle43, imgRectangle44 } from "./imports/svg-65x1p";
import { generateOrganizationSchema, generateWebSiteSchema } from "@/lib/utils/seo";

// Divider Component
function Divider() {
  return (
    <div className="w-full h-px" style={{ marginTop: 'clamp(2rem, 3.13vw, 4rem)', marginBottom: 'clamp(2rem, 3.13vw, 4rem)' }}>
      <svg className="w-full h-full" fill="none" viewBox="0 0 1824 1" preserveAspectRatio="none">
        <line
          x1="0.5"
          y1="0.5"
          x2="1823.5"
          y2="0.5"
          stroke="url(#gradient)"
          strokeLinecap="round"
        />
        <defs>
          <linearGradient id="gradient" x1="0" x2="1824" y1="1.5" y2="1.5" gradientUnits="userSpaceOnUse">
            <stop stopColor="white" stopOpacity="0" />
            <stop offset="0.5" stopColor="white" stopOpacity="0.4" />
            <stop offset="1" stopColor="white" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

// Dropdown Component
function Dropdown({
  label,
  options,
  value,
  onChange,
  id
}: {
  label: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
  id: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <div
        className="relative rounded-[70px] border border-white flex items-center cursor-pointer transition-all hover:opacity-90"
        style={{
          background: 'rgba(255, 255, 255, 0.16)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          height: 'clamp(3rem, 3.75vw, 3.375rem)',
          paddingLeft: 'clamp(1rem, 1.25vw, 1rem)',
          paddingRight: 'clamp(1rem, 1.25vw, 1rem)',
        }}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-white text-right flex-1" dir="auto" style={{ fontSize: 'clamp(0.875rem, 1.04vw, 1rem)' }}>
          {value || label}
        </span>
        <svg
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          style={{ width: 'clamp(1.25rem, 1.56vw, 1.5rem)', height: 'clamp(1.25rem, 1.56vw, 1.5rem)' }}
        >
          <g clipPath={`url(#clip0_${id})`}>
            <path d="M7 10L12 15L17 10H7Z" fill="white" />
          </g>
          <defs>
            <clipPath id={`clip0_${id}`}>
              <rect width="24" height="24" fill="white" />
            </clipPath>
          </defs>
        </svg>
      </div>

      {isOpen && (
        <div
          className="absolute top-full w-full rounded-2xl border border-white overflow-hidden z-50"
          style={{
            background: 'rgb(98 93 93 / 78%)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            marginTop: 'clamp(0.5rem, 0.83vw, 0.5rem)'
          }}
        >
          {options.map((option, index) => (
            <div
              key={index}
              className="cursor-pointer hover:bg-white/10 transition-colors text-right"
              style={{
                paddingLeft: 'clamp(1rem, 1.25vw, 1rem)',
                paddingRight: 'clamp(1rem, 1.25vw, 1rem)',
                paddingTop: 'clamp(0.75rem, 0.94vw, 0.75rem)',
                paddingBottom: 'clamp(0.75rem, 0.94vw, 0.75rem)'
              }}
              onClick={() => {
                onChange(option);
                setIsOpen(false);
              }}
            >
              <span className="text-white" dir="auto" style={{ fontSize: 'clamp(0.875rem, 1.04vw, 1rem)' }}>
                {option}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function App() {
  const organizationSchema = generateOrganizationSchema();
  const websiteSchema = generateWebSiteSchema();

  // Dropdown states
  const [oilType, setOilType] = useState("");
  const [oilUsage, setOilUsage] = useState("");
  const [viscosity, setViscosity] = useState("");

  // Active tab state
  const [activeTab, setActiveTab] = useState("gearbox-oil");
  const [activeBestsellerTab, setActiveBestsellerTab] = useState("engine-oil-bestseller");

  // Dropdown options
  const oilTypeOptions = ["همه", "روغن موتور", "روغن گیربکس", "روغن ترمز", "روغن صنعتی", "افزودنی"];
  const oilUsageOptions = ["همه", "خودروی سواری", "خودروی سنگین", "موتورسیکلت", "صنعتی"];
  const viscosityOptions = ["همه", "0W-20", "5W-30", "10W-40", "15W-50", "20W-50"];

  return (
    <div className="bg-[#0e0e0e] min-h-screen w-full relative">
      {/* Structured Data (JSON-LD) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteSchema),
        }}
      />
      {/* Hero Section with Masked Background */}
      <div className="relative w-full flex items-center justify-center rounded-[1.5rem]" style={{ 
        backgroundImage: `url('/images/vibrant-colors-water-create-abstract-wave-pattern-generated-by-ai 2.png')`, 
        backgroundSize: 'cover', 
        backgroundPosition: 'center', 
        backgroundRepeat: 'no-repeat',
        paddingTop: 'clamp(8rem, 16.67vw, 16rem)',
        paddingBottom: 'clamp(3rem, 6.25vw, 5.75rem)',
        minHeight: 'clamp(500px, 52.08vw, 1000px)'
      }}>
        <div className="absolute inset-0 bg-[rgba(0,0,0,0.3)] rounded-[2rem]" />
        <div className="flex flex-col items-center justify-center z-10 w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8">
          <p className="font-bold font-iranyekan leading-normal text-white text-center mb-8 sm:mb-12 lg:mb-20" dir="auto" style={{
            fontSize: 'clamp(1.5rem, 2.86vw, 2.75rem)',
            textShadow: '0px 2px 12px rgba(0,0,0,0.75)',
            maxWidth: '90%'
          }}>
            پادراد ارس نمایندگی رسمی محصولات ROMELA OIL GERMANY 🇩🇪
          </p>
          <div
            className="w-full rounded-3xl"
            style={{
              background: 'rgba(255, 255, 255, 0.05)',
              backdropFilter: 'blur(39px) saturate(180%)',
              WebkitBackdropFilter: 'blur(39px) saturate(180%)',
              border: '1px solid rgba(255, 255, 255, 0.18)',
              boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37), 0 0 0 1px rgba(255, 255, 255, 0.1) inset',
              backgroundImage: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 50%, rgba(255, 255, 255, 0.02) 100%)',
              padding: 'clamp(1.5rem, 2.08vw, 2rem)',
              maxWidth: '1400px'
            }}
          >
            <div className="flex flex-col lg:flex-row items-start justify-between gap-4 lg:gap-6 mb-6 lg:mb-8">
              {/* Title and Description */}
              <div className="text-right flex-1">
                <h2 className="text-white mb-4" dir="auto" style={{ fontSize: 'clamp(1.25rem, 1.56vw, 1.875rem)' }}>
                  جستجو روغن مناسب کاربری شما
                </h2>
                <p className="text-[rgba(255,255,255,0.9)] leading-relaxed" dir="auto" style={{ fontSize: 'clamp(1rem, 1.25vw, 1.125rem)' }}>
                  برای تجربه عملکرد بهتر موتور، روغن سازگار با نیازهای فنی خودروی خود را همینجا جستجو کنید.
                </p>
              </div>
              {/* Guide Button */}
              <button
                className="flex items-center gap-2 rounded-[120px] transition-all hover:opacity-90 shrink-0"
                style={{
                  background: 'rgba(255, 255, 255, 0.3)',
                  backdropFilter: 'blur(10px)',
                  WebkitBackdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  height: 'clamp(2.5rem, 3.13vw, 3rem)',
                  paddingLeft: 'clamp(1.5rem, 2.08vw, 2rem)',
                  paddingRight: 'clamp(1.5rem, 2.08vw, 2rem)',
                }}
              >
                <svg width="11" height="18" viewBox="0 0 11 18" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: 'clamp(0.6875rem, 0.73vw, 0.6875rem)', height: 'clamp(1.125rem, 1.25vw, 1.125rem)' }}>
                  <path d="M3.70046 12.3415C3.71736 11.2683 3.84409 10.4228 4.08064 9.80488C4.3341 9.17073 4.76498 8.57724 5.37327 8.02439C6.09985 7.35772 6.55607 6.9187 6.74194 6.70732C7.29954 6.08943 7.57834 5.44715 7.57834 4.78049C7.57834 4.0813 7.40937 3.55285 7.07143 3.19512C6.73349 2.82114 6.22657 2.63415 5.55069 2.63415C4.9086 2.63415 4.39324 2.82927 4.00461 3.21951C3.63287 3.5935 3.43856 4.10569 3.42166 4.7561H0C0.0168971 3.27642 0.515361 2.11382 1.49539 1.26829C2.47542 0.422764 3.82719 0 5.55069 0C7.27419 0 8.60906 0.406504 9.5553 1.21951C10.5184 2.03252 11 3.17886 11 4.65854C11 5.3252 10.8479 5.95935 10.5438 6.56098C10.2565 7.1626 9.80031 7.76423 9.17511 8.36585C8.85407 8.64228 8.3894 9.07317 7.78111 9.65854C7.42627 10 7.17281 10.3821 7.02074 10.8049C6.86866 11.2114 6.78418 11.7236 6.76728 12.3415H3.70046ZM3.21889 15.9756C3.21889 15.4228 3.41321 14.9593 3.80184 14.5854C4.20737 14.2114 4.70584 14.0244 5.29723 14.0244C5.88863 14.0244 6.37865 14.2114 6.76728 14.5854C7.17281 14.9593 7.37558 15.4228 7.37558 15.9756C7.37558 16.5447 7.17281 17.0244 6.76728 17.4146C6.37865 17.8049 5.88863 18 5.29723 18C4.70584 18 4.20737 17.8049 3.80184 17.4146C3.41321 17.0244 3.21889 16.5447 3.21889 15.9756Z" fill="#FCFBEE" />
                </svg>
                <span className="text-[#fcfbee]" dir="auto" style={{ fontSize: 'clamp(0.875rem, 1.04vw, 1rem)' }}>
                  راهنمای انتخاب روغن
                </span>
              </button>
            </div>
            {/* Filters and Search Button */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 items-center">
              {/* Dropdown Filters */}
              <Dropdown
                id="oilType"
                label="نوع روغن"
                options={oilTypeOptions}
                value={oilType}
                onChange={setOilType}
              />
              <Dropdown
                id="oilUsage"
                label="کاربرد روغن"
                options={oilUsageOptions}
                value={oilUsage}
                onChange={setOilUsage}
              />
              <Dropdown
                id="viscosity"
                label="ویسکوزیته"
                options={viscosityOptions}
                value={viscosity}
                onChange={setViscosity}
              />
              {/* Search Button */}
              <button
                className="w-full lg:w-auto flex items-center bg-[#E6A81699] justify-center rounded-[120px] transition-all hover:opacity-90 order-1 sm:order-0"
                style={{
                  backdropFilter: 'blur(10px)',
                  WebkitBackdropFilter: 'blur(10px)',
                  height: 'clamp(3rem, 3.75vw, 3.375rem)',
                  paddingLeft: 'clamp(2rem, 3.13vw, 3rem)',
                  paddingRight: 'clamp(2rem, 3.13vw, 3rem)',
                }}
              >
                <span className="text-[#fcfbee]" dir="auto" style={{ fontSize: 'clamp(0.875rem, 1.04vw, 1rem)' }}>
                  جستجو محصول
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Container */}
      <div className="w-full max-w-[1920px] mx-auto xl:px-0 2xl:px-6" style={{ paddingTop: 'clamp(2rem, 3.13vw, 4rem)', paddingBottom: 'clamp(2rem, 3.13vw, 4rem)' }}>

        {/* Category Section */}
        <section style={{ marginBottom: 'clamp(4rem, 5.21vw, 5rem)' }}>
          <h2 className="font-iranyekan text-white text-center" dir="auto" style={{ 
            fontSize: 'clamp(1.5rem, 2.08vw, 2.25rem)',
            marginBottom: 'clamp(1.5rem, 2.08vw, 2rem)'
          }}>
            دسته‌بندی محصولات Romela Oil
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-4" style={{ gap: 'clamp(1.5rem, 2.08vw, 2rem)' }}>

            {/* Industrial Oils Card (Wide) */}
            <div className="relative bg-[#343434] rounded-3xl overflow-hidden lg:col-span-2" style={{ minHeight: 'clamp(260px, 15.63vw, 300px)' }}>
              <div className="absolute bg-[rgba(215,105,105,0.5)] blur-[57px] rounded-full top-1/2 left-1/4 -translate-y-1/2" style={{ width: 'clamp(12rem, 25vw, 24rem)', height: 'clamp(8rem, 12.5vw, 12rem)' }} />
              <div className="relative flex flex-col md:flex-row-reverse h-full">
                <div className="w-full md:w-[40%] flex items-center justify-center">
                  <div className="w-full flex items-center justify-center" style={{ maxWidth: 'clamp(12rem, 20vw, 20rem)' }}>
                    <img alt="" className="w-full h-full object-contain pointer-events-none" src={imgImage8.src} />
                  </div>
                </div>
                <div className="w-full md:w-[60%] flex flex-col justify-between gap-3" style={{ padding: 'clamp(1.5rem, 2.08vw, 2rem)' }}>
                  <div style={{ paddingTop: 'clamp(1.5rem, 2.5vw, 2.5rem)' }}>
                    <h3 className="text-[#E39C9C] text-right" dir="auto" style={{ fontSize: 'clamp(1.5rem, 1.88vw, 1.875rem)' }}>
                      روغن های صنعتی
                    </h3>
                    <p className="text-[#E39C9C] text-right" dir="auto" style={{ fontSize: 'clamp(1rem, 1.25vw, 1.125rem)', marginTop: 'clamp(0.75rem, 1.04vw, 1rem)' }}>
                      توربین، کمپرسور، ترانسفورمر، حرارتی، بافت و ...
                    </p>
                  </div>
                  <div className="flex items-center group" style={{ gap: 'clamp(0.75rem, 1.04vw, 1rem)', marginTop: 'clamp(0.5rem, 1.04vw, 1rem)' }}>
                    <span className="text-[#E39C9C] text-right" dir="auto" style={{ fontSize: 'clamp(0.875rem, 1.04vw, 1rem)' }}>
                      مشاهده محصولات
                    </span>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: 'clamp(1rem, 1.04vw, 1rem)', height: 'clamp(1rem, 1.04vw, 1rem)' }}>
                      <path d="M3.825 9L9.425 14.6L8 16L0 8L8 0L9.425 1.4L3.825 7H16V9H3.825Z" fill="#E39C9C" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            {/* Engine Oil Card */}
            <div className="relative bg-[#343434] rounded-3xl overflow-hidden" style={{ minHeight: 'clamp(260px, 15.63vw, 300px)' }}>
              <div className="absolute bg-[rgba(229,160,69,0.5)] blur-[57px] rounded-full top-1/2 left-1/4 -translate-y-1/2" style={{ width: 'clamp(8rem, 16.67vw, 16rem)', height: 'clamp(4rem, 8.33vw, 8rem)' }} />
              <div className="relative flex flex-col md:flex-row h-full">
                <div className="w-full md:w-[60%] flex flex-col justify-between gap-4" style={{ padding: 'clamp(1.5rem, 2.08vw, 2rem)' }}>
                  <h3 className="text-[#FEDE59] text-right" dir="auto" style={{ fontSize: 'clamp(1.5rem, 1.88vw, 1.875rem)', paddingTop: 'clamp(1.5rem, 2.5vw, 2.5rem)' }}>
                    روغن موتور
                  </h3>
                  <div className="flex items-center group" style={{ gap: 'clamp(0.5rem, 0.83vw, 0.5rem)', marginTop: 'clamp(0.5rem, 1.04vw, 1rem)' }}>
                    <span className="text-[#FEDE59] text-right" dir="auto" style={{ fontSize: 'clamp(0.875rem, 1.04vw, 1rem)' }}>
                      مشاهده محصولات
                    </span>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: 'clamp(1rem, 1.04vw, 1rem)', height: 'clamp(1rem, 1.04vw, 1rem)' }}>
                      <path d="M3.825 9L9.425 14.6L8 16L0 8L8 0L9.425 1.4L3.825 7H16V9H3.825Z" fill="#FEDE59" />
                    </svg>
                  </div>
                </div>
                <div className="w-full md:w-[40%] flex items-center justify-center">
                  <div className="w-full flex items-center justify-center" style={{ maxWidth: 'clamp(12rem, 20vw, 20rem)' }}>
                    <div className="flex items-center justify-center" style={{ width: 'clamp(133px, 11.1vw, 213px)', height: 'clamp(166px, 13.8vw, 265px)' }}>
                      <img alt="" className="w-full h-full object-contain pointer-events-none" src={img4066180884Cf1Da234Ada498F99878E38474B39B91.src} />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Gear Oil Card (Wide) */}
            <div className="relative bg-[#343434] rounded-3xl overflow-hidden" style={{ minHeight: 'clamp(260px, 15.63vw, 300px)' }}>
              <div className="absolute bg-[#C9C9C980] blur-[57px] rounded-full top-1/2 left-1/4 -translate-y-1/2" style={{ width: 'clamp(12rem, 25vw, 24rem)', height: 'clamp(8rem, 12.5vw, 12rem)' }} />
              <div className="relative flex flex-col md:flex-row h-full">
                <div className="w-full md:w-[60%] flex flex-col justify-between gap-3" style={{ padding: 'clamp(1.5rem, 2.08vw, 2rem)' }}>
                  <h3 className="text-[#E7E7E7] text-right" dir="auto" style={{ fontSize: 'clamp(1.5rem, 1.88vw, 1.875rem)', paddingTop: 'clamp(1.5rem, 2.5vw, 2.5rem)' }}>
                    روغن گیربکس
                  </h3>
                  <div className="flex items-center group" style={{ gap: 'clamp(0.5rem, 0.83vw, 0.5rem)', marginTop: 'clamp(0.5rem, 1.04vw, 1rem)' }}>
                    <span className="text-[#E7E7E7] text-right" dir="auto" style={{ fontSize: 'clamp(0.875rem, 1.04vw, 1rem)' }}>
                      مشاهده محصولات
                    </span>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: 'clamp(1rem, 1.04vw, 1rem)', height: 'clamp(1rem, 1.04vw, 1rem)' }}>
                      <path d="M3.825 9L9.425 14.6L8 16L0 8L8 0L9.425 1.4L3.825 7H16V9H3.825Z" fill="#E7E7E7" />
                    </svg>
                  </div>
                </div>
                <div className="w-full md:w-[40%] flex items-center justify-center">
                  <div className="w-full flex items-center justify-center" style={{ maxWidth: 'clamp(12rem, 20vw, 20rem)' }}>
                    <img alt="" className="w-full h-full object-contain pointer-events-none" src={imgImage2.src} />
                  </div>
                </div>
              </div>
            </div>

            {/* Brake Oil Card */}
            <div className="relative bg-[#343434] rounded-3xl overflow-hidden" style={{ minHeight: 'clamp(260px, 15.63vw, 300px)' }}>
              <div className="absolute bg-[rgba(255,35,39,0.5)] blur-[57px] rounded-full top-1/2 left-1/4 -translate-y-1/2" style={{ width: 'clamp(8rem, 16.67vw, 16rem)', height: 'clamp(4rem, 8.33vw, 8rem)' }} />
              <div className="relative flex flex-col md:flex-row h-full">
                <div className="w-full md:w-[60%] flex flex-col justify-between gap-4" style={{ padding: 'clamp(1.5rem, 2.08vw, 2rem)' }}>
                  <h3 className="text-[#FF2023] text-right" dir="auto" style={{ fontSize: 'clamp(1.5rem, 1.88vw, 1.875rem)', marginTop: 'clamp(1.5rem, 2.5vw, 2.5rem)' }}>
                    روغن ترمز
                  </h3>
                  <div className="flex items-center group" style={{ gap: 'clamp(0.5rem, 0.83vw, 0.5rem)', marginTop: 'clamp(0.5rem, 1.04vw, 1rem)' }}>
                    <span className="text-[#FF2023] text-right" dir="auto" style={{ fontSize: 'clamp(0.875rem, 1.04vw, 1rem)' }}>
                      مشاهده محصولات
                    </span>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: 'clamp(1rem, 1.04vw, 1rem)', height: 'clamp(1rem, 1.04vw, 1rem)' }}>
                      <path d="M3.825 9L9.425 14.6L8 16L0 8L8 0L9.425 1.4L3.825 7H16V9H3.825Z" fill="#FF2023" />
                    </svg>
                  </div>
                </div>
                <div className="w-full md:w-[40%] flex items-center justify-center">
                  <div className="w-full flex items-center justify-center" style={{ maxWidth: 'clamp(12rem, 20vw, 20rem)' }}>
                    <img alt="" className="w-full h-full object-contain pointer-events-none" src={imgImage5.src} />
                  </div>
                </div>
              </div>
            </div>

            {/* Gear Oil Card (Wide) */}
            <div className="relative bg-[#343434] rounded-3xl overflow-hidden" style={{ minHeight: 'clamp(260px, 15.63vw, 300px)' }}>
              <div className="absolute bg-[#1D36F14D] blur-[57px] rounded-full top-1/2 left-1/4 -translate-y-1/2" style={{ width: 'clamp(12rem, 25vw, 24rem)', height: 'clamp(8rem, 12.5vw, 12rem)' }} />
              <div className="relative flex flex-col md:flex-row h-full">
                <div className="w-full md:w-[60%] flex flex-col justify-between gap-3" style={{ padding: 'clamp(1.5rem, 2.08vw, 2rem)' }}>
                  <h3 className="text-[#738CD2] text-right" dir="auto" style={{ fontSize: 'clamp(1.5rem, 1.88vw, 1.875rem)', marginTop: 'clamp(1.5rem, 2.5vw, 2.5rem)' }}>
                    روغن گیربکس
                  </h3>
                  <div className="flex items-center group" style={{ gap: 'clamp(0.5rem, 0.83vw, 0.5rem)', marginTop: 'clamp(0.5rem, 1.04vw, 1rem)' }}>
                    <span className="text-[#738CD2] text-right" dir="auto" style={{ fontSize: 'clamp(0.875rem, 1.04vw, 1rem)' }}>
                      مشاهده محصولات
                    </span>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: 'clamp(1rem, 1.04vw, 1rem)', height: 'clamp(1rem, 1.04vw, 1rem)' }}>
                      <path d="M3.825 9L9.425 14.6L8 16L0 8L8 0L9.425 1.4L3.825 7H16V9H3.825Z" fill="#738CD2" />
                    </svg>
                  </div>
                </div>
                <div className="w-full md:w-[40%] flex items-center justify-center">
                  <div className="w-full flex items-center justify-center" style={{ maxWidth: 'clamp(12rem, 20vw, 20rem)' }}>
                    <img alt="" className="w-full h-full object-contain pointer-events-none" src={imgImage6.src} />
                  </div>
                </div>
              </div>
            </div>

            {/* Brake Oil Card */}
            <div className="relative bg-[#343434] rounded-3xl overflow-hidden" style={{ minHeight: 'clamp(260px, 15.63vw, 300px)' }}>
              <div className="absolute bg-[#EA770C] blur-[57px] rounded-full top-1/2 left-1/4 -translate-y-1/2" style={{ width: 'clamp(8rem, 16.67vw, 16rem)', height: 'clamp(4rem, 8.33vw, 8rem)' }} />
              <div className="relative flex flex-col md:flex-row-reverse h-full">
                <div className="w-full md:w-[40%] flex items-center justify-center">
                  <div className="w-full flex items-center justify-center" style={{ maxWidth: 'clamp(12rem, 20vw, 20rem)' }}>
                    <img alt="" className="w-full h-full object-contain pointer-events-none" src={imgImage3.src} />
                  </div>
                </div>
                <div className="w-full md:w-[60%] flex flex-col justify-between gap-4" style={{ padding: 'clamp(1.5rem, 2.08vw, 2rem)' }}>
                  <h3 className="text-[#EA770C] text-right" dir="auto" style={{ fontSize: 'clamp(1.5rem, 1.88vw, 1.875rem)', marginTop: 'clamp(1.5rem, 2.5vw, 2.5rem)' }}>
                    روغن ترمز
                  </h3>
                  <div className="flex items-center group" style={{ gap: 'clamp(0.5rem, 0.83vw, 0.5rem)', marginTop: 'clamp(0.5rem, 1.04vw, 1rem)' }}>
                    <span className="text-[#EA770C] text-right" dir="auto" style={{ fontSize: 'clamp(0.875rem, 1.04vw, 1rem)' }}>
                      مشاهده محصولات
                    </span>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: 'clamp(1rem, 1.04vw, 1rem)', height: 'clamp(1rem, 1.04vw, 1rem)' }}>
                      <path d="M3.825 9L9.425 14.6L8 16L0 8L8 0L9.425 1.4L3.825 7H16V9H3.825Z" fill="#EA770C" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Special Additives Card */}
            <div className="relative bg-[#343434] rounded-3xl overflow-hidden" style={{ minHeight: 'clamp(260px, 15.63vw, 300px)' }}>
              <div className="absolute bg-[rgba(255,255,255,0.5)] blur-[57px] rounded-full top-1/2 left-1/4 -translate-y-1/2" style={{ width: 'clamp(8rem, 16.67vw, 16rem)', height: 'clamp(4rem, 8.33vw, 8rem)' }} />
              <div
                className="relative flex flex-col md:flex-row h-full"
                style={{
                  backgroundImage: `url('${imgImage7.src}')`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'left',
                  backgroundRepeat: 'no-repeat',
                }}
              >
                <div className="relative z-10 w-full md:w-[60%] flex flex-col justify-between gap-4 order-1 md:order-2" style={{ padding: 'clamp(1.5rem, 2.08vw, 2rem)' }}>
                  <h3 className="text-white text-right" dir="auto" style={{ fontSize: 'clamp(1.5rem, 1.88vw, 1.875rem)', marginTop: 'clamp(1.5rem, 2.5vw, 2.5rem)' }}>
                    افزودنی های خاص
                  </h3>
                  <div className="flex items-center group" style={{ gap: 'clamp(0.5rem, 0.83vw, 0.5rem)', marginTop: 'clamp(0.5rem, 1.04vw, 1rem)' }}>
                    <span className="text-white text-right" dir="auto" style={{ fontSize: 'clamp(0.875rem, 1.04vw, 1rem)' }}>
                      مشاهده محصولات
                    </span>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: 'clamp(1rem, 1.04vw, 1rem)', height: 'clamp(1rem, 1.04vw, 1rem)' }}>
                      <path d="M3.825 9L9.425 14.6L8 16L0 8L8 0L9.425 1.4L3.825 7H16V9H3.825Z" fill="#FFFFFF" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Introduction Section */}
        <section className="2xl:px-16 xl:px-4" style={{ marginBottom: 'clamp(4rem, 5.21vw, 5rem)' }}>
          <h2 className="font-iranyekan text-white text-center" dir="auto" style={{ 
            fontSize: 'clamp(1.5rem, 2.08vw, 2.25rem)',
            marginBottom: 'clamp(2rem, 2.86vw, 2.75rem)'
          }}>
            معرفی Romela آلمان
          </h2>

          <div className="flex flex-col lg:flex-row" style={{ gap: 'clamp(2rem, 3.13vw, 3rem)' }}>
            <div className="w-full lg:w-1/2">
              <p className="text-white text-right" dir="auto" style={{ 
                fontSize: 'clamp(1.125rem, 1.25vw, 1.25rem)',
                lineHeight: 'clamp(2.5rem, 5.21vw, 2.5rem)'
              }}>
                لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد، در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان رسد.
              </p>
            </div>
            <div className="w-full lg:w-1/2">
              <div className="bg-[#343434] rounded-3xl" style={{ padding: 'clamp(2rem, 3.13vw, 3rem)' }}>
                <div className="w-full flex items-center justify-center" style={{ height: 'clamp(256px, 15.63vw, 300px)' }}>
                  <img alt="" className="w-full h-full object-contain pointer-events-none" src={imgImage9.src} />
                </div>
              </div>
            </div>
          </div>
        </section>

        <Divider />

        {/* Products Section */}
        <section className="2xl:px-16 xl:px-4" style={{ marginBottom: 'clamp(4rem, 5.21vw, 5rem)' }}>
          <h2 className="font-iranyekan text-white text-center" dir="auto" style={{ 
            fontSize: 'clamp(1.5rem, 2.08vw, 2.25rem)',
            marginBottom: 'clamp(2rem, 3.13vw, 3rem)'
          }}>
            محصولات Romela Oil
          </h2>

          {/* Category Tabs */}
          <div className="flex justify-center" style={{ marginBottom: 'clamp(2rem, 3.13vw, 3rem)' }}>
            <div
              className="rounded-full flex flex-wrap justify-center items-center w-fit"
              style={{
                background: '#2a2a2a',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.05)',
                padding: 'clamp(0.25rem, 0.31vw, 0.25rem)',
                gap: 'clamp(0.5rem, 0.78vw, 0.75rem)'
              }}
            >
              {[
                { id: 'engine-oil', label: 'روغن موتور' },
                { id: 'gearbox-oil', label: 'روغن گیربکس' },
                { id: 'brake-oil', label: 'روغن ترمز' },
                { id: 'hydraulic-oil', label: 'روغن هیدرولیک' },
                { id: 'grease', label: 'گریس' },
                { id: 'special-additives', label: 'افزودنی های خاص' },
              ].map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className="rounded-full transition-all duration-200 whitespace-nowrap"
                    style={{
                      paddingLeft: 'clamp(1.25rem, 1.56vw, 1.5rem)',
                      paddingRight: 'clamp(1.25rem, 1.56vw, 1.5rem)',
                      paddingTop: 'clamp(0.625rem, 0.78vw, 0.75rem)',
                      paddingBottom: 'clamp(0.625rem, 0.78vw, 0.75rem)',
                      ...(isActive
                        ? {
                            background: '#FFFFFF1F',
                            color: '#F9BD65',
                            boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.5)',
                          }
                        : {
                            color: '#F9BD65',
                          }
                      ),
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive) {
                        e.currentTarget.style.background = '#3a3a3a';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive) {
                        e.currentTarget.style.background = 'transparent';
                      }
                    }}
                  >
                    <span dir="auto" style={{ fontSize: 'clamp(0.875rem, 1.04vw, 1rem)' }}>
                      {tab.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4" style={{ gap: 'clamp(1.5rem, 2.08vw, 2rem)', marginTop: 'clamp(4rem, 7.29vw, 7rem)' }}>
            {/* Product Card 1 */}
            <div className='relative'>
              <div className="relative bg-[#343434] rounded-[24px] w-full" style={{ height: 'clamp(222px, 18.49vw, 355px)' }} />
              <div className="absolute w-full z-10" style={{ height: 'clamp(259px, 21.56vw, 414px)', top: 'clamp(-5rem, -10.42vw, -5rem)' }} data-name="Mockup ATF-ZF Background Removed">
                <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgMockupAtfZfBackgroundRemoved.src} />
              </div>
              <div className='w-full flex items-center justify-center z-10' style={{ marginTop: 'clamp(-1.25rem, -2.6vw, -1.25rem)' }}>
                <div className="bg-[#e6a816ca] z-10 flex items-center justify-center rounded-[120px]" style={{ padding: 'clamp(1rem, 1.25vw, 1rem)', width: '90%' }}>
                  <div className="justify-center relative w-full">
                    <ProductNameWithTooltip text="روغن گیربکس فول سینتتیک Romela ATF-ZF" className="text-[#FCFBEE]" />
                  </div>
                </div>
              </div>
            </div>

            {/* Product Card 2 */}
            <div className='relative'>
              <div className="relative bg-[#343434] rounded-[24px] w-full" style={{ height: 'clamp(222px, 18.49vw, 355px)' }} />
              <div className="absolute w-full z-10" style={{ height: 'clamp(259px, 21.56vw, 414px)', top: 'clamp(-5rem, -10.42vw, -5rem)' }} data-name="Mockup ATF-ZF Background Removed">
                <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgMockupAtfZfBackgroundRemoved.src} />
              </div>
              <div className='w-full flex items-center justify-center z-10' style={{ marginTop: 'clamp(-1.25rem, -2.6vw, -1.25rem)' }}>
                <div className="bg-[#e6a816ca] z-10 flex items-center justify-center rounded-[120px]" style={{ padding: 'clamp(1rem, 1.25vw, 1rem)', width: '90%' }}>
                  <div className="justify-center relative w-full">
                    <ProductNameWithTooltip text="روغن گیربکس فول سینتتیک Romela ATF-ZF" className="text-[#FCFBEE]" />
                  </div>
                </div>
              </div>
            </div>

            {/* Product Card 3 */}
            <div className='relative'>
              <div className="relative bg-[#343434] rounded-[24px] w-full" style={{ height: 'clamp(222px, 18.49vw, 355px)' }} />
              <div className="absolute w-full z-10" style={{ height: 'clamp(259px, 21.56vw, 414px)', top: 'clamp(-5rem, -10.42vw, -5rem)' }} data-name="Mockup ATF-ZF Background Removed">
                <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgMockupAtfZfBackgroundRemoved.src} />
              </div>
              <div className='w-full flex items-center justify-center z-10' style={{ marginTop: 'clamp(-1.25rem, -2.6vw, -1.25rem)' }}>
                <div className="bg-[#e6a816ca] z-10 flex items-center justify-center rounded-[120px]" style={{ padding: 'clamp(1rem, 1.25vw, 1rem)', width: '90%' }}>
                  <div className="justify-center relative w-full">
                    <ProductNameWithTooltip text="روغن گیربکس فول سینتتیک Romela ATF-ZF" className="text-[#FCFBEE]" />
                  </div>
                </div>
              </div>
            </div>

            {/* Product Card 4 */}
            <div className='relative'>
              <div className="relative bg-[#343434] rounded-[24px] w-full" style={{ height: 'clamp(222px, 18.49vw, 355px)' }} />
              <div className="absolute w-full z-10" style={{ height: 'clamp(259px, 21.56vw, 414px)', top: 'clamp(-5rem, -10.42vw, -5rem)' }} data-name="Mockup ATF-ZF Background Removed">
                <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgMockupAtfZfBackgroundRemoved.src} />
              </div>
              <div className='w-full flex items-center justify-center z-10' style={{ marginTop: 'clamp(-1.25rem, -2.6vw, -1.25rem)' }}>
                <div className="bg-[#e6a816ca] z-10 flex items-center justify-center rounded-[120px]" style={{ padding: 'clamp(1rem, 1.25vw, 1rem)', width: '90%' }}>
                  <div className="justify-center relative w-full">
                    <ProductNameWithTooltip text="روغن گیربکس فول سینتتیک Romela ATF-ZF" className="text-[#FCFBEE]" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <Divider />

        {/* Statistics Section */}
        <section className="2xl:px-16 xl:px-4" style={{ marginBottom: 'clamp(4rem, 5.21vw, 5rem)' }}>
          <h2 className="font-iranyekan text-white text-center" dir="auto" style={{ 
            fontSize: 'clamp(1.5rem, 2.08vw, 2.25rem)',
            marginBottom: 'clamp(2rem, 3.13vw, 3rem)'
          }}>
            Romela Oil آمار
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4" style={{ gap: 'clamp(1rem, 1.56vw, 1.5rem)' }}>
            <div
              className="rounded-2xl text-center flex flex-col relative overflow-hidden"
              style={{
                background: '#FFFFFF1F',
                border: '1px solid #FCD85633',
                padding: 'clamp(1.5rem, 2.08vw, 2rem)',
                gap: 'clamp(2.5rem, 5.21vw, 2.5rem)'
              }}
            >
              <div className="absolute bg-[#FCD85699] blur-[57px] bottom-0 left-1/4 -translate-y-1/2" style={{ width: 'clamp(12rem, 33.33vw, 16rem)', height: 'clamp(2rem, 5.21vw, 4rem)' }} />
              <div className="text-[#FCD856]" dir="auto" style={{ fontSize: 'clamp(0.875rem, 1.04vw, 1rem)' }}>
                تعداد فروش
              </div>
              <div className="font-bold text-[#FCD856]" dir="auto" style={{ fontSize: 'clamp(1.875rem, 2.6vw, 3rem)' }}>
                + ۱۲۰,۰۰۰
              </div>
            </div>
            <div
              className="rounded-2xl text-center flex flex-col relative overflow-hidden"
              style={{
                background: '#FFFFFF1F',
                border: '1px solid #FCD85633',
                padding: 'clamp(1.5rem, 2.08vw, 2rem)',
                gap: 'clamp(2.5rem, 5.21vw, 2.5rem)'
              }}
            >
              <div className="absolute bg-[#FCD85699] blur-[57px] bottom-0 left-1/4 -translate-y-1/2" style={{ width: 'clamp(12rem, 33.33vw, 16rem)', height: 'clamp(2rem, 5.21vw, 4rem)' }} />
              <div className="text-[#FCD856]" dir="auto" style={{ fontSize: 'clamp(0.875rem, 1.04vw, 1rem)' }}>
                محصولات صادر شده
              </div>
              <div className="font-bold text-[#FCD856]" dir="auto" style={{ fontSize: 'clamp(1.875rem, 2.6vw, 3rem)' }}>
                + ۷۱,۰۰۰
              </div>
            </div>
            <div
              className="rounded-2xl text-center flex flex-col relative overflow-hidden"
              style={{
                background: '#FFFFFF1F',
                border: '1px solid #FCD85633',
                padding: 'clamp(1.5rem, 2.08vw, 2rem)',
                gap: 'clamp(2.5rem, 5.21vw, 2.5rem)'
              }}
            >
              <div className="absolute bg-[#FCD85699] blur-[57px] bottom-0 left-1/4 -translate-y-1/2" style={{ width: 'clamp(12rem, 33.33vw, 16rem)', height: 'clamp(2rem, 5.21vw, 4rem)' }} />
              <div className="text-[#FCD856]" dir="auto" style={{ fontSize: 'clamp(0.875rem, 1.04vw, 1rem)' }}>
                تنوع محصولات
              </div>
              <div className="font-bold text-[#FCD856]" dir="auto" style={{ fontSize: 'clamp(1.875rem, 2.6vw, 3rem)' }}>
                + ۱۰۰
              </div>
            </div>
            <div
              className="rounded-2xl text-center flex flex-col relative overflow-hidden"
              style={{
                background: '#FFFFFF1F',
                border: '1px solid #FCD85633',
                padding: 'clamp(1.5rem, 2.08vw, 2rem)',
                gap: 'clamp(2.5rem, 5.21vw, 2.5rem)'
              }}
            >
              <div className="absolute bg-[#FCD85699] blur-[57px] bottom-0 left-1/4 -translate-y-1/2" style={{ width: 'clamp(12rem, 33.33vw, 16rem)', height: 'clamp(2rem, 5.21vw, 4rem)' }} />
              <div className="text-[#FCD856]" dir="auto" style={{ fontSize: 'clamp(0.875rem, 1.04vw, 1rem)' }}>
                مشتریان
              </div>
              <div className="font-bold text-[#FCD856]" dir="auto" style={{ fontSize: 'clamp(1.875rem, 2.6vw, 3rem)' }}>
                + ۱۰۰۰
              </div>
            </div>
          </div>
        </section>

        <Divider />

        {/* Best Selling Products Section */}
        <section className="2xl:px-16 xl:px-4" style={{ marginBottom: 'clamp(4rem, 5.21vw, 5rem)' }}>
          <h2 className="font-iranyekan text-white text-center" dir="auto" style={{ 
            fontSize: 'clamp(1.5rem, 2.08vw, 2.25rem)',
            marginBottom: 'clamp(2rem, 3.13vw, 3rem)'
          }}>
            محصولات پرفروش
          </h2>

          {/* Main Content Container */}
          <div
            className="rounded-3xl"
            style={{
              background: '#2a2a2a',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)',
              padding: 'clamp(1.5rem, 2.6vw, 2.5rem)'
            }}
          >
            {/* Tab Navigation */}
            <div className="flex justify-center" style={{ marginBottom: 'clamp(2rem, 3.13vw, 3rem)' }}>
              <div
                className="rounded-full flex flex-wrap justify-center items-center w-fit"
                style={{
                  background: '#2a2a2a',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.05)',
                  padding: 'clamp(0.25rem, 0.31vw, 0.25rem)',
                  gap: 'clamp(0.5rem, 0.78vw, 0.75rem)'
                }}
              >
                {[
                  { id: 'engine-oil-bestseller', label: 'روغن موتور' },
                  { id: 'gearbox-oil-bestseller', label: 'روغن گیربکس' },
                  { id: 'hydraulic-oil-bestseller', label: 'روغن هیدرولیک' },
                  { id: 'grease-bestseller', label: 'گریس' },
                ].map((tab) => {
                  const isActive = activeBestsellerTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveBestsellerTab(tab.id)}
                      className="rounded-full transition-all duration-200 whitespace-nowrap"
                      style={{
                        paddingLeft: 'clamp(1.25rem, 1.56vw, 1.5rem)',
                        paddingRight: 'clamp(1.25rem, 1.56vw, 1.5rem)',
                        paddingTop: 'clamp(0.625rem, 0.78vw, 0.75rem)',
                        paddingBottom: 'clamp(0.625rem, 0.78vw, 0.75rem)',
                        ...(isActive
                          ? {
                              background: '#FFFFFF1F',
                              color: '#F9BD65',
                            }
                          : {
                              color: '#F9BD65',
                            }
                        ),
                      }}
                      onMouseEnter={(e) => {
                        if (!isActive) {
                          e.currentTarget.style.background = '#3a3a3a';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!isActive) {
                          e.currentTarget.style.background = 'transparent';
                        }
                      }}
                    >
                      <span dir="auto" style={{ fontSize: 'clamp(0.875rem, 1.04vw, 1rem)' }}>
                        {tab.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Content Area: Text + Product Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-2" style={{ gap: 'clamp(2rem, 3.13vw, 3rem)' }}>
              {/* Right Side: Text Description */}
              <div className="flex flex-col">
                <h3 className="font-bold text-white" dir="auto" style={{ 
                  fontSize: 'clamp(1.5rem, 2.08vw, 2.25rem)',
                  marginBottom: 'clamp(1rem, 1.56vw, 1.5rem)'
                }}>
                  روغن موتور روملا
                </h3>
                <p className="text-white/90 leading-relaxed text-right" dir="auto" style={{ fontSize: 'clamp(1rem, 1.25vw, 1.125rem)' }}>
                  لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد.
                </p>
              </div>

              {/* Left Side: Product Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3" style={{ gap: 'clamp(1rem, 1.56vw, 1.5rem)' }}>
                {/* Product Card 1: Romela Drive 0w-20 */}
                <div
                  className="rounded-2xl flex flex-col"
                  style={{
                    background: '#FFFFFF29',
                    border: '1px solid #FFFFFF33',
                    padding: 'clamp(1rem, 1.56vw, 1.5rem)'
                  }}
                >
                  <h4 className="font-bold text-[#F9BD65] mb-4 text-center" dir="auto" style={{ fontSize: 'clamp(1.125rem, 1.25vw, 1.25rem)' }}>
                    <ProductNameWithTooltip text="Romela Drive 0w-20" className="font-bold text-[#F9BD65] " />
                  </h4>
                  <div className="flex-1 flex items-center justify-center" style={{ marginBottom: 'clamp(1rem, 1.25vw, 1rem)' }}>
                    <img src="/images/image 1.png" alt="" style={{ width: 'clamp(6rem, 8.33vw, 8rem)' }} />
                  </div>
                </div>

                {/* Product Card 2: Romela Drive 5w-30 */}
                <div
                  className="rounded-2xl flex flex-col"
                  style={{
                    background: '#FFFFFF29',
                    border: '1px solid #FFFFFF33',
                    padding: 'clamp(1rem, 1.56vw, 1.5rem)'
                  }}
                >
                  <h4 className="mb-4 text-center" dir="auto" style={{ fontSize: 'clamp(1.125rem, 1.25vw, 1.25rem)' }}>
                    <ProductNameWithTooltip text="Romela Drive 5w-30" className="font-bold text-[#F9BD65] " />
                  </h4>
                  <div className="flex-1 flex items-center justify-center" style={{ marginBottom: 'clamp(1rem, 1.25vw, 1rem)' }}>
                    <img src="/images/image 1.png" alt="" style={{ width: 'clamp(6rem, 8.33vw, 8rem)' }} />
                  </div>
                </div>

                {/* Product Card 3: Romela Drive 10w-40 */}
                <div
                  className="rounded-2xl flex flex-col"
                  style={{
                    background: '#FFFFFF29',
                    border: '1px solid #FFFFFF33',
                    padding: 'clamp(1rem, 1.56vw, 1.5rem)'
                  }}
                >
                  <h4 className="font-bold text-[#F9BD65] mb-4 text-center" dir="auto" style={{ fontSize: 'clamp(1.125rem, 1.25vw, 1.25rem)' }}>
                    <ProductNameWithTooltip text="Romela Drive 10w-40" className="font-bold text-[#F9BD65] " />
                  </h4>
                  <div className="flex-1 flex items-center justify-center" style={{ marginBottom: 'clamp(1rem, 1.25vw, 1rem)' }}>
                    <img src="/images/image 1.png" alt="" style={{ width: 'clamp(6rem, 8.33vw, 8rem)' }} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
