import { CryptographyHelper } from "./components/CryptographyHelper";
import { Toaster } from "sonner";

export default function App() {
  return (
    <div className="min-h-screen bg-black text-green-400 relative font-mono">
      {/* Content Overlay */}
      <div className="relative z-10">
        {/* Navbar */}
        <header className="sticky top-0 z-20 bg-black/80 backdrop-blur-md border-b border-green-500/30 shadow-[0_0_15px_rgba(0,255,0,0.1)]">
          <div className="container mx-auto px-4 h-16 flex justify-between items-center">
            
            {/* Logo */}
            <a
              href="#"
              className="text-2xl font-bold text-green-400 hover:text-green-300 transition-colors duration-300 flex items-center gap-2"
            >
              <span className="text-green-500 animate-pulse">❯</span> Cryptography Helper
            </a>

            

            {/* Social Icons */}
            <div className="flex items-center space-x-4">
              {/* GitHub */}
              <a
                href="https://github.com/dustin04x"
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-400 hover:text-green-300 hover:scale-110 transition-all duration-300"
                title="GitHub"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 5.302 
                  3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234
                  c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756
                  -1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237
                  1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604
                  -2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221
                  -.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23
                  .957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404
                  2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176
                  .77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921
                  .43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576
                  C20.565 21.796 24 17.299 24 12 24 5.373 18.627 0 12 0z" />
                </svg>
              </a>

              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com/in/skander-wali-901040391"
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-400 hover:text-green-300 hover:scale-110 transition-all duration-300"
                title="LinkedIn"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22.23 0H1.77C.79 0 0 .77 0 
                  1.73v20.54C0 23.23.79 24 1.77 24h20.46c.98 0 1.77-.77 
                  1.77-1.73V1.73C24 .77 23.21 0 22.23 0zM7.06 
                  20.45H3.56V9h3.5v11.45zM5.31 7.43a2.07 2.07 0 
                  1 1 0-4.13 2.07 2.07 0 0 1 0 4.13zM20.45 
                  20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 
                  0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.47-.9 
                  1.63-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 
                  5.46v6.28z" />
                </svg>
              </a>
            </div>
          </div>
        </header>

        {/* Main */}
        <main className="container mx-auto px-4 py-8">
          <div className="bg-black/70 border border-green-500/20 shadow-[0_0_20px_rgba(0,255,0,0.1)] backdrop-blur-sm rounded-xl p-6 transition hover:shadow-[0_0_30px_rgba(0,255,0,0.25)]">
            <CryptographyHelper />
          </div>
        </main>
      </div>

      <Toaster theme="dark" />
    </div>
  );
}
