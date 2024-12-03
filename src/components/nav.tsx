import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Nav() {
  return (
    <nav className="flex items-center justify-between p-4 max-w-7xl mx-auto">
      <Link href="/" className="text-2xl font-bold">
        UniVision
      </Link>
      <div className="flex items-center gap-6">
        <Link href="#features" className="text-sm font-medium hover:underline">
          Features
        </Link>
        <Link
          href="#accessibility"
          className="text-sm font-medium hover:underline"
        >
          Accessibility
        </Link>
        <Button variant="outline">Sign up</Button>
        <Button>
          {" "}
          <Link href="/dashboard" className="">
            Dashboard
          </Link>
        </Button>
      </div>
    </nav>
  );
}
