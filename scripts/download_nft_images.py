#!/usr/bin/env python3
"""
NFT Collection Image Downloader
Downloads all images from collection.json using mint addresses as filenames
"""

import json
import os
import requests
import time
from urllib.parse import urlparse
from pathlib import Path

def load_collection_data(json_file):
    """Load and parse the collection.json file"""
    try:
        with open(json_file, 'r') as f:
            data = json.load(f)
        return data
    except Exception as e:
        print(f"❌ Error loading {json_file}: {e}")
        return None

def get_file_extension_from_url(url):
    """Extract file extension from URL"""
    parsed = urlparse(url)
    path = parsed.path
    
    # Check for explicit extension in URL
    if '?ext=' in url:
        ext = url.split('?ext=')[1].split('&')[0]
        return f".{ext}"
    
    # Get extension from path
    _, ext = os.path.splitext(path)
    return ext if ext else '.png'  # Default to .png

def download_image(url, filepath, max_retries=3):
    """Download image with retry logic"""
    headers = {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
    }
    
    for attempt in range(max_retries):
        try:
            print(f"  📥 Downloading: {os.path.basename(filepath)}")
            
            response = requests.get(url, headers=headers, timeout=30)
            response.raise_for_status()
            
            # Write the image file
            with open(filepath, 'wb') as f:
                f.write(response.content)
            
            print(f"  ✅ Downloaded: {os.path.basename(filepath)} ({len(response.content)} bytes)")
            return True
            
        except requests.exceptions.RequestException as e:
            print(f"  ⚠️  Attempt {attempt + 1} failed: {e}")
            if attempt < max_retries - 1:
                time.sleep(2)  # Wait before retry
            else:
                print(f"  ❌ Failed to download after {max_retries} attempts")
                return False
    
    return False

def main():
    """Main function to download all NFT images"""
    print("🚀 Starting NFT Collection Image Download")
    print("=" * 50)
    
    # Configuration
    json_file = 'collection.json'
    download_dir = 'nft_images'
    
    # Create download directory
    Path(download_dir).mkdir(exist_ok=True)
    print(f"📁 Download directory: {download_dir}")
    
    # Load collection data
    print(f"📖 Loading collection data from {json_file}...")
    collection_data = load_collection_data(json_file)
    
    if not collection_data:
        return
    
    # Extract NFT items
    items = collection_data.get('result', {}).get('items', [])
    total_count = len(items)
    
    print(f"🎯 Found {total_count} NFTs in collection")
    print("=" * 50)
    
    # Download counters
    successful_downloads = 0
    failed_downloads = 0
    skipped_downloads = 0
    
    # Process each NFT
    for i, item in enumerate(items, 1):
        mint_address = item.get('id', '')
        image_url = item.get('content', {}).get('links', {}).get('image', '')
        nft_name = item.get('content', {}).get('metadata', {}).get('name', 'Unknown')
        
        print(f"\n[{i}/{total_count}] Processing: {nft_name}")
        print(f"  🔑 Mint: {mint_address}")
        
        if not mint_address or not image_url:
            print(f"  ⚠️  Missing mint address or image URL - skipping")
            skipped_downloads += 1
            continue
        
        # Determine file extension
        file_ext = get_file_extension_from_url(image_url)
        filename = f"{mint_address}{file_ext}"
        filepath = os.path.join(download_dir, filename)
        
        # Check if file already exists
        if os.path.exists(filepath):
            file_size = os.path.getsize(filepath)
            print(f"  ⏭️  Already exists: {filename} ({file_size} bytes)")
            successful_downloads += 1
            continue
        
        # Download the image
        if download_image(image_url, filepath):
            successful_downloads += 1
        else:
            failed_downloads += 1
        
        # Small delay to be respectful to servers
        time.sleep(0.5)
    
    # Final summary
    print("\n" + "=" * 50)
    print("📊 Download Summary:")
    print(f"  ✅ Successful: {successful_downloads}")
    print(f"  ❌ Failed: {failed_downloads}")
    print(f"  ⏭️  Skipped: {skipped_downloads}")
    print(f"  📊 Total: {total_count}")
    print(f"  📁 Location: {os.path.abspath(download_dir)}")
    
    if successful_downloads > 0:
        print(f"\n🎉 Successfully downloaded {successful_downloads} NFT images!")
    
    if failed_downloads > 0:
        print(f"\n⚠️  {failed_downloads} downloads failed - you may want to retry those")

if __name__ == "__main__":
    main()
