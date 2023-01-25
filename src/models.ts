export interface TeamMember {
  name: string;
  about: string;
  pictureUri: string;
  backgroundUri: string;
  pictureWidthPercent?: number;
  picturePlacement?: "flex-end" | "center";
}
