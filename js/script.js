
'use strict';

const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optArticleTagsSelector = '.post-tags .list',
  optArticleAuthorSelector = '.post-author',
  optTagsListSelector = '.tags.list',
  optCloudClassCount = '5',
  optCloudClassPrefix = 'tag-size',
  optArticleTagsElementSelector = '.post-tags .list li';


function titleClickHandler(event) {
  event.preventDefault();
  const clickedElement = this;
  /* [DONE] remove class 'active' from all article links  */
  const activeLinks = document.querySelectorAll('.titles a.active');

  for (let activeLink of activeLinks) {
    activeLink.classList.remove('active');
  }
  /* [IN PROGRESS] add class 'active' to the clicked link */
  clickedElement.classList.add('active');
  /* [DONE] remove class 'active' from all articles */
  const activeArticles = document.querySelectorAll('article.active');

  for (let activeArticle of activeArticles) {
    activeArticle.classList.remove('active');
  }
  /* get 'href' attribute from the clicked link */
  const atricleSelector = clickedElement.getAttribute('href');
  /* find the correct article using the selector (value of 'href' attribute) */
  const targetArticle = document.querySelector(atricleSelector);

  /* add class 'active' to the correct article */
  targetArticle.classList.add('active');
}

function generateTitleLinks(customSelector = '') {
  /* remover contents of titleList */
  const titleList = document.querySelector(optTitleListSelector);
  /* for each article */
  const articles = document.querySelectorAll(optArticleSelector + customSelector);
  let html = '';

  for (let article of articles) {
    /* get the article id */
    const articleId = article.getAttribute('id');
    /* find the title element */
    const articleTitle = article.querySelector(optTitleSelector).innerHTML;
    /* get the title from the title element */
    /* create HTML of the link */
    const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
    /* insert link into titleList */
    html = html + linkHTML;
  }

  titleList.innerHTML = html;
  const links = document.querySelectorAll('.titles a');
  for (let link of links) {
    link.addEventListener('click', titleClickHandler);
  }
}

generateTitleLinks();


function tagClickHandler(event){
  /* prevent default action for this event */
  event.preventDefault();
  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;
  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const link = clickedElement.querySelector('a[href^=#tag-"]');
  const href = link.getAttribute('href');
  /* make a new constant "tag" and extract tag from the "href" constant */
  const tag = href.replace('#tag-', '');
  /* find all tag links with class active */
  const activeTagLinks = document.querySelectorAll('a.active');
  /* START LOOP: for each active tag link */
  for (let activeTagLink of activeTagLinks) {
    /* remove class active */
    activeTagLink.classList.remove('active');
  /* END LOOP: for each active tag link */
  }
  /* find all tag links with "href" attribute equal to the "href" constant */
  const hrefTagLinks = document.querySelectorAll(href);
  /* START LOOP: for each found tag link */
  for (let hrefTagLink of hrefTagLinks) {
    /* add class active */
    hrefTagLink.classList.add('active');
  /* END LOOP: for each found tag link */
  }
  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-tags~="' + tag + '"]');
}

function addClickListenersToTags(){
  /* find all links to tags */
  const tagLinks = document.querySelectorAll(optArticleTagsElementSelector);
  /* START LOOP: for each link */
  for (let tagLink of tagLinks) {
    /* add tagClickHandler as event listener for that link */
    tagLink.addEventListener('click', tagClickHandler);
  /* END LOOP: for each link */
  }
}

addClickListenersToTags();

function generateAuthors() {
  /* find class active in "article"*/
  const activeArticles = document.querySelectorAll('.post.active');
  /* make LOOP for articles and add class active*/
  for(let activeArticle of activeArticles){
    activeArticle.classList.add('active');
  }
  /* find authors text in html */
  const names = document.querySelectorAll(optArticleAuthorSelector);
  /* make a LOOP and remove authors from html*/
  for(let name of names){
    name.innerHTML = '';
  }
  /* find all articles */
  const articles = document.querySelectorAll(optArticleSelector);
  /* START LOOP: for every article */
  for (let article of articles) {
    /* find author wrapper */
    const authorsWraper = article.querySelector(optArticleAuthorSelector);
    /* make html variable with empty string */
    let html = '';
    /* get tags from author-tag attribute */
    const authorTag = article.getAttribute('author-tag');
    /* generate HTML of the author's link */
    const linkAuthorHTMLTag = '<li><a href="#au-' + authorTag + '">' + authorTag + '</a></li>';
    /* add generated code to html variable */
    html = html + linkAuthorHTMLTag;
    /* insert HTML of all the links into the tags wrapper */
    authorsWraper.innerHTML = html;
    /* END LOOP */
  }
}

