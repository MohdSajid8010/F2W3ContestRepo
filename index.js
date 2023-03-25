console.log("before");
const puppeteer = require("puppeteer");
async function extract_data() {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto("https://github.com/trending/javascript?since=daily");

    let arrOfObj = await page.evaluate(function () {

        // let url_arr=Array.from(document.querySelectorAll(".Box-row h1>a").href);




        let star_arr = Array.from(document.querySelectorAll(".Box-row .f6 a:nth-of-type(2)"));
        let star = [];
        star_arr.forEach(function (val) {
            star.push(val.textContent.trim());
        })

        let star_ = star.filter(function (val) {
            return val !== '';
        })


        let fork_arr = Array.from(document.querySelectorAll(".Box-row .f6 a:nth-of-type(1)"));
        let fork = [];
        fork_arr.forEach(function (val) {
            fork.push(val.textContent.trim());
        })

        let fork_ = fork.filter(function (val) {
            return val !== '';
        })

        let language_arr = Array.from(document.querySelectorAll(".repo-language-color+span"));
        let language = [];
        language_arr.forEach(function (val) {
            language.push(val.textContent.trim());
        })



        let descrip_arr = Array.from(document.querySelectorAll(".Box-row p"));

        let descrip = [];
        descrip_arr.forEach(function (val) {
            descrip.push(val.textContent.trim());
        })





        let title_arr = Array.from(document.querySelectorAll(".Box-row h1 a"));

        let title = [];
        title_arr.forEach(function (val) {
            title.push(val.textContent.trim());
        })

        let arrOfObj = [];
        for (let i = 0; i < 25; i++) {
            let obj = {
                title: title[i],
                description: descrip[i],
                stars: star_[i],
                forks: fork_[i],
                language: language[i]
            }
            arrOfObj.push(obj);
        }
        return arrOfObj;

    })

    console.log(" arrOfObj is:", arrOfObj);


    // await browser.close();


    const fs = require("fs");
    fs.writeFile("users.json", JSON.stringify(arrOfObj), err => {

        // Checking for errors
        if (err) throw err;

        console.log("Done writing"); // Success
    });

}

extract_data();
console.log("After");
