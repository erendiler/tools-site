export type ToolFAQ = { q: string; a: string };
export type ToolContentData = {
  title: string;
  intro: string;
  howTo: { name: string; steps: string[] };
  faq: ToolFAQ[];
  category: "DesignApplication" | "DeveloperApplication" | "UtilitiesApplication" | "BusinessApplication";
};

export const toolContent: Record<string, ToolContentData> = {
  favicon: {
    title: "Favicon Generator",
    intro: "Create a favicon for your website from any letter, emoji or uploaded image. Download a high-resolution PNG ready for your <link rel=\"icon\"> tag. No signup, no upload to a server — everything runs in your browser.",
    howTo: {
      name: "How to generate a favicon",
      steps: [
        "Type a letter or paste an emoji, or upload your logo image.",
        "Pick a background color and shape (rounded, square or circle).",
        "Click download to save the PNG file.",
        "Add <link rel=\"icon\" href=\"/favicon.png\" /> to your HTML head.",
      ],
    },
    faq: [
      { q: "Is this favicon generator free?", a: "Yes, ToolPit is 100% free and works in your browser. There are no limits and no signup is required." },
      { q: "What size favicon should I use?", a: "We recommend at least 512×512 px. Browsers automatically scale the icon down for the tab, bookmark or home screen." },
      { q: "Can I use an emoji as a favicon?", a: "Yes. Modern browsers render emoji glyphs perfectly. Pick one and ToolPit converts it to a PNG you can ship." },
    ],
    category: "DesignApplication",
  },
  "og-image": {
    title: "OG Image Generator",
    intro: "Design Open Graph images at the 1200×630 standard for Twitter, LinkedIn, Facebook and other social platforms. Pick a background, choose a gradient, add your title and download a ready-to-share PNG.",
    howTo: {
      name: "How to create an OG image",
      steps: [
        "Enter the title and subtitle that should appear on your social card.",
        "Choose a background color or gradient that matches your brand.",
        "Adjust the font weight and alignment in the live preview.",
        "Download the PNG and reference it in your <meta property=\"og:image\"> tag.",
      ],
    },
    faq: [
      { q: "What is the recommended OG image size?", a: "1200×630 pixels is the safe size for Facebook, LinkedIn, X (Twitter) and most other platforms. ToolPit exports exactly at this resolution." },
      { q: "Do I need a different image for Twitter?", a: "No, the 1200×630 image works as a summary_large_image Twitter card. Just declare both og:image and twitter:image meta tags pointing to it." },
      { q: "Where do I host the OG image?", a: "Upload it to your site (e.g. /og.png) or any public CDN. The URL must be absolute in the og:image meta tag." },
    ],
    category: "DesignApplication",
  },
  "css-gradient": {
    title: "CSS Gradient Generator",
    intro: "Build smooth, modern CSS gradients in seconds. Pick the type, angle and color stops, preview the result live, then copy the linear-gradient or radial-gradient declaration straight into your stylesheet.",
    howTo: {
      name: "How to build a CSS gradient",
      steps: [
        "Pick a gradient type — linear, radial or conic.",
        "Add and reorder color stops to shape the transition.",
        "Drag the angle dial to set the gradient direction.",
        "Copy the generated background CSS into your project.",
      ],
    },
    faq: [
      { q: "Can I use this gradient on a button?", a: "Yes. Use the generated background property on any element — buttons, hero sections, cards or backgrounds." },
      { q: "Does the gradient work on all browsers?", a: "linear-gradient, radial-gradient and conic-gradient are supported in every modern browser and gracefully fall back to your background color in older ones." },
      { q: "Can I export the gradient as an image?", a: "ToolPit focuses on CSS code so the gradient stays sharp at any size. To rasterize, screenshot the preview or use the Box Shadow / OG Image tools." },
    ],
    category: "DesignApplication",
  },
  "color-palette": {
    title: "Color Palette Extractor",
    intro: "Upload any photo, logo or screenshot and ToolPit extracts the dominant color palette in your browser. Copy hex codes instantly, drop them into Figma, Tailwind or your design system.",
    howTo: {
      name: "How to extract a color palette",
      steps: [
        "Drop an image or click upload — JPG, PNG and WebP work.",
        "ToolPit analyzes the pixels locally and lists the dominant swatches.",
        "Click any color chip to copy its hex value.",
        "Export the palette as JSON or Tailwind config for reuse.",
      ],
    },
    faq: [
      { q: "Does my image get uploaded to a server?", a: "No, the entire palette extraction runs in your browser. Your images never leave your device." },
      { q: "How many colors are extracted?", a: "ToolPit returns the 5–8 most dominant colors. You can usually map them to primary, secondary and accent roles in your brand." },
      { q: "Can I use these colors commercially?", a: "Yes. Hex codes are not copyrightable. Make sure you have the rights to the source image you uploaded." },
    ],
    category: "DesignApplication",
  },
  "box-shadow": {
    title: "Box Shadow Generator",
    intro: "Craft realistic CSS box-shadow effects without writing the syntax by hand. Tune offset, blur, spread, color and the inset flag — copy the production-ready declaration with one click.",
    howTo: {
      name: "How to generate a CSS box-shadow",
      steps: [
        "Slide the X and Y offset to position the shadow.",
        "Increase blur and spread until the shadow feels natural.",
        "Pick a shadow color and opacity — darker is rarely better.",
        "Copy the CSS and paste it into your component styles.",
      ],
    },
    faq: [
      { q: "Can I stack multiple shadows?", a: "Yes. CSS allows comma-separated shadow lists. Generate each shadow here, then concatenate them in your stylesheet." },
      { q: "What is the difference between inset and outset?", a: "Outset shadows render outside the element edge. Inset shadows render inside — useful for pressed buttons, wells and inputs." },
      { q: "Will box-shadow hurt performance?", a: "Static shadows are essentially free. Avoid animating blur or spread on hover — animate transform or opacity instead." },
    ],
    category: "DesignApplication",
  },
  "image-compressor": {
    title: "Image Compressor",
    intro: "Compress JPG, PNG and WebP images in your browser without losing visible quality. Reduce page weight, speed up Core Web Vitals and save storage — your originals never leave your device.",
    howTo: {
      name: "How to compress an image",
      steps: [
        "Drop one or more images into the upload area.",
        "Pick a quality target — 80% is the sweet spot for photos.",
        "Optionally convert to WebP for an extra 30% saving.",
        "Download the compressed file or all results as a zip.",
      ],
    },
    faq: [
      { q: "How much smaller will the file be?", a: "Typical savings are 50–80% for photos and 20–40% for icons. The compressor shows the exact before/after sizes." },
      { q: "Is image quality preserved?", a: "ToolPit uses smart lossy compression. At 80% quality, most photos look identical to the original on a screen." },
      { q: "Are my images uploaded anywhere?", a: "No. Compression runs entirely in your browser using the Canvas API. Files never touch a server." },
    ],
    category: "UtilitiesApplication",
  },
  "image-to-pdf": {
    title: "Images to PDF Converter",
    intro: "Combine JPG, PNG, HEIC and WebP images into a single PDF. Reorder pages with drag and drop, set page size and orientation, then download — everything runs locally for full privacy.",
    howTo: {
      name: "How to convert images to PDF",
      steps: [
        "Drag your photos or scans into the upload area.",
        "Reorder pages by dragging the thumbnails.",
        "Choose page size (A4 or Letter) and orientation.",
        "Click generate to download the merged PDF.",
      ],
    },
    faq: [
      { q: "Can I combine 50 photos into one PDF?", a: "Yes. ToolPit handles dozens of high-resolution images. Larger sets take a few seconds longer because everything is processed in-browser." },
      { q: "Does each image become a separate page?", a: "Yes, one image per page. Use the box-shadow or image compressor tools if you want to shrink them first." },
      { q: "Is HEIC supported?", a: "Yes. iPhone HEIC photos are decoded on the fly and embedded into the PDF as JPEG." },
    ],
    category: "UtilitiesApplication",
  },
  "pdf-to-word": {
    title: "PDF to Word Converter",
    intro: "Convert PDF documents into editable Word (.docx) files in your browser. Keep paragraphs, headings and basic formatting — perfect for quick edits to invoices, contracts and reports.",
    howTo: {
      name: "How to convert PDF to Word",
      steps: [
        "Upload your PDF or drag it into the converter.",
        "ToolPit extracts text and structure locally.",
        "Preview the result and tweak page selection if needed.",
        "Download the .docx file and open it in Word, Pages or Google Docs.",
      ],
    },
    faq: [
      { q: "Will the Word file look identical to the PDF?", a: "Text and headings are preserved. Complex multi-column layouts, embedded fonts or scanned PDFs may need light cleanup after conversion." },
      { q: "Does scanned PDF text get extracted?", a: "Only if the PDF already contains a text layer. Pure image scans require OCR, which is not yet built into this tool." },
      { q: "Is my document uploaded?", a: "No, conversion runs in your browser. Your PDF never leaves your device." },
    ],
    category: "BusinessApplication",
  },
  "pdf-to-excel": {
    title: "PDF to Excel Converter",
    intro: "Pull tables and tabular data out of PDF files straight into Excel (.xlsx). Great for bank statements, invoices and reports — no upload, no signup, runs entirely in your browser.",
    howTo: {
      name: "How to convert PDF to Excel",
      steps: [
        "Upload the PDF that contains a table.",
        "ToolPit detects rows and columns automatically.",
        "Adjust the detected table boundaries if needed.",
        "Download the result as a .xlsx file ready for Excel or Google Sheets.",
      ],
    },
    faq: [
      { q: "Can ToolPit extract scanned tables?", a: "It works best on digital PDFs with a text layer. Scanned tables need OCR which is not part of this tool yet." },
      { q: "Will all my pages be processed?", a: "Yes. Each PDF page becomes a separate sheet in the resulting workbook." },
      { q: "How accurate is the table detection?", a: "Clean, ruled tables convert near-perfectly. Free-form layouts may need a quick cleanup in Excel after export." },
    ],
    category: "BusinessApplication",
  },
  invoice: {
    title: "Invoice Generator",
    intro: "Create professional invoices in minutes. Add your logo, line items, tax rates and bank details, then download a clean PDF ready to send to your client. All data stays in your browser.",
    howTo: {
      name: "How to create an invoice",
      steps: [
        "Fill in your business and client details.",
        "Add line items with quantity, rate and optional tax.",
        "Pick a template and accent color that matches your brand.",
        "Click download to save the invoice as a PDF.",
      ],
    },
    faq: [
      { q: "Can I save the invoice template?", a: "Yes. Your inputs are remembered in your browser, so the next invoice starts from your last details." },
      { q: "Does ToolPit calculate tax for me?", a: "Yes. Enter a tax percentage per line item and the generator sums the subtotal, tax and grand total automatically." },
      { q: "Is the invoice legally valid?", a: "ToolPit produces a clean PDF, but legal requirements depend on your country. Check the mandatory fields for your jurisdiction (e.g. VAT ID)." },
    ],
    category: "BusinessApplication",
  },
  "json-formatter": {
    title: "JSON Formatter & Validator",
    intro: "Format, validate, and minify JSON with one click. Paste any payload, pick an indent size, and ToolPit prints a clean, color-coded tree — no signup, no server upload, everything runs locally.",
    howTo: {
      name: "How to format JSON",
      steps: [
        "Paste your JSON into the input box.",
        "Pick 2-space or 4-space indent (or minify to one line).",
        "ToolPit highlights syntax errors with line numbers.",
        "Copy the formatted JSON back into your code.",
      ],
    },
    faq: [
      { q: "Will my JSON be uploaded?", a: "No. Formatting happens entirely in your browser. Your payload — including secrets, tokens and PII — never leaves your device." },
      { q: "Can it format very large JSON files?", a: "Yes. ToolPit comfortably handles files up to several megabytes. For multi-gigabyte streams use a CLI tool like jq." },
      { q: "Does it validate against a JSON Schema?", a: "ToolPit checks syntax (matching braces, valid types). For full JSON Schema validation, paste the schema into a dedicated validator." },
    ],
    category: "DeveloperApplication",
  },
  base64: {
    title: "Base64 Encoder & Decoder",
    intro: "Encode text or files to Base64 and decode Base64 strings back to plain text — instantly, in your browser. Handy for data URLs, basic auth headers, JWT payload inspection and email attachments.",
    howTo: {
      name: "How to encode or decode Base64",
      steps: [
        "Pick encode or decode mode.",
        "Paste your text into the input area.",
        "ToolPit converts in real time as you type.",
        "Copy the result to your clipboard with one click.",
      ],
    },
    faq: [
      { q: "What is Base64 used for?", a: "Base64 turns binary data into ASCII text so it can travel safely through systems that only support text — emails, JSON, HTTP headers and data URLs." },
      { q: "Does Base64 encrypt my data?", a: "No. Base64 is encoding, not encryption. Anyone can decode it instantly. Never use it to hide passwords or secrets." },
      { q: "Can I Base64-encode an image?", a: "Yes. Upload an image and ToolPit returns a data:image/...;base64,... string you can drop straight into HTML or CSS." },
    ],
    category: "DeveloperApplication",
  },
  "jwt-decoder": {
    title: "JWT Decoder",
    intro: "Paste a JSON Web Token and instantly inspect the header, payload and expiry. ToolPit decodes claims locally — perfect for debugging auth flows without sending tokens to a third party.",
    howTo: {
      name: "How to decode a JWT",
      steps: [
        "Paste your JWT into the input field.",
        "ToolPit splits header, payload and signature.",
        "Inspect claims like iss, sub, exp and iat in plain JSON.",
        "Check the expiry countdown to see if the token is still valid.",
      ],
    },
    faq: [
      { q: "Is my JWT sent anywhere?", a: "No. Decoding is done with JavaScript in your browser. Your token never leaves the page — safe for production secrets." },
      { q: "Can ToolPit verify the signature?", a: "ToolPit decodes the token but does not verify the signature. Signature verification requires the issuer's secret or public key, which should never leave your server." },
      { q: "Why is my JWT marked as expired?", a: "The exp claim is in the past relative to your system clock. Either refresh the token or check that your clock is synced." },
    ],
    category: "DeveloperApplication",
  },
  "regex-tester": {
    title: "Regex Tester",
    intro: "Test regular expressions with live match highlighting, capture groups and replace previews. ToolPit supports the JavaScript regex flavor — exactly what your frontend and Node.js will run.",
    howTo: {
      name: "How to test a regex",
      steps: [
        "Type your pattern and flags (g, i, m, s, u).",
        "Paste sample text into the test area.",
        "ToolPit highlights every match and capture group inline.",
        "Use the replace tab to preview replacements with $1, $2 backreferences.",
      ],
    },
    faq: [
      { q: "Which regex flavor does this support?", a: "JavaScript's ECMAScript regex — what runs in browsers and Node.js. Lookbehinds, unicode classes and named groups are supported." },
      { q: "Why is my regex not matching multiline text?", a: "Add the m flag for multiline mode. The ^ and $ anchors will then match at line boundaries instead of the whole string." },
      { q: "How do I escape special characters?", a: "Prefix them with a backslash: \\., \\?, \\(, \\). Inside character classes only ], \\, ^ and - need escaping." },
    ],
    category: "DeveloperApplication",
  },
  "cron-builder": {
    title: "Cron Expression Builder",
    intro: "Build cron expressions visually and read them back in plain English. Pick minute, hour, day and month — ToolPit shows the next 5 fire times so you know it will run when you expect.",
    howTo: {
      name: "How to build a cron expression",
      steps: [
        "Pick a preset (every hour, daily, weekly) or build a custom expression.",
        "Adjust the minute, hour, day and month fields.",
        "Read the plain-English description to verify the schedule.",
        "Copy the cron string into your crontab, GitHub Actions or scheduler.",
      ],
    },
    faq: [
      { q: "Does this support 5-field or 6-field cron?", a: "Both. Use 5 fields for classic Unix cron (minute hour day month weekday) or 6 for Quartz-style with seconds." },
      { q: "What does the asterisk mean?", a: "An asterisk (*) means 'every value in this field'. So 0 * * * * runs at minute 0 of every hour, every day." },
      { q: "Does the schedule respect timezones?", a: "Cron itself has no timezone — it runs in the server's local time. Configure the timezone in your scheduler (GitHub Actions, AWS, Kubernetes) explicitly." },
    ],
    category: "DeveloperApplication",
  },
  "number-base": {
    title: "Number Base Converter",
    intro: "Convert numbers between Binary, Octal, Decimal and Hexadecimal in one place. Type in any base — ToolPit updates the others live, ideal for debugging permissions, color codes and bit math.",
    howTo: {
      name: "How to convert number bases",
      steps: [
        "Type a number into any of the four bases.",
        "ToolPit updates the other three immediately.",
        "Use the copy buttons to grab the value in the base you need.",
        "Toggle uppercase for hex output if your codebase requires it.",
      ],
    },
    faq: [
      { q: "Can it convert negative numbers?", a: "Yes. ToolPit supports signed decimals; the other bases show their two's-complement representation for negative values." },
      { q: "Why does my color code start with #?", a: "Hex color codes use base 16 with a leading #. Strip the # before converting — e.g. FF8800 → 16,744,448 in decimal." },
      { q: "What is the largest number it handles?", a: "Up to 2^53 - 1 (the safe JavaScript integer). For bigger values use BigInt in code." },
    ],
    category: "DeveloperApplication",
  },
  timestamp: {
    title: "Unix Timestamp Converter",
    intro: "Convert Unix timestamps to readable dates and back. Supports seconds, milliseconds and ISO 8601. Live current timestamp clock included — great for log files, API debugging and date math.",
    howTo: {
      name: "How to convert a timestamp",
      steps: [
        "Paste a Unix timestamp (in seconds or milliseconds).",
        "ToolPit shows the date in your local time and UTC.",
        "Or pick a date — ToolPit returns the matching Unix timestamp.",
        "Copy the value in the format your API expects.",
      ],
    },
    faq: [
      { q: "Seconds or milliseconds?", a: "Most Unix tools use seconds since 1970-01-01 UTC. JavaScript's Date.now() and many APIs use milliseconds. ToolPit auto-detects from the number length." },
      { q: "What timezone is the result in?", a: "ToolPit displays both your local time and UTC. Unix timestamps are timezone-agnostic — they always represent the same instant globally." },
      { q: "Does it handle the year 2038 bug?", a: "Yes. ToolPit uses 64-bit math, so timestamps after the 32-bit overflow (January 19, 2038) are fully supported." },
    ],
    category: "DeveloperApplication",
  },
  "word-counter": {
    title: "Word Counter",
    intro: "Count words, characters, sentences, paragraphs and estimated reading time as you type. Free, no signup — ideal for essays, articles, social posts and content briefs.",
    howTo: {
      name: "How to count words",
      steps: [
        "Paste or type text into the editor.",
        "ToolPit shows live stats: words, chars, sentences, paragraphs.",
        "Check the reading time estimate (200 wpm by default).",
        "Use the keyword density panel to find overused words.",
      ],
    },
    faq: [
      { q: "How is reading time calculated?", a: "ToolPit assumes an average reading speed of 200 words per minute. Adjust the slider if your audience reads faster or slower." },
      { q: "Are spaces counted as characters?", a: "Yes — both with-spaces and without-spaces counters are shown so you can match the exact limit your CMS or editor expects." },
      { q: "Is my text saved anywhere?", a: "No. The text never leaves your browser. Refresh the page and it is gone." },
    ],
    category: "UtilitiesApplication",
  },
  "text-case": {
    title: "Text Case Converter",
    intro: "Switch between camelCase, snake_case, kebab-case, PascalCase, UPPERCASE, lowercase, Title Case, Sentence case and more — instantly. A must-have for renaming variables and cleaning headlines.",
    howTo: {
      name: "How to convert text case",
      steps: [
        "Paste your text or variable name.",
        "Click any of the case buttons to convert.",
        "Copy the result to your clipboard.",
        "Chain conversions (e.g. snake_case → camelCase) with one click.",
      ],
    },
    faq: [
      { q: "Does it preserve numbers and accents?", a: "Yes. Numbers are kept in place; accented characters are preserved in case conversions where they apply (Title Case, sentence case)." },
      { q: "What is the difference between Title and Sentence case?", a: "Title Case capitalizes every word (Style Guide Rules). Sentence case capitalizes only the first letter and proper nouns (Style guide rules)." },
      { q: "Can I convert an entire paragraph?", a: "Yes — the converter works on any length of text, from a single variable to a full article." },
    ],
    category: "UtilitiesApplication",
  },
  "lorem-ipsum": {
    title: "Lorem Ipsum Generator",
    intro: "Generate placeholder text for designs, wireframes and dev mocks. Pick paragraphs, sentences or words and decide whether to start with the classic 'Lorem ipsum dolor sit amet' opener.",
    howTo: {
      name: "How to generate lorem ipsum",
      steps: [
        "Pick the unit — paragraphs, sentences or words.",
        "Choose how many you need.",
        "Toggle whether to start with the classic Lorem ipsum opener.",
        "Copy the generated text into your design or HTML.",
      ],
    },
    faq: [
      { q: "Why use lorem ipsum instead of real text?", a: "Latin filler shifts focus from the wording to layout and typography — perfect during the design phase before real copy is ready." },
      { q: "Is the text random every time?", a: "Yes, sentences are shuffled from the classic Cicero corpus, so each generation feels slightly different while keeping the recognizable Latin look." },
      { q: "Can I use it for production?", a: "Lorem ipsum is for placeholders only. Replace it before launch — search engines and screen readers can't make sense of Latin filler." },
    ],
    category: "UtilitiesApplication",
  },
  "markdown-preview": {
    title: "Markdown Preview",
    intro: "Write Markdown on the left, see the rendered HTML on the right. Supports GitHub Flavored Markdown — tables, task lists, code blocks with syntax highlighting and inline math.",
    howTo: {
      name: "How to preview Markdown",
      steps: [
        "Type or paste Markdown into the left pane.",
        "ToolPit renders HTML live on the right.",
        "Switch the preview between GitHub and minimal style.",
        "Copy the rendered HTML or export the file when done.",
      ],
    },
    faq: [
      { q: "Which Markdown flavor is supported?", a: "GitHub Flavored Markdown (GFM): tables, strikethrough, task lists, fenced code blocks, autolinks and emojis." },
      { q: "Can I export the result as HTML?", a: "Yes. Click the HTML button to copy the rendered markup, ready for blogs, emails or static sites." },
      { q: "Is my draft saved?", a: "Your text is kept in browser storage only, so refreshing the tab keeps it but nothing is uploaded to a server." },
    ],
    category: "DeveloperApplication",
  },
  "qr-code": {
    title: "QR Code Generator",
    intro: "Generate QR codes for URLs, plain text, WiFi credentials or vCards. Customize size and error correction level, then download a crisp PNG ready for print, packaging or business cards.",
    howTo: {
      name: "How to generate a QR code",
      steps: [
        "Pick the content type — URL, text, WiFi or vCard.",
        "Fill in the fields. ToolPit redraws the QR as you type.",
        "Adjust size and error-correction level (L, M, Q or H).",
        "Download the QR code as PNG.",
      ],
    },
    faq: [
      { q: "Which error-correction level should I pick?", a: "Use M for screens, Q or H if the code will be printed or partially obscured by a logo. Higher levels survive more damage." },
      { q: "Can I add a logo in the center?", a: "Yes, with level H you can safely cover up to 25% of the QR area with a logo without breaking scans." },
      { q: "Are QR codes free to use?", a: "Yes. The QR Code spec is open and royalty-free for any use — personal, commercial or print." },
    ],
    category: "UtilitiesApplication",
  },
  "unit-converter": {
    title: "Unit Converter",
    intro: "Convert length, weight, temperature, speed, area, volume and more across metric and imperial systems. ToolPit updates every unit live as you type — handy for travel, recipes and engineering.",
    howTo: {
      name: "How to convert units",
      steps: [
        "Pick a category — length, weight, temperature, speed, etc.",
        "Type a value into any unit field.",
        "ToolPit converts to every other unit in real time.",
        "Copy the result you need.",
      ],
    },
    faq: [
      { q: "Which categories are supported?", a: "Length, weight/mass, temperature, speed, area, volume, time and digital storage. New categories ship monthly." },
      { q: "Is it accurate to engineering precision?", a: "ToolPit uses double-precision floats and SI base unit definitions. For engineering, copy the exact decimal — no rounding is forced in the UI." },
      { q: "Does it support currencies?", a: "Not yet. Currency exchange rates change live and need a daily API. ToolPit focuses on physical unit conversions where the math is constant." },
    ],
    category: "UtilitiesApplication",
  },
  "password-generator": {
    title: "Password Generator",
    intro: "Generate strong, random passwords with the character classes you choose — letters, numbers, symbols. ToolPit generates them locally using the secure Web Crypto API, so the password never leaves your browser.",
    howTo: {
      name: "How to generate a strong password",
      steps: [
        "Pick a length — 16+ is recommended for accounts that matter.",
        "Toggle uppercase, lowercase, numbers and symbols.",
        "Generate one or a batch of passwords at once.",
        "Copy and store the result in your password manager immediately.",
      ],
    },
    faq: [
      { q: "Are these passwords cryptographically random?", a: "Yes. ToolPit uses window.crypto.getRandomValues, the same secure random source your browser uses for HTTPS." },
      { q: "Is the password sent anywhere?", a: "Never. Generation runs locally — the password exists only in your browser memory until you copy it." },
      { q: "How long should my password be?", a: "16 characters is a solid baseline. For master passwords or root accounts, 20+ characters with mixed classes makes brute-force impractical." },
    ],
    category: "UtilitiesApplication",
  },
  "email-signature": {
    title: "Email Signature Generator",
    intro: "Build a professional HTML email signature for Gmail, Outlook or Apple Mail. Add your photo, role, social links and brand colors — then paste the rendered HTML into your mail client.",
    howTo: {
      name: "How to create an email signature",
      steps: [
        "Fill in your name, role, company and contact info.",
        "Upload a photo or logo and pick brand colors.",
        "Pick a template that fits your brand voice.",
        "Copy the HTML and paste it into your mail client's signature settings.",
      ],
    },
    faq: [
      { q: "Will the signature look right in Outlook?", a: "Yes. ToolPit generates Outlook-safe table-based HTML — no flexbox, no CSS grid, no broken rendering on Windows desktop Outlook." },
      { q: "Where do I paste the signature in Gmail?", a: "Gmail → Settings (cog) → See all settings → General → Signature. Paste the formatted HTML there and save." },
      { q: "Can I include social media icons?", a: "Yes. Add LinkedIn, Twitter/X, GitHub or website URLs — ToolPit renders them as compact icon links." },
    ],
    category: "BusinessApplication",
  },
  vcard: {
    title: "vCard Generator",
    intro: "Create a digital business card (.vcf) with a scannable QR code. Share your contact details in one tap — recipients add you to their phonebook without typing a single field.",
    howTo: {
      name: "How to create a vCard",
      steps: [
        "Fill in name, phone, email, company and website.",
        "Add a photo and social links if you want.",
        "ToolPit generates a QR code that opens the contact card.",
        "Download the .vcf file or print the QR for your business card.",
      ],
    },
    faq: [
      { q: "Does the QR work on iPhone and Android?", a: "Yes. Both platforms recognize the vCard MIME format and prompt 'Add to Contacts' when the QR is scanned." },
      { q: "Can I include a profile photo?", a: "Yes. The photo is embedded into the .vcf file and shows up in the recipient's contact card." },
      { q: "Is the vCard file standard?", a: "Yes. ToolPit emits vCard 3.0, compatible with Apple Contacts, Google Contacts, Outlook and every major CRM." },
    ],
    category: "BusinessApplication",
  },
};
