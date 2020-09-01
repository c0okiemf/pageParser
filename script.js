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
    [...document.querySelectorAll("a")].map(el => el.href)

let makeBackgroundImagesArray = () =>
    [...document.querySelectorAll("*")].reduce((links, el) => {
        let computed = window.getComputedStyle(el)
        if (typeof computed.backgroundImage === "string") {
            Array.from(
                computed.backgroundImage.matchAll(/url\("(.*?)"\)/g),
                matches => matches.forEach((match, i) => {
                    if (i !== 0) {
                        links.push(match)
                    }
                })
            )
        }
        return links
    }, [])

let createDiv = () =>
    document.createElement("div")

let wordCountHtml = (words) =>
    `<h1 style="${h1Style()}">Word Count</h1>
    <table style="${wordCountTableStyle()}">
        <tr>
            <th style="${wordCountThStyle()}">
                Word
            </th>
            <th style="${wordCountThStyle()}">
                Count
            </th>
        </tr>`
        + words.reduce((html, word) => {
            html += `
                    <tr style="${wordCountTrTdStyle()}">
                        <td style="${wordCountTrTdStyle()}">
                            ${word[0]}
                        </td>
                        <td style="${wordCountTrTdStyle()}">
                            ${word[1]}
                        </td>
                    </tr>
                `
            return html
        }, "")
    + `</table>`

let h1Style = () =>
    `
        text-align: center;
    `

let wordCountTableStyle = () =>
    `
        border: 1px solid black;
        border-collapse: collapse;
    `

let wordCountTrTdStyle = () =>
    `
        border: 1px solid black;
    `

let wordCountThStyle = () =>
    wordCountTrTdStyle() + `
        font-weight: bold;
    `

let singleBlockStyle = () =>
    `
        max-height: 1000px;
        overflow-y: auto;
        box-shadow: black 0px 0px 10px;
        width: fit-content;
        margin: 20px 40px;
        padding: 20px;
        display: inline-block;
    `

let wordCountStyle = () =>
    singleBlockStyle()
    + `
        float: left;
    `

let linksStyle = () =>
    singleBlockStyle()
    + `
        float: right;
    `

let imagesBlockStyle = () =>
    singleBlockStyle()
    + `
        width: 80%;
        background: gray;
        display: block;
        margin: 20px auto;
    `

let linksHtml = (links) =>
    `<h1 style="${h1Style()}">Links</h1>
    <table>`
    + links.reduce((html, link) => {
        html += `
                <tr>
                    <td>
                        ${link}
                    </td>
                </tr>
            `
        return html
    }, "")
    + "</table>"

let imagesHtml = (images) =>
    `<h1 style="${h1Style()}">Background Images</h1>`
    + images.reduce((html, image) => {
        html += `
                <div>
                    <img src="${image}"/>
                </div>
            `
        return html
    }, "")

let main = () => {

    let words = makeWordCountArray(),
        links = makeLinksArray(),
        images = makeBackgroundImagesArray(),

        mainElement = createDiv(),
        countElement = createDiv(),
        linksElement = createDiv(),
        imgElement = createDiv()

    countElement.style = wordCountStyle()
    linksElement.style = linksStyle()
    imgElement.style = imagesBlockStyle()

    countElement.innerHTML = wordCountHtml(words)
    linksElement.innerHTML = linksHtml(links)
    imgElement.innerHTML = imagesHtml(images)

    mainElement.appendChild(countElement)
    mainElement.appendChild(linksElement)
    mainElement.appendChild(imgElement)

    let newWindow = window.open("")
    newWindow.document.body.appendChild(mainElement)
    newWindow.document.close()
}

main()
