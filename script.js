/**
 * Tang Collection - Simplified JavaScript
 * Handles basic interactions for the centered landing page
 */

// ===============================
// CONFIGURATION & CONSTANTS
// ===============================

const CONFIG = {
  // Animation settings
  HOVER_SCALE: 1.05,
  CLICK_SCALE: 1.02,
  
  // Random NFT background system tuning
  MIN_VISIBLE_MS: 25000, // Minimum on-screen lifetime before removal is allowed
  OVERLAP_BUFFER_PX: 80, // Extra spacing between NFTs when resolving overlaps
  OVERLAP_RESOLVE_INTERVAL_MS: 1200, // How often to scan and resolve overlaps
  
  // Feature flags
  FEATURES: {
    ANALYTICS: false,
    SOUND_EFFECTS: false
  }
};

// ===============================
// UTILITY FUNCTIONS
// ===============================

/**
 * Add ripple effect to button clicks
 * @param {Event} event - Click event
 */
const addRippleEffect = (event) => {
  const button = event.currentTarget;
  const rect = button.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height);
  const x = event.clientX - rect.left - size / 2;
  const y = event.clientY - rect.top - size / 2;
  
  const ripple = document.createElement('div');
  ripple.style.cssText = `
    position: absolute;
    width: ${size}px;
    height: ${size}px;
    left: ${x}px;
    top: ${y}px;
    background: rgba(255, 255, 255, 0.5);
    border-radius: 50%;
    transform: scale(0);
    animation: ripple 0.6s linear;
    pointer-events: none;
  `;
  
  button.appendChild(ripple);
  
  // Remove ripple after animation
  setTimeout(() => {
    if (ripple.parentNode) {
      ripple.parentNode.removeChild(ripple);
    }
  }, 600);
};

/**
 * Track button clicks for analytics (placeholder)
 * @param {string} buttonType - Type of button clicked
 * @param {string} url - Destination URL
 */
const trackButtonClick = (buttonType, url) => {
  console.log(`Button clicked: ${buttonType} -> ${url}`);
  
  // In a real implementation, this would send analytics data
  if (CONFIG.FEATURES.ANALYTICS) {
    // gtag('event', 'click', {
    //   event_category: 'external_link',
    //   event_label: buttonType,
    //   value: url
    // });
  }
};

// ===============================
// BUTTON INTERACTION HANDLERS
// ===============================

/**
 * Simple approach: Just keep the GIF running but let it cycle naturally
 * This creates a more fluid experience than trying to capture frames
 */
const handleGifTransition = (element, gifUrl, pngUrl, shouldAnimate) => {
  if (shouldAnimate) {
    // Switch to animated GIF
    element.style.backgroundImage = `url('${gifUrl}')`;
  } else {
    // For now, just let it continue playing the GIF instead of reverting to PNG
    // This creates a more fluid experience
    element.style.backgroundImage = `url('${gifUrl}')`;
  }
};

/**
 * Setup seamless button interactions with frame persistence
 */
const setupCircularButtons = () => {
  const buttons = document.querySelectorAll('.circular-btn');
  
  buttons.forEach(button => {
    // Get button type from class name
    const buttonType = Array.from(button.classList)
      .find(cls => cls.endsWith('-btn'))
      ?.replace('-btn', '') || 'unknown';
    
    // Track animation state
    let isAnimating = false;
    let isPaused = false;
    
            // Get GIF and PNG URLs based on button type
            const getImageUrls = () => {
              const baseMap = {
                'token': { gif: 'token.gif', png: 'token.png' },
                'nft': { gif: 'X.gif', png: 'X.png' },
                'artist': { gif: 'radio.gif', png: 'radio.png' },
                'depot': { gif: 'meme_depot.gif', png: 'meme_depot.png' }
              };
              return baseMap[buttonType] || { gif: null, png: null };
            };
    
    const { gif: gifUrl, png: pngUrl } = getImageUrls();
    
    // Click handler
    button.addEventListener('click', (e) => {
      addRippleEffect(e);
      trackButtonClick(buttonType, button.href);
    });
    
    // Enhanced hover effects - keep GIF running for fluid experience
    button.addEventListener('mouseenter', () => {
      if (!gifUrl) return;
      
      button.style.transform = `translateY(-4px) scale(${CONFIG.HOVER_SCALE})`;
      
      // Switch to GIF (or keep it if already animating)
      if (!isAnimating) {
        handleGifTransition(button, gifUrl, pngUrl, true);
        isAnimating = true;
      }
    });
    
    button.addEventListener('mouseleave', () => {
      button.style.transform = 'translateY(0) scale(1)';
      
      // Keep the GIF playing for fluid experience
      // Don't revert to PNG - this eliminates the jarring transition
      if (isAnimating && gifUrl) {
        // Just let the GIF continue playing
        // This creates a much smoother experience
        handleGifTransition(button, gifUrl, pngUrl, false);
      }
    });
    
    // Touch feedback for mobile
    button.addEventListener('touchstart', () => {
      if (!gifUrl) return;
      
      button.style.transform = `translateY(-2px) scale(${CONFIG.CLICK_SCALE})`;
      handleGifTransition(button, gifUrl, pngUrl, true);
      isAnimating = true;
    }, { passive: true });
    
    button.addEventListener('touchend', () => {
      setTimeout(() => {
        button.style.transform = 'translateY(0) scale(1)';
        
        // Keep GIF playing for fluid experience
        if (isAnimating && gifUrl) {
          handleGifTransition(button, gifUrl, pngUrl, false);
        }
      }, 150);
    }, { passive: true });
    
    // Keyboard navigation
    button.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        addRippleEffect(e);
        button.click();
      }
    });
  });
};

