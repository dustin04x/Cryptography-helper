import { useState } from "react";
import { toast } from "sonner";

export function Base64Tool() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [isEncoding, setIsEncoding] = useState(true);

  const processText = () => {
    if (!input.trim()) {
      toast.error("Please enter some text");
      return;
    }

    try {
      if (isEncoding) {
        const encoded = btoa(unescape(encodeURIComponent(input)));
        setOutput(encoded);
        toast.success("Text encoded to Base64");
      } else {
        const decoded = decodeURIComponent(escape(atob(input)));
        setOutput(decoded);
        toast.success("Base64 decoded to text");
      }
    } catch (error) {
      toast.error("Invalid input for decoding");
      console.error(error);
    }
  };

  const copyOutput = () => {
    navigator.clipboard.writeText(output);
    toast.success("Copied to clipboard");
  };

  const clearAll = () => {
    setInput("");
    setOutput("");
    toast.info("Cleared all fields");
  };

  const swapInputOutput = () => {
    if (output) {
      setInput(output);
      setOutput("");
      setIsEncoding(!isEncoding);
      toast.info("Swapped input and output");
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-gray-900 border border-green-500/30 rounded-lg p-6">
        <h2 className="text-xl font-bold text-green-400 mb-4 font-mono">
          Base64 Encoder / Decoder
        </h2>

        {/* Mode Toggle */}
        <div className="flex justify-center mb-6">
          <div className="bg-gray-800 rounded-lg p-1 flex">
            <button
              onClick={() => setIsEncoding(true)}
              className={`px-4 py-2 rounded font-mono text-sm transition-all ${
                isEncoding
                  ? "bg-green-500 text-black"
                  : "text-green-400 hover:bg-gray-700"
              }`}
            >
              Encode
            </button>
            <button
              onClick={() => setIsEncoding(false)}
              className={`px-4 py-2 rounded font-mono text-sm transition-all ${
                !isEncoding
                  ? "bg-green-500 text-black"
                  : "text-green-400 hover:bg-gray-700"
              }`}
            >
              Decode
            </button>
          </div>
        </div>

        {/* Input/Output Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <label className="block text-green-400 font-mono mb-2">
              {isEncoding ? "Plain Text" : "Base64 Text"}
            </label>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={`Enter ${isEncoding ? "plain" : "Base64"} text...`}
              className="w-full h-40 bg-black border border-green-500/30 rounded-lg p-3 text-green-300 font-mono resize-none focus:border-green-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-green-400 font-mono mb-2">
              {isEncoding ? "Base64 Output" : "Plain Text Output"}
            </label>
            <div className="relative">
              <textarea
                value={output}
                readOnly
                placeholder={`${isEncoding ? "Base64" : "Plain text"} output will appear here...`}
                className="w-full h-40 bg-black border border-green-500 rounded-lg p-3 text-green-300 font-mono resize-none"
              />
              {output && (
                <button
                  onClick={copyOutput}
                  className="absolute top-2 right-2 px-2 py-1 bg-gray-700 text-green-400 font-mono text-xs rounded hover:bg-gray-600 transition-colors"
                >
                  📋
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3 mt-6">
          <button
            onClick={processText}
            className="px-6 py-2 bg-green-500 text-black font-mono font-bold rounded-lg hover:bg-green-400 transition-colors"
          >
            {isEncoding ? "📤 Encode" : "📥 Decode"}
          </button>

          {output && (
            <button
              onClick={swapInputOutput}
              className="px-4 py-2 bg-blue-700 text-blue-200 font-mono rounded-lg hover:bg-blue-600 transition-colors"
            >
              🔄 Swap
            </button>
          )}

          <button
            onClick={clearAll}
            className="px-4 py-2 bg-red-900 text-red-300 font-mono rounded-lg hover:bg-red-800 transition-colors"
          >
            🗑️ Clear
          </button>
        </div>
      </div>
    </div>
  );
}
