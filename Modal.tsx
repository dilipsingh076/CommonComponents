import React, { useEffect, useState } from "react";
import Typography from "./Typography";
import { X } from "lucide-react";
import Button from "./Button";

type ModalProps = {
  activeModal: boolean;
  onClose: () => void;
  noFade?: boolean;
  disableBackdrop?: boolean;
  className?: string;
  children: React.ReactNode;
  footerContent?: React.ReactNode;
  centered?: boolean;
  scrollContent?: boolean;
  themeClass?: string;
  title?: string | React.ReactNode;
  titleClass?: string;
  closeIconClass?: string;
  bodyClass?: string;
  footerClass?: string;
  dialogClass?: string;
  modalClose?: () => void;
  style?: string;
  labelclassName?: string;
  hideHeader?: boolean;
};

const Modal: React.FC<ModalProps> = ({
  activeModal,
  onClose,
  noFade,
  disableBackdrop,
  className = "max-w-xl",
  children,
  footerContent,
  centered,
  scrollContent,
  themeClass = "border-b bg-white dark:bg-slate-800 dark:border-b dark:border-slate-700",
  title = "Basic Modal",
  titleClass = "text-slate-800 dark:text-white",
  bodyClass = "px-6 py-8",
  footerClass = "",
  dialogClass = "",
  modalClose,
  hideHeader = false,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Handle outside clicks
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget && !disableBackdrop) {
      onClose();
    }
  };

  // Close on ESC key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape" && activeModal) {
        onClose();
      }
    };

    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [activeModal, onClose]);

  // Check for mobile view
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Handle animation
  useEffect(() => {
    if (activeModal) {
      // Small delay to ensure animation works properly
      setTimeout(() => setIsVisible(true), 10);
      // Lock body scroll when modal is open
      document.body.style.overflow = "hidden";
    } else {
      setIsVisible(false);
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [activeModal]);

  if (!activeModal){ return null;};

  // Mobile Sheet Modal
  if (isMobile) {
    return (
      <div
        className={`fixed inset-0 z-50 ${disableBackdrop ? "" : "bg-slate-900/50 backdrop-blur-sm"} ${noFade ? "" : isVisible ? "opacity-100" : "opacity-0"} transition-opacity duration-300`}
        onClick={handleBackdropClick}
      >
        <div
          className={`fixed bottom-0 left-0 right-0 max-h-[600px] overflow-y-auto rounded-t-lg bg-white dark:bg-slate-800 shadow-xl transform transition-transform duration-300 ${isVisible ? "translate-y-0" : "translate-y-full"}`}
        >
          {!hideHeader && (
            <div
              className={`relative flex justify-between px-5 py-4 ${themeClass} border-b border-[#F2F2F2]`}
            >
              <Typography
                variant='h6'
                className={` font-medium capitalize leading-6 tracking-wider ${titleClass}`}
              >
                {title}
              </Typography>
              <Button
                variant='text'
                endIcon={<X size={20} strokeWidth={2} />
                }
                onClick={modalClose || onClose}
                className="!text-border"
              />
            </div>
          )}

          <div className={`${bodyClass}`}>{children}</div>

          {footerContent && (
            <div
              className={`${footerClass} px-4 py-3 border-t border-slate-100 dark:border-slate-700`}
            >
              {footerContent}
            </div>
          )}
        </div>
      </div>
    );
  }

  // Desktop Modal
  return (
    <div
      className={`fixed top-0 left-0 bottom-0 right-0 z-[3px] backdrop-blur-[4px] overflow-y-auto ${dialogClass}`}
      aria-modal='true'
      role='dialog'
    >
      {!disableBackdrop && (
        <div
          className={`inset-0 bg-slate-900/50 backdrop-blur-sm ${noFade ? "" : isVisible ? "opacity-100" : "opacity-0"} transition-opacity duration-300`}
          onClick={handleBackdropClick}
        ></div>
      )}

      <div
        className={"inset-0 overflow-y-auto translate-x-[-50%] translate-y-[-50%] top-[50%] left-[50%] z-[3px] relative w-fit "}
      >
        <div
          className={`flex min-h-full justify-center p-6 text-center ${centered ? "items-center" : "items-start"}`}
        >
          <div
            className={`w-full transform overflow-hidden rounded-md bg-white text-left align-middle shadow-xl dark:bg-slate-800 ${className} ${noFade ? "" : isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"} transition-all duration-300`}
          >
            {!hideHeader && (
              <div
                className={`relative flex justify-between overflow-hidden px-5 py-4 ${themeClass}`}
              >
                <Typography
                  variant='h6'
                  className={` font-medium capitalize tracking-wider ${titleClass}`}
                >
                  {title}
                </Typography>
                <Button
                  variant='text'
                  size='none'
                  className='!text-border'
                  endIcon={<X size={20} strokeWidth={2} />
                  }
                  onClick={modalClose || onClose}
                />
              </div>
            )}

            <div
              className={`${bodyClass} ${scrollContent ? "max-h-[600px] overflow-y-auto" : ""}`}
            >
              {children}
            </div>

            {footerContent && (
              <div
                className={`flex justify-end space-x-3 border-t border-slate-100 px-4 py-3 dark:border-slate-700 ${footerClass}`}
              >
                {footerContent}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;