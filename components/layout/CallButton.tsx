import { CONTACT_PHONE } from '@/lib/constants'

function PhoneIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className="call-cta-icon h-6 w-6"
    >
      <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1C10.61 21 3 13.39 3 4c0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
    </svg>
  )
}

export function CallButton() {
  return (
    <a
      href={CONTACT_PHONE.href}
      aria-label={`تماس بگیرید، ${CONTACT_PHONE.display}`}
      className="call-cta group fixed z-40 print:hidden"
      style={{
        bottom: 'calc(1.25rem + env(safe-area-inset-bottom, 0px))',
        right: 'calc(1.25rem + env(safe-area-inset-right, 0px))',
      }}
    >
      <span className="call-cta-ring" aria-hidden="true" />
      <span className="call-cta-ring call-cta-ring-delayed" aria-hidden="true" />
      <span className="call-cta-face">
        <PhoneIcon />
      </span>
    </a>
  )
}
