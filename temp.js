function sortAnyWay(way) {
  // asc, desc
  [array, favoritesArray].forEach((collection) => {
    collection.sort((a, b) => {
      if (a.name > b.name) {
        return way === "asc" ? 1 : -1;
      } else {
        return way === "asc" ? -1 : 1;
      }
    });
  });
  deleteAll();
  array.forEach((person) => makeCard(person, ".main", "<span>♡</span>"));
  favoritesArray.forEach((person) =>
    makeCard(person, ".favorites", `<i class="fa-solid fa-xmark"></i>`)
  );
}
