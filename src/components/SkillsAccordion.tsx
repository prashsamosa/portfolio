import { useState, useEffect } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

type TechCategory = {
  id: string;
  title: string;
  badges: Array<{
    url: string;
    alt: string; // Better accessibility
    name: string; // For fallback text
  }>;
};

const TECH_STACK: TechCategory[] = [
  {
    id: "core-development",
    title: "Core Development & Frameworks",
    badges: [
      // Languages
      { url: "https://img.shields.io/badge/TypeScript-007ACC?style=flat&logo=typescript&logoColor=white", alt: "TypeScript", name: "TypeScript" },
      { url: "https://img.shields.io/badge/Python-3776AB?style=flat&logo=python&logoColor=white", alt: "Python", name: "Python" },
      { url: "https://img.shields.io/badge/Go-00ADD8?style=flat&logo=go&logoColor=white", alt: "Go", name: "Go" },
      { url: "https://img.shields.io/badge/Elixir-4B275F?style=flat&logo=elixir&logoColor=white", alt: "Elixir", name: "Elixir" },
      // Frontend
      { url: "https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB", alt: "React", name: "React" },
      { url: "https://img.shields.io/badge/Next.js-000000?style=flat&logo=nextdotjs&logoColor=white", alt: "Next.js", name: "Next.js" },
      { url: "https://img.shields.io/badge/Astro-0D1117?style=flat&logo=astro&logoColor=white", alt: "Astro", name: "Astro" },
      { url: "https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat&logo=tailwind-css&logoColor=white", alt: "Tailwind CSS", name: "Tailwind CSS" },

      { url: "https://img.shields.io/badge/Node.js-43853D?style=flat&logo=node.js&logoColor=white", alt: "Node.js", name: "Node.js" },
      { url: "https://img.shields.io/badge/Express.js-404D59?style=flat&logo=express&logoColor=white", alt: "Express.js", name: "Express.js" },
      { url: "https://img.shields.io/badge/FastAPI-009688?style=flat&logo=fastapi&logoColor=white", alt: "FastAPI", name: "FastAPI" },
      { url: "https://img.shields.io/badge/Hono-E36002?style=flat&logo=hono&logoColor=white", alt: "Hono", name: "Hono" },
      // State Management
      { url: "https://img.shields.io/badge/Zustand-2D3748?style=flat&logo=zustand&logoColor=white", alt: "Zustand", name: "Zustand" },
      { url: "https://img.shields.io/badge/XState--Store-2C3E50?style=flat&logo=xstate&logoColor=white", alt: "XState Store", name: "XState Store" },
    ],
  },
  {
    id: "data-infrastructure",
    title: "Data & Infrastructure",
    badges: [
      // Databases
      { url: "https://img.shields.io/badge/PostgreSQL-316192?style=flat&logo=postgresql&logoColor=white", alt: "PostgreSQL", name: "PostgreSQL" },
      { url: "https://img.shields.io/badge/DuckDB-FFF000?style=flat&logo=duckdb&logoColor=black", alt: "DuckDB", name: "DuckDB" },
      // Data Science & ML
      { url: "https://img.shields.io/badge/Pandas-150458?style=flat&logo=pandas&logoColor=white", alt: "Pandas", name: "Pandas" },
      { url: "https://img.shields.io/badge/NumPy-013243?style=flat&logo=numpy&logoColor=white", alt: "NumPy", name: "NumPy" },
      { url: "https://img.shields.io/badge/Polars-CD792C?style=flat&logo=polars&logoColor=white", alt: "Polars", name: "Polars" },
      { url: "https://img.shields.io/badge/Scikit--Learn-F7931E?style=flat&logo=scikit-learn&logoColor=white", alt: "Scikit-Learn", name: "Scikit-Learn" },
      { url: "https://img.shields.io/badge/Docker-2496ED?style=flat&logo=docker&logoColor=white", alt: "Docker", name: "Docker" },
      { url: "https://img.shields.io/badge/GitHub_Actions-2088FF?style=flat&logo=github-actions&logoColor=white", alt: "GitHub Actions", name: "GitHub Actions" },
      { url: "https://img.shields.io/badge/Cloudflare-F38020?style=flat&logo=cloudflare&logoColor=white", alt: "Cloudflare", name: "Cloudflare" },
      { url: "https://img.shields.io/badge/Nginx-009639?style=flat&logo=nginx&logoColor=white", alt: "Nginx", name: "Nginx" },
    ],
  },
  {
    id: "other-tools-technologies",
    title: "Other Tools & Technologies",
    badges: [
      { url: "https://img.shields.io/badge/Phoenix-FF6600?style=flat&logo=phoenixframework&logoColor=white", alt: "Phoenix", name: "Phoenix" },
      { url: "https://img.shields.io/badge/Expo-000020?style=flat&logo=expo&logoColor=white", alt: "Expo", name: "Expo" },
      { url: "https://img.shields.io/badge/NeoVim-57A143?style=flat&logo=neovim&logoColor=white", alt: "NeoVim", name: "NeoVim" },
    ],
  },
];

// Preload images for better performance
function useImagePreloader(badges: Array<{url: string; alt: string; name: string}>) {
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());
  const [failedImages, setFailedImages] = useState<Set<string>>(new Set());

  useEffect(() => {
    const loadImage = (url: string) => {
      return new Promise<void>((resolve) => {
        const img = new Image();
        img.onload = () => {
          setLoadedImages(prev => new Set([...prev, url]));
          resolve();
        };
        img.onerror = () => {
          setFailedImages(prev => new Set([...prev, url]));
          resolve();
        };
        img.src = url;
      });
    };

    // Preload all images
    const allUrls = badges.map(badge => badge.url);
    Promise.all(allUrls.map(loadImage));
  }, [badges]);

  return { loadedImages, failedImages };
}

function BadgeGrid({ badges }: { badges: Array<{url: string; alt: string; name: string}> }) {
  const { loadedImages, failedImages } = useImagePreloader(badges);

  return (
    <div className="tw:flex tw:flex-wrap tw:gap-2 tw:py-2">
      {badges.map((badge, idx) => {
        const isLoaded = loadedImages.has(badge.url);
        const hasFailed = failedImages.has(badge.url);

        if (hasFailed) {
          // Fallback for failed images
          return (
            <span
              key={idx}
              className="tw:px-2 tw:py-1 tw:bg-gray-200 tw:text-gray-700 tw:text-xs tw:rounded tw:border"
            >
              {badge.name}
            </span>
          );
        }

        return (
          <div key={idx} className="tw:relative">
            {!isLoaded && (
              <div className="tw:w-20 tw:h-6 tw:bg-gray-200 tw:animate-pulse tw:rounded" />
            )}
            <img
              src={badge.url}
              alt={badge.alt}
              className={`tw:h-6 tw:transition-opacity tw:duration-200 ${
                isLoaded ? 'tw:opacity-100' : 'tw:opacity-0 tw:absolute tw:top-0'
              }`}
              loading="eager" // Since we're preloading
            />
          </div>
        );
      })}
    </div>
  );
}

export default function SkillsAccordion() {
  return (
    <div className="tw:w-full">
      <Accordion type="single" collapsible className="tw:w-full">
        {TECH_STACK.map((section, index) => (
          <AccordionItem key={section.id} value={`item-${index + 1}`}>
            <AccordionTrigger>{section.title}</AccordionTrigger>
            <AccordionContent>
              <BadgeGrid badges={section.badges} />
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
