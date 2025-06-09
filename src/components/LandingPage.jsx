"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  Menu,
  X,
  ArrowRight,
  ChevronRight,
  Mail,
  MapPin,
  Phone,
  Calendar,
  CreditCard,
  Users,
  CheckCircle,
  Zap,
  MoveRight,
  PhoneCall,
  Share2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";

// Animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemFadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

const logos = [
  {
    name: 'PayPal',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="7.056000232696533 3 37.35095977783203 45"><g xmlns="http://www.w3.org/2000/svg" clip-path="url(#a)"><path fill="#002991" d="M38.914 13.35c0 5.574-5.144 12.15-12.927 12.15H18.49l-.368 2.322L16.373 39H7.056l5.605-36h15.095c5.083 0 9.082 2.833 10.555 6.77a9.687 9.687 0 0 1 .603 3.58z"></path><path fill="#60CDFF" d="M44.284 23.7A12.894 12.894 0 0 1 31.53 34.5h-5.206L24.157 48H14.89l1.483-9 1.75-11.178.367-2.322h7.497c7.773 0 12.927-6.576 12.927-12.15 3.825 1.974 6.055 5.963 5.37 10.35z"></path><path fill="#008CFF" d="M38.914 13.35C37.31 12.511 35.365 12 33.248 12h-12.64L18.49 25.5h7.497c7.773 0 12.927-6.576 12.927-12.15z"></path></g></svg>`
  },
  {
    name: 'Google Drive',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 87.3 78"><path fill="#0066da" d="m6.6 66.85 3.85 6.65c.8 1.4 1.95 2.5 3.3 3.3L27.5 53H0c0 1.55.4 3.1 1.2 4.5z"/><path fill="#00ac47" d="M43.65 25 29.9 1.2c-1.35.8-2.5 1.9-3.3 3.3l-25.4 44A9.06 9.06 0 0 0 0 53h27.5z"/><path fill="#ea4335" d="M73.55 76.8c1.35-.8 2.5-1.9 3.3-3.3l1.6-2.75L86.1 57.5c.8-1.4 1.2-2.95 1.2-4.5H59.798l5.852 11.5z"/><path fill="#00832d" d="M43.65 25 57.4 1.2C56.05.4 54.5 0 52.9 0H34.4c-1.6 0-3.15.45-4.5 1.2z"/><path fill="#2684fc" d="M59.8 53H27.5L13.75 76.8c1.35.8 2.9 1.2 4.5 1.2h50.8c1.6 0 3.15-.45 4.5-1.2z"/><path fill="#ffba00" d="m73.4 26.5-12.7-22c-.8-1.4-1.95-2.5-3.3-3.3L43.65 25 59.8 53h27.45c0-1.55-.4-3.1-1.2-4.5z"/></svg>`
  },
  {
    name: 'Microsoft Azure',
    svg: `<svg viewBox="0 0 96 96" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="a" x1="-1032.17" x2="-1059.21" y1="145.31" y2="65.43" gradientTransform="matrix(1 0 0 -1 1075 158)" gradientUnits="userSpaceOnUse"><stop offset="0" stopColor="#114a8b"/><stop offset="1" stopColor="#0669bc"/></linearGradient><linearGradient id="b" x1="-1023.73" x2="-1029.98" y1="108.08" y2="105.97" gradientTransform="matrix(1 0 0 -1 1075 158)" gradientUnits="userSpaceOnUse"><stop offset="0" stopOpacity=".3"/><stop offset=".07" stopOpacity=".2"/><stop offset=".32" stopOpacity=".1"/><stop offset=".62" stopOpacity=".05"/><stop offset="1" stopOpacity="0"/></linearGradient><linearGradient id="c" x1="-1027.16" x2="-997.48" y1="147.64" y2="68.56" gradientTransform="matrix(1 0 0 -1 1075 158)" gradientUnits="userSpaceOnUse"><stop offset="0" stopColor="#3ccbf4"/><stop offset="1" stopColor="#2892df"/></linearGradient></defs><path fill="url(#a)" d="M33.34 6.54h26.04l-27.03 80.1a4.15 4.15 0 0 1-3.94 2.81H8.15a4.14 4.14 0 0 1-3.93-5.47L29.4 9.38a4.15 4.15 0 0 1 3.94-2.83z"/><path fill="#0078d4" d="M71.17 60.26H29.88a1.91 1.91 0 0 0-1.3 3.31l26.53 24.76a4.17 4.17 0 0 0 2.85 1.13h23.38z"/><path fill="url(#b)" d="M33.34 6.54a4.12 4.12 0 0 0-3.95 2.88L4.25 83.92a4.14 4.14 0 0 0 3.91 5.54h20.79a4.44 4.44 0 0 0 3.4-2.9l5.02-14.78 17.91 16.7a4.24 4.24 0 0 0 2.67.97h23.29L71.02 60.26H41.24L59.47 6.55z"/><path fill="url(#c)" d="M66.6 9.36a4.14 4.14 0 0 0-3.93-2.82H33.65a4.15 4.15 0 0 1 3.93 2.82l25.18 74.62a4.15 4.15 0 0 1-3.93 5.48h29.02a4.15 4.15 0 0 0 3.93-5.48z"/></svg>`
  },
  {
    name: 'Amazon Web Services',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" xml:space="preserve" x="0" y="0" viewBox="0 0 304 182"><path fill="#252f3e" d="m86 66 2 9c0 3 1 5 3 8v2l-1 3-7 4-2 1-3-1-4-5-3-6c-8 9-18 14-29 14-9 0-16-3-20-8-5-4-8-11-8-19s3-15 9-20c6-6 14-8 25-8a79 79 0 0 1 22 3v-7c0-8-2-13-5-16-3-4-8-5-16-5l-11 1a80 80 0 0 0-14 5h-2c-1 0-2-1-2-3v-5l1-3c0-1 1-2 3-2l12-5 16-2c12 0 20 3 26 8 5 6 8 14 8 25v32zM46 82l10-2c4-1 7-4 10-7l3-6 1-9v-4a84 84 0 0 0-19-2c-6 0-11 1-15 4-3 2-4 6-4 11s1 8 3 11c3 2 6 4 11 4zm80 10-4-1-2-3-23-78-1-4 2-2h10l4 1 2 4 17 66 15-66 2-4 4-1h8l4 1 2 4 16 67 17-67 2-4 4-1h9c2 0 3 1 3 2v2l-1 2-24 78-2 4-4 1h-9l-4-1-1-4-16-65-15 64-2 4-4 1h-9zm129 3a66 66 0 0 1-27-6l-3-3-1-2v-5c0-2 1-3 2-3h2l3 1a54 54 0 0 0 23 5c6 0 11-2 14-4 4-2 5-5 5-9l-2-7-10-5-15-5c-7-2-13-6-16-10a24 24 0 0 1 5-34l10-5a44 44 0 0 1 20-2 110 110 0 0 1 12 3l4 2 3 2 1 4v4c0 3-1 4-2 4l-4-2c-6-2-12-3-19-3-6 0-11 0-14 2s-4 5-4 9c0 3 1 5 3 7s5 4 11 6l14 4c7 3 12 6 15 10s5 9 5 14l-3 12-7 8c-3 3-7 5-11 6l-14 2z"/><path d="M274 144A220 220 0 0 1 4 124c-4-3-1-6 2-4a300 300 0 0 0 263 16c5-2 10 4 5 8z" fill="#f90"/><path d="M287 128c-4-5-28-3-38-1-4 0-4-3-1-5 19-13 50-9 53-5 4 5-1 36-18 51-3 2-6 1-5-2 5-10 13-33 9-38z" fill="#f90"/></svg>`
  },
  {
    name: 'Slack',
    svg: `<svg enable-background="new 0 0 2447.6 2452.5" viewBox="0 0 2447.6 2452.5" xmlns="http://www.w3.org/2000/svg"><g clip-rule="evenodd" fill-rule="evenodd"><path d="m897.4 0c-135.3.1-244.8 109.9-244.7 245.2-.1 135.3 109.5 245.1 244.8 245.2h244.8v-245.1c.1-135.3-109.5-245.1-244.9-245.3.1 0 .1 0 0 0m0 654h-652.6c-135.3.1-244.9 109.9-244.8 245.2-.2 135.3 109.4 245.1 244.7 245.3h652.7c135.3-.1 244.9-109.9 244.8-245.2.1-135.4-109.5-245.2-244.8-245.3z" fill="#36c5f0"/><path d="m2447.6 899.2c.1-135.3-109.5-245.1-244.8-245.2-135.3.1-244.9 109.9-244.8 245.2v245.3h244.8c135.3-.1 244.9-109.9 244.8-245.3zm-652.7 0v-654c.1-135.2-109.4-245-244.7-245.2-135.3.1-244.9 109.9-244.8 245.2v654c-.2 135.3 109.4 245.1 244.7 245.3 135.3-.1 244.9-109.9 244.8-245.3z" fill="#2eb67d"/><path d="m1550.1 2452.5c135.3-.1 244.9-109.9 244.8-245.2.1-135.3-109.5-245.1-244.8-245.2h-244.8v245.2c-.1 135.2 109.5 245 244.8 245.2zm0-654.1h652.7c135.3-.1 244.9-109.9 244.8-245.2.2-135.3-109.4-245.1-244.7-245.3h-652.7c-135.3.1-244.9 109.9-244.8 245.2-.1 135.4 109.4 245.2 244.7 245.3z" fill="#ecb22e"/><path d="m0 1553.2c-.1 135.3 109.5 245.1 244.8 245.2 135.3-.1 244.9-109.9 244.8-245.2v-245.2h-244.8c-135.3.1-244.9 109.9-244.8 245.2zm652.7 0v654c-.2 135.3 109.4 245.1 244.7 245.3 135.3-.1 244.9-109.9 244.8-245.2v-653.9c.2-135.3-109.4-245.1-244.7-245.3-135.4 0-244.9 109.8-244.8 245.1 0 0 0 .1 0 0" fill="#e01e5a"/></g></svg>`
  },
];

