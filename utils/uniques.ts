export const uniqObjectArray= <T>(data: T[], key: keyof T) => {
  let idxs: unknown[] = [... new Set(data.map(item => item[key]))];
  return data.filter(val => {
    const idx = idxs.indexOf(val[key])
    if (idx  === -1) return false;
    idxs.splice(idx, 1)
    return true;
  })
}