generateAuthors();

function authorClickHandler(event) {
  /* prevent default action for this event */
  event.preventDefault();
  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;
  /* make new constant named "href" */
  const href = clickedElement.getAttribute('href');
  /* make new constant author and take author name */
  const author = href.replace('#au-', '');
  /* find all author links with class active */
  const activeAuthors = document.querySelectorAll('a.active[href^="#au-"]');
  /* START LOOP: for each activeAuthor */
  for (let activeAuthor of activeAuthors) {
    activeAuthor.classList.remove('active');
    /* END LOOP */
  }
  const authorLinks = document.querySelectorAll('a[href="' + href + '"]');
  /* START LOOP: for each authorlink */
  for (let authorLink of authorLinks) {
    authorLink.classList.add('active');
  }
  generateTitleLinks('[author-tag="' + author + '"]');
  /* END LOOP */
}

function addClickListenersToAuthors() {
  /* find all links to tags */
  const linksToAuthors = document.querySelectorAll('.post-author a');
  /* START LOOP: for each link */
  for (let linkAuthor of linksToAuthors) {
    linkAuthor.addEventListener('click', authorClickHandler);
  }
  /* END LOOP: for each link */
}
addClickListenersToAuthors();


function calculateTagsParams(tags) {
  const params = { max: 0, min: 999999 };
  console.log(params);
  for (let tag in tags) {
    console.log(tag + ' is used ' + tags[tag] + ' times');
  }
  return params;
}
function calculateTagClass(count, params) {
  const normalizedCount = count - params.min;
  const normalizedMax = params.max - params.min;
  const percentage = normalizedCount / normalizedMax;
  const classNumber = Math.floor(percentage * (optCloudClassCount - 1) + 1);
  const classTag = optCloudClassPrefix + classNumber;
  console.log(classTag);
}

function generateTags() {
  /* NEW crate a new variable allTags with an empty object */
  let allTags = {};
  /* find all articles */
  const articles = document.querySelectorAll('.post');
  /* START LOOP: for every article */
  for (let article of articles) {
    /* find tags wrapper */
    const tagsWrapper = document.querySelector(optArticleSelector);
    /* make html variable with empty string */
    let html = '';
    /* get tags from data-tags attribute */
    const articleTags = article.getAttribute('data-tags');
    /* split tags into array */
    const articleTagsArray = articleTags.split(' ');
    /* START LOOP: for each tag */
    for (let tag of articleTagsArray) {
      /* generate HTML of the link */
      const linkHTMLTag = '<li><a href="#tag-' + tag + '">' + tag + '</a></li>';
      /* add generated code to html variable */
      html = html + linkHTMLTag;
      /* NEW check if this  link is NOT already in allTags */
      if (!allTags.hasOwnProperty(tag)) {
        /* NEW add tag to allTags object */
        allTags[tag] = 1;
      } else {
        allTags[tag]++;
      }
      /* END LOOP: for each tag */
    }
    /* insert HTML of all the links into the tags wrapper */
    tagsWrapper.innerHTML = html;
    /* END LOOP: for every article: */
  }
  /* NEW find list of tags in rught column */
  const tagList = document.querySelector('.tags');
  /* NEW create variable for all links HTML code */
  const tagsParams = calculateTagsParams(allTags);
  /* NEW add HTML code for allTagsHTML */
  let allTagsHTML = '';
  /* NEW START LOOP: for each tag in allTags: */
  for (let tag in allTags) {
    /* NEW generate code of a link and add it to allTagsHTML */
    const tagLinkHTML = '<li>' + calculateTagClass(allTags[tag], tagsParams) + '</li>';
    allTagsHTML += tagLinkHTML;
    /* NEW END LOOP: for each tag in allTags */
  }
  /* NEW add html from allTagsHTML to tagList */
  tagList.innerHTML = '<a href="# ' + allTagsHTML + '">' + allTagsHTML + '</a>';
}

generateTags();
