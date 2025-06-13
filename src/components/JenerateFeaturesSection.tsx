"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Calendar, 
  CreditCard, 
  Users, 
  BarChart3, 
  Zap, 
  Shield,
  CheckCircle,
  ArrowRight
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useId } from "react";

interface Feature {
  id: number;
  icon: React.ElementType;
  title: string;
  description: string;
  image: string;
  stats?: string;
}

interface JenerateFeaturesSectionProps {
  features?: Feature[];
  className?: string;
  title?: string;
  subtitle?: string;
  autoPlayInterval?: number;
}

const Grid = ({
  pattern,
  size,
}: {
  pattern?: number[][];
  size?: number;
}) => {
  const p = pattern ?? [
    [7, 1],
    [8, 2],
    [9, 3],
    [10, 4],
    [11, 5],
  ];
  return (
    <div className="pointer-events-none absolute left-1/2 top-0 -ml-20 -mt-2 h-full w-full [mask-image:linear-gradient(white,transparent)]">
      <div className="absolute inset-0 bg-gradient-to-r [mask-image:radial-gradient(farthest-side_at_top,white,transparent)] dark:from-zinc-900/30 from-zinc-100/30 to-zinc-300/30 dark:to-zinc-900/30 opacity-100">
        <GridPattern
          width={size ?? 20}
          height={size ?? 20}
          x="-12"
          y="4"
          squares={p}
          className="absolute inset-0 h-full w-full mix-blend-overlay dark:fill-white/10 dark:stroke-white/10 stroke-black/10 fill-black/10"
        />
      </div>
    </div>
  );
};

function GridPattern({ width, height, x, y, squares, ...props }: { width: number, height: number, x: string, y: string, squares: number[][], [key: string]: unknown }) {
  const patternId = useId();

  return (
    <svg aria-hidden="true" {...props}>
      <defs>
        <pattern
          id={patternId}
          width={width}
          height={height}
          patternUnits="userSpaceOnUse"
          x={x}
          y={y}
        >
          <path d={`M.5 ${height}V.5H${width}`} fill="none" />
        </pattern>
      </defs>
      <rect
        width="100%"
        height="100%"
        strokeWidth={0}
        fill={`url(#${patternId})`}
      />
      {squares && (
        <svg x={x} y={y} className="overflow-visible">
          {squares.map((square: number[]) => (
            <rect
              strokeWidth="0"
              key={`${square[0] ?? 0}-${square[1] ?? 0}`}
              width={width + 1}
              height={height + 1}
              x={(square[0] ?? 0) * width}
              y={(square[1] ?? 0) * height}
            />
          ))}
        </svg>
      )}
    </svg>
  );
}

const FeatureCard = ({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn(`p-6 sm:p-8 relative overflow-hidden group`, className)}>
      {children}
    </div>
  );
};

const FeatureTitle = ({ children }: { children?: React.ReactNode }) => {
  return (
    <p className="max-w-5xl mx-auto text-left tracking-tight text-black dark:text-white text-xl md:text-2xl md:leading-snug font-semibold">
      {children}
    </p>
  );
};

const FeatureDescription = ({ children }: { children?: React.ReactNode }) => {
  return (
    <p className={cn(
      "text-sm md:text-base max-w-4xl text-left mx-auto",
      "text-neutral-600 dark:text-neutral-400 font-normal",
      "text-left max-w-sm mx-0 md:text-sm my-2"
    )}>
      {children}
    </p>
  );
};

const EventRegistrationSkeleton = () => {
  return (
    <div className="relative flex py-8 px-2 gap-4 h-full">
      <div className="w-full p-6 mx-auto bg-white dark:bg-neutral-900 shadow-2xl group h-full rounded-lg border border-neutral-200 dark:border-neutral-800">
        <div className="flex flex-1 w-full h-full flex-col space-y-4">
          <div className="flex items-center justify-between">
            <div className="h-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded w-24"></div>
            <Calendar className="h-5 w-5 text-blue-500" />
          </div>
          <div className="space-y-2">
            <div className="h-6 bg-neutral-200 dark:bg-neutral-700 rounded w-3/4"></div>
            <div className="h-4 bg-neutral-200 dark:bg-neutral-700 rounded w-1/2"></div>
          </div>
          <div className="flex-1 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 rounded-lg p-4 flex items-center justify-center">
            <div className="text-center">
              <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-2" />
              <p className="text-sm text-neutral-600 dark:text-neutral-400">Registration Complete</p>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 z-40 inset-x-0 h-20 bg-gradient-to-t from-white dark:from-black via-white dark:via-black to-transparent w-full pointer-events-none" />
    </div>
  );
};

