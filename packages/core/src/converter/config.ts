import { HTMLGenerator, HTMLGeneratorFactory, HTMLReducerGenerator } from "../generator/generator";
import htmlBlockquote from "../html/blockquote";
import htmlDocument from "../html/document";
import htmlEmphasis from "../html/emphasis";
import htmlLink from "../html/link";
import htmlList from "../html/list";
import htmlMath from "../html/math";
import htmlSection from "../html/section";
import htmlStrong from "../html/strong";
import htmlSubsection from "../html/subsection";
import htmlSubsubsection from "../html/subsubsection";
import { DisplayNode } from "../syntax/display";
import { EnumerationNode } from "../syntax/enumeration";
import { MarkupNode } from "../syntax/markup";
import { ScopeContentNode, ScopeNode } from "../syntax/scope";

export type ConverterType = "html";
export type ConverterConfig = {
  scope: Record<string, HTMLGeneratorFactory<ScopeNode, HTMLReducerGenerator<ScopeContentNode>>>;
  enumeration: Record<string, HTMLGeneratorFactory<EnumerationNode, HTMLGenerator<MarkupNode>>>;
  display: Record<string, HTMLGenerator<DisplayNode>>;
  markup: Record<string, HTMLGenerator<MarkupNode>>;
};

export const coreScopeConfig = {
  "Document": htmlDocument,
  "Section": htmlSection,
  "Subsection": htmlSubsection,
  "Subsubsection": htmlSubsubsection,
} as const;

export const coreEnumerationConfig = {
  "List": htmlList,
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
  enumeration: coreEnumerationConfig,
  display: coreDisplayConfig,
  markup: coreMarkupConfig,
} as const;