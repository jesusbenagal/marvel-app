export const apiRoutes = {
  base:
    import.meta.env.VITE_MODE === "development"
      ? "http://gateway.marvel.com/v1/public"
      : "https://gateway.marvel.com/v1/public",
  characters: {
    base: "/characters",
    comics: "/comics",
  },
};
