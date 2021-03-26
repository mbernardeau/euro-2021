/* eslint-disable no-restricted-globals */
/* eslint-disable no-undef */
/* eslint-env worker */
importScripts('https://www.gstatic.com/firebasejs/8.3.0/firebase-app.js')
importScripts('https://www.gstatic.com/firebasejs/8.3.0/firebase-messaging.js')

firebase.initializeApp({
  apiKey: 'AIzaSyDhYtLgdmUJS08BUl0bN3LHxND5a-KId7g',
  authDomain: 'euro2021-3d006.firebaseapp.com',
  databaseURL: 'https://euro2021-3d006.firebaseio.com',
  projectId: 'euro2021-3d006',
  storageBucket: 'euro2021-3d006.appspot.com',
  messagingSenderId: '227571739008',
  appId: '1:227571739008:web:6024da3fda61ac0cb13965',
  measurementId: 'G-VHC3B020NE',
})

const messaging = firebase.messaging()

/**
 * Handler lorsque l'on clique sur la notification.
 * Dans ce cas on essaye de chercher un onglet déjà ouvert sur l'application (même origine que le sw).
 * - Si c'est le cas, on `focus` cet onglet ;
 * - Sinon, on ouvre un nouvel onglet.
 */
self.onnotificationclick = (event) => {
  console.log('On notification click: ', event.notification)
  event.notification.close()

  // This looks to see if the current is already open and
  // focuses if it is
  event.waitUntil(
    clients
      .matchAll({
        type: 'window',
      })
      .then((clientList) => {
        console.log(clients, clientList)
        for (let i = 0; i < clientList.length; i++) {
          const client = clientList[i]
          if (client.url === '/' && 'focus' in client) {
            return client.focus()
          }
        }
        if (clients.openWindow) {
          // Récupération de l'url relative depuis la notification, par défaut on ouvre la page d'accueil
          return clients.openWindow(event.notification.data.url || '/')
        }
      }),
  )
}

messaging.onBackgroundMessage(({ data }) => {
  console.log('[firebase-messaging-sw.js] Received background message ', data)

  const { title, body, ...payload } = data

  const notificationOptions = {
    body: data.body || buildNotificationBody(data),
    icon: '/icon-192x192.png',
    lang: 'fr',
    data: payload,
  }

  self.registration.showNotification(data.title, notificationOptions)
})

/**
 * Construction du corps de la notification localement au client
 *
 * @param {{ notificationType: "PREMATCH", matchDateTime: string }} data
 * @returns {string} Texte à mettre dans le body de la notification
 */
function buildNotificationBody(data) {
  if (data.notificationType === 'PREMATCH') {
    // En construisant la date localement, on s'assure que l'heure correspond bien à l'heure locale du périphérique
    const { matchDateTime } = data
    const matchTime = new Date(matchDateTime)
    const hours = matchTime.getHours()
    const minutes = matchTime.getMinutes()

    return `Vous n'avez pas encore fait votre pari. Le match commence à ${hours}h${
      minutes > 0 ? `${minutes}` : ''
    }.`
  }
}
