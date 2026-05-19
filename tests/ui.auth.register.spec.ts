import { test } from "../fixtures/cleanState.fixture";
import { createUser } from "../helpers/userFactory";

test.describe("User Registration", () => {
  test("Should register a new user successfully", async ({
    homePage,
    registerPage,
  }) => {
    const { username, email, password } = createUser();

    // Fill and submit the form
    await registerPage.fillRegistrationForm(username, email, password);
    await registerPage.submitRegistration();

    // Verify registration - user is logged in
    await homePage.verifyUserIsLoggedIn(username);

    console.log("username:", username);
    console.log("email:", email);
    console.log("password:", password);
  });
});
