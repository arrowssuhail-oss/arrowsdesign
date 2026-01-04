"use client"
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Badge } from './ui/badge';
import { Wifi, WifiOff } from 'lucide-react';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export default function StatusCheck() {
    const [status, setStatus] = useState<'checking' | 'online' | 'offline'>('checking');

    useEffect(() => {
        const checkStatus = async () => {
            try {
                await axios.get(`${API_URL}/api`);
                setStatus('online');
            } catch (error) {
                console.error('API connection failed:', error);
                setStatus('offline');
            }
        };

        checkStatus();
        const interval = setInterval(checkStatus, 30000); // Check every 30 seconds
        return () => clearInterval(interval);
    }, []);

    if (status === 'checking') return null;

    return (
        <div className="fixed bottom-4 right-4 z-[60]">
            <Badge
                variant={status === 'online' ? 'default' : 'destructive'}
                className="flex items-center gap-2 px-3 py-1.5 shadow-lg backdrop-blur-md bg-opacity-80"
            >
                {status === 'online' ? (
                    <>
                        <Wifi className="h-3.5 w-3.5" />
                        <span className="text-[10px] font-semibold uppercase tracking-wider text-white">System Online</span>
                    </>
                ) : (
                    <>
                        <WifiOff className="h-3.5 w-3.5" />
                        <span className="text-[10px] font-semibold uppercase tracking-wider">System Offline</span>
                    </>
                )}
            </Badge>
        </div>
    );
}
