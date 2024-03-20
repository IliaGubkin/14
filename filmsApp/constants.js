const searchParams = new URLSearchParams(location.search);

export const container = document.querySelector('.container');
export const filmList = document.querySelector('.film-list');
export const filmNumber = searchParams.get('filmNumber');
