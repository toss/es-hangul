export function Loading({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={`sp-cube-wrapper absolute right-2 bottom-2 z-50 w-8 h-8 rounded ${className}`} {...props}>
      <div className="sp-cube flex transform -translate-x-1 translate-y-[9px] scale-[0.13]">
        <div
          className={`sp-sides absolute w-24 h-24 animate-[cube-rotate_1s_linear_infinite]`}
          style={{ transform: 'rotateX(-25.5deg) rotateY(45deg)', transformStyle: 'preserve-3d' }}
        >
          <div
            className="absolute w-24 h-24 border-[10px] border-solid border-[#808080] dark:border-[#a8b1c2] rounded-lg bg-white dark:bg-[#282c34] origin-center"
            style={{ transform: 'rotateX(90deg) translateZ(44px)' }}
          />
          <div
            className="absolute w-24 h-24 border-[10px] border-solid border-[#808080] dark:border-[#a8b1c2] rounded-lg bg-white dark:bg-[#282c34] origin-center"
            style={{ transform: 'rotateY(90deg) translateZ(44px)' }}
          />
          <div
            className="absolute w-24 h-24 border-[10px] border-solid border-[#808080] dark:border-[#a8b1c2] rounded-lg bg-white dark:bg-[#282c34] origin-center"
            style={{ transform: 'rotateX(-90deg) translateZ(44px)' }}
          />
          <div
            className="absolute w-24 h-24 border-[10px] border-solid border-[#808080] dark:border-[#a8b1c2] rounded-lg bg-white dark:bg-[#282c34] origin-center"
            style={{ transform: 'rotateY(-90deg) translateZ(44px)' }}
          />
          <div
            className="absolute w-24 h-24 border-[10px] border-solid border-[#808080] dark:border-[#a8b1c2] rounded-lg bg-white dark:bg-[#282c34] origin-center"
            style={{ transform: 'rotateY(0deg) translateZ(44px)' }}
          />
          <div
            className="absolute w-24 h-24 border-[10px] border-solid border-[#808080] dark:border-[#a8b1c2] rounded-lg bg-white dark:bg-[#282c34] origin-center"
            style={{ transform: 'rotateY(-180deg) translateZ(44px)' }}
          />
        </div>
      </div>
    </div>
  );
}
