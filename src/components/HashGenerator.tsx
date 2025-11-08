import { useState, useEffect } from "react";
import { toast } from "sonner";
import { generateHash } from "../utils/crypto";

type HashType = "md5" | "sha1" | "sha256";

export function HashGenerator() {
  const [input, setInput] = useState("");
  const [hashes, setHashes] = useState<Record<HashType, string>>({
    md5: "",
    sha1: "",
    sha256: "",
  });
  const [uppercase, setUppercase] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("hash-settings");
    if (saved) {
      const settings = JSON.parse(saved);
      setUppercase(settings.uppercase || false);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("hash-settings", JSON.stringify({ uppercase }));
  }, [uppercase]);

  useEffect(() => {
    if (input.trim()) {
      generateHashes();
    } else {
      setHashes({ md5: "", sha1: "", sha256: "" });
    }
  }, [input, uppercase]);

  const generateHashes = async () => {
    try {
      const results = await Promise.all([
        generateHash(input, "MD5"),
        generateHash(input, "SHA-1"),
        generateHash(input, "SHA-256"),
      ]);

      setHashes({
        md5: uppercase ? results[0].toUpperCase() : results[0],
        sha1: uppercase ? results[1].toUpperCase() : results[1],
        sha256: uppercase ? results[2].toUpperCase() : results[2],
      });
    } catch (error) {
      toast.error("Failed to generate hashes");
      console.error(error);
    }
  };

  const copyHash = (hash: string, type: string) => {
    navigator.clipboard.writeText(hash);
    toast.success(`${type} hash copied to clipboard`);
  };

  const clearAll = () => {
    setInput("");
    setHashes({ md5: "", sha1: "", sha256: "" });
    toast.info("Cleared all fields");
  };

  return (
    <div className="space-y-6">
      <div className="bg-gray-900 border border-green-500/30 rounded-lg p-6">
        <h2 className="text-xl font-bold text-green-400 mb-4 font-mono">
          Hash Generator
        </h2>

        {/* Input */}
        <div className="mb-6">
          <label className="block text-green-400 font-mono mb-2">
            Input Text
          </label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter text to hash..."
            className="w-full h-24 bg-black border border-green-500/30 rounded-lg p-3 text-green-300 font-mono resize-none focus:border-green-500 focus:outline-none"
          />
        </div>

        {/* Settings */}
        <div className="flex items-center gap-4 mb-6">
          <label className="flex items-center gap-2 text-green-400 font-mono cursor-pointer">
            <input
              type="checkbox"
              checked={uppercase}
              onChange={(e) => setUppercase(e.target.checked)}
              className="w-4 h-4 text-green-500 bg-black border-green-500 rounded focus:ring-green-500"
            />
            Uppercase Output
          </label>
          
          <button
            onClick={clearAll}
            className="px-4 py-2 bg-red-900 text-red-300 font-mono rounded-lg hover:bg-red-800 transition-colors"
          >
            🗑️ Clear
          </button>
        </div>

        {/* Hash Results */}
        <div className="space-y-4">
          {[
            { type: "MD5", hash: hashes.md5, color: "text-red-400" },
            { type: "SHA-1", hash: hashes.sha1, color: "text-yellow-400" },
            { type: "SHA-256", hash: hashes.sha256, color: "text-blue-400" },
          ].map(({ type, hash, color }) => (
            <div key={type} className="bg-black border border-green-500/30 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className={`font-mono font-bold ${color}`}>{type}</span>
                {hash && (
                  <button
                    onClick={() => copyHash(hash, type)}
                    className="px-3 py-1 bg-gray-700 text-green-400 font-mono text-sm rounded hover:bg-gray-600 transition-colors"
                  >
                    📋 Copy
                  </button>
                )}
              </div>
              <div className="bg-gray-900 rounded p-3 min-h-[3rem] flex items-center">
                {hash ? (
                  <code className="text-green-300 font-mono text-sm break-all">
                    {hash}
                  </code>
                ) : (
                  <span className="text-gray-500 font-mono text-sm">
                    Enter text above to generate {type} hash
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
