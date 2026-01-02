"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import svgPaths from "./imports/svg-vwybhmkqfj";
import clsx from "clsx";
import { getWcaCategories, getWcaProducts, getWcaPrimaryImageUrl, getWcaAttributes, getWcaAttributeTerms } from "@/lib/api/wca";
import type { WcaCategory, WcaProduct, WcaAttribute, WcaAttributeTerm } from "@/lib/api/types";
import { useRouter } from "next/navigation";
import Link from "next/link";

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
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap'
        }}
        className={`text-center cursor-pointer font-bold ${className}`}
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
import { LoadingSpinner } from "@/components/ui/Loading";

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
        <span className="text-white text-right flex-1 text-base font-semibold" dir="auto">
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
  const router = useRouter();

  // Dropdown states
  const [oilType, setOilType] = useState("");
  const [oilUsage, setOilUsage] = useState("");
  const [brand, setBrand] = useState("");

  // Active tab state
  const [activeTab, setActiveTab] = useState("gearbox-oil");
  const [activeBestsellerTab, setActiveBestsellerTab] = useState<number | null>(null);

  // API data states
  const [categories, setCategories] = useState<WcaCategory[]>([]);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [subcategories, setSubcategories] = useState<WcaCategory[]>([]);
  const [loadingSubcategories, setLoadingSubcategories] = useState(false);
  const [brandAttribute, setBrandAttribute] = useState<WcaAttribute | null>(null);
  const [brandTerms, setBrandTerms] = useState<WcaAttributeTerm[]>([]);
  const [loadingBrands, setLoadingBrands] = useState(true);
  const [products, setProducts] = useState<WcaProduct[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [bestsellerProducts, setBestsellerProducts] = useState<WcaProduct[]>([]);
  const [loadingBestsellers, setLoadingBestsellers] = useState(true);
  const [categoryProductsMap, setCategoryProductsMap] = useState<Record<string, WcaProduct[]>>({});

  // Category mapping for tabs
  const categorySlugMap: Record<string, string> = {
    'engine-oil': 'روغن-موتور',
    'gearbox-oil': 'روغن-گیربکس',
    'brake-oil': 'روغن-ترمز',
    'hydraulic-oil': 'روغن-هیدرولیک',
    'grease': 'گریس',
    'special-additives': 'افزودنی-های-خاص',
  };

  // Helper function to find category ID by name
  const findCategoryId = (name: string): number | null => {
    const category = categories.find(c => c.name === name || c.name.includes(name));
    return category?.id || null;
  };

  // Fetch categories
  useEffect(() => {
    async function loadCategories() {
      try {
        setLoadingCategories(true);
        const result = await getWcaCategories({
          per_page: 100,
          page: 1,
          hide_empty: true,
          parent: 0,
        });
        setCategories(result.categories || []);
      } catch (error) {
        console.error('Error fetching categories:', error);
        setCategories([]);
      } finally {
        setLoadingCategories(false);
      }
    }
    loadCategories();
  }, []);

  // Fetch subcategories when oilType (category) is selected
  useEffect(() => {
    async function loadSubcategories() {
      if (!oilType || oilType === "همه") {
        setSubcategories([]);
        return;
      }

      // Find the selected category
      const selectedCategory = categories.find(cat => cat.name === oilType || cat.id.toString() === oilType);
      if (!selectedCategory) {
        setSubcategories([]);
        return;
      }

      try {
        setLoadingSubcategories(true);
        const result = await getWcaCategories({
          per_page: 100,
          page: 1,
          hide_empty: true,
          parent: selectedCategory.id,
        });
        setSubcategories(result.categories || []);
        // Reset oilUsage when category changes
        setOilUsage("");
      } catch (error) {
        console.error('Error fetching subcategories:', error);
        setSubcategories([]);
      } finally {
        setLoadingSubcategories(false);
      }
    }

    if (categories.length > 0) {
      loadSubcategories();
    }
  }, [oilType, categories]);

  // Fetch brand attribute and terms
  useEffect(() => {
    async function loadBrands() {
      try {
        setLoadingBrands(true);
        const attrsResult = await getWcaAttributes();
        const attributes = attrsResult.attributes || [];

        // Find brand attribute (check common names: brand, برند, pa_brand, etc.)
        const brandAttr = attributes.find(attr =>
          attr.name.toLowerCase().includes('brand') ||
          attr.name.toLowerCase().includes('برند') ||
          attr.label.toLowerCase().includes('brand') ||
          attr.label.toLowerCase().includes('برند')
        );

        if (brandAttr) {
          setBrandAttribute(brandAttr);
          const termsResult = await getWcaAttributeTerms(brandAttr.id);
          if (termsResult) {
            setBrandTerms(termsResult.terms || []);
          }
        } else {
          // If no brand attribute found, try to find it by checking all attributes
          // This is a fallback - you might need to adjust based on your API structure
          console.warn('Brand attribute not found. Available attributes:', attributes.map(a => ({ name: a.name, label: a.label })));
        }
      } catch (error) {
        console.error('Error fetching brands:', error);
        setBrandTerms([]);
      } finally {
        setLoadingBrands(false);
      }
    }
    loadBrands();
  }, []);

  // Fetch products by category for tabs
  useEffect(() => {
    async function loadProductsByCategory() {
      try {
        setLoadingProducts(true);
        const allProducts: WcaProduct[] = [];
        const categoryMap: Record<string, WcaProduct[]> = {};

        // Fetch products for each category tab
        for (const [tabId, categorySlug] of Object.entries(categorySlugMap)) {
          try {
            // Find category by slug
            const category = categories.find(cat =>
              cat.slug === categorySlug ||
              cat.name.toLowerCase().includes(categorySlug.replace('-', ' '))
            );

            if (category) {
              const result = await getWcaProducts({
                per_page: 4,
                page: 1,
                category: category.id,
              });
              const categoryProducts = result.products || [];
              categoryMap[tabId] = categoryProducts;
              allProducts.push(...categoryProducts);
            }
          } catch (error) {
            console.error(`Error fetching products for ${tabId}:`, error);
            categoryMap[tabId] = [];
          }
        }

        setCategoryProductsMap(categoryMap);
        setProducts(allProducts);
      } catch (error) {
        console.error('Error fetching products:', error);
        setProducts([]);
      } finally {
        setLoadingProducts(false);
      }
    }

    if (categories.length > 0) {
      loadProductsByCategory();
    }
  }, [categories]);

  // Fetch bestseller products by category
  const [bestsellerProductsMap, setBestsellerProductsMap] = useState<Record<number, WcaProduct[]>>({});

  useEffect(() => {
    async function loadBestsellers() {
      if (categories.length === 0) return;

      try {
        setLoadingBestsellers(true);
        const productsMap: Record<number, WcaProduct[]> = {};

        // Fetch bestseller products for each main category
        for (const category of categories.slice(0, 6)) { // Limit to first 6 categories
          try {
            const result = await getWcaProducts({
              per_page: 3,
              page: 1,
              category: category.id,
              featured: true,
              orderby: 'popularity',
              order: 'DESC',
            });
            if (result.products && result.products.length > 0) {
              productsMap[category.id] = result.products;
            }
          } catch (error) {
            console.error(`Error fetching bestsellers for category ${category.id}:`, error);
          }
        }

        setBestsellerProductsMap(productsMap);

        // Also keep the old state for backward compatibility
        const allBestsellers = Object.values(productsMap).flat();
        setBestsellerProducts(allBestsellers);
      } catch (error) {
        console.error('Error fetching bestsellers:', error);
        setBestsellerProducts([]);
      } finally {
        setLoadingBestsellers(false);
      }
    }
    loadBestsellers();
  }, [categories]);

  // Handle search
  const handleSearch = () => {
    const params = new URLSearchParams();

    // Add category filter
    if (oilType && oilType !== "همه") {
      const selectedCategory = categories.find(cat => cat.name === oilType || cat.id.toString() === oilType);
      if (selectedCategory) {
        params.set('category', selectedCategory.id.toString());
      }
    }

    // Add subcategory filter
    if (oilUsage && oilUsage !== "همه") {
      const selectedSubcategory = subcategories.find(sub => sub.name === oilUsage || sub.id.toString() === oilUsage);
      if (selectedSubcategory) {
        params.set('subcategory', selectedSubcategory.id.toString());
      }
    }

    // Add brand filter (attribute term)
    if (brand && brand !== "همه") {
      const selectedBrandTerm = brandTerms.find(term => term.name === brand || term.id.toString() === brand);
      if (selectedBrandTerm && brandAttribute) {
        params.set('attribute_terms', selectedBrandTerm.id.toString());
      }
    }

    router.push(`/products?${params.toString()}`);
  };

  // Prepare dropdown options
  const oilTypeOptions = useMemo(() => {
    return ["همه", ...categories.map(cat => cat.name)];
  }, [categories]);

  const oilUsageOptions = useMemo(() => {
    return ["همه", ...subcategories.map(sub => sub.name)];
  }, [subcategories]);

  const brandOptions = useMemo(() => {
    return ["همه", ...brandTerms.map(term => term.name)];
  }, [brandTerms]);

  // Get products for current active tab
  const currentTabProducts = useMemo(() => {
    return categoryProductsMap[activeTab] || [];
  }, [activeTab, categoryProductsMap]);

  // Set initial bestseller tab when categories load
  useEffect(() => {
    if (categories.length > 0 && activeBestsellerTab === null) {
      setActiveBestsellerTab(categories[0].id);
    }
  }, [categories, activeBestsellerTab]);

  // Get bestseller products for current bestseller tab
  const currentBestsellerProducts = useMemo(() => {
    if (activeBestsellerTab === null) return [];

    if (bestsellerProductsMap[activeBestsellerTab]) {
      return bestsellerProductsMap[activeBestsellerTab].slice(0, 3);
    }

    // Fallback: filter from all bestsellers
    return bestsellerProducts.filter(product =>
      product.categories?.some(cat => cat.id === activeBestsellerTab)
    ).slice(0, 3);
  }, [activeBestsellerTab, bestsellerProducts, bestsellerProductsMap]);

  // Get current category for bestseller section
  const currentBestsellerCategory = useMemo(() => {
    if (activeBestsellerTab === null) return null;
    return categories.find(cat => cat.id === activeBestsellerTab);
  }, [activeBestsellerTab, categories]);

  // Category descriptions map
  const categoryDescriptions: Record<string, string> = {
    'روغن موتور': 'روغن موتورهای Romela از جمله محصولات پرفروش هستند که با بهره‌گیری از تکنولوژی روز آلمان و فرمولاسیون پیشرفته تولید می‌شوند. محصولاتی مانند Romela Drive 10W-40 با ایجاد محافظت پایدار از اجزای موتور، سبب کاهش استهلاک، بهبود عملکرد و افزایش طول عمر موتور می‌شوند. این روغن‌ها با استانداردهای بین‌المللی خودروسازان سازگار بوده و گزینه‌ای مطمئن برای خودروهای شهری و جاده‌ای محسوب می‌شوند.',
    'روغن گیربکس': 'روغن های گیربکس‌ Romela با طراحی تخصصی برای سیستم‌های انتقال قدرت دستی و اتوماتیک در کاربرد های سواری و صنعتی عرضه می شود. این روغن عملکردی نرم، روان و بدون ضربه در تعویض دنده‌ها فراهم می‌کنند. محصولات پر فروش مانند Romela ATZ-ZF با مقاومت بالا در برابر فشار و حرارت، از سایش چرخ‌دنده‌ها جلوگیری کرده و عمر مفید گیربکس را افزایش می‌دهند.',
    'روغن ترمز': 'روغن ترمز Romela با فرمولاسیون پیشرفته، عملکرد دقیق و پایدار سیستم ترمز را حتی در شرایط دمایی و فشاری بالا تضمین می‌کند. این محصولات با جلوگیری از تشکیل حباب و افت فشار، ایمنی رانندگی را به‌طور چشمگیری افزایش می‌دهند. انتخاب روغن ترمز استاندارد Romela، گامی مهم در حفظ کارایی سیستم ترمز و آرامش خاطر راننده است.',
    'روغن صنعتی': 'روغن‌های صنعتی شرکت Romela ویژه‌ی انواع توربین، کمپرسور، تزانسفورمر و... طراحی شده‌ است. استفاده از روغن های باعث افزایش راندمان کاری و کاهش هزینه‌های نگهداری می‌شوند. این محصولات با پایداری حرارتی و شیمیایی بالا، در شرایط کاری سنگین نیز عملکردی مطمئن ارائه می‌دهند و از بهترین روانکارهای صنعتی موجود در بازار به‌شمار می‌آیند.',
    'روغن هیدرولیک': 'روغن‌های هیدرولیک Romela از محبوب‌ترین و پرفروش‌ترین محصولات هستند که با کیفیت برتر آلمانی تولید می‌شوند. این روغن‌ها با انتقال بهینه نیرو، روانکاری مؤثر و مقاومت بالا در برابر اکسیداسیون و سایش، عملکردی پایدار و دقیق را در سیستم‌های هیدرولیکی فراهم می‌کنند.',
    'افزودنی ها': 'افزودنی‌های روانکار Romela با هدف بهبود عملکرد موتور و تجهیزات طراحی شده‌اند. این محصولات با افزایش خاصیت پاک‌کنندگی، کاهش اصطکاک، جلوگیری از اکسیداسیون و کنترل رسوبات، طول عمر روغن و قطعات را افزایش می‌دهند. استفاده از افزودنی‌های تخصصی Romela به بهینه‌سازی مصرف سوخت و عملکرد پایدار سیستم‌ها کمک می‌کند.',
    'افزودنی‌های خاص': 'افزودنی‌های روانکار Romela با هدف بهبود عملکرد موتور و تجهیزات طراحی شده‌اند. این محصولات با افزایش خاصیت پاک‌کنندگی، کاهش اصطکاک، جلوگیری از اکسیداسیون و کنترل رسوبات، طول عمر روغن و قطعات را افزایش می‌دهند. استفاده از افزودنی‌های تخصصی Romela به بهینه‌سازی مصرف سوخت و عملکرد پایدار سیستم‌ها کمک می‌کند.',
  };

  // Get description for current category
  const getCategoryDescription = (category: WcaCategory | null): string => {
    if (!category) {
      return 'محصولات پرفروش و محبوب روملا با کیفیت برتر آلمانی. این محصولات با استقبال بالای مشتریان مواجه شده‌اند و از بهترین‌های بازار محسوب می‌شوند.';
    }

    // Try to find description by category name
    const description = categoryDescriptions[category.name];
    if (description) {
      return description;
    }

    // Fallback to category description from API
    if (category.description) {
      return category.description;
    }

    // Default description
    return 'محصولات پرفروش و محبوب روملا با کیفیت برتر آلمانی. این محصولات با استقبال بالای مشتریان مواجه شده‌اند و از بهترین‌های بازار محسوب می‌شوند.';
  };

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
      <div className="relative w-full flex items-center justify-center rounded-[1rem] sm:rounded-[1.5rem] pb-6 sm:pb-8 md:pb-12 lg:pb-16 pt-24 sm:pt-32 md:pt-40 lg:pt-52" style={{
        backgroundImage: `url('/images/vibrant-colors-water-create-abstract-wave-pattern-generated-by-ai 2.png')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}>
        <div className="absolute inset-0 bg-[rgba(0,0,0,0.3)] rounded-[1rem] sm:rounded-[2rem]" />
        <div className="flex flex-col items-center justify-center z-10 w-full max-w-[1920px] mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          <p className="font-bold font-iranyekan leading-normal text-white text-center mb-4 sm:mb-6 md:mb-8 lg:mb-12 xl:mb-20 px-2" dir="rtl" style={{
            fontSize: 'clamp(1.125rem, 2.86vw, 2.75rem)',
            textShadow: '0px 2px 12px rgba(0,0,0,0.75)',
            maxWidth: '95%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexWrap: 'wrap',
            gap: '0.3em',
            lineHeight: '1.5'
          }}>
            <span>پادراد ارس نمایندگی رسمی محصولات</span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.2em', direction: 'ltr' }}>
              <span>ROMELA OIL GERMANY</span>
              <svg width="1.2em" height="0.9em" viewBox="0 0 5 3" style={{ display: 'inline-block', verticalAlign: 'middle', flexShrink: 0, marginTop: '0.05em' }} aria-label="Germany flag">
                <rect width="5" height="1" y="0" fill="#000000" />
                <rect width="5" height="1" y="1" fill="#DD0000" />
                <rect width="5" height="1" y="2" fill="#FFCE00" />
              </svg>
            </span>
          </p>
          <div
            className="w-full rounded-2xl sm:rounded-3xl max-w-6xl"
            style={{
              background: 'rgba(255, 255, 255, 0.05)',
              backdropFilter: 'blur(39px) saturate(180%)',
              WebkitBackdropFilter: 'blur(39px) saturate(180%)',
              border: '1px solid rgba(255, 255, 255, 0.18)',
              boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37), 0 0 0 1px rgba(255, 255, 255, 0.1) inset',
              backgroundImage: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 50%, rgba(255, 255, 255, 0.02) 100%)',
              padding: 'clamp(0.75rem, 1.56vw, 2rem)',
            }}
          >
            <div className="flex flex-col lg:flex-row items-start justify-between gap-3 sm:gap-4 lg:gap-6 mb-3 sm:mb-4 md:mb-6 lg:mb-8">
              {/* Title and Description */}
              <div className="text-right flex-1">
                <h2 className="text-white mb-4 text-2xl font-semibold" dir="auto">
                  جستجو روغن مناسب کاربری شما
                </h2>
                <p className="text-[#FFFFFFCC] leading-relaxed text-base" dir="auto">
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
                <span className="text-[#fcfbee] font-bold text-base" dir="auto">
                  راهنمای انتخاب روغن
                </span>
              </button>
            </div>
            {/* Filters and Search Button */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3 md:gap-4 lg:gap-6 items-center">
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
                id="brand"
                label="برند"
                options={brandOptions}
                value={brand}
                onChange={setBrand}
              />
              {/* Search Button */}
              <button
                onClick={handleSearch}
                className="w-full lg:w-auto flex items-center bg-[#E6A81699] justify-center rounded-[120px] transition-all hover:opacity-90 order-1 sm:order-0"
                style={{
                  backdropFilter: 'blur(10px)',
                  WebkitBackdropFilter: 'blur(10px)',
                  height: 'clamp(3rem, 3.75vw, 3.375rem)',
                  paddingLeft: 'clamp(2rem, 3.13vw, 3rem)',
                  paddingRight: 'clamp(2rem, 3.13vw, 3rem)',
                }}
              >
                <span className="text-[#fcfbee] font-bold text-base" dir="auto">
                  جستجو محصول
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Container */}
      <div className="w-full max-w-[1920px] mx-auto xl:px-0 2xl:px-6 sm:px-6" style={{ paddingTop: 'clamp(1.5rem, 2.6vw, 4rem)', paddingBottom: 'clamp(1.5rem, 2.6vw, 4rem)' }}>

        {/* Category Section */}
        <section style={{ marginBottom: 'clamp(2.5rem, 4.17vw, 5rem)' }}>
          <h2 className="font-iranyekan text-white text-center font-bold text-xl sm:text-2xl md:text-[2.125rem]" dir="auto" style={{
            marginBottom: 'clamp(1rem, 1.56vw, 2rem)'
          }}>
            دسته‌بندی محصولات Romela Oil
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4" style={{ gap: 'clamp(0.75rem, 1.56vw, 2rem)' }}>

            {/* Industrial Oils Card (Wide) */}
            <div
              className="relative bg-[#343434] rounded-3xl overflow-hidden h-48 sm:h-64 md:h-64 lg:col-span-2"
            >
              <div className="absolute bg-[rgba(215,105,105,0.5)] blur-[57px] rounded-full top-1/2 left-1/4 -translate-y-1/2" style={{ width: 'clamp(12rem, 25vw, 24rem)', height: 'clamp(8rem, 12.5vw, 12rem)' }} />
              <div className="relative flex flex-col md:flex-row h-full" 
                style={{
                  backgroundImage: `url('${imgImage8.src}')`,
                  backgroundSize: '34% auto',
                  backgroundPosition: 'left',
                  backgroundRepeat: 'no-repeat',
                }}>
                <div className="w-[80%] md:w-[60%] flex flex-col justify-between gap-2 sm:gap-3" style={{ padding: 'clamp(1rem, 1.56vw, 2rem)' }}>
                  <div style={{ paddingTop: 'clamp(1.5rem, 2.5vw, 2.5rem)' }}>
                    <h3 className="text-[#E39C9C] text-right 3xl:text-3xl text-xl font-bold font-iranyekan" dir="auto" style={{}}>
                      روغن های صنعتی
                    </h3>
                    <p className="text-[#E39C9C] text-right font-iranyekan" dir="auto" style={{ fontSize: 'clamp(1rem, 1.25vw, 1.125rem)', marginTop: 'clamp(0.75rem, 1.04vw, 1rem)' }}>
                      توربین، کمپرسور، ترانسفورمر، حرارتی، بافت و ...
                    </p>
                  </div>
                  <Link
                    href={findCategoryId('روغن صنعتی') ? `/products/category/${findCategoryId('روغن صنعتی')}` : '/products'}
                    className="flex items-center group"
                    style={{ gap: 'clamp(0.75rem, 1.04vw, 1rem)', marginTop: 'clamp(0.5rem, 1.04vw, 1rem)' }}
                  >
                    <span className="text-[#E39C9C] text-right font-iranyekan" dir="auto" style={{ fontSize: 'clamp(0.875rem, 1.04vw, 1rem)' }}>
                      مشاهده محصولات
                    </span>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: 'clamp(1rem, 1.04vw, 1rem)', height: 'clamp(1rem, 1.04vw, 1rem)' }}>
                      <path d="M3.825 9L9.425 14.6L8 16L0 8L8 0L9.425 1.4L3.825 7H16V9H3.825Z" fill="#E39C9C" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
            {/* Engine Oil Card */}
            <div
              className="relative bg-[#343434] rounded-3xl overflow-hidden h-48 sm:h-64 md:h-64"
            >
              <div className="absolute bg-[rgba(229,160,69,0.5)] blur-[57px] rounded-full top-1/2 left-1/4 -translate-y-1/2" style={{ width: 'clamp(8rem, 16.67vw, 16rem)', height: 'clamp(4rem, 8.33vw, 8rem)' }} />
              <div className="relative flex flex-col md:flex-row h-full" 
                style={{
                  backgroundImage: `url('${img4066180884Cf1Da234Ada498F99878E38474B39B91.src}')`,
                  backgroundSize: '50% auto',
                  backgroundPosition: 'left',
                  backgroundRepeat: 'no-repeat',
                }}>
                <div className="w-[80%] md:w-[70%] flex flex-col justify-between gap-3 sm:gap-4" style={{ padding: 'clamp(1rem, 1.56vw, 2rem)' }}>
                  <h3 className="text-[#FEDE59] text-right 3xl:text-3xl text-xl font-bold font-iranyekan" dir="auto" style={{ paddingTop: 'clamp(1.5rem, 2.5vw, 2.5rem)' }}>
                    روغن موتور
                  </h3>
                  <Link
                    href={findCategoryId('روغن موتور') ? `/products/category/${findCategoryId('روغن موتور')}` : '/products'}
                    className="flex items-center group"
                    style={{ gap: 'clamp(0.5rem, 0.83vw, 0.5rem)', marginTop: 'clamp(0.5rem, 1.04vw, 1rem)' }}
                  >
                    <span className="text-[#FEDE59] text-right font-iranyekan" dir="auto" style={{ fontSize: 'clamp(0.875rem, 1.04vw, 1rem)' }}>
                      مشاهده محصولات
                    </span>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: 'clamp(1rem, 1.04vw, 1rem)', height: 'clamp(1rem, 1.04vw, 1rem)' }}>
                      <path d="M3.825 9L9.425 14.6L8 16L0 8L8 0L9.425 1.4L3.825 7H16V9H3.825Z" fill="#FEDE59" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>

            {/* Gear Oil Card (Wide) */}
            <div
              className="relative bg-[#343434] rounded-3xl overflow-hidden h-48 sm:h-64 md:h-64"
            >
              <div className="absolute bg-[#C9C9C980] blur-[57px] rounded-full top-1/2 left-1/4 -translate-y-1/2" style={{ width: 'clamp(12rem, 25vw, 24rem)', height: 'clamp(8rem, 12.5vw, 12rem)' }} />
              <div className="relative flex flex-col md:flex-row h-full" 
                style={{
                  backgroundImage: `url('${imgImage2.src}')`,
                  backgroundSize: '50% auto',
                  backgroundPosition: 'left',
                  backgroundRepeat: 'no-repeat',
                }}>
                <div className="w-[80%] md:w-[70%] flex flex-col justify-between gap-3" style={{ padding: 'clamp(1.5rem, 2.08vw, 2rem)' }}>
                  <h3 className="text-[#E7E7E7] text-right 3xl:text-3xl text-xl font-bold font-iranyekan" dir="auto" style={{ paddingTop: 'clamp(1.5rem, 2.5vw, 2.5rem)' }}>
                    روغن گیربکس
                  </h3>
                  <Link
                    href={findCategoryId('روغن گیربکس') ? `/products/category/${findCategoryId('روغن گیربکس')}` : '/products'}
                    className="flex items-center group"
                    style={{ gap: 'clamp(0.5rem, 0.83vw, 0.5rem)', marginTop: 'clamp(0.5rem, 1.04vw, 1rem)' }}
                  >
                    <span className="text-[#E7E7E7] text-right font-iranyekan" dir="auto" style={{ fontSize: 'clamp(0.875rem, 1.04vw, 1rem)' }}>
                      مشاهده محصولات
                    </span>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: 'clamp(1rem, 1.04vw, 1rem)', height: 'clamp(1rem, 1.04vw, 1rem)' }}>
                      <path d="M3.825 9L9.425 14.6L8 16L0 8L8 0L9.425 1.4L3.825 7H16V9H3.825Z" fill="#E7E7E7" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>

            {/* Brake Oil Card */}
            <div
              className="relative bg-[#343434] rounded-3xl overflow-hidden h-48 sm:h-64 md:h-64"
            >
              <div className="absolute bg-[rgba(255,35,39,0.5)] blur-[57px] rounded-full top-1/2 left-1/4 -translate-y-1/2" style={{ width: 'clamp(8rem, 16.67vw, 16rem)', height: 'clamp(4rem, 8.33vw, 8rem)' }} />
              <div className="relative flex flex-col md:flex-row h-full" 
                style={{
                  backgroundImage: `url('${imgImage5.src}')`,
                  backgroundSize: '50% auto',
                  backgroundPosition: 'left',
                  backgroundRepeat: 'no-repeat',
                }}>
                <div className="w-[80%] md:w-[70%] flex flex-col justify-between gap-3 sm:gap-4" style={{ padding: 'clamp(1rem, 1.56vw, 2rem)' }}>
                  <h3 className="text-[#FF2023] text-right 3xl:text-3xl text-xl font-bold font-iranyekan" dir="auto" style={{ marginTop: 'clamp(1.5rem, 2.5vw, 2.5rem)' }}>
                    روغن ترمز
                  </h3>
                  <Link
                    href={findCategoryId('روغن ترمز') ? `/products/category/${findCategoryId('روغن ترمز')}` : '/products'}
                    className="flex items-center group"
                    style={{ gap: 'clamp(0.5rem, 0.83vw, 0.5rem)', marginTop: 'clamp(0.5rem, 1.04vw, 1rem)' }}
                  >
                    <span className="text-[#FF2023] text-right font-iranyekan" dir="auto" style={{ fontSize: 'clamp(0.875rem, 1.04vw, 1rem)' }}>
                      مشاهده محصولات
                    </span>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: 'clamp(1rem, 1.04vw, 1rem)', height: 'clamp(1rem, 1.04vw, 1rem)' }}>
                      <path d="M3.825 9L9.425 14.6L8 16L0 8L8 0L9.425 1.4L3.825 7H16V9H3.825Z" fill="#FF2023" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>

            {/* Hydraulic Oil Card */}
            <div
              className="relative bg-[#343434] rounded-3xl overflow-hidden h-48 sm:h-64 md:h-64"
            >
              <div className="absolute bg-[#1D36F14D] blur-[57px] rounded-full top-1/2 left-1/4 -translate-y-1/2" style={{ width: 'clamp(12rem, 25vw, 24rem)', height: 'clamp(8rem, 12.5vw, 12rem)' }} />
              <div className="relative flex flex-col md:flex-row h-full" 
                style={{
                  backgroundImage: `url('${imgImage6.src}')`,
                  backgroundSize: '50% auto',
                  backgroundPosition: 'left',
                  backgroundRepeat: 'no-repeat',
                }}>
                <div className="w-[80%] md:w-[70%] flex flex-col justify-between gap-3" style={{ padding: 'clamp(1.5rem, 2.08vw, 2rem)' }}>
                  <h3 className="text-[#738CD2] text-right 3xl:text-3xl text-xl font-bold font-iranyekan" dir="auto" style={{ marginTop: 'clamp(1.5rem, 2.5vw, 2.5rem)' }}>
                    روغن هیدرولیک
                  </h3>
                  <Link
                    href={findCategoryId('روغن هیدرولیک') ? `/products/category/${findCategoryId('روغن هیدرولیک')}` : '/products'}
                    className="flex items-center group"
                    style={{ gap: 'clamp(0.5rem, 0.83vw, 0.5rem)', marginTop: 'clamp(0.5rem, 1.04vw, 1rem)' }}
                  >
                    <span className="text-[#738CD2] text-right font-iranyekan" dir="auto" style={{ fontSize: 'clamp(0.875rem, 1.04vw, 1rem)' }}>
                      مشاهده محصولات
                    </span>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: 'clamp(1rem, 1.04vw, 1rem)', height: 'clamp(1rem, 1.04vw, 1rem)' }}>
                      <path d="M3.825 9L9.425 14.6L8 16L0 8L8 0L9.425 1.4L3.825 7H16V9H3.825Z" fill="#738CD2" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>

            {/* Grease Card */}
            <div
              className="relative bg-[#343434] rounded-3xl overflow-hidden h-48 sm:h-64 md:h-64"
            >
              <div className="absolute bg-[#EA770C] blur-[57px] rounded-full top-1/2 left-1/4 -translate-y-1/2" style={{ width: 'clamp(8rem, 16.67vw, 16rem)', height: 'clamp(4rem, 8.33vw, 8rem)' }} />
              <div className="relative flex flex-col md:flex-row h-full" 
                 style={{
                  backgroundImage: `url('${imgImage3.src}')`,
                  backgroundSize: '50% auto',
                  backgroundPosition: 'left',
                  backgroundRepeat: 'no-repeat',
                }}>
               
                <div className="w-[80%] md:w-[70%] flex flex-col justify-between gap-3 sm:gap-4" style={{ padding: 'clamp(1rem, 1.56vw, 2rem)' }}>
                  <h3 className="text-[#EA770C] text-right 3xl:text-3xl text-xl font-bold font-iranyekan" dir="auto" style={{ marginTop: 'clamp(1.5rem, 2.5vw, 2.5rem)' }}>
                    گریس
                  </h3>
                  <Link
                    href={findCategoryId('گریس') ? `/products/category/${findCategoryId('گریس')}` : '/products'}
                    className="flex items-center group"
                    style={{ gap: 'clamp(0.5rem, 0.83vw, 0.5rem)', marginTop: 'clamp(0.5rem, 1.04vw, 1rem)' }}
                  >
                    <span className="text-[#EA770C] text-right font-iranyekan" dir="auto" style={{ fontSize: 'clamp(0.875rem, 1.04vw, 1rem)' }}>
                      مشاهده محصولات
                    </span>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: 'clamp(1rem, 1.04vw, 1rem)', height: 'clamp(1rem, 1.04vw, 1rem)' }}>
                      <path d="M3.825 9L9.425 14.6L8 16L0 8L8 0L9.425 1.4L3.825 7H16V9H3.825Z" fill="#EA770C" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>

            {/* Special Additives Card */}
            <div
              className="relative bg-[#343434] rounded-3xl overflow-hidden h-48 sm:h-64 md:h-64"
            >
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
                <div className="relative z-10 w-[80%] md:w-[70%] flex flex-col justify-between gap-4 order-1 md:order-2" style={{ padding: 'clamp(1.5rem, 2.08vw, 2rem)' }}>
                  <h3 className="text-white text-right 3xl:text-3xl text-xl font-bold font-iranyekan" dir="auto" style={{ marginTop: 'clamp(1.5rem, 2.5vw, 2.5rem)' }}>
                    افزودنی های خاص
                  </h3>
                  <Link
                    href={findCategoryId('افزودنی') ? `/products/category/${findCategoryId('افزودنی')}` : '/products'}
                    className="flex items-center group"
                    style={{ gap: 'clamp(0.5rem, 0.83vw, 0.5rem)', marginTop: 'clamp(0.5rem, 1.04vw, 1rem)' }}
                  >
                    <span className="text-white text-right font-iranyekan" dir="auto" style={{ fontSize: 'clamp(0.875rem, 1.04vw, 1rem)' }}>
                      مشاهده محصولات
                    </span>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: 'clamp(1rem, 1.04vw, 1rem)', height: 'clamp(1rem, 1.04vw, 1rem)' }}>
                      <path d="M3.825 9L9.425 14.6L8 16L0 8L8 0L9.425 1.4L3.825 7H16V9H3.825Z" fill="#FFFFFF" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Introduction Section */}
        <section className="2xl:px-16 xl:px-4 sm:px-6" style={{ marginBottom: 'clamp(2.5rem, 4.17vw, 5rem)' }}>
          <h2 className="font-iranyekan text-white text-center font-bold text-xl sm:text-2xl md:text-[2.125rem]" dir="auto" style={{
            marginBottom: 'clamp(1.5rem, 2.34vw, 2.75rem)'
          }}>
            معرفی Romela آلمان
          </h2>

          <div className="flex flex-col lg:flex-row" style={{ gap: 'clamp(1rem, 2.34vw, 3rem)' }}>
            <div className="w-full lg:w-[60%]">
              <p className="text-white text-right text-base sm:text-lg font-medium" dir="auto" style={{
                lineHeight: 'clamp(1.75rem, 5.21vw, 2.5rem)'
              }}>
شرکت پاد راد صنعت موتور ارس با تمرکز بر واردات مستقیم و بدون واسطه‌ی انواع روانکارها، به‌عنوان نماینده‌ی رسمی محصولات برند Romela آلمان در ایران فعالیت می‌کند.
               <br />
               محصولات Romela شامل طیف متنوعی از روغن‌های صنعتی، روانکارهای تخصصی و روغن‌ موتور بوده و مطابق با استانداردهای بین‌المللی و تأییدیه‌های معتبر سازندگان تجهیزات و خودروسازان (OEM Approvals) تولید می‌شوند.
                         </p>
            </div>
            <div className="w-full lg:w-[40%]">
              <div className="bg-[#343434] rounded-3xl h-full flex items-center justify-center" style={{ padding: 'clamp(1.5rem, 2.34vw, 3rem)' }}>
                <div className="w-full flex items-center justify-center" style={{ height: 'clamp(256px, 15.63vw, 300px)' }}>
                  <img alt="" className="w-full h-full object-contain pointer-events-none" src={imgImage9.src} />
                </div>
              </div>
            </div>
          </div>
        </section>

        <Divider />

        {/* Products Section */}
        <section className="2xl:px-16 xl:px-4 sm:px-6" style={{ marginBottom: 'clamp(2.5rem, 4.17vw, 5rem)' }}>
          <h2 className="font-iranyekan text-white text-center font-bold text-xl sm:text-2xl md:text-[2.125rem]" dir="auto" style={{
            marginBottom: 'clamp(1.5rem, 2.34vw, 3rem)'
          }}>
            محصولات Romela Oil
          </h2>

          {/* Category Tabs */}
          <div className="w-full lg:flex lg:justify-center" style={{ marginBottom: 'clamp(1.5rem, 2.34vw, 3rem)' }}>
            <div
              className="rounded-full flex flex-nowrap items-center overflow-x-auto lg:overflow-visible no-scrollbar w-full lg:w-fit lg:justify-center"
              style={{
                background: '#2a2a2a',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.05)',
                padding: 'clamp(0.25rem, 0.31vw, 0.25rem)',
                gap: 'clamp(0.5rem, 0.78vw, 0.75rem)',
                WebkitOverflowScrolling: 'touch'
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
                    className="rounded-full transition-all duration-200 whitespace-nowrap flex-shrink-0"
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
                    <span dir="auto" className="font-medium" style={{ fontSize: 'clamp(0.875rem, 1.04vw, 1rem)' }}>
                      {tab.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {loadingProducts ? (
            <div className="text-center text-white py-8">در حال بارگذاری محصولات...</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4" style={{ gap: 'clamp(0.75rem, 1.56vw, 2rem)', marginTop: 'clamp(1.5rem, 5.21vw, 7rem)' }}>
              {currentTabProducts.length > 0 ? (
                currentTabProducts.slice(0, 4).map((product) => {
                  const productImage = getWcaPrimaryImageUrl(product) || imgMockupAtfZfBackgroundRemoved.src;
                  return (
                    <Link key={product.id} href={`/products/${product.slug}`} className='relative cursor-pointer block' style={{ marginTop: 'clamp(4rem, 5.21vw, 4rem)' }}>
                      <div className="relative bg-[#343434] rounded-[24px] w-full flex items-center justify-center" style={{ height: 'clamp(222px, 18.49vw, 355px)' }}>
                        <div className="h-full flex items-center justify-center" style={{
                        }} data-name="Mockup ATF-ZF Background Removed">
                          {productImage ? (
                            <img
                              src={productImage}
                              alt={product.name}
                              className="size-full -mt-24"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <LoadingSpinner size="lg" />
                            </div>
                          )}
                        </div>
                      </div>
                      <div className='w-full flex items-center justify-center z-10' style={{ marginTop: 'clamp(-1.25rem, -2.6vw, -1.25rem)' }}>
                        <div className="bg-[#e6a816ca] z-10 flex items-center justify-center rounded-[120px]" style={{ padding: 'clamp(1rem, 1.25vw, 1rem)', width: '90%' }}>
                          <div className="justify-center relative w-full">
                            <ProductNameWithTooltip text={product.name} className="text-[#FCFBEE] text-sm" />
                          </div>
                        </div>
                      </div>
                    </Link>
                  );
                })
              ) : (
                // Fallback to mock data if no products found
                Array.from({ length: 4 }).map((_, index) => (
                  <div key={index} className='relative' style={{ marginTop: 'clamp(4rem, 5.21vw, 4rem)' }}>
                    <div className="relative bg-[#343434] rounded-[24px] w-full flex items-center justify-center" style={{ height: 'clamp(222px, 18.49vw, 355px)' }}>
                      <div className="h-full flex items-center justify-center" style={{
                      }} data-name="Mockup ATF-ZF Background Removed">
                        {imgMockupAtfZfBackgroundRemoved.src ? (
                          <img
                            src={imgMockupAtfZfBackgroundRemoved.src}
                            alt="Mockup ATF-ZF Background Removed"
                            className="size-full -mt-24"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <LoadingSpinner size="lg" />
                          </div>
                        )}
                      </div>
                    </div>
                    <div className='w-full flex items-center justify-center z-10' style={{ marginTop: 'clamp(-1.25rem, -2.6vw, -1.25rem)' }}>
                      <div className="bg-[#e6a816ca] z-10 flex items-center justify-center rounded-[120px]" style={{ padding: 'clamp(1rem, 1.25vw, 1rem)', width: '90%' }}>
                        <div className="justify-center relative w-full">
                          <ProductNameWithTooltip text="روغن گیربکس فول سینتتیک Romela ATF-ZF" className="text-[#FCFBEE] text-base" />
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </section>
        <Divider />

        {/* Statistics Section */}
        <section className="2xl:px-16 xl:px-4 sm:px-6" style={{ marginBottom: 'clamp(2.5rem, 4.17vw, 5rem)' }}>
          <h2 className="font-iranyekan text-white text-center font-bold text-xl sm:text-2xl md:text-[2.125rem]" dir="auto" style={{
            marginBottom: 'clamp(1.5rem, 2.34vw, 3rem)'
          }}>
            Romela Oil آمار
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4" style={{ gap: 'clamp(0.75rem, 1.3vw, 1.5rem)' }}>
            <div
              className="rounded-2xl text-center flex flex-col relative overflow-hidden"
              style={{
                background: '#FFFFFF1F',
                border: '1px solid #FCD85633',
                padding: 'clamp(1rem, 1.56vw, 2rem)',
                gap: 'clamp(2.5rem, 5.21vw, 2.5rem)'
              }}
            >
              <div className="absolute bg-[#FCD85699] blur-[57px] bottom-0 left-1/4 -translate-y-1/2" style={{ width: 'clamp(12rem, 33.33vw, 16rem)', height: 'clamp(2rem, 5.21vw, 4rem)' }} />
              <div className="text-[#FCD856] font-iranyekan font-bold" dir="auto" style={{ fontSize: 'clamp(0.875rem, 1.04vw, 1rem)' }}>
                تعداد فروش
              </div>
              <div className="font-bold text-[#FCD856] font-iranyekan" dir="auto" style={{ fontSize: 'clamp(1.875rem, 2.6vw, 3rem)' }}>
                + ۱۲۰,۰۰۰
              </div>
            </div>
            <div
              className="rounded-2xl text-center flex flex-col relative overflow-hidden"
              style={{
                background: '#FFFFFF1F',
                border: '1px solid #FCD85633',
                padding: 'clamp(1rem, 1.56vw, 2rem)',
                gap: 'clamp(2.5rem, 5.21vw, 2.5rem)'
              }}
            >
              <div className="absolute bg-[#FCD85699] blur-[57px] bottom-0 left-1/4 -translate-y-1/2" style={{ width: 'clamp(12rem, 33.33vw, 16rem)', height: 'clamp(2rem, 5.21vw, 4rem)' }} />
              <div className="text-[#FCD856] font-iranyekan font-bold" dir="auto" style={{ fontSize: 'clamp(0.875rem, 1.04vw, 1rem)' }}>
                محصولات صادر شده
              </div>
              <div className="font-bold text-[#FCD856] font-iranyekan" dir="auto" style={{ fontSize: 'clamp(1.875rem, 2.6vw, 3rem)' }}>
                + ۷۱,۰۰۰
              </div>
            </div>
            <div
              className="rounded-2xl text-center flex flex-col relative overflow-hidden"
              style={{
                background: '#FFFFFF1F',
                border: '1px solid #FCD85633',
                padding: 'clamp(1rem, 1.56vw, 2rem)',
                gap: 'clamp(2.5rem, 5.21vw, 2.5rem)'
              }}
            >
              <div className="absolute bg-[#FCD85699] blur-[57px] bottom-0 left-1/4 -translate-y-1/2" style={{ width: 'clamp(12rem, 33.33vw, 16rem)', height: 'clamp(2rem, 5.21vw, 4rem)' }} />
              <div className="text-[#FCD856] font-iranyekan font-bold" dir="auto" style={{ fontSize: 'clamp(0.875rem, 1.04vw, 1rem)' }}>
                تنوع محصولات
              </div>
              <div className="font-bold text-[#FCD856] font-iranyekan" dir="auto" style={{ fontSize: 'clamp(1.875rem, 2.6vw, 3rem)' }}>
                + ۱۰۰
              </div>
            </div>
            <div
              className="rounded-2xl text-center flex flex-col relative overflow-hidden"
              style={{
                background: '#FFFFFF1F',
                border: '1px solid #FCD85633',
                padding: 'clamp(1rem, 1.56vw, 2rem)',
                gap: 'clamp(2.5rem, 5.21vw, 2.5rem)'
              }}
            >
              <div className="absolute bg-[#FCD85699] blur-[57px] bottom-0 left-1/4 -translate-y-1/2" style={{ width: 'clamp(12rem, 33.33vw, 16rem)', height: 'clamp(2rem, 5.21vw, 4rem)' }} />
              <div className="text-[#FCD856] font-iranyekan font-bold" dir="auto" style={{ fontSize: 'clamp(0.875rem, 1.04vw, 1rem)' }}>
                مشتریان
              </div>
              <div className="font-bold text-[#FCD856] font-iranyekan" dir="auto" style={{ fontSize: 'clamp(1.875rem, 2.6vw, 3rem)' }}>
                + ۱۰۰۰
              </div>
            </div>
          </div>
        </section>

        <Divider />

        {/* Best Selling Products Section */}
        <section className="2xl:px-16 xl:px-4 sm:px-6" style={{ marginBottom: 'clamp(2.5rem, 4.17vw, 5rem)' }}>
          <h2 className="font-iranyekan text-white text-center font-bold text-xl sm:text-2xl md:text-[2.125rem]" dir="auto" style={{
            marginBottom: 'clamp(1.5rem, 2.34vw, 3rem)'
          }}>
            محصولات پرفروش
          </h2>

          {/* Main Content Container */}
          <div
            className="rounded-3xl p-3 sm:p-4 md:p-6 lg:p-8 xl:p-14"
            style={{
              background: '#2a2a2a',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)',
            }}
          >
            {/* Tab Navigation */}
            <div className="w-full lg:flex lg:justify-center" style={{ marginBottom: 'clamp(1.5rem, 2.34vw, 3rem)' }}>
              <div
                className="rounded-full flex flex-nowrap items-center overflow-x-auto lg:overflow-visible no-scrollbar w-full lg:w-fit lg:justify-center"
                style={{
                  background: '#2a2a2a',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.05)',
                  padding: 'clamp(0.25rem, 0.31vw, 0.25rem)',
                  gap: 'clamp(0.5rem, 0.78vw, 0.75rem)',
                  WebkitOverflowScrolling: 'touch'
                }}
              >
                {categories.slice(0, 6).map((category) => {
                  const isActive = activeBestsellerTab === category.id;

                  return (
                    <button
                      key={category.id}
                      onClick={() => setActiveBestsellerTab(category.id)}
                      className="rounded-full transition-all duration-200 whitespace-nowrap flex-shrink-0"
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
                      <span dir="auto" className="font-medium" style={{ fontSize: 'clamp(0.875rem, 1.04vw, 1rem)' }}>
                        {category.name}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Content Area: Text + Product Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-2" style={{ gap: 'clamp(1rem, 2.34vw, 3rem)' }}>
              {/* Right Side: Text Description */}
              <div className="flex flex-col">
                <h3 className="font-bold text-white font-iranyekan text-lg sm:text-xl md:text-[1.375rem]" dir="auto" style={{
                  marginBottom: 'clamp(0.75rem, 1.3vw, 1.5rem)'
                }}>
                  {currentBestsellerCategory ? `${currentBestsellerCategory.name} Romela ` : 'محصولات پرفروش روملا'}
                </h3>
                <p className="text-white/90 leading-relaxed text-right font-iranyekan text-sm sm:text-base" dir="auto" style={{ fontSize: 'clamp(0.875rem, 1.25vw, 1rem)' }}>
                  {getCategoryDescription(currentBestsellerCategory || null)}
                </p>
              </div>

              {/* Left Side: Product Cards */}
              {loadingBestsellers ? (
                <div className="text-center text-white py-8 font-iranyekan">در حال بارگذاری...</div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3" style={{ gap: 'clamp(0.75rem, 1.3vw, 1.5rem)' }}>
                  {currentBestsellerProducts.length > 0 ? (
                    currentBestsellerProducts.map((product) => {
                      const productImage = getWcaPrimaryImageUrl(product) || '/images/image 1.png';
                      return (
                        <Link
                          key={product.id}
                          href={`/products/${product.slug}`}
                          className="rounded-2xl flex flex-col cursor-pointer transition-opacity hover:opacity-90"
                          style={{
                            background: '#FFFFFF29',
                            border: '1px solid #FFFFFF33',
                            padding: 'clamp(0.75rem, 1.3vw, 1.5rem)'
                          }}
                        >
                          <h4 className="font-bold text-[#F9BD65] mb-4 text-center" dir="auto" style={{ fontSize: 'clamp(1.125rem, 1.25vw, 1.25rem)' }}>
                            <ProductNameWithTooltip text={product.name} className="font-bold text-[#F9BD65] font-iranyekan text-base" />
                          </h4>
                          <div className="flex-1 flex items-center justify-center font-iranyekan text-center" style={{ marginBottom: 'clamp(1rem, 1.25vw, 1rem)' }}>
                            <img src={productImage} alt={product.name} style={{ width: 'clamp(6rem, 8.33vw, 8rem)' }} />
                          </div>
                        </Link>
                      );
                    })
                  ) : (
                    // Fallback to mock data if no products found
                    <>
                      <div
                        className="rounded-2xl flex flex-col"
                        style={{
                          background: '#FFFFFF29',
                          border: '1px solid #FFFFFF33',
                          padding: 'clamp(1rem, 1.56vw, 1.5rem)'
                        }}
                      >
                        <h4 className="font-bold text-[#F9BD65] mb-4 text-center" dir="auto" style={{ fontSize: 'clamp(1.125rem, 1.25vw, 1.25rem)' }}>
                          <ProductNameWithTooltip text="Romela Drive 0w-20" className="font-bold text-[#F9BD65] text-base" />
                        </h4>
                        <div className="flex-1 flex items-center justify-center" style={{ marginBottom: 'clamp(1rem, 1.25vw, 1rem)' }}>
                          <img src="/images/image 1.png" alt="" style={{ width: 'clamp(6rem, 8.33vw, 8rem)' }} />
                        </div>
                      </div>
                      <div
                        className="rounded-2xl flex flex-col"
                        style={{
                          background: '#FFFFFF29',
                          border: '1px solid #FFFFFF33',
                          padding: 'clamp(1rem, 1.56vw, 1.5rem)'
                        }}
                      >
                        <h4 className="mb-4 text-center" dir="auto" style={{ fontSize: 'clamp(1.125rem, 1.25vw, 1.25rem)' }}>
                          <ProductNameWithTooltip text="Romela Drive 5w-30" className="font-bold text-[#F9BD65] text-base" />
                        </h4>
                        <div className="flex-1 flex items-center justify-center" style={{ marginBottom: 'clamp(1rem, 1.25vw, 1rem)' }}>
                          <img src="/images/image 1.png" alt="" style={{ width: 'clamp(6rem, 8.33vw, 8rem)' }} />
                        </div>
                      </div>
                      <div
                        className="rounded-2xl flex flex-col"
                        style={{
                          background: '#FFFFFF29',
                          border: '1px solid #FFFFFF33',
                          padding: 'clamp(1rem, 1.56vw, 1.5rem)'
                        }}
                      >
                        <h4 className="font-bold text-[#F9BD65] mb-4 text-center" dir="auto" style={{ fontSize: 'clamp(1.125rem, 1.25vw, 1.25rem)' }}>
                          <ProductNameWithTooltip text="Romela Drive 10w-40" className="font-bold text-[#F9BD65] text-base" />
                        </h4>
                        <div className="flex-1 flex items-center justify-center" style={{ marginBottom: 'clamp(1rem, 1.25vw, 1rem)' }}>
                          <img src="/images/image 1.png" alt="" style={{ width: 'clamp(6rem, 8.33vw, 8rem)' }} />
                        </div>
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
