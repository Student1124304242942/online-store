import { HTMLProps} from "react";

export interface SideHeadProps extends HTMLProps<HTMLHeadingElement | HTMLParagraphElement> {
    children: string;
    userContact: string;
}