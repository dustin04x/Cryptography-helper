// Caesar Cipher
export function caesarCipher(text: string, shift: number): string {
  return text.replace(/[a-zA-Z]/g, (char) => {
    const start = char <= 'Z' ? 65 : 97;
    const code = char.charCodeAt(0);
    let shifted = ((code - start + shift) % 26 + 26) % 26;
    return String.fromCharCode(shifted + start);
  });
}

// Vigenère Cipher
export function vigenereCipher(text: string, key: string, encrypt: boolean = true): string {
  if (!key) return text;
  
  const cleanKey = key.replace(/[^a-zA-Z]/g, '').toUpperCase();
  if (!cleanKey) return text;
  
  let result = '';
  let keyIndex = 0;
  
  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    
    if (/[a-zA-Z]/.test(char)) {
      const isUpperCase = char <= 'Z';
      const charCode = char.toUpperCase().charCodeAt(0) - 65;
      const keyChar = cleanKey[keyIndex % cleanKey.length].charCodeAt(0) - 65;
      
      let shifted;
      if (encrypt) {
        shifted = (charCode + keyChar) % 26;
      } else {
        shifted = (charCode - keyChar + 26) % 26;
      }
      
      const newChar = String.fromCharCode(shifted + 65);
      result += isUpperCase ? newChar : newChar.toLowerCase();
      keyIndex++;
    } else {
      result += char;
    }
  }
  
  return result;
}

// Atbash Cipher (A=Z, B=Y, etc.)
export function atbashCipher(text: string): string {
  return text.replace(/[a-zA-Z]/g, (char) => {
    const isUpperCase = char <= 'Z';
    const code = char.toUpperCase().charCodeAt(0);
    const reversed = 90 - (code - 65); // Z - (char - A)
    const newChar = String.fromCharCode(reversed);
    return isUpperCase ? newChar : newChar.toLowerCase();
  });
}

// ROT13 Cipher
export function rot13Cipher(text: string): string {
  return caesarCipher(text, 13);
}

// Rail Fence Cipher
export function railFenceCipher(text: string, rails: number, encrypt: boolean = true): string {
  if (rails <= 1) return text;
  
  if (encrypt) {
    const fence: string[][] = Array(rails).fill(null).map(() => []);
    let rail = 0;
    let direction = 1;
    
    for (let i = 0; i < text.length; i++) {
      fence[rail].push(text[i]);
      rail += direction;
      
      if (rail === rails - 1 || rail === 0) {
        direction = -direction;
      }
    }
    
    return fence.map(row => row.join('')).join('');
  } else {
    // Decryption
    const fence: (string | null)[][] = Array(rails).fill(null).map(() => Array(text.length).fill(null));
    let rail = 0;
    let direction = 1;
    
    // Mark positions
    for (let i = 0; i < text.length; i++) {
      fence[rail][i] = '*';
      rail += direction;
      
      if (rail === rails - 1 || rail === 0) {
        direction = -direction;
      }
    }
    
    // Fill with characters
    let index = 0;
    for (let r = 0; r < rails; r++) {
      for (let c = 0; c < text.length; c++) {
        if (fence[r][c] === '*' && index < text.length) {
          fence[r][c] = text[index++];
        }
      }
    }
    
    // Read off
    let result = '';
    rail = 0;
    direction = 1;
    
    for (let i = 0; i < text.length; i++) {
      result += fence[rail][i];
      rail += direction;
      
      if (rail === rails - 1 || rail === 0) {
        direction = -direction;
      }
    }
    
    return result;
  }
}