// ===============================
// ANIMATIONS & EFFECTS
// ===============================

/**
 * Setup entrance animations
 */
const setupEntranceAnimations = () => {
  const brandSection = document.querySelector('.brand-section');
  const linksSection = document.querySelector('.links-section');
  const footerCredit = document.querySelector('.footer-credit');
  
  // Stagger the animations
  setTimeout(() => {
    if (brandSection) brandSection.style.opacity = '1';
  }, 100);
  
  setTimeout(() => {
    if (linksSection) linksSection.style.opacity = '1';
  }, 300);
  
  setTimeout(() => {
    if (footerCredit) footerCredit.style.opacity = '1';
  }, 500);
};

/**
 * Add floating animation to buttons
 */
const addFloatingAnimation = () => {
  const buttons = document.querySelectorAll('.circular-btn');
  
  buttons.forEach((button, index) => {
    // Add subtle floating effect with different timing for each button
    const delay = index * 0.5; // Stagger the animations
    const duration = 3 + (index * 0.5); // Slightly different durations
    
    button.style.animation = `float ${duration}s ease-in-out ${delay}s infinite`;
  });
};

/**
 * Setup background particle effect (optional)
 */
const setupBackgroundEffect = () => {
  // Placeholder for future background effects
  // Could add subtle particles or geometric shapes
  console.log('Background effects ready for implementation');
};

// ===============================
// RESPONSIVE UTILITIES
// ===============================

/**
 * Handle orientation changes on mobile
 */
const handleOrientationChange = () => {
  // Slight delay to allow for proper viewport calculation
  setTimeout(() => {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  }, 100);
};

/**
 * Setup responsive event listeners
 */
const setupResponsiveEvents = () => {
  // Handle orientation changes
  window.addEventListener('orientationchange', handleOrientationChange);
  window.addEventListener('resize', handleOrientationChange);
  
  // Initial calculation
  handleOrientationChange();
};

// ===============================
// ACCESSIBILITY ENHANCEMENTS
// ===============================

/**
 * Setup accessibility features
 */
const setupAccessibility = () => {
  // Add skip link for screen readers
  const skipLink = document.createElement('a');
  skipLink.href = '#main-content';
  skipLink.textContent = 'Skip to main content';
  skipLink.className = 'skip-link';
  skipLink.style.cssText = `
    position: absolute;
    top: -100px;
    left: 6px;
    background: var(--primary-text);
    color: var(--primary-bg);
    padding: 8px;
    text-decoration: none;
    border-radius: 4px;
    z-index: 1000;
    transition: top 0.3s;
    opacity: 0;
    pointer-events: none;
  `;
  
  skipLink.addEventListener('focus', () => {
    skipLink.style.top = '6px';
    skipLink.style.opacity = '1';
    skipLink.style.pointerEvents = 'all';
  });
  
  skipLink.addEventListener('blur', () => {
    skipLink.style.top = '-100px';
    skipLink.style.opacity = '0';
    skipLink.style.pointerEvents = 'none';
  });
  
  document.body.insertBefore(skipLink, document.body.firstChild);
  
  // Add main content id
  const mainContainer = document.querySelector('.main-container');
  if (mainContainer) {
    mainContainer.id = 'main-content';
  }
  
  // Announce page load to screen readers
  const announcement = document.createElement('div');
  announcement.setAttribute('aria-live', 'polite');
  announcement.setAttribute('aria-atomic', 'true');
  announcement.className = 'sr-only';
  announcement.textContent = 'Tang Collection page loaded';
  document.body.appendChild(announcement);
};

// ===============================
// RANDOM NFT BACKGROUND SYSTEM
// ===============================

/**
 * Generate list of meme image filenames from the memes folder
 * Uses all meme images from your collection (image00001.png to image00082.png)
 */
const generateNFTFilenames = () => {
  // Generate all meme filenames from image00001.png to image00082.png
  const memeFilenames = [];
  for (let i = 1; i <= 82; i++) {
    const filename = `image${String(i).padStart(5, '0')}.png`;
    memeFilenames.push(filename);
  }
  
  return memeFilenames;
};

/**
 * Track active NFT positions to prevent overlap
 */
const activeNFTPositions = [];

/**
 * Track currently visible NFT images to prevent duplicates
 */
const activeNFTImages = new Set();

/**
 * Check if a position overlaps with existing NFTs (improved collision detection)
 */
