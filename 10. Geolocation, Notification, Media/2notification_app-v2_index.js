const start = performance.now() + 60000;
function showNotification() {
  const notifyInterval = setInterval(() => {
    const currentTime = performance.now();

    const notification = new Notification('Начался урок в Нетологии!', {
      tag: 'lesson',
      body: Math.round((start - currentTime) / 1000) + ' секунд осталось',
      icon: './img/netology.png',
      image: './img/js.png',
      requireInteraction: true,
    });

    if (currentTime > start) {
      clearInterval(notifyInterval);
      
      notification.close();
      return;
    }

    console.log(notification);

    notification.addEventListener('click', () => {
      console.log('click');

      notification.close();
      location.href = 'https://netology.ru';
    });
  }, 1000);
}

(async () => {
  if (!window.Notification) {
    return;
  }

  if (Notification.permission === 'granted') {
    // TODO: show notification
    console.log('granted no query');

    showNotification()

    return;
  }

  if (Notification.permission === 'default') {
    const permission = await Notification.requestPermission();

    if (permission) {
      // TODO: show notification
      console.log('granted after query');

      showNotification()

      return;
    }
  }
})();