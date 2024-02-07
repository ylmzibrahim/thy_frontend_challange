import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import FlightQuery from "../src/components/FlightQuery";
import { Provider } from "react-redux";
import { store } from "store/store";
import { I18nextProvider } from "react-i18next";
import i18n from "../i18n";

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

describe("FlightQuery", () => {
  it("renders a heading", () => {
    render(
      <Provider store={store}>
        <I18nextProvider i18n={i18n}>
          <FlightQuery />
        </I18nextProvider>
      </Provider>
    );

    const heading = screen.getByRole("heading", { level: 3 });

    expect(heading).toBeInTheDocument();
  });
});
