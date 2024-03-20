export const loadResources = async (resources) => {
  const allFetchResults = await Promise.all(Object.values(resources)
    .map(resource => Promise.all(resource
      .map(url => fetch(url)))));

  const allJsonResults = await Promise.all(allFetchResults
    .map(fetchResults => Promise.all(fetchResults
      .map(fetchResult => fetchResult.json()))));

  const result = Object.keys(resources).reduce((acc, resourceName, index) => {
    acc[resourceName] = allJsonResults[index];
    return acc;
  }, {});

  return result;
};

let cssLoaded = false;
export const loadResource = async (resource) => {
  if (resource.endsWith('.css')) {
    if (!cssLoaded) {
      cssLoaded = true;
      const link = document.createElement('link');
      link.href = resource;
      link.rel = 'stylesheet';
      document.head.append(link);
    }

    return;
  }

  const response = await fetch(resource);

  return response.json();
};

export const loadHomePage = async (resource, films) => {
  const homePage = await import(resource);

  homePage.createHomePage(films);
};

export const loadDetailedPage = async (resource, films, film) => {
  const detailedPage = await import(resource);

  detailedPage.createDetailedPage(films, film);
};
