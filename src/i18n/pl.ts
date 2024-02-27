const pl = {
  language: {
    name: "Polskie",
    code: "pl",
  },
  pages: {
    site: "The Unus Annus Archive",
    site_short: "TUAA",
    not_found: "Nie Znaleziono",
    about: "Info",
    home: "Strona Główna",
    login: "Zaloguj się",
    register: "Zarejestruj się",
    oauth2: "Przekierowywanie...",
    patreon_donors: "Darczyńcy na Patreonie",
    profile: "Profil",
    settings: "Ustawienia",
    downloads: "Pobieranie",
    download_specific_episode: "Pobierz Konkretny Odcinek",
    download_episode: "Pobierz {name}", // For example: "Download Cooking with Sex Toys"
    translate_tuaa: "Przetłumacz TUAA",
  },
  common: {
    cancel: "Anuluj",
    close: "Zamknij",
    copy: "Kopiuj",
    save: "Zapisz",
    copied_toast: "Skopiowano tekst to schowka",
    search: "Szukaj",
    account: {
      email: "Email",
      name: "Imie",
      username: "Nazwa Użytkownika",
      password: "Hasło",
      confirm_password: "Potwierdź hasło",
    },
  },
  menu: {
    language: "Język",
    // You don't have to change these since they're just names
    discord: "Discord",
    github: "GitHub",
    patreon: "Patreon",
  },
  about: {
    build_number: "Wersja {number} ({date})", // For example: "Build 16 (11/21/2022 9:07:58 PM)"
  },
  login: {
    header: "Zaloguj się do Konta",
    loading: "Wczytywanie Metod Uwierzytelnienia...",
    email_password: "Email i Hasło",
    username_password: "Nazwa Użytkownika i Hasło",
    password_auth_disabled: "Uwierzytelnianie Hasłem Wyłączone!",
    login_with: "Zaloguj się przez {provider}", // For example: "Login with Google"
    logins_disabled:
      "Niestety logowanie się zostało wyłączone. Jest to najprawdopodobniej tymczasowe, spowodowane problemem. Prosimy odwiedzić {link} po więcej informacji.",
    logins_disabled_link_text: "nasz Discord", // Text for the link in the translation above
    password_auth_dialog: {
      username_or_email: "Nazwa Użytkownika lub Email",
      password: "Hasło",
      action: "Zaloguj",
    },
  },
  register: {
    header: "Zarejestruj nowe konto",
    submit: "Zarejestruj",
  },
  oauth2: {
    state_param_error: "Kod weryfikacyjny nie zgodny! Prosimy spróbować ponownie.",
    generic_error:
      "Wystąpił błąd podczas logowania! Jest to najprawdopodobniej spowodowane brakiem konta u nas. Stwórz u nas konto i połącz konto {provider}.", // For example: "Please create one and link your Google account."
  },
  patreon_donors: {
    pfp_alt: "Zdjęcie Profilowe Patreona Użytkownika: {name}", // For example: "John's Patreon Profile Picture"
    since: "Od {time}", // For example: "Since 2 months ago"
    info: {
      description: "Chcesz zobaczyć tutaj swoje imie?",
      action: "Zasubskrybuj",
    },
  },
  profile: {
    verify: {
      header: "Zweryfikuj Profil",
      action: "Wyślij Ponownie Email Weryfikacyjny",
      action_disabled: "Wysłano",
    },
    pfp: {
      header: "Twoja Zdjęcie Profilowe",
      change: {
        header: "Zmień Zdjęcie Profilowe",
        description: "Prześlij nowe zdjęcie profilowe.",
        selected_file: {
          description: "Aktualnie wybrany plik",
          none: "żaden",
        },
        select: "Wybierz plik zdjęcia",
        error: "Wytąpił problem ze zmianą twojego zdjęcia profilowego!",
        success: "Zdjęcie profilowe zostało zmienione!",
      },
    },
    data: {
      header: "Trzymane dane o twoim profilu",
      email_not_verified: "(Nie Zweryfikowany)",
      user_id: "ID Użytkownika",
      created: "Utworzono",
      admin_account: "Konto Administratora",
      json_info: {
        action: "Pokaż Surowe Dane Profilu",
        header: "Surowe Dane Profilu",
      },
    },
    email_prefs: {
      header: "Preferencje Email",
      account_updates: "Aktualizacje Konta",
      website_updates: "Aktualizacje Strony",
    },
    reset: {
      header: "Resetuj",
      email: {
        action: "Wyślij Reset Emaila",
        disabled: "Wysłano Reset Emaila",
        dialog: {
          header: "Aktualizuj Email",
          label: "Nowy Email",
          send: "Wyślij email potwierdzający",
        },
      },
      password: {
        action: "Wyślij Reset Hasła",
        disabled: "Wysłano Reset Hasła",
      },
    },
    logout: {
      action: "Wyloguj",
      success: "Zostałeś/aś wylogowany/a z tego urządzenia",
    },
    delete: {
      action: "Usuń Konto",
      dialog: {
        header: "Usunąć Konto?",
        description:
          "Czy jesteś pewny/a, że chcesz permanentnie usunąć swoje konto? Usunie to wszystkie twoje komentarze i nie będzie mogło zostać cofnięte! By kontynuować, wpisz poniżej swoje hasło.",
        invalid_password: "Nieprawidłowe Hasło!",
      },
      success: "Pomyślnie usunięto twoje konto i wszystkie powiązane z nim informacje.",
    },
  },
  settings: {
    account_settings: {
      description: "Szukasz ustawień konta? Znajdziesz je na {link}.",
      link_text: "Stronie Profilowej", // Text for the link in the translation above
    },
    color_scheme: {
      label: "Motyw Kolorów",
      dark: "Ciemny",
      light: "Jasny",
    },
    autoplay: "Automatyczne odtwarzanie",
  },
  downloads: {
    link_image_alt: "Obraz: {downloadName}", // For example: "Image of The Unus Annus Downloader"
    specific_episode_link: {
      name: "Pobierz Konkretny Odcinek",
      description: "Pobierz konkretny odcinek bez aplikacji",
    },
    tuaa_downloader_link: {
      name: "The Unus Annus Downloader",
      description: "Prosty sposób na masowe pobieranie odcinków",
    },
    tuaa_node_api_link: {
      name: "Node.JS API The Unus Annus Archive",
      description: "Prosty sposób na komunikowanie się z naszym API w Node.JS",
    },
    specific_episodes_list: {
      header: "Wybierz odcinek do pobrania",
    },
    specific_episode_page: {
      header: "Opcje Pobierania",
      options: {
        video: "Wideo",
        subtitles: "Napisy",
        thumbnail: "Miniaturka",
        description: "Opis",
        metadata: "Metadane",
      },
      video: {
        header: "Wideo",
        resolution_selector: "Rozdzielczość",
      },
      subtitles: {
        header: "Napisy",
        language_selector: "Język",
      },
      download_action: "Pobierz",
    },
  },
  seasons: {
    season0: "Odcinki Specjalne",
    season1: "Sezon 1",
  },
  comments: {
    header: "Komentarze",
    sort: {
      label: "Sortuj",
      newest: "Najnowsze",
      oldest: "Najstarsze",
      rating: "Ocena",
    },
    add_comment: {
      placeholder: "Dodaj publiczny komentarz",
      logged_out: "Zaloguj się, by dodać komentarz",
      action: "Zakomentuj",
    },
    comment: {
      edited: "(edytowany)",
    },
    actions: {
      edit: {
        action: "Edytuj",
        dialog: {
          header: "Edytuj Komentarz",
          label: "Zakomentuj",
        },
      },
      delete: {
        action: "Usuń",
        dialog: {
          header: "Czy jesteś pewny/a, że chcesz usunąć swój komentarz?",
          description: "Czy jesteś pewny/a, że chcesz permanentnie usunąć swój komentarz? Nie możnq cofnąć tej akcji!",
          action: "Usuń",
        },
      },
    },
    errors: {
      generic: "Komentarze nie mogły zostać wczytane",
      no_comments: "Nie znaleziono komentarzy. Może rozpoczniesz konwersację?",
    },
  },
  patreon_popup: {
    header: "Serwery kosztują pieniądze!",
    description:
      "Chciałbyś wpłacić darowiznę na naszego Patreona by nas wesprzeć? Całe pieniądze zostaną zainwestowane w poprawę strony.",
    positive_action: "Tak",
    negative_action: "Nie",
    negative_action_toast: "Dobra, nie pokarzemy ci tego ponownie.",
  },
  player: {
    episode: "Odcinek",
    previous_episode: "Poprzedni Odcinek",
    next_episode: "Następny Odcinek",
    restart: "Odtwórz Ponownie",
    rewind: "Cofnij {seektime}s", // For example: "Rewind 5s"
    play: "Odtwórz",
    pause: "Pauza",
    fastForward: "Przewiń {seektime}s", // For example: "Forward 5s"
    seek: "Seek",
    seekLabel: "{currentTime} z {duration}", // For example: "5:10 of 10:05"
    played: "Odtworzone",
    buffered: "Zbuforowne",
    currentTime: "Obecny Czas",
    duration: "Długość",
    volume: "Głośność",
    mute: "Wycisz",
    unmute: "Wyłącz Wyciszenie",
    enableCaptions: "Włącz napisy",
    disableCaptions: "Wyłącz napisy",
    download: "Pobierz",
    enterFullscreen: "Włącz Pełny Ekran",
    exitFullscreen: "Wyłącz Pełny Ekran",
    frameTitle: "Odtwarzacz {title}", // For example: "Player for Cooking with Sex Toys"
    captions: "Napisy",
    settings: "Ustawnienia",
    pip: "PIP",
    menuBack: "Wróć do poprzedniego menu",
    speed: "Prędkość",
    normal: "Normalna",
    quality: "Jakość",
    loop: "Zapętl",
    start: "Początek",
    end: "Koniec",
    all: "Wszystkie",
    reset: "Resetuj",
    disabled: "Wyłączony",
    enabled: "Włączony",
    advertisement: "Reklama",
    quality_badges: {
      // You don't have to change these
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
    not_found: "Strona, której szukałeś/aś nie została znaleziona",
    return_to_home: "Wróc na Stronę Główną",
  },
};

export default pl;
