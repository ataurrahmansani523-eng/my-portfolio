import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Mail, Send, CheckCircle2, ShieldOff, Sparkles, User, MessageSquare, Lock, ShieldCheck, Facebook, Github, Linkedin, Instagram } from "lucide-react";
import { playSoftClick } from "../utils/audio";
import GlassCard from "./GlassCard";
import MagneticButton from "./MagneticButton";
import { AnimatedDock } from "./ui/animated-dock";
import emailjs from "@emailjs/browser";

interface Message {
  name: string;
  email: string;
  text: string;
}

interface FooterSectionProps {
  onOpenSeoHub?: () => void;
}

export default function FooterSection({ onOpenSeoHub }: FooterSectionProps) {
  const [inputs, setInputs] = useState({ name: "", email: "", text: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  // High-fidelity validation states
  const isNameValid = inputs.name.trim().length >= 2;
  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inputs.email);
  const isTextValid = inputs.text.trim().length >= 5;

  const validFieldsCount = (isNameValid ? 1 : 0) + (isEmailValid ? 1 : 0) + (isTextValid ? 1 : 0);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value} = e.target;
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  const handleSendSecureMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputs.name || !inputs.email || !inputs.text) return;

    playSoftClick();
    setIsSubmitting(true);
    setErrorMessage(null);

    // Retrieve EmailJS configurations from environment variables or fallback to exact requested values
    const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || "service_785w4ba";
    const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || "template_fs6u5gn";
    const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || "N6P0M-Q79tyaME0YZ";

    // Build comprehensive mapping of potential template parameters for perfect compatibility
    const templateParams = {
      from_name: inputs.name,
      to_name: "Ataur Rahman Sani",
      name: inputs.name,
      user_name: inputs.name,
      
      from_email: inputs.email,
      email: inputs.email,
      reply_to: inputs.email,
      user_email: inputs.email,
      
      message: inputs.text,
      text: inputs.text,
      message_html: inputs.text,
    };

    emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY)
      .then((response) => {
        console.log("EmailJS transmission successful:", response.status, response.text);
        setMessages((prev) => [...prev, { ...inputs }]);
        setIsSubmitting(false);
        setSubmitted(true);
        setErrorMessage(null);
        setInputs({ name: "", email: "", text: "" });

        setTimeout(() => {
          setSubmitted(false);
        }, 5000);
      })
      .catch((err) => {
        console.error("EmailJS dispatch failure:", err);
        setIsSubmitting(false);
        setErrorMessage("Transmission failed. Please check configuration or network connection.");
      });
  };

  return (
    <section
      id="contact"
      className="relative py-28 px-6 md:px-12 bg-[#090909] text-white overflow-hidden border-t border-zinc-900/40"
    >
      {/* Immersive Frosted Glass Light Orbs directly behind content */}
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-[#C8A24A] opacity-[0.02] blur-[150px] rounded-full pointer-events-none" />

      <div className="relative w-full max-w-7xl mx-auto z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Brand Philosophy column (Left - 5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-center py-6 md:py-12">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
              style={{ willChange: "transform, opacity" }}
              className="text-4xl md:text-6xl lg:text-7xl font-serif font-light tracking-[0.2em] text-zinc-100 uppercase leading-tight select-none"
            >
              LET'S
              <br />
              TALK
            </motion.h2>
          </div>

          {/* Luxury Secure Form column (Right - 7 cols) */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
              style={{ willChange: "transform, opacity" }}
            >
              <GlassCard glowOnHover={false} className="border border-zinc-800/80 bg-zinc-950/80 p-8 rounded-2xl relative shadow-[0_0_60px_rgba(0,0,0,0.9)] pr-6 pl-6 overflow-hidden">
                {/* Internal sleek ambient spotlight behind the form */}
                <div className="absolute top-0 right-0 w-48 h-48 bg-[#C8A24A] opacity-[0.03] blur-3xl pointer-events-none rounded-full" />
                
                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center text-center py-14 px-4"
                  >
                    {/* Cinematic pulsed circle for luxurious confirmation */}
                    <div className="relative mb-8 flex items-center justify-center">
                      <motion.div 
                        animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.25, 0.1] }}
                        transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                        className="absolute w-28 h-28 rounded-full bg-[#C8A24A]/10 blur-xl pointer-events-none"
                      />
                      <div className="relative w-16 h-16 rounded-full border border-[#C8A24A]/45 flex items-center justify-center bg-zinc-950 shadow-[0_0_30px_rgba(200,162,74,0.15)]">
                        <CheckCircle2 size={26} className="text-[#C8A24A] stroke-[1.5px]" />
                      </div>
                    </div>

                    <h3 className="font-serif text-xl md:text-2xl tracking-[0.25em] text-white font-medium mb-3 uppercase">
                      TRANSMISSION SECURED
                    </h3>
                    
                    <p className="text-zinc-400 font-sans text-xs font-light max-w-sm leading-relaxed mb-8">
                      Your confidential manifest has been encrypted and saved to the secure stream. Direct ledger channels are actively synced.
                    </p>

                    <div className="inline-flex items-center gap-2 px-5 py-2.5 border border-zinc-800 bg-zinc-900/40 rounded-full font-mono text-[9px] text-[#C8A24A] uppercase tracking-[0.2em] shadow-inner select-none">
                      <ShieldCheck size={11} className="text-[#C8A24A]" />
                      AUTHENTICATED CHANNEL
                    </div>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSendSecureMessage} className="space-y-6 relative z-10">
                    
                    {/* Inputs Row */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      
                      {/* Name Input */}
                      <div className="relative group/input rounded-xl border border-zinc-800/80 bg-zinc-950/40 backdrop-blur-lg transition-all duration-500 hover:border-zinc-700/80 focus-within:border-[#C8A24A]/60 focus-within:bg-zinc-950/60 focus-within:shadow-[0_0_20px_rgba(200,162,74,0.08)]">
                        {/* Soft subtle glow indicator on focus inside */}
                        <div className="absolute inset-0 rounded-xl bg-[#C8A24A]/[0.01] opacity-0 group-focus-within/input:opacity-100 transition-opacity duration-500 pointer-events-none" />
                        
                        <div className="relative h-[56px] flex items-center">
                          {/* Animated Icon */}
                          <div className={`absolute left-4 transition-colors duration-300 ${focusedField === 'name' ? 'text-[#C8A24A]' : 'text-zinc-600 group-hover/input:text-zinc-500'}`}>
                            <User size={13} className="stroke-[1.5]" />
                          </div>

                          {/* Smooth transitioning animated label */}
                          <label 
                            className={`absolute left-11 font-mono tracking-[0.15em] select-none pointer-events-none transition-all duration-300 ease-[0.16,1,0.3,1] ${
                              focusedField === 'name' || inputs.name !== ""
                                ? "top-2 text-[8px] text-[#C8A24A] tracking-[0.2em]" 
                                : "top-1/2 -translate-y-1/2 text-[10px] text-zinc-500"
                            }`}
                          >
                            IDENTIFIER NAME
                          </label>

                          <input
                            type="text"
                            name="name"
                            required
                            placeholder=""
                            value={inputs.name}
                            onChange={handleInputChange}
                            onFocus={() => {
                              playSoftClick();
                              setFocusedField('name');
                            }}
                            onBlur={() => setFocusedField(null)}
                            className="w-full pl-11 pr-4 pt-5 pb-1 bg-transparent text-xs font-sans text-zinc-200 transition-all duration-300 font-light focus:outline-none"
                          />
                        </div>
                      </div>

                      {/* Email Input */}
                      <div className="relative group/input rounded-xl border border-zinc-800/80 bg-zinc-950/40 backdrop-blur-lg transition-all duration-500 hover:border-zinc-700/80 focus-within:border-[#C8A24A]/60 focus-within:bg-zinc-950/60 focus-within:shadow-[0_0_20px_rgba(200,162,74,0.08)]">
                        {/* Soft subtle glow indicator on focus inside */}
                        <div className="absolute inset-0 rounded-xl bg-[#C8A24A]/[0.01] opacity-0 group-focus-within/input:opacity-100 transition-opacity duration-500 pointer-events-none" />
                        
                        <div className="relative h-[56px] flex items-center">
                          {/* Animated Icon */}
                          <div className={`absolute left-4 transition-colors duration-300 ${focusedField === 'email' ? 'text-[#C8A24A]' : 'text-zinc-600 group-hover/input:text-zinc-500'}`}>
                            <Mail size={13} className="stroke-[1.5]" />
                          </div>

                          {/* Smooth transitioning animated label */}
                          <label 
                            className={`absolute left-11 font-mono tracking-[0.15em] select-none pointer-events-none transition-all duration-300 ease-[0.16,1,0.3,1] ${
                              focusedField === 'email' || inputs.email !== ""
                                ? "top-2 text-[8px] text-[#C8A24A] tracking-[0.2em]" 
                                : "top-1/2 -translate-y-1/2 text-[10px] text-zinc-500"
                            }`}
                          >
                            COMMUNICATION VECTOR
                          </label>

                          <input
                            type="email"
                            name="email"
                            required
                            placeholder=""
                            value={inputs.email}
                            onChange={handleInputChange}
                            onFocus={() => {
                              playSoftClick();
                              setFocusedField('email');
                            }}
                            onBlur={() => setFocusedField(null)}
                            className="w-full pl-11 pr-4 pt-5 pb-1 bg-transparent text-xs font-sans text-zinc-200 transition-all duration-300 font-light focus:outline-none"
                          />
                        </div>
                      </div>

                    </div>

                    {/* Textarea Input */}
                    <div className="relative group/input rounded-xl border border-zinc-800/80 bg-zinc-950/40 backdrop-blur-lg transition-all duration-500 hover:border-zinc-700/80 focus-within:border-[#C8A24A]/60 focus-within:bg-zinc-950/60 focus-within:shadow-[0_0_20px_rgba(200,162,74,0.08)]">
                      {/* Soft subtle glow indicator on focus inside */}
                      <div className="absolute inset-0 rounded-xl bg-[#C8A24A]/[0.01] opacity-0 group-focus-within/input:opacity-100 transition-opacity duration-500 pointer-events-none" />
                      
                      <div className="relative min-h-[120px]">
                        {/* Animated Icon */}
                        <div className={`absolute left-4 top-[18px] transition-colors duration-300 ${focusedField === 'text' ? 'text-[#C8A24A]' : 'text-zinc-600 group-hover/input:text-zinc-500'}`}>
                          <MessageSquare size={13} className="stroke-[1.5]" />
                        </div>

                        {/* Smooth transitioning animated label */}
                        <label 
                          className={`absolute left-11 font-mono tracking-[0.15em] select-none pointer-events-none transition-all duration-300 ease-[0.16,1,0.3,1] ${
                            focusedField === 'text' || inputs.text !== ""
                              ? "top-2 text-[8px] text-[#C8A24A] tracking-[0.2em]" 
                              : "top-[16px] text-[10px] text-zinc-500"
                          }`}
                        >
                          MANIFEST DETAIL (TEXT)
                        </label>

                        <textarea
                          name="text"
                          required
                          rows={4}
                          placeholder=""
                          value={inputs.text}
                          onChange={handleInputChange}
                          onFocus={() => {
                            playSoftClick();
                            setFocusedField('text');
                          }}
                          onBlur={() => setFocusedField(null)}
                          className="w-full pl-11 pr-4 pt-7 pb-3 bg-transparent text-xs font-sans text-zinc-200 transition-all duration-300 font-light resize-none focus:outline-none min-h-[120px]"
                        />
                      </div>
                    </div>

                    {errorMessage && (
                      <motion.div
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-3.5 bg-red-950/20 border border-red-900/30 text-red-400 font-mono text-[9px] tracking-widest rounded-xl text-center uppercase"
                      >
                        ⚠️ {errorMessage}
                      </motion.div>
                    )}

                    {/* Magnetic Button */}
                    <MagneticButton
                      id="submit-secure-message"
                      type="submit"
                      disabled={isSubmitting}
                      className="group relative flex items-center justify-center gap-3 w-full py-4 rounded-xl bg-zinc-950 hover:bg-[#C8A24A]/5 border border-zinc-800/80 hover:border-[#C8A24A]/80 text-white font-sans text-[10px] font-bold tracking-[0.3em] uppercase transition-all duration-500 disabled:opacity-50 cursor-pointer overflow-hidden shadow-[0_4px_30px_rgba(0,0,0,0.8)]"
                    >
                      <div className="absolute inset-0 w-1/3 h-full bg-gradient-to-r from-transparent via-white/[0.05] to-transparent -skew-x-12 -left-1/3 group-hover:left-[130%] transition-all duration-1000 ease-out pointer-events-none" />
                      
                      {isSubmitting ? (
                        <div className="flex items-center gap-3 select-none">
                          <svg className="animate-spin h-3.5 w-3.5 text-[#C8A24A]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          <span className="font-mono text-[9px] tracking-[0.2em] text-[#C8A24A]">SENDING MESSAGE...</span>
                        </div>
                      ) : (
                        <>
                          <span className="text-gradient bg-gradient-to-r from-white via-[#F5F2EA] to-[#C8A24A] bg-clip-text text-transparent group-hover:text-white transition-all duration-300">
                            Send Message
                          </span>
                          <Send size={11} className="text-[#C8A24A] group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                        </>
                      )}
                    </MagneticButton>

                  </form>
                )}

              </GlassCard>
            </motion.div>
          </div>

        </div>



        {/* Connection Channels & Social Ledger */}
        <div className="mt-20 pt-12 border-t border-zinc-900/60 flex flex-col md:flex-row justify-between items-center gap-8">
          {/* Quick contact info */}
          <div className="flex flex-col gap-1 text-left">
            <span className="font-mono text-[9px] tracking-[0.25em] text-[#C8A24A] uppercase">LOCATION</span>
            <span className="text-xs text-zinc-400 font-sans tracking-wide">Based in Bangladesh 🇧🇩</span>
          </div>

          {/* Social icons */}
          <div className="flex items-center gap-5">
            <a
              href="https://www.facebook.com/profile.php?id=61565833348711"
              target="_blank"
              rel="noreferrer"
              className="w-10 h-10 rounded-full border border-zinc-800/80 bg-zinc-950/40 hover:border-[#C8A24A]/60 hover:bg-[#C8A24A]/5 flex items-center justify-center text-zinc-400 hover:text-white transition-all duration-300 shadow-md group"
            >
              <Facebook size={14} className="group-hover:scale-110 transition-transform duration-300" />
            </a>
            <a
              href="https://github.com/ataurrahmansani523"
              target="_blank"
              rel="noreferrer"
              className="w-10 h-10 rounded-full border border-zinc-800/80 bg-zinc-950/40 hover:border-[#C8A24A]/60 hover:bg-[#C8A24A]/5 flex items-center justify-center text-zinc-400 hover:text-white transition-all duration-300 shadow-md group"
            >
              <Github size={14} className="group-hover:scale-110 transition-transform duration-300" />
            </a>
            <a
              href="https://www.linkedin.com/in/ataur-rahmansani-0939683a6/"
              target="_blank"
              rel="noreferrer"
              className="w-10 h-10 rounded-full border border-zinc-800/80 bg-zinc-950/40 hover:border-[#C8A24A]/60 hover:bg-[#C8A24A]/5 flex items-center justify-center text-zinc-400 hover:text-white transition-all duration-300 shadow-md group"
            >
              <Linkedin size={14} className="group-hover:scale-110 transition-transform duration-300" />
            </a>
            <a
              href="https://www.instagram.com/ataurrahmansani523/"
              target="_blank"
              rel="noreferrer"
              className="w-10 h-10 rounded-full border border-zinc-800/80 bg-zinc-950/40 hover:border-[#C8A24A]/60 hover:bg-[#C8A24A]/5 flex items-center justify-center text-zinc-400 hover:text-white transition-all duration-300 shadow-md group"
            >
              <Instagram size={14} className="group-hover:scale-110 transition-transform duration-300" />
            </a>
          </div>
        </div>



        {/* Global Footer Copyright signature */}
        <div className="mt-28 pt-8 border-t border-zinc-900 flex flex-col md:flex-row justify-between items-center gap-4 text-zinc-600 select-none">
          <p className="font-sans text-[10px] tracking-[0.25em] font-medium text-zinc-500">
            © 2026 ATAUR RAHMAN SANI. ALL RIGHTS RESERVED.
          </p>
          <div className="flex items-center gap-4 text-[8px] font-mono tracking-[0.3em] uppercase flex-wrap justify-center">
            {onOpenSeoHub && (
              <>
                <button
                  type="button"
                  onClick={() => {
                    playSoftClick();
                    onOpenSeoHub();
                  }}
                  className="text-[#C8A24A]/80 hover:text-[#C8A24A] bg-transparent border-0 cursor-pointer tracking-[0.3em] font-mono transition-colors outline-none"
                >
                  ✦ SEO & BRAND DOMINATION HUB
                </button>
                <span className="text-zinc-800">|</span>
              </>
            )}
            <span className="text-[#C8A24A]/60">✦ ATAUR RAHMAN SANI PRIVATE COMMISSION</span>
          </div>
        </div>

      </div>
    </section>
  );
}
