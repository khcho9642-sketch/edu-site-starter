import HomeCourseCards from "@/components/home/HomeCourseCards";

export default function Home() {
  return (
    <div className="mx-auto max-w-7xl px-4 pb-3 md:px-8 md:pb-8">
      <h1 className="mt-5 text-2xl font-bold">사내 AI 실무 교육</h1>
      <section id="courses" className="mt-2.5 scroll-mt-28 md:mt-6" aria-labelledby="courses-heading">
        <h2 id="courses-heading" className="mb-2 text-[clamp(0.75rem,3.7vw,1rem)] font-extrabold leading-snug tracking-[-0.04em] text-ink md:mb-5 md:text-2xl md:font-bold md:tracking-tight">
          AI 시대, 살아남는 법을 <span className="text-[#0b504b]">함께 고민합니다.</span>
        </h2>
        <HomeCourseCards />
      </section>
    </div>
  );
}
