import toast from 'react-hot-toast';

export const registerServiceWorkerAndPush = async () => {
  if ('serviceWorker' in navigator) {
    try {
      const registration = await navigator.serviceWorker.register('/sw.js');
      console.log('PWA ServiceWorker registered with scope:', registration.scope);
      return registration;
    } catch (error) {
      console.warn('PWA ServiceWorker registration failed:', error.message);
    }
  }
};

export const requestNotificationPermission = async () => {
  if (!('Notification' in window)) {
    toast.error('Web Push Notifications are not supported in this browser.');
    return false;
  }

  const permission = await Notification.requestPermission();
  if (permission === 'granted') {
    toast.success('Web Push Notifications enabled!');
    return true;
  } else {
    toast.error('Notification permission denied.');
    return false;
  }
};