const checkCollision = (newPos, newSize, buffer = 100) => {
  return activeNFTPositions.some(pos => {
    // Calculate actual element boundaries
    const element1 = {
      left: newPos.x - newSize / 2,
      right: newPos.x + newSize / 2,
      top: newPos.y - newSize / 2,
      bottom: newPos.y + newSize / 2
    };
    
    const element2 = {
      left: pos.x - pos.size / 2,
      right: pos.x + pos.size / 2,
      top: pos.y - pos.size / 2,
      bottom: pos.y + pos.size / 2
    };
    
    // Check for rectangular overlap with generous buffer
    const horizontalOverlap = (element1.left - buffer) < (element2.right + buffer) && 
                             (element1.right + buffer) > (element2.left - buffer);
    const verticalOverlap = (element1.top - buffer) < (element2.bottom + buffer) && 
                           (element1.bottom + buffer) > (element2.top - buffer);
    
    return horizontalOverlap && verticalOverlap;
  });
};

/**
 * Check if position overlaps with main content area (title, subtitle, buttons)
 */
const isInMainContentArea = (x, y, elementSize) => {
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;
  
  // Define protected main content zone - much larger and more conservative
  let contentZone;
  
  if (viewportWidth <= 768) {
    // Mobile: protect almost all of the center area
    contentZone = {
      x: viewportWidth * 0.05,
      y: viewportHeight * 0.15,
      width: viewportWidth * 0.9,
      height: viewportHeight * 0.7
    };
  } else {
    // Desktop: protect much more of the center area
    contentZone = {
      x: viewportWidth * 0.15,
      y: viewportHeight * 0.05,
      width: viewportWidth * 0.7,
      height: viewportHeight * 0.9
    };
  }
  
  // Check if NFT would overlap with content area (including element size)
  const nftRight = x + elementSize;
  const nftBottom = y + elementSize;
  const contentRight = contentZone.x + contentZone.width;
  const contentBottom = contentZone.y + contentZone.height;
  
  const overlapsHorizontally = x < contentRight && nftRight > contentZone.x;
  const overlapsVertically = y < contentBottom && nftBottom > contentZone.y;
  
  return overlapsHorizontally && overlapsVertically;
};

/**
 * Find a safe position that doesn't overlap with existing NFTs or main content
 */
const findSafePosition = (elementSize) => {
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;
  const maxAttempts = 30; // Increased attempts due to more restrictive placement
  
  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    const x = Math.random() * (viewportWidth - elementSize - 40) + 20; // 20px edge buffer
    const y = Math.random() * (viewportHeight - elementSize - 40) + 20;
    
    // Check if position is in main content area
    if (isInMainContentArea(x, y, elementSize)) {
      continue;
    }
    
    // Check for collisions with existing NFTs
    const position = { x: x + elementSize / 2, y: y + elementSize / 2, size: elementSize };
    
    if (!checkCollision(position, elementSize)) {
      activeNFTPositions.push(position);
      return { x, y, position };
    }
  }
  
  // If no safe position found, use edge zones only with more spacing
  const edgeZones = [];
  const buffer = 50;
  
  // Top edge (avoiding center)
  if (viewportHeight > 200) {
    edgeZones.push({
      x: buffer,
      y: buffer,
      width: viewportWidth * 0.15,
      height: 100
    });
    edgeZones.push({
      x: viewportWidth * 0.85,
      y: buffer,
      width: viewportWidth * 0.15 - buffer,
      height: 100
    });
  }
  
  // Bottom edge (avoiding center)
  if (viewportHeight > 300) {
    edgeZones.push({
      x: buffer,
      y: viewportHeight - 120,
      width: viewportWidth * 0.15,
      height: 100
    });
    edgeZones.push({
      x: viewportWidth * 0.85,
      y: viewportHeight - 120,
      width: viewportWidth * 0.15 - buffer,
      height: 100
    });
  }
  
  // Left edge
  edgeZones.push({
    x: buffer,
    y: viewportHeight * 0.2,
    width: 100,
    height: viewportHeight * 0.6
  });
  
  // Right edge  
  edgeZones.push({
    x: viewportWidth - 120,
    y: viewportHeight * 0.2,
    width: 100,
    height: viewportHeight * 0.6
  });
  
  // Try to place in edge zones
  if (edgeZones.length > 0) {
    const randomZone = edgeZones[Math.floor(Math.random() * edgeZones.length)];
    const x = randomZone.x + Math.random() * (randomZone.width - elementSize);
    const y = randomZone.y + Math.random() * (randomZone.height - elementSize);
    
    const fallbackPos = { x: x + elementSize / 2, y: y + elementSize / 2, size: elementSize };
    activeNFTPositions.push(fallbackPos);
    
    return { x, y, position: fallbackPos };
  }
  
  // Ultimate fallback - far corners only
  const farCorners = [
    { x: 10, y: 10 },
    { x: viewportWidth - elementSize - 10, y: 10 },
    { x: 10, y: viewportHeight - elementSize - 10 },
    { x: viewportWidth - elementSize - 10, y: viewportHeight - elementSize - 10 }
  ];
  
  const randomCorner = farCorners[Math.floor(Math.random() * farCorners.length)];
  const ultimateFallback = { x: randomCorner.x + elementSize / 2, y: randomCorner.y + elementSize / 2, size: elementSize };
  activeNFTPositions.push(ultimateFallback);
  
  return { x: randomCorner.x, y: randomCorner.y, position: ultimateFallback };
};

/**
 * Get available NFT filenames that aren't currently displayed
 */
