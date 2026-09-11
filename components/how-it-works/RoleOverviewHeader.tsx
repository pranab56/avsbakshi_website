interface RoleOverviewHeaderProps {
  title: string;
  subtitle: string;
}

export default function RoleOverviewHeader({ title, subtitle }: RoleOverviewHeaderProps) {
  return (
    <section className="pt-12 sm:pt-16 pb-8 px-4 sm:px-6 lg:px-8 text-center bg-accent/60 border-b border-border">
      <h2 className="font-title text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground leading-tight">
        {title}
      </h2>
      <p className="text-xs sm:text-sm text-muted-foreground font-normal leading-relaxed mt-3 max-w-xl mx-auto">
        {subtitle}
      </p>
    </section>
  );
}

