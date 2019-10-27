interface Config {
  method: string
  url: string
  data?: string
  dataType: string
}

function ajax(config: Config) {
  var xhr = new XMLHttpRequest()
  xhr.open(config.method, config.url, true)
  xhr.send(config.data)
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      console.log("success");
      if (config.dataType === "json") {
        let json = JSON.parse(xhr.responseText)
        console.log(json);
      } else {
        console.log(xhr.responseText);
      }
    }
  }
}

ajax({
  method: "get",
  url: "http://www.baidu.com",
  dataType: "json"
})