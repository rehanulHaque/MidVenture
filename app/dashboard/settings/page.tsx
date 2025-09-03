"use client"
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Settings, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import axios from "axios";

export default function Page() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [saved, setSaved] = useState(false);

  const handleSave = async() => {
    try {
      const response = await axios.put('/api/settings', { username });
      console.log(response.data)
      toast.success(response.data.message)
    } catch (error: any) {
      toast.error(error.response.data.message || "Something went wrong")
    } finally{
      setSaved(true);
    }
  };

  return (
    <div className="py-10 px-4 max-w-xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-zinc-900 dark:text-white flex items-center gap-2">
        <Settings size={28} /> Settings
      </h1>
      <div className="bg-zinc-50 dark:bg-zinc-900 rounded-xl shadow p-6 flex flex-col gap-6">
        <div>
          <label className="block text-sm font-medium mb-2 text-zinc-700 dark:text-zinc-300">Username</label>
          <input
            type="text"
            value={username}
            onChange={e => setUsername(e.target.value)}
            className="w-full px-3 py-2 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-base"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2 text-zinc-700 dark:text-zinc-300">Email</label>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            disabled
            className="w-full px-3 py-2 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-base"
          />
        </div>
        <Button onClick={handleSave} className="w-full mt-2">
          Save Changes
        </Button>
        {saved && (
          <div className="flex items-center gap-2 text-green-600 mt-2">
            <CheckCircle2 size={18} /> Saved!
          </div>
        )}
      </div>
    </div>
  );
}
