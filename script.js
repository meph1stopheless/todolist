// 📌 Получаем элементы DOM
const addBtn = document.querySelector('.addNote');
const notes = document.querySelector('.notes__list');
const modal = document.querySelector('.modal');
const modalBlock = document.querySelector('.modal__block');
const addNote = document.querySelector('.edit');
const close = document.querySelector('.del');
const changeGrid = document.querySelector('.notes__btn');
const span = document.querySelector('.notes__btn span');

const titleInput = document.querySelector('input');
const textInput = document.querySelector('.text');



// 📌 Загружаем заметки из localStorage или создаём пустой массив
let allInfo = JSON.parse(localStorage.getItem('notes')) || [];

// 📌 Функция сохранения и перерисовки заметок
const updateNotes = () => {
  localStorage.setItem('notes', JSON.stringify(allInfo));
  renderNotes();
};

// 📌 Функция удаления заметки
const deleteNote = (id) => {

  allInfo = allInfo.filter(note => note.id !== id);
  
  updateNotes();
};

// 📌 Функция создания HTML-элемента заметки
const createElement = ({ id, title, date, text }) => {
  const item = document.createElement('div');
  item.classList.add('notes__item');
  item.innerHTML = `
    <div class="notes__item_top">
       <h2 class="notes__item_top-title">${title}</h2>
       <p class="notes__item_top-date">${date}</p>
    </div>
    <p class="notes__item_text">${text}</p>
    <button class="notes__item-btn"><span>X</span></button>
  `;

  // 📌 Обработчик удаления
  item.querySelector('.notes__item-btn').addEventListener('click', () => deleteNote(id));
  return item;
};

// 📌 Функция рендеринга всех заметок
const renderNotes = () => {
  notes.innerHTML = ''; // Очищаем список
  allInfo.forEach(note => notes.appendChild(createElement(note)));
};

// 📌 Функция очистки инпутов
const clearInputs = () => {
  titleInput.value = '';
  textInput.value = '';
};

// 📌 Функция закрытия модального окна
const closeModal = () => {
  modal.classList.remove('active');
  addBtn.blur();
  clearInputs();
};

// 📌 Функция добавления новой заметки
const addNewNote = () => {

  const title = titleInput.value.trim();
  const text = textInput.value.trim();

  if (!title || !text) return;

  allInfo.push({
    id: crypto.randomUUID(),
    title,
    text,
    date: new Date().toLocaleDateString(),
  });

  updateNotes();
  closeModal();
};

// 📌 Обработчики событий
close.addEventListener('click', closeModal);

addBtn.addEventListener('click', () => {
  if (modal.classList.contains('active')) {
    closeModal(); // Закрыть модалку, если она уже открыта
  } else {
    modal.classList.add('active'); // Открыть модалку, если она закрыта
  }
});
addNote.addEventListener('click', addNewNote);

modal.addEventListener('click', closeModal);

modalBlock.addEventListener('click', (e) => e.stopPropagation());

/* changeGrid.addEventListener('click', () => {
  notes.classList.toggle('between')
  span.innerHTML == 'Список' ? span.innerHTML = 'Сетка' : span.innerHTML = 'Список'
})  */

  changeGrid.addEventListener('click', () => {
    notes.classList.toggle('between');
    span.innerHTML = notes.classList.contains('between') ? 'Сетка' : 'Список';
  });

  addBtn.addEventListener('click', () => {
    modal.classList.add('active');
    titleInput.focus(); // Устанавливаем фокус в поле ввода названия
  });



// 📌 Загружаем заметки при запуске

renderNotes();
