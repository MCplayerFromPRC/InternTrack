'use client';

import { WebSocketProvider } from 'next-ws/client';

export default function WSComp({ children }: React.PropsWithChildren) {
  return <>
    <WebSocketProvider url="/api/subscriptions">{children}</WebSocketProvider>
  </>
}