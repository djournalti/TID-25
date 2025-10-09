// ==================== DATA LENGKAP INSTAGRAM ====================
const instagramAccounts = [
    { username: "eevaaue_", description: "Eva", clicks: 0 },
    { username: "alwalidd.25", description: "Al Walid", clicks: 0 },
    { username: "heyosmths", description: "Rama", clicks: 0 },
    { username: "girvanagtg", description: "Fani", clicks: 0 },
    { username: "Kosta_ppp", description: "Aldino", clicks: 0 },
    { username: "fadliakbar362", description: "Fadli", clicks: 0 },
    { username: "5w1h_517", description: "Rifky", clicks: 0 },
    { username: "luk_lukmankhak23", description: "Lukman", clicks: 0 },
    { username: "alfazkar2212", description: "Fateeya", clicks: 0 },
    { username: "_firndaa", description: "Firanda", clicks: 0 },
    { username: "maelatulw", description: "Maela", clicks: 0 },
    { username: "nation.fajar", description: "Fajar", clicks: 0 },
    { username: "rhmiinblaa_", description: "Rahmi", clicks: 0 },
    { username: "fadilsdhmandi_", description: "Irsad", clicks: 0 },
    { username: "rifza_mhda", description: "Rifqi", clicks: 0 },
    { username: "ilham_suf07", description: "Ilham", clicks: 0 },
    { username: "faizmaulana.h", description: "Faiz", clicks: 0 },
    { username: "t.lithanrl", description: "Talitha", clicks: 0 },
    { username: "fq.bilaa", description: "Rofiqoh", clicks: 0 },
    { username: "artheyaelf", description: "Artheyael", clicks: 0 },
    { username: "knlls_06", description: "Kholishoh", clicks: 0 },
    { username: "haikalkhabibiee", description: "Haikal", clicks: 0 },
    { username: "uvwndii._", description: "Windi", clicks: 0 },
    { username: "raemzs", description: "Ramzi", clicks: 0 },
    { username: "nafis.ainul", description: "Nafis", clicks: 0 },
    { username: "vikadwindaa", description: "Avica", clicks: 0 },
    { username: "4rraabb", description: "Sahrul", clicks: 0 },
    { username: "__yes_sirr", description: "Tandifa", clicks: 0 },
    { username: "danweee", description: "Danang", clicks: 0 },
    { username: "riky_aja01", description: "Rieki", clicks: 0 },
    { username: "aruuladzim", description: "Syahrul", clicks: 0 },
    { username: "attilla_mardhotillah_ar_rofiq", description: "At Tilla", clicks: 0 },
    { username: "samkyy1", description: "Samirul", clicks: 0 },
    { username: "tafa04_elsalim", description: "Fajrin", clicks: 0 },
    { username: "kartikadevi_40", description: "Kartika", clicks: 0 },
    { username: "akhdanbel", description: "Akhdan", clicks: 0 },
    { username: "dikamuzaaqi", description: "Dika", clicks: 0 },
    { username: "_ilmanz1", description: "Zidni", clicks: 0 },
    { username: "devinargaitunamaorang", description: "Devin", clicks: 0 }
];

const galleryImages = [
    "https://i.imgur.com/RlpE7c8.jpeg",
    "https://i.imgur.com/eh5M4Pj.jpeg", 
    "https://i.imgur.com/IE3Ngy5.jpeg",
    "https://i.imgur.com/pJv9YCP.jpeg",
    "https://i.imgur.com/oR5iyDL.jpeg",
    "https://i.imgur.com/h7DRznt.jpeg"
];

