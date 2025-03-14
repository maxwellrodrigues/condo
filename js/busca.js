//|******************************************************************************************************|
//| Arquivo responsável por realizar busca por palavras na aplicação.                                    |
//|******************************************************************************************************|

//----Esse JS realiza a função da área de buscas



// Função de busca na parte de Upcoming Events
document.addEventListener('DOMContentLoaded', function () {
  const searchInput = document.getElementById('searchInput');
  const searchIcon = document.getElementById('searchIcon');
  const eventCards = document.querySelectorAll('.event-card');

  function performSearch() {
    const filter = searchInput.value.toLowerCase().trim();

    eventCards.forEach(card => {
      const eventName = card.querySelector('.event-content h2').textContent.toLowerCase();

      if (filter === '' || eventName.includes(filter)) {
        card.style.display = '';
      } else {
        card.style.display = 'none';
      }
    });
  }

  // Event listener for click on search icon
  searchIcon.addEventListener('click', function (event) {
    event.preventDefault(); // Prevents the form from submitting (if used inside a form)
    performSearch(); // Calls the search function
  });

  // Event listener for pressing Enter key
  searchInput.addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
      event.preventDefault(); // Prevents the form from submitting (if used inside a form)
      performSearch(); // Calls the search function
    }
  });

  // Function to clear search when input is empty
  searchInput.addEventListener('input', function () {
    if (searchInput.value.trim() === '') {
      eventCards.forEach(card => {
        card.style.display = ''; // Show all cards
      });
    }
  });
});
