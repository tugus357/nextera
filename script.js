// Comment System
document.addEventListener('DOMContentLoaded', function() {
  // Theme Toggle
  const themeToggle = document.createElement('button');
  themeToggle.className = 'theme-toggle';
  themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
  themeToggle.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: var(--primary);
    color: white;
    border: none;
    cursor: pointer;
    z-index: 1000;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  `;

  document.body.appendChild(themeToggle);

  // Theme toggle functionality
  themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('light-mode');
    const icon = themeToggle.querySelector('i');
    if (document.body.classList.contains('light-mode')) {
      icon.className = 'fas fa-sun';
      localStorage.setItem('theme', 'light');
    } else {
      icon.className = 'fas fa-moon';
      localStorage.setItem('theme', 'dark');
    }
  });

  // Load saved theme
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'light') {
    document.body.classList.add('light-mode');
    themeToggle.querySelector('i').className = 'fas fa-sun';
  }

  // Scroll to Top Button
  const scrollTop = document.querySelector('.scroll-top');
  if (scrollTop) {
    window.addEventListener('scroll', () => {
      if (window.pageYOffset > 300) {
        scrollTop.classList.add('visible');
      } else {
        scrollTop.classList.remove('visible');
      }
    });

    scrollTop.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // Student Carousel Navigation
  const carousel = document.querySelector('.student-carousel');
  const prevBtn = document.querySelector('.carousel-nav.prev');
  const nextBtn = document.querySelector('.carousel-nav.next');
  const cards = document.querySelectorAll('.student-card');
  let currentIndex = 0;

  function updateCarousel() {
    cards.forEach((card, index) => {
      card.classList.remove('active');
      if (index === currentIndex) {
        card.classList.add('active');
        card.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'center'
        });
      }
    });

    // Update button states
    prevBtn.style.opacity = currentIndex > 0 ? '1' : '0.5';
    nextBtn.style.opacity = currentIndex < cards.length - 1 ? '1' : '0.5';
  }

  if (prevBtn && nextBtn) {
    prevBtn.addEventListener('click', () => {
      if (currentIndex > 0) {
        currentIndex--;
        updateCarousel();
      }
    });

    nextBtn.addEventListener('click', () => {
      if (currentIndex < cards.length - 1) {
        currentIndex++;
        updateCarousel();
      }
    });
  }

  // Keyboard navigation for student cards
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft' && currentIndex > 0) {
      currentIndex--;
      updateCarousel();
    } else if (e.key === 'ArrowRight' && currentIndex < cards.length - 1) {
      currentIndex++;
      updateCarousel();
    }
  });

  // Initialize carousel
  if (cards.length > 0) {
    updateCarousel();
  }

  // Enhanced Student Card Interactions
  const studentCards = document.querySelectorAll('.student-card');
  studentCards.forEach(card => {
    // Add hover effect
    card.addEventListener('mouseenter', () => {
      card.style.transform = 'translateY(-10px) scale(1.02)';
      card.style.boxShadow = '0 15px 30px rgba(168, 85, 247, 0.3)';
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'translateY(0) scale(1)';
      card.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.3)';
    });

    // Add click effect
    card.addEventListener('click', () => {
      card.style.transform = 'scale(0.95)';
      setTimeout(() => {
        card.style.transform = 'scale(1)';
      }, 200);
    });

    // Add loading animation for images
    const avatar = card.querySelector('.student-avatar img');
    if (avatar) {
      avatar.style.opacity = '0';
      avatar.style.transition = 'opacity 0.3s ease';
      
      avatar.onload = () => {
        avatar.style.opacity = '1';
      };
    }
  });

  // Easter Egg for Intan's card
  const intanCard = document.querySelector('.student-card:nth-child(3)');
  let clickCount = 0;
  
  if (intanCard) {
    intanCard.addEventListener('click', function() {
      clickCount++;
      
      // Create heart effect
      const heart = document.createElement('div');
      heart.className = 'heart-effect';
      heart.style.cssText = `
        position: absolute;
        font-size: 20px;
        color: #ff69b4;
        pointer-events: none;
        animation: floatHeart 1s ease-out forwards;
        z-index: 1000;
      `;
      heart.innerHTML = '🕷️🕸️🕷️';
      
      // Random position around the card
      const rect = intanCard.getBoundingClientRect();
      const x = Math.random() * rect.width;
      const y = Math.random() * rect.height;
      
      heart.style.left = `${x}px`;
      heart.style.top = `${y}px`;
      
      intanCard.appendChild(heart);
      
      // Remove heart after animation
      setTimeout(() => heart.remove(), 1000);
      
      // Check for 50 clicks
      if (clickCount === 50) {
        // Create big love effect
        const loveEffect = document.createElement('div');
        loveEffect.className = 'love-effect';
        loveEffect.style.cssText = `
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(255, 105, 180, 0.2);
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 100px;
          color: #ff69b4;
          pointer-events: none;
          animation: bigLove 2s ease-out forwards;
          z-index: 9999;
        `;
        loveEffect.innerHTML = '🕷️';
        
        document.body.appendChild(loveEffect);
        
        // Add floating hearts
        for (let i = 0; i < 20; i++) {
          const floatingHeart = document.createElement('div');
          floatingHeart.className = 'floating-heart';
          floatingHeart.style.cssText = `
            position: fixed;
            font-size: 30px;
            color: #ff69b4;
            pointer-events: none;
            animation: floatHeart ${1 + Math.random()}s ease-out forwards;
            z-index: 9998;
          `;
          floatingHeart.innerHTML = '🕸️';
          
          // Random position
          floatingHeart.style.left = `${Math.random() * 100}vw`;
          floatingHeart.style.top = `${Math.random() * 100}vh`;
          
          document.body.appendChild(floatingHeart);
          
          // Remove after animation
          setTimeout(() => floatingHeart.remove(), 2000);
        }
        
        // Remove big effect after animation
        setTimeout(() => loveEffect.remove(), 2000);
        
        // Reset click count
        clickCount = 0;
      }
    });
  }

  // Cool wave effect and floating text for specific cards
  const specialCards = [1, 13, 14, 17];
  specialCards.forEach(cardNumber => {
    const card = document.querySelector(`.student-card:nth-child(${cardNumber})`);
    if (card) {
      // Add floating "web dev" text
      const webDevText = document.createElement('div');
      webDevText.className = 'web-dev-text';
      webDevText.style.cssText = `
        position: absolute;
        font-size: 12px;
        color: var(--primary);
        font-weight: bold;
        opacity: 0.7;
        pointer-events: none;
        animation: floatText 3s ease-in-out infinite;
        z-index: 1000;
        text-shadow: 0 0 5px rgba(168, 85, 247, 0.5);
      `;
      webDevText.textContent = cardNumber === 17 ? 'web dev/creator' : 'web dev';
      card.appendChild(webDevText);

      // Function to show cool effect
      function showCoolEffect() {
        // Add tech wave effect
        const wave = document.createElement('div');
        wave.className = 'wave-effect';
        wave.style.cssText = `
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(45deg, #00ff00, #00ffff);
          opacity: 0;
          border-radius: 15px;
          animation: wave 1s ease-out forwards;
          z-index: -1;
        `;
        card.appendChild(wave);

        // Add tech cool text effect
        const coolText = document.createElement('div');
        coolText.className = 'cool-text';
        coolText.style.cssText = `
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          font-size: 24px;
          color: #00ff00;
          font-weight: bold;
          opacity: 0;
          text-shadow: 0 0 10px rgba(0, 255, 0, 0.8);
          animation: coolText 1s ease-out forwards;
          z-index: 1001;
          white-space: nowrap;
          font-family: 'Courier New', monospace;
        `;
        coolText.textContent = '⚡ A.K.A ⚡';
        card.appendChild(coolText);

        // Add binary rain effect
        for (let i = 0; i < 10; i++) {
          const binary = document.createElement('div');
          binary.className = 'binary-rain';
          binary.style.cssText = `
            position: absolute;
            color: #00ff00;
            font-family: 'Courier New', monospace;
            font-size: 14px;
            opacity: 0;
            animation: binaryRain 1s ease-out forwards;
            z-index: 1000;
          `;
          binary.textContent = Math.random() > 0.5 ? '1' : '0';
          binary.style.left = `${Math.random() * 100}%`;
          binary.style.top = `${Math.random() * 100}%`;
          card.appendChild(binary);
          setTimeout(() => binary.remove(), 1000);
        }

        // Remove elements after animation
        setTimeout(() => {
          wave.remove();
          coolText.remove();
        }, 1000);
      }

      // Add hover effect
      card.addEventListener('mouseenter', showCoolEffect);
      
      // Add click effect
      card.addEventListener('click', showCoolEffect);
    }
  });
  
  // Add styles for animations
  const style = document.createElement('style');
  style.textContent = `
    @keyframes floatHeart {
      0% {
        transform: translateY(0) scale(1);
        opacity: 1;
      }
      100% {
        transform: translateY(-100px) scale(0);
        opacity: 0;
      }
    }
    
    @keyframes bigLove {
      0% {
        transform: scale(0);
        opacity: 0;
      }
      50% {
        transform: scale(1.2);
        opacity: 1;
      }
      100% {
        transform: scale(1);
        opacity: 0;
      }
    }

    @keyframes floatText {
      0%, 100% {
        transform: translateY(0) rotate(-5deg);
      }
      50% {
        transform: translateY(-10px) rotate(5deg);
      }
    }

    @keyframes wave {
      0% {
        opacity: 0;
        transform: scale(0.8);
      }
      50% {
        opacity: 0.3;
      }
      100% {
        opacity: 0;
        transform: scale(1.2);
      }
    }

    @keyframes coolText {
      0% {
        opacity: 0;
        transform: translate(-50%, -50%) scale(0.5);
      }
      50% {
        opacity: 1;
        transform: translate(-50%, -50%) scale(1.2);
      }
      100% {
        opacity: 0;
        transform: translate(-50%, -50%) scale(1);
      }
    }

    @keyframes binaryRain {
      0% {
        opacity: 0;
        transform: translateY(-20px);
      }
      50% {
        opacity: 0.8;
      }
      100% {
        opacity: 0;
        transform: translateY(20px);
      }
    }
  `;
  document.head.appendChild(style);

  const commentInput = document.getElementById('commentInput');
  const commentsList = document.getElementById('commentsList');
  const submitButton = document.getElementById('submitComment');
  let lastCommentTime = 0; // Track last comment time
  
  // Add name input field
  const commentForm = document.querySelector('.comment-form');
  const nameInput = document.createElement('input');
  nameInput.type = 'text';
  nameInput.id = 'commentName';
  nameInput.className = 'comment-input';
  nameInput.placeholder = 'Masukkan nama Anda...';
  nameInput.style.marginBottom = '1rem';
  commentForm.insertBefore(nameInput, commentInput);

  // Show message function
  function showMessage(text, bgColor = 'var(--primary)') {
    const message = document.createElement('div');
    message.className = 'success-message';
    message.textContent = text;
    message.style.cssText = `
      background: ${bgColor};
      color: white;
      padding: 1rem;
      border-radius: 8px;
      margin: 1rem 0;
      text-align: center;
      animation: fadeOut 3s forwards;
      position: fixed;
      top: 20px;
      left: 50%;
      transform: translateX(-50%);
      z-index: 1000;
      min-width: 200px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    `;
    document.body.appendChild(message);
    setTimeout(() => message.remove(), 3000);
  }
  
  // Load comments from localStorage
  function loadComments() {
    const comments = JSON.parse(localStorage.getItem('comments')) || [];
    commentsList.innerHTML = '';
    
    comments.forEach(comment => {
      const commentElement = document.createElement('div');
      commentElement.className = 'comment-item';
      commentElement.innerHTML = `
        <div class="comment-header">
          <img src="assets/user.png" alt="Anonymous User" class="comment-avatar">
          <span class="comment-name">${comment.name || 'Anonymous'}</span>
        </div>
        <p class="comment-text">${comment.text}</p>
        <div class="comment-meta">
          <span class="comment-time">${new Date(comment.timestamp).toLocaleString()}</span>
        </div>
      `;
      commentsList.appendChild(commentElement);
    });
  }
  
  // Save comment to localStorage
  function saveComment() {
    const commentText = commentInput.value.trim();
    const commentName = nameInput.value.trim();
    const currentTime = Date.now();
    
    // Check for 5-second delay
    if (currentTime - lastCommentTime < 5000) {
      const remainingTime = Math.ceil((5000 - (currentTime - lastCommentTime)) / 1000);
      showMessage(`Mohon tunggu ${remainingTime} detik lagi sebelum mengirim komentar baru`, '#dc2626');
      return;
    }
    
    if (!commentText) {
      showMessage('Mohon isi komentar terlebih dahulu!', '#dc2626');
      return;
    }
    
    try {
      const comments = JSON.parse(localStorage.getItem('comments')) || [];
      comments.unshift({
        text: commentText,
        name: commentName || 'Anonymous',
        timestamp: new Date().toISOString()
      });
      
      localStorage.setItem('comments', JSON.stringify(comments));
      commentInput.value = '';
      nameInput.value = '';
      lastCommentTime = currentTime;
      loadComments();
      showMessage('Komentar berhasil dikirim!');
    } catch (error) {
      console.error('Error saving comment:', error);
      showMessage('Maaf, terjadi kesalahan saat menyimpan komentar.', '#dc2626');
    }
  }

  // Add click event listener to submit button
  if (submitButton) {
    submitButton.addEventListener('click', saveComment);
  }

  // Add enter key support
  if (commentInput) {
    commentInput.addEventListener('keypress', function(e) {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        saveComment();
      }
    });
  }
  
  // Initial load of comments
  loadComments();
}); 
