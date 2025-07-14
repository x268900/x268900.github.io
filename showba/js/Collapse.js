function toggleSubmenu(item) {
  const submenu = item.querySelector('.submenu');
  const toggle = item.querySelector('.toggle');
  if (submenu.style.display === 'block') {
    submenu.style.display = 'none';
    toggle.textContent = '+';
  } else {
    submenu.style.display = 'block';
    toggle.textContent = '-';
  }
}

// 为每个菜单项绑定点击事件
document.querySelectorAll('.menu-item').forEach(item => {
  item.querySelector('.menu-header').addEventListener('click', () => {
    toggleSubmenu(item);
  });
});