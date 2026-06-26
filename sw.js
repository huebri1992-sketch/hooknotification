self.addEventListener('push', function (event) {
  const data = event.data ? event.data.json() : { title: 'Hello', body: 'Push received.' };

  const title = data.title || 'Notification';
  const options = {
    body: data.body || '',
    icon: data.icon, // optional
    badge: data.badge, // optional
    data: data.url ? { url: data.url } : undefined
  };

  event.waitUntil(
    self.registration.showNotification(title, options)
  );
});

self.addEventListener('notificationclick', function (event) {
  event.notification.close();

  const url = event.notification?.data?.url || '/';
  event.waitUntil(clients.openWindow(url));
});
