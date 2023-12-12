import Header from "@/components/shared/header";
import Lists from "@/components/shared/lists";
import Navbar from "@/components/shared/navbar";
import { db } from "@/lib/firebase";
import { auth } from "@clerk/nextjs";
import { collection, getDocs, query, where } from "firebase/firestore";

const getData = async (uid: string, type: "files" | "folders") => {
  let types: any[] = [];
  const q = query(
    collection(db, type),
    where("uid", "==", uid),
    where("isArchive", "==", false)
  );
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    types.push({ ...doc.data(), id: doc.id });
  });
  return types;
};

export default async function Home() {
  const { userId } = auth();
  const folders = await getData(userId!, "folders");
  const files = await getData(userId!, "files");

  return (
    <>
      <Header label={"My drive"} isHome={true} />
      <Lists
        folders={JSON.parse(JSON.stringify(folders))}
        files={JSON.parse(JSON.stringify(files))}
      />
    </>
  );
}
