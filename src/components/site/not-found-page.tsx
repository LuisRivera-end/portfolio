import { ArrowLeftIcon } from "lucide-react"
import { Link } from "react-router-dom"

import { Button } from "@/components/ui/button"
import type { SiteDictionary } from "@/types/portfolio"

interface NotFoundPageProps {
  dictionary: SiteDictionary
  locale: "es" | "en"
}

export function NotFoundPage({ dictionary }: NotFoundPageProps) {
  return (
    <main className="mx-auto flex min-h-[70svh] w-full max-w-7xl items-center px-5 py-16 sm:px-6 lg:px-10">
      <section className="w-full border-2 border-foreground bg-card p-8 shadow-[8px_8px_0_var(--foreground)] sm:p-12">
        <p className="editorial-kicker">404</p>
        <h1 className="mt-6 font-heading text-[clamp(4rem,10vw,9rem)] leading-[0.74] font-semibold tracking-[-0.08em]">
          {dictionary.brand.name}
        </h1>
        <p className="mt-8 max-w-xl text-base leading-8 text-muted-foreground">
          {dictionary.navigation.backToProjects}
        </p>
        <Button
          asChild
          size="lg"
          className="mt-8 h-12 rounded-none border-2 border-foreground bg-primary px-5 font-black text-primary-foreground shadow-[4px_4px_0_var(--foreground)] hover:bg-primary"
        >
          <Link to="/">
            <ArrowLeftIcon data-icon="inline-start" />
            LR / Portfolio
          </Link>
        </Button>
      </section>
    </main>
  )
}
