import { useState, useEffect, useMemo } from "react";
import { toast } from "sonner";
import { 
  caesarCipher, 
  vigenereCipher, 
  aesEncrypt, 
  aesDecrypt,
  atbashCipher,
  rot13Cipher,
  railFenceCipher,
  playfairCipher,
  substitutionCipher,
  affineCipher,
  morseCode,
  binaryEncode
} from "../utils/crypto";

type CipherType = "caesar" | "vigenere" | "aes" | "atbash" | "rot13" | "railfence" | "playfair" | "substitution" | "affine" | "morse" | "binary";

export function TextEncryption() {
  const [text, setText] = useState("");
  const [key, setKey] = useState("");
  const [key2, setKey2] = useState(""); // For affine cipher 'b' parameter
  const [rails, setRails] = useState(3); // For rail fence cipher
  const [result, setResult] = useState("");
  const [cipherType, setCipherType] = useState<CipherType>("caesar");
  const [isEncrypting, setIsEncrypting] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("crypto-settings");
    if (saved) {
      const settings = JSON.parse(saved);
      setCipherType(settings.cipherType || "caesar");
      setKey(settings.key || "");
      setKey2(settings.key2 || "");
      setRails(settings.rails || 3);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("crypto-settings", JSON.stringify({ cipherType, key, key2, rails }));
  }, [cipherType, key, key2, rails]);

  const processText = async () => {
    if (!text.trim()) {
      toast.error("Please enter some text");
      return;
    }

    // Validate inputs based on cipher type
    if (["caesar", "vigenere", "aes", "railfence", "playfair", "substitution", "affine"].includes(cipherType) && !key.trim()) {
      toast.error("Please enter a key");
      return;
    }

    setIsProcessing(true);
    
    try {
      let output = "";
      
      switch (cipherType) {
        case "caesar":
          const shift = parseInt(key);
          if (isNaN(shift)) {
            toast.error("Caesar cipher requires a numeric key");
            return;
          }
          output = caesarCipher(text, isEncrypting ? shift : -shift);
          break;
          
        case "vigenere":
          output = vigenereCipher(text, key, isEncrypting);
          break;
          
        case "aes":
          if (isEncrypting) {
            output = await aesEncrypt(text, key);
          } else {
            output = await aesDecrypt(text, key);
          }
          break;
          
        case "atbash":
          output = atbashCipher(text);
          break;
          
        case "rot13":
          output = rot13Cipher(text);
          break;
          
        case "railfence":
          if (rails < 2) {
            toast.error("Rail fence cipher requires at least 2 rails");
            return;
          }
          output = railFenceCipher(text, rails, isEncrypting);
          break;
          
        case "playfair":
          output = playfairCipher(text, key, isEncrypting);
          break;
          
        case "substitution":
          output = substitutionCipher(text, key, isEncrypting);
          break;
          
        case "affine":
          const a = parseInt(key);
          const b = parseInt(key2);
          if (isNaN(a) || isNaN(b)) {
            toast.error("Affine cipher requires numeric parameters");
            return;
          }
          output = affineCipher(text, a, b, isEncrypting);
          break;
          
        case "morse":
          output = morseCode(text, isEncrypting);
          break;
          
        case "binary":
          output = binaryEncode(text, isEncrypting);
          break;
      }
      
      setResult(output);
      toast.success(`Text ${isEncrypting ? "encrypted" : "decrypted"} successfully`);
    } catch (error: any) {
      toast.error(error.message || "Processing failed. Check your input and key.");
      console.error(error);
    } finally {
      setIsProcessing(false);
    }
  };

  const copyResult = () => {
    navigator.clipboard.writeText(result);
    toast.success("Copied to clipboard");
  };

  const clearAll = () => {
    setText("");
    setResult("");
    toast.info("Cleared all fields");
  };

  const ciphers = useMemo(() => [
    { id: "caesar", name: "Caesar", desc: "Shift letters by N positions", needsKey: true, keyType: "number" },
    { id: "vigenere", name: "Vigenère", desc: "Polyalphabetic substitution", needsKey: true, keyType: "text" },
    { id: "aes", name: "AES", desc: "Advanced Encryption Standard", needsKey: true, keyType: "text" },
    { id: "atbash", name: "Atbash", desc: "A=Z, B=Y substitution", needsKey: false },
    { id: "rot13", name: "ROT13", desc: "Caesar cipher with shift 13", needsKey: false },
    { id: "railfence", name: "Rail Fence", desc: "Zigzag pattern cipher", needsKey: false, needsRails: true },
    { id: "playfair", name: "Playfair", desc: "5x5 grid digraph cipher", needsKey: true, keyType: "text" },
    { id: "substitution", name: "Substitution", desc: "Replace each letter", needsKey: true, keyType: "text" },
    { id: "affine", name: "Affine", desc: "Mathematical linear cipher", needsKey: true, keyType: "number", needsKey2: true },
    { id: "morse", name: "Morse Code", desc: "Dots and dashes", needsKey: false },
    { id: "binary", name: "Binary", desc: "8-bit binary encoding", needsKey: false },
  ], []);

  const currentCipher = useMemo(() => ciphers.find(c => c.id === cipherType), [ciphers, cipherType]);

  return (
    <div className="space-y-6">
      <div className="glass-card p-6 float-animation">
        <h2 className="text-xl font-bold text-green-400 mb-4 font-mono">
          Text Encryption & Decryption
        </h2>
        
        {/* Cipher Selection */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 mb-6">
          {ciphers.map((cipher) => (
            <button
              key={cipher.id}
              onClick={() => setCipherType(cipher.id as CipherType)}
              className={`p-3 rounded-lg border text-left transition-all backdrop-blur-sm ${
                cipherType === cipher.id
                  ? "border-green-500 bg-green-500/20 shadow-lg shadow-green-500/25"
                  : "border-gray-600/50 bg-gray-800/50 hover:border-green-500/50 hover:bg-gray-700/50"
              }`}
            >
              <div className="font-mono text-green-400 font-bold text-sm">{cipher.name}</div>
              <div className="text-xs text-gray-400 mt-1">{cipher.desc}</div>
            </button>
          ))}
        </div>

        {/* Mode Toggle - Hide for ciphers that don't need it */}
        {!["atbash", "rot13"].includes(cipherType) && (
          <div className="flex justify-center mb-6">
            <div className="bg-gray-800/80 backdrop-blur-sm rounded-lg p-1 flex">
              <button
                onClick={() => setIsEncrypting(true)}
                className={`px-4 py-2 rounded font-mono text-sm transition-all ${
                  isEncrypting
                    ? "bg-green-500/90 text-black shadow-md"
                    : "text-green-400 hover:bg-gray-700/50"
                }`}
              >
                {cipherType === "morse" || cipherType === "binary" ? "Encode" : "Encrypt"}
              </button>
              <button
                onClick={() => setIsEncrypting(false)}
                className={`px-4 py-2 rounded font-mono text-sm transition-all ${
                  !isEncrypting
                    ? "bg-green-500/90 text-black shadow-md"
                    : "text-green-400 hover:bg-gray-700/50"
                }`}
              >
                {cipherType === "morse" || cipherType === "binary" ? "Decode" : "Decrypt"}
              </button>
            </div>
          </div>
        )}

        {/* Input Fields */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <label className="block text-green-400 font-mono mb-2">
              {isEncrypting || ["atbash", "rot13"].includes(cipherType) ? "Input Text" : "Encrypted Text"}
            </label>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder={`Enter text to ${isEncrypting || ["atbash", "rot13"].includes(cipherType) ? "encrypt" : "decrypt"}...`}
              className="w-full h-32 bg-black/80 backdrop-blur-sm border border-green-500/30 rounded-lg p-3 text-green-300 font-mono resize-none focus:border-green-500 focus:outline-none"
            />
          </div>
          
          <div className="space-y-4">
            {/* Key Input */}
            {currentCipher?.needsKey && (
              <div>
                <label className="block text-green-400 font-mono mb-2">
                  {cipherType === "affine" ? "Parameter A" : "Key"}
                  {cipherType === "substitution" && " (26 unique letters)"}
                </label>
                <input
                  type={currentCipher.keyType === "number" ? "number" : "text"}
                  value={key}
                  onChange={(e) => setKey(e.target.value)}
                  placeholder={
                    cipherType === "caesar" ? "Enter shift number (e.g., 3)" :
                    cipherType === "substitution" ? "ZYXWVUTSRQPONMLKJIHGFEDCBA" :
                    cipherType === "affine" ? "Enter number coprime with 26" :
                    "Enter encryption key"
                  }
                  className="w-full bg-black/80 backdrop-blur-sm border border-green-500/30 rounded-lg p-3 text-green-300 font-mono focus:border-green-500 focus:outline-none"
                />
              </div>
            )}

            {/* Second Key for Affine */}
            {currentCipher?.needsKey2 && (
              <div>
                <label className="block text-green-400 font-mono mb-2">
                  Parameter B
                </label>
                <input
                  type="number"
                  value={key2}
                  onChange={(e) => setKey2(e.target.value)}
                  placeholder="Enter second parameter (e.g., 5)"
                  className="w-full bg-black/80 backdrop-blur-sm border border-green-500/30 rounded-lg p-3 text-green-300 font-mono focus:border-green-500 focus:outline-none"
                />
              </div>
            )}

            {/* Rails for Rail Fence */}
            {currentCipher?.needsRails && (
              <div>
                <label className="block text-green-400 font-mono mb-2">
                  Number of Rails
                </label>
                <input
                  type="number"
                  min="2"
                  max="10"
                  value={rails}
                  onChange={(e) => setRails(parseInt(e.target.value) || 3)}
                  className="w-full bg-black/80 backdrop-blur-sm border border-green-500/30 rounded-lg p-3 text-green-300 font-mono focus:border-green-500 focus:outline-none"
                />
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3 mt-6">
          <button
            onClick={processText}
            disabled={isProcessing}
            className="px-6 py-2 bg-green-500/90 backdrop-blur-sm text-black font-mono font-bold rounded-lg hover:bg-green-400/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
          >
            {isProcessing ? "Processing..." : 
             ["atbash", "rot13"].includes(cipherType) ? "🔄 Transform" :
             (isEncrypting ? "🔐 Encrypt" : "🔓 Decrypt")}
          </button>
          
          {result && (
            <button
              onClick={copyResult}
              className="px-4 py-2 bg-gray-700/80 backdrop-blur-sm text-green-400 font-mono rounded-lg hover:bg-gray-600/80 transition-colors"
            >
              📋 Copy Result
            </button>
          )}
          
          <button
            onClick={clearAll}
            className="px-4 py-2 bg-red-900/80 backdrop-blur-sm text-red-300 font-mono rounded-lg hover:bg-red-800/80 transition-colors"
          >
            🗑️ Clear
          </button>
        </div>

        {/* Result */}
        {result && (
          <div className="mt-6">
            <label className="block text-green-400 font-mono mb-2">
              {["atbash", "rot13"].includes(cipherType) ? "Transformed Text" :
               (isEncrypting ? "Encrypted Text" : "Decrypted Text")}
            </label>
            <div className="bg-black/80 backdrop-blur-sm border border-green-500 rounded-lg p-4">
              <pre className="text-green-300 font-mono whitespace-pre-wrap break-all">
                {result}
              </pre>
            </div>
          </div>
        )}

        {/* Cipher Info */}
        {cipherType === "substitution" && (
          <div className="mt-4 bg-blue-900/30 backdrop-blur-sm border border-blue-500/30 rounded-lg p-3">
            <p className="text-blue-200 text-sm font-mono">
              💡 Substitution cipher key must contain all 26 letters exactly once. 
              Example: ZYXWVUTSRQPONMLKJIHGFEDCBA (reverse alphabet)
            </p>
          </div>
        )}

        {cipherType === "affine" && (
          <div className="mt-4 bg-blue-900/30 backdrop-blur-sm border border-blue-500/30 rounded-lg p-3">
            <p className="text-blue-200 text-sm font-mono">
              💡 Parameter A must be coprime with 26. Valid values: 1, 3, 5, 7, 9, 11, 15, 17, 19, 21, 23, 25
            </p>
          </div>
        )}

        {cipherType === "playfair" && (
          <div className="mt-4 bg-blue-900/30 backdrop-blur-sm border border-blue-500/30 rounded-lg p-3">
            <p className="text-blue-200 text-sm font-mono">
              💡 Playfair cipher uses a 5×5 grid. J is combined with I. Text is processed in pairs.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
