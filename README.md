# Valentine's Day Proposal Website 💕

A beautiful, responsive website designed for a romantic Valentine's Day proposal. This website features romantic animations, interactive elements, and a heartfelt proposal experience.

## Features

### 🎨 Beautiful Design
- **Romantic gradient backgrounds** with purple and pink themes
- **Floating heart animations** that create a dreamy atmosphere
- **Smooth transitions** and micro-interactions throughout
- **Modern typography** using Dancing Script and Poppins fonts

### 📱 Fully Responsive
- **Mobile-first design** that works perfectly on all devices
- **Touch gestures** for mobile navigation (swipe up/down)
- **Adaptive layouts** that adjust to different screen sizes
- **Optimized performance** for smooth animations

### ✨ Interactive Elements
- **Loading screen** with animated heart loader
- **Typewriter effect** for romantic messages
- **Timeline** showcasing your love story
- **Memory cards** with hover effects
- **Interactive proposal** with "Yes" and "No" buttons
- **Celebration screen** with heart explosion effects
- **Background music** toggle option

### 🎵 Audio Features
- **Simple background music** using Web Audio API
- **Sound effects** for interactions
- **Celebration sounds** when she says "Yes!"
- **Sad sounds** for the "No" button (which moves away!)

### 🌟 Special Effects
- **Floating hearts** in the background
- **Heart explosion** animation on acceptance
- **Parallax effects** on mouse movement
- **Smooth scrolling** between sections
- **Intersection Observer** for scroll-triggered animations

## How to Use

1. **Open the website** - The loading screen will appear with a beating heart
2. **Scroll through your journey** - Read about your beautiful love story
3. **Explore memories** - See all the reasons you love her
4. **The big question** - When she reaches the proposal section
5. **Celebrate!** - If she says "Yes", enjoy the celebration screen

## Customization

### Personalize the Content
Edit `index.html` to customize:
- **Hero title and subtitle**
- **Timeline events** in the journey section
- **Memory cards** with your personal reasons
- **Proposal message**
- **Future plans** in the celebration section

### Customize Colors
Edit `style.css` to change:
- **Gradient colors** in the `body` and `.hero` selectors
- **Heart colors** in the `.floating-heart` class
- **Button colors** in the `.cta-button`, `.yes-button` classes

### Add Your Own Music
Replace the simple notes in `script.js` with your own romantic melody:
```javascript
const notes = [261.63, 293.66, 329.63, 349.23, 392.00, 440.00, 493.88, 523.25];
```

## File Structure

```
valentine-proposal/
├── index.html          # Main HTML structure
├── style.css           # All styling and animations
├── script.js           # Interactive JavaScript features
└── README.md           # This file
```

## Browser Support

This website works on all modern browsers:
- ✅ Chrome (recommended)
- ✅ Firefox
- ✅ Safari
- ✅ Edge
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## Technical Details

### Technologies Used
- **HTML5** semantic markup
- **CSS3** with modern features (Grid, Flexbox, Animations)
- **Vanilla JavaScript** (no dependencies required)
- **Web Audio API** for sound effects
- **Google Fonts** for beautiful typography

### Performance Features
- **Optimized animations** using CSS transforms
- **Efficient heart generation** with automatic cleanup
- **Intersection Observer** for performance-optimized scroll animations
- **Touch event optimization** for mobile devices

## Tips for the Perfect Proposal

1. **Test on her device** beforehand to ensure everything works perfectly
2. **Set the mood** - dim lighting, maybe some candles
3. **Have a backup plan** - save the page locally in case of internet issues
4. **Be present** - the website is the tool, you're the magic!
5. **Capture the moment** - maybe have someone ready to take photos/videos

## Troubleshooting

### Audio Not Working
- Some browsers require user interaction before playing audio
- Try clicking anywhere on the page first
- Check if the browser tab is not muted

### Animations Slow on Mobile
- Close other apps to free up memory
- Ensure you're using a modern mobile browser
- The website is optimized but older devices may struggle

### Text Not Displaying Correctly
- Check internet connection for Google Fonts
- The website will fall back to system fonts if needed

## License

This project is created with love and is free to use for personal purposes. Feel free to modify and share it to create more beautiful proposals! 💕

---

Made with ❤️ for your special Valentine's Day moment. Good luck with your proposal!
