import Link from "next/link";
import LogoRejuve from "./LogoRejuve";

export default function Footer() {
  return (
    <footer className="bg-primary-200 text-primary-600 grid place-items-center py-4 lg:py-12">
      <Link
        href="https://www.rejuve.co.id"
        target="_blank"
        rel="noopener noreferrer"
      >
        <span className="[&>svg]:h-4 lg:[&>svg]:h-auto">
          <LogoRejuve />
        </span>
      </Link>
    </footer>
  );
}
