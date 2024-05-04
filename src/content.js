export const DB_NAME = "todo_app";

export const option = {
    httpOnly: true,
    secure: true,
    sameSite: "Lax",
    expires: new Date(Date.now() + 900000)
}