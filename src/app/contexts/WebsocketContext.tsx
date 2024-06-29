'use client';

import {
  createContext,
  useContext,
  ReactNode,
  useEffect,
  useState,
} from 'react';
import { io, Socket } from 'socket.io-client';
import { useSession } from 'next-auth/react';
//import { BACKEND_URL } from '@/lib/Constants';

export const SocketContext = createContext<Socket | null>(null);

export const SocketProvider = ({ children }: { children: ReactNode }) => {
  const { data: session } = useSession();
  const [socketInstance, setSocketInstance] = useState<Socket | null>(null);

  useEffect(() => {
    if (session?.user) {
      const socket = io('http://localhost:3000', {
        withCredentials: true,
        transports: ['websocket', 'polling', 'flashsocket'],
      });

      socket.on('connect', () => {
        console.log('WebSocket connected');
      });

      socket.on('disconnect', () => {
        console.log('WebSocket disconnected');
      });

      setSocketInstance(socket);
    } else {
      if (socketInstance) {
        socketInstance.disconnect();
        setSocketInstance(null);
      }
    }

    return () => {
      if (socketInstance) {
        socketInstance.disconnect();
        setSocketInstance(null);
      }
    };
  }, [session?.user]);

  return (
    <SocketContext.Provider value={socketInstance}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => useContext(SocketContext);
