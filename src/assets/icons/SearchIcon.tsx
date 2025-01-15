import type { SVGProps } from "@/types";

export const SearchIcon1: React.FC<SVGProps> = ({ ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="21"
    viewBox="0 0 20 21"
    fill="none"
    {...props}
  >
    <circle cx="9" cy="9" r="8" stroke="currentColor" strokeWidth="2" />
    <path
      d="M14.5 15.5L18.5 19.5"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);
