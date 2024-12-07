import { fontHeading } from "@/app/font";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, Link as LinkIcon, Sparkles } from "lucide-react";

export function Hero() {
  return (
    <section className="relative pt-32 pb-24 bg-gradient-to-b from-secondary to-white overflow-hidden">
      <div className="absolute inset-0 bg-grid-primary/5 [mask-image:linear-gradient(0deg,white,transparent)]" />

      <div className="container mx-auto px-4 relative">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white/30 backdrop-blur-sm px-4 py-2 rounded-full border border-primary/10 mb-6">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">
              New: Custom branded domains are here!
            </span>
          </div>

          <h1
            className={`text-6xl font-bold text-primary mb-6 leading-tight ${fontHeading}`}
          >
            Transform Long URLs into
            <span className="relative whitespace-nowrap">
              <svg
                aria-hidden="true"
                viewBox="0 0 418 42"
                className="absolute left-0 top-2/3 h-[0.58em] w-full fill-black/20"
                preserveAspectRatio="none"
              >
                <path d="M203.371.916c-26.013-2.078-76.686 1.963-124.73 9.946L67.3 12.749C35.421 18.062 18.2 21.766 6.004 25.934 1.244 27.561.828 27.778.874 28.61c.07 1.214.828 1.121 9.595-1.176 9.072-2.377 17.15-3.92 39.246-7.496C123.565 7.986 157.869 4.492 195.942 5.046c7.461.108 19.25 1.696 19.17 2.582-.107 1.183-7.874 4.31-25.75 10.366-21.992 7.45-35.43 12.534-36.701 13.884-2.173 2.308-.202 4.407 4.442 4.734 2.654.187 3.263.157 15.593-.78 35.401-2.686 57.944-3.488 88.365-3.143 46.327.526 75.721 2.23 130.788 7.584 19.787 1.924 20.814 1.98 24.557 1.332l.066-.011c1.201-.203 1.53-1.825.399-2.335-2.911-1.31-4.893-1.604-22.048-3.261-57.509-5.556-87.871-7.36-132.059-7.842-23.239-.254-33.617-.116-50.627.674-11.629.54-42.371 2.494-46.696 2.967-2.359.259 8.133-3.625 26.504-9.81 23.239-7.825 27.934-10.149 28.304-14.005.417-4.348-3.529-6-16.878-7.066Z"></path>
              </svg>
              <span className="relative text-gray-400"> Powerful Links</span>
            </span>
          </h1>

          <p className="text-xl text-primary/80 mb-12 max-w-2xl mx-auto">
            Simplify your links, track their performance, and make your URLs
            work smarter with TinyLink&apos;s enterprise-grade link management
            platform.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto bg-white p-2 rounded-2xl shadow-lg">
            <div className="flex-1 flex items-center bg-gray-50 rounded-xl px-4">
              <LinkIcon className="h-5 w-5 text-gray-400 mr-2" />
              <Input
                type="url"
                placeholder="Paste your long URL here..."
                // value={url}
                // onChange={(e) => setUrl(e.target.value)}
                className="flex-1 border-0 bg-transparent focus-visible:ring-0"
              />
            </div>
            <Button
              size="lg"
              className="whitespace-nowrap bg-primary text-secondary hover:bg-primary/90 rounded-xl px-8"
            >
              Shorten URL
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>

          <div className="mt-8 flex items-center justify-center gap-8 text-sm text-primary/60">
            <div className="flex items-center gap-2">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                className="h-6 w-6 text-black"
              >
                <path
                  d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M7.5 12.5L10.5 15.5L16.5 9.5"
                  stroke="#000000"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span>No credit card required</span>
            </div>
            <div className="flex items-center gap-2">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                className="h-6 w-6 text-black"
              >
                <path
                  d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                  stroke="#000000"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M12 6V12L16 14"
                  stroke="#000000"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>

              <span>Setup in minutes</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
