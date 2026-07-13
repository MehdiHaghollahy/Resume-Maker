self.addEventListener('install', (e) => {
  console.log('Resume Builder Service Worker Installed');
});

self.addEventListener('fetch', (e) => {
  // کدهای کش کردن در حالت آفلاین را بعداً می‌توانید اینجا توسعه دهید
});
