// Utility Functions

const getElement = (selector) => document.querySelector(selector)
const getAllElements = (selector) => document.querySelectorAll(selector)

// Get DOM Elements

const topContainer = getElement('.top-container')
const inputs = getAllElements('.top-container>input')
const button = getElement('.btn')
const errorText = getElement('.error-text')
const infoContainer = getElement('.info-container')

// Event Listeners

button.addEventListener('click', function () {
    errorText.textContent = ''
    let allInputsValid = true
    let counter = 0
    const allInputsArray = []

    inputs.forEach(inputField => {
        const inputValue = inputField.value
        if (!validateAllInfo(inputValue, counter)) {
            allInputsValid = false
        } else {
            allInputsArray.push([inputValue])
            counter++
        }
    })

    if (allInputsValid) {
        createAndRenderElements(allInputsArray)
    }
})

// Custom Data Handling Functions

function validateAllInfo(inputValue, index) {

    if (index === 0) {
        if (!validateInputLength(inputValue.length, 12, 'First Name')) {
            return false
        }
    }

    if (index === 1) {
        if (!validateInputLength(inputValue.length, 12, 'Last Name')) {
            return false
        }
    }

    if (index === 2) {
        if (!validateInputLength(inputValue.length, 25, 'Country')) {
            return false
        }
    }

    if (index === 3) {
        if (!validateInputLength(inputValue.length, 3, 'Score')) {
            return false
        }
    }

    if (inputValue.trim() === '') {
        errorText.classList.remove('invisible')
        errorText.textContent = 'Fill all fields!'
        return false
    }

    if (index !== 3) {
        if (!/^[a-zA-Z]+$/.test(inputValue)) {
            errorText.classList.remove('invisible')
            errorText.textContent = 'Numbers are only allowed in the Score field. Special symbols are also not allowed!'
            return false
        }
    }

    if (index === 3) {
        if (!/^[0-9]+$/.test(inputValue)) {
            errorText.classList.remove('invisible')
            errorText.textContent = 'Special characters are not allowed!'
            return false
        }
    }

    return true
}

function validateInputLength(length, maxLength, name) {
    if (length > maxLength) {
        errorText.classList.remove('invisible')
        errorText.textContent = `Enter less than ${maxLength + 1} characters in ${name} input field!`
        return false
    }

    return true
}

const create = (tag, attributes = {}, children = [], classes = [], value = '') => {

    const element = document.createElement(tag)

    // Set the attributes
    for (const [key, value] of Object.entries(attributes)) {
        element.setAttribute(key, value)
    }

    // Append children
    children.forEach(child => {
        element.appendChild(child)
    })

    // Set classes
    classes.forEach(customClass => {
        element.classList.add(customClass)
    })

    // Set text content
    if (value !== '') {
        element.textContent = value
    }

    return element
}

function createAndRenderElements(allInputsArray) {

    const infoRow = create('div', {}, [
        create('div', {}, [
            create('p', {}, [], ['name'], allInputsArray[0] + ' ' + allInputsArray[1]),
            create('p', {}, [], ['date'], getDate())
        ], ['name-container']),
        create('p', {}, [], ['country'], allInputsArray[2]),
        create('p', {}, [], ['score'], allInputsArray[3]),
        create('div', {}, [
            create('div', {}, [
                create('img', { src: 'images/delete.png' }, [], ['delete-icon'])
            ], ['circular-icon']),
            create('div', {}, [], ['circular-icon'], '+5'),
            create('div', {}, [], ['circular-icon'], '-5')
        ], ['container-of-icons'])
    ], ['grid-container'])

    const deleteIcon = infoRow.querySelector('.circular-icon:first-child')
    deleteIcon.addEventListener('click', function () {
        infoContainer.removeChild(infoRow)
    })

    const scoreElement = infoRow.querySelector('.score')

    const plusFiveIcon = infoRow.querySelector('.circular-icon:nth-child(2)')
    plusFiveIcon.addEventListener('click', function () {
        const addScore = Number(plusFiveIcon.textContent.slice(1))
        const newScoreValue = Number(scoreElement.textContent) + addScore
        scoreElement.textContent = newScoreValue
    })

    const minusFiveIcon = infoRow.querySelector('.circular-icon:nth-child(3)')
    minusFiveIcon.addEventListener('click', function () {
        const subtractScore = Number(minusFiveIcon.textContent.slice(1))
        const newScoreValue = Number(scoreElement.textContent) - subtractScore
        scoreElement.textContent = newScoreValue
    })

    infoContainer.appendChild(infoRow)
}

function getDate() {
    const now = new Date()
    const monthIndex = now.getMonth()
    const allMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    const month = allMonths[monthIndex].toString().toUpperCase()
    const date = now.getDate()
    const year = now.getFullYear()
    const hour = now.getHours().toString().padStart(2, '0')
    const minute = now.getMinutes().toString().padStart(2, '0')

    return `${month} ${date}, ${year} ${hour}:${minute}`
}