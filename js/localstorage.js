function setDegree(data) {
  localStorage.setItem("degree", data);
}

function getDegree() {
  return localStorage.getItem("degree");
}

function storeLocation(data) {
  localStorage.setItem("wLocation", data);
}

function getStoredLocation() {
  return localStorage.getItem("wLocation");
}

function setAutoState(data) {
  localStorage.setItem("autoState", data);
}

function getAutoState() {
  return localStorage.getItem("autoState");
}
export {
  setDegree,
  getDegree,
  storeLocation,
  getStoredLocation,
  setAutoState,
  getAutoState,
};
