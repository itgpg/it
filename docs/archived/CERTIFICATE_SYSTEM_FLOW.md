# Certificate Verification System Flow

## System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                    Certificate Verification System              │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌─────────────────┐    ┌─────────────────┐    ┌─────────────┐ │
│  │   User Input    │───▶│  Validation     │───▶│  API Call   │ │
│  │  GPGMMYYYY{3}   │    │  & Formatting   │    │  to Drive   │ │
│  └─────────────────┘    └─────────────────┘    └─────────────┘ │
│           │                       │                    │        │
│           ▼                       ▼                    ▼        │
│  ┌─────────────────┐    ┌─────────────────┐    ┌─────────────┐ │
│  │  Real-time      │    │  Error Handling │    │  Folder     │ │
│  │  Validation     │    │  & User Feedback│    │  Traversal  │ │
│  └─────────────────┘    └─────────────────┘    └─────────────┘ │
│           │                       │                    │        │
│           ▼                       ▼                    ▼        │
│  ┌─────────────────┐    ┌─────────────────┐    ┌─────────────┐ │
│  │  Success State  │    │  Error State    │    │  Certificate│ │
│  │  with Confetti  │    │  with Help      │    │  Found      │ │
│  └─────────────────┘    └─────────────────┘    └─────────────┘ │
│           │                       │                    │        │
│           ▼                       ▼                    ▼        │
│  ┌─────────────────┐    ┌─────────────────┐    ┌─────────────┐ │
│  │  Download       │    │  Try Again      │    │  QR Code    │ │
│  │  Options        │    │  Button         │    │  Generation │ │
│  └─────────────────┘    └─────────────────┘    └─────────────┘ │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

## Google Drive Folder Structure

```
Your Root Folder (YOUR_FOLDER_ID)
│
├── 01/ (January)
│   ├── 2024/
│   │   ├── GPG012024001.pdf
│   │   ├── GPG012024002.pdf
│   │   └── ...
│   ├── 2025/
│   │   ├── GPG012025001.pdf
│   │   └── ...
│   └── ...
│
├── 02/ (February)
│   ├── 2024/
│   ├── 2025/
│   └── ...
│
├── ...
│
├── 09/ (September)
│   ├── 2024/
│   ├── 2025/
│   │   ├── GPG092025001.pdf
│   │   ├── GPG092025002.pdf
│   │   └── ...
│   └── ...
│
└── 12/ (December)
    ├── 2024/
    ├── 2025/
    └── ...
```

## Certificate ID Parsing

```
Certificate ID: GPG092025001
│
├── GPG (Institution Prefix)
├── 09 (Month - September)
├── 2025 (Year)
└── 001 (3-digit Unique ID)

Search Path:
1. Find "09" folder in root
2. Find "2025" folder in 09
3. Find "GPG092025001" file in 2025
```

## Dynamic Features

### 1. Real-time Validation
```
User Types: "GPG092025"
│
├── Length < 11: "Enter complete certificate ID"
├── Length = 11: Check format
│   ├── Valid: "Valid format" ✓
│   └── Invalid: "Invalid format" ✗
└── Length > 11: "Invalid format" ✗
```

### 2. Loading States
```
Form Submit
│
├── Show Loading Spinner
├── Disable Submit Button
├── Call Google Drive API
│   ├── Success: Show Certificate Found
│   └── Error: Show Error State
└── Re-enable Submit Button
```

### 3. Success Animation
```
Certificate Found
│
├── Show Success Card
├── Trigger Confetti Effect
├── Enable Download Buttons
└── Generate QR Code (on demand)
```

## Error Handling

### 1. Invalid Format
- Real-time validation feedback
- Visual input highlighting
- Help text with examples

### 2. Certificate Not Found
- Clear error message
- Possible reasons listed
- Try again button

### 3. API Errors
- Network error handling
- Fallback error state
- Retry mechanism

### 4. Download Issues
- Multiple download options
- QR code fallback
- Error logging

## Security & Performance

### Security
- Client-side validation
- API key exposure (consider proxy)
- Public folder access only

### Performance
- Lazy loading
- Debounced validation
- Efficient DOM updates
- Canvas-based animations

### Browser Support
- Modern browsers (ES6+)
- Mobile responsive
- Touch-friendly interface
