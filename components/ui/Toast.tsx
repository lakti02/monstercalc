"use client";

import { createContext, useCallback, useContext, useMemo, useRef, useState } from "react";

interface ToastContextValue {
  toast: (message: string) => void;
}

const ToastContext = createContext<ToastContextValue>({ toast: () => {} });

export function useToast() {
  return useContext(ToastContext);
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [message, setMessage] = useState<string | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const toast = useCallback((next: string) => {
    if (timer.current) clearTimeout(timer.current);
    setMessage(next);
    timer.current = setTimeout(() => setMessage(null), 2200);
  }, []);

  const value = useMemo(() => ({ toast }), [toast]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div
        aria-live="polite"
        role="status"
        style={{
          position: "fixed",
          left: "50%",
          bottom: 26,
          transform: "translateX(-50%)",
          zIndex: 90,
          pointerEvents: "none",
        }}
      >
        {message && (
          <div
            className="mc-rise"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 9,
              padding: "11px 17px",
              borderRadius: 12,
              border: "1px solid var(--border2)",
              background: "var(--bg2)",
              boxShadow: "var(--shadow)",
              fontSize: 13.5,
              fontWeight: 600,
              color: "var(--text)",
            }}
          >
            <span
              style={{
                width: 7,
                height: 7,
                borderRadius: "50%",
                background: "var(--accent)",
                boxShadow: "0 0 10px var(--accent)",
                flexShrink: 0,
              }}
            />
            {message}
          </div>
        )}
      </div>
    </ToastContext.Provider>
  );
}

/** Copy text to the clipboard, falling back for non-secure contexts. */
export async function copyText(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    }
    const area = document.createElement("textarea");
    area.value = text;
    area.style.position = "fixed";
    area.style.opacity = "0";
    document.body.appendChild(area);
    area.select();
    const ok = document.execCommand("copy");
    document.body.removeChild(area);
    return ok;
  } catch {
    return false;
  }
}
