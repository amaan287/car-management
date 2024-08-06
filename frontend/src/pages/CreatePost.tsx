import { useState, ChangeEvent, FormEvent } from "react";
import { Alert } from "flowbite-react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
  UploadTask,
} from "firebase/storage";
import { app } from "../firebase";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useNavigate } from "react-router-dom";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface FormData {
  title?: string;
  category?: string;
  image?: string;
  content?: string;
}

export default function CreatePost(): JSX.Element {
  const [file, setFile] = useState<File | null>(null);
  const [imageUploadProgress, setImageUploadProgress] = useState<number | null>(
    null
  );
  const [imageUploadError, setImageUploadError] = useState<string | null>(null);
  const [formData, setFormData] = useState<FormData>({
    category: "uncategorised", // Add this line
  });
  const [publishError, setPublishError] = useState<string | null>(null);

  const navigate = useNavigate();

  const handleUpdloadImage = async (): Promise<void> => {
    try {
      if (!file) {
        setImageUploadError("Please select an image");
        return;
      }
      setImageUploadError(null);
      const storage = getStorage(app);
      const fileName = new Date().getTime() + "-" + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask: UploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setImageUploadProgress(Number(progress.toFixed(0)));
        },
        (error) => {
          console.log(error);
          setImageUploadError("Image upload failed");
          setImageUploadProgress(null);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setImageUploadProgress(null);
            setImageUploadError(null);
            setFormData({ ...formData, image: downloadURL });
          });
        }
      );
    } catch (error) {
      setImageUploadError("Image upload failed");
      setImageUploadProgress(null);
      console.log(error);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    if (
      !formData.title ||
      !formData.category ||
      !formData.image ||
      !formData.content
    ) {
      setPublishError("Please fill in all fields");
      return;
    }
    try {
      const res = await fetch("/api/post/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        setPublishError(data.message);
        return;
      }

      if (res.ok) {
        setPublishError(null);
        navigate(`/post/${data.slug}`);
      }
    } catch (error) {
      setPublishError("Something went wrong");
    }
  };

  return (
    <div className="p-3 max-w-3xl mx-auto min-h-screen">
      <h1 className="text-center text-3xl my-7 font-semibold">Create a post</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-4 sm:flex-row justify-between">
          <Input
            type="text"
            placeholder="Title"
            required
            id="title"
            className="flex-1 "
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setFormData({ ...formData, title: e.target.value })
            }
          />
          <div className="">
            <Select
              onValueChange={(value) =>
                setFormData({ ...formData, category: value })
              }
              value={formData.category} // Add this line
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Category</SelectLabel>
                  <SelectItem value="uncategorised">uncategorised</SelectItem>
                  <SelectItem value="plein air">Plein air</SelectItem>
                  <SelectItem value="pencil sketch">Pencil Sketch</SelectItem>
                  <SelectItem value="pencil portrait">
                    Pencil Portrait
                  </SelectItem>
                  <SelectItem value="acrylic portrait">
                    Acrylic Portrait
                  </SelectItem>
                  <SelectItem value="landscape">Landscape</SelectItem>
                  <SelectItem value="commission art">Commission art</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="flex gap-4 items-center justify-between border p-3">
          <Input
            id="image"
            className="text-gray-400 bg-black"
            type="file"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setFile(e.target.files ? e.target.files[0] : null)
            }
          />
          <Button
            type="button" // Add this line
            size="sm"
            onClick={handleUpdloadImage}
            disabled={!!imageUploadProgress}
          >
            {imageUploadProgress ? (
              <div className="w-16 h-16">
                <CircularProgressbar
                  value={imageUploadProgress}
                  text={`${imageUploadProgress || 0}%`}
                />
              </div>
            ) : (
              "Upload Image"
            )}
          </Button>
        </div>
        {imageUploadError && <Alert color="failure">{imageUploadError}</Alert>}
        {formData.image && (
          <img
            src={formData.image}
            alt="upload"
            className="w-full h-72 object-cover"
          />
        )}
        <ReactQuill
          theme="snow"
          placeholder="Write something..."
          className="h-72 mb-12"
          onChange={(value: string) => {
            setFormData({ ...formData, content: value });
          }}
        />
        <Button type="submit">Publish</Button>
        {publishError && (
          <Alert className="mt-5" color="failure">
            {publishError}
          </Alert>
        )}
      </form>
    </div>
  );
}
