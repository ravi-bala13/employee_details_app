function loadData(key) {
  try {
    let data = window.sessionStorage.getItem(key);
    data = JSON.parse(data);

    return data;
  } catch (err) {
    console.log("err:", err);
    return undefined;
  }
}

function saveData(key, data) {
  sessionStorage.setItem(key, JSON.stringify(data));
}

function clearData() {
  sessionStorage.clear();
}

export { loadData, saveData, clearData };
