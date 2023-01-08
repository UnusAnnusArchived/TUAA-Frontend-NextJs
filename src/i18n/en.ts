const en = {
  language: {
    name: "English",
    code: "en",
  },
  pages: {
    site: "The Unus Annus Archive",
    site_short: "TUAA",
    not_found: "Not Found",
    about: "About",
    home: "Home",
    login: "Login",
    register: "Register",
    oauth2: "Redirecting...",
    patreon_donors: "Patreon Donors",
    profile: "Profile",
    settings: "Settings",
    downloads: "Downloads",
    download_specific_episode: "Download Specific Episode",
    download_episode: "Download {name}",
    translate_tuaa: "Translate TUAA",
  },
  common: {
    cancel: "Cancel",
    close: "Close",
    copy: "Copy",
    save: "Save",
    copied_toast: "Copied text to clipboard",
    search: "Search",
    episode: "Episode",
    random_episode: "Random Episode",
    account: {
      email: "Email",
      name: "Name",
      username: "Username",
      password: "Password",
      confirm_password: "Confirm Password",
    },
  },
  menu: {
    language: "Language",
    discord: "Discord",
    github: "GitHub",
    patreon: "Patreon",
  },
  about: {
    build_number: "Build {number} ({date})",
  },
  login: {
    header: "Login to your account",
    loading: "Loading Authentication Methods...",
    email_password: "Email & Password",
    username_password: "Username & Password",
    password_auth_disabled: "Password Authentication Disabled!",
    login_with: "Login with {provider}",
    logins_disabled:
      "Unfortunately logins have been disabled. This is most likely temporary due to an issue. Please visit {link} for more info.",
    logins_disabled_link_text: "our Discord",
    password_auth_dialog: {
      username_or_email: "Username or Email",
      password: "Password",
      action: "Login",
    },
  },
  register: {
    header: "Register a new account",
    submit: "Register",
  },
  oauth2: {
    state_param_error: "State parameters do not match! Please try again.",
    generic_error:
      "Error logging in! This is most likely because you do not have an account with us. Please create one and link your {provider} account.",
  },
  patreon_donors: {
    pfp_alt: "{name}'s Patreon Profile Picture",
    since: "Since {time}",
    info: {
      description: "Want to see your name listed here?",
      action: "Subscribe",
    },
  },
  profile: {
    verify: {
      header: "Verify Profile",
      action: "Resend Verification Email",
      action_disabled: "Sent",
    },
    pfp: {
      header: "Your Profile Picture",
      change: {
        header: "Change Profile Picture",
        description: "Upload a new profile picture.",
        selected_file: {
          description: "Currently selected file",
          none: "none",
        },
        select: "Choose image file",
        error: "There has been an error changing your profile picture!",
        success: "Profile picture changed!",
      },
    },
    data: {
      header: "Data held about your profile",
      email_not_verified: "(Not Verified)",
      user_id: "User ID",
      created: "Created",
      admin_account: "Admin Account",
      json_info: {
        action: "Show Raw Profile Data",
        header: "Raw Profile Data",
      },
    },
    email_prefs: {
      header: "Email Preferences",
      account_updates: "Account Updates",
      website_updates: "Website Updates",
    },
    reset: {
      header: "Reset",
      email: {
        action: "Send Email Reset",
        disabled: "Sent Email Reset",
        dialog: {
          header: "Update Email",
          label: "New Email",
          send: "Send Confirmation",
        },
      },
      password: {
        action: "Send Password Reset",
        disabled: "Sent Password Reset",
      },
    },
    logout: {
      action: "Logout",
      success: "You have been logged out from this device",
    },
    delete: {
      action: "Delete Account",
      dialog: {
        header: "Delete Account?",
        description:
          "Are you sure you want to permanently delete your account? This will delete all your comments and cannot be undone! To continue please enter your password below.",
        invalid_password: "Invalid Password!",
      },
      success: "Successfully deleted your account and all associated information.",
    },
  },
  settings: {
    account_settings: {
      description: "Looking for account settings? They're on the {link}.",
      link_text: "Profile page",
    },
    color_scheme: {
      label: "Color Scheme",
      dark: "Dark Mode",
      light: "Light Mode",
    },
    autoplay: "Autoplay",
  },
  downloads: {
    link_image_alt: "Image of {downloadName}",
    specific_episode_link: {
      name: "Download Specific Episode",
      description: "Download a specific episode without the use of a program",
    },
    tuaa_downloader_link: {
      name: "The Unus Annus Downloader",
      description: "An easy way to mass download any of our episodes",
    },
    tuaa_node_api_link: {
      name: "The Unus Annus Archive Node.JS API",
      description: "An easy way to communicate with our API in Node.JS",
    },
    specific_episodes_list: {
      header: "Select an episode to download",
    },
    specific_episode_page: {
      header: "Download Options",
      options: {
        video: "Video",
        subtitles: "Subtitles",
        thumbnail: "Thumbnail",
        description: "Description",
        metadata: "Metadata",
      },
      video: {
        header: "Video",
        resolution_selector: "Resolution",
      },
      subtitles: {
        header: "Subtitles",
        language_selector: "Language",
      },
      download_action: "Download",
    },
  },
  seasons: {
    season0: "Specials",
    season1: "Season 1",
  },
  comments: {
    header: "Comments",
    sort: {
      label: "Sort By",
      newest: "Newest",
      oldest: "Oldest",
      rating: "Rating",
    },
    add_comment: {
      placeholder: "Add a public comment",
      logged_out: "Please login to comment on this video",
      action: "Comment",
    },
    comment: {
      edited: "(edited)",
    },
    actions: {
      edit: {
        action: "Edit",
        dialog: {
          header: "Edit Comment",
          label: "Comment",
        },
      },
      delete: {
        action: "Delete",
        dialog: {
          header: "Are you sure you want to delete your comment?",
          description: "Are you sure you want to permanently delete your comment? This can not be undone!",
          action: "Delete",
        },
      },
    },
    errors: {
      generic: "Comments failed to load",
      no_comments: "No comments found. How about you get the conversation started?",
    },
  },
  patreon_popup: {
    header: "Servers cost money!",
    description: "Would you like to donate to our Patreon to support us? All money will go towards improving the site.",
    positive_action: "Yes",
    negative_action: "No",
    negative_action_toast: "Alright, we won't show you this anymore.",
  },
  player: {
    episode: "Episode",
    previous_episode: "Previous Episode",
    next_episode: "Next Episode",
    restart: "Restart",
    rewind: "Rewind {seektime}s",
    play: "Play",
    pause: "Pause",
    fastForward: "Forward {seektime}s",
    seek: "Seek",
    seekLabel: "{currentTime} of {duration}",
    played: "Played",
    buffered: "Buffered",
    currentTime: "Current time",
    duration: "Duration",
    volume: "Volume",
    mute: "Mute",
    unmute: "Unmute",
    enableCaptions: "Enable captions",
    disableCaptions: "Disable captions",
    download: "Download",
    enterFullscreen: "Enter fullscreen",
    exitFullscreen: "Exit fullscreen",
    frameTitle: "Player for {title}",
    captions: "Captions",
    settings: "Settings",
    pip: "PIP",
    menuBack: "Go back to previous menu",
    speed: "Speed",
    normal: "Normal",
    quality: "Quality",
    loop: "Loop",
    start: "Start",
    end: "End",
    all: "All",
    reset: "Reset",
    disabled: "Disabled",
    enabled: "Enabled",
    advertisement: "Ad",
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
    not_found: "The page you were looking for was not found",
    return_to_home: "Return to home",
  },
};

export default en;
