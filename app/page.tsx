"use client";
import Container from "@/app/ui/Container";
import Prose from "@/app/ui/Prose";
import Button from "@/app/ui/Button";
import Form from "./ui/Form";
import { Select, SelectItem } from "./ui/Select";
import { NumberField } from "./ui/NumberField";

const fonts = [
  { value: "--system-ui", label: "System UI" },
  { value: "--transitional", label: "Transitional" },
  { value: "--old-style", label: "Old Style" },
  { value: "--humanist", label: "Humanist" },
  { value: "--geometric", label: "Geometric" },
  { value: "--classical", label: "Classical" },
  { value: "--grotesque", label: "Grotesque" },
  { value: "--monospace", label: "Monospace" },
  { value: "--code", label: "Code" },
  { value: "--industrial", label: "Industrial" },
  { value: "--rounded", label: "Rounded" },
  { value: "--slab", label: "Slab" },
  { value: "--antique", label: "Antique" },
  { value: "--didone", label: "Didone" },
  { value: "--handwritten", label: "Handwritten" }
];

export default function Home() {
  return (
    <>
      <header className="relative border-b border-zinc-950/10 dark:border-zinc-100/10">
        <Container className="flex-row justify-between px-4 py-3 sm:px-8 sm:py-6">
          <h1 className="font-display text-xl text-zinc-950 dark:text-zinc-50">
            Fluid Typography
          </h1>
          <div className="flex items-center space-x-4">
            <Button>Hello</Button>
            <Button variant="secondary">Hello</Button>
          </div>
        </Container>
      </header>
      <main className="relative isolate mx-auto w-full flex-auto flex-grow">
        <Container className="px-4 py-3 sm:px-8 sm:py-6">
          <div className="grid items-stretch gap-6 md:grid-cols-[1fr_16rem]">
            <div className="hidden flex-col space-y-4 md:order-2 md:flex">
              <Form>
                <Select
                  label="Scale"
                  items={[
                    { value: "--minor-second", label: "Minor second (1.067)" },
                    { value: "--major-second", label: "Major second (1.125)" },
                    { value: "--minor-third", label: "Minor third (1.2)" },
                    { value: "--major-third", label: "Major third (1.25)" },
                    {
                      value: "--perfect-fourth",
                      label: "Perfect fourth (1.333)"
                    },
                    {
                      value: "--aug-fourth",
                      label: "Augmented fourth (1.414)"
                    },
                    { value: "--perfect-fifth", label: "Perfect Fifth (1.5)" },
                    { value: "--golden-ratio", label: "Golden ratio (1.618)" }
                  ]}
                  defaultSelectedKey={"--major-third"}
                  onSelectionChange={selected => {
                    const DIV = document.querySelector("div.type-scale");
                    DIV?.style.setProperty(
                      "--font-ratio",
                      `var(${selected})` as string
                    );
                  }}
                >
                  {item => (
                    <SelectItem id={item.value}>{item.label}</SelectItem>
                  )}
                </Select>
                <Select
                  label="Base Font Family"
                  items={fonts}
                  defaultSelectedKey={"--system-ui"}
                  onSelectionChange={selected => {
                    const DIV = document.querySelector("div.type-scale");
                    DIV?.style.setProperty(
                      "--base-family",
                      `var(${selected})` as string
                    );
                  }}
                >
                  {item => (
                    <SelectItem id={item.value}>{item.label}</SelectItem>
                  )}
                </Select>
                <Select
                  label="Display Font Family"
                  items={fonts}
                  defaultSelectedKey={"--system-ui"}
                  onSelectionChange={selected => {
                    const DIV = document.querySelector("div.type-scale");
                    DIV?.style.setProperty(
                      "--display-family",
                      `var(${selected})` as string
                    );
                  }}
                >
                  {item => (
                    <SelectItem id={item.value}>{item.label}</SelectItem>
                  )}
                </Select>
                <NumberField
                  label="Base Font Size (px)"
                  defaultValue={16}
                  onChange={value => {
                    const DIV = document.querySelector("div.type-scale");
                    DIV?.style.setProperty("--root-size", value);
                  }}
                />
                <NumberField
                  label="Base Line Height"
                  defaultValue={1.5}
                  step={0.25}
                  onChange={value => {
                    const DIV = document.querySelector("div.type-scale");
                    DIV?.style.setProperty("--leading-base", value);
                  }}
                />
                <NumberField
                  label="Display Line Height"
                  defaultValue={1.25}
                  step={0.25}
                  onChange={value => {
                    const DIV = document.querySelector("div.type-scale");
                    DIV?.style.setProperty("--leading-display", value);
                  }}
                />
                <NumberField
                  label="Prose max-width (ch)"
                  defaultValue={65}
                  step={1}
                  onChange={value => {
                    const DIV = document.querySelector("div.type-scale");
                    DIV?.style.setProperty("max-width", `${value}ch`);
                  }}
                />
              </Form>
            </div>
            <div className="rounded-lg border border-zinc-950/10 p-base md:order-1 dark:border-zinc-100/10">
              <Prose className="type-scale md:mx-0">
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
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras
                  eros nulla, sollicitudin at ligula ac, lacinia condimentum
                  nisl. Sed sodales ac justo eget euismod. Vivamus dapibus, leo
                  et vestibulum viverra, risus enim lobortis ipsum, vitae mollis
                  odio risus quis augue. Aenean tempus leo vel felis porttitor,
                  vel finibus nulla tristique. Praesent sodales aliquet est id
                  sollicitudin. Quisque facilisis est ut elit dictum, vitae
                  vehicula urna lobortis. Vestibulum consectetur commodo nisi,
                  ut efficitur ex rhoncus ut. Proin tincidunt sollicitudin
                  ipsum, sed posuere ligula euismod id. Etiam laoreet justo ac
                  convallis faucibus.
                </p>
                <p className="mb-base mt-0 text-pretty font-body text-sm">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras
                  eros nulla, sollicitudin at ligula ac, lacinia condimentum
                  nisl. Sed sodales ac justo eget euismod. Vivamus dapibus, leo
                  et vestibulum viverra, risus enim lobortis ipsum, vitae mollis
                  odio risus quis augue. Aenean tempus leo vel felis porttitor,
                  vel finibus nulla tristique. Praesent sodales aliquet est id
                  sollicitudin. Quisque facilisis est ut elit dictum, vitae
                  vehicula urna lobortis. Vestibulum consectetur commodo nisi,
                  ut efficitur ex rhoncus ut. Proin tincidunt sollicitudin
                  ipsum, sed posuere ligula euismod id. Etiam laoreet justo ac
                  convallis faucibus.
                </p>
                <p className="mb-base mt-0 text-pretty font-body text-xs">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras
                  eros nulla, sollicitudin at ligula ac, lacinia condimentum
                  nisl. Sed sodales ac justo eget euismod. Vivamus dapibus, leo
                  et vestibulum viverra, risus enim lobortis ipsum, vitae mollis
                  odio risus quis augue. Aenean tempus leo vel felis porttitor,
                  vel finibus nulla tristique. Praesent sodales aliquet est id
                  sollicitudin. Quisque facilisis est ut elit dictum, vitae
                  vehicula urna lobortis. Vestibulum consectetur commodo nisi,
                  ut efficitur ex rhoncus ut. Proin tincidunt sollicitudin
                  ipsum, sed posuere ligula euismod id. Etiam laoreet justo ac
                  convallis faucibus.
                </p>
              </Prose>
            </div>
          </div>
        </Container>
      </main>
    </>
  );
}
