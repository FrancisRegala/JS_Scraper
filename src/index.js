// your task is to grap the title , total ratings , star rating and
// price and image url form the "html.txt" file
// this file contains the html structure of
// https://www.amazon.com/s?me=A1W0QC6JE0QLDF&marketplaceID=ATVPDKIKX0DER
// once these details are collected create a csv file for it
// click on the fork button to create a copy and write your own code.
// once you are done with the task share the code and the csv file with us

import * as cheerio from "cheerio";
import * as fs from "fs";

const $ = cheerio.load(fs.readFileSync("html.txt"));

// console.log(fs);

console.log($(".s-result-list").find(".s-image"));

const result = $(".s-result-list").find(".s-image");
console.log(result);
// let writeStream = fs.createWriteStream('my.csv')

const output = [];
for (let index = 0; index < result.length; index++) {
  // console.log($(".s-result-list").find("a > span.a-size-base")[index]);
  const newItem = {
    title: result[index].attribs.alt,
    src: result[index].attribs.src,
    price:
      $(".s-result-list").find(".a-price > span.a-offscreen")[index].children[0]
        .data ?? "",
    total_ratings:
      $(".s-result-list").find("span > a > span.a-size-base")[index]
        ?.children[0]?.data ?? "",
    star_ratings:
      $(".s-result-list").find(".a-icon-star-small > span")[index]?.children[0]
        ?.data ?? ""
  };
  // console.log(newItem);
  output.push(newItem);
}

console.log($(".s-result-list").find("span > a > span.a-size-base"));

let data = "This is a file containing a collection of movies.";

fs.writeFileSync(
  "books.txt",
  data,
  {
    encoding: "utf8",
    flag: "w",
    mode: 0o666
  },
  (err) => {
    if (err) console.log(err);
    else {
      console.log("File written successfully\n");
      console.log("The written has the following contents:");
      // console.log(fs.readFileSync("books.txt", "utf8"));
    }
  }
);
