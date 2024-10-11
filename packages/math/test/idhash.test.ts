import { test, expect, describe } from 'vitest';
import { getIdHash, getRandomId } from '../src/util/idhash';

describe("idhash", () => {
  test("success1", () => {
    // Arrange
    const input = "こんにちは";
    console.log(getRandomId());

    // Act
    const output = getIdHash(input);

    // Assert
    expect(output).toBe("p8qb");
  });

  test("success2", () => {
    // Arrange
    const input = "こんばんは。さようなら。お元気で";

    // Act
    const output = getIdHash(input);

    // Assert
    expect(output).toBe("ic07");
  });
});