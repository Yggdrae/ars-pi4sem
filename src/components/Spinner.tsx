export const Spinner = ({ className }: { className?: string }) => {
    return (
      <span
        className={`inline-block w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin ${className}`}
      />
    );
  };