const PaymentsSkeleton = () => {
  return (
    <div className="relative flex py-8 px-2 gap-4 h-full">
      <div className="w-full p-6 mx-auto bg-white dark:bg-neutral-900 shadow-2xl group h-full rounded-lg border border-neutral-200 dark:border-neutral-800">
        <div className="flex flex-1 w-full h-full flex-col space-y-4">
          <div className="flex items-center justify-between">
            <div className="h-4 bg-gradient-to-r from-green-500 to-emerald-600 rounded w-20"></div>
            <CreditCard className="h-5 w-5 text-green-500" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="h-8 bg-green-100 dark:bg-green-900/20 rounded flex items-center justify-center">
                <span className="text-green-600 dark:text-green-400 font-bold text-lg">$2,450</span>
              </div>
              <div className="h-3 bg-neutral-200 dark:bg-neutral-700 rounded w-16"></div>
            </div>
            <div className="space-y-2">
              <div className="h-8 bg-blue-100 dark:bg-blue-900/20 rounded flex items-center justify-center">
                <span className="text-blue-600 dark:text-blue-400 font-bold text-lg">156</span>
              </div>
              <div className="h-3 bg-neutral-200 dark:bg-neutral-700 rounded w-20"></div>
            </div>
          </div>
          <div className="flex-1 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 rounded-lg p-4">
            <div className="h-full flex items-end space-x-1">
              {[40, 60, 80, 45, 70, 90, 65].map((height, i) => (
                <div
                  key={i}
                  className="bg-gradient-to-t from-green-500 to-emerald-400 rounded-sm flex-1"
                  style={{ height: `${height}%` }}
                ></div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 z-40 inset-x-0 h-20 bg-gradient-to-t from-white dark:from-black via-white dark:via-black to-transparent w-full pointer-events-none" />
    </div>
  );
};

const AnalyticsSkeleton = () => {
  return (
    <div className="relative flex py-8 px-2 gap-4 h-full">
      <div className="w-full p-6 mx-auto bg-white dark:bg-neutral-900 shadow-2xl group h-full rounded-lg border border-neutral-200 dark:border-neutral-800">
        <div className="flex flex-1 w-full h-full flex-col space-y-4">
          <div className="flex items-center justify-between">
            <div className="h-4 bg-gradient-to-r from-purple-500 to-pink-600 rounded w-28"></div>
            <BarChart3 className="h-5 w-5 text-purple-500" />
          </div>
          <div className="grid grid-cols-3 gap-2">
            {[
              { value: "1,234", label: "Attendees", color: "purple" },
              { value: "89%", label: "Satisfaction", color: "pink" },
              { value: "45", label: "Events", color: "indigo" }
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className={`h-8 bg-${stat.color}-100 dark:bg-${stat.color}-900/20 rounded flex items-center justify-center mb-1`}>
                  <span className={`text-${stat.color}-600 dark:text-${stat.color}-400 font-bold text-sm`}>{stat.value}</span>
                </div>
                <div className="h-2 bg-neutral-200 dark:bg-neutral-700 rounded w-full"></div>
              </div>
            ))}
          </div>
          <div className="flex-1 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20 rounded-lg p-4">
            <div className="h-full relative">
              <svg className="w-full h-full" viewBox="0 0 200 100">
                <path
                  d="M 10 80 Q 50 20 100 40 T 190 30"
                  stroke="url(#gradient)"
                  strokeWidth="3"
                  fill="none"
                  className="animate-pulse"
                />
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#8b5cf6" />
                    <stop offset="100%" stopColor="#ec4899" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 z-40 inset-x-0 h-20 bg-gradient-to-t from-white dark:from-black via-white dark:via-black to-transparent w-full pointer-events-none" />
    </div>
  );
};

const IntegrationsSkeleton = () => {
  const integrations = [
    { name: "Stripe", color: "blue" },
    { name: "Zoom", color: "indigo" },
    { name: "Slack", color: "green" },
    { name: "Mailchimp", color: "yellow" },
  ];

  return (
    <div className="relative flex py-8 px-2 gap-4 h-full">
      <div className="w-full p-6 mx-auto bg-white dark:bg-neutral-900 shadow-2xl group h-full rounded-lg border border-neutral-200 dark:border-neutral-800">
        <div className="flex flex-1 w-full h-full flex-col space-y-4">
          <div className="flex items-center justify-between">
            <div className="h-4 bg-gradient-to-r from-orange-500 to-red-600 rounded w-32"></div>
            <Zap className="h-5 w-5 text-orange-500" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            {integrations.map((integration, i) => (
              <motion.div
                key={i}
                className={`p-3 bg-${integration.color}-50 dark:bg-${integration.color}-950/20 rounded-lg border border-${integration.color}-200 dark:border-${integration.color}-800 flex items-center justify-center`}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <span className={`text-${integration.color}-600 dark:text-${integration.color}-400 font-medium text-sm`}>
                  {integration.name}
                </span>
              </motion.div>
            ))}
          </div>
          <div className="flex-1 bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-950/20 dark:to-red-950/20 rounded-lg p-4 flex items-center justify-center">
            <div className="text-center">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm text-neutral-600 dark:text-neutral-400">Connected</span>
              </div>
              <ArrowRight className="h-6 w-6 text-orange-500 mx-auto animate-bounce" />
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 z-40 inset-x-0 h-20 bg-gradient-to-t from-white dark:from-black via-white dark:via-black to-transparent w-full pointer-events-none" />
    </div>
  );
};

export function JenerateFeaturesSection({
  features = [
    {
      id: 1,
      icon: Calendar,
      title: "Event Registration & Ticketing",
      description: "Streamline event registration with customizable forms, automated confirmations, and secure ticket generation.",
      image: "registration",
      stats: "10K+ Events Created"
    },
    {
      id: 2,
      icon: CreditCard,
      title: "Secure Payment Processing",
      description: "Accept payments seamlessly with multiple payment gateways, automated invoicing, and real-time transaction tracking.",
      image: "payments",
      stats: "$2M+ Processed"
    },
    {
      id: 3,
      icon: BarChart3,
      title: "Advanced Analytics",
      description: "Get deep insights into attendee behavior, event performance, and revenue metrics with comprehensive dashboards.",
      image: "analytics",
      stats: "50+ Metrics Tracked"
    },
    {
      id: 4,
      icon: Zap,
      title: "Powerful Integrations",
      description: "Connect with your favorite tools including CRM, email marketing, video conferencing, and productivity apps.",
      image: "integrations",
      stats: "100+ Integrations"
    }
  ],
  className,
  title = "Everything you need to manage events",
  subtitle = "From registration to analytics, Jenerate provides all the tools you need to create successful events and courses.",
  autoPlayInterval = 4000,
}: JenerateFeaturesSectionProps) {
  const [currentFeature, setCurrentFeature] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => (prev >= 100 ? 100 : prev + 2));
    }, autoPlayInterval / 50);

    return () => clearInterval(interval);
  }, [autoPlayInterval]);

  useEffect(() => {
    if (progress >= 100) {
      setTimeout(() => {
        setCurrentFeature((prev) => (prev + 1) % features.length);
        setProgress(0);
      }, 200);
    }
  }, [progress, features.length]);

  const handleFeatureClick = (index: number) => {
    setCurrentFeature(index);
    setProgress(0);
  };

  const renderSkeleton = (type: string) => {
    switch (type) {
      case "registration":
        return <EventRegistrationSkeleton />;
      case "payments":
        return <PaymentsSkeleton />;
      case "analytics":
        return <AnalyticsSkeleton />;
      case "integrations":
        return <IntegrationsSkeleton />;
      default:
        return <EventRegistrationSkeleton />;
    }
  };

  const bentoFeatures = [
    {
      title: "Guest Management",
      description: "Manage attendee lists, send invitations, and track RSVPs with our comprehensive guest management system.",
      skeleton: <div className="h-full bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-950/20 dark:to-indigo-950/20 rounded-lg p-6 flex items-center justify-center">
        <Users className="h-16 w-16 text-blue-500" />
      </div>,
      className: "col-span-1 md:col-span-2 lg:col-span-2 border-b md:border-r dark:border-neutral-800",
    },
    {
      title: "Security & Compliance",
      description: "Enterprise-grade security with GDPR compliance, data encryption, and secure payment processing.",
      skeleton: <div className="h-full bg-gradient-to-br from-green-50 to-emerald-100 dark:from-green-950/20 dark:to-emerald-950/20 rounded-lg p-6 flex items-center justify-center">
        <Shield className="h-16 w-16 text-green-500" />
      </div>,
      className: "col-span-1 md:col-span-2 lg:col-span-2 border-b dark:border-neutral-800",
    },
  ];

  return (
    <div className={cn("relative z-20 py-20 lg:py-32 max-w-7xl mx-auto", className)}>
      <div className="px-8">
        <div className="text-center mb-16">
          <span className="text-blue-600 dark:text-blue-400 font-semibold text-sm uppercase tracking-wider">
            Jenerate Platform
          </span>
          <h2 className="text-4xl lg:text-6xl lg:leading-tight max-w-5xl mx-auto text-center tracking-tight font-bold text-black dark:text-white mt-4">
            {title}
          </h2>
          <p className="text-lg lg:text-xl max-w-3xl my-6 mx-auto text-neutral-600 dark:text-neutral-400 text-center font-normal">
            {subtitle}
          </p>
        </div>

        {/* Interactive Features Section */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          {/* Left Side - Features List */}
          <div className="space-y-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              const isActive = currentFeature === index;

              return (
                <motion.div
                  key={feature.id}
                  className={cn(
                    "relative cursor-pointer p-6 rounded-xl transition-all duration-300 border",
                    isActive
                      ? "bg-white dark:bg-neutral-900 shadow-xl border-blue-200 dark:border-blue-800"
                      : "bg-neutral-50 dark:bg-neutral-900/50 border-neutral-200 dark:border-neutral-800 hover:bg-white dark:hover:bg-neutral-900"
                  )}
                  onClick={() => handleFeatureClick(index)}
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="flex items-start space-x-4">
                    <div className={cn(
                      "p-3 rounded-lg transition-all duration-300",
                      isActive
                        ? "bg-blue-500 text-white"
                        : "bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400"
                    )}>
                      <Icon size={24} />
                    </div>
                    <div className="flex-1">
                      <h3 className={cn(
                        "text-xl font-semibold mb-2 transition-colors duration-300",
                        isActive
                          ? "text-gray-900 dark:text-white"
                          : "text-gray-700 dark:text-gray-300"
                      )}>
                        {feature.title}
                      </h3>
                      <p className={cn(
                        "text-sm transition-colors duration-300",
                        isActive
                          ? "text-gray-600 dark:text-gray-400"
                          : "text-gray-500 dark:text-gray-500"
                      )}>
                        {feature.description}
                      </p>
                      {feature.stats && (
                        <div className="mt-3">
                          <span className="text-xs font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 px-2 py-1 rounded">
                            {feature.stats}
                          </span>
                        </div>
                      )}
                      {isActive && (
                        <div className="mt-4 bg-gray-200 dark:bg-gray-700 rounded-full h-1 overflow-hidden">
                          <motion.div
                            className="h-full bg-gradient-to-r from-blue-500 to-purple-600"
                            initial={{ width: 0 }}
                            animate={{ width: `${progress}%` }}
                            transition={{ duration: 0.1, ease: "linear" }}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Right Side - Feature Visualization */}
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentFeature}
                initial={{ opacity: 0, y: 50, rotateX: -15 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                exit={{ opacity: 0, y: -50, rotateX: 15 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="relative"
              >
                {renderSkeleton(features[currentFeature].image)}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Bento Grid Section */}
        <div className="relative">
          <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-4 mt-12 border rounded-xl dark:border-neutral-800 overflow-hidden">
            {bentoFeatures.map((feature) => (
              <FeatureCard key={feature.title} className={feature.className}>
                <Grid size={20} />
                <FeatureTitle>{feature.title}</FeatureTitle>
                <FeatureDescription>{feature.description}</FeatureDescription>
                <div className="h-full w-full mt-4">{feature.skeleton}</div>
              </FeatureCard>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function JenerateFeaturesDemo() {
  return <JenerateFeaturesSection />;
} 