const getAvailableNFTFilenames = () => {
  const allFilenames = generateNFTFilenames();
  return allFilenames.filter(filename => !activeNFTImages.has(filename));
};

/**
 * Create a random NFT background element with collision and duplicate detection
 */
const createRandomNFTElement = () => {
  const availableFilenames = getAvailableNFTFilenames();
  
  // If no unique images available, wait for some to disappear
  if (availableFilenames.length === 0) {
    console.log('🎨 All NFT images currently displayed, waiting for variety...');
    return null;
  }
  
  const randomFilename = availableFilenames[Math.floor(Math.random() * availableFilenames.length)];
  
  // Add to active images set immediately to prevent duplicates
  activeNFTImages.add(randomFilename);
  
  // Create container element
  const element = document.createElement('div');
  element.className = 'random-nft-bg fade-in';
  // Track creation timestamp for minimum lifetime enforcement
  element.createdAt = Date.now();
  
  // Add random size class with weighted distribution (more small/medium)
  const sizeWeights = ['size-small', 'size-small', 'size-medium', 'size-medium', 'size-large'];
  const randomSize = sizeWeights[Math.floor(Math.random() * sizeWeights.length)];
  element.classList.add(randomSize);
  
  // Determine actual size for collision detection
  const sizeMap = {
    'size-small': window.innerWidth <= 768 ? 60 : 80,
    'size-medium': window.innerWidth <= 768 ? 80 : 120,
    'size-large': window.innerWidth <= 768 ? 100 : 160
  };
  const elementSize = sizeMap[randomSize];
  
  // Add floating animation (70% chance for more movement)
  if (Math.random() > 0.3) {
    element.classList.add('floating');
  }
  
  // Create image element
  const img = document.createElement('img');
  img.src = `memes/${randomFilename}`;
  img.alt = 'Random Meme from Tang Collection';
  img.loading = 'lazy';
  
  // Handle image load error gracefully
  img.onerror = () => {
    console.warn(`Failed to load meme image: ${randomFilename}`);
    // Remove from active images set
    activeNFTImages.delete(randomFilename);
    element.remove();
  };
  
  element.appendChild(img);
  
  // Find safe position without overlaps
  const { x, y, position } = findSafePosition(elementSize);
  
  element.style.left = `${x}px`;
  element.style.top = `${y}px`;
  
  // Store references for cleanup
  element.positionRef = position;
  element.imageFilename = randomFilename;
  element.elementSize = elementSize;
  
  // No animation delay to prevent flashing
  element.style.animationDelay = '0s';
  
  // Let the CSS animation handle the transition completely
  // No manual visibility toggle to prevent conflicts
  
  return element;
};

/**
 * Remove NFT element with ultra smooth animation and complete cleanup
 */
const removeNFTElement = (element) => {
  if (!element || !element.parentNode) return;

  // Enforce minimum visible lifetime
  const now = Date.now();
  const createdAt = element.createdAt || now;
  const elapsed = now - createdAt;
  if (elapsed < CONFIG.MIN_VISIBLE_MS) {
    const delay = CONFIG.MIN_VISIBLE_MS - elapsed;
    setTimeout(() => removeNFTElement(element), delay + 50);
    return;
  }
  
  // Very long and dramatic fade out animation - 15 seconds
  element.classList.remove('fade-in');
  element.classList.add('fade-out');
  element.style.animation = 'simpleSmoothFadeOut 15s ease-out forwards';
  
  // Wait for the full 15-second dramatic animation to complete
  setTimeout(() => {
    if (element.parentNode) {
      // Clean up position tracking only after element is removed from view
      if (element.positionRef) {
        const index = activeNFTPositions.indexOf(element.positionRef);
        if (index > -1) {
          activeNFTPositions.splice(index, 1);
        }
      }
      // Clean up image tracking to allow reuse
      if (element.imageFilename) {
        activeNFTImages.delete(element.imageFilename);
      }
      element.remove();
    }
  }, 15000);
};

/**
 * Add random NFT background elements with increased frequency and count
 */
