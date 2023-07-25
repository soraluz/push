'use strict'

self.addEventListener('push', function (event) {
  const data = JSON.parse(event.data.text())
  event.waitUntil(
    self.registration.showNotification(data.title, {
      body: data.message,
      icon: '/icons/android-chrome-192x192.png',
      dir:"rtl",
      requireInteraction: true,
      actions:[
        {
          action:'explore',title:"Opcion explorar",
        },
        {
          action:'reply',title:"Reply", type:"text", placeholder:"Escribe su nombre"
        }
      ] ,
    
    })

  )
})

self.addEventListener('install', function (event) {
  console.log("Se instalo el aplicativo")
})


self.addEventListener('notificationclick', function (event) {
//Cierra la notificacion
console.log(event.action)  
//respuesta
console.log(event.reply)  

if(event.action=="explore"){
  console.log("Hizo click en el boton explore",event.action)
}

event.notification.close()

  event.waitUntil(
     clients.openWindow('/prueba')
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