// ============================================
// SCRIPT UTAMA - Website Kelas X DKV3
// Tema: Astronomi
// Versi: 1.0
// ============================================

// Fungsi untuk membuat bintang di background
function createStars() {
    const starsContainer = document.getElementById('stars');
    if (!starsContainer) return;
    
    const starsCount = 150;
    
    // Clear existing stars
    starsContainer.innerHTML = '';
    
    for (let i = 0; i < starsCount; i++) {
        const star = document.createElement('div');
        star.classList.add('star');
        
        // Random position
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        
        // Random size (1-4px)
        const size = Math.random() * 3 + 1;
        
        // Random animation delay
        const delay = Math.random() * 5;
        
        // Random brightness
        const brightness = Math.random() * 0.7 + 0.3;
        
        // Apply styles
        star.style.left = `${x}%`;
        star.style.top = `${y}%`;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        star.style.animationDelay = `${delay}s`;
        star.style.opacity = brightness;
        
        starsContainer.appendChild(star);
    }
}

// Fungsi untuk cek status login
function checkLoginStatus() {
    const username = localStorage.getItem('dkv3_username');
    const loggedIn = localStorage.getItem('dkv3_loggedIn');
    
    return {
        isLoggedIn: loggedIn === 'true',
        username: username || null
    };
}

// Fungsi untuk update UI berdasarkan status login
function updateLoginUI() {
    const loginStatus = checkLoginStatus();
    const userInfoElements = document.querySelectorAll('#displayUsername');
    const authButtonsElements = document.querySelectorAll('.auth-buttons');
    
    userInfoElements.forEach(element => {
        if (loginStatus.isLoggedIn && loginStatus.username) {
            element.innerHTML = `<strong>${loginStatus.username}</strong>`;
            element.style.color = 'var(--accent-light)';
        } else {
            element.textContent = 'Pengunjung';
            element.style.color = 'var(--text-secondary)';
        }
    });
    
    authButtonsElements.forEach(element => {
        if (loginStatus.isLoggedIn) {
            element.innerHTML = `
                <span style="color: var(--accent-light); margin-right: 10px;">
                    <i class="fas fa-user-astronaut"></i> ${loginStatus.username}
                </span>
                <a href="#" class="btn-logout" onclick="logout()">Logout</a>
            `;
        }
    });
}

// Fungsi untuk logout
function logout() {
    if (confirm('Apakah Anda yakin ingin logout?')) {
        localStorage.removeItem('dkv3_username');
        localStorage.removeItem('dkv3_loggedIn');
        localStorage.removeItem('dkv3_remember');
        
        // Show logout message
        alert('Anda telah logout!');
        
        // Redirect to home page
        window.location.href = 'index.html';
    }
}

// Fungsi untuk menampilkan modal
function showModal(title, content) {
    // Create modal overlay
    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay';
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000;
        backdrop-filter: blur(5px);
    `;
    
    // Create modal
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.style.cssText = `
        background: rgba(26, 31, 46, 0.95);
        border-radius: var(--radius-lg);
        padding: 30px;
        max-width: 500px;
        width: 90%;
        max-height: 80vh;
        overflow-y: auto;
        border: 1px solid rgba(106, 122, 224, 0.3);
        box-shadow: var(--shadow-lg);
        position: relative;
    `;
    
    // Modal header
    const modalHeader = document.createElement('div');
    modalHeader.style.cssText = `
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20px;
        padding-bottom: 15px;
        border-bottom: 1px solid rgba(106, 122, 224, 0.2);
    `;
    
    const modalTitle = document.createElement('h3');
    modalTitle.textContent = title;
    modalTitle.style.cssText = `
        color: var(--accent-light);
        margin: 0;
    `;
    
    const closeButton = document.createElement('button');
    closeButton.innerHTML = '<i class="fas fa-times"></i>';
    closeButton.style.cssText = `
        background: none;
        border: none;
        color: var(--text-secondary);
        font-size: 1.2rem;
        cursor: pointer;
        transition: color var(--transition-fast);
    `;
    closeButton.onclick = () => document.body.removeChild(overlay);
    
    modalHeader.appendChild(modalTitle);
    modalHeader.appendChild(closeButton);
    
    // Modal content
    const modalContent = document.createElement('div');
    modalContent.innerHTML = content;
    modalContent.style.cssText = `
        color: var(--text-secondary);
        line-height: 1.6;
    `;
    
    // Append elements
    modal.appendChild(modalHeader);
    modal.appendChild(modalContent);
    overlay.appendChild(modal);
    document.body.appendChild(overlay);
    
    // Close modal on overlay click
    overlay.onclick = (e) => {
        if (e.target === overlay) {
            document.body.removeChild(overlay);
        }
    };
    
    // Close modal on Escape key
    document.addEventListener('keydown', function closeModalOnEscape(e) {
        if (e.key === 'Escape') {
            document.body.removeChild(overlay);
            document.removeEventListener('keydown', closeModalOnEscape);
        }
    });
}

// Fungsi untuk menampilkan notifikasi
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? 'rgba(46, 213, 115, 0.9)' : 
                     type === 'error' ? 'rgba(255, 71, 87, 0.9)' : 
                     type === 'warning' ? 'rgba(255, 165, 2, 0.9)' : 
                     'rgba(30, 144, 255, 0.9)'};
        color: white;
        padding: 15px 20px;
        border-radius: var(--radius-md);
        box-shadow: var(--shadow-lg);
        z-index: 1000;
        display: flex;
        align-items: center;
        gap: 10px;
        transform: translateX(120%);
        transition: transform 0.3s ease;
        max-width: 350px;
        backdrop-filter: blur(10px);
    `;
    
    // Icon based on type
    let icon = 'info-circle';
    if (type === 'success') icon = 'check-circle';
    if (type === 'error') icon = 'exclamation-circle';
    if (type === 'warning') icon = 'exclamation-triangle';
    
    notification.innerHTML = `
        <i class="fas fa-${icon}"></i>
        <span>${message}</span>
    `;
    
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 10);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(120%)';
        setTimeout(() => {
            if (notification.parentNode) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 5000);
    
    // Add click to close
    notification.onclick = () => {
        notification.style.transform = 'translateX(120%)';
        setTimeout(() => {
            if (notification.parentNode) {
                document.body.removeChild(notification);
            }
        }, 300);
    };
}

