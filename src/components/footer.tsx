import { StarMark } from "./star-mark";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="pb-16 pt-24">
      <div className="shell mx-auto flex flex-col items-center gap-10 text-center">
        <div className="flex flex-col items-center gap-3">
          <div className="flex items-center gap-2.5">
            <StarMark className="size-[22px] text-white" />
            <span className="wordmark">North Star</span>
          </div>
          <span className="eyebrow">University of Austin</span>
        </div>

        <div className="flex flex-col items-center gap-2.5">
          <p className="eyebrow">
            Proposed by Chase&nbsp;Roll &amp; Joshua&nbsp;Strauss
          </p>
          <p className="eyebrow text-mute-2">© {year} · Austin,&nbsp;TX</p>
        </div>
      </div>
    </footer>
  );
}