const addRandomNFTBackgrounds = () => {
  const minElements = 4; // Reduced minimum for smoother transitions
  const targetElements = 5; // Reduced target number of NFTs
  const maxElements = 6; // Reduced maximum to 6 as requested
  const currentElements = document.querySelectorAll('.random-nft-bg').length;
  
  console.log(`🎨 Current NFTs: ${currentElements}, Target: ${targetElements}, Max: ${maxElements}`);
  
  if (currentElements >= maxElements) {
    console.log('🎨 NFT limit reached, checking for turnover opportunity...');
    // Instead of completely blocking, occasionally force turnover for variety
    if (Math.random() > 0.7) { // 30% chance to force turnover
      console.log('🎨 Forcing immediate turnover for variety');
      forceNFTTurnover();
    }
    return; // Don't add more if we're at the limit
  }
  
  // Calculate how many to add based on current count and targets
  let elementsToAdd;
  if (currentElements < minElements) {
    // Urgently add to reach minimum
    elementsToAdd = minElements - currentElements;
    console.log(`🎨 Below minimum! Adding ${elementsToAdd} NFTs urgently`);
  } else if (currentElements < targetElements) {
    // Add towards target
    elementsToAdd = targetElements - currentElements;
    console.log(`🎨 Below target, adding ${elementsToAdd} NFTs`);
  } else {
    // More frequently add bonus NFTs for dynamic feel
    elementsToAdd = Math.random() > 0.5 ? 1 : 0; // 50% chance (increased from 30%)
    if (elementsToAdd > 0) {
      console.log('🎨 Adding bonus NFT for variety');
    }
  }
  
  // Add multiple NFTs more quickly for higher frequency
  for (let i = 0; i < elementsToAdd && currentElements + i < maxElements; i++) {
    setTimeout(() => {
      const element = createRandomNFTElement();
      
      // Only proceed if we got a valid unique element
      if (element) {
        document.body.appendChild(element);
        const newCount = document.querySelectorAll('.random-nft-bg').length;
        console.log(`🎨 Added NFT background (${newCount}/${maxElements})`);
        
        // Reduced lifetime for faster natural turnover
        const baseLifetime = 20000; // 20 seconds base (reduced for faster turnover)
        const variableLifetime = Math.random() * 25000; // +0-25 seconds
        const lifetime = baseLifetime + variableLifetime; // 20-45 seconds
        
        setTimeout(() => {
          // Check if removing this would go below minimum
          const currentCount = document.querySelectorAll('.random-nft-bg').length;
          if (currentCount > minElements) {
            // If we're at high capacity (5-6 images), start a new one before removing this one
            if (currentCount >= 5) {
              console.log(`🎨 Overlapping transition: starting new NFT before removing old one`);
              const newElement = createRandomNFTElement();
              if (newElement) {
                document.body.appendChild(newElement);
                
                // Set up lifecycle for the new NFT
                const newLifetime = 20000 + (Math.random() * 25000);
                setTimeout(() => {
                  const futureCount = document.querySelectorAll('.random-nft-bg').length;
                  if (futureCount > minElements) {
                    removeNFTElement(newElement);
                  } else {
                    setTimeout(() => removeNFTElement(newElement), 15000);
                  }
                }, newLifetime);
              }
              
              // Remove the old one with a delay for smooth overlap
              setTimeout(() => {
                removeNFTElement(element);
                console.log(`🎨 Completed overlapping transition`);
              }, 1000);
            } else {
              removeNFTElement(element);
              console.log(`🎨 Removed NFT (${currentCount - 1} remaining)`);
            }
          } else {
            // Delay removal to maintain minimum
            console.log(`🎨 Delaying removal to maintain minimum count`);
            setTimeout(() => removeNFTElement(element), 15000); // Extra 15 seconds (increased from 10)
          }
        }, lifetime);
      } else {
        console.log('🎨 No unique NFT available, waiting for variety...');
      }
      
      }, i * 1200); // Slower stagger time for calmer appearance (doubled from 600ms)
  }
};

/**
 * Monitor and maintain minimum NFT count
 */
const maintainMinimumNFTs = () => {
  const minElements = 4; // Updated to match new minimum
  const currentElements = document.querySelectorAll('.random-nft-bg').length;
  
  if (currentElements < minElements) {
    console.log(`🎨 Maintenance check: Only ${currentElements} NFTs, adding more to reach minimum`);
    addRandomNFTBackgrounds();
  }
};

/**
 * Continuously resolve overlaps by nudging colliding elements apart
 */
const resolveOverlaps = () => {
  const elements = Array.from(document.querySelectorAll('.random-nft-bg'));
  for (let i = 0; i < elements.length; i++) {
    const a = elements[i];
    const aRect = a.getBoundingClientRect();
    for (let j = i + 1; j < elements.length; j++) {
      const b = elements[j];
      const bRect = b.getBoundingClientRect();
      const buffer = CONFIG.OVERLAP_BUFFER_PX;
      const overlapX = Math.max(0, Math.min(aRect.right + buffer, bRect.right + buffer) - Math.max(aRect.left - buffer, bRect.left - buffer));
      const overlapY = Math.max(0, Math.min(aRect.bottom + buffer, bRect.bottom + buffer) - Math.max(aRect.top - buffer, bRect.top - buffer));
      if (overlapX > 0 && overlapY > 0) {
        // Compute minimal nudge vector
        const moveX = overlapX / 2 + 2; // small extra to avoid jitter
        const moveY = overlapY / 2 + 2;
        // Apply nudges in opposite directions, constrained to viewport
        const ax = Math.max(0, Math.min(window.innerWidth - aRect.width, a.offsetLeft - moveX));
        const ay = Math.max(0, Math.min(window.innerHeight - aRect.height, a.offsetTop - moveY));
        const bx = Math.max(0, Math.min(window.innerWidth - bRect.width, b.offsetLeft + moveX));
        const by = Math.max(0, Math.min(window.innerHeight - bRect.height, b.offsetTop + moveY));
        a.style.left = `${ax}px`;
        a.style.top = `${ay}px`;
        b.style.left = `${bx}px`;
        b.style.top = `${by}px`;
        // Update tracking positions if present
        if (a.positionRef && typeof a.elementSize === 'number') {
          a.positionRef.x = ax + a.elementSize / 2;
          a.positionRef.y = ay + a.elementSize / 2;
        }
        if (b.positionRef && typeof b.elementSize === 'number') {
          b.positionRef.x = bx + b.elementSize / 2;
          b.positionRef.y = by + b.elementSize / 2;
        }
      }
    }
  }
};

