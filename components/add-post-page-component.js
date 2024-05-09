import { renderUploadImageComponent } from "./upload-image-component.js";
import { renderHeaderComponent } from "./header-component.js";
import { sanitizeHtml } from "./sanitizeHtml.js";


export function renderAddPostPageComponent({ appEl, onAddPostClick }) {
  let imageUrl = "";
  const render = () => {
    // TODO: Реализовать страницу добавления поста
    const appHtml = `<div class="page-container">
    <div class="header-container"></div>
    <div class="form">
      <h3 class="form-title">Добавить пост</h3>
      <div class="form-inputs">
        <div class="upload-image-container">
        <div class="upload=image">      
        <label class="file-upload-label secondary-button">
        <input type="file" class="file-upload-input" style="display:none">
      Выберите фото
    </label>  
    </div>
      </div>
        <label>
          Опишите фотографию:
          <textarea id="textarea-input" class="input textarea" rows="4"></textarea>
          </label>
    <button class="button" id="add-button">Добавить</button>
  </div>
`;

    appEl.innerHTML = appHtml;

    const descriptionIn = document.getElementById("textarea-input");

    document.getElementById("add-button").addEventListener("click", () => {
      onAddPostClick({
        description: sanitizeHtml(descriptionIn.value),
        imageUrl,
      });
    });
  };

  render();
  renderHeaderComponent({
    element: document.querySelector(".header-container"),
  });

  const uploadImageContainer = appEl.querySelector(".upload-image-container");
  if (uploadImageContainer) {
    renderUploadImageComponent({
      element: appEl.querySelector(".upload-image-container"),
      onImageUrlChange(newImageUrl) {
        imageUrl = newImageUrl;
      },
    });
  }
}
