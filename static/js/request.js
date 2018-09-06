
window.request = function (url, data, callback) {
  var xhr = new XMLHttpRequest();
  xhr.open("POST", url, true);
  xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  console.log(JSON.stringify(data));
  if (data) {
    xhr.send(JSON.stringify(data));
  } else {
    xhr.send(null);
  }
  xhr.onreadystatechange = function (eve) {
    if (xhr.readyState === 4) {
      if (xhr.status !== 200) {
        callback(new Error(xhr.statusText), null);
        return;
      }
      if (!xhr.responseText || xhr.responseText === "") {
        callback(new Error("empty response"), null);
        return;
      }
      var resJson;
      try {
        resJson = JSON.parse(xhr.responseText);
      } catch (err) {
        console.error(err);
        callback(new Error("bad json response"), null);
        return;
      }
      if (resJson.error) {
        callback(new Error(resJson.error), null);
      } else {
        callback(null, resJson);
      }
    }
  }
}