/**
 * Force turnover with overlapping fade transitions
 */
const forceNFTTurnover = () => {
  const existingNFTs = document.querySelectorAll('.random-nft-bg');
  if (existingNFTs.length === 0) return;
  
  // Remove a random NFT to make room for a new one
  const randomIndex = Math.floor(Math.random() * existingNFTs.length);
  const nftToRemove = existingNFTs[randomIndex];
  
  console.log(`🔄 Smooth turnover: overlapping fade transition`);
  
  // Start the new NFT immediately while the old one begins fading
  const newElement = createRandomNFTElement();
  if (newElement) {
    document.body.appendChild(newElement);
    console.log(`🎨 New NFT fading in during turnover`);
    
    // Set up the lifecycle for the new NFT
    const baseLifetime = 20000;
    const variableLifetime = Math.random() * 25000;
    const lifetime = baseLifetime + variableLifetime;
    
    setTimeout(() => {
      const currentCount = document.querySelectorAll('.random-nft-bg').length;
      if (currentCount > 4) {
        removeNFTElement(newElement);
      } else {
        setTimeout(() => removeNFTElement(newElement), 15000);
      }
    }, lifetime);
  }
  
  // Start removing the old NFT with a slight delay for overlap
  setTimeout(() => {
    removeNFTElement(nftToRemove);
  }, 500); // Half-second delay for smooth overlap
};

/**
 * Clean up all NFT backgrounds and tracking arrays
 */
const cleanupAllNFTs = () => {
  const existingNFTs = document.querySelectorAll('.random-nft-bg');
  existingNFTs.forEach(nft => removeNFTElement(nft));
  activeNFTPositions.length = 0; // Clear position array
  activeNFTImages.clear(); // Clear image tracking set
};

/**
 * Start the high-frequency NFT background system
 */
const initRandomNFTBackgrounds = () => {
  console.log('🎨 Initializing high-frequency NFT backgrounds (5-6 images)...');
  
  // Slower initial setup - half the speed
  setTimeout(() => {
    addRandomNFTBackgrounds(); // First wave
  }, 1000);

  // Second wave slower
  setTimeout(() => {
    addRandomNFTBackgrounds(); // Second wave
  }, 3000);

  // Third wave to reach target
  setTimeout(() => {
    addRandomNFTBackgrounds(); // Third wave
  }, 6000);

  // Fourth wave to ensure full population
  setTimeout(() => {
    addRandomNFTBackgrounds(); // Fourth wave
  }, 10000);
  
  // Slower maintenance checks - half speed
  setInterval(() => {
    maintainMinimumNFTs();
  }, 10000); // Check every 10 seconds (reduced frequency)
  
  // Continuous passive overlap resolver
  setInterval(() => {
    resolveOverlaps();
  }, CONFIG.OVERLAP_RESOLVE_INTERVAL_MS);
  
  // Slower periodic additions for calmer feel
  setInterval(() => {
    addRandomNFTBackgrounds();
  }, 24000); // Every 24 seconds (doubled from 12)
  
  // Additional variety timer - slower
  setInterval(() => {
    const currentCount = document.querySelectorAll('.random-nft-bg').length;
    if (currentCount < 6) { // Add more if we have room (updated to max 6)
      if (Math.random() > 0.6) { // 40% chance every 16 seconds
        addRandomNFTBackgrounds();
      }
    }
  }, 16000); // Doubled from 8 seconds
  
  // Slower turnover system when at max capacity
  setInterval(() => {
    const currentCount = document.querySelectorAll('.random-nft-bg').length;
    if (currentCount >= 6) { // When at max capacity
      forceNFTTurnover(); // Force turnover every 7 seconds
    }
  }, 7000); // Doubled from 3.5 seconds for calmer variety
  
  // Additional slower turnover for gentle dynamism
  setInterval(() => {
    const currentCount = document.querySelectorAll('.random-nft-bg').length;
    if (currentCount >= 5) { // Even when almost at capacity
      if (Math.random() > 0.6) { // 40% chance every 8 seconds
        console.log('🎨 Gentle turnover triggered for variety');
        forceNFTTurnover();
      }
    }
  }, 8000); // Doubled from 4 seconds
  
  // Backup maintenance check with updated thresholds - slower
  setInterval(() => {
    const currentCount = document.querySelectorAll('.random-nft-bg').length;
    console.log(`🎨 Health check: ${currentCount} NFTs currently active`);
    if (currentCount < 3) { // Updated threshold for new limits
      console.log('🎨 Critical: NFT count low, emergency replenishment!');
      addRandomNFTBackgrounds();
    }
  }, 20000); // Every 20 seconds (doubled from 10)
  
  // Add NFTs on user interaction with slower, calmer logic
  let interactionCooldown = false;
  document.addEventListener('click', () => {
    if (!interactionCooldown) {
      setTimeout(() => {
        const currentCount = document.querySelectorAll('.random-nft-bg').length;
        if (currentCount < 6) { // Updated threshold to max 6
          addRandomNFTBackgrounds();
        }
      }, 1000); // Doubled delay from 500ms
      interactionCooldown = true;
      setTimeout(() => interactionCooldown = false, 6000); // 6 second cooldown (doubled)
    }
  });
  
  // Handle window resize - clean up and restart slowly
  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      console.log('🔄 Window resized, cleaning up NFT positions...');
      cleanupAllNFTs();
      // Slower restart after resize to match the calmer pace
      setTimeout(addRandomNFTBackgrounds, 1000);
      setTimeout(addRandomNFTBackgrounds, 3000);
      setTimeout(addRandomNFTBackgrounds, 5000);
    }, 2000); // Doubled from 1000ms
  });
};

