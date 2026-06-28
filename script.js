document.addEventListener('DOMContentLoaded', function() {
  const images = document.querySelectorAll('img');
  
  images.forEach(function(img) {
    img.addEventListener('contextmenu', function(e) {
      e.preventDefault();
    });
    
    // Also disable dragging via JS as a backup
    img.addEventListener('dragstart', function(e) {
      e.preventDefault();
    });
  });
});   