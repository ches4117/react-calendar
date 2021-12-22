import { formatDateString, disabledDayOfMonth, daysOfMonth } from "./utils";

describe("Test RepoList", () => {
  it("Format selected date", () => {
    expect(formatDateString({ day: 2, month: "Dec", year: "2021" })).toBe(
      "2021-12-02"
    );
  });

  it("days of month", () => {
    expect(daysOfMonth("2021-12-21")).toEqual(
      expect.arrayContaining([...Array(31).keys()].map((i) => i + 1))
    );
  });

  it("disabled days of month", () => {
    expect(disabledDayOfMonth("2021-12-21")).toEqual(
      expect.arrayContaining([28, 29, 30])
    );
  });
});
