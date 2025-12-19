"use client";

import { useState, useRef, useEffect } from "react";
import svgPaths from "./imports/svg-vwybhmkqfj";
import clsx from "clsx";
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
    <div className="w-full h-px my-8 md:my-12 lg:my-16">
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
        className="relative h-[54px] rounded-[70px] border border-white flex items-center px-4 cursor-pointer transition-all hover:opacity-90"
        style={{
          background: 'rgba(255, 255, 255, 0.16)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
        }}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-base text-white text-right flex-1" dir="auto">
          {value || label}
        </span>
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
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
          className="absolute top-full mt-2 w-full rounded-2xl border border-white overflow-hidden z-50"
          style={{
            background: 'rgb(98 93 93 / 78%)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
          }}
        >
          {options.map((option, index) => (
            <div
              key={index}
              className="px-4 py-3 cursor-pointer hover:bg-white/10 transition-colors text-right"
              onClick={() => {
                onChange(option);
                setIsOpen(false);
              }}
            >
              <span className="text-base text-white" dir="auto">
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
    <div className="bg-[#0e0e0e] min-h-screen w-full relative -mt-24 md:-mt-28">
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
      <div className="relative w-full pt-64 pb-[5.75rem] flex items-center justify-center rounded-[2rem]" style={{ backgroundImage: `url('/images/vibrant-colors-water-create-abstract-wave-pattern-generated-by-ai 2.png')`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>

        <div className="absolute inset-0 bg-[rgba(0,0,0,0.3)] rounded-[2rem]" />
        <div className="flex flex-col items-center justify-center z-10">
          <p className="text-2xl md:text-3xl lg:text-[2.75rem] font-bold leading-normal text-shadow-[0px_2px_12px_rgba(0,0,0,0.75)] mb-8 md:mb-[5.375rem]" dir="auto">
            پادراد ارس نمایندگی رسمی محصولات ROMELA OIL GERMANY 🇩🇪
          </p>
          <div
            className="w-full max-w-8xl rounded-3xl p-6 md:p-8"
            style={{
              background: 'rgba(255, 255, 255, 0.05)',
              backdropFilter: 'blur(39px) saturate(180%)',
              WebkitBackdropFilter: 'blur(39px) saturate(180%)',
              border: '1px solid rgba(255, 255, 255, 0.18)',
              boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37), 0 0 0 1px rgba(255, 255, 255, 0.1) inset',
              backgroundImage: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 50%, rgba(255, 255, 255, 0.02) 100%)',
            }}
          >
            <div className="flex items-start justify-between">
              {/* Title and Description */}
              <div className="mb-8 text-right">
                <h2 className=" text-xl md:text-2xl lg:text-3xl text-white mb-4" dir="auto">
                  جستجو روغن مناسب کاربری شما
                </h2>
                <p className=" text-base md:text-lg text-[rgba(255,255,255,0.9)] leading-relaxed" dir="auto">
                  برای تجربه عملکرد بهتر موتور، روغن سازگار با نیازهای فنی خودروی خود را همینجا جستجو کنید.
                </p>
              </div>
              {/* Guide Button */}
              <button
                className="flex items-center gap-2 h-12 px-6 md:px-8 py-2 rounded-[120px] transition-all hover:opacity-90"
                style={{
                  background: 'rgba(255, 255, 255, 0.3)',
                  backdropFilter: 'blur(10px)',
                  WebkitBackdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                }}
              >
                <svg width="11" height="18" viewBox="0 0 11 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3.70046 12.3415C3.71736 11.2683 3.84409 10.4228 4.08064 9.80488C4.3341 9.17073 4.76498 8.57724 5.37327 8.02439C6.09985 7.35772 6.55607 6.9187 6.74194 6.70732C7.29954 6.08943 7.57834 5.44715 7.57834 4.78049C7.57834 4.0813 7.40937 3.55285 7.07143 3.19512C6.73349 2.82114 6.22657 2.63415 5.55069 2.63415C4.9086 2.63415 4.39324 2.82927 4.00461 3.21951C3.63287 3.5935 3.43856 4.10569 3.42166 4.7561H0C0.0168971 3.27642 0.515361 2.11382 1.49539 1.26829C2.47542 0.422764 3.82719 0 5.55069 0C7.27419 0 8.60906 0.406504 9.5553 1.21951C10.5184 2.03252 11 3.17886 11 4.65854C11 5.3252 10.8479 5.95935 10.5438 6.56098C10.2565 7.1626 9.80031 7.76423 9.17511 8.36585C8.85407 8.64228 8.3894 9.07317 7.78111 9.65854C7.42627 10 7.17281 10.3821 7.02074 10.8049C6.86866 11.2114 6.78418 11.7236 6.76728 12.3415H3.70046ZM3.21889 15.9756C3.21889 15.4228 3.41321 14.9593 3.80184 14.5854C4.20737 14.2114 4.70584 14.0244 5.29723 14.0244C5.88863 14.0244 6.37865 14.2114 6.76728 14.5854C7.17281 14.9593 7.37558 15.4228 7.37558 15.9756C7.37558 16.5447 7.17281 17.0244 6.76728 17.4146C6.37865 17.8049 5.88863 18 5.29723 18C4.70584 18 4.20737 17.8049 3.80184 17.4146C3.41321 17.0244 3.21889 16.5447 3.21889 15.9756Z" fill="#FCFBEE" />
                </svg>
                <span className=" text-[#fcfbee] text-base" dir="auto">
                  راهنمای انتخاب روغن
                </span>
              </button>
            </div>
            {/* Filters and Search Button */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 items-center">
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
                className="w-full md:w-auto flex items-center bg-[#E6A81699] justify-center h-[54px] px-8 md:px-12 rounded-[120px] order-1 md:order-0 transition-all hover:opacity-90"
                style={{
                  backdropFilter: 'blur(10px)',
                  WebkitBackdropFilter: 'blur(10px)',
                }}
              >
                <span className="text-[#fcfbee] text-base" dir="auto">
                  جستجو محصول
                </span>
              </button>
            </div>

          </div>
        </div>

      </div>

      {/* Container */}
      <div className="px-4 sm:px-6 lg:px-8 xl:px-12 py-8 md:py-12 lg:py-16">

        {/* Category Section */}
        <section className="mb-16 md:mb-20">
          <h2 className="text-2xl md:text-3xl lg:text-4xl  text-white text-center mb-6" dir="auto">
            دسته‌بندی محصولات Romela Oil
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 md:gap-8">

            {/* Industrial Oils Card (Wide) */}
            <div className="relative bg-[#343434] rounded-3xl overflow-hidden min-h-[260px] md:min-h-[300px] lg:col-span-2">
              <div className="absolute bg-[rgba(215,105,105,0.5)] blur-[57px] w-96 h-48 rounded-full top-1/2 left-1/4 -translate-y-1/2" />
              <div className="relative flex flex-col md:flex-row-reverse h-full">
                <div className="w-full md:w-[40%] flex items-center justify-center">
                  <div className="w-full max-w-xs flex items-center justify-center">
                    <img alt="" className="w-full h-full object-contain pointer-events-none" src={imgImage8.src} />
                  </div>
                </div>
                <div className="w-full md:w-[60%] flex flex-col justify-between p-6 md:p-8 gap-3">
                  <div className="pt-10">
                    <h3 className=" text-2xl md:text-3xl text-[#E39C9C] text-right" dir="auto">
                      روغن های صنعتی
                    </h3>
                    <p className=" text-lg text-[#E39C9C] text-right mt-3" dir="auto">
                      توربین، کمپرسور، ترانسفورمر، حرارتی، بافت و ...
                    </p>
                  </div>
                  <div className="flex items-center gap-3 mt-2 md:mt-4 group">
                    <span className=" text-[#E39C9C] text-base text-right" dir="auto">
                      مشاهده محصولات
                    </span>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M3.825 9L9.425 14.6L8 16L0 8L8 0L9.425 1.4L3.825 7H16V9H3.825Z" fill="#E39C9C" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            {/* Engine Oil Card */}
            <div className="relative bg-[#343434] rounded-3xl overflow-hidden min-h-[260px] md:min-h-[300px]">
              <div className="absolute bg-[rgba(229,160,69,0.5)] blur-[57px] w-64 h-32 rounded-full top-1/2 left-1/4 -translate-y-1/2" />
              <div className="relative flex flex-col md:flex-row h-full">
                <div className="w-full md:w-[60%] flex flex-col justify-between p-6 md:p-8 gap-4">
                  <h3 className=" text-2xl md:text-3xl text-[#FEDE59] text-right pt-10" dir="auto">
                    روغن موتور
                  </h3>
                  <div className="flex items-center gap-2 mt-2 md:mt-4 group">
                    <span className=" text-[#FEDE59] text-base text-right" dir="auto">
                      مشاهده محصولات
                    </span>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M3.825 9L9.425 14.6L8 16L0 8L8 0L9.425 1.4L3.825 7H16V9H3.825Z" fill="#FEDE59" />
                    </svg>
                  </div>
                </div>
                <div className="w-full md:w-[40%] flex items-center justify-center">
                  <div className="w-full max-w-xs flex items-center justify-center">
                    <div className="w-[213px] h-[265px] flex items-center justify-center">
                      <img alt="" className="w-full h-full object-contain pointer-events-none" src={img4066180884Cf1Da234Ada498F99878E38474B39B91.src} />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Gear Oil Card (Wide) */}
            <div className="relative bg-[#343434] rounded-3xl overflow-hidden min-h-[260px] md:min-h-[300px]">
              <div className="absolute bg-[#C9C9C980] blur-[57px] w-96 h-48 rounded-full top-1/2 left-1/4 -translate-y-1/2" />
              <div className="relative flex flex-col md:flex-row h-full">
                <div className="w-full md:w-[60%] flex flex-col justify-between p-6 md:p-8 gap-3 ">
                  <h3 className=" text-2xl md:text-3xl text-[#E7E7E7] text-right pt-10" dir="auto">
                    روغن گیربکس
                  </h3>
                  <div className="flex items-center gap-2 mt-2 md:mt-4 group">
                    <span className=" text-[#E7E7E7] text-base text-right" dir="auto">
                      مشاهده محصولات
                    </span>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M3.825 9L9.425 14.6L8 16L0 8L8 0L9.425 1.4L3.825 7H16V9H3.825Z" fill="#E7E7E7" />
                    </svg>
                  </div>
                </div>
                <div className="w-full md:w-[40%] flex items-center justify-center">
                  <div className="w-full max-w-xs flex items-center justify-center">
                    <img alt="" className="w-full h-full object-contain pointer-events-none" src={imgImage2.src} />
                  </div>
                </div>
              </div>
            </div>

            {/* Brake Oil Card */}
            <div className="relative bg-[#343434] rounded-3xl overflow-hidden min-h-[260px] md:min-h-[300px]">
              <div className="absolute bg-[rgba(255,35,39,0.5)] blur-[57px] w-64 h-32 rounded-full top-1/2 left-1/4 -translate-y-1/2" />
              <div className="relative flex flex-col md:flex-row h-full">
                <div className="w-full md:w-[60%] flex flex-col justify-between p-6 md:p-8 gap-4">
                  <h3 className=" text-2xl md:text-3xl text-[#FF2023] text-right mt-10" dir="auto">
                    روغن ترمز
                  </h3>
                  <div className="flex items-center gap-2 mt-2 md:mt-4 group">
                    <span className=" text-[#FF2023] text-base text-right" dir="auto">
                      مشاهده محصولات
                    </span>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M3.825 9L9.425 14.6L8 16L0 8L8 0L9.425 1.4L3.825 7H16V9H3.825Z" fill="#FF2023" />
                    </svg>
                  </div>
                </div>
                <div className="w-full md:w-[40%] flex items-center justify-center">
                  <div className="w-full max-w-xs flex items-center justify-center">
                    <img alt="" className="w-full h-full object-contain pointer-events-none" src={imgImage5.src} />
                  </div>
                </div>
              </div>
            </div>

            {/* Gear Oil Card (Wide) */}
            <div className="relative bg-[#343434] rounded-3xl overflow-hidden min-h-[260px] md:min-h-[300px]">
              <div className="absolute bg-[#1D36F14D] blur-[57px] w-96 h-48 rounded-full top-1/2 left-1/4 -translate-y-1/2" />
              <div className="relative flex flex-col md:flex-row h-full">
                <div className="w-full md:w-[60%] flex flex-col justify-between p-6 md:p-8 gap-3">
                  <h3 className=" text-2xl md:text-3xl text-[#738CD2] text-right mt-10" dir="auto">
                    روغن گیربکس
                  </h3>
                  <div className="flex items-center gap-2 mt-2 md:mt-4 group">
                    <span className=" text-[#738CD2] text-base text-right" dir="auto">
                      مشاهده محصولات
                    </span>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M3.825 9L9.425 14.6L8 16L0 8L8 0L9.425 1.4L3.825 7H16V9H3.825Z" fill="#738CD2" />
                    </svg>
                  </div>
                </div>
                <div className="w-full md:w-[40%] flex items-center justify-center">
                  <div className="w-full max-w-xs flex items-center justify-center">
                    <img alt="" className="w-full h-full object-contain pointer-events-none" src={imgImage6.src} />
                  </div>
                </div>
              </div>
            </div>

            {/* Brake Oil Card */}
            <div className="relative bg-[#343434] rounded-3xl overflow-hidden min-h-[260px] md:min-h-[300px]">
              <div className="absolute bg-[#EA770C] blur-[57px] w-64 h-32 rounded-full top-1/2 left-1/4 -translate-y-1/2" />
              <div className="relative flex flex-col md:flex-row-reverse h-full">
                <div className="w-full md:w-[40%] flex items-center justify-center">
                  <div className="w-full max-w-xs flex items-center justify-center">
                    <img alt="" className="w-full h-full object-contain pointer-events-none" src={imgImage3.src} />
                  </div>
                </div>
                <div className="w-full md:w-[60%] flex flex-col justify-between p-6 md:p-8 gap-4">
                  <h3 className=" text-2xl md:text-3xl text-[#EA770C] text-right mt-10" dir="auto">
                    روغن ترمز
                  </h3>
                  <div className="flex items-center gap-2 mt-2 md:mt-4 group">
                    <span className=" text-[#EA770C] text-base text-right" dir="auto">
                      مشاهده محصولات
                    </span>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M3.825 9L9.425 14.6L8 16L0 8L8 0L9.425 1.4L3.825 7H16V9H3.825Z" fill="#EA770C" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Special Additives Card */}
            <div className="relative bg-[#343434] rounded-3xl overflow-hidden min-h-[260px] md:min-h-[300px]">
              <div className="absolute bg-[rgba(255,255,255,0.5)] blur-[57px] w-64 h-32 rounded-full top-1/2 left-1/4 -translate-y-1/2" />
              <div
                className="relative flex flex-col md:flex-row h-full"
                style={{
                  backgroundImage: `url('${imgImage7.src}')`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'left',
                  backgroundRepeat: 'no-repeat',
                }}
              >
                <div className="relative z-10 w-full md:w-[60%] flex flex-col justify-between p-6 md:p-8 gap-4 order-1 md:order-2">
                  <h3 className=" text-2xl md:text-3xl text-white text-right mt-10" dir="auto">
                    افزودنی های خاص
                  </h3>
                  <div className="flex items-center gap-2 mt-2 md:mt-4 group">
                    <span className=" text-white text-base text-right" dir="auto">
                      مشاهده محصولات
                    </span>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M3.825 9L9.425 14.6L8 16L0 8L8 0L9.425 1.4L3.825 7H16V9H3.825Z" fill="#FFFFFF" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Introduction Section */}
        <section className=" mb-16 md:mb-20 px-4 sm:px-6 lg:px-16">
          <h2 className="text-2xl md:text-3xl lg:text-4xl  text-white text-center mb-8 md:mb-16" dir="auto">
            معرفی Romela آلمان
          </h2>

          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center">
            <div className="w-full lg:w-1/2">
              <p className="text-lg md:text-xl text-white text-right leading-relaxed" dir="auto">
                لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد، در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان رسد.
              </p>
            </div>
            <div className="w-full lg:w-1/2">
              <div className="bg-[#343434] rounded-3xl p-8 md:p-12">
                <div className="w-full h-[256px] md:h-[300px] flex items-center justify-center">
                  <img alt="" className="w-full h-full object-contain pointer-events-none" src={imgImage9.src} />
                </div>
              </div>
            </div>
          </div>
        </section>

        <Divider />

        {/* Products Section */}
        <section className="mb-16 md:mb-20 px-4 sm:px-6 lg:px-16">
          <h2 className="text-2xl md:text-3xl lg:text-4xl  text-white text-center mb-8 md:mb-16" dir="auto">
            محصولات Romela Oil
          </h2>

          {/* Category Tabs */}
          <div className="mb-8 md:mb-12 flex justify-center">
            <div
              className="rounded-full p-1 flex flex-wrap gap-2 md:gap-3 justify-center items-center w-fit"
              style={{
                background: '#2a2a2a',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.05)',
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
                    className={`
                      px-5 md:px-6 py-2.5 md:py-3 rounded-full transition-all duration-200
                      whitespace-nowrap
                      ${isActive
                        ? 'bg-[#FFFFFF1F] text-[#F9BD65] hover:bg-[#FFFFFF1F]'
                        : ' text-[#F9BD65] hover:bg-[#3a3a3a]'
                      }
                    `}
                    style={{
                      ...(isActive && {
                        boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.5)',
                      }),
                    }}
                  >
                    <span className="text-sm md:text-base" dir="auto">
                      {tab.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 md:mt-28">
            {/* Product Card 1 */}
            <div className='relative'>
              <div className="relative bg-[#343434] h-[355px] rounded-[24px] w-full" />
              <div className="absolute h-[414px] w-full z-10 -top-20" data-name="Mockup ATF-ZF Background Removed">
                <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgMockupAtfZfBackgroundRemoved.src} />
              </div>
              <div className='w-[full] flex items-center justify-center z-10 -mt-5'>
                <div className="bg-[#e6a816ca] z-10 content-stretch flex h-[54px] items-center justify-center overflow-clip p-[10px] rounded-[120px] w-[90%]">
                  <div className=" justify-center leading-[0] not-italic relative shrink-0 text-base text-[#FCFBEE] text-center text-nowrap">
                    <p className="leading-[16px]" dir="auto">روغن گیربکس فول سینتتیک Romela ATF-ZF</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Product Card 2 */}
            <div className='relative'>
              <div className="relative bg-[#343434] h-[355px] rounded-[24px] w-full" />
              <div className="absolute h-[414px] w-full z-10 -top-20" data-name="Mockup ATF-ZF Background Removed">
                <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgMockupAtfZfBackgroundRemoved.src} />
              </div>
              <div className='w-[full] flex items-center justify-center z-10 -mt-5'>
                <div className="bg-[#e6a816ca] z-10 content-stretch flex h-[54px] items-center justify-center overflow-clip p-[10px] rounded-[120px] w-[90%]">
                  <div className=" justify-center leading-[0] not-italic relative shrink-0 text-base text-[#FCFBEE] text-center text-nowrap">
                    <p className="leading-[16px]" dir="auto">روغن گیربکس فول سینتتیک Romela ATF-ZF</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Product Card 3 */}
            <div className='relative'>
              <div className="relative bg-[#343434] h-[355px] rounded-[24px] w-full" />
              <div className="absolute h-[414px] w-full z-10 -top-20" data-name="Mockup ATF-ZF Background Removed">
                <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgMockupAtfZfBackgroundRemoved.src} />
              </div>
              <div className='w-[full] flex items-center justify-center z-10 -mt-5'>
                <div className="bg-[#e6a816ca] z-10 content-stretch flex h-[54px] items-center justify-center overflow-clip p-[10px] rounded-[120px] w-[90%]">
                  <div className=" justify-center leading-[0] not-italic relative shrink-0 text-base text-[#FCFBEE] text-center text-nowrap">
                    <p className="leading-[16px]" dir="auto">روغن گیربکس فول سینتتیک Romela ATF-ZF</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Product Card 4 */}
            <div className='relative'>
              <div className="relative bg-[#343434] h-[355px] rounded-[24px] w-full" />
              <div className="absolute h-[414px] w-full z-10 -top-20" data-name="Mockup ATF-ZF Background Removed">
                <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgMockupAtfZfBackgroundRemoved.src} />
              </div>
              <div className='w-[full] flex items-center justify-center z-10 -mt-5'>
                <div className="bg-[#e6a816ca] z-10 content-stretch flex h-[54px] items-center justify-center overflow-clip p-[10px] rounded-[120px] w-[90%]">
                  <div className=" justify-center leading-[0] not-italic relative shrink-0 text-base text-[#FCFBEE] text-center text-nowrap">
                    <p className="leading-[16px]" dir="auto">روغن گیربکس فول سینتتیک Romela ATF-ZF</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <Divider />

        {/* Statistics Section */}
        <section className="mb-16 md:mb-20 px-4 sm:px-6 lg:px-16">
          <h2 className="text-2xl md:text-3xl lg:text-4xl text-white text-center mb-8 md:mb-12" dir="auto">
            Romela Oil آمار
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            <div
              className="rounded-2xl p-6 md:p-8 text-center flex flex-col gap-10 relative overflow-hidden"
              style={{
                background: '#FFFFFF1F',
                border: '1px solid #FCD85633',
              }}
            >
              <div className="absolute bg-[#FCD85699] blur-[57px] w-64 h-16 bottom-0 left-1/4 -translate-y-1/2" />
              <div className="text-sm md:text-base text-[#FCD856]" dir="auto">
              تعداد فروش
              </div>
              <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#FCD856]" dir="auto">
              + ۱۲۰,۰۰۰
              </div>
            </div>
            <div
              className="rounded-2xl p-6 md:p-8 text-center flex flex-col gap-10 relative overflow-hidden"
              style={{
                background: '#FFFFFF1F',
                border: '1px solid #FCD85633',
              }}
            >
              <div className="absolute bg-[#FCD85699] blur-[57px] w-64 h-16 bottom-0 left-1/4 -translate-y-1/2" />
              <div className="text-sm md:text-base text-[#FCD856]" dir="auto">
              محصولات صادر شده
              </div>
              <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#FCD856]" dir="auto">
              + ۷۱,۰۰۰
              </div>
            </div>
            <div
              className="rounded-2xl p-6 md:p-8 text-center flex flex-col gap-10 relative overflow-hidden"
              style={{
                background: '#FFFFFF1F',
                border: '1px solid #FCD85633',
              }}
            >
              <div className="absolute bg-[#FCD85699] blur-[57px] w-64 h-16 bottom-0 left-1/4 -translate-y-1/2" />
              <div className="text-sm md:text-base text-[#FCD856]" dir="auto">
              تنوع محصولات
              </div>
              <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#FCD856]" dir="auto">
              + ۱۰۰
              </div>
            </div>
            <div
              className="rounded-2xl p-6 md:p-8 text-center flex flex-col gap-10 relative overflow-hidden"
              style={{
                background: '#FFFFFF1F',
                border: '1px solid #FCD85633',
              }}
            >
              <div className="absolute bg-[#FCD85699] blur-[57px] w-64 h-16 bottom-0 left-1/4 -translate-y-1/2" />
              <div className="text-sm md:text-base text-[#FCD856]" dir="auto">
                مشتریان
              </div>
              <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#FCD856]" dir="auto">
                + ۱۰۰۰
              </div>
            </div>
          </div>
        </section>

        <Divider />

        {/* Best Selling Products Section */}
        <section className="mb-16 md:mb-20 px-4 sm:px-6 lg:px-16">
          <h2 className="text-2xl md:text-3xl lg:text-4xl text-white text-center mb-8 md:mb-12" dir="auto">
            محصولات پرفروش
          </h2>

          {/* Main Content Container */}
          <div
            className="rounded-3xl p-6 md:p-8 lg:p-10"
            style={{
              background: '#2a2a2a',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)',
            }}
          >
            {/* Tab Navigation */}
            <div className="mb-8 md:mb-12 flex justify-center">
              <div
                className="rounded-full p-1 flex flex-wrap gap-2 md:gap-3 justify-center items-center w-fit"
                style={{
                  background: '#2a2a2a',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.05)',
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
                      className={`
                        px-5 md:px-6 py-2.5 md:py-3 rounded-full transition-all duration-200
                        whitespace-nowrap
                        ${isActive
                          ? 'bg-[#FFFFFF1F] text-[#F9BD65] hover:bg-[#FFFFFF1F]'
                          : ' text-[#F9BD65] hover:bg-[#3a3a3a]'
                        }
                      `}
                    >
                      <span className="text-sm md:text-base" dir="auto">
                        {tab.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Content Area: Text + Product Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
              {/* Right Side: Text Description */}
              <div className="flex flex-col">
                <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4 md:mb-6" dir="auto">
                  روغن موتور روملا
                </h3>
                <p className="text-base md:text-lg text-white/90 leading-relaxed text-right" dir="auto">
                  لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد.
                </p>
              </div>

              {/* Left Side: Product Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
                {/* Product Card 1: Romela Drive 0w-20 */}
                <div
                  className="rounded-2xl p-4 md:p-6 flex flex-col"
                  style={{
                    background: '#FFFFFF29',
                    border: '1px solid #FFFFFF33',
                  }}
                >
                  <h4 className="text-lg md:text-xl font-bold text-[#F9BD65] mb-4 text-center" dir="auto">
                    Romela Drive 0w-20
                  </h4>
                  <div className="flex-1 flex items-center justify-center mb-4">
                    <img src="/images/image 1.png" alt="" className="w-32" />
                  </div>
                </div>

                {/* Product Card 2: Romela Drive 5w-30 */}
                <div
                  className="rounded-2xl p-4 md:p-6 flex flex-col"
                  style={{
                    background: '#FFFFFF29',
                    border: '1px solid #FFFFFF33',
                  }}
                >
                  <h4 className="text-lg md:text-xl font-bold text-[#F9BD65] mb-4 text-center" dir="auto">
                    Romela Drive 5w-30
                  </h4>
                  <div className="flex-1 flex items-center justify-center mb-4">
                    <img src="/images/image 1.png" alt="" className="w-32" />
                  </div>
                </div>

                {/* Product Card 3: Romela Drive 10w-40 */}
                <div
                  className="rounded-2xl p-4 md:p-6 flex flex-col"
                  style={{
                    background: '#FFFFFF29',
                    border: '1px solid #FFFFFF33',
                  }}
                >
                  <h4 className="text-lg md:text-xl font-bold text-[#F9BD65] mb-4 text-center" dir="auto">
                    Romela Drive 10w-40
                  </h4>
                  <div className="flex-1 flex items-center justify-center mb-4">
                    <div className="w-32 bg-[#FFFFFF4D] rounded-[10px] h-full"></div>
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
