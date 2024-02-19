export default function CompressingIcon() {
  return (
    <div>
      <div className="flex items-center justify-center gap-2">
        <span className="sr-only">Loading...</span>
        <div className="h-2 w-2 animate-bounce rounded-full bg-gami-text"></div>
        <div className="h-2 w-2 animate-bounce rounded-full bg-gami-text [animation-delay:-0.15s]"></div>
        <div className="h-2 w-2 animate-bounce rounded-full bg-gami-text [animation-delay:-0.3s]"></div>
      </div>
    </div>
  );
}
