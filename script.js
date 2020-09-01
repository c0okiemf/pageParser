// parsing

let makeWordCountArray = () =>
    mapToSortedArray(
        [...document.querySelectorAll("*")].reduce((map, el) => {
            if (el.tagName !== "SCRIPT" && el.innerText !== undefined) {
                el.innerText.split(" ").forEach(word => {
                    if (word.match(/[a-zA-Z]+/) !== null) {
                        if (map[word] !== undefined) {
                            map[word] += 1
                        } else {
                            map[word] = 1
                        }
                    }
                })
            }
            return map
        }, {})
    )

let mapToSortedArray = (map) =>
    Object.keys(map)
        .reduce((arr, key) => {
            arr.push([key, map[key]])
            return arr
        }, [])
        .sort(
            (a, b) =>
                a[1] - b[1]
        )

let makeLinksArray = () =>
    mapToSortedArray(
        [...document.querySelectorAll("a")].reduce((linksMap, el) => {
            if (linksMap[el.href] !== undefined) {
                linksMap[el.href] += 1
            } else {
                linksMap[el.href] = 1
            }
            return linksMap
        }, {})
    )

let makeBackgroundImagesArray = () =>
    mapToSortedArray(
        [...document.querySelectorAll("*")].reduce((linksMap, el) => {
            let computed = window.getComputedStyle(el)
            if (typeof computed.backgroundImage === "string") {
                Array.from(
                    computed.backgroundImage.matchAll(/url\("(.*?)"\)/g),
                    matches => matches.forEach((match, i) => {
                        if (i !== 0) {
                            if (linksMap[match] !== undefined) {
                                linksMap[match] += 1
                            } else {
                                linksMap[match] = 1
                            }
                        }
                    })
                )
            }
            return linksMap
        }, {})
    )

// html

let createDiv = () =>
    document.createElement("div")

let countTableHtml = (items, header, itemName) =>
    header
    + `<table style="${tableStyle()}">
        <tr>
            <th style="${thStyle()}">
                ${itemName}
            </th>
            <th style="${thStyle()}">
                Count
            </th>
        </tr>`
        + items.reduce((html, item) => {
            html += `
                    <tr style="${trTdStyle()}">
                        <td style="${trTdStyle()}">
                            ${item[0]}
                        </td>
                        <td style="${trTdStyle()}">
                            ${item[1]}
                        </td>
                    </tr>
                `
            return html
        }, "")
    + `</table>`

let wordsHtml = (words) =>
    countTableHtml(words, wordsHeader(), "Word")

let wordsHeader = () =>
    `<h1 style="${h1Style()}">Word Count</h1>`

let linksHtml = (links) =>
    countTableHtml(links, linksHeader(), "Link")

let linksHeader = () =>
    `<h1 style="${h1Style()}">Links</h1>`

let imagesHtml = (images) =>
    countTableHtml(
        images.map(img => [imgHtml(img[0]), img[1]]),
        imagesHeader(),
        "Image"
    )

let imgHtml = (img) =>
    `<img src="${img}" style="${imgStyle()}"/>`

let imagesHeader = () =>
    `<h1 style="${h1Style()}">Images</h1>`

// style

let h1Style = () =>
    `
        text-align: center;
        color: white;
    `

let tableStyle = () =>
    `
        border: 1px solid black;
        border-collapse: collapse;
        color: white;
    `

let trTdStyle = () =>
    `
        border: 1px solid black;
    `

let thStyle = () =>
    trTdStyle() + `
        font-weight: bold;
    `

let singleBlockStyle = () =>
    `
        max-height: 1000px;
        overflow-y: auto;
        box-shadow: black 0 0 10px;
        width: fit-content;
        margin: 20px 40px;
        padding: 20px;
        display: inline-block;
    `

let imgStyle = () =>
    `
        height: 200px;
    `

let mainElementStyle = () =>
    `
        background: #3c3c42;
        height: auto;
        width: auto;
        min-height: 100%;
    `

let main = () => {

    let mainElement = createDiv(),
        countElement = createDiv(),
        linksElement = createDiv(),
        imgElement = createDiv()

    mainElement.style = mainElementStyle()
    countElement.style = singleBlockStyle()
    linksElement.style = singleBlockStyle()
    imgElement.style = singleBlockStyle()

    countElement.innerHTML = wordsHtml( makeWordCountArray())
    linksElement.innerHTML = linksHtml(makeLinksArray())
    imgElement.innerHTML = imagesHtml(makeBackgroundImagesArray())

    mainElement.appendChild(countElement)
    mainElement.appendChild(linksElement)
    mainElement.appendChild(imgElement)

    let newWindow = window.open("")
    newWindow.document.body.appendChild(mainElement)
    newWindow.document.close()
}

main()
