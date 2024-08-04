import { LinkHTMLAttributes, ReactNode } from "react";

export interface LinkBtnParentChildren extends LinkHTMLAttributes<HTMLLinkElement>{
    children: ReactNode;
}