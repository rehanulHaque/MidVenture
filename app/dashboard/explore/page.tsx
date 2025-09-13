"use client"
import { Button } from "@/components/ui/button";
import axios from "axios";
import { Download, Eye, Search } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const exploreImages = [
  { url: "https://images.unsplash.com/photo-1506744038136-46273834b3fb", id: 1 },
  { url: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca", id: 2 },
  { url: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308", id: 3 },
];

interface ImagesTypes {
  id: string,
  transformedUrl: string,
  originalUrl: null,
  prompt: string,
  createdAt: Date,
  userId: string
}

export default function Page() {
  const [images, setImages] = useState<ImagesTypes[]>();
  const [modalImage, setModalImage] = useState<string | null>(null);

  const getImage = async () => {
    try {
      const response = await axios.get("/api/explore");
      setImages(response.data.images || []);
    } catch (error: any) {
      toast.error(error.response.data.message || "Something went wrong");
    }
  }
  useEffect(() => {
    getImage()
  }, [])

  const handleDownload = async (url: string) => {
      try {
        const response = await fetch(url);
        const blob = await response.blob();
        const blobUrl = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = blobUrl;
        link.download = "my-image.jpg";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(blobUrl);
      } catch (error) {
        toast("Failed to download image");
      }
    };

  const handleView = (url: string) => {
    setModalImage(url);
  };

  return (
    <div className="py-10 px-4">
      <h1 className="text-3xl font-bold mb-6 text-zinc-900 dark:text-white flex items-center gap-2">
        <Search size={28} /> Explore Images
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {images?.map((img: ImagesTypes) => (
          <div key={img.id} className="bg-zinc-50 dark:bg-zinc-900 rounded-xl shadow p-4 flex flex-col items-center">
            <Image height={300} width={300} src={img.transformedUrl} alt="Explore Image" className="rounded-lg mb-4" style={{ width: "100%", height: 180, objectFit: 'cover' }} />
            <div className="flex gap-2 w-full">
              <Button variant="outline" className="flex-1 flex items-center gap-2" onClick={() => handleDownload(img.transformedUrl)}>
                <Download size={16} /> Download
              </Button>
              <Button variant="secondary" className="flex-1 flex items-center gap-2" onClick={() => handleView(img.transformedUrl)}>
                <Eye size={16} /> View
              </Button>
            </div>
          </div>
        ))}
      </div>

      {modalImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
          <div className="relative w-full h-full flex items-center justify-center">
            <button
              className="absolute top-8 right-8 text-white bg-zinc-900/80 rounded-full p-2 hover:bg-zinc-800 z-10"
              onClick={() => setModalImage(null)}
            >
              &times;
            </button>
            <img src={modalImage} alt="Full" className="max-h-[90vh] max-w-[90vw] rounded-xl shadow-xl object-contain" />
          </div>
        </div>
      )}
    </div>
  );
}
