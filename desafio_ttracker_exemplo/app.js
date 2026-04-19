/* ================================================
   TREINOTRACKER — JAVASCRIPT PURO
   Manipulação de DOM, localStorage, eventos
   ================================================ */

// ===== SELETORES DO DOM =====
const workoutForm = document.getElementById('workoutForm');
const workoutList = document.getElementById('workoutList');
const emptyState = document.getElementById('emptyState');
const searchInput = document.getElementById('searchInput');
const themeToggle = document.getElementById('themeToggle');
const sortSelect = document.getElementById('sortSelect');
const toastEl = document.getElementById('toast');

// Campos do formulário
const nameInput = document.getElementById('exerciseName');
const typeInput = document.getElementById('exerciseType');
const durationInput = document.getElementById('exerciseDuration');
const dateInput = document.getElementById('exerciseDate');

// Estatísticas
const statTotal = document.getElementById('statTotal');
const statTime = document.getElementById('statTime');
const statAvg = document.getElementById('statAvg');

// ===== ESTADO DA APLICAÇÃO =====
let workouts = [];
let activeFilter = 'todos';
let searchTerm = '';

// Mapa de emojis por tipo de treino
const typeEmojis = {
  cardio: '🏃',
  forca: '💪',
  flexibilidade: '🧘',
  hiit: '🔥'
};

// Mapa de labels por tipo
const typeLabels = {
  cardio: 'Cardio',
  forca: 'Força',
  flexibilidade: 'Flexibilidade',
  hiit: 'HIIT'
};


// ===== INICIALIZAÇÃO =====
function init() {
  loadWorkouts();
  loadTheme();
  setDefaultDate();
  renderWorkouts();
  updateStats();
}


// ===== LOCALSTORAGE =====

/** Carrega os treinos salvos no localStorage */
function loadWorkouts() {
  try {
    const data = localStorage.getItem('treinotracker_workouts');
    workouts = data ? JSON.parse(data) : [];
  } catch (e) {
    workouts = [];
  }
}

/** Salva os treinos no localStorage */
function saveWorkouts() {
  localStorage.setItem('treinotracker_workouts', JSON.stringify(workouts));
}

/** Carrega o tema salvo */
function loadTheme() {
  const dark = localStorage.getItem('treinotracker_dark') === 'true';
  if (dark) {
    document.body.classList.add('dark');
    themeToggle.textContent = '☀️';
  }
}

/** Alterna entre tema claro e escuro */
function toggleTheme() {
  const isDark = document.body.classList.toggle('dark');
  themeToggle.textContent = isDark ? '☀️' : '🌙';
  localStorage.setItem('treinotracker_dark', isDark);
}


// ===== FORMULÁRIO =====

/** Define a data atual como padrão no campo de data */
function setDefaultDate() {
  const today = new Date().toISOString().split('T')[0];
  dateInput.value = today;
}

/** Valida os campos do formulário e retorna true se válido */
function validateForm() {
  let valid = true;
  const fields = [nameInput, typeInput, durationInput, dateInput];

  // Limpa erros anteriores
  fields.forEach(function(field) {
    field.classList.remove('error');
  });

  if (!nameInput.value.trim()) {
    nameInput.classList.add('error');
    valid = false;
  }

  if (!typeInput.value) {
    typeInput.classList.add('error');
    valid = false;
  }

  var duration = parseInt(durationInput.value, 10);
  if (!durationInput.value || isNaN(duration) || duration < 1 || duration > 600) {
    durationInput.classList.add('error');
    valid = false;
  }

  if (!dateInput.value) {
    dateInput.classList.add('error');
    valid = false;
  }

  return valid;
}

/** Cria um novo treino a partir dos dados do formulário */
function addWorkout(event) {
  event.preventDefault();

  if (!validateForm()) {
    showToast('Preencha todos os campos corretamente!', 'danger');
    return;
  }

  var workout = {
    id: Date.now().toString(36) + Math.random().toString(36).substring(2, 7),
    name: nameInput.value.trim(),
    type: typeInput.value,
    duration: parseInt(durationInput.value, 10),
    date: dateInput.value
  };

  workouts.push(workout);
  saveWorkouts();
  renderWorkouts();
  updateStats();
  resetForm();
  showToast('Treino adicionado com sucesso!', 'success');
}

/** Limpa o formulário após adicionar */
function resetForm() {
  nameInput.value = '';
  typeInput.value = '';
  durationInput.value = '';
  setDefaultDate();
  nameInput.focus();
}


// ===== EXCLUSÃO =====

/** Remove um treino pelo ID com animação de saída */
function deleteWorkout(id) {
  var card = document.querySelector('[data-id="' + id + '"]');

  if (card) {
    // Aplica animação de saída
    card.classList.add('workout-card--removing');

    card.addEventListener('animationend', function() {
      workouts = workouts.filter(function(w) { return w.id !== id; });
      saveWorkouts();
      renderWorkouts();
      updateStats();
      showToast('Treino removido.', 'danger');
    });
  }
}


// ===== RENDERIZAÇÃO =====

