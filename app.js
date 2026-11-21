const movies = [
  {
    id: 1,
    title: "Гарри Поттер и философский камень",
    year: 2001,
    genre: "фэнтези",
    rating: "8.3",
    poster: "https://placehold.co/400x600/1e1b4b/facc15?text=Harry+Potter+2001",
    youtubeId: "VyHV0BRtdxo",
    description: "Начало главной волшебной саги, которую пересматривают каждый год."
  },
  {
    id: 2,
    title: "Властелин колец: Братство Кольца",
    year: 2001,
    genre: "фэнтези",
    rating: "8.8",
    poster: "https://placehold.co/400x600/14532d/86efac?text=LOTR+2001",
    youtubeId: "V75dMMIW2B4",
    description: "Эталонное эпическое фэнтези."
  },
  {
    id: 3,
    title: "Интерстеллар",
    year: 2014,
    genre: "фантастика",
    rating: "8.6",
    poster: "https://placehold.co/400x600/0f172a/38bdf8?text=Interstellar+2014",
    youtubeId: "zSWdZVtXT7E",
    description: "Самый популярный научно-фантастический фильм о космосе и времени за последнее десятилетие."
  },
  {
    id: 4,
    title: "Начало",
    year: 2010,
    genre: "фантастика",
    rating: "8.7",
    poster: "https://placehold.co/400x600/18181b/e4e4e7?text=Inception+2010",
    youtubeId: "YoHD9XEInc0",
    description: "Культовый триллер Кристофера Нолана об архитектуре снов."
  },
  {
    id: 5,
    title: "Аватар",
    year: 2009,
    genre: "фантастика",
    rating: "8.0",
    poster: "https://placehold.co/400x600/083344/22d3ee?text=Avatar+2009",
    youtubeId: "5PSNL1qE6VY",
    description: "Самый кассовый фильм в истории кино."
  },
  {
    id: 6,
    title: "Матрица",
    year: 1999,
    genre: "боевик",
    rating: "8.5",
    poster: "https://placehold.co/400x600/052e16/4ade80?text=The+Matrix+1999",
    youtubeId: "vKQi3bBA1y8",
    description: "Киберпанк-боевик, изменивший визуальный язык кинематографа."
  },
  {
    id: 7,
    title: "Назад в будущее",
    year: 1985,
    genre: "комедия",
    rating: "8.6",
    poster: "https://placehold.co/400x600/451a03/fbbf24?text=Back+to+1985",
    youtubeId: "qvsgGtivCgs",
    description: "Эталонная приключенческая комедия о путешествиях во времени."
  },
  {
    id: 8,
    title: "Пираты Карибского моря: Проклятие Чёрной жемчужины",
    year: 2003,
    genre: "приключения",
    rating: "8.3",
    poster: "https://placehold.co/400x600/1c1917/f59e0b?text=Pirates+2003",
    youtubeId: "naQr0uTrQe",
    description: "Главный приключенческий блокбастер 2000-х."
  },
  {
    id: 9,
    title: "Дюна",
    year: 2021,
    genre: "фантастика",
    rating: "7.8",
    poster: "https://placehold.co/400x600/431407/fdba74?text=Dune+2021",
    youtubeId: "n9xhJrPXop4",
    description: "Масштабная современная экранизация классической фантастики."
  },
  {
    id: 10,
    title: "Парк Юрского периода",
    year: 1993,
    genre: "приключения",
    rating: "8.1",
    poster: "https://placehold.co/400x600/3f2e18/eab308?text=Jurassic+1993",
    youtubeId: "lc0UehYemQA",
    description: "Культовый фильм Стивена Спилберга о динозаврах."
  }
];

const moviesGrid = document.getElementById("moviesGrid");
const searchInput = document.getElementById("searchInput");
const genreSelect = document.getElementById("genreSelect");

const modal = document.getElementById("playerModal");
const closeModalBtn = document.getElementById("closeModalBtn");
const modalTitle = document.getElementById("modalTitle");
const modalMeta = document.getElementById("modalMeta");
const videoFrame = document.getElementById("videoFrame");
const modalDescription = document.getElementById("modalDescription");

function renderMovies(list) {
  moviesGrid.innerHTML = "";

  if (list.length === 0) {
    moviesGrid.innerHTML = "<p>По вашему запросу ничего не найдено.</p>";
    return;
  }

  list.forEach((movie) => {
    const card = document.createElement("article");
    card.className = "movie-card";
    card.innerHTML = `
      <img src="${movie.poster}" alt="${movie.title}" class="movie-card__poster" />
      <div class="movie-card__body">
        <h2 class="movie-card__title">${movie.title}</h2>
        <p class="movie-card__meta">${movie.year} • ${movie.genre} • ★ ${movie.rating}</p>
        <button class="watch-btn" data-id="${movie.id}">Смотреть</button>
      </div>
    `;

    card.querySelector(".watch-btn").addEventListener("click", () => openModal(movie));
    moviesGrid.appendChild(card);
  });
}

function filterMovies() {
  const query = searchInput.value.trim().toLowerCase();
  const genre = genreSelect.value;

  const filtered = movies.filter((movie) => {
    const matchesTitle = movie.title.toLowerCase().includes(query);
    const matchesGenre = genre === "all" || movie.genre === genre;
    return matchesTitle && matchesGenre;
  });

  renderMovies(filtered);
}

function openModal(movie) {
  modalTitle.textContent = movie.title;
  modalMeta.textContent = `Год: ${movie.year} | Жанр: ${movie.genre} | Рейтинг: ${movie.rating}`;
  modalDescription.textContent = movie.description;
  videoFrame.src = `https://www.youtube.com/embed/${movie.youtubeId}`;
  modal.classList.remove("hidden");
}

function closeModal() {
  modal.classList.add("hidden");
  videoFrame.src = "";
}

searchInput.addEventListener("input", filterMovies);
genreSelect.addEventListener("change", filterMovies);
closeModalBtn.addEventListener("click", closeModal);

modal.addEventListener("click", (event) => {
  if (event.target === modal) {
    closeModal();
  }
});

renderMovies(movies);