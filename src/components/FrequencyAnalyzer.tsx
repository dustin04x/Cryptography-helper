import { useState, useMemo } from "react";
import { toast } from "sonner";

export function FrequencyAnalyzer() {
  const [text, setText] = useState("");

  const analysis = useMemo(() => {
    if (!text.trim()) return null;

    const letters = text.toLowerCase().match(/[a-z]/g) || [];
    const total = letters.length;
    
    if (total === 0) return null;

    const frequency: Record<string, number> = {};
    
    // Initialize all letters
    for (let i = 0; i < 26; i++) {
      frequency[String.fromCharCode(97 + i)] = 0;
    }
    
    // Count frequencies
    letters.forEach(letter => {
      frequency[letter]++;
    });

    // Convert to percentages and sort
    const results = Object.entries(frequency)
      .map(([letter, count]) => ({
        letter: letter.toUpperCase(),
        count,
        percentage: (count / total) * 100,
      }))
      .sort((a, b) => b.count - a.count);

    return { results, total };
  }, [text]);

  const copyAnalysis = () => {
    if (!analysis) return;
    
    const output = analysis.results
      .filter(item => item.count > 0)
      .map(item => `${item.letter}: ${item.count} (${item.percentage.toFixed(1)}%)`)
      .join('\n');
    
    navigator.clipboard.writeText(output);
    toast.success("Analysis copied to clipboard");
  };

  const clearText = () => {
    setText("");
    toast.info("Text cleared");
  };

  return (
    <div className="space-y-6">
      <div className="bg-gray-900 border border-green-500/30 rounded-lg p-6">
        <h2 className="text-xl font-bold text-green-400 mb-4 font-mono">
          Frequency Analyzer
        </h2>

        {/* Input */}
        <div className="mb-6">
          <label className="block text-green-400 font-mono mb-2">
            Text to Analyze
          </label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter text to analyze letter frequency..."
            className="w-full h-32 bg-black border border-green-500/30 rounded-lg p-3 text-green-300 font-mono resize-none focus:border-green-500 focus:outline-none"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 mb-6">
          {analysis && (
            <button
              onClick={copyAnalysis}
              className="px-4 py-2 bg-gray-700 text-green-400 font-mono rounded-lg hover:bg-gray-600 transition-colors"
            >
              📋 Copy Analysis
            </button>
          )}
          
          <button
            onClick={clearText}
            className="px-4 py-2 bg-red-900 text-red-300 font-mono rounded-lg hover:bg-red-800 transition-colors"
          >
            🗑️ Clear
          </button>
        </div>

        {/* Results */}
        {analysis ? (
          <div className="space-y-4">
            <div className="bg-black border border-green-500/30 rounded-lg p-4">
              <h3 className="text-green-400 font-mono font-bold mb-2">
                Statistics
              </h3>
              <div className="text-green-300 font-mono text-sm">
                Total Letters: {analysis.total}
              </div>
            </div>

            <div className="bg-black border border-green-500/30 rounded-lg p-4">
              <h3 className="text-green-400 font-mono font-bold mb-4">
                Letter Frequency
              </h3>
              
              {/* Visual Chart */}
              <div className="grid grid-cols-13 gap-1 mb-4">
                {analysis.results.map((item) => (
                  <div key={item.letter} className="text-center">
                    <div className="text-xs text-green-400 font-mono mb-1">
                      {item.letter}
                    </div>
                    <div 
                      className="bg-green-500 min-h-[4px] rounded-t"
                      style={{ 
                        height: `${Math.max(4, (item.percentage / Math.max(...analysis.results.map(r => r.percentage))) * 60)}px` 
                      }}
                    />
                    <div className="text-xs text-green-300 font-mono mt-1">
                      {item.count > 0 ? item.count : ''}
                    </div>
                  </div>
                ))}
              </div>

              {/* Top Letters */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                {analysis.results
                  .filter(item => item.count > 0)
                  .slice(0, 12)
                  .map((item) => (
                    <div 
                      key={item.letter}
                      className="flex justify-between items-center bg-gray-800 rounded p-2"
                    >
                      <span className="font-mono text-green-400 font-bold">
                        {item.letter}
                      </span>
                      <span className="font-mono text-green-300 text-sm">
                        {item.count} ({item.percentage.toFixed(1)}%)
                      </span>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-black border border-green-500/30 rounded-lg p-8 text-center">
            <div className="text-gray-500 font-mono">
              Enter text above to see frequency analysis
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
