interface Movie {
    [index: number]: object,
    title: string,
    description: string,
    image?: string,
    genre: string,
    id: number
  }

interface ElementHeight {
  height: number
}

export type { ElementHeight, Movie }

  