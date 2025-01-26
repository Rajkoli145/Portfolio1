const songs = [
    {
        id: 1,
        title: "Blinding Lights",
        artist: "The Weeknd",
        album: "After Hours",
        duration: "3:20",
        coverUrl: "https://i.scdn.co/image/ab67616d0000b273c5649add07ed3720be9d5526",
        audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
    },
    {
        id: 2,
        title: "Shape of You",
        artist: "Ed Sheeran",
        album: "÷ (Divide)",
        duration: "3:53",
        coverUrl: "https://i.scdn.co/image/ab67616d0000b273ba5db46f4b838ef6027e6f96",
        audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3"
    },
    {
        id: 3,
        title: "Stay",
        artist: "The Kid LAROI, Justin Bieber",
        album: "F*CK LOVE 3: OVER YOU",
        duration: "2:21",
        coverUrl: "https://i.scdn.co/image/ab67616d0000b273c372c06984f76f100dc35e19",
        audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3"
    },
    {
        id: 4,
        title: "Levitating",
        artist: "Dua Lipa ft. DaBaby",
        album: "Future Nostalgia",
        duration: "3:23",
        coverUrl: "https://i.scdn.co/image/ab67616d0000b273bd26ede1ae69327010d49946",
        audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3"
    },
    {
        id: 5,
        title: "good 4 u",
        artist: "Olivia Rodrigo",
        album: "SOUR",
        duration: "2:58",
        coverUrl: "https://i.scdn.co/image/ab67616d0000b273a91c10fe9472d9bd89802e5a",
        audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3"
    }
];

const playlists = [
    {
        id: 1,
        title: "Today's Top Hits",
        description: "The biggest hits right now!",
        coverUrl: "https://i.scdn.co/image/ab67706f00000002b4a6b7b8650a3bc3aec9683f",
        songs: [1, 2, 3, 4, 5]
    },
    {
        id: 2,
        title: "Chill Vibes",
        description: "Relax and unwind...",
        coverUrl: "https://i.scdn.co/image/ab67706f00000002b60db5d1bcdd9c4fd1ebcffe",
        songs: [2, 4]
    }
];

class AudioPlayer {
    constructor() {
        this.audio = new Audio();
        this.currentSong = null;
        this.isPlaying = false;
        this.volume = 0.7;
        this.initializeEventListeners();
    }

    initializeEventListeners() {
        this.audio.addEventListener('timeupdate', () => {
            const progress = (this.audio.currentTime / this.audio.duration) * 100;
            document.querySelector('.progress').style.width = `${progress}%`;
            document.querySelector('.current-time').textContent = this.formatTime(this.audio.currentTime);
            document.querySelector('.total-time').textContent = this.formatTime(this.audio.duration);
        });

        this.audio.addEventListener('ended', () => {
            this.playNext();
        });
    }

    playSong(songId) {
        const song = songs.find(s => s.id === songId);
        if (!song) return;

        this.currentSong = song;
        this.audio.src = song.audioUrl;
        this.audio.volume = this.volume;
        this.audio.play();
        this.isPlaying = true;
        this.updatePlayerUI();
    }

    togglePlay() {
        if (this.isPlaying) {
            this.audio.pause();
        } else {
            this.audio.play();
        }
        this.isPlaying = !this.isPlaying;
        this.updatePlayerUI();
    }

    updatePlayerUI() {
        if (!this.currentSong) return;

        // Update song info
        document.querySelector('.song-name').textContent = this.currentSong.title;
        document.querySelector('.artist-name').textContent = this.currentSong.artist;
        document.querySelector('.album-cover').src = this.currentSong.coverUrl;

        // Update play button
        document.querySelector('.play-btn i').className = this.isPlaying ? 'fas fa-pause' : 'fas fa-play';
    }

    setVolume(value) {
        this.volume = value;
        this.audio.volume = value;
        document.querySelector('.volume-progress').style.width = `${value * 100}%`;
    }

    formatTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    }

    playNext() {
        // Implementation for playing next song
    }

    playPrevious() {
        // Implementation for playing previous song
    }
}

// Initialize player
const player = new AudioPlayer();

// Export for use in other files
window.player = player;
window.songs = songs;
window.playlists = playlists;