const FeatureCard = ({ icon, title, description }) => {
  return (
    <motion.div
      variants={itemFadeIn}
      whileHover={{ y: -10, transition: { duration: 0.3 } }}
      className="group relative overflow-hidden rounded-xl border p-6 shadow-sm transition-all hover:shadow-md bg-background/80"
    >
      <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-all duration-300"></div>
      <div className="relative space-y-3">
        <div className="mb-4 text-primary">{icon}</div>
        <h3 className="text-xl font-bold">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
      </div>
      <div className="mt-4 flex items-center justify-between">
        <Link href="#" className="text-sm font-medium text-primary underline-offset-4 hover:underline">
          Learn more
        </Link>
        <motion.div whileHover={{ x: 5 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
          <ArrowRight className="h-4 w-4 text-primary" />
        </motion.div>
      </div>
    </motion.div>
  );
};

const TestimonialCard = ({ quote, author, company }) => {
  return (
    <motion.div
      variants={itemFadeIn}
      whileHover={{ y: -10 }}
      className="flex flex-col justify-between rounded-xl border bg-background p-6 shadow-sm"
    >
      <div>
        <div className="flex gap-0.5 text-yellow-500">
          {[...Array(5)].map((_, i) => (
            <svg
              key={i}
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-5 w-5"
            >
              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
            </svg>
          ))}
        </div>
        <blockquote className="mt-4 text-lg font-medium leading-relaxed">"{quote}"</blockquote>
      </div>
      <div className="mt-6 flex items-center">
        <div className="h-10 w-10 rounded-full bg-muted"></div>
        <div className="ml-4">
          <p className="font-medium">{author}</p>
          <p className="text-sm text-muted-foreground">{company}</p>
        </div>
      </div>
    </motion.div>
  );
};

const IntegrationCard = ({ icon, name }) => {
  return (
    <motion.div
      variants={itemFadeIn}
      whileHover={{ scale: 1.05 }}
      className="flex flex-col items-center justify-center rounded-xl border bg-background p-6 text-center shadow-sm"
    >
      <div className="mb-4 rounded-full bg-primary/10 p-3 text-primary">{icon}</div>
      <h3 className="font-medium">{name}</h3>
    </motion.div>
  );
};

function TrustedBySection() {
  return (
    <section
      className="w-full py-12 md:py-16 bg-gradient-to-r from-white via-[#f7fafc] to-white relative"
    >
      <div className="w-full max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <p className="text-sm text-muted-foreground font-semibold tracking-widest uppercase">TRUSTED BY ORGANIZATIONS WORLDWIDE</p>
        </div>
        <div className="relative overflow-hidden py-8">
          <div className="flex gap-12 animate-slide group" style={{ animation: 'slide 30s linear infinite' }}>
            {logos.concat(logos).concat(logos).map((logo, idx) => (
              <div key={idx} className="flex items-center justify-center h-20 w-28 bg-white rounded-xl shadow p-4 border hover:scale-105 transition-transform duration-300">
                <span className="sr-only">{logo.name}</span>
                <span
                  dangerouslySetInnerHTML={{ __html: logo.svg }}
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '64px', height: '64px', maxWidth: '100%', maxHeight: '100%' }}
                />
              </div>
            ))}
          </div>
        </div>
        <style>{`
          @keyframes slide {
            0% { transform: translateX(0); }
            100% { transform: translateX(-33.3333%); }
          }
        `}</style>
      </div>
    </section>
  );
}

