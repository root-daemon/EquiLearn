import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Nav() {
  return (
    <nav className="flex items-center justify-between p-4 max-w-7xl mx-auto">
      <Link href="/" className="text-2xl font-bold">
        Equilearn
      </Link>
      <div className="flex items-center gap-6">
        <Link href="/subscription" className="text-sm font-medium hover:underline">
          Subscription
        </Link>

        <Button variant="outline" className="bg-clr text-white font-semibold rounded-xl border-none">
          <Link href="/sign-up" className="font-bold">
            Sign Up
          </Link>
        </Button>
      </div>
    </nav>
  );
}
