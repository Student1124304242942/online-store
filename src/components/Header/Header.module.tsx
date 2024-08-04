import { HTMLAttributes } from "react";

export interface HeaderElement extends HTMLAttributes<HTMLHeadingElement>{
    children: string | number;
}