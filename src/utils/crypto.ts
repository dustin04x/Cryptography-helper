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

// Atbash Cipher
export function atbashCipher(text: string): string {
  return text.replace(/[a-zA-Z]/g, (char) => {
    const isUpperCase = char <= 'Z';
    const code = char.toUpperCase().charCodeAt(0);
    const reversed = 90 - (code - 65);
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
      if (rail === rails - 1 || rail === 0) direction = -direction;
    }
    
    return fence.map(row => row.join('')).join('');
  } else {
    const fence: (string | null)[][] = Array(rails).fill(null).map(() => Array(text.length).fill(null));
    let rail = 0, direction = 1;
    for (let i = 0; i < text.length; i++) {
      fence[rail][i] = '*';
      rail += direction;
      if (rail === rails - 1 || rail === 0) direction = -direction;
    }
    let index = 0;
    for (let r = 0; r < rails; r++) {
      for (let c = 0; c < text.length; c++) {
        if (fence[r][c] === '*' && index < text.length) fence[r][c] = text[index++];
      }
    }
    let result = '';
    rail = 0; direction = 1;
    for (let i = 0; i < text.length; i++) {
      result += fence[rail][i];
      rail += direction;
      if (rail === rails - 1 || rail === 0) direction = -direction;
    }
    return result;
  }
}

// Playfair Cipher
export function playfairCipher(text: string, key: string, encrypt: boolean = true): string {
  const alphabet = 'ABCDEFGHIKLMNOPQRSTUVWXYZ';
  const cleanKey = key.toUpperCase().replace(/[^A-Z]/g, '').replace(/J/g, 'I');
  const keyChars = [...new Set(cleanKey.split(''))];
  const remainingChars = alphabet.split('').filter(char => !keyChars.includes(char));
  const grid = [...keyChars, ...remainingChars];
  const positions: Record<string, [number, number]> = {};
  for (let i = 0; i < 25; i++) positions[grid[i]] = [Math.floor(i / 5), i % 5];

  let cleanText = text.toUpperCase().replace(/[^A-Z]/g, '').replace(/J/g, 'I');
  const pairs: string[] = [];
  for (let i = 0; i < cleanText.length; i += 2) {
    let pair = cleanText[i];
    if (i + 1 < cleanText.length) {
      if (cleanText[i] === cleanText[i + 1]) {
        pair += 'X'; i--;
      } else pair += cleanText[i + 1];
    } else pair += 'X';
    pairs.push(pair);
  }

  let result = '';
  for (const pair of pairs) {
    const [row1, col1] = positions[pair[0]];
    const [row2, col2] = positions[pair[1]];
    if (row1 === row2) {
      const newCol1 = encrypt ? (col1 + 1) % 5 : (col1 - 1 + 5) % 5;
      const newCol2 = encrypt ? (col2 + 1) % 5 : (col2 - 1 + 5) % 5;
      result += grid[row1 * 5 + newCol1] + grid[row2 * 5 + newCol2];
    } else if (col1 === col2) {
      const newRow1 = encrypt ? (row1 + 1) % 5 : (row1 - 1 + 5) % 5;
      const newRow2 = encrypt ? (row2 + 1) % 5 : (row2 - 1 + 5) % 5;
      result += grid[newRow1 * 5 + col1] + grid[newRow2 * 5 + col2];
    } else result += grid[row1 * 5 + col2] + grid[row2 * 5 + col1];
  }
  return result;
}

