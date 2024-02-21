interface IProps {
  children: string;
}

/**
 * **The only reason for this component is to supress hydration warnings!** Translations can be used without this as needed, but will need to have the `supressHydrationWarning` attribute on the component.
 */
const T: React.FC<IProps> = ({ children }) => {
  return <span suppressHydrationWarning>{children}</span>;
};

export default T;
