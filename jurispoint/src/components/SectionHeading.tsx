type Props = {
  eyebrow?: string;
  title: string;
  intro?: React.ReactNode;
  align?: "left" | "center";
  light?: boolean;
  id?: string;
  as?: "h1" | "h2";
};

export function SectionHeading({ eyebrow, title, intro, align = "left", light, id, as: Tag = "h2" }: Props) {
  const center = align === "center";
  return (
    <div className={center ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      {eyebrow && <p className={`eyebrow ${light ? "eyebrow-light" : ""} ${center ? "justify-center" : ""}`}>{eyebrow}</p>}
      <Tag
        id={id}
        className={`mt-4 text-3xl leading-tight sm:text-4xl lg:text-[2.75rem] ${light ? "text-white" : "text-navy-900"}`}
      >
        {title}
      </Tag>
      {intro && (
        <div className={`mt-5 text-base leading-relaxed sm:text-lg ${light ? "text-navy-100" : "text-navy-700"}`}>{intro}</div>
      )}
    </div>
  );
}
