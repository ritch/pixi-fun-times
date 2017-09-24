export default function assert(expr) {
  if (!expr) throw new Error('assertion failed')
}