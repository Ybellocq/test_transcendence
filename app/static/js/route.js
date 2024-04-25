function extractViewContent(html) {
    const tempElement = document.createElement('div');
    tempElement.innerHTML = html;
    const viewContent = tempElement.querySelector('#content').innerHTML;
    return viewContent;
}

function loadView(url, addHistory) {
    // Récupération du contenu des vues à partir du serveur Django
    fetch(url)
        .then(response => response.text())
        .then(html => {
            // Mise à jour de l'URL et de l'historique de navigation si nécessaire
            if (addHistory) {
                history.pushState(null, null, url);
            }

            // Mise à jour du contenu de la page avec le contenu de la vue récupéré
            document.querySelector('#content').innerHTML = extractViewContent(html);

            // Attachement des écouteurs d'événements spécifiques à la vue chargée
            attachEventListeners();

            // Optionnel : Mise en place des actions spécifiques en fonction de l'URL chargée
            setupActionsForURL(url);
        })
        .catch(error => {
            console.error('Erreur lors du chargement de la vue:', error);
        });
}

function attachEventListeners() {
    const navLinks = document.querySelectorAll('.redir');

    function attachClickEvent(link) {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            const url = link.getAttribute('href');
            loadView(url, true);
        });
    }

    navLinks.forEach(link => {
        if (!link.hasAttribute('data-click-event-attached')) {
            attachClickEvent(link);
            link.setAttribute('data-click-event-attached', true);
        }
    });
}

function setupActionsForURL(url) {
    if (url === '/index/') {
        setupIndex();
    } else if (url === '/friends/') {
        setupFriends();
    } else if (url === '/gamepage/') {
        setupGamepage();
    } else if (url === '/ia/') {
        setupIa();
    } else if (url === '/register/') {
        setupRegister();
    } else if (url === '/profile/') {
        setupProfile();
    } else if (url === '/tournaments/') {
        setupTournaments();
    } else if (url === '/tournaments_overview/') {
        setupTournamentsOverview();
    } else if (url === '/welcome/') {
        setupWelcome();
    } else if (url === '/settings/') {
        setupSettings();
    }
}