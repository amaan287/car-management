import { useState, ChangeEvent, FormEvent } from "react";
import { Alert } from "flowbite-react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
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
} from "../components/ui/select";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";

interface FormData {
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

export default function CreateCar(): JSX.Element {
  const [file, setFile] = useState<File | null>(null);
  const [imageUploadProgress, setImageUploadProgress] = useState<number | null>(
    null
  );
  const [imageUploadError, setImageUploadError] = useState<string | null>(null);
  const [formData, setFormData] = useState<FormData>({ images: [] });
  const [publishError, setPublishError] = useState<string | null>(null);

  const navigate = useNavigate();

  const handleUploadImage = async (): Promise<void> => {
    try {
      if (!file) {
        setImageUploadError("Please select an image");
        return;
      }

      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", "car-management");
      data.append("cloud_name", "du4q4ysi8");

      const res = await fetch(
        "https://api.cloudinary.com/v1_1/du4q4ysi8/image/upload",
        {
          method: "POST",
          body: data,
        }
      );
      const json = await res.json();

      if (json.secure_url) {
        setFormData((prevData) => ({
          ...prevData,
          images: [
            ...(prevData.images || []), // Ensure previous images are preserved
            { url: json.secure_url, alt: formData.title || "Car image" }, // Add new image with alt text
          ],
        }));
        setImageUploadProgress(null); // Reset progress indicator
        setImageUploadError(null); // Clear any errors
      } else {
        throw new Error("Image upload failed");
      }
    } catch (error) {
      setImageUploadError("Image upload failed");
      setImageUploadProgress(null);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    if (
      !formData.title ||
      !formData.description ||
      formData.images.length === 0 ||
      !formData.specifications?.year ||
      !formData.specifications?.fuelType ||
      !formData.specifications.transmission
    ) {
      setPublishError("Please fill in all required fields");
      return;
    }
    try {
      const res = await fetch("/api/car/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (res.ok) {
        setPublishError(null);
        navigate(`/car/${data.slug}`);
      } else {
        setPublishError(data.message || "Failed to create car");
      }
    } catch (error) {
      setPublishError("Something went wrong");
    }
  };

  return (
    <div className="p-3 max-w-3xl mx-auto min-h-screen">
      <h1 className="text-center text-3xl my-7 font-semibold">Create a Car</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="Title"
          required
          id="title"
          className="flex-1"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setFormData({ ...formData, title: e.target.value })
          }
        />
        <ReactQuill
          theme="snow"
          placeholder="Description"
          className="h-72 mb-12"
          onChange={(value: string) =>
            setFormData({ ...formData, description: value })
          }
        />

        {/* Image Upload */}
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
        {formData.images.map((url, index) => (
          <img
            key={index}
            src={url.url}
            alt="upload"
            className="w-full h-72 object-cover"
          />
        ))}
        <Input
          type="number"
          placeholder="Year"
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
        {/* Category and Tags */}
        <Select
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
        {/* specifications */}

        <Select
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

        {/* Submit */}
        <Button type="submit">Publish</Button>
        {publishError && <Alert color="failure">{publishError}</Alert>}
      </form>
    </div>
  );
}
