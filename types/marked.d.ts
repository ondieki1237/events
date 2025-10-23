declare module 'marked' {
  export function marked(input: string): string
  export function parse(input: string): string
  export default marked
}
