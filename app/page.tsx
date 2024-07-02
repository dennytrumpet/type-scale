import Image from "next/image";
import Section from "@/app/ui/Section";
import Container from "@/app/ui/Container";
import Prose from "@/app/ui/Prose";

export default function Home() {
  return (
    <>
      <header className="relative border-b border-zinc-300 dark:border-zinc-700">
        <Container className="flex-wrap px-4 py-3 sm:px-8 sm:py-6">
          <h1 className="font-display text-xl text-zinc-800 dark:text-zinc-200">
            Fluid Typography
          </h1>
        </Container>
      </header>
      <main className="relative isolate mx-auto w-full flex-auto flex-grow">
        <Container className="px-4 py-3 sm:px-8 sm:py-6">
          <div className="grid items-stretch gap-6 md:grid-cols-[1fr_16rem]">
            <div className="hidden flex-col space-y-4 md:order-2 md:flex">
              bonk bonk boknk
            </div>
            <div className="rounded-lg border border-zinc-300 p-base md:order-1 dark:border-zinc-700">
              <Prose className="md:mx-0">
                <h1 className="mb-base-0.5 mt-base text-balance font-display text-5xl text-zinc-800 dark:text-zinc-200">
                  Fluid Type Scale
                </h1>
                <h2 className="mb-base-0.5 mt-base text-balance font-display text-4xl text-zinc-800 dark:text-zinc-200">
                  Fluid Type Scale
                </h2>
                <h3 className="mb-base-0.5 mt-base text-balance font-display text-3xl text-zinc-800 dark:text-zinc-200">
                  Fluid Type Scale
                </h3>
                <h4 className="mb-base-0.5 mt-base text-balance font-display text-2xl text-zinc-800 dark:text-zinc-200">
                  Fluid Type Scale
                </h4>
                <h5 className="mb-base-0.5 mt-base text-balance font-display text-xl text-zinc-800 dark:text-zinc-200">
                  Fluid Type Scale
                </h5>
                <h6 className="mb-base-0.5 mt-base text-balance font-display text-lg text-zinc-800 dark:text-zinc-200">
                  Fluid Type Scale
                </h6>
                <p className="mb-base mt-0 text-pretty font-body text-base">
                  Fluid Type Scale
                </p>
                <p className="mb-base mt-0 text-pretty font-body text-sm">
                  Fluid Type Scale
                </p>
                <p className="mb-base mt-0 text-pretty font-body text-xs">
                  Fluid Type Scale
                </p>
              </Prose>
            </div>
          </div>
        </Container>
      </main>
    </>
  );
}
