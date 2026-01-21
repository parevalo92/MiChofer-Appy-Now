// =============================
// BLOG.JS (COMPLETO)
// =============================

const postsGrid = document.getElementById("postsGrid");
const searchInput = document.getElementById("searchInput");
const categorySelect = document.getElementById("categorySelect");
const emptyState = document.getElementById("emptyState");

// Recomendados (opcional)
const recommendedList = document.getElementById("recommendedList");

// -----------------------------
// Helpers
// -----------------------------
function normalize(text) {
  return (text || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, ""); // quita acentos
}

function formatDate(isoDate) {
  // isoDate: "YYYY-MM-DD"
  if (!isoDate) return "";
  const [y, m, d] = isoDate.split("-").map(Number);
  const date = new Date(y, m - 1, d);
  return date.toLocaleDateString("es-SV", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

// -----------------------------
// Data
// -----------------------------
async function loadPosts() {
  try {
    const res = await fetch("../blog/data/posts.json");
    if (!res.ok) throw new Error(`No se pudo cargar posts.json (status ${res.status})`);
    const posts = await res.json();
    if (!Array.isArray(posts)) throw new Error("posts.json no es un array");
    return posts;
  } catch (err) {
    console.error("ERROR loadPosts:", err);
    return [];
  }
}

// -----------------------------
// UI: Categories
// -----------------------------
function renderCategories(posts) {
  if (!categorySelect) return;

  const categories = Array.from(new Set(posts.map((p) => p.category).filter(Boolean))).sort();

  categorySelect.innerHTML = `<option value="all">Todas las categorías</option>`;
  categories.forEach((cat) => {
    const opt = document.createElement("option");
    opt.value = cat;
    opt.textContent = cat;
    categorySelect.appendChild(opt);
  });
}

// -----------------------------
// UI: Main Cards
// -----------------------------
function buildCard(post) {
  const article = document.createElement("article");
  article.className = "post-card";

  // ✅ Card SIN fecha (solo categoría + tiempo)
  const metaHtml = `
    <div class="post-meta">
      ${post.category ? `<span><i class="fa-regular fa-calendar"></i> ${formatDate(post.date)}</span>` : ""}
      ${post.category ? `<span><i class="fa-solid fa-tag"></i> ${post.category}</span>` : ""}
      
    </div>
  `;

  article.innerHTML = `
    <img src="${post.cover || ""}" alt="${post.alt || post.title || "Post"}" loading="lazy">
    <div class="post-card-body">
      ${metaHtml}
      <h2>${post.title || "Sin título"}</h2>
      <p>${post.excerpt || ""}</p>
      <a href="./posts/${post.slug}.html" aria-label="Leer artículo: ${post.title || ""}">
        Leer más <i class="fa-solid fa-arrow-right"></i>
      </a>
    </div>
  `;

  return article;
}

function renderPosts(posts) {
  if (!postsGrid) return;

  postsGrid.innerHTML = "";

  if (!posts.length) {
    if (emptyState) emptyState.style.display = "block";
    return;
  }

  if (emptyState) emptyState.style.display = "none";
  posts.forEach((post) => postsGrid.appendChild(buildCard(post)));
}

// -----------------------------
// UI: Recommended (Aside)
// -----------------------------
function renderRecommended(posts) {
  // Si no existe el contenedor, no hacemos nada (no rompe)
  if (!recommendedList) return;

  const recommended = posts
    .filter((p) => p.recommended === true)
    .slice(0, 4);

  if (!recommended.length) {
    recommendedList.innerHTML = `<p style="opacity:.8">Aún no hay recomendados.</p>`;
    return;
  }

  recommendedList.innerHTML = recommended
    .map(
      (p) => `
      <a class="recommended-item" href="./posts/${p.slug}.html" aria-label="Recomendado: ${p.title}">
        <img src="${p.cover || ""}" alt="${p.alt || p.title || "Recomendado"}" loading="lazy">
        <div>
          <h3>${p.title || "Sin título"}</h3>
          <small>
            ${p.category ? p.category : ""}
            ${p.readingTime ? ` • ${p.readingTime}` : ""}
          </small>
          ${p.recommendedLabel ? `<div class="recommended-badge">${p.recommendedLabel}</div>` : ""}
        </div>
      </a>
    `
    )
    .join("");
}

// -----------------------------
// Filters
// -----------------------------
function applyFilters(allPosts) {
  const q = normalize(searchInput?.value || "");
  const selectedCategory = categorySelect?.value || "all";

  let filtered = [...allPosts];

  // Category
  if (selectedCategory !== "all") {
    filtered = filtered.filter((p) => p.category === selectedCategory);
  }

  // Search
  if (q.trim().length > 0) {
    filtered = filtered.filter((p) => {
      const haystack = normalize(
        `${p.title || ""} ${p.excerpt || ""} ${(p.tags || []).join(" ")} ${p.category || ""}`
      );
      return haystack.includes(q);
    });
  }

  // Orden por fecha desc (si existe)
  filtered.sort((a, b) => (a.date < b.date ? 1 : -1));

  renderPosts(filtered);
}

// -----------------------------
// Init
// -----------------------------
document.addEventListener("DOMContentLoaded", async () => {
  const posts = await loadPosts();

  renderCategories(posts);
  renderRecommended(posts);
  applyFilters(posts);

  // Eventos
  if (searchInput) {
    searchInput.addEventListener("input", () => applyFilters(posts));
  }
  if (categorySelect) {
    categorySelect.addEventListener("change", () => applyFilters(posts));
  }
});
