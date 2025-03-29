import React, { createContext, useContext, useState, useEffect, useRef, useCallback } from "react";
import { Snackbar, Alert, Slide } from "@mui/material";

type ToastType = "success" | "error" | "info" | "warning";

interface ToastContextProps {
  showToast: (message: string, type: ToastType, duration?: number) => void;
}

const ToastContext = createContext<ToastContextProps | undefined>(undefined);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toast, setToast] = useState<{ message: string; type: ToastType; duration: number } | null>(null);
  const [open, setOpen] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const remainingTimeRef = useRef(3000);
  const lastUpdateTimeRef = useRef(Date.now());
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const showToast = (message: string, type: ToastType, duration = 3000) => {
    setToast({ message, type, duration });
    remainingTimeRef.current = duration;
    setOpen(true);
  };

  const closeToast = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (toast && !isPaused) {
      lastUpdateTimeRef.current = Date.now();
      timeoutRef.current = setTimeout(closeToast, remainingTimeRef.current);
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [toast, isPaused]);

  const handleMouseEnter = useCallback(() => {
    setIsPaused(true);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      const elapsedTime = Date.now() - lastUpdateTimeRef.current;
      remainingTimeRef.current = Math.max(0, remainingTimeRef.current - elapsedTime);
    }
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsPaused(false);
    lastUpdateTimeRef.current = Date.now();
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {toast && (
        <Snackbar
          open={open}
          onClose={closeToast}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          TransitionComponent={Slide}
          sx={{ minWidth: "300px" }}
        >
          <Alert
            severity={toast.type}
            onClose={closeToast}
            sx={{
              display: "flex",
              alignItems: "center",
              minWidth: "300px",
              position: "relative",
              padding: "10px 16px",
              fontSize: "0.9rem",
            }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            {toast.message}
            {/* Progress bar */}
            <div
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                height: "3px",
                backgroundColor: "rgba(255,255,255,0.7)",
                width: isPaused ? `${(remainingTimeRef.current / toast.duration) * 100}%` : "100%",
                transition: isPaused ? "none" : `width ${toast.duration}ms linear`,
              }}
            />
          </Alert>
        </Snackbar>
      )}
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};
