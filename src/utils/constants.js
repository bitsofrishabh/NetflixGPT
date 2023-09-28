export const UserAvatar =
  "https://avatars.githubusercontent.com/u/24289526?v=4";

export const LOGO = "https://www.freepnglogos.com/uploads/netflix-logo-0.png";

export const IMG_CDN_URL = "https://image.tmdb.org/t/p/w500";

export const API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: "Bearer " + process.env.REACT_APP_TMDB_KEY,
  },
};
