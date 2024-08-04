import { HtmlHTMLAttributes } from "react";

export interface LinksProps extends HtmlHTMLAttributes<HTMLLinkElement>{
    firstLink: string;
    secondLink: string;
    link: string;
}