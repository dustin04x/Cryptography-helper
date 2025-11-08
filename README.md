# Cryptography-helper 🔐

A sleek and easy-to-use web app for encrypting, decrypting, encoding, and learning about cryptography — all in your browser.

## Key Features & Benefits

*   **Encryption/Decryption:** Supports various encryption algorithms for secure text manipulation.
*   **Encoding/Decoding:** Implements encoding and decoding functionalities (e.g., Base64).
*   **Hashing:** Generates cryptographic hashes for data integrity checks.
*   **Password Checking:** Evaluates password strength and security.
*   **Frequency Analysis:** Provides tools for analyzing the frequency of characters in text, useful for breaking simple ciphers.
*   **Educational Resource:** Offers an accessible platform for learning about cryptography concepts.
*   **User-Friendly Interface:** Designed with a clean and intuitive interface for ease of use.
*   **In-Browser Functionality:** Operates entirely within the browser, eliminating the need for server-side processing.

## Prerequisites & Dependencies

Before you begin, ensure you have the following installed:

*   **Node.js:** (Version >= 16 recommended) - [https://nodejs.org/](https://nodejs.org/)
*   **npm** or **Yarn:** (npm is included with Node.js)

## Installation & Setup Instructions

Follow these steps to set up the project locally:

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/dustin04x/Cryptography-helper.git
    cd Cryptography-helper
    ```

2.  **Install dependencies:**

    Using npm:

    ```bash
    npm install
    ```

    or using Yarn:

    ```bash
    yarn install
    ```

3.  **Start the development server:**

    Using npm:

    ```bash
    npm run dev
    ```

    or using Yarn:

    ```bash
    yarn dev
    ```

    This will start the development server, usually on `http://localhost:5173/`.

## Project Structure

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

*   `.gitignore`: Specifies intentionally untracked files that Git should ignore.
*   `index.html`: The main HTML file that serves as the entry point for the application.
*   `package-lock.json` & `package.json`: Contain metadata about the project's dependencies.
*   `postcss.config.cjs`: Configuration file for PostCSS.
*   `src/`: Contains the source code for the React application.
*   `App.tsx`: The main application component.
*   `components/`: Houses individual React components.
*   `lib/`:  Utility functions
*   `main.tsx`: Entry point for the React application using Typescript.

## Usage Examples

Example usage snippets for key components:

*   **Caesar Cipher:**

    ```typescript
    import { caesarCipher } from './src/utils/crypto';

    const encryptedText = caesarCipher("Hello", 3); // Output: "Khoor"
    const decryptedText = caesarCipher("Khoor", -3); // Output: "Hello"
    ```

*   **Vigenère Cipher:**

    ```typescript
    import { vigenereCipher } from './src/utils/crypto';

    const encryptedText = vigenereCipher("attackatdawn", "lemon"); // Output: "lxfopvefrnhr"
    const decryptedText = vigenereCipher("lxfopvefrnhr", "lemon", false); // Output: "attackatdawn"
    ```

## Configuration Options

Currently, there are no specific configurable options. However, you can customize the appearance by modifying the `src/index.css` file, which uses Tailwind CSS.  Feel free to adjust the color scheme and other styling elements to your liking.

## Contributing Guidelines

We welcome contributions! To contribute to this project, please follow these steps:

1.  Fork the repository.
2.  Create a new branch with a descriptive name for your feature or bug fix.
3.  Make your changes and ensure they are well-documented.
4.  Test your changes thoroughly.
5.  Submit a pull request with a clear description of your changes.

## License Information

This project has no explicit license specified. All rights are reserved by the owner (dustin04x). Unless otherwise specified, code is not intended for distribution or modification.

## Acknowledgments

*   This project utilizes the following open-source libraries:
    *   React
    *   Tailwind CSS
    *   clsx
    *   tailwind-merge
