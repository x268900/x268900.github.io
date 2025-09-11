
/*方案三：Canvas動態星空 (需加在body結束前)*/

    document.addEventListener('DOMContentLoaded', () => {
      const canvas = document.createElement('canvas');
      canvas.style.position = 'fixed';
      canvas.style.pointerEvents = 'none'; // 新增穿透點擊事件 
      canvas.style.top = 0;
      canvas.style.left = 0;
      canvas.style.zIndex = -1;
      document.body.appendChild(canvas);
      
      const ctx = canvas.getContext('2d');
      function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
      window.addEventListener('resize', resize);
      resize();

      // 星空動畫邏輯
      class Star {
        constructor() {
          this.reset();
        }
        reset() {
          this.x = Math.random() * canvas.width;
          this.y = Math.random() * canvas.height;
          this.size = Math.random() * 3;
          this.speed = Math.random() * 0.5;
        }
        update() {
          this.y += this.speed;
          if (this.y > canvas.height) this.reset();
        }
        draw() {
          ctx.fillStyle = `rgba(255,255,255,${this.size/3})`;
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.size, 0, Math.PI*2);
          ctx.fill();
        }
      }

      const stars = Array(100).fill().map(() => new Star());
      function animate() {
        ctx.fillStyle = 'rgba(11, 16, 35, 0.2)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        stars.forEach(star => {
          star.update();
          star.draw();
        });
        requestAnimationFrame(animate);
      }
      animate();
    });





    const imageModal = document.getElementById('imageModal');
const modalImage = document.getElementById('modalImage');

imageModal.addEventListener('show.bs.modal', function (event) {
  const trigger = event.relatedTarget; // 觸發 modal 的元素
  const imgSrc = trigger.getAttribute('data-bs-image');
  modalImage.src = imgSrc;
});