// ===============================
// IMAGE PRELOADING
// ===============================

/**
 * Enhanced GIF preloading with cache warming and verification
 */
const preloadGifAnimations = () => {
  const gifImages = [
    'assets/images/token.gif',
    'assets/images/X.gif', 
    'assets/images/radio.gif',
    'assets/images/meme_depot.gif'
  ];
  
  console.log('🎬 Enhanced GIF preloading started...');
  
  // Create multiple preload strategies for maximum reliability
  const promises = gifImages.map(imageSrc => {
    return new Promise((resolve) => {
      let loadedCount = 0;
      const targetLoads = 2; // Load multiple times to ensure caching
      
      const markAsLoaded = () => {
        loadedCount++;
        if (loadedCount >= targetLoads) {
          console.log(`✅ Fully cached: ${imageSrc}`);
          resolve(imageSrc);
        }
      };
      
      // Method 1: Traditional Image object preload
      const img1 = new Image();
      img1.crossOrigin = 'anonymous'; // Ensure proper caching
      img1.onload = markAsLoaded;
      img1.onerror = () => {
        console.warn(`⚠️ Method 1 failed for: ${imageSrc}`);
        markAsLoaded(); // Still count it to prevent hanging
      };
      img1.src = imageSrc;
      
      // Method 2: Fetch with explicit cache instruction
      fetch(imageSrc, { 
        method: 'GET',
        cache: 'force-cache',
        mode: 'no-cors'
      })
      .then(() => {
        console.log(`📦 Fetch cached: ${imageSrc}`);
        markAsLoaded();
      })
      .catch(() => {
        console.warn(`⚠️ Fetch failed for: ${imageSrc}`);
        markAsLoaded(); // Still count it
      });
      
      // Fallback timeout to prevent hanging
      setTimeout(() => {
        if (loadedCount < targetLoads) {
          console.log(`⏰ Timeout fallback for: ${imageSrc}`);
          resolve(imageSrc);
        }
      }, 5000); // 5 second timeout
    });
  });
  
  return Promise.all(promises).then(() => {
    // Additional cache warming: create invisible elements with background images
    return warmCacheWithBackgroundImages();
  });
};

/**
 * Create invisible elements with background images to ensure browser cache warming
 */
const warmCacheWithBackgroundImages = () => {
  return new Promise((resolve) => {
    const gifImages = ['token.gif', 'X.gif', 'radio.gif', 'meme_depot.gif'];
    const cacheWarmer = document.createElement('div');
    cacheWarmer.style.cssText = `
      position: absolute;
      top: -9999px;
      left: -9999px;
      width: 1px;
      height: 1px;
      opacity: 0;
      pointer-events: none;
    `;
    
    gifImages.forEach((gif, index) => {
      const warmerDiv = document.createElement('div');
      warmerDiv.style.cssText = `
        width: 100px;
        height: 100px;
        background-image: url('${gif}');
        background-size: contain;
        background-repeat: no-repeat;
        background-position: center;
      `;
      cacheWarmer.appendChild(warmerDiv);
    });
    
    document.body.appendChild(cacheWarmer);
    
    // Let the browser process the background images
    setTimeout(() => {
      console.log('🔥 Cache warmed with background images');
      // Keep the cache warmer for a moment, then remove
      setTimeout(() => {
        if (cacheWarmer.parentNode) {
          cacheWarmer.remove();
        }
        resolve();
      }, 1000);
    }, 200);
  });
};

/**
 * Show subtle loading state during preloading
 */
const showLoadingState = () => {
  // Temporarily disable button interactions during preloading
  const buttons = document.querySelectorAll('.circular-btn');
  buttons.forEach(btn => {
    btn.style.pointerEvents = 'none';
    btn.style.opacity = '0.7';
    btn.setAttribute('data-preloading', 'true');
  });
  
  console.log('🔒 Buttons disabled during preloading...');
};

/**
 * Hide loading state and enable full interactions
 */
const hideLoadingState = () => {
  // Re-enable button interactions after preloading
  const buttons = document.querySelectorAll('.circular-btn[data-preloading="true"]');
  buttons.forEach(btn => {
    btn.style.pointerEvents = '';
    btn.style.opacity = '';
    btn.removeAttribute('data-preloading');
  });
  
  console.log('🔓 Buttons fully enabled with preloaded assets!');
};

/**
 * Initial loading overlay control (shows loading2.gif for ~1–2s)
 */
