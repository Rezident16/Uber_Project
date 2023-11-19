// Read User
// Delete User
// Update User

const LOAD_USER = 'users/LOAD_USER'
const DELETE_USER = 'users/DELETE_USER'
const UPDATE_USER = 'users/UPDATE_USER'

export const loadUser = (user) => ({
    type: LOAD_USER,
    user
}) 

export const deleteUser = (id) => ({
    type: DELETE_USER,
    id
})

export const updateUser = (user) => ({
    type: UPDATE_USER,
    user
})

// THUNKS

// READ USER
// DELETE
// UPDATE
// CREATE
