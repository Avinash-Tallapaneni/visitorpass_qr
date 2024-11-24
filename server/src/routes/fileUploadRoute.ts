import { createUploadthing, type FileRouter } from "uploadthing/server";



const f = createUploadthing({
  errorFormatter: (err) => {
    console.log("triggered here", err);
    console.log("Error uploading file", err.message);
    console.log("  - Above error caused by:", err.cause);
    
    return { message: err.message };
  },
});

export const fileUploadRouter = {
  selfieUploader: f({
    image: {
      maxFileSize: "4MB",
      maxFileCount: 1,
    },
  })
    .middleware(({ files }) => {
      console.log("fileUploadRoute working");
      console.log("process.env.UPLOADTHING_TOKEN", process.env.UPLOADTHING_TOKEN);
      console.log("files", files);
      return { uploadedBy: "user" };
  })
  .onUploadComplete(async ({ metadata, file }) => {
    console.log("Selfie upload complete:", metadata, file.url);
    return { url: file.url };
    }),

  documentUploader: f({
    pdf: {
      maxFileSize: "4MB",
      maxFileCount: 1,
    },
  })
    .middleware(({ files }) => {
      console.log("files", files);
      return { uploadedBy: "user" };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Document upload complete:", metadata, file.url);
      return { url: file.url };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof fileUploadRouter;