const showInitialLoadingOverlay = () => {
  const overlay = document.getElementById('loading-overlay');
  if (!overlay) return;
  overlay.classList.remove('hidden');
  overlay.style.display = 'flex';
};

const hideInitialLoadingOverlay = () => {
  const overlay = document.getElementById('loading-overlay');
  if (!overlay) return;
  // Ensure minimum visible time between 1–2 seconds
  const minMs = 1000 + Math.floor(Math.random() * 600); // 1000–1600ms
  setTimeout(() => {
    overlay.classList.add('hidden');
    setTimeout(() => {
      overlay.style.display = 'none';
    }, 450);
  }, minMs);
};

// ===============================
// PERFORMANCE MONITORING
// ===============================

/**
 * Basic performance monitoring
 */
const monitorPerformance = () => {
  // Log page load time
  window.addEventListener('load', () => {
    const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
    console.log(`Page load time: ${loadTime}ms`);
    
    // Performance budget check (aim for under 1 second)
    if (loadTime > 1000) {
      console.warn('Page load time exceeds 1 second');
    }
  });
  
  // Monitor button click responsiveness
  let clickStartTime;
  document.addEventListener('mousedown', () => {
    clickStartTime = performance.now();
  });
  
  document.addEventListener('click', () => {
    if (clickStartTime) {
      const clickTime = performance.now() - clickStartTime;
      if (clickTime > 100) {
        console.warn(`Slow click response: ${clickTime.toFixed(2)}ms`);
      }
    }
  });
};

// ===============================
// ERROR HANDLING
// ===============================

/**
 * Global error handler
 */
const setupErrorHandling = () => {
  window.addEventListener('error', (event) => {
    console.error('JavaScript error:', event.error);
    // In production, send to error tracking service
  });
  
  window.addEventListener('unhandledrejection', (event) => {
    console.error('Unhandled promise rejection:', event.reason);
    // In production, send to error tracking service
  });
};

// ===============================
// MAIN INITIALIZATION
// ===============================

/**
 * Main application initialization
 */
const initApp = () => {
  console.log('Initializing Tang Collection Landing Page...');
  
  try {
    // Show loading state
    console.log('🔄 Preparing page components...');
    showLoadingState();
    showInitialLoadingOverlay();
    
    // Preload animations BEFORE setting up interactions
    preloadGifAnimations().then(() => {
      console.log('🎬 All GIF animations fully cached! Enabling interactions...');
      
      // Only setup button interactions after GIFs are preloaded
      setupCircularButtons();
      
      // Other functionality can proceed
      setupAccessibility();
      setupResponsiveEvents();
      
      // Visual enhancements
      setupEntranceAnimations();
      
      // Hide loading state
      hideLoadingState();
      hideInitialLoadingOverlay();
      
      console.log('✅ Page fully initialized with preloaded assets!');
    }).catch((error) => {
      console.warn('⚠️ Preloading failed, but continuing with setup:', error);
      // Fallback: setup anyway but with potential flash
      setupCircularButtons();
      setupAccessibility();
      setupResponsiveEvents();
      setupEntranceAnimations();
      hideLoadingState();
      hideInitialLoadingOverlay();
    });
    
    // NFT background system can start independently
    initRandomNFTBackgrounds();
    // addFloatingAnimation(); // Uncomment for floating effect
    
    // Performance and monitoring
    monitorPerformance();
    setupErrorHandling();
    
    console.log('✅ Tang Collection initialized successfully!');
    
  } catch (error) {
    console.error('❌ Error during initialization:', error);
  }
};

// ===============================
// EVENT LISTENERS & DOM READY
// ===============================

/**
 * DOM Content Loaded handler
 */
document.addEventListener('DOMContentLoaded', initApp);

/**
 * Add CSS animations via JavaScript
 */
const addDynamicAnimations = () => {
  const style = document.createElement('style');
  style.textContent = `
    /* Ripple animation */
    @keyframes ripple {
      to {
        transform: scale(4);
        opacity: 0;
      }
    }
    
    /* Floating animation */
    @keyframes float {
      0%, 100% {
        transform: translateY(0px);
      }
      50% {
        transform: translateY(-10px);
      }
    }
    
    /* Screen reader only styles */
    .sr-only {
      position: absolute;
      width: 1px;
      height: 1px;
      padding: 0;
      margin: -1px;
      overflow: hidden;
      clip: rect(0, 0, 0, 0);
      white-space: nowrap;
      border: 0;
    }
    
    /* Enhanced focus styles */
    .skip-link:focus {
      top: 6px !important;
    }
    
    /* Initial state for animated elements */
    .brand-section,
    .links-section,
    .footer-credit {
      opacity: 0;
      transition: opacity 0.5s ease-out;
    }
  `;
  
  document.head.appendChild(style);
};

// Add animations when script loads
addDynamicAnimations();

// ===============================
// EXPORT FOR MODULE SYSTEMS
// ===============================

/**
 * Export for potential module usage
 */
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    CONFIG,
    setupCircularButtons,
    addRippleEffect,
    trackButtonClick
  };
}

// Global namespace
window.TangCollection = {
  CONFIG,
  setupCircularButtons,
  addRippleEffect,
  trackButtonClick
};

console.log('🚀 Tang Collection script loaded!');

/* End of script.js */