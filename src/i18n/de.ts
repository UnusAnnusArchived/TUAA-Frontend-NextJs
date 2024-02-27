const de = {
  language: {
    name: "Deutsch",
    code: "de",
  },
  pages: {
    site: "Das Unus Annus Archiv",
    site_short: "TUAA",
    not_found: "Nicht Gefunden",
    about: "Über Uns",
    home: "Startseite",
    login: "Anmeldung",
    register: "Registrieren",
    oauth2: "Umleitung...",
    patreon_donors: "Patreon Spender",
    profile: "Profil",
    settings: "Einstellungen",
    downloads: "Downloads",
    download_specific_episode: "Lade eine bestimmt Episode herunter",
    download_epissode: "Download {name}",
    translate_tuaa: "Übersetze TUAA",
  },
  common: {
    cancel: "Absagen",
    close: "Schließen",
    copy: "Abschrift",
    save: "Sichern",
    copied_toast: "Text in die Zwischenablage kopiert",
    search: "Suche",
    account: {
      email: "Email",
      name: "Name",
      username: "Benutzername",
      password: "Kennwort",
      confirm_password: "Kennwort bestätigen ",
    },
  },
  menu: {
    language: "Sprache",
    discord: "Discord",
    github: "GitHub",
    patreon: "Patreon",
  },
  about: {
    build_number: "Bau {number} ({date})",
  },
  login: {
    header: "Anmeldung zu Ihrem Benutzerkonto",
    loading: "Authentifizierungsmethoden Laden",
    email_password: "Email & Kennwort",
    username_password: "Benutzername & Kennwort",
    password_auth_disabled: "Passwort-Authentifizierung Deaktiviert!",
    login_with: "Einloggen mit {provider}",
    logins_disabled:
      "Leider wurden die Logins deaktiviert. Dies ist höchstwahrscheinlich vorübergehend aufgrund eines Problems. Bitte besuchen Sie {link} für weitere Informationen.",
    logins_disabled_link_text: "unserer Discord",
    password_auth_dialog: {
      username_or_email: "Benutzername oder Email",
      password: "Kennwort",
      action: "Anmeldung",
    },
  },
  register: {
    header: "Registrieren Sie ein neues Konto",
    submit: "Registrieren",
  },
  oauth2: {
    state_param_error: "Statusparameter passen nicht! Bitte versuche es erneut.",
    generic_error:
      "Fehler beim Einloggen! Dies liegt höchstwahrscheinlich daran, dass Sie kein Konto bei uns haben. Bitte erstellen Sie eines und verknüpfen Sie Ihr {provider}-Konto.",
  },
  patreon_donors: {
    pfp_alt: "{name}s Patreon-Profilbild",
    since: "Seit {time}",
    info: {
      description: "Möchten Sie Ihren Namen hier sehen?",
      action: "Abonnieren",
    },
  },
  profile: {
    verify: {
      header: "Profil Überprüfen",
      action: "Bestätigungsmail erneut senden",
      action_disabled: "Gesendet",
    },
    pfp: {
      header: "Dein Profilbild",
      change: {
        description: "Lade ein neues Profilfoto hoch",
        selected_files: {
          description: "Aktuell ausgewählte Datei",
          none: "keine",
        },
        select: "Bilddatei wählen",
        error: "Beim Ändern Ihres Profilbilds ist ein Fehler aufgetreten!",
        success: "Profilbild geändert!",
      },
    },
    data: {
      header: "Über Ihr Profil gespeicherte Daten",
      email_not_verified: "(Nicht Verifiziert)",
      user_id: "Benutzer ID",
      created: "Erstellt",
      admin_account: "Admin-Konto",
      json_info: {
        action: "Rohprofildaten anzeigen",
        header: "Rohprofildaten",
      },
    },
    email_prefs: {
      header: "Email Einstellungen",
      account_updates: "Kontoaktualisierungen",
      website_updates: "Websiteaktualisierungen",
    },
    reset: {
      header: "Zurücksetzen",
      email: {
        action: "Email Zurücksetzung senden",
        disabled: "Email Zurücksetzung Gesendet",
        dialog: {
          header: "Email Aktualisieren",
          label: "Neue Email",
          send: "Bestätigung Senden",
        },
      },
      password: {
        action: "Passwort Zurücksetzeung Senden",
        disabled: "Passwort Zurücksetzung Gesendet",
      },
    },
    logout: {
      action: "Ausloggen",
      success: "Sie wurden von diesem Gerät abgemeldet",
    },
    delete: {
      action: "Konto Löschen",
      dialog: {
        header: "Konto Löschen?",
        description:
          "Möchten Sie Ihr Konto wirklich endgültig löschen? Dadurch werden alle Ihre Kommentare gelöscht und können nicht rückgängig gemacht werden! Um fortzufahren, geben Sie bitte unten Ihr Passwort ein.",
        invalid_password: "Ungültiges Passwort!",
      },
      success: "Ihr Konto und alle zugehörigen Informationen wurden erfolgreich gelöscht.",
    },
  },
  settings: {
    account_settings: {
      description: "Suchen Sie nach Kontoeinstellungen? Sie sind hier: {link}.",
      link_text: "Profilseite",
    },
    color_scheme: {
      label: "Farbschema",
      dark: "Dunkelmodus",
      light: "Lichtmodus",
    },
    autoplay: "Autoplay",
  },
  downloads: {
    link_image_alt: "Bild von {downloadName}",
    specific_episode_link: {
      name: "Lade eine bestimmte Episode herunter",
      description: "Laden Sie eine bestimmte Episode herunter, ohne ein Programm zu verwenden",
    },
    tuaa_downloader_link: {
      name: "Der Unus Annus Downloader",
      description: "Eine einfache Möglichkeit, eine unserer Episoden herunterzuladen",
    },
    tuaa_node_api_link: {
      name: "Die Node.JS-API von Unus Annus Archive",
      description: "Eine einfache Möglichkeit, mit unserer API in Node.JS zu kommunizieren",
    },
    specific_episodes_list: {
      header: "Wählen Sie eine Folge zum Herunterladen aus",
    },
    specific_episode_page: {
      header: "Download-Optionen",
      options: {
        video: "Video",
        subtitles: "Untertitel",
        thumbnail: "Vorschaubilder",
        description: "Beschreibung",
        metadata: "Metadaten",
      },
      video: {
        header: "Video",
        resolution_selector: "Auflösung",
      },
      subtitles: {
        header: "Untertitel",
        language_selector: "Sprache",
      },
      download_action: "Download",
    },
  },
  seasons: {
    season0: "Specials",
    season1: "Staffel 1",
  },
  comments: {
    header: "Kommentare",
    sort: {
      label: "Sortieren nach",
      newest: "Neuesten",
      oldest: "Ältesten",
      rating: "Bewertung",
    },
    add_comment: {
      placeholder: "Öffentlichen Kommentar hinzufügen",
      logged_out: "Bitte melden Sie sich an, um dieses Video zu kommentieren",
      action: "Kommentar",
    },
    comment: {
      edited: "(bearbeitet)",
    },
    actions: {
      edit: {
        action: "Bearbeiten",
        dialog: {
          header: "Kommentar bearbeiten",
          label: "Kommentar",
        },
      },
      delete: {
        action: "Löschen",
        dialog: {
          header: "Möchten Sie Ihren Kommentar wirklich löschen?",
          description:
            "Möchten Sie Ihren Kommentar wirklich dauerhaft löschen? Das kann nicht rückgängig gemacht werden!",
          action: "Löschen",
        },
      },
    },
    errors: {
      generic: "Kommentare wurden nicht geladen",
      no_comments: "Keine Kommentare gefunden. Wie wäre es, wenn du das Gespräch beginnnst?",
    },
  },
  patreon_popup: {
    header: "Server kosten Geld!",
    description:
      "Möchten Sie an unseren Patreon spenden, um uns zu unterstützen? Das gesamte Geld fließt in die Verbesserung der Website.",
    positive_action: "Ja",
    negative_action: "Nein",
    negative_action_toast: "In Ordnung, wir zeigen dir das nicht mehr.",
  },
  player: {
    controls: {
      previous_episode: "Vorherige Folge",
      play: "Wiedergabe",
      pause: "Pause",
      next_episode: "Nächste Folge",
      mute: "Stummschaltung",
      unmute: "Stummschaltung aufheben",
      enable_captions: "Untertitel",
      disable_captions: "Untertitel deaktivieren",
      settings: "Einstellungen",
      download: "Herunterladen",
      enter_fullscreen: "Vollbild",
      exit_fullscreen: "Vollbildmodus beenden",
    },
    settings: {
      episode: "Folge",
      previous_episode: "Vorherige Folge",
      next_episode: "Nächste Folge",
      restart: "Nochmal",
      rewind: "{seektime}s Zurückspulen",
      play: "Wiedergabe",
      pause: "Pause",
      fastForward: "{seektime}s Vorspulen",
      seek: "Suchen",
      seekLabel: "{seektime} von {duration}",
      played: "Gespielt",
      buffered: "Gepuffert",
      currentTime: "Aktuelle Uhrzeit",
      duration: "Dauer",
      volume: "Volumen",
      mute: "Stummschaltung",
      unmute: "Stummschaltung aufheben",
      enableCaptions: "Untertitel aktivieren",
      disableCaptions: "Untertitel deaktivieren",
      download: "Herunterladen",
      enterFullscreen: "Vollbild",
      exitFullscreen: "Vollbildmodus beenden",
      frameTitle: "Spieler für {title}",
      captions: "Untertitel",
      settings: "Einstellungen",
      pip: "PIP",
      menuBack: "Zurück zum vorherigen Menü",
      speed: "Wiedergabegeschwindigkeit",
      normal: "Standard",
      quality: "Qualität",
      loop: "Wiederholen",
      start: "Anfang",
      end: "Ende",
      all: "Alle",
      reset: "Zurücksetzen",
      disabled: "Deaktiviert",
      enabled: "Ermöglicht",
      advertisement: "Anzeige",
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
      not_found: "Die gesuchte Seite wurde nicht gefunden",
      return_to_home: "Nach Hause zurückkehren",
    },
  },
};

export default de;
