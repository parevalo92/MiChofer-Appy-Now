document.addEventListener("DOMContentLoaded", async () => {
  // ========= TOC (si existe) =========
  const content = document.getElementById("postContent");
  const tocList = document.getElementById("tocList");

  if (content && tocList) {
    const headings = content.querySelectorAll("h2");
    headings.forEach((h2, index) => {
      if (!h2.id) h2.id = "sec-" + (index + 1);
      const li = document.createElement("li");
      const a = document.createElement("a");
      a.href = "#" + h2.id;
      a.textContent = h2.textContent;
      li.appendChild(a);
      tocList.appendChild(li);
    });
  }

  // ========= RECOMENDADOS (abajo del post) =========
  const recommendedCards = document.getElementById("recommendedCards");
  if (!recommendedCards) return; // si no existe el contenedor, no hace nada

  // 1) Cargar posts.json
  let posts = [];
  try {
    const res = await fetch("/blog/data/posts.json", { cache: "no-store" });
    if (!res.ok) throw new Error("No se pudo cargar posts.json (status " + res.status + ")");
    posts = await res.json();
  } catch (err) {
    console.error("Error cargando posts.json:", err);
    recommendedCards.innerHTML = `<p style="opacity:.8">No se pudieron cargar recomendados.</p>`;
    return;
  }

  // 2) Obtener el slug del post actual desde el nombre del archivo
  // Ej: /blog/posts/requisitos-chofer-el-salvador.html -> requisitos-chofer-el-salvador
  const currentFile = window.location.pathname.split("/").pop() || "";
  const currentSlug = currentFile.replace(".html", "");

  // 3) Filtrar recomendados (recommended:true) y excluir el actual
  const rec = posts
    .filter(p => p.recommended === true && p.slug !== currentSlug)
    .slice(0, 3);

  if (!rec.length) {
    recommendedCards.innerHTML = `<p style="opacity:.8">Aún no hay recomendados.</p>`;
    return;
  }

  // 4) Render cards
  recommendedCards.innerHTML = rec.map(p => `
    <a class="recommended-card" href="./${p.slug}.html" aria-label="Recomendado: ${p.title}">
      <img src="${p.cover || ""}" alt="${p.alt || p.title || "Recomendado"}" loading="lazy">
      <div class="recommended-card-body">
        <small>${p.category || ""}${p.readingTime ? " • " + p.readingTime : ""}</small>
        <h3>${p.title || ""}</h3>
        ${p.recommendedLabel ? `<div class="recommended-badge">${p.recommendedLabel}</div>` : ""}
      </div>
    </a>
  `).join("");
});
