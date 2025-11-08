import { useState, useMemo } from "react";
import { toast } from "sonner";

export function PasswordChecker() {
  const [password, setPassword] = useState("");

  const analysis = useMemo(() => {
    if (!password) return null;

    const length = password.length;
    const hasLower = /[a-z]/.test(password);
    const hasUpper = /[A-Z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSymbols = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);
    const hasSpaces = /\s/.test(password);

    // Character set size
    let charsetSize = 0;
    if (hasLower) charsetSize += 26;
    if (hasUpper) charsetSize += 26;
    if (hasNumbers) charsetSize += 10;
    if (hasSymbols) charsetSize += 32;
    if (hasSpaces) charsetSize += 1;

    // Entropy calculation
    const entropy = length * Math.log2(charsetSize);
    
    // Time to crack (assuming 1 billion guesses per second)
    const combinations = Math.pow(charsetSize, length);
    const secondsToCrack = combinations / (2 * 1e9); // Average case
    
    // Convert to human readable time
    let timeString = "";
    if (secondsToCrack < 1) {
      timeString = "Instantly";
    } else if (secondsToCrack < 60) {
      timeString = `${Math.round(secondsToCrack)} seconds`;
    } else if (secondsToCrack < 3600) {
      timeString = `${Math.round(secondsToCrack / 60)} minutes`;
    } else if (secondsToCrack < 86400) {
      timeString = `${Math.round(secondsToCrack / 3600)} hours`;
    } else if (secondsToCrack < 31536000) {
      timeString = `${Math.round(secondsToCrack / 86400)} days`;
    } else if (secondsToCrack < 31536000000) {
      timeString = `${Math.round(secondsToCrack / 31536000)} years`;
    } else {
      timeString = "Millions of years";
    }

    // Strength score
    let score = 0;
    if (length >= 8) score += 1;
    if (length >= 12) score += 1;
    if (hasLower) score += 1;
    if (hasUpper) score += 1;
    if (hasNumbers) score += 1;
    if (hasSymbols) score += 1;
    if (length >= 16) score += 1;

    let strength = "";
    let strengthColor = "";
    if (score <= 2) {
      strength = "Very Weak";
      strengthColor = "text-red-400";
    } else if (score <= 4) {
      strength = "Weak";
      strengthColor = "text-orange-400";
    } else if (score <= 5) {
      strength = "Fair";
      strengthColor = "text-yellow-400";
    } else if (score <= 6) {
      strength = "Good";
      strengthColor = "text-blue-400";
    } else {
      strength = "Strong";
      strengthColor = "text-green-400";
    }

    // Suggestions
    const suggestions = [];
    if (length < 12) suggestions.push("Use at least 12 characters");
    if (!hasLower) suggestions.push("Add lowercase letters");
    if (!hasUpper) suggestions.push("Add uppercase letters");
    if (!hasNumbers) suggestions.push("Add numbers");
    if (!hasSymbols) suggestions.push("Add special characters");
    if (length < 16) suggestions.push("Consider using 16+ characters for better security");

    return {
      length,
      hasLower,
      hasUpper,
      hasNumbers,
      hasSymbols,
      charsetSize,
      entropy: Math.round(entropy * 10) / 10,
      timeString,
      strength,
      strengthColor,
      score,
      suggestions,
    };
  }, [password]);

  const copyAnalysis = () => {
    if (!analysis) return;
    
    const output = `Password Analysis:
Length: ${analysis.length} characters
Strength: ${analysis.strength}
Entropy: ${analysis.entropy} bits
Time to crack: ${analysis.timeString}
Character set size: ${analysis.charsetSize}

Suggestions:
${analysis.suggestions.map(s => `• ${s}`).join('\n')}`;
    
    navigator.clipboard.writeText(output);
    toast.success("Analysis copied to clipboard");
  };

  const clearPassword = () => {
    setPassword("");
    toast.info("Password cleared");
  };

  const generatePassword = () => {
    const lowercase = "abcdefghijklmnopqrstuvwxyz";
    const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numbers = "0123456789";
    const symbols = "!@#$%^&*()_+-=[]{}|;:,.<>?";
    
    const allChars = lowercase + uppercase + numbers + symbols;
    let result = "";
    
    // Ensure at least one of each type
    result += lowercase[Math.floor(Math.random() * lowercase.length)];
    result += uppercase[Math.floor(Math.random() * uppercase.length)];
    result += numbers[Math.floor(Math.random() * numbers.length)];
    result += symbols[Math.floor(Math.random() * symbols.length)];
    
    // Fill the rest randomly
    for (let i = 4; i < 16; i++) {
      result += allChars[Math.floor(Math.random() * allChars.length)];
    }
    
    // Shuffle the result
    const shuffled = result.split('').sort(() => Math.random() - 0.5).join('');
    setPassword(shuffled);
    toast.success("Strong password generated");
  };

  return (
    <div className="space-y-6">
      <div className="bg-gray-900 border border-green-500/30 rounded-lg p-6">
        <h2 className="text-xl font-bold text-green-400 mb-4 font-mono">
          Password Strength Checker
        </h2>

        {/* Input */}
        <div className="mb-6">
          <label className="block text-green-400 font-mono mb-2">
            Password
          </label>
          <input
            type="text"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password to analyze..."
            className="w-full bg-black border border-green-500/30 rounded-lg p-3 text-green-300 font-mono focus:border-green-500 focus:outline-none"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3 mb-6">
          <button
            onClick={generatePassword}
            className="px-4 py-2 bg-green-500 text-black font-mono font-bold rounded-lg hover:bg-green-400 transition-colors"
          >
            🎲 Generate Strong Password
          </button>
          
          {analysis && (
            <button
              onClick={copyAnalysis}
              className="px-4 py-2 bg-gray-700 text-green-400 font-mono rounded-lg hover:bg-gray-600 transition-colors"
            >
              📋 Copy Analysis
            </button>
          )}
          
          <button
            onClick={clearPassword}
            className="px-4 py-2 bg-red-900 text-red-300 font-mono rounded-lg hover:bg-red-800 transition-colors"
          >
            🗑️ Clear
          </button>
        </div>

        {/* Results */}
        {analysis ? (
          <div className="space-y-4">
            {/* Strength Overview */}
            <div className="bg-black border border-green-500/30 rounded-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-green-400 font-mono font-bold">
                  Password Strength
                </h3>
                <span className={`font-mono font-bold ${analysis.strengthColor}`}>
                  {analysis.strength}
                </span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <span className="text-gray-400">Length:</span>
                  <span className="text-green-300 ml-2 font-mono">
                    {analysis.length} characters
                  </span>
                </div>
                <div>
                  <span className="text-gray-400">Entropy:</span>
                  <span className="text-green-300 ml-2 font-mono">
                    {analysis.entropy} bits
                  </span>
                </div>
                <div>
                  <span className="text-gray-400">Time to crack:</span>
                  <span className="text-green-300 ml-2 font-mono">
                    {analysis.timeString}
                  </span>
                </div>
              </div>
            </div>

            {/* Character Types */}
            <div className="bg-black border border-green-500/30 rounded-lg p-4">
              <h3 className="text-green-400 font-mono font-bold mb-3">
                Character Types
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[
                  { label: "Lowercase", value: analysis.hasLower },
                  { label: "Uppercase", value: analysis.hasUpper },
                  { label: "Numbers", value: analysis.hasNumbers },
                  { label: "Symbols", value: analysis.hasSymbols },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-2">
                    <span className={`text-lg ${item.value ? "text-green-400" : "text-red-400"}`}>
                      {item.value ? "✓" : "✗"}
                    </span>
                    <span className="text-green-300 font-mono text-sm">
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Suggestions */}
            {analysis.suggestions.length > 0 && (
              <div className="bg-black border border-yellow-500/30 rounded-lg p-4">
                <h3 className="text-yellow-400 font-mono font-bold mb-3">
                  Suggestions for Improvement
                </h3>
                <ul className="space-y-1">
                  {analysis.suggestions.map((suggestion, index) => (
                    <li key={index} className="text-yellow-300 font-mono text-sm">
                      • {suggestion}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ) : (
          <div className="bg-black border border-green-500/30 rounded-lg p-8 text-center">
            <div className="text-gray-500 font-mono">
              Enter a password above to analyze its strength
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
