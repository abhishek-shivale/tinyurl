import TinyLinkForm from "@/components/tinyurlform";
import { Link2 } from "lucide-react";
import { fontHeading } from "./font";

function page() {
  return (
    <div className={"min-h-screen "}>
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <Link2 className="h-12 w-12 text-primary"  />
          </div>
          <h1 className={`${fontHeading} text-6xl font-extrabold mb-4`}>
            TinyLink
          </h1>
          <p className="text-lg">
            TinyLink is a free and open source URL shortener.
          </p>
        </div>
        <TinyLinkForm />
      </div>
    </div>
  );
}

export default page;
