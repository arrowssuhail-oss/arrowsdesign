"use client";

import React, { useState } from 'react';
import { IKContext, IKUpload } from 'imagekitio-react';
import { Button } from "@/components/ui/button";
import { Loader2, UploadCloud } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';
// You must set this in your frontend .env.local
const publicKey = process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY;
const urlEndpoint = process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT;

interface ImageUploadProps {
    onSuccess: (url: string) => void;
    className?: string;
    folder?: string;
}

export default function ImageUpload({ onSuccess, className, folder }: ImageUploadProps) {
    const [uploading, setUploading] = useState(false);
    const { toast } = useToast();

    const authenticator = async () => {
        try {
            const response = await fetch(`${API_URL}/imagekit/auth`);
            if (!response.ok) {
                throw new Error(`Authentication request failed: ${response.statusText}`);
            }
            const data = await response.json();
            return data;
        } catch (error) {
            throw new Error(`Authentication failed: ${error instanceof Error ? error.message : String(error)}`);
        }
    };

    const onError = (err: any) => {
        console.error("ImageKit Upload Error (Full Details):", err);
        if (err && err.message) console.error("Error Message:", err.message);
        setUploading(false);
        toast({
            title: "Upload Failed",
            description: `Error: ${err.message || "Could not upload media."}`,
            variant: "destructive"
        });
    };

    const onSuccessHandler = (res: any) => {
        setUploading(false);
        console.log("Upload Success (Full Response):", res);
        console.log("Uploaded URL:", res.url);
        console.log("File ID:", res.fileId);
        onSuccess(res.url);
        toast({
            title: "Upload Successful",
            description: "Media successfully stored in cloud.",
        });
    };

    const onUploadStart = () => {
        setUploading(true);
    };

    if (!publicKey || !urlEndpoint) {
        return <div className="text-red-500 text-xs">Missing ImageKit Public Key or URL Endpoint</div>;
    }

    return (
        <IKContext
            publicKey={publicKey}
            urlEndpoint={urlEndpoint}
            authenticator={authenticator}
        >
            <div className={`relative ${className}`}>
                <IKUpload
                    fileName="arrow_upload_"
                    useUniqueFileName={true}
                    validateFile={(file: File) => true} // No client-side limit
                    folder={folder}
                    onUploadStart={onUploadStart}
                    onSuccess={onSuccessHandler}
                    onError={onError}
                    onClick={() => document.getElementById('ik-upload-input')?.click()}
                    style={{ display: 'none' }} // Hide default input
                    id="ik-upload-input"
                />

                <label
                    htmlFor="ik-upload-input"
                    className={`flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors ${uploading ? 'opacity-50 pointer-events-none' : ''}`}
                >
                    {uploading ? (
                        <div className="flex flex-col items-center text-muted-foreground">
                            <Loader2 className="w-8 h-8 animate-spin mb-2" />
                            <span className="text-sm">Uploading...</span>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center text-muted-foreground">
                            <UploadCloud className="w-8 h-8 mb-2" />
                            <span className="text-sm font-semibold">Click to Upload Media</span>
                            <span className="text-xs text-gray-400 mt-1">Images or Videos</span>
                        </div>
                    )}
                </label>
            </div>
        </IKContext>
    );
}
