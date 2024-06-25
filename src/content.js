export const DB_NAME = "todo_app";

export const option = {
    httpOnly: true,
    secure: true,
    sameSite: "Lax",
    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)  
}