
"use client"
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { Download, Eye, Trash2 } from "lucide-react";
import { toast } from "sonner";
import Image from "next/image";


interface PhotosTypes {
  id: string,
  transformedUrl: string,
  createdAt: Date
}
export default function Page(){
  const [images, setImages] = useState<PhotosTypes[]>();
  const [loading, setLoading] = useState(false);
  const [modalImage, setModalImage] = useState<string | null>(null);

  const getImages = async () => {
    try {
      const response = await axios.get('/api/my-gallery')
      setImages(response.data.photos)
    } catch (error: any) {
      toast.error(error.response.data.message || "Something went wrong")
    }
  }

  useEffect(() => {
    getImages()
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

  const handleDelete = async (id: string) => {
    setLoading(true)
    setImages(images?.filter(img => img.id !== id))
    try {
      const response = await axios.delete(`/api/my-gallery/${id}`)
      setImages(response.data.photos)
    } catch (error: any) {
      toast.error(error.response.data.message || "Something went wrong")
    } finally {
      setLoading(false)
    }
  };

  return (
    <div className="py-10 px-4">
      <h1 className="text-3xl font-bold mb-6 text-zinc-900 dark:text-white">My Images</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {images == null ? (
          Array.from({ length: 3 }).map((item, idx) => (
            <div key={idx} className="bg-zinc-50 dark:bg-zinc-900 rounded-xl shadow p-4 flex justify-center items-center">
              <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary" />
            </div>
          ))
        ) :
          images?.map(img => (
            <div key={img.id} className="bg-zinc-50 dark:bg-zinc-900 rounded-xl shadow p-4 flex flex-col items-center">
              <Image src={img.transformedUrl} alt="My Image" width={300} height={300} className="rounded-lg mb-4 w-full" style={{ height: 180, objectFit: 'cover' }} />
              <div className="flex gap-2 w-full">
                <Button variant="outline" className="flex-1 flex items-center gap-2" onClick={() => handleDownload(img.transformedUrl)}>
                  <Download size={16} /> Download
                </Button>
                <Button variant="secondary" className="flex-1 flex items-center gap-2" onClick={() => handleView(img.transformedUrl)}>
                  <Eye size={16} /> View
                </Button>
                <Button variant="destructive" className="flex-1 flex items-center gap-2" disabled={loading} onClick={() => handleDelete(img.id)}>
                  <Trash2 size={16} /> Delete
                </Button>
              </div>
            </div>
          ))
        }
      </div>

      {/* Modal for viewing image */}
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
