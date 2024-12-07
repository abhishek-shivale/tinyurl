import { fontHeading } from '@/app/font';
import { Link as LinkIcon } from 'lucide-react';
import Link from 'next/link';

export function Header() {
  return (
    <header className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <LinkIcon className="h-6 w-6 text-primary" />
          <span className={`text-xl font-bold text-primary ${fontHeading}`}>TinyLink</span>
        </div>

        <nav className="hidden md:flex items-center space-x-8">
          <Link href="#" className="text-gray-600 hover:text-primary transition-colors">
            Home
          </Link>
          <Link href="#features" className="text-gray-600 hover:text-primary transition-colors">
            Features
          </Link>
          <Link href="#pricing" className="text-gray-600 hover:text-primary transition-colors">
            Pricing
          </Link>
        </nav>

        <div className="flex items-center space-x-4">
          <Link href="/login" >Login</Link>
          <Link href="/register">Register</Link>
        </div>
      </div>
    </header>
  );
}