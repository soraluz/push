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
/* 
var CACHE_NAME="my-site-cache";
var urlsToCache=[
  "/",
  "/prueba.js"
]

self.addEventListener('install', function (event) {
  console.log("Se instalo el aplicativo")
  event.waitUntil(
    caches.open(CACHE_NAME)
    .then(function(cache){
      console.log("cache abierta")
      return cache.addAll(urlsToCache)
    })
  )
})

self.addEventListener('fetch', function(event){
  console.log("Ingreso a fetch")
  console.log("fetch a ",event.request)
  event.respondWith(
    caches.match(event.request)
    .then(function(response){
      
      if(response){
        return response
      }
      return fetch(event.request)
    })
  )
}) */

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