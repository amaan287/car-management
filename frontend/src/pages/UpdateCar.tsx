import React, { ChangeEvent, useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Alert } from "../components/ui/alert";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectTrigger,
  SelectValue,
  SelectItem,
} from "../components/ui/select";

interface FormData {
  _id?: string;
  title?: string;
  description?: string;
  tags?: {
    car_type?: string;
    company?: string;
    status?: string;
  };
  specifications?: {
    year?: number;
    fuelType?: string;
    transmission?: string;
  };
  images: Array<{ url: string; alt: string }>;
}

export default function UpdatePost() {
  const [file, setFile] = useState<File | null>(null);
  const [imageUploadProgress, setImageUploadProgress] = useState<number | null>(
    null
  );
  const [imageUploadError, setImageUploadError] = useState<string | null>(null);
  const [formData, setFormData] = useState<FormData>({
    title: "",
    images: [],
    description: "",
    tags: {
      car_type: "",
      company: "",
      status: "",
    },
    specifications: {
      year: 0,
      fuelType: "",
      transmission: "",
    },
  });
  const [publishError, setPublishError] = useState<string | null>(null);
  const { carId } = useParams<{ carId: string }>();
  const [quillContent, setQuillContent] = useState("");

  const navigate = useNavigate();
  const { currentUser } = useSelector((state: RootState) => state.user);
  console.log("carId", carId);
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch(`/api/car/getCars?carId=${carId}`);
        const data = await res.json();

        // Log the complete response to inspect the structure
        console.log("API Response:", data);

        if (!res.ok) {
          console.log(data.message);
          setPublishError(data.message);
          return;
        }

        // Check if data exists and has the correct structure
        if (!data || (!data.posts && !data.car)) {
          setPublishError("No data found");
          return;
        }

        // Handle different possible response structures
        const postData = data.posts?.[0] || data.car || data;

        console.log("Post Data:", postData);

        setPublishError(null);
        setFormData(postData);
        setQuillContent(postData.description || "");
      } catch (error) {
        console.log((error as Error).message);
        setPublishError("Error fetching post data");
      }
    };

    if (carId) {
      fetchPost();
    }
  }, [carId]);
  const handleUploadImage = async () => {
    try {
      if (!file) {
        setImageUploadError("Please select an image");
        return;
      }
      setImageUploadError(null);

      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", "car-management");
      data.append("cloud_name", "du4q4ysi8");

      const response = await fetch(
        "https://api.cloudinary.com/v1_1/du4q4ysi8/image/upload",
        {
          method: "POST",
          body: data,
        }
      );

      const imageData = await response.json();

      if (!response.ok) {
        throw new Error(imageData.message || "Failed to upload image");
      }

      setImageUploadProgress(null);
      setImageUploadError(null);
      setFormData({
        ...formData,
        images: [
          ...formData.images,
          { url: imageData.secure_url, alt: formData.title || "car image" },
        ],
      });
    } catch (error) {
      setImageUploadError("Image upload failed");
      setImageUploadProgress(null);
      console.log(error);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await fetch(
        `/api/car/updatecar/${formData._id}/${currentUser?._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      const data = await res.json();
      if (!res.ok) {
        setPublishError(data.message);
        return;
      }

      setPublishError(null);
      navigate(`/post/${data.slug}`);
    } catch (error) {
      setPublishError("Something went wrong" + (error as Error).message);
    }
  };

  return (
    <div className="p-3 max-w-3xl mx-auto min-h-screen">
      <h1 className="text-center text-3xl my-7 font-semibold">
        Update Car Post
      </h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="Title"
          required
          id="title"
          className="flex-1"
          value={formData.title || ""}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setFormData({ ...formData, title: e.target.value })
          }
        />
        <ReactQuill
          theme="snow"
          placeholder="Description"
          className="h-72 mb-12"
          value={quillContent}
          onChange={(value: string) => {
            setQuillContent(value);
            setFormData({ ...formData, description: value });
          }}
        />

        <div className="flex gap-4 items-center justify-between border p-3">
          <Input
            id="image"
            type="file"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setFile(e.target.files ? e.target.files[0] : null)
            }
          />
          <Button
            type="button"
            onClick={handleUploadImage}
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
        {formData.images.map((image, index) => (
          <img
            key={index}
            src={image.url}
            alt={image.alt}
            className="w-full h-72 object-cover"
          />
        ))}
        <Input
          type="number"
          placeholder="Year"
          value={formData.specifications?.year || ""}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setFormData((prev) => ({
              ...prev,
              specifications: {
                ...prev.specifications,
                year: Number(e.target.value),
              },
            }))
          }
        />
        <Input
          type="text"
          placeholder="Company"
          value={formData.tags?.company || ""}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setFormData((prev) => ({
              ...prev,
              tags: {
                ...prev.tags,
                company: e.target.value,
              },
            }))
          }
        />
        <Select
          value={formData.tags?.car_type}
          onValueChange={(value) =>
            setFormData((prev) => ({
              ...prev,
              tags: { ...prev.tags, car_type: value },
            }))
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Select Car Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Car Type</SelectLabel>
              <SelectItem value="Sedan">Sedan</SelectItem>
              <SelectItem value="SUV">SUV</SelectItem>
              <SelectItem value="Hatchback">Hatchback</SelectItem>
              <SelectItem value="Coupe">Coupe</SelectItem>
              <SelectItem value="Truck">Truck</SelectItem>
              <SelectItem value="Wagon">Van</SelectItem>
              <SelectItem value="Other">Other</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <Select
          value={formData.tags?.status}
          onValueChange={(value) =>
            setFormData((prev) => ({
              ...prev,
              tags: { ...prev.tags, status: value },
            }))
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Select Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Status</SelectLabel>
              <SelectItem value="Available">Available</SelectItem>
              <SelectItem value="Sold">Sold</SelectItem>
              <SelectItem value="Reserved">Reserved</SelectItem>
              <SelectItem value="Maintenance">Maintenance</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>

        <Select
          value={formData.specifications?.fuelType}
          onValueChange={(value) =>
            setFormData((prev) => ({
              ...prev,
              specifications: { ...prev.specifications, fuelType: value },
            }))
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Select Fuel type" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Fuel type</SelectLabel>
              <SelectItem value="Petrol">Petrol</SelectItem>
              <SelectItem value="Diesel">Diesel</SelectItem>
              <SelectItem value="Electric">Electric</SelectItem>
              <SelectItem value="Hybrid">Hybrid</SelectItem>
              <SelectItem value="Other">Other</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <Select
          value={formData.specifications?.transmission}
          onValueChange={(value) =>
            setFormData((prev) => ({
              ...prev,
              specifications: { ...prev.specifications, transmission: value },
            }))
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Select Transmission type" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Transmission</SelectLabel>
              <SelectItem value="Manual">Manual</SelectItem>
              <SelectItem value="Automatic">Automatic</SelectItem>
              <SelectItem value="Semi-Automatic">Semi-Automatic</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>

        <Button type="submit">Update Post</Button>
        {publishError && <Alert color="failure">{publishError}</Alert>}
      </form>
    </div>
  );
}
