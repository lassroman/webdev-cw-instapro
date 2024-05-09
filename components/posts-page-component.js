import { POSTS_PAGE, USER_POSTS_PAGE, } from "../routes.js";
import { renderHeaderComponent } from "./header-component.js";
import { posts, goToPage, getToken } from "../index.js";
import { addLike, deleteLike } from "../api.js";
import { formatDistance } from "date-fns";
import { ru } from "date-fns/locale";

const appEl = document.getElementById("app");
export function renderPostsPageComponent({ appEl }) {
  // TODO: реализовать рендер постов из api
  console.log("Актуальный список постов:", posts);

  /**
   * TODO: чтобы отформатировать дату создания поста в виде "19 минут назад"
   * можно использовать https://date-fns.org/v2.29.3/docs/formatDistanceToNow
   */

  const postsHtml = posts
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
      <button data-post-id="${post.id}" data-is-liked="${post.isLiked}" data-like="${post.isLiked ? "true" : ""
        }" data-index="${index}"class="like-button">
          <img src="${post.isLiked
          ? `./assets/images/like-active.svg`
          : `./assets/images/like-not-active.svg`
        }">
        </button>
        <p class="post-likes-text">
        Нравится: <strong>${post.likes.length >= 1 ? post.likes[0].name : "0"
        }</strong>${post.likes.length - 1 > 0 ? "и ещё" + " " + (post.likes.length - 1) : ""
        }
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
                ${postsHtml}
                </ul>
              </div>`;

  appEl.innerHTML = appHtml;

  renderHeaderComponent({
    element: document.querySelector(".header-container"),
  });

  for (let userEl of document.querySelectorAll(".post-header")) {
    userEl.addEventListener("click", () => {
      goToPage(USER_POSTS_PAGE, {
        userId: userEl.dataset.userId,
      });
    });
  }
  initLikeListeners();
}

export function initLikeListeners(userId) {
  const likeButtonList = document.querySelectorAll(".like-button");
  for (const likeButton of likeButtonList) {
    likeButton.addEventListener("click", () => {
      console.log(likeButton.dataset);
      if (likeButton.dataset.isLiked === "true") {
        deleteLike({ id: likeButton.dataset.postId, token: getToken() }).then(
          () => {
            if (userId) {
              goToPage(USER_POSTS_PAGE, { userId });
            } else {
              goToPage(POSTS_PAGE, { noLoading: true });
            }
          }
        );
      } else {
        addLike({ id: likeButton.dataset.postId, token: getToken() }).then(
          () => {
            if (userId) {
              goToPage(USER_POSTS_PAGE, { userId });
            } else {
              goToPage(POSTS_PAGE, { noLoading: true });
            }
          }
        );
      }
    });
  }
}
