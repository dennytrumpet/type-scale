"use client";
import Container from "@/app/ui/Container";
import Prose from "@/app/ui/Prose";
import Button, { button } from "@/app/ui/Button";
import Form from "@/app/ui/Form";
import { Select, SelectItem } from "./ui/Select";
import { NumberField } from "./ui/NumberField";
import { useState, useRef, useEffect, useCallback } from "react";
import { Menu, Clipboard } from "lucide-react";
import { Drawer, DrawerContent, DrawerTrigger } from "@/app/ui/Drawer";
import { TabList, Tabs, Tab, TabPanel } from "./ui/Tabs";
import { Collection } from "react-aria-components";

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

const FormComponent = ({
  onChange
}: {
  onChange: (key: string, value: string) => void;
}) => (
  <Form className="relative">
    <Select
      label="Type scale"
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
        onChange("type-scale", `var(${selected})`);
      }}
    >
      {item => <SelectItem id={item.value}>{item.label}</SelectItem>}
    </Select>
    <Select
      label="Base Font Family"
      items={fonts}
      defaultSelectedKey={"--system-ui"}
      onSelectionChange={selected => {
        onChange("base-family", `var(${selected})`);
      }}
    >
      {item => <SelectItem id={item.value}>{item.label}</SelectItem>}
    </Select>
    <Select
      label="Display Font Family"
      items={fonts}
      defaultSelectedKey={"--system-ui"}
      onSelectionChange={selected => {
        onChange("display-family", `var(${selected})`);
      }}
    >
      {item => <SelectItem id={item.value}>{item.label}</SelectItem>}
    </Select>
    <NumberField
      label="Min screen size (px)"
      defaultValue={640}
      onChange={value => {
        onChange("min-font", value.toString());
      }}
    />
    <NumberField
      label="Min font size (px)"
      defaultValue={16}
      onChange={value => {
        onChange("min-font", value.toString());
      }}
    />
    <NumberField
      label="Max screen size (px)"
      defaultValue={1536}
      onChange={value => {
        onChange("max-screen", value.toString());
      }}
    />
    <NumberField
      label="Max font size (px)"
      defaultValue={20}
      onChange={value => {
        onChange("max-font", value.toString());
      }}
    />
    <NumberField
      label="Base Line Height"
      defaultValue={1.5}
      step={0.125}
      onChange={value => {
        onChange("leading-base", value.toString());
      }}
    />
    <NumberField
      label="Display Line Height"
      defaultValue={1.25}
      step={0.125}
      onChange={value => {
        onChange("leading-display", value.toString());
      }}
    />
    <NumberField
      label="Prose max-width (ch)"
      defaultValue={65}
      step={1}
      onChange={value => {
        onChange("prose-width", `${value}ch`);
      }}
    />
  </Form>
);

