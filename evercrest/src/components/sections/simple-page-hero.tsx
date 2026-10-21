import { Container } from "@/components/ui/container";
import { Breadcrumbs, type Crumb } from "./breadcrumbs";

export function SimplePageHero({ title, description, breadcrumbs }: { title: string; description: string; breadcrumbs: Crumb[] }) {
  return (
    <section className="relative overflow-hidden bg-navy-900">
      <div aria-hidden="true" className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-teal-500/15 blur-3xl" />
      <Container className="relative py-14 sm:py-16">
        <Breadcrumbs items={breadcrumbs} />
        <h1 className="text-4xl font-bold text-white sm:text-5xl">{title}</h1>
        <p className="mt-4 max-w-2xl text-lg text-navy-100">{description}</p>
      </Container>
    </section>
  );
}
