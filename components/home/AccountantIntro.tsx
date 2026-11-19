import Image from "next/image";
import styles from "./AccountantIntro.module.css";

export default function AccountantIntro() {
  return (
    <section
      aria-labelledby="accountant-heading"
      className={`${styles.intro} mt-3 grid grid-cols-[80px_minmax(0,1fr)] gap-x-4 gap-y-4 rounded-2xl border border-[#d3e8df] bg-[#edf9f3] p-4 [overflow-wrap:anywhere] md:mt-5 md:grid-cols-[120px_minmax(0,1fr)] md:gap-x-6 md:p-5 xl:mt-6`}
    >
      <div className={`${styles.portrait} relative col-start-1 row-start-1 aspect-[330/456] w-20 self-start overflow-hidden rounded-xl md:w-[120px] lg:row-span-4 lg:w-40 lg:rounded-2xl`}>
        {/* Show the supplied portrait without regenerating or retouching it.
            Source: 2172×724; portrait rectangle: x=48, y=125, w=330, h=456. */}
        <Image
          src="/images/accountant-intro-reference.png"
          alt="조회계사 프로필 사진"
          width={2172}
          height={724}
          sizes="(min-width: 1024px) 1054px, (min-width: 768px) 790px, 316px"
          priority
          className="absolute h-auto max-w-none"
          style={{ width: "658.181818%", left: "-14.545455%", top: "-27.412281%" }}
        />
      </div>

      <div className={`${styles.identity} col-start-2 row-start-1 min-w-0 self-center lg:row-span-2 lg:self-start`}>
        <h1 id="accountant-heading" className={`${styles.name} text-[32px] font-extrabold leading-[1.15] tracking-[-0.04em] text-[#005e50] md:text-[40px] lg:text-5xl`}>
          조회계사
        </h1>
        <p className={`${styles.credentials} mt-2 text-sm font-semibold leading-6 text-[#4d625b] md:mt-3 md:text-base lg:text-lg lg:leading-7`}>
          <span className="block lg:inline">현 한길회계법인 공인회계사</span>
          <span className="hidden lg:inline"> · </span>
          <span className="block lg:inline">전 삼일회계법인</span>
        </p>
      </div>

      <p className={`${styles.consulting} col-span-2 row-start-2 min-w-0 text-xl font-extrabold leading-[1.4] tracking-[-0.025em] text-[#12282b] md:text-2xl lg:col-span-2 lg:col-start-2 lg:row-start-3 lg:text-[28px]`}>
        <span className="block md:inline">삼일·삼정·안진에</span>{" "}업무 자동화 컨설팅 제공
      </p>
      <p className={`${styles.desktopValue} col-span-2 row-start-3 min-w-0 text-base leading-[1.65] text-[#243c37] md:text-lg lg:col-span-2 lg:col-start-2 lg:row-start-4 lg:text-xl`}>
        감사 자료를 자동화해 기업의 감사 비용부담을 낮춥니다.
      </p>

      <a
        href="https://audit-proposal.intellic.co.kr/"
        target="_blank"
        rel="noopener noreferrer"
        className={`${styles.quote} col-span-2 row-start-4 inline-flex min-h-12 w-full items-center justify-center gap-3 rounded-xl bg-[#005e50] px-4 py-3 text-center text-base font-bold leading-6 text-white transition-colors hover:bg-[#004c40] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#005e50] md:text-lg lg:col-span-1 lg:col-start-3 lg:row-span-2 lg:row-start-1 lg:min-h-14 lg:w-auto lg:self-start lg:px-5 lg:text-xl`}
      >
        <span className={styles.mobileValue}>감사 자료를 자동화해 기업의 감사 비용부담을 낮춥니다.</span>
        <span className={styles.quoteLabel}>회계감사 무료 견적 받기</span>
        <span aria-hidden="true" className={`${styles.quoteArrow} shrink-0 text-2xl`}>↗</span>
        <span className="sr-only"> (새 탭)</span>
      </a>
    </section>
  );
}
