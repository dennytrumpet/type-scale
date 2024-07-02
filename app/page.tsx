import Image from "next/image";
import Section from "@/app/ui/Section";
import Container from "@/app/ui/Container";
import Prose from "@/app/ui/Prose";

export default function Home() {
  return (
    <>
      <header className="relative border-b border-zinc-300 dark:border-zinc-700">
        <Container className="flex-wrap px-4 py-3 sm:px-8 sm:py-6">
          <h1 className="font-display text-xl dark:text-zinc-200 text-zinc-800">
            Fluid Typography
          </h1>
        </Container>
      </header>
      <main className="relative isolate mx-auto w-full flex-auto flex-grow">
        <Container className="px-4 py-3 sm:px-8 sm:py-6">
          <div className="grid items-stretch gap-6 md:grid-cols-[1fr_16rem]">
            <div className="hidden flex-col space-y-4 md:flex md:order-2">
              bonk bonk boknk
            </div>
            <div className="md:order-1 p-base rounded-lg border border-zinc-300 dark:border-zinc-700">
              <Prose className="md:mx-0">
                <h1 className=" mb-base-0.5 mt-base text-balance font-display text-5xl dark:text-zinc-200 text-zinc-800">
                  Fluid Type Scale
                </h1>
                <h2 className=" mb-base-0.5 mt-base text-balance font-display text-4xl dark:text-zinc-200 text-zinc-800">
                  Fluid Type Scale
                </h2>
                <h3 className=" mb-base-0.5 mt-base text-balance font-display text-3xl dark:text-zinc-200 text-zinc-800">
                  Fluid Type Scale
                </h3>
                <h4 className=" mb-base-0.5 mt-base text-balance font-display text-2xl dark:text-zinc-200 text-zinc-800">
                  Fluid Type Scale
                </h4>
                <h5 className=" mb-base-0.5 mt-base text-balance font-display text-xl dark:text-zinc-200 text-zinc-800">
                  Fluid Type Scale
                </h5>
                <h6 className=" mb-base-0.5 mt-base text-balance font-display text-lg dark:text-zinc-200 text-zinc-800">
                  Fluid Type Scale
                </h6>
                <p className=" mb-base mt-0 font-body text-pretty text-base">
                  Fluid Type Scale
                </p>
                <p className=" mb-base mt-0 font-body text-pretty text-sm">
                  Fluid Type Scale
                </p>
                <p className=" mb-base mt-0 font-body text-pretty text-xs">
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
