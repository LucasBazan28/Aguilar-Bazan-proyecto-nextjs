import React from 'react'

const UsersPage = async () => {
    interface User {
        id: number
        name: string
    }
    const response = await fetch('https://jsonplaceholder.typicode.com/users', {cache: "no-store"})
    const users: User[] = await response.json()


    return (
        <>
        <div>Log In</div>
        //Formulario Login
        </>
    )
}

export default UsersPage