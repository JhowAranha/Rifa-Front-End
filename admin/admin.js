import Grid from "../grid.js"
import { getData } from "../db-functions.js"
import { createConnection } from "../sockets.js"

async function initializeLogin() {
    document.body.innerHTML = `
        <div class="m-auto">
            <h1 class="text-white text-3xl mb-4">Admin Login</h1>
            <input type="text" id="admin-username" class="bg-stone-300 p-2 mb-4 w-full" placeholder="Enter admin username">
            <input type="password" id="admin-password" class="bg-stone-300 p-2 mb-4 w-full" placeholder="Enter admin password">
            <button id="login-btn" class="bg-stone-300 p-2 w-full">Login</button>
        </div>
    `
    const loginBtn = document.getElementById("login-btn")
    const passwordInput = document.getElementById("admin-password")
    const usernameInput = document.getElementById("admin-username")

    async function verifyLogin(username, password) {
        const url = "https://rifa-backend-go.onrender.com/login"
        // const url = "http://localhost:3000/login"
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ username: username, password: password })
        })
        return (await response)
    }

    loginBtn.addEventListener("click", async () => {
        const password = passwordInput.value
        const username = usernameInput.value

        const response = await verifyLogin(username, password)
        const check = await response.json()
        console.log(check)
        if (check === true) {
            alert("Login successful!")
            initializeAdmin()
        } else {
            alert("Invalid credentials. Please try again.")
        }
    })
}

async function initializeAdmin() {
    
    console.log("Admin JS loaded")

    createConnection()

    document.body.innerHTML = `
        <div>
            <input type="number" name="" id="num-input" class="bg-stone-300 w-20 p-2">
            <button id="toggle-btn" class="bg-stone-300 p-2">Toggle</button>
        </div>
        <div id="grid" class="bg-black w-[350px] md:w-[480px] rounded gap-0 grid grid-flow-row absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] font-[verdana] text-center"></div>
    `

    // async function getData() {
    //     const response = await fetch("https://rifa-diik.onrender.com/get")
    //     return (await response.json())
    // }

    async function alterCell(id) {
        const url = "https://rifa-backend-go.onrender.com/toggle"
        // const url = "http://localhost:3000/toggle"
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ id: id })
        })
        return (await response.json())
    }

    const numList = (await getData()).data
    console.log(numList)

    const toggleBtn = document.getElementById("toggle-btn")
    const numInput = document.getElementById("num-input")

    if (numList) {
        Grid(numList).updateGrid()

        toggleBtn.addEventListener("click", async () => {
            const numId = parseInt(numInput.value)
            if (isNaN(numId)) {
                alert("Please enter a valid number ID")
                return
            }
            const result = await alterCell(numId)
            console.log(result)
            const updatedData = (await getData()).data
            Grid(updatedData).updateGrid()
        })
    }
}

initializeLogin()
// initializeAdmin()