export function JenerateLandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Floating, rounded, shadowed navbar */}
      <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[90vw] max-w-4xl bg-white border rounded-full shadow-lg flex items-center justify-between px-8 py-3">
        {/* Logo */}
        <div className="font-bold text-2xl tracking-tight select-none">LOGO</div>
        {/* Desktop Nav Links */}
        <div className="hidden md:flex gap-6 mx-auto">
          <div className="relative flex flex-col items-center">
            <span className="font-semibold text-black">Start Here</span>
            <span className="w-1 h-1 bg-black rounded-full mt-1"></span>
          </div>
          <a href="#benefits" className="text-black/80 hover:text-black transition">Benefits</a>
          <a href="#process" className="text-black/80 hover:text-black transition">Process</a>
          <a href="#compare" className="text-black/80 hover:text-black transition">Compare</a>
          <a href="#pricing" className="text-black/80 hover:text-black transition">Pricing</a>
          <a href="#faqs" className="text-black/80 hover:text-black transition">FAQs</a>
        </div>
        {/* Desktop View Plans Button */}
        <a
          href="#plans"
          className="hidden md:inline-block bg-black text-white rounded-full px-6 py-2 font-semibold shadow hover:bg-gray-900 transition"
        >
          View Plans
        </a>
        {/* Mobile Hamburger */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <button aria-label="Open menu">
                <Menu className="h-7 w-7" />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="w-64 p-0">
              <div className="flex flex-col h-full">
                <div className="font-bold text-2xl tracking-tight select-none px-6 pt-6 pb-4">LOGO</div>
                <nav className="flex flex-col gap-4 px-6">
                  <a href="#start" className="font-semibold text-black">Start Here</a>
                  <a href="#benefits" className="text-black/80 hover:text-black transition">Benefits</a>
                  <a href="#process" className="text-black/80 hover:text-black transition">Process</a>
                  <a href="#compare" className="text-black/80 hover:text-black transition">Compare</a>
                  <a href="#pricing" className="text-black/80 hover:text-black transition">Pricing</a>
                  <a href="#faqs" className="text-black/80 hover:text-black transition">FAQs</a>
                </nav>
                <a
                  href="#plans"
                  className="mt-8 mx-6 mb-6 bg-black text-white rounded-full px-6 py-2 font-semibold shadow hover:bg-gray-900 transition text-center"
                >
                  View Plans
                </a>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
      <div className="h-24" /> {/* Spacer for fixed navbar */}

      <main className="flex-1">
        {/* Hero Section */}
        <section
          className="w-full py-12 md:py-24 lg:py-32 bg-[#fafbfb] relative"
          style={{
            backgroundColor: '#fafbfb',
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Crect x='0' y='0' width='40' height='40' fill='none'/%3E%3Cpath d='M40 0H0V40' stroke='%23e5e7eb' stroke-width='1'/%3E%3C/svg%3E")`,
            backgroundRepeat: 'repeat',
            backgroundSize: '40px 40px',
            zIndex: 0,
          }}
        >
          <div className="w-full max-w-4xl mx-auto flex flex-col items-center px-4 space-y-8">
            {/* Top badge */}
            <div className="flex items-center px-4 py-1 rounded-full bg-black text-white text-sm font-medium shadow border border-black/10 mb-2">
              <span className="mr-2">New 🎉</span>
              <span>Make your guests feel special with <span className="underline underline-offset-2">Guest Feature</span></span>
              <span className="ml-2 text-lg">→</span>
            </div>
            {/* Main headline */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-center leading-tight text-black">
              A ticket system that<br />
              works like an{" "}
              <span className="inline-block align-middle rounded-full px-8 py-2 bg-[#d2f4ee] shadow text-[#009688] font-extrabold text-4xl sm:text-5xl md:text-6xl" style={{boxShadow: "0 4px 24px 0 #d2f4ee"}}>
                Organiser
              </span>
            </h1>
            {/* Subheadline */}
            <p className="text-center text-lg text-gray-600 max-w-2xl mt-2">
              Great events deserve a system that does it all, from making tickets and smooth checkouts to helping you market and track performances.
            </p>
            {/* CTA buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
              <button className="flex items-center gap-2 bg-black text-white rounded-full px-7 py-3 font-semibold text-lg shadow hover:bg-gray-900 transition">
                <span className="text-xl">✨</span> Get an Invite
              </button>
              <button className="flex items-center gap-2 bg-white text-black rounded-full px-7 py-3 font-semibold text-lg shadow border hover:bg-gray-50 transition">
                <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="Avatar" className="w-7 h-7 rounded-full border" />
                Book a Call
              </button>
            </div>
          </div>
        </section>

        <TrustedBySection />

        {/* Features Section */}
        <section id="features" className="w-full py-12 md:py-24 lg:py-32">
          <div className="w-full max-w-7xl mx-auto px-4 md:px-8">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-3">
                <Badge variant="outline">Features</Badge>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Everything you need to manage registrations
                </h2>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Jenerate provides all the tools you need to create, manage, and optimize your registration process.
                </p>
              </div>
            </div>
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="mx-auto grid max-w-5xl gap-6 py-12 md:grid-cols-2 lg:grid-cols-3"
            >
              <FeatureCard
                icon={<Calendar className="h-10 w-10" />}
                title="Custom Registration Forms"
                description="Create beautiful, branded registration forms for any type of event or course."
              />
              <FeatureCard
                icon={<CreditCard className="h-10 w-10" />}
                title="Payment Processing"
                description="Accept payments securely with multiple payment gateway options."
              />
              <FeatureCard
                icon={<Users className="h-10 w-10" />}
                title="Attendee Management"
                description="Easily manage registrants, send communications, and track attendance."
              />
              <FeatureCard
                icon={<Mail className="h-10 w-10" />}
                title="Email Marketing"
                description="Integrate with popular email marketing platforms to nurture your audience."
              />
              <FeatureCard
                icon={<CheckCircle className="h-10 w-10" />}
                title="Automated Workflows"
                description="Set up automated confirmation emails, reminders, and follow-ups."
              />
              <FeatureCard
                icon={<Zap className="h-10 w-10" />}
                title="Analytics & Reporting"
                description="Get insights into registration trends, conversion rates, and revenue."
              />
            </motion.div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="w-full py-12 md:py-24 lg:py-32 bg-muted/30">
          <div className="w-full max-w-7xl mx-auto px-4 md:px-8">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-3">
                <Badge variant="outline">How It Works</Badge>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Simple process, powerful results
                </h2>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Get up and running in minutes with our intuitive platform.
                </p>
              </div>
            </div>
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="mx-auto max-w-3xl py-12"
            >
              <div className="relative flex flex-col gap-12 md:gap-16">
                {/* Vertical line connector */}
                <div className="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-primary/30 via-primary/10 to-transparent rounded-full pointer-events-none" style={{zIndex:0}} />
                {/* Steps */}
                {[
                  {
                    icon: <Calendar className="h-8 w-8 text-primary" />, // Step 1: Create
                    title: "Create your form",
                    description:
                      "Design your registration form with our drag-and-drop builder. Add custom fields, branding, and payment options.",
                  },
                  {
                    icon: <Share2 className="h-8 w-8 text-primary" />, // Step 2: Share
                    title: "Share with your audience",
                    description:
                      "Publish your form with a custom URL, embed it on your website, or share via email and social media.",
                  },
                  {
                    icon: <Users className="h-8 w-8 text-primary" />, // Step 3: Manage
                    title: "Manage registrations",
                    description:
                      "Track registrations, process payments, and communicate with attendees all from one dashboard.",
                  },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    variants={itemFadeIn}
                    whileHover={{ scale: 1.03, boxShadow: "0 4px 24px 0 rgba(0,0,0,0.08)" }}
                    className="relative z-10 flex items-start gap-6 group bg-white/90 rounded-xl p-6 shadow hover:shadow-lg transition-all border border-primary/10"
                  >
                    {/* Icon with animated ring */}
                    <div className="relative flex flex-col items-center">
                      <motion.div
                        whileHover={{ scale: 1.15, rotate: 8 }}
                        className="flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-all duration-300 shadow"
                      >
                        {item.icon}
                      </motion.div>
                      {/* Connector line except for last step */}
                      {index < 2 && (
                        <div className="w-1 h-12 bg-primary/20 mt-2 rounded-full" />
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="mb-2 text-xl font-bold text-left">{item.title}</h3>
                      <p className="text-muted-foreground text-left">{item.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Integrations Section */}
        <section id="integrations" className="w-full py-12 md:py-24 lg:py-32">
          <div className="w-full max-w-7xl mx-auto px-4 md:px-8">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-3">
                <Badge variant="outline">Integrations</Badge>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Connect with your favorite tools
                </h2>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Jenerate seamlessly integrates with the tools you already use to run your business.
                </p>
              </div>
            </div>
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="mx-auto grid max-w-5xl gap-6 py-12 md:grid-cols-3 lg:grid-cols-4"
            >
              {[
                { icon: <Mail className="h-6 w-6" />, name: "Mailchimp" },
                { icon: <Calendar className="h-6 w-6" />, name: "Google Calendar" },
                { icon: <CreditCard className="h-6 w-6" />, name: "Stripe" },
                { icon: <CreditCard className="h-6 w-6" />, name: "PayPal" },
                { icon: <Mail className="h-6 w-6" />, name: "ConvertKit" },
                { icon: <Calendar className="h-6 w-6" />, name: "Outlook" },
                { icon: <Users className="h-6 w-6" />, name: "Zoom" },
                { icon: <Mail className="h-6 w-6" />, name: "ActiveCampaign" },
              ].map((integration, index) => (
                <IntegrationCard key={index} icon={integration.icon} name={integration.name} />
              ))}
            </motion.div>
          </div>
        </section>

        {/* Testimonials */}
        <section id="testimonials" className="w-full py-12 md:py-24 lg:py-32 bg-muted/30">
          <div className="w-full max-w-7xl mx-auto px-4 md:px-8">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-3">
                <Badge variant="outline">Testimonials</Badge>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  What our customers say
                </h2>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Don't just take our word for it - hear from some of our satisfied customers.
                </p>
              </div>
            </div>
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="mx-auto grid max-w-5xl gap-6 py-12 md:grid-cols-2"
            >
              <TestimonialCard
                quote="Jenerate has transformed how we manage our workshop registrations. The process is now seamless for both us and our attendees."
                author="Sarah Johnson"
                company="Education Director, TechLearn"
              />
              <TestimonialCard
                quote="We've increased our event registrations by 40% since switching to Jenerate. The forms are beautiful and the payment processing is flawless."
                author="Michael Chen"
                company="Event Manager, ConferenceHub"
              />
              <TestimonialCard
                quote="The integration with our email marketing platform has made follow-up so much easier. We're seeing much better engagement with our course participants."
                author="Emma Rodriguez"
                company="Marketing Director, SkillsAcademy"
              />
              <TestimonialCard
                quote="Setting up registration forms used to take days. With Jenerate, we can create professional forms in minutes. It's been a game-changer for our business."
                author="David Kim"
                company="Founder, WorkshopPro"
              />
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="w-full max-w-7xl mx-auto px-4 md:px-8">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-3">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Ready to simplify your registration process?
                </h2>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Join thousands of businesses that use Jenerate to create beautiful registration experiences.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Button size="xl" className="h-16 px-10 text-xl font-semibold group">
                  Get started for free
                  <motion.span
                    initial={{ x: 0 }}
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </motion.span>
                </Button>
                <Button variant="outline" size="lg">
                  View pricing
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full border-t bg-muted/20">
        <div className="container grid gap-8 px-4 py-10 md:px-6 lg:grid-cols-4 mx-auto max-w-7xl rounded-xl border bg-white/80 shadow-sm mt-8" style={{ borderColor: '#e5e7eb', boxShadow: '0 2px 16px 0 rgba(0,0,0,0.04)' }}>
          <div className="space-y-3 col-span-4 flex flex-col items-center text-center">
            <Link href="/" className="flex items-center space-x-3 justify-center">
              <motion.div
                whileHover={{ rotate: 5, scale: 1.1 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                className="h-10 w-10 rounded-xl bg-primary flex items-center justify-center"
              >
                <Calendar className="h-5 w-5 text-primary-foreground" />
              </motion.div>
              <span className="font-bold text-xl">Jenerate</span>
            </Link>
            <p className="text-sm text-muted-foreground max-w-md">
              Create user-friendly registration forms for courses, events, and workshops. Seamlessly collect payments,
              manage attendees, and integrate with your favorite tools.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:col-span-2 lg:grid-cols-3">
            <div>
              <h3 className="text-lg font-medium">Product</h3>
              <nav className="mt-4 flex flex-col space-y-2 text-sm">
                <Link href="#features" className="text-muted-foreground hover:text-foreground">
                  Features
                </Link>
                <Link href="#" className="text-muted-foreground hover:text-foreground">
                  Pricing
                </Link>
                <Link href="#" className="text-muted-foreground hover:text-foreground">
                  Security
                </Link>
                <Link href="#" className="text-muted-foreground hover:text-foreground">
                  Roadmap
                </Link>
              </nav>
            </div>
            <div>
              <h3 className="text-lg font-medium">Resources</h3>
              <nav className="mt-4 flex flex-col space-y-2 text-sm">
                <Link href="#" className="text-muted-foreground hover:text-foreground">
                  Blog
                </Link>
                <Link href="#" className="text-muted-foreground hover:text-foreground">
                  Documentation
                </Link>
                <Link href="#" className="text-muted-foreground hover:text-foreground">
                  Guides
                </Link>
                <Link href="#" className="text-muted-foreground hover:text-foreground">
                  Help Center
                </Link>
              </nav>
            </div>
            <div>
              <h3 className="text-lg font-medium">Company</h3>
              <nav className="mt-4 flex flex-col space-y-2 text-sm">
                <Link href="#" className="text-muted-foreground hover:text-foreground">
                  About
                </Link>
                <Link href="#" className="text-muted-foreground hover:text-foreground">
                  Careers
                </Link>
                <Link href="#" className="text-muted-foreground hover:text-foreground">
                  Contact
                </Link>
                <Link href="#" className="text-muted-foreground hover:text-foreground">
                  Partners
                </Link>
              </nav>
            </div>
          </div>
          <div className="space-y-3">
            <h3 className="text-lg font-medium">Subscribe to our newsletter</h3>
            <p className="text-sm text-muted-foreground">
              Get the latest updates on new features, case studies, and tips.
            </p>
            <form className="flex space-x-3">
              <Input type="email" placeholder="Enter your email" className="max-w-lg flex-1" />
              <Button type="submit">Subscribe</Button>
            </form>
          </div>
        </div>
        <div className="border-t">
          <div className="container flex flex-col items-center justify-between gap-3 py-6 md:h-16 md:flex-row md:py-0 mx-auto max-w-7xl">
            <span className="text-sm text-muted-foreground">© {new Date().getFullYear()} Jenerate. All rights reserved.</span>
            <div className="flex gap-4 text-sm text-muted-foreground">
              <a href="/terms" className="hover:underline">Terms</a>
              <a href="/privacy" className="hover:underline">Privacy</a>
              <a href="/cookies" className="hover:underline">Cookies</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function JenerateLandingPageDemo() {
  return <JenerateLandingPage />;
}