// ==================== FIXED MODAL FUNCTIONS ====================
function openModal(imageSrc) {
    const modal = document.getElementById('imageModal');
    const modalContent = document.querySelector('.modal-content');
    
    // Clear previous content
    modalContent.innerHTML = '';
    
    // Create image element
    const img = document.createElement('img');
    img.src = imageSrc;
    img.alt = "Photo from Djournal.ti";
    img.style.width = '100%';
    img.style.height = 'auto';
    img.style.maxHeight = '80vh';
    img.style.objectFit = 'contain';
    
    modalContent.appendChild(img);
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function openVideoModal(videoSrc) {
    const modal = document.getElementById('imageModal');
    const modalContent = document.querySelector('.modal-content');
    
    // Clear previous content
    modalContent.innerHTML = '';
    
    // Create video element
    const video = document.createElement('video');
    video.src = videoSrc;
    video.controls = true;
    video.autoplay = true;
    video.style.width = '100%';
    video.style.height = 'auto';
    video.style.maxHeight = '80vh';
    video.style.display = 'block';
    
    modalContent.appendChild(video);
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    const modal = document.getElementById('imageModal');
    
    // Pause video if playing
    const video = modal.querySelector('video');
    if (video) {
        video.pause();
    }
    
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// ==================== JAVASCRIPT FUNCTIONS ====================
// Dark/Light Mode
function toggleTheme() {
    const currentTheme = document.body.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    document.body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
}

// Random Color Theme
function randomizeColors() {
    const hues = [230, 280, 320, 180, 140, 260];
    const randomHue = hues[Math.floor(Math.random() * hues.length)];
    document.documentElement.style.setProperty('--primary', `hsl(${randomHue}, 70%, 60%)`);
    document.documentElement.style.setProperty('--secondary', `hsl(${randomHue}, 60%, 50%)`);
    document.documentElement.style.setProperty('--accent', `hsl(${(randomHue + 60) % 360}, 70%, 60%)`);
}

// Music Player
function toggleMusic() {
    const music = document.getElementById('bgMusic');
    const playBtn = document.getElementById('playPause');
    const icon = playBtn.querySelector('i');
    
    if (music.paused) {
        music.play();
        icon.className = 'fas fa-pause';
    } else {
        music.pause();
        icon.className = 'fas fa-play';
    }
}

// Voice Search
function startVoiceSearch() {
    const voiceSearch = document.getElementById('voiceSearch');
    if (!('webkitSpeechRecognition' in window)) {
        alert('Browser tidak mendukung voice search');
        return;
    }

    const recognition = new webkitSpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'id-ID'; // Set language to Indonesian

    recognition.onstart = function() {
        voiceSearch.classList.add('listening');
        voiceSearch.innerHTML = '<i class="fas fa-circle"></i>';
    };

    recognition.onresult = function(event) {
        const transcript = event.results[0][0].transcript;
        document.getElementById('searchInput').value = transcript;
        searchAccounts();
        voiceSearch.classList.remove('listening');
        voiceSearch.innerHTML = '<i class="fas fa-microphone"></i>';
    };

    recognition.onerror = function() {
        voiceSearch.classList.remove('listening');
        voiceSearch.innerHTML = '<i class="fas fa-microphone"></i>';
        alert('Error dalam voice recognition. Coba lagi.');
    };

    recognition.onend = function() {
        voiceSearch.classList.remove('listening');
        voiceSearch.innerHTML = '<i class="fas fa-microphone"></i>';
    };

    recognition.start();
}

// Copy Username
function copyUsername(username) {
    navigator.clipboard.writeText(username).then(() => {
        alert(`Username @${username} berhasil disalin!`);
    });
}

// Track Clicks
function trackClick(username) {
    const account = instagramAccounts.find(acc => acc.username === username);
    if (account) {
        account.clicks++;
        updateClickCounts();
        localStorage.setItem('instagramClicks', JSON.stringify(instagramAccounts));
    }
}

// Share Functions
function shareOnWhatsApp() {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent("Check out Djournal.ti LinkHub - Kumpulan akun Instagram komunitas Djournal.ti!");
    window.open(`https://wa.me/?text=${text}%20${url}`, '_blank');
}

function shareOnTelegram() {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent("Check out Djournal.ti LinkHub!");
    window.open(`https://t.me/share/url?url=${url}&text=${text}`, '_blank');
}

function generateQRCode() {
    const qrCodeElement = document.getElementById('qrCode');
    qrCodeElement.innerHTML = '';
    QRCode.toCanvas(qrCodeElement, window.location.href, { width: 200 }, function(error) {
        if (error) console.error(error);
    });
    document.getElementById('qrModal').classList.add('active');
}

function copyLink() {
    navigator.clipboard.writeText(window.location.href).then(() => {
        alert('Link berhasil disalin!');
    });
}

// Weather Widget
function getWeather() {
    document.getElementById('weatherWidget').innerHTML = `
        <i class="fas fa-sun" style="color: #FFA500; font-size: 2rem;"></i>
        <h3>Djournal.ti Community</h3>
        <p>Terhubung dan Berkembang Bersama! 👥</p>
    `;
}

// Mini Game
let currentGame = null;

function startGame() {
    const randomAccounts = [...instagramAccounts]
        .sort(() => 0.5 - Math.random())
        .slice(0, 4);
    
    const correctAccount = randomAccounts[0];
    currentGame = correctAccount;

    document.getElementById('gameQuestion').textContent = `Siapa pemilik username @${correctAccount.username}?`;
    
    const optionsHtml = randomAccounts
        .sort(() => 0.5 - Math.random())
        .map(account => `
            <button class="game-btn" onclick="checkAnswer('${account.username}')">
                ${account.description}
            </button>
        `).join('');
    
    document.getElementById('gameOptions').innerHTML = optionsHtml;
    document.getElementById('gameResult').textContent = '';
}

function checkAnswer(username) {
    const resultElement = document.getElementById('gameResult');
    if (username === currentGame.username) {
        resultElement.textContent = '🎉 Benar! Kamu hebat!';
        resultElement.style.color = 'var(--accent)';
    } else {
        resultElement.textContent = `❌ Salah! Yang benar adalah ${currentGame.description}`;
        resultElement.style.color = '#ff4444';
    }
}

// Typing Animation
function typeWriter(text, element, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

// Helper Functions
function updateClickCounts() {
    document.querySelectorAll('.link-card').forEach(card => {
        const username = card.querySelector('.username').textContent.replace('@', '');
        const account = instagramAccounts.find(acc => acc.username === username);
        let countElement = card.querySelector('.click-count');
        
        if (!countElement) {
            countElement = document.createElement('div');
            countElement.className = 'click-count';
            card.appendChild(countElement);
        }
        
        if (account && account.clicks > 0) {
            countElement.textContent = `${account.clicks} klik`;
        } else {
            countElement.textContent = '';
        }
    });
}

function createLinkCards(accounts) {
    const container = document.getElementById('linksContainer');
    container.innerHTML = '';
    
    accounts.forEach((account, index) => {
        const card = document.createElement('a');
        card.href = `https://instagram.com/${account.username}`;
        card.target = "_blank";
        card.className = 'link-card';
        card.style.animationDelay = `${index * 0.1}s`;
        card.onclick = () => trackClick(account.username);
        
        card.innerHTML = `
            <div class="instagram-icon">
                <i class="fab fa-instagram"></i>
            </div>
            <div class="link-text">
                <div class="username">@${account.username}</div>
                <div class="link-desc">${account.description}</div>
            </div>
            <button class="copy-btn" onclick="event.stopPropagation(); copyUsername('${account.username}')">
                <i class="fas fa-copy"></i>
            </button>
            <div class="click-count">${account.clicks > 0 ? account.clicks + ' klik' : ''}</div>
        `;
        
        container.appendChild(card);
        
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 100 + (index * 100));
    });
    
    updateCounter(accounts.length);
}

function createGallery() {
    const container = document.getElementById('galleryContainer');
    container.innerHTML = '';
    
    galleryImages.forEach((image, index) => {
        const galleryItem = document.createElement('div');
        galleryItem.className = 'gallery-item';
        galleryItem.style.animationDelay = `${index * 0.1}s`;
        galleryItem.onclick = () => openModal(image);
        
        galleryItem.innerHTML = `
            <img src="${image}" alt="Photo from Djournal.ti" class="gallery-img">
            <div class="gallery-overlay">Klik untuk memperbesar</div>
        `;
        
        container.appendChild(galleryItem);
        
        setTimeout(() => {
            galleryItem.style.opacity = '1';
            galleryItem.style.transform = 'scale(1)';
        }, 500 + (index * 100));
    });
}

function searchAccounts() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const filteredAccounts = instagramAccounts.filter(account => 
        account.username.toLowerCase().includes(searchTerm) || 
        account.description.toLowerCase().includes(searchTerm)
    );
    createLinkCards(filteredAccounts);
}

function updateCounter(count) {
    const counterElement = document.getElementById('counterNumber');
    let currentCount = 0;
    const increment = Math.ceil(count / 20);
    
    const timer = setInterval(() => {
        currentCount += increment;
        if (currentCount >= count) {
            currentCount = count;
            clearInterval(timer);
        }
        counterElement.textContent = currentCount;
    }, 50);
}

// ==================== INITIALIZATION ====================
document.addEventListener('DOMContentLoaded', () => {
    // Load saved theme
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.body.setAttribute('data-theme', savedTheme);

    // Load click counts
    const savedClicks = localStorage.getItem('instagramClicks');
    if (savedClicks) {
        const clickData = JSON.parse(savedClicks);
        instagramAccounts.forEach(account => {
            const savedAccount = clickData.find(acc => acc.username === account.username);
            if (savedAccount) account.clicks = savedAccount.clicks;
        });
    }

    // Initialize features
    createLinkCards(instagramAccounts);
    createGallery();
    getWeather();
    startGame();

    // Typing animation
    typeWriter('Djournal.ti LinkHub', document.getElementById('typingText'));

    // Event listeners
    document.getElementById('searchInput').addEventListener('input', searchAccounts);
    document.getElementById('voiceSearch').addEventListener('click', startVoiceSearch);
    document.getElementById('themeToggle').addEventListener('click', toggleTheme);
    document.getElementById('colorRandomizer').addEventListener('click', randomizeColors);
    document.getElementById('musicToggle').addEventListener('click', toggleMusic);
    document.getElementById('playPause').addEventListener('click', toggleMusic);

    // Modal events
    document.getElementById('closeModal').addEventListener('click', closeModal);
    document.getElementById('closeQrModal').addEventListener('click', closeModal);
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === this) closeModal();
        });
    });

    // ESC key to close modals
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') closeModal();
    });

    // AI Chat placeholder
    document.getElementById('chatToggle').addEventListener('click', () => {
        alert('🤖 AI Chatbot coming soon! Fitur ini akan membantu menjawab pertanyaan tentang Djournal.ti');
    });
});
