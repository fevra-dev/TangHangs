#!/bin/bash

# Simple progress checker for NFT downloads

echo "🎯 Tang Collection NFT Download Progress"
echo "========================================"

TOTAL_NFTS=250
DOWNLOADED=$(ls nft_images/ 2>/dev/null | wc -l | tr -d ' ')
PERCENTAGE=$((DOWNLOADED * 100 / TOTAL_NFTS))

echo "📊 Progress: $DOWNLOADED / $TOTAL_NFTS NFTs ($PERCENTAGE%)"

if ps aux | grep -q "download_nft_images.py" | grep -v grep; then
    echo "🔄 Status: Download in progress..."
else
    echo "✅ Status: Download completed!"
fi

echo ""
echo "📁 Sample downloaded files:"
ls nft_images/ 2>/dev/null | head -5

echo ""
echo "💾 Storage used:"
du -sh nft_images/ 2>/dev/null || echo "Directory not created yet"

echo ""
echo "To check progress again, run: ./check_progress.sh"
