// Access env variable from import.meta.env and prefix the variable using VITE_....
let url: string = import.meta.env.VITE_HOST ? "/api" : "http://localhost:3000/api"
console.log("Base Url: ", url);
export const BaseUrl: string = url;
