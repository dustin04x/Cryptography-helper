import { useState } from "react";
import { TextEncryption } from "./TextEncryption";
import { HashGenerator } from "./HashGenerator";
import { Base64Tool } from "./Base64Tool";
import { FrequencyAnalyzer } from "./FrequencyAnalyzer";
import { PasswordChecker } from "./PasswordChecker";
import { InfoSection } from "./InfoSection";

type Tab = "encrypt" | "hash" | "base64" | "frequency" | "password" | "info";

export function CryptographyHelper() {
  const [activeTab, setActiveTab] = useState<Tab>("encrypt");

  const tabs = [
    { id: "encrypt" as Tab, label: "Encrypt/Decrypt", icon: "🔐" },
    { id: "hash" as Tab, label: "Hash Generator", icon: "🔗" },
    { id: "base64" as Tab, label: "Base64", icon: "📝" },
    { id: "frequency" as Tab, label: "Frequency", icon: "📊" },
    { id: "password" as Tab, label: "Password", icon: "🛡️" },
    { id: "info" as Tab, label: "Info", icon: "ℹ️" },
  ];

  return (
    <div className="max-w-6xl mx-auto">
      {/* Navigation */}
      <nav className="mb-8">
        <div className="flex flex-wrap gap-2 justify-center">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-lg font-mono text-sm transition-all duration-200 backdrop-blur-sm ${
                activeTab === tab.id
                  ? "bg-green-500/90 text-black font-bold shadow-lg shadow-green-500/25"
                  : "bg-gray-800/80 text-green-400 hover:bg-gray-700/80 border border-green-500/30 hover:shadow-md hover:shadow-green-500/10"
              }`}
            >
              <span className="mr-2">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>
      </nav>

      {/* Content */}
      <div className="min-h-[600px]">
        {activeTab === "encrypt" && <TextEncryption />}
        {activeTab === "hash" && <HashGenerator />}
        {activeTab === "base64" && <Base64Tool />}
        {activeTab === "frequency" && <FrequencyAnalyzer />}
        {activeTab === "password" && <PasswordChecker />}
        {activeTab === "info" && <InfoSection />}
      </div>

      {/* Footer */}
      <footer className="mt-16 text-center text-green-300/60 font-mono text-sm">
        <div className="bg-black/60 backdrop-blur-sm rounded-lg p-4">
          <p>Made with &lt;3 by Skander Wali</p>
        </div>
      </footer>
    </div>
  );
}
