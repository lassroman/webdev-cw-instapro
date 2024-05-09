import { renderHeaderComponent } from "./header-component.js";
import { posts, goToPage } from "../index.js";
import { formatDistance } from "date-fns";
import { ru } from "date-fns/locale";
import { initLikeListeners } from "./posts-page-component.js";




export function renderUserPostPageComponent() {

    console.log("Актуальный список постов:", posts);




    const postsUserHtml = posts
        .map((post, index) => {
            return `<li class="post">
      <div class="post-header" data-user-id="${post.user.id}">
          <img src="${post.user.imageUrl}" class="post-header__user-image">
          <p class="post-header__user-name">${post.user.name}</p>
      </div>
      <div class="post-image-container">
        <img class="post-image" src="${post.imageUrl}">
      </div>
      <div class="post-likes">
        <button data-post-id="${post.id}" data-is-liked="${post.isLiked}" data-like="${post.isLiked ? 'true' : ''}" data-index="${index}"class="like-button">
          <img src="${post.isLiked ? `./assets/images/like-active.svg` : `./assets/images/like-not-active.svg`}">
        </button>
        <p class="post-likes-text">
          Нравится: <strong>${post.likes.length >= 1 ? post.likes[0].name : '0'}</strong>${(post.likes.length - 1) > 0 ? 'и ещё' + ' ' + (post.likes.length - 1) : ''}
        </p>
      </div>
      <p class="post-text">
        <span class="user-name">${post.user.name}</span>
        ${post.description}
      </p>
      <p class="post-date">
      ${formatDistance(post.createdAt, new Date(), { addSuffix: true, locale: ru })}
      </p>
    </li>`;
        })
        .join("");


    const appHtml = `
              <div class="page-container">
                <div class="header-container"></div>
                <ul class="posts">
                ${postsUserHtml}
                </ul>`
    //   </div>`

    appEl.innerHTML = appHtml;

    renderHeaderComponent({
        element: document.querySelector(".header-container"),
    });

    // for (let userEl of document.querySelectorAll(".post-header")) {
    //     userEl.addEventListener("click", () => {
    //         goToPage(USER_POSTS_PAGE, {
    //             userId: userEl.dataset.userId,
    //         });
    //     });
    // }
    initLikeListeners(posts[0].user.id)
}