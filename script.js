// ==================== DATA LENGKAP INSTAGRAM DENGAN KATEGORI ====================
const instagramAccounts = [
    { username: "eevaaue_", description: "Eva", category: "Lifestyle" },
    { username: "alwalidd.25", description: "Al Walid", category: "Photography" },
    { username: "heyosmths", description: "Rama", category: "Art" },
    { username: "girvanagtg", description: "Fani", category: "Fitness" },
    { username: "Kosta_ppp", description: "Aldino", category: "Food" },
    { username: "fadliakbar362", description: "Fadli", category: "Technology" },
    { username: "5w1h_517", description: "Rifky", category: "News" },
    { username: "luk_lukmankhak23", description: "Lukman", category: "Music" },
    { username: "alfazkar2212", description: "Fateeya", category: "Motivation" },
    { username: "_firndaa", description: "Firanda", category: "Community" },
    { username: "maelatulw", description: "Maela", category: "Fashion" },
    { username: "nation.fajar", description: "Fajar", category: "Inspiration" },
    { username: "rhmiinblaa_", description: "Rahmi", category: "Nature" },
    { username: "fadilsdhmandi_", description: "Irsad", category: "Business" },
    { username: "rifza_mhda", description: "Rifqi", category: "Education" },
    { username: "ilham_suf07", description: "Ilham", category: "Sports" },
    { username: "faizmaulana.h", description: "Faiz", category: "Automotive" },
    { username: "t.lithanrl", description: "Talitha", category: "Beauty" },
    { username: "fq.bilaa", description: "Rofiqoh", category: "Literature" },
    { username: "artheyaelf", description: "Artheyael", category: "Art" },
    { username: "knlls_06", description: "Kholishoh", category: "Comedy" },
    { username: "haikalkhabibiee", description: "Haikal", category: "Science" },
    { username: "uvwndii._", description: "Windi", category: "Travel" },
    { username: "raemzs", description: "Ramzi", category: "Music" },
    { username: "nafis.ainul", description: "Nafis", category: "Culinary" },
    { username: "vikadwindaa", description: "Avica", category: "Fashion" },
    { username: "4rraabb", description: "Sahrul", category: "Vlogs" },
    { username: "__yes_sirr", description: "Tandifa", category: "Lifestyle" },
    { username: "danweee", description: "Danang", category: "DIY" },
    { username: "riky_aja01", description: "Rieki", category: "Photography" },
    { username: "aruuladzim", description: "Syahrul", category: "Family" },
    { username: "attilla_mardhotillah_ar_rofiq", description: "At Tilla", category: "History" },
    { username: "samkyy1", description: "Samirul", category: "Pets" },
    { username: "tafa04_elsalim", description: "Fajrin", category: "Lifestyle" },
    { username: "kartikadevi_40", description: "Kartika", category: "Wellness" },
    { username: "akhdanbel", description: "Akhdan", category: "Architecture" },
    { username: "dikamuzaaqi", description: "Dika", category: "Activism" },
    { username: "_ilmanz1", description: "Zidni", category: "Tech Reviews" },
    { username: "devinargaitunamaorang", description: "Devin", category: "Personal Journey" }
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

// Voice Search - Fixed Version
function startVoiceSearch() {
    const voiceSearch = document.getElementById('voiceSearch');
    
    // Check browser support
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
        alert('Browser tidak mendukung voice search. Gunakan Chrome atau Edge.');
        return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'id-ID';

    recognition.onstart = function() {
        console.log("🎤 Voice recognition started");
        voiceSearch.classList.add('listening');
        voiceSearch.innerHTML = '<i class="fas fa-circle"></i>';
        voiceSearch.style.color = 'var(--accent)';
    };

    recognition.onresult = function(event) {
        const transcript = event.results[0][0].transcript;
        console.log("🗣️ Voice result:", transcript);
        
        document.getElementById('searchInput').value = transcript;
        searchAccounts();
        
        // Reset button
        voiceSearch.classList.remove('listening');
        voiceSearch.innerHTML = '<i class="fas fa-microphone"></i>';
        voiceSearch.style.color = '';
    };

    recognition.onerror = function(event) {
        console.log("❌ Voice recognition error:", event.error);
        
        voiceSearch.classList.remove('listening');
        voiceSearch.innerHTML = '<i class="fas fa-microphone"></i>';
        voiceSearch.style.color = '';
        
        if (event.error === 'not-allowed') {
            alert('Microphone access denied. Please allow microphone permission.');
        } else {
            alert('Voice recognition error: ' + event.error);
        }
    };

    recognition.onend = function() {
        console.log("🎤 Voice recognition ended");
        voiceSearch.classList.remove('listening');
        voiceSearch.innerHTML = '<i class="fas fa-microphone"></i>';
        voiceSearch.style.color = '';
    };

    recognition.start();
}

// Copy Username
function copyUsername(username) {
    navigator.clipboard.writeText(username).then(() => {
        alert(`Username @${username} berhasil disalin!`);
    });
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

// 3D Animation Toggle
function toggle3DAnimations() {
    document.body.classList.toggle('no-3d');
    const is3DEnabled = !document.body.classList.contains('no-3d');
    localStorage.setItem('3dEnabled', is3DEnabled);
    
    // GSAP animations for toggle feedback
    const toggleBtn = document.getElementById('toggle3D');
    gsap.to(toggleBtn, {
        scale: 1.2,
        duration: 0.3,
        yoyo: true,
        repeat: 1
    });
}

// GSAP Animations
function initGSAPAnimations() {
    // Header animation
    gsap.from('header', {
        duration: 1,
        y: -50,
        opacity: 0,
        ease: "power3.out"
    });

    // Link cards stagger animation
    gsap.from('.link-card', {
        duration: 0.8,
        y: 30,
        opacity: 0,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
            trigger: '.links-container',
            start: "top 80%",
            toggleActions: "play none none reverse"
        }
    });

    // Gallery items animation
    gsap.from('.gallery-item', {
        duration: 0.6,
        scale: 0.8,
        opacity: 0,
        stagger: 0.05,
        ease: "back.out(1.7)",
        scrollTrigger: {
            trigger: '.gallery',
            start: "top 85%",
            toggleActions: "play none none reverse"
        }
    });

    // Section titles animation
    gsap.from('.section-title', {
        duration: 0.8,
        x: -30,
        opacity: 0,
        stagger: 0.2,
        scrollTrigger: {
            trigger: '.section-title',
            start: "top 90%",
            toggleActions: "play none none reverse"
        }
    });

    // Floating continuous animations
    gsap.to('.floating-shape', {
        y: "+=20",
        rotation: "+=5",
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
    });

    // 3D elements continuous rotation
    if (!document.body.classList.contains('no-3d')) {
        gsap.to('.three-d-element', {
            rotationY: 360,
            rotationX: 360,
            duration: 20,
            repeat: -1,
            ease: "none"
        });
    }
}

// Helper Functions
function updateCounter(count) {
    document.getElementById('counterNumber').textContent = count;
    document.getElementById('accountCounter').textContent = `Memuat ${count} akun`;
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
        
        card.innerHTML = `
            <div class="instagram-icon">
                <i class="fab fa-instagram"></i>
            </div>
            <div class="link-text">
                <div class="username">@${account.username}</div>
                <div class="link-desc">${account.description}</div>
            </div>
            <div class="category-badge">${account.category}</div>
            <button class="copy-btn" onclick="event.stopPropagation(); copyUsername('${account.username}')">
                <i class="fas fa-copy"></i>
            </button>
        `;
        
        container.appendChild(card);
        
        // GSAP animation for individual cards
        gsap.to(card, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            delay: index * 0.1,
            ease: "power2.out"
        });
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
        
        // GSAP animation for gallery items
        gsap.to(galleryItem, {
            opacity: 1,
            scale: 1,
            duration: 0.5,
            delay: index * 0.1,
            ease: "back.out(1.7)"
        });
    });
}

