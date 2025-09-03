"use client"
import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ImagePlus, FileSearch, Send, Download, Eye, Sparkle, Palette, Brush } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import { toast } from "sonner"
import Image from "next/image";

const styles = [
  { label: "Ultra Realistic", icon: <Sparkle size={20} />, value: "ultra" },
  { label: "Cartoon", icon: <Palette size={20} />, value: "cartoon" },
  { label: "Oil Painting", icon: <Brush size={20} />, value: "oil" },
];

interface GeneratedImagesTypes {
  url: string,
  id: number
}
export default function Page(){
  const [input, setInput] = useState("");
  const [selectedStyle, setSelectedStyle] = useState(styles[0].value);
  const fileInputRef = useRef(null);
  const [generatedImages, setGeneratedImages] = useState<GeneratedImagesTypes[]>([]);
  const [loading, setLoading] = useState(false);
  const [modalImage, setModalImage] = useState<string | null>(null);
  const [credits, setCredits] = useState<number | null>(null);
  useEffect(() => {
    async function fetchCredits() {
      try {
        const response = await axios.get('/api/user-credits');
        if (typeof response.data.credits === 'number') {
          setCredits(response.data.credits);
        }
      } catch (error) {
        setCredits(null);
      }
    }
    fetchCredits();
  }, []);

  // const handleAttachFile = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = e.target.files![0];
  //   if (file) {
  //     setAttachedFile(file);
  //     setPreviewUrl(URL.createObjectURL(file));
  //   }
  // };

  const handleSend = async () => {
    setLoading(true);
    setGeneratedImages([
      { url: "/blank.jpg", id: 1 }
    ]);
    try {
      const response = await axios.post('/api/generate-image', { prompt: input });
      const images = response?.data.transformedUrl;
      setGeneratedImages([{ url: images, id: 1 }]);
      if (typeof response.data.credits === 'number') {
        setCredits(response.data.credits);
      }
    } catch (error: any) {
      toast.error(error.response.data.message || "Something went wrong");
      setGeneratedImages([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async (url: string) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = "generated-image.jpg";
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
    <div className=" py-10 px-4">
      {/* Heading with Credits */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-zinc-900 dark:text-white">Image Generation</h1>
        <div className="bg-white dark:bg-zinc-900 rounded-full px-5 py-2 shadow flex items-center gap-2 text-base font-semibold text-primary border border-primary">
          <span>💎</span>
          <span>Credits:</span>
          <span className="text-primary font-bold">{credits !== null ? credits : "-"}</span>
        </div>
      </div>

      {/* Textbox & Actions */}
      <div className="bg-zinc-50 dark:bg-zinc-900 rounded-xl shadow p-6 mb-8">
        <div className="flex flex-col gap-4">
          {/* Input & Send */}
          <div className="relative w-full">
            <Textarea
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Describe your image..."
              className="w-full pr-12 h-[100px] text-base bg-white dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700"
            />
            <Button
              size="sm"
              className="absolute right-2 bottom-2 h-8 w-8 rounded-full bg-primary text-white flex items-center justify-center"
              onClick={handleSend}
            >
              <Send size={18} />
            </Button>
          </div>

          {/* File/Prompt Buttons */}
          <div className="flex gap-3">
            <Button variant="outline" disabled className="flex-1 flex items-center gap-2" onClick={() => (fileInputRef.current! as HTMLInputElement).click()}>
              <ImagePlus size={18} /> Attach File
            </Button>
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              style={{ display: "none" }}
              // onChange={handleAttachFile}
              disabled
            />
            <Button variant="outline" className="flex-1 flex items-center gap-2">
              <FileSearch size={18} /> Browse Prompts
            </Button>

          </div>

          {/* Preview */}
          {/* {previewUrl && (
            <div className="flex justify-start mt-2">
              <img src={previewUrl} alt="Preview" className="rounded-lg border shadow" style={{ width: 200, height: 200, objectFit: 'cover' }} />
            </div>
          )} */}
        </div>
      </div>

      {/* Style Selection */}
      <div className="grid grid-cols-3 gap-4 mb-10">
        {styles.map(style => (
          <Button
            key={style.value}
            variant={selectedStyle === style.value ? "default" : "outline"}
            className="w-full flex gap-2 justify-center items-center py-4 text-base font-semibold"
            onClick={() => setSelectedStyle(style.value)}
          >
            <span className="">{style.icon}</span>
            {style.label}
          </Button>
        ))}
      </div>

      {/* Generated Images */}
      <h2 className="text-2xl font-bold mb-4 text-zinc-900 dark:text-white">Generated Images</h2>
      <div className="grid grid-cols-3 gap-6">
        {loading
          ? [1, 2, 3].map((id) => (
              <div key={id} className="bg-zinc-50 dark:bg-zinc-900 rounded-xl shadow p-4 flex flex-col items-center animate-pulse">
                <div className="rounded-lg mb-4 bg-zinc-200 dark:bg-zinc-800" style={{ width: "100%", height: 180 }} />
                <div className="flex gap-2 w-full">
                  <Button variant="outline" className="flex-1" disabled />
                  <Button variant="secondary" className="flex-1" disabled />
                </div>
              </div>
            ))
          : generatedImages.map(img => (
              <div key={img.id} className="bg-zinc-50 dark:bg-zinc-900 rounded-xl shadow p-4 flex flex-col items-center">
                <Image src={img.url} alt="Generated" className="rounded-lg mb-4" style={{ width: "100%", height: 180, objectFit: 'cover' }} />
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