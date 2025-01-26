// Sample music data
const playlists = [
    {
        title: "Today's Top Hits",
        description: "Jung Kook is on top of the Hottest 50!",
        coverUrl: "https://i.scdn.co/image/ab67706f00000002b4a6b7b8650a3bc3aec9683f"
    },
    {
        title: "RapCaviar",
        description: "New music from Drake, Rod Wave and Doja Cat.",
        coverUrl: "https://i.scdn.co/image/ab67706c0000da84bfac37e7c2953e682eaaf1b7"
    },
    {
        title: "All Out 2010s",
        description: "The biggest songs of the 2010s.",
        coverUrl: "https://i.scdn.co/image/ab67706f00000002b0fe40a6e1692822f5a9d8f1"
    },
    {
        title: "Rock Classics",
        description: "Rock legends & epic songs that continue to inspire generations.",
        coverUrl: "https://i.scdn.co/image/ab67706f0000000278b4745cb9ce8ffe32daaf7e"
    },
    {
        title: "Chill Hits",
        description: "Kick back to the best new and recent chill hits.",
        coverUrl: "https://i.scdn.co/image/ab67706f00000002b60db5d1bcdd9c4fd1ebcffe"
    },
    {
        title: "Viva Latino",
        description: "Today's top Latin hits, elevando nuestra música.",
        coverUrl: "https://i.scdn.co/image/ab67706f00000002a76989516e69f88dd0cbb8a1"
    }
];

// DOM Elements
const playlistsGrid = document.querySelector('.playlists-grid');
const playBtn = document.querySelector('.play-btn');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
const shuffleBtn = document.querySelector('.shuffle-btn');
const repeatBtn = document.querySelector('.repeat-btn');
const progressContainer = document.querySelector('.progress-container');
const progress = document.querySelector('.progress');
const currentTimeEl = document.querySelector('.current-time');
const totalTimeEl = document.querySelector('.total-time');
const volumeBtn = document.querySelector('.volume-btn');
const volumeSlider = document.querySelector('.volume-slider');
const volumeProgress = document.querySelector('.volume-progress');

// State
let isPlaying = false;
let isShuffle = false;
let isRepeat = false;
let isMuted = false;
let currentVolume = 0.7; // 70%

// Create playlist cards
function createPlaylistCards() {
    playlists.forEach(playlist => {
        const card = document.createElement('div');
        card.className = 'playlist-card';
        card.innerHTML = `
            <img src="${playlist.coverUrl}" alt="${playlist.title}">
            <h3>${playlist.title}</h3>
            <p>${playlist.description}</p>
        `;
        playlistsGrid.appendChild(card);
    });
}

// Toggle play/pause
function togglePlay() {
    isPlaying = !isPlaying;
    playBtn.innerHTML = isPlaying ? '<i class="fas fa-pause"></i>' : '<i class="fas fa-play"></i>';
}

// Toggle shuffle
function toggleShuffle() {
    isShuffle = !isShuffle;
    shuffleBtn.style.color = isShuffle ? '#1ed760' : '#b3b3b3';
}

// Toggle repeat
function toggleRepeat() {
    isRepeat = !isRepeat;
    repeatBtn.style.color = isRepeat ? '#1ed760' : '#b3b3b3';
}

// Update progress bar
function updateProgress(e) {
    const { duration, currentTime } = e.srcElement;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;
    
    // Update time displays
    currentTimeEl.textContent = formatTime(currentTime);
    totalTimeEl.textContent = formatTime(duration);
}

// Set progress bar
function setProgress(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;
    audio.currentTime = (clickX / width) * duration;
}

// Format time
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
}

// Toggle volume
function toggleVolume() {
    isMuted = !isMuted;
    volumeBtn.innerHTML = isMuted ? '<i class="fas fa-volume-mute"></i>' : '<i class="fas fa-volume-up"></i>';
    volumeProgress.style.width = isMuted ? '0%' : `${currentVolume * 100}%`;
}

// Set volume
function setVolume(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    currentVolume = clickX / width;
    volumeProgress.style.width = `${currentVolume * 100}%`;
    isMuted = currentVolume === 0;
    volumeBtn.innerHTML = isMuted ? '<i class="fas fa-volume-mute"></i>' : '<i class="fas fa-volume-up"></i>';
}

// Event listeners
playBtn.addEventListener('click', togglePlay);
shuffleBtn.addEventListener('click', toggleShuffle);
repeatBtn.addEventListener('click', toggleRepeat);
volumeBtn.addEventListener('click', toggleVolume);
progressContainer.addEventListener('click', setProgress);
volumeSlider.addEventListener('click', setVolume);

// Initialize playlists
createPlaylistCards();
