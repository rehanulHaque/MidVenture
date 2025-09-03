"use client"
import { Button } from "@/components/ui/button";
import { Download, Eye, Search } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

const exploreImages = [
  { url: "https://images.unsplash.com/photo-1506744038136-46273834b3fb", id: 1 },
  { url: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca", id: 2 },
  { url: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308", id: 3 },
];

export default function Page() {
  const [images] = useState(exploreImages);
  // const images = await axios.get("/api/explore");
  // console.log(images)

  const handleDownload = (url: string) => {
    const link = document.createElement("a");
    link.href = url;
    link.download = "explore-image.jpg";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleView = (url: string) => {
    window.open(url, "_blank");
  };

  return (
    <div className="py-10 px-4">
      <h1 className="text-3xl font-bold mb-6 text-zinc-900 dark:text-white flex items-center gap-2">
        <Search size={28} /> Explore Images
      </h1>
      <div className="grid grid-cols-3 gap-6">
        {images.map((img: any) => (
          <div key={img.id} className="bg-zinc-50 dark:bg-zinc-900 rounded-xl shadow p-4 flex flex-col items-center">
            <Image src={img.url} alt="Explore Image" className="rounded-lg mb-4" style={{ width: "100%", height: 180, objectFit: 'cover' }} />
            <div className="flex gap-2 w-full">
              <Button variant="outline" className="flex-1 flex items-center gap-2" onClick={() => handleDownload(img.url)}>
                <Download size={16} /> Download
              </Button>
              <Button variant="secondary" className="flex-1 flex items-center gap-2" onClick={() => handleView(img.url)}>
                <Eye size={16} /> View
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