// Fungsi untuk validasi form
function validateForm(formId) {
    const form = document.getElementById(formId);
    if (!form) return true;
    
    const inputs = form.querySelectorAll('input[required], select[required], textarea[required]');
    let isValid = true;
    let firstInvalidInput = null;
    
    inputs.forEach(input => {
        // Reset error state
        input.style.borderColor = '';
        const errorElement = input.nextElementSibling;
        if (errorElement && errorElement.classList.contains('error-message')) {
            errorElement.remove();
        }
        
        // Check if empty
        if (!input.value.trim()) {
            isValid = false;
            input.style.borderColor = 'var(--danger)';
            
            const error = document.createElement('div');
            error.className = 'error-message';
            error.textContent = 'Field ini wajib diisi';
            error.style.cssText = `
                color: var(--danger);
                font-size: 0.85rem;
                margin-top: 5px;
            `;
            
            input.parentNode.appendChild(error);
            
            if (!firstInvalidInput) {
                firstInvalidInput = input;
            }
        }
        
        // Email validation
        if (input.type === 'email' && input.value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(input.value)) {
                isValid = false;
                input.style.borderColor = 'var(--danger)';
                
                const error = document.createElement('div');
                error.className = 'error-message';
                error.textContent = 'Format email tidak valid';
                error.style.cssText = `
                    color: var(--danger);
                    font-size: 0.85rem;
                    margin-top: 5px;
                `;
                
                input.parentNode.appendChild(error);
                
                if (!firstInvalidInput) {
                    firstInvalidInput = input;
                }
            }
        }
        
        // Password length validation
        if (input.type === 'password' && input.value && input.value.length < 6) {
            isValid = false;
            input.style.borderColor = 'var(--danger)';
            
            const error = document.createElement('div');
            error.className = 'error-message';
            error.textContent = 'Password minimal 6 karakter';
            error.style.cssText = `
                color: var(--danger);
                font-size: 0.85rem;
                margin-top: 5px;
            `;
            
            input.parentNode.appendChild(error);
            
            if (!firstInvalidInput) {
                firstInvalidInput = input;
            }
        }
    });
    
    // Focus on first invalid input
    if (firstInvalidInput) {
        firstInvalidInput.focus();
    }
    
    return isValid;
}

// Fungsi untuk memuat data dari localStorage
function loadFromLocalStorage(key, defaultValue = null) {
    try {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : defaultValue;
    } catch (error) {
        console.error('Error loading from localStorage:', error);
        return defaultValue;
    }
}

// Fungsi untuk menyimpan data ke localStorage
function saveToLocalStorage(key, data) {
    try {
        localStorage.setItem(key, JSON.stringify(data));
        return true;
    } catch (error) {
        console.error('Error saving to localStorage:', error);
        return false;
    }
}

