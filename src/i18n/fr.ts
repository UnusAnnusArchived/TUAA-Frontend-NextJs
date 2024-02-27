// French
const fr = {
  language: {
    name: "Français",
    code: "fr", // ISO 639-1
  },
  pages: {
    site: "Les archives de l'Unus Annus",
    site_short: "TUAA",
    not_found: "Non trouvé",
    about: "À propos de",
    home: "Accueil",
    login: "Connexion",
    register: "Registre",
    oauth2: "Rediriger...",
    patreon_donors: "Donateurs Patreon",
    profile: "Profil",
    settings: "Paramètres",
    downloads: "Téléchargements",
    download_specific_episode: "Télécharger l'épisode spécifique",
    download_episode: "Télécharger {name}",
    translate_tuaa: "Traduire TUAA",
  },
  common: {
    cancel: "Annuler",
    close: "Fermer",
    copy: "Copie",
    save: "Sauvez",
    copied_toast: "Texte copié dans le presse-papiers",
    search: "Recherche",
    account: {
      email: "Courriel",
      name: "Nom",
      username: "Nom d'utilisateur",
      password: "Mot de passe",
      confirm_password: "Confirmer le mot de passe",
    },
  },
  menu: {
    language: "Langue",
    discord: "Discord",
    github: "GitHub",
    patreon: "Patreon",
  },
  about: {
    build_number: "Build {number} ({date})",
  },
  login: {
    header: "Connectez-vous à votre compte",
    loading: "Chargement des méthodes d'authentification...",
    email_password: "Courriel et mot de passe",
    username_password: "Nom d'utilisateur et mot de passe",
    password_auth_disabled: "Authentification par mot de passe désactivée!",
    login_with: "Se connecter avec {provider}",
    logins_disabled:
      "Malheureusement, les connexions ont été désactivées. Cette désactivation est probablement temporaire en raison d'un problème. Veuillez visiter {link} pour plus d'informations.",
    logins_disabled_link_text: "notre Discord",
    password_auth_dialog: {
      username_or_email: "Nom d'utilisateur ou courriel",
      password: "Mot de passe",
      action: "Connexion",
    },
  },
  register: {
    header: "Enregistrer un nouveau compte",
    submit: "Registre",
  },
  oauth2: {
    state_param_error: "Les paramètres d'état ne correspondent pas! Veuillez réessayer.",
    generic_error:
      "Erreur de connexion ! C'est probablement parce que vous n'avez pas de compte chez nous. Veuillez en créer un et lier votre compte {provider}.",
  },
  patreon_donors: {
    pfp_alt: "Photo du profil Patreon de {name}",
    since: "Depuis {time}",
    info: {
      description: "Vous voulez que votre nom soit mentionné ici?",
      action: "Abonnez-vous à",
    },
  },
  profile: {
    verify: {
      header: "Vérifier le profil",
      action: "Renvoyer le courriel de vérification",
      action_disabled: "Courriel envoyé",
    },
    pfp: {
      header: "Votre photo de profil",
      change: {
        header: "Modifier l'image du profil",
        description: "Télécharger une nouvelle photo de profil",
        selected_file: {
          description: "Fichier actuellement sélectionné",
          none: "aucun",
        },
        select: "Choisir le fichier image",
        error: "Une erreur s'est produite lors de la modification de votre photo de profil!",
        success: "La photo du profil a changé!",
      },
    },
    data: {
      header: "Données détenues sur votre profil",
      email_not_verified: "(Non vérifié)",
      user_id: "ID utilisateur",
      created: "Créé",
      admin_account: "Compte Admin",
      json_info: {
        action: "Afficher les données brutes du profil",
        header: "Données brutes du profil",
      },
    },
    email_prefs: {
      header: "Préférences d'e-mail",
      account_updates: "Mises à jour des comptes",
      website_updates: "Mises à jour du site web",
    },
    reset: {
      header: "Réinitialiser",
      email: {
        action: "Envoyer un courriel de réinitialisation",
        disabled: "Envoyé l'email de réinitialisation",
        dialog: {
          header: "Mise à jour de l'e-mail",
          label: "Nouvelle adresse e-mail",
          send: "Envoyer la confirmation",
        },
      },
      password: {
        action: "Envoyer la réinitialisation du mot de passe",
        disabled: "Réinitialisation du mot de passe envoyée",
      },
    },
    logout: {
      action: "Déconnexion",
      success: "Vous avez été déconnecté de cet appareil",
    },
    delete: {
      action: "Supprimer le compte",
      dialog: {
        header: "Supprimer le compte?",
        description:
          "Êtes-vous sûr de vouloir supprimer définitivement votre compte ? Cela supprimera tous vos commentaires et ne pourra pas être annulé ! Pour continuer, veuillez entrer votre mot de passe ci-dessous.",
        invalid_password: "Mot de passe invalide!",
      },
      success: "Vous avez réussi à supprimer votre compte et toutes les informations associées.",
    },
  },
  settings: {
    account_settings: {
      description: "Vous cherchez les paramètres du compte ? Ils se trouvent sur la {link}.",
      link_text: "page du profil",
    },
    color_scheme: {
      label: "Schéma de couleurs",
      dark: "Mode foncé",
      light: "Mode d'éclairage",
    },
    autoplay: "Jeu automatique",
  },
  downloads: {
    link_image_alt: "Image de {downloadName}",
    specific_episode_link: {
      name: "Télécharger l'épisode spécifique",
      description: "Télécharger un épisode spécifique sans l'aide d'un programme",
    },
    tuaa_downloader_link: {
      name: "Le téléchargeur Unus Annus",
      description: "Un moyen facile de télécharger en masse n'importe lequel de nos épisodes",
    },
    tuaa_node_api_link: {
      name: "L'API Node.JS de l'archive Unus Annus",
      description: "Un moyen facile de communiquer avec notre API en Node.JS",
    },
    specific_episodes_list: {
      header: "Sélectionnez un épisode à télécharger",
    },
    specific_episode_page: {
      header: "Options de téléchargement",
      options: {
        video: "Télécharger la vidéo",
        subtitles: "Télécharger les sous-titres",
        thumbnail: "Télécharger la vignette",
        description: "Télécharger la description",
        metadata: "Télécharger les métadonnées",
      },
      video: {
        header: "Télécharger la vidéo",
        resolution_selector: "Sélectionnez la résolution",
      },
      subtitles: {
        header: "Télécharger les sous-titres",
        language_selector: "Sélectionner la langue",
      },
      download_action: "Télécharger",
    },
  },
  seasons: {
    season0: "Spéciaux",
    season1: "Saison 1",
  },
  comments: {
    header: "Commentaires",
    sort: {
      label: "Trier par",
      newest: "le plus récent",
      oldest: "le plus ancien",
      rating: "classement",
    },
    add_comment: {
      placeholder: "Ajouter un commentaire public",
      logged_out: "Veuillez vous connecter pour commenter cette vidéo",
      action: "Commentaire",
    },
    comment: {
      edited: "(édité)",
    },
    actions: {
      edit: {
        action: "Modifier",
        dialog: {
          header: "Modifier le commentaire",
          label: "Commentaire",
        },
      },
      delete: {
        action: "Supprimer",
        dialog: {
          header: "Êtes-vous sûr de vouloir supprimer votre commentaire?",
          description:
            "Êtes-vous sûr de vouloir supprimer définitivement votre commentaire? Cela ne peut pas être défait!",
          action: "Supprimer",
        },
      },
    },
    errors: {
      generic: "Le chargement des commentaires a échoué",
      no_comments: "Aucun commentaire trouvé. Et si vous lanciez la conversation?",
    },
  },
  patreon_popup: {
    header: "Les serveurs coûtent cher!",
    description:
      "Voulez-vous faire un don à notre Patreon pour nous soutenir ? Tout l'argent servira à améliorer le site.",
    positive_action: "Oui",
    negative_action: "Non",
    negative_action_toast: "D'accord, on ne vous montrera plus ça.",
  },
  player: {
    episode: "Episode",
    previous_episode: "Episode précédent",
    next_episode: "Prochain épisode",
    restart: "Revoir",
    rewind: "Rembobinage de {seektime}s",
    play: "Lire",
    pause: "Pause",
    fastForward: "Avance de {seektime}s",
    seek: "Cherchez",
    seekLabel: "{currentTime} de {duration}",
    played: "Joué à",
    buffered: "Tampon",
    currentTime: "Heure actuelle",
    duration: "Durée",
    volume: "Volume",
    mute: "Désactiver le son",
    unmute: "Activer le son",
    enableCaptions: "Activer les sous-titres",
    disableCaptions: "Désactiver les sous-titres",
    download: "Télécharger",
    enterFullscreen: "Plein écran",
    exitFullscreen: "Quitter le mode plein écran",
    frameTitle: "Lecteur pour {title}",
    captions: "Sous-titres",
    settings: "Paramétres",
    pip: "PIP",
    menuBack: "Retourner au menu précédent",
    speed: "Vitesse de lecture",
    normal: "Normale",
    quality: "Qualité",
    loop: "Lire en boucle",
    start: "Début",
    end: "Fin",
    all: "Tous",
    reset: "Réinitialiser",
    disabled: "Désactivé",
    enabled: "Activé",
    advertisement: "Publicité",
    quality_badges: {
      2160: "4K",
      1440: "UHD",
      1080: "FHD",
      720: "HD",
      480: "SD",
      360: "SD",
      240: "SD",
      144: "SD",
    },
  },
  errors: {
    not_found: "La page que vous recherchez n'a pas été trouvée",
    return_to_home: "Retour à l'accueil",
  },
};

export default fr;
