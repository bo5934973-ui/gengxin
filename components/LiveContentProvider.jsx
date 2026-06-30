"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { siteContent as fallbackContent } from "@/data/contentFallback";

const ContentContext = createContext({
  content: fallbackContent,
  isLiveContentLoading: false
});

export function LiveContentProvider({ initialContent = fallbackContent, children }) {
  const [content, setContent] = useState(initialContent);
  const [isLiveContentLoading, setIsLiveContentLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function loadContent() {
      try {
        const response = await fetch("/.netlify/functions/content", {
          cache: "no-store"
        });
        const data = await response.json();
        if (isMounted && response.ok && data.content) {
          setContent(data.content);
        }
      } catch {
        // Keep the built-in content if the live store is not available locally.
      } finally {
        if (isMounted) setIsLiveContentLoading(false);
      }
    }

    loadContent();

    return () => {
      isMounted = false;
    };
  }, []);

  const value = useMemo(
    () => ({ content, isLiveContentLoading }),
    [content, isLiveContentLoading]
  );

  return <ContentContext.Provider value={value}>{children}</ContentContext.Provider>;
}

export function useLiveContent() {
  return useContext(ContentContext);
}
