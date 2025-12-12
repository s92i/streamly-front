import { Link } from "lucide-react";
import {
  FaDiscord,
  FaFacebook,
  FaGithub,
  FaInstagram,
  FaLinkedin,
  FaSnapchat,
  FaTelegram,
  FaTiktok,
  FaYoutube,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export function getSocialIcon(url: string) {
  switch (true) {
    case url.includes("t.me"):
      return FaTelegram;
    case url.includes("youtube.com") || url.includes("youtu.be"):
      return FaYoutube;
    case url.includes("x.com"):
      return FaXTwitter;
    case url.includes("discord.com") || url.includes("discord.gg"):
      return FaDiscord;
    case url.includes("tiktok.com"):
      return FaTiktok;
    case url.includes("facebook.com"):
      return FaFacebook;
    case url.includes("instragm.com"):
      return FaInstagram;
    case url.includes("snapchat.com"):
      return FaSnapchat;
    case url.includes("github.com"):
      return FaGithub;
    case url.includes("linkedin.com"):
      return FaLinkedin;
    default:
      return Link;
  }
}