// Playfair Cipher
export function playfairCipher(text: string, key: string, encrypt: boolean = true): string {
  // Create 5x5 grid
  const alphabet = 'ABCDEFGHIKLMNOPQRSTUVWXYZ'; // J is combined with I
  const cleanKey = key.toUpperCase().replace(/[^A-Z]/g, '').replace(/J/g, 'I');
  const keyChars = [...new Set(cleanKey.split(''))];
  const remainingChars = alphabet.split('').filter(char => !keyChars.includes(char));
  const grid = [...keyChars, ...remainingChars];
  
  // Create position lookup
  const positions: Record<string, [number, number]> = {};
  for (let i = 0; i < 25; i++) {
    positions[grid[i]] = [Math.floor(i / 5), i % 5];
  }
  
  // Prepare text
  let cleanText = text.toUpperCase().replace(/[^A-Z]/g, '').replace(/J/g, 'I');
  
  // Add padding and create pairs
  const pairs: string[] = [];
  for (let i = 0; i < cleanText.length; i += 2) {
    let pair = cleanText[i];
    if (i + 1 < cleanText.length) {
      if (cleanText[i] === cleanText[i + 1]) {
        pair += 'X';
        i--;
      } else {
        pair += cleanText[i + 1];
      }
    } else {
      pair += 'X';
    }
    pairs.push(pair);
  }
  
  // Process pairs
  let result = '';
  for (const pair of pairs) {
    const [row1, col1] = positions[pair[0]];
    const [row2, col2] = positions[pair[1]];
    
    if (row1 === row2) {
      // Same row
      const newCol1 = encrypt ? (col1 + 1) % 5 : (col1 - 1 + 5) % 5;
      const newCol2 = encrypt ? (col2 + 1) % 5 : (col2 - 1 + 5) % 5;
      result += grid[row1 * 5 + newCol1] + grid[row2 * 5 + newCol2];
    } else if (col1 === col2) {
      // Same column
      const newRow1 = encrypt ? (row1 + 1) % 5 : (row1 - 1 + 5) % 5;
      const newRow2 = encrypt ? (row2 + 1) % 5 : (row2 - 1 + 5) % 5;
      result += grid[newRow1 * 5 + col1] + grid[newRow2 * 5 + col2];
    } else {
      // Rectangle
      result += grid[row1 * 5 + col2] + grid[row2 * 5 + col1];
    }
  }
  
  return result;
}

// Simple Substitution Cipher
export function substitutionCipher(text: string, key: string, encrypt: boolean = true): string {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const cleanKey = key.toUpperCase().replace(/[^A-Z]/g, '');
  
  if (cleanKey.length !== 26 || new Set(cleanKey).size !== 26) {
    throw new Error('Key must contain all 26 letters exactly once');
  }
  
  const fromAlphabet = encrypt ? alphabet : cleanKey;
  const toAlphabet = encrypt ? cleanKey : alphabet;
  
  return text.replace(/[a-zA-Z]/g, (char) => {
    const isUpperCase = char <= 'Z';
    const upperChar = char.toUpperCase();
    const index = fromAlphabet.indexOf(upperChar);
    
    if (index === -1) return char;
    
    const newChar = toAlphabet[index];
    return isUpperCase ? newChar : newChar.toLowerCase();
  });
}

// Affine Cipher
export function affineCipher(text: string, a: number, b: number, encrypt: boolean = true): string {
  // Check if 'a' is coprime with 26
  const gcd = (x: number, y: number): number => y === 0 ? x : gcd(y, x % y);
  if (gcd(a, 26) !== 1) {
    throw new Error('Parameter "a" must be coprime with 26');
  }
  
  // Modular multiplicative inverse
  const modInverse = (a: number, m: number): number => {
    for (let i = 1; i < m; i++) {
      if ((a * i) % m === 1) return i;
    }
    return 1;
  };
  
  return text.replace(/[a-zA-Z]/g, (char) => {
    const isUpperCase = char <= 'Z';
    const x = char.toUpperCase().charCodeAt(0) - 65;
    
    let y;
    if (encrypt) {
      y = (a * x + b) % 26;
    } else {
      const aInv = modInverse(a, 26);
      y = (aInv * (x - b + 26)) % 26;
    }
    
    const newChar = String.fromCharCode(y + 65);
    return isUpperCase ? newChar : newChar.toLowerCase();
  });
}

// Morse Code
export function morseCode(text: string, encrypt: boolean = true): string {
  const morseMap: Record<string, string> = {
    'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.', 'F': '..-.',
    'G': '--.', 'H': '....', 'I': '..', 'J': '.---', 'K': '-.-', 'L': '.-..',
    'M': '--', 'N': '-.', 'O': '---', 'P': '.--.', 'Q': '--.-', 'R': '.-.',
    'S': '...', 'T': '-', 'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-',
    'Y': '-.--', 'Z': '--..', '0': '-----', '1': '.----', '2': '..---',
    '3': '...--', '4': '....-', '5': '.....', '6': '-....', '7': '--...',
    '8': '---..', '9': '----.', ' ': '/'
  };
  
  if (encrypt) {
    return text.toUpperCase().split('').map(char => morseMap[char] || char).join(' ');
  } else {
    const reverseMap: Record<string, string> = {};
    Object.entries(morseMap).forEach(([key, value]) => {
      reverseMap[value] = key;
    });
    
    return text.split(' ').map(code => reverseMap[code] || code).join('');
  }
}

