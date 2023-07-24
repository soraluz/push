import { useEffect, useState } from 'react'
import Head from 'next/head'

const base64ToUint8Array = base64 => {
  const padding = '='.repeat((4 - (base64.length % 4)) % 4)
  const b64 = (base64 + padding).replace(/-/g, '+').replace(/_/g, '/')

  const rawData = window.atob(b64)
  const outputArray = new Uint8Array(rawData.length)

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i)
  }
  return outputArray
}

const Index = () => {

  useEffect(() =>  {
    // run only in browser
    subscribe()      
   /*  setTimeout(() => {
    sendNotification()
    }, 1500) */
  }, [])

  const subscribe = async () => {
    
    let sw=await navigator.serviceWorker.ready;
    let push=await sw.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: base64ToUint8Array(process.env.NEXT_PUBLIC_WEB_PUSH_PUBLIC_KEY)
    })
    await sendNotification(push)   
    // TODO: you should call your API to save subscription data on server in order to send web push notification from server
    console.log('web push subscribed!',push)

  }

  const sendNotification = async(push)  => {
  
    console.log("subscription pasada",push)
    await fetch('/api/notification', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        push
      })
    })
  }

  return (
    <>
      <Head>
        <title>next-pwa example</title>
      </Head>
      <h1>Next.js + PWA = AWESOME!</h1>
    </>
  )
}

export default Index