function searchAccounts() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const filteredAccounts = instagramAccounts.filter(account => 
        account.username.toLowerCase().includes(searchTerm) || 
        account.description.toLowerCase().includes(searchTerm) ||
        account.category.toLowerCase().includes(searchTerm)
    );
    createLinkCards(filteredAccounts);
}

// ==================== DEBUG INITIALIZATION ====================
console.log("🚀 script.js STARTED loading");

// Global debug function
window.debugSearchBox = function() {
    console.log("=== SEARCH BOX DEBUG ===");
    const searchInput = document.getElementById('searchInput');
    const voiceBtn = document.getElementById('voiceSearch');
    
    console.log("Search input exists:", !!searchInput);
    console.log("Voice button exists:", !!voiceBtn);
    console.log("searchAccounts function:", typeof searchAccounts);
    console.log("startVoiceSearch function:", typeof startVoiceSearch);
};

// ==================== FIXED INITIALIZATION ====================
document.addEventListener('DOMContentLoaded', function() {
    console.log("✅ DOM Content Loaded - Starting initialization...");
    
    // Load saved theme and 3D settings
    const savedTheme = localStorage.getItem('theme') || 'dark';
    const is3DEnabled = localStorage.getItem('3dEnabled') !== 'false';
    document.body.setAttribute('data-theme', savedTheme);
    
    if (!is3DEnabled) {
        document.body.classList.add('no-3d');
    }
    
    console.log("🎨 Theme loaded:", savedTheme);
    console.log("🎮 3D Animations:", is3DEnabled ? "Enabled" : "Disabled");

    // Test elements before adding listeners
    const searchInput = document.getElementById('searchInput');
    const voiceBtn = document.getElementById('voiceSearch');
    
    console.log("🔍 Elements found:");
    console.log("- searchInput:", searchInput);
    console.log("- voiceBtn:", voiceBtn);

    // ADD EVENT LISTENERS WITH ERROR HANDLING
    try {
        // Search input
        if (searchInput) {
            searchInput.addEventListener('input', function(e) {
                console.log("🔍 Search input:", e.target.value);
                searchAccounts();
            });
            console.log("✅ Search input listener added");
        } else {
            console.log("❌ Search input not found for listener");
        }

        // Voice search button
        if (voiceBtn) {
            voiceBtn.addEventListener('click', function(e) {
                console.log("🎤 Voice button clicked");
                startVoiceSearch();
            });
            console.log("✅ Voice button listener added");
        } else {
            console.log("❌ Voice button not found for listener");
        }

        // Theme toggle
        document.getElementById('themeToggle').addEventListener('click', toggleTheme);
        console.log("✅ Theme toggle listener added");

        // Color randomizer
        document.getElementById('colorRandomizer').addEventListener('click', randomizeColors);
        console.log("✅ Color randomizer listener added");

        // Music controls
        document.getElementById('musicToggle').addEventListener('click', toggleMusic);
        document.getElementById('playPause').addEventListener('click', toggleMusic);
        console.log("✅ Music listeners added");

        // 3D Toggle
        document.getElementById('toggle3D').addEventListener('click', toggle3DAnimations);
        console.log("✅ 3D toggle listener added");

    } catch (error) {
        console.log("❌ Error adding event listeners:", error);
    }

    // Initialize features
    console.log("🔄 Initializing features...");
    createLinkCards(instagramAccounts);
    createGallery();
    getWeather();
    startGame();

    // Initialize GSAP animations
    console.log("🎬 Initializing GSAP animations...");
    initGSAPAnimations();

    // Typing animation
    typeWriter('Djournal.ti LinkHub', document.getElementById('typingText'));
    console.log("✅ Typing animation started");

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
        alert('🤖 AI Chatbot coming soon!');
    });

    console.log("🎉 All initialization complete!");
    
    // Final debug check
    setTimeout(() => {
        console.log("=== FINAL DEBUG CHECK ===");
        debugSearchBox();
    }, 1000);
});
