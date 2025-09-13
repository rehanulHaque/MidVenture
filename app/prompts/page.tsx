"use client"
import axios from 'axios'
import React, { useEffect } from 'react'
import { toast } from 'sonner'


import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Copy } from 'lucide-react';

export default function Page() {
  const [prompts, setPrompts] = useState<Array<{ id: string; prompt: string; category?: string }>>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  const getPrompts = async () => {
    try {
      const response = await axios.get('/api/prompts');
      setPrompts(response.data.prompts || []);
    } catch (error: any) {
      toast.error(error.response.data.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPrompts();
  }, []);

  const filteredPrompts = prompts
    .filter((p) => typeof p.prompt === 'string' && p.prompt.trim() !== '')
    .filter((p) => p.prompt.toLowerCase().includes(search.toLowerCase()));

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success('Prompt copied!');
  };

  return (
    <div className="max-w-3xl mx-auto py-10 px-2 md:px-0">
      <h1 className="text-3xl font-bold mb-6 text-zinc-900 dark:text-white text-center">Explore Prompts</h1>
      <div className="mb-8 flex justify-center">
        <Input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search prompts..."
          className="w-full max-w-md"
        />
      </div>
      {loading ? (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary" />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {filteredPrompts.length === 0 ? (
            <div className="col-span-full text-center text-zinc-500">No prompts found.</div>
          ) : (
            filteredPrompts.map((prompt) => (
              <div key={prompt.id} className="bg-white dark:bg-zinc-900 rounded-xl shadow p-5 flex flex-col gap-3 relative">
                {prompt.category && (
                  <span className="absolute top-3 right-3 text-xs bg-primary/10 text-primary px-2 py-1 rounded-full font-medium">
                    {prompt.category}
                  </span>
                )}
                <div className="text-zinc-800 dark:text-zinc-100 text-base mb-2">{prompt.prompt}</div>
                <Button
                  variant="outline"
                  size="sm"
                  className="self-end flex items-center gap-2"
                  onClick={() => handleCopy(prompt.prompt)}
                >
                  <Copy size={16} /> Copy
                </Button>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
