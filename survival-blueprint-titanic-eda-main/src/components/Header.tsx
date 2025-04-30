
import { ShipIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface HeaderProps {
  className?: string;
}

const Header = ({ className }: HeaderProps) => {
  return (
    <header className={cn("bg-primary text-primary-foreground p-4 flex items-center", className)}>
      <div className="container flex justify-between items-center">
        <div className="flex items-center gap-3">
          <ShipIcon className="h-6 w-6 animate-wave" />
          <h1 className="text-xl md:text-2xl font-bold">Titanic Survival Explorer</h1>
        </div>
        <div className="text-sm md:text-base">
          <span className="opacity-80">Interactive Data Analysis</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
