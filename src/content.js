console.log('Hello Content');

let colorPalette = ""
let colorPalette_json = ""
let region = ""

// get color setting from localstorage
chrome.storage.sync.get(['colorPalette'], function (result) {
  // console.log('Value currently is ' + JSON.stringify(result["colorPalette"]));
  colorPalette = result["colorPalette"]
  colorPalette_json = JSON.parse(JSON.stringify(colorPalette))
  console.log(colorPalette_json)

  getRegion()
  changeRegionBackgroundColor()
});


// Example: https://us-west-2.console.aws.amazon.com/console/home?region=us-west-2
function getRegion() {
  let region_url = document.getElementById("nav-home-link").href
  const regex = /(\w{2}-\w*-\w)/g
  region = region_url.match(regex)[0]
  console.log(region)
}

function changeRegionBackgroundColor() {
  // console.log(colorPalette_json)
  let color = colorPalette_json[region]
  console.log(color)
  const aws_navbar = document.getElementsByClassName("globalNav-122")
  for (let i = 0; i < aws_navbar.length; i++) {
    aws_navbar[i].style.setProperty('background-color', color, 'important');
  }
}
