export interface BirdDataType {
  type: string;
  id: number;
  title: string;
  image: string;
}

export const BIRD_DATA: BirdDataType[] = [
  {
    id: 1,
    title: "Photo Identification",
    image: "trees.webp",
  },
  {
    id: 2,
    title: "Sound Identification",
    image: "river.webp",
  },
  {
    id: 3,
    title: "Geo-Tagging Identification",
    image: "waterfall.webp",
  },
];