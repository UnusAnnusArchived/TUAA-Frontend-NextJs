// Filipino
const fil = {
  language: {
    name: "Filipino",
    code: "fil",
  },
  pages: {
    site: "Ang Unus Annus Archive",
    site_short: "TUAA",
    not_found: "Hindi Nahanap ang Pahina",
    about: "Tungkol sa",
    home: "Home",
    login: "Mag log in",
    register: "Magrehistro",
    oauth2: "Nire-redirect...",
    patreon_donors: "Mga Donor ng Patreon",
    profile: "Profile",
    settings: "Mga setting",
    downloads: "Mga download",
    download_specific_episode: "I-download ang Partikular na Episode",
    download_episode: "I-download ang {name}",
    translate_tuaa: "Isalin ang TUAA",
  },
  common: {
    cancel: "Kanselahin",
    close: "Isara",
    copy: "Kopya",
    save: "I-save",
    copied_toast: "Kinopya ang teksto sa clipboard",
    search: "Maghanap",
    account: {
      email: "Email",
      name: "Pangalan",
      username: "Username",
      password: "Password",
      confirm_password: "Kumpirmahin ang Password",
    },
  },
  menu: {
    language: "Wika",
    discord: "Discord",
    github: "GitHub",
    patreon: "Patreon",
  },
  about: {
    build_number: "Build {number} ({date})",
  },
  login: {
    header: "Mag-login sa iyong account",
    loading: "Nilo-load ang Mga Paraan ng Pagpapatunay...",
    email_password: "Email at Password",
    username_password: "Username at Password",
    password_auth_disabled: "Hindi Pinagana ang Pagpapatunay ng Password!",
    login_with: "Mag-login gamit ang {provider}",
    logins_disabled:
      "Sa kasamaang palad, ang mga pag-login ay hindi pinagana. Ito ay malamang na pansamantala dahil sa isang isyu. Pakibisita ang {link} para sa higit pang impormasyon.",
    logins_disabled_link_text: "aming discord",
    password_auth_dialog: {
      username_or_email: "Username o Email",
      password: "Password",
      action: "Mag log in",
    },
  },
  register: {
    header: "Magrehistro ng bagong account",
    submit: "Magrehistro",
  },
  oauth2: {
    state_param_error: "Hindi tugma ang mga parameter ng estado! Pakisubukang muli.",
    generic_error:
      "Error sa pag-log in! Ito ay malamang dahil wala kang account sa amin. Mangyaring lumikha ng isa at i-link ang iyong {provider} account.",
  },
  patreon_donors: {
    pfp_alt: "Larawan sa Profile ng Patreon ni {name}",
    since: "Since {time}",
    info: {
      description: "Gustong makita ang iyong pangalan na nakalista dito?",
      action: "Mag-subscribe",
    },
  },
  profile: {
    verify: {
      header: "I-verify ang Profile",
      action: "Muling ipadala ang email ng pagpapatunay",
      action_disabled: "Naipadala ang Email",
    },
    pfp: {
      header: "Ang iyong profile picture",
      change: {
        header: "Baguhin ang Larawan sa Profile",
        description: "Mag-upload ng bagong larawan sa profile",
        selected_file: {
          description: "Kasalukuyang napiling file",
          none: "wala",
        },
        select: "Pumili ng file ng imahe",
        error: "Nagkaroon ng error sa pagpapalit ng iyong larawan sa profile!",
        success: "Nabago ang Profile Picture!",
      },
    },
    data: {
      header: "Data na hawak tungkol sa iyong profile",
      email_not_verified: "(Hindi napatunayan)",
      user_id: "User ID",
      created: "Nilikha",
      admin_account: "Admin Account",
      json_info: {
        action: "Ipakita ang Raw Profile Data",
        header: "Raw Profile Data",
      },
    },
    email_prefs: {
      header: "Mga Kagustuhan sa Email",
      account_updates: "Mga Update sa Account",
      website_updates: "Mga Update sa Website",
    },
    reset: {
      header: "I-reset",
      email: {
        action: "Ipadala ang Pag-reset ng Email",
        disabled: "Ipinadala ang I-reset ang Email",
        dialog: {
          header: "I-update ang Email",
          label: "Bagong Email",
          send: "Ipadala ang Kumpirmasyon",
        },
      },
      password: {
        action: "Ipadala ang Pag-reset ng Password",
        disabled: "Ipinadalang Pag-reset ng Password",
      },
    },
    logout: {
      action: "Mag-logout",
      success: "Na-log out ka sa device na ito",
    },
    delete: {
      action: "Tanggalin ang account",
      dialog: {
        header: "Tanggalin ang Account?",
        description:
          "Sigurado ka bang gusto mong permanenteng tanggalin ang iyong account? Tatanggalin nito ang lahat ng iyong komento at hindi na maa-undo! Upang magpatuloy, mangyaring ipasok ang iyong password sa ibaba.",
        invalid_password: "Di wastong password!",
      },
      success: "Matagumpay na natanggal ang iyong account at lahat ng nauugnay na impormasyon.",
    },
  },
  settings: {
    account_settings: {
      description: "Naghahanap ng mga setting ng account? Nasa {link} sila.",
      link_text: "profile page",
    },
    color_scheme: {
      label: "Kulay Scheme",
      dark: "Dark Mode",
      light: "Light Mode",
    },
    autoplay: "Autoplay",
  },
  downloads: {
    link_image_alt: "Larawan ng {downloadName}",
    specific_episode_link: {
      name: "I-download ang Partikular na Episode",
      description: "Mag-download ng partikular na episode nang hindi gumagamit ng program",
    },
    tuaa_downloader_link: {
      name: "Ang Unus Annus Downloader",
      description: "Isang madaling paraan para mass download ang alinman sa aming mga episode",
    },
    tuaa_node_api_link: {
      name: "Ang Unus Annus Archive Node.JS API",
      description: "Isang madaling paraan upang makipag-ugnayan sa aming API sa Node.JS",
    },
    specific_episodes_list: {
      header: "Pumili ng episode na ida-download",
    },
    specific_episode_page: {
      header: "Mga Opsyon sa Pag-download",
      options: {
        video: "Video",
        subtitles: "Mga subtitle",
        thumbnail: "Thumbnail",
        description: "Paglalarawan",
        metadata: "Metadata",
      },
      video: {
        header: "Video",
        resolution_selector: "Resolusyon",
      },
      subtitles: {
        header: "Mga subtitle",
        language_selector: "Wika",
      },
      download_action: "I-download",
    },
  },
  seasons: {
    season0: "Mga espesyal",
    season1: "Season 1",
  },
  comments: {
    heder: "Mga komento",
    sort: {
      label: "Pagbukud-bukurin Ayon",
      newest: "sa Pinakabago",
      oldest: "sa Pinakamatanda",
      rating: "sa Rating",
    },
    add_comment: {
      placeholder: "Magdagdag ng pampublikong komento",
      logged_out: "Mangyaring mag-login upang magkomento sa video na ito",
      action: "Magkomento",
    },
    comment: {
      edited: "(na-edit)",
    },
    actions: {
      edit: {
        action: "I-edit",
        dialog: {
          header: "I-edit ang Komento",
          label: "Magkomento",
        },
      },
      delete: {
        action: "Tanggalin",
        dialog: {
          header: "Sigurado ka bang gusto mong tanggalin ang iyong komento?",
          description:
            "Sigurado ka bang gusto mong permanenteng tanggalin ang iyong komento? Hindi na ito maaaring bawiin!",
          action: "Tanggalin",
        },
      },
    },
    errors: {
      generic: "Nabigong mag-load ang mga komento",
      no_comments: "Walang nakitang komento. Paano kung simulan mo ang pag-uusap?",
    },
  },
  patreon_popup: {
    header: "Ang mga server ay nagkakahalaga ng pera!",
    description:
      "Gusto mo bang mag-donate sa aming Patreon para suportahan kami? Ang lahat ng pera ay mapupunta sa pagpapabuti ng site.",
    positive_action: "Oo",
    negative_action: "Hindi",
    negative_action_toast: "Sige, hindi na namin ito ipapakita sa iyo.",
  },
  player: {
    episode: "Episode",
    previous_episode: "Nakaraang Episode",
    next_episode: "Susunod na Episode",
    restart: "I-restart",
    rewind: "I-rewind nang {seektime}s",
    play: "I-play",
    pause: "Pause",
    fastForward: "Pasulong ng {seektime}s",
    seek: "Humanap",
    seekLabel: "{currentTime} ng {duration}",
    played: "Naglaro",
    buffered: "Naka-buffer",
    currentTime: "Oras ngayon",
    duration: "Tagal",
    volume: "Dami",
    mute: "I-mute",
    unmute: "I-unmute",
    enableCaptions: "Paganahin ang mga caption",
    disableCaptions: "Huwag paganahin ang mga caption",
    download: "I-download",
    enterFullscreen: "Full screen",
    exitFullscreen: "Lumabas sa full screen",
    frameTitle: "Manlalaro para sa {title}",
    captions: "Mga Subtitle",
    settings: "Mga Setting",
    pip: "PIP",
    menuBack: "Bumalik sa nakaraang menu",
    speed: "Bilis ng pag-playback",
    normal: "Normal",
    quality: "Kalidad",
    loop: "I-loop",
    start: "Magsimula",
    end: "Tapusin",
    all: "Lahat",
    reset: "I-reset",
    disabled: "Hindi pinagana",
    enabled: "Pinagana",
    advertisement: "Advertisement",
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
    not_found: "Ang pahina na iyong hinahanap ay hindi natagpuan",
    return_to_home: "Bumalik sa bahay",
  },
};

export default fil;
