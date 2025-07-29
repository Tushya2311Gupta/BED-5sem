// Accessing DOM elements

/**
 * 1) Using id
 * 2) Using class  
 * 3) Using tag
 * 4) querySelector / querySelectorAll
 */

let ele1 = document.getElementById("main-heading");
console.log("getElementById:", ele1);


let ele2 = document.getElementsByClassName("item");
console.log("getElementsByClassName:", ele2[0]); // HTMLCollection - need to specify index

// 3) Access by Tag Name
let ele3 = document.getElementsByTagName("p");
console.log("getElementsByTagName:", ele3); // HTMLCollection of all <p> elements

// 4) Using querySelector and querySelectorAll
let ele4 = document.querySelector("#main-heading"); // Select by ID - corrected
let ele5 = document.querySelector(".item"); // Select first element with class "item"
let ele6 = document.querySelectorAll(".item"); // Select all elements with class "item"
let ele7 = document.querySelectorAll("p"); // Select all <p> elements

// Select the ul element - corrected ID
let ul = document.querySelector("#item-list");

console.log("querySelector by ID:", ele4);
console.log("querySelector by class:", ele5);
console.log("querySelectorAll by class:", ele6);
console.log("querySelectorAll by tag:", ele7);

// Properties demonstration
console.log("\n=== DOM Properties Examples ===");

/*
innerText - gets/sets visible text content (respects styling)
innerHTML - gets/sets HTML content including tags
textContent - gets/sets all text content (ignores styling)
*/

// Original content
console.log("Original innerText:", ele5.innerText);
console.log("Original innerHTML:", ele5.innerHTML);
console.log("Original textContent:", ele5.textContent);

// Store original data
let data = ele5.innerText;
console.log("Stored data:", data);

// Change content using innerText
ele5.innerText = "changed using js";
console.log("After innerText change:", ele5.innerText);

// Get ul innerHTML
let data2 = ul.innerHTML;
console.log("UL innerHTML:", data2);

// Demonstrate differences between innerText, innerHTML, and textContent
console.log("\n=== Property Differences ===");

// Add some HTML to demonstrate
ele1.innerHTML = `Hello <strong>World</strong> <em>with HTML</em>
                <strong> this was decided a long time ago</strong>
`;
//use `    ` so as to use mutliple lines



console.log("Heading innerHTML:", ele1.innerHTML);
console.log("Heading innerText:", ele1.innerText);
console.log("Heading textContent:", ele1.textContent);

// More examples with ul
console.log("\nUL Examples:");
console.log("UL innerHTML:", ul.innerHTML);
console.log("UL innerText:", ul.innerText);
console.log("UL textContent:", ul.textContent);

// Practical example: Change multiple items
console.log("\n=== Changing Multiple Elements ===");
let allItems = document.querySelectorAll(".item");
allItems.forEach((item, index) => {
    item.innerText = `Updated item ${index + 1}`;
});

console.log("All items updated!");


/**
 * getAttribute
 * setAttribute
 * classList
 */

console.dir(ele5.getAttribute("id"));
console.log(ele5.getAttribute("class"));

ele5.setAttribute("id","js");

console.log(ele5.classList);
console.log(ele5.classList.contains("hello"));

ele5.classList.add("delete");

/**
 * Element.addEventListener("event name",function(){
 * 
 * })
 */