// Fungsi untuk mendapatkan parameter URL
function getUrlParameter(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

// Fungsi untuk format tanggal
function formatDate(dateString) {
    const options = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    };
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', options);
}

// Fungsi untuk debounce
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Inisialisasi saat halaman dimuat
document.addEventListener('DOMContentLoaded', function() {
    // Buat bintang di background
    createStars();
    
    // Update UI berdasarkan status login
    updateLoginUI();
    
    // Tambahkan event listener untuk semua form
    document.querySelectorAll('form').forEach(form => {
        form.addEventListener('submit', function(e) {
            if (!validateForm(this.id)) {
                e.preventDefault();
                showNotification('Harap isi semua field yang wajib!', 'error');
            }
        });
    });
    
    // Tambahkan smooth scrolling untuk anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Tambahkan tahun saat ini di footer
    const currentYear = new Date().getFullYear();
    document.querySelectorAll('.current-year').forEach(element => {
        element.textContent = currentYear;
    });
    
    // Cek jika ada pesan dari URL
    const message = getUrlParameter('message');
    const messageType = getUrlParameter('type') || 'info';
    
    if (message) {
        showNotification(decodeURIComponent(message), messageType);
        
        // Clear URL parameters
        const url = new URL(window.location);
        url.searchParams.delete('message');
        url.searchParams.delete('type');
        window.history.replaceState({}, '', url);
    }
    
    // Tambahkan loading animation untuk gambar
    document.querySelectorAll('img').forEach(img => {
        img.addEventListener('load', function() {
            this.style.opacity = '1';
        });
        
        // Set initial opacity for fade-in effect
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.3s ease';
        
        // Trigger load for cached images
        if (img.complete) {
            img.style.opacity = '1';
        }
    });
    
    // Keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        // Ctrl + / untuk focus search
        if (e.ctrlKey && e.key === '/') {
            e.preventDefault();
            const searchInput = document.querySelector('input[type="search"], #searchInput');
            if (searchInput) {
                searchInput.focus();
            }
        }
        
        // Escape untuk close modal/notifikasi
        if (e.key === 'Escape') {
            const modal = document.querySelector('.modal-overlay');
            if (modal) {
                document.body.removeChild(modal);
            }
        }
    });
    
    // Tambahkan efek parallax untuk hero section
    window.addEventListener('scroll', debounce(function() {
        const hero = document.querySelector('.hero');
        if (hero) {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            hero.style.backgroundPosition = `center ${rate}px`;
        }
    }, 10));
});

// Export fungsi untuk digunakan di file HTML lainnya
window.dkv3 = {
    createStars,
    checkLoginStatus,
    updateLoginUI,
    logout,
    showModal,
    showNotification,
    validateForm,
    loadFromLocalStorage,
    saveToLocalStorage,
    getUrlParameter,
    formatDate,
    debounce
};
// GANTI fungsi loadGaleriFoto() dengan ini:

function loadGaleriFoto() {
    const fotoKenangan = [
        {
            // GUNAKAN DIRECT LINK INI:
            src: "https://drive.google.com/uc?export=view&id=1GBikM_KHxDEgi_RlCnp3A29-jzrDNRpP",
            caption: "Kegiatan seni di kelas",
        },
        {
            src: "https://images.unsplash.com/photo-1532601224476-15c79f2f7a51?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
            caption: "Presentasi proyek desain"
        },
        {
            src: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
            caption: "Diskusi kelompok tentang astronomi"
        },
        {
            src: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
            caption: "Eksperimen dengan cahaya dan warna"
        },
        {
            src: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
            caption: "Pameran karya seni kelas"
        },
        {
            src: "https://images.unsplash.com/photo-1516979187457-637abb4f9353?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
            caption: "Belajar tentang tata surya"
        }
    ];

    const container = document.getElementById('galeriContainer');
    container.innerHTML = '';

    fotoKenangan.forEach(foto => {
        const item = document.createElement('div');
        item.className = 'galeri-item';
        item.innerHTML = `
            <img src="${foto.src}" alt="${foto.caption}" loading="lazy">
            <div class="galeri-overlay">
                <p>${foto.caption}</p>
            </div>
        `;
        container.appendChild(item);
    });
// Buka browser console (F12) dan paste:
const testImg = new Image();
testImg.src = "https://drive.google.com/uc?export=view&id=1GBikM_KHxDEgi_RlCnp3A29-jzrDNRpP";
testImg.onload = () => console.log("SUCCESS!");
testImg.onerror = () => console.log("ERROR!");
}
