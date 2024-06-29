'use client';
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import { Bell } from 'lucide-react';
import { useSocket } from '@/app/contexts/WebsocketContext';
import { toast } from 'sonner';

const NotificationBar = () => {
  const { data: session } = useSession();
  const socket = useSocket();
  const [messages, setMessages] = useState<string[]>([]);
  useEffect(() => {
    if (session?.user.id && socket) {
      console.log('Registering user...');
      socket.emit('register', { userId: session?.user.id });

      socket.on('notification', (message) => {
        toast(`Notification: ${message.message}`);
        setMessages((prevMessages) => [...prevMessages, message.message]);
      });
    }

    return () => {
      console.log('Unregistering events...');
      socket?.off('notification');
    };
  }, [session, socket]);
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Bell
            className={cn(
              'h-6 w-4 relative',
              session?.user.token ? 'flex' : 'hidden'
            )}
          />
          {messages.length > 0 ? (
            <>
              <span className="absolute font-medium text-xs top-2 px-1 rounded-full bg-gray-700">
                {messages.length}
              </span>
            </>
          ) : null}
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {messages.length > 0 ? (
            <>
              {messages.map((item, index) => (
                <DropdownMenuItem key={index}>
                  <p>{item}</p>
                </DropdownMenuItem>
              ))}
            </>
          ) : (
            <DropdownMenuItem>
              <p>No new notiications to show.</p>
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default NotificationBar;
