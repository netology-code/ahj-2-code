function showNotification() {
  const notification = new Notification('Начался урок в Нетологии!', {
    body: 'Geolocation, notification, media',
    icon: './img/netology.png',
    image: './img/js.png',
    requireInteraction: true,
  });
  
  console.log(notification);
  
  notification.addEventListener('click', () => {
    console.log('click');
    
    notification.close();
    location.href = 'https://netology.ru';
  });
  
  notification.addEventListener('close', () => {
    console.log('close');
  });
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
    const permissions = await Notification.requestPermission();
    
    if (permission) {
      // TODO: show notification
      console.log('granted after query');

      showNotification()
      
      return;
    }
  }
})();