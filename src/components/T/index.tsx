// The only reason for this component is to supress hydration warnings! Translations can be used without this as needed, but will need to have supressHydrationWarning on the component.

interface IProps {
  children: string;
}

const T: React.FC<IProps> = ({ children }) => {
  return <span suppressHydrationWarning>{children}</span>;
};

export default T;
