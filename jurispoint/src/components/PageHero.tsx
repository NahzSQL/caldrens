import { Photo } from "./Photo";

type Props = {
  eyebrow: string;
  title: string;
  intro: string;
  photo: { src: string; alt: string };
  children?: React.ReactNode;
};

/** Banner used at the top of the inner pages. */
export function PageHero({ eyebrow, title, intro, photo, children }: Props) {
  return (
    <section className="on-dark relative isolate overflow-hidden bg-navy-900">
      <Photo src={photo.src} alt="" sizes="100vw" priority tint={false} className="-z-10 opacity-30" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-navy-950 via-navy-900/90 to-navy-900/50" aria-hidden="true" />
      <div className="container py-20 sm:py-24 lg:py-28">
        <div className="max-w-2xl animate-fade-up">
          <p className="eyebrow eyebrow-light">{eyebrow}</p>
          <h1 className="mt-5 text-4xl leading-[1.1] text-white sm:text-5xl lg:text-[3.5rem]">{title}</h1>
          <p className="mt-6 text-lg leading-relaxed text-navy-100">{intro}</p>
          {children}
        </div>
      </div>
      <div className="h-1 bg-gradient-to-r from-gold-600 via-gold-400 to-gold-600" aria-hidden="true" />
    </section>
  );
}
