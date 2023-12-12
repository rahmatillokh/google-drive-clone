"use client";
import { FileUp, Folder, FolderUp } from "lucide-react";
import React, { ElementRef, useRef } from "react";
import { Separator } from "../ui/separator";
import { useFolder } from "@/hooks/use-folder";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { db, storage } from "@/lib/firebase";
import { useUser } from "@clerk/nextjs";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { toast } from "sonner";

const PopoverActions = () => {
  const inputRef = useRef<ElementRef<"input">>(null);
  const { user } = useUser();

  const { onOpen } = useFolder();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    const file = files[0];
    let image = "";

    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        image = e.target?.result as string;
      };
    }

    const promise = addDoc(collection(db, "files"), {
      name: file?.name,
      type: file?.type,
      size: file?.size,
      timestamp: serverTimestamp(),
      uid: user?.id,
      isArchive: false,
    }).then((docs) => {
      const refs = ref(storage, `files/${docs.id}/image`);
      uploadString(refs, image, "data_url").then(() => {
        getDownloadURL(refs).then((url: any) => {
          updateDoc(doc(db, "files", docs.id), {
            image: url,
          });
        });
      });
    });

    toast.promise(promise, {
      loading: "Uploading file...",
      success: "File uploaded!",
      error: "Failed to upload file!",
    });
  };
  return (
    <>
      <div
        className="flex items-center hover:bg-secondary transition py-2 px-4 space-x-2 text-sm"
        role="button"
        onClick={onOpen}
      >
        <Folder className="w-4 h-4" />
        <span>New folder</span>
      </div>
      <Separator />

      <label>
        <div
          className="flex items-center hover:bg-secondary transition py-2 px-4 space-x-2 text-sm"
          role="button"
        >
          <FileUp className="w-4 h-4" />
          <span>File upload</span>
        </div>
        <input
          type="file"
          className="hidden"
          accept="image/*"
          ref={inputRef}
          onChange={onChange}
        />
      </label>

      <label>
        <div
          className="flex items-center hover:bg-secondary transition py-2 px-4 space-x-2 text-sm"
          role="button"
        >
          <FolderUp className="w-4 h-4" />
          <span>Folder upload</span>
        </div>
        <input
          type="file"
          className="hidden"
          accept="image/*"
          ref={inputRef}
          onChange={onChange}
        />
      </label>
    </>
  );
};

export default PopoverActions;
