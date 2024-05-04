export const DB_NAME = "todo_app";

export const option = {
    httpOnly: true,
    secure: true,
    sameSite: "Lax",
    expires: new Date(new Date().getTime() + 10*24*60*60*1000)
}