const siteNameInput = document.getElementById("site-name");
const siteUrlInput = document.getElementById("site-url");
const addBtn = document.getElementById("add-btn");
const bookmarkList = document.getElementById("bookmark-list");

// Load bookmarks from localStorage
function loadBookmarks() {
  bookmarkList.innerHTML = "";
  const bookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];
  bookmarks.forEach((bookmark, index) => {
    const li = document.createElement("li");

    const link = document.createElement("a");
    link.href = bookmark.url;
    link.textContent = bookmark.name;
    link.target = "_blank";

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.classList.add("delete-btn");
    deleteBtn.addEventListener("click", () => {
      bookmarks.splice(index, 1);
      localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
      loadBookmarks();
    });

    li.appendChild(link);
    li.appendChild(deleteBtn);
    bookmarkList.appendChild(li);
  });
}

// Add bookmark
addBtn.addEventListener("click", () => {
  const name = siteNameInput.value.trim();
  const url = siteUrlInput.value.trim();

  if (name === "" || url === "") return;

  const bookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];
  bookmarks.push({ name, url });
  localStorage.setItem("bookmarks", JSON.stringify(bookmarks));

  siteNameInput.value = "";
  siteUrlInput.value = "";
  loadBookmarks();
});

// Initial load
loadBookmarks();
