import { useState, useEffect } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const SKILLS_DATA = {
  languages: [
    "TypeScript",
    "Python",
    "Golang",
    "JavaScript",
    "Elixir",
    "Lua",
  ],
  frameworks: [
    "Next",
    "React",
    "React Native (Expo)",
    "Tailwind CSS",
    "Router v7",
    "Astro",
    "Hono",
    "Express",
    "FastAPI",

  ],
  devTools: [
    "Git",
    "Docker",
    "Cypress",
    "Nginx",
    "Neovim",
    "RabbitMQ",
  ],
} as const;

const ACCORDION_ITEMS = [
  {
    id: "languages",
    title: "Languages",
    skills: SKILLS_DATA.languages,
  },
  {
    id: "frameworks",
    title: "Frameworks and Libraries",
    skills: SKILLS_DATA.frameworks,
  },
  {
    id: "devTools",
    title: "Developer Tools",
    skills: SKILLS_DATA.devTools,
  },
] as const;

function SkillsList({ items }: { items: readonly string[] }) {
  if (!items || items.length === 0) {
    return <p className="tw:text-gray-500 tw:italic">No skills available</p>;
  }

  return (
    <ul className="tw:list-disc tw:grid tw:grid-cols-2 sm:tw:grid-cols-3 md:tw:grid-cols-4 lg:tw:grid-cols-6 tw:gap-x-4 tw:gap-y-2 tw:pl-5">
      {items.map((item) => (
        <li key={item} className="tw:text-sm tw:leading-relaxed">
          {item}
        </li>
      ))}
    </ul>
  );
}

export default function SkillsAccordion() {
  const [openValue, setOpenValue] = useState<string>("");
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // If scrolling down, close the accordion
      if (currentScrollY > lastScrollY && openValue) {
        setOpenValue("");
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY, openValue]);

  return (
    <div className="tw:w-full">
      <Accordion
        type="single"
        collapsible
        className="tw:w-full"
        value={openValue}
        onValueChange={setOpenValue}
      >
        {ACCORDION_ITEMS.map((section, index) => (
          <AccordionItem key={section.id} value={`item-${index + 1}`}>
            <AccordionTrigger className="tw:text-left">
              {section.title}
            </AccordionTrigger>
            <AccordionContent>
              <SkillsList items={section.skills} />
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
