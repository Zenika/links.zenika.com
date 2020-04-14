module.exports = async function trycatch(promise) {
  try {
    return [await promise, null];
  } catch (err) {
    return [undefined, err];
  }
};
