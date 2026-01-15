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
        <div className="min-h-screen bg-black flex items-center justify-center p-4 relative overflow-hidden selection:bg-rose-500/30">
            {/* Ambient Background & Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-purple-500/20 rounded-full blur-[100px] opacity-50" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-rose-500/20 rounded-full blur-[100px] opacity-50" />
            </div>

            <div className="w-full max-w-[450px] relative z-10">
                <div className="text-center mb-10 space-y-2">
                    <div className="inline-block animate-in slide-in-from-top-4 fade-in duration-700">
                        <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-transparent bg-clip-text bg-gradient-to-r from-white to-white/50 border border-white/10 rounded-full px-3 py-1 bg-white/5 backdrop-blur-md">
                            Arrows Design
                        </span>
                    </div>
                    <h1 className="text-5xl font-black text-white tracking-tighter animate-in slide-in-from-bottom-4 fade-in duration-700 delay-100">
                        Welcome Back
                    </h1>
                    <p className="text-white/80 text-sm font-light animate-in slide-in-from-bottom-4 fade-in duration-700 delay-200">
                        Enter your credentials to access the command center.
                    </p>
                </div>

                <div className="bg-black/40 backdrop-blur-3xl border border-white/10 p-10 rounded-[2.5rem] shadow-2xl animate-in scale-95 fade-in duration-700 delay-300 transition-all duration-500 hover:scale-[1.01] hover:border-white/20 hover:shadow-purple-500/10 hover:ring-1 hover:ring-white/10 group/card">
                    <form onSubmit={handleSubmit} className="space-y-7">
                        <div className="space-y-3 group/input">
                            <Label className="text-xs uppercase text-white/70 font-bold tracking-widest ml-1 group-focus-within/input:text-white transition-colors">Username</Label>
                            <Input
                                type="text"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="username"
                                className="bg-white/5 border-white/10 text-white h-14 text-lg rounded-2xl focus:border-white/30 focus:ring-0 placeholder:text-white/40 transition-all duration-300 hover:bg-white/10 focus:bg-white/10 pl-5"
                                required
                            />
                        </div>

                        <div className="space-y-3 group/input">
                            <Label className="text-xs uppercase text-white/70 font-bold tracking-widest ml-1 group-focus-within/input:text-white transition-colors">Password</Label>
                            <div className="relative">
                                <Input
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    className="bg-white/5 border-white/10 text-white h-14 text-lg rounded-2xl focus:border-white/30 focus:ring-0 placeholder:text-white/40 pr-12 transition-all duration-300 hover:bg-white/10 focus:bg-white/10 pl-5"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-white/20 hover:text-white hover:scale-110 transition-all duration-300"
                                >
                                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                </button>
                            </div>
                        </div>

                        <Button
                            type="submit"
                            disabled={loading}
                            className="w-full h-14 rounded-2xl bg-white text-black hover:bg-white/90 hover:scale-[1.02] active:scale-[0.98] font-bold text-md transition-all duration-300 group shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)] hover:shadow-[0_0_60px_-10px_rgba(255,255,255,0.5)]"
                        >
                            {loading ? (
                                <Loader2 className="w-5 h-5 animate-spin text-black/50" />
                            ) : (
                                <span className="flex items-center gap-2">
                                    Sign In <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </span>
                            )}
                        </Button>
                    </form>
                </div>

                <div className="text-center mt-10 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-500">
                    <p className="text-[10px] text-white/20 uppercase tracking-[0.2em] font-medium border-t border-white/5 pt-6 inline-block px-4">
                        Restricted Access <span className="mx-2">•</span> Authorized Only
                    </p>
                </div>
            </div>
        </div>
    );
}
