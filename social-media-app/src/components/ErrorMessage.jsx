
import { AlertCircle } from "lucide-react";

const ErrorMessage = ({ message, onRetry }) => {
  return (
    <div className="error-container" role="alert">
      <AlertCircle size={36} />

      <h2>Something went wrong</h2>

      <p>{message}</p>

      {onRetry && (
        <button
          className="retry-btn"
          onClick={onRetry}
        >
          Try Again
        </button>
      )}
    </div>
  );
};

export default ErrorMessage;
