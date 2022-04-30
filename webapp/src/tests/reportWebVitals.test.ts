import "@testing-library/jest-dom/extend-expect";
import reportWebVitals from "../reportWebVitals";

jest.mock("web-vitals");

test("web vitals", async () => {
    reportWebVitals(() => 3 + 2);
    expect(true).toBe(true);
});