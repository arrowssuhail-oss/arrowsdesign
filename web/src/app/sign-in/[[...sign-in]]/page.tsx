'use client';

import { useSignIn } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, ArrowRight, Eye, EyeOff } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

export default function SignInPage() {
    const { isLoaded, signIn, setActive } = useSignIn();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const { toast } = useToast();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!isLoaded) return;
        setLoading(true);

        try {
            const result = await signIn.create({
                identifier: email,
                password,
            });

            if (result.status === "complete") {
                await setActive({ session: result.createdSessionId });
                router.push("/dashboard");
            } else {
                console.error(JSON.stringify(result, null, 2));
                toast({ title: "Login Failed", description: "Something went wrong.", variant: "destructive" });
            }
        } catch (err: any) {
            console.error("error", err.errors?.[0]?.longMessage);
            toast({
                title: "Access Denied",
                description: err.errors?.[0]?.longMessage || "Invalid credentials",
                variant: "destructive"
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-black flex items-center justify-center p-4 relative overflow-hidden">
            {/* Ambient Background */}
            <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none">
                <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-purple-500/20 rounded-full blur-[100px]" />
                <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-rose-500/20 rounded-full blur-[100px]" />
            </div>

            <div className="w-full max-w-[380px] relative z-10 animate-in fade-in zoom-in duration-500">
                <div className="text-center mb-8">
                    <div className="font-bold text-lg tracking-[0.3em] uppercase text-white/40 mb-2">Arrows Design</div>
                    <h1 className="text-4xl font-black text-white tracking-tight">Welcome Back</h1>
                    <p className="text-white/50 mt-2">Enter your credentials to access the command center.</p>
                </div>

                <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-2xl">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <Label className="text-xs uppercase text-white/50 font-bold tracking-wider ml-1">Username</Label>
                            <Input
                                type="text"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="username"
                                className="bg-black/20 border-white/5 text-white h-12 rounded-xl focus:border-white/20 focus:ring-0 placeholder:text-white/20"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label className="text-xs uppercase text-white/50 font-bold tracking-wider ml-1">Password</Label>
                            <div className="relative">
                                <Input
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    className="bg-black/20 border-white/5 text-white h-12 rounded-xl focus:border-white/20 focus:ring-0 placeholder:text-white/20 pr-10"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/70 transition-colors"
                                >
                                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                </button>
                            </div>
                        </div>

                        <Button
                            type="submit"
                            disabled={loading}
                            className="w-full h-12 rounded-xl bg-white text-black hover:bg-white/90 font-bold text-md transition-all duration-300 group"
                        >
                            {loading ? (
                                <Loader2 className="w-5 h-5 animate-spin text-black/50" />
                            ) : (
                                <>
                                    Sign In <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                                </>
                            )}
                        </Button>
                    </form>
                </div>

                <p className="text-center text-xs text-white/20 mt-8 uppercase tracking-widest font-medium">
                    Restricted Access • Authorized Personnel Only
                </p>
            </div>
        </div>
    );
}
