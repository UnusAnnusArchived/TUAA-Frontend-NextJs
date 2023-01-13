const cs = {
  language: {
    name: "Čeština",
    code: "cs",
  },
  pages: {
    site: "Unus Annus Archiv",
    site_short: "UAA",
    not_found: "Nenalezeno",
    about: "O",
    home: "Domov",
    login: "Přihlásit se",
    register: "Registrovat se",
    oauth2: "Přesměrování...",
    patreon_donors: "Dárci na Patreonu",
    profile: "Profil",
    settings: "Nastavení",
    downloads: "Stažení",
    download_specific_episode: "Stažení Specifické Epizody",
    download_episode: "Stažení {name}",
    translate_tuaa: "Překlad UAA",
  },
  common: {
    cancel: "Zrušit",
    close: "Zavřít",
    copy: "Kopírovat",
    save: "Uložit",
    copied_toast: "Zkopírovaný text do schránky",
    search: "Vyhledat",
    episode: "Epizoda",
    random_episode: "Náhodná Epizoda",
    account: {
      email: "Email",
      name: "Jméno",
      username: "Uživatelské jméno",
      password: "Heslo",
      confirm_password: "Potvrzení hesla",
    },
  },
  menu: {
    language: "Jazyk",
    discord: "Discord",
    github: "GitHub",
    patreon: "Patreon",
  },
  about: {
    build_number: "Build {number} ({date})",
  },
  login: {
    header: "Přihlásit se do svého účtu",
    loading: "Načítání metod ověřování...",
    email_password: "Email a Heslo",
    username_password: "Uživatelské jméno a Heslo",
    password_auth_disabled: "Ověřování hesla zakázáno!",
    login_with: "Přihlásit se přes {provider}",
    logins_disabled:
      "Bohužel přihlášení bylo zakázáno. Toto je pravděpodobně dočasné kvůli problému. Prosím navštivte {link} pro více informací.",
    logins_disabled_link_text: "náš Discord",
    password_auth_dialog: {
      username_or_email: "Uživatelské jméno nebo Email",
      password: "Heslo",
      action: "Přihlásit se",
    },
  },
  register: {
    header: "Registrovat nový účet",
    submit: "Registrovat",
  },
  oauth2: {
    state_param_error: "Parametry stavu se neshodují! Prosím zkuste to znovu.",
    generic_error:
      "Chyba při přihlašování! Je to pravděpodobně proto, že u nás nemáte účet. Vytvořte si ho a propojte svůj {provider} účet.",
  },
  patreon_donors: {
    pfp_alt: "{name}'s Patreon Profilová Fotka",
    since: "Od {time}",
    info: {
      description: "Chceš zde vidět své jméno?",
      action: "Odebírej",
    },
  },
  profile: {
    verify: {
      header: "Ověřit Profil",
      action: "Poslat znovu ověřovací Email",
      action_disabled: "Poslat",
    },
    pfp: {
      header: "Tvá Profilová Fotka",
      change: {
        header: "Změnit Profilovou Fotku",
        description: "Nahrajte novou profilovou fotku.",
        selected_file: {
          description: "Aktuálně vybraný soubor",
          none: "žádný",
        },
        select: "Vyberte soubor fotky",
        error: "Při změně vaší profilové fotky došlo k chybě!",
        success: "Profilová fotka změněna!",
      },
    },
    data: {
      header: "Údaje o vašem profilu uchovávané",
      email_not_verified: "(Neověřeno)",
      user_id: "Uživatelovo ID",
      created: "Vytvořeno",
      admin_account: "Účet správce",
      json_info: {
        action: "Zobrazit nezpracovaná data profilu",
        header: "Nezpracovaná data profilu",
      },
    },
    email_prefs: {
      header: "Email Předvolby",
      account_updates: "Aktualizace účtu",
      website_updates: "Aktualizace webových stránek",
    },
    reset: {
      header: "Restartovat",
      email: {
        action: "Odeslat reset Emailu",
        disabled: "Odeslaný reset Emailu",
        dialog: {
          header: "Aktualizovat Email",
          label: "Nový Email",
          send: "Poslat Ověření",
        },
      },
      password: {
        action: "Odeslat reset Hesla",
        disabled: "Odeslaný reset Hesla",
      },
    },
    logout: {
      action: "Odhlásit se",
      success: "Byl jsi odhlášen z tohoto zařízení",
    },
    delete: {
      action: "Vymazat Účet",
      dialog: {
        header: "Vymazat účet?",
        description:
          "Opravdu chcete trvale smazat svůj účet? Touto akcí smažete všechny vaše komentáře a nelze ji vrátit zpět! Chcete-li pokračovat, zadejte níže své heslo.",
        invalid_password: "Neplatné Heslo!",
      },
      success: "Váš účet a všechny související informace byly úspěšně smazány.",
    },
  },
  settings: {
    account_settings: {
      description: "Hledáte nastavení účtu? Jsou na {link}.",
      link_text: "Profilová stránka",
    },
    color_scheme: {
      label: "Barevné Schéma",
      dark: "Tmavý Mód",
      light: "Světlý Móď",
    },
    autoplay: "Automatické přehrávání",
  },
  downloads: {
    link_image_alt: "Fotka {downloadName}",
    specific_episode_link: {
      name: "Stáhnout Specifickou Epizodu",
      description: "Stáhnout Specifickou Epizodu bez Použití Programu",
    },
    tuaa_downloader_link: {
      name: "Unus Annus Stahovač",
      description: "Snadný způsob, jak hromadně stáhnout kteroukoli z našich epizod",
    },
    tuaa_node_api_link: {
      name: "Unus Annus Archiv Node.JS API",
      description: "Snadný způsob, jak komunikovat s naším API v Node.JS",
    },
    specific_episodes_list: {
      header: "Vyberte epizodu ke stažení",
    },
    specific_episode_page: {
      header: "Nastavení stažení",
      options: {
        video: "Video",
        subtitles: "Titulky",
        thumbnail: "Náhledový obrázek",
        description: "Popisek",
        metadata: "Metadata",
      },
      video: {
        header: "Video",
        resolution_selector: "Rozlišení",
      },
      subtitles: {
        header: "Titulky",
        language_selector: "Jazyk",
      },
      download_action: "Stažení",
    },
  },
  seasons: {
    season0: "Speciály",
    season1: "1. Série",
  },
  comments: {
    header: "Komentáře",
    sort: {
      label: "Seřadit podle",
      newest: "Nejnovější",
      oldest: "Nejstarší",
      rating: "Hodnocení",
    },
    add_comment: {
      placeholder: "Přidat veřejný koment",
      logged_out: "Prosím přihlašte se aby jste mohli komentovat pod toto video",
      action: "Okomentuj",
    },
    comment: {
      edited: "(upraveno)",
    },
    actions: {
      edit: {
        action: "Upravit",
        dialog: {
          header: "Upravit Komentář",
          label: "Okomentuj",
        },
      },
      delete: {
        action: "Vymazat",
        dialog: {
          header: "Jsi si jistý že chceš vymazat komentář?",
          description: "Opravdu chcete trvale smazat svůj komentář? Toto nelze vrátit zpět!",
          action: "Smazat",
        },
      },
    },
    errors: {
      generic: "Komentáře se nepodařilo načíst",
      no_comments: "Nebyly nalezeny žádné komentáře. Co kdybys zahájil konverzaci?",
    },
  },
  patreon_popup: {
    header: "Servery stojí peníze!",
    description: "Chtěli byste přispět na náš Patreon, abyste nás podpořili? Všechny peníze půjdou na vylepšení webu.",
    positive_action: "Ano",
    negative_action: "Ne",
    negative_action_toast: "Dobře, už vám to neukážeme.",
  },
  player: {
    controls: {
      previous_episode: "Předešlá Epizoda",
      play: "Spustit",
      pause: "Zastavit",
      next_episode: "Další Epizoda",
      mute: "Ztlumit",
      unmute: "Odtlumit",
      enable_captions: "Titulky",
      disable_captions: "Vypnout Titulky",
      settings: "Nastavení",
      download: "Stažení",
      enter_fullscreen: "Celá Obrazovka",
      exit_fullscreen: "Ukončit Celou Obrazovku",
    },
    settings: {
      speed: {
        header: "Rychlost",
        "25": "0.25x",
        "50": "0.5x",
        "75": "0.75x",
        "100": "Normální",
        "125": "1.25x",
        "150": "1.5x",
        "175": "1.75x",
        "200": "2x",
        "400": "4x",
      },
      source: {
        header: "Zdroj",
      },
      captions: {
        header: "Titulky",
        external_source: "Titulky nemusí mít přesné načasování s externím zdrojem",
        disabled: "Zakázáno",
      },
      audio_track: {
        header: "Zvuková Stopa",
        external_source: "Vlastní zvuk nemusí mít přesné načasování s externím zdrojem",
        original: "Originál",
      },
      resolution: {
        header: "Rozlišení",
      },
      disable_controls: {
        header: "Deaktivace ovládacích prvků",
        blurb:
          "Deaktivace ovládacích prvků vám umožní přístup k vnitřním ovládacím prvkům vložení. Tento krok nelze vrátit zpět a bude vyžadovat opětovné načtení stránky, aby bylo možné znovu získat přístup k ovládacím prvkům našeho přehrávače.",
      },
    },
  },
  errors: {
    not_found: "Stránka, kterou jste hledali, nebyla nalezena",
    return_to_home: "Vrátit se domů",
  },
};

export default cs;