// Substitution Cipher
export function substitutionCipher(text: string, key: string, encrypt: boolean = true): string {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const cleanKey = key.toUpperCase().replace(/[^A-Z]/g, '');
  if (cleanKey.length !== 26 || new Set(cleanKey).size !== 26)
    throw new Error('Key must contain all 26 letters exactly once');
  
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
  const gcd = (x: number, y: number): number => y === 0 ? x : gcd(y, x % y);
  if (gcd(a, 26) !== 1) throw new Error('Parameter "a" must be coprime with 26');
  const modInverse = (a: number, m: number): number => {
    for (let i = 1; i < m; i++) if ((a * i) % m === 1) return i;
    return 1;
  };
  return text.replace(/[a-zA-Z]/g, (char) => {
    const isUpperCase = char <= 'Z';
    const x = char.toUpperCase().charCodeAt(0) - 65;
    let y;
    if (encrypt) y = (a * x + b) % 26;
    else {
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
  if (encrypt)
    return text.toUpperCase().split('').map(char => morseMap[char] || char).join(' ');
  else {
    const reverseMap: Record<string, string> = {};
    Object.entries(morseMap).forEach(([k, v]) => reverseMap[v] = k);
    return text.split(' ').map(code => reverseMap[code] || code).join('');
  }
}

// Binary Encoding
export function binaryEncode(text: string, encrypt: boolean = true): string {
  if (encrypt)
    return text.split('').map(char => char.charCodeAt(0).toString(2).padStart(8, '0')).join(' ');
  else
    return text.split(' ').map(binary => String.fromCharCode(parseInt(binary, 2))).join('');
}

// AES Encryption
export async function aesEncrypt(text: string, password: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(text);
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const keyMaterial = await crypto.subtle.importKey('raw', encoder.encode(password), 'PBKDF2', false, ['deriveKey']);
  const key = await crypto.subtle.deriveKey(
    { name: 'PBKDF2', salt, iterations: 100000, hash: 'SHA-256' },
    keyMaterial,
    { name: 'AES-GCM', length: 256 },
    false,
    ['encrypt']
  );
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const encrypted = await crypto.subtle.encrypt({ name: 'AES-GCM', iv }, key, data);
  const result = new Uint8Array(salt.length + iv.length + encrypted.byteLength);
  result.set(salt, 0);
  result.set(iv, salt.length);
  result.set(new Uint8Array(encrypted), salt.length + iv.length);
  return btoa(String.fromCharCode(...result));
}

export async function aesDecrypt(encryptedData: string, password: string): Promise<string> {
  try {
    const data = new Uint8Array(atob(encryptedData).split('').map(c => c.charCodeAt(0)));
    const salt = data.slice(0, 16);
    const iv = data.slice(16, 28);
    const encrypted = data.slice(28);
    const encoder = new TextEncoder();
    const keyMaterial = await crypto.subtle.importKey('raw', encoder.encode(password), 'PBKDF2', false, ['deriveKey']);
    const key = await crypto.subtle.deriveKey(
      { name: 'PBKDF2', salt, iterations: 100000, hash: 'SHA-256' },
      keyMaterial,
      { name: 'AES-GCM', length: 256 },
      false,
      ['decrypt']
    );
    const decrypted = await crypto.subtle.decrypt({ name: 'AES-GCM', iv }, key, encrypted);
    return new TextDecoder().decode(decrypted);
  } catch {
    throw new Error('Decryption failed. Check your password and data.');
  }
}

// ✅ Correct Hash Generation with Real MD5
export async function generateHash(text: string, algorithm: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(text);

  if (algorithm.toUpperCase() === 'MD5') {
    return md5(text);
  }

  const hashBuffer = await crypto.subtle.digest(algorithm, data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

// Real MD5 Implementation (pure JS, RFC 1321 compliant)
function md5(string: string): string {
  function RotateLeft(lValue: number, iShiftBits: number) {
    return (lValue << iShiftBits) | (lValue >>> (32 - iShiftBits));
  }
  function AddUnsigned(lX: number, lY: number) {
    const lX4 = lX & 0x40000000, lY4 = lY & 0x40000000;
    const lX8 = lX & 0x80000000, lY8 = lY & 0x80000000;
    const lResult = (lX & 0x3FFFFFFF) + (lY & 0x3FFFFFFF);
    if (lX4 & lY4) return lResult ^ 0x80000000 ^ lX8 ^ lY8;
    if (lX4 | lY4) return (lResult & 0x40000000)
      ? lResult ^ 0xC0000000 ^ lX8 ^ lY8
      : lResult ^ 0x40000000 ^ lX8 ^ lY8;
    return lResult ^ lX8 ^ lY8;
  }
  function F(x: number, y: number, z: number) { return (x & y) | (~x & z); }
  function G(x: number, y: number, z: number) { return (x & z) | (y & ~z); }
  function H(x: number, y: number, z: number) { return x ^ y ^ z; }
  function I(x: number, y: number, z: number) { return y ^ (x | ~z); }
  function FF(a:number,b:number,c:number,d:number,x:number,s:number,ac:number){a=AddUnsigned(a,AddUnsigned(AddUnsigned(F(b,c,d),x),ac));return AddUnsigned(RotateLeft(a,s),b);}
  function GG(a:number,b:number,c:number,d:number,x:number,s:number,ac:number){a=AddUnsigned(a,AddUnsigned(AddUnsigned(G(b,c,d),x),ac));return AddUnsigned(RotateLeft(a,s),b);}
  function HH(a:number,b:number,c:number,d:number,x:number,s:number,ac:number){a=AddUnsigned(a,AddUnsigned(AddUnsigned(H(b,c,d),x),ac));return AddUnsigned(RotateLeft(a,s),b);}
  function II(a:number,b:number,c:number,d:number,x:number,s:number,ac:number){a=AddUnsigned(a,AddUnsigned(AddUnsigned(I(b,c,d),x),ac));return AddUnsigned(RotateLeft(a,s),b);}
  function ConvertToWordArray(string:string){
    let lWordCount;const lMessageLength=string.length;const lNumberOfWords_temp1=lMessageLength+8;
    const lNumberOfWords_temp2=(lNumberOfWords_temp1-(lNumberOfWords_temp1%64))/64;
    const lNumberOfWords=(lNumberOfWords_temp2+1)*16;const lWordArray=new Array(lNumberOfWords-1);
    let lBytePosition=0;let lByteCount=0;
    while(lByteCount<lMessageLength){
      lWordCount=(lByteCount-(lByteCount%4))/4;
      lBytePosition=(lByteCount%4)*8;
      lWordArray[lWordCount]=(lWordArray[lWordCount]|(string.charCodeAt(lByteCount)<<lBytePosition));
      lByteCount++;
    }
    lWordCount=(lByteCount-(lByteCount%4))/4;
    lBytePosition=(lByteCount%4)*8;
    lWordArray[lWordCount]=lWordArray[lWordCount]|(0x80<<lBytePosition);
    lWordArray[lNumberOfWords-2]=lMessageLength<<3;
    lWordArray[lNumberOfWords-1]=lMessageLength>>>29;
    return lWordArray;
  }
  function WordToHex(lValue:number){let WordToHexValue="",WordToHexValue_temp="",lByte,lCount;for(lCount=0;lCount<=3;lCount++){lByte=(lValue>>>(lCount*8))&255;WordToHexValue_temp="0"+lByte.toString(16);WordToHexValue=WordToHexValue+WordToHexValue_temp.substr(WordToHexValue_temp.length-2,2);}return WordToHexValue;}
  function Utf8Encode(string:string){string=string.replace(/\r\n/g,"\n");let utftext="";for(let n=0;n<string.length;n++){const c=string.charCodeAt(n);if(c<128){utftext+=String.fromCharCode(c);}else if((c>127)&&(c<2048)){utftext+=String.fromCharCode((c>>6)|192);utftext+=String.fromCharCode((c&63)|128);}else{utftext+=String.fromCharCode((c>>12)|224);utftext+=String.fromCharCode(((c>>6)&63)|128);utftext+=String.fromCharCode((c&63)|128);}}return utftext;}
  let x=Array();let k,AA,BB,CC,DD,a,b,c,d;const S11=7, S12=12, S13=17, S14=22;
  const S21=5, S22=9 , S23=14, S24=20;
  const S31=4, S32=11, S33=16, S34=23;
  const S41=6, S42=10, S43=15, S44=21;
  string=Utf8Encode(string);
  x=ConvertToWordArray(string);
  a=0x67452301;b=0xEFCDAB89;c=0x98BADCFE;d=0x10325476;
  for(k=0;k<x.length;k+=16){
    AA=a;BB=b;CC=c;DD=d;
    a=FF(a,b,c,d,x[k+0], S11,0xD76AA478);
    d=FF(d,a,b,c,x[k+1], S12,0xE8C7B756);
    c=FF(c,d,a,b,x[k+2], S13,0x242070DB);
    b=FF(b,c,d,a,x[k+3], S14,0xC1BDCEEE);
    a=FF(a,b,c,d,x[k+4], S11,0xF57C0FAF);
    d=FF(d,a,b,c,x[k+5], S12,0x4787C62A);
    c=FF(c,d,a,b,x[k+6], S13,0xA8304613);
    b=FF(b,c,d,a,x[k+7], S14,0xFD469501);
    a=FF(a,b,c,d,x[k+8], S11,0x698098D8);
    d=FF(d,a,b,c,x[k+9], S12,0x8B44F7AF);
    c=FF(c,d,a,b,x[k+10],S13,0xFFFF5BB1);
    b=FF(b,c,d,a,x[k+11],S14,0x895CD7BE);
    a=FF(a,b,c,d,x[k+12],S11,0x6B901122);
    d=FF(d,a,b,c,x[k+13],S12,0xFD987193);
    c=FF(c,d,a,b,x[k+14],S13,0xA679438E);
    b=FF(b,c,d,a,x[k+15],S14,0x49B40821);
    a=GG(a,b,c,d,x[k+1], S21,0xF61E2562);
    d=GG(d,a,b,c,x[k+6], S22,0xC040B340);
    c=GG(c,d,a,b,x[k+11],S23,0x265E5A51);
    b=GG(b,c,d,a,x[k+0], S24,0xE9B6C7AA);
    a=GG(a,b,c,d,x[k+5], S21,0xD62F105D);
    d=GG(d,a,b,c,x[k+10],S22,0x2441453);
    c=GG(c,d,a,b,x[k+15],S23,0xD8A1E681);
    b=GG(b,c,d,a,x[k+4], S24,0xE7D3FBC8);
    a=GG(a,b,c,d,x[k+9], S21,0x21E1CDE6);
    d=GG(d,a,b,c,x[k+14],S22,0xC33707D6);
    c=GG(c,d,a,b,x[k+3], S23,0xF4D50D87);
    b=GG(b,c,d,a,x[k+8], S24,0x455A14ED);
    a=GG(a,b,c,d,x[k+13],S21,0xA9E3E905);
    d=GG(d,a,b,c,x[k+2], S22,0xFCEFA3F8);
    c=GG(c,d,a,b,x[k+7], S23,0x676F02D9);
    b=GG(b,c,d,a,x[k+12],S24,0x8D2A4C8A);
    a=HH(a,b,c,d,x[k+5], S31,0xFFFA3942);
    d=HH(d,a,b,c,x[k+8], S32,0x8771F681);
    c=HH(c,d,a,b,x[k+11],S33,0x6D9D6122);
    b=HH(b,c,d,a,x[k+14],S34,0xFDE5380C);
    a=HH(a,b,c,d,x[k+1], S31,0xA4BEEA44);
    d=HH(d,a,b,c,x[k+4], S32,0x4BDECFA9);
    c=HH(c,d,a,b,x[k+7], S33,0xF6BB4B60);
    b=HH(b,c,d,a,x[k+10],S34,0xBEBFBC70);
    a=HH(a,b,c,d,x[k+13],S31,0x289B7EC6);
    d=HH(d,a,b,c,x[k+0], S32,0xEAA127FA);
    c=HH(c,d,a,b,x[k+3], S33,0xD4EF3085);
    b=HH(b,c,d,a,x[k+6], S34,0x4881D05);
    a=HH(a,b,c,d,x[k+9], S31,0xD9D4D039);
    d=HH(d,a,b,c,x[k+12],S32,0xE6DB99E5);
    c=HH(c,d,a,b,x[k+15],S33,0x1FA27CF8);
    b=HH(b,c,d,a,x[k+2], S34,0xC4AC5665);
    a=II(a,b,c,d,x[k+0], S41,0xF4292244);
    d=II(d,a,b,c,x[k+7], S42,0x432AFF97);
    c=II(c,d,a,b,x[k+14],S43,0xAB9423A7);
    b=II(b,c,d,a,x[k+5], S44,0xFC93A039);
    a=II(a,b,c,d,x[k+12],S41,0x655B59C3);
    d=II(d,a,b,c,x[k+3], S42,0x8F0CCC92);
    c=II(c,d,a,b,x[k+10],S43,0xFFEFF47D);
    b=II(b,c,d,a,x[k+1], S44,0x85845DD1);
    a=II(a,b,c,d,x[k+8], S41,0x6FA87E4F);
    d=II(d,a,b,c,x[k+15],S42,0xFE2CE6E0);
    c=II(c,d,a,b,x[k+6], S43,0xA3014314);
    b=II(b,c,d,a,x[k+13],S44,0x4E0811A1);
    a=II(a,b,c,d,x[k+4], S41,0xF7537E82);
    d=II(d,a,b,c,x[k+11],S42,0xBD3AF235);
    c=II(c,d,a,b,x[k+2], S43,0x2AD7D2BB);
    b=II(b,c,d,a,x[k+9], S44,0xEB86D391);
    a=AddUnsigned(a,AA);
    b=AddUnsigned(b,BB);
    c=AddUnsigned(c,CC);
    d=AddUnsigned(d,DD);
  }
  const temp = WordToHex(a)+WordToHex(b)+WordToHex(c)+WordToHex(d);
  return temp.toLowerCase();
}
