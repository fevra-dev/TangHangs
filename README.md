# Tang Collection Landing Page

A minimalist, visually appealing landing page for the Tang NFT collection, featuring memes and custom animations.

## Features

- **Clean Design**: Minimalist layout with centered content
- **Custom Cursor**: Unique cursor implementation using `cursor_small.png`
- **Interactive Buttons**: Circular buttons with hover animations
- **GIF Animations**: Static PNG to animated GIF transitions on hover
- **Random Meme Backgrounds**: Dynamic meme images with 20% transparency
- **Responsive Design**: Optimized for desktop and mobile
- **Loading Screen**: Professional loading animation with `loading2.gif`
- **Professional Structure**: Organized folder structure for scalability

## File Structure

```
Tang_Landing/
├── index.html              # Main HTML structure
├── styles.css              # All styling and animations
├── script.js               # JavaScript functionality
├── README.md               # Project documentation
├── .gitignore              # Git ignore rules
├── assets/                 # Organized asset folders
│   ├── images/             # All button and UI images
│   │   ├── header.png      # Main banner image
│   │   ├── loading2.gif    # Loading screen animation
│   │   ├── token.png/gif   # Token button
│   │   ├── X.png/gif       # NFT button (X logo)
│   │   ├── radio.png/gif   # Artist button
│   │   └── meme_depot.png/gif # Depot button
│   ├── cursors/            # Cursor assets
│   │   ├── cursor.png      # Original cursor (1366x1366px)
│   │   └── cursor_small.png # Optimized cursor (32x32px)
│   └── icons/              # Site icons
│       └── favicon.svg     # Site favicon
├── memes/                  # Meme images for backgrounds
│   ├── image00001.png
│   ├── image00002.png
│   └── ... (82 total images)
├── scripts/                # Utility scripts
│   ├── download_nft_images.py # NFT image downloader
│   └── check_progress.sh   # Download progress checker
└── docs/                   # Documentation and data
    └── collection.json     # NFT collection metadata
```

## Button Links

- **Token**: https://x.com/MangTheTang
- **NFT**: https://x.com/TangHangs  
- **Artist**: https://x.com/0xRadi0
- **Depot**: https://memedepot.com/d/af4epa-my-depot

## Technical Details

- **Font**: Impact (system font)
- **Background**: #00ffea (cyan)
- **Custom Cursor**: 32x32px PNG
- **GIF Preloading**: Prevents flash on hover
- **Collision Detection**: Prevents overlapping backgrounds
- **Duplicate Prevention**: No duplicate images displayed
- **Smooth Animations**: 15-second fade-outs, 3-second fade-ins
- **Professional Structure**: Organized assets for maintainability

## Setup

1. Clone the repository: `git clone git@github.com/fevra-dev/TangHangs.git`
2. Navigate to the project directory: `cd TangHangs`
3. Ensure `memes/` folder contains all 82 images
4. Open `index.html` in a web browser
5. The page will automatically load with preloaded animations

## Development

- **Meme Images**: Add new images to `memes/` folder (image00083.png, etc.)
- **Button Images**: Update `assets/images/` for new button designs
- **Styling**: Modify `styles.css` for design changes
- **Functionality**: Update `script.js` for new features

## Browser Support

- Modern browsers with CSS3 and ES6 support
- Mobile responsive design
- Custom cursor support (fallback to default)

## Performance

- Optimized image loading with preloading
- Efficient collision detection algorithms
- Smooth 60fps animations
- Minimal JavaScript footprint
- Professional asset organization

## GitHub Repository

- **Repository**: https://github.com/fevra-dev/TangHangs
- **Owner**: fevra-dev
- **Clone URL**: `git@github.com:fevra-dev/TangHangs.git`