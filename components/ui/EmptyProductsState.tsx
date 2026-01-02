export function EmptyProductsState() {
  return (
    <div 
      className="flex flex-col items-center justify-center text-center"
      dir="rtl"
      style={{
        marginTop: 'clamp(3rem, 4.69vw, 5rem)',
        marginBottom: 'clamp(2rem, 3.13vw, 3rem)',
        padding: 'clamp(2rem, 3.13vw, 3rem)',
      }}
    >
      {/* Icon/SVG */}
      <div 
        className="mb-6"
        style={{
          width: 'clamp(5rem, 8.33vw, 8rem)',
          height: 'clamp(5rem, 8.33vw, 8rem)',
          opacity: 0.6,
        }}
      >
        <svg
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          {/* Box/Container */}
          <rect
            x="20"
            y="30"
            width="60"
            height="50"
            rx="4"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
            className="text-[#9A9A9A]"
          />
          {/* Search icon inside */}
          <circle
            cx="45"
            cy="50"
            r="8"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
            className="text-[#9A9A9A]"
          />
          <line
            x1="51"
            y1="56"
            x2="58"
            y2="63"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            className="text-[#9A9A9A]"
          />
          {/* Small dots indicating empty */}
          <circle
            cx="30"
            cy="40"
            r="2"
            fill="currentColor"
            className="text-[#9A9A9A]"
            opacity="0.4"
          />
          <circle
            cx="70"
            cy="40"
            r="2"
            fill="currentColor"
            className="text-[#9A9A9A]"
            opacity="0.4"
          />
          <circle
            cx="30"
            cy="70"
            r="2"
            fill="currentColor"
            className="text-[#9A9A9A]"
            opacity="0.4"
          />
          <circle
            cx="70"
            cy="70"
            r="2"
            fill="currentColor"
            className="text-[#9A9A9A]"
            opacity="0.4"
          />
        </svg>
      </div>
      
      {/* Message */}
      <p 
        className="text-[#9A9A9A] font-medium"
        style={{
          fontSize: 'clamp(1.125rem, 1.56vw, 1.5rem)',
          lineHeight: '1.6',
        }}
      >
        محصولی برای نمایش وجود ندارد
      </p>
    </div>
  )
}

