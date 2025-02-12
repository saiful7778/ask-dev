import Document from "@tiptap/extension-document";
import Underline from "@tiptap/extension-underline";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import Bold from "@tiptap/extension-bold";
import Italic from "@tiptap/extension-italic";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import ListItem from "@tiptap/extension-list-item";
import HardBreak from "@tiptap/extension-hard-break";
import Heading from "@tiptap/extension-heading";
import Code from "@tiptap/extension-code";
import Highlight from "@tiptap/extension-highlight";
import Placeholder from "@tiptap/extension-placeholder";
import Link from "@tiptap/extension-link";
import { type Extensions } from "@tiptap/react";
import { CodeBlockLowlight } from "@tiptap/extension-code-block-lowlight";
import { all, createLowlight } from "lowlight";
import "highlight.js/styles/github-dark.min.css";

const lowlight = createLowlight(all);

const CustomHeading = Heading.extend({
  addAttributes() {
    return {
      level: {
        default: 2, // Default heading level (H2)
        parseHTML: (element) => element.tagName[1], // Extract level from tag (H2 -> 2)
        renderHTML: (attributes) => ({
          [`data-heading`]: attributes.level,
        }),
      },
      class: {
        default: null, // Custom classes applied dynamically
        parseHTML: (element) => element.getAttribute("class"),
        renderHTML: (attributes) => {
          const classes: Record<number, string> = {
            2: "text-3xl font-bold",
            3: "text-2xl font-semibold",
            4: "text-xl font-medium",
          };

          return {
            class: classes[attributes.level] || "text-xl font-bold",
          };
        },
      },
    };
  },
});

const LinkConfigure = Link.configure({
  openOnClick: false,
  autolink: true,
  defaultProtocol: "https",
  protocols: ["http", "https"],
  HTMLAttributes: {
    class: "text-blue-500 underline hover:text-blue-400 cursor-pointer",
  },
  isAllowedUri: (url, ctx) => {
    try {
      // construct URL
      const parsedUrl = url.includes(":")
        ? new URL(url)
        : new URL(`${ctx.defaultProtocol}://${url}`);

      // use default validation
      if (!ctx.defaultValidate(parsedUrl.href)) {
        return false;
      }

      // disallowed protocols
      const disallowedProtocols = ["ftp", "file", "mailto"];
      const protocol = parsedUrl.protocol.replace(":", "");

      if (disallowedProtocols.includes(protocol)) {
        return false;
      }

      // only allow protocols specified in ctx.protocols
      const allowedProtocols = ctx.protocols.map((p) =>
        typeof p === "string" ? p : p.scheme,
      );

      if (!allowedProtocols.includes(protocol)) {
        return false;
      }

      // disallowed domains
      const disallowedDomains = ["example-phishing.com", "malicious-site.net"];
      const domain = parsedUrl.hostname;

      if (disallowedDomains.includes(domain)) {
        return false;
      }

      // all checks have passed
      return true;
    } catch {
      return false;
    }
  },
  shouldAutoLink: (url) => {
    try {
      // construct URL
      const parsedUrl = url.includes(":")
        ? new URL(url)
        : new URL(`https://${url}`);

      // only auto-link if the domain is not in the disallowed list
      const disallowedDomains = ["example-no-autolink.com"];
      const domain = parsedUrl.hostname;

      return !disallowedDomains.includes(domain);
    } catch {
      return false;
    }
  },
});

export default function getAllExtensions(
  placeholder?: string | undefined,
): Extensions {
  return [
    Document.configure(),
    Paragraph.configure(),
    Text.configure(),
    Placeholder.configure({
      placeholder: placeholder || "Write something...",
    }),
    LinkConfigure,
    CodeBlockLowlight.configure({
      lowlight,
      HTMLAttributes: {
        class: "text-sm p-3 rounded-md bg-background",
      },
      languageClassPrefix: "language-",
      defaultLanguage: "typescript",
    }),
    Bold.configure({
      HTMLAttributes: {
        tag: "strong",
        class: "font-bold",
      },
    }),
    Italic.configure({
      HTMLAttributes: {
        tag: "em",
        class: "italic",
      },
    }),
    BulletList.configure({
      HTMLAttributes: {
        tag: "ul",
        class: "list-disc ml-4",
      },
    }),
    OrderedList.configure({
      HTMLAttributes: {
        class: "list-decimal ml-4",
      },
    }),
    ListItem.configure({
      HTMLAttributes: {
        tag: "li",
      },
    }),
    Underline.configure({
      HTMLAttributes: {
        tag: "u",
        class: "underline",
      },
    }),
    HardBreak.configure({
      HTMLAttributes: {
        tag: "br",
      },
    }),
    CustomHeading.configure({
      levels: [2, 3, 4],
    }),
    Code.configure({
      HTMLAttributes: {
        class: "bg-gray-800 text-white px-2 py-1 rounded font-mono text-sm",
      },
    }),
    Highlight.configure({
      HTMLAttributes: {
        class: "bg-yellow-200 text-black px-1 py-1 text-sm rounded",
      },
    }),
  ];
}
