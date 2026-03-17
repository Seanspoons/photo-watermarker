interface FloatingMessageProps {
  tone: 'status' | 'error';
  message: string;
}

export function FloatingMessage({ tone, message }: FloatingMessageProps) {
  return (
    <div
      className={`floating-message ${tone === 'error' ? 'error-message' : 'status-message'}`}
      role={tone === 'error' ? 'alert' : 'status'}
      aria-live={tone === 'error' ? 'assertive' : 'polite'}
    >
      {message}
    </div>
  );
}
