import { test, expect } from "../../fixtures/auth-fixture";

test.describe("API - Articles", { tag: "@api" }, () => {
  test("API - Article CRUD operations", async ({ request, authToken }) => {
    // console.log("Using authToken: ", authToken);
    const articlesUrl = `${process.env.API_BASE_URL}/articles`;
    const articleTitle = `Article Name ${Date.now()}`;
    const articleDescription = `Description for ${articleTitle}`;
    const articleBody = `Body Text for ${articleTitle}`;
    const authHeaders = {
      Authorization: `Token ${authToken}`,
      "Content-Type": "application/json",
    };

    // --- CREATE ---
    const requestURLCreateArticle = `${articlesUrl}`;
    const createResponse = await request.post(requestURLCreateArticle, {
      // 1. Add the headers object
      headers: authHeaders,
      // 2. Pass data
      data: {
        article: {
          title: articleTitle,
          description: articleDescription,
          body: articleBody,
          tagList: [],
        },
      },
    });

    expect(createResponse.ok()).toBeTruthy();
    expect(createResponse.status()).toBe(200);
    const createResponseBody = await createResponse.json();
    const createdArticleSlug = createResponseBody.article.slug;
    // console.log("Created Article Slug: ", createdArticleSlug);

    // -- READ --
    const readResponse = await request.get(
      `${requestURLCreateArticle}/${createdArticleSlug}`,
    );
    expect(readResponse.ok()).toBeTruthy();
    expect(readResponse.status()).toBe(200);
    const responseReadBody = await readResponse.json();
    // console.log(responseReadBody);
    expect(responseReadBody.article.title).toEqual(articleTitle);
    expect(responseReadBody.article.description).toEqual(articleDescription);
    expect(responseReadBody.article.body).toEqual(articleBody);

    // --- UPDATE ---
    const requestURLUpdateArticle = `${requestURLCreateArticle}/${createdArticleSlug}`;
    // console.log("requestURLUpdateArticle: " + requestURLUpdateArticle);
    const updateResponse = await request.put(requestURLUpdateArticle, {
      // 1. Add the headers object
      headers: authHeaders,
      // 2. Pass data
      data: {
        article: {
          slug: createdArticleSlug,
          title: "UPD " + articleTitle,
          description: "UPD " + articleDescription,
          body: "UPD " + articleBody,
        },
      },
    });
    if (!updateResponse.ok()) {
      console.log(await updateResponse.json());
    }

    expect(updateResponse.ok()).toBeTruthy();
    expect(updateResponse.status()).toBe(200);
    const updateResponseBody = await updateResponse.json();
    expect(updateResponseBody.article.title).toEqual("UPD " + articleTitle);
    expect(updateResponseBody.article.description).toEqual(
      "UPD " + articleDescription,
    );
    expect(updateResponseBody.article.body).toEqual("UPD " + articleBody);
    expect(updateResponseBody.article.slug).toEqual(createdArticleSlug);

    // --- DELETE ---
    const requestURLDeleteArticle = `${articlesUrl}/${createdArticleSlug}`;
    // console.log("requestURLDeleteArticle: " + requestURLDeleteArticle);

    const deleteResponse = await request.delete(requestURLDeleteArticle, {
      // Add the headers object
      headers: authHeaders,
    });
    if (!deleteResponse.ok()) {
      console.log(await deleteResponse.json());
    }
    expect(deleteResponse.ok()).toBeTruthy();
    expect(deleteResponse.status()).toBe(204);

    // Verify deletion
    const verifyDeleteResponse = await request.get(
      `${articlesUrl}/${createdArticleSlug}`,
    );
    expect(verifyDeleteResponse.ok()).toBeFalsy();
    expect(verifyDeleteResponse.status()).toBe(404);
  });
});
