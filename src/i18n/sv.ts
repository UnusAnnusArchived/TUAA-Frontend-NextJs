// Swedish
const sv = {
  language: {
    name: "Svenska",
    code: "sv",
  },
  pages: {
    site: "Unus Annus-arkivet",
    site_short: "TUAA",
    not_found: "Sidan hittades inte",
    about: "Om",
    home: "Hem",
    login: "Inloggning",
    register: "Registrera",
    oauth2: "Omdirigering...",
    patreon_donors: "Patreon-donatorer",
    profile: "Profil",
    settings: "Inställningar",
    downloads: "Nedladdningar",
    download_specific_episode: "Ladda ner specifika avsnitt",
    download_episode: "Ladda ner {name}",
    translate_tuaa: "Översätt TUAA",
  },
  common: {
    cancel: "Avbryt",
    close: "Stäng",
    copy: "Kopiera",
    save: "Spara",
    copied_toast: "Kopierad text till urklipp",
    search: "Sök",
    account: {
      email: "E-post",
      name: "Namn",
      username: "Användarnamn",
      password: "Lösenord",
      confirm_password: "Bekräfta lösenordet",
    },
  },
  menu: {
    language: "Språk",
    discord: "Discord",
    github: "GitHub",
    patreon: "Patreon",
  },
  about: {
    build_number: "Bygg {number} ({date})",
  },
  login: {
    header: "Logga in på ditt konto",
    loading: "Laddar autentiseringsmetoder...",
    email_password: "E-post och lösenord",
    username_password: "Användarnamn och lösenord",
    password_auth_disabled: "Lösenordsautentisering är inaktiverad!",
    login_with: "Logga in med {provider}",
    logins_disabled:
      "Tyvärr har inloggningar stängts av. Detta är troligen tillfälligt på grund av ett problem. Besök {link} för mer information.",
    logins_disabled_link_text: "vår discord",
    password_auth_dialog: {
      username_or_email: "Användarnamn eller e-post",
      password: "Lösenord",
      action: "Inloggning",
    },
  },
  register: {
    header: "Registrera ett nytt konto",
    submit: "Registrera",
  },
  oauth2: {
    state_param_error: "Statsparametrarna stämmer inte överens! Försök igen.",
    generic_error:
      "Fel vid inloggning! Detta beror troligen på att du inte har något konto hos oss. Skapa ett och koppla ditt {provider}-konto.",
  },
  patreon_donors: {
    pfp_alt: "{name}s Patreon-profilbild",
    since: "Sedan {time}",
    info: {
      description: "Vill du att ditt namn ska stå med här?",
      action: "Prenumerera på",
    },
  },
  profile: {
    verify: {
      header: "Verifiera profil",
      action: "Skicka om verifieringsmejl",
      action_disabled: "Skickat e-post",
    },
    pfp: {
      header: "Din profilbild",
      change: {
        header: "Ändra profilbild",
        description: "Ladda upp en ny profilbild",
        selected_file: {
          description: "För närvarande vald fil",
          none: "ingen",
        },
        select: "Välj bildfil",
        error: "Det har uppstått ett fel när du ändrade din profilbild!",
        success: "Profilbilden har ändrats!",
      },
    },
    data: {
      header: "Uppgifter om din profil",
      email_not_verified: "(Inte verifierad)",
      user_id: "Användar-ID",
      created: "Skapad",
      admin_account: "Administratörskonto",
      json_info: {
        action: "Visa råa profildata",
        header: "Råa profildata",
      },
    },
    email_prefs: {
      header: "Inställningar för e-post",
      account_updates: "Uppdateringar av konton",
      website_updates: "Uppdateringar av webbplatsen",
    },
    reset: {
      header: "Återställ",
      email: {
        action: "Skicka e-post Återställning",
        disabled: "Återställning av skickat e-postmeddelande",
        dialog: {
          header: "Uppdatera e-post",
          label: "Nytt e-postmeddelande",
          send: "Skicka bekräftelse",
        },
      },
      password: {
        action: "Skicka återställning av lösenordet",
        disabled: "Återställning av skickat lösenord",
      },
    },
    logout: {
      action: "Utloggning",
      success: "Du har loggats ut från den här enheten",
    },
    delete: {
      action: "Ta bort konto",
      dialog: {
        header: "Ta bort kontot?",
        description:
          "Är du säker på att du vill radera ditt konto permanent? Detta raderar alla dina kommentarer och kan inte göras ogjort! För att fortsätta, ange ditt lösenord nedan.",
        invalid_password: "Felaktigt lösenord!",
      },
      success: "Du har lyckats radera ditt konto och all tillhörande information.",
    },
  },
  settings: {
    account_settings: {
      description: "Letar du efter kontoinställningar? De finns på {link}.",
      link_text: "profilsidan",
    },
    color_scheme: {
      label: "Färgschema",
      dark: "Mörkt läge",
      light: "Ljusläge",
    },
    autoplay: "Autospel",
  },
  downloads: {
    link_image_alt: "Bild av {downloadName}",
    specific_episode_link: {
      name: "Ladda ner specifika avsnitt",
      description: "Ladda ner ett specifikt avsnitt utan att använda ett program",
    },
    tuaa_download_link: {
      name: "Unus Annus-läsaren",
      description: "Ett enkelt sätt att ladda ner alla våra avsnitt i stor skala",
    },
    tuaa_node_api_link: {
      name: "Unus Annus-arkivet Node.JS API",
      description: "Ett enkelt sätt att kommunicera med vårt API i Node.JS",
    },
    specific_episodes_list: {
      header: "Välj ett avsnitt för att ladda ner",
    },
    specific_episode_page: {
      header: "Hämta alternativ",
      options: {
        video: "Ladda ner video",
        subtitles: "Ladda ner undertexter",
        thumbnail: "Ladda ner miniatyrbild",
        description: "Nedladdning Beskrivning",
        metadata: "Ladda ner metadata",
      },
      video: {
        header: "Ladda ner video",
        resolution_selector: "Välj upplösning",
      },
      subtitles: {
        header: "Ladda ner undertexter",
        language_selector: "Välj språk",
      },
      download_action: "Ladda ner",
    },
  },
  seasons: {
    season0: "Specialerbjudanden",
    season1: "Säsong 1",
  },
  comments: {
    header: "Kommentarer",
    sort: {
      label: "Sortera efter",
      newest: "Nyaste",
      oldest: "Äldsta",
      rating: "Betyg",
    },
    add_comment: {
      placeholder: "Lägg till en offentlig kommentar",
      logged_out: "Logga in för att kommentera den här videon",
      action: "Kommentar",
    },
    comment: {
      edited: "(redigerad)",
    },
    actions: {
      edit: {
        action: "Redigera",
        dialog: {
          header: "Redigera kommentar",
          label: "Kommentar",
        },
      },
      delete: {
        action: "Ta bort",
        dialog: {
          header: "Är du säker på att du vill radera din kommentar?",
          description: "Är du säker på att du vill radera din kommentar permanent? Detta kan inte göras ogjort!",
          action: "Ta bort",
        },
      },
    },
    errors: {
      generic: "Kommentarer kunde inte laddas",
      no_comments: "Inga kommentarer hittades. Vad sägs om att du sätter igång samtalet?",
    },
  },
  patreon_popup: {
    header: "Servrar kostar pengar!",
    description: "Vill du donera till vår Patreon för att stödja oss? Alla pengar går till att förbättra webbplatsen.",
    positive_action: "Ja",
    negative_action: "Nej",
    negative_action_toast: "Okej, vi kommer inte att visa dig detta längre.",
  },
  player: {
    episode: "Episod",
    previous_episode: "Föregående episod",
    next_episode: "Nästa episod",
    restart: "Spela igen",
    rewind: "Spola tillbaka {seektime}s",
    play: "Spela upp",
    pause: "Paus",
    fastForward: "Framåt {seektime}s",
    seek: "Sök",
    seekLabel: "{currentTime} av {duration}",
    played: "Spelade",
    buffered: "Buffrad",
    currentTime: "Aktuell tid",
    duration: "Varaktighet",
    volume: "Volym",
    mute: "Ljud av",
    unmute: "Slå på ljud",
    enableCaptions: "Aktivera bildtexter",
    disableCaptions: "Inaktivera bildtexter",
    download: "Ladda ner",
    enterFullscreen: "Helscärm",
    exitFullscreen: "Avsluta helskärmsläge",
    frameTitle: "Spelare för {title}",
    captions: "Bildtexter",
    settings: "Inställningar",
    pip: "PIP",
    menuBack: "Gå tillbaka till föregående meny",
    speed: "Uppspelningshastighet",
    normal: "Normal",
    quality: "Kvalitet",
    loop: "Slinga",
    start: "Starta",
    end: "Slut",
    all: "Alla",
    reset: "Återställ",
    disabled: "Inaktiverad",
    enabled: "Aktiverad",
    advertisement: "Annonsering",
    quality_badges: {
      2160: "4K",
      1440: "UHD",
      1080: "FHD",
      720: "HD",
      480: "SD",
      360: "SD",
      240: "SD",
    },
  },
  errors: {
    not_found: "Sidan du letade efter hittades inte",
    return_to_home: "Sidan du letade efter hittades inte",
  },
};

export default sv;
