const vibes = [
  {
    name: "Chill Sunset",
    category: "chill",
    colors: ["#ff9a9e", "#fad0c4", "#fbc2eb"],
    quote: "Relax and let the moment flow.",
    song: {
      youtube: "https://www.youtube.com/embed/5qap5aO4i9A",
      spotify: "https://open.spotify.com/embed/track/3AhXZa8sUQht0UEdBJgpGc"
    }
  },
  {
    name: "Energetic Neon",
    category: "hype",
    colors: ["#fc466b", "#3f5efb", "#0fd850"],
    quote: "You're a burst of unstoppable energy!",
    song: {
      youtube: "https://www.youtube.com/embed/K4DyBUG242c",
      spotify: "https://open.spotify.com/embed/track/0e7ipj03S05BNilyu5bRzt"
    }
  },
  {
    name: "Golden Love",
    category: "romantic",
    colors: ["#ffd700", "#ffaf00", "#fff8dc"],
    quote: "Your warmth lights up the world.",
    song: {
      youtube: "https://www.youtube.com/embed/xZzEzDkeHzI",
      spotify: "https://open.spotify.com/embed/track/4iV5W9uYEdYUVa79Axb7Rh"
    }
  }
];

let useSpotify = false;

function generateMood() {
  const selectedCategory = document.getElementById("moodFilter").value;
  const filteredVibes = selectedCategory === "all"
    ? vibes
    : vibes.filter(v => v.category === selectedCategory);

  const vibe = filteredVibes[Math.floor(Math.random() * filteredVibes.length)];

  document.getElementById('moodName').innerText = vibe.name;
  document.getElementById('quote').innerText = vibe.quote;

  // Show color boxes
  const colorsDiv = document.getElementById('colors');
  colorsDiv.innerHTML = '';
  vibe.colors.forEach(color => {
    const box = document.createElement('div');
    box.className = 'color-box';
    box.style.background = color;
    colorsDiv.appendChild(box);
  });

  // Apply gradient background
  document.body.style.background = `linear-gradient(135deg, ${vibe.colors.join(',')})`;

  // Set music
  const player = document.getElementById('musicPlayer');
  player.src = useSpotify ? vibe.song.spotify : vibe.song.youtube;

  // Save current vibe for share
  currentVibe = vibe;
}

function toggleTheme() {
  const body = document.body;
  const isDark = body.classList.toggle('dark-mode');
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
  document.getElementById("themeToggle").innerText = isDark ? "🌙 Dark Mode On" : "🌞 Light Mode On";
}

function togglePlayer() {
  useSpotify = !useSpotify;
  document.getElementById("playerToggle").innerText = useSpotify ? "📺 Use YouTube" : "🎵 Use Spotify";
  generateMood();
}

// Share current vibe
let currentVibe = null;
function shareVibe() {
  if (!currentVibe) return alert("Please generate a vibe first!");
  if (navigator.share) {
    navigator.share({
      title: `Mood Vibe: ${currentVibe.name}`,
      text: `${currentVibe.quote}`,
      url: window.location.href
    }).catch(err => console.error("Share failed:", err));
  } else {
    alert("Sharing not supported on this device.");
  }
}

// Load theme
window.addEventListener('DOMContentLoaded', () => {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    document.body.classList.add('dark-mode');
    document.getElementById("themeToggle").innerText = "🌙 Dark Mode On";
  } else {
    document.getElementById("themeToggle").innerText = "🌞 Light Mode On";
  }
});

function shareVibe() {
  if (!currentVibe) return alert("Get a mood first!");

  const text = `🎧 Mood: ${currentVibe.name}\n💬 "${currentVibe.quote}"\nTry it now on Mood Vibe!`;
  const url = window.location.href;
  const fullMessage = `${text}\n${url}`;

  // Try Web Share API
  if (navigator.share) {
    navigator
      .share({
        title: "My Mood Vibe",
        text: text,
        url: url
      })
      .then(() => console.log("Shared successfully"))
      .catch(err => {
        console.warn("Share failed, trying fallback:", err);
        fallbackToTwitter(fullMessage);
      });
  } else {
    fallbackToTwitter(fullMessage);
  }
}

// Fallback to Twitter or clipboard
function fallbackToTwitter(message) {
  try {
    const tweet = `https://twitter.com/intent/tweet?text=${encodeURIComponent(message)}`;
    const popup = window.open(tweet, "_blank");
    if (!popup) throw new Error("Popup blocked");
  } catch {
    // Final fallback: copy to clipboard
    navigator.clipboard.writeText(message).then(() => {
      alert("📋 Message copied to clipboard. You can now paste it anywhere!");
    }).catch(() => {
      alert("⚠️ Sharing is not supported on this device.");
    });
  }
}