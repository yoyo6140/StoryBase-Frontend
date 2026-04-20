import { cn } from "@/lib/utils";

type LoadingIndicatorProps = {
  /** 顯示於轉圈下方的文字 */
  label?: string;
  className?: string;
  /** false 時不套用最小高度，適合列內小區塊 */
  block?: boolean;
};

/** 轉圈 + 文案，含無障礙 busy 狀態 */
export function LoadingIndicator({
  label = "載入中…",
  className,
  block = true,
}: LoadingIndicatorProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-3 py-8 sm:py-10",
        block && "min-h-[10rem] sm:min-h-[12rem]",
        className,
      )}
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <span
        className="size-9 shrink-0 rounded-full border-2 border-zinc-200 border-t-zinc-800 motion-safe:animate-spin"
        aria-hidden
      />
      <p className="text-sm font-medium text-zinc-500">{label}</p>
    </div>
  );
}
