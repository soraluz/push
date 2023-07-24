'use strict'

self.addEventListener('push', function (event) {
  console.log("evento push",event.data.text())
  const data = JSON.parse(event.data.text())
  event.waitUntil(
    self.registration.showNotification(data.title, {
      body: data.message,
      icon: '/icons/android-chrome-192x192.png',
      dir:"rtl",
      vibrate:[300,100,400],
      actions:[
        {
          action:'explore',title:"Opcion explorar",
        },
        {
          action:'close',title:"Opcion cerrar"
        }
      ] ,
    
    })
  )
})

self.addEventListener('install', function (event) {
  console.log("Se instalo el aplicativo")
})

self.addEventListener('notificationclick', function (event) {
  console.log("click en notificacion")

  event.notification.close()
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then(function (clientList) {
      if (clientList.length > 0) {
        let client = clientList[0]
        for (let i = 0; i < clientList.length; i++) {
          if (clientList[i].focused) {
            client = clientList[i]
          }
        }
        return client.focus()
      }
      return clients.openWindow('/')
    })
  )
}) 

// self.addEventListener('pushsubscriptionchange', function(event) {
//   event.waitUntil(
//       Promise.all([
//           Promise.resolve(event.oldSubscription ? deleteSubscription(event.oldSubscription) : true),
//           Promise.resolve(event.newSubscription ? event.newSubscription : subscribePush(registration))
//               .then(function(sub) { return saveSubscription(sub) })
//       ])
//   )
// })