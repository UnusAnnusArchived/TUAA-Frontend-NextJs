const useIsServer = () => {
  return typeof document === "undefined";
};

export default useIsServer;
