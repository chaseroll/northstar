export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="pb-14 pt-20">
      <div className="shell flex flex-col items-center gap-8 text-center md:flex-row md:items-center md:justify-between md:text-left">
        <div className="flex flex-col items-center gap-2 md:items-start">
          <span className="wordmark">NorthStar</span>
          <span className="eyebrow">University of Austin</span>
        </div>

        <div className="flex flex-col items-center gap-2 md:items-end">
          <p className="eyebrow">
            Proposed by Joshua&nbsp;Strauss &amp; Chase&nbsp;Roll
          </p>
          <p className="eyebrow text-mute-2">
            © {year} · Austin,&nbsp;TX
          </p>
        </div>
      </div>
    </footer>
  );
}
