export default function BtnPrev() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="78"
      height="78"
      viewBox="0 0 78 78"
    >
      <defs>
        <filter x="0" y="0" width="78" height="78" filterUnits="userSpaceOnUse">
          <feOffset dy="3" input="SourceAlpha" />
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feFlood floodOpacity="0.161" />
          <feComposite operator="in" in2="blur" />
          <feComposite in="SourceGraphic" />
        </filter>
      </defs>
      <g transform="translate(-34 -880.999)">
        <g transform="translate(-5120 -11083.801) rotate(180)">
          <g transform="translate(-5162.799 -11970.799) rotate(180)">
            <g transform="matrix(1, 0, 0, 1, -8.8, -6)">
              <circle
                className="fill-white"
                cx="30"
                cy="30"
                r="30"
                transform="translate(9 6)"
              />
            </g>
            <path
              className="stroke-black fill-none"
              d="M0,0,2.255,2.255l4.51,4.51L13.531,0"
              transform="translate(33.55 23.677) rotate(90)"
              strokeLinecap="round"
              strokeWidth="3.5"
            />
          </g>
        </g>
      </g>
    </svg>
  );
}
