# Certificate Verification System

## Overview
The Certificate Verification System allows students to verify and download their workshop certificates using a unique certificate ID format. The system integrates with Google Drive API to fetch certificates dynamically.

## Certificate ID Format
The system uses the format: `GPGMMYYYY{3-digit number}`

**Example:** `GPG092025001`
- `GPG` - Institution prefix
- `09` - Month (September)
- `2025` - Year
- `001` - 3-digit unique identifier

## Google Drive Folder Structure
The system expects the following folder structure in Google Drive:

```
Your Root Folder (YOUR_FOLDER_ID)
├── 01/ (January)
│   ├── 2024/
│   │   ├── GPG012024001.pdf
│   │   ├── GPG012024002.pdf
│   │   └── ...
│   ├── 2025/
│   │   ├── GPG012025001.pdf
│   │   └── ...
│   └── ...
├── 02/ (February)
│   ├── 2024/
│   ├── 2025/
│   └── ...
├── ...
├── 09/ (September)
│   ├── 2024/
│   ├── 2025/
│   │   ├── GPG092025001.pdf
│   │   ├── GPG092025002.pdf
│   │   └── ...
│   └── ...
└── 12/ (December)
    ├── 2024/
    ├── 2025/
    └── ...
```

## Features

### 1. Dynamic Certificate Lookup
- Real-time search through Google Drive folders
- Hierarchical folder traversal (Month → Year → Certificate)
- Error handling for missing certificates

### 2. User Interface
- **Form Validation**: Real-time validation with visual feedback
- **Loading States**: Smooth loading animations
- **Success/Error States**: Clear feedback for different scenarios
- **Responsive Design**: Mobile-first approach

### 3. Download Options
- **Direct Download**: One-click certificate download
- **QR Code**: Generate QR code for mobile access
- **Preview**: Certificate preview before download

### 4. Dynamic Features
- **Particle Background**: Subtle animated background
- **Confetti Effect**: Celebration animation on successful verification
- **Typing Animation**: Dynamic placeholder text
- **Real-time Validation**: Instant feedback on input

## Technical Implementation

### Files Created
1. `/co-curricular/certificate-verification/index.html` - Main page
2. `/assets/css/pages/certificate-verification.css` - Styling
3. `/assets/js/pages/certificate-verification.js` - JavaScript functionality
4. `/co-curricular/index.html` - Updated co-curricular activities page
5. `/assets/css/pages/co-curricular.css` - Co-curricular page styling

### API Integration
- Uses Google Drive API v3
- API Key: `AIzaSyBd34cP4KHFKN0WyNNiqhlQ2HSM8j2tD_E`
- Root Folder ID: `1vXU0cCwrYplFhmrGLu3MYuf1fVJeylWQ`

### Dependencies
- Bootstrap 5.3.0
- Font Awesome 6.0.0
- QRCode.js (CDN)
- Google Drive API v3

## Setup Instructions

### 1. Google Drive Setup
1. Create month folders (01, 02, ..., 12) in your root folder
2. Create year folders (2024, 2025, etc.) inside each month folder
3. Upload certificates with appropriate naming in the year folders
4. Set folder permissions to "Anyone with the link can view"

### 2. Certificate Naming
- Use the certificate ID as the filename
- Example: `GPG092025001.pdf`
- Supported formats: PDF, PNG, JPG, JPEG

### 3. Testing
1. Navigate to `/co-curricular/certificate-verification/`
2. Enter a test certificate ID
3. Verify the system works correctly

## Customization

### Changing API Key
Update the `API_KEY` in `/assets/js/pages/certificate-verification.js`:
```javascript
const CONFIG = {
    API_KEY: 'YOUR_NEW_API_KEY',
    // ...
};
```

### Changing Root Folder
Update the `ROOT_FOLDER_ID` in the same file:
```javascript
const CONFIG = {
    ROOT_FOLDER_ID: 'YOUR_FOLDER_ID',
    // ...
};
```

### Styling
Modify `/assets/css/pages/certificate-verification.css` to change:
- Colors and themes
- Animations
- Layout and spacing
- Responsive breakpoints

## Security Considerations

1. **API Key**: The API key is exposed in client-side code. Consider using a proxy server for production.
2. **Folder Access**: Ensure the Google Drive folder is set to "Anyone with the link can view"
3. **File Permissions**: Certificates should be publicly accessible for download

## Browser Support
- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## Performance Optimizations
- Lazy loading of images
- Debounced input validation
- Efficient DOM manipulation
- Canvas-based animations

## Troubleshooting

### Common Issues
1. **Certificate Not Found**: Check folder structure and naming
2. **API Errors**: Verify API key and folder permissions
3. **Download Issues**: Ensure files are publicly accessible
4. **QR Code Not Working**: Check QRCode.js library loading

### Debug Mode
Enable console logging by opening browser developer tools to see detailed error messages.

## Future Enhancements
- Certificate preview modal
- Batch verification
- Certificate analytics
- Email notifications
- Digital signatures
- Certificate templates
