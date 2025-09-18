
export const AuthConstants = {
    Error: {
        InternalServerErrorLogin: "There was an error while login the user",
        InternalServerErrorLogout: "There was an error while logout",
        InternalServerErrorRegister: "There was an error while registering the user",
        InternalServerErrorRoles: "There was an error while fetching the Roles",
        UnauthorizedError: "The provided data is incorrect",
        UnauthorizedErrorAdminKey: "Admin key is incorrect",
        ConflictError: "The username is not available, try another one",
        NotFoundErrorRoles: "No Roles data found",
        NotFoundErrorRoleById: "The selected role does not exist"
    },
    Success: {
        SuccessfullRegistration: "User succesfully registered"
    }
}