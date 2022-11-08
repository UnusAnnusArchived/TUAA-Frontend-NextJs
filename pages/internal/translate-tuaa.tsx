import { Typography } from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Layout } from "../../components/layout";
import Accordion from "../../components/translate-accordion";
import TextField from "../../components/translate-textfield";
import Divider from "../../components/translate-divider";
import { MetaHead } from "../../components/meta-head";

type AccordionNames =
  | ""
  | "language"
  | "pages"
  | "common"
  | "menu"
  | "about"
  | "login"
  | "register"
  | "oauth2"
  | "patreon_donors"
  | "profile"
  | "profile.verify"
  | "profile.pfp"
  | "profile.data"
  | "profile.email_prefs"
  | "profile.reset"
  | "profile.logout"
  | "profile.delete"
  | "settings"
  | "downloads"
  | "downloads.specific_episode_link"
  | "downloads.tuaa_downloader_link"
  | "downloads.tuaa_node_api_link"
  | "downloads.specific_episodes_list"
  | "downloads.specific_episode_page"
  | "seasons"
  | "comments"
  | "patreon_popup"
  | "player"
  | "errors"
  | "translate_tuaa";

const TranslateWebsite: React.FC = () => {
  const { t, i18n } = useTranslation();

  const en = (key: string) => {
    return t(key, { lng: "en" });
  };

  function uArrSt(initialValue?: string) {
    const [value, setValue] = useState(initialValue);

    return { value, setValue };
  }

  const textValues = {
    language: {
      name: uArrSt(en("language:name")),
      code: uArrSt(en("language:code")),
    },
    pages: {
      site: uArrSt(en("pages:site")),
      site_short: uArrSt(en("pages:site_short")),
      not_found: uArrSt(en("pages:not_found")),
      about: uArrSt(en("pages:about")),
      home: uArrSt(en("pages:home")),
      login: uArrSt(en("pages:login")),
      register: uArrSt(en("pages:register")),
      oauth2: uArrSt(en("pages:oauth2")),
      patreon_donors: uArrSt(en("pages:patreon_donors")),
      profile: uArrSt(en("pages:profile")),
      settings: uArrSt(en("pages:settings")),
      downloads: uArrSt(en("pages:downloads")),
      download_specific_episode: uArrSt(en("pages:download_specific_episode")),
      download_episode: uArrSt(en("pages:download_episode")),
      translate_tuaa: uArrSt(en("pages:translate_tuaa")),
    },
    common: {
      cancel: uArrSt(en("common:cancel")),
      close: uArrSt(en("common:close")),
      copy: uArrSt(en("common:copy")),
      save: uArrSt(en("common:save")),
      copied_toast: uArrSt(en("common:copied_toast")),
      search: uArrSt(en("common:search")),
      account: {
        email: uArrSt(en("common:account:email")),
        name: uArrSt(en("common:account:name")),
        username: uArrSt(en("common:account:username")),
        password: uArrSt(en("common:account:password")),
        confirm_password: uArrSt(en("common:account:confirm_password")),
      },
    },
    menu: {
      language: uArrSt(en("menu:language")),
      discord: uArrSt(en("menu:discord")),
      github: uArrSt(en("menu:github")),
      patreon: uArrSt(en("menu:patreon")),
    },
    about: {
      build_number: uArrSt(en("about:build_number")),
    },
    login: {
      header: uArrSt(en("login:header")),
      loading: uArrSt(en("login:loading")),
      email_password: uArrSt(en("login:email_password")),
      username_password: uArrSt(en("login:username_password")),
      password_auth_disabled: uArrSt(en("login:password_auth_disabled")),
      login_with: uArrSt(en("login:login_with")),
      logins_disabled: uArrSt(en("login:logins_disabled")),
      logins_disabled_link_text: uArrSt(en("login:logins_disabled_link_text")),
      password_auth_dialog: {
        username_or_email: uArrSt(en("login:password_auth_dialog:username_or_email")),
        password: uArrSt(en("login:password_auth_dialog:password")),
        action: uArrSt(en("login:password_auth_dialog:action")),
      },
    },
    register: {
      header: uArrSt(en("register:header")),
      submit: uArrSt(en("register:submit")),
    },
    oauth2: {
      state_param_error: uArrSt(en("oauth2:state_param_error")),
      generic_error: uArrSt(en("oauth2:generic_error")),
    },
    patreon_donors: {
      pfp_alt: uArrSt(en("patreon_donors:pfp_alt")),
      since: uArrSt(en("patreon_donors:since")),
      info: {
        description: uArrSt(en("patreon_donors:info:description")),
        action: uArrSt(en("patreon_donors:info:action")),
      },
    },
    profile: {
      verify: {
        header: uArrSt(en("profile:verify:header")),
        action: uArrSt(en("profile:verify:action")),
        action_disabled: uArrSt(en("profile:verify:action_disabled")),
      },
      pfp: {
        header: uArrSt(en("profile:pfp:header")),
        change: {
          header: uArrSt(en("profile:pfp:change:header")),
          description: uArrSt(en("profile:pfp:change:description")),
          selected_file: {
            description: uArrSt(en("profile:pfp:change:selected_file:description")),
            none: uArrSt(en("profile:pfp:change:selected_file:none")),
          },
          select: uArrSt(en("profile:pfp:change:select")),
          error: uArrSt(en("profile:pfp:change:error")),
          success: uArrSt(en("profile:pfp:change:success")),
        },
      },
      data: {
        header: uArrSt(en("profile:data:header")),
        email_not_verified: uArrSt(en("profile:data:email_not_verified")),
        user_id: uArrSt(en("profile:data:user_id")),
        created: uArrSt(en("profile:data:created")),
        admin_account: uArrSt(en("profile:data:admin_account")),
        json_info: {
          action: uArrSt(en("profile:data:json_info:action")),
          header: uArrSt(en("profile:data:json_info:header")),
        },
      },
      email_prefs: {
        header: uArrSt(en("profile:email_prefs:header")),
        account_updates: uArrSt(en("profile:email_prefs:account_updates")),
        website_updates: uArrSt(en("profile:email_prefs:website_updates")),
      },
      reset: {
        header: uArrSt(en("profile:reset:header")),
        email: {
          action: uArrSt(en("profile:reset:email:action")),
          disabled: uArrSt(en("profile:reset:email:disabled")),
          dialog: {
            header: uArrSt(en("profile:reset:email:dialog:header")),
            label: uArrSt(en("profile:reset:email:dialog:label")),
            send: uArrSt(en("profile:reset:email:dialog:send")),
          },
        },
        password: {
          action: uArrSt(en("profile:reset:password:action")),
          disabled: uArrSt(en("profile:reset:password:disabled")),
        },
      },
      logout: {
        action: uArrSt(en("profile:logout:action")),
        success: uArrSt(en("profile:logout:success")),
      },
      delete: {
        action: uArrSt(en("profile:delete:action")),
        success: uArrSt(en("profile:delete:success")),
        dialog: {
          header: uArrSt(en("profile:delete:dialog:header")),
          description: uArrSt(en("profile:delete:dialog:description")),
          invalid_password: uArrSt(en("profile:delete:dialog:invalid_password")),
        },
      },
    },
    settings: {
      autoplay: uArrSt(en("settings:autoplay")),
      account_settings: {
        description: uArrSt(en("settings:account_settings:description")),
        link_text: uArrSt(en("settings:account_settings:link_text")),
      },
    },
    downloads: {
      link_image_alt: uArrSt(en("downloads:link_image_alt")),
      specific_episode_link: {
        name: uArrSt(en("downloads:specific_episode_link:name")),
        description: uArrSt(en("downloads:specific_episode_link:description")),
      },
      tuaa_downloader_link: {
        name: uArrSt(en("downloads:tuaa_downloader_link:name")),
        description: uArrSt(en("downloads:tuaa_downloader_link:description")),
      },
      tuaa_node_api_link: {
        name: uArrSt(en("downloads:tuaa_node_api_link")),
        description: uArrSt(en("downloads:tuaa_node_api_link:description")),
      },
      specific_episodes_list: {
        header: uArrSt(en("downloads:specific_episodes_list:header")),
      },
      specific_episode_page: {
        header: uArrSt(en("downloads:specific_episode_page")),
        download_action: uArrSt(en("downloads:specific_episode_page:download_action")),
        options: {
          video: uArrSt(en("downloads:specific_episode_page:options:video")),
          subtitles: uArrSt(en("downloads:specific_episode_page:options:subtitles")),
          thumbnail: uArrSt(en("downloads:specific_episode_page:options:thumbnail")),
          description: uArrSt(en("downloads:specific_episode_page:options:description")),
          metadata: uArrSt(en("downloads:specific_episode_page:options:metadata")),
        },
        video: {
          header: uArrSt(en("downloads:specific_episode_page:video:header")),
          resolution_selector: uArrSt(en("downloads:specific_episode_page:video:resolution_selector")),
        },
        subtitles: {
          header: uArrSt(en("downloads:specific_episode_page:subtitles:header")),
          language_selector: uArrSt(en("downloads:specific_episode_page:subtitles:language_selector")),
        },
      },
    },
    seasons: {
      season0: uArrSt(en("seasons:season0")),
      season1: uArrSt(en("seasons:season1")),
    },
    comments: {
      header: uArrSt(en("comments:header")),
      sort: {
        label: uArrSt(en("comments:sort:label")),
        newest: uArrSt(en("comments:sort:newest")),
        oldest: uArrSt(en("comments:sort:oldest")),
        rating: uArrSt(en("comments:sort:rating")),
      },
      add_comment: {
        placeholder: uArrSt(en("comments:add_comment:placeholder")),
        logged_out: uArrSt(en("comments:add_comment:logged_out")),
        action: uArrSt(en("comments:add_comment:action")),
      },
      comment: {
        edited: uArrSt(en("comments:comment:edited")),
      },
      actions: {
        edit: {
          action: uArrSt(en("comments:actions:edit:action")),
          dialog: {
            header: uArrSt(en("comments:actions:edit:dialog:header")),
            label: uArrSt(en("comments:actions:edit:dialog:label")),
          },
        },
        delete: {
          action: uArrSt(en("comments:actions:delete:action")),
          dialog: {
            header: uArrSt(en("comments:actions:delete:dialog:header")),
            description: uArrSt(en("comments:actions:delete:dialog:description")),
            action: uArrSt(en("comments:actions:delete:dialog:action")),
          },
        },
      },
      errors: {
        generic: uArrSt(en("comments:errors:generic")),
        no_comments: uArrSt(en("comments:errors:no_comments")),
      },
    },
    patreon_popup: {
      header: uArrSt(en("patreon_popup:header")),
      description: uArrSt(en("patreon_popup:description")),
      positive_action: uArrSt(en("patreon_popup:positive_action")),
      negative_action: uArrSt(en("patreon_popup:negative_action")),
      negative_action_toast: uArrSt(en("patreon_popup:negative_action_toast")),
    },
    player: {
      episode: uArrSt(en("player:episode")),
      previous_episode: uArrSt(en("player:previous_episode")),
      next_episode: uArrSt(en("player:next_episode")),
      restart: uArrSt(en("player:restart")),
      rewind: uArrSt(en("player:rewind")),
      play: uArrSt(en("player:play")),
      pause: uArrSt(en("player:pause")),
      fastForward: uArrSt(en("player:fastForward")),
      seek: uArrSt(en("player:seek")),
      seekLabel: uArrSt(en("player:seekLabel")),
      played: uArrSt(en("player:played")),
      buffered: uArrSt(en("player:buffered")),
      currentTime: uArrSt(en("player:currentTime")),
      duration: uArrSt(en("player:duration")),
      volume: uArrSt(en("player:volume")),
      mute: uArrSt(en("player:mute")),
      unmute: uArrSt(en("player:unmute")),
      enableCaptions: uArrSt(en("player:enableCaptions")),
      disableCaptions: uArrSt(en("player:disableCaptions")),
      download: uArrSt(en("player:download")),
      enterFullscreen: uArrSt(en("player:enterFullscreen")),
      exitFullscreen: uArrSt(en("player:exitFullscreen")),
      frameTitle: uArrSt(en("player:frameTitle")),
      captions: uArrSt(en("player:captions")),
      settings: uArrSt(en("player:settings")),
      pip: uArrSt(en("player:pip")),
      menuBack: uArrSt(en("player:menuBack")),
      speed: uArrSt(en("player:speed")),
      normal: uArrSt(en("player:normal")),
      quality: uArrSt(en("player:quality")),
      loop: uArrSt(en("player:loop")),
      start: uArrSt(en("player:start")),
      end: uArrSt(en("player:end")),
      all: uArrSt(en("player:all")),
      reset: uArrSt(en("player:reset")),
      disabled: uArrSt(en("player:disabled")),
      enabled: uArrSt(en("player:enabled")),
      advertisement: uArrSt(en("player:advertisement")),
      quality_badges: {
        2160: uArrSt(en("player:quality_badges:2160")),
        1440: uArrSt(en("player:quality_badges:1440")),
        1080: uArrSt(en("player:quality_badges:1080")),
        720: uArrSt(en("player:quality_badges:720")),
        480: uArrSt(en("player:quality_badges:480")),
        360: uArrSt(en("player:quality_badges:360")),
        240: uArrSt(en("player:quality_badges:240")),
      },
    },
    errors: {
      not_found: uArrSt(en("errors:not_found")),
      return_to_home: uArrSt(en("errors:return_to_home")),
    },
  };

  const [expanded, setExpanded] = useState<AccordionNames>("");

  const handleAccordionChange = (name: AccordionNames) => (evt: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? name : "");
  };

  return (
    <Layout>
      <MetaHead baseTitle={t("pages:translate_tuaa")} />
      <Typography variant="h6" component="h2">
        {t("pages:translate_tuaa")}
      </Typography>

      <Accordion
        header="Language Information"
        description="General information about the language"
        expanded={expanded === "language"}
        onChange={handleAccordionChange("language")}
      >
        <TextField label="Name" textValue={textValues.language.name} />
        <TextField label="Code" textValue={textValues.language.code} />
      </Accordion>

      <Accordion
        header="Page Names"
        description="Translations for every page title on the website"
        expanded={expanded === "pages"}
        onChange={handleAccordionChange("pages")}
      >
        <TextField label="Website Name" textValue={textValues.pages.site} />
        <TextField label="Short Website Name" textValue={textValues.pages.site_short} />
        <TextField label="404 Not Found Page" textValue={textValues.pages.not_found} />
        <TextField label="About Page" textValue={textValues.pages.about} />
        <TextField label="Home Page" textValue={textValues.pages.home} />
        <TextField label="Login Page" textValue={textValues.pages.login} />
        <TextField label="Register Page" textValue={textValues.pages.register} />
        <TextField label="OAuth2 Page" textValue={textValues.pages.oauth2} />
        <TextField label="Patreon Donors Page" textValue={textValues.pages.patreon_donors} />
        <TextField label="Profile Page" textValue={textValues.pages.profile} />
        <TextField label="Settings Page" textValue={textValues.pages.settings} />
        <TextField label="Downloads Page" textValue={textValues.pages.downloads} />
        <TextField label="Download Episode List Page" textValue={textValues.pages.download_specific_episode} />
        <TextField label="Download Episode Page" textValue={textValues.pages.download_episode} />
        <TextField label="Translate TUAA Page" textValue={textValues.pages.translate_tuaa} />
      </Accordion>

      <Accordion
        header="Common"
        description="Translations for commonly used text around the website"
        expanded={expanded === "common"}
        onChange={handleAccordionChange("common")}
      >
        <TextField label="Cancel" textValue={textValues.common.cancel} />
        <TextField label="Close" textValue={textValues.common.close} />
        <TextField label="Copy" textValue={textValues.common.copy} />
        <TextField label="Save" textValue={textValues.common.save} />
        <TextField multiline label="Copied Text Toast" textValue={textValues.common.copied_toast} />
        <TextField label="Search" textValue={textValues.common.search} />
        <Divider header="Common Account" />
        <TextField label="Email" textValue={textValues.common.account.email} />
        <TextField label="Name" textValue={textValues.common.account.name} />
        <TextField label="Username" textValue={textValues.common.account.username} />
        <TextField label="Password" textValue={textValues.common.account.password} />
        <TextField label="Confirm Password" textValue={textValues.common.account.confirm_password} />
      </Accordion>

      <Accordion
        header="Menu"
        description="Translations for the website's main menu"
        expanded={expanded === "menu"}
        onChange={handleAccordionChange("menu")}
      >
        <TextField label="Language" textValue={textValues.menu.language} />
        <TextField label="Discord" textValue={textValues.menu.discord} />
        <TextField label="GitHub" textValue={textValues.menu.github} />
        <TextField label="Patreon" textValue={textValues.menu.patreon} />
      </Accordion>

      <Accordion
        header="About Popup"
        description="Translations for the about popup"
        expanded={expanded === "about"}
        onChange={handleAccordionChange("about")}
      >
        <TextField multiline label="Build Number" textValue={textValues.about.build_number} />
      </Accordion>

      <Accordion
        header="Login Page"
        description="Translations for the login page"
        expanded={expanded === "login"}
        onChange={handleAccordionChange("login")}
      >
        <TextField label="Header" textValue={textValues.login.header} />
        <TextField multiline label="Loading Auth Methods" textValue={textValues.login.loading} />
        <TextField label="Email & Password" textValue={textValues.login.email_password} />
        <TextField label="Username & Password" textValue={textValues.login.username_password} />
        <TextField
          multiline
          label="Password Authentication Disabled"
          textValue={textValues.login.password_auth_disabled}
        />
        <TextField label="Login With" textValue={textValues.login.login_with} />
        <TextField multiline label="Logins Disabled" textValue={textValues.login.logins_disabled} />
        <TextField label="Logins Disabled Link Text" textValue={textValues.login.logins_disabled_link_text} />
        <Divider header="Password Authentication Dialog" />
        <TextField label="Username or Email" textValue={textValues.login.password_auth_dialog.username_or_email} />
        <TextField label="Password" textValue={textValues.login.password_auth_dialog.password} />
        <TextField label="Action Button" textValue={textValues.login.password_auth_dialog.action} />
      </Accordion>

      <Accordion
        header="Register Page"
        description="Translations for the register page"
        expanded={expanded === "register"}
        onChange={handleAccordionChange("register")}
      >
        <TextField label="Header" textValue={textValues.register.header} />
        <TextField label="Submit" textValue={textValues.register.submit} />
      </Accordion>

      <Accordion
        header="OAuth2 Page"
        description="Translations for the OAuth2 redirecting page"
        expanded={expanded === "oauth2"}
        onChange={handleAccordionChange("oauth2")}
      >
        <TextField multiline label="State Parameter Error" textValue={textValues.oauth2.state_param_error} />
        <TextField multiline label="Generic Error" textValue={textValues.oauth2.generic_error} />
      </Accordion>

      <Accordion
        header="Patreon Donors Page"
        description="Translations for the Patreon Donors page"
        expanded={expanded === "patreon_donors"}
        onChange={handleAccordionChange("patreon_donors")}
      >
        <TextField label="Profile Picture Alt" textValue={textValues.patreon_donors.pfp_alt} />
        <TextField label="Since Date" textValue={textValues.patreon_donors.since} />
        <Divider header="Subscribe Message" />
        <TextField multiline label="Description" textValue={textValues.patreon_donors.info.description} />
        <TextField label="Action Button" textValue={textValues.patreon_donors.info.action} />
      </Accordion>

      <Accordion
        header="Verify Profile Section"
        description="Translations for the verify section on the profile page"
        expanded={expanded === "profile.verify"}
        onChange={handleAccordionChange("profile.verify")}
      >
        <TextField label="Header" textValue={textValues.profile.verify.header} />
        <TextField label="Action" textValue={textValues.profile.verify.action} />
        <TextField label="Action (Disabled)" textValue={textValues.profile.verify.action_disabled} />
      </Accordion>

      <Accordion
        header="Profile Picture Section"
        description="Translations for the profile picture section on the profile page"
        expanded={expanded === "profile.pfp"}
        onChange={handleAccordionChange("profile.pfp")}
      >
        <TextField label="Header" textValue={textValues.profile.pfp.header} />

        <Divider header="Change Profile Picture" />

        <TextField label="Header" textValue={textValues.profile.pfp.change.header} />
        <TextField multiline label="Description" textValue={textValues.profile.pfp.change.description} />
        <TextField label="Select File" textValue={textValues.profile.pfp.change.select} />
        <TextField multiline label="Change Error" textValue={textValues.profile.pfp.change.error} />
        <TextField multiline label="Change Success" textValue={textValues.profile.pfp.change.success} />

        <Divider header="Selected Profile Picture File" />

        <TextField label="Description" textValue={textValues.profile.pfp.change.selected_file.description} />
        <TextField label="No File Selected" textValue={textValues.profile.pfp.change.selected_file.none} />
      </Accordion>

      <Accordion
        header="Profile Data Section"
        description="Translations for the profile data section on the profile page"
        expanded={expanded === "profile.data"}
        onChange={handleAccordionChange("profile.data")}
      >
        <TextField label="Header" textValue={textValues.profile.data.header} />
        <TextField label="Email Not Verified" textValue={textValues.profile.data.email_not_verified} />
        <TextField label="User ID" textValue={textValues.profile.data.user_id} />
        <TextField label="Created" textValue={textValues.profile.data.created} />
        <TextField label="Admin Account" textValue={textValues.profile.data.admin_account} />

        <Divider header="Raw Profile Data Popup" />

        <TextField label="Header" textValue={textValues.profile.data.json_info.header} />
        <TextField label="Action" textValue={textValues.profile.data.json_info.action} />
      </Accordion>

      <Accordion
        header="Profile Email Preferences Section"
        description="Translations for the email preferences section on the profile page"
        expanded={expanded === "profile.email_prefs"}
        onChange={handleAccordionChange("profile.email_prefs")}
      >
        <TextField label="Header" textValue={textValues.profile.email_prefs.header} />
        <TextField label="Account Updates" textValue={textValues.profile.email_prefs.account_updates} />
        <TextField label="Website Updates" textValue={textValues.profile.email_prefs.website_updates} />
      </Accordion>

      <Accordion
        header="Profile Reset Section"
        description="Translations for the reset section on the profile page"
        expanded={expanded === "profile.reset"}
        onChange={handleAccordionChange("profile.reset")}
      >
        <TextField label="Header" textValue={textValues.profile.reset.header} />

        <Divider header="Reset Email" />

        <TextField label="Action" textValue={textValues.profile.reset.email.action} />
        <TextField label="Action Disabled" textValue={textValues.profile.reset.email.disabled} />
        <TextField label="Dialog Header" textValue={textValues.profile.reset.email.dialog.header} />
        <TextField label="Dialog Label" textValue={textValues.profile.reset.email.dialog.label} />
        <TextField label="Dialog Action" textValue={textValues.profile.reset.email.dialog.send} />

        <Divider header="Reset Password" />

        <TextField label="Action" textValue={textValues.profile.reset.password.action} />
        <TextField label="Action Disabled" textValue={textValues.profile.reset.password.disabled} />
      </Accordion>

      <Accordion
        header="Profile Logout Section"
        description="Translations for the logout section on the profile page"
        expanded={expanded === "profile.logout"}
        onChange={handleAccordionChange("profile.logout")}
      >
        <TextField label="Action" textValue={textValues.profile.logout.action} />
        <TextField multiline label="Success" textValue={textValues.profile.logout.success} />
      </Accordion>

      <Accordion
        header="Profile Delete Section"
        description="Translations for the delete section on the profile page"
        expanded={expanded === "profile.delete"}
        onChange={handleAccordionChange("profile.delete")}
      >
        <TextField label="Action" textValue={textValues.profile.delete.action} />
        <TextField label="Delete Success" textValue={textValues.profile.delete.success} />

        <Divider header="Delete Dialog" />

        <TextField label="Header" textValue={textValues.profile.delete.dialog.header} />
        <TextField multiline label="Description" textValue={textValues.profile.delete.dialog.description} />
        <TextField label="Invalid Password" textValue={textValues.profile.delete.dialog.invalid_password} />
      </Accordion>

      <Accordion
        header="Settings Page"
        description="Translations for the settings page"
        expanded={expanded === "settings"}
        onChange={handleAccordionChange("settings")}
      >
        <TextField label="Autoplay" textValue={textValues.settings.autoplay} />
        <Divider header="Account settings popup" />
        <TextField label="Description" textValue={textValues.settings.account_settings.description} />
        <TextField label="Description Link Text" textValue={textValues.settings.account_settings.link_text} />
      </Accordion>

      <Accordion
        header="Downloads Page"
        description="General translations for the download page"
        expanded={expanded === "downloads"}
        onChange={handleAccordionChange("downloads")}
      >
        <TextField label="Download Item Image Alt" textValue={textValues.downloads.link_image_alt} />
      </Accordion>

      <Accordion
        header="Specific Episode Link"
        description="Translations for the specific episode link on the download page"
        expanded={expanded === "downloads.specific_episode_link"}
        onChange={handleAccordionChange("downloads.specific_episode_link")}
      >
        <TextField label="Name" textValue={textValues.downloads.specific_episode_link.name} />
        <TextField multiline label="Description" textValue={textValues.downloads.specific_episode_link.description} />
      </Accordion>

      <Accordion
        header="TUAA Downloader Link"
        description="Translations for the TUAA Downloader link on the download page"
        expanded={expanded === "downloads.tuaa_downloader_link"}
        onChange={handleAccordionChange("downloads.tuaa_downloader_link")}
      >
        <TextField label="Name" textValue={textValues.downloads.tuaa_downloader_link.name} />
        <TextField multiline label="Description" textValue={textValues.downloads.tuaa_downloader_link.description} />
      </Accordion>
    </Layout>
  );
};

export default TranslateWebsite;
