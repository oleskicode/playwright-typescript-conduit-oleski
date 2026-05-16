import { test, expect } from "../../fixtures/auth.api.fixture";
import { ArticleBuilder } from "../../helpers/articleBuilder";

let articleSlug: string | undefined;

test.afterEach(async ({ request, authToken }) => {
  if (!articleSlug) return;

  const response = await request.delete(
    `${process.env.API_BASE_URL}/articles/${articleSlug}`,
    {
      headers: {
        Authorization: `Token ${authToken}`,
      },
    },
  );

  expect(response.ok()).toBeTruthy();
  // console.log(`Deleted article: ${articleSlug}`);

  articleSlug = undefined;
});

test("Should fail with empty title", async ({ request, authToken }) => {
  const authHeaders = {
    Authorization: `Token ${authToken}`,
    "Content-Type": "application/json",
  };
  // console.log("Using authToken: ", authToken);

  const invalidArticle = new ArticleBuilder().withTitle("").build();

  const response = await request.post(`${process.env.API_BASE_URL}/articles`, {
    headers: authHeaders,
    data: invalidArticle,
  });

  const responseBody = await response.json();
  // console.log(responseBody);

  articleSlug = responseBody.article.slug;
  // console.log(`Created article: ${articleSlug}`);

  expect(response.status()).toBe(200);
});

test("Should fail with empty body", async ({ request, authToken }) => {
  const authHeaders = {
    Authorization: `Token ${authToken}`,
    "Content-Type": "application/json",
  };
  // console.log("Using authToken: ", authToken);

  const invalidArticle = new ArticleBuilder().withBody("").build();

  const response = await request.post(`${process.env.API_BASE_URL}/articles`, {
    headers: authHeaders,
    data: invalidArticle,
  });

  const responseBody = await response.json();
  articleSlug = responseBody.article.slug;
  // console.log(`Created article: ${articleSlug}`);

  expect(response.ok()).toBeTruthy();
  expect(response.status()).toBe(200);
});
