const moods = [
  {
    name: "Chill Sunset",
    mood: "chill",
    colors: ["#F9D29D", "#FFD1FF", "#A1C4FD"],
    quote: "Relax and recharge.",
    youtube: "dQw4w9WgXcQ",
    spotify: {
      preview_url: "https://p.scdn.co/mp3-preview/e21a65920e0ff1c857f82a13cd876f13fdc2f7aa",
      external_url: "https://open.spotify.com/track/6JV2JOEocMgcZxYSZelKcc"
    }
  },
  {
    name: "Energetic Neon",
    mood: "hype",
    colors: ["#FF416C", "#FF4B2B", "#FFC837"],
    quote: "You were born to stand out. Own it!",
    youtube: "3tmd-ClpJxA",
    spotify: {
      preview_url: "https://p.scdn.co/mp3-preview/e21a65920e0ff1c857f82a13cd876f13fdc2f7aa",
      external_url: "https://open.spotify.com/track/6JV2JOEocMgcZxYSZelKcc"
    }
  }
];

let currentProvider = "youtube";

document.getElementById("generateBtn").addEventListener("click", generateMood);
document.getElementById("toggleProviderBtn").addEventListener("click", toggleProvider);
document.getElementById("toggleDarkModeBtn").addEventListener("click", toggleDarkMode);

function generateMood() {
  const vibe = moods[Math.floor(Math.random() * moods.length)];

  document.getElementById("moodName").textContent = vibe.name;
  document.getElementById("quote").textContent = vibe.quote;

  document.getElementById("mood-box").style.background = `linear-gradient(135deg, ${vibe.colors.join(", ")})`;

  if (currentProvider === "youtube") {
    document.getElementById("ytPlayer").src = `https://www.youtube.com/embed/${vibe.youtube}`;
    document.getElementById("ytPlayer").style.display = "block";
    document.getElementById("spPreview").style.display = "none";
    document.getElementById("spLink").style.display = "none";
  } else if (currentProvider === "spotify") {
    if (vibe.spotify && vibe.spotify.preview_url) {
      const preview = document.getElementById("spPreview");
      const link = document.getElementById("spLink");

      preview.src = vibe.spotify.preview_url;
      preview.style.display = "block";

      link.href = vibe.spotify.external_url;
      link.style.display = "inline-block";

      document.getElementById("ytPlayer").style.display = "none";
    }
  }
}

function toggleProvider() {
  currentProvider = currentProvider === "youtube" ? "spotify" : "youtube";
  document.getElementById("toggleProviderBtn").textContent =
    currentProvider === "spotify" ? "🎬 Use YouTube" : "🎵 Use Spotify";
}

function toggleDarkMode() {
  document.body.classList.toggle("dark");
}
