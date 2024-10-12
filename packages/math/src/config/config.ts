import { ConverterConfig } from "@sumiml/core/src/converter/config";
import htmlDefinition from "../html/definition";
import htmlTheorem from "../html/theorem";
import htmlProposition from "../html/proposition";
import htmlLemma from "../html/lemma";
import htmlCorollary from "../html/corollary";
import htmlExample from "../html/example";
import htmlProof from "../html/proof";

export const mathConfig: ConverterConfig = {
  scope: {
    "Definition": htmlDefinition,
    "Theorem": htmlTheorem,
    "Proposition": htmlProposition,
    "Lemma": htmlLemma,
    "Corollary": htmlCorollary,
    "Example": htmlExample,
    "Proof": htmlProof,
  },
  display: {},
  markup: {},
} as const;