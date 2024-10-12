import { HTMLGenerator, HTMLGeneratorFactory, HTMLReducerGenerator } from "../generator/generator";
import htmlBlockquote from "../html/blockquote";
import htmlEmphasis from "../html/emphasis";
import htmlLink from "../html/link";
import htmlMath from "../html/math";
import htmlSection from "../html/section";
import htmlStrong from "../html/strong";
import htmlSubsection from "../html/subsection";
import htmlSubsubsection from "../html/subsubsection";
import { DisplayNode } from "../syntax/display";
import { MarkupNode } from "../syntax/markup";
import { ScopeContentNode, ScopeNode } from "../syntax/scope";

export type ConverterType = "html";
export type ConverterConfig = {
  scope: Record<string, HTMLGeneratorFactory<ScopeNode, HTMLReducerGenerator<ScopeContentNode>>>;
  display: Record<string, HTMLGenerator<DisplayNode>>;
  markup: Record<string, HTMLGenerator<MarkupNode>>;
};

export const coreScopeConfig = {
  "Section": htmlSection,
  "Subsection": htmlSubsection,
  "Subsubsection": htmlSubsubsection,
} as const;

export const coreDisplayConfig = {
  "Math": htmlMath,
  "Blockquote": htmlBlockquote,
} as const;

export const coreMarkupConfig = {
  "Strong": htmlStrong,
  "Emphasis": htmlEmphasis,
  "Link": htmlLink,
} as const;

export const coreConfig: ConverterConfig = {
  scope: coreScopeConfig,
  display: coreDisplayConfig,
  markup: coreMarkupConfig,
} as const;