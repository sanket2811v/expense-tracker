import { useEffect } from "react";
import { CheckCircle2, AlertCircle, X } from "lucide-react";


function Notification({ message, type, onClose }) {
  useEffect(() => {
    if (!message) return undefined;
    const timer = setTimeout(onClose, 3500);
    return () => clearTimeout(timer);
  }, [message, onClose]);

  if (!message) return null;

  const Icon = type === "error" ? AlertCircle : CheckCircle2;

  return (
    <div
      className={`notification notification--${type}`}
      role="status"
      aria-live="polite"
    >
      <Icon size={18} aria-hidden="true" />
      <span>{message}</span>
      <button
        type="button"
        className="notification__close"
        onClick={onClose}
        aria-label="Dismiss notification"
      >
        <X size={16} />
      </button>
    </div>
  );
}

export default Notification;
