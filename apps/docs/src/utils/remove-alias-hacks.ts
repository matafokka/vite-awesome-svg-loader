window.addEventListener("DOMContentLoaded", () => {
  // Remove query from links in sidebar

  const links = document.getElementById("starlight__sidebar")!.getElementsByTagName("a");

  for (const link of links) {
    const origHref = link.getAttribute("href") || ""; // href property returns absolute URL, this returns original value
    const queryIndex = origHref.indexOf("?");

    if (queryIndex !== -1) {
      link.href = origHref.substring(0, queryIndex);
    }
  }

  // Remove sidebar-alias from query

  const url = new URL(window.location.href);

  if (url.searchParams.has("sidebar-alias")) {
    url.searchParams.delete("sidebar-alias");
    window.history.replaceState(null, "", url.toString());
  }
});
