import ButtonPull from "./ButtonPull";
import LogoRejuve from "./LogoRejuve";

export default function Footer() {
  return (
    <footer className="bg-primary-200 text-primary-600 grid place-items-center py-4 lg:py-12 relative">
      <span className="[&>svg]:h-4 lg:[&>svg]:h-auto">
        <LogoRejuve />
      </span>
      <div className="absolute right-0 pr-4">
        <ButtonPull />
      </div>
    </footer>
  );
}
