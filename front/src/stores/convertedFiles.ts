import { create } from "zustand";

type ConvertedFile = {
  convert_filename: string;
  output_filename: string;
  is_success: boolean;
};

type ConvertedFileStore = {
  files: ConvertedFile[];
  setFiles: (files: ConvertedFile[]) => void;
};

export const useConvertedFileStore = create<ConvertedFileStore>((set) => ({
  files: [],
  setFiles: (files) => set({ files }),
}));
