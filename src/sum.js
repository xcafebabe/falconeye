
export default function sum(...figures) {
  return figures.reduce((total, current) => {
    return total + current
  })
}