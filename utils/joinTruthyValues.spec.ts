import { joinTruthyValues } from "./joinTruthyValues";

describe("joinTruthyValues", () => {
  it("falsy value를 필터링하고 반환한다.", () => {
    const result = joinTruthyValues({ fields: [1, 2, undefined, "", "3"] });

    expect(result).toBe("1, 2, 3");
  });

  it("객체 배열인 fields와 함께 fieldName을 파라매터로 넘기면, fieldName 키에 할당된 값으로 falsy value filter 및 join 하여 반환한다.", () => {
    const result = joinTruthyValues({
      fields: [
        { key: 1 },
        { key: 2, foo: 3 },
        { key: undefined },
        { key: null },
        { foo: 3 },
      ],
      fieldName: "key",
    });

    expect(result).toBe("1, 2");
  });

  it("delimiter를 파라매터로 넘기면, 해당 delimiter로 join하여 반환한다.", () => {
    const result = joinTruthyValues({
      fields: [1, 2, undefined, "", "3"],
      delimiter: "&",
    });

    expect(result).toBe("1&2&3");
  });
});
