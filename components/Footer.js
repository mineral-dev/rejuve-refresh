import Link from "next/link";
import ButtonPull from "./ButtonPull";
import LogoRejuve from "./LogoRejuve";

export default function Footer() {
  const isInStore = process.env.NEXT_PUBLIC_IS_INSTORE ? process.env.NEXT_PUBLIC_IS_INSTORE : false
  return (
    <footer className="bg-primary-200 text-primary-600 grid place-items-center py-4 lg:py-8 relative">
      <Link href="https://www.rejuve.co.id" target="_blank" rel="noopener noreferrer" className="[&>svg]:h-4 lg:[&>svg]:h-auto">
        <LogoRejuve />
      </Link>
      {
        isInStore && (
          <div className="absolute right-0 pr-4">
            <ButtonPull />
          </div>
        )
      }
    </footer>
  );
}
