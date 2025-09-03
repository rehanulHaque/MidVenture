
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Image from 'next/image';


export default function Page() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-zinc-50 to-zinc-200 dark:from-zinc-900 dark:to-zinc-800 flex flex-col items-center justify-center px-4">
      {/* Hero Section */}
      <section className="w-full max-w-4xl text-center py-20">
        {/* <img src="/logo.svg" alt="ImageGen Logo" className="mx-auto mb-8 h-20 w-20 rounded-2xl shadow-xl bg-gradient-to-tr from-zinc-900 to-zinc-700" /> */}
        <h1 className="text-5xl md:text-6xl font-extrabold text-zinc-900 dark:text-white mb-6 tracking-tight leading-tight">
          Unleash Your Creativity<br />With AI Image Generation
        </h1>
        <p className="text-xl md:text-2xl text-zinc-600 dark:text-zinc-300 mb-10">
          Transform your ideas into stunning visuals. Generate, edit, and explore images in ultra-realistic, cartoon, and oil painting styles. Powered by points, designed for creators.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Link href="/dashboard/gen">
            <Button size="lg" className="w-full sm:w-auto text-lg font-semibold shadow-md">
              Start Generating
            </Button>
          </Link>
          <Link href="/dashboard/explore">
            <Button variant="outline" size="lg" className="w-full sm:w-auto text-lg font-semibold">
              Explore Gallery
            </Button>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full max-w-5xl mx-auto py-12">
        <h2 className="text-3xl font-bold text-center mb-10 text-zinc-900 dark:text-white">Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white dark:bg-zinc-900 rounded-xl shadow-lg p-8 flex flex-col items-center">
            <span className="text-4xl mb-3">⚡</span>
            <h3 className="font-bold text-xl mb-2 text-zinc-900 dark:text-white">AI Image Generation</h3>
            <p className="text-zinc-600 dark:text-zinc-400">Create images from text prompts in multiple styles: ultra-realistic, cartoon, and oil painting.</p>
          </div>
          <div className="bg-white dark:bg-zinc-900 rounded-xl shadow-lg p-8 flex flex-col items-center">
            <span className="text-4xl mb-3">🖼️</span>
            <h3 className="font-bold text-xl mb-2 text-zinc-900 dark:text-white">Personal Gallery</h3>
            <p className="text-zinc-600 dark:text-zinc-400">Save, manage, and download your generated images. View in full screen and organize with ease.</p>
          </div>
          <div className="bg-white dark:bg-zinc-900 rounded-xl shadow-lg p-8 flex flex-col items-center">
            <span className="text-4xl mb-3">💎</span>
            <h3 className="font-bold text-xl mb-2 text-zinc-900 dark:text-white">Premium Point System</h3>
            <p className="text-zinc-600 dark:text-zinc-400">Upgrade your account to get more points and unlock advanced features for creators and professionals.</p>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="w-full max-w-4xl mx-auto py-12">
        <h2 className="text-3xl font-bold text-center mb-10 text-zinc-900 dark:text-white">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white dark:bg-zinc-900 rounded-xl shadow p-6 flex flex-col items-center">
            <span className="text-2xl mb-2">1️⃣</span>
            <h4 className="font-semibold text-lg mb-1 text-zinc-900 dark:text-white">Enter Your Prompt</h4>
            <p className="text-zinc-600 dark:text-zinc-400">Describe your idea and select a style. Our AI will do the rest.</p>
          </div>
          <div className="bg-white dark:bg-zinc-900 rounded-xl shadow p-6 flex flex-col items-center">
            <span className="text-2xl mb-2">2️⃣</span>
            <h4 className="font-semibold text-lg mb-1 text-zinc-900 dark:text-white">Generate & Edit</h4>
            <p className="text-zinc-600 dark:text-zinc-400">Preview, enhance, and download your images instantly.</p>
          </div>
          <div className="bg-white dark:bg-zinc-900 rounded-xl shadow p-6 flex flex-col items-center">
            <span className="text-2xl mb-2">3️⃣</span>
            <h4 className="font-semibold text-lg mb-1 text-zinc-900 dark:text-white">Manage Your Gallery</h4>
            <p className="text-zinc-600 dark:text-zinc-400">Organize, view, and share your creations with the world.</p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="w-full max-w-4xl mx-auto py-12">
        <h2 className="text-3xl font-bold text-center mb-10 text-zinc-900 dark:text-white">What Our Users Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white dark:bg-zinc-900 rounded-xl shadow p-6 flex flex-col items-center">
            <Image src="https://randomuser.me/api/portraits/men/32.jpg" alt="User" className="h-14 w-14 rounded-full mb-3" />
            <p className="italic text-zinc-700 dark:text-zinc-300 mb-2">“ImageGen helped me turn my ideas into beautiful artwork in seconds. The gallery and point system are game changers!”</p>
            <span className="font-semibold text-zinc-900 dark:text-white">John Doe</span>
          </div>
          <div className="bg-white dark:bg-zinc-900 rounded-xl shadow p-6 flex flex-col items-center">
            <Image src="https://randomuser.me/api/portraits/women/44.jpg" alt="User" className="h-14 w-14 rounded-full mb-3" />
            <p className="italic text-zinc-700 dark:text-zinc-300 mb-2">“The AI styles are amazing and the interface is so easy to use. Highly recommend for any creator!”</p>
            <span className="font-semibold text-zinc-900 dark:text-white">Jane Smith</span>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="w-full py-8 mt-12 border-t border-zinc-200 dark:border-zinc-800 text-center text-zinc-500 dark:text-zinc-400">
        <span className="font-bold text-primary">ImageGen</span> &copy; {new Date().getFullYear()} &mdash; All rights reserved.
      </footer>
    </main>
  );
}