/** Filtra, ordena e renderiza os cards de treino */
function renderWorkouts() {
  var filtered = getFilteredWorkouts();
  workoutList.innerHTML = '';

  if (filtered.length === 0) {
    emptyState.classList.remove('empty-state--hidden');
  } else {
    emptyState.classList.add('empty-state--hidden');

    filtered.forEach(function(workout) {
      var card = createWorkoutCard(workout);
      workoutList.appendChild(card);
    });
  }
}

/** Retorna os treinos filtrados e ordenados */
function getFilteredWorkouts() {
  var result = workouts.slice(); // cópia

  // Filtro por tipo
  if (activeFilter !== 'todos') {
    result = result.filter(function(w) { return w.type === activeFilter; });
  }

  // Filtro por busca
  if (searchTerm) {
    var term = searchTerm.toLowerCase();
    result = result.filter(function(w) {
      return w.name.toLowerCase().includes(term);
    });
  }

  // Ordenação
  var sortValue = sortSelect.value;

  result.sort(function(a, b) {
    switch (sortValue) {
      case 'date-desc':
        return new Date(b.date) - new Date(a.date);
      case 'date-asc':
        return new Date(a.date) - new Date(b.date);
      case 'duration-desc':
        return b.duration - a.duration;
      case 'duration-asc':
        return a.duration - b.duration;
      default:
        return 0;
    }
  });

  return result;
}

/** Cria o elemento DOM de um card de treino */
function createWorkoutCard(workout) {
  var card = document.createElement('article');
  card.className = 'workout-card';
  card.dataset.type = workout.type;
  card.dataset.id = workout.id;

  var emoji = typeEmojis[workout.type] || '🏋️';
  var label = typeLabels[workout.type] || workout.type;
  var formattedDate = formatDate(workout.date);

  card.innerHTML =
    '<div class="workout-card__header">' +
      '<span class="workout-card__name">' + emoji + ' ' + escapeHTML(workout.name) + '</span>' +
      '<button class="workout-card__delete" title="Excluir treino" aria-label="Excluir treino ' + escapeHTML(workout.name) + '">' +
        '🗑️' +
      '</button>' +
    '</div>' +
    '<span class="workout-card__type">' + label + '</span>' +
    '<div class="workout-card__details">' +
      '<span class="workout-card__duration">⏱️ ' + workout.duration + ' min</span>' +
      '<span class="workout-card__date">📅 ' + formattedDate + '</span>' +
    '</div>';

  // Evento de exclusão no botão
  var deleteBtn = card.querySelector('.workout-card__delete');
  deleteBtn.addEventListener('click', function() {
    deleteWorkout(workout.id);
  });

  return card;
}


// ===== ESTATÍSTICAS =====

/** Atualiza os cards de estatísticas */
function updateStats() {
  var total = workouts.length;
  var totalMinutes = workouts.reduce(function(sum, w) { return sum + w.duration; }, 0);
  var avg = total > 0 ? Math.round(totalMinutes / total) : 0;

  statTotal.textContent = total;
  statTime.textContent = formatTime(totalMinutes);
  statAvg.textContent = avg + ' min';
}

/** Formata minutos em "Xh Ym" ou "X min" */
function formatTime(minutes) {
  if (minutes < 60) return minutes + ' min';
  var h = Math.floor(minutes / 60);
  var m = minutes % 60;
  return h + 'h ' + m + 'min';
}


// ===== FILTROS =====

/** Configura os botões de filtro */
function handleFilterClick(event) {
  var btn = event.target.closest('.filter-btn');
  if (!btn) return;

  // Atualiza estado visual
  document.querySelectorAll('.filter-btn').forEach(function(b) {
    b.classList.remove('filter-btn--active');
  });
  btn.classList.add('filter-btn--active');

  // Atualiza filtro ativo
  activeFilter = btn.dataset.filter;
  renderWorkouts();
}


// ===== BUSCA =====

/** Filtra treinos pelo termo de busca (com debounce) */
var searchTimeout = null;

function handleSearch() {
  clearTimeout(searchTimeout);
  searchTimeout = setTimeout(function() {
    searchTerm = searchInput.value.trim();
    renderWorkouts();
  }, 300);
}


// ===== UTILITÁRIOS =====

/** Formata data de YYYY-MM-DD para DD/MM/YYYY */
function formatDate(dateStr) {
  var parts = dateStr.split('-');
  return parts[2] + '/' + parts[1] + '/' + parts[0];
}

/** Escapa HTML para prevenir XSS */
function escapeHTML(str) {
  var div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}

/** Mostra uma notificação toast */
function showToast(message, type) {
  toastEl.textContent = message;
  toastEl.className = 'toast toast--' + type + ' toast--visible';

  setTimeout(function() {
    toastEl.classList.remove('toast--visible');
  }, 2500);
}


// ===== EVENT LISTENERS =====

// Envio do formulário
workoutForm.addEventListener('submit', addWorkout);

// Botões de filtro (delegação de evento)
document.querySelector('.filters__group').addEventListener('click', handleFilterClick);

// Ordenação
sortSelect.addEventListener('change', renderWorkouts);

// Busca
searchInput.addEventListener('input', handleSearch);

// Tema escuro
themeToggle.addEventListener('click', toggleTheme);

// Remove classe de erro ao digitar/selecionar
[nameInput, typeInput, durationInput, dateInput].forEach(function(field) {
  field.addEventListener('input', function() {
    field.classList.remove('error');
  });
});


// ===== INICIAR APP =====
init();
