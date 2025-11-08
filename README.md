# Cryptography-helper 🔐

[![Live Demo](https://img.shields.io/badge/Live%20Demo-GitHub%20Pages-0ea5e9?logo=github)](https://dustin04x.github.io/Cryptography-helper)
[![Made with React](https://img.shields.io/badge/Made%20with-React-61DAFB?logo=react)](https://react.dev/)
[![Styled with Tailwind CSS](https://img.shields.io/badge/Styled%20with-TailwindCSS-38B2AC?logo=tailwindcss)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Contributions Welcome](https://img.shields.io/badge/Contributions-Welcome-success?logo=github)](https://github.com/dustin04x/Cryptography-helper/pulls)

A sleek and easy-to-use web app for encrypting, decrypting, encoding, and learning about cryptography — all in your browser.

---

## 🚀 Live Demo

🔗 **Try it now:** [https://dustin04x.github.io/Cryptography-helper](https://dustin04x.github.io/Cryptography-helper)

[![Visit Demo](https://img.shields.io/badge/Visit%20App-Click%20Here-10b981?style=for-the-badge\&logo=github)](https://dustin04x.github.io/Cryptography-helper)

---

## 🖼️ Preview

![Cryptography Helper Screenshot](https://raw.githubusercontent.com/dustin04x/Cryptography-helper/main/screenshot.png)



## ✨ Key Features & Benefits

* 🔐 **Encryption/Decryption:** Supports various encryption algorithms for secure text manipulation.
* 🔡 **Encoding/Decoding:** Implements encoding and decoding functionalities (e.g., Base64).
* 🧮 **Hashing:** Generates cryptographic hashes for data integrity checks.
* 🔎 **Password Checking:** Evaluates password strength and security.
* 📊 **Frequency Analysis:** Provides tools for analyzing the frequency of characters in text — great for cryptanalysis.
* 📚 **Educational Resource:** Offers an accessible platform for learning about cryptography concepts.
* 🧭 **User-Friendly Interface:** Clean, modern, and intuitive design.
* 🌐 **In-Browser Functionality:** 100% client-side — no server or database required.

---

## ⚙️ Prerequisites & Dependencies

Before you begin, ensure you have the following installed:

* 🟢 **Node.js:** (Version >= 16 recommended) → [https://nodejs.org/](https://nodejs.org/)
* 📦 **npm** or **Yarn:** (npm is included with Node.js)

---

## 🧰 Installation & Setup

Clone and run the app locally:

```bash
git clone https://github.com/dustin04x/Cryptography-helper.git
cd Cryptography-helper
```

Install dependencies:

```bash
npm install   # or yarn install
```

Start the development server:

```bash
npm run dev   # or yarn dev
```

Your app will be running at **[http://localhost:5173/](http://localhost:5173/)** 🎉

---

## 🗂️ Project Structure

```
├── .gitignore
├── index.html
├── package-lock.json
├── package.json
├── postcss.config.cjs
└── src/
    ├── App.tsx
    └── components/
        ├── Base64Tool.tsx
        ├── CryptographyHelper.tsx
        ├── FrequencyAnalyzer.tsx
        ├── HashGenerator.tsx
        ├── InfoSection.tsx
        ├── PasswordChecker.tsx
        ├── TextEncryption.tsx
        ├── index.css
    └── lib/
        ├── utils.ts
    ├── main.tsx
```

---

## 🧠 Usage Examples

### 🔁 Caesar Cipher

```typescript
import { caesarCipher } from './src/utils/crypto';

const encryptedText = caesarCipher("Hello", 3); // Output: "Khoor"
const decryptedText = caesarCipher("Khoor", -3); // Output: "Hello"
```

### 🔑 Vigenère Cipher

```typescript
import { vigenereCipher } from './src/utils/crypto';

const encryptedText = vigenereCipher("attackatdawn", "lemon"); // Output: "lxfopvefrnhr"
const decryptedText = vigenereCipher("lxfopvefrnhr", "lemon", false); // Output: "attackatdawn"
```

---

## 🎨 Customization

You can tweak the look of the app by editing `src/index.css`, which uses **Tailwind CSS**. Adjust the color palette, animations, and layout to make it your own.

---

## 🤝 Contributing

Contributions are welcome! 🧩

1. Fork the repository.
2. Create a new branch: `git checkout -b feature-name`.
3. Make your changes and document them.
4. Test thoroughly.
5. Submit a pull request with a clear description.

[![Open Pull Requests](https://img.shields.io/github/issues-pr/dustin04x/Cryptography-helper?label=Open%20PRs\&logo=github)](https://github.com/dustin04x/Cryptography-helper/pulls)
[![Open Issues](https://img.shields.io/github/issues/dustin04x/Cryptography-helper?label=Open%20Issues\&logo=github)](https://github.com/dustin04x/Cryptography-helper/issues)

---

## 📜 License

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

This project is licensed under the **MIT License** — feel free to use, modify, and share it.

> 💬 *See the LICENSE file for details.*

---

## 🙌 Acknowledgments

This project utilizes the following open-source libraries:

* ⚛️ [React](https://react.dev/)
* 💨 [Tailwind CSS](https://tailwindcss.com/)
* 🧩 [clsx](https://github.com/lukeed/clsx)
* 🧱 [tailwind-merge](https://github.com/dcastil/tailwind-merge)

---

### 💫 Made with ❤️ by [dustin04x](https://github.com/dustin04x)
