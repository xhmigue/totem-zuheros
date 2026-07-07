for (let i = 0; i < 26; i++) {
  const id = `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
  console.log(id);
}