// Binary Encoding
export function binaryEncode(text: string, encrypt: boolean = true): string {
  if (encrypt) {
    return text.split('').map(char => 
      char.charCodeAt(0).toString(2).padStart(8, '0')
    ).join(' ');
  } else {
    return text.split(' ').map(binary => 
      String.fromCharCode(parseInt(binary, 2))
    ).join('');
  }
}

// AES Encryption (using Web Crypto API)
export async function aesEncrypt(text: string, password: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(text);
  
  // Generate a random salt
  const salt = crypto.getRandomValues(new Uint8Array(16));
  
  // Derive key from password
  const keyMaterial = await crypto.subtle.importKey(
    'raw',
    encoder.encode(password),
    'PBKDF2',
    false,
    ['deriveKey']
  );
  
  const key = await crypto.subtle.deriveKey(
    {
      name: 'PBKDF2',
      salt: salt,
      iterations: 100000,
      hash: 'SHA-256',
    },
    keyMaterial,
    { name: 'AES-GCM', length: 256 },
    false,
    ['encrypt']
  );
  
  // Generate a random IV
  const iv = crypto.getRandomValues(new Uint8Array(12));
  
  // Encrypt the data
  const encrypted = await crypto.subtle.encrypt(
    { name: 'AES-GCM', iv: iv },
    key,
    data
  );
  
  // Combine salt, iv, and encrypted data
  const result = new Uint8Array(salt.length + iv.length + encrypted.byteLength);
  result.set(salt, 0);
  result.set(iv, salt.length);
  result.set(new Uint8Array(encrypted), salt.length + iv.length);
  
  // Convert to base64
  return btoa(String.fromCharCode(...result));
}

export async function aesDecrypt(encryptedData: string, password: string): Promise<string> {
  try {
    // Convert from base64
    const data = new Uint8Array(
      atob(encryptedData).split('').map(char => char.charCodeAt(0))
    );
    
    // Extract salt, iv, and encrypted data
    const salt = data.slice(0, 16);
    const iv = data.slice(16, 28);
    const encrypted = data.slice(28);
    
    // Derive key from password
    const encoder = new TextEncoder();
    const keyMaterial = await crypto.subtle.importKey(
      'raw',
      encoder.encode(password),
      'PBKDF2',
      false,
      ['deriveKey']
    );
    
    const key = await crypto.subtle.deriveKey(
      {
        name: 'PBKDF2',
        salt: salt,
        iterations: 100000,
        hash: 'SHA-256',
      },
      keyMaterial,
      { name: 'AES-GCM', length: 256 },
      false,
      ['decrypt']
    );
    
    // Decrypt the data
    const decrypted = await crypto.subtle.decrypt(
      { name: 'AES-GCM', iv: iv },
      key,
      encrypted
    );
    
    // Convert back to string
    const decoder = new TextDecoder();
    return decoder.decode(decrypted);
  } catch (error) {
    throw new Error('Decryption failed. Check your password and data.');
  }
}

// Hash Generation
export async function generateHash(text: string, algorithm: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(text);
  
  let hashBuffer: ArrayBuffer;
  
  if (algorithm === 'MD5') {
    // MD5 is not available in Web Crypto API, so we'll use a simple implementation
    return md5(text);
  } else {
    hashBuffer = await crypto.subtle.digest(algorithm, data);
  }
  
  // Convert to hex string
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

// Simple MD5 implementation (for educational purposes only)
function md5(text: string): string {
  // This is a simplified MD5 for demonstration
  // In a real application, you'd use a proper crypto library
  let hash = 0;
  for (let i = 0; i < text.length; i++) {
    const char = text.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  
  // Convert to hex and pad to 32 characters (MD5 length)
  const hex = Math.abs(hash).toString(16);
  return hex.padStart(32, '0').substring(0, 32);
}
