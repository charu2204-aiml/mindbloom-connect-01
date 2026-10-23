import { createContext, useContext } from "react";
import { siteText, type SiteText } from "@/data/site-text";

export const SiteTextContext = createContext<SiteText>(siteText.en);
export const useSiteText = () => useContext(SiteTextContext);
