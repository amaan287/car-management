import React from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Dock, DockIcon } from "@/components/magicui/dock";
import { InstagramLogoIcon } from "@radix-ui/react-icons";
import { FaWhatsapp, FaYoutube } from "react-icons/fa";
import { Mail } from "lucide-react";

export type IconProps = React.HTMLAttributes<SVGElement>;

const DATA = {
  contact: {
    social: {
      Youtube: {
        name: "Youtube",
        url: "https://youtube.com/@priyanshsoniii?si=OM8ZFk-Q3OF3ERlB",
        icon: FaYoutube,
      },
      Instagram: {
        name: "Instagram",
        url: "https://www.instagram.com/priyanshsoniii/",
        icon: InstagramLogoIcon,
      },
      Whatsapp: {
        name: "Whatsapp",
        url: "#",
        icon: FaWhatsapp,
      },
      email: {
        name: "Send Email",
        url: "https://mail.google.com/mail/u/0/#inbox?compose=GTvVlcSKjgCQbcxnCJLLJlkzDlbpNPMKMrbCckKbXlVSmKrhDkFnlkhVFTQtSTXdpJSSjxHRdWnWS",
        icon: Mail,
      },
    },
  },
};

export function DockD() {
  return (
    <div className="relative flex h-full w-[95vw] flex-col items-center justify-center overflow-hidden   bg-transparent   py-3">
      <TooltipProvider>
        <Dock
          direction="middle"
          className="w-64 bg-background border-primary flex items-center justify-center "
        >
          {Object.entries(DATA.contact.social).map(([name, social]) => (
            <DockIcon key={name}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    to={social.url}
                    className={cn(
                      buttonVariants({ variant: "ghost", size: "icon" }),
                      "size-12 rounded-full"
                    )}
                  >
                    <social.icon className="size-5" />
                  </Link>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{name}</p>
                </TooltipContent>
              </Tooltip>
            </DockIcon>
          ))}
        </Dock>
      </TooltipProvider>
    </div>
  );
}
