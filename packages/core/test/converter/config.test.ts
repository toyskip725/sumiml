import { test, expect, describe } from 'vitest';
import { ConverterConfig } from '../../src/converter/config';
import htmlSection from '../../src/html/section';
import htmlMath from '../../src/html/math';
import htmlStrong from '../../src/html/strong';
import htmlSubsection from '../../src/html/subsection';
import htmlLink from '../../src/html/link';
import { mergeConfig } from '../../src/converter/htmlCompiler';

describe("marge config", () => {
  test("success1", () => {
    // Arrange
    const configs: ConverterConfig[] = [
      {
        scope: { "Section": htmlSection },
        display: { "Math": htmlMath },
        markup: { "Strong": htmlStrong },
      },
      {
        scope: { "Subsection": htmlSubsection },
        display: {},
        markup: { "Link": htmlLink },
      },
    ];
    
    // Act
    const result = mergeConfig(configs);

    // Assert
    expect(result).toEqual<ConverterConfig>({
      scope: {
        "Section": htmlSection,
        "Subsection": htmlSubsection
      },
      display: {
        "Math": htmlMath
      },
      markup: {
        "Strong": htmlStrong,
        "Link": htmlLink
      },
    });
  });

  test("success2", () => {
    // Arrange
    const configs: ConverterConfig[] = [
      {
        scope: { "Section": htmlSection },
        display: { "Math": htmlMath },
        markup: { "Strong": htmlStrong },
      },
      {
        scope: { "Section": htmlSection },
        display: { "Math": htmlMath },
        markup: { "Strong": htmlStrong },
      },
    ];

    // Act
    const result = mergeConfig(configs);

    // Assert
    expect(result).toEqual<ConverterConfig>({
      scope: {
        "Section": htmlSection,
      },
      display: {
        "Math": htmlMath
      },
      markup: {
        "Strong": htmlStrong,
      },
    });
  });
});