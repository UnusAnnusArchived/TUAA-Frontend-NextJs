import enLang from "@/i18n/en";
import { Language } from "@/i18n/_i18n";

export type Layout<P = undefined> = (props: {
  children: React.ReactNode;
  params: P;
}) => JSX.Element | Promise<JSX.Element>;

export interface IError<T = any> {
  location: string;
  error: T;
}