export default function Home() {
  const scaleRef = useRef<HTMLDivElement>(null);

  const [css, setCSS] = useState("");
  const [formValues, setFormValues] = useState({
    "type-scale": "var(--major-third)",
    "base-family": "var(--system-ui)",
    "display-family": "var(--system-ui)",
    "min-font": 16,
    "max-font": 20,
    "min-screen": 640,
    "max-screen": 1536,
    "leading-base": 1.5,
    "leading-display": 1.25,
    "prose-width": "65ch"
  });

  const generateCSS = useCallback(() => {
    const scaleDiv = scaleRef?.current;
    const styles = scaleDiv && getComputedStyle(scaleDiv);
    setCSS(`:where(html) {
  --type-scale: ${styles?.getPropertyValue("--type-scale")};
  --min-font: ${styles?.getPropertyValue("--min-font")};
  --max-font: ${styles?.getPropertyValue("--max-font")};
  --min-screen: ${styles?.getPropertyValue("--min-screen")};
  --max-screen: ${styles?.getPropertyValue("--max-screen")};
  --font-difference: calc(var(--max-font) - var(--min-font));
  --screen-difference: calc(var(--max-screen) - var(--min-screen));
  --fluid-font-size: calc(
    var(--min-font) * 1px + (var(--max-font) - var(--min-font)) *
      ((100vw - var(--min-screen) * 1px) / (var(--max-screen) - var(--min-screen)))
  );
  --leading-display: ${styles?.getPropertyValue("--leading-display")};
  --leading-base: ${styles?.getPropertyValue("--leading-base")};
  --base-family: ${styles?.getPropertyValue("--base-family")};
  --display-family: ${styles?.getPropertyValue("--display-family")};
  --prose-width: ${scaleDiv?.style.getPropertyValue("--prose-width")};

  --text-base: clamp(
    calc(var(--min-font) * 1px),
    var(--fluid-font-size),
    calc(var(--max-font) * 1px)
  );
  --text-lg: calc(var(--text-base) * var(--type-scale));
  --text-xl: calc(var(--text-lg) * var(--type-scale));
  --text-2xl: calc(var(--text-xl) * var(--type-scale));
  --text-3xl: calc(var(--text-2xl) * var(--type-scale));
  --text-4xl: calc(var(--text-3xl) * var(--type-scale));
  --text-5xl: calc(var(--text-4xl) * var(--type-scale));
  --text-sm: calc(var(--text-base) / var(--type-scale));
  --text-xs: calc(var(--text-sm) / var(--type-scale));
}

.fluid-typography {
  font-size: var(--text-base);
  line-height: var(--leading-base);
  font-family: var(--base-family);
  max-width: var(--prose-width);

  p {
    margin-top: 0;
    margin-bottom: var(--text-base);
  }

  h1,h2,h3,h4,h5,h6 {
    font-family: var(--display-family);
    line-height: var(--leading-display);
    margin-top: calc(1.5 * var(--text-base));
    margin-bottom: calc(0.5 * var(--text-base));
  }
  h1 { font-size: var(--text-5xl); }
  h2 { font-size: var(--text-4xl); }
  h3 { font-size: var(--text-3xl); }
  h4 { font-size: var(--text-2xl); }
  h5 { font-size: var(--text-xl); }
  h6 { font-size: var(--text-lg); }
}`);
  }, [scaleRef]);

  useEffect(() => {
    const scaleDiv = scaleRef?.current;
    Object.entries(formValues).forEach(([key, value]) => {
      scaleDiv?.style.setProperty(`--${key}`, `${value}`);
      scaleDiv?.style.setProperty(`--Dennis`, `is a cool guy`);
    });
    generateCSS();
  }, [formValues, generateCSS]);

  const tabItems = [
    {
      id: 1,
      label: "Scale",
      content: (
        <Prose className="max-w-[--prose-width] md:mx-0">
          <h1 className="mb-3 mt-0 text-balance font-display text-5xl font-semibold text-zinc-950 dark:text-zinc-50">
            Fluid Type Scale
          </h1>
          <h2 className="mb-3 mt-6 text-balance font-display text-4xl font-semibold text-zinc-950 dark:text-zinc-50">
            Fluid Type Scale
          </h2>
          <h3 className="mb-3 mt-6 text-balance font-display text-3xl font-semibold text-zinc-950 dark:text-zinc-50">
            Fluid Type Scale
          </h3>
          <h4 className="mb-3 mt-6 text-balance font-display text-2xl font-semibold text-zinc-950 dark:text-zinc-50">
            Fluid Type Scale
          </h4>
          <h5 className="mb-3 mt-6 text-balance font-display text-xl font-semibold text-zinc-950 dark:text-zinc-50">
            Fluid Type Scale
          </h5>
          <h6 className="mb-3 mt-6 text-balance font-display text-lg font-semibold text-zinc-950 dark:text-zinc-50">
            Fluid Type Scale
          </h6>
          <p className="mb-4 mt-0 text-pretty font-body text-base">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras eros
            nulla, sollicitudin at ligula ac, lacinia condimentum nisl. Sed
            sodales ac justo eget euismod. Vivamus dapibus, leo et vestibulum
            viverra, risus enim lobortis ipsum, vitae mollis odio risus quis
            augue. Aenean tempus leo vel felis porttitor, vel finibus nulla
            tristique. Praesent sodales aliquet est id sollicitudin. Quisque
            facilisis est ut elit dictum, vitae vehicula urna lobortis.
            Vestibulum consectetur commodo nisi, ut efficitur ex rhoncus ut.
            Proin tincidunt sollicitudin ipsum, sed posuere ligula euismod id.
            Etiam laoreet justo ac convallis faucibus.
          </p>
          <p className="mb-4 mt-0 text-pretty font-body text-sm text-zinc-600 dark:text-zinc-400">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras eros
            nulla, sollicitudin at ligula ac, lacinia condimentum nisl. Sed
            sodales ac justo eget euismod. Vivamus dapibus, leo et vestibulum
            viverra, risus enim lobortis ipsum, vitae mollis odio risus quis
            augue. Aenean tempus leo vel felis porttitor, vel finibus nulla
            tristique. Praesent sodales aliquet est id sollicitudin. Quisque
            facilisis est ut elit dictum, vitae vehicula urna lobortis.
            Vestibulum consectetur commodo nisi, ut efficitur ex rhoncus ut.
            Proin tincidunt sollicitudin ipsum, sed posuere ligula euismod id.
            Etiam laoreet justo ac convallis faucibus.
          </p>
          <p className="mb-4 mt-0 text-pretty font-body text-xs text-zinc-500">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras eros
            nulla, sollicitudin at ligula ac, lacinia condimentum nisl. Sed
            sodales ac justo eget euismod. Vivamus dapibus, leo et vestibulum
            viverra, risus enim lobortis ipsum, vitae mollis odio risus quis
            augue. Aenean tempus leo vel felis porttitor, vel finibus nulla
            tristique. Praesent sodales aliquet est id sollicitudin. Quisque
            facilisis est ut elit dictum, vitae vehicula urna lobortis.
            Vestibulum consectetur commodo nisi, ut efficitur ex rhoncus ut.
            Proin tincidunt sollicitudin ipsum, sed posuere ligula euismod id.
            Etiam laoreet justo ac convallis faucibus.
          </p>
        </Prose>
      )
    },
    {
      id: 2,
      label: "Code",
      content: (
        <code className="relative text-[.75rem] text-zinc-600 shadow-inner dark:text-zinc-400">
          <Button
            className={
              "absolute -right-3 -top-3 z-20 aspect-square border-0 bg-transparent px-3 py-0 text-zinc-400 hover:bg-zinc-950/10 dark:bg-transparent dark:text-zinc-600 hover:dark:bg-zinc-100/10 dark:hover:text-zinc-400"
            }
            onPress={() => {
              navigator.clipboard.writeText(css);
            }}
          >
            <Clipboard size={14} />
          </Button>
          <pre
            className="overflow-auto whitespace-pre"
            dangerouslySetInnerHTML={{ __html: css }}
          />
        </code>
      )
    }
  ];

  return (
    <>
      <header className="relative border-b border-zinc-950/10 dark:border-zinc-100/10">
        <Container className="flex-row justify-between px-4 py-3 sm:px-8 sm:py-6">
          <h1 className="font-display text-xl text-zinc-950 dark:text-zinc-50">
            Fluid Typography
          </h1>
        </Container>
      </header>
      <main className="relative isolate mx-auto w-full flex-auto flex-grow">
        <Container className="px-4 py-3 sm:px-8 sm:py-6">
          <div className="grid max-w-full items-stretch gap-6 md:grid-cols-[1fr_16rem]">
            <div className="order-2 flex flex-col space-y-4">
              <div className="hidden md:block">
                <FormComponent
                  onChange={(key, value) => {
                    console.log({ key, value });
                    setFormValues(prevValues => ({
                      ...prevValues,
                      [key]: value
                    }));
                  }}
                />
              </div>
            </div>
            <div
              className="type-scale max-w-full overflow-x-auto"
              ref={scaleRef}
            >
              <Tabs>
                <TabList items={tabItems}>
                  {item => <Tab className="text-[.875rem]">{item.label}</Tab>}
                </TabList>
                <Collection items={tabItems}>
                  {item => <TabPanel>{item.content}</TabPanel>}
                </Collection>
              </Tabs>
            </div>
          </div>
        </Container>
        <div className="fixed bottom-0 right-0 m-6 md:hidden">
          <Drawer>
            <DrawerTrigger
              className={button({
                variant: "primary",
                className: "aspect-square px-3 py-0"
              })}
            >
              <Menu />
            </DrawerTrigger>

            <DrawerContent>
              <div className="relative mx-auto max-h-full w-full max-w-sm p-4">
                <FormComponent
                  onChange={(key, value) => {
                    setFormValues(prevValues => ({
                      ...prevValues,
                      [key]: value
                    }));
                  }}
                />
              </div>
            </DrawerContent>
          </Drawer>
        </div>
      </main>
    </>
